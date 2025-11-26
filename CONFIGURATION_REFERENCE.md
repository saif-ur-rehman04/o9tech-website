# Configuration Reference

Quick reference for common customizations.

## Color Customization

**File:** `assets/css/main.css` (lines 21-28)

```css
:root { 
  --background-color: #ffffff;     /* Change to your background */
  --default-color: #444444;        /* Body text color */
  --heading-color: #37517e;       /* Headings color */
  --accent-color: #47b2e4;        /* YOUR BRAND COLOR - buttons, links */
  --surface-color: #ffffff;        /* Cards/boxes background */
  --contrast-color: #ffffff;       /* Text on colored backgrounds */
}
```

**Quick Color Ideas:**
- Tech/Software: Blue (#2563eb, #3b82f6)
- Modern: Purple (#7c3aed, #8b5cf6)
- Professional: Navy (#1e3a8a, #1e40af)
- Creative: Teal (#0d9488, #14b8a6)

## Logo Configuration

**Location:** `index.html` line 44-48

**Option 1: Text Logo**
```html
<a href="index.html" class="logo d-flex align-items-center me-auto">
  <h1 class="sitename">Your Company Name</h1>
</a>
```

**Option 2: Image Logo**
```html
<a href="index.html" class="logo d-flex align-items-center me-auto">
  <img src="assets/img/logo.webp" alt="Your Company Name">
</a>
```

## Contact Information Template

**Location:** `index.html` lines 1104-1126

```html
<div class="info-item d-flex">
  <i class="bi bi-geo-alt flex-shrink-0"></i>
  <div>
    <h3>Address</h3>
    <p>Your Company Address<br>City, State ZIP</p>
  </div>
</div>

<div class="info-item d-flex">
  <i class="bi bi-telephone flex-shrink-0"></i>
  <div>
    <h3>Call Us</h3>
    <p>+1 (555) 123-4567</p>
  </div>
</div>

<div class="info-item d-flex">
  <i class="bi bi-envelope flex-shrink-0"></i>
  <div>
    <h3>Email Us</h3>
    <p>contact@yourcompany.com</p>
  </div>
</div>
```

## Google Maps Embed

**Location:** `index.html` line 1128

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your address
3. Click "Share" > "Embed a map"
4. Copy the iframe code
5. Replace the iframe in your HTML

## Form Configuration Options

### Option 1: Formspree (Easiest for Static Sites)

**Contact Form:**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

**Get Form ID:** Sign up at [formspree.io](https://formspree.io) (free tier available)

### Option 2: Netlify Forms

**Add to form tag:**
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```

### Option 3: EmailJS

**Add to HTML:**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

**Form submission:**
```javascript
emailjs.sendForm('service_id', 'template_id', formElement);
```

## Social Media Links Template

**Location:** Footer (line 1232-1237) and Team sections

```html
<div class="social-links d-flex">
  <a href="https://twitter.com/yourcompany" target="_blank" rel="noopener">
    <i class="bi bi-twitter-x"></i>
  </a>
  <a href="https://facebook.com/yourcompany" target="_blank" rel="noopener">
    <i class="bi bi-facebook"></i>
  </a>
  <a href="https://instagram.com/yourcompany" target="_blank" rel="noopener">
    <i class="bi bi-instagram"></i>
  </a>
  <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener">
    <i class="bi bi-linkedin"></i>
  </a>
</div>
```

## Meta Tags Template

**Add to `<head>` section of all HTML files:**

```html
<!-- Basic Meta -->
<title>Your Company Name - Software Solutions</title>
<meta name="description" content="Your 150-160 character description">
<meta name="keywords" content="software, development, your, keywords">
<meta name="author" content="Your Company Name">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Your Company Name">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yourdomain.com/assets/img/og-image.jpg">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Company Name">
<meta name="twitter:description" content="Your description">
<meta name="twitter:image" content="https://yourdomain.com/assets/img/og-image.jpg">
```

## Google Analytics Template

**Add before `</head>` tag:**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Get ID:** [Google Analytics](https://analytics.google.com)

## Services Template

**Location:** `index.html` lines 329-359

```html
<div class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
  <div class="service-item position-relative">
    <div class="icon"><i class="bi bi-code-square icon"></i></div>
    <h4><a href="service-details.html" class="stretched-link">Service Name</a></h4>
    <p>Brief description of your service (1-2 sentences)</p>
  </div>
</div>
```

**Bootstrap Icons:** [icons.getbootstrap.com](https://icons.getbootstrap.com)
- `bi-code-square` - Development
- `bi-phone` - Mobile Apps
- `bi-cloud` - Cloud Services
- `bi-shield-check` - Security
- `bi-gear` - DevOps
- `bi-graph-up` - Analytics

## Team Member Template

**Location:** `index.html` lines 621-636

```html
<div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
  <div class="team-member d-flex align-items-start">
    <div class="pic">
      <img src="assets/img/person/team-member-1.webp" class="img-fluid" alt="Name">
    </div>
    <div class="member-info">
      <h4>Full Name</h4>
      <span>Job Title</span>
      <p>Brief bio or description</p>
      <div class="social">
        <a href="https://linkedin.com/in/username"><i class="bi bi-linkedin"></i></a>
        <a href="https://twitter.com/username"><i class="bi bi-twitter-x"></i></a>
      </div>
    </div>
  </div>
</div>
```

## Testimonial Template

**Location:** `index.html` lines 788-802

```html
<div class="swiper-slide">
  <div class="testimonial-item">
    <img src="assets/img/person/client-1.webp" class="testimonial-img" alt="Client Name">
    <h3>Client Name</h3>
    <h4>Job Title, Company</h4>
    <div class="stars">
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
    </div>
    <p>
      <i class="bi bi-quote quote-icon-left"></i>
      <span>Client testimonial text goes here...</span>
      <i class="bi bi-quote quote-icon-right"></i>
    </p>
  </div>
</div>
```

## Deployment Quick Reference

### Netlify
1. Drag & drop folder OR
2. Connect GitHub repository
3. Auto-deploys
4. Add custom domain in settings

### Vercel
1. Import project
2. Auto-deploys
3. Add custom domain

### Traditional Hosting
1. Upload via FTP to `public_html` or `www`
2. Ensure PHP enabled (if using PHP forms)
3. Configure domain DNS
4. Set up SSL

## Common Issues & Solutions

### Images Not Loading
- Check file paths (case-sensitive)
- Ensure images are in correct folder
- Check file extensions match

### Styles Not Applying
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check CSS file path
- Verify file uploaded correctly

### Forms Not Working
- Check form action URL
- Verify API keys/credentials
- Check browser console for errors
- Test with different email addresses

### Mobile Menu Not Working
- Check JavaScript file loaded
- Verify Bootstrap JS included
- Check for JavaScript errors in console

---

**Need more help?** Refer to the full `CUSTOMIZATION_GUIDE.md` for detailed instructions.

