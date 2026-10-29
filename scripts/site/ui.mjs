// Shared HTML building blocks for the o9Tech site generator.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { site, services } from './data.mjs';

export const ROOT = new URL('../../', import.meta.url).pathname;

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Read pixel size from a WebP or PNG file so every <img> gets width/height (no layout shift).
const sizeCache = new Map();
export function imgSize(rel) {
  if (sizeCache.has(rel)) return sizeCache.get(rel);
  const buf = readFileSync(join(ROOT, rel));
  let size = null;
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') size = { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    else if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      size = { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    } else if (chunk === 'VP8X') size = { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 };
  } else if (buf.readUInt32BE(0) === 0x89504e47) size = { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (!size) throw new Error(`Unknown image format: ${rel}`);
  sizeCache.set(rel, size);
  return size;
}

// Smaller copies made by scripts/site/resize-images.mjs sit next to the original as
// name-640.webp (phone screenshots) and name-192.webp (app icons). When one exists the
// <img> gets a srcset, so phones download the small file instead of the full one.
const VARIANTS = [192, 640];
const srcset = (rel, w) => {
  if (!rel.endsWith('.webp')) return '';
  const found = VARIANTS.filter((n) => n < w && existsSync(join(ROOT, rel.replace(/\.webp$/, `-${n}.webp`))));
  return found.length ? [...found.map((n) => `${rel.replace(/\.webp$/, `-${n}.webp`)} ${n}w`), `${rel} ${w}w`].join(', ') : '';
};
export const img = (rel, alt, { cls = '', lazy = true, sizes = '', priority = false } = {}) => {
  const { w, h } = imgSize(rel);
  const set = srcset(rel, w);
  // Icons are drawn at 44 to 92px and phone screenshots at about 110 to 300px.
  const size = sizes || (set ? (h > w ? '(max-width: 600px) 45vw, 300px' : '96px') : '');
  return `<img src="${rel}"${set ? ` srcset="${set}"` : ''} width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${lazy && !priority ? ' loading="lazy"' : ''} decoding="async"${priority ? ' fetchpriority="high"' : ''}${size ? ` sizes="${size}"` : ''}>`;
};

// JSON-LD block. "<" is escaped so text can never close the script tag early.
export const ld = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Shortens text for a meta description without cutting a word in half: it keeps whole
// sentences when they fit, otherwise it stops at the last full word.
export function clip(text, max = 155) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const sentences = t.match(/[^.!?]+[.!?]+/g) || [];
  let out = '';
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  if (out.trim().length >= 70) return out.trim();
  return t.slice(0, max).replace(/[\s,;:]+\S*$/, '').replace(/[,;:]$/, '') + '.';
}

