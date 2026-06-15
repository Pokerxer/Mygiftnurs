import type { Product, Category, ShopFilters } from "@/types"

const unsplash = (id: string) =>
  `https://plus.unsplash.com/${id}?w=400&q=80&auto=format&fit=crop`

const local = (name: string) => `/images/products/${name}.jpg`

const productImages: Record<string, string> = {
  "custom-star-map-print": unsplash("premium_photo-1669312732419-a55959a56e6c"),
  "birth-flower-necklace": unsplash("premium_photo-1681276170281-cf50a487a1b7"),
  "memory-photo-book": unsplash("premium_photo-1698371217566-cb6086771368"),
  "personalized-photo-frame": local("gift-box-1"),
  "custom-name-necklace": unsplash("premium_photo-1681276170281-cf50a487a1b7"),
  "birthday-gift-box": local("gift-box-2"),
  "engraved-leather-wallet": unsplash("premium_photo-1681589453747-53fd893fa420"),
  "scented-candle-trio": unsplash("premium_photo-1666717576644-5701d3406840"),
  "custom-mug-collection": unsplash("premium_photo-1674327105074-46dd8319164b"),
  "anniversary-rose-dome": unsplash("premium_photo-1676475964992-6404b8db0b53"),
  "whiskey-stone-gift-set": unsplash("premium_photo-1694852654824-c5a91c345471"),
  "graduation-memory-frame": unsplash("premium_photo-1713296255442-e9338f42aad8"),
  "spa-day-gift-basket": unsplash("premium_photo-1679430672295-3846f0cf0503"),
  "custom-pet-portrait": unsplash("premium_photo-1666777247416-ee7a95235559"),
  "birthday-balloon-bouquet": unsplash("premium_photo-1681488068521-8912e7d5d5fd"),
  "couples-matching-bracelets": unsplash("premium_photo-1681276170281-cf50a487a1b7"),
  "grad-cap-keepsake-box": unsplash("premium_photo-1713296255442-e9338f42aad8"),
  "bbq-master-tool-kit": unsplash("premium_photo-1693221705288-7a2531eaa5e5"),
  "plush-teddy-chocolates": unsplash("premium_photo-1664373233010-7c4abae40f78"),
  "engraved-pen-journal-set": unsplash("premium_photo-1698371217566-cb6086771368"),
}

const categoryImages: Record<string, string> = {
  personalized: "/images/categories/personalized.svg",
  birthday: "/images/categories/birthday.svg",
  anniversary: "/images/categories/anniversary.svg",
  "for-him": "/images/categories/for-him.svg",
  "for-her": "/images/categories/for-her.svg",
  graduation: "/images/categories/graduation.svg",
}

export const PRICE_RANGE = { min: 0, max: 120000 } as const
export const PAGE_SIZE = 12

export const categories: Category[] = [
  { name: "Personalized Gifts", slug: "personalized", image: categoryImages.personalized, bg: "#FFF0F3" },
  { name: "Birthday Gifts", slug: "birthday", image: categoryImages.birthday, bg: "#FFF4E6" },
  { name: "Anniversary Gifts", slug: "anniversary", image: categoryImages.anniversary, bg: "#F3E8FF" },
  { name: "Gifts for Him", slug: "for-him", image: categoryImages["for-him"], bg: "#E6F4FF" },
  { name: "Gifts for Her", slug: "for-her", image: categoryImages["for-her"], bg: "#FFE4EC" },
  { name: "Graduation Gifts", slug: "graduation", image: categoryImages.graduation, bg: "#E6FFEF" },
]

export const occasions = [
  { name: "Birthday", slug: "birthday" },
  { name: "Anniversary", slug: "anniversary" },
  { name: "Wedding", slug: "wedding" },
  { name: "Valentine's Day", slug: "valentines" },
  { name: "Mother's Day", slug: "mothers-day" },
  { name: "Christmas", slug: "christmas" },
  { name: "Graduation", slug: "graduation" },
] as const

