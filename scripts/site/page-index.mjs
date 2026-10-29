// Home page template.
import { site, projects, reviews, services, process, faqs, filters, upworkStats } from './data.mjs';
import { esc, img, icons, badges, emblem, stars, phone, caseCard, head, nav, footer, reviewHtml, ld } from './ui.mjs';

const art = {
  phone: `<svg viewBox="0 0 360 150" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.5" opacity=".9"><rect x="40" y="8" width="70" height="138" rx="14"/><rect x="128" y="22" width="70" height="138" rx="14" opacity=".5"/></g><rect x="62" y="14" width="26" height="5" rx="2.5" fill="currentColor" opacity=".7"/><g fill="#fef119"><rect x="52" y="34" width="46" height="8" rx="4"/><rect x="52" y="104" width="30" height="20" rx="6" opacity=".9"/></g><g fill="currentColor" opacity=".35"><rect x="52" y="50" width="38" height="5" rx="2.5"/><rect x="52" y="60" width="44" height="5" rx="2.5"/><rect x="52" y="70" width="30" height="5" rx="2.5"/><rect x="140" y="48" width="44" height="40" rx="8"/><rect x="140" y="96" width="34" height="5" rx="2.5"/></g><g font-family="JetBrains Mono, monospace" font-size="9.5" fill="currentColor" opacity=".75"><text x="218" y="48">struct Feed: View {</text><text x="228" y="64">var body: some View</text><text x="218" y="96">@Composable fun Feed()</text><text x="228" y="112">LazyColumn { }</text></g></svg>`,
  layers: `<svg viewBox="0 0 320 120" aria-hidden="true" focusable="false"><g font-family="JetBrains Mono, monospace" font-size="10.5"><g transform="translate(20 70)"><path d="M0 18L70 0l70 18-70 18z" fill="#fef119" opacity=".95"/><text x="52" y="22" fill="#111114">shared</text></g><g transform="translate(20 40)" opacity=".7"><path d="M0 18L70 0l70 18-70 18z" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="58" y="22" fill="currentColor">iOS</text></g><g transform="translate(20 10)" opacity=".45"><path d="M0 18L70 0l70 18-70 18z" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="48" y="22" fill="currentColor">Android</text></g><g fill="currentColor" opacity=".7"><text x="190" y="32">Flutter</text><text x="190" y="56">React Native</text><text x="190" y="80">KMP</text></g><path d="M176 28h8M176 52h8M176 76h8" stroke="#fef119" stroke-width="2"/></g></svg>`,
  spark: `<svg viewBox="0 0 220 120" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-opacity=".3"><path d="M30 30L100 60L30 90M100 60l80-35M100 60l80 35M100 60h80"/></g><g fill="currentColor"><circle cx="30" cy="30" r="5" opacity=".6"/><circle cx="30" cy="90" r="5" opacity=".6"/><circle cx="180" cy="25" r="5" opacity=".6"/><circle cx="180" cy="60" r="5" opacity=".6"/><circle cx="180" cy="95" r="5" opacity=".6"/></g><circle cx="100" cy="60" r="16" fill="#fef119"/><path d="M100 50l2.6 7.4L110 60l-7.4 2.6L100 70l-2.6-7.4L90 60l7.4-2.6z" fill="#111114"/></svg>`,
  browser: `<svg viewBox="0 0 220 120" aria-hidden="true" focusable="false"><rect x="10" y="8" width="200" height="106" rx="10" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"/><path d="M10 26h200" stroke="currentColor" stroke-opacity=".3"/><g fill="currentColor" opacity=".5"><circle cx="22" cy="17" r="3"/><circle cx="32" cy="17" r="3"/><circle cx="42" cy="17" r="3"/></g><path d="M28 94l30-22 26 12 30-30 28 16 36-26" fill="none" stroke="#fef119" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><g fill="currentColor" opacity=".2"><rect x="28" y="38" width="60" height="6" rx="3"/></g></svg>`,
  chain: `<svg viewBox="0 0 320 90" aria-hidden="true" focusable="false"><g font-family="JetBrains Mono, monospace" font-size="9.5"><g fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"><rect x="12" y="20" width="76" height="50" rx="10"/><rect x="122" y="20" width="76" height="50" rx="10"/></g><rect x="232" y="20" width="76" height="50" rx="10" fill="#fef119"/><path d="M88 45h34M198 45h34" stroke="currentColor" stroke-opacity=".5" stroke-dasharray="3 4"/><g fill="currentColor" opacity=".75"><text x="24" y="40">#0x8f..</text><text x="24" y="56">vote: 1</text><text x="134" y="40">#0x3a..</text><text x="134" y="56">vote: 1</text></g><g fill="#111114"><text x="244" y="40">#0x91..</text><text x="244" y="56">verified</text></g></g></svg>`,
  data: `<svg viewBox="0 0 320 96" aria-hidden="true" focusable="false"><g font-family="JetBrains Mono, monospace" font-size="9.5"><g fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"><rect x="10" y="8" width="58" height="22" rx="6"/><rect x="10" y="37" width="58" height="22" rx="6"/><rect x="10" y="66" width="58" height="22" rx="6"/></g><g fill="currentColor" opacity=".75"><text x="27" y="23">apps</text><text x="27" y="52">APIs</text><text x="30" y="81">SaaS</text></g><path d="M68 19c30 0 30 29 52 29M68 48h52M68 77c30 0 30-29 52-29" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-dasharray="3 4"/><ellipse cx="152" cy="26" rx="30" ry="8" fill="#fef119"/><path d="M122 26v44c0 4.4 13.4 8 30 8s30-3.6 30-8V26" fill="#fef119" opacity=".9"/><text x="131" y="56" fill="#111114">warehouse</text><path d="M182 48h30" stroke="#fef119" stroke-width="2"/><g fill="currentColor"><rect x="224" y="58" width="14" height="24" rx="3" opacity=".45"/><rect x="246" y="44" width="14" height="38" rx="3" opacity=".6"/><rect x="268" y="30" width="14" height="52" rx="3" opacity=".75"/><rect x="290" y="16" width="14" height="66" rx="3"/></g></g></svg>`,
  cloud: `<svg viewBox="0 0 320 90" aria-hidden="true" focusable="false"><g font-family="JetBrains Mono, monospace" font-size="10"><g fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.4"><rect x="10" y="28" width="62" height="34" rx="17"/><rect x="92" y="28" width="62" height="34" rx="17"/><rect x="174" y="28" width="62" height="34" rx="17"/></g><rect x="256" y="28" width="56" height="34" rx="17" fill="#22c55e"/><g fill="currentColor" opacity=".8"><text x="26" y="49">build</text><text x="111" y="49">test</text><text x="187" y="49">deploy</text></g><text x="268" y="49" fill="#052e16">live</text><path d="M72 45h20M154 45h20M236 45h20" stroke="#fef119" stroke-width="2"/></g></svg>`,
};

