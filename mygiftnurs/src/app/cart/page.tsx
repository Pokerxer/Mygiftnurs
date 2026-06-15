"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Gift,
  Truck,
  Tag,
  Check,
  X,
  ChevronRight,
  Package,
  CreditCard,
  Shield,
  RotateCcw,
} from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { removeItem, updateQty, toggleGiftWrap, FREE_SHIPPING_THRESHOLD } from "@/store/slices/cartSlice"
import { useDispatch } from "react-redux"

export default function CartPage() {
  const {
    items,
    count,
    subtotal,
    giftWrapTotal,
    promo,
    promoDiscount,
    shipping,
    total,
    freeShippingProgress,
    amountToFreeShipping,
    removingIds,
    removeWithAnimation,
    setPromo,
    clearPromo,
  } = useCart()
  const dispatch = useDispatch()

  const [promoInput, setPromoInput] = useState("")
  const isEmpty = items.length === 0

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full bg-brand-pink-light flex items-center justify-center animate-bounce-subtle">
            <Package className="w-12 h-12 text-brand-pink" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <span className="text-2xl">🎁</span>
          </div>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
          Looks like you haven&apos;t found the perfect gift yet. Let us help you discover something special.
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
            {["Personalized", "Birthday", "Anniversary", "For Him", "For Her", "Graduation"].map(
              (cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${cat.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 text-xs font-medium border border-neutral-200 rounded-pill hover:border-brand-pink hover:text-brand-pink hover:bg-brand-pink-light/30 transition-all duration-200"
                >
                  {cat}
                </Link>
              )
            )}
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
            <Link href="/" className="hover:text-brand-pink transition-colors">Home</Link>
          </li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-neutral-700 font-medium" aria-current="page">Cart</li>
        </ol>
      </nav>

      <div className="flex items-baseline justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Shopping Cart
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {count} {count === 1 ? "item" : "items"} in your bag
          </p>
        </div>
        <Link
          href="/shop"
          className="text-brand-pink text-sm font-medium hover:underline hidden sm:inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue Shopping
        </Link>
      </div>

      {/* free shipping banner */}
      <div className="mb-6 p-4 rounded-card border border-neutral-100 bg-neutral-50">
        {amountToFreeShipping > 0 ? (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="flex items-center gap-2 text-neutral-600">
                <Truck className="w-4 h-4 text-brand-pink" />
                Add <span className="font-bold text-brand-pink">₦{amountToFreeShipping.toLocaleString()}</span> more for free shipping
              </span>
              <span className="text-xs text-neutral-400">₦{subtotal.toLocaleString()} / ₦{FREE_SHIPPING_THRESHOLD.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-pink to-brand-pink-pale rounded-full transition-all duration-700 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <Check className="w-4 h-4" />
            You&apos;ve unlocked free shipping! 🎉
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">
        {/* items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, index) => {
            const isRemoving = removingIds.includes(item.productId)
            return (
              <div
                key={item.productId}
                className={`flex gap-4 p-4 border border-neutral-100 rounded-card transition-all duration-300 ${
                  isRemoving
                    ? "opacity-0 -translate-x-full scale-95"
                    : "animate-fade-up"
                }`}
                style={{ animationDelay: isRemoving ? "0ms" : `${index * 60}ms` }}
              >
                {/* image */}
                <Link
                  href={`/shop/${item.productId}`}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-card overflow-hidden bg-neutral-100 relative shrink-0 hover:ring-2 hover:ring-brand-pink/20 transition-all duration-200"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${item.productId}`}
                        className="text-sm font-semibold text-neutral-900 hover:text-brand-pink transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeWithAnimation(item.productId, item.name)}
                        className="text-neutral-300 hover:text-red-500 transition-colors p-1 active:scale-90 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-semibold text-neutral-900">
                        ₦{item.price.toLocaleString()}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-xs text-neutral-400">
                          × {item.qty} = <span className="font-medium text-neutral-700">₦{(item.price * item.qty).toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      {/* quantity */}
                      <div className="flex items-center border border-neutral-200 rounded-btn overflow-hidden">
                        <button
                          aria-label="Decrease"
                          disabled={item.qty <= 1}
                          onClick={() =>
                            dispatch(updateQty({ productId: item.productId, qty: item.qty - 1 }))
                          }
                          className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-all active:scale-90"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-neutral-900 select-none tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          aria-label="Increase"
                          disabled={item.qty >= item.stock}
                          onClick={() =>
                            dispatch(updateQty({ productId: item.productId, qty: item.qty + 1 }))
                          }
                          className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-all active:scale-90"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* gift wrap */}
                      <button
                        onClick={() => dispatch(toggleGiftWrap(item.productId))}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-pill border transition-all duration-200 ${
                          item.giftWrap
                            ? "border-brand-pink bg-brand-pink-light text-brand-pink"
                            : "border-neutral-200 text-neutral-400 hover:border-brand-pink-pale hover:text-brand-pink"
                        }`}
                      >
                        <Gift className="w-3 h-3" />
                        {item.giftWrap ? "Gift wrapped" : "Gift wrap"}
                      </button>
                    </div>

                    {/* line total */}
                    <p className="text-base font-bold text-neutral-900 tabular-nums">
                      ₦{(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* mobile continue shopping */}
          <Link
            href="/shop"
            className="sm:hidden flex items-center justify-center gap-2 text-sm font-medium text-brand-pink py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* order summary */}
        <div className="bg-neutral-50 rounded-card p-5 sm:p-6 sticky top-24 border border-neutral-100">
          <h2 className="font-display text-lg font-bold text-neutral-900 mb-5">
            Order Summary
          </h2>

          {/* promo code */}
          <div className="flex gap-2 mb-5">
            <div className="flex-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && promoInput.trim()) {
                    setPromo(promoInput.trim())
                    setPromoInput("")
                  }
                }}
                placeholder="Promo code"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-neutral-200 rounded-btn bg-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/20 transition-all placeholder:text-neutral-300"
              />
            </div>
            <button
              onClick={() => {
                if (promoInput.trim()) {
                  setPromo(promoInput.trim())
                  setPromoInput("")
                }
              }}
              disabled={!promoInput.trim()}
              className="px-5 py-2.5 text-sm font-semibold border border-neutral-200 rounded-btn bg-white hover:border-brand-pink hover:text-brand-pink disabled:opacity-40 transition-all active:scale-95"
            >
              Apply
            </button>
          </div>
          {promo && (
            <div className="flex items-center justify-between text-xs text-emerald-600 font-medium mb-4 -mt-2">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {promo.label} — <span className="font-mono">{promo.code}</span>
              </span>
              <button onClick={clearPromo} className="text-neutral-400 hover:text-red-500 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* line items */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
              <span className="font-medium text-neutral-900 tabular-nums">₦{subtotal.toLocaleString()}</span>
            </div>
            {giftWrapTotal > 0 && (
              <div className="flex justify-between text-brand-pink">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  Gift wrapping ({items.filter(i => i.giftWrap).length} {items.filter(i => i.giftWrap).length === 1 ? "item" : "items"})
                </span>
                <span className="font-medium tabular-nums">₦{giftWrapTotal.toLocaleString()}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Discount
                </span>
                <span className="font-medium tabular-nums">-₦{promoDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-emerald-600 font-medium" : "tabular-nums"}>
                {shipping === 0 ? "Free ✓" : `₦${shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Tax</span>
              <span className="text-neutral-400">Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-neutral-200 my-4 pt-4">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-neutral-900">Estimated Total</span>
              <span className="text-xl font-extrabold text-neutral-900 tabular-nums">₦{total.toLocaleString()}</span>
            </div>
            {promoDiscount > 0 && (
              <p className="text-xs text-emerald-600 text-right mt-1">
                You&apos;re saving ₦{promoDiscount.toLocaleString()}!
              </p>
            )}
          </div>

          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-brand-pink text-white text-sm font-semibold py-3.5 rounded-btn hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.98] transition-all duration-300"
          >
            <CreditCard className="w-4 h-4" />
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="hidden sm:flex items-center justify-center w-full text-center text-xs text-neutral-500 mt-3 hover:text-brand-pink transition-colors py-2"
          >
            Continue Shopping
          </Link>

          {/* trust badges */}
          <div className="mt-5 pt-4 border-t border-neutral-200 space-y-2.5">
            {[
              { icon: Shield, label: "Secure checkout with SSL encryption" },
              { icon: RotateCcw, label: "30-day hassle-free returns" },
              { icon: Truck, label: "Free shipping on orders over ₦112,500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-[11px] text-neutral-500">
                <item.icon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