export const products: Product[] = [
  { id: "p01", name: "Custom Star Map Print", slug: "custom-star-map-print", description: "The night sky from your special date, printed on museum-grade paper.", price: 67500, image: productImages["custom-star-map-print"], category: "personalized", occasions: ["anniversary", "valentines", "wedding"], tags: ["personalized", "wall-art"], stock: 24, isFeatured: true, isBestSeller: false, isNewArrival: true, rating: 4.9, reviewCount: 41 },
  { id: "p02", name: "Birth Flower Necklace", slug: "birth-flower-necklace", description: "Delicate gold-plated pendant engraved with her birth month flower.", price: 55500, image: productImages["birth-flower-necklace"], category: "for-her", occasions: ["birthday", "valentines", "mothers-day"], tags: ["personalized", "jewelry"], stock: 40, isFeatured: false, isBestSeller: false, isNewArrival: true, rating: 4.8, reviewCount: 27 },
  { id: "p03", name: "Memory Photo Book", slug: "memory-photo-book", description: "A linen-bound photo book for the moments that matter most.", price: 60000, compareAtPrice: 75000, image: productImages["memory-photo-book"], category: "anniversary", occasions: ["anniversary", "wedding", "valentines"], tags: ["personalized", "keepsake"], stock: 31, isFeatured: false, isBestSeller: false, isNewArrival: true, rating: 4.7, reviewCount: 19 },
  { id: "p04", name: "Personalized Photo Frame", slug: "personalized-photo-frame", description: "Engraved oak frame that turns a favorite photo into a keepsake.", price: 45000, compareAtPrice: 60000, image: productImages["personalized-photo-frame"], category: "personalized", occasions: ["anniversary", "wedding", "mothers-day"], tags: ["personalized", "home"], stock: 52, isFeatured: true, isBestSeller: true, rating: 4.8, reviewCount: 156 },
  { id: "p05", name: "Custom Name Necklace", slug: "custom-name-necklace", description: "Her name in flowing script, 18k gold-plated sterling silver.", price: 75000, image: productImages["custom-name-necklace"], category: "for-her", occasions: ["birthday", "valentines", "anniversary"], tags: ["personalized", "jewelry"], stock: 38, isFeatured: true, isBestSeller: true, rating: 4.9, reviewCount: 203 },
  { id: "p06", name: "Birthday Gift Box", slug: "birthday-gift-box", description: "A curated box of treats, candles and confetti — ready to gift.", price: 60000, compareAtPrice: 82500, image: productImages["birthday-gift-box"], category: "birthday", occasions: ["birthday"], tags: ["gift-set"], stock: 67, isFeatured: true, isBestSeller: true, rating: 4.7, reviewCount: 89 },
  { id: "p07", name: "Engraved Leather Wallet", slug: "engraved-leather-wallet", description: "Full-grain leather wallet with his initials embossed in gold.", price: 52500, image: productImages["engraved-leather-wallet"], category: "for-him", occasions: ["birthday", "anniversary", "christmas"], tags: ["personalized", "leather"], stock: 45, isFeatured: false, isBestSeller: true, rating: 4.6, reviewCount: 72 },
  { id: "p08", name: "Scented Candle Trio", slug: "scented-candle-trio", description: "Vanilla, peony and sandalwood — hand-poured soy candles.", price: 37500, image: productImages["scented-candle-trio"], category: "for-her", occasions: ["birthday", "mothers-day", "christmas"], tags: ["home", "relax"], stock: 80, isFeatured: false, isBestSeller: true, rating: 4.5, reviewCount: 134 },
  { id: "p09", name: "Custom Mug Collection", slug: "custom-mug-collection", description: "Ceramic mugs printed with your photos, names or inside jokes.", price: 30000, image: productImages["custom-mug-collection"], category: "personalized", occasions: ["birthday", "christmas"], tags: ["personalized", "kitchen"], stock: 120, isFeatured: false, isBestSeller: true, rating: 4.4, reviewCount: 218 },
  { id: "p10", name: "Anniversary Rose Dome", slug: "anniversary-rose-dome", description: "A preserved rose in glass that lasts for years, not days.", price: 82500, compareAtPrice: 105000, image: productImages["anniversary-rose-dome"], category: "anniversary", occasions: ["anniversary", "valentines", "wedding"], tags: ["romance", "keepsake"], stock: 22, isFeatured: true, isBestSeller: true, rating: 4.9, reviewCount: 167 },
  { id: "p11", name: "Whiskey Stone Gift Set", slug: "whiskey-stone-gift-set", description: "Granite chilling stones with twin glasses in a wooden crate.", price: 64500, image: productImages["whiskey-stone-gift-set"], category: "for-him", occasions: ["birthday", "christmas", "anniversary"], tags: ["gift-set", "barware"], stock: 35, isFeatured: false, isBestSeller: false, rating: 4.7, reviewCount: 96 },
  { id: "p12", name: "Graduation Memory Frame", slug: "graduation-memory-frame", description: "Tassel-and-photo display frame for the big day.", price: 42000, image: productImages["graduation-memory-frame"], category: "graduation", occasions: ["graduation"], tags: ["keepsake"], stock: 48, isFeatured: false, isBestSeller: false, rating: 4.6, reviewCount: 54 },
  { id: "p13", name: "Spa Day Gift Basket", slug: "spa-day-gift-basket", description: "Bath bombs, robe and eye mask for a full at-home spa day.", price: 90000, compareAtPrice: 112500, image: productImages["spa-day-gift-basket"], category: "for-her", occasions: ["birthday", "mothers-day"], tags: ["gift-set", "relax"], stock: 26, isFeatured: true, isBestSeller: false, rating: 4.8, reviewCount: 112 },
  { id: "p14", name: "Custom Pet Portrait", slug: "custom-pet-portrait", description: "Your pet, illustrated by hand and printed on canvas.", price: 75000, image: productImages["custom-pet-portrait"], category: "personalized", occasions: ["birthday", "christmas"], tags: ["personalized", "wall-art"], stock: 18, isFeatured: false, isBestSeller: false, rating: 5.0, reviewCount: 88 },
  { id: "p15", name: "Birthday Balloon Bouquet", slug: "birthday-balloon-bouquet", description: "A delivered bundle of pastel balloons and a handwritten card.", price: 34500, image: productImages["birthday-balloon-bouquet"], category: "birthday", occasions: ["birthday"], tags: ["party"], stock: 90, isFeatured: false, isBestSeller: false, rating: 4.3, reviewCount: 61 },
  { id: "p16", name: "Couple's Matching Bracelets", slug: "couples-matching-bracelets", description: "Magnetic his-and-hers bracelets that snap together.", price: 48000, compareAtPrice: 63000, image: productImages["couples-matching-bracelets"], category: "anniversary", occasions: ["anniversary", "valentines", "wedding"], tags: ["jewelry", "romance"], stock: 44, isFeatured: false, isBestSeller: false, rating: 4.5, reviewCount: 143 },
  { id: "p17", name: "Grad Cap Keepsake Box", slug: "grad-cap-keepsake-box", description: "A walnut box shaped like a graduation cap for tassels and notes.", price: 51000, image: productImages["grad-cap-keepsake-box"], category: "graduation", occasions: ["graduation"], tags: ["keepsake"], stock: 29, isFeatured: false, isBestSeller: false, rating: 4.4, reviewCount: 37 },
  { id: "p18", name: "BBQ Master Tool Kit", slug: "bbq-master-tool-kit", description: "Stainless grill tools in a personalized carry case.", price: 70500, image: productImages["bbq-master-tool-kit"], category: "for-him", occasions: ["birthday", "christmas"], tags: ["personalized", "outdoor"], stock: 33, isFeatured: false, isBestSeller: false, rating: 4.6, reviewCount: 79 },
  { id: "p19", name: "Plush Teddy & Chocolates", slug: "plush-teddy-chocolates", description: "A classic duo: soft teddy bear with a box of pralines.", price: 28500, image: productImages["plush-teddy-chocolates"], category: "birthday", occasions: ["birthday", "valentines"], tags: ["classic"], stock: 75, isFeatured: false, isBestSeller: false, rating: 4.2, reviewCount: 184 },
  { id: "p20", name: "Engraved Pen & Journal Set", slug: "engraved-pen-journal-set", description: "Vegan leather journal with a brass pen, engraved free.", price: 43500, image: productImages["engraved-pen-journal-set"], category: "graduation", occasions: ["graduation", "christmas"], tags: ["personalized", "stationery"], stock: 58, isFeatured: false, isBestSeller: false, rating: 4.7, reviewCount: 66 },
]

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller)
}

