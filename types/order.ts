export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderStatus =
  | "awaiting_payment"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export interface OrderItem {
  id: string; // unique item line id or itemId
  itemId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  isPack: boolean;
  selectedSpice?: "Mild" | "Medium" | "Hot";
  notes?: string;
  meta?: {
    swallowName?: string;
    soupName?: string;
  };
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  // For Dine-in:
  timeSlot?: string;
  guestsCount?: number;
  // For Takeaway:
  pickupTime?: string;
  // For Delivery:
  address?: string;
  city?: string;
  landmark?: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  reference: string;
  createdAt: string;
  status: OrderStatus;
  type: OrderType;
  items: OrderItem[];
  subtotal: number;
  takeawayPacks: number;
  takeawayFee: number;
  deliveryFee: number;
  total: number;
  customer: CustomerDetails;
  paymentMethod: "paystack" | "pay_at_restaurant";
  paymentReference?: string;
  paymentStatus?: "paid" | "pending" | "failed";
}

export interface TransactionRecord {
  id: string;
  orderId: string;
  reference: string;
  amount: number;
  currency: string;
  channel: "card" | "bank" | "ussd" | "qr" | "pay_on_arrival" | "paystack_inline";
  status: "success" | "pending" | "failed";
  paidAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderType: OrderType;
}
