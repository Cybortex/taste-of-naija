"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { FreeDeliveryBar } from "@/components/ui/FreeDeliveryBar";

export default function CartPage() {
  const { items, orderType, setOrderType, fees, updateQuantity, removeItem, clearCart, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-brand-muted max-w-sm mx-auto">
          You haven’t added any dishes yet. Browse our full Taste of Naija menu to get started.
        </p>
        <div className="pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-btn text-sm hover:bg-brand-green-hover shadow-sm"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-brand-border pb-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep">
            Your Cart ({itemCount} {itemCount === 1 ? "dish" : "dishes"})
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Review your dishes and proceed to checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-brand-muted hover:text-brand-chili flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Items List */}
        <div className="md:col-span-7 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-card bg-white border border-brand-border flex items-start justify-between gap-4 shadow-2xs"
            >
              <div className="flex-1">
                <div className="font-heading font-bold text-brand-deep text-base">
                  {item.name}
                </div>
                {item.isPack && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    1 Pack
                  </span>
                )}
                <div className="font-heading font-extrabold text-brand-green text-sm mt-1">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <QuantityStepper
                  value={item.quantity}
                  onIncrement={() => updateQuantity(item.id, 1)}
                  onDecrement={() => updateQuantity(item.id, -1)}
                  itemName={item.name}
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-brand-muted hover:text-brand-chili"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Right: Checkout summary card */}
        <div className="md:col-span-5 bg-white p-5 sm:p-6 rounded-card border border-brand-border shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-brand-deep">Order Summary</h3>

          {orderType === "delivery" && <FreeDeliveryBar subtotal={fees.subtotal} />}

          <div className="space-y-2 text-xs sm:text-sm text-brand-deep">
            <div className="flex justify-between">
              <span className="text-brand-muted">Subtotal</span>
              <span className="font-medium">{formatPrice(fees.subtotal)}</span>
            </div>

            {orderType === "takeaway" && (
              <div className="flex justify-between">
                <span className="text-brand-muted">Packaging Fee ({fees.totalPacks} packs)</span>
                <span className="font-medium">{formatPrice(fees.takeawayFee)}</span>
              </div>
            )}

            {orderType === "delivery" && (
              <div className="flex justify-between">
                <span className="text-brand-muted">Delivery Fee</span>
                <span className="font-medium">
                  {fees.deliveryFee === 0 ? "FREE" : formatPrice(fees.deliveryFee)}
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-brand-border flex justify-between items-baseline font-heading font-black text-lg text-brand-deep">
              <span>Total</span>
              <span className="text-brand-green">{formatPrice(fees.total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 px-4 rounded-btn text-sm shadow-sm transition-colors"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
