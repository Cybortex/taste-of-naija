import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story & Culinary Heritage",
  description:
    "Learn about Taste of Naija: our commitment to traditional hardwood ember cooking, stone-ground melon seeds, aged white yam, and authentic Nigerian culinary pride in Lagos.",
  openGraph: {
    title: "Our Story & Heritage | Taste of Naija",
    description:
      "Real Nigerian food, made with pride. Learn how we bring genuine home-style Nigerian recipes to modern Lagos living.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
