import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    orderId: v.string(),
    reference: v.string(),
    status: v.string(), // "confirmed" | "preparing" | "out_for_delivery" | "ready" | "completed" | "cancelled"
    type: v.string(), // "dine-in" | "takeaway" | "delivery"
    items: v.array(
      v.object({
        id: v.string(),
        itemId: v.string(),
        name: v.string(),
        category: v.string(),
        price: v.number(),
        quantity: v.number(),
        isPack: v.boolean(),
        selectedSpice: v.optional(v.string()),
        meta: v.optional(
          v.object({
            swallowName: v.optional(v.string()),
            soupName: v.optional(v.string()),
            packLabel: v.optional(v.string()),
          })
        ),
      })
    ),
    subtotal: v.number(),
    takeawayPacks: v.number(),
    takeawayFee: v.number(),
    deliveryFee: v.number(),
    total: v.number(),
    customer: v.object({
      name: v.string(),
      phone: v.string(),
      email: v.optional(v.string()),
      timeSlot: v.optional(v.string()),
      pickupTime: v.optional(v.string()),
      address: v.optional(v.string()),
      city: v.optional(v.string()),
      landmark: v.optional(v.string()),
      deliveryNotes: v.optional(v.string()),
    }),
    paymentMethod: v.string(), // "paystack" | "pay_at_restaurant"
    paymentReference: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_reference", ["reference"])
    .index("by_status", ["status"]),

  menuItems: defineTable({
    itemId: v.string(),
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    price: v.number(),
    unit: v.optional(v.string()),
    description: v.string(),
    isPack: v.boolean(),
    isPopular: v.optional(v.boolean()),
    isSpicy: v.optional(v.boolean()),
    spiceLevel: v.optional(v.string()),
    ingredients: v.array(v.string()),
    allergens: v.optional(v.array(v.string())),
    calories: v.optional(v.string()),
    image: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),
});
