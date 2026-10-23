"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  itemName?: string;
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
  size = "md",
  className,
  itemName = "item",
}: QuantityStepperProps) {
  const shouldReduceMotion = useReducedMotion();

  const buttonSizeClass =
    size === "sm"
      ? "w-8 h-8 min-w-[36px] min-h-[36px]"
      : size === "lg"
      ? "w-12 h-12 min-w-[48px] min-h-[48px]"
      : "w-10 h-10 min-w-[44px] min-h-[44px]";

  const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 bg-stone-100/90 rounded-full p-1 border border-brand-border/60",
        className
      )}
      role="group"
      aria-label={`Quantity selector for ${itemName}`}
    >
      <motion.button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "flex items-center justify-center rounded-full bg-white text-brand-deep shadow-sm transition-colors border border-brand-border/40 focus:outline-none focus:ring-2 focus:ring-brand-accent",
          buttonSizeClass,
          value <= min
            ? "opacity-35 cursor-not-allowed text-stone-400 shadow-none"
            : "hover:bg-brand-cream hover:text-brand-green"
        )}
        aria-label={`Decrease quantity of ${itemName}`}
      >
        <Minus size={iconSize} />
      </motion.button>

      <motion.span
        key={value}
        initial={shouldReduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className="min-w-[28px] text-center font-heading font-bold text-brand-deep text-sm sm:text-base tabular-nums select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </motion.span>

      <motion.button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "flex items-center justify-center rounded-full bg-brand-green text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent",
          buttonSizeClass,
          value >= max
            ? "opacity-35 cursor-not-allowed bg-stone-300 shadow-none"
            : "hover:bg-brand-green-hover"
        )}
        aria-label={`Increase quantity of ${itemName}`}
      >
        <Plus size={iconSize} />
      </motion.button>
    </div>
  );
}
