import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrderItem, OrderType } from "@/types/order";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export interface FeeCalculation {
  subtotal: number;
  totalPacks: number;
  takeawayFee: number;
  deliveryFee: number;
  total: number;
  isDeliveryAllowed: boolean;
  minDeliveryMet: boolean;
  freeDeliveryUnlocked: boolean;
  amountNeededForFreeDelivery: number;
}

export function calculateFees(
  items: OrderItem[],
  orderType: OrderType
): FeeCalculation {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // A pack = every main dish, plate, or combo
  const totalPacks = items
    .filter((item) => item.isPack)
    .reduce((sum, item) => sum + item.quantity, 0);

  let takeawayFee = 0;
  let deliveryFee = 0;

  if (orderType === "takeaway") {
    takeawayFee = totalPacks * 250;
  }

  const minDeliveryMet = subtotal >= 10000;
  const freeDeliveryUnlocked = subtotal >= 35000;
  const amountNeededForFreeDelivery = Math.max(0, 35000 - subtotal);

  if (orderType === "delivery") {
    deliveryFee = freeDeliveryUnlocked ? 0 : 3000;
  }

  const isDeliveryAllowed = orderType !== "delivery" || minDeliveryMet;

  const total = subtotal + takeawayFee + (orderType === "delivery" ? deliveryFee : 0);

  return {
    subtotal,
    totalPacks,
    takeawayFee,
    deliveryFee,
    total,
    isDeliveryAllowed,
    minDeliveryMet,
    freeDeliveryUnlocked,
    amountNeededForFreeDelivery,
  };
}
