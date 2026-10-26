# o9Tech site generator

The home page, case studies, service pages and 404 page are generated from `data.mjs`.
Edit content there (projects, reviews, services, FAQ), then rebuild:

```bash
node scripts/site/build.mjs --check
```

The `--check` flag fails the build on broken local links, missing images or anchors, em dashes, or leftover placeholder text.

## Files

- `data.mjs`: all copy and project data
- `ui.mjs`: shared parts (head, nav, footer, device frames, badges, icons)
- `page-index.mjs`, `page-inner.mjs`, `page-hue.mjs`, `page-pigeon.mjs`: page templates
- `resize-images.mjs`: makes the small image copies used in `srcset`
- `css/*.css`: styles, bundled in order into `assets/o9/css/site.css`
- `assets/o9/js/site.js`: behaviour (hand-written, not generated)
- `design-system/o9tech/MASTER.md`: colors, type, spacing and motion rules

Generated files are committed, so Cloudflare Pages deploys the repo root as-is with no build step.
Pages serves `page.html` at `/page`, so the build writes clean links (`/#work`, `service-mobile`), never `.html` ones.

To preview locally the way Pages serves the site (clean URLs, `_redirects`, `_headers`, 404 page):

```bash
node scripts/site/serve.mjs
```

## Adding a project

1. Put images in `assets/img/work/<slug>/` as WebP (`icon.webp` at 512px, `shot-1.webp` and up at 1080px wide).
2. Run `node scripts/site/resize-images.mjs` to make the small copies (`-640.webp` screenshots, `-192.webp` icons) that phones download through `srcset`. It needs `cwebp` (`brew install webp`).
3. Add an entry to `projects` in `data.mjs`. Pick `visual.type`: `phone`, `browser`, `mockup`, `gallery` or `type`.
4. Run the build and commit the generated `portfolio-<slug>.html`.

## Services

Each entry in `services` has its own `metaTitle` (about 60 characters) and `metaDescription` (under 160), plus `faqs` shown on the service page. Reviews and related projects are matched by `tag`. A service with no matching projects hides its "Related work" section.

## SEO files

- `sitemap.xml`: `lastmod` is the day a page's content last changed, tracked in `lastmod.json`. Commit that file.
- `llms.txt`: a Markdown summary for AI assistants, built from `data.mjs`.
- `_headers` is hand-edited (not generated): security headers, cache rules, noindex for non-page files and canonical headers for duplicate app policies.

## Reviews

Reviews are real Upwork feedback. In `data.mjs`, words in `[brackets]` mark where a name or pronoun was changed to refer to the team. The page shows them without brackets, and the note above the reviews discloses the change, so keep everything else word for word and keep that note.
