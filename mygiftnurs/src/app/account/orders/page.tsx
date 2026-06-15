"use client"

import Link from "next/link"
import {
  Package,
  ChevronRight,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react"

const statusConfig = {
  pending: { label: "Processing", icon: Clock, color: "text-brand-gold bg-brand-gold-light" },
  shipped: { label: "Shipped", icon: Truck, color: "text-blue-600 bg-blue-50" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  cancelled: { label: "Cancelled", icon: Package, color: "text-red-500 bg-red-50" },
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
          My Orders
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Track and manage your orders.
        </p>
      </div>

      {/* placeholder */}
      <div className="bg-white rounded-card border border-neutral-100 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-neutral-300" />
        </div>
        <h2 className="font-display text-lg font-bold text-neutral-900 mb-2">
          No orders yet
        </h2>
        <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
          When you place an order, you&apos;ll see it here with real-time
          status updates and tracking information.
        </p>

        {/* order status steps illustration */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 max-w-md mx-auto">
          {[
            { icon: ShoppingBag, label: "Placed" },
            { icon: Clock, label: "Processing" },
            { icon: Truck, label: "Shipped" },
            { icon: CheckCircle, label: "Delivered" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                  <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300" />
                </div>
                <span className="text-[10px] text-neutral-400">{step.label}</span>
              </div>
              {i < 3 && (
                <div className="w-6 sm:w-10 h-px bg-neutral-200 mb-5" />
              )}
            </div>
          ))}
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-brand-pink text-white text-sm font-semibold px-6 py-3 rounded-pill hover:bg-brand-pink/90 active:scale-[0.97] transition-all duration-200"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  )
}
