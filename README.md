# StoryCast — Accessible Audio & Video Storytelling Microsite

**Author:** Brenda Maina | **GitHub:** [Brenda-Maina](https://github.com/Brenda-Maina)

---

## Overview

StoryCast is a three-page accessible microsite showcasing audio and video storytelling. Built with semantic HTML5, Sass (partials, tokens, BEM, cascade layers), CSS Grid + Flexbox, and a container-queried card component. All media plays immediately; all stories include captions or transcripts.

---

## Project Structure
storycast/

├── index.html                    # Home page

├── about.html                    # About & Accessibility page

├── story/

│   ├── echoes-of-the-forest.html # Audio story page

│   └── a-visitor-in-the-yard.html# Video story page

├── sass/

│   ├── _colors.scss              # CSS custom properties (light + dark mode)

│   ├── _typography.scss          # Font imports and size scale

│   ├── _spacing.scss             # 4px-based spacing scale

│   ├── _base.scss                # Reset and global base styles

│   ├── _layout.scss              # Header, nav, footer, back-to-top

│   ├── _components.scss          # Cards, hero, transcript, player controls

│   ├── _about.scss               # About page specific styles

│   └── main.scss                 # Imports and cascade layer declarations

├── css/

│   └── style.css                 # Compiled output (auto-generated)

├── js/

│   └── main.js                   # 12 interactive features

├── assets/

│   ├── media/

│   │   ├── echoes-of-the-forest.mp3

│   │   ├── a-visitor-in-the-yard.mp4

│   │   └── a-visitor-in-the-yard.vtt

│   └── images/

│       ├── echoes-of-the-forest.jpg

│       ├── a-visitor-in-the-yard.jpg

│       └── oceans-whisper.jpg

├── package.json

└── README.md
---

## How to Run Locally

1. Clone the repository and open it in GitHub Codespaces (or any environment with Node.js installed).
2. Install dependencies:
```bash
   npm install
```
3. Start the Sass compiler (leave this running in a terminal tab):
```bash
   npm run compile:sass
```
4. Install the **Live Server** extension in VS Code, right-click `index.html`, and choose **Open with Live Server**.
5. The site opens in a browser preview. Navigate between all three pages to test.

To build minified CSS for production:
```bash
npm run build:sass
```

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero section, filterable story card grid |
| Story — Audio | `story/echoes-of-the-forest.html` | Audio player, transcript, speed controls |
| Story — Video | `story/a-visitor-in-the-yard.html` | Video player, captions, transcript, speed controls |
| About | `about.html` | Mission, accessibility features, how to engage, contact form |

---

## Interactive Features

1. **Dark mode toggle** — switches light/dark theme, saves preference in localStorage, respects `prefers-color-scheme`
2. **Mobile hamburger menu** — collapsible nav for small screens, closes on Escape key
3. **Back to top button** — appears after scrolling 400px, smooth scrolls back to top
4. **Story type filter** — filter cards by All / Audio / Video with live screen reader announcements
5. **Scroll fade animations** — cards and headings fade in on scroll via IntersectionObserver; disabled if `prefers-reduced-motion` is set
6. **Playback speed controls** — 0.5× to 2× speed buttons for all media
7. **Live transcript sync** — active transcript line highlights automatically as media plays
8. **Share button** — Web Share API on supported devices, clipboard fallback on others
9. **Keyboard shortcuts** — Space (play/pause), M (mute), F (fullscreen for video), arrow keys to seek
10. **Now playing live region** — ARIA live region announces play / pause / finished to screen readers
11. **Reading time estimate** — calculated from transcript word count and displayed in story header
12. **Smooth scroll** — all anchor links scroll smoothly rather than jumping

---

## Accessibility Checklist

### Semantic HTML
- [x] `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`, `<section>`, `<details>`, `<summary>` used correctly throughout
- [x] Logical heading hierarchy on all pages (one `<h1>` per page, then `<h2>`, `<h3>`)
- [x] `<audio>` with `<source>` on the forest story page
- [x] `<video>` with `<source>` and `<track kind="captions">` on the yard story page
- [x] `<figcaption>` describes each media element

### ARIA
- [x] `aria-label` on `<nav>` elements
- [x] `aria-current="page"` on the active nav link
- [x] `aria-labelledby` linking sections to their headings
- [x] `aria-live="polite"` regions for filter results, theme changes, player status
- [x] `aria-pressed` on toggle buttons (theme, speed, filter)
- [x] `aria-expanded` on mobile menu toggle
- [x] `aria-label` on icon-only buttons

### Keyboard Navigation
- [x] Skip link jumps to `#main-content`
- [x] All interactive elements reachable by Tab
- [x] Visible focus rings on all focusable elements (3px solid, WCAG-compliant)
- [x] Mobile menu closes on Escape key
- [x] Media keyboard shortcuts (Space, M, F, arrow keys)

### Colour Contrast
- [x] White text on navy `#15213B` — ratio 15.7:1 (AAA)
- [x] White text on crimson `#D7263D` — ratio 4.96:1 (AA)
- [x] Dark navy on amber `#E8A33D` — ratio 7.4:1 (AA)
- [x] All body text on background — ratio exceeds 7:1 (AAA)

### Media Accessibility
- [x] Audio story includes timestamped expandable transcript
- [x] Video story includes `<track kind="captions">` with `.vtt` file
- [x] Video story also includes expandable transcript with the same content
- [x] Live transcript sync highlights current line as media plays

### Responsive Design
- [x] Mobile-first base styles
- [x] Hamburger menu collapses navigation on screens below 768px
- [x] CSS Grid with `auto-fill` / `minmax` reflows at all breakpoints
- [x] `clamp()` used for hero heading font size
- [x] Container query on card component: switches to horizontal layout at 480px container width

### Other
- [x] `prefers-reduced-motion` disables all animations and transitions
- [x] `prefers-color-scheme: dark` auto-applies dark mode on first visit
- [x] `loading="lazy"` on below-the-fold images
- [x] Print stylesheet strips navigation, preserves transcript content
- [x] `lang="en"` on all `<html>` elements
- [x] `<meta name="description">` on all pages

---

## Sass Architecture

| File | Layer | Purpose |
|---|---|---|
| `_colors.scss` | unlayered | CSS custom properties for both light and dark themes |
| `_typography.scss` | unlayered | Font imports and Sass size/weight variables |
| `_spacing.scss` | unlayered | Spacing scale and radius tokens |
| `_base.scss` | `base` | Reset, body, links, focus rings, skip link, print styles |
| `_layout.scss` | `layout` | Header, nav, hamburger, theme toggle, footer, back-to-top |
| `_components.scss` | `components` | Cards, hero, filter, transcript, speed controls, share, breadcrumb |
| `_about.scss` | `pages` | About-specific hero, grid, steps, contact form |

Cascade layers are declared at the top of `main.scss` in priority order: `base, layout, components, pages`. This gives explicit, specificity-independent control over rule precedence.

---

## Media Credits

- Forest ambience audio — [Pixabay Sound Effects](https://pixabay.com/sound-effects/), used under the Pixabay Content License
- Yard bird video — [Pixabay](https://pixabay.com/videos/bird-nature-yard-colombia-24767/), used under the Pixabay Content License
- All other photos — [Pixabay Images](https://pixabay.com/images/), used under the Pixabay Content License