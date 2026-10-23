// Case study, service and 404 templates.
import { site, projects, services } from './data.mjs';
import { esc, img, icons, emblem, phone, browser, caseVisual, caseCard, head, nav, footer } from './ui.mjs';

const ctaBand = (title = 'Building something similar?', text = "Tell us about your product. A senior engineer will reply within one business day.") => `
<section class="band band-light" aria-label="Start a project">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
      <a class="btn btn-dark" href="index.html#contact">Start a project ${icons.arrow}</a>
    </div>
  </div>
</section>`;

const storeLinks = (l) => [
  l.ios && `<a class="btn btn-ghost btn-sm" href="${l.ios}" target="_blank" rel="noopener">${icons.apple} App Store</a>`,
  l.play && `<a class="btn btn-ghost btn-sm" href="${l.play}" target="_blank" rel="noopener">${icons.playStore} Google Play</a>`,
  l.web && `<a class="btn btn-ghost btn-sm" href="${l.web}" target="_blank" rel="noopener">${icons.globe} Website</a>`,
].filter(Boolean).join('');

function gallery(p) {
  const v = p.visual;
  const android = p.tags[0] === 'android' && !p.tags.includes('ios');
  if (v.type === 'phone' && v.images.length > 1) return v.images.map((s, i) => phone(s, `${p.name} screen ${i + 1}`, { android })).join('');
  if (v.type === 'browser') return v.images.map((s, i) => browser(s, `${p.name} page ${i + 1}`, v.url)).join('');
  if (v.type === 'gallery') return v.images.map((s, i) => img(s, `${p.name} screen ${i + 1}`, { cls: 'shot-raw' })).join('');
  return '';
}

export function casePage(p, i) {
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const status = p.archived ? 'No longer on the stores' : p.links.ios || p.links.play ? 'Live on the stores' : p.links.web ? 'Live on the web' : p.source === 'upwork' ? 'Delivered for a client' : 'Delivered';
  const g = gallery(p);
  const jsonld = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.fullName, about: p.tagline,
    creator: { '@type': 'Organization', name: 'o9Tech', url: site.url }, url: `${site.url}/${p.page}`,
  })}</script>`;
  return `${head({ title: `${p.fullName} case study | o9Tech`, description: `${p.tagline} ${p.built}`.slice(0, 158), path: p.page, jsonld })}
<body>
${nav('work')}
<main id="main">
<section class="page-hero" style="--accent:${p.accent}">
  <div class="hero-bg" aria-hidden="true"><div class="hero-glow g1"></div><div class="hero-glow g2"></div></div>
  <div class="container">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="index.html">Home</a></li><li><a href="index.html#work">Work</a></li><li aria-current="page">${esc(p.name)}</li></ol>
    <div class="cs-hero">
      <div class="cs-copy">
        <span class="eyebrow" data-reveal>${esc(p.category)} · Case study</span>
        <div class="cs-title" data-reveal>${p.icon ? img(p.icon, `${p.name} app icon`, { lazy: false }) : ''}<h1 class="h-section">${esc(p.fullName)}</h1></div>
        <p class="lead" data-reveal>${esc(p.tagline)}</p>
        <dl class="cs-facts" data-reveal>
          <div><dt>Platforms</dt><dd>${esc(p.platforms.join(', '))}</dd></div>
          <div><dt>Category</dt><dd>${esc(p.category)}</dd></div>
          <div><dt>Status</dt><dd>${esc(status)}</dd></div>
        </dl>
        ${storeLinks(p.links) ? `<div class="cs-links" data-reveal>${storeLinks(p.links)}</div>` : ''}
        ${p.archived ? `<p class="archived-note" data-reveal>${icons.shield} This app has since been taken off the stores by its owner.</p>` : ''}
      </div>
      <div data-reveal="scale">${caseVisual(p, { stage: true })}</div>
    </div>
  </div>
</section>

