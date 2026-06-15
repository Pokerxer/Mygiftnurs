"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import StarRating from "./StarRating"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import type { Product } from "@/types"

export default function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist()
  const { add } = useCart()
  const [heartAnimating, setHeartAnimating] = useState(false)

  const isSale = product.compareAtPrice !== undefined && product.compareAtPrice > product.price
  const discount = isSale
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0
  const wishlisted = isWishlisted(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    toggle({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.image,
      isBestSeller: product.isBestSeller,
      isNewArrival: product.isNewArrival,
    })
    setHeartAnimating(true)
    setTimeout(() => setHeartAnimating(false), 400)

    if (!wishlisted) {
      toast.success("Added to wishlist", {
        description: product.name,
        duration: 2000,
      })
    } else {
      toast("Removed from wishlist", {
        description: product.name,
        duration: 2000,
      })
    }
  }

  return (
    <div className="group relative">
      <Link href={`/shop/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-brand-pink rounded-card hover-glow">
        <div className="aspect-square rounded-card overflow-hidden bg-neutral-100 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />

          {/* badges */}
          <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 flex flex-col gap-1 sm:gap-1.5">
            {isSale && (
              <span className="bg-brand-pink text-white text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-pill shadow-sm animate-pulse-glow">
                -{discount}%
              </span>
            )}
            {product.isBestSeller && !isSale && (
              <span className="bg-brand-gold text-neutral-900 text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-pill shadow-sm">
                Bestseller
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-white text-neutral-900 text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-pill shadow-sm">
                New
              </span>
            )}
          </div>

          {/* wishlist */}
          <button
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-125 active:scale-90 transition-all duration-200"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                wishlisted ? "fill-brand-pink text-brand-pink" : "text-neutral-700"
              } ${heartAnimating ? "scale-150" : "scale-100"}`}
            />
          </button>

          {/* add to bag — always on mobile, hover on desktop */}
          <button
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.preventDefault()
              add(product)
            }}
            className="absolute inset-x-2 sm:inset-x-2.5 bottom-2 sm:bottom-2.5 bg-neutral-900/90 backdrop-blur text-white text-[11px] sm:text-xs font-medium py-2 sm:py-2.5 rounded-btn flex items-center justify-center gap-1.5 sm:gap-2 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 hover:bg-brand-pink active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to Bag</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        <div className="mt-3 sm:mt-4 pb-3 sm:pb-4 space-y-1 sm:space-y-1.5 px-1 sm:px-2">
          <h3 className="text-xs sm:text-sm font-medium text-neutral-900 line-clamp-1 group-hover:text-brand-pink transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`text-xs sm:text-sm font-semibold ${isSale ? "text-brand-pink" : "text-neutral-900"}`}>
              ₦{product.price.toLocaleString()}
            </span>
            {isSale && (
              <span className="text-[10px] sm:text-xs text-neutral-400 line-through">
                ₦{product.compareAtPrice!.toLocaleString()}
              </span>
            )}
          </div>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </Link>
    </div>
  )
}
