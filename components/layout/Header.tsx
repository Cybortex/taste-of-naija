"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  Clock,
  ArrowRight,
  UtensilsCrossed,
  Home,
  Truck,
  Camera,
  Heart,
  MapPin,
  MessageCircle,
  Flame,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn, formatPrice } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed, badge: "Popular" },
  { href: "/order", label: "3-Step Order", icon: Flame, badge: "Live" },
  { href: "/delivery-info", label: "Delivery Info", icon: Truck },
  { href: "/gallery", label: "Gallery", icon: Camera },
  { href: "/about", label: "Our Story", icon: Heart },
  { href: "/contact", label: "Contact", icon: MapPin },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, fees, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = origOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#09411F] text-emerald-100 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 font-medium border-b border-emerald-900/70 select-none">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shrink-0" />
            <span className="truncate tracking-wide">
              <span className="sm:hidden">Authentic Nigerian Kitchen • Fast Delivery in Lagos</span>
              <span className="hidden sm:inline">
                Real Nigerian food, made with pride • Hot & fresh for Dine-in, Takeaway & Home Delivery
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-emerald-200/90 text-xs shrink-0">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              Mon - Sun: 11:00 AM – 10:00 PM
            </span>
            <a
              href="tel:09071649725"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call Helpline for Custom Orders"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              Helpline: 09071649725
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border/80 shadow-[0_2px_15px_rgba(15,123,60,0.04)] transition-all">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center shrink-0 min-w-0" aria-label="Taste of Naija Home">
            <Logo variant="full" size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all relative flex items-center gap-1.5",
                    isActive
                      ? "text-brand-green bg-brand-green/10 font-bold"
                      : "text-brand-deep hover:text-brand-green hover:bg-stone-100/90"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-brand-orange text-white leading-tight shadow-2xs">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Order Now Button */}
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-green to-[#0C6933] hover:from-[#0C6933] hover:to-[#094F26] text-white text-xs sm:text-sm font-heading font-extrabold py-2.5 px-4 sm:px-5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 group shrink-0"
            >
              <UtensilsCrossed className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform shrink-0" />
              <span>Order Now</span>
            </Link>

            {/* Mobile Order Button (Compact Pill) */}
            <Link
              href="/order"
              className="sm:hidden inline-flex items-center gap-1.5 bg-brand-green text-white text-xs font-heading font-extrabold py-2 px-3 rounded-full shadow-xs active:scale-95 shrink-0"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>Order</span>
            </Link>

            {/* Cart Trigger Button */}
            <motion.button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              className="relative p-2 sm:px-3.5 sm:py-2.5 rounded-full border border-brand-border bg-stone-50 hover:bg-brand-cream text-brand-deep flex items-center gap-1.5 sm:gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-2xs shrink-0"
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green shrink-0" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={shouldReduceMotion ? false : { scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="sm:hidden absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-brand-orange text-white text-[9px] font-black flex items-center justify-center shadow-xs"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </div>

              <span className="hidden sm:inline text-xs font-bold text-brand-deep">
                Cart
              </span>

              {itemCount > 0 && (
                <span className="hidden sm:flex w-5 h-5 rounded-full bg-brand-orange text-white text-[11px] font-black items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-brand-border bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-brand-deep transition-all focus:outline-none focus:ring-2 focus:ring-brand-green shrink-0"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Slide-Over Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Darkened Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-50 bg-brand-deep/60 backdrop-blur-xs lg:hidden"
                aria-hidden="true"
              />

              {/* Side Drawer Panel */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
                animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-[340px] xs:max-w-[360px] bg-white shadow-2xl flex flex-col justify-between overflow-hidden lg:hidden border-l border-brand-border/70"
              >
                {/* Drawer Header */}
                <div className="p-4 border-b border-brand-border/70 bg-stone-50/90 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Logo variant="full" size="sm" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white border border-brand-border/80 hover:bg-stone-100 flex items-center justify-center text-brand-deep transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Hero Order Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F7B3C] via-[#0D6B34] to-[#074722] text-white shadow-md relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
                        <Flame className="w-3 h-3 text-brand-gold shrink-0" />
                        <span>Hungry?</span>
                      </div>
                      <h3 className="font-heading font-black text-base text-white leading-tight">
                        Build Your Custom Plate
                      </h3>
                      <p className="text-[11px] text-emerald-100/90 leading-snug">
                        Swallow, traditional soup, prime meats & chilled drinks in 3 easy steps.
                      </p>
                      <Link
                        href="/order"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-1 inline-flex items-center justify-between w-full bg-white hover:bg-brand-cream text-brand-green font-heading font-black text-xs py-2.5 px-3.5 rounded-xl shadow-xs transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          <span>Start 3-Step Order</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wider px-3 py-1">
                      Explore Taste of Naija
                    </div>

                    <nav className="space-y-1">
                      {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                              isActive
                                ? "bg-brand-green/10 text-brand-green font-bold border-l-4 border-brand-green shadow-2xs"
                                : "text-brand-deep hover:bg-stone-50"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0",
                                  isActive
                                    ? "bg-brand-green text-white"
                                    : "bg-stone-100 text-stone-600 group-hover:text-brand-green group-hover:bg-brand-green/10"
                                )}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs">{link.label}</span>
                            </div>

                            {link.badge ? (
                              <span
                                className={cn(
                                  "text-[10px] font-black px-2 py-0.5 rounded-full shrink-0",
                                  isActive
                                    ? "bg-brand-green text-white"
                                    : "bg-brand-orange text-white"
                                )}
                              >
                                {link.badge}
                              </span>
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-brand-muted/40 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Quick Contact & Info */}
                  <div className="pt-2 border-t border-brand-border/70 space-y-2">
                    <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wider px-1">
                      Quick Assistance
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:09071649725"
                        className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-brand-deep text-xs font-bold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-green shrink-0" />
                        <span>Call Us</span>
                      </a>
                      <a
                        href="https://wa.me/2349071649725?text=Hello%20Taste%20of%20Naija,%20I%20want%20to%20place%20an%20order"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-brand-border/60 text-[11px] text-brand-muted space-y-1.5">
                      <div className="flex items-center gap-1.5 font-medium text-brand-deep">
                        <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>11:00 AM – 10:00 PM Daily</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>14 Admiralty Way, Lekki Phase 1, Lagos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drawer Footer CTA */}
                <div className="p-3.5 border-t border-brand-border/80 bg-stone-50/95">
                  {itemCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsCartDrawerOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-btn bg-brand-green text-white font-heading font-extrabold text-xs shadow-md active:scale-95 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-brand-gold" />
                        <span>View Cart ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                      </div>
                      <span>{formatPrice(fees.total)} →</span>
                    </button>
                  ) : (
                    <Link
                      href="/menu"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-btn bg-stone-200 hover:bg-stone-300 text-brand-deep font-bold text-xs transition-colors"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5 text-brand-green" />
                      <span>Browse Full Food Menu</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
