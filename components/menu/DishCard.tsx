"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Check, Info } from "lucide-react";
import { MenuItem, ComboItem } from "@/types/menu";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { DishImage } from "@/components/ui/DishPlaceholder";
import { useCart } from "@/lib/cart-context";

interface DishCardProps {
  item: MenuItem;
  priority?: boolean;
}

export function DishCard({ item, priority = false }: DishCardProps) {
  const { addItem, items, updateQuantity } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const [justAdded, setJustAdded] = useState(false);

  // Find if this item is in the cart
  const cartItem = items.find((i) => i.itemId === item.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const isCombo = item.category === "combos";
  const combo = isCombo ? (item as ComboItem) : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      item,
      1,
      item.spiceLevel || "Medium",
      combo ? { swallowName: combo.swallowName, soupName: combo.soupName } : undefined
    );

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col bg-white rounded-card border border-brand-border/60 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden"
    >
      {/* Top Image + Badges */}
      <Link href={`/dish/${item.slug}`} className="relative block overflow-hidden">
        <DishImage
          slug={item.slug}
          name={item.name}
          category={item.category}
          isSpicy={item.isSpicy}
          aspectRatio="4/3"
          priority={priority}
        />

        {/* Badges Over Image */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between pointer-events-none gap-1.5 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.isPopular && <Badge variant="popular">Popular</Badge>}
            {item.isSpicy && <Badge variant="spicy">Spicy</Badge>}
          </div>
          {item.isPack && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-green/90 text-white shadow-sm backdrop-blur-xs">
              Pack
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              href={`/dish/${item.slug}`}
              className="font-heading font-bold text-brand-deep text-lg hover:text-brand-green transition-colors leading-snug line-clamp-1"
            >
              {item.name}
            </Link>
          </div>

          {/* Description */}
          <p className="text-brand-muted text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>

          {/* Combo breakdown info if applicable */}
          {combo && (
            <div className="mb-3 text-[11px] text-brand-muted/90 bg-brand-cream/80 p-2 rounded-lg border border-brand-border/50">
              <span className="font-semibold text-brand-deep">Combo includes: </span>
              {combo.swallowName} ({formatPrice(combo.swallowPrice)}) + {combo.soupName} ({formatPrice(combo.soupPrice)})
            </div>
          )}
        </div>

        {/* Pricing & Add to Order Bar */}
        <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="font-heading font-extrabold text-brand-deep text-lg sm:text-xl leading-none">
              {formatPrice(item.price)}
            </div>
            <div className="text-[11px] text-brand-muted font-medium mt-0.5">
              {item.unit}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {inCartQty > 0 ? (
              <div className="flex items-center gap-1.5 bg-brand-cream border border-brand-border rounded-full p-1">
                <button
                  type="button"
                  onClick={() => cartItem && updateQuantity(cartItem.id, -1)}
                  className="w-8 h-8 rounded-full bg-white text-brand-deep font-bold flex items-center justify-center hover:bg-stone-100 shadow-xs text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-heading font-bold text-sm px-1.5 tabular-nums text-brand-deep">
                  {inCartQty}
                </span>
                <button
                  type="button"
                  onClick={() => cartItem && updateQuantity(cartItem.id, 1)}
                  className="w-8 h-8 rounded-full bg-brand-green text-white font-bold flex items-center justify-center hover:bg-brand-green-hover shadow-xs text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={handleAdd}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                transition={{ duration: 0.12 }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-btn font-semibold text-xs sm:text-sm text-white shadow-sm transition-all ${
                  justAdded
                    ? "bg-brand-success"
                    : "bg-brand-orange hover:bg-brand-orange-hover"
                }`}
                aria-label={`Add ${item.name} to order`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add</span>
                  </>
                )}
              </motion.button>
            )}

            <Link
              href={`/dish/${item.slug}`}
              className="p-2 text-brand-muted/70 hover:text-brand-green transition-colors rounded-full hover:bg-brand-cream"
              title="View dish details"
            >
              <Info className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
