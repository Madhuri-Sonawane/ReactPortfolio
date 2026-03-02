# Madhuri Sonawane — React Portfolio

A personal developer portfolio built with React 19, Vite 7, Tailwind CSS v4, and GSAP 3. Features a 3D animated background built with Three.js, smooth scroll animations, interactive project modals, and a fully functional contact form.

**Live Site:** https://react-portfolio-gold-delta.vercel.app/


**GitHub:** https://github.com/Madhuri-Sonawane/ReactPortfolio

---

## Tech Stack

- React 19 + React Router DOM 7
- Vite 7
- Tailwind CSS v4
- GSAP 3.14 with ScrollTrigger
- Three.js
- EmailJS
- react-icons
- Fonts: Sora, DM Sans

---

## Pages

- **Home** — Hero with typewriter animation and a 3D rotating monitor showing code, React logo, and skill bars
- **About** — Bento grid layout with interactive academic timeline (hover to highlight each qualification)
- **Projects** — Editorial row layout with a slide-in overlay modal for each project
- **Experience** — Sidebar tab switcher with terminal-style job cards and animated contributions
- **Contact** — Split-screen layout with floating label inputs and EmailJS integration

---

## Getting Started

```bash
git clone https://github.com/Madhuri-Sonawane/ReactPortfolio.git
cd ReactPortfolio
npm install
npm run dev
```

Open http://localhost:5173

```bash
# Production build
npm run build
```

---

## Configuration

**Resume**
Place your PDF at `public/Madhuri_Sonawane.pdf`. It is linked in the hero section automatically.

**EmailJS**
Update the service ID, template ID, and public key in `src/sections/Contact.jsx` with your credentials from emailjs.com.

**Social links**
Update your email, GitHub, and LinkedIn URLs in `src/sections/Contact.jsx`.

**Projects**
Add or edit projects in `src/data/projects.js`. Each project takes a title, description, points array, tech array, image path, live URL, and code URL.

**Adding a new job**
Open `src/pages/ExperiencePage.jsx` and add a new object to the `EXPERIENCES` array. Each entry takes an id, title, company, period, type, location, current (boolean), color (sky / indigo / emerald / amber / rose), summary, and a contributions array.

---

## Project Structure

```
src/
├── components/
│   ├── NavBar.jsx
│   ├── HeroCodeVisual.jsx
│   ├── HeroBackground.jsx
│   └── GlobalBackground.jsx
├── sections/
│   ├── Hero.jsx
│   ├── Skills.jsx
│   └── Contact.jsx
├── pages/
│   ├── AboutPage.jsx
│   ├── ProjectsPage.jsx
│   ├── ExperiencePage.jsx
│   └── ContactPage.jsx
├── data/
│   └── projects.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## License

MIT — feel free to use this as a reference or starting point for your own portfolio.

Author
Madhuri Sonawane