const archCols = [
  { title: 'Apps', nodes: [
    { id: 'ios', code: 'Sw', name: 'iOS', sub: 'Swift · SwiftUI', to: 'gateway auth realtime', detail: 'Native iOS apps in Swift and SwiftUI, with deep device features like NFC, Screen Time, Apple Pay and VoIP.' },
    { id: 'android', code: 'Kt', name: 'Android', sub: 'Kotlin · Compose', to: 'gateway auth realtime', detail: 'Native Android apps in Kotlin and Jetpack Compose, from fintech to hardware integrations like thermal printers.' },
    { id: 'flutter', code: 'Fl', name: 'Flutter', sub: 'Dart', to: 'gateway realtime', detail: 'One Flutter codebase for both stores, like the live auction app Trading Card TV.' },
    { id: 'rn', code: 'RN', name: 'React Native', sub: 'Expo · EAS', to: 'gateway auth', detail: 'React Native and Expo apps with over-the-air updates, built or rescued and shipped to both stores.' },
    { id: 'web', code: 'Nx', name: 'Web', sub: 'Next.js · React', to: 'gateway auth', detail: 'Server-rendered web apps, dashboards and admin tools in Next.js and React.' },
  ] },
  { title: 'Edge & APIs', nodes: [
    { id: 'gateway', name: 'API layer', sub: 'REST · GraphQL', icon: 'code', to: 'payments data jobs', detail: 'Typed REST and GraphQL APIs in Node.js and FastAPI that every client shares.' },
    { id: 'auth', name: 'Auth', sub: 'OAuth · JWT · passkeys', icon: 'lock', to: 'data', detail: 'Sign in with Apple, Google and email, plus banking-grade sessions, SSL pinning and passport NFC checks.' },
    { id: 'realtime', name: 'Realtime', sub: 'WebSockets · LiveKit', icon: 'stream', to: 'data jobs', detail: 'Live video, chat, bidding and sync with sub-second latency.' },
  ] },
  { title: 'Services & data', nodes: [
    { id: 'payments', name: 'Payments', sub: 'Stripe · Apple Pay', icon: 'card', to: 'cloud', detail: 'Cards, wallets, subscriptions with RevenueCat, and local gateways with 3D Secure.' },
    { id: 'data', name: 'Data', sub: 'Postgres · Supabase · Firebase', icon: 'db', to: 'llm vector cloud', detail: 'Relational and realtime data stores, designed for clean migrations and fast queries.' },
    { id: 'jobs', name: 'Jobs & push', sub: 'Queues · APNs · FCM', icon: 'bolt', to: 'vision cloud', detail: 'Background jobs, scheduled work and push notifications that arrive on time.' },
  ] },
  { title: 'AI & cloud', nodes: [
    { id: 'llm', name: 'LLM layer', sub: 'OpenAI · Anthropic', icon: 'spark', detail: 'Assistants, writing and summarizing features with guardrails, evaluation and cost control.' },
    { id: 'vector', name: 'Retrieval', sub: 'Vector search · RAG', icon: 'eye', detail: 'AI that answers from your own documents and data, not guesses.' },
    { id: 'vision', name: 'Vision & OCR', sub: 'Cloud Vision', icon: 'eye', detail: 'Image understanding, ID and document reading, and computer vision pipelines.' },
    { id: 'cloud', name: 'Cloud & CI/CD', sub: 'AWS · GCP · Docker', icon: 'cloud', detail: 'Infrastructure as code, automated builds for web and mobile, and monitoring.' },
  ] },
];

