"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ChevronDown, RotateCcw, Tag } from "lucide-react"
import { categories, occasions, PRICE_RANGE } from "@/lib/catalog"

const PRICES = [
  { label: `Under ₦${PRICE_RANGE.max.toLocaleString()}`, min: 0, max: PRICE_RANGE.max },
  { label: "₦30,000 – ₦60,000", min: 30000, max: 60000 },
  { label: "₦60,000 – ₦90,000", min: 60000, max: 90000 },
  { label: "Over ₦90,000", min: 90000, max: 999999 },
]

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 sm:py-4 text-sm sm:text-base font-semibold text-neutral-900 hover:text-brand-pink transition-colors"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-[500px] opacity-100 pb-3 sm:pb-4" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function FilterSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = (searchParams.get("category")?.split(",") ?? []).filter(Boolean)
  const activeOccasion = (searchParams.get("occasion")?.split(",") ?? []).filter(Boolean)
  const currentMin = searchParams.get("minPrice") ?? ""
  const currentMax = searchParams.get("maxPrice") ?? ""
  const onSale = searchParams.get("onSale") === "1"

  const set = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const toggleSlug = (key: "category" | "occasion", slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = (params.get(key)?.split(",") ?? []).filter(Boolean)
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    if (next.length > 0) params.set(key, next.join(","))
    else params.delete(key)
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const hasActiveFilters =
    activeCategory.length > 0 || activeOccasion.length > 0 || currentMin || currentMax || onSale

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("occasion")
    params.delete("minPrice")
    params.delete("maxPrice")
    params.delete("onSale")
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <aside className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-100">
        <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-[11px] sm:text-xs font-medium text-neutral-400 hover:text-brand-pink transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* On Sale Toggle */}
      <div className="border-b border-neutral-100 py-3 sm:py-4">
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            if (onSale) params.delete("onSale")
            else params.set("onSale", "1")
            params.delete("page")
            const query = params.toString()
            router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
          }}
          className={`w-full flex items-center gap-2.5 sm:gap-3 py-2 sm:py-2.5 px-2 sm:px-3 rounded-btn transition-all ${
            onSale
              ? "bg-brand-pink-light border border-brand-pink/20 text-brand-pink"
              : "text-neutral-700 hover:bg-neutral-50 border border-transparent"
          }`}
        >
          <span
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
              onSale
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-neutral-300"
            }`}
          >
            {onSale && (
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="text-xs sm:text-sm font-medium flex-1 text-left">On Sale</span>
          {onSale && (
            <span className="bg-brand-pink text-white text-[9px] font-bold px-1.5 py-0.5 rounded-pill">
              Active
            </span>
          )}
        </button>
      </div>

      <FilterSection title="Category">
        <div className="space-y-1">
          {categories.map((cat) => {
            const active = activeCategory.includes(cat.slug)
            return (
              <label
                key={cat.slug}
                className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer py-1.5 sm:py-2 px-2 sm:px-3 rounded-btn transition-all ${
                  active
                    ? "bg-brand-pink-light border border-brand-pink/20 text-brand-pink"
                    : "text-neutral-700 hover:bg-neutral-50 border border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleSlug("category", cat.slug)}
                  className="sr-only"
                />
                <span
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                    active
                      ? "bg-brand-pink border-brand-pink text-white"
                      : "border-neutral-300"
                  }`}
                >
                  {active && (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-xs sm:text-sm font-medium flex-1">{cat.name}</span>
              </label>
            )
          })}
        </div>
      </FilterSection>

      <FilterSection title="Occasion">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {occasions.map((occ) => {
            const active = activeOccasion.includes(occ.slug)
            return (
              <button
                key={occ.slug}
                onClick={() => toggleSlug("occasion", occ.slug)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium rounded-pill border transition-all ${
                  active
                    ? "bg-brand-pink text-white border-brand-pink shadow-sm"
                    : "bg-white border-neutral-200 text-neutral-600 hover:border-brand-pink hover:text-brand-pink"
                }`}
              >
                {occ.name}
              </button>
            )
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen={false}>
        <div className="space-y-1.5">
          {PRICES.map((price) => {
            const isActive = currentMin === String(price.min) && currentMax === String(price.max)
            return (
              <label
                key={price.label}
                className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer py-1.5 sm:py-2 px-2 sm:px-3 rounded-btn transition-all ${
                  isActive
                    ? "bg-brand-pink-light border border-brand-pink/20 text-brand-pink"
                    : "text-neutral-700 hover:bg-neutral-50 border border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="price-filter"
                  checked={isActive}
                  onChange={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set("minPrice", String(price.min))
                    params.set("maxPrice", String(price.max))
                    params.delete("page")
                    const query = params.toString()
                    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
                  }}
                  className="sr-only"
                />
                <span
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isActive
                      ? "border-brand-pink"
                      : "border-neutral-300"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-pink" />
                  )}
                </span>
                <span className="text-xs sm:text-sm font-medium">{price.label}</span>
              </label>
            )
          })}
        </div>
      </FilterSection>
    </aside>
  )
}
