# 06 — Motion & Interaction Guidelines

**Goal:** Every interaction should feel *swift, fluid, and confident* — never sluggish or bouncy for the sake of it.

We use **Framer Motion** for almost all meaningful motion and CSS transitions for simple hover/focus states.

---

## 1. Global Motion Tokens

```ts
// lib/motion.ts
export const duration = {
  instant: 0.12,
  fast: 0.18,
  normal: 0.28,
  slow: 0.4,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],          // smooth deceleration
  inOut: [0.4, 0, 0.2, 1],
  spring: { type: "spring", stiffness: 400, damping: 28 },
  softSpring: { type: "spring", stiffness: 300, damping: 30 },
} as const;
```

---

## 2. Core Principles

1. **Fast by default** — most transitions finish in ≤ 300 ms.
2. **Spring for numbers and layout** — price total, quantity, cart count.
3. **Fade + slight rise** for content appearing (8–12 px).
4. **Shared layout animations** (`layout` prop) for cards moving between states.
5. **Never block the main thread** — keep animations on transform and opacity.
6. **Respect reduced motion** — wrap every animation:

```tsx
const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={shouldReduceMotion ? { duration: 0 } : ease.softSpring}
>
```

---

## 3. Specific Component Behaviours

### Quantity Stepper
- Number scales up slightly (1 → 1.08 → 1) on change
- − / + buttons have a quick scale press (`whileTap={{ scale: 0.88 }}`)
- Duration: 180 ms spring

### Live Total / Price
- Use `AnimatePresence` + `motion.span` with `key={total}`
- Old number fades out & slides up, new number fades in & slides up from below
- Or use a simple spring on the numeric value with `useSpring` + `useTransform`

### Add to Order button
- On success: brief checkmark morph or scale pulse
- Cart icon in header gets a small pop (`scale: 1.15`) and the badge number animates

### Step transitions (Order flow)
- Horizontal slide (x: 20 → 0) + fade
- Direction aware (forward = from right, back = from left)
- Duration 280 ms, ease out

### Menu cards
- Hover (desktop): `y: -4`, shadow increase, 200 ms
- Tap: scale 0.98
- Image has a very subtle zoom on hover (1.03)

### Bottom bar / Sticky cart
- Slides up from bottom when first item is added
- Height animates smoothly when content changes
- Safe-area padding respected

### Badges & Toasts
- Enter: scale 0.9 → 1 + fade
- Exit: fade + slight scale down
- Auto-dismiss toasts: 3.5 s

### Page transitions
- Simple fade (opacity) for route changes — keep extremely light
- Prefer shared element transitions only for dish images when going from menu → detail

---

## 4. Micro-interactions Checklist

| Element              | Motion                                      | Duration |
|----------------------|---------------------------------------------|----------|
| Button press         | scale 0.96                                  | 100 ms   |
| Primary button hover | background colour + slight lift             | 180 ms   |
| Card hover           | y: -4 + shadow                              | 200 ms   |
| Quantity change      | number spring + button scale                | 180 ms   |
| Total price update   | spring number or cross-fade                 | 250 ms   |
| Step change          | slide + fade                                | 280 ms   |
| Cart badge           | pop scale                                   | 300 ms   |
| Modal / Sheet        | slide up + fade backdrop                    | 320 ms   |
| Success check        | scale + draw                                | 400 ms   |

---

## 5. Performance Rules

- Prefer `transform` and `opacity` only
- Use `layout={false}` when you don’t need shared layout
- Avoid animating `height` on large lists — use `AnimatePresence` with fixed items or measure once
- Lazy-load Framer Motion components if the page is heavy
- Test on mid-range Android devices — motion must stay at 60 fps

---

## 6. Reduced Motion Fallback

When `prefers-reduced-motion: reduce` is active:
- All springs become instant duration 0
- No entrance animations
- Hover states remain (colour / shadow only)
- Focus rings still appear

This is non-negotiable for accessibility.

---

## 7. Implementation Tip

Create a small set of reusable motion components:

```tsx
// components/motion/FadeIn.tsx
// components/motion/SlideIn.tsx
// components/motion/AnimatedNumber.tsx
// components/motion/Pressable.tsx
```

Use them consistently across the whole site so the motion language stays coherent.
