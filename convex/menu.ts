import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { BACKEND_MENU_ITEMS, BACKEND_COMBOS } from "./seedData";

// Seed mutation to populate the database with all authentic Nigerian dishes and prices
export const seedMenuDatabase = mutation({
  handler: async (ctx) => {
    let insertedDishes = 0;
    let insertedCombos = 0;

    for (const item of BACKEND_MENU_ITEMS) {
      const existing = await ctx.db
        .query("menuItems")
        .withIndex("by_slug", (q: any) => q.eq("slug", item.slug))
        .first();

      if (!existing) {
        await ctx.db.insert("menuItems", item);
        insertedDishes++;
      }
    }

    for (const combo of BACKEND_COMBOS) {
      const existing = await ctx.db
        .query("combos")
        .withIndex("by_slug", (q: any) => q.eq("slug", combo.slug))
        .first();

      if (!existing) {
        await ctx.db.insert("combos", combo);
        insertedCombos++;
      }
    }

    return {
      success: true,
      insertedDishes,
      insertedCombos,
      totalDishesInMenu: BACKEND_MENU_ITEMS.length,
      totalCombosInMenu: BACKEND_COMBOS.length,
    };
  },
});

export const getMenuItemsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("menuItems")
      .withIndex("by_category", (q: any) => q.eq("category", args.category))
      .collect();

    // If database hasn't been seeded yet, return from static seed data
    if (items.length === 0) {
      return BACKEND_MENU_ITEMS.filter((i) => i.category === args.category);
    }
    return items;
  },
});

export const getMenuItemBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("menuItems")
      .withIndex("by_slug", (q: any) => q.eq("slug", args.slug))
      .first();

    if (!item) {
      return BACKEND_MENU_ITEMS.find((i) => i.slug === args.slug) || null;
    }
    return item;
  },
});

export const listAllMenuItems = query({
  handler: async (ctx) => {
    const items = await ctx.db.query("menuItems").collect();
    if (items.length === 0) {
      return BACKEND_MENU_ITEMS;
    }
    return items;
  },
});

export const listAllCombos = query({
  handler: async (ctx) => {
    const combos = await ctx.db.query("combos").collect();
    if (combos.length === 0) {
      return BACKEND_COMBOS;
    }
    return combos;
  },
});

export const getComboBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const combo = await ctx.db
      .query("combos")
      .withIndex("by_slug", (q: any) => q.eq("slug", args.slug))
      .first();

    if (!combo) {
      return BACKEND_COMBOS.find((c) => c.slug === args.slug) || null;
    }
    return combo;
  },
});
