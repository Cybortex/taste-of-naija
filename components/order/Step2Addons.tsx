"use client";

import React, { useState } from "react";
import { Plus, ArrowLeft, Check, CupSoda } from "lucide-react";
import { PROTEINS, SIDES, DRINKS } from "@/data/menu";
import { MenuItem } from "@/types/menu";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/lib/cart-context";

interface Step2AddonsProps {
  onBack: () => void;
  onContinue: () => void;
}

export function Step2Addons({ onBack, onContinue }: Step2AddonsProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [activeSection, setActiveSection] = useState<"all" | "drinks" | "proteins" | "sides">("all");

  const getItemQuantity = (id: string) => {
    const found = items.find((i) => i.itemId === id);
    return found ? found.quantity : 0;
  };

  const handleToggleOrAdd = (item: MenuItem) => {
    const qty = getItemQuantity(item.id);
    if (qty === 0) {
      addItem(item, 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2.5 py-1 rounded-full">
            Step 2 of 3
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep mt-2">
            Add Drinks, Meats & Sides
          </h2>
          <p className="text-brand-muted text-sm mt-1">
            Complete your plate! Proteins, sides, and drinks are never charged pack fees.
          </p>
        </div>

        {/* Top Navigation Shortcuts (so user doesn't have to scroll to the bottom!) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-brand-border bg-white text-brand-deep font-semibold text-xs hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-heading font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Proceed to Checkout →</span>
          </button>
        </div>
      </div>

      {/* Quick Jump Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSection("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeSection === "all"
              ? "bg-brand-green text-white shadow-xs"
              : "bg-stone-100 text-brand-deep hover:bg-stone-200"
          }`}
        >
          All Add-ons ({PROTEINS.length + SIDES.length + DRINKS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("drinks")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSection === "drinks"
              ? "bg-brand-green text-white shadow-xs"
              : "bg-stone-100 text-brand-deep hover:bg-stone-200"
          }`}
        >
          <CupSoda className="w-3.5 h-3.5" />
          <span>Chilled Drinks ({DRINKS.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("proteins")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeSection === "proteins"
              ? "bg-brand-green text-white shadow-xs"
              : "bg-stone-100 text-brand-deep hover:bg-stone-200"
          }`}
        >
          Meats & Seafood ({PROTEINS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("sides")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeSection === "sides"
              ? "bg-brand-green text-white shadow-xs"
              : "bg-stone-100 text-brand-deep hover:bg-stone-200"
          }`}
        >
          Sides & Snacks ({SIDES.length})
        </button>
      </div>

      {/* Proteins Section */}
      {(activeSection === "all" || activeSection === "proteins") && (
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
      )}

      {/* Sides & Street Food Section */}
      {(activeSection === "all" || activeSection === "sides") && (
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
              const isDodo = side.slug === "dodo";

              return (
                <div
                  key={side.id}
                  className={`p-3.5 rounded-card border transition-all flex flex-col justify-between relative ${
                    qty > 0
                      ? "bg-brand-cream border-brand-green ring-1 ring-brand-green/30"
                      : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
                  }`}
                >
                  {isDodo && (
                    <span className="absolute -top-2 right-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-orange text-white shadow-xs">
                      Best Value • ₦200
                    </span>
                  )}

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
      )}

      {/* Chilled Drinks & Beverages Section */}
      {(activeSection === "all" || activeSection === "drinks") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-brand-deep flex items-center gap-2">
              <CupSoda className="w-5 h-5 text-brand-green" />
              <span>Chilled Drinks & Refreshments</span>
            </h3>
            <span className="text-xs text-brand-green font-medium">Ice cold • Zero pack fees</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DRINKS.map((drink) => {
              const qty = getItemQuantity(drink.id);
              const cartItem = items.find((i) => i.itemId === drink.id);

              return (
                <div
                  key={drink.id}
                  className={`p-3.5 rounded-card border transition-all flex flex-col justify-between ${
                    qty > 0
                      ? "bg-brand-cream border-brand-green ring-1 ring-brand-green/30"
                      : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-heading font-bold text-brand-deep text-sm">
                        {drink.name}
                      </span>
                      {drink.isPopular && (
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-brand-green mt-0.5">
                      {formatPrice(drink.price)}
                      <span className="text-[10px] text-brand-muted font-normal ml-1">({drink.unit})</span>
                    </div>
                    <div className="text-[11px] text-brand-muted mt-1 line-clamp-2">
                      {drink.description}
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
                        itemName={drink.name}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleOrAdd(drink)}
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
      )}

      {/* Smart Pairing Suggestion */}
      <div className="p-4 rounded-card bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
        <Check className="w-5 h-5 text-brand-green shrink-0 stroke-[2.5]" />
        <p className="text-xs sm:text-sm text-emerald-950">
          <strong>Tip from Chef:</strong> Don’t forget sweet golden <strong>Dodo</strong>, tender <strong>Fried Chicken</strong>, and ice-cold <strong>Chilled Zobo</strong> or <strong>Chapman</strong> — the quintessential combo for every rich Nigerian meal!
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
