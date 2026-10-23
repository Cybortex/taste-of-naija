"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Step3Checkout } from "@/components/order/Step3Checkout";
import { OrderSummarySidebar } from "@/components/order/OrderSummarySidebar";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-brand-muted">Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-black text-2xl text-brand-deep">
          Your Cart is Empty
        </h1>
        <p className="text-xs text-brand-muted">
          Please add at least one dish to your order before proceeding to checkout.
        </p>
        <div className="pt-2">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-btn text-sm hover:bg-brand-green-hover"
          >
            Start Your Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          href="/order"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Order Builder</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white p-5 sm:p-8 rounded-3xl border border-brand-border shadow-xs">
          <Step3Checkout onBack={() => router.push("/order")} />
        </div>

        <div className="hidden lg:block lg:col-span-4">
          <OrderSummarySidebar />
        </div>
      </div>
    </div>
  );
}
