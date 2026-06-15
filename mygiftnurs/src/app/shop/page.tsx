import type { Metadata } from "next"
import { PAGE_SIZE } from "@/lib/catalog"
import { queryProducts } from "@/lib/catalog-live"
import type { ShopFilters, SortOption } from "@/types"
import ProductGrid from "@/components/products/ProductGrid"
import FilterSidebar from "@/components/shop/FilterSidebar"
import ShopToolbar from "@/components/shop/ShopToolbar"
import ActiveFilters from "@/components/shop/ActiveFilters"
import ShopPagination from "@/components/shop/ShopPagination"

export const metadata: Metadata = {
  title: "Shop All Gifts | mygiftnurs",
  description:
    "Browse our full collection of thoughtful gifts — personalized keepsakes, birthday surprises, anniversary treasures and more.",
}

type SearchParams = { [key: string]: string | string[] | undefined }

const SORT_OPTIONS: SortOption[] = ["newest", "price-asc", "price-desc", "rating"]

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function parseFilters(sp: SearchParams): ShopFilters {
  const sort = first(sp.sort)
  const minPrice = Number(first(sp.minPrice))
  const maxPrice = Number(first(sp.maxPrice))
  const page = Number(first(sp.page))

  return {
    q: first(sp.q) || undefined,
    category: first(sp.category) || undefined,
    occasion: first(sp.occasion) || undefined,
    minPrice: Number.isFinite(minPrice) && first(sp.minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) && first(sp.maxPrice) ? maxPrice : undefined,
    sort: SORT_OPTIONS.includes(sort as SortOption) ? (sort as SortOption) : "newest",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    onSale: first(sp.onSale) === "1",
  }
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const filters = parseFilters(sp)
  const { products, total, pages } = await queryProducts(filters)
  const page = Math.min(filters.page ?? 1, pages)
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, total)

  const hasActiveFilters = filters.category || filters.occasion || filters.minPrice !== undefined || filters.maxPrice !== undefined || filters.q || filters.onSale

  return (
    <div>
      {/* page header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-pink-light via-[#FFF8F6] to-brand-pink-banner">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#E8315B 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-pink-pale/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-brand-pink/10 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-[11px] sm:text-xs text-neutral-400 mb-2.5 sm:mb-3">
            <ol className="flex items-center gap-1.5">
              <li>
                <a href="/" className="hover:text-brand-pink transition-colors">Home</a>
              </li>
              <li aria-hidden>/</li>
              <li className="text-neutral-700 font-medium" aria-current="page">Shop</li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900">
            {filters.q ? (
              <>Results for &ldquo;{filters.q}&rdquo;</>
            ) : (
              "All Gifts"
            )}
          </h1>
          <p className="text-neutral-700 text-sm mt-1.5 sm:mt-2 max-w-lg">
            Every gift here is handpicked to make someone&apos;s day. Filter by
            category, occasion or budget to find the one.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex gap-6 lg:gap-8 items-start">
          {/* desktop sidebar */}
          <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-24" aria-label="Product filters">
            <div className="bg-white border border-neutral-100 rounded-card p-5">
              <FilterSidebar />
            </div>
          </aside>

          {/* main content */}
          <div className="flex-1 min-w-0">
            <ShopToolbar
              total={total}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              sort={filters.sort ?? "newest"}
            />
            <ActiveFilters />
            <ProductGrid products={products} />
            {pages > 1 && <ShopPagination page={page} pages={pages} />}
          </div>
        </div>
      </div>
    </div>
  )
}
