// Pigeon Post product page and its privacy policy page. Same layout as the Hue Pour pages.
import { site, pigeonPost, PIGEON_POST_LIVE } from './data.mjs';
import { esc, img, icons, head, nav, footer } from './ui.mjs';
import { storeBadges, policySource, policyMain } from './page-hue.mjs';

export const pigeonPolicySource = () => policySource('pigeon-post-privacy.html');

export function pigeonPostPage() {
  return `${head({
    title: 'Pigeon Post: Idle Travel Pet',
    description: 'Pigeon Post is an idle pet game for iPhone and Android. Send pigeons to real cities and they come home with postcards.',
    path: 'pigeon-post',
    image: pigeonPost.feature,
  })}
<body class="page-hue page-pigeon" style="--accent:${pigeonPost.accent}">
${nav()}
<main id="main">
<section class="page-hero hue-hero pigeon-hero" aria-labelledby="pigeon-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-glow g1"></div><div class="hero-glow g2"></div></div>
  <div class="container hue-grid">
    <div class="hue-copy">
      <span class="eyebrow">Idle pet game · iPhone and Android</span>
      <div class="hue-title">${img(pigeonPost.icon, 'Pigeon Post app icon', { lazy: false, priority: true })}<h1 id="pigeon-title" class="h-display">Pigeon Post</h1></div>
      <p class="lead">${esc(pigeonPost.line)}</p>
      ${storeBadges(pigeonPost, PIGEON_POST_LIVE)}
      ${PIGEON_POST_LIVE ? '<p class="hue-note">Free on iPhone and Android.</p>' : '<p class="hue-note">Coming soon to the App Store and Google Play. Free to play.</p>'}
    </div>
    <figure class="hue-art">${img(pigeonPost.feature, 'Pigeon Post: postcards from Tokyo, Sydney and Paris, with a pigeon on one of them', { lazy: false })}</figure>
  </div>
</section>

<section class="band band-light hue-band" aria-labelledby="pigeon-how">
  <div class="container">
    <h2 id="pigeon-how" class="h-section hue-h2">How Pigeon Post works</h2>
    <ul class="hue-points">
      ${pigeonPost.points.map((p) => `<li><span class="hue-point-icon" aria-hidden="true">${icons[p.icon]}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('\n      ')}
    </ul>
    <p class="pigeon-quiet"><span aria-hidden="true">${icons.lock}</span>${esc(pigeonPost.quietLine)}</p>
  </div>
</section>

<section class="band band-light-2 hue-band" aria-labelledby="pigeon-help">
  <div class="container hue-help">
    <div>
      <h2 id="pigeon-help" class="h-card">Privacy and support</h2>
      <p class="muted">Pigeon Post has no account and no sign-in. Questions about the game? A person reads every message.</p>
    </div>
    <ul class="hue-links">
      <li><a href="/privacy/pigeon-post">${icons.shield}<span>Privacy policy</span></a></li>
      <li><a href="${site.url}/#contact">${icons.mail}<span>Support</span></a></li>
      <li><a href="mailto:support@o9tech.com">${icons.mail}<span>support@o9tech.com</span></a></li>
    </ul>
  </div>
</section>
</main>
${footer()}`;
}

export function pigeonPrivacyPage() {
  const src = pigeonPolicySource();
  const title = src.match(/<title>([^<]+)<\/title>/)[1];
  return `${head({
    title,
    description: 'How Pigeon Post handles your data: no account, your loft stays on your phone, anonymous crash reports and game statistics, and the data the ads collect.',
    path: 'privacy/pigeon-post',
    image: pigeonPost.feature,
  })}
<body class="page-policy page-pigeon-policy">
${nav()}
<main id="main">
<section class="band band-light policy-band">
  <div class="container">
    <ol class="crumbs crumbs-light" aria-label="Breadcrumb"><li><a href="index.html">Home</a></li><li><a href="/pigeon-post">Pigeon Post</a></li><li aria-current="page">Privacy policy</li></ol>
    <article class="policy">
${policyMain(src)}
    </article>
  </div>
</section>
</main>
${footer()}`;
}
