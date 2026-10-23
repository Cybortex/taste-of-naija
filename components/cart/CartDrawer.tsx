"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Package,
  UtensilsCrossed,
  Clock,
  MapPin,
  Plus,
  Check,
  AlertCircle,
  Flame,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { FreeDeliveryBar } from "@/components/ui/FreeDeliveryBar";
import { OrderType } from "@/types/order";
import { DRINKS, SIDES, RICE, COMBOS, GRILLS_AND_PEPPER_SOUPS } from "@/data/menu";

// Popular upsell suggestions to pair with meals
const UPSELL_CANDIDATES = [
  SIDES.find((s) => s.id === "side-dodo") || {
    id: "side-dodo",
    name: "Dodo (Fried Plantain)",
    slug: "dodo",
    category: "sides",
    price: 200,
    unit: "per portion",
    description: "Sweet, ripe fried plantain.",
    isPack: false,
  },
  DRINKS.find((d) => d.id === "drink-zobo") || {
    id: "drink-zobo",
    name: "Chilled Zobo Special",
    slug: "chilled-zobo",
    category: "drinks",
    price: 1000,
    unit: "per 500ml",
    description: "Brewed hibiscus & ginger nectar.",
    isPack: false,
  },
  DRINKS.find((d) => d.id === "drink-chapman") || {
    id: "drink-chapman",
    name: "Signature Chapman Mocktail",
    slug: "chapman",
    category: "drinks",
    price: 2000,
    unit: "per glass/bottle",
    description: "Citrus, Angostura & cucumber mocktail.",
    isPack: false,
  },
  DRINKS.find((d) => d.id === "drink-kunu-aya") || {
    id: "drink-kunu-aya",
    name: "Kunu Aya (Tiger Nut Milk)",
    slug: "kunu-aya",
    category: "drinks",
    price: 1500,
    unit: "per 500ml",
    description: "Creamy, naturally sweet tiger nut milk.",
    isPack: false,
  },
];

// Quick starters when cart is empty
const EMPTY_STARTERS = [
  RICE.find((r) => r.id === "rice-jollof") || {
    id: "rice-jollof",
    name: "Party Jollof Rice",
    slug: "party-jollof",
    category: "rice",
    price: 3500,
    unit: "per portion",
    description: "Smoky firewood-style party jollof.",
    isPack: true,
  },
  COMBOS.find((c) => c.id === "combo-amala-gbegiri-ewedu") || {
    id: "combo-amala-gbegiri-ewedu",
    name: "Amala + Gbegiri & Ewedu (Abula)",
    slug: "amala-gbegiri-ewedu",
    category: "combos",
    price: 4500,
    unit: "per plate",
    description: "Classic Lagos Island street-style Abula.",
    isPack: true,
  },
  GRILLS_AND_PEPPER_SOUPS.find((g) => g.id === "grill-suya") || {
    id: "grill-suya",
    name: "Beef Suya",
    slug: "beef-suya",
    category: "grills",
    price: 4500,
    unit: "per portion",
    description: "Charcoal-grilled thin beef in spicy Yaji.",
    isPack: true,
  },
];

