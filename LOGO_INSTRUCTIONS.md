# Logo Setup Instructions

## Logo File Location

Your logo should be placed at:
```
assets/img/logo.png
```

## Current Setup

The website is configured to use your logo image. The logo will appear in:
- Header navigation (top of every page)
- Footer (bottom of every page)

## Adding Your Logo

1. **If you have a JPG file:**
   - Convert it to PNG format (recommended) or rename to `.png`
   - Save it as `assets/img/logo.png`

2. **If you have a PNG file:**
   - Simply save it as `assets/img/logo.png`

3. **Recommended Logo Specifications:**
   - Format: PNG (with transparent background preferred)
   - Height: 40-50px (width will scale proportionally)
   - File size: Keep under 100KB for fast loading

## Alternative Formats

If you prefer to use JPG or WebP:
- Update the logo path in all HTML files from `logo.png` to your format
- Files to update: `index.html`, `blog.html`, `blog-details.html`, `portfolio-details.html`, `service-details.html`, `404.html`, `starter-page.html`

## Current Logo Code

The logo is currently set up in the header like this:
```html
<img src="assets/img/logo.png" alt="o9Tech" style="height: 40px;">
<h1 class="sitename ms-2">o9Tech</h1>
```

If you want to use only the logo image (without text), you can remove the `<h1>` tag.

## Testing

After adding your logo:
1. Refresh your browser at `http://localhost:8000`
2. Check that the logo appears in the header
3. Verify it looks good on mobile (resize browser window)

---

**Note:** The logo file path is already configured in all pages. Just add your logo image file to `assets/img/logo.png` and it will appear automatically!

