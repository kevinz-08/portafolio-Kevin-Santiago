# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Production build
npm run preview   # Preview production build locally
```

No test suite or linter is configured.

## Architecture

Single-page portfolio built with **React 18 + Vite + Tailwind CSS**. The entire app is a single scrollable page; there is no router.

**Page sections** (rendered in order in `App.jsx`):
- `Header` — fixed nav with scroll-spy active link highlighting and theme toggle
- `Hero` — landing section with typewriter effect
- `Services`, `Technologies`, `AboutMe`, `ContactForm` — main content sections
- `Footer`

Each section uses `id` attributes (`#home`, `#services`, `#technologies`, `#about-me`, `#contact-me`) for anchor navigation.

**Custom hooks** (`src/hooks/`):
- `useTheme` — dark/light mode via `localStorage` + `dark` class on `<html>`. Dark is the default.
- `useScrollSpy` — `IntersectionObserver`-based active section detection, used by `Header` to highlight the current nav link.
- `useTypewriter` — animated text typing effect used in `Hero`.
- `useParallax` — scroll-based parallax helper.
- `useCounter` — numeric count-up animation.

**Theming:** Tailwind's `darkMode: 'class'` strategy. All theme colors are defined in `tailwind.config.js` under the `colors` extension (`primary`, `text`, `bg`, `border`). Use these semantic tokens rather than raw Tailwind colors. The orange brand color is `primary` (`#FD6F00`).

**Typography:** Custom Lato font variants loaded via `@font-face` in `index.css`. Use `font-lato-bold`, `font-lato-medium`, `font-lato-semibold`, `font-lato-extrabold`, or `font-lato-black` utility classes — do not use generic Tailwind font utilities.

**Contact form:** Uses EmailJS (`@emailjs/browser`). Service ID, template ID, and public key are hardcoded in `ContactForm.jsx`. AOS (Animate On Scroll) is initialized in `App.jsx` via the `window.AOS` global loaded from CDN (not an npm import).
