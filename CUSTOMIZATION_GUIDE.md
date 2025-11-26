# Website Customization & Deployment Guide

## Overview
This guide will help you customize the Arsha template for your software company and deploy it to your domain.

---

## Phase 1: Content Customization

### 1.1 Company Information
**Files to edit:** `index.html` (and other HTML pages)

**What to update:**
- **Company Name**: Replace "Arsha" throughout all pages
  - Header logo text (line 47)
  - Footer company name (line 1199, 1244)
  - Page titles in `<title>` tags
  - Meta descriptions

- **Contact Information** (Contact section, around line 1108-1124):
  - Address: Update to your company address
  - Phone: Replace `+1 5589 55488 55`
  - Email: Replace `info@example.com`
  - Google Maps embed: Update the iframe src with your location coordinates

- **Social Media Links** (Footer and Team sections):
  - Update all social media URLs (Twitter, Facebook, Instagram, LinkedIn)
  - Remove links you don't use

### 1.2 Hero Section (Homepage)
**Location:** Lines 89-107 in `index.html`

**Customize:**
- Main headline (line 94): "Better Solutions For Your Business"
- Subheadline (line 95): Update to describe your software company
- Hero image (line 102): Replace `assets/img/hero-img.png` with your company image
- CTA buttons: Update "Get Started" links to point to your contact form or services
- Video link (line 98): Replace with your company/product video or remove

### 1.3 About Section
**Location:** Lines 169-201

**Update:**
- Section title and description
- Company story and values
- Key points/bullet list items
- "Read More" link if you have an about page

### 1.4 Services Section
**Location:** Lines 317-365

**Customize for your software services:**
- Replace the 4 service items with your actual services
- Update icons (Bootstrap Icons available)
- Update service descriptions
- Link to service detail pages if you have them

**Example services for software company:**
- Custom Software Development
- Web Application Development
- Mobile App Development
- Cloud Solutions & DevOps
- Software Consulting
- Maintenance & Support

### 1.5 Portfolio/Projects Section
**Location:** Lines 489-606

**Update with your projects:**
- Replace portfolio images with screenshots of your software projects
- Update project titles and descriptions
- Link to live projects or case studies
- Organize by categories (Web Apps, Mobile Apps, Enterprise Solutions, etc.)

### 1.6 Team Section
**Location:** Lines 609-693

**Update with your team:**
- Replace team member photos
- Update names, titles, and bios
- Add/remove team members as needed
- Update social media links for each member

### 1.7 Testimonials
**Location:** Lines 760-874

**Replace with real client testimonials:**
- Client photos (or use professional stock photos)
- Client names and titles
- Real testimonials about your software/services
- Add/remove testimonials as needed

### 1.8 Pricing Section (Optional)
**Location:** Lines 696-757

**Decide if you need this:**
- If you offer subscription services/products, customize pricing plans
- If not relevant, you can hide/remove this section
- Update plan names, prices, and features

### 1.9 FAQ Section
**Location:** Lines 877-946

**Update with relevant questions:**
- Common questions about your software/services
- Company policies
- Technical support questions
- Update answers to be specific to your business

### 1.10 Blog Section
**Location:** Lines 977-1086

**If you have a blog:**
- Update blog post images and content
- Link to your actual blog posts
- If no blog, you can remove this section

### 1.11 Contact Form
**Location:** Lines 1089-1172

**Important:** The contact form uses PHP (`forms/contact.php`). You'll need to:
- Configure the PHP form handler (see Phase 3)
- Or replace with a third-party service (Formspree, Netlify Forms, etc.)

---

## Phase 2: Branding & Visual Customization

### 2.1 Logo
**Location:** Header (line 44-48)

**Options:**
1. **Text Logo**: Update the sitename class text
2. **Image Logo**: Uncomment line 46 and add your logo image
   - Recommended size: 200x50px (or proportional)
   - Format: PNG with transparent background or WebP
   - Place in `assets/img/logo.webp` or `logo.png`

### 2.2 Favicon
**Location:** `assets/img/favicon.png` and `apple-touch-icon.png`

**Steps:**
1. Create your favicon (16x16, 32x32, or use a favicon generator)
2. Replace `assets/img/favicon.png`
3. Replace `assets/img/apple-touch-icon.png` (180x180px)

