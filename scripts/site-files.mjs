import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

export const root = new URL('../', import.meta.url);
export const read = (path, encoding = 'utf8') => readFile(new URL(path, root), encoding);
export const write = (path, content) => writeFile(new URL(path, root), content);
export const versionPattern = /^V[0-9]+[.][0-9]+[.][0-9]+$/;
export const buildIdPattern = /^v[0-9]+[.][0-9]+[.][0-9]+-[a-f0-9]{12}$/;
const photos = ['fuji','ueno','ginza','gotemba','narita'];
const offlineFile = 'Tokyo-Family-Trip-2027-offline.html';
const escapeScript = source => source.replaceAll(/<\/script/gi, '<\\/script');
export const integrity = content => 'sha256-'+createHash('sha256').update(content).digest('base64');
export const bundleFolder = release => 'releases/'+release.buildId;

export async function sourceFiles() {
  const files = ['data.js','transport.js','site-version.js','app.js'];
  const [template,css,...scripts] = await Promise.all(['index.template.html','styles.css',...files].map(path=>read(path)));
  const js = scripts.map((script,index)=>'/* '+files[index]+' */\n'+script).join('\n;\n');
  return {template,css,js};
}

export function loadRelease() {
  return read('version.json').then(content=>JSON.parse(content));
}

export function makeBuildId(version, deployedAt, {template,css,js}) {
  const digest = createHash('sha256').update(JSON.stringify([version,deployedAt,template,css,js])).digest('hex');
  return version.toLowerCase()+'-'+digest.slice(0,12);
}

function insertMetadata(template,release) {
  return template.replace('<!-- TRIP_RELEASE -->',()=>'<script id="trip-release" type="application/json">'+JSON.stringify(release)+'</script>');
}

export function renderOnline({template,css,js},release) {
  const bundle = bundleFolder(release);
  return insertMetadata(template,release)
    .replace('<!-- TRIP_STYLES -->','<link rel="stylesheet" href="'+bundle+'/styles.css" integrity="'+integrity(css)+'">')
    .replace('<!-- TRIP_SCRIPT -->','<script defer src="'+bundle+'/app.js" integrity="'+integrity(js)+'"></script>');
}

export async function writeOffline({template,css,js},release) {
  const photoPairs = await Promise.all(photos.map(async name=>[name,'data:image/jpeg;base64,'+(await read('assets/'+name+'.jpg',null)).toString('base64')]));
  const icon = 'data:image/svg+xml;base64,'+(await read('assets/icon.svg',null)).toString('base64');
  const assignAssets = 'window.TRIP_ASSETS = '+JSON.stringify(Object.fromEntries(photoPairs))+';';
  const html = insertMetadata(template,release)
    .replace('<html lang="zh-Hant">','<html lang="zh-Hant" data-trip-offline>')
    .replace('href="assets/icon.svg"','href="'+icon+'"')
    .replace('<!-- TRIP_STYLES -->',()=>'<style>\n'+css+'\n</style>')
    .replace('  <!-- TRIP_SCRIPT -->\n','')
    .replace('</body>',()=>'<script>\n'+assignAssets+'\n</script>\n<script>\n'+escapeScript(js)+'\n</script>\n</body>');
  await write(offlineFile,html);
  console.log('Built offline HTML ('+Buffer.byteLength(html).toLocaleString()+' bytes).');
}
