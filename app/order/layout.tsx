import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3-Step Custom Meal Builder | Build Your Plate",
  description:
    "Build your custom Nigerian meal plate in 3 simple steps: select your main swallow or rice, native soup, meats & seafood, and chilled drinks. Instant checkout with Paystack.",
  openGraph: {
    title: "Build Your Nigerian Meal Plate | Taste of Naija",
    description:
      "Interactive 3-step meal builder for authentic Nigerian food. Dine-in, Takeaway & Fast Lagos Delivery.",
    url: "/order",
  },
  alternates: {
    canonical: "/order",
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
