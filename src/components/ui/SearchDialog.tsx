"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Clock, TrendingUp, ArrowRight, X, Tag, Gift, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { products } from "@/lib/catalog"
import { categories, occasions } from "@/lib/catalog"

const POPULAR_SEARCHES = [
  "Birthday gifts",
  "Personalized",
  "Anniversary",
  "Under $30",
  "Gifts for her",
  "Gifts for him",
  "New arrivals",
  "Best sellers",
]

const RECENT_KEY = "mygiftnurs_recent_searches"
const MAX_RECENT = 5

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
  } catch {
    return []
  }
}

function saveRecentSearch(term: string) {
  const recent = getRecentSearches().filter((r) => r !== term)
  recent.unshift(term)
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)))
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_KEY)
}

interface SearchResult {
  type: "product" | "category" | "occasion"
  name: string
  slug: string
  image?: string
  price?: number
  href: string
}

export default function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setRecentSearches(getRecentSearches())
      setQuery("")
      setActiveIndex(-1)
    }
  }, [open])

  // live search results
  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()

    const matchedProducts = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map((p) => ({
        type: "product" as const,
        name: p.name,
        slug: p.slug,
        image: p.image,
        price: p.price,
        href: `/shop/${p.slug}`,
      }))

    const matchedCategories = categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q))
      .slice(0, 2)
      .map((c) => ({
        type: "category" as const,
        name: c.name,
        slug: c.slug,
        href: `/shop?category=${c.slug}`,
      }))

    const matchedOccasions = occasions
      .filter((o) => o.name.toLowerCase().includes(q) || o.slug.includes(q))
      .slice(0, 2)
      .map((o) => ({
        type: "occasion" as const,
        name: o.name,
        slug: o.slug,
        href: `/shop?occasion=${o.slug}`,
      }))

    return [...matchedProducts, ...matchedCategories, ...matchedOccasions]
  }, [query])

  const flatItems = useMemo(() => {
    const items: { label: string; href: string }[] = []
    if (query.trim() && results.length > 0) {
      results.forEach((r) => items.push({ label: r.name, href: r.href }))
      items.push({ label: `See all results for "${query}"`, href: `/shop?q=${encodeURIComponent(query.trim())}` })
    } else if (!query.trim()) {
      recentSearches.forEach((r) => items.push({ label: r, href: `/shop?q=${encodeURIComponent(r)}` }))
      POPULAR_SEARCHES.forEach((r) => items.push({ label: r, href: `/shop?q=${encodeURIComponent(r.toLowerCase())}` }))
    }
    return items
  }, [query, results, recentSearches])

  const handleSubmit = (term: string) => {
    if (!term.trim()) return
    saveRecentSearch(term.trim())
    setRecentSearches(getRecentSearches())
    onOpenChange(false)
    window.location.href = `/shop?q=${encodeURIComponent(term.trim())}`
  }

  const handleSelect = useCallback(
    (index: number) => {
      if (index >= 0 && index < flatItems.length) {
        const item = flatItems[index]
        if (item.label.startsWith("See all")) {
          handleSubmit(query)
        } else {
          handleSubmit(item.label)
        }
      }
    },
    [flatItems, query]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0) {
        handleSelect(activeIndex)
      } else if (query.trim()) {
        handleSubmit(query)
      }
    } else if (e.key === "Escape") {
      onOpenChange(false)
    }
  }

  // scroll active item into view
  useEffect(() => {
    if (activeIndex < 0) return
    const list = listRef.current
    if (!list) return
    const item = list.children[activeIndex] as HTMLElement
    if (item) item.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const clearRecent = () => {
    clearRecentSearches()
    setRecentSearches([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden rounded-2xl shadow-2xl" showCloseButton={false}>
        {/* search input */}
        <div className="relative border-b border-neutral-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(-1)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search gifts, categories, occasions..."
            className="w-full pl-12 pr-24 h-14 text-base bg-transparent border-0 outline-none placeholder:text-neutral-400"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {query && (
              <button
                onClick={() => {
                  setQuery("")
                  setActiveIndex(-1)
                  inputRef.current?.focus()
                }}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded font-mono">
              ESC
            </kbd>
          </div>
        </div>

        {/* results area */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto">
          {/* live results */}
          {query.trim() && results.length > 0 && (
            <div className="p-2">
              {results.map((result, i) => (
                <Link
                  key={`${result.type}-${result.slug}`}
                  href={result.href}
                  onClick={() => {
                    saveRecentSearch(query.trim())
                    onOpenChange(false)
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    activeIndex === i
                      ? "bg-brand-pink-light text-brand-pink"
                      : "hover:bg-neutral-50"
                  }`}
                >
                  {result.image ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 relative shrink-0">
                      <Image src={result.image} alt="" fill sizes="40px" className="object-cover" />
                    </div>
                  ) : (
                    <span className="w-10 h-10 rounded-lg bg-brand-pink-light flex items-center justify-center shrink-0">
                      {result.type === "category" ? (
                        <Gift className="w-4 h-4 text-brand-pink" />
                      ) : (
                        <Tag className="w-4 h-4 text-brand-pink" />
                      )}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${activeIndex === i ? "text-brand-pink" : "text-neutral-900"}`}>
                      {result.name}
                    </p>
                    <p className="text-[11px] text-neutral-400 capitalize">
                      {result.type}
                      {result.price !== undefined && ` · $${result.price.toFixed(2)}`}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
                </Link>
              ))}

              {/* see all results */}
              <Link
                href={`/shop?q=${encodeURIComponent(query.trim())}`}
                onClick={() => {
                  saveRecentSearch(query.trim())
                  onOpenChange(false)
                }}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mt-1 ${
                  activeIndex === results.length
                    ? "bg-brand-pink-light text-brand-pink"
                    : "text-brand-pink hover:bg-brand-pink-light/50"
                }`}
              >
                See all results for &ldquo;{query}&rdquo;
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* no results */}
          {query.trim() && results.length === 0 && (
            <div className="p-6 text-center">
              <Search className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm text-neutral-500">No results for &ldquo;{query}&rdquo;</p>
              <Link
                href={`/shop?q=${encodeURIComponent(query.trim())}`}
                onClick={() => {
                  saveRecentSearch(query.trim())
                  onOpenChange(false)
                }}
                className="text-sm text-brand-pink font-medium mt-2 inline-flex items-center gap-1 hover:underline"
              >
                Search all products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* recent searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-1.5 px-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Recent
                </p>
                <button
                  onClick={clearRecent}
                  className="text-[11px] text-neutral-400 hover:text-brand-pink transition-colors"
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((term, i) => (
                <button
                  key={term}
                  onClick={() => handleSubmit(term)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                    activeIndex === i
                      ? "bg-brand-pink-light text-brand-pink"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                  <span className="text-sm flex-1">{term}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
                </button>
              ))}
            </div>
          )}

          {/* popular searches */}
          <div className="p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1 mb-1.5 px-1">
              <TrendingUp className="w-3 h-3" />
              Popular searches
            </p>
            <div className="flex flex-wrap gap-1.5 px-1">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSubmit(term)}
                  className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-brand-pink-light hover:text-brand-pink transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="border-t border-neutral-100 px-4 py-2.5 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-neutral-100 px-1 rounded font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-neutral-100 px-1 rounded font-mono">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-neutral-100 px-1 rounded font-mono">esc</kbd>
              Close
            </span>
          </span>
          <span>{products.length} products</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
