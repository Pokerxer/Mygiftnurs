"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ChevronRight,
  HeartOff,
  ArrowRight,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleDrawer,
  removeFromWishlist,
  markForRemoval,
  confirmRemoval,
} from "@/store/slices/wishlistSlice"
import { addItem } from "@/store/slices/cartSlice"
import { useCart } from "@/hooks/useCart"
import type { RootState } from "@/store/index"
import type { WishlistItem } from "@/types"

export default function WishlistDrawer() {
  const dispatch = useDispatch()
  const { items, isDrawerOpen, removingIds } = useSelector(
    (state: RootState) => state.wishlist
  )
  const { add } = useCart()
  const [swipeX, setSwipeX] = useState(0)
  const touchStart = useRef({ x: 0, y: 0 })

  const count = items.length

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"
      setSwipeX(0)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isDrawerOpen])

  // swipe-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStart.current.x
    const dy = Math.abs(e.touches[0].clientY - touchStart.current.y)
    if (dx > 0 && dy < 50) {
      setSwipeX(Math.min(dx, 300))
    }
  }

  const handleTouchEnd = () => {
    if (swipeX > 120) {
      dispatch(toggleDrawer())
    }
    setSwipeX(0)
  }

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
  }

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isDrawerOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(toggleDrawer())}
        aria-hidden
      />

      {/* drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-all duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transform: isDrawerOpen ? `translateX(${swipeX}px)` : undefined,
          transition: swipeX > 0 ? "none" : undefined,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* swipe indicator */}
        {swipeX > 0 && (
          <div
            className="absolute top-0 left-0 w-1 h-full bg-brand-pink rounded-l transition-opacity"
            style={{ opacity: Math.min(swipeX / 120, 1) }}
          />
        )}

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-pink-light flex items-center justify-center">
              <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-neutral-900">
                Wishlist
              </h2>
              <p className="text-[11px] text-neutral-400">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            aria-label="Close wishlist"
            onClick={() => dispatch(toggleDrawer())}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-90 transition-all"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-brand-pink-light flex items-center justify-center animate-bounce-subtle">
                <Heart className="w-9 h-9 text-brand-pink" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                <span className="text-lg">💝</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-neutral-900">
                Your wishlist is empty
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                Save items you love to revisit later
              </p>
            </div>
            <Link
              href="/shop"
              onClick={() => dispatch(toggleDrawer())}
              className="bg-brand-pink text-white px-6 py-3 rounded-pill font-medium text-sm hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2"
            >
              Discover Gifts <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* move all to cart bar */}
            <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
              <button
                onClick={moveAllToCart}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-brand-pink hover:text-brand-pink/80 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Move all to cart
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((product, index) => {
                const isRemoving = removingIds.includes(product.id)
                const isSale =
                  product.compareAtPrice !== undefined &&
                  product.compareAtPrice > product.price

                return (
                  <div
                    key={product.id}
                    className={`flex gap-3 p-3 rounded-card border border-neutral-100 transition-all duration-300 ${
                      isRemoving
                        ? "opacity-0 -translate-x-full scale-95"
                        : "animate-slide-in-right"
                    }`}
                    style={{
                      animationDelay: isRemoving ? "0ms" : `${index * 50}ms`,
                    }}
                  >
                    {/* image */}
                    <Link
                      href={`/shop/${product.slug}`}
                      onClick={() => dispatch(toggleDrawer())}
                      className="w-20 h-20 rounded-card overflow-hidden bg-neutral-100 relative shrink-0 hover:ring-2 hover:ring-brand-pink/20 transition-all duration-200"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      {isSale && (
                        <span className="absolute top-1 left-1 bg-brand-pink text-white text-[9px] font-bold px-1.5 py-0.5 rounded-pill">
                          Sale
                        </span>
                      )}
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/shop/${product.slug}`}
                            onClick={() => dispatch(toggleDrawer())}
                            className="text-sm font-semibold text-neutral-900 hover:text-brand-pink transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <button
                            aria-label={`Remove ${product.name} from wishlist`}
                            onClick={() => removeWithAnimation(product.id)}
                            className="text-neutral-300 hover:text-red-500 transition-colors p-0.5 active:scale-90 shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <p
                            className={`text-sm font-semibold ${
                              isSale ? "text-brand-pink" : "text-neutral-900"
                            }`}
                          >
                            ₦{product.price.toLocaleString()}
                          </p>
                          {isSale && (
                            <p className="text-xs text-neutral-400 line-through">
                              ₦{product.compareAtPrice!.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => moveToCart(product)}
                        className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-btn border border-neutral-200 text-neutral-700 hover:border-brand-pink hover:text-brand-pink hover:bg-brand-pink-light/30 active:scale-[0.98] transition-all duration-200"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* footer */}
            <div className="border-t border-neutral-100 px-5 py-4 space-y-3">
              <Link
                href="/account/wishlist"
                onClick={() => dispatch(toggleDrawer())}
                className="flex items-center justify-center w-full bg-neutral-900 text-white text-sm font-semibold py-3 rounded-btn hover:bg-neutral-800 active:scale-[0.98] transition-all duration-300"
              >
                View Full Wishlist
              </Link>
              <Link
                href="/shop"
                onClick={() => dispatch(toggleDrawer())}
                className="flex items-center justify-center w-full text-sm font-medium text-brand-pink hover:underline py-1"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
