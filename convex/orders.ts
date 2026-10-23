import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    orderId: v.string(),
    reference: v.string(),
    status: v.string(),
    type: v.string(),
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
    paymentMethod: v.string(),
    paymentReference: v.optional(v.string()),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();

    if (existing) {
      return existing._id;
    }

    const orderDocId = await ctx.db.insert("orders", args);
    return orderDocId;
  },
});

export const getOrderByOrderId = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
  },
});

export const getOrderByReference = query({
  args: { reference: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_reference", (q) => q.eq("reference", args.reference))
      .first();
  },
});

export const listRecentOrders = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db.query("orders").order("desc").take(limit);
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.string(),
    status: v.string(),
    paymentReference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();

    if (!order) {
      throw new Error(`Order with ID ${args.orderId} not found`);
    }

    const updates: Record<string, any> = { status: args.status };
    if (args.paymentReference) {
      updates.paymentReference = args.paymentReference;
    }

    await ctx.db.patch(order._id, updates);
    return { success: true };
  },
});
