"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Utensils, Flame, Check, Plus } from "lucide-react";
import { SWALLOWS, SOUPS, COMBOS, RICE, GRILLS_AND_PEPPER_SOUPS } from "@/data/menu";
import { MenuItem, ComboItem } from "@/types/menu";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Badge } from "@/components/ui/Badge";
import { DishImage } from "@/components/ui/DishPlaceholder";
import { useCart } from "@/lib/cart-context";

interface Step1MainProps {
  onContinue: () => void;
}

export function Step1Main({ onContinue }: Step1MainProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<"combos" | "rice" | "grills" | "swallow-soup">("combos");

  // Track if any main dish is selected
  const mainItemsCount = items
    .filter((i) => ["combos", "rice", "grills", "swallows", "soups"].includes(i.category))
    .reduce((sum, i) => sum + i.quantity, 0);

  const getItemQuantity = (id: string) => {
    const found = items.find((i) => i.itemId === id);
    return found ? found.quantity : 0;
  };

  const handleToggleOrAdd = (item: MenuItem, meta?: { swallowName?: string; soupName?: string }) => {
    const qty = getItemQuantity(item.id);
    if (qty === 0) {
      addItem(item, 1, item.spiceLevel || "Medium", meta);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2.5 py-1 rounded-full">
          Step 1 of 3
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep mt-2">
          Choose Your Main Dish
        </h2>
        <p className="text-brand-muted text-sm mt-1">
          Select your favourite authentic Nigerian mains. Every main dish counts as 1 pack.
        </p>
      </div>

      {/* Category Segmented Control */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 rounded-2xl border border-brand-border">
        {[
          { id: "combos", label: "Popular Combos", icon: Sparkles },
          { id: "rice", label: "Rice Dishes", icon: Utensils },
          { id: "grills", label: "Pepper Soups & Grills", icon: Flame },
          { id: "swallow-soup", label: "Custom Swallow + Soup", icon: Utensils },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all ${
              activeTab === id
                ? "bg-brand-green text-white shadow-sm"
                : "text-brand-deep hover:bg-white/80"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Popular Combos */}
      {activeTab === "combos" && (
        <div className="space-y-3">
          <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
            <span>
              <strong>Convenience shortcuts:</strong> Swallow + Soup combined in 1 pack. You can still add meats and sides in Step 2!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMBOS.map((combo) => {
              const qty = getItemQuantity(combo.id);
              const cartItem = items.find((i) => i.itemId === combo.id);

              return (
                <div
                  key={combo.id}
                  className={`p-4 rounded-card border transition-all flex flex-col justify-between ${
                    qty > 0
                      ? "bg-brand-cream/80 border-brand-green ring-2 ring-brand-green/20"
                      : "bg-white border-brand-border hover:border-brand-green/50 shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="popular">Popular Combo</Badge>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          1 Pack
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-brand-deep text-base sm:text-lg">
                        {combo.name}
                      </h4>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        {combo.swallowName} ({formatPrice(combo.swallowPrice)}) + {combo.soupName} ({formatPrice(combo.soupPrice)})
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-heading font-extrabold text-brand-deep text-lg sm:text-xl">
                        {formatPrice(combo.price)}
                      </div>
                      <div className="text-[11px] text-brand-muted">per combo</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-xs text-brand-muted">
                      {qty > 0 ? `${qty} in order` : "Ready to add"}
                    </span>

                    {qty > 0 ? (
                      <QuantityStepper
                        value={qty}
                        onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                        onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                        itemName={combo.name}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleOrAdd(combo, {
                            swallowName: combo.swallowName,
                            soupName: combo.soupName,
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Select Combo</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Rice Dishes */}
      {activeTab === "rice" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RICE.map((rice) => {
            const qty = getItemQuantity(rice.id);
            const cartItem = items.find((i) => i.itemId === rice.id);

            return (
              <div
                key={rice.id}
                className={`p-4 rounded-card border transition-all flex flex-col justify-between ${
                  qty > 0
                    ? "bg-brand-cream/80 border-brand-green ring-2 ring-brand-green/20"
                    : "bg-white border-brand-border hover:border-brand-green/50 shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      {rice.isPopular && <Badge variant="popular">Popular</Badge>}
                      {rice.isSpicy && <Badge variant="spicy">Spicy</Badge>}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        1 Pack
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-brand-deep text-base sm:text-lg">
                      {rice.name}
                    </h4>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
                      {rice.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-heading font-extrabold text-brand-deep text-lg sm:text-xl">
                      {formatPrice(rice.price)}
                    </div>
                    <div className="text-[11px] text-brand-muted">{rice.unit}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-xs text-brand-muted">
                    {qty > 0 ? `${qty} in order` : "Ready to add"}
                  </span>

                  {qty > 0 ? (
                    <QuantityStepper
                      value={qty}
                      onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                      onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                      itemName={rice.name}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleOrAdd(rice)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs shadow-xs transition-colors"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Select Rice</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Grills & Pepper Soups */}
      {activeTab === "grills" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GRILLS_AND_PEPPER_SOUPS.map((grill) => {
            const qty = getItemQuantity(grill.id);
            const cartItem = items.find((i) => i.itemId === grill.id);

            return (
              <div
                key={grill.id}
                className={`p-4 rounded-card border transition-all flex flex-col justify-between ${
                  qty > 0
                    ? "bg-brand-cream/80 border-brand-green ring-2 ring-brand-green/20"
                    : "bg-white border-brand-border hover:border-brand-green/50 shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      {grill.isPopular && <Badge variant="popular">Popular</Badge>}
                      {grill.isSpicy && <Badge variant="spicy">Spicy</Badge>}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        1 Pack
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-brand-deep text-base sm:text-lg">
                      {grill.name}
                    </h4>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
                      {grill.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-heading font-extrabold text-brand-deep text-lg sm:text-xl">
                      {formatPrice(grill.price)}
                    </div>
                    <div className="text-[11px] text-brand-muted">{grill.unit}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-xs text-brand-muted">
                    {qty > 0 ? `${qty} in order` : "Ready to add"}
                  </span>

                  {qty > 0 ? (
                    <QuantityStepper
                      value={qty}
                      onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                      onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                      itemName={grill.name}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleOrAdd(grill)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs shadow-xs transition-colors"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Select Grill</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Custom Swallow + Soup */}
      {activeTab === "swallow-soup" && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-900">
            <strong>Custom Plate Mix:</strong> Pick your swallow and pair it with your soup of choice.
          </div>

          {/* Swallows Section */}
          <div>
            <h3 className="font-heading font-bold text-base text-brand-deep mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs flex items-center justify-center font-bold">
                A
              </span>
              <span>Pick Swallow (per wrap)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SWALLOWS.map((swallow) => {
                const qty = getItemQuantity(swallow.id);
                const cartItem = items.find((i) => i.itemId === swallow.id);

                return (
                  <div
                    key={swallow.id}
                    className={`p-3 rounded-card border flex items-center justify-between ${
                      qty > 0
                        ? "bg-brand-cream border-brand-green"
                        : "bg-white border-brand-border"
                    }`}
                  >
                    <div>
                      <div className="font-heading font-bold text-sm text-brand-deep">
                        {swallow.name}
                      </div>
                      <div className="text-xs text-brand-green font-semibold">
                        {formatPrice(swallow.price)}
                      </div>
                    </div>

                    {qty > 0 ? (
                      <QuantityStepper
                        size="sm"
                        value={qty}
                        onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                        onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                        itemName={swallow.name}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleOrAdd(swallow)}
                        className="p-1.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-hover"
                        title={`Add ${swallow.name}`}
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soups Section */}
          <div>
            <h3 className="font-heading font-bold text-base text-brand-deep mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white text-xs flex items-center justify-center font-bold">
                B
              </span>
              <span>Pick Soup (per plate)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SOUPS.map((soup) => {
                const qty = getItemQuantity(soup.id);
                const cartItem = items.find((i) => i.itemId === soup.id);

                return (
                  <div
                    key={soup.id}
                    className={`p-3 rounded-card border flex items-center justify-between ${
                      qty > 0
                        ? "bg-brand-cream border-brand-green"
                        : "bg-white border-brand-border"
                    }`}
                  >
                    <div>
                      <div className="font-heading font-bold text-sm text-brand-deep">
                        {soup.name}
                      </div>
                      <div className="text-xs text-brand-green font-semibold">
                        {formatPrice(soup.price)}
                      </div>
                    </div>

                    {qty > 0 ? (
                      <QuantityStepper
                        size="sm"
                        value={qty}
                        onIncrement={() => cartItem && updateQuantity(cartItem.id, 1)}
                        onDecrement={() => cartItem && updateQuantity(cartItem.id, -1)}
                        itemName={soup.name}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleOrAdd(soup)}
                        className="p-1.5 rounded-full bg-brand-orange text-white hover:bg-brand-orange-hover"
                        title={`Add ${soup.name}`}
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 1 Completion / Continue Button */}
      <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-brand-muted">
          {mainItemsCount > 0 ? (
            <span className="text-brand-green font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              {mainItemsCount} main {mainItemsCount === 1 ? "dish" : "dishes"} selected
            </span>
          ) : (
            <span className="text-amber-700">
              Please select at least 1 main dish to continue to Step 2
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onContinue}
          disabled={mainItemsCount === 0}
          className="w-full sm:w-auto px-8 py-3.5 rounded-btn bg-brand-green hover:bg-brand-green-hover disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-heading font-bold text-sm sm:text-base shadow-sm transition-all"
        >
          Continue to Step 2: Proteins & Sides →
        </button>
      </div>
    </div>
  );
}