### 2.3 Color Scheme
**File:** `assets/css/main.css` (lines 14-53)

**Customize colors:**
```css
:root { 
  --background-color: #ffffff;     /* Main background */
  --default-color: #444444;        /* Body text */
  --heading-color: #37517e;        /* Headings */
  --accent-color: #47b2e4;        /* Buttons, links - YOUR BRAND COLOR */
  --surface-color: #ffffff;        /* Cards, boxes */
  --contrast-color: #ffffff;       /* Text on colored backgrounds */
}
```

**Quick customization:**
- Change `--accent-color` to your brand's primary color
- Adjust `--heading-color` to match your brand
- Test contrast for accessibility

### 2.4 Images
**Replace placeholder images:**
- Hero image: `assets/img/hero-img.png`
- About/Why Us: `assets/img/why-us.png`
- Portfolio images: `assets/img/portfolio/*`
- Team photos: `assets/img/person/*`
- Client logos: `assets/img/clients/*`
- Blog images: `assets/img/blog/*`

**Tips:**
- Use WebP format for better performance
- Optimize images before uploading
- Maintain aspect ratios

---

## Phase 3: Form Configuration

### 3.1 Contact Form
**File:** `forms/contact.php`

**Options:**

**Option A: Use PHP (requires PHP hosting)**
- Configure email settings in `forms/contact.php`
- Set recipient email address
- Test form submission

**Option B: Use Third-Party Service (Recommended for static hosting)**
- **Formspree**: Replace form action with Formspree endpoint
- **Netlify Forms**: Add `netlify` attribute to form
- **EmailJS**: Use JavaScript to send emails
- **Google Forms**: Embed Google Form

**Example with Formspree:**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

### 3.2 Newsletter Form
**File:** `forms/newsletter.php`

- Same options as contact form
- Or integrate with Mailchimp, ConvertKit, etc.

---

## Phase 4: Navigation & Structure

### 4.1 Navigation Menu
**Location:** Lines 50-79 in `index.html`

**Customize menu items:**
- Remove unused sections (e.g., Pricing if not needed)
- Update section links
- Remove dropdown if not needed
- Add custom pages (Careers, Case Studies, etc.)

### 4.2 Footer Links
**Location:** Lines 1209-1238

**Update:**
- Useful Links section
- Services list
- Social media links
- Copyright year and company name

---

## Phase 5: Additional Pages

### 5.1 Review Other Pages
- `blog.html` - Customize if you have a blog
- `blog-details.html` - Blog post template
- `portfolio-details.html` - Project detail page
- `service-details.html` - Service detail page

### 5.2 Create Custom Pages (if needed)
- About Us page
- Careers page
- Case Studies page
- Privacy Policy / Terms of Service

---

## Phase 6: SEO Optimization

### 6.1 Meta Tags
**Update in all HTML files:**
```html
<title>Your Company Name - Software Solutions</title>
<meta name="description" content="Your company description (150-160 characters)">
<meta name="keywords" content="software, development, your, keywords">
```

### 6.2 Open Graph Tags (for social sharing)
Add to `<head>` section:
```html
<meta property="og:title" content="Your Company Name">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yourdomain.com/assets/img/og-image.jpg">
<meta property="og:url" content="https://yourdomain.com">
```

### 6.3 Structured Data
Consider adding JSON-LD structured data for:
- Organization
- LocalBusiness (if applicable)
- SoftwareApplication (for your products)

---

## Phase 7: Testing

### 7.1 Local Testing
1. Open `index.html` in a browser
2. Test all links and navigation
3. Test forms (if configured)
4. Check responsive design on mobile/tablet
5. Test in different browsers (Chrome, Firefox, Safari, Edge)

### 7.2 Performance
- Optimize images
- Minify CSS/JS (optional)
- Test page load speed (Google PageSpeed Insights)

### 7.3 Accessibility
- Check color contrast
- Test keyboard navigation
- Add alt text to all images
- Ensure proper heading hierarchy

---

## Phase 8: Deployment Options

### Option 1: Static Hosting (Recommended for this template)

