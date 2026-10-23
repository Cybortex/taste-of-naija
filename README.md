# Taste of Naija — Restaurant Ordering Website

Production-ready, mobile-first website for **Taste of Naija** — an authentic Nigerian buka kitchen based in Victoria Island, Lagos.

Built strictly according to the client documentation pack:
- `01-design-system.md`
- `02-menu-and-pricing.md`
- `03-ordering-flow.md`
- `04-image-assets.md`
- `05-nextjs-build-prompt.md`
- `06-motion-and-interaction.md`

---

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS with custom brand design tokens
- **Animations:** Framer Motion (Swift 200–300ms spring & layout transitions, respects `prefers-reduced-motion`)
- **Icons:** Lucide React
- **Typography:** Bricolage Grotesque (Headings) & Plus Jakarta Sans (Body, Buttons & UI)
- **State Management:** Custom React Context + `localStorage` persistence

---

## Core Pages Implemented

1. **`/` (Home)**
   - Hero section with cultural badges and dual CTAs ("Start 3-Step Order", "Explore Menu")
   - Featured Popular Combo hero showcase (Pounded Yam & Egusi)
   - 3-Step ordering process breakdown cards
   - Popular Buka Combos grid with quick order actions
   - Firewood Delights (Party Jollof, Suya, Asun, Dodo) showcase
   - Buka heritage storytelling banner
   - Verified customer reviews from Lagos foodies

2. **`/menu` (Full Menu)**
   - Sticky category navigation pills (All, Combos, Rice, Grills, Soups, Swallows, Proteins, Sides)
   - Real-time search by name, description, and key ingredients
   - Quick filters for "Popular Only" and "Spicy / Hot Only"
   - Transparent packaging & delivery rule banner

3. **`/dish/[slug]` (Dynamic Dish Detail)**
   - Dish visual representation with cultural fallback placeholder
   - Badges (Popular, Spicy, 1 Pack)
   - Clear pricing (`₦2,500`) and unit breakdown
   - Natural ingredients list and allergen notices
   - Kitchen spice level selector (Mild / Medium / Hot)
   - Quantity stepper and animated Add to Order button
   - Recommended pairings based on traditional buka dining

4. **`/order` (3-Step Interactive Plate Builder)**
   - Top connected step indicator with status progress
   - **Step 1 — Main Dish:** Popular combo shortcuts, rice plates, grills & pepper soups, and custom swallow + soup mixer
   - **Step 2 — Proteins & Sides:** Beef, Ponmo, Shaki, Goat Meat, Chicken, Fish, Turkey, Dodo, and Moi Moi with zero pack fees + spice level selector
   - **Step 3 — Fulfilment & Checkout:** Selection between Dine-in, Takeaway, and Home Delivery with form inputs and Paystack test mode integration
   - **Desktop Sticky Sidebar:** Live calculating total with spring animations and free delivery tracker

5. **`/cart` & Slide-Over Drawer (`components/cart/CartDrawer.tsx`)**
   - Accessible drawer triggered from any page
   - Order type toggle (Takeaway, Delivery, Dine-in)
   - Itemized list with quantity steppers and quick removal
   - Live fee breakdown and checkout link

6. **`/checkout` (Dedicated Checkout)**
   - Final review and submission screen

7. **`/order/confirmation/[id]` (Order Status Tracking)**
   - Real-time status progress: Order Received → In The Pot → With Dispatch / Ready for Pickup → Completed
   - Itemized order receipt with fees, customer details, and order ID
   - WhatsApp quick chat support button

8. **`/gallery` (Kitchen & Ambience)**
   - Dining room ambience, firewood pots, and dish presentation

9. **`/about` (Our Story)**
   - The culinary philosophy of Taste of Naija, authentic firewood traditions, and local ingredient sourcing from Mile 12, Oyingbo, Delta, and Kano

10. **`/contact` (Contact & Table Reservations)**
    - Victoria Island address, telephone numbers, opening hours, and table reservation form

11. **`/delivery-info` (Delivery Zones & Packaging Rules)**
    - Full explanation of the ₦250 takeaway pack fee
    - Minimum delivery order (₦10,000) and Free Delivery threshold (≥ ₦35,000)
    - Delivery time estimates across VI, Ikoyi, Lekki Phase 1 & 2, and Marina

12. **`/faq` (Frequently Asked Questions)**
    - Accordion addressing packaging, spill prevention, payment methods, and spice customization

---

## Locked Business & Fee Rules

| Order Type | Fee | Payment | Rules |
|---|---|---|---|
| **Dine-in Pre-order** | ₦0 | At restaurant | Requires arrival time slot |
| **Takeaway** | ₦250 per pack | Online (Paystack) | Pack = every main dish, plate, or combo |
| **Home Delivery** | ₦3,000 flat | Online (Paystack) | Min order ₦10,000. **FREE Delivery** when subtotal ≥ ₦35,000 |

*Proteins and sides are never charged pack fees.*

---

## How to Run Locally

```bash
# Start development server
npm run dev

# Open in browser
http://localhost:3000
```
