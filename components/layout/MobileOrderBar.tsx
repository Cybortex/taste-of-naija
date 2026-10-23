"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export function MobileOrderBar() {
  const { itemCount, fees, setIsCartDrawerOpen } = useCart();
  const shouldReduceMotion = useReducedMotion();

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { y: 100 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { y: 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-white/95 backdrop-blur-md border-t border-brand-border/80 shadow-sheet pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-orange text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            </div>
            <div>
              <div className="text-[11px] text-brand-muted font-medium">Order Total</div>
              <motion.div
                key={fees.total}
                initial={shouldReduceMotion ? false : { scale: 1.1 }}
                animate={{ scale: 1 }}
                className="font-heading font-extrabold text-brand-deep text-lg leading-tight"
              >
                {formatPrice(fees.total)}
              </motion.div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm px-5 py-2.5 rounded-btn shadow-md active:scale-95 transition-all"
          >
            <span>View Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
