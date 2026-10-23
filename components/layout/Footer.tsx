import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#09381B] text-emerald-100/90 pt-14 pb-10 border-t-4 border-brand-green">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-emerald-800/80">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white font-heading font-black text-xl shadow-md">
                N
              </div>
              <span className="font-heading font-extrabold text-white text-xl tracking-tight">
                Taste of Naija
              </span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              Real Nigerian food, made with pride. From our pot to your table — experience the authentic buka flavours of Lagos, Ibadan, and Calabar with modern ordering convenience.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-gold font-medium bg-black/20 p-2.5 rounded-lg border border-white/5">
              <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Certified Fresh Ingredients • 100% Halal Meats</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base tracking-wide uppercase text-xs">
              Explore Menu
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/menu?category=combos" className="hover:text-white transition-colors">
                  Popular Combos
                </Link>
              </li>
              <li>
                <Link href="/menu?category=rice" className="hover:text-white transition-colors">
                  Party Jollof & Rice
                </Link>
              </li>
              <li>
                <Link href="/menu?category=soups" className="hover:text-white transition-colors">
                  Traditional Soups (Egusi, Oha, Banga)
                </Link>
              </li>
              <li>
                <Link href="/menu?category=grills" className="hover:text-white transition-colors">
                  Pepper Soups & Suya Grills
                </Link>
              </li>
              <li>
                <Link href="/menu?category=swallows" className="hover:text-white transition-colors">
                  Pounded Yam, Amala & Swallows
                </Link>
              </li>
              <li>
                <Link href="/menu?category=sides" className="hover:text-white transition-colors">
                  Dodo, Moi Moi & Street Food
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base tracking-wide uppercase text-xs">
              Ordering & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/order" className="hover:text-white transition-colors text-brand-gold font-semibold">
                  3-Step Custom Order
                </Link>
              </li>
              <li>
                <Link href="/delivery-info" className="hover:text-white transition-colors">
                  Delivery Zones & Fees
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Kitchen & Food Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Table Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base tracking-wide uppercase text-xs">
              Visit or Call Us
            </h4>
            <div className="space-y-2.5 text-sm text-emerald-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+234 812 345 6789 / +234 809 876 5432</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>orders@tasteofnaija.ng</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Open Everyday</p>
                  <p className="text-xs text-emerald-300/80">11:00 AM – 10:00 PM (Last order 9:30 PM)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80 border-t border-emerald-900/60">
          <p>© {new Date().getFullYear()} Taste of Naija Restaurant. All rights reserved.</p>
          
          {/* Cybortex Technologies Badge */}
          <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/80 px-3.5 py-1.5 rounded-full text-white font-medium text-xs shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span>Built by <strong className="text-white font-bold hover:text-brand-gold transition-colors">Cybortex Technologies</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              Cooked with <Heart className="w-3.5 h-3.5 text-brand-orange fill-current" /> in Lagos
            </span>
            <span>•</span>
            <span>Paystack Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
