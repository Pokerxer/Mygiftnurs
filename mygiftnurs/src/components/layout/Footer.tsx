"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Send,
  Phone,
  MapPin,
  Timer,
  ChevronDown,
  ArrowUp,
} from "lucide-react"
import Logo from "@/components/ui/Logo"

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Personalized Gifts", href: "/shop?q=personalized" },
      { label: "Birthday Gifts", href: "/shop?category=birthday" },
      { label: "Anniversary Gifts", href: "/shop?category=anniversary" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Deals & Offers", href: "/deals" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Track Order", href: "/account/orders" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Dashboard", href: "/account" },
      { label: "My Orders", href: "/account/orders" },
      { label: "My Wishlist", href: "/account/wishlist" },
      { label: "Edit Profile", href: "/account/profile" },
      { label: "Sign In", href: "/auth/signin" },
    ],
  },
]

const paymentMethods = [
  { name: "Visa", icon: "/images/payments/visa.svg" },
  { name: "Mastercard", icon: "/images/payments/mastercard.svg" },
  { name: "Verve", icon: "/images/payments/verve.svg" },
  { name: "Bank Transfer", icon: "/images/payments/bank.svg" },
]

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-neutral-900 text-white mt-auto relative">
      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-brand-pink via-brand-pink-pale to-brand-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top section: Newsletter + Contact */}
        <div className="py-8 sm:py-10 border-b border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-brand-pink" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Join our newsletter</h3>
                <p className="text-neutral-400 text-sm mb-3">
                  Get 10% off your first order + gift ideas straight to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-neutral-800 text-sm text-white placeholder:text-neutral-500 rounded-xl px-4 py-2.5 border border-neutral-700 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-brand-pink text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-pink/90 active:scale-[0.98] transition-all shrink-0"
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-brand-pink" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Call us</p>
                  <p className="text-sm text-white">+234 800 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                  <Timer className="w-4 h-4 text-brand-pink" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Hours</p>
                  <p className="text-sm text-white">Mon – Sat, 9am – 6pm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand-pink" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm text-white">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main section: Logo + Links */}
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Brand column */}
            <div className="md:col-span-4">
              <div className="[&_span.text-neutral-900]:!text-white [&_span.text-neutral-900]:transition-colors [&_span.text-neutral-900]:group-hover/logo:!text-brand-pink">
                <Logo size="sm" />
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mt-4 mb-6 max-w-xs">
                Your one-stop shop for thoughtful gifts that create lasting memories. Every occasion, every person, the perfect gift.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-brand-pink hover:text-white transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns — desktop */}
            <div className="hidden md:grid md:col-span-8 grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-neutral-300">
                    {section.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-neutral-400 hover:text-brand-pink text-sm transition-colors inline-flex items-center gap-1 group"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Link columns — mobile accordion */}
            <div className="md:hidden space-y-0 border-t border-neutral-800">
              {footerSections.map((section) => (
                <div key={section.title} className="border-b border-neutral-800">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full py-4 text-left"
                  >
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-neutral-300">
                      {section.title}
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                        openSection === section.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === section.title ? "max-h-80 pb-4" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2.5">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-neutral-400 hover:text-brand-pink text-sm transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-neutral-500">
            <span>&copy; {new Date().getFullYear()} mygiftnurs. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Payment icons */}
            <div className="flex items-center gap-2">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.name}
                  className="w-10 h-7 bg-neutral-800 rounded-md flex items-center justify-center"
                  title={pm.name}
                >
                  <span className="text-[9px] font-bold text-neutral-400 uppercase">
                    {pm.name.slice(0, 3)}
                  </span>
                </div>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-brand-pink hover:text-white transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
