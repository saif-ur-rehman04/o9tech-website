# Email Setup Guide for Contact Form

## Quick Setup Options

### Option 1: Formspree (Easiest - Recommended) ⭐

**No server configuration needed!**

1. Go to https://formspree.io and sign up (free account)
2. Create a new form
3. Copy your form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)
4. Update the form in `index.html`:

Replace this line:
```html
<form action="forms/contact.php" method="post" class="php-email-form">
```

With:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="post" class="php-email-form">
```

**That's it!** Formspree will send emails directly to your email address.

---

### Option 2: PHP mail() Function

**Works when deployed to a web server with PHP support**

1. Open `forms/contact.php`
2. Find this line (around line 10):
   ```php
   $receiving_email_address = 'your-email@example.com';
   ```
3. Replace `your-email@example.com` with your actual email address
4. Save the file

**Note:** PHP mail() may not work on:
- Local development servers
- Some shared hosting providers
- Servers without proper mail configuration

---

### Option 3: SMTP with PHPMailer (Most Reliable)

**Best for production servers**

1. Install PHPMailer via Composer:
   ```bash
   composer require phpmailer/phpmailer
   ```

2. Update `forms/contact.php` to use PHPMailer with your SMTP settings

3. Configure your email provider's SMTP settings:
   - **Gmail:** smtp.gmail.com, port 587, use App Password
   - **Outlook:** smtp-mail.outlook.com, port 587
   - **Custom SMTP:** Check with your email provider

---

## Recommended: Use Formspree

Formspree is the easiest solution because:
- ✅ No server configuration needed
- ✅ Works immediately
- ✅ Free tier: 50 submissions/month
- ✅ Works on any hosting (even static sites)
- ✅ Spam protection included
- ✅ Email notifications sent to your inbox

---

## Testing Your Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox (and spam folder)
4. You should receive the form submission

---

## Troubleshooting

### Form not sending?
- Check browser console for errors
- Verify form action URL is correct
- Make sure all required fields are filled
- Check spam/junk folder

### PHP mail() not working?
- Switch to Formspree (Option 1) - it's much easier!
- Or configure SMTP (Option 3)

---

## Need Help?

If you need help setting up any of these options, let me know your email address and I can configure it for you!


