import Link from "next/link"
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
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        {/* top: logo + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-8 md:gap-12">
          {/* brand + newsletter */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="[&_span.text-neutral-900]:!text-white [&_span.text-neutral-900]:transition-colors [&_span.text-neutral-900]:group-hover/logo:!text-brand-pink">
              <Logo size="sm" />
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mt-3 mb-5">
              Your one-stop shop for thoughtful gifts that create lasting memories. Every occasion, every person, the perfect gift.
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Stay in the loop</p>
              <form className="flex gap-2" action="#" method="post">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-neutral-800 text-sm text-white placeholder:text-neutral-500 rounded-lg px-3 py-2.5 border border-neutral-700 focus:outline-none focus:border-brand-pink transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-pink text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-pink/90 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-3 sm:mb-4 text-xs uppercase tracking-wider text-neutral-300">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-neutral-400 hover:text-brand-pink text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="border-t border-neutral-700/50 mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-neutral-500 text-xs sm:text-sm">&copy; 2026 mygiftnurs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-neutral-500 hover:text-neutral-300 text-xs sm:text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-neutral-500 hover:text-neutral-300 text-xs sm:text-sm transition-colors">Terms</Link>
            <Link href="/contact" className="text-neutral-500 hover:text-neutral-300 text-xs sm:text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
