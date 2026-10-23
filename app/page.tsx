"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Truck,
  Utensils,
  Flame,
  Star,
  CheckCircle2,
  Heart,
  ChevronRight,
} from "lucide-react";
import { POPULAR_DISHES, COMBOS, RICE, GRILLS_AND_PEPPER_SOUPS } from "@/data/menu";
import { formatPrice } from "@/lib/utils";
import { DishCard } from "@/components/menu/DishCard";
import { Badge } from "@/components/ui/Badge";
import { fadeInVariants } from "@/lib/motion";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/80 via-[#F8F5F0] to-[#F8F5F0] pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-brand-border/60">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-brand-green text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-current" />
                <span>Victoria Island’s Premier Authentic Nigerian Kitchen</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-brand-deep tracking-tight leading-[1.1]">
                Real Nigerian Food,{" "}
                <span className="text-brand-green inline-block">Made with Pride.</span>
              </h1>

              <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
                From our seasoned firewood pots straight to your table. Experience authentic
                Nigerian recipes with modern convenience — hot swallows, rich native soups, smoky party
                jollof, and charcoal suya grilled to perfection.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/order"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-bold text-base px-8 py-4 rounded-btn shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>Start 3-Step Order</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border-2 border-brand-green/30 text-brand-green font-heading font-bold text-base px-7 py-3.5 rounded-btn shadow-xs transition-colors"
                >
                  <span>Explore Menu</span>
                </Link>
              </div>

              {/* Key Trust Badges */}
              <div className="pt-6 border-t border-brand-border/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-brand-border/50 shadow-2xs">
                  <div className="font-heading font-black text-brand-deep text-sm sm:text-base">
                    100% Real
                  </div>
                  <div className="text-[11px] text-brand-muted leading-tight mt-0.5">
                    Authentic slow-cooked Nigerian flavours
                  </div>
                </div>

                <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-brand-border/50 shadow-2xs">
                  <div className="font-heading font-black text-brand-green text-sm sm:text-base">
                    ₦250 / Pack
                  </div>
                  <div className="text-[11px] text-brand-muted leading-tight mt-0.5">
                    Clear transparent packaging fee
                  </div>
                </div>

                <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-brand-border/50 shadow-2xs">
                  <div className="font-heading font-black text-brand-orange text-sm sm:text-base">
                    FREE Delivery
                  </div>
                  <div className="text-[11px] text-brand-muted leading-tight mt-0.5">
                    Unlocked on orders from ₦35k
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Featured Popular Plate Hero Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-6 rounded-3xl border border-brand-border shadow-xl">
                {/* Floating pill badge */}
                <div className="absolute -top-3.5 right-6 z-20">
                  <Badge variant="popular" size="md">
                    Chef’s #1 Pick
                  </Badge>
                </div>

                {/* Cultural dish showcase graphic */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner group">
                  <Image
                    src="/images/dishes/dish-pounded-yam-egusi-1.jpg"
                    alt="Pounded Yam & Egusi"
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 p-5 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] uppercase tracking-widest font-mono text-brand-gold bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                        Popular Combo Shortcut
                      </span>
                      <span className="bg-brand-green/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
                        1 Pack
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-heading font-black text-2xl sm:text-3xl text-white drop-shadow-md">
                        Pounded Yam & Egusi
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-200 drop-shadow-sm">
                        Silky pounded yam with rich iru-infused melon soup and tender greens.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                      <span className="text-stone-300">Swallow (₦600) + Soup (₦800)</span>
                      <span className="font-heading font-black text-lg text-brand-gold">₦1,400</span>
                    </div>
                  </div>
                </div>

                {/* Quick Add row */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-brand-muted">Combined price</div>
                    <div className="font-heading font-black text-brand-deep text-2xl">
                      ₦1,400
                    </div>
                  </div>

                  <Link
                    href="/order"
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm px-5 py-2.5 rounded-btn shadow-sm transition-all"
                  >
                    <span>Order This Plate</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section (3-Step Order Overview) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
            Modern Convenience
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-brand-deep">
            How Taste of Naija Works
          </h2>
          <p className="text-sm text-brand-muted">
            Order in 3 intuitive steps with live total calculations and transparent packaging fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-card border border-brand-border/70 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-heading font-black text-xl">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-deep">
                Pick Your Main Dish
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Choose a Popular Combo shortcut (Pounded Yam & Egusi, Amala & Ewedu), or select Rice, Pepper Soup, or custom Swallow + Soup. Each main counts as 1 pack.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/40 text-xs font-semibold text-brand-green">
              Step 1: Main Dishes
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-card border border-brand-border/70 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-heading font-black text-xl">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-deep">
                Add Proteins, Sides & Spice
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Add Goat Meat, Fried Chicken, Fish, Shaki, Dodo, or Moi Moi. Proteins and sides never incur pack charges. Select your preferred kitchen heat level.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/40 text-xs font-semibold text-brand-orange">
              Step 2: Add-ons (No Pack Fees)
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-card border border-brand-border/70 shadow-xs relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-heading font-black text-xl">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-deep">
                Dine-in, Takeaway or Delivery
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Pre-order for dine-in with zero fees, grab takeaway at ₦250/pack, or get swift home delivery for ₦3,000 flat (Free over ₦35k). Pay securely with Paystack.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/40 text-xs font-semibold text-brand-green">
              Step 3: Fast & Secure Checkout
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm px-6 py-3 rounded-btn shadow-sm transition-all"
          >
            <span>Try the 3-Step Custom Order Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Popular Combos Showcase */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
              Crowd Favourites
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-brand-deep mt-2">
              Popular Taste of Naija Combos
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Complete swallow and soup pairings ready in a single click.
            </p>
          </div>

          <Link
            href="/menu?category=combos"
            className="inline-flex items-center gap-1.5 font-bold text-brand-green hover:text-brand-green-hover text-sm"
          >
            <span>View All Combos</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMBOS.slice(0, 6).map((combo) => (
            <DishCard key={combo.id} item={combo} />
          ))}
        </div>
      </section>

      {/* Smokey Jollof & Street Food Highlight */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-3 py-1 rounded-full">
              Firewood Delights
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-brand-deep mt-2">
              Rice, Grills & Street Food
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Legendary firewood Party Jollof, spicy Asun, tender Beef Suya, and sweet Dodo.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 font-bold text-brand-green hover:text-brand-green-hover text-sm"
          >
            <span>Explore Full Menu</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DISHES.filter((d) => d.category !== "combos")
            .slice(0, 4)
            .map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Taste of Naija Heritage Story Callout Banner */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0A4823] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #FFFFFF 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold bg-black/20 px-3 py-1 rounded-full border border-white/10">
              Our Food Philosophy
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl leading-tight">
              “Real Nigerian food, made with pride.”
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              We started Taste of Naija with one uncompromising promise: never cut corners on the
              traditional firewood smoke, the sun-dried iru, the hand-ground egusi, or the aged white yam.
              Whether you’re dining in with family or getting lunch delivered to your desk in VI, you get
              the real taste of home.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                Pure Red Palm Oil from Delta
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                No Artificial Soup Thickeners
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                Freshly Ground Yaji Spices
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-yellow-300 text-brand-deep font-heading font-bold text-sm px-6 py-3 rounded-btn shadow-md transition-all"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
            Real Reviews
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-brand-deep">
            What Lagos Foodies Say
          </h2>
          <p className="text-sm text-brand-muted">
            From lunch rush orders in Ikoyi to late-night pepper soup in VI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "The Party Jollof has that unmistakable charred bottom-pot aroma that you usually only get at real Saturday owambes. And the 3-step order makes ordering for our office super fast.",
              name: "Chidinma O.",
              location: "Victoria Island",
              dish: "Ordered Party Jollof & Fried Chicken",
            },
            {
              quote:
                "Real Pounded Yam! Lumpless and properly elastic. The Egusi with goat meat was loaded with iru and smoked fish. Arrived hot in secure packaging — no spills at all.",
              name: "Femi A.",
              location: "Ikoyi",
              dish: "Ordered Pounded Yam & Egusi Combo",
            },
            {
              quote:
                "I ordered Catfish Pepper Soup and Beef Suya for a late dinner. The ehuru spice broth cleared my sinuses instantly. Delivery was right on time under 45 minutes.",
              name: "Emeka K.",
              location: "Lekki Phase 1",
              dish: "Ordered Catfish Pepper Soup & Suya",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-card border border-brand-border/70 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-brand-deep text-xs sm:text-sm leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-border/50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-heading font-bold text-brand-deep">{item.name}</div>
                  <div className="text-brand-muted text-[11px]">{item.location}</div>
                </div>
                <div className="text-[10px] text-brand-green font-semibold bg-brand-green/10 px-2 py-0.5 rounded-full">
                  Verified Order
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
