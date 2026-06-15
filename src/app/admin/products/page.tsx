import { Package, Plus, Search, Filter, MoreVertical, Star, AlertTriangle } from "lucide-react"

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Products
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Manage your product catalog
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-brand-pink text-white text-sm font-semibold px-5 py-2.5 rounded-pill hover:bg-brand-pink/90 hover:shadow-lg hover:shadow-brand-pink/20 active:scale-[0.97] transition-all duration-300">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* search bar */}
      <div className="bg-white rounded-card border border-neutral-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink transition-all"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 border border-neutral-200 px-4 py-2.5 rounded-btn hover:bg-neutral-50 hover:border-brand-pink/20 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-card border border-neutral-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Product
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">
                Stock
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3.5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td colSpan={6} className="px-5 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-brand-pink-light rounded-full flex items-center justify-center mb-3">
                    <Package className="w-7 h-7 text-brand-pink" />
                  </div>
                  <p className="text-sm font-medium text-neutral-700 mb-1">
                    No products yet
                  </p>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Connect MongoDB and run the seed script to populate your catalog.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
