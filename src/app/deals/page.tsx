import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Zap,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ArrowRight,
  Clock,
  ShoppingCart,
} from "lucide-react"
import { getDealProducts } from "@/lib/catalog"
import ProductCard from "@/components/products/ProductCard"
import ScrollReveal from "@/components/ui/ScrollReveal"
import NewsletterForm from "@/components/deals/NewsletterForm"

export const metadata: Metadata = {
  title: "Deals & Offers | mygiftnurs",
  description:
    "Save big on thoughtful gifts. Browse our curated deals on personalized, birthday, anniversary gifts and more.",
}

export default function DealsPage() {
  const deals = getDealProducts()
  const totalSaved = deals.reduce(
    (sum, p) => sum + (p.compareAtPrice! - p.price),
    0
  )

  return (
    <div className="min-h-screen">
      {/* hero */}
      <section className="relative bg-gradient-to-br from-brand-pink via-brand-pink to-brand-rose overflow-hidden">
        {/* decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[10%] w-20 h-20 bg-white/10 rounded-full blur-sm animate-float" />
          <div className="absolute top-20 right-[15%] w-14 h-14 bg-white/10 rounded-full blur-sm animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-16 left-[20%] w-16 h-16 bg-white/10 rounded-full blur-sm animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-10 right-[25%] w-10 h-10 bg-white/15 rounded-full blur-sm animate-float" style={{ animationDelay: "0.5s" }} />
          {/* sparkle dots */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-pill text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-up">
            <Zap className="w-3.5 h-3.5 fill-white" />
            Limited Time Offers
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Deals & Offers
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Save up to <span className="font-bold text-white">30% off</span> on
            our most-loved gifts. Grab them before they&apos;re gone!
          </p>

          {/* stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold">{deals.length}</p>
              <p className="text-xs text-white/60 mt-0.5">Active Deals</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold">
                ${totalSaved.toFixed(0)}
              </p>
              <p className="text-xs text-white/60 mt-0.5">Total Savings</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold">30%</p>
              <p className="text-xs text-white/60 mt-0.5">Max Discount</p>
            </div>
          </div>

          <a
            href="#deals-grid"
            className="inline-flex items-center gap-2 bg-white text-brand-pink text-sm font-semibold px-8 py-3.5 rounded-pill hover:bg-white/90 hover:shadow-lg active:scale-[0.97] transition-all duration-300 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Shop All Deals
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* urgency banner */}
      <div className="bg-neutral-900 text-white text-center py-3 px-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-brand-gold animate-pulse" />
          <span>
            <span className="font-semibold">Hurry!</span> These deals won&apos;t
            last forever. Shop now and save big.
          </span>
        </div>
      </div>

      {/* deals grid */}
      <section id="deals-grid" className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
                All Deals
              </h2>
              <p className="text-neutral-500 text-sm mt-1">
                {deals.length} items on sale right now
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-brand-pink hover:underline hidden sm:inline-flex items-center gap-1"
            >
              View all products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {deals.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500 text-lg">No deals available right now</p>
            <p className="text-neutral-400 text-sm mt-1">
              Check back soon for new offers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-6 sm:gap-y-8">
            {deals.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* how it works */}
      <section className="bg-neutral-50 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
                How Our Deals Work
              </h2>
              <p className="text-neutral-500 text-sm">
                Simple savings, no hidden catches
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Tag,
                title: "Browse Deals",
                desc: "Explore our curated selection of discounted gifts, updated regularly with new offers.",
                color: "bg-brand-pink-light",
                iconColor: "text-brand-pink",
              },
              {
                icon: ShoppingCart,
                title: "Add to Cart",
                desc: "Sale prices are applied automatically — no promo codes needed at checkout.",
                color: "bg-brand-gold-light",
                iconColor: "text-brand-gold",
              },
              {
                icon: Truck,
                title: "Free Delivery",
                desc: "Enjoy free shipping on orders over ₦112,500, plus easy returns within 30 days.",
                color: "bg-brand-rose-light",
                iconColor: "text-brand-rose",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="bg-white rounded-card p-6 sm:p-8 text-center border border-neutral-100 hover-glow">
                  <div
                    className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* trust badges */}
      <section className="py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Truck, label: "Free Shipping", sub: "On orders ₦112,500+" },
              { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
              { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted" },
              { icon: Heart, label: "Gift Wrapped", sub: "Free with code" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center gap-2 py-4"
              >
                <div className="w-11 h-11 rounded-full bg-brand-pink-light flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {badge.label}
                  </p>
                  <p className="text-xs text-neutral-400">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* newsletter */}
      <section className="bg-gradient-to-r from-brand-pink to-brand-rose py-14 sm:py-16">
        <NewsletterForm />
      </section>
    </div>
  )
}

