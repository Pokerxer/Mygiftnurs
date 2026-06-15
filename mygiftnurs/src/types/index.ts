export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  image: string
  category: string
  occasions: string[]
  tags: string[]
  stock: number
  isFeatured: boolean
  isBestSeller: boolean
  isNewArrival?: boolean
  rating: number
  reviewCount: number
}

export interface Category {
  name: string
  slug: string
  image: string
  bg: string
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating"

export interface ShopFilters {
  category?: string
  occasion?: string
  minPrice?: number
  maxPrice?: number
  sort?: SortOption
  page?: number
  q?: string
  onSale?: boolean
}

export interface WishlistItem {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  image: string
  isBestSeller?: boolean
  isNewArrival?: boolean
}
