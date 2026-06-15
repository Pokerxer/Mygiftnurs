"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Gift,
  Truck,
  Tag,
  Check,
  ChevronRight,
  Package,
  CreditCard,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  toggleDrawer,
  updateQty,
  toggleGiftWrap,
  GIFT_WRAP_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/store/slices/cartSlice"
import { useCart } from "@/hooks/useCart"
import type { RootState } from "@/store/index"

export default function CartDrawer() {
  const dispatch = useDispatch()
  const { items, isDrawerOpen } = useSelector((state: RootState) => state.cart)
  const {
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

  const [promoInput, setPromoInput] = useState("")
  const [promoError, setPromoError] = useState("")
  const [swipeX, setSwipeX] = useState(0)
  const touchStart = useRef({ x: 0, y: 0 })
  const drawerRef = useRef<HTMLDivElement>(null)

  // body scroll lock
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"
      setSwipeX(0)
      setPromoInput("")
      setPromoError("")
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
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

  const handlePromo = () => {
    if (!promoInput.trim()) return
    setPromoError("")
    setPromo(promoInput.trim())
    // check if promo was set successfully
    setTimeout(() => {
      const state = (window as any).__REDUX_STORE__?.getState?.()
      // fallback: just let the user see the result
    }, 0)
    setPromoInput("")
  }

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(toggleDrawer())}
        aria-hidden
      />

      {/* drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-all duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transform: isDrawerOpen
            ? `translateX(${swipeX}px)`
            : undefined,
          transition: swipeX > 0 ? "none" : undefined,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
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
              <ShoppingBag className="w-4 h-4 text-brand-pink" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-neutral-900">
                Your Cart
              </h2>
              <p className="text-[11px] text-neutral-400">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            aria-label="Close cart"
            onClick={() => dispatch(toggleDrawer())}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-90 transition-all"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* free shipping progress bar */}
        <div className="px-5 py-3 border-b border-neutral-100">
          {amountToFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="flex items-center gap-1 text-neutral-500">
                  <Truck className="w-3 h-3" />
                  Add <span className="font-semibold text-brand-pink">₦{amountToFreeShipping.toLocaleString()}</span> for free shipping
                </span>
                <span className="text-neutral-400">₦{subtotal.toLocaleString()} / ₦{FREE_SHIPPING_THRESHOLD.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-pink to-brand-pink-pale rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
              <Check className="w-3.5 h-3.5" />
              You&apos;ve unlocked free shipping!
            </div>
          )}
        </div>

        {/* items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-brand-pink-light flex items-center justify-center animate-bounce-subtle">
                <Package className="w-9 h-9 text-brand-pink" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center">
                <span className="text-lg">🎁</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-neutral-900">Your cart is empty</p>
              <p className="text-sm text-neutral-400 mt-1">Find something special for someone special</p>
            </div>
            <Link
              href="/shop"
              onClick={() => dispatch(toggleDrawer())}
              className="bg-brand-pink text-white px-6 py-3 rounded-pill font-medium text-sm hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Shopping <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item, index) => {
                const isRemoving = removingIds.includes(item.productId)
                return (
                  <div
                    key={item.productId}
                    className={`flex gap-3 p-3 rounded-card border border-neutral-100 transition-all duration-300 ${
                      isRemoving
                        ? "opacity-0 -translate-x-full scale-95"
                        : "animate-slide-in-right"
                    }`}
                    style={{ animationDelay: isRemoving ? "0ms" : `${index * 50}ms` }}
                  >
                    {/* image */}
                    <Link
                      href={`/shop/${item.productId}`}
                      onClick={() => dispatch(toggleDrawer())}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-card overflow-hidden bg-neutral-100 relative shrink-0 hover:ring-2 hover:ring-brand-pink/20 transition-all duration-200"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/shop/${item.productId}`}
                            onClick={() => dispatch(toggleDrawer())}
                            className="text-sm font-semibold text-neutral-900 hover:text-brand-pink transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeWithAnimation(item.productId, item.name)}
                            className="text-neutral-300 hover:text-red-500 transition-colors p-0.5 active:scale-90 shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm font-semibold text-neutral-900">
                            ₦{item.price.toLocaleString()}
                          </p>
                          {item.qty > 1 && (
                            <p className="text-[11px] text-neutral-400">
                              × {item.qty} = ₦{(item.price * item.qty).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {/* gift wrap */}
                        <button
                          onClick={() => dispatch(toggleGiftWrap(item.productId))}
                          className={`inline-flex items-center gap-1 mt-2 text-[11px] font-medium px-2.5 py-1 rounded-pill border transition-all duration-200 ${
                            item.giftWrap
                              ? "border-brand-pink bg-brand-pink-light text-brand-pink"
                              : "border-neutral-200 text-neutral-400 hover:border-brand-pink-pale hover:text-brand-pink"
                          }`}
                        >
                          <Gift className="w-3 h-3" />
                          {item.giftWrap ? "Gift wrapped" : "Gift wrap"}
                        </button>
                      </div>

                      {/* quantity */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-btn overflow-hidden">
                          <button
                            aria-label="Decrease"
                            disabled={item.qty <= 1}
                            onClick={() =>
                              dispatch(updateQty({ productId: item.productId, qty: item.qty - 1 }))
                            }
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-all active:scale-90"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-neutral-900 select-none tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            aria-label="Increase"
                            disabled={item.qty >= item.stock}
                            onClick={() =>
                              dispatch(updateQty({ productId: item.productId, qty: item.qty + 1 }))
                            }
                            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-all active:scale-90"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-neutral-900">
                          ₦{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* footer */}
            <div className="border-t border-neutral-100 px-5 py-4 space-y-3">
              {/* promo code */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value.toUpperCase())
                      setPromoError("")
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                    placeholder="Promo code"
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-200 rounded-btn focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/20 transition-all placeholder:text-neutral-300"
                  />
                </div>
                <button
                  onClick={handlePromo}
                  disabled={!promoInput.trim()}
                  className="px-4 py-2.5 text-xs font-semibold border border-neutral-200 rounded-btn hover:border-brand-pink hover:text-brand-pink disabled:opacity-40 transition-all active:scale-95"
                >
                  Apply
                </button>
              </div>
              {promo && (
                <div className="flex items-center justify-between text-[11px] text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {promo.label} — {promo.code}
                  </span>
                  <button onClick={clearPromo} className="text-neutral-400 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500">{promoError}</p>
              )}

              {/* summary */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₦{subtotal.toLocaleString()}</span>
                </div>
                {giftWrapTotal > 0 && (
                  <div className="flex justify-between text-brand-pink">
                    <span className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      Gift wrapping
                    </span>
                    <span className="tabular-nums">₦{giftWrapTotal.toLocaleString()}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Discount
                    </span>
                    <span className="tabular-nums">-₦{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                    {shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-base font-bold text-neutral-900 pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span className="tabular-nums">₦{total.toLocaleString()}</span>
              </div>

              {/* action buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => dispatch(toggleDrawer())}
                  className="flex items-center justify-center gap-2 w-full bg-brand-pink text-white text-sm font-semibold py-3.5 rounded-btn hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.98] transition-all duration-300"
                >
                  <CreditCard className="w-4 h-4" />
                  Checkout — ₦{total.toLocaleString()}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => dispatch(toggleDrawer())}
                  className="flex items-center justify-center w-full bg-neutral-900 text-white text-sm font-semibold py-3 rounded-btn hover:bg-neutral-800 active:scale-[0.98] transition-all duration-300"
                >
                  View Full Cart
                </Link>
              </div>

              {/* trust */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </span>
                <span>•</span>
                <span>30-day returns</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
