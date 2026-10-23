"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Package, UtensilsCrossed, Clock, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { FreeDeliveryBar } from "@/components/ui/FreeDeliveryBar";
import { OrderType } from "@/types/order";

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
  } = useCart();

  const shouldReduceMotion = useReducedMotion();

  if (!isCartDrawerOpen) return null;

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

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-brand-border bg-stone-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-brand-deep">
                    Your Order
                  </h2>
                  <p className="text-xs text-brand-muted">
                    {itemCount} {itemCount === 1 ? "item" : "items"} in cart
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
            <div className="p-4 bg-brand-cream/60 border-b border-brand-border">
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Order Type
              </label>
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

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-brand-muted">
                  <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-muted/70 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-brand-deep mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-brand-muted max-w-[240px] mb-6">
                    Wetin you wan order? Browse our buka favourites and start your order.
                  </p>
                  <Link
                    href="/menu"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-5 py-2.5 rounded-btn hover:bg-brand-green-hover transition-colors text-sm shadow-sm"
                  >
                    Explore Menu
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 rounded-card bg-stone-50 border border-brand-border/70 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-bold text-brand-deep text-sm">
                          {item.name}
                        </span>
                        {item.isPack && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                            Pack
                          </span>
                        )}
                      </div>

                      {item.selectedSpice && (
                        <div className="text-[11px] text-brand-muted mt-0.5">
                          Spice: <span className="font-medium text-brand-deep">{item.selectedSpice}</span>
                        </div>
                      )}

                      {item.meta && (
                        <div className="text-[11px] text-brand-muted/80 mt-0.5">
                          {item.meta.swallowName} + {item.meta.soupName}
                        </div>
                      )}

                      <div className="font-heading font-bold text-brand-green text-sm mt-1">
                        {formatPrice(item.price * item.quantity)}
                        {item.quantity > 1 && (
                          <span className="text-[11px] font-normal text-brand-muted ml-1.5">
                            ({formatPrice(item.price)} each)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
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
                ))
              )}
            </div>

            {/* Drawer Footer with Calculations */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-brand-border bg-stone-50/90 space-y-3">
                {/* Free Delivery Bar if Delivery selected */}
                {orderType === "delivery" && (
                  <FreeDeliveryBar subtotal={fees.subtotal} />
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs sm:text-sm text-brand-deep">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="font-medium">{formatPrice(fees.subtotal)}</span>
                  </div>

                  {orderType === "takeaway" && (
                    <div className="flex justify-between">
                      <span className="text-brand-muted flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-brand-green" />
                        Takeaway packaging ({fees.totalPacks} {fees.totalPacks === 1 ? "pack" : "packs"})
                      </span>
                      <span className="font-medium">{formatPrice(fees.takeawayFee)}</span>
                    </div>
                  )}

                  {orderType === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-brand-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        Delivery fee
                      </span>
                      <span className="font-medium">
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

                  <div className="pt-2 border-t border-brand-border flex justify-between items-baseline text-base sm:text-lg">
                    <span className="font-heading font-bold text-brand-deep">Estimated Total</span>
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

                {/* Checkout CTA */}
                <div className="pt-1">
                  {orderType === "delivery" && !fees.minDeliveryMet ? (
                    <div className="p-2.5 rounded-btn bg-amber-50 border border-amber-200 text-center text-xs text-amber-800 font-medium">
                      Minimum order for delivery is ₦10,000. Add more items to proceed.
                    </div>
                  ) : (
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 px-4 rounded-btn transition-colors shadow-sm text-sm sm:text-base group"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}

                  <Link
                    href="/order"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-brand-deep font-semibold py-2.5 px-4 rounded-btn transition-colors text-xs text-center"
                  >
                    Open 3-Step Custom Plate Builder
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
