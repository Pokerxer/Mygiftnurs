"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Zap, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import { getTopDeals } from "@/lib/catalog"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function TopDeals() {
  const deals = getTopDeals(6)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (deals.length === 0) return null

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.offsetWidth * 0.75
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-pink-light via-white to-brand-rose-light relative overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-brand-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* header */}
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-pill text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 fill-brand-pink" />
              Limited Time Offers
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-3">
              Today&apos;s Top Deals
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-lg mx-auto">
              Save big on our most-loved gifts. Grab them before they&apos;re gone!
            </p>
          </div>
        </ScrollReveal>

        {/* carousel */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-1 px-1"
          >
            {deals.map((product, i) => {
              const discount = Math.round(
                (1 - product.price / product.compareAtPrice!) * 100
              )
              const savings = product.compareAtPrice! - product.price

              return (
                <ScrollReveal key={product.id} delay={i * 60}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="flex-shrink-0 w-[260px] sm:w-[300px] snap-start bg-white rounded-card border border-neutral-100 overflow-hidden hover-glow group/card block"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="300px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      {/* discount badge */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="bg-brand-pink text-white text-xs font-bold px-2.5 py-1 rounded-pill shadow-sm animate-pulse-glow">
                          Save {discount}%
                        </span>
                      </div>
                      {/* savings pill */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-neutral-900/80 backdrop-blur text-white text-[10px] font-semibold px-2 py-1 rounded-pill">
                          Save ${savings.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover/card:text-brand-pink transition-colors min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-brand-pink">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-neutral-400 line-through">
                          ${product.compareAtPrice!.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-brand-pink font-medium">
                        <Tag className="w-3 h-3" />
                        Limited deal
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center mt-10">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-semibold px-8 py-3.5 rounded-pill hover:bg-neutral-800 hover:shadow-lg active:scale-[0.97] transition-all duration-300 group"
            >
              View All Deals
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
