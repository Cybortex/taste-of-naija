import type { Metadata } from "next";
import { getMenuItemBySlug } from "@/data/menu";

interface DishLayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getMenuItemBySlug(resolvedParams.slug);

  if (!item) {
    return {
      title: "Dish Details",
      description: "Explore delicious Nigerian meals from Taste of Naija.",
    };
  }

  const imageSlug = item.imageSlug || item.slug;
  const imageUrl = item.image || `/images/dishes/dish-${imageSlug}-1.jpg`;

  return {
    title: `${item.name} - Order Online`,
    description:
      item.description ||
      `Order authentic ${item.name} online from Taste of Naija in Lagos. Hot and fresh for dine-in, takeaway, and home delivery.`,
    openGraph: {
      title: `${item.name} | Taste of Naija`,
      description:
        item.description ||
        `Authentic ${item.name} prepared fresh with traditional Nigerian ingredients.`,
      url: `/dish/${item.slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `${item.name} at Taste of Naija`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} | Taste of Naija`,
      description: item.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/dish/${item.slug}`,
    },
  };
}

export default function DishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
