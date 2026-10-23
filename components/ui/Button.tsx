"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "orange" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const baseStyles =
      "relative inline-flex items-center justify-center font-body font-semibold transition-colors duration-150 rounded-btn focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs min-h-[36px]",
      md: "h-12 px-5 text-sm sm:text-base min-h-[44px]",
      lg: "h-14 px-7 text-base sm:text-lg min-h-[48px]",
    };

    const variantStyles = {
      primary:
        "bg-brand-green text-white hover:bg-brand-green-hover active:bg-[#094723] shadow-sm",
      secondary:
        "bg-white border-2 border-brand-green text-brand-green hover:bg-brand-green/5 active:bg-brand-green/10",
      orange:
        "bg-brand-orange text-white hover:bg-brand-orange-hover active:bg-[#c24a08] shadow-sm",
      ghost:
        "bg-transparent text-brand-green hover:bg-brand-green/10 active:bg-brand-green/15",
      danger:
        "bg-brand-chili text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={
          shouldReduceMotion || disabled || isLoading ? undefined : { scale: 0.96 }
        }
        transition={{ duration: 0.1 }}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && "w-full",
          className
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Please wait...</span>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
