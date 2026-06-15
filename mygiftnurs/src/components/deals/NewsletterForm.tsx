"use client"

import { Sparkles } from "lucide-react"
import ScrollReveal from "@/components/ui/ScrollReveal"

export default function NewsletterForm() {
  return (
    <div className="max-w-3xl mx-auto px-4 text-center text-white">
      <ScrollReveal>
        <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-80" />
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold mb-3">
          Never Miss a Deal
        </h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          Subscribe to get exclusive offers, early access to sales, and
          gift-giving inspiration straight to your inbox.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-pill bg-white/15 backdrop-blur border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            className="bg-white text-brand-pink text-sm font-semibold px-6 py-3 rounded-pill hover:bg-white/90 active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="text-[11px] text-white/40 mt-3">
          No spam, unsubscribe anytime. We respect your inbox.
        </p>
      </ScrollReveal>
    </div>
  )
}
