"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, Package, Clock, UtensilsCrossed, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { FreeDeliveryBar } from "@/components/ui/FreeDeliveryBar";

export function OrderSummarySidebar() {
  const { items, orderType, fees, updateQuantity, removeItem, clearCart, itemCount } = useCart();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-white rounded-card border border-brand-border shadow-card p-5 sticky top-24 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-brand-green" />
          <h3 className="font-heading font-bold text-base text-brand-deep">
            Live Order Summary
          </h3>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-brand-muted hover:text-brand-chili transition-colors flex items-center gap-1"
            title="Clear all items"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Free delivery bar if delivery */}
      {orderType === "delivery" && (
        <FreeDeliveryBar subtotal={fees.subtotal} />
      )}

      {/* Items list */}
      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="text-center py-8 text-brand-muted">
            <p className="text-xs">No dishes added yet.</p>
            <p className="text-[11px] text-brand-muted/70 mt-1">
              Select a main dish from Step 1 to begin.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-stone-50 border border-brand-border/60 flex items-start justify-between gap-2 text-xs"
            >
              <div className="flex-1">
                <div className="font-heading font-bold text-brand-deep leading-tight">
                  {item.name}
                </div>
                {item.meta && (
                  <div className="text-[10px] text-brand-muted/80">
                    {item.meta.swallowName} + {item.meta.soupName}
                  </div>
                )}
                <div className="font-bold text-brand-green mt-0.5">
                  {formatPrice(item.price * item.quantity)}
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
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-[10px] text-brand-muted hover:text-brand-chili"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Breakdown */}
      <div className="pt-3 border-t border-brand-border space-y-2 text-xs sm:text-sm text-brand-deep">
        <div className="flex justify-between">
          <span className="text-brand-muted">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span className="font-medium">{formatPrice(fees.subtotal)}</span>
        </div>

        {orderType === "takeaway" && (
          <div className="flex justify-between">
            <span className="text-brand-muted flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-brand-orange" />
              Takeaway Packs ({fees.totalPacks} × ₦250)
            </span>
            <span className="font-medium">{formatPrice(fees.takeawayFee)}</span>
          </div>
        )}

        {orderType === "delivery" && (
          <div className="flex justify-between">
            <span className="text-brand-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              Delivery Fee
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
            <span className="flex items-center gap-1">
              <UtensilsCrossed className="w-3.5 h-3.5 text-brand-green" />
              Dine-in Pre-order
            </span>
            <span className="text-brand-success font-medium">Free</span>
          </div>
        )}

        <div className="pt-3 border-t border-brand-border flex justify-between items-baseline">
          <span className="font-heading font-bold text-brand-deep text-base">Estimated Total</span>
          <motion.span
            key={fees.total}
            initial={shouldReduceMotion ? false : { scale: 1.15, color: "#22C55E" }}
            animate={{ scale: 1, color: "#0F7B3C" }}
            transition={{ duration: 0.2 }}
            className="font-heading font-black text-brand-green text-xl"
          >
            {formatPrice(fees.total)}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
