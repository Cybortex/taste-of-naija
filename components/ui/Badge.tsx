import React from "react";
import { Star, Flame, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant: "popular" | "spicy" | "pack" | "success" | "warning";
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  variant,
  children,
  className,
  size = "sm",
}: BadgeProps) {
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2.5 py-0.5 gap-1"
      : "text-xs px-3 py-1 gap-1.5";

  switch (variant) {
    case "popular":
      return (
        <span
          className={cn(
            "inline-flex items-center font-bold bg-[#F5C518] text-[#1A2E1A] rounded-full shadow-sm select-none",
            sizeClasses,
            className
          )}
        >
          <Star className="w-3 h-3 fill-current" />
          {children || "Popular"}
        </span>
      );

    case "spicy":
      return (
        <span
          className={cn(
            "inline-flex items-center font-semibold bg-[#D7263D] text-white rounded-full shadow-sm select-none",
            sizeClasses,
            className
          )}
        >
          <Flame className="w-3 h-3 fill-current" />
          {children || "Spicy"}
        </span>
      );

    case "pack":
      return (
        <span
          className={cn(
            "inline-flex items-center font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full select-none",
            sizeClasses,
            className
          )}
        >
          <Package className="w-3 h-3 text-emerald-600" />
          {children || "1 Pack"}
        </span>
      );

    case "success":
      return (
        <span
          className={cn(
            "inline-flex items-center font-semibold bg-[#16A34A] text-white rounded-full shadow-sm select-none",
            sizeClasses,
            className
          )}
        >
          <Check className="w-3 h-3" />
          {children || "Unlocked"}
        </span>
      );

    case "warning":
      return (
        <span
          className={cn(
            "inline-flex items-center font-semibold bg-[#D97706] text-white rounded-full shadow-sm select-none",
            sizeClasses,
            className
          )}
        >
          {children}
        </span>
      );
  }
}