const svg = (body, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${body}</svg>`;
export const icons = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowLeft: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  star: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>',
  phone: svg('<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>'),
  layers: svg('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>'),
  browser: svg('<rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01"/>'),
  spark: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>'),
  chain: svg('<path d="M9.5 14.5l5-5"/><path d="M11 6.5l1.6-1.6a4 4 0 015.6 5.6L16.6 12"/><path d="M13 17.5l-1.6 1.6a4 4 0 01-5.6-5.6L7.4 12"/>'),
  cloud: svg('<path d="M7 18.5h10.5a4 4 0 00.6-7.95A6 6 0 006.4 9.1 4.7 4.7 0 007 18.5z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>'),
  pin: svg('<path d="M12 21s-7-6.1-7-11.5a7 7 0 0114 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  call: svg('<path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 005.5 5.5l1.4-2.3 4.6 1.8V18a2.5 2.5 0 01-2.5 2.5A15.5 15.5 0 012.5 6 2.5 2.5 0 015 3.5z"/>'),
  globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'),
  pause: svg('<path d="M9 6v12M15 6v12"/>'),
  play: svg('<path d="M8 5.5v13l10-6.5z"/>'),
  shield: svg('<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>'),
  code: svg('<path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 5l-3 14"/>'),
  db: svg('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/>'),
  lock: svg('<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/>'),
  bolt: svg('<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>'),
  card: svg('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/>'),
  eye: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  stream: svg('<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="M10 9v4.5l4-2.25zM8 21h8"/>'),
  gear: svg('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M2.5 12h3M18.5 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/>'),
  seat: svg('<path d="M7 4h10v8H7zM5 12h14v3H5zM7 15v5M17 15v5"/>'),
  cut: svg('<circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M8.5 16L19 4M15.5 16L5 4"/>'),
  book: svg('<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5zM4 20.5A2.5 2.5 0 016.5 23H20"/>'),
  drop: svg('<path d="M12 3.5s6.5 7 6.5 11.5a6.5 6.5 0 01-13 0C5.5 10.5 12 3.5 12 3.5z"/><path d="M9 15.5a3 3 0 003 3"/>'),
  target: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  calendar: svg('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 14.5l2.2 2.2 4.3-4.4"/>'),
  clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  postcard: svg('<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M6 10.5h6M6 14h4"/><rect x="15" y="8" width="3.5" height="4" rx=".5"/>'),
  apple: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.5-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-4.1zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z"/></svg>',
  playStore: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.2 2.6c-.3.3-.4.7-.4 1.2v16.4c0 .5.1.9.4 1.2l9.2-9.4zM14.6 13.2l2.9 2.9-11.4 6.5c-.4.2-.8.2-1.1.1zM14.6 10.8L5 1.3c.3-.1.7-.1 1.1.1l11.4 6.5zM18.9 8.7l2.6 1.5c.9.5.9 1.2 0 1.7l-2.6 1.5-3.1-3.2z"/></svg>',
};

// Custom vector badges (no third-party logos).
export const badges = {
  topRated: `<svg class="badge-svg" viewBox="0 0 210 56" role="img" aria-label="Top Rated Plus on Upwork">
  <rect x=".5" y=".5" width="209" height="55" rx="15.5" fill="#15151a" stroke="rgba(255,255,255,.14)"/>
  <path d="M28 10l13 5v9.5c0 8-5.6 14.4-13 16.5-7.4-2.1-13-8.5-13-16.5V15z" fill="#fef119"/>
  <path d="M28 18.4l2.3 4.7 5.2.7-3.8 3.6 1 5.1-4.7-2.5-4.7 2.5 1-5.1-3.8-3.6 5.2-.7z" fill="#111114"/>
  <text x="52" y="25" fill="#f4f4f5" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="600" letter-spacing="-.2">Top Rated Plus</text>
  <text x="52" y="41" fill="#a1a1aa" font-family="JetBrains Mono, monospace" font-size="10.5" letter-spacing=".6">ON UPWORK</text>
</svg>`,
  jobSuccess: `<svg class="badge-svg" viewBox="0 0 210 56" role="img" aria-label="100% Job Success Score on Upwork">
  <rect x=".5" y=".5" width="209" height="55" rx="15.5" fill="#15151a" stroke="rgba(255,255,255,.14)"/>
  <circle cx="28" cy="28" r="14" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="4"/>
  <circle cx="28" cy="28" r="14" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" transform="rotate(-90 28 28)"/>
  <path d="M22.5 28.5l3.6 3.6 7.4-7.6" fill="none" stroke="#f4f4f5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="52" y="25" fill="#f4f4f5" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="600" letter-spacing="-.2">100% Job Success</text>
  <text x="52" y="41" fill="#a1a1aa" font-family="JetBrains Mono, monospace" font-size="10.5" letter-spacing=".6">UPWORK SCORE</text>
</svg>`,
  verified: `<svg class="badge-svg" viewBox="0 0 228 56" role="img" aria-label="Verified client reviews from Upwork contracts">
  <rect x=".5" y=".5" width="227" height="55" rx="15.5" fill="#15151a" stroke="rgba(255,255,255,.14)"/>
  <path d="M28 11.5l3.3 2.4 4-.4 1.6 3.7 3.7 1.6-.4 4 2.4 3.3-2.4 3.3.4 4-3.7 1.6-1.6 3.7-4-.4-3.3 2.4-3.3-2.4-4 .4-1.6-3.7-3.7-1.6.4-4L12.3 28l2.4-3.3-.4-4 3.7-1.6 1.6-3.7 4 .4z" fill="#3b82f6"/>
  <path d="M22.8 28.2l3.6 3.6 7-7.2" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="52" y="25" fill="#f4f4f5" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="600" letter-spacing="-.2">Verified client reviews</text>
  <text x="52" y="41" fill="#a1a1aa" font-family="JetBrains Mono, monospace" font-size="10.5" letter-spacing=".6">REAL UPWORK CONTRACTS</text>
</svg>`,
};

// Monogram emblems for the tech stack (original artwork, no vendor logos).
const emblemColors = { Sw: '#f97316', SU: '#3b82f6', Kt: '#8b5cf6', JC: '#22c55e', Fl: '#38bdf8', RN: '#22d3ee', KMP: '#a855f7', Nx: '#e4e4e7', TS: '#3b82f6', No: '#84cc16', Py: '#facc15', AI: '#fef119', Sol: '#a78bfa', AWS: '#f59e0b', Dk: '#0ea5e9', Pg: '#60a5fa' };
export const emblem = (code, label) => {
  const c = emblemColors[code] || '#fef119';
  return `<span class="emblem" title="${esc(label)}"><svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path d="M20 2.5l15.2 8.75v17.5L20 37.5 4.8 28.75v-17.5z" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="1.4"/><text x="20" y="24.5" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${code.length > 2 ? 9.5 : 12}" font-weight="600" fill="${c}">${code}</text></svg><span>${esc(label)}</span></span>`;
};

