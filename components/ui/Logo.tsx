import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon" | "stacked";
  theme?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "full",
  theme = "light",
  className = "",
  size = "md",
}: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-14 h-14",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const isDark = theme === "dark";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Vector Culinary Emblem */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-2xl bg-gradient-to-br from-[#127F3F] via-[#0F7B3C] to-[#084C24] p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center border border-emerald-400/30`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Steam curls */}
          <path
            d="M18 9 C16 12, 20 13, 18 16"
            stroke="#F5C518"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M24 7 C22 10, 26 12, 24 15"
            stroke="#F5C518"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M30 9 C28 12, 32 13, 30 16"
            stroke="#F5C518"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Pot Rim */}
          <ellipse cx="24" cy="20" rx="14" ry="3" fill="#F8F5F0" />
          <ellipse cx="24" cy="20" rx="12" ry="2" fill="#E5E0D8" />

          {/* Pot Body */}
          <path
            d="M10 20 C10 30, 15 37, 24 37 C33 37, 38 30, 38 20 Z"
            fill="#FFFFFF"
          />

          {/* Handles */}
          <path
            d="M9 23 C6 23, 6 28, 9 28"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M39 23 C42 23, 42 28, 39 28"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Naija "N" Monogram */}
          <path
            d="M20 25.5 V32 M20 26.5 L28 32 M28 25.5 V32"
            stroke="#0F7B3C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gold Sparkle / Base Accent */}
          <circle cx="24" cy="42" r="2" fill="#F5C518" />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading font-extrabold tracking-tight leading-none transition-colors ${titleSizes[size]} ${
                isDark
                  ? "text-white group-hover:text-brand-gold"
                  : "text-brand-deep group-hover:text-brand-green"
              }`}
            >
              Taste of Naija
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          </div>

          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mt-0.5 ${
              isDark ? "text-emerald-300/80" : "text-brand-muted"
            }`}
          >
            Real Nigerian Kitchen
          </span>
        </div>
      )}
    </div>
  );
}
