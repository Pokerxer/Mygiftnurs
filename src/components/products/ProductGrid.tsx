import Link from "next/link"
import { SearchX, ArrowRight, Gift, Cake, Heart, Gem, Sparkles, GraduationCap } from "lucide-react"
import ProductCard from "./ProductCard"
import type { Product } from "@/types"

const suggestedCategories = [
  { name: "Personalized Gifts", slug: "personalized", icon: Gift },
  { name: "Birthday Gifts", slug: "birthday", icon: Cake },
  { name: "Anniversary Gifts", slug: "anniversary", icon: Heart },
  { name: "Gifts for Him", slug: "for-him", icon: Gem },
  { name: "Gifts for Her", slug: "for-her", icon: Sparkles },
  { name: "Graduation Gifts", slug: "graduation", icon: GraduationCap },
]

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-pink-light flex items-center justify-center mb-4">
          <SearchX className="w-6 h-6 sm:w-7 sm:h-7 text-brand-pink" />
        </div>
        <h2 className="font-display text-lg sm:text-xl font-bold text-neutral-900">No gifts found</h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xs">
          Try widening your price range or removing a filter or two.
        </p>
        <Link
          href="/shop"
          className="mt-5 sm:mt-6 bg-brand-pink text-white px-5 sm:px-6 py-2.5 rounded-pill text-xs sm:text-sm font-medium hover:bg-brand-pink/90 transition-colors"
        >
          Clear all filters
        </Link>

        <div className="mt-10 sm:mt-14 w-full max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Or browse by category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {suggestedCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="flex items-center gap-2.5 p-3 rounded-card border border-neutral-100 hover:border-brand-pink hover:bg-brand-pink-light/30 transition-all text-left group"
                >
                  <span className="w-8 h-8 rounded-full bg-brand-pink-light flex items-center justify-center shrink-0 group-hover:bg-brand-pink group-hover:scale-110 transition-all">
                    <Icon className="w-4 h-4 text-brand-pink group-hover:text-white transition-colors" />
                  </span>
                  <span className="text-xs font-medium text-neutral-700 group-hover:text-brand-pink transition-colors">
                    {cat.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-6 sm:gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
