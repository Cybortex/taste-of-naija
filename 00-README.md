# Taste of Naija — Website Documentation Pack

**Version:** 1.0  
**Date:** 23 October 2026  
**Status:** Ready for development  

This pack contains everything needed to build the **Taste of Naija** restaurant website — a modern, mobile-first ordering experience focused on authentic Nigerian dishes.

## Contents

| File | Purpose |
|------|---------|
| `00-README.md` | This overview |
| `01-design-system.md` | Colours, typography, spacing, components, accessibility |
| `02-menu-and-pricing.md` | Complete menu with prices and pack rules |
| `03-ordering-flow.md` | 3-step interactive ordering + fees + status flow |
| `04-image-assets.md` | Image requirements, naming convention, optimisation |
| `05-nextjs-build-prompt.md` | Full technical prompt for Next.js implementation |
| `06-motion-and-interaction.md` | Framer Motion + CSS guidelines for swift, fluid motion |

## Quick Brand Snapshot

- **Name:** Taste of Naija
- **Primary colour:** Deep palm green `#0F7B3C`
- **Accent:** Bright green `#22C55E` + warm orange `#F26A1B`
- **Background:** Warm cream `#F8F5F0`
- **Core experience:** Browse → 3-step order → Paystack (takeaway/delivery)
- **Target:** Nigerian diners who want to pre-order, take away, or get home delivery of real buka-style food

## Order Rules (Locked)

| Order Type       | Fee                          | Payment          | Notes                          |
|------------------|------------------------------|------------------|--------------------------------|
| Dine-in pre-order| None                         | At restaurant    | Requires time slot             |
| Takeaway         | ₦250 **per pack**            | Online (Paystack)| Pack = every main dish/plate/combo |
| Home Delivery    | ₦3,000 flat                  | Online (Paystack)| Min order ₦10,000. Free delivery ≥ ₦35,000 |

## Next Steps

1. Review all documents in this pack.
2. Supply images following the naming convention in `04-image-assets.md`.
3. Use `05-nextjs-build-prompt.md` as the primary instruction set for the developer / AI builder.
4. Follow motion rules in `06-motion-and-interaction.md` for all interactive components.

---

**Owner decisions locked as of 23 Oct 2026.**  
No further changes to fees, name, or colour system without explicit approval.
