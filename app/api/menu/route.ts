import { NextResponse } from "next/server";
import { BACKEND_MENU_ITEMS, BACKEND_COMBOS } from "@/convex/seedData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (category) {
    if (category === "combos") {
      return NextResponse.json({
        category: "combos",
        count: BACKEND_COMBOS.length,
        items: BACKEND_COMBOS,
      });
    }

    const filtered = BACKEND_MENU_ITEMS.filter((i) => i.category === category);
    return NextResponse.json({
      category,
      count: filtered.length,
      items: filtered,
    });
  }

  return NextResponse.json({
    restaurant: "Taste of Naija",
    currency: "NGN (₦)",
    totalItems: BACKEND_MENU_ITEMS.length,
    totalCombos: BACKEND_COMBOS.length,
    categories: {
      swallows: BACKEND_MENU_ITEMS.filter((i) => i.category === "swallows"),
      soups: BACKEND_MENU_ITEMS.filter((i) => i.category === "soups"),
      rice: BACKEND_MENU_ITEMS.filter((i) => i.category === "rice"),
      proteins: BACKEND_MENU_ITEMS.filter((i) => i.category === "proteins"),
      sides: BACKEND_MENU_ITEMS.filter((i) => i.category === "sides"),
      drinks: BACKEND_MENU_ITEMS.filter((i) => i.category === "drinks"),
      combos: BACKEND_COMBOS,
    },
  });
}
