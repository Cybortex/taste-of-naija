"use client";

import React, { useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  const convex = useMemo(() => {
    if (!convexUrl || !convexUrl.startsWith("http")) {
      return null;
    }
    try {
      return new ConvexReactClient(convexUrl);
    } catch {
      return null;
    }
  }, [convexUrl]);

  if (!convex) {
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
