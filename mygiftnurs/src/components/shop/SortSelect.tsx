"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SortOption } from "@/types"

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
}

export default function SortSelect({ sort }: { sort: SortOption }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onChange = (value: SortOption | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === "newest") params.delete("sort")
    else params.set("sort", value)
    params.delete("page")
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <Select value={sort} onValueChange={onChange}>
      <SelectTrigger
        aria-label="Sort products"
        className="w-36 sm:w-44 text-xs sm:text-sm border-neutral-100 focus:ring-brand-pink"
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(SORT_LABELS) as SortOption[]).map((value) => (
          <SelectItem key={value} value={value} className="text-xs sm:text-sm">
            {SORT_LABELS[value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
