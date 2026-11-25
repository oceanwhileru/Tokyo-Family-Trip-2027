import { readFile, writeFile } from 'node:fs/promises';
const read = (name, encoding = 'utf8') => readFile(new URL('../' + name, import.meta.url), encoding);
const assets = {};
for (const name of ['fuji','ueno','ginza','gotemba','narita']) {
  assets[name] = 'data:image/jpeg;base64,' + (await read('assets/' + name + '.jpg', null)).toString('base64');
}
const inline = text => text.replaceAll('</script', '<\\/script');
let html = await read('index.html');
const css = await read('styles.css');
const icon = 'data:image/svg+xml;base64,' + (await read('assets/icon.svg', null)).toString('base64');
html = html.replace('href="assets/icon.svg"', 'href="' + icon + '"')
  .replace('<link rel="stylesheet" href="styles.css">', () => '<style>\n' + css + '\n</style>');
for (const file of ['data.js','transport.js','app.js']) {
  const source = await read(file);
  html = html.replace('  <script defer src="' + file + '"></script>\n', '');
  const prefix = file === 'data.js' ? 'window.TRIP_ASSETS = ' + JSON.stringify(assets) + ';\n' : '';
  html = html.replace('</body>', () => '<script>\n' + inline(prefix + source) + '\n</script>\n</body>');
}
const target = new URL('../Tokyo-Family-Trip-2027-offline.html', import.meta.url);
await writeFile(target, html);
console.log('Built offline HTML (' + Buffer.byteLength(html).toLocaleString() + ' bytes).');
