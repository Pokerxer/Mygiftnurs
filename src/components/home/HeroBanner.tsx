"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

const avatarInitials = [
  { initials: "SK", bg: "#F5B8CC" },
  { initials: "MJ", bg: "#B89BE0" },
  { initials: "AL", bg: "#9FCBE8" },
  { initials: "RD", bg: "#F5D58A" },
]

const sparkles = [
  { top: "8%", left: "5%", size: 10, color: "#F2C572", delay: "0s" },
  { top: "18%", right: "12%", size: 7, color: "#FFD6E0", delay: "0.5s" },
  { top: "48%", left: "1%", size: 9, color: "#F2C572", delay: "1s" },
  { top: "72%", right: "6%", size: 12, color: "#FFD6E0", delay: "1.5s" },
  { top: "38%", right: "26%", size: 6, color: "#F2C572", delay: "0.8s" },
  { top: "85%", left: "30%", size: 8, color: "#FFD6E0", delay: "1.3s" },
  { top: "60%", left: "15%", size: 5, color: "#F2C572", delay: "2s" },
  { top: "25%", left: "45%", size: 4, color: "#FFD6E0", delay: "0.3s" },
]

export default function HeroBanner() {
  const giftRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="mx-2.5 sm:mx-4 my-3 sm:my-4">
      <div className="relative rounded-2xl overflow-hidden max-w-7xl mx-auto min-h-[420px] sm:min-h-[480px] lg:min-h-[580px] bg-gradient-to-br from-brand-pink-light via-[#FFF8F6] to-brand-pink-banner">
        {/* dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#E8315B 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* glows */}
        <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-pink-pale/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-brand-pink/10 blur-2xl" />

        <div className="relative flex flex-col lg:flex-row">
          {/* Left Column — Text */}
          <div className="lg:w-[55%] p-5 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center z-10">
            <p className="animate-fade-up text-xs sm:text-sm text-neutral-700 font-medium mb-3 sm:mb-4 inline-flex items-center gap-2">
              <span aria-hidden className="h-px w-6 sm:w-8 bg-brand-pink" />
              Thoughtful Gifts, Happy Moments
            </p>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-[58px] font-extrabold leading-[1.06]">
              <span className="animate-fade-up [animation-delay:100ms] text-neutral-900 block">
                Find the Perfect Gift
              </span>
              <span className="animate-fade-up [animation-delay:200ms] text-brand-pink block mt-0.5 sm:mt-1">
                For Every Occasion
              </span>
            </h1>

            <p className="animate-fade-up [animation-delay:300ms] text-neutral-700 text-sm sm:text-base md:text-lg mt-3 sm:mt-5 max-w-md leading-relaxed">
              Discover thoughtfully curated gifts that bring joy to your loved ones.
              From birthdays to anniversaries, we craft moments that last a lifetime.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5 sm:mt-8 animate-fade-up [animation-delay:400ms]">
              <Link
                href="/shop"
                className="bg-brand-pink text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-pill font-medium text-sm hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2 animate-pulse-glow"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="bg-white/80 backdrop-blur-sm border border-brand-pink-pale text-neutral-700 px-6 py-3 sm:px-8 sm:py-3.5 rounded-pill font-medium text-sm hover:border-brand-pink hover:text-brand-pink hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2"
              >
                Explore Categories
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-10 animate-fade-up [animation-delay:500ms]">
              <div className="flex -space-x-2 sm:-space-x-2.5">
                {avatarInitials.map((a) => (
                  <span
                    key={a.initials}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white flex items-center justify-center text-[10px] sm:text-[11px] font-semibold text-neutral-900 hover:scale-110 hover:z-10 transition-transform duration-200"
                    style={{ backgroundColor: a.bg }}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                  4.9 <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-star text-star" />
                </span>
                <span className="text-neutral-600"> from 2,400+ happy gift-givers</span>
              </div>
            </div>
          </div>

          {/* Right Column — Illustration with parallax */}
          <div className="lg:w-[45%] relative min-h-[260px] sm:min-h-[340px] lg:min-h-[580px] flex items-center justify-center z-10 p-6 sm:p-10">
            {/* sparkles */}
            {sparkles.map((s, i) => (
              <span
                key={i}
                aria-hidden
                className="absolute rounded-full animate-twinkle"
                style={{
                  top: s.top,
                  left: s.left,
                  right: s.right,
                  width: s.size,
                  height: s.size,
                  backgroundColor: s.color,
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
                  animationDelay: s.delay,
                }}
              />
            ))}

            {/* gift illustration with mouse parallax */}
            <div
              ref={giftRef}
              className="relative w-full max-w-[480px] aspect-[700/640] animate-float"
              style={{
                transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 6}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <Image
                src="/images/hero-gifts.svg"
                alt="Wrapped gift boxes with ribbons, hearts and confetti"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
