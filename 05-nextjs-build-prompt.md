# 05 — Next.js Build Prompt

Copy everything below this line into your AI coding agent or developer brief.

---

## Project: Taste of Naija — Restaurant Ordering Website

Build a production-ready, mobile-first website for a Nigerian restaurant called **Taste of Naija**.

### Tech Stack (latest as of late 2026)
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (for all meaningful motion)
- **Lucide React** for icons
- **next/font** for Bricolage Grotesque + Plus Jakarta Sans
- **Paystack** inline / redirect for payments (test keys first)
- No CMS for v1 — menu data lives in a typed TypeScript file or JSON
- Deploy target: Vercel

### Core Pages
1. `/` — Home (hero, popular dishes, how it works, CTA)
2. `/menu` — Full menu with sticky category tabs + search
3. `/dish/[slug]` — Dish detail with image gallery + “Order this”
4. `/order` — 3-step interactive ordering flow
5. `/cart` or integrated cart drawer / bottom sheet
6. `/checkout` — final confirmation (can be part of step 3)
7. `/order/confirmation/[id]`
8. `/gallery`
9. `/about`
10. `/contact`
11. `/faq`
12. `/delivery-info`

### Design System
Follow the colours, typography, spacing and components defined in `01-design-system.md` exactly.
Primary green `#0F7B3C`, cream background `#F8F5F0`, orange only for “Add” actions.

### Ordering Rules (non-negotiable)
- Dine-in: menu price + time slot, pay at restaurant
- Takeaway: menu price + ₦250 **per pack**
- Delivery: menu price + ₦3,000 flat (waived if subtotal ≥ ₦35,000)
- Minimum delivery order: ₦10,000
- A pack = every main dish / plate / combo
- Proteins and sides are never packs

### 3-Step Order Flow
Must be implemented as a single page with clear steps and a persistent live total.
- Step 1: Main dish selection (with popular combo shortcuts)
- Step 2: Proteins, sides, spice level
- Step 3: Order type + details + payment

Live total must animate smoothly when quantities change.

### Images
- Expect 55–70 real WebP images supplied by the owner
- Use the exact naming convention in `04-image-assets.md`
- `next/image` everywhere, proper `sizes`, lazy loading, fixed aspect ratios
- **Do not generate or use AI food images**

### Motion Requirements
All interactive components must feel **swift and fluid**.
Follow the detailed rules in `06-motion-and-interaction.md`:
- Spring animations for numbers and layout
- 200–350 ms for most transitions
- Respect `prefers-reduced-motion`
- No janky or slow animations

### Other Requirements
- Fully responsive (mobile first)
- Accessible (keyboard, focus rings, ARIA, contrast)
- SEO basics (title, meta, Open Graph)
- Clean folder structure (`app/`, `components/`, `lib/`, `data/`, `types/`)
- Menu data in `data/menu.ts` with full TypeScript types
- Cart state with Zustand or React Context + useReducer (persist to localStorage)
- Optimistic UI where sensible

### Out of Scope for v1
- Real-time kitchen dashboard
- User accounts / order history
- Multiple restaurant locations
- Complex delivery zone pricing

### Deliverable
A clean, well-structured Next.js project that can be opened in Cursor / VS Code and run with `npm run dev`. All pages linked, ordering flow fully functional on the front end, Paystack in test mode.

---

End of build prompt.
