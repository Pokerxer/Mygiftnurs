"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Heart, Search, ShoppingBag, User, Menu } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleDrawer } from "@/store/slices/cartSlice"
import { openDrawer } from "@/store/slices/wishlistSlice"
import type { RootState } from "@/store/index"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import MobileMenu from "./MobileMenu"
import Logo from "@/components/ui/Logo"
import SearchDialog from "@/components/ui/SearchDialog"

const navLinks: { label: string; href: string; badge?: string; dropdown?: { label: string; href: string }[] }[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/categories",
    dropdown: [
      { label: "Personalized Gifts", href: "/shop?category=personalized" },
      { label: "Birthday Gifts", href: "/shop?category=birthday" },
      { label: "Anniversary Gifts", href: "/shop?category=anniversary" },
      { label: "Gifts for Him", href: "/shop?category=for-him" },
      { label: "Gifts for Her", href: "/shop?category=for-her" },
      { label: "Graduation Gifts", href: "/shop?category=graduation" },
    ],
  },
  {
    label: "Occasions",
    href: "/occasions",
    dropdown: [
      { label: "Wedding", href: "/shop?occasion=wedding" },
      { label: "Birthday", href: "/shop?occasion=birthday" },
      { label: "Anniversary", href: "/shop?occasion=anniversary" },
      { label: "Christmas", href: "/shop?occasion=christmas" },
      { label: "Valentine's Day", href: "/shop?occasion=valentines" },
      { label: "Mother's Day", href: "/shop?occasion=mothers-day" },
    ],
  },
  { label: "New In", href: "/shop?sort=newest" },
  { label: "Deals", href: "/deals", badge: "Sale" },
]

export default function Navbar() {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0)
  )
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/"
      return pathname.startsWith(href.split("?")[0])
    },
    [pathname]
  )

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-neutral-100/50"
            : "bg-white border-b border-transparent"
        }`}
      >
        <nav>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            {/* left */}
            <div className="flex items-center gap-8">
              <Logo size="sm" />

              {/* desktop nav */}
              <div className="hidden lg:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    {navLinks.map((link) =>
                      link.dropdown ? (
                        <NavigationMenuItem key={link.label}>
                          <NavigationMenuTrigger
                            className={`text-sm font-medium h-auto px-3 py-1 relative ${
                              isActive(link.href)
                                ? "text-brand-pink"
                                : "text-neutral-700"
                            } hover:text-brand-pink transition-colors group/trigger`}
                          >
                            {link.label}
                            {link.badge && (
                              <span className="ml-1.5 text-[10px] font-bold bg-brand-pink text-white px-1.5 py-0.5 rounded-full leading-none">
                                {link.badge}
                              </span>
                            )}
                            <span
                              className={`absolute -bottom-0.5 left-3 right-3 h-0.5 bg-brand-pink rounded-full transition-transform duration-300 origin-left ${
                                isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover/trigger:scale-x-100"
                              }`}
                            />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-56 gap-0.5 p-3">
                              {link.dropdown.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:text-brand-pink hover:bg-brand-pink-light rounded-lg transition-colors"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-brand-pink-pale" />
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      ) : (
                        <NavigationMenuItem key={link.label}>
                          <Link
                            href={link.href}
                            className={`text-sm font-medium px-3 py-1 inline-flex items-center h-9 relative group/link ${
                              isActive(link.href)
                                ? "text-brand-pink"
                                : "text-neutral-700"
                            } hover:text-brand-pink transition-colors`}
                          >
                            {link.label}
                            {link.badge && (
                              <span className="ml-1.5 text-[10px] font-bold bg-brand-pink text-white px-1.5 py-0.5 rounded-full leading-none animate-pulse">
                                {link.badge}
                              </span>
                            )}
                            <span
                              className={`absolute -bottom-0.5 left-3 right-3 h-0.5 bg-brand-pink rounded-full transition-transform duration-300 origin-left ${
                                isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"
                              }`}
                            />
                          </Link>
                        </NavigationMenuItem>
                      )
                    )}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* right */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* search */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="text-neutral-700 hover:text-brand-pink transition-colors p-2.5 rounded-xl hover:bg-brand-pink-light group/search"
              >
                <Search className="w-[18px] h-[18px] transition-transform duration-200 group-hover/search:scale-110" />
              </button>

              {/* account */}
              <Link
                href="/account"
                aria-label="Account"
                className="text-neutral-700 hover:text-brand-pink transition-colors p-2.5 rounded-xl hover:bg-brand-pink-light hidden sm:flex items-center justify-center relative"
              >
                {session?.user?.image ? (
                  <div className="w-[18px] h-[18px] rounded-full overflow-hidden relative">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Account"}
                      fill
                      sizes="18px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <User className="w-[18px] h-[18px]" />
                )}
                {session?.user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
                )}
              </Link>

              {/* wishlist */}
              <button
                onClick={() => dispatch(openDrawer())}
                aria-label="Wishlist"
                className="text-neutral-700 hover:text-brand-pink transition-colors p-2.5 rounded-xl hover:bg-brand-pink-light relative active:scale-90"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-pink text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 border-2 border-white animate-pulse-once">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </button>

              {/* cart */}
              <button
                onClick={() => dispatch(toggleDrawer())}
                aria-label="Cart"
                className="text-neutral-700 hover:text-brand-pink transition-colors p-2.5 rounded-xl hover:bg-brand-pink-light relative"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-pink text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 border-2 border-white animate-bounce-subtle">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* mobile menu */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden text-neutral-700 hover:text-brand-pink p-2.5 rounded-xl hover:bg-brand-pink-light"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