export function getCategoryCount(slug: string): number {
  return products.filter((p) => p.category === slug).length
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
}

export function isOnSale(product: Product): boolean {
  return product.compareAtPrice !== undefined && product.compareAtPrice > product.price
}

export function getDealProducts(): Product[] {
  return products.filter(isOnSale)
}

export function getTopDeals(count = 6): Product[] {
  return products
    .filter(isOnSale)
    .sort((a, b) => {
      const discA = (a.compareAtPrice! - a.price) / a.compareAtPrice!
      const discB = (b.compareAtPrice! - b.price) / b.compareAtPrice!
      return discB - discA
    })
    .slice(0, count)
}

export function queryProducts(filters: ShopFilters): { products: Product[]; total: number; pages: number } {
  let result = products.slice()

  if (filters.q) {
    const q = filters.q.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    )
  }
  if (filters.category) {
    const cats = filters.category.split(",")
    result = result.filter((p) => cats.includes(p.category))
  }
  if (filters.occasion) {
    const occs = filters.occasion.split(",")
    result = result.filter((p) => p.occasions.some((o) => occs.includes(o)))
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!)
  }
  if (filters.onSale) {
    result = result.filter(isOnSale)
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      result.sort((a, b) => b.price - a.price)
      break
    case "rating":
      result.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
    default:
      break
  }

  const total = result.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(Math.max(filters.page ?? 1, 1), pages)
  const start = (page - 1) * PAGE_SIZE

  return { products: result.slice(start, start + PAGE_SIZE), total, pages }
}
