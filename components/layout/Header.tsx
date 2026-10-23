"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingBag, Menu, X, Phone, Clock, MapPin, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

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
      <div className="bg-[#0A4823] text-emerald-100 text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-emerald-900/60">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span>
              Real Nigerian food, made with pride • Hot & fresh for Dine-in, Takeaway & Home Delivery
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-emerald-200/80">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              Mon - Sun: 11:00 AM - 10:00 PM
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              +234 812 345 6789
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border/80 transition-shadow">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-brand-green to-[#074722] flex items-center justify-center text-white font-heading font-black text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-brand-deep text-lg sm:text-xl tracking-tight leading-none group-hover:text-brand-green transition-colors">
                Taste of Naija
              </span>
              <span className="text-[10px] sm:text-[11px] text-brand-muted font-medium tracking-wide mt-0.5">
                Real Nigerian Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-btn text-sm font-semibold transition-all relative flex items-center gap-1.5",
                    isActive
                      ? "text-brand-green bg-brand-green/10"
                      : "text-brand-deep hover:text-brand-green hover:bg-stone-100/80"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-brand-orange text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Order Button */}
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-btn shadow-sm transition-all hover:shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Order Now</span>
            </Link>

            {/* Cart Trigger Button */}
            <motion.button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              className="relative p-2.5 sm:px-3 sm:py-2 rounded-btn border border-brand-border bg-stone-50 hover:bg-brand-cream text-brand-deep flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent"
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
                  className="w-5 h-5 rounded-full bg-brand-orange text-white text-[11px] font-extrabold flex items-center justify-center shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-btn text-brand-deep hover:bg-stone-100 transition-colors"
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
              className="lg:hidden border-t border-brand-border bg-white px-4 py-4 overflow-hidden shadow-lg"
            >
              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-btn text-sm font-semibold transition-colors",
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

                <div className="pt-3 border-t border-brand-border/70 mt-2 space-y-2">
                  <Link
                    href="/order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3 rounded-btn text-sm shadow-sm"
                  >
                    Start 3-Step Custom Order
                  </Link>

                  <div className="p-3 bg-brand-cream/80 rounded-btn text-xs text-brand-muted space-y-1">
                    <p className="flex items-center gap-1.5 font-medium text-brand-deep">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" />
                      14 Adeola Odeku St, Victoria Island, Lagos
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-green" />
                      Open Daily 11:00 AM – 10:00 PM
                    </p>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
