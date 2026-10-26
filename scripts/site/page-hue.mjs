// Hue Pour product page and its privacy policy page.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { site, huePour, HUE_POUR_LIVE } from './data.mjs';
import { ROOT, esc, img, icons, head, nav, footer, ld } from './ui.mjs';

// The pages show WebP copies of the store art; the PNG stays for link previews (og:image).
export const webp = (rel) => rel.replace(/\.png$/, '.webp');

// MobileApplication JSON-LD for a game page. Store links and the free price only appear
// once the game is live, because before launch neither is true yet.
export const gameJsonld = (game, live, { name, path, description }) => ld({
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${site.url}/${path}#app`,
  name, description, url: `${site.url}/${path}`,
  image: `${site.url}/${game.feature}`,
  applicationCategory: 'GameApplication',
  operatingSystem: 'iOS, Android',
  publisher: { '@id': `${site.url}/#organization` },
  ...(live ? { sameAs: [game.appStore, game.googlePlay], offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' } } : {}),
});

// Official store badges, used unmodified. Greyed out with no link until launch.
// Shared by every game page; the badge files live in the Hue Pour folder.
export function storeBadges(game = huePour, live = HUE_POUR_LIVE) {
  const badges = [
    { href: game.appStore, store: 'App Store', html: '<img src="assets/img/hue-pour/app-store-badge.svg" width="144" height="48" alt="Download on the App Store">' },
    { href: game.googlePlay, store: 'Google Play', html: '<img src="assets/img/hue-pour/google-play-badge.png" width="145" height="56" alt="Get it on Google Play">' },
  ];
  if (live) {
    return `<div class="store-badges">${badges.map((b) => `<a class="store-badge" href="${b.href}" target="_blank" rel="noopener">${b.html}</a>`).join('')}</div>`;
  }
  return `<div class="store-badges is-soon">${badges.map((b) => `<span class="store-badge" aria-label="${b.store}, coming soon">${b.html}<span class="soon-label" aria-hidden="true">Coming soon</span></span>`).join('')}</div>`;
}

export function huePourPage() {
  return `${head({
    title: 'Hue Pour: Paint Mixing Puzzle',
    description: 'Hue Pour is a paint mixing puzzle game for iPhone and Android. Pigments mix like real paint, and one Daily Palette swatch a day is the same for everyone.',
    path: 'hue-pour',
    image: huePour.feature,
    jsonld: gameJsonld(huePour, HUE_POUR_LIVE, { name: 'Hue Pour', path: 'hue-pour', description: huePour.line }),
  })}
<body class="page-hue" style="--accent:${huePour.accent}">
${nav()}
<main id="main">
<section class="page-hero hue-hero" aria-labelledby="hue-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-glow g1"></div><div class="hero-glow g2"></div></div>
  <div class="container hue-grid">
    <div class="hue-copy">
      <span class="eyebrow">Paint mixing puzzle · iPhone and Android</span>
      <div class="hue-title">${img(webp(huePour.icon), 'Hue Pour app icon', { lazy: false, sizes: '92px' })}<h1 id="hue-title" class="h-display">Hue Pour</h1></div>
      <p class="lead">${esc(huePour.line)}</p>
      ${storeBadges()}
      ${HUE_POUR_LIVE ? '<p class="hue-note">Free on iPhone and Android.</p>' : '<p class="hue-note">Coming soon to the App Store and Google Play. Free to play.</p>'}
    </div>
    <figure class="hue-art">${img(webp(huePour.feature), 'Hue Pour: a mixing bowl of blue and yellow paint swirling into green, next to a green target swatch', { priority: true })}</figure>
  </div>
</section>

<section class="band band-light hue-band" aria-labelledby="hue-how">
  <div class="container">
    <p class="hue-today"><span class="hue-today-icon" aria-hidden="true">${icons.calendar}</span><span>${esc(huePour.shareLine)}</span></p>
    <h2 id="hue-how" class="h-section hue-h2">How Hue Pour works</h2>
    <ul class="hue-points">
      ${huePour.points.map((p) => `<li><span class="hue-point-icon" aria-hidden="true">${icons[p.icon]}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="band band-light-2 hue-band" aria-labelledby="hue-help">
  <div class="container hue-help">
    <div>
      <h2 id="hue-help" class="h-card">Privacy and support</h2>
      <p class="muted">Hue Pour is made by o9Tech, a product engineering studio in Lahore, Pakistan. It has no account and no sign-in. Questions about the game? A person reads every message.</p>
    </div>
    <ul class="hue-links">
      <li><a href="/privacy/hue-pour">${icons.shield}<span>Privacy policy</span></a></li>
      <li><a href="${site.url}/#contact">${icons.mail}<span>Support</span></a></li>
      <li><a href="mailto:support@o9tech.com">${icons.mail}<span>support@o9tech.com</span></a></li>
      <li><a href="/pigeon-post">${icons.spark}<span>Also from o9Tech: Pigeon Post</span></a></li>
    </ul>
  </div>
</section>
</main>
${footer()}`;
}

// The policy text is copied word for word from the game repo (scripts/site/content).
export const policySource = (file = 'hue-pour-privacy.html') => readFileSync(join(ROOT, 'scripts/site/content', file), 'utf8');
// Some policies wrap their text in <main>, others put it straight in <body>.
export const policyMain = (html) => (html.match(/<main>([\s\S]*?)<\/main>/) || html.match(/<body>([\s\S]*?)<\/body>/))[1].trim();

export function huePrivacyPage() {
  const src = policySource();
  const title = src.match(/<title>([^<]+)<\/title>/)[1];
  return `${head({
    title,
    description: 'How Hue Pour handles your data: no account, progress stays on your phone, and only Google AdMob collects data to show ads.',
    path: 'privacy/hue-pour',
    image: huePour.feature,
  })}
<body class="page-policy">
${nav()}
<main id="main">
<section class="band band-light policy-band">
  <div class="container">
    <ol class="crumbs crumbs-light" aria-label="Breadcrumb"><li><a href="index.html">Home</a></li><li><a href="/hue-pour">Hue Pour</a></li><li aria-current="page">Privacy policy</li></ol>
    <article class="policy">
${policyMain(src)}
    </article>
  </div>
</section>
</main>
${footer()}`;
}
