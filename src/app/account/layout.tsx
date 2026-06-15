"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  ChevronRight,
  Home,
} from "lucide-react"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"

const navItems = [
  { label: "Dashboard", href: "/account", icon: Home },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { count: wishlistCount } = useWishlist()
  const { count: cartCount } = useCart()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [status, router, pathname])

  if (status === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return null

  const user = session.user
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U"

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
            My Account
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-card border border-neutral-100 overflow-hidden">
            {/* user card */}
            <div className="p-5 border-b border-neutral-100 bg-gradient-to-br from-brand-pink-light to-white">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-white shadow-sm">
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* nav links */}
            <nav className="p-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand-pink-light text-brand-pink"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.href === "/account/wishlist" && wishlistCount > 0 && (
                      <span className="bg-brand-pink text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                )
              })}

              <div className="border-t border-neutral-100 my-2" />

              <Link
                href="/shop"
                className="flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="flex-1">Continue Shopping</span>
                {cartCount > 0 && (
                  <span className="bg-neutral-200 text-neutral-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => {
                  import("next-auth/react").then(({ signOut }) =>
                    signOut({ callbackUrl: "/" })
                  )
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* main content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
