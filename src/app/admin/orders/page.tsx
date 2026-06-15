import { ShoppingCart, Search, Filter, Package, Clock, Truck, CheckCircle } from "lucide-react"

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Orders
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Track and fulfill customer orders
          </p>
        </div>
      </div>

      {/* status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending", count: 0, icon: Clock, color: "text-brand-gold bg-brand-gold-light" },
          { label: "Processing", count: 0, icon: Package, color: "text-blue-600 bg-blue-50" },
          { label: "Shipped", count: 0, icon: Truck, color: "text-green-600 bg-green-50" },
          { label: "Delivered", count: 0, icon: CheckCircle, color: "text-purple-600 bg-purple-50" },
        ].map((status) => (
          <div
            key={status.label}
            className="bg-white rounded-card border border-neutral-100 p-4 flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${status.color}`}>
              <status.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-900">{status.count}</p>
              <p className="text-[10px] text-neutral-400">{status.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* search bar */}
      <div className="bg-white rounded-card border border-neutral-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search orders..."
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
                Order
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">
                Customer
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td colSpan={5} className="px-5 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <ShoppingCart className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-neutral-700 mb-1">
                    No orders yet
                  </p>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Orders will appear here once customers start making purchases.
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
