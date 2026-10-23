# 04 — Image Assets & Naming

You will supply all images. The site is built to accept ~55–65 photographs.

## 1. Naming Convention

All files are lowercase, kebab-case, and end with a number for variants.

### Dishes
```
dish-[slug]-[n].webp
```
Examples:
- `dish-egusi-1.webp`
- `dish-egusi-2.webp`
- `dish-pounded-yam-egusi-1.webp` (combo)
- `dish-party-jollof-1.webp`
- `dish-beef-suya-1.webp`
- `dish-dodo-1.webp`

### Site-wide
```
hero-1.webp
hero-2.webp
hero-3.webp
ambience-1.webp … ambience-8.webp
about-team-1.webp
about-kitchen-1.webp
about-owner-1.webp
```

## 2. Recommended Shot List (~60 images)

| Category              | Items | Shots per item | Total |
|-----------------------|-------|----------------|-------|
| Soups                 | 7     | 2              | 14    |
| Rice                  | 4     | 2              | 8     |
| Pepper soups & grills | 5     | 2              | 10    |
| Swallows (solo)       | 6     | 1              | 6     |
| Proteins              | 8     | 1              | 8     |
| Sides & street        | 5     | 1              | 5     |
| Popular combos        | 7     | 1 (or reuse)   | 7     |
| Hero                  | —     | 3              | 3     |
| Ambience / gallery    | —     | 8              | 8     |
| About                 | —     | 3              | 3     |
| **Grand total**       |       |                | **~72** (safe buffer) |

Combos can reuse the best soup + swallow shots if needed. Prioritise real plated food.

## 3. Technical Requirements

- Format: **WebP** (primary), with JPEG fallback if needed
- Max file size: **≤ 150 KB** per image after compression
- Dimensions:
  - Menu cards: 800 × 600 (4:3)
  - Dish gallery main: 1200 × 900
  - Hero: 1920 × 1080 (or 1600 × 900)
  - Thumbnails: 400 × 300
- Colour space: sRGB
- No heavy filters — natural, appetising light

## 4. Loading Strategy (already planned in code)

- Hero images: priority / eager
- Menu card images: lazy, only the first image of each dish
- Dish detail gallery: first image eager, rest lazy
- Fixed aspect-ratio containers to prevent layout shift
- `next/image` with proper `sizes` attribute

## 5. Placeholder Behaviour

Until real images are uploaded, the site will show a soft green-tinted placeholder with the dish name. Never use AI-generated food images in production.
