"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Utensils, CheckCircle2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Step1Main } from "@/components/order/Step1Main";
import { Step2Addons } from "@/components/order/Step2Addons";
import { Step3Checkout } from "@/components/order/Step3Checkout";
import { OrderSummarySidebar } from "@/components/order/OrderSummarySidebar";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const { items, fees } = useCart();
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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-32">
      {/* Sticky Top Stepper Navigation */}
      <div className="sticky top-20 z-30 bg-[#F8F5F0]/95 backdrop-blur-md py-3.5 mb-6 sm:mb-8 border-b border-brand-border/70 -mx-4 px-4 sm:-mx-6 sm:px-6 shadow-2xs">
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
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all ${
                currentStep >= 1
                  ? "bg-brand-green text-white shadow-md ring-4 ring-white group-hover:scale-105"
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
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none disabled:opacity-50 cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all ${
                currentStep >= 2
                  ? "bg-brand-green text-white shadow-md ring-4 ring-white group-hover:scale-105"
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
              Drinks, Meats & Sides
            </span>
          </button>

          {/* Step 3 Circle */}
          <button
            type="button"
            onClick={() => hasMain && setCurrentStep(3)}
            disabled={!hasMain}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none disabled:opacity-50 cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm transition-all ${
                currentStep === 3
                  ? "bg-brand-green text-white shadow-md ring-4 ring-white group-hover:scale-105"
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
          <OrderSummarySidebar currentStep={currentStep} onStepChange={setCurrentStep} />
        </div>
      </div>

      {/* Persistent Floating Bottom Progression Bar */}
      {items.length > 0 && currentStep < 3 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border/90 shadow-[0_-4px_25px_rgba(0,0,0,0.09)] py-3 px-4 sm:px-8 animate-fadeIn">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-sm shrink-0">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </div>
              <div>
                <div className="text-[11px] text-brand-muted font-medium">
                  Step {currentStep} of 3 • {currentStep === 1 ? "Main Dishes" : "Drinks & Sides"}
                </div>
                <div className="font-heading font-black text-brand-deep text-lg leading-none">
                  {formatPrice(fees.total)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-full border border-brand-border bg-stone-50 hover:bg-stone-100 text-xs font-bold text-brand-deep transition-all shrink-0"
                >
                  ← Back to Step 1
                </button>
              )}

              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!hasMain}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green hover:bg-brand-green-hover disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-heading font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
                >
                  <span>{hasMain ? "Next: Add Drinks & Sides →" : "Pick a Main Dish to Continue"}</span>
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-heading font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
                >
                  <span>Proceed to Checkout →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
