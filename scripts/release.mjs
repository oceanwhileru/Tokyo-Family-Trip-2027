import { mkdir } from 'node:fs/promises';
import {
  bundleFolder, loadRelease, makeBuildId, read, renderOnline, root, sourceFiles, versionPattern, write, writeOffline
} from './site-files.mjs';

function isNewVersion(version,previous) {
  const next = version.slice(1).split('.').map(Number);
  const before = previous.slice(1).split('.').map(Number);
  for (let i=0;i<next.length;i++) {
    if (next[i] !== before[i]) return next[i] > before[i];
  }
  return false;
}

const [version] = process.argv.slice(2);
if (!versionPattern.test(version ?? '') || process.argv.length !== 3) {
  throw new Error('Usage: node scripts/release.mjs V2.0.1');
}
const previous = await loadRelease().catch(error=>{
  if (error.code === 'ENOENT') return null;
  throw error;
});
if (previous && !isNewVersion(version,previous.version)) throw new Error('Bump the version before publishing.');
const changelog = (await read('CHANGELOG.md')).split(/^## /m).slice(1);
const notes = changelog.find(section=>{
  const heading = section.split('\n')[0].trim();
  return heading === version || heading.startsWith(version+' ');
});
if (!notes || !/^- \S/m.test(notes)) throw new Error('Add release notes for '+version+' in CHANGELOG.md.');

const files = await sourceFiles();
const deployedAt = new Date().toISOString();
const release = {version,deployedAt,buildId:makeBuildId(version,deployedAt,files)};
const folder = bundleFolder(release);
await mkdir(new URL(folder+'/',root),{recursive:true});
await Promise.all([write(folder+'/styles.css',files.css),write(folder+'/app.js',files.js)]);
await writeOffline(files,release);
await write('index.html',renderOnline(files,release));
await write('version.json',JSON.stringify(release,null,2)+'\n');
console.log(release.version+' '+release.buildId+' '+release.deployedAt);
