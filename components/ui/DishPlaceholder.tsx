"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Utensils, Sparkles, Flame } from "lucide-react";

interface DishImageProps {
  slug: string;
  name: string;
  category?: string;
  isSpicy?: boolean;
  aspectRatio?: "4/3" | "1/1" | "16/9";
  className?: string;
  priority?: boolean;
}

export function DishImage({
  slug,
  name,
  category,
  isSpicy,
  aspectRatio = "4/3",
  className = "",
  priority = false,
}: DishImageProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const extensions = ["webp", "jpg", "png", "jpeg"];
  const imageSrc = `/images/dishes/dish-${slug}-1.${extensions[extIndex]}`;

  const handleImageError = () => {
    if (extIndex < extensions.length - 1) {
      setExtIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const aspectClass =
    aspectRatio === "1/1"
      ? "aspect-square"
      : aspectRatio === "16/9"
      ? "aspect-video"
      : "aspect-[4/3]";

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-t-card bg-gradient-to-br from-[#12582E] via-[#0F7B3C] to-[#0A4823] flex flex-col items-center justify-center p-4 select-none ${className}`}
    >
      {!imageError ? (
        <Image
          key={imageSrc}
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          priority={priority}
        />
      ) : null}

      {/* Elegant cultural placeholder when image is not present or error */}
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#0c4e28] via-[#0F7B3C] to-[#08351b]">
          {/* Subtle cultural geometric background pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #FFFFFF 1px, transparent 0)`,
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/90 mb-2 shadow-inner">
              {isSpicy ? (
                <Flame className="w-6 h-6 text-brand-orange animate-pulse" />
              ) : (
                <Utensils className="w-6 h-6 text-brand-gold" />
              )}
            </div>

            <span className="font-heading font-bold text-white text-base sm:text-lg leading-tight line-clamp-2 max-w-[220px]">
              {name}
            </span>

            {category && (
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-200 uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full border border-white/10">
                <Sparkles className="w-3 h-3 text-brand-gold" />
                {category}
              </span>
            )}

            <span className="text-[10px] text-emerald-100/60 mt-2 font-mono">
              Taste of Naija Kitchen
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
