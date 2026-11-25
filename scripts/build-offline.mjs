import { bundleFolder, loadRelease, makeBuildId, read, writeOffline } from './site-files.mjs';

const release = await loadRelease();
const bundle = bundleFolder(release);
const [template,css,js] = await Promise.all([
  read('index.template.html'),read(bundle+'/styles.css'),read(bundle+'/app.js')
]);
if (makeBuildId(release.version,release.deployedAt,{template,css,js}) !== release.buildId) {
  throw new Error('The HTML template or released assets have changed. Prepare a new release.');
}
await writeOffline({template,css,js},release);
