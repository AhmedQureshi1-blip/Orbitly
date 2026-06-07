[README (5).md](https://github.com/user-attachments/files/28678296/README.5.md)
# Orbitly — Digital Products Design Studio

A premium, fully interactive design agency landing page built with React, TypeScript, and Tailwind CSS. Orbitly showcases a fictional high-end studio offering brand strategy, digital product design, creative web development, and spatial design direction — with rich micro-animations, live widgets, and a polished dark aesthetic.

---

## Features

- **Animated Hero Section** — Full-screen background video with smooth scroll navigation and an animated rotating logo
- **Services Showcase** — Interactive slide-indicator layout presenting four core service offerings with deliverable lists
- **Live Project Widgets** — Each featured project includes an interactive element: a metric slider (Aether Platform), a real-time coordinate tracker (Vesper Spatial OS), and a theme toggle (Nova Ecosystem)
- **Partner Ticker** — Auto-scrolling marquee of client partners with project details and outcome metrics
- **About Stats** — Clickable counters for brand, award, and retention statistics
- **Clock Widget** — Live dual-timezone display (San Francisco & Zurich) with office-hours availability status
- **Fullscreen Navigation Menu** — Overlay menu with staggered entrance animations and social links
- **Contact Modal** — Slide-up modal with a project inquiry form including service selection
- **Inline Contact Form** — Embedded form in the main page for direct project outreach
- **Fully Responsive** — Mobile-first layout that adapts cleanly across all screen sizes

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Build Tool | Vite 6 |
| Server (optional) | Express |

---

## Project Structure

```
orbitly/
├── index.html                        # App entry point & page title
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example                      # Environment variable template
├── src/
│   ├── main.tsx                      # React root mount
│   ├── App.tsx                       # Main page layout & all sections
│   ├── index.css                     # Global base styles
│   ├── data.ts                       # Static data: services, projects, partners
│   └── components/
│       ├── FullscreenMenu.tsx        # Overlay navigation menu
│       ├── ContactModal.tsx          # Project inquiry modal
│       └── ClockWidget.tsx           # Live dual-timezone clock
└── assets/
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/orbitly.git
   cd orbitly
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in the required values (see [Environment Variables](#environment-variables) below).

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Compile TypeScript and bundle for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` and `server.js` build artifacts |

---

## Environment Variables

Copy `.env.example` to `.env` and configure the following:

| Variable | Description |
|---|---|
| `APP_URL` | The URL where the app is hosted (used for self-referential links and API callbacks) |

---

## Customization

### Updating Content

All static content — services, projects, and client partners — is centralized in `src/data.ts`. Edit the exported arrays (`SERVICES_DATA`, `PROJECTS_DATA`, `PARTNERS_DATA`) to reflect your own studio's offerings and portfolio.

### Navigation Links

Navigation items in the fullscreen menu are defined inside `src/components/FullscreenMenu.tsx` in the `menuItems` array. Update the titles and anchor hrefs to match your sections.

### Color & Theming

The project uses Tailwind CSS v4 utility classes throughout. Global base styles are in `src/index.css`. The primary color accents are orange/amber — these can be updated by replacing the relevant Tailwind color classes across the components.

### Background Video

The hero section references a background video. Place your video file in the `assets/` directory and update the `<video>` element's `src` attribute in `src/App.tsx` accordingly.

---

## Deployment

Build the project for production:

```bash
npm run build
```

The output is placed in the `dist/` directory and can be deployed to any static hosting provider such as Vercel, Netlify, or Cloudflare Pages.

For server-side deployments (e.g., Cloud Run), the project includes an optional Express server entry. Ensure `APP_URL` is set correctly in your environment.

---

## Contributing

Contributions, bug reports, and feature suggestions are welcome. Please open an issue or submit a pull request.

---

## License

This project is private and proprietary. Unauthorized use, reproduction, or distribution is not permitted without explicit written permission.

---

## Contact

For any queries, collaborations, or project inquiries, feel free to reach out:

**Ahmed Qureshi**
📧 [ahmedak47qureshi@gmail.com](mailto:ahmedak47qureshi@gmail.com)
