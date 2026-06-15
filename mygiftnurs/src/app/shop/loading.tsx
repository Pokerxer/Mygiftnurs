import { Skeleton } from "@/components/ui/skeleton"

export default function ShopLoading() {
  return (
    <div>
      <div className="bg-brand-pink-light">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-3">
          <Skeleton className="h-3 w-24 bg-brand-pink-pale/60" />
          <Skeleton className="h-9 w-56 bg-brand-pink-pale/60" />
          <Skeleton className="h-4 w-80 max-w-full bg-brand-pink-pale/60" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-64 shrink-0 space-y-4">
            <Skeleton className="h-6 w-20" />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </aside>

          <div className="flex-1">
            <div className="flex justify-between mb-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-9 w-44" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-card" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
