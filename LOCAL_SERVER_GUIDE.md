# Local Server Setup Guide

This guide will help you set up a local server to test your website before deploying.

## Quick Start Options

### Option 1: Python HTTP Server (Simplest - Recommended)

**For Static Files (HTML, CSS, JS)**

1. Open Terminal
2. Navigate to your project folder:
   ```bash
   cd /Users/saif/Downloads/Arsha
   ```
3. Start the server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

**To stop the server:** Press `Ctrl + C` in the terminal

---

### Option 2: PHP Built-in Server (For Testing PHP Forms)

**If you want to test PHP contact forms locally:**

1. Open Terminal
2. Navigate to your project folder:
   ```bash
   cd /Users/saif/Downloads/Arsha
   ```
3. Start the PHP server:
   ```bash
   php -S localhost:8000
   ```
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

**Note:** PHP forms will work, but you'll need to configure email settings in `forms/contact.php` for emails to actually send.

**To stop the server:** Press `Ctrl + C` in the terminal

---

### Option 3: Node.js http-server

**If you have Node.js installed:**

1. Install http-server globally (one time):
   ```bash
   npm install -g http-server
   ```
2. Navigate to your project folder:
   ```bash
   cd /Users/saif/Downloads/Arsha
   ```
3. Start the server:
   ```bash
   http-server -p 8000
   ```
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

---

### Option 4: VS Code Live Server Extension

**If you use VS Code:**

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser will open automatically

---

## Recommended: Python Server (Easiest)

Since you're on macOS, Python is likely already installed. This is the simplest option for testing static files.

**Quick Command:**
```bash
cd /Users/saif/Downloads/Arsha && python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

---

## Testing Checklist

Once your local server is running:

- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation menu works
- [ ] Mobile menu works (resize browser window)
- [ ] All links work
- [ ] Forms display correctly
- [ ] CSS styles apply correctly
- [ ] JavaScript animations work
- [ ] Test on different browser sizes (mobile, tablet, desktop)

---

## Important Notes

### Forms Testing
- **Static HTML forms** will work with any server
- **PHP forms** require PHP server (Option 2)
- **Third-party forms** (Formspree, etc.) will work with any server once configured

### File Paths
- Make sure you're accessing `http://localhost:8000/index.html` or just `http://localhost:8000`
- Don't open HTML files directly in browser (file://) - use the local server

### Making Changes
- Edit files in your code editor
- Refresh browser to see changes
- No need to restart server for most changes

---

## Troubleshooting

### Port Already in Use
If port 8000 is busy, use a different port:
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080`

### Python Not Found
Install Python or use PHP server instead:
```bash
php -S localhost:8000
```

### Images Not Loading
- Make sure you're using the local server (not file://)
- Check file paths are correct
- Ensure images are in the `assets/img/` folder

---

## Next Steps

1. Start local server using one of the options above
2. Test your website thoroughly
3. Make customizations
4. Test again
5. When ready, deploy to production

---

**Tip:** Keep the server running in a terminal window while you work. You can edit files and refresh the browser to see changes instantly!

