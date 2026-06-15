"use client"

import { Gift, Star, Truck, HeartHandshake } from "lucide-react"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { useCountUp } from "@/hooks/useCountUp"

const stats = [
  { icon: Gift, value: 50000, display: "50K+", label: "Gifts Delivered", sublabel: "and counting, with love" },
  { icon: Star, value: 4.9, display: "4.9/5", label: "Average Rating", sublabel: "from 2,400+ happy customers", isDecimal: true },
  { icon: Truck, value: 24, display: "24h", label: "Average Ship Time", sublabel: "fast, tracked & reliable" },
  { icon: HeartHandshake, value: 100, display: "100%", label: "Personalized Care", sublabel: "every order, every time" },
]

function StatNumber({ stat }: { stat: typeof stats[number] }) {
  const { count, ref } = useCountUp(
    stat.isDecimal ? Math.round(stat.value * 10) : stat.value,
    1800
  )

  const displayValue = stat.isDecimal
    ? `${(count / 10).toFixed(1)}/5`
    : stat.display

  return (
    <span ref={ref} className="counter-value">
      {displayValue}
    </span>
  )
}

export default function WhyGiftnurs() {
  return (
    <section className="relative overflow-hidden bg-brand-pink-light py-12 sm:py-16 md:py-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#E8315B 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-brand-pink mb-1.5">
              The Giftnurs Promise
            </p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">
              Why Thousands Choose Giftnurs
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="flex flex-col items-center text-center gap-2 sm:gap-3 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-pink" />
                </div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  <StatNumber stat={stat} />
                </p>
                <div>
                  <p className="font-semibold text-sm text-neutral-900">{stat.label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{stat.sublabel}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
