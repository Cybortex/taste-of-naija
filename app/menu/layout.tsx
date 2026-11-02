import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Food Menu | Egusi, Jollof, Suya & Soups",
  description:
    "Explore the complete Taste of Naija menu. Authentic Nigerian soups (Egusi, Ogbono, Banga, Oha), silky swallows, firewood Party Jollof, Suya grills, and chilled drinks in Lagos.",
  openGraph: {
    title: "Taste of Naija Menu | Authentic Nigerian Cuisine in Lagos",
    description:
      "Explore our complete menu of traditional Nigerian soups, swallows, grills, and drinks. Fast delivery across Lagos.",
    url: "/menu",
  },
  alternates: {
    canonical: "/menu",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
