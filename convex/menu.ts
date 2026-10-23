import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getMenuItemsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("menuItems")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getMenuItemBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("menuItems")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const listAllMenuItems = query({
  handler: async (ctx) => {
    return await ctx.db.query("menuItems").collect();
  },
});
