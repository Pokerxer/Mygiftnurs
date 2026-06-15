"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import {
  Package,
  Heart,
  ShoppingBag,
  User,
  ChevronRight,
  Clock,
  Truck,
  CheckCircle,
  MapPin,
} from "lucide-react"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"

export default function AccountPage() {
  const { data: session } = useSession()
  const { count: wishlistCount } = useWishlist()
  const { count: cartCount, subtotal } = useCart()

  const user = session?.user
  const firstName = user?.name?.split(" ")[0] || "there"

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* greeting */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Welcome back, {firstName}!
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage your orders, wishlist, and account settings.
        </p>
      </div>

      {/* quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: "Cart Items",
            value: cartCount,
            icon: ShoppingBag,
            color: "bg-brand-pink-light",
            iconColor: "text-brand-pink",
            href: "/cart",
          },
          {
            label: "Wishlist",
            value: wishlistCount,
            icon: Heart,
            color: "bg-brand-rose-light",
            iconColor: "text-brand-rose",
            href: "/account/wishlist",
          },
          {
            label: "Orders",
            value: 0,
            icon: Package,
            color: "bg-brand-gold-light",
            iconColor: "text-brand-gold",
            href: "/account/orders",
          },
          {
            label: "Cart Total",
            value: `$${subtotal.toFixed(0)}`,
            icon: MapPin,
            color: "bg-neutral-100",
            iconColor: "text-neutral-600",
            href: "/cart",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-card border border-neutral-100 p-4 hover-glow group block"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-900">
                  {stat.value}
                </p>
                <p className="text-[11px] text-neutral-400">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* recent orders placeholder */}
      <div className="bg-white rounded-card border border-neutral-100 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-neutral-900">
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="text-xs font-medium text-brand-pink hover:underline flex items-center gap-1"
          >
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="text-center py-10">
          <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-sm text-neutral-500">No orders yet</p>
          <p className="text-xs text-neutral-400 mt-1">
            When you place an order, it will appear here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-4 bg-brand-pink text-white text-xs font-semibold px-5 py-2.5 rounded-pill hover:bg-brand-pink/90 active:scale-[0.97] transition-all duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>

      {/* quick actions */}
      <div className="bg-white rounded-card border border-neutral-100 p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/shop"
            className="flex items-center gap-3 p-3 rounded-card border border-neutral-100 hover:border-brand-pink/20 hover:bg-brand-pink-light/20 transition-all duration-200 group"
          >
            <div className="w-9 h-9 bg-brand-pink-light rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4 text-brand-pink" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Browse Gifts
              </p>
              <p className="text-[11px] text-neutral-400">
                Explore our curated collection
              </p>
            </div>
          </Link>

          <Link
            href="/account/profile"
            className="flex items-center gap-3 p-3 rounded-card border border-neutral-100 hover:border-brand-pink/20 hover:bg-brand-pink-light/20 transition-all duration-200 group"
          >
            <div className="w-9 h-9 bg-brand-gold-light rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <User className="w-4 h-4 text-brand-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Edit Profile
              </p>
              <p className="text-[11px] text-neutral-400">
                Update your name and details
              </p>
            </div>
          </Link>

          <Link
            href="/deals"
            className="flex items-center gap-3 p-3 rounded-card border border-neutral-100 hover:border-brand-pink/20 hover:bg-brand-pink-light/20 transition-all duration-200 group"
          >
            <div className="w-9 h-9 bg-brand-rose-light rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Truck className="w-4 h-4 text-brand-rose" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Check Deals
              </p>
              <p className="text-[11px] text-neutral-400">
                See what&apos;s on sale today
              </p>
            </div>
          </Link>

          <Link
            href="/account/wishlist"
            className="flex items-center gap-3 p-3 rounded-card border border-neutral-100 hover:border-brand-pink/20 hover:bg-brand-pink-light/20 transition-all duration-200 group"
          >
            <div className="w-9 h-9 bg-neutral-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                My Wishlist
              </p>
              <p className="text-[11px] text-neutral-400">
                {wishlistCount} saved items
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
