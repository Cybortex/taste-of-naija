import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Taste of Naija - Authentic Nigerian Restaurant",
    short_name: "Taste of Naija",
    description:
      "Real Nigerian food made with pride. Order authentic Pounded Yam, Egusi, Party Jollof, Suya, and fresh soups online for Dine-in, Takeaway, and Home Delivery in Lagos.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5F0",
    theme_color: "#0F7B3C",
    orientation: "portrait",
    categories: ["food", "restaurants", "shopping"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
