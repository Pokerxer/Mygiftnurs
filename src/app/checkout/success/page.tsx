"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { CheckCircle, Package, ArrowRight, Mail } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || ""

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="font-display text-3xl font-extrabold text-neutral-900 mb-3">
        Order Confirmed!
      </h1>

      <p className="text-neutral-500 mb-2">
        Thank you for your purchase. Your order is being prepared.
      </p>

      {orderId && (
        <p className="text-sm text-neutral-400 mb-8">
          Order ID:{" "}
          <span className="font-mono text-neutral-700">
            {orderId.slice(-8).toUpperCase()}
          </span>
        </p>
      )}

      <div className="bg-neutral-100 rounded-card p-6 mb-8 text-left space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-brand-pink mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-neutral-900">Confirmation email sent</p>
            <p className="text-xs text-neutral-500">
              You&apos;ll receive tracking details once your order ships.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-brand-pink mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-neutral-900">Processing your order</p>
            <p className="text-xs text-neutral-500">
              Most orders ship within 1–2 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white text-sm font-semibold px-6 py-3 rounded-btn hover:bg-brand-pink transition-colors"
        >
          View My Orders
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-700 text-sm font-semibold px-6 py-3 rounded-btn hover:border-brand-pink hover:text-brand-pink transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading order details...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
