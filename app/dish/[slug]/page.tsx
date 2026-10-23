"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Check,
  Flame,
  Star,
  Package,
  ShieldCheck,
  Clock,
  Heart,
} from "lucide-react";
import { getMenuItemBySlug, ALL_MENU_ITEMS, POPULAR_DISHES } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { DishImage } from "@/components/ui/DishPlaceholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/lib/cart-context";
import { DishCard } from "@/components/menu/DishCard";

interface DishDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function DishDetailPage({ params }: DishDetailPageProps) {
  const resolvedParams = use(params);
  const item = getMenuItemBySlug(resolvedParams.slug);

  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item) {
    notFound();
    return null;
  }

  // Check if in cart
  const cartItem = items.find((i) => i.itemId === item.id);

  const handleAddToCart = () => {
    addItem(item, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1200);
  };

  // Find recommended pairings
  const pairedItems = (item.pairings || [])
    .map((id) => ALL_MENU_ITEMS.find((m) => m.id === id))
    .filter(Boolean);

  const isCombo = item.category === "combos";

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>
      </div>

      {/* Main Dish Details Card */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Dish Visual */}
        <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[500px]">
          <DishImage
            slug={item.slug}
            name={item.name}
            category={item.category}
            isSpicy={item.isSpicy}
            aspectRatio="1/1"
            className="h-full w-full rounded-none rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl"
            priority
          />

          {/* Badges Over Image */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
            <div className="flex items-center gap-2">
              {item.isPopular && <Badge variant="popular">Chef’s Choice</Badge>}
              {item.isSpicy && <Badge variant="spicy">Spicy</Badge>}
            </div>

            {item.isPack && (
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-brand-green text-white shadow-sm">
                1 Pack (Takeaway: ₦250)
              </span>
            )}
          </div>
        </div>

        {/* Right: Info & Ordering Actions */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-green">
              {item.category.replace("-", " ")}
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-4xl text-brand-deep leading-tight">
              {item.name}
            </h1>

            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-3xl text-brand-deep">
                {formatPrice(item.price)}
              </span>
              <span className="text-xs text-brand-muted font-medium">{item.unit}</span>
            </div>

            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>

            {/* Ingredients & Details Pills */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="pt-2">
                <span className="block text-xs font-bold text-brand-deep uppercase tracking-wider mb-2">
                  Key Natural Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-brand-deep border border-brand-border/60"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stepper & Add to Order Bar */}
          <div className="pt-6 border-t border-brand-border space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-brand-muted block">Quantity</span>
                <QuantityStepper
                  value={quantity}
                  onIncrement={() => setQuantity((q) => q + 1)}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  itemName={item.name}
                  size="md"
                />
              </div>

              <div className="text-right">
                <span className="text-xs text-brand-muted block">Total for this dish</span>
                <span className="font-heading font-black text-xl text-brand-deep">
                  {formatPrice(item.price * quantity)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-btn font-heading font-bold text-base text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? "bg-brand-success"
                    : "bg-brand-orange hover:bg-brand-orange-hover"
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added {quantity} to Order!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    <span>Add to Order • {formatPrice(item.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-brand-muted pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-green" />
                Prepared Fresh to Order
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                100% Authentic Taste of Naija Recipe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Pairings Section */}
      {pairedItems.length > 0 && (
        <div className="space-y-6 pt-6">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
              Goes Great Together
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep mt-2">
              Recommended Add-ons & Pairings
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Popular meats, seafood, and sides frequently enjoyed with {item.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pairedItems.map((p) => p && <DishCard key={p.id} item={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