const archNode = (n) => `<button type="button" class="arch-node" data-id="${n.id}"${n.to ? ` data-to="${n.to}"` : ''} data-detail="${esc(n.detail)}">
          <span class="glyph">${n.code ? `<span class="mono" style="font-size:.75rem;font-weight:600">${n.code}</span>` : icons[n.icon]}</span>
          <span><strong>${esc(n.name)}</strong><small>${esc(n.sub)}</small></span>
        </button>`;

export function indexPage() {
  const byslug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const svc = Object.fromEntries(services.map((x) => [x.slug, x]));
  const marqueeApps = projects.filter((p) => p.icon);
  const marqueeItems = marqueeApps.map((p) => `<a class="marquee-item" href="${p.page}">${img(p.icon, '')}<span>${esc(p.name)}<small>${esc(p.category)}</small></span></a>`).join('');
  const marqueeClone = marqueeApps.map((p) => `<a class="marquee-item" href="${p.page}" tabindex="-1">${img(p.icon, '')}<span>${esc(p.name)}<small>${esc(p.category)}</small></span></a>`).join('');
  const counts = Object.fromEntries(filters.map((f) => [f.id, f.id === 'all' ? projects.length : projects.filter((p) => p.tags.includes(f.id)).length]));
  // Reviews newest first; the spotlight shows a hand-picked mix from both co-founders' profiles.
  const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  const pick = ['React Native app from AI prototype to the App Store', 'iOS & Android discounts and bill payment app', 'Paywall and permissions rebuild for an iOS and Android app', 'React web app with Google Cloud, Firebase and AI', 'iOS app with NFC, blockchain and Merkle trees', 'Native Android ID card reader with thermal printers'];
  const spotlight = pick.map((name) => reviews.find((r) => r.project === name));
  const WALL_LIMIT = 9;

  // ProfessionalService is a kind of Organization, so the @id below is what every other
  // page points at with provider, contributor and publisher.
  const jsonld = ld({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organization`,
        name: 'o9Tech',
        url: `${site.url}/`,
        logo: `${site.url}/assets/o9/img/logo.webp`,
        image: `${site.url}/assets/o9/img/og.jpg`,
        description: site.about,
        email: site.email,
        telephone: site.phone,
        foundingDate: String(site.founded),
        founder: site.founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: 'Co-founder', sameAs: f.upwork })),
        address: { '@type': 'PostalAddress', streetAddress: site.street, addressLocality: site.city, postalCode: site.postalCode, addressCountry: site.country },
        areaServed: 'Worldwide',
        contactPoint: [
          { '@type': 'ContactPoint', contactType: 'sales', email: site.email, telephone: site.phone, availableLanguage: 'English' },
          { '@type': 'ContactPoint', contactType: 'customer support', email: site.supportEmail, availableLanguage: 'English' },
        ],
        knowsAbout: ['iOS app development', 'Android app development', 'Flutter', 'React Native', 'Kotlin Multiplatform', 'Web development', 'Data engineering', 'Artificial intelligence', 'Blockchain', 'Cloud and DevOps'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: 'Services',
          itemListElement: services.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${site.url}/${x.page.replace(/\.html$/, '')}#service`, name: x.title } })),
        },
      },
      { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: 'o9Tech', publisher: { '@id': `${site.url}/#organization` }, inLanguage: 'en' },
    ],
  });

  return `${head({
    title: 'App, Web, Data & AI Development Company in Pakistan | o9Tech',
    description: 'o9Tech is a software studio in Lahore, Pakistan, founded in 2022. We build iOS and Android apps, web platforms, data pipelines and AI features for clients.',
    jsonld,
  })}
<body>
${nav()}
<main id="main">

<section class="hero" aria-labelledby="hero-title">
  <div class="hero-bg" aria-hidden="true">
    <canvas id="constellation"></canvas>
    <div class="hero-glow g1"></div>
    <div class="hero-glow g2"></div>
  </div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <span class="eyebrow" data-reveal>Product engineering studio · Lahore, Pakistan</span>
      <h1 id="hero-title" class="h-display" data-reveal style="--d:.06s"><span class="line">We engineer the apps</span> <span class="line">people <em>open every day.</em></span></h1>
      <p class="lead" data-reveal style="--d:.12s">o9Tech is a product engineering studio in Lahore, Pakistan, founded in 2022 and run by senior architects who have shipped banking, streaming, messaging and marketplace apps. We design, build and scale native iOS and Android apps, cross-platform products, web platforms, data platforms, blockchain systems and AI features.</p>
      <div class="hero-actions" data-reveal style="--d:.18s">
        <a class="btn btn-primary" href="#contact">Start a project ${icons.arrow}</a>
        <a class="btn btn-ghost" href="#work">See our work</a>
      </div>
      <div class="hero-proof" data-reveal style="--d:.24s">
        ${badges.topRated}
        ${badges.jobSuccess}
      </div>
    </div>
    <div class="hero-visual" data-reveal="scale" style="--d:.1s">
      <div class="stage">
        <div class="stage-inner">
          ${phone(byslug.tradingcardtv.visual.images[0], 'Trading Card TV live auction screen', { cls: 'p1 float', priority: true })}
          ${phone(byslug.worlds.visual.images[1], 'Worlds memory journal screen', { cls: 'p2 float', lazy: false })}
          ${phone(byslug.hiiker.visual.images[0], 'HiiKER trail map screen', { cls: 'p3 float', lazy: false })}
          <span class="stage-chip c1"><i></i>Swift · SwiftUI</span>
          <span class="stage-chip c2"><i></i>Kotlin · Compose</span>
          <span class="stage-chip c3"><i></i>Flutter + LiveKit</span>
          <span class="stage-chip c4"><i></i>LLM features</span>
          <div class="stage-card">
            ${img(byslug.airlister.icon, '')}
            <span><strong>AirLister is live</strong><small>Zero to App Store in 14 days</small></span>
            <span class="live-dot">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="marquee-wrap" aria-labelledby="marquee-title">
  <div class="container">
    <div class="marquee-head">
      <p id="marquee-title">Products we've built and worked on</p>
      <button class="marquee-toggle" type="button" aria-controls="marquee" aria-pressed="false">${icons.pause}<span class="label">Pause</span></button>
    </div>
  </div>
  <div class="marquee" id="marquee">
    <div class="marquee-track">${marqueeItems}<span class="marquee-clone" aria-hidden="true">${marqueeClone}</span></div>
  </div>
</div>

<section class="band band-light" aria-labelledby="metrics-title">
  <div class="container">
    <div class="section-head split">
      <div style="display:grid;gap:18px">
        <span class="eyebrow" data-reveal>By the numbers</span>
        <h2 id="metrics-title" class="h-section" data-reveal>Senior engineers. <span class="hl">Shipped products.</span> Happy clients.</h2>
      </div>
      <p class="lead" data-reveal>Small enough that the architects who scope your product also build it. Experienced enough to have done it for banks, malls, sports leagues and startups on four continents.</p>
    </div>
    <div class="metrics" data-stagger>
      <div class="metric" data-reveal><span class="metric-value" data-count="${projects.length}"><span class="n">${projects.length}</span></span><span class="metric-label">Products in our portfolio</span><span class="metric-note">Fintech, health, travel, retail, media and more.</span></div>
      <div class="metric" data-reveal><span class="metric-value" data-count="100"><span class="n">100</span><sup>%</sup></span><span class="metric-label">Job Success Score</span><span class="metric-note">${esc(upworkStats.badge)} and Top Rated on our co-founders' Upwork profiles, across ${upworkStats.jobs} contracts.</span></div>
      <div class="metric" data-reveal><span class="metric-value" data-count="${reviews.length}"><span class="n">${reviews.length}</span></span><span class="metric-label">Five-star client reviews</span><span class="metric-note">Each one from a real Upwork contract.</span></div>
      <div class="metric" data-reveal><span class="metric-value" data-count="14"><span class="n">14</span><sup>days</sup></span><span class="metric-label">From zero to the App Store</span><span class="metric-note">AirLister, built with an AI-native workflow.</span></div>
    </div>
  </div>
</section>

<section class="band band-light-2" id="services" aria-labelledby="services-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal>What we do</span>
      <h2 id="services-title" class="h-section" data-reveal>Every layer of your product, under one roof.</h2>
      <p class="lead" data-reveal>From the first screen to the servers behind it. Pick one service or hand us the whole build.</p>
    </div>
    <div class="bento" data-stagger>
      ${bento(svc.mobile, 'span-2 row-2 is-dark', art.phone, [['Sw', 'Swift'], ['SU', 'SwiftUI'], ['Kt', 'Kotlin'], ['JC', 'Compose']])}
      ${bento(svc['cross-platform'], 'span-2', art.layers)}
      ${bento(svc.ai, 'is-dark', art.spark)}
      ${bento(svc.web, '', art.browser)}
      ${bento(svc['data-engineering'], 'span-2', art.data)}
      ${bento(svc.blockchain, '', art.chain)}
      ${bento(svc.cloud, 'is-dark', art.cloud)}
    </div>
  </div>
</section>

<section class="band band-dark band-grid" id="architecture" aria-labelledby="arch-title">
  <div class="container">
    <div class="section-head split">
      <div style="display:grid;gap:18px">
        <span class="eyebrow" data-reveal>How it fits together</span>
        <h2 id="arch-title" class="h-section" data-reveal>One architecture, every platform.</h2>
      </div>
      <p class="lead" data-reveal>Most products need more than an app. Here is the system we design and run for clients. Hover or tap any part to see how it connects.</p>
    </div>
    <div class="arch" data-reveal>
      <svg class="arch-wires" aria-hidden="true"><defs><linearGradient id="wireGrad" x1="0" x2="1"><stop offset="0" stop-color="#fef119"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>
      ${archCols.map((c) => `<div class="arch-col">
        <h3>${esc(c.title)}</h3>
        ${c.nodes.map(archNode).join('\n        ')}
      </div>`).join('\n      ')}
    </div>
    <p class="arch-detail" aria-live="polite"><span class="muted">Hover, tap or tab through the diagram to trace a request from an app to the cloud.</span></p>
  </div>
</section>

<section class="band band-light" id="work" aria-labelledby="work-title" data-work data-limit="10">
  <div class="container">
    <div class="section-head split">
      <div style="display:grid;gap:18px">
        <span class="eyebrow" data-reveal>Selected work</span>
        <h2 id="work-title" class="h-section" data-reveal>Products in the hands of real users.</h2>
      </div>
      <p class="lead" data-reveal>Live apps on the App Store and Google Play, platforms we built end to end, and products we strengthened for global brands.</p>
    </div>
    <div class="filters" role="group" aria-label="Filter projects" data-reveal>
      ${filters.map((f, i) => `<button type="button" class="filter-btn" data-filter="${f.id}" aria-pressed="${i === 0}">${esc(f.label)} <span class="count">${counts[f.id]}</span></button>`).join('\n      ')}
    </div>
    <p class="sr-only work-live" aria-live="polite"></p>
    <div class="work-grid">
      ${projects.map(caseCard).join('\n      ')}
    </div>
    <p class="work-empty" hidden>No projects in this category yet.</p>
    <div class="work-more"><button type="button" class="btn btn-dark">Show all <span class="n">${projects.length}</span> projects ${icons.arrow}</button></div>
  </div>
</section>

<section class="band band-dark" id="reviews" aria-labelledby="reviews-title">
  <div class="container">
    <div class="reviews-top">
      <div style="display:grid;gap:20px">
        <span class="eyebrow" data-reveal>Client reviews</span>
        <h2 id="reviews-title" class="h-section" data-reveal>Clients say it better than we can.</h2>
        <div class="review-badges" data-reveal>${badges.verified}${badges.topRated}</div>
      </div>
      <div class="spotlight" data-spotlight data-reveal role="region" aria-roledescription="carousel" aria-label="Featured client reviews" tabindex="0">
        <div class="spotlight-track" aria-live="off">
          ${spotlight.map((r, i) => `<div class="spotlight-item" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${spotlight.length}"${i ? ' hidden' : ''}>
            <blockquote>${reviewHtml(r.text)}</blockquote>
            <div class="review-meta">${stars(5)}<strong>${esc(r.project)}</strong><span>${esc(r.date)} · Upwork</span></div>
          </div>`).join('\n          ')}
        </div>
        <div class="spotlight-nav">
          <button type="button" class="icon-btn" data-prev aria-label="Previous review">${icons.arrowLeft}</button>
          <button type="button" class="icon-btn" data-next aria-label="Next review">${icons.arrow}</button>
          <button type="button" class="icon-btn" data-pause aria-pressed="false" aria-label="Pause reviews"><span class="ico-pause">${icons.pause}</span><span class="ico-play" hidden>${icons.play}</span></button>
          <span class="spotlight-count">01 / ${String(spotlight.length).padStart(2, '0')}</span>
          <span class="spotlight-progress" aria-hidden="true"><i></i></span>
        </div>
      </div>
    </div>
    <div class="review-wall" data-stagger>
      ${sorted.map((r, i) => `<figure class="review-card" data-reveal${i >= WALL_LIMIT ? ' hidden' : ''}>
        <blockquote>${reviewHtml(r.text)}</blockquote>
        <figcaption class="review-meta">${stars(5)}<span><strong>${esc(r.project)}</strong><br>${esc(r.date)} · Upwork</span></figcaption>
      </figure>`).join('\n      ')}
    </div>
    <div class="reviews-more"><button type="button" class="btn btn-ghost" data-wall-more>Show all ${reviews.length} reviews</button></div>
  </div>
</section>

<section class="band band-light" id="process" aria-labelledby="process-title">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal>How we work</span>
      <h2 id="process-title" class="h-section" data-reveal>A clear plan, weekly builds, no surprises.</h2>
    </div>
    <ol class="process" data-stagger style="list-style:none;padding:0;margin:0">
      ${process.map((s) => `<li class="step" data-reveal><span class="step-n">${s.n}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="band band-light-2" id="faq" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div class="section-head" style="margin:0;align-content:start">
      <span class="eyebrow" data-reveal>FAQ</span>
      <h2 id="faq-title" class="h-section" data-reveal>Questions we hear a lot.</h2>
      <p class="lead" data-reveal>Something else on your mind? <a href="#contact">Ask us directly</a>.</p>
    </div>
    <div class="faq-list" data-stagger>
      ${faqs.map((f, i) => `<details class="faq-item" data-reveal${i === 0 ? ' open' : ''}><summary>${esc(f.q)}<span class="plus" aria-hidden="true">${icons.plus}</span></summary><p class="answer">${esc(f.a)}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="band band-light" style="padding-block:clamp(48px,7vw,96px)" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <div>
        <h2 id="cta-title">Have a product in mind?</h2>
        <p>Tell us what you're building. You'll get a reply from a senior engineer within one business day, with honest advice on scope, stack and timeline.</p>
      </div>
      <a class="btn btn-dark" href="#contact">Start a project ${icons.arrow}</a>
    </div>
  </div>
</section>

<section class="band band-dark" id="contact" aria-labelledby="contact-title">
  <div class="container contact-grid">
    <div>
      <div class="section-head" style="margin-bottom:0">
        <span class="eyebrow" data-reveal>Contact</span>
        <h2 id="contact-title" class="h-section" data-reveal>Let's build it together.</h2>
        <p class="lead" data-reveal>Share a few details and we'll come back within one business day.</p>
      </div>
      <ul class="contact-list" data-stagger>
        <li data-reveal><span class="ci">${icons.pin}</span><span><small>Office</small><span>${esc(site.address)}</span></span></li>
        <li data-reveal><span class="ci">${icons.call}</span><span><small>Phone</small><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></span></li>
        <li data-reveal><span class="ci">${icons.mail}</span><span><small>Email</small><a href="mailto:${site.email}">${esc(site.email)}</a></span></li>
      </ul>
      <div class="map-frame" data-reveal>
        <iframe title="Map showing Abbas Trade Center, Lahore" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108901.38774107897!2d74.2912554059594!3d31.520369047262683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fb60d03a11d%3A0xd4c32a9462635b2!2sAbbas%20Trade%20Center%2C%20Lahore%20Cantt!5e0!3m2!1sen!2s!4v1700791111111!5m2!1sen!2s" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <form class="form-card" action="${site.formAction}" method="post" data-contact-form novalidate data-reveal aria-label="Contact o9Tech">
      <input type="hidden" name="_subject" value="New project inquiry from o9tech.com">
      <div style="position:absolute;left:-9999px" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
      <div class="form-grid">
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err"><span class="err" id="f-name-err"></span></div>
        <div class="field"><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="f-email-err"><span class="err" id="f-email-err"></span></div>
        <div class="field full"><label for="f-company">Company <span class="muted" style="font-weight:500">(optional)</span></label><input id="f-company" name="company" type="text" autocomplete="organization"></div>
        <fieldset class="field full" style="border:0;padding:0;margin:0">
          <legend style="font-weight:600;font-size:.875rem;margin-bottom:6px">What do you need?</legend>
          <div class="choice-row">
            ${['Mobile app', 'Web platform', 'AI feature', 'Data engineering', 'Blockchain', 'Rescue an existing app', 'Something else'].map((c, i) => `<label class="choice"><input type="radio" name="need" value="${c}"${i === 0 ? ' checked' : ''}><span>${c}</span></label>`).join('')}
          </div>
        </fieldset>
        <div class="field full"><label for="f-budget">Rough budget <span class="muted" style="font-weight:500">(optional)</span></label>
          <select id="f-budget" name="budget"><option value="">Not sure yet</option><option>Under $10k</option><option>$10k to $25k</option><option>$25k to $60k</option><option>$60k and up</option></select>
        </div>
        <div class="field full"><label for="f-message">About your project</label><textarea id="f-message" name="message" required aria-describedby="f-message-hint f-message-err"></textarea><span class="hint" id="f-message-hint">Goals, platforms, timeline, links. Whatever helps.</span><span class="err" id="f-message-err"></span></div>
      </div>
      <div class="form-foot">
        <p class="form-status" role="status" aria-live="polite"></p>
        <button type="submit" class="btn btn-dark">Send message ${icons.arrow}</button>
      </div>
    </form>
  </div>
</section>

</main>
${footer()}`;
}

function bento(s, cls, artSvg, emblems = null) {
  return `<a class="bento-card ${cls}" href="${s.page}" data-reveal>
        <span class="bento-icon">${icons[s.icon]}</span>
        <span class="kicker">${esc(s.kicker)}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.lead)}</p>
        ${emblems ? `<span class="emblems">${emblems.map(([c, l]) => emblem(c, l)).join('')}</span>` : ''}
        <span class="bento-art">${artSvg}</span>
        <span class="bento-foot"><span class="link-arrow">Explore ${icons.arrow}</span></span>
      </a>`;
}
