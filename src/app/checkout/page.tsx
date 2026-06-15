"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
  Loader2,
} from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "@/store/slices/cartSlice"
import type { RootState } from "@/store/index"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GIFT_WRAP_PRICE, FREE_SHIPPING_THRESHOLD } from "@/store/slices/cartSlice"

type Step = "shipping" | "payment" | "review"

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: any) => { openIframe: () => void }
    }
  }
}

function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="js.paystack.co/v1/inline.js"]')) {
      resolve(true)
      return
    }
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.head.appendChild(script)
  })
}

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)
  const promo = useSelector((state: RootState) => state.cart.promo)
  const [step, setStep] = useState<Step>("shipping")
  const [processing, setProcessing] = useState(false)

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  })

  const shippingValid =
    shipping.firstName &&
    shipping.lastName &&
    shipping.address &&
    shipping.city &&
    shipping.state &&
    shipping.zip &&
    shipping.email

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const giftWrapTotal = items.filter((i) => i.giftWrap).reduce((sum, i) => sum + i.qty * GIFT_WRAP_PRICE, 0)
  const promoDiscount = promo
    ? promo.code === "GIFTFREE"
      ? giftWrapTotal
      : subtotal * (promo.discount / 100)
    : 0
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + giftWrapTotal - promoDiscount + shippingCost + tax

  const isEmpty = items.length === 0

  const handlePay = async () => {
    if (!shippingValid) {
      toast.error("Please fill in all shipping fields")
      setStep("shipping")
      return
    }

    setProcessing(true)

    const loaded = await loadPaystackScript()
    if (!loaded || !window.PaystackPop) {
      toast.error("Failed to load payment gateway. Please try again.")
      setProcessing(false)
      return
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email: shipping.email,
      amount: Math.round(total * 100),
      currency: "NGN",
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: `${shipping.firstName} ${shipping.lastName}` },
          { display_name: "Phone", variable_name: "phone", value: shipping.phone },
        ],
      },
      callback: async (response: { reference: string }) => {
        try {
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: response.reference,
              items: items.map((i) => ({
                productId: i.productId,
                name: i.name,
                image: i.image,
                price: i.price,
                qty: i.qty,
              })),
              shipping,
              subtotal,
              shipping_cost: shippingCost,
              tax,
              total,
            }),
          })

          const data = await res.json()

          if (data.success) {
            dispatch(clearCart())
            toast.success("Payment successful! 🎉", {
              description: `Order ${data.orderId.slice(-8).toUpperCase()} confirmed`,
            })
            router.push(`/checkout/success?orderId=${data.orderId}`)
          } else {
            toast.error(data.error || "Order processing failed")
          }
        } catch {
          toast.error("Something went wrong. Please contact support.")
        } finally {
          setProcessing(false)
        }
      },
      onClose: () => {
        setProcessing(false)
      },
    })

    handler.openIframe()
  }

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold text-neutral-900 mb-2">
          Nothing to check out
        </h1>
        <p className="text-neutral-500 mb-8">Add some items to your cart first.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-semibold px-6 py-3 rounded-btn hover:bg-brand-pink transition-colors"
        >
          Browse Gifts
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-pink transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3">
          <h1 className="font-display text-3xl font-extrabold text-neutral-900 mb-8">
            Checkout
          </h1>

          {/* step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {(["shipping", "payment", "review"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s
                      ? "bg-brand-pink text-white"
                      : i < ["shipping", "payment", "review"].indexOf(step)
                        ? "bg-green-500 text-white"
                        : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  {i < ["shipping", "payment", "review"].indexOf(step) ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm font-medium capitalize hidden sm:block ${
                    step === s ? "text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  {s}
                </span>
                {i < 2 && <div className="w-6 h-px bg-neutral-200" />}
              </div>
            ))}
          </div>

          {/* shipping */}
          {step === "shipping" && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={shipping.firstName}
                    onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={shipping.lastName}
                    onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Gift Lane"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="San Francisco"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="CA"
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="zip">ZIP code</Label>
                  <Input
                    id="zip"
                    placeholder="94105"
                    value={shipping.zip}
                    onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={shipping.phone}
                  onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                />
              </div>
              <button
                onClick={() => setStep("payment")}
                className="w-full bg-neutral-900 text-white text-sm font-semibold py-3 rounded-btn hover:bg-brand-pink transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* payment */}
          {step === "payment" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-card bg-white">
                <CreditCard className="w-5 h-5 text-brand-pink" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Pay with Card</p>
                  <p className="text-xs text-neutral-500">
                    Visa, Mastercard, Verve — processed by Paystack
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-card bg-pink-50 border border-brand-pink/20">
                <p className="text-sm text-neutral-700">
                  You&apos;ll be redirected to a secure Paystack payment page to complete your
                  payment of <strong className="text-neutral-900">${total.toFixed(2)}</strong>.
                </p>
              </div>

              <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                256-bit SSL encryption — your payment is secure
              </p>

              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full bg-brand-pink text-white text-sm font-semibold py-3 rounded-btn hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </button>

              <button
                onClick={() => setStep("review")}
                className="w-full text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Back to Review
              </button>
            </div>
          )}

          {/* review */}
          {step === "review" && (
            <div className="space-y-5">
              <div className="p-4 rounded-card border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-neutral-900">Shipping To</h3>
                  <button
                    onClick={() => setStep("shipping")}
                    className="text-xs text-brand-pink hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-xs text-neutral-700">
                  {shipping.firstName} {shipping.lastName}
                </p>
                <p className="text-xs text-neutral-700">
                  {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}
                </p>
                <p className="text-xs text-neutral-700">{shipping.email}</p>
              </div>

              <div className="p-4 rounded-card border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-neutral-900">Payment</h3>
                  <button
                    onClick={() => setStep("payment")}
                    className="text-xs text-brand-pink hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-xs text-neutral-700">Pay with Paystack</p>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-card overflow-hidden bg-white relative shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-xs font-semibold text-neutral-900 shrink-0">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full bg-brand-pink text-white text-sm font-semibold py-3 rounded-btn hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-neutral-400 text-center">
                By placing this order you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>

        {/* summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-100 rounded-card p-6 sticky top-24">
            <h2 className="font-display text-lg font-bold text-neutral-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="w-12 h-12 rounded-card overflow-hidden bg-white relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-900 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">Qty: {item.qty}</p>
                  </div>
                  <p className="text-xs font-semibold text-neutral-900 shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="bg-neutral-300" />

            <div className="space-y-2 text-sm mt-4">
              <div className="flex justify-between text-neutral-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {giftWrapTotal > 0 && (
                <div className="flex justify-between text-neutral-700">
                  <span>Gift Wrap</span>
                  <span>${giftWrapTotal.toFixed(2)}</span>
                </div>
              )}
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{promo?.label}</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-700">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="bg-neutral-300 my-3" />

            <div className="flex justify-between text-base font-bold text-neutral-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
              <Truck className="w-3.5 h-3.5" />
              {shippingCost === 0
                ? "Free shipping on this order"
                : `$${shippingCost.toFixed(2)} shipping — free over $75`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