#### 8.1 Netlify (Free & Easy)
**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Or connect GitHub repository
4. Netlify automatically deploys
5. Configure custom domain in Netlify settings

**Pros:**
- Free SSL certificate
- Automatic HTTPS
- Easy custom domain setup
- Form handling available
- CDN included

#### 8.2 Vercel
**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Import your project
3. Deploy automatically
4. Add custom domain

#### 8.3 GitHub Pages
**Steps:**
1. Create GitHub repository
2. Push your code
3. Go to Settings > Pages
4. Select branch and folder
5. Your site will be at `username.github.io/repository-name`

**Note:** For custom domain, add CNAME file

#### 8.4 Cloudflare Pages
**Steps:**
1. Create account at [cloudflare.com](https://cloudflare.com)
2. Go to Pages section
3. Connect repository or upload files
4. Configure custom domain

### Option 2: Traditional Web Hosting

#### 8.5 Shared Hosting (cPanel, etc.)
**Steps:**
1. Purchase hosting plan
2. Upload files via FTP/SFTP or File Manager
3. Upload all files to `public_html` or `www` folder
4. Configure domain DNS
5. Test website

**Requirements:**
- If using PHP forms, ensure PHP is enabled
- Check file permissions

#### 8.6 VPS/Cloud Hosting
**Steps:**
1. Set up web server (Apache/Nginx)
2. Upload files to web root
3. Configure domain
4. Set up SSL certificate (Let's Encrypt)

---

## Phase 9: Domain Configuration

### 9.1 DNS Settings
**For static hosting (Netlify, Vercel, etc.):**
- Add A record or CNAME as instructed by hosting provider
- Usually: CNAME pointing to hosting provider's domain

**For traditional hosting:**
- Point A record to hosting IP
- Or use nameservers provided by host

### 9.2 SSL Certificate
- Most modern hosting providers include free SSL (Let's Encrypt)
- Ensure HTTPS is enabled
- Force HTTPS redirect

---

## Phase 10: Post-Deployment

### 10.1 Final Checks
- [ ] All links work correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] SSL certificate active (HTTPS)
- [ ] Google Analytics installed (if needed)
- [ ] Social media meta tags working
- [ ] Contact information correct

### 10.2 Analytics & Monitoring
**Add Google Analytics:**
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 10.3 Search Engine Submission
- Submit sitemap to Google Search Console
- Submit to Bing Webmaster Tools
- Create and submit `sitemap.xml`

---

## Quick Start Checklist

### Content
- [ ] Update company name everywhere
- [ ] Replace all placeholder text
- [ ] Update contact information
- [ ] Add real team members
- [ ] Add real testimonials
- [ ] Update services
- [ ] Add portfolio projects

### Branding
- [ ] Add company logo
- [ ] Update favicon
- [ ] Customize color scheme
- [ ] Replace all images

### Functionality
- [ ] Configure contact form
- [ ] Configure newsletter form
- [ ] Test all forms
- [ ] Update navigation menu
- [ ] Check all links

### SEO
- [ ] Update meta tags
- [ ] Add Open Graph tags
- [ ] Add alt text to images
- [ ] Create sitemap.xml

### Deployment
- [ ] Choose hosting provider
- [ ] Upload files
- [ ] Configure domain
- [ ] Set up SSL
- [ ] Test live site

---

## Need Help?

### Common Issues:
1. **Forms not working**: Check PHP configuration or switch to third-party service
2. **Images not loading**: Check file paths (case-sensitive on some servers)
3. **Styles not applying**: Clear browser cache, check CSS file paths
4. **Mobile menu not working**: Check JavaScript file is loaded

### Resources:
- Bootstrap Documentation: https://getbootstrap.com/docs/5.3/
- Bootstrap Icons: https://icons.getbootstrap.com/
- Formspree: https://formspree.io/
- Netlify: https://www.netlify.com/

---

## Next Steps After Deployment

1. **Monitor Performance**: Use Google PageSpeed Insights
2. **Track Visitors**: Set up Google Analytics
3. **Backup Regularly**: Keep backups of your files
4. **Update Content**: Keep website fresh with new projects/blog posts
5. **Security**: Keep dependencies updated if you modify them

---

Good luck with your website launch! 🚀

