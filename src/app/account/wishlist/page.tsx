"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ChevronRight,
  HeartOff,
  Package,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  removeFromWishlist,
  markForRemoval,
  confirmRemoval,
  clearWishlist,
} from "@/store/slices/wishlistSlice"
import { useCart } from "@/hooks/useCart"
import type { RootState } from "@/store/index"
import type { WishlistItem } from "@/types"

export default function WishlistPage() {
  const dispatch = useDispatch()
  const { items, removingIds } = useSelector((state: RootState) => state.wishlist)
  const { add } = useCart()
  const [removingAll, setRemovingAll] = useState(false)

  const count = items.length
  const isEmpty = count === 0

  const removeWithAnimation = (productId: string) => {
    dispatch(markForRemoval(productId))
    setTimeout(() => {
      dispatch(confirmRemoval(productId))
    }, 300)
  }

  const moveToCart = (item: WishlistItem) => {
    add({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: "",
      price: item.price,
      image: item.image,
      category: "",
      occasions: [],
      tags: [],
      stock: 99,
      isFeatured: false,
      isBestSeller: false,
      rating: 0,
      reviewCount: 0,
    } as any)
    removeWithAnimation(item.id)
  }

  const moveAllToCart = () => {
    items.forEach((p) => moveToCart(p))
    setRemovingAll(true)
    setTimeout(() => {
      dispatch(clearWishlist())
      setRemovingAll(false)
    }, 300)
  }

  const clearAll = () => {
    setRemovingAll(true)
    setTimeout(() => {
      dispatch(clearWishlist())
      setRemovingAll(false)
    }, 300)
  }

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full bg-brand-pink-light flex items-center justify-center animate-bounce-subtle">
            <Heart className="w-12 h-12 text-brand-pink" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <span className="text-2xl">💝</span>
          </div>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
          Save items you love to revisit later. Tap the heart on any product to get started.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-brand-pink text-white text-sm font-semibold px-8 py-3.5 rounded-pill hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.97] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Start Shopping
        </Link>

        {/* suggested categories */}
        <div className="mt-14 sm:mt-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Popular categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "Personalized", slug: "personalized" },
              { name: "Birthday", slug: "birthday" },
              { name: "Anniversary", slug: "anniversary" },
              { name: "For Him", slug: "for-him" },
              { name: "For Her", slug: "for-her" },
              { name: "Graduation", slug: "graduation" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="px-4 py-2 text-xs font-medium border border-neutral-200 rounded-pill hover:border-brand-pink hover:text-brand-pink hover:bg-brand-pink-light/30 transition-all duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-6">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-brand-pink transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3" />
          </li>
          <li className="text-neutral-700 font-medium" aria-current="page">
            Wishlist
          </li>
        </ol>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
            My Wishlist
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {count} {count === 1 ? "item" : "items"} saved
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={moveAllToCart}
            className="flex items-center gap-1.5 text-sm font-medium text-brand-pink border border-brand-pink/30 px-4 py-2 rounded-pill hover:bg-brand-pink-light active:scale-95 transition-all duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Move all to cart
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 border border-neutral-200 px-4 py-2 rounded-pill hover:text-red-500 hover:border-red-500/30 active:scale-95 transition-all duration-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-6 sm:gap-y-8">
        {items.map((product, index) => {
          const isRemoving =
            removingIds.includes(product.id) || removingAll
          const isSale =
            product.compareAtPrice !== undefined &&
            product.compareAtPrice > product.price
          const discount = isSale
            ? Math.round(
                (1 - product.price / product.compareAtPrice!) * 100
              )
            : 0

          return (
            <div
              key={product.id}
              className={`group relative transition-all duration-300 ${
                isRemoving
                  ? "opacity-0 -translate-y-4 scale-95"
                  : "animate-fade-up"
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link
                href={`/shop/${product.slug}`}
                className="block focus-visible:outline-2 focus-visible:outline-brand-pink rounded-card hover-glow"
              >
                <div className="aspect-square rounded-card overflow-hidden bg-neutral-100 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />

                  {/* badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isSale && (
                      <span className="bg-brand-pink text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-pill shadow-sm">
                        -{discount}%
                      </span>
                    )}
                    {product.isBestSeller && !isSale && (
                      <span className="bg-brand-gold text-neutral-900 text-[10px] font-semibold px-1.5 py-0.5 rounded-pill shadow-sm">
                        Bestseller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="bg-white text-neutral-900 text-[10px] font-semibold px-1.5 py-0.5 rounded-pill shadow-sm">
                        New
                      </span>
                    )}
                  </div>

                  {/* remove button */}
                  <button
                    aria-label={`Remove ${product.name} from wishlist`}
                    onClick={(e) => {
                      e.preventDefault()
                      removeWithAnimation(product.id)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-125 hover:bg-red-50 active:scale-90 transition-all duration-200"
                  >
                    <Heart className="w-4 h-4 fill-brand-pink text-brand-pink group-hover:hidden" />
                    <HeartOff className="w-4 h-4 text-red-500 hidden group-hover:block" />
                  </button>

                  {/* add to cart overlay */}
                  <button
                    aria-label={`Add ${product.name} to cart`}
                    onClick={(e) => {
                      e.preventDefault()
                      moveToCart(product)
                    }}
                    className="absolute inset-x-2 bottom-2 bg-neutral-900/90 backdrop-blur text-white text-[11px] font-medium py-2 rounded-btn flex items-center justify-center gap-1.5 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 hover:bg-brand-pink active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>

                <div className="mt-3 pb-3 px-1 space-y-1">
                  <h3 className="text-xs sm:text-sm font-medium text-neutral-900 line-clamp-1 group-hover:text-brand-pink transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        isSale ? "text-brand-pink" : "text-neutral-900"
                      }`}
                    >
                      ₦{product.price.toLocaleString()}
                    </span>
                    {isSale && (
                      <span className="text-[10px] text-neutral-400 line-through">
                        ₦{product.compareAtPrice!.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
