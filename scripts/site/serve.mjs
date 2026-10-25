// Local preview that serves the repo the way Cloudflare Pages does:
// _redirects rules first, then /page -> page.html, URLs ending in .html or a stray
// trailing slash redirect to the clean URL, folders redirect to a trailing slash,
// _headers rules are added, and unknown paths get 404.html.
//   node scripts/site/serve.mjs        (PORT defaults to 8000)
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const PORT = Number(process.env.PORT) || 8000;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

const lines = (name) => (existsSync(join(ROOT, name)) ? readFileSync(join(ROOT, name), 'utf8').split('\n') : []);
const redirects = lines('_redirects').map((l) => l.trim().split(/\s+/)).filter(([from]) => from && from.startsWith('/'))
  .map(([from, to, code = '302']) => ({ from, to, code: Number(code) }));
const headerRules = [];
for (const l of lines('_headers')) {
  if (!l.trim() || l.trim().startsWith('#')) continue;
  if (/^\S/.test(l)) headerRules.push({ test: new RegExp(`^${l.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`), set: {} });
  else if (headerRules.length) { const [k, ...v] = l.trim().split(':'); headerRules.at(-1).set[k.trim()] = v.join(':').trim(); }
}

const isFile = (rel) => { const p = join(ROOT, rel); return existsSync(p) && statSync(p).isFile(); };
const headersFor = (path, base) => Object.assign(base, ...headerRules.filter((r) => r.test.test(path)).map((r) => r.set));
const send = (res, path, rel, status = 200) => {
  res.writeHead(status, headersFor(path, { 'Content-Type': types[extname(rel)] || 'application/octet-stream' }));
  res.end(readFileSync(join(ROOT, rel)));
};
const redirect = (res, to, status = 308) => { res.writeHead(status, { Location: to }); res.end(); };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = decodeURIComponent(url.pathname);
  const rule = redirects.find((r) => r.from === path);
  if (rule) return rule.code === 200 ? send(res, path, rule.to) : redirect(res, rule.to, rule.code);
  if (path.endsWith('.html') && isFile(path)) return redirect(res, path.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '') + url.search);
  if (path.endsWith('/')) {
    if (isFile(join(path, 'index.html'))) return send(res, path, join(path, 'index.html'));
    if (path !== '/' && isFile(`${path.slice(0, -1)}.html`)) return redirect(res, path.slice(0, -1) + url.search);
  } else {
    if (isFile(path)) return send(res, path, path);
    if (isFile(`${path}.html`)) return send(res, path, `${path}.html`);
    if (isFile(join(path, 'index.html'))) return redirect(res, `${path}/${url.search}`);
  }
  send(res, path, '404.html', 404);
}).listen(PORT, '127.0.0.1', () => console.log(`Preview on http://localhost:${PORT}`));
