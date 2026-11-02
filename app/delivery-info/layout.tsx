import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Information & Lagos Zones",
  description:
    "Find details on Taste of Naija delivery coverage across Lagos: Victoria Island, Ikoyi, Lekki Phase 1 & 2, and Mainland. Learn about our packaging standards and free delivery tiers.",
  openGraph: {
    title: "Lagos Delivery Zones & Packaging | Taste of Naija",
    description:
      "Reliable doorstep delivery and takeaway packaging for authentic Nigerian food across Lagos.",
    url: "/delivery-info",
  },
  alternates: {
    canonical: "/delivery-info",
  },
};

export default function DeliveryInfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
