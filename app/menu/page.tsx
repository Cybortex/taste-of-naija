"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, Filter, X, Package, Truck } from "lucide-react";
import { ALL_MENU_ITEMS, CATEGORIES } from "@/data/menu";
import { DishCard } from "@/components/menu/DishCard";
import { formatPrice } from "@/lib/utils";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      // Popular filter
      if (onlyPopular && !item.isPopular) {
        return false;
      }

      // Spicy filter
      if (onlySpicy && !item.isSpicy) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, onlyPopular, onlySpicy]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border/70 pb-6">
        <div>
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
            Complete Restaurant Menu
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-deep mt-2">
            Taste of Naija Menu
          </h1>
          <p className="text-sm text-brand-muted mt-1.5 max-w-xl">
            Authentic Nigerian soups, freshly pounded swallows, firewood rice, charcoal grills, and side dishes.
          </p>
        </div>

        {/* Pricing / Pack Rule Badge Notice */}
        <div className="bg-white p-3.5 rounded-card border border-brand-border/80 shadow-2xs max-w-sm text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-brand-deep">
            <Package className="w-4 h-4 text-brand-green shrink-0" />
            <span>Packaging & Delivery Rule</span>
          </div>
          <p className="text-brand-muted text-[11px] leading-relaxed">
            Takeaway fee is <strong>₦250 per main pack</strong>. Home delivery is ₦3,000 (<strong>FREE for orders ≥ ₦35,000</strong>). Proteins and sides have zero pack fees.
          </p>
        </div>
      </div>

      {/* Sticky Category Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Search & Quick Toggles */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search egusi, jollof, suya, pounded yam, goat meat..."
              className="w-full h-11 pl-10 pr-9 rounded-input border border-brand-border bg-white text-sm text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-deep"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setOnlyPopular(!onlyPopular)}
              className={`px-3.5 py-2.5 rounded-btn text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                onlyPopular
                  ? "bg-brand-gold text-brand-deep shadow-xs"
                  : "bg-white border border-brand-border text-brand-deep hover:bg-stone-50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular Only</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={`px-3.5 py-2.5 rounded-btn text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                onlySpicy
                  ? "bg-brand-chili text-white shadow-xs"
                  : "bg-white border border-brand-border text-brand-deep hover:bg-stone-50"
              }`}
            >
              <span>Spicy / Hot Only</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-brand-green text-white shadow-xs"
                  : "bg-white text-brand-deep border border-brand-border/80 hover:bg-stone-100"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-stone-100 text-brand-muted"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card border border-brand-border p-8">
          <p className="font-heading font-bold text-lg text-brand-deep">
            No dishes found matching your search.
          </p>
          <p className="text-xs text-brand-muted mt-1">
            Try clearing filters or search for another delicious Nigerian dish.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setOnlyPopular(false);
              setOnlySpicy(false);
            }}
            className="mt-4 px-4 py-2 rounded-btn bg-brand-green text-white text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1200px] mx-auto px-4 py-24 text-center text-brand-muted">
          <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium">Loading Taste of Naija Menu...</p>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
