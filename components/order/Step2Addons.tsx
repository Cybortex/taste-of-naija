"use client";

import React, { useState } from "react";
import { Plus, Flame, Sparkles, ArrowLeft, Check } from "lucide-react";
import { PROTEINS, SIDES } from "@/data/menu";
import { MenuItem } from "@/types/menu";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/lib/cart-context";

interface Step2AddonsProps {
  onBack: () => void;
  onContinue: () => void;
}

export function Step2Addons({ onBack, onContinue }: Step2AddonsProps) {
  const { items, addItem, updateQuantity, updateSpice } = useCart();
  const [globalSpice, setGlobalSpice] = useState<"Mild" | "Medium" | "Hot">("Medium");

  // Check if order contains spicy items or soups
  const hasSpicyOrSoup = items.some((item) =>
    ["soups", "grills", "combos"].includes(item.category)
  );

  const getItemQuantity = (id: string) => {
    const found = items.find((i) => i.itemId === id);
    return found ? found.quantity : 0;
  };

  const handleToggleOrAdd = (item: MenuItem) => {
    const qty = getItemQuantity(item.id);
    if (qty === 0) {
      addItem(item, 1, globalSpice);
    }
  };

  const handleSpiceChange = (spice: "Mild" | "Medium" | "Hot") => {
    setGlobalSpice(spice);
    // Update existing items in cart that support spice
    items.forEach((item) => {
      if (["soups", "grills", "combos"].includes(item.category)) {
        updateSpice(item.id, spice);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2.5 py-1 rounded-full">
          Step 2 of 3
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep mt-2">
          Add Meats, Seafood & Sides
        </h2>
        <p className="text-brand-muted text-sm mt-1">
          Complete your plate! Proteins and sides are never charged pack fees.
        </p>
      </div>

      {/* Spice Level Selector (Conditioned on soups/grills presence) */}
      {hasSpicyOrSoup && (
        <div className="p-4 rounded-card bg-orange-50/80 border border-orange-200/90 space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-brand-orange" />
            <h3 className="font-heading font-bold text-brand-deep text-sm sm:text-base">
              Choose Kitchen Spice Level
            </h3>
          </div>
          <p className="text-xs text-brand-muted">
            How hot do you want your soups, stew, and pepper broth prepared?
          </p>

          <div className="grid grid-cols-3 gap-2.5 max-w-md">
            {[
              { level: "Mild", label: "Mild Pepper", desc: "Gentle heat, full flavour" },
              { level: "Medium", label: "Medium (Standard)", desc: "Authentic Naija heat" },
              { level: "Hot", label: "Hot & Fiery", desc: "For real pepper lovers" },
            ].map(({ level, label, desc }) => (
              <button
                key={level}
                type="button"
                onClick={() => handleSpiceChange(level as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  globalSpice === level
                    ? "bg-white border-brand-orange ring-2 ring-brand-orange/30 shadow-xs"
                    : "bg-white/60 border-orange-200/70 hover:bg-white"
                }`}
              >
                <div
                  className={`text-xs font-bold ${
                    globalSpice === level ? "text-brand-orange" : "text-brand-deep"
                  }`}
                >
                  {label}
                </div>
                <div className="text-[10px] text-brand-muted mt-0.5 leading-tight">
                  {desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Proteins Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-brand-deep flex items-center gap-2">
            <span>Meats & Seafood</span>
            <span className="text-xs font-normal text-brand-muted">(per piece)</span>
          </h3>
          <span className="text-xs text-brand-green font-medium">No pack fees</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {PROTEINS.map((protein) => {
            const qty = getItemQuantity(protein.id);
            const cartItem = items.find((i) => i.itemId === protein.id);

            return (
              <div
                key={protein.id}
                className={`p-3.5 rounded-card border transition-all flex flex-col justify-between ${
                  qty > 0
                    ? "bg-brand-cream border-brand-green ring-1 ring-brand-green/30"
                    : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
                }`}
              >
                <div>
                  <div className="font-heading font-bold text-brand-deep text-sm">
                    {protein.name}
                  </div>
                  <div className="text-xs font-bold text-brand-green mt-0.5">
                    {formatPrice(protein.price)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1 line-clamp-2">
                    {protein.description}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted">
                    {qty > 0 ? `${qty} in order` : "Add"}
                  </span>

                  {qty > 0 ? (
                    <QuantityStepper
                      size="sm"
                      value={qty}
                      onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                      onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                      itemName={protein.name}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleOrAdd(protein)}
                      className="px-2.5 py-1 rounded-btn bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sides & Street Food Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-brand-deep flex items-center gap-2">
            <span>Sides & Street Snacks</span>
          </h3>
          <span className="text-xs text-brand-green font-medium">Smart add-ons</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SIDES.map((side) => {
            const qty = getItemQuantity(side.id);
            const cartItem = items.find((i) => i.itemId === side.id);

            return (
              <div
                key={side.id}
                className={`p-3.5 rounded-card border transition-all flex flex-col justify-between ${
                  qty > 0
                    ? "bg-brand-cream border-brand-green ring-1 ring-brand-green/30"
                    : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
                }`}
              >
                <div>
                  <div className="font-heading font-bold text-brand-deep text-sm">
                    {side.name}
                  </div>
                  <div className="text-xs font-bold text-brand-green mt-0.5">
                    {formatPrice(side.price)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1 line-clamp-2">
                    {side.description}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted">
                    {qty > 0 ? `${qty} in order` : "Add"}
                  </span>

                  {qty > 0 ? (
                    <QuantityStepper
                      size="sm"
                      value={qty}
                      onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                      onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                      itemName={side.name}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleOrAdd(side)}
                      className="px-2.5 py-1 rounded-btn bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smart Pairing Suggestion */}
      <div className="p-4 rounded-card bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-brand-gold shrink-0" />
        <p className="text-xs sm:text-sm text-emerald-950">
          <strong>Tip from Chef:</strong> Don’t forget sweet golden <strong>Dodo</strong> and tender <strong>Fried Chicken</strong> — the quintessential pairing for every rice and swallow plate!
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-brand-border flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-btn border border-brand-border bg-white text-brand-deep font-semibold text-sm hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mains</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="px-8 py-3.5 rounded-btn bg-brand-green hover:bg-brand-green-hover text-white font-heading font-bold text-sm sm:text-base shadow-sm transition-all"
        >
          Proceed to Order Type & Checkout →
        </button>
      </div>
    </div>
  );
}
