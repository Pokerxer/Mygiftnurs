"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronDown, Heart, ShoppingBag, Home, Package, Calendar, User, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"
import { toggleDrawer } from "@/store/slices/cartSlice"
import type { RootState } from "@/store/index"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navSections = [
  {
    title: "Navigation",
    icon: Home,
    links: [
      { label: "Home", href: "/" },
      { label: "Shop All", href: "/shop" },
      { label: "Personalized", href: "/shop?q=personalized" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Deals", href: "/deals" },
    ],
  },
  {
    title: "Categories",
    icon: Package,
    links: [
      { label: "Personalized Gifts", href: "/shop?category=personalized" },
      { label: "Birthday Gifts", href: "/shop?category=birthday" },
      { label: "Anniversary Gifts", href: "/shop?category=anniversary" },
      { label: "Gifts for Him", href: "/shop?category=for-him" },
      { label: "Gifts for Her", href: "/shop?category=for-her" },
      { label: "Graduation Gifts", href: "/shop?category=graduation" },
    ],
  },
  {
    title: "Occasions",
    icon: Calendar,
    links: [
      { label: "Wedding", href: "/shop?occasion=wedding" },
      { label: "Birthday", href: "/shop?occasion=birthday" },
      { label: "Anniversary", href: "/shop?occasion=anniversary" },
      { label: "Christmas", href: "/shop?occasion=christmas" },
      { label: "Valentine's Day", href: "/shop?occasion=valentines" },
      { label: "Mother's Day", href: "/shop?occasion=mothers-day" },
    ],
  },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0)
  )
  const [animating, setAnimating] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  // lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      setAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      const t = setTimeout(() => setAnimating(false), 300)
      return () => clearTimeout(t)
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href.split("?")[0])
  }

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* panel */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100">
          <Link href="/" className="flex items-center gap-1.5" onClick={onClose}>
            <span className="text-lg">🎁</span>
            <span className="font-display font-bold text-neutral-900 text-lg">my</span>
            <span className="font-display font-bold text-brand-pink text-lg">giftnurs</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* sections */}
        <div className="overflow-y-auto h-[calc(100%-136px)] pb-24">
          {navSections.map((section, si) => {
            const isExpanded = expandedSections.has(section.title)
            const SectionIcon = section.icon
            return (
              <div
                key={section.title}
                className="border-b border-neutral-100"
                style={{ animation: animating ? `fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both ${si * 0.08}s` : "none" }}
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center gap-3 w-full px-5 py-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  <SectionIcon className="w-4 h-4 text-brand-pink" />
                  <span className="flex-1 text-left">{section.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="px-5 pb-3 space-y-0.5">
                    {section.links.map((link, li) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all ${
                            isActive(link.href)
                              ? "text-brand-pink bg-brand-pink-light font-medium"
                              : "text-neutral-600 hover:text-brand-pink hover:bg-brand-pink-light"
                          }`}
                          style={{ animation: isExpanded ? `fade-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) both ${li * 0.04}s` : "none" }}
                        >
                          {isActive(link.href) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                          )}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-100 bg-white p-4 space-y-3">
          {/* account link */}
          <Link
            href={session ? "/account" : "/auth/signin"}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            {session?.user?.image ? (
              <div className="w-8 h-8 rounded-full overflow-hidden relative">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Account"}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-pink-light flex items-center justify-center">
                <User className="w-4 h-4 text-brand-pink" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {session ? (
                <>
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {session.user?.name || "My Account"}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {session.user?.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-neutral-900">
                    Sign In
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Access your account
                  </p>
                </>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/account/wishlist"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Wishlist
            </Link>
            <button
              onClick={() => {
                dispatch(toggleDrawer())
                onClose()
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-brand-pink rounded-xl hover:bg-brand-pink/90 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
