"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Quote, ChevronLeft, ChevronRight, Star, MessageCircleHeart } from "lucide-react"
import StarRating from "../products/StarRating"
import ScrollReveal from "@/components/ui/ScrollReveal"

const testimonials = [
  {
    name: "Sarah K.",
    initials: "SK",
    bg: "#F5B8CC",
    rating: 5,
    quote: "The custom star map arrived beautifully packaged and the print quality blew me away. My husband actually teared up when he saw the date of our first date.",
    product: "Custom Star Map Print",
  },
  {
    name: "Marcus J.",
    initials: "MJ",
    bg: "#B89BE0",
    rating: 5,
    quote: "Got this for my dad's birthday and the leather quality is incredible — way better than I expected for the price. The embossed initials are the perfect touch.",
    product: "Engraved Leather Wallet",
  },
  {
    name: "Aisha L.",
    initials: "AL",
    bg: "#9FCBE8",
    rating: 5,
    quote: "Ordered the name necklace for my sister and it shipped so fast. The chain feels sturdy and the engraving is crisp. She wears it every single day now.",
    product: "Custom Name Necklace",
  },
  {
    name: "Ravi D.",
    initials: "RD",
    bg: "#F5D58A",
    rating: 4,
    quote: "The rose dome is even prettier in person — it sits on our mantle and still looks fresh months later. Great anniversary gift for someone who has everything.",
    product: "Anniversary Rose Dome",
  },
  {
    name: "Priya N.",
    initials: "PN",
    bg: "#C8E6C9",
    rating: 5,
    quote: "Made a memory book for my parents' 30th anniversary and the whole family cried looking through it. The linen cover feels so premium.",
    product: "Memory Photo Book",
  },
  {
    name: "Tomás G.",
    initials: "TG",
    bg: "#FFD6E0",
    rating: 5,
    quote: "The pet portrait of our golden retriever is hanging in the living room and every guest asks where we got it. Worth every penny.",
    product: "Custom Pet Portrait",
  },
]

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

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

  // auto-scroll
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (document.hidden) return
        const cardWidth = el.querySelector("div")?.clientWidth ?? 320
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
          el.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          el.scrollBy({ left: cardWidth + 24, behavior: "smooth" })
        }
      }, 5000)
    }
    startAutoScroll()

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [])

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    const cardWidth = el.querySelector("div")?.clientWidth ?? 320
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 md:py-20">
      {/* header */}
      <ScrollReveal>
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-brand-pink mb-1 sm:mb-1.5 inline-flex items-center gap-1.5">
              <MessageCircleHeart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Real Stories
            </p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">
              Loved by Gift-Givers Everywhere
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-sm shrink-0">
            <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
              4.9 <Star className="w-3.5 h-3.5 fill-star text-star" />
            </span>
            <span className="text-neutral-400">· 2,400+ reviews</span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="relative group/carousel">
          {/* gradient edges */}
          <div
            className="absolute left-0 top-0 bottom-2 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300"
            style={{ opacity: canPrev ? 1 : 0 }}
          />
          <div
            className="absolute right-0 top-0 bottom-2 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300"
            style={{ opacity: canNext ? 1 : 0 }}
          />

          {/* prev arrow */}
          <button
            aria-label="Previous testimonials"
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
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 carousel-scroll"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[360px] snap-start"
              >
                <div className="h-full flex flex-col bg-white rounded-card border border-neutral-100 p-5 sm:p-6 hover-glow transition-all duration-300">
                  <Quote className="w-6 h-6 text-brand-pink-pale fill-brand-pink-pale mb-3" />
                  <StarRating rating={t.rating} size="md" />
                  <p className="text-sm sm:text-[15px] text-neutral-700 leading-relaxed mt-3 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-neutral-100">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-neutral-900 shrink-0 hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: t.bg }}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                      <p className="text-xs text-neutral-400">Purchased: {t.product}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* next arrow */}
          <button
            aria-label="Next testimonials"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-full shadow-lg shadow-black/5 flex items-center justify-center text-neutral-600 opacity-0 group-hover/carousel:opacity-100 hover:shadow-xl hover:text-brand-pink hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none border border-neutral-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  )
}