export function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeItem,
    clearCart,
    orderType,
    setOrderType,
    fees,
    itemCount,
    addItem,
  } = useCart();

  const shouldReduceMotion = useReducedMotion();

  // Scroll lock & Escape key listener
  useEffect(() => {
    if (!isCartDrawerOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartDrawerOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  // Determine if cart has a substantial main dish
  const hasMainDish = items.some((item) => {
    const cat = (item.category || "").toLowerCase();
    return ["rice", "combos", "swallows", "soups", "grills"].includes(cat) || item.isPack;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="absolute inset-0 bg-brand-deep/60 backdrop-blur-xs"
          aria-hidden="true"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-brand-border bg-stone-50/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-lg text-brand-deep leading-tight">
                    Your Order
                  </h2>
                  <p className="text-xs text-brand-muted">
                    {itemCount} {itemCount === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-brand-muted hover:text-brand-chili p-1 transition-colors flex items-center gap-1"
                    title="Clear order"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-brand-deep hover:bg-stone-200 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Order Type Toggle in Cart */}
            <div className="p-3.5 bg-brand-cream/60 border-b border-brand-border">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                  How would you like to receive it?
                </span>
                <span className="text-[10px] font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                  {orderType === "takeaway" ? "₦500 / pack" : orderType === "delivery" ? "From ₦2,000" : "Free table seating"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 bg-stone-200/70 p-1 rounded-xl">
                {(
                  [
                    { type: "takeaway", label: "Takeaway", icon: Package },
                    { type: "delivery", label: "Delivery", icon: MapPin },
                    { type: "dine-in", label: "Dine-in", icon: UtensilsCrossed },
                  ] as const
                ).map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type as OrderType)}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      orderType === type
                        ? "bg-white text-brand-green shadow-xs font-bold"
                        : "text-brand-muted hover:text-brand-deep"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items List & Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Missing Main Meal Alert (if only drinks or sides) */}
              {items.length > 0 && !hasMainDish && (
                <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Looking for a main dish?</p>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                      You have drinks/sides in your cart. Add our signature Jollof Rice or Swallow to make it a complete plate!
                    </p>
                    <Link
                      href="/order"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <span>Add Main Dish</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-brand-muted">
                  <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-3">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-brand-deep mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-brand-muted max-w-[260px] mb-5">
                    Wetin you wan chop today? Start with our bestsellers or build your custom 3-step meal.
                  </p>

                  {/* Quick Starter Suggestions */}
                  <div className="w-full space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-left text-brand-muted uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-brand-orange" />
                      Popular Quick Starts
                    </div>
                    {EMPTY_STARTERS.map((starter) => (
                      <div
                        key={starter.id}
                        className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-left hover:border-brand-green/40 transition-colors"
                      >
                        <div className="flex-1 pr-2">
                          <p className="font-bold text-xs text-brand-deep">{starter.name}</p>
                          <p className="text-[11px] font-bold text-brand-green">{formatPrice(starter.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItem(starter)}
                          className="px-3 py-1.5 rounded-lg bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/order"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-green text-white font-bold px-5 py-3 rounded-btn hover:bg-brand-green-hover transition-colors text-sm shadow-md"
                  >
                    <span>Build 3-Step Custom Plate</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                /* Item list */
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3 rounded-2xl bg-stone-50 border border-brand-border/70 flex items-start justify-between gap-3 shadow-xs hover:border-brand-green/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-heading font-bold text-brand-deep text-sm truncate">
                            {item.name}
                          </span>
                          {item.id.includes("dodo") && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                              ₦200
                            </span>
                          )}
                          {item.isPack && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                              Pack
                            </span>
                          )}
                        </div>

                        {item.meta && (
                          <div className="text-[11px] text-brand-muted/80 mt-0.5">
                            {item.meta.swallowName} + {item.meta.soupName}
                          </div>
                        )}

                        <div className="font-heading font-black text-brand-green text-sm mt-1">
                          {formatPrice(item.price * item.quantity)}
                          {item.quantity > 1 && (
                            <span className="text-[11px] font-normal text-brand-muted ml-1.5">
                              ({formatPrice(item.price)} each)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <QuantityStepper
                          size="sm"
                          value={item.quantity}
                          onIncrement={() => updateQuantity(item.id, 1)}
                          onDecrement={() => updateQuantity(item.id, -1)}
                          itemName={item.name}
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] text-brand-muted hover:text-brand-chili transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pairings & Upsell Recommendations (when cart has items) */}
              {items.length > 0 && (
                <div className="pt-2 border-t border-brand-border/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-deep flex items-center gap-1">
                      <span>Add a Drink or Dodo (₦200)</span>
                    </span>
                    <span className="text-[10px] text-brand-muted">1-Tap Add</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {UPSELL_CANDIDATES.map((upsell) => {
                      const inCart = items.find((i) => i.itemId === upsell.id || i.name === upsell.name);
                      return (
                        <div
                          key={upsell.id}
                          className="p-2 rounded-xl bg-stone-50 border border-brand-border flex flex-col justify-between hover:border-brand-green/40 transition-colors"
                        >
                          <div className="mb-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-brand-deep line-clamp-1">
                                {upsell.name}
                              </span>
                              {upsell.id.includes("dodo") && (
                                <span className="text-[9px] font-black px-1 rounded bg-amber-100 text-amber-900 shrink-0">
                                  ₦200
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-extrabold text-brand-green">
                              {formatPrice(upsell.price)}
                            </span>
                          </div>

                          {inCart ? (
                            <div className="flex items-center justify-between bg-white border border-brand-green/30 rounded-lg p-1 text-[11px]">
                              <span className="text-brand-green font-bold flex items-center gap-0.5">
                                <Check className="w-3 h-3" />
                                {inCart.quantity} in cart
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(inCart.id, 1)}
                                className="w-5 h-5 rounded bg-brand-green/10 text-brand-green font-bold flex items-center justify-center hover:bg-brand-green hover:text-white"
                                title="Add another"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addItem(upsell)}
                              className="w-full py-1 px-2 rounded-lg bg-white border border-brand-border text-brand-deep text-[11px] font-bold hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors flex items-center justify-center gap-1 shadow-2xs"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer with Calculations & Single-Click Progression */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-brand-border bg-stone-50/95 space-y-3">
                {/* Free Delivery Bar if Delivery selected */}
                {orderType === "delivery" && <FreeDeliveryBar subtotal={fees.subtotal} />}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-brand-deep">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="font-semibold">{formatPrice(fees.subtotal)}</span>
                  </div>

                  {orderType === "takeaway" && (
                    <div className="flex justify-between">
                      <span className="text-brand-muted flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-brand-green" />
                        Takeaway pack ({fees.totalPacks} {fees.totalPacks === 1 ? "pack" : "packs"})
                      </span>
                      <span className="font-semibold">{formatPrice(fees.takeawayFee)}</span>
                    </div>
                  )}

                  {orderType === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-brand-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        Delivery fee
                      </span>
                      <span className="font-semibold">
                        {fees.deliveryFee === 0 ? (
                          <span className="text-brand-success font-bold">FREE</span>
                        ) : (
                          formatPrice(fees.deliveryFee)
                        )}
                      </span>
                    </div>
                  )}

                  {orderType === "dine-in" && (
                    <div className="flex justify-between text-xs text-brand-muted">
                      <span>Dine-in pre-order</span>
                      <span className="text-brand-success font-medium">Free (Pay at table)</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-brand-border flex justify-between items-baseline">
                    <span className="font-heading font-bold text-brand-deep text-sm">Total Due</span>
                    <motion.span
                      key={fees.total}
                      initial={shouldReduceMotion ? false : { scale: 1.1, color: "#22C55E" }}
                      animate={{ scale: 1, color: "#1A2E1A" }}
                      transition={{ duration: 0.2 }}
                      className="font-heading font-black text-brand-deep text-xl"
                    >
                      {formatPrice(fees.total)}
                    </motion.span>
                  </div>
                </div>

                {/* Checkout CTA Buttons */}
                <div className="pt-1 space-y-2">
                  {orderType === "delivery" && !fees.minDeliveryMet ? (
                    <div className="p-2.5 rounded-btn bg-amber-50 border border-amber-200 text-center text-xs text-amber-800 font-medium">
                      Minimum order for delivery is ₦10,000. Add more items to proceed.
                    </div>
                  ) : (
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-extrabold py-3.5 px-4 rounded-btn transition-all shadow-md text-sm sm:text-base group"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}

                  <Link
                    href="/order"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-brand-deep font-bold py-2.5 px-4 rounded-btn transition-colors text-xs text-center"
                  >
                    <span>Add More via 3-Step Meal Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
