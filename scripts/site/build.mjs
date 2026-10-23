// Builds the o9Tech static site.
//   node scripts/site/build.mjs          render pages, CSS, sitemap and redirects
//   node scripts/site/build.mjs --check  render, then fail on broken local links or em dashes
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { site, projects, services } from './data.mjs';
import { ROOT, badges } from './ui.mjs';
import { indexPage } from './page-index.mjs';
import { casePage, servicePage, notFoundPage } from './page-inner.mjs';
import { huePourPage, huePrivacyPage, policySource, policyMain } from './page-hue.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const out = (rel, content) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  return rel;
};
// Pages served at more than one URL depth (/hue-pour/, /privacy/hue-pour, any 404 path)
// need root-relative links instead of "assets/..." ones.
const absolutize = (html) => html.replace(/(\s(?:href|src)=")(?!https?:|mailto:|tel:|#|\/|data:)/g, '$1/');

const written = [];

// CSS bundle
const cssDir = join(here, 'css');
const css = readdirSync(cssDir).filter((f) => f.endsWith('.css')).sort().map((f) => readFileSync(join(cssDir, f), 'utf8')).join('\n');
written.push(out('assets/o9/css/site.css', css));

// Pages
written.push(out('index.html', indexPage()));
projects.forEach((p, i) => written.push(out(p.page, casePage(p, i))));
services.forEach((s) => written.push(out(s.page, servicePage(s))));
written.push(out('404.html', absolutize(notFoundPage())));
written.push(out('hue-pour.html', absolutize(huePourPage())));
written.push(out('privacy/hue-pour.html', absolutize(huePrivacyPage())));

// Standalone copies of the badges for decks, proposals and profiles
for (const [name, markup] of Object.entries(badges)) {
  const file = name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  written.push(out(`assets/o9/img/badges/${file}.svg`, markup.replace('<svg class="badge-svg"', '<svg xmlns="http://www.w3.org/2000/svg"') + '\n'));
}

// Sitemap, robots, redirects
const today = new Date().toISOString().slice(0, 10);
const urls = ['', 'hue-pour', 'privacy/hue-pour', ...services.map((s) => s.page), ...projects.map((p) => p.page)];
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}/${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
out('_redirects', `# Hue Pour short link. huepour.o9tech.com must also be added as a domain alias in Netlify.
https://huepour.o9tech.com/*  https://o9tech.com/hue-pour  301!
http://huepour.o9tech.com/*   https://o9tech.com/hue-pour  301!

# Hue Pour pages also answer with a trailing slash (a rewrite, not a redirect, so no loop)
/hue-pour/               /hue-pour.html             200
/privacy/hue-pour/       /privacy/hue-pour.html     200

# Old template pages that no longer exist
/blog.html               /               301
/blog-details.html       /               301
/starter-page.html       /               301
/portfolio-details.html  /#work          301
/service-details.html    /#services      301
/test-server.html        /               301
`);

console.log(`Built ${written.length} files (${projects.length} case studies, ${services.length} services).`);

// Checks
if (process.argv.includes('--check')) {
  let problems = 0;
  const pages = written.filter((f) => f.endsWith('.html'));
  for (const page of pages) {
    const html = readFileSync(join(ROOT, page), 'utf8');
    const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
    for (const ref of refs) {
      if (/^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
      const [path, hash] = ref.split('#');
      const clean = path.split('?')[0].replace(/^\//, '').replace(/\/$/, '');
      // resolve like Netlify: exact file, then "page.html" for /page, then "dir/index.html"
      const target = clean === '' ? (path.startsWith('/') ? 'index.html' : page)
        : [clean, `${clean}.html`, join(clean, 'index.html')].find((c) => existsSync(join(ROOT, c)) && !c.endsWith('/'));
      if (!target) { console.error(`  ${page}: missing ${ref}`); problems++; continue; }
      if (hash) {
        const targetHtml = readFileSync(join(ROOT, target), 'utf8');
        if (!targetHtml.includes(`id="${hash}"`)) { console.error(`  ${page}: missing anchor ${ref}`); problems++; }
      }
    }
    const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    if (text.includes('—')) { console.error(`  ${page}: contains an em dash`); problems++; }
    if (/hue-pour/.test(page) && text.includes('–')) { console.error(`  ${page}: contains an en dash`); problems++; }
    if (/lorem|ipsum|Cras fermentum/i.test(text)) { console.error(`  ${page}: contains placeholder text`); problems++; }
  }
  // The Hue Pour policy must match the source file word for word
  const words = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const live = readFileSync(join(ROOT, 'privacy/hue-pour.html'), 'utf8').match(/<article class="policy">([\s\S]*?)<\/article>/)[1];
  if (words(live) !== words(policyMain(policySource()))) { console.error('  privacy/hue-pour.html: policy text differs from the source'); problems++; }
  else console.log('Hue Pour policy text matches the source word for word.');
  if (problems) { console.error(`Check failed with ${problems} problem(s).`); process.exit(1); }
  console.log(`Checked ${pages.length} pages: all local links, images and anchors resolve, no em dashes or placeholder text.`);
}
