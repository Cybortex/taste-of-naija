"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { OrderItem, OrderType } from "@/types/order";
import { MenuItem } from "@/types/menu";
import { calculateFees, FeeCalculation } from "@/lib/utils";

interface CartContextType {
  items: OrderItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  addItem: (item: MenuItem, quantity?: number, spiceLevel?: "Mild" | "Medium" | "Hot", meta?: OrderItem["meta"]) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateSpice: (id: string, spice: "Mild" | "Medium" | "Hot") => void;
  itemCount: number;
  fees: FeeCalculation;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "taste_of_naija_cart_v1";
const ORDER_TYPE_KEY = "taste_of_naija_order_type_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderTypeState] = useState<OrderType>("takeaway");
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedType = localStorage.getItem(ORDER_TYPE_KEY) as OrderType | null;
      if (storedType && ["dine-in", "takeaway", "delivery"].includes(storedType)) {
        setOrderTypeState(storedType);
      }
    } catch {
      // Ignore JSON parse errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        localStorage.setItem(ORDER_TYPE_KEY, orderType);
      } catch {
        // Storage full or unavailable
      }
    }
  }, [items, orderType, isLoaded]);

  const setOrderType = (type: OrderType) => {
    setOrderTypeState(type);
  };

  const addItem = (
    item: MenuItem,
    quantity: number = 1,
    spiceLevel?: "Mild" | "Medium" | "Hot",
    meta?: OrderItem["meta"]
  ) => {
    setItems((prev) => {
      // Check if item with same ID exists
      const existingIndex = prev.findIndex((i) => i.itemId === item.id);

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }

      const newItem: OrderItem = {
        id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        itemId: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity,
        isPack: item.isPack,
        selectedSpice: undefined,
        meta,
      };

      return [...prev, newItem];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is OrderItem => item !== null);
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSpice = (id: string, spice: "Mild" | "Medium" | "Hot") => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selectedSpice: spice } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const fees = calculateFees(items, orderType);

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        setOrderType,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        updateSpice,
        itemCount,
        fees,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
