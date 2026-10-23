# 03 — Ordering Flow & Business Rules

## 1. High-level Flow

```
Browse Menu / Dish Detail
        ↓
   “Order this” or “Start order”
        ↓
┌─────────────────────────────────────┐
│  Step 1 – Main Dish                 │
│  (type → swallow/soup or rice etc.) │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  Step 2 – Proteins, Sides, Spice    │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  Step 3 – Order Type + Details      │
│  + Live total + Pay                 │
└─────────────────────────────────────┘
        ↓
   Confirmation page
```

Customers can add multiple mains to one order. The live total updates instantly.

---

## 2. Step Details

### Step 1 – Main Dish
- Tabs or segmented control: **Swallow + Soup** | **Rice** | **Pepper Soup & Grills** | **Street Food**
- For Swallow + Soup:
  - Choose swallow (with quantity stepper)
  - Choose soup (with quantity stepper)
  - Or tap a Popular Combo card (pre-fills both)
- For other categories: simple card grid with quantity steppers
- “Continue” button only enabled when at least one main is selected

### Step 2 – Add-ons
- Proteins grid with steppers
- Sides grid with steppers
- Spice level (Mild / Medium / Hot) — shown only when a soup, pepper soup, or grill is in the order
- Smart suggestions: “Goes well with Dodo”, “Add fried chicken?”

### Step 3 – Checkout
- Order type selector (three large cards):
  - **Dine-in** – pick time slot
  - **Takeaway** – pick ready time
  - **Delivery** – enter address + phone
- Live price breakdown:
  ```
  Subtotal                ₦12,400
  Takeaway fee (3 packs)     ₦750
  Delivery fee             ₦3,000
  ─────────────────────────────
  Total                   ₦16,150
  ```
- Free delivery progress bar when Delivery is selected and subtotal < ₦35,000
- Minimum order warning if Delivery and subtotal < ₦10,000
- Paystack button for Takeaway & Delivery
- “Confirm pre-order” for Dine-in (no payment required)

---

## 3. Fee Logic (source of truth)

```ts
function calculateFees(order: Order) {
  const packs = order.items.filter(i => i.isPack).reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  let takeawayFee = 0;
  let deliveryFee = 0;

  if (order.type === "takeaway") {
    takeawayFee = packs * 250;
  }

  if (order.type === "delivery") {
    if (subtotal < 10000) {
      throw new Error("Minimum order for delivery is ₦10,000");
    }
    deliveryFee = subtotal >= 35000 ? 0 : 3000;
  }

  return {
    subtotal,
    takeawayFee,
    deliveryFee,
    total: subtotal + takeawayFee + deliveryFee,
  };
}
```

---

## 4. Order Statuses

| Status              | Meaning                              | Visible to customer |
|---------------------|--------------------------------------|---------------------|
| Awaiting payment    | Paystack not yet confirmed           | Yes                 |
| Confirmed           | Paid or dine-in accepted             | Yes                 |
| Preparing           | Kitchen has started                  | Yes                 |
| Ready               | Ready for pickup                     | Yes                 |
| Out for delivery    | Rider has left                       | Yes                 |
| Completed           | Delivered / collected / eaten        | Yes                 |
| Cancelled / Expired | Unpaid timeout or manual cancel      | Yes                 |

Unpaid Takeaway/Delivery orders expire after **20 minutes**.

---

## 5. Live Total Behaviour

- Always visible (sticky sidebar on desktop ≥ 1024 px, bottom bar on mobile)
- Animates number changes with a short spring (see motion doc)
- Shows free-delivery progress when relevant
- “View order” expands a full summary sheet on mobile

---

## 6. Edge Cases

- Customer can go back to Step 1 or 2 and edit quantities — total updates live
- Removing the last main dish returns user to Step 1
- Spice level resets if all spicy items are removed
- Address validation is lightweight for v1 (required fields only)
