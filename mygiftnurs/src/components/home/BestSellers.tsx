"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import ProductCard from "../products/ProductCard"
import { getBestSellers } from "@/lib/catalog"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function BestSellers() {
  const products = getBestSellers()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [activeDot, setActiveDot] = useState(0)
  const dragStart = useRef({ x: 0, scroll: 0 })
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)

    // update active dot
    const cardWidth = el.querySelector("div")?.clientWidth ?? 260
    const idx = Math.round(el.scrollLeft / (cardWidth + 24))
    setActiveDot(Math.min(idx, products.length - 1))
  }, [products.length])

  useEffect(() => {
    updateArrows()
    const el = scrollerRef.current
    if (!el) return
    const observer = new ResizeObserver(updateArrows)
    observer.observe(el)
    window.addEventListener("resize", updateArrows)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateArrows)
    }
  }, [updateArrows])

  // auto-scroll every 4s
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (document.hidden) return
        const cardWidth = el.querySelector("div")?.clientWidth ?? 260
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
          el.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          el.scrollBy({ left: cardWidth + 24, behavior: "smooth" })
        }
      }, 4000)
    }

    startAutoScroll()

    const handleVisibility = () => {
      if (document.hidden) {
        if (autoScrollRef.current) clearInterval(autoScrollRef.current)
      } else {
        startAutoScroll()
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  const stopAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
  }

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    stopAutoScroll()
    const cardWidth = el.querySelector("div")?.clientWidth ?? 260
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" })
  }

  const handleDragStart = (e: React.MouseEvent) => {
    stopAutoScroll()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, scroll: scrollerRef.current?.scrollLeft ?? 0 }
  }

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollerRef.current) return
    scrollerRef.current.scrollLeft = dragStart.current.scroll - (e.clientX - dragStart.current.x)
  }

  const handleDragEnd = () => setIsDragging(false)

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 md:py-20">
      {/* header */}
      <ScrollReveal>
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-brand-pink mb-1 sm:mb-1.5 inline-flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Loved by thousands
            </p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop?sort=rating"
            className="text-brand-pink text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline shrink-0"
          >
            Shop All <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="relative group/carousel">
          {/* gradient edges */}
          <div
            className="absolute left-0 top-0 bottom-4 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300"
            style={{ opacity: canPrev ? 1 : 0 }}
          />
          <div
            className="absolute right-0 top-0 bottom-4 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300"
            style={{ opacity: canNext ? 1 : 0 }}
          />

          {/* prev arrow */}
          <button
            aria-label="Previous products"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-full shadow-lg shadow-black/5 flex items-center justify-center text-neutral-600 opacity-0 group-hover/carousel:opacity-100 hover:shadow-xl hover:text-brand-pink hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none border border-neutral-100"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* scroller */}
          <div
            ref={scrollerRef}
            onScroll={updateArrows}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            className={`flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 carousel-scroll ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[180px] sm:min-w-[220px] md:min-w-[260px] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}

            {/* CTA card */}
            <div className="min-w-[180px] sm:min-w-[220px] md:min-w-[260px] snap-start flex">
              <Link
                href="/shop?sort=rating"
                className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full rounded-card border-2 border-dashed border-neutral-200 hover:border-brand-pink hover:bg-brand-pink-light/30 transition-all duration-300 group/cta"
              >
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-pink-light flex items-center justify-center group-hover/cta:bg-brand-pink group-hover/cta:scale-110 group-hover/cta:rotate-90 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink group-hover/cta:text-white transition-colors" />
                </span>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover/cta:text-brand-pink transition-colors">
                    View All
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">
                    {products.length}+ best sellers
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* next arrow */}
          <button
            aria-label="Next products"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-full shadow-lg shadow-black/5 flex items-center justify-center text-neutral-600 opacity-0 group-hover/carousel:opacity-100 hover:shadow-xl hover:text-brand-pink hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none border border-neutral-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </ScrollReveal>

      {/* improved scroll dots */}
      <div className="hidden sm:flex items-center justify-center gap-2 mt-5">
        {products.slice(0, Math.min(products.length, 8)).map((_, i) => (
          <button
            key={i}
            aria-label={`Scroll to product ${i + 1}`}
            onClick={() => {
              stopAutoScroll()
              const el = scrollerRef.current
              if (!el) return
              const card = el.querySelectorAll("div")[i] as HTMLElement | undefined
              if (card) card.scrollIntoView({ behavior: "smooth", inline: "start" })
            }}
            className={`rounded-full transition-all duration-300 ${
              i === activeDot
                ? "w-6 h-2 bg-brand-pink animate-dot-pulse"
                : "w-2 h-2 bg-neutral-300 hover:bg-brand-pink-pale"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
