"use client"

import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react"
import ScrollReveal from "@/components/ui/ScrollReveal"

const badges = [
  { icon: Truck, label: "Free Shipping", sublabel: "On orders above $50" },
  { icon: ShieldCheck, label: "Secure Payment", sublabel: "100% secure checkout" },
  { icon: RotateCcw, label: "Easy Returns", sublabel: "30-day return policy" },
  { icon: Headphones, label: "24/7 Support", sublabel: "Dedicated support team" },
]

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-5 sm:py-6">
      <ScrollReveal>
        <div className="flex overflow-x-auto gap-4 sm:gap-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:divide-x sm:divide-neutral-100 border-y border-neutral-100 py-4 sm:py-6 scrollbar-hide">
          {badges.map((badge, i) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 shrink-0 sm:shrink sm:justify-center first:pl-3 sm:first:pl-4 last:pr-3 sm:last:pr-4 group"
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-pink-light flex items-center justify-center shrink-0 group-hover:bg-brand-pink group-hover:scale-110 transition-all duration-300">
                <badge.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-brand-pink group-hover:text-white transition-colors duration-300" />
              </span>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-neutral-900 whitespace-nowrap group-hover:text-brand-pink transition-colors">{badge.label}</p>
                <p className="text-[11px] sm:text-xs text-neutral-400 whitespace-nowrap">{badge.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
