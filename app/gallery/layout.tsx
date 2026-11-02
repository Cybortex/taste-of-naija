import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food & Ambience Gallery",
  description:
    "Explore our culinary gallery featuring authentic photos of Party Jollof Rice, Egusi Soup, Pounded Yam, Asun, Suya, and the upscale dining ambience at Taste of Naija.",
  openGraph: {
    title: "Culinary Gallery | Taste of Naija Lagos",
    description:
      "Visual feast of our authentic Nigerian kitchen: simmering pots, sizzling grills, and restaurant ambience.",
    url: "/gallery",
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
