"use client"

import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function OccasionSpotlight() {
  return (
    <section className="mx-2.5 sm:mx-4 my-3 sm:my-4">
      <ScrollReveal direction="scale">
        <div className="relative rounded-2xl overflow-hidden max-w-7xl mx-auto bg-neutral-900">
          {/* decorative glows */}
          <div aria-hidden className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-gold/20 blur-3xl animate-pulse-glow" />
          <div aria-hidden className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-pink/20 blur-3xl" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(#F2C572 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="relative flex flex-col items-center text-center px-6 py-12 sm:py-16 md:py-20">
            <p className="animate-fade-up text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-brand-gold mb-3 inline-flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 fill-brand-gold" />
              Occasion Spotlight
            </p>
            <h2 className="animate-fade-up [animation-delay:100ms] font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight">
              Anniversary Season is Here
            </h2>
            <p className="animate-fade-up [animation-delay:200ms] text-white/70 text-sm sm:text-base mt-3 sm:mt-4 max-w-lg">
              Celebrate the love story with curated anniversary gifts — and take{" "}
              <span className="text-brand-gold font-semibold">15% off</span> your first order with code{" "}
              <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">WELCOME15</span>.
            </p>
            <Link
              href="/shop?occasion=anniversary"
              className="animate-fade-up [animation-delay:300ms] mt-6 sm:mt-8 bg-brand-gold text-neutral-900 px-7 py-3.5 rounded-pill font-medium text-sm hover:bg-white hover:shadow-lg hover:shadow-brand-gold/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2"
            >
              Shop Anniversary Gifts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
