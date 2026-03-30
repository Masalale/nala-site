# NALA 🧼

**Online storefront for Nature's Lather — handcrafted organic soaps from Kenya.**

Pure ingredients. Pure clean. No parabens, no sulfates, just nature's best for your skin.

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Convex](https://img.shields.io/badge/Convex-001428?style=flat-square&logo=convex&logoColor=white)](https://convex.dev/)

## About

Nala is an e-commerce web application built for Nature's Lather, a Kenyan micro-enterprise specialising in handcrafted organic soaps made from natural beef and goat tallow — no chemicals, no additives.

The site was created to solve the challenge of managing sales across WhatsApp, Instagram, and in-person channels with no centralised system: no shared catalogue, no automated invoicing, and no way to track customer orders.

## Features

- **Product Catalogue** — Browse all products with descriptions, ingredients, and pricing
- **Shopping Cart** — Add, remove, and update quantities with persistent state
- **WhatsApp Checkout** — Orders sent directly to the seller's WhatsApp
- **PDF Invoices** — Automatic invoice generation per order with unique reference
- **Reorder** — Customers can reorder from a past invoice via a secure link
- **Sold-Out Handling** — Graceful UI states for unavailable products
- **Responsive** — Mobile-first design optimised for Kenyan mid-range smartphones

## Tech Stack

- **React 19** — UI library
- **Vite** — Build tool
- **Tailwind CSS v4** — Styling
- **TypeScript** — Type safety
- **Convex** — Serverless backend and database
- **jsPDF + html2canvas** — Client-side PDF invoice generation
- **Lenis** — Smooth scrolling
- **React Router v7** — Client-side routing
- **Sonner** — Toast notifications
- **Vercel** — Deployment

## Getting Started

### Prerequisites

- **Node.js 18+** or **Bun 1.0+**
- A **Convex** account ([convex.dev](https://convex.dev))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Masalale/nala-site
   cd nala-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   Follow the prompts to create a free Convex project and link it to this codebase.

4. **Configure environment variables**
   After running `convex dev`, copy your Convex deployment URL into a `.env.local` file:
   ```env
   VITE_CONVEX_URL=<your-convex-deployment-url>
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

6. **Open the app**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Deployment

The site is deployed on **Vercel**. To deploy your own version:

1. Push your code to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Add your `VITE_CONVEX_URL` environment variable in Vercel's project settings
4. Deploy

## Documentation

- **SRS Document:** [Google Doc](https://docs.google.com/document/d/1lJAB24ouQ2NoWsK-jkQs2DCRZoReRsZy_QWTUTI6N-4/edit?usp=sharing)

---

Nala — Nature's Lather 🧼
