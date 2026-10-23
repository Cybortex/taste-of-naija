"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  UtensilsCrossed,
  Package,
  Truck,
  ArrowUpDown,
  Download,
} from "lucide-react";
import { Order, OrderStatus, TransactionRecord } from "@/types/order";
import { formatPrice } from "@/lib/utils";

// Seed data for immediate demonstration if no orders yet
const SAMPLE_ORDERS: Order[] = [
  {
    id: "TON-882194-402",
    reference: "pstk_live_89123891",
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    status: "preparing",
    type: "delivery",
    items: [
      {
        id: "item-1",
        itemId: "combo-pounded-yam-egusi",
        name: "Pounded Yam & Egusi Supreme",
        category: "combos",
        price: 1400,
        quantity: 2,
        isPack: true,
        selectedSpice: "Medium",
      },
      {
        id: "item-2",
        itemId: "protein-fried-chicken",
        name: "Fried Chicken",
        category: "proteins",
        price: 2500,
        quantity: 2,
        isPack: false,
      },
      {
        id: "item-3",
        itemId: "side-dodo",
        name: "Dodo (Fried Plantain)",
        category: "sides",
        price: 200,
        quantity: 1,
        isPack: false,
      },
      {
        id: "item-4",
        itemId: "drink-zobo",
        name: "Chilled Zobo Special",
        category: "drinks",
        price: 1000,
        quantity: 2,
        isPack: false,
      },
    ],
    subtotal: 11800,
    takeawayPacks: 2,
    takeawayFee: 500,
    deliveryFee: 3000,
    total: 15300,
    customer: {
      name: "Babatunde Adeleke",
      phone: "0803 234 5678",
      email: "babatunde@example.com",
      address: "Plot 12, Sanusi Fafunwa Street",
      city: "Victoria Island, Lagos",
      landmark: "Opposite Access Bank",
      deliveryNotes: "Call rider when gate is reached.",
    },
    paymentMethod: "paystack",
    paymentReference: "pstk_live_89123891",
    paymentStatus: "paid",
  },
  {
    id: "TON-771029-615",
    reference: "pstk_live_77192801",
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    status: "out_for_delivery",
    type: "delivery",
    items: [
      {
        id: "item-5",
        itemId: "rice-party-jollof",
        name: "Party Jollof Rice",
        category: "rice",
        price: 2500,
        quantity: 4,
        isPack: true,
        selectedSpice: "Medium",
      },
      {
        id: "item-6",
        itemId: "protein-beef-suya",
        name: "Beef Suya Skewers",
        category: "grills",
        price: 2500,
        quantity: 2,
        isPack: true,
      },
      {
        id: "item-7",
        itemId: "drink-chapman",
        name: "Signature Chapman Mocktail",
        category: "drinks",
        price: 2000,
        quantity: 4,
        isPack: false,
      },
    ],
    subtotal: 23000,
    takeawayPacks: 6,
    takeawayFee: 1500,
    deliveryFee: 3000,
    total: 27500,
    customer: {
      name: "Ngozi Eze",
      phone: "0814 992 1102",
      email: "ngozi.eze@corporate.ng",
      address: "18 Kofo Abayomi Street",
      city: "Victoria Island, Lagos",
      landmark: "Near Civic Centre",
    },
    paymentMethod: "paystack",
    paymentReference: "pstk_live_77192801",
    paymentStatus: "paid",
  },
  {
    id: "TON-660412-108",
    reference: "RES_DIN_660412",
    createdAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    status: "confirmed",
    type: "dine-in",
    items: [
      {
        id: "item-8",
        itemId: "combo-amala-ewedu-gbegiri",
        name: "Amala, Ewedu & Gbegiri",
        category: "combos",
        price: 1000,
        quantity: 2,
        isPack: true,
      },
      {
        id: "item-9",
        itemId: "protein-goat-meat",
        name: "Goat Meat",
        category: "proteins",
        price: 800,
        quantity: 4,
        isPack: false,
      },
      {
        id: "item-10",
        itemId: "drink-palm-wine",
        name: "Fresh Palm Wine",
        category: "drinks",
        price: 2500,
        quantity: 1,
        isPack: false,
      },
    ],
    subtotal: 7700,
    takeawayPacks: 2,
    takeawayFee: 0,
    deliveryFee: 0,
    total: 7700,
    customer: {
      name: "Dr. Kunle Alabi",
      phone: "0907 164 9725",
      email: "kunle.alabi@unilag.edu.ng",
      timeSlot: "19:30",
    },
    paymentMethod: "pay_at_restaurant",
    paymentStatus: "pending",
  },
  {
    id: "TON-559102-391",
    reference: "pstk_live_55910239",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: "completed",
    type: "takeaway",
    items: [
      {
        id: "item-11",
        itemId: "rice-ofada-ayamase",
        name: "Ofada Rice & Ayamase",
        category: "rice",
        price: 3000,
        quantity: 2,
        isPack: true,
      },
      {
        id: "item-12",
        itemId: "protein-fried-fish",
        name: "Fried Fish",
        category: "proteins",
        price: 3000,
        quantity: 2,
        isPack: false,
      },
    ],
    subtotal: 12000,
    takeawayPacks: 2,
    takeawayFee: 500,
    deliveryFee: 0,
    total: 12500,
    customer: {
      name: "Amina Yusuf",
      phone: "0802 881 4455",
      email: "amina@yusufgroup.ng",
      pickupTime: "In 30 minutes",
    },
    paymentMethod: "paystack",
    paymentReference: "pstk_live_55910239",
    paymentStatus: "paid",
  },
];

