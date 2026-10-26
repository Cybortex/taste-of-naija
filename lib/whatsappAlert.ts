import { Order } from "@/types/order";
import { formatPrice } from "@/lib/utils";

export const RESTAURANT_WHATSAPP_NUMBER = "2349071649725";

/**
 * Formats a rich, bold WhatsApp notification for the restaurant admin / kitchen team.
 */
export function formatAdminWhatsAppAlert(order: Order): string {
  const typeIcon =
    order.type === "delivery"
      ? "🛵 DOORSTEP DELIVERY"
      : order.type === "takeaway"
      ? "🥡 TAKEAWAY PICKUP"
      : "🍽️ DINE-IN TABLE RESERVATION";

  const paymentIcon =
    order.paymentStatus === "paid"
      ? "✅ PAID ONLINE (Paystack)"
      : order.paymentMethod === "pay_at_restaurant"
      ? "💵 PAY AT RESTAURANT"
      : "⏳ PENDING PAYMENT";

  const itemsList = order.items
    .map((item) => {
      const packTag = item.isPack ? " [Pack]" : "";
      const meta = item.meta
        ? ` (${[item.meta.swallowName, item.meta.soupName].filter(Boolean).join(" + ")})`
        : "";
      return `• ${item.quantity}x ${item.name}${packTag}${meta} - ${formatPrice(
        item.price * item.quantity
      )}`;
    })
    .join("\n");

  let fulfillmentDetails = "";
  if (order.type === "delivery") {
    fulfillmentDetails = `\n📍 *DELIVERY ADDRESS:*
Address: ${order.customer.address || "N/A"}, ${order.customer.city || "Lagos"}
${order.customer.landmark ? `Landmark: ${order.customer.landmark}\n` : ""}${
      order.customer.deliveryNotes ? `Notes: ${order.customer.deliveryNotes}\n` : ""
    }Delivery Fee: ${order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}`;
  } else if (order.type === "takeaway") {
    fulfillmentDetails = `\n🥡 *PICKUP TIME:* ${order.customer.pickupTime || "In 30 mins"}
Packaging: ${order.takeawayPacks || 1} packs (${formatPrice(order.takeawayFee || 0)})`;
  } else {
    fulfillmentDetails = `\n🍽️ *RESERVATION TIME:* ${order.customer.timeSlot || "Scheduled Slot"}`;
  }

  const message = `🔔 *NEW ORDER ALERT - TASTE OF NAIJA*
----------------------------------------
*Order ID:* #${order.id}
*Order Type:* ${typeIcon}
*Payment:* ${paymentIcon}
*Time:* ${new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}

👤 *CUSTOMER DETAILS:*
*Name:* ${order.customer.name}
*Phone:* ${order.customer.phone}
${order.customer.email ? `*Email:* ${order.customer.email}\n` : ""}${fulfillmentDetails}

🍲 *ITEMS ORDERED:*
${itemsList}

💰 *TOTAL AMOUNT: ${formatPrice(order.total)}*
----------------------------------------
*Taste of Naija Kitchen Operations*
*Hotline:* +234 907 164 9725`;

  return message;
}

/**
 * Returns a direct wa.me link to send the order details to the kitchen / manager WhatsApp.
 */
export function getAdminWhatsAppUrl(
  order: Order,
  phone: string = RESTAURANT_WHATSAPP_NUMBER
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const text = encodeURIComponent(formatAdminWhatsAppAlert(order));
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

/**
 * Formats a dispatch note for the dispatch rider with address and contact details.
 */
export function formatRiderWhatsAppDispatch(order: Order): string {
  const itemsSummary = order.items
    .map((item) => `• ${item.quantity}x ${item.name}`)
    .join("\n");

  return `🚴 *TASTE OF NAIJA - DISPATCH TICKET*
----------------------------------------
*Order ID:* #${order.id}
*Customer:* ${order.customer.name}
*Phone:* ${order.customer.phone}

📍 *DELIVERY DESTINATION:*
*Address:* ${order.customer.address || "Victoria Island / Lekki"}
${order.customer.landmark ? `*Landmark:* ${order.customer.landmark}\n` : ""}${
    order.customer.deliveryNotes ? `*Special Notes:* ${order.customer.deliveryNotes}\n` : ""
  }
📦 *PACKAGE SUMMARY:*
${itemsSummary}
*Total Packs:* ${order.takeawayPacks || 1} pack(s)

💵 *PAYMENT STATUS:*
${order.paymentStatus === "paid" ? "✅ ALREADY PAID ONLINE (DO NOT COLLECT CASH)" : "⚠️ COLLECT PAYMENT ON DELIVERY"}
*Order Total:* ${formatPrice(order.total)}

*Restaurant Pickup Location:*
Taste of Naija, 14 Admiralty Way, Lekki Phase 1, Lagos
Help line: 09071649725`;
}

/**
 * Returns a wa.me link for the dispatch rider.
 */
export function getRiderWhatsAppUrl(order: Order, riderPhone?: string): string {
  const phone = (riderPhone || "").replace(/\D/g, "");
  const text = encodeURIComponent(formatRiderWhatsAppDispatch(order));
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}

/**
 * Formats a friendly status update to send to the customer on WhatsApp.
 */
export function formatCustomerStatusUpdate(order: Order, statusText: string): string {
  return `👋 Hello ${order.customer.name}!

This is an update from *Taste of Naija* regarding your order *#${order.id}*:

Status: *${statusText}* 🍲🔥

If you need any assistance, feel free to reply to this message or call our direct line: *09071649725*.

Thank you for choosing Taste of Naija!`;
}

/**
 * Returns a wa.me link to message the customer.
 */
export function getCustomerWhatsAppUrl(order: Order, statusText: string): string {
  const phone = order.customer.phone.replace(/\D/g, "");
  const formattedPhone = phone.startsWith("0") ? `234${phone.slice(1)}` : phone;
  const text = encodeURIComponent(formatCustomerStatusUpdate(order, statusText));
  return `https://wa.me/${formattedPhone}?text=${text}`;
}
