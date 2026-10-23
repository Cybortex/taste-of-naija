import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileOrderBar } from "@/components/layout/MobileOrderBar";

export const metadata: Metadata = {
  title: "Taste of Naija | Authentic Nigerian Restaurant & Online Ordering",
  description:
    "Real Nigerian food made with pride. Order authentic Pounded Yam, Egusi, Party Jollof, Suya, and fresh soups online for Dine-in, Takeaway, and Home Delivery in Lagos.",
  keywords: [
    "Nigerian restaurant Lagos",
    "Taste of Naija",
    "Authentic Nigerian food",
    "Pounded Yam Egusi",
    "Party Jollof Rice",
    "Beef Suya Victoria Island",
    "Order Nigerian food online",
  ],
  authors: [{ name: "Taste of Naija Kitchen" }],
  openGraph: {
    title: "Taste of Naija — Real Nigerian Food, Made With Pride",
    description: "Authentic Nigerian culinary heritage with modern online ordering. Dine-in, Takeaway & Home Delivery.",
    url: "https://tasteofnaija.ng",
    siteName: "Taste of Naija",
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F7B3C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#1A2E1A] antialiased">
        <ConvexClientProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileOrderBar />
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
