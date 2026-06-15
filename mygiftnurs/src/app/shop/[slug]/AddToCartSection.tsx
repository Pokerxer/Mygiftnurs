"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingBag, Minus, Plus, Check, Truck, Gift } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { GIFT_WRAP_PRICE } from "@/store/slices/cartSlice"
import type { Product } from "@/types"

export default function AddToCartSection({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)
  const [heartAnimating, setHeartAnimating] = useState(false)
  const { add } = useCart()
  const { isWishlisted, toggle } = useWishlist()

  const wishlisted = isWishlisted(product.id)

  const handleWishlistToggle = () => {
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
  const outOfStock = product.stock === 0
  const lowStock = product.stock > 0 && product.stock <= 5

  useEffect(() => {
    if (added) {
      const t = setTimeout(() => setAdded(false), 2200)
      return () => clearTimeout(t)
    }
  }, [added])

  const handleAdd = () => {
    add(product, qty, giftWrap)
    setAdded(true)
    setQty(1)
    setGiftWrap(false)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* stock indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            outOfStock
              ? "bg-neutral-300"
              : lowStock
              ? "bg-amber-400"
              : "bg-emerald-400"
          }`}
        />
        <span className="text-xs font-medium text-neutral-500">
          {outOfStock
            ? "Out of stock"
            : lowStock
            ? `Only ${product.stock} left — order soon`
            : `${product.stock} in stock`}
        </span>
      </div>

      {/* quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-700">Quantity</span>
        <div className="flex items-center border border-neutral-200 rounded-btn overflow-hidden">
          <button
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-12 text-center text-sm font-semibold text-neutral-900 select-none tabular-nums">
            {qty}
          </span>
          <button
            aria-label="Increase quantity"
            disabled={qty >= product.stock}
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        {qty > 1 && (
          <span className="text-xs text-neutral-400 tabular-nums">
            $            ₦{(product.price * qty).toLocaleString()} total
          </span>
        )}
      </div>

      {/* gift wrap toggle */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="sr-only peer"
          />
          <span className="w-5 h-5 rounded border-2 border-neutral-200 peer-checked:border-brand-pink peer-checked:bg-brand-pink flex items-center justify-center transition-all">
            {giftWrap && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-brand-pink" />
          <span className="text-sm text-neutral-700 group-hover:text-brand-pink transition-colors">
            Add gift wrapping (+₦{GIFT_WRAP_PRICE.toLocaleString()})
          </span>
        </div>
      </label>

      {/* actions */}
      <div className="flex items-center gap-3">
        <button
          disabled={outOfStock || added}
          onClick={handleAdd}
          className={`flex-1 text-sm font-semibold py-3.5 rounded-btn flex items-center justify-center gap-2 transition-all duration-300 ${
            added
              ? "bg-emerald-500 text-white"
              : outOfStock
              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              : "bg-neutral-900 text-white hover:bg-brand-pink active:scale-[0.98]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4.5 h-4.5" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>

        <button
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={handleWishlistToggle}
          className={`w-12 h-12 border rounded-btn flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? "border-brand-pink bg-brand-pink-light scale-105"
              : "border-neutral-200 hover:border-brand-pink hover:bg-brand-pink-light/50"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              wishlisted ? "fill-brand-pink text-brand-pink" : "text-neutral-600"
            } ${heartAnimating ? "scale-150" : "scale-100"}`}
          />
        </button>
      </div>

      {/* shipping estimate */}
      <div className="flex items-center gap-2.5 p-3 rounded-card bg-neutral-50 border border-neutral-100">
        <Truck className="w-4 h-4 text-brand-pink shrink-0" />
        <p className="text-xs text-neutral-500">
          <span className="font-medium text-neutral-700">Free shipping</span> on orders over ₦112,500 · Est. delivery{" "}
          <span className="font-medium text-neutral-700">5-7 business days</span>
        </p>
      </div>
    </div>
  )
}
