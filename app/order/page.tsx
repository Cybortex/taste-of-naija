"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Utensils, CheckCircle2, ShoppingBag } from "lucide-react";
import { Step1Main } from "@/components/order/Step1Main";
import { Step2Addons } from "@/components/order/Step2Addons";
import { Step3Checkout } from "@/components/order/Step3Checkout";
import { OrderSummarySidebar } from "@/components/order/OrderSummarySidebar";
import { useCart } from "@/lib/cart-context";

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const { items } = useCart();
  const shouldReduceMotion = useReducedMotion();

  // Check if at least 1 main dish has been selected
  const hasMain = items.some((i) =>
    ["combos", "rice", "grills", "swallows", "soups"].includes(i.category)
  );

  // Edge case from docs: Removing the last main dish returns user to Step 1
  useEffect(() => {
    if (!hasMain && currentStep > 1) {
      setCurrentStep(1);
    }
  }, [hasMain, currentStep]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Stepper Indicator */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-stone-200 -z-0" />
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-brand-green transition-all duration-300 -z-0"
            style={{
              width: currentStep === 1 ? "15%" : currentStep === 2 ? "50%" : "100%",
            }}
          />

          {/* Step 1 Circle */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all ${
                currentStep >= 1
                  ? "bg-brand-green text-white shadow-md ring-4 ring-white"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              1
            </div>
            <span
              className={`text-xs font-bold hidden sm:inline ${
                currentStep === 1 ? "text-brand-green" : "text-brand-deep"
              }`}
            >
              Main Dishes
            </span>
          </button>

          {/* Step 2 Circle */}
          <button
            type="button"
            onClick={() => hasMain && setCurrentStep(2)}
            disabled={!hasMain}
            className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none disabled:opacity-50`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all ${
                currentStep >= 2
                  ? "bg-brand-green text-white shadow-md ring-4 ring-white"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              2
            </div>
            <span
              className={`text-xs font-bold hidden sm:inline ${
                currentStep === 2 ? "text-brand-green" : "text-brand-deep"
              }`}
            >
              Meats & Sides
            </span>
          </button>

          {/* Step 3 Circle */}
          <button
            type="button"
            onClick={() => hasMain && setCurrentStep(3)}
            disabled={!hasMain}
            className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none disabled:opacity-50`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all ${
                currentStep === 3
                  ? "bg-brand-green text-white shadow-md ring-4 ring-white"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              3
            </div>
            <span
              className={`text-xs font-bold hidden sm:inline ${
                currentStep === 3 ? "text-brand-green" : "text-brand-deep"
              }`}
            >
              Checkout & Pay
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Steps on Left, Sticky Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Steps) */}
        <div className="lg:col-span-8">
          <div className="bg-white p-5 sm:p-8 rounded-3xl border border-brand-border shadow-xs">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step1Main onContinue={() => setCurrentStep(2)} />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step2Addons
                    onBack={() => setCurrentStep(1)}
                    onContinue={() => setCurrentStep(3)}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step3Checkout onBack={() => setCurrentStep(2)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="hidden lg:block lg:col-span-4">
          <OrderSummarySidebar />
        </div>
      </div>
    </div>
  );
}
