# o9Tech Design System (Master)

Built with the ui-ux-pro-max skill (v2.15.0). Page files in `pages/` override this file.

## Sources used
- `--design-system "software development agency product engineering B2B"` (variance 7, motion 6, density 4): Hero + Features + CTA pattern, glassmorphism, Plus Jakarta Sans, stagger list motion.
- `--domain product` "software agency digital product studio": Bento Box Grid + Glassmorphism as secondary styles, Feature-Rich Showcase + Conversion.
- `--domain style` "bento grid interactive": bento-box-grid (4 to 2 to 1 columns, 16 to 24px radius, hover scale 1.02).
- `--domain color` "developer tool dark engineering": code-dark base (#0F172A family) with one strong accent.
- `--domain landing` "agency portfolio case study social proof": Portfolio Grid (filter by category) + Trust & Authority (proof, stats, clear CTA path, pausable carousel).
- `--domain typography` "geometric modern tech startup bold": Tech Startup pairing (Space Grotesk headings). Developer Mono pairing for code badges (JetBrains Mono).
- `--domain gsap` "scroll reveal stagger cards": Stagger List, standard tier.

## Why we changed some defaults
The generated palette was trust blue with an orange CTA. o9Tech already owns a yellow mark (#FEF119) and a near-black wordmark, so we keep the brand yellow as the only loud accent and use blue only inside diagrams. The generator also flagged "dark by default" as a risk, so the page alternates dark (ink) and light (paper) bands instead of being dark everywhere.

## Color tokens
| Token | Value | Use |
|---|---|---|
| `--ink-950` | #09090B | Dark band background |
| `--ink-900` | #111114 | Dark cards |
| `--ink-800` | #1B1B20 | Dark card hover, borders on dark |
| `--ink-700` | #2A2A31 | Hairlines on dark |
| `--paper` | #F6F5F1 | Light band background |
| `--paper-card` | #FFFFFF | Light cards |
| `--line` | #E4E2DA | Hairlines on light |
| `--text` | #121214 | Body text on light (17.9:1 on paper) |
| `--text-muted` | #55545C | Secondary text on light (7.2:1) |
| `--text-inv` | #F4F4F5 | Body text on dark |
| `--text-inv-muted` | #A1A1AA | Secondary text on dark (7.8:1 on ink-950) |
| `--brand` | #FEF119 | Primary CTA fill, highlights on dark |
| `--on-brand` | #111114 | Text on brand yellow (16:1) |
| `--brand-ink` | #7A6F00 | Yellow-family text on light backgrounds (5.1:1) |
| `--signal` | #3B82F6 | Diagram lines, links in diagrams only |
| `--live` | #22C55E | "Live" dots and positive metrics |
| `--ring` | #FEF119 on dark, #111114 on light | Focus ring |

Rule: never put brand yellow text on a light background. Use `--brand-ink` there.

## Typography
- Display: Space Grotesk 500/600/700, tight tracking (-0.03em) on large sizes.
- Body: Plus Jakarta Sans 400/500/600, 16 to 18px, line-height 1.6.
- Technical labels: JetBrains Mono 500, 12 to 13px, uppercase, tracking 0.08em.
- Headings use `text-wrap: balance`, paragraphs use `text-wrap: pretty`.
- Fluid scale with `clamp()`. Body never below 16px, labels never below 12px.

## Spacing and shape
- Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Radius: 12 (controls), 20 (cards), 28 (feature panels), 999 (pills).
- Container max 1240px, 16px gutter on phones, 24px on tablets, 32px on desktop.

## Effects
- Glass: `backdrop-filter: blur(16px) saturate(140%)` with a 1px white/8% border, only on nav, floating badges and overlays.
- Ambient gradients: large blurred radial blobs (yellow 10% and blue 8%) behind the hero and CTA. Static under reduced motion.
- Grid texture: 1px lines at 4% opacity on dark bands.

## Motion
- Reveal: opacity 0 to 1, y 16px to 0, 450 to 600ms, ease `power3.out`. Stagger 0.06s per card, capped at 0.4s total.
- Hover: 200ms, translate -2px or scale 1.02 on bento cards, pointer-follow glow on dark cards.
- Filter transitions: fade and scale 0.96, 300ms. Exits faster than entries.
- Counters animate once when visible.
- Under `prefers-reduced-motion: reduce`: no transforms, no counters running, marquee stopped, final state rendered at once.
- Only transform and opacity animate.

## Components
- Nav: glass bar, logo left, links center, yellow CTA right, full-screen sheet on mobile.
- Buttons: primary yellow pill, secondary outline pill, min height 48px.
- Bento cards: 1x1, 2x1, 2x2 spans on a 4-column grid, 2 columns under 1024px, 1 column under 640px.
- Case study card: device-framed visual on a brand gradient backdrop, mono tag row, title, one-line outcome.
- Review card: real quote, star row with an accessible label, project name, source label.
- Badges: mono pill with an SVG icon.

## Anti-patterns to avoid
- Emoji as icons. Use inline SVG.
- Gray text on gray. Yellow text on white.
- Auto-rotating carousels without pause. Animations that block reading.
- Fixed pixel widths that cause horizontal scroll.
