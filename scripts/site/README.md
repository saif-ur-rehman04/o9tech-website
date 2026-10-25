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
- `page-index.mjs`, `page-inner.mjs`: page templates
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
2. Add an entry to `projects` in `data.mjs`. Pick `visual.type`: `phone`, `browser`, `mockup`, `gallery` or `type`.
3. Run the build and commit the generated `portfolio-<slug>.html`.

## Reviews

Reviews are real Upwork feedback. In `data.mjs`, words in `[brackets]` mark where a name or pronoun was changed to refer to the team. The page shows them without brackets, and the note above the reviews discloses the change, so keep everything else word for word and keep that note.