<section class="band band-light" aria-labelledby="built-title">
  <div class="container cs-body">
    <div style="display:grid;gap:20px;align-content:start">
      <span class="eyebrow" data-reveal>The product</span>
      <h2 id="built-title" data-reveal>What we built</h2>
      <div class="chip-row" data-reveal>${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
    </div>
    <div class="cs-text">
      <p data-reveal>${esc(p.summary)}</p>
      <p data-reveal><strong>${esc(p.built)}</strong></p>
      <ul class="feature-list" data-stagger>
        ${p.features.map((f) => `<li data-reveal>${icons.check}<span>${esc(f)}</span></li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>
${g ? `
<section class="band band-dark" aria-labelledby="screens-title">
  <div class="container">
    <div class="section-head" style="margin-bottom:28px">
      <span class="eyebrow" data-reveal>Screens</span>
      <h2 id="screens-title" class="h-section" data-reveal>A closer look</h2>
    </div>
    <div class="gallery" tabindex="0" aria-label="${esc(p.name)} screens, scroll sideways" data-reveal>${g}</div>
    <p class="gallery-hint">Scroll sideways to see more.</p>
  </div>
</section>` : ''}
<section class="band band-dark" style="padding-top:${g ? '0' : 'clamp(72px,10vw,128px)'}" aria-label="More case studies">
  <div class="container next-case">
    <a href="${prev.page}"><small>Previous project</small><strong>${esc(prev.name)}</strong></a>
    <a href="${next.page}"><small>Next project</small><strong>${esc(next.name)}</strong></a>
  </div>
</section>
${ctaBand()}
</main>
${footer()}`;
}

export function servicePage(s) {
  const related = projects.filter((p) => p.tags.includes(s.tag) || (s.alsoTags || []).some((t) => p.tags.includes(t))).filter((p) => !p.archived).slice(0, 6);
  return `${head({ title: `${s.title} | o9Tech`, description: `${s.lead} ${s.body}`.slice(0, 158), path: s.page })}
<body>
${nav('services')}
<main id="main">
<section class="page-hero">
  <div class="hero-bg" aria-hidden="true"><div class="hero-glow g1"></div><div class="hero-glow g2"></div></div>
  <div class="container">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="index.html">Home</a></li><li><a href="index.html#services">Services</a></li><li aria-current="page">${esc(s.short)}</li></ol>
    <nav class="svc-nav" aria-label="Services" data-reveal style="margin-bottom:40px">${services.map((x) => `<a href="${x.page}"${x.slug === s.slug ? ' aria-current="page"' : ''}>${esc(x.short)}</a>`).join('')}</nav>
    <div class="svc-hero">
      <div style="display:grid;gap:22px">
        <span class="eyebrow" data-reveal>${esc(s.kicker)}</span>
        <h1 class="h-display" data-reveal>${esc(s.title)}</h1>
        <p class="lead" data-reveal>${esc(s.lead)}</p>
        <div class="hero-actions" data-reveal><a class="btn btn-primary" href="index.html#contact">Start a project ${icons.arrow}</a><a class="btn btn-ghost" href="#related">See related work</a></div>
      </div>
      <div class="chip-row" data-reveal style="align-content:end">${s.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    </div>
  </div>
</section>

<section class="band band-light" aria-labelledby="svc-what">
  <div class="container cs-body">
    <div style="display:grid;gap:20px;align-content:start">
      <span class="eyebrow" data-reveal>What we do</span>
      <h2 id="svc-what" data-reveal>How we help</h2>
      <p class="lead" data-reveal>${esc(s.body)}</p>
    </div>
    <ul class="svc-points" data-stagger>
      ${s.points.map((pt) => `<li data-reveal>${icons.check}<span>${esc(pt)}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="band band-light-2" id="related" aria-labelledby="svc-work">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal>Related work</span>
      <h2 id="svc-work" class="h-section" data-reveal>Shipped with this stack</h2>
    </div>
    <div class="work-grid">${related.map((p, i) => caseCard({ ...p, featured: false }, i)).join('')}</div>
  </div>
</section>
${ctaBand('Ready to talk it through?', 'Send us a short note about your product and goals. We reply within one business day.')}
</main>
${footer()}`;
}

export function notFoundPage() {
  return `${head({ title: 'Page not found | o9Tech', description: 'This page does not exist. Head back to the o9Tech home page.', path: '404.html' })}
<body>
${nav()}
<main id="main">
<section class="page-hero">
  <div class="hero-bg" aria-hidden="true"><div class="hero-glow g1"></div><div class="hero-glow g2"></div></div>
  <div class="container notfound">
    <div style="display:grid;gap:22px;justify-items:center">
      <span class="code" aria-hidden="true">404</span>
      <h1 class="h-section">This page took a wrong turn.</h1>
      <p class="lead">The link may be old, or the page has moved. Try the home page or our latest work.</p>
      <div class="hero-actions" style="justify-content:center"><a class="btn btn-primary" href="index.html">Go home ${icons.arrow}</a><a class="btn btn-ghost" href="index.html#work">See our work</a></div>
    </div>
  </div>
</section>
</main>
${footer()}`;
}
