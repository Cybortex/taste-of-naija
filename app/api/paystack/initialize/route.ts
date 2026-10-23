import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, orderId, metadata } = body;

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          error: "PAYSTACK_SECRET_KEY is not configured.",
          isMock: true,
          authorization_url: null,
          reference: `mock_ref_${Date.now()}`,
        },
        { status: 200 }
      );
    }

    // Call Paystack API
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email || "orders@tasteofnaija.ng",
        amount: Math.round(amount * 100), // amount in kobo
        reference: `TON-${orderId}-${Date.now().toString().slice(-4)}`,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/order/confirmation/${orderId}`,
        metadata: {
          orderId,
          ...metadata,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: data.message || "Failed to initialize Paystack payment" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
