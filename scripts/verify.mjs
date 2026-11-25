import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const read = (name, encoding = 'utf8') => readFile(new URL('../' + name, import.meta.url), encoding);
const window = {};
for (const name of ['data.js','transport.js']) runInNewContext(await read(name), { window });
const { days, tasks, members } = window.TRIP;
const { airport, plans, fields } = window.TRANSPORT;
const time = (date,e) => Date.parse(date+'T'+e.time+':00'+(e.zone==='TST'?'+08:00':'+09:00'));

test('fixed itinerary keeps the arrival and return buffers', () => {
  assert.equal(days.length, 5);
  const arrival=days[0].events;
  assert.equal((time(days[0].date,arrival[4])-time(days[0].date,arrival[3]))/60000,180);
  const departure=days[4].events;
  assert.equal((time(days[4].date,departure[4])-time(days[4].date,departure[3]))/60000,300);
  assert.equal(arrival[3].time,'14:55');
  assert.equal(departure[3].time,'11:40');
  assert.equal(departure[4].time,'16:40');
  assert.ok(days[3].b.length>=3);
  assert.ok(days[2].events.some(e=>e.mins==='300 分'));
});
test('the Taiwan reminder and Japan return quote have separate records', () => {
  assert.equal(members.length,4);
  assert.equal(tasks.length,12);
  assert.equal(tasks[0].due,'2026/12/01 10:00 TST');
  assert.equal(airport.in[2].cost,null);
  assert.equal(airport.out[0].cost[0],16000);
});
test('every rental plan matches the complete cost model', () => {
  assert.equal(plans.length,6);
  for(const p of plans){
    assert.equal(p.numbers.length,fields.length);
    assert.ok(p.numbers.every(Number.isFinite));
    assert.ok(p.numbers.every(n=>n>=0));
  }
});
test('the offline deliverable contains inline code and photos', async () => {
  const html=await read('Tokyo-Family-Trip-2027-offline.html');
  assert.ok(html.includes('Tokyo Family Trip 2027'));
  assert.equal((html.match(/data:image\/jpeg;base64,/g)||[]).length,5);
  assert.doesNotMatch(html,/<script[^>]+src=|href="styles\.css"/);
  assert.ok(html.includes('window.TRIP_ASSETS = {'));
});
