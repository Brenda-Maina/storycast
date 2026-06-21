# StoryCast – Accessible Storytelling Microsite

**Author:** Brenda Maina  
**GitHub:** [Brenda-Maina](https://github.com/Brenda-Maina)

## Overview
A 3-page accessible microsite showcasing audio and video stories. Built with semantic HTML5, Sass (partials, tokens, BEM), CSS Grid/Flexbox, and a container-queried media card.

## Pages
- `index.html` – Home page with hero and featured stories.
- `story/echoes-of-the-forest.html` – Audio story with transcript.
- `story/a-visitor-in-the-yard.html` – Video story with `<track>` captions and transcript.
- `about.html` – Mission, accessibility commitment, and contact form.

## How to Run Locally
1. Clone the repo and open in GitHub Codespaces.
2. `npm install`
3. `npm run compile:sass`
4. Open `index.html` with the Live Server extension.

## Media Credits
- Forest ambience audio — Pixabay, used under the Pixabay Content License.
- Yard bird video — Pixabay (pixabay.com/videos/bird-nature-yard-colombia-24767/), used under the Pixabay Content License.

## Accessibility Features
- Semantic HTML5 (`header`, `nav`, `main`, `article`, `figure`, `figcaption`, `aside`, `details`)
- Logical heading hierarchy
- Skip-to-main-content link, visible focus states on all interactive elements
- Video includes `<track kind="captions">`; audio includes a full text transcript
- ARIA used where semantic HTML alone isn't sufficient
- WCAG 2.1 AA colour contrast
- Fully keyboard-navigable; no functionality depends on JavaScript

## Project Structure
\```
├── index.html
├── about.html
├── story/
│   ├── echoes-of-the-forest.html
│   └── a-visitor-in-the-yard.html
├── sass/
├── css/
├── assets/media/
├── package.json
└── README.md
\``` 