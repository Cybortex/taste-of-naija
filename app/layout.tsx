import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileOrderBar } from "@/components/layout/MobileOrderBar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tasteofnaija.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Taste of Naija | Authentic Nigerian Restaurant & Online Ordering",
    template: "%s | Taste of Naija",
  },
  description:
    "Real Nigerian food made with pride. Order authentic Pounded Yam, Egusi, Party Jollof, Suya, and fresh soups online for Dine-in, Takeaway, and Home Delivery in Lagos.",
  applicationName: "Taste of Naija",
  keywords: [
    "Nigerian restaurant Lagos",
    "Taste of Naija",
    "Authentic Nigerian food",
    "Pounded Yam Egusi Lagos",
    "Party Jollof Rice Lekki",
    "Beef Suya Victoria Island",
    "Order Nigerian food online",
    "Nigerian soup delivery",
    "Amala Ewedu Gbegiri Lagos",
    "African restaurant delivery Lagos",
  ],
  authors: [{ name: "Taste of Naija Kitchen", url: siteUrl }],
  creator: "Taste of Naija",
  publisher: "Taste of Naija",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taste of Naija — Real Nigerian Food, Made With Pride",
    description:
      "Authentic Nigerian culinary heritage with modern online ordering. Savour hot Pounded Yam, Egusi, Party Jollof, Suya, and fresh native soups. Dine-in, Takeaway & Home Delivery in Lagos.",
    url: siteUrl,
    siteName: "Taste of Naija",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taste of Naija Feast - Authentic Nigerian Restaurant in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taste of Naija — Real Nigerian Food, Made With Pride",
    description:
      "Authentic Nigerian food online. Pounded Yam, Egusi, Party Jollof, Beef Suya & Chilled Drinks in Lagos.",
    images: ["/og-image.jpg"],
    creator: "@tasteofnaijang",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Taste of Naija",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F7B3C",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Restaurant Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Taste of Naija",
    image: `${siteUrl}/og-image.jpg`,
    url: siteUrl,
    telephone: "+2349071649725",
    priceRange: "₦₦",
    servesCuisine: ["Nigerian", "West African", "African"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 Admiralty Way",
      addressLocality: "Lekki Phase 1",
      addressRegion: "Lagos State",
      postalCode: "105102",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.4474,
      longitude: 3.4735,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    hasMenu: `${siteUrl}/menu`,
    acceptsReservations: "True",
    paymentAccepted: "Cash, Credit Card, Debit Card, Paystack, Bank Transfer",
    currenciesAccepted: "NGN",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
        <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
