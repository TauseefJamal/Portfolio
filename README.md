# Tauseef Portfolio

Personal portfolio site built with React + TypeScript. Features smooth scroll animations, a projects showcase, skills section, and a working contact form.

---

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v3
- GSAP (scroll animations)

**UI Components**
- shadcn/ui
- Radix UI primitives
- Lucide icons

**Forms**
- React Hook Form
- Zod validation
- EmailJS (contact form)

---

## Getting Started

**Prerequisites**
- Node.js 18+
- npm

**Install dependencies**
```bash
npm install
```

**Start dev server**
```bash
npm run dev
```

Runs on `http://localhost:5173`

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Project Structure

src/
├── components/     # Reusable UI components
├── sections/       # Page sections (Hero, About, Skills, etc.)
├── hooks/          # Custom React hooks
├── types/          # TypeScript types
├── App.tsx         # Root component
└── index.css       # Global styles

---

## Deployment

Build the project and deploy the `dist/` folder to any static host.
```bash
npm run build
```

Works with Vercel, Netlify, GitHub Pages, or any CDN.

---

## License

MIT