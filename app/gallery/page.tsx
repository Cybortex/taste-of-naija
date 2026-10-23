"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Utensils, Flame, ArrowRight } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  category: "ambience" | "kitchen" | "dishes";
  caption: string;
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: "ambience-1",
    title: "Victoria Island Dining Room",
    category: "ambience",
    caption: "Warm natural woods, green flora, and comfortable family booth seating.",
    imageUrl: "/images/site/ambience-1.jpg",
  },
  {
    id: "dishes-1",
    title: "Fresh Pounded Yam & Egusi",
    category: "dishes",
    caption: "Silky elastic white yam served alongside iru-scented melon seed soup.",
    imageUrl: "/images/dishes/dish-pounded-yam-egusi-1.jpg",
  },
  {
    id: "kitchen-1",
    title: "Cast Iron Firewood Pots",
    category: "kitchen",
    caption: "Slow-simmering authentic soups over glowing wood embers and charcoal.",
    imageUrl: "/images/site/about-kitchen-1.jpg",
  },
  {
    id: "dishes-2",
    title: "Smoky Beef Suya Skewers",
    category: "dishes",
    caption: "Prime beef crusted in authentic roasted groundnut Yaji spice with onions.",
    imageUrl: "/images/dishes/dish-beef-suya-1.jpg",
  },
  {
    id: "dishes-3",
    title: "Ofada Rice & Spicy Ayamase",
    category: "dishes",
    caption: "Indigenous unpolished rice served on fresh banana leaves with bleached pepper stew.",
    imageUrl: "/images/dishes/dish-ofada-ayamase-1.jpg",
  },
  {
    id: "ambience-2",
    title: "Upscale Restaurant Interior",
    category: "ambience",
    caption: "Relaxing dining hall with palm green architecture and pendant chandeliers.",
    imageUrl: "/images/site/hero-1.jpg",
  },
  {
    id: "dishes-4",
    title: "Golden Party Jollof & Dodo",
    category: "dishes",
    caption: "Smoky firewood-cooked long-grain rice with caramelized ripe plantains.",
    imageUrl: "/images/dishes/dish-party-jollof-1.jpg",
  },
  {
    id: "dishes-5",
    title: "Delta Usi Starch & Banga Soup",
    category: "dishes",
    caption: "Golden native palm nut extract simmered with beletiete herbs and river fish.",
    imageUrl: "/images/dishes/dish-banga-1.jpg",
  },
  {
    id: "kitchen-2",
    title: "Traditional Buka Heritage Kitchen",
    category: "kitchen",
    caption: "Chefs preparing fresh batches of daily buka soups and swallows with love.",
    imageUrl: "/images/site/about-kitchen-1.jpg",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "ambience" | "kitchen" | "dishes">("all");

  const items =
    filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Atmosphere & Craft
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-deep">
          Kitchen & Ambience Gallery
        </h1>
        <p className="text-sm text-brand-muted">
          A glimpse inside our Victoria Island restaurant, bustling kitchen, and celebrated dishes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        {[
          { id: "all", label: "All Photos" },
          { id: "dishes", label: "Plated Dishes" },
          { id: "kitchen", label: "Kitchen & Firewood" },
          { id: "ambience", label: "Dining Room" },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filter === id
                ? "bg-brand-green text-white shadow-xs"
                : "bg-white text-brand-deep border border-brand-border hover:bg-stone-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-card border border-brand-border/70 overflow-hidden shadow-xs hover:shadow-card transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-4 flex flex-col justify-between text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-white drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <p className="text-xs text-brand-muted leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-brand-cream border border-brand-border text-center space-y-3">
        <h3 className="font-heading font-black text-2xl text-brand-deep">
          Ready to Experience It in Person?
        </h3>
        <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto">
          Visit us at 14 Adeola Odeku St, Victoria Island or pre-order your meal right now.
        </p>
        <div className="pt-2">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm px-6 py-3 rounded-btn shadow-sm transition-all"
          >
            <span>Start an Order</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
