import { NextResponse } from "next/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { formatAdminWhatsAppAlert, RESTAURANT_WHATSAPP_NUMBER } from "@/lib/whatsappAlert";
import { Order } from "@/types/order";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const orderId = searchParams.get("orderId");

    if (orderId) {
      const order = await fetchQuery(api.orders.getOrderByOrderId, { orderId });
      return NextResponse.json({ success: true, order });
    }

    const orders = await fetchQuery(api.orders.listRecentOrders, { limit });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    // If Convex is offline or unconfigured, return graceful fallback
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load orders from Convex", orders: [] },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = body.order as Order;

    if (!order || !order.id) {
      return NextResponse.json({ error: "Order details are required" }, { status: 400 });
    }

    // Attempt Convex Cloud Mutation
    let convexSaved = false;
    try {
      await fetchMutation(api.orders.createOrder, {
        orderId: order.id,
        reference: order.reference,
        status: order.status,
        type: order.type,
        items: order.items.map((i) => ({
          id: i.id,
          itemId: i.itemId,
          name: i.name,
          category: i.category,
          price: i.price,
          quantity: i.quantity,
          isPack: i.isPack,
          selectedSpice: i.selectedSpice,
          meta: i.meta,
        })),
        subtotal: order.subtotal,
        takeawayPacks: order.takeawayPacks,
        takeawayFee: order.takeawayFee,
        deliveryFee: order.deliveryFee,
        total: order.total,
        customer: {
          name: order.customer.name,
          phone: order.customer.phone,
          email: order.customer.email,
          timeSlot: order.customer.timeSlot,
          pickupTime: order.customer.pickupTime,
          address: order.customer.address,
          city: order.customer.city,
          landmark: order.customer.landmark,
          deliveryNotes: order.customer.deliveryNotes,
        },
        paymentMethod: order.paymentMethod,
        paymentReference: order.paymentReference,
        createdAt: order.createdAt,
      });
      convexSaved = true;
    } catch (err) {
      console.warn("Could not persist to Convex cloud:", err);
    }

    // Format WhatsApp alert URL
    const message = formatAdminWhatsAppAlert(order);
    const targetPhone = process.env.RESTAURANT_WHATSAPP_ALERT_PHONE || RESTAURANT_WHATSAPP_NUMBER;
    const cleanPhone = targetPhone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({
      success: true,
      orderId: order.id,
      convexSaved,
      whatsappUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process order" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "orderId and status required" }, { status: 400 });
    }

    try {
      await fetchMutation(api.orders.updateOrderStatus, { orderId, status });
      return NextResponse.json({ success: true, updatedInConvex: true });
    } catch {
      return NextResponse.json({ success: true, updatedInConvex: false });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
