"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { X, RotateCcw } from "lucide-react"
import { categories, occasions, PRICE_RANGE } from "@/lib/catalog"

interface Chip {
  key: "category" | "occasion" | "price" | "q" | "onSale"
  slug: string
  label: string
}

export default function ActiveFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const chips: Chip[] = []

  for (const slug of searchParams.get("category")?.split(",").filter(Boolean) ?? []) {
    const cat = categories.find((c) => c.slug === slug)
    if (cat) chips.push({ key: "category", slug, label: cat.name })
  }
  for (const slug of searchParams.get("occasion")?.split(",").filter(Boolean) ?? []) {
    const occ = occasions.find((o) => o.slug === slug)
    if (occ) chips.push({ key: "occasion", slug, label: occ.name })
  }
  if (searchParams.has("minPrice") || searchParams.has("maxPrice")) {
    const min = searchParams.get("minPrice") ?? PRICE_RANGE.min
    const max = searchParams.get("maxPrice") ?? `${PRICE_RANGE.max}+`
    chips.push({ key: "price", slug: "price", label: `₦${Number(min).toLocaleString()} – ₦${Number(max).toLocaleString()}` })
  }
  const q = searchParams.get("q")
  if (q) chips.push({ key: "q", slug: "q", label: `"${q}"` })
  if (searchParams.get("onSale") === "1") {
    chips.push({ key: "onSale", slug: "onSale", label: "On Sale" })
  }

  if (chips.length === 0) return null

  const remove = (chip: Chip) => {
    const params = new URLSearchParams(searchParams.toString())
    if (chip.key === "price") {
      params.delete("minPrice")
      params.delete("maxPrice")
    } else if (chip.key === "q") {
      params.delete("q")
    } else if (chip.key === "onSale") {
      params.delete("onSale")
    } else {
      const next = (params.get(chip.key)?.split(",").filter(Boolean) ?? []).filter(
        (s) => s !== chip.slug
      )
      if (next.length > 0) params.set(chip.key, next.join(","))
      else params.delete(chip.key)
    }
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("occasion")
    params.delete("minPrice")
    params.delete("maxPrice")
    params.delete("q")
    params.delete("onSale")
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
      <span className="text-xs text-neutral-400 mr-1 hidden sm:inline">Active:</span>
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.slug}`}
          onClick={() => remove(chip)}
          aria-label={`Remove filter ${chip.label}`}
          className="inline-flex items-center gap-1 bg-brand-pink-light text-brand-pink text-[11px] sm:text-xs font-medium pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 py-1 sm:py-1.5 rounded-pill hover:bg-brand-pink-pale transition-colors"
        >
          {chip.label}
          <X className="w-3 h-3" />
        </button>
      ))}
      {chips.length > 1 && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-neutral-400 hover:text-brand-pink transition-colors ml-1"
        >
          <RotateCcw className="w-3 h-3" />
          Clear all
        </button>
      )}
    </div>
  )
}
