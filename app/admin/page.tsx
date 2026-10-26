"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Bell,
  Volume2,
  VolumeX,
  MessageCircle,
  Send,
  Printer,
  X,
  Eye,
  Check,
} from "lucide-react";
import { Order, OrderStatus, TransactionRecord } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { audioAlert } from "@/lib/audioAlert";
import {
  getAdminWhatsAppUrl,
  getRiderWhatsAppUrl,
  getCustomerWhatsAppUrl,
} from "@/lib/whatsappAlert";

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
      address: "14 Adeola Odeku Street",
      city: "Victoria Island, Lagos",
      landmark: "Near Diamond Bank",
      deliveryNotes: "Call when rider reaches the gate.",
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
        itemId: "rice-jollof",
        name: "Party Jollof Rice",
        category: "rice",
        price: 3500,
        quantity: 4,
        isPack: true,
      },
      {
        id: "item-6",
        itemId: "grill-suya",
        name: "Beef Suya",
        category: "grills",
        price: 4500,
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
        itemId: "protein-assorted-meat",
        name: "Assorted Meat (Shaki, Beef)",
        category: "proteins",
        price: 2500,
        quantity: 2,
        isPack: false,
      },
      {
        id: "item-10",
        itemId: "drink-palm-wine",
        name: "Fresh Palm Wine (1L)",
        category: "drinks",
        price: 2500,
        quantity: 1,
        isPack: false,
      },
      {
        id: "item-11",
        itemId: "side-dodo",
        name: "Dodo (Fried Plantain)",
        category: "sides",
        price: 200,
        quantity: 1,
        isPack: false,
      },
    ],
    subtotal: 7200,
    takeawayPacks: 2,
    takeawayFee: 500,
    deliveryFee: 0,
    total: 7700,
    customer: {
      name: "Emeka Okafor",
      phone: "0703 555 1294",
      email: "emeka.okafor@example.ng",
      timeSlot: "13:30 - Table for 2",
    },
    paymentMethod: "pay_at_restaurant",
    paymentReference: "RES_DIN_660412",
    paymentStatus: "pending",
  },
  {
    id: "TON-552910-331",
    reference: "pstk_live_55910239",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: "completed",
    type: "takeaway",
    items: [
      {
        id: "item-12",
        itemId: "rice-fried",
        name: "Nigerian Fried Rice",
        category: "rice",
        price: 4000,
        quantity: 2,
        isPack: true,
      },
      {
        id: "item-13",
        itemId: "protein-fried-fish",
        name: "Fried Catfish Chunks",
        category: "proteins",
        price: 3500,
        quantity: 1,
        isPack: false,
      },
      {
        id: "item-14",
        itemId: "drink-kunu-aya",
        name: "Kunu Aya (Tiger Nut Milk)",
        category: "drinks",
        price: 1500,
        quantity: 1,
        isPack: false,
      },
      {
        id: "item-15",
        itemId: "side-dodo",
        name: "Dodo (Fried Plantain)",
        category: "sides",
        price: 200,
        quantity: 1,
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
    customerName: "Emeka Okafor",
    customerPhone: "0703 555 1294",
    customerEmail: "emeka.okafor@example.ng",
    orderType: "dine-in",
  },
  {
    id: "TX-104",
    orderId: "TON-552910-331",
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

  // Audio Alerts & Live Polling State
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [activeAlertOrder, setActiveAlertOrder] = useState<Order | null>(null);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<Date>(new Date());
  const knownOrderIds = useRef<Set<string>>(new Set());

  // Load initial orders and transactions from localStorage
  const loadInitialData = () => {
    try {
      const storedOrders = localStorage.getItem("taste_of_naija_orders");
      const storedTx = localStorage.getItem("taste_of_naija_transactions");

      let currentOrders: Order[] = SAMPLE_ORDERS;
      if (storedOrders) {
        currentOrders = JSON.parse(storedOrders);
      } else {
        localStorage.setItem("taste_of_naija_orders", JSON.stringify(SAMPLE_ORDERS));
      }
      setOrders(currentOrders);
      currentOrders.forEach((o) => knownOrderIds.current.add(o.id));

      if (storedTx) {
        setTransactions(JSON.parse(storedTx));
      } else {
        localStorage.setItem("taste_of_naija_transactions", JSON.stringify(SAMPLE_TRANSACTIONS));
        setTransactions(SAMPLE_TRANSACTIONS);
      }
    } catch {
      setOrders(SAMPLE_ORDERS);
      setTransactions(SAMPLE_TRANSACTIONS);
      SAMPLE_ORDERS.forEach((o) => knownOrderIds.current.add(o.id));
    }
  };

  // Poll live orders from cloud /api/orders
  const pollCloudOrders = async (isInitial = false) => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/orders?limit=50");
      const data = await res.json();

      if (data?.orders && Array.isArray(data.orders) && data.orders.length > 0) {
        const cloudOrders: Order[] = data.orders.map((o: any) => ({
          id: o.orderId,
          reference: o.reference,
          createdAt: o.createdAt,
          status: o.status,
          type: o.type,
          items: o.items,
          subtotal: o.subtotal,
          takeawayPacks: o.takeawayPacks,
          takeawayFee: o.takeawayFee,
          deliveryFee: o.deliveryFee,
          total: o.total,
          customer: o.customer,
          paymentMethod: o.paymentMethod,
          paymentReference: o.paymentReference,
          paymentStatus: o.paymentStatus || (o.status === "awaiting_payment" ? "pending" : "paid"),
        }));

        if (!isInitial) {
          const freshOrders = cloudOrders.filter((o) => !knownOrderIds.current.has(o.id));
          if (freshOrders.length > 0) {
            // Trigger Audible Chime Bell & High-Attention Visual Alert
            audioAlert.playNewOrderChime();
            setActiveAlertOrder(freshOrders[0]);
            showNotification(
              `🔔 NEW ORDER RECEIVED! #${freshOrders[0].id} from ${freshOrders[0].customer.name} (${formatPrice(
                freshOrders[0].total
              )})`
            );
          }
        }

        // Add to known IDs
        cloudOrders.forEach((o) => knownOrderIds.current.add(o.id));

        // Merge with existing local orders
        setOrders((prev) => {
          const map = new Map<string, Order>();
          prev.forEach((o) => map.set(o.id, o));
          cloudOrders.forEach((o) => map.set(o.id, o));
          const merged = Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          try {
            localStorage.setItem("taste_of_naija_orders", JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }
    } catch {
      // offline fallback
    } finally {
      setIsSyncing(false);
      setLastSyncedTime(new Date());
    }
  };

  useEffect(() => {
    loadInitialData();
    pollCloudOrders(true);

    // Setup periodic 6-second live polling
    const interval = setInterval(() => {
      pollCloudOrders(false);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    audioAlert.setSoundEnabled(next);
    if (next) {
      audioAlert.playNewOrderChime();
      showNotification("🔊 Kitchen Audio Alerts Enabled! Bell sound active.");
    } else {
      showNotification("🔇 Kitchen Audio Alerts Muted.");
    }
  };

  const handleTestChime = () => {
    audioAlert.playNewOrderChime();
    showNotification("🔔 Test bell chime played!");
  };

  // Simulate an incoming live customer order for testing
  const handleSimulateTestOrder = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const testOrder: Order = {
      id: `TON-${Date.now().toString().slice(-6)}-${randomNum}`,
      reference: `pstk_test_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      type: "delivery",
      items: [
        {
          id: `item-sim-1-${randomNum}`,
          itemId: "rice-jollof",
          name: "Party Jollof Rice (Firewood Flavoured)",
          category: "rice",
          price: 3500,
          quantity: 2,
          isPack: true,
        },
        {
          id: `item-sim-2-${randomNum}`,
          itemId: "side-dodo",
          name: "Dodo (Fried Plantain)",
          category: "sides",
          price: 200,
          quantity: 2,
          isPack: false,
        },
        {
          id: `item-sim-3-${randomNum}`,
          itemId: "drink-zobo",
          name: "Chilled Zobo Special",
          category: "drinks",
          price: 1000,
          quantity: 2,
          isPack: false,
        },
      ],
      subtotal: 9400,
      takeawayPacks: 2,
      takeawayFee: 500,
      deliveryFee: 3000,
      total: 12900,
      customer: {
        name: "Olumide Bakare",
        phone: "0803 112 4499",
        email: "olumide.bakare@lagos.ng",
        address: "Plot 12, Admiralty Way, Lekki Phase 1",
        city: "Lagos",
        landmark: "Beside Domino's Pizza",
        deliveryNotes: "Call when rider reaches the gate.",
      },
      paymentMethod: "paystack",
      paymentReference: `pstk_ref_${Date.now()}`,
      paymentStatus: "paid",
    };

    // Play chime bell
    audioAlert.playNewOrderChime();
    setActiveAlertOrder(testOrder);
    knownOrderIds.current.add(testOrder.id);

    setOrders((prev) => {
      const next = [testOrder, ...prev];
      try {
        localStorage.setItem("taste_of_naija_orders", JSON.stringify(next));
      } catch {}
      return next;
    });

    showNotification(`🔔 Test Order #${testOrder.id} simulated successfully!`);
  };

  // Status updater with Cloud API sync
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);

    try {
      localStorage.setItem("taste_of_naija_orders", JSON.stringify(updated));
      const single = updated.find((o) => o.id === orderId);
      if (single) {
        localStorage.setItem(`order_${orderId}`, JSON.stringify(single));
      }
    } catch {}

    // Cloud patch
    try {
      fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      }).catch(() => {});
    } catch {}

    showNotification(`Order ${orderId} status set to: ${newStatus.replace("_", " ").toUpperCase()}`);
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
    } catch {}
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
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/70 pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
              Live Kitchen & Operations Dashboard
            </span>
            <span className="text-[11px] font-semibold text-brand-muted flex items-center gap-1 bg-stone-100 px-2.5 py-0.5 rounded-full">
              <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
              <span>Live sync {isSyncing ? "updating..." : `(${lastSyncedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })})`}</span>
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-brand-deep mt-2">
            Taste of Naija Admin
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Real-time order intake, audible kitchen alerts, WhatsApp dispatch, and Paystack reconciliation.
          </p>
        </div>

        {/* Top Control Bar Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Sound Alert Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold border transition-all ${
              isSoundEnabled
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                : "bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200"
            }`}
            title={isSoundEnabled ? "Audio Bell Alerts ON" : "Audio Bell Alerts MUTED"}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-brand-green" /> : <VolumeX className="w-4 h-4" />}
            <span>{isSoundEnabled ? "Sound: ON" : "Sound: MUTED"}</span>
          </button>

          {/* Test Chime */}
          <button
            type="button"
            onClick={handleTestChime}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-brand-border bg-white text-xs font-bold text-brand-deep hover:bg-stone-50 transition-colors shadow-2xs"
            title="Test Restaurant Kitchen Bell Sound"
          >
            <Bell className="w-3.5 h-3.5 text-brand-orange" />
            <span>Test Bell</span>
          </button>

          {/* Simulate Test Order */}
          <button
            type="button"
            onClick={handleSimulateTestOrder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>+ Simulate Order</span>
          </button>

          {/* Manual Refresh */}
          <button
            type="button"
            onClick={() => pollCloudOrders(false)}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-brand-border bg-white text-xs font-bold text-brand-deep hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* NEW ORDER ARRIVAL POPUP BANNER */}
      {activeAlertOrder && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-brand-green text-white shadow-xl border border-emerald-400 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-bounce">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white">
              <Bell className="w-6 h-6 animate-swing" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white text-brand-green">
                  New Order Received!
                </span>
                <span className="text-xs font-mono font-bold text-white/90">
                  #{activeAlertOrder.id}
                </span>
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white mt-0.5">
                {activeAlertOrder.customer.name} • {formatPrice(activeAlertOrder.total)}
              </h3>
              <p className="text-xs text-white/80">
                {activeAlertOrder.type.toUpperCase()} • {activeAlertOrder.items.length} items • Phone: {activeAlertOrder.customer.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={getAdminWhatsAppUrl(activeAlertOrder)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Kitchen</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSelectedOrderForModal(activeAlertOrder);
                setActiveAlertOrder(null);
              }}
              className="inline-flex items-center gap-1.5 bg-white text-brand-deep hover:bg-stone-100 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Ticket</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAlertOrder(null)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              title="Acknowledge & Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Notifications Toast */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-brand-deep text-white text-xs font-bold shadow-md flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
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
                  <th className="py-4 px-5">Status & WhatsApp Actions</th>
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
                          <button
                            type="button"
                            onClick={() => setSelectedOrderForModal(order)}
                            className="font-mono font-bold text-brand-green hover:underline text-xs text-left"
                          >
                            {order.id}
                          </button>
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

                        {/* Customer Info */}
                        <td className="py-4 px-5 align-top">
                          <div className="font-heading font-bold text-brand-deep">
                            {order.customer.name}
                          </div>
                          <div className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-brand-green" />
                            <span>{order.customer.phone}</span>
                          </div>
                          {order.customer.address && (
                            <div className="text-[11px] text-stone-600 flex items-start gap-1 mt-1 max-w-[200px] line-clamp-2">
                              <MapPin className="w-3 h-3 text-brand-orange shrink-0 mt-0.5" />
                              <span>{order.customer.address}</span>
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
                            {order.type === "dine-in" && `Table: ${order.customer.timeSlot || "Scheduled"}`}
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

                        {/* Live Status Selector & WhatsApp Actions */}
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

                            {/* WhatsApp Actions Row */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {/* Send to Kitchen WhatsApp */}
                              <a
                                href={getAdminWhatsAppUrl(order)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                                title="Send ticket to Kitchen/Manager WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>Kitchen</span>
                              </a>

                              {/* Rider Dispatch WhatsApp (for delivery) */}
                              {order.type === "delivery" && (
                                <a
                                  href={getRiderWhatsAppUrl(order)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                                  title="Send pickup & delivery info to Rider"
                                >
                                  <Truck className="w-3 h-3" />
                                  <span>Rider</span>
                                </a>
                              )}

                              {/* Customer Status Update WhatsApp */}
                              <a
                                href={getCustomerWhatsAppUrl(order, order.status.replace("_", " ").toUpperCase())}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                                title="Send status update to Customer's WhatsApp"
                              >
                                <Send className="w-3 h-3" />
                                <span>Customer</span>
                              </a>

                              {/* View Details / Receipt */}
                              <button
                                type="button"
                                onClick={() => setSelectedOrderForModal(order)}
                                className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                                title="View Complete Ticket"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
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
                        <button
                          type="button"
                          onClick={() => {
                            const o = orders.find((x) => x.id === tx.orderId);
                            if (o) setSelectedOrderForModal(o);
                          }}
                          className="font-mono text-xs text-brand-green font-bold hover:underline"
                        >
                          {tx.orderId}
                        </button>
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

      {/* ORDER DETAILS & PRINT SLIP MODAL */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-brand-border pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full">
                  #{selectedOrderForModal.id}
                </span>
                <h2 className="font-heading font-black text-2xl text-brand-deep mt-2">
                  Kitchen Ticket & Dispatch Slip
                </h2>
                <p className="text-xs text-brand-muted mt-0.5">
                  Placed {new Date(selectedOrderForModal.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrderForModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-brand-deep flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Delivery Card */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-brand-muted block font-semibold uppercase tracking-wider text-[10px]">
                  Customer
                </span>
                <p className="font-bold text-brand-deep text-sm mt-0.5">
                  {selectedOrderForModal.customer.name}
                </p>
                <a
                  href={`tel:${selectedOrderForModal.customer.phone}`}
                  className="text-brand-green font-bold flex items-center gap-1 mt-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{selectedOrderForModal.customer.phone}</span>
                </a>
              </div>

              <div>
                <span className="text-brand-muted block font-semibold uppercase tracking-wider text-[10px]">
                  Fulfillment ({selectedOrderForModal.type.toUpperCase()})
                </span>
                {selectedOrderForModal.type === "delivery" ? (
                  <div className="mt-0.5 text-stone-700">
                    <p className="font-medium">{selectedOrderForModal.customer.address}</p>
                    {selectedOrderForModal.customer.landmark && (
                      <p className="text-brand-muted text-[11px]">
                        Landmark: {selectedOrderForModal.customer.landmark}
                      </p>
                    )}
                    {selectedOrderForModal.customer.deliveryNotes && (
                      <p className="text-amber-800 text-[11px] font-semibold mt-0.5">
                        Note: {selectedOrderForModal.customer.deliveryNotes}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="font-bold text-stone-800 mt-0.5">
                    {selectedOrderForModal.customer.pickupTime || selectedOrderForModal.customer.timeSlot || "Standard Schedule"}
                  </p>
                )}
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <h4 className="font-heading font-black text-sm text-brand-deep border-b border-brand-border pb-2">
                Ordered Dishes & Drinks
              </h4>
              <div className="divide-y divide-brand-border/60">
                {selectedOrderForModal.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green font-black text-xs flex items-center justify-center">
                        {item.quantity}×
                      </span>
                      <div>
                        <span className="font-bold text-brand-deep">{item.name}</span>
                        {item.isPack && (
                          <span className="text-[10px] ml-1.5 font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            Pack
                          </span>
                        )}
                        {item.meta && (
                          <p className="text-[11px] text-brand-muted">
                            {[item.meta.swallowName, item.meta.soupName].filter(Boolean).join(" + ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-heading font-black text-brand-deep">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-border space-y-1.5 text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Food Subtotal</span>
                <span className="font-semibold text-brand-deep">{formatPrice(selectedOrderForModal.subtotal)}</span>
              </div>
              {selectedOrderForModal.takeawayFee > 0 && (
                <div className="flex justify-between text-brand-muted">
                  <span>Takeaway Packaging ({selectedOrderForModal.takeawayPacks} packs)</span>
                  <span className="font-semibold text-brand-deep">{formatPrice(selectedOrderForModal.takeawayFee)}</span>
                </div>
              )}
              {selectedOrderForModal.deliveryFee > 0 && (
                <div className="flex justify-between text-brand-muted">
                  <span>Delivery Dispatch</span>
                  <span className="font-semibold text-brand-deep">{formatPrice(selectedOrderForModal.deliveryFee)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-brand-border flex justify-between items-baseline font-heading font-black text-base text-brand-deep">
                <span>Total Amount</span>
                <span className="text-brand-green text-lg">{formatPrice(selectedOrderForModal.total)}</span>
              </div>
            </div>

            {/* Actions: WhatsApp Dispatch & Print */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <a
                href={getAdminWhatsAppUrl(selectedOrderForModal)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3 px-4 rounded-btn text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp to Kitchen</span>
              </a>

              {selectedOrderForModal.type === "delivery" && (
                <a
                  href={getRiderWhatsAppUrl(selectedOrderForModal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 px-4 rounded-btn text-xs shadow-md transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Send WhatsApp to Rider</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-brand-deep font-bold py-3 px-4 rounded-btn text-xs transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
