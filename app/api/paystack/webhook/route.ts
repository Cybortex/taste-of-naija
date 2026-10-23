import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (secret && signature) {
      const hash = crypto
        .createHmac("sha512", secret)
        .update(rawBody)
        .digest("hex");

      if (hash !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const { reference, metadata } = event.data;
      const orderId = metadata?.orderId;

      console.log(`[Paystack Webhook] Charge successful for order: ${orderId}, reference: ${reference}`);
      // When Convex client is configured on backend, can call mutation ctx.runMutation(api.orders.updateOrderStatus)
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
