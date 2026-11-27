import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { bundleFolder, buildIdPattern, loadRelease, makeBuildId, renderOnline, sourceFiles, versionPattern } from './site-files.mjs';

const read = (name, encoding = 'utf8') => readFile(new URL('../' + name, import.meta.url), encoding);
const window = {};
for (const name of ['data.js','transport.js']) runInNewContext(await read(name), { window });
const { days, tasks, members } = window.TRIP;
const { airport, plans, fields, outletBus } = window.TRANSPORT;
const time = (date,e) => Date.parse(date+'T'+e.time+':00'+(e.zone==='TST'?'+08:00':'+09:00'));
const embeddedRelease = html => JSON.parse(html.match(/<script id="trip-release" type="application\/json">(.*?)<\/script>/)?.[1] ?? 'null');

test('fixed itinerary keeps the arrival and return buffers', () => {
  assert.equal(days.length, 5);
  const arrival=days[0].events;
  assert.equal((time(days[0].date,arrival[3])-time(days[0].date,arrival[2]))/60000,180);
  const departure=days[4].events;
  assert.equal((time(days[4].date,departure[4])-time(days[4].date,departure[3]))/60000,300);
  assert.equal(arrival[2].time,'14:55');
  assert.equal(departure[3].time,'11:40');
  assert.equal(departure[4].time,'16:40');
  assert.ok(days[3].b.length>=3);
  assert.ok(days[2].events.some(e=>e.mins==='300 分'));
});
test('the shared agenda retains flight details and the Japan return quote', () => {
  assert.equal(members.length,4);
  assert.equal(tasks.length,11);
  assert.equal(days[0].firstEventIndex,1);
  assert.equal(days[0].events[0].title,'桃園第一航廈集合');
  assert.equal(days[4].events.at(-1).title,'抵達桃園第一航廈');
  assert.equal(airport.in[2].cost[0],29000);
  assert.equal(airport.in[3].cost,null);
  assert.equal(airport.out[0].cost[0],16000);
});
test('every rental plan matches the complete cost model', () => {
  assert.deepEqual(Array.from(plans,p=>p.name.split('｜')[0]),['A','B','C','D 變體','E','基準']);
  for(const p of plans){
    assert.equal(p.numbers.length,fields.length);
    assert.ok(p.numbers.every(Number.isFinite));
    assert.ok(p.numbers.every(n=>n>=0));
  }
});

test('ledger converts decimal amounts and uses Taiwan payment dates', async () => {
  runInNewContext(await read('ledger-rates.js'),{window});
  const ledger=window.TRIP_LEDGER;
  assert.equal(ledger.dateInTaipei(Date.parse('2026-11-27T16:00:00Z')),'2026-11-28');
  assert.equal(ledger.formatAmount(ledger.parseAmount('10,000.50')),'10,000.5');
  assert.equal(ledger.parseAmount('100.001'),null);
  assert.equal(ledger.parseAmount('10,00'),null);
  assert.equal(ledger.parseAmount('0'),null);
  assert.equal(ledger.convert(ledger.parseAmount('10,000'),'0.1988'),198800);
  assert.equal(ledger.convert(ledger.parseAmount('10,000'),'0.2021'),202100);
  assert.equal(ledger.convert(ledger.parseAmount('1.01'),'0.5'),51);
  assert.equal(ledger.convert(ledger.parseAmount('123.45'),'1'),12345);
});
test('the Nippon quotes account separately for the two-day toll and one-day Outlet bus', () => {
  const input = id=>Object.fromEntries(fields.map(([key],i)=>[key,plans.find(p=>p.id===id).numbers[i]]));
  const twoDay = input('a');
  const oneDay = input('d');
  assert.equal(twoDay.base,37180);
  assert.equal(twoDay.toll,3600);
  assert.equal(twoDay.base+twoDay.toll,40780);
  assert.equal(oneDay.base,26510);
  assert.equal(oneDay.bus,8000);
  assert.equal(oneDay.toll,0);
  assert.deepEqual(Array.from(outletBus.weekday,fare=>oneDay.base+fare*members.length),[34110,34510]);
});
test('the offline deliverable contains inline code and photos', async () => {
  const html=await read('Tokyo-Family-Trip-2027-offline.html');
  assert.ok(html.includes('Tokyo Family Trip 2027'));
  assert.equal((html.match(/data:image\/jpeg;base64,/g)||[]).length,5);
  assert.doesNotMatch(html,/<script[^>]+src=|href="styles\.css"/);
  assert.ok(html.includes('window.TRIP_ASSETS = {'));
  assert.ok(html.includes('data-trip-offline'));
  assert.deepEqual(embeddedRelease(html),await loadRelease());
});

test('the deployed HTML, immutable assets and manifest are the same release', async () => {
  const release = await loadRelease();
  const files = await sourceFiles();
  const folder = bundleFolder(release);
  assert.match(release.version,versionPattern);
  assert.match(release.buildId,buildIdPattern);
  assert.equal(new Date(release.deployedAt).toISOString(),release.deployedAt);
  assert.equal(makeBuildId(release.version,release.deployedAt,files),release.buildId);
  const html = await read('index.html');
  assert.deepEqual(embeddedRelease(html),release);
  assert.equal(await read(folder+'/styles.css'),files.css);
  assert.equal(await read(folder+'/app.js'),files.js);
  assert.equal(html,renderOnline(files,release));
  assert.ok(release.version && (await read('CHANGELOG.md')).split('\n').some(line=>line.startsWith('## '+release.version+' ')));
});

test('the release keeps the existing personal storage key and shared Sheet URL', async () => {
  const app = await read(bundleFolder(await loadRelease())+'/app.js');
  assert.match(app,/const storageKey='tokyo-family-trip-2027\.v1'/);
  assert.doesNotMatch(app,/localStorage\.(clear|removeItem)\(/);
  assert.ok(app.includes('https://docs.google.com/spreadsheets/d/1GTniUXzounJD-Jsp2ElEUULLxNxt9GQ6WsqLeEOfQS8/edit#gid=1383967002'));
});
