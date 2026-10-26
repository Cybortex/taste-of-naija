import { NextResponse } from "next/server";
import { formatAdminWhatsAppAlert, RESTAURANT_WHATSAPP_NUMBER } from "@/lib/whatsappAlert";
import { Order } from "@/types/order";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = body.order as Order;

    if (!order || !order.id) {
      return NextResponse.json({ error: "Order object is required" }, { status: 400 });
    }

    const message = formatAdminWhatsAppAlert(order);
    const targetPhone = process.env.RESTAURANT_WHATSAPP_ALERT_PHONE || RESTAURANT_WHATSAPP_NUMBER;
    const cleanPhone = targetPhone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // 1. If Twilio WhatsApp credentials exist
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER; // e.g. whatsapp:+14155238886

    if (twilioSid && twilioAuth && twilioFrom) {
      try {
        const to = `whatsapp:+${cleanPhone}`;
        const formData = new URLSearchParams();
        formData.append("From", twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`);
        formData.append("To", to);
        formData.append("Body", message);

        const twilioRes = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          }
        );

        if (twilioRes.ok) {
          const resData = await twilioRes.json();
          return NextResponse.json({
            success: true,
            provider: "twilio",
            messageId: resData.sid,
            whatsappUrl,
          });
        }
      } catch (err) {
        console.warn("Twilio WhatsApp notification failed:", err);
      }
    }

    // 2. If Termii API exists (popular Nigerian SMS/WhatsApp gateway)
    const termiiKey = process.env.TERMII_API_KEY;
    if (termiiKey) {
      try {
        const termiiRes = await fetch("https://api.ng.termii.com/api/sms/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: cleanPhone,
            from: "N-ALERT",
            sms: `New Taste of Naija Order #${order.id} for ${order.customer.name} (Total: ₦${order.total.toLocaleString()}). Check admin dashboard!`,
            type: "plain",
            channel: "generic",
            api_key: termiiKey,
          }),
        });
        if (termiiRes.ok) {
          return NextResponse.json({
            success: true,
            provider: "termii",
            whatsappUrl,
          });
        }
      } catch (err) {
        console.warn("Termii notification failed:", err);
      }
    }

    // Return the generated WhatsApp deep link and text for direct web/app redirection
    return NextResponse.json({
      success: true,
      provider: "direct_link",
      whatsappUrl,
      message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process WhatsApp alert" },
      { status: 500 }
    );
  }
}
