"use client";

import React, { useState } from "react";
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
  Flame,
  UtensilsCrossed,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "3-Step Order", badge: "Live" },
  { href: "/delivery-info", label: "Delivery Info" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#09411F] text-emerald-100 text-[11px] sm:text-xs py-2 px-4 font-medium border-b border-emerald-900/70">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="tracking-wide">
              Real Nigerian food, made with pride • Hot & fresh for Dine-in, Takeaway & Home Delivery
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-emerald-200/90 text-xs">
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
              Helpline / Custom Orders: 09071649725
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border/80 shadow-[0_2px_15px_rgba(15,123,60,0.04)] transition-all">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
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
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Primary Order Now Button */}
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-green to-[#0C6933] hover:from-[#0C6933] hover:to-[#094F26] text-white text-xs sm:text-sm font-heading font-extrabold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <UtensilsCrossed className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
              <span>Order Now</span>
            </Link>

            {/* Cart Trigger Button */}
            <motion.button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              className="relative p-2.5 sm:px-3.5 sm:py-2.5 rounded-full border border-brand-border bg-stone-50 hover:bg-brand-cream text-brand-deep flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-2xs"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-green" />
              <span className="hidden sm:inline text-xs font-bold text-brand-deep">
                Cart
              </span>

              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={shouldReduceMotion ? false : { scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="w-5 h-5 rounded-full bg-brand-orange text-white text-[11px] font-black flex items-center justify-center shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-brand-deep hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-brand-border bg-white/98 backdrop-blur-md px-4 py-5 overflow-hidden shadow-xl space-y-4"
            >
              {/* Quick Mobile Order Now Banner */}
              <Link
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-brand-green text-white font-heading font-extrabold text-sm shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-brand-gold" />
                  <span>Start 3-Step Order</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-brand-green/10 text-brand-green font-bold"
                          : "text-brand-deep hover:bg-stone-50"
                      )}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange text-white">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-brand-border/70 flex flex-col gap-2 text-xs text-brand-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-green" />
                  <span>Open Everyday: 11:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-green" />
                  <a href="tel:09071649725" className="hover:underline">
                    Helpline / Custom Orders: 09071649725
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
