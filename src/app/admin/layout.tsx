"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, ShoppingCart, Users, BarChart3, ShieldAlert, LogOut, Settings } from "lucide-react"
import Logo from "@/components/ui/Logo"

const navItems = [
  { label: "Overview", href: "/admin", icon: BarChart3 },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Users", href: "/admin/users", icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/admin")
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/account")
    }
  }, [status, session, router])

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-brand-pink-light via-white to-brand-pink-banner">
        <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session || session.user?.role !== "admin") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gradient-to-br from-brand-pink-light via-white to-brand-pink-banner">
        <div className="bg-white rounded-card border border-neutral-100 p-8 text-center shadow-lg max-w-sm w-full">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7 text-red-400" />
          </div>
          <h1 className="font-display text-xl font-bold text-neutral-900 mb-2">
            Access Denied
          </h1>
          <p className="text-neutral-500 text-sm mb-6">
            You need admin privileges to access this page.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-pink text-white text-sm font-semibold px-6 py-2.5 rounded-pill hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.97] transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const initials = session.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A"

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-neutral-100/50">
      {/* sidebar */}
      <aside className="w-60 shrink-0 border-r border-brand-pink/10 bg-gradient-to-b from-white via-brand-pink-light/20 to-white hidden md:flex flex-col">
        {/* logo */}
        <div className="p-5 border-b border-brand-pink/10">
          <Link href="/admin">
            <Logo size="sm" />
          </Link>
          <p className="text-[10px] font-semibold text-brand-pink uppercase tracking-widest mt-2">
            Admin Panel
          </p>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-pink text-white shadow-md shadow-brand-pink/20"
                    : "text-neutral-600 hover:bg-brand-pink-light hover:text-brand-pink"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* user card */}
        <div className="p-3 border-t border-brand-pink/10">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-btn bg-brand-pink-light/40">
            {session.user?.image ? (
              <div className="w-8 h-8 rounded-full overflow-hidden relative ring-2 ring-white">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Admin"}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {session.user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">
                {session.user?.email}
              </p>
            </div>
            <button
              onClick={() => {
                import("next-auth/react").then(({ signOut }) => signOut({ callbackUrl: "/" }))
              }}
              className="text-neutral-400 hover:text-red-500 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* main content */}
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        {/* mobile header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-brand-pink bg-brand-pink-light px-2.5 py-1 rounded-pill">
              Admin
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
