import React from "react";
import Link from "next/link";
import { Truck, Package, Clock, ShieldCheck, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DeliveryInfoPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Transparent Logistics
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-deep">
          Delivery & Packaging Rules
        </h1>
        <p className="text-sm text-brand-muted">
          Clear, straightforward fees with zero hidden charges. Insulated hot delivery across Lagos.
        </p>
      </div>

      {/* 3 Core Order Rules Table */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card space-y-6">
        <h2 className="font-heading font-bold text-xl text-brand-deep">
          Official Fulfilment & Pricing Policy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Dine-in */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-brand-border space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Option 1
            </span>
            <h3 className="font-heading font-bold text-lg text-brand-deep">
              Dine-In Pre-Order
            </h3>
            <div className="font-heading font-black text-2xl text-brand-green">
              FREE
            </div>
            <ul className="text-xs text-brand-muted space-y-1.5 pt-2 border-t border-brand-border/60">
              <li>• Pay directly at the restaurant when seated</li>
              <li>• Table held up to 20 mins from time slot</li>
              <li>• Food timed fresh for your arrival</li>
            </ul>
          </div>

          {/* Takeaway */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Option 2
            </span>
            <h3 className="font-heading font-bold text-lg text-brand-deep">
              Takeaway Pickup
            </h3>
            <div className="font-heading font-black text-2xl text-brand-orange">
              ₦250 <span className="text-xs font-normal text-brand-deep">per pack</span>
            </div>
            <ul className="text-xs text-brand-muted space-y-1.5 pt-2 border-t border-amber-200/60">
              <li>• 1 pack = every main dish, plate, or combo</li>
              <li>• Proteins and sides have zero pack fees</li>
              <li>• Food-grade microwave-safe sealed bowls</li>
            </ul>
          </div>

          {/* Delivery */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Option 3
            </span>
            <h3 className="font-heading font-bold text-lg text-brand-deep">
              Home Delivery
            </h3>
            <div className="font-heading font-black text-2xl text-brand-deep">
              ₦3,000 <span className="text-xs font-normal text-brand-success font-bold">or FREE</span>
            </div>
            <ul className="text-xs text-brand-muted space-y-1.5 pt-2 border-t border-emerald-200/60">
              <li>• <strong>FREE Delivery</strong> on orders ≥ ₦35,000</li>
              <li>• Minimum order for delivery is ₦10,000</li>
              <li>• Delivered hot in thermal insulated boxes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What is a Pack? Detailed Explanation */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-brand-green">
          <Package className="w-5 h-5" />
          <h3 className="font-heading font-bold text-lg text-brand-deep">
            How The ₦250 Takeaway Pack Fee Is Calculated
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          To ensure food safety and prevent spillage during transport, we pack all soups, swallows,
          and rice plates into premium tamper-evident takeaway containers. Here is our exact, fair formula:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-stone-50 border border-brand-border">
            <h4 className="font-heading font-bold text-sm text-brand-deep mb-1">
              Counts as 1 Pack (₦250 fee):
            </h4>
            <ul className="text-xs text-brand-muted space-y-1">
              <li>• Any Popular Combo (e.g. Pounded Yam & Egusi)</li>
              <li>• Any Swallow + Soup combo</li>
              <li>• Any Rice plate (Party Jollof, Fried Rice, Ofada)</li>
              <li>• Any Pepper Soup bowl or Grill portion (Asun, Suya, Nkwobi)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-brand-border">
            <h4 className="font-heading font-bold text-sm text-brand-deep mb-1">
              Zero Pack Fee (₦0 fee):
            </h4>
            <ul className="text-xs text-brand-muted space-y-1">
              <li>• All Meats & Proteins (Beef, Ponmo, Goat Meat, Chicken, Fish, Turkey)</li>
              <li>• All Sides (Dodo, Moi Moi, Yam Sauce, Ewa Agoyin)</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 bg-brand-cream rounded-xl text-xs text-brand-deep border border-brand-border/70">
          <strong>Example:</strong> If you order 2 × Party Jollof, 1 × Fried Chicken, and 1 × Dodo for takeaway:
          <br />
          You only pay for 2 packs (2 × ₦250 = ₦500 packaging fee).
        </div>
      </div>

      {/* Delivery Zones */}
      <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-brand-green">
          <MapPin className="w-5 h-5" />
          <h3 className="font-heading font-bold text-lg text-brand-deep">
            Primary Delivery Coverage Zones
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          {[
            { zone: "Victoria Island", time: "25 – 35 mins" },
            { zone: "Ikoyi", time: "30 – 40 mins" },
            { zone: "Lekki Phase 1", time: "35 – 45 mins" },
            { zone: "Oniru & Water Corporation", time: "25 – 35 mins" },
            { zone: "Lagos Island / Marina", time: "35 – 50 mins" },
            { zone: "Lekki Phase 2 / Chevron", time: "45 – 55 mins" },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-brand-border">
              <div className="font-heading font-bold text-brand-deep">{item.zone}</div>
              <div className="text-[11px] text-brand-green font-semibold mt-0.5">
                Avg. dispatch: {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ready to order */}
      <div className="text-center pt-4">
        <Link
          href="/order"
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm px-8 py-4 rounded-btn shadow-md transition-all"
        >
          <span>Start Your Order Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
