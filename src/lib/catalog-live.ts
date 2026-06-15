import type { Product, ShopFilters } from "@/types"
import { connectDB } from "./mongodb"
import { Product as ProductModel } from "@/models/Product"
import { products, isOnSale, PAGE_SIZE } from "./catalog"

/** Raw shape of documents in the `products` collection, as written by the admin/backend. */
type LiveProductDoc = {
  _id: unknown
  name: string
  slug: string
  description: string
  category: string
  images?: { url: string }[]
  variants?: { price?: number; compareAtPrice?: number; stock?: number }[]
  tags?: string[]
  occasions?: string[]
  featured?: boolean
  isBestSeller?: boolean
  isNewArrival?: boolean
  status?: string
  ratings?: { avg?: number; count?: number }
}

function mapLiveProduct(doc: LiveProductDoc): Product {
  const variant = doc.variants?.[0]
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    price: variant?.price ?? 0,
    compareAtPrice: variant?.compareAtPrice,
    image: doc.images?.[0]?.url || "/images/product-placeholder.svg",
    category: doc.category,
    occasions: doc.occasions ?? [],
    tags: doc.tags ?? [],
    stock: doc.variants?.reduce((sum, v) => sum + (v.stock ?? 0), 0) ?? 0,
    isFeatured: doc.featured ?? false,
    isBestSeller: doc.isBestSeller ?? false,
    isNewArrival: doc.isNewArrival ?? false,
    rating: doc.ratings?.avg ?? 0,
    reviewCount: doc.ratings?.count ?? 0,
  }
}

/** Live published products from MongoDB, or null if the DB is unreachable/empty (caller falls back to the static catalog). */
async function fetchLiveProducts(): Promise<Product[] | null> {
  try {
    await connectDB()
    const docs = (await ProductModel.find({}).lean()) as unknown as LiveProductDoc[]
    const published = docs.filter((d) => d.status === "published")
    if (!published.length) return null
    return published.map(mapLiveProduct)
  } catch {
    return null
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    await connectDB()
    const doc = (await ProductModel.findOne({ slug }).lean()) as unknown as LiveProductDoc | null
    if (doc && doc.status === "published") return mapLiveProduct(doc)
  } catch {
    // fall through to static catalog
  }
  return products.find((p) => p.slug === slug)
}

export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  const source = (await fetchLiveProducts()) ?? products
  return source
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
}

export async function queryProducts(filters: ShopFilters): Promise<{ products: Product[]; total: number; pages: number }> {
  const source = (await fetchLiveProducts()) ?? products
  let result = source.slice()

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
