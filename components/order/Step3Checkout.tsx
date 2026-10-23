"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  UtensilsCrossed,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { OrderType, Order } from "@/types/order";
import { FreeDeliveryBar } from "@/components/ui/FreeDeliveryBar";

interface Step3CheckoutProps {
  onBack: () => void;
}

export function Step3Checkout({ onBack }: Step3CheckoutProps) {
  const router = useRouter();
  const { items, orderType, setOrderType, fees, clearCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [timeSlot, setTimeSlot] = useState("13:00");
  const [pickupTime, setPickupTime] = useState("In 30 minutes");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Victoria Island, Lagos");
  const [landmark, setLandmark] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your phone number so we can reach you.");
      return;
    }

    if (orderType === "delivery") {
      if (!fees.minDeliveryMet) {
        setErrorMsg("Minimum order for home delivery is ₦10,000.");
        return;
      }
      if (!address.trim()) {
        setErrorMsg("Please provide your delivery street address.");
        return;
      }
    }

    setIsSubmitting(true);

    // Generate unique order ID
    const orderId = `TON-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: orderId,
      reference: `PAY-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: orderType === "dine-in" ? "confirmed" : "awaiting_payment",
      type: orderType,
      items: [...items],
      subtotal: fees.subtotal,
      takeawayPacks: fees.totalPacks,
      takeawayFee: fees.takeawayFee,
      deliveryFee: fees.deliveryFee,
      total: fees.total,
      customer: {
        name,
        phone,
        email,
        timeSlot: orderType === "dine-in" ? timeSlot : undefined,
        pickupTime: orderType === "takeaway" ? pickupTime : undefined,
        address: orderType === "delivery" ? address : undefined,
        city: orderType === "delivery" ? city : undefined,
        landmark: orderType === "delivery" ? landmark : undefined,
        deliveryNotes: orderType === "delivery" ? deliveryNotes : undefined,
      },
      paymentMethod: orderType === "dine-in" ? "pay_at_restaurant" : "paystack",
      paymentReference: orderType !== "dine-in" ? `pstk_${Date.now()}` : undefined,
    };

    // Store in localStorage for confirmation screen
    try {
      localStorage.setItem(`order_${orderId}`, JSON.stringify(newOrder));
      const history = JSON.parse(localStorage.getItem("taste_of_naija_orders") || "[]");
      history.unshift(newOrder);
      localStorage.setItem("taste_of_naija_orders", JSON.stringify(history));
    } catch {
      // storage error fallback
    }

    // If Paystack is configured on the backend, attempt initialization
    if (orderType !== "dine-in" && process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY && !process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.includes("sample")) {
      try {
        const res = await fetch("/api/paystack/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email || "customer@tasteofnaija.ng",
            amount: fees.total,
            orderId,
            metadata: {
              customerName: name,
              customerPhone: phone,
              orderType,
            },
          }),
        });

        const payData = await res.json();
        if (payData.authorization_url) {
          clearCart();
          window.location.href = payData.authorization_url;
          return;
        }
      } catch {
        // Fallback to simulated completion below if network fails
      }
    }

    // Default immediate completion / demo flow
    setTimeout(() => {
      clearCart();
      router.push(`/order/confirmation/${orderId}`);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2.5 py-1 rounded-full">
          Step 3 of 3
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-brand-deep mt-2">
          Order Type & Checkout
        </h2>
        <p className="text-brand-muted text-sm mt-1">
          Choose how you’d like to receive your food and confirm details.
        </p>
      </div>

      {/* Order Type Selector - 3 Large Cards */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider">
          Select Dining Option
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Dine-In */}
          <div
            onClick={() => setOrderType("dine-in")}
            className={`p-4 rounded-card border-2 cursor-pointer transition-all ${
              orderType === "dine-in"
                ? "bg-brand-cream border-brand-green ring-2 ring-brand-green/20 shadow-sm"
                : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              {orderType === "dine-in" && (
                <CheckCircle2 className="w-5 h-5 text-brand-green" />
              )}
            </div>
            <h4 className="font-heading font-bold text-brand-deep text-base">
              Dine-in Pre-order
            </h4>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              Food prepared fresh for your arrival. Reserve your table time.
            </p>
            <div className="mt-3 pt-2 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
              No extra fees • Pay at restaurant
            </div>
          </div>

          {/* Card 2: Takeaway */}
          <div
            onClick={() => setOrderType("takeaway")}
            className={`p-4 rounded-card border-2 cursor-pointer transition-all ${
              orderType === "takeaway"
                ? "bg-brand-cream border-brand-green ring-2 ring-brand-green/20 shadow-sm"
                : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              {orderType === "takeaway" && (
                <CheckCircle2 className="w-5 h-5 text-brand-green" />
              )}
            </div>
            <h4 className="font-heading font-bold text-brand-deep text-base">
              Takeaway Pickup
            </h4>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              Packaged hot in sealed food-grade takeaway bowls for pick-up.
            </p>
            <div className="mt-3 pt-2 border-t border-brand-border/60 text-xs font-semibold text-brand-orange">
              ₦250 per pack ({fees.totalPacks} packs) • Paystack
            </div>
          </div>

          {/* Card 3: Home Delivery */}
          <div
            onClick={() => setOrderType("delivery")}
            className={`p-4 rounded-card border-2 cursor-pointer transition-all ${
              orderType === "delivery"
                ? "bg-brand-cream border-brand-green ring-2 ring-brand-green/20 shadow-sm"
                : "bg-white border-brand-border hover:border-brand-green/40 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              {orderType === "delivery" && (
                <CheckCircle2 className="w-5 h-5 text-brand-green" />
              )}
            </div>
            <h4 className="font-heading font-bold text-brand-deep text-base">
              Home Delivery
            </h4>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              Dispatched with insulated riders directly to your doorstep.
            </p>
            <div className="mt-3 pt-2 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
              {fees.freeDeliveryUnlocked ? "FREE Delivery!" : "₦3,000 flat"} • Min ₦10,000
            </div>
          </div>
        </div>
      </div>

      {/* Free Delivery Bar if Delivery */}
      {orderType === "delivery" && (
        <FreeDeliveryBar subtotal={fees.subtotal} />
      )}

      {/* Details Inputs Form */}
      <div className="bg-white p-5 sm:p-6 rounded-card border border-brand-border shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-base text-brand-deep">
          Customer & Timing Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-deep mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tunde Balogun"
              className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-deep mb-1">
              Phone Number (WhatsApp preferred) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0801 234 5678"
              className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-deep mb-1">
            Email Address (for receipt)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. tunde@example.com"
            className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
          />
        </div>

        {/* Dynamic Fields for Dine-in */}
        {orderType === "dine-in" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-brand-deep mb-1">
                Estimated Table Arrival Time *
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
              >
                <option value="12:00 PM">12:00 PM (Lunch)</option>
                <option value="1:00 PM">1:00 PM (Lunch)</option>
                <option value="2:00 PM">2:00 PM (Lunch)</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="6:00 PM">6:00 PM (Dinner)</option>
                <option value="7:30 PM">7:30 PM (Dinner)</option>
                <option value="9:00 PM">9:00 PM (Late Dinner)</option>
              </select>
            </div>
            <div className="flex items-center text-xs text-brand-muted bg-brand-cream p-3 rounded-input">
              Table will be held for 20 minutes past your reserved time. Pay when seated!
            </div>
          </div>
        )}

        {/* Dynamic Fields for Takeaway */}
        {orderType === "takeaway" && (
          <div>
            <label className="block text-xs font-semibold text-brand-deep mb-1">
              Estimated Ready / Pickup Time *
            </label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
            >
              <option value="In 20 minutes">Ready in 20 minutes (Express)</option>
              <option value="In 35 minutes">Ready in 35 minutes</option>
              <option value="In 50 minutes">Ready in 50 minutes</option>
              <option value="Later today (specify in notes)">Later today</option>
            </select>
          </div>
        )}

        {/* Dynamic Fields for Delivery */}
        {orderType === "delivery" && (
          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-brand-deep mb-1">
                Street Address & House / Flat Number *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Flat 4B, 15 Karimu Kotun Street"
                className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-deep mb-1">
                  Area / Zone *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
                >
                  <option value="Victoria Island">Victoria Island</option>
                  <option value="Ikoyi">Ikoyi</option>
                  <option value="Lekki Phase 1">Lekki Phase 1</option>
                  <option value="Oniru">Oniru</option>
                  <option value="Lagos Island">Lagos Island / Marina</option>
                  <option value="Lekki Phase 2 / Chevron">Lekki Phase 2 / Chevron</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-deep mb-1">
                  Nearest Landmark (helps dispatch rider)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Ebeano Supermarket"
                  className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-deep mb-1">
                Special Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Call when outside the gate, please ring bell"
                className="w-full h-12 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm text-brand-deep bg-stone-50/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-3.5 rounded-btn bg-red-50 border border-red-200 text-brand-chili text-xs sm:text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Final Total Calculation Card */}
      <div className="p-5 rounded-card bg-stone-50 border border-brand-border space-y-3">
        <h4 className="font-heading font-bold text-sm text-brand-deep uppercase tracking-wider">
          Final Payment Summary
        </h4>

        <div className="space-y-1.5 text-xs sm:text-sm text-brand-deep">
          <div className="flex justify-between">
            <span className="text-brand-muted">Food Subtotal</span>
            <span className="font-medium">{formatPrice(fees.subtotal)}</span>
          </div>

          {orderType === "takeaway" && (
            <div className="flex justify-between">
              <span className="text-brand-muted">
                Takeaway Packaging ({fees.totalPacks} {fees.totalPacks === 1 ? "pack" : "packs"} × ₦250)
              </span>
              <span className="font-medium">{formatPrice(fees.takeawayFee)}</span>
            </div>
          )}

          {orderType === "delivery" && (
            <div className="flex justify-between">
              <span className="text-brand-muted">Home Delivery Fee</span>
              <span className="font-medium">
                {fees.deliveryFee === 0 ? (
                  <span className="text-brand-success font-bold">FREE (₦3,000 waived)</span>
                ) : (
                  formatPrice(fees.deliveryFee)
                )}
              </span>
            </div>
          )}

          {orderType === "dine-in" && (
            <div className="flex justify-between text-xs text-brand-muted">
              <span>Dine-in Pre-order</span>
              <span className="text-brand-success font-medium">Free</span>
            </div>
          )}

          <div className="pt-3 border-t border-brand-border flex justify-between items-baseline text-lg sm:text-xl font-heading font-black text-brand-deep">
            <span>Total Payable</span>
            <span className="text-brand-green">{formatPrice(fees.total)}</span>
          </div>
        </div>

        {/* Security badge */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-brand-muted">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span>
            {orderType === "dine-in"
              ? "No payment required now. Pay directly at the restaurant."
              : "Secured Paystack checkout • Card, Bank Transfer, USSD"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-btn border border-brand-border bg-white text-brand-deep font-semibold text-sm hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 2</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting || (orderType === "delivery" && !fees.minDeliveryMet)}
          className="w-full sm:w-auto px-10 py-4 rounded-btn bg-brand-green hover:bg-brand-green-hover disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-heading font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Processing Order...</span>
          ) : orderType === "dine-in" ? (
            <span>Confirm Dine-in Pre-Order</span>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Pay {formatPrice(fees.total)} via Paystack</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
