import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Location in Lekki Phase 1",
  description:
    "Visit Taste of Naija at 14 Admiralty Way, Lekki Phase 1, Lagos. Call our direct helpline at 09071649725 or WhatsApp us for table reservations, custom catering, and delivery inquiries.",
  openGraph: {
    title: "Contact Taste of Naija | Lekki Phase 1, Lagos",
    description:
      "Get in touch with Taste of Naija. Dine-in reservations, corporate catering, and direct order helpline in Lagos.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
