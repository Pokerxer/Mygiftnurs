import { config } from "dotenv"
config({ path: ".env.local" })

import { connectDB } from "../src/lib/mongodb"
import { Product } from "../src/models/Product"
import { User } from "../src/models/User"
import bcrypt from "bcryptjs"

const products = [
  { name: "Custom Star Map Print", slug: "custom-star-map-print", description: "The night sky from your special date, printed on museum-grade paper.", price: 44.99, image: "https://plus.unsplash.com/premium_photo-1669312732419-a55959a56e6c?w=400&q=80&auto=format&fit=crop", category: "personalized", occasions: ["anniversary", "valentines", "wedding"], tags: ["personalized", "wall-art"], stock: 24, isFeatured: true, isBestSeller: false, isNewArrival: true, rating: 4.9, reviewCount: 41 },
  { name: "Birth Flower Necklace", slug: "birth-flower-necklace", description: "Delicate gold-plated pendant engraved with her birth month flower.", price: 36.99, image: "https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=400&q=80&auto=format&fit=crop", category: "for-her", occasions: ["birthday", "valentines", "mothers-day"], tags: ["personalized", "jewelry"], stock: 40, isFeatured: false, isBestSeller: false, isNewArrival: true, rating: 4.8, reviewCount: 27 },
  { name: "Memory Photo Book", slug: "memory-photo-book", description: "A linen-bound photo book for the moments that matter most.", price: 39.99, compareAtPrice: 49.99, image: "https://plus.unsplash.com/premium_photo-1698371217566-cb6086771368?w=400&q=80&auto=format&fit=crop", category: "anniversary", occasions: ["anniversary", "wedding", "valentines"], tags: ["personalized", "keepsake"], stock: 31, isFeatured: false, isBestSeller: false, isNewArrival: true, rating: 4.7, reviewCount: 19 },
  { name: "Personalized Photo Frame", slug: "personalized-photo-frame", description: "Engraved oak frame that turns a favorite photo into a keepsake.", price: 29.99, compareAtPrice: 39.99, image: "/images/products/gift-box-1.jpg", category: "personalized", occasions: ["anniversary", "wedding", "mothers-day"], tags: ["personalized", "home"], stock: 52, isFeatured: true, isBestSeller: true, rating: 4.8, reviewCount: 156 },
  { name: "Custom Name Necklace", slug: "custom-name-necklace", description: "Her name in flowing script, 18k gold-plated sterling silver.", price: 49.99, image: "https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=400&q=80&auto=format&fit=crop", category: "for-her", occasions: ["birthday", "valentines", "anniversary"], tags: ["personalized", "jewelry"], stock: 38, isFeatured: true, isBestSeller: true, rating: 4.9, reviewCount: 203 },
  { name: "Birthday Gift Box", slug: "birthday-gift-box", description: "A curated box of treats, candles and confetti — ready to gift.", price: 39.99, compareAtPrice: 54.99, image: "/images/products/gift-box-2.jpg", category: "birthday", occasions: ["birthday"], tags: ["gift-set"], stock: 67, isFeatured: true, isBestSeller: true, rating: 4.7, reviewCount: 89 },
  { name: "Engraved Leather Wallet", slug: "engraved-leather-wallet", description: "Full-grain leather wallet with his initials embossed in gold.", price: 34.99, image: "https://plus.unsplash.com/premium_photo-1681589453747-53fd893fa420?w=400&q=80&auto=format&fit=crop", category: "for-him", occasions: ["birthday", "anniversary", "christmas"], tags: ["personalized", "leather"], stock: 45, isFeatured: false, isBestSeller: true, rating: 4.6, reviewCount: 72 },
  { name: "Scented Candle Trio", slug: "scented-candle-trio", description: "Vanilla, peony and sandalwood — hand-poured soy candles.", price: 24.99, image: "https://plus.unsplash.com/premium_photo-1666717576644-5701d3406840?w=400&q=80&auto=format&fit=crop", category: "for-her", occasions: ["birthday", "mothers-day", "christmas"], tags: ["home", "relax"], stock: 80, isFeatured: false, isBestSeller: true, rating: 4.5, reviewCount: 134 },
  { name: "Custom Mug Collection", slug: "custom-mug-collection", description: "Ceramic mugs printed with your photos, names or inside jokes.", price: 19.99, image: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=400&q=80&auto=format&fit=crop", category: "personalized", occasions: ["birthday", "christmas"], tags: ["personalized", "kitchen"], stock: 120, isFeatured: false, isBestSeller: true, rating: 4.4, reviewCount: 218 },
  { name: "Anniversary Rose Dome", slug: "anniversary-rose-dome", description: "A preserved rose in glass that lasts for years, not days.", price: 54.99, compareAtPrice: 69.99, image: "https://plus.unsplash.com/premium_photo-1676475964992-6404b8db0b53?w=400&q=80&auto=format&fit=crop", category: "anniversary", occasions: ["anniversary", "valentines", "wedding"], tags: ["romance", "keepsake"], stock: 22, isFeatured: true, isBestSeller: true, rating: 4.9, reviewCount: 167 },
  { name: "Whiskey Stone Gift Set", slug: "whiskey-stone-gift-set", description: "Granite chilling stones with twin glasses in a wooden crate.", price: 42.99, image: "https://plus.unsplash.com/premium_photo-1694852654824-c5a91c345471?w=400&q=80&auto=format&fit=crop", category: "for-him", occasions: ["birthday", "christmas", "anniversary"], tags: ["gift-set", "barware"], stock: 35, isFeatured: false, isBestSeller: false, rating: 4.7, reviewCount: 96 },
  { name: "Graduation Memory Frame", slug: "graduation-memory-frame", description: "Tassel-and-photo display frame for the big day.", price: 27.99, image: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?w=400&q=80&auto=format&fit=crop", category: "graduation", occasions: ["graduation"], tags: ["keepsake"], stock: 48, isFeatured: false, isBestSeller: false, rating: 4.6, reviewCount: 54 },
  { name: "Spa Day Gift Basket", slug: "spa-day-gift-basket", description: "Bath bombs, robe and eye mask for a full at-home spa day.", price: 59.99, compareAtPrice: 74.99, image: "https://plus.unsplash.com/premium_photo-1679430672295-3846f0cf0503?w=400&q=80&auto=format&fit=crop", category: "for-her", occasions: ["birthday", "mothers-day"], tags: ["gift-set", "relax"], stock: 26, isFeatured: true, isBestSeller: false, rating: 4.8, reviewCount: 112 },
  { name: "Custom Pet Portrait", slug: "custom-pet-portrait", description: "Your pet, illustrated by hand and printed on canvas.", price: 49.99, image: "https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?w=400&q=80&auto=format&fit=crop", category: "personalized", occasions: ["birthday", "christmas"], tags: ["personalized", "wall-art"], stock: 18, isFeatured: false, isBestSeller: false, rating: 5.0, reviewCount: 88 },
  { name: "Birthday Balloon Bouquet", slug: "birthday-balloon-bouquet", description: "A delivered bundle of pastel balloons and a handwritten card.", price: 22.99, image: "https://plus.unsplash.com/premium_photo-1681488068521-8912e7d5d5fd?w=400&q=80&auto=format&fit=crop", category: "birthday", occasions: ["birthday"], tags: ["party"], stock: 90, isFeatured: false, isBestSeller: false, rating: 4.3, reviewCount: 61 },
  { name: "Couple's Matching Bracelets", slug: "couples-matching-bracelets", description: "Magnetic his-and-hers bracelets that snap together.", price: 31.99, compareAtPrice: 41.99, image: "https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=400&q=80&auto=format&fit=crop", category: "anniversary", occasions: ["anniversary", "valentines", "wedding"], tags: ["jewelry", "romance"], stock: 44, isFeatured: false, isBestSeller: false, rating: 4.5, reviewCount: 143 },
  { name: "Grad Cap Keepsake Box", slug: "grad-cap-keepsake-box", description: "A walnut box shaped like a graduation cap for tassels and notes.", price: 33.99, image: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?w=400&q=80&auto=format&fit=crop", category: "graduation", occasions: ["graduation"], tags: ["keepsake"], stock: 29, isFeatured: false, isBestSeller: false, rating: 4.4, reviewCount: 37 },
  { name: "BBQ Master Tool Kit", slug: "bbq-master-tool-kit", description: "Stainless grill tools in a personalized carry case.", price: 46.99, image: "https://plus.unsplash.com/premium_photo-1693221705288-7a2531eaa5e5?w=400&q=80&auto=format&fit=crop", category: "for-him", occasions: ["birthday", "christmas"], tags: ["personalized", "outdoor"], stock: 33, isFeatured: false, isBestSeller: false, rating: 4.6, reviewCount: 79 },
  { name: "Plush Teddy & Chocolates", slug: "plush-teddy-chocolates", description: "A classic duo: soft teddy bear with a box of pralines.", price: 18.99, image: "https://plus.unsplash.com/premium_photo-1664373233010-7c4abae40f78?w=400&q=80&auto=format&fit=crop", category: "birthday", occasions: ["birthday", "valentines"], tags: ["classic"], stock: 75, isFeatured: false, isBestSeller: false, rating: 4.2, reviewCount: 184 },
  { name: "Engraved Pen & Journal Set", slug: "engraved-pen-journal-set", description: "Vegan leather journal with a brass pen, engraved free.", price: 28.99, image: "https://plus.unsplash.com/premium_photo-1698371217566-cb6086771368?w=400&q=80&auto=format&fit=crop", category: "graduation", occasions: ["graduation", "christmas"], tags: ["personalized", "stationery"], stock: 58, isFeatured: false, isBestSeller: false, rating: 4.7, reviewCount: 66 },
]

async function seed() {
  try {
    console.log("Connecting to MongoDB...")
    await connectDB()

    console.log("Clearing existing products...")
    await Product.deleteMany({})

    console.log("Inserting products...")
    await Product.insertMany(products)
    console.log(`Inserted ${products.length} products`)

    console.log("Creating admin user...")
    const existingAdmin = await User.findOne({ email: "admin@mygiftnurs.com" })
    if (!existingAdmin) {
      const password = await bcrypt.hash("admin123", 12)
      await User.create({
        name: "Admin",
        email: "admin@mygiftnurs.com",
        password,
        role: "admin",
      })
      console.log("Admin user created (admin@mygiftnurs.com / admin123)")
    } else {
      console.log("Admin user already exists")
    }

    console.log("Seed complete!")
    process.exit(0)
  } catch (error) {
    console.error("Seed failed:", error)
    process.exit(1)
  }
}

seed()
