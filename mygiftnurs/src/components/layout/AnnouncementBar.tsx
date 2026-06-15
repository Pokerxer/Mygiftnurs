"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronRight } from "lucide-react"

const messages = [
  { text: "🎁 Free Shipping on orders above $50!", highlight: "Free Shipping" },
  { text: "💝 15% OFF your first order! Use code: WELCOME15", highlight: "15% OFF" },
  { text: "✨ New arrivals added weekly — shop the latest!", highlight: "New arrivals" },
]

const STORAGE_KEY = "mygiftnurs_announcement_dismissed"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== "true") {
      setIsDismissed(false)
      setTimeout(() => setIsVisible(true), 100)
    }
  }, [])

  useEffect(() => {
    if (isDismissed) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isDismissed])

  const dismiss = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setIsDismissed(true)
      localStorage.setItem(STORAGE_KEY, "true")
    }, 300)
  }, [])

  if (isDismissed) return null

  const current = messages[currentIndex]

  return (
    <div
      className={`h-10 bg-gradient-to-r from-brand-pink/90 via-brand-pink to-brand-pink/90 flex items-center justify-center overflow-hidden transition-all duration-300 ${
        isVisible ? "max-h-10 opacity-100" : "max-h-0 opacity-0 py-0"
      }`}
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 flex items-center justify-center">
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % messages.length)}
          className="hidden sm:flex items-center gap-1 text-white/80 hover:text-white text-xs mr-3 transition-colors"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3 h-3" />
        </button>

        <p
          className="text-[13px] font-medium text-white truncate max-w-[90%] sm:max-w-none"
          key={currentIndex}
        >
          {current.text}
        </p>

        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
