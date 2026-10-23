"use client";

import React from "react";
import { Truck, CheckCircle2, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface FreeDeliveryBarProps {
  subtotal: number;
  className?: string;
}

export function FreeDeliveryBar({ subtotal, className = "" }: FreeDeliveryBarProps) {
  const minDeliveryThreshold = 10000;
  const freeDeliveryThreshold = 35000;

  const isFreeUnlocked = subtotal >= freeDeliveryThreshold;
  const isMinMet = subtotal >= minDeliveryThreshold;
  const percentage = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const remainingForMin = Math.max(0, minDeliveryThreshold - subtotal);

  return (
    <div className={`p-3.5 rounded-btn bg-stone-50 border border-brand-border/70 text-xs sm:text-sm ${className}`}>
      {/* Min order check first */}
      {!isMinMet ? (
        <div className="flex items-start gap-2 text-brand-warning mb-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Minimum delivery order is <strong>₦10,000</strong>. Add{" "}
            <strong>{formatPrice(remainingForMin)}</strong> more to place a delivery order.
          </span>
        </div>
      ) : isFreeUnlocked ? (
        <div className="flex items-center gap-2 text-brand-success font-semibold mb-2">
          <CheckCircle2 className="w-4 h-4 text-brand-success shrink-0" />
          <span>Congratulations! You’ve unlocked <strong>FREE Delivery</strong> (₦3,000 saved)!</span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 text-brand-deep font-medium mb-2">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-brand-green shrink-0" />
            <span>
              Add <strong>{formatPrice(remainingForFree)}</strong> more for <strong>FREE Delivery</strong>!
            </span>
          </span>
          <span className="font-bold text-brand-green shrink-0">{percentage}%</span>
        </div>
      )}

      {/* Progress Track */}
      <div className="w-full bg-stone-200/80 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isFreeUnlocked
              ? "bg-brand-success"
              : isMinMet
              ? "bg-brand-green"
              : "bg-brand-warning"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
