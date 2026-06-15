"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Gift, Cake, Heart, Gem, Sparkles, GraduationCap } from "lucide-react"
import { categories as catData, getCategoryCount } from "@/lib/catalog"
import ScrollReveal from "@/components/ui/ScrollReveal"

const categoryIcons = {
  personalized: Gift,
  birthday: Cake,
  anniversary: Heart,
  "for-him": Gem,
  "for-her": Sparkles,
  graduation: GraduationCap,
}

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 md:py-20">
      {/* header */}
      <ScrollReveal>
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-brand-pink mb-1 sm:mb-1.5">
              Something for everyone
            </p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-brand-pink text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline shrink-0"
          >
            View All <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </ScrollReveal>

      {/* grid with staggered reveal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4 stagger-children">
        {catData.map((cat, i) => {
          const Icon = categoryIcons[cat.slug as keyof typeof categoryIcons] || Gift
          const count = getCategoryCount(cat.slug)

          return (
            <ScrollReveal key={cat.slug} delay={i * 80}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-neutral-100 hover-glow block"
              >
                {/* illustration */}
                <div className="relative aspect-square" style={{ backgroundColor: cat.bg }}>
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-semibold text-neutral-600 bg-white/80 backdrop-blur px-1.5 sm:px-2 py-0.5 rounded-full">
                    {count} gifts
                  </span>
                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-brand-pink/0 group-hover:bg-brand-pink/5 transition-colors duration-300" />
                </div>

                {/* label */}
                <div className="flex items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3.5">
                  <span
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink" />
                  </span>
                  <h3 className="font-display text-xs sm:text-sm md:text-base font-bold text-neutral-900 leading-tight group-hover:text-brand-pink transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
