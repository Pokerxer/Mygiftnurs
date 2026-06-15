"use client"

import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

function pageNumbers(page: number, pages: number): (number | "ellipsis")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", pages]
  if (page >= pages - 3) return [1, "ellipsis", pages - 4, pages - 3, pages - 2, pages - 1, pages]
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", pages]
}

export default function ShopPagination({ page, pages }: { page: number; pages: number }) {
  const searchParams = useSearchParams()

  const hrefFor = (target: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (target <= 1) params.delete("page")
    else params.set("page", String(target))
    const query = params.toString()
    return query ? `/shop?${query}` : "/shop"
  }

  if (pages <= 1) return null

  return (
    <nav aria-label="Pagination" className="mt-8 sm:mt-12">
      <ul className="flex items-center justify-center gap-1">
        {/* prev */}
        {page > 1 && (
          <li>
            <a
              href={hrefFor(page - 1)}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-brand-pink hover:bg-brand-pink-light rounded-btn transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Prev</span>
            </a>
          </li>
        )}

        {/* pages */}
        {pageNumbers(page, pages).map((n, i) =>
          n === "ellipsis" ? (
            <li key={`e-${i}`}>
              <span className="px-2 text-neutral-300 text-xs">&hellip;</span>
            </li>
          ) : (
            <li key={n}>
              <a
                href={hrefFor(n)}
                aria-current={n === page ? "page" : undefined}
                className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm font-medium rounded-btn transition-all ${
                  n === page
                    ? "bg-brand-pink text-white shadow-sm"
                    : "text-neutral-600 hover:text-brand-pink hover:bg-brand-pink-light"
                }`}
              >
                {n}
              </a>
            </li>
          )
        )}

        {/* next */}
        {page < pages && (
          <li>
            <a
              href={hrefFor(page + 1)}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-brand-pink hover:bg-brand-pink-light rounded-btn transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}