const SAMPLE_TRANSACTIONS: TransactionRecord[] = [
  {
    id: "TX-101",
    orderId: "TON-882194-402",
    reference: "pstk_live_89123891",
    amount: 15300,
    currency: "NGN",
    channel: "paystack_inline",
    status: "success",
    paidAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    customerName: "Babatunde Adeleke",
    customerPhone: "0803 234 5678",
    customerEmail: "babatunde@example.com",
    orderType: "delivery",
  },
  {
    id: "TX-102",
    orderId: "TON-771029-615",
    reference: "pstk_live_77192801",
    amount: 27500,
    currency: "NGN",
    channel: "paystack_inline",
    status: "success",
    paidAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    customerName: "Ngozi Eze",
    customerPhone: "0814 992 1102",
    customerEmail: "ngozi.eze@corporate.ng",
    orderType: "delivery",
  },
  {
    id: "TX-103",
    orderId: "TON-660412-108",
    reference: "RES_DIN_660412",
    amount: 7700,
    currency: "NGN",
    channel: "pay_on_arrival",
    status: "pending",
    paidAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    customerName: "Dr. Kunle Alabi",
    customerPhone: "0907 164 9725",
    customerEmail: "kunle.alabi@unilag.edu.ng",
    orderType: "dine-in",
  },
  {
    id: "TX-104",
    orderId: "TON-559102-391",
    reference: "pstk_live_55910239",
    amount: 12500,
    currency: "NGN",
    channel: "paystack_inline",
    status: "success",
    paidAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    customerName: "Amina Yusuf",
    customerPhone: "0802 881 4455",
    customerEmail: "amina@yusufgroup.ng",
    orderType: "takeaway",
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "transactions">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [notification, setNotification] = useState<string | null>(null);

  // Load orders and transactions from localStorage
  const loadData = () => {
    try {
      const storedOrders = localStorage.getItem("taste_of_naija_orders");
      const storedTx = localStorage.getItem("taste_of_naija_transactions");

      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Initialize with realistic seed data if empty
        localStorage.setItem("taste_of_naija_orders", JSON.stringify(SAMPLE_ORDERS));
        setOrders(SAMPLE_ORDERS);
      }

      if (storedTx) {
        setTransactions(JSON.parse(storedTx));
      } else {
        localStorage.setItem("taste_of_naija_transactions", JSON.stringify(SAMPLE_TRANSACTIONS));
        setTransactions(SAMPLE_TRANSACTIONS);
      }
    } catch {
      setOrders(SAMPLE_ORDERS);
      setTransactions(SAMPLE_TRANSACTIONS);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Status updater
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem("taste_of_naija_orders", JSON.stringify(updated));
      // Also update single record
      const single = updated.find((o) => o.id === orderId);
      if (single) {
        localStorage.setItem(`order_${orderId}`, JSON.stringify(single));
      }
    } catch {
      // storage error
    }
    showNotification(`Order ${orderId} updated to: ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  // Payment status updater
  const handleMarkAsPaid = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentStatus: "paid" as const,
          status: o.status === "awaiting_payment" ? ("confirmed" as const) : o.status,
        };
      }
      return o;
    });
    setOrders(updated);
    try {
      localStorage.setItem("taste_of_naija_orders", JSON.stringify(updated));
    } catch {
      // ignore
    }
    showNotification(`Payment confirmed for Order ${orderId}`);
  };

  // Financial Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const onlinePaymentsReceived = transactions
    .filter((tx) => tx.status === "success" && tx.channel !== "pay_on_arrival")
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);
  const activeOrdersCount = orders.filter((o) =>
    ["confirmed", "preparing", "ready", "out_for_delivery"].includes(o.status)
  ).length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (typeFilter !== "all" && o.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer.name.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.toLowerCase().includes(q);
      const matchRef = o.paymentReference?.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchRef) return false;
    }
    return true;
  });

  // Filtered Transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRef = tx.reference.toLowerCase().includes(q);
      const matchId = tx.orderId.toLowerCase().includes(q);
      const matchName = tx.customerName.toLowerCase().includes(q);
      const matchPhone = tx.customerPhone.toLowerCase().includes(q);
      if (!matchRef && !matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/70 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
              Kitchen & Operations Dashboard
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-brand-deep mt-2">
            Taste of Naija Admin
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Central hub for live order status dispatching, kitchen workflows, and Paystack online payment reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-border bg-white text-xs font-bold text-brand-deep hover:bg-stone-50 shadow-2xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Telemetry</span>
          </button>

          <Link
            href="/order"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover shadow-xs transition-colors"
          >
            <span>Open Customer Order Flow</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Notifications Toast */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-brand-green text-white text-xs font-bold shadow-md flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Key Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Online Payments Received */}
        <div className="bg-white p-5 rounded-3xl border border-brand-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Online Payments Received</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-brand-green">
            {formatPrice(onlinePaymentsReceived)}
          </div>
          <div className="text-[11px] text-brand-muted">
            Settled via Paystack Inline & Webhooks
          </div>
        </div>

        {/* KPI 2: Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-brand-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Order Value</span>
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-brand-deep">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-brand-muted">
            Across Dine-in, Takeaway & Delivery
          </div>
        </div>

        {/* KPI 3: Active Orders */}
        <div className="bg-white p-5 rounded-3xl border border-brand-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">In-Kitchen / Dispatch</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-orange flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-brand-orange">
            {activeOrdersCount}
          </div>
          <div className="text-[11px] text-brand-muted">
            Awaiting cooking, packaging or rider delivery
          </div>
        </div>

        {/* KPI 4: Total Orders Handled */}
        <div className="bg-white p-5 rounded-3xl border border-brand-border shadow-xs space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders Logged</span>
            <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-brand-deep">
            {orders.length}
          </div>
          <div className="text-[11px] text-brand-muted">
            Recorded in store history
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-border">
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`pb-3.5 px-4 font-heading font-extrabold text-sm sm:text-base border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "orders"
              ? "border-brand-green text-brand-green"
              : "border-transparent text-brand-muted hover:text-brand-deep"
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Live Order Management ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("transactions")}
          className={`pb-3.5 px-4 font-heading font-extrabold text-sm sm:text-base border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "transactions"
              ? "border-brand-green text-brand-green"
              : "border-transparent text-brand-muted hover:text-brand-deep"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Transaction History Log ({transactions.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-brand-border shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, customer name, phone, or reference..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-accent bg-stone-50/50"
          />
        </div>

        {activeTab === "orders" && (
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-brand-border text-xs font-semibold text-brand-deep bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">In The Pot (Preparing)</option>
              <option value="ready">Ready for Pickup</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-brand-border text-xs font-semibold text-brand-deep bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="all">All Fulfillment Types</option>
              <option value="dine-in">Dine-in</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Home Delivery</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: ORDER MANAGEMENT TABLE */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-brand-border text-brand-muted font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-5">Order ID & Date</th>
                  <th className="py-4 px-5">Customer Info</th>
                  <th className="py-4 px-5">Fulfillment</th>
                  <th className="py-4 px-5">Dishes & Packs</th>
                  <th className="py-4 px-5">Total & Payment</th>
                  <th className="py-4 px-5">Order Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-brand-muted">
                      No orders found matching your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const statusColors = {
                      awaiting_payment: "bg-stone-100 text-stone-700 border-stone-300",
                      confirmed: "bg-emerald-50 text-brand-green border-emerald-200",
                      preparing: "bg-amber-50 text-amber-800 border-amber-200",
                      ready: "bg-blue-50 text-blue-700 border-blue-200",
                      out_for_delivery: "bg-purple-50 text-purple-700 border-purple-200",
                      completed: "bg-emerald-700 text-white border-transparent",
                      cancelled: "bg-red-50 text-red-700 border-red-200",
                    };

                    return (
                      <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                        {/* Order ID & Time */}
                        <td className="py-4 px-5 align-top">
                          <div className="font-mono font-bold text-brand-deep text-xs">
                            {order.id}
                          </div>
                          <div className="text-[11px] text-brand-muted mt-1">
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="text-[10px] text-brand-muted">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-5 align-top">
                          <div className="font-heading font-bold text-brand-deep">
                            {order.customer.name}
                          </div>
                          <a
                            href={`tel:${order.customer.phone}`}
                            className="text-xs text-brand-green font-medium flex items-center gap-1 hover:underline mt-0.5"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.customer.phone}</span>
                          </a>
                          {order.customer.address && (
                            <div className="text-[11px] text-brand-muted mt-1 max-w-[200px] line-clamp-2">
                              {order.customer.address}, {order.customer.city}
                            </div>
                          )}
                        </td>

                        {/* Fulfillment */}
                        <td className="py-4 px-5 align-top">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              order.type === "dine-in"
                                ? "bg-amber-100 text-amber-900"
                                : order.type === "takeaway"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-emerald-100 text-emerald-900"
                            }`}
                          >
                            {order.type === "dine-in" && <UtensilsCrossed className="w-3 h-3" />}
                            {order.type === "takeaway" && <Package className="w-3 h-3" />}
                            {order.type === "delivery" && <Truck className="w-3 h-3" />}
                            <span>{order.type}</span>
                          </span>

                          <div className="text-[11px] text-brand-muted mt-1.5">
                            {order.type === "dine-in" && `Table Time: ${order.customer.timeSlot || "Scheduled"}`}
                            {order.type === "takeaway" && `Pickup: ${order.customer.pickupTime || "Standard"}`}
                            {order.type === "delivery" && `Dispatch target: 45m`}
                          </div>
                        </td>

                        {/* Items & Packs */}
                        <td className="py-4 px-5 align-top">
                          <div className="space-y-1 max-w-[240px]">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <div key={idx} className="text-xs text-brand-deep font-medium flex justify-between">
                                <span>{item.quantity}× {item.name}</span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="text-[10px] text-brand-muted font-bold">
                                + {order.items.length - 3} more items
                              </div>
                            )}
                          </div>
                          {order.takeawayPacks > 0 && (
                            <div className="mt-2 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold inline-block">
                              {order.takeawayPacks} takeaway packs
                            </div>
                          )}
                        </td>

                        {/* Amount & Payment */}
                        <td className="py-4 px-5 align-top">
                          <div className="font-heading font-black text-brand-deep text-base">
                            {formatPrice(order.total)}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                order.paymentStatus === "paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                            </span>

                            {order.paymentStatus !== "paid" && (
                              <button
                                type="button"
                                onClick={() => handleMarkAsPaid(order.id)}
                                className="text-[10px] font-bold text-brand-green hover:underline"
                              >
                                Mark Paid
                              </button>
                            )}
                          </div>
                          {order.paymentReference && (
                            <div className="text-[10px] font-mono text-brand-muted mt-1 truncate max-w-[120px]">
                              {order.paymentReference}
                            </div>
                          )}
                        </td>

                        {/* Live Status Selector Action */}
                        <td className="py-4 px-5 align-top">
                          <div className="space-y-2">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                              }
                              className={`w-full py-1.5 px-2.5 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-green ${
                                statusColors[order.status] || "bg-white border-brand-border text-brand-deep"
                              }`}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">In The Pot (Cooking)</option>
                              <option value="ready">Ready for Pickup</option>
                              <option value="out_for_delivery">With Dispatch Rider</option>
                              <option value="completed">Delivered / Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <div className="flex items-center gap-2">
                              <Link
                                href={`/order/confirmation/${order.id}`}
                                target="_blank"
                                className="text-[11px] text-brand-green font-semibold hover:underline inline-flex items-center gap-1"
                              >
                                <span>Receipt</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTION HISTORY LOG (PAYSTACK PAYMENTS) */}
      {activeTab === "transactions" && (
        <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden space-y-4">
          <div className="p-5 border-b border-brand-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-lg text-brand-deep">
                Paystack Payment Audit & Settlement Log
              </h3>
              <p className="text-xs text-brand-muted">
                Immutable log of customer checkout transactions, payment references, and channels.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Real-Time Online Payments Tracking</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-brand-border text-brand-muted font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-5">Transaction Ref</th>
                  <th className="py-4 px-5">Order ID</th>
                  <th className="py-4 px-5">Customer</th>
                  <th className="py-4 px-5">Channel</th>
                  <th className="py-4 px-5">Amount (₦)</th>
                  <th className="py-4 px-5">Date & Time</th>
                  <th className="py-4 px-5">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-brand-muted">
                      No transaction records found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-xs font-bold text-brand-deep">
                        {tx.reference}
                      </td>

                      <td className="py-3.5 px-5">
                        <Link
                          href={`/order/confirmation/${tx.orderId}`}
                          target="_blank"
                          className="font-mono text-xs text-brand-green font-bold hover:underline"
                        >
                          {tx.orderId}
                        </Link>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="font-heading font-bold text-brand-deep">
                          {tx.customerName}
                        </div>
                        <div className="text-[11px] text-brand-muted">{tx.customerPhone}</div>
                      </td>

                      <td className="py-3.5 px-5">
                        <span className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full uppercase">
                          {tx.channel.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 font-heading font-black text-brand-deep text-sm">
                        {formatPrice(tx.amount)}
                      </td>

                      <td className="py-3.5 px-5 text-brand-muted text-xs">
                        <div>
                          {new Date(tx.paidAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="text-[10px]">
                          {new Date(tx.paidAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            tx.status === "success"
                              ? "bg-emerald-100 text-emerald-800"
                              : tx.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              tx.status === "success"
                                ? "bg-emerald-600"
                                : tx.status === "pending"
                                ? "bg-amber-600"
                                : "bg-red-600"
                            }`}
                          />
                          <span className="capitalize">{tx.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
