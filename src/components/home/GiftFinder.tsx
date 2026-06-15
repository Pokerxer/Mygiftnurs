"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Flower2,
  Watch,
  HeartHandshake,
  Users,
  PartyPopper,
  Briefcase,
} from "lucide-react"
import { occasions } from "@/lib/catalog"
import ScrollReveal from "@/components/ui/ScrollReveal"

const recipients = [
  { id: "mom", label: "Mom", icon: Flower2, category: "for-her" },
  { id: "dad", label: "Dad", icon: Watch, category: "for-him" },
  { id: "partner", label: "Partner", icon: HeartHandshake, category: "anniversary" },
  { id: "friend", label: "Best Friend", icon: Users, category: "personalized" },
  { id: "kids", label: "Kids", icon: PartyPopper, category: "birthday" },
  { id: "coworker", label: "Coworker", icon: Briefcase, category: "personalized" },
] as const

export default function GiftFinder() {
  const [recipientId, setRecipientId] = useState<string | null>(null)
  const [occasionSlug, setOccasionSlug] = useState<string | null>(null)

  const recipient = recipients.find((r) => r.id === recipientId)
  const href = recipient
    ? `/shop?category=${recipient.category}${occasionSlug ? `&occasion=${occasionSlug}` : ""}`
    : "/shop"

  return (
    <section className="bg-brand-pink-light py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-brand-pink mb-1.5 inline-flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Gift Finder
            </p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900">
              Who Are You Shopping For?
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Tell us a little about them and we&apos;ll point you toward gifts they&apos;ll love.
            </p>
          </div>
        </ScrollReveal>

        {/* Step 1 — recipient */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {recipients.map((r) => {
              const Icon = r.icon
              const active = recipientId === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRecipientId(r.id)
                    setOccasionSlug(null)
                  }}
                  aria-pressed={active}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-pill border text-sm font-medium transition-all duration-300 active:scale-95 ${
                    active
                      ? "bg-brand-pink text-white border-brand-pink shadow-lg shadow-brand-pink/25"
                      : "bg-white text-neutral-700 border-transparent hover:border-brand-pink-pale hover:text-brand-pink hover:shadow-md"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {r.label}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Step 2 — occasion */}
        <div
          className={`grid transition-all duration-500 ease-out ${
            recipient ? "grid-rows-[1fr] opacity-100 mt-6 sm:mt-8" : "grid-rows-[0fr] opacity-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <div className="min-h-0">
            <p className="text-center text-xs sm:text-sm text-neutral-500 mb-3">
              Optional — narrow it down by occasion
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {occasions.map((o) => {
                const active = occasionSlug === o.slug
                return (
                  <button
                    key={o.slug}
                    type="button"
                    onClick={() => setOccasionSlug(active ? null : o.slug)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-pill text-xs sm:text-sm font-medium border transition-all duration-300 active:scale-95 ${
                      active
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white/70 text-neutral-600 border-neutral-200 hover:border-brand-pink hover:text-brand-pink hover:shadow-sm"
                    }`}
                  >
                    {o.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`flex justify-center transition-all duration-500 ease-out ${
            recipient ? "mt-6 sm:mt-8 opacity-100" : "mt-0 h-0 opacity-0 overflow-hidden"
          }`}
        >
          <Link
            href={href}
            className="bg-neutral-900 text-white px-8 py-3.5 rounded-pill font-medium text-sm hover:bg-brand-pink hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2"
          >
            Find {recipient ? `${recipient.label}'s` : "Their"} Gift <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
