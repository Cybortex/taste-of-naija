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
      {/* Pure Inner Culinary Pot Emblem */}
      <div
        className={`${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Steam curls in gold */}
          <path
            d="M18 7 C16 10, 20 12, 18 15"
            stroke="#F59E0B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 5 C22 8, 26 11, 24 14"
            stroke="#F5C518"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M30 7 C28 10, 32 12, 30 15"
            stroke="#F59E0B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Pot Rim */}
          <ellipse cx="24" cy="18" rx="16" ry="4" fill="#0F7B3C" />
          <ellipse cx="24" cy="18" rx="14" ry="2.8" fill="#148342" />

          {/* Pot Main Body in Rich Palm Green */}
          <path
            d="M9 18 C9 31, 14 39, 24 39 C34 39, 39 31, 39 18 Z"
            fill="url(#innerPotGrad)"
          />

          {/* Golden Handles */}
          <path
            d="M8 21 C4 21, 4 27, 8 27"
            stroke="#F5C518"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M40 21 C44 21, 44 27, 40 27"
            stroke="#F5C518"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Inner Naija 'N' Monogram */}
          <path
            d="M19 24.5 V33 M19 25.5 L29 33 M29 24.5 V33"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Base Flame Accent */}
          <circle cx="24" cy="44" r="2" fill="#F26A1B" />

          <defs>
            <linearGradient id="innerPotGrad" x1="9" y1="18" x2="39" y2="39" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F7B3C" />
              <stop offset="0.5" stopColor="#0A5B2C" />
              <stop offset="1" stopColor="#074420" />
            </linearGradient>
          </defs>
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
