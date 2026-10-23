"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import { Order, OrderStatus } from "@/types/order";
import { formatPrice } from "@/lib/utils";

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderConfirmationPage({ params }: ConfirmationPageProps) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`order_${resolvedParams.id}`);
      if (stored) {
        setOrder(JSON.parse(stored));
      } else {
        const historyStr = localStorage.getItem("taste_of_naija_orders");
        if (historyStr) {
          const history = JSON.parse(historyStr);
          const found = history.find((o: Order) => o.id === resolvedParams.id);
          if (found) {
            setOrder(found);
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center text-brand-muted">
        <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Loading your order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-cream text-brand-muted flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-black text-2xl text-brand-deep">
          Order Not Found
        </h1>
        <p className="text-sm text-brand-muted">
          We could not locate an active order with reference ID:{" "}
          <strong className="text-brand-deep">{resolvedParams.id}</strong>.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-btn text-sm hover:bg-brand-green-hover"
          >
            Start New Order
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-stone-100 text-brand-deep font-semibold px-6 py-3 rounded-btn text-sm hover:bg-stone-200"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const displayOrder: Order = order;

  const statusSteps = [
    { key: "confirmed", label: "Order Received", sub: "Kitchen notified" },
    { key: "preparing", label: "In The Pot", sub: "Firewood cooking" },
    {
      key: displayOrder.type === "delivery" ? "out_for_delivery" : "ready",
      label: displayOrder.type === "delivery" ? "With Dispatch" : "Ready for Pickup",
      sub: displayOrder.type === "delivery" ? "Rider en route" : "Collect at counter",
    },
    { key: "completed", label: "Completed", sub: "Enjoy your buka meal!" },
  ];

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Order Confirmed
        </span>

        <h1 className="font-heading font-black text-2xl sm:text-4xl text-brand-deep">
          Thank You, {displayOrder.customer.name}!
        </h1>

        <p className="text-sm text-brand-muted max-w-md mx-auto">
          We’ve received your order. Our kitchen is putting fire under the pots right now.
        </p>

        <div className="inline-block bg-stone-100 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-brand-deep border border-brand-border">
          Order ID: <span className="text-brand-green">{displayOrder.id}</span>
        </div>
      </div>

      {/* Live Status Progression Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-card space-y-6">
        <h3 className="font-heading font-bold text-base text-brand-deep flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-green" />
          <span>Kitchen Status Progression</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {statusSteps.map((step, idx) => (
            <div key={step.key} className="flex flex-col items-center text-center space-y-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  idx === 0 || idx === 1
                    ? "bg-brand-green text-white shadow-sm ring-4 ring-emerald-50"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {idx + 1}
              </div>
              <div className="font-heading font-bold text-xs text-brand-deep">
                {step.label}
              </div>
              <div className="text-[10px] text-brand-muted">{step.sub}</div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-orange shrink-0" />
          <span>
            {displayOrder.type === "dine-in"
              ? `Your table is reserved for arrival at ${displayOrder.customer.timeSlot || "your scheduled time"}.`
              : displayOrder.type === "takeaway"
              ? `Estimated pickup time: ${displayOrder.customer.pickupTime || "In 25-35 minutes"}.`
              : `Estimated delivery arrival: Within 40-55 minutes.`}
          </span>
        </div>
      </div>

      {/* Full Order Receipt Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-xs space-y-5">
        <h3 className="font-heading font-bold text-base text-brand-deep border-b border-brand-border pb-3">
          Order Summary & Receipt
        </h3>

        {/* Items List */}
        <div className="divide-y divide-brand-border/60">
          {displayOrder.items.map((item) => (
            <div key={item.id} className="py-3 flex items-start justify-between gap-4 text-xs sm:text-sm">
              <div>
                <div className="font-heading font-bold text-brand-deep">
                  {item.quantity} × {item.name}
                </div>
                {item.selectedSpice && (
                  <div className="text-[11px] text-brand-muted">Spice: {item.selectedSpice}</div>
                )}
                {item.isPack && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    1 Pack
                  </span>
                )}
              </div>

              <div className="font-heading font-bold text-brand-deep shrink-0">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing calculations */}
        <div className="pt-3 border-t border-brand-border space-y-1.5 text-xs sm:text-sm text-brand-deep">
          <div className="flex justify-between">
            <span className="text-brand-muted">Food Subtotal</span>
            <span>{formatPrice(displayOrder.subtotal)}</span>
          </div>

          {displayOrder.type === "takeaway" && (
            <div className="flex justify-between">
              <span className="text-brand-muted">
                Takeaway Packaging ({displayOrder.takeawayPacks} packs × ₦250)
              </span>
              <span>{formatPrice(displayOrder.takeawayFee)}</span>
            </div>
          )}

          {displayOrder.type === "delivery" && (
            <div className="flex justify-between">
              <span className="text-brand-muted">Home Delivery Fee</span>
              <span>
                {displayOrder.deliveryFee === 0 ? "FREE" : formatPrice(displayOrder.deliveryFee)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-brand-border flex justify-between items-baseline font-heading font-black text-lg text-brand-deep">
            <span>Total</span>
            <span className="text-brand-green">{formatPrice(displayOrder.total)}</span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="pt-4 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-brand-muted block font-medium">Customer Details</span>
            <span className="font-bold text-brand-deep">{displayOrder.customer.name}</span>
            <span className="block text-brand-muted">{displayOrder.customer.phone}</span>
          </div>

          <div>
            <span className="text-brand-muted block font-medium">Fulfillment Type</span>
            <span className="font-bold text-brand-deep uppercase">
              {displayOrder.type.replace("-", " ")}
            </span>
            {displayOrder.customer.address && (
              <span className="block text-brand-muted">
                {displayOrder.customer.address}, {displayOrder.customer.city}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Support & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <a
          href={`https://wa.me/2348123456789?text=Hello%20Taste%20of%20Naija,%20I%20have%20an%20inquiry%20regarding%20my%20order%20${displayOrder.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-btn text-sm shadow-sm transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </a>

        <Link
          href="/order"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 px-6 rounded-btn text-sm shadow-sm transition-colors"
        >
          <span>Place Another Order</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
