# WENDZ Website

> **"Not Another Boring Screen."**  
> Production-ready static website for WENDZ — automated retail & digital advertising, Bengaluru.

---

## Folder Structure

```
wendz-website/
├── index.html               ← Homepage (hero, stats, features, journey, CTA)
├── css/
│   └── styles.css           ← All styles, animations, responsive layout
├── js/
│   └── main.js              ← Custom cursor, scroll reveals, counters, effects
├── pages/
│   ├── manifesto.html       ← Brand manifesto / philosophy page
│   └── contact.html         ← Partner application (brands + property owners)
├── assets/
│   └── (place your own images/icons here)
└── README.md
```

---

## Features

### Animations
- **Preloader** — full-screen animated loader with progress bar & character-by-character wordmark reveal
- **Custom cursor** — dual-ring lerp cursor with hover/text mode states
- **Hero text reveal** — staggered line-by-line entrance animation
- **Scroll progress bar** — fixed top progress indicator
- **Scroll reveal system** — fade-up, fade-left, fade-right, scale-in, and stagger-children variants (IntersectionObserver)
- **Counter animation** — eased number counting triggered on scroll
- **Text scramble** — glitch-style character scramble on section headings
- **Marquee / ticker** — infinite horizontal scroll banners (pausable on hover)
- **Parallax** — `data-parallax` attribute for depth layering
- **Mouse-follow glow** — hero background reacts to cursor position
- **Tilt cards** — 3D perspective tilt on stat cards (`data-tilt`)
- **Nav scroll state** — compact nav with blur glass on scroll

### Pages
| Page | Route |
|------|-------|
| Homepage | `/index.html` |
| Manifesto | `/pages/manifesto.html` |
| Contact / Join | `/pages/contact.html` |

---

## Getting Started

### Local Development

No build step needed — it's pure HTML/CSS/JS.

```bash
# Option 1: Python simple server
python3 -m http.server 3000
# → http://localhost:3000

# Option 2: VS Code Live Server extension
# Right-click index.html → Open with Live Server

# Option 3: npx serve
npx serve .
```

---

## GitHub Deployment (GitHub Pages)

1. Push to a GitHub repository
2. Go to **Settings → Pages**
3. Source: **Deploy from branch → main → / (root)**
4. Your site will be live at:  
   `https://yourusername.github.io/wendz-website/`

---

## Customisation

### Colours (css/styles.css, top of file)
```css
:root {
  --primary:       #003ec7;   /* WENDZ Blue */
  --primary-bright:#0052ff;
  --primary-dim:   #b7c4ff;
  --surface:       #f9f9f9;   /* Background */
  --on-surface:    #1a1c1c;   /* Text */
}
```

### Stats (index.html — Stats Bento section)
Update `data-count` and `data-suffix` attributes on `.stat-number` elements.

### Images
Replace `src` URLs with your own images in `/assets/`.  
Recommended: Unsplash, your own photography, or brand imagery.

### Contact Form
Currently uses a JS-only demo toast. To make forms functional:
- Connect to **Formspree**: `<form action="https://formspree.io/f/YOUR_ID">`
- Or **Netlify Forms**: add `netlify` attribute to `<form>`
- Or connect to any backend endpoint

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS (custom properties, grid, flexbox, animations) |
| Scripts | Vanilla JS (ES6+, IntersectionObserver, requestAnimationFrame) |
| Fonts | Google Fonts — Epilogue, Manrope, Space Grotesk |
| Icons | Google Material Symbols |
| Images | Unsplash (replace with brand assets) |

**No frameworks. No build tools. No dependencies.**  
Just fast, clean, deployable code.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Safari | ✅ (cursor hidden on touch) |

---

## Licence

©2025 WENDZ LLP. All rights reserved.
