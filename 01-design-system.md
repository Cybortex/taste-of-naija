# 01 — Design System

## 1. Brand Identity

**Name:** Taste of Naija  
**Tagline options:**  
- “Real Nigerian food, made with pride”  
- “From our pot to your table”  
- “Buka flavour, modern convenience”

**Voice:** Warm, proud, straightforward, never pretentious. Short sentences. Nigerian English is welcome in microcopy (“Wetin you wan order?” is fine on mobile).

---

## 2. Colour Palette

| Role                    | Hex        | Tailwind equivalent (recommended) | Usage |
|-------------------------|------------|------------------------------------|-------|
| Primary Green           | `#0F7B3C`  | `green-800` custom                 | Primary buttons, active nav, headers, links |
| Accent Green            | `#22C55E`  | `green-500`                        | Hover states, focus rings, success |
| Cream Background        | `#F8F5F0`  | `stone-50` custom                  | Page background |
| Pure White              | `#FFFFFF`  | `white`                            | Cards, modals, inputs |
| Secondary Orange        | `#F26A1B`  | `orange-500`                       | “Add to order”, secondary CTAs, spicy indicators |
| Gold                    | `#F5C518`  | `yellow-400`                       | “Popular” badges |
| Chili Red               | `#D7263D`  | `red-600`                          | “Hot / Spicy” tags, errors |
| Deep Text               | `#1A2E1A`  | `green-950`                        | Body text, headings |
| Muted Text              | `#4A5D4A`  | `green-800/70`                     | Secondary text, captions |
| Border / Divider        | `#E5E0D8`  | `stone-200`                        | Subtle borders |
| Success                 | `#16A34A`  | `green-600`                        | Confirmed, free delivery unlocked |
| Warning                 | `#D97706`  | `amber-600`                        | Low stock, minimum not met |

### Colour Usage Rules
- Primary buttons → solid `#0F7B3C` with white text.
- Hover / active → `#22C55E` or a slightly darker green.
- Orange is reserved for action that adds value (“Add”, “Order this”).
- Never put orange text on cream or white for body copy — contrast is too low.
- Use gold and chili only as small badges (pill shape, 11–12 px text).

---

## 3. Typography

**Headings:** Bricolage Grotesque (Google Fonts)  
**Body / UI:** Plus Jakarta Sans (Google Fonts)

| Element              | Font                    | Weight | Size (mobile → desktop) | Line height |
|----------------------|-------------------------|--------|--------------------------|-------------|
| Hero / Page title    | Bricolage Grotesque     | 700    | 32 → 48 px               | 1.15        |
| Section heading      | Bricolage Grotesque     | 600    | 24 → 32 px               | 1.2         |
| Card title           | Bricolage Grotesque     | 600    | 18 → 20 px               | 1.3         |
| Body                 | Plus Jakarta Sans       | 400    | 15 → 16 px               | 1.6         |
| Small / Caption      | Plus Jakarta Sans       | 500    | 12 → 13 px               | 1.4         |
| Button               | Plus Jakarta Sans       | 600    | 14 → 15 px               | 1            |
| Price                | Plus Jakarta Sans       | 700    | 16 → 18 px               | 1            |

**Font loading:** Use `next/font` with `display: "swap"`. Preload the two families.

---

## 4. Spacing & Layout

- Base unit: **4 px**
- Common scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
- Container max-width: `1200px` (centred)
- Section vertical padding: `48px` mobile → `80px` desktop
- Card border-radius: `16px`
- Button border-radius: `12px`
- Badge border-radius: `9999px` (pill)
- Input border-radius: `12px`

**Grid**
- Menu cards: 1 column mobile → 2 tablet → 3 desktop
- Dish detail gallery: 1 main + thumbnails below / side

---

## 5. Core Components

### Buttons
- **Primary:** solid green, white text, height 48 px
- **Secondary:** white + green border, green text
- **Orange action:** solid orange, white text (used for “Add to order”)
- **Ghost:** transparent, green text
- All buttons have a minimum tap target of 44 × 44 px.

### Cards
- White background, subtle shadow (`0 4px 20px rgba(26,46,26,0.06)`)
- Hover: slight lift (`translateY(-2px)`) + stronger shadow
- Image aspect ratio locked at `4/3` or `1/1` depending on context

### Badges
- Popular → gold background, deep text
- Spicy / Hot → chili background, white text
- Free delivery unlocked → green background, white text

### Quantity Stepper
- Circular − / + buttons (44 px)
- Number centred, bold
- Disabled state when quantity = 0 or at max

### Sticky elements
- Desktop: right sidebar cart (sticky top-24)
- Mobile: bottom bar with total + “View order” (safe-area aware)

### Form inputs
- Height 48 px
- Border `#E5E0D8`, focus ring `#22C55E` (2 px)
- Error state: chili border + message below

---

## 6. Accessibility

- Colour contrast ≥ 4.5:1 for text
- All interactive elements keyboard reachable
- Focus visible (green ring)
- `prefers-reduced-motion: reduce` must disable all non-essential animation
- Alt text required for every food image
- ARIA labels on steppers, cart, and order type toggles

---

## 7. Iconography

Use **Lucide React** (already tree-shakeable with Next.js).  
Preferred icons: `Plus`, `Minus`, `ShoppingBag`, `MapPin`, `Clock`, `ChevronRight`, `Check`, `Flame`, `Star`, `Truck`, `Utensils`.

Do **not** use illustrated food icons — only real photography.