export const stars = (n = 5) => `<span class="stars" role="img" aria-label="Rated ${n} out of 5">${icons.star.repeat(n)}</span>`;

// Device frames
export const phone = (src, alt, { cls = '', android = false, priority = false, lazy = true } = {}) =>
  `<div class="device-phone${android ? ' is-android' : ''}${cls ? ` ${cls}` : ''}"><div class="screen">${img(src, alt, { priority, lazy })}</div></div>`;

export const browser = (src, alt, url = '') =>
  `<div class="device-browser"><div class="bar" aria-hidden="true"><span class="dots"><i></i><i></i><i></i></span><span class="url">${esc(url)}</span></div><div class="viewport">${img(src, alt)}</div></div>`;

const isAndroidFirst = (p) => p.tags[0] === 'android' && !p.tags.includes('ios');

export function caseVisual(p, { stage = false } = {}) {
  const v = p.visual;
  const style = `--accent:${p.accent}`;
  let inner = '';
  if (v.type === 'phone') {
    const imgs = v.images.slice(0, 3);
    const names = ['ph-a', 'ph-b', 'ph-c'];
    inner = imgs.map((src, i) => phone(src, i === 0 ? `${p.name} app screen` : '', { cls: names[i], android: isAndroidFirst(p) })).join('');
  } else if (v.type === 'browser') {
    inner = browser(v.images[0], `${p.name} web app`, v.url);
  } else if (v.type === 'mockup') {
    inner = img(v.images[0], `${p.name} app screens`, { cls: 'mockup-img' });
  } else if (v.type === 'gallery') {
    inner = img(v.cover, `${p.name} app screen`, { cls: 'mockup-img' });
  } else {
    inner = `<div class="type-art" aria-hidden="true">${icons[v.glyph] || icons.phone}<span class="word">${esc(p.name)}</span></div>`;
  }
  const icon = p.icon && !stage ? img(p.icon, '', { cls: 'case-icon' }) : '';
  const flag = p.archived ? '<span class="case-flag"><span class="chip">Archived</span></span>' : p.source === 'upwork' ? '<span class="case-flag"><span class="chip">Upwork project</span></span>' : '';
  return `<div class="case-visual${stage ? ' cs-stage' : ''}${v.type === 'browser' ? ' is-scrollable' : ''}" style="${style}">${icon}${flag}${inner}</div>`;
}

export function caseCard(p, i) {
  const tags = p.tags.join(' ');
  return `<a class="case-card" href="${p.page}" data-tags="${tags}" data-feature="${p.featured && (i === 0 || i === 5) ? 'true' : 'false'}" style="view-transition-name: case-${p.slug}" data-reveal>
  ${caseVisual(p)}
  <div class="case-body">
    <div class="case-meta"><span>${esc(p.category)}</span><span>${esc(p.platforms.join(' · '))}</span></div>
    <h3>${esc(p.name)} ${icons.arrow}</h3>
    <p>${esc(p.tagline)}</p>
    <div class="chip-row">${p.stack.slice(0, 3).map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
  </div>
</a>`;
}

