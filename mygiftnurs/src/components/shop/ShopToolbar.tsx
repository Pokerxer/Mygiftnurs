"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { SlidersHorizontal, Gift, X, LayoutGrid, List } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import FilterSidebar from "./FilterSidebar"
import SortSelect from "./SortSelect"
import type { SortOption } from "@/types"

interface ShopToolbarProps {
  total: number
  rangeStart: number
  rangeEnd: number
  sort: SortOption
}

export default function ShopToolbar({ total, rangeStart, rangeEnd, sort }: ShopToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchValue.trim()) params.set("q", searchValue.trim())
    else params.delete("q")
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    setSearchOpen(false)
  }

  return (
    <div className="space-y-3 mb-5">
      {/* top row: count + actions */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-neutral-400 hidden sm:flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-pink" />
          Showing <span className="font-medium text-neutral-700">{rangeStart}–{rangeEnd}</span> of{" "}
          <span className="font-medium text-neutral-700">{total}</span> gifts
        </p>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-xs sm:text-sm font-medium text-neutral-700 border border-neutral-100 rounded-btn px-3 sm:px-4 py-2 hover:border-brand-pink hover:text-brand-pink transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>

          {/* mobile filter */}
          <Sheet>
            <SheetTrigger className="lg:hidden inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 border border-neutral-100 rounded-btn px-3 sm:px-4 py-2 hover:border-brand-pink hover:text-brand-pink transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto px-5 py-6">
              <SheetHeader className="p-0 mb-2">
                <SheetTitle className="sr-only">Product filters</SheetTitle>
              </SheetHeader>
              <FilterSidebar />
            </SheetContent>
          </Sheet>

          <SortSelect sort={sort} />
        </div>
      </div>

      {/* search bar (collapsible) */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={handleSearch} className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search within results..."
            className="w-full pl-10 pr-10 py-2.5 text-sm border border-neutral-200 rounded-btn focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/20 transition-all"
            autoFocus={searchOpen}
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue("")
                const params = new URLSearchParams(searchParams.toString())
                params.delete("q")
                params.delete("page")
                const query = params.toString()
                router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
