export type CategoryId =
  | "swallows"
  | "soups"
  | "combos"
  | "rice"
  | "grills"
  | "proteins"
  | "sides";

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  price: number;
  description: string;
  unit: string; // e.g. "per wrap", "per plate", "per piece"
  isPack: boolean; // Swallow+Soup, Rice, Pepper soup/grill, Combos are packs (₦250 takeaway fee)
  isPopular?: boolean;
  isSpicy?: boolean;
  imageSlug?: string;
  ingredients?: string[];
  allergens?: string[];
  calories?: string;
  spiceLevel?: "Mild" | "Medium" | "Hot";
  pairings?: string[]; // Recommended item IDs
}

export interface ComboItem extends MenuItem {
  category: "combos";
  swallowName: string;
  soupName: string;
  swallowPrice: number;
  soupPrice: number;
}