// Page shell
export function head({ title, description, path = '', image = 'assets/o9/img/og.jpg', jsonld = '', noindex = false }) {
  const url = `${site.url}/${path}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#09090b">
<meta property="og:type" content="website">
<meta property="og:site_name" content="o9Tech">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="assets/o9/img/favicon-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="assets/o9/img/favicon-512.png">
<link rel="apple-touch-icon" href="assets/o9/img/apple-touch-icon.png">
<link rel="preload" href="/assets/o9/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/o9/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/o9/css/site.css?v=${BUILD_ID}">
<script>document.documentElement.classList.add('js')</script>
${jsonld}
</head>`;
}

// Cache-busting version: changes only when the styles or the script change.
const cssDir = join(ROOT, 'scripts/site/css');
export const BUILD_ID = createHash('sha1')
  .update(readdirSync(cssDir).sort().map((f) => readFileSync(join(cssDir, f), 'utf8')).join(''))
  .update(readFileSync(join(ROOT, 'assets/o9/js/site.js')))
  .digest('hex').slice(0, 8);

export function nav(current = '') {
  const links = [
    ['index.html#work', 'Work', 'work'],
    ['index.html#services', 'Services', 'services'],
    ['index.html#architecture', 'Architecture', 'architecture'],
    ['index.html#reviews', 'Reviews', 'reviews'],
    ['index.html#process', 'Process', 'process'],
  ];
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="nav" role="banner">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="o9Tech home">
      <img src="assets/o9/img/mark-light.webp" width="${imgSize('assets/o9/img/mark-light.webp').w}" height="${imgSize('assets/o9/img/mark-light.webp').h}" alt="">
      <span>o9Tech</span>
    </a>
    <nav aria-label="Main">
      <ul class="nav-links" id="nav-links">
        ${links.map(([href, label, key]) => `<li><a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a></li>`).join('\n        ')}
        <li class="nav-mobile-cta"><a class="btn btn-primary" href="index.html#contact">Start a project</a></li>
      </ul>
    </nav>
    <div class="nav-cta">
      <a class="btn btn-primary btn-sm" href="index.html#contact">Start a project ${icons.arrow}</a>
      <button class="nav-toggle" type="button" aria-controls="nav-links" aria-expanded="false" aria-label="Open menu"><span></span></button>
    </div>
  </div>
</header>`;
}

export function footer() {
  return `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="index.html" aria-label="o9Tech home">
          <img src="assets/o9/img/mark-light.webp" width="${imgSize('assets/o9/img/mark-light.webp').w}" height="${imgSize('assets/o9/img/mark-light.webp').h}" alt="">
          <span>o9Tech</span>
        </a>
        <p>${esc(site.about)}</p>
      </div>
      <div>
        <h3>Services</h3>
        <ul>${services.map((s) => `<li><a href="${s.page}">${esc(s.short)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h3>Studio</h3>
        <ul>
          <li><a href="index.html#work">Our work</a></li>
          <li><a href="index.html#reviews">Client reviews</a></li>
          <li><a href="index.html#process">How we work</a></li>
          <li><a href="index.html#faq">FAQ</a></li>
          <li><a href="${site.upwork}" target="_blank" rel="noopener">Hire us on Upwork</a></li>
        </ul>
      </div>
      <div>
        <h3>Our apps</h3>
        <ul>
          <li><a href="/hue-pour">Hue Pour</a></li>
          <li><a href="/pigeon-post">Pigeon Post</a></li>
          <li><a href="/privacy/hue-pour">Hue Pour privacy</a></li>
          <li><a href="/privacy/pigeon-post">Pigeon Post privacy</a></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul class="footer-contact">
          <li>${esc(site.address)}</li>
          <li><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></li>
          <li><a href="mailto:${site.email}">${esc(site.email)}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>${new Date().getFullYear()}</span> o9Tech. All rights reserved.</span>
      <span>Built in Lahore, shipped worldwide.</span>
    </div>
    <div class="footer-word" aria-hidden="true">o9Tech</div>
  </div>
</footer>
<script src="assets/o9/js/site.js?v=${BUILD_ID}" defer></script>
</body>
</html>`;
}

// Brackets in data.mjs record which words we changed; the page shows the text without them
// (the owners chose not to show a note about it on the page).
export const reviewHtml = (text) => esc(text).replace(/\[([^\]]+)\]/g, '$1');
