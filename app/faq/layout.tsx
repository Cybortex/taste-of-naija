import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description:
    "Got questions about ordering from Taste of Naija? Read our FAQ on online payments with Paystack, packaging fees, delivery times, dietary preferences, and event catering.",
  openGraph: {
    title: "FAQ | Taste of Naija Restaurant Lagos",
    description:
      "Answers to common questions regarding ordering, delivery, payments, and dining at Taste of Naija.",
    url: "/faq",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
