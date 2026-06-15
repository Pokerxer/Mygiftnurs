import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, Eye } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    label: "Total Revenue",
    value: "₦18,645,000",
    change: "+14%",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    label: "Products",
    value: "20",
    change: "+2 this month",
    icon: Package,
    gradient: "from-brand-pink to-rose-600",
    bgLight: "bg-brand-pink-light",
    textColor: "text-brand-pink",
  },
  {
    label: "Orders",
    value: "142",
    change: "+8% vs last month",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Customers",
    value: "89",
    change: "+12 new",
    icon: Users,
    gradient: "from-purple-500 to-violet-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
  },
]

const recentActivity = [
  { action: "New order #1234", detail: "Custom Star Map Print", time: "2 min ago", type: "order" },
  { action: "Product updated", detail: "Birth Flower Necklace — stock: 40", time: "15 min ago", type: "product" },
  { action: "New customer", detail: "sarah@email.com signed up", time: "1 hour ago", type: "customer" },
  { action: "Order shipped", detail: "Order #1230 — Birthday Gift Box", time: "3 hours ago", type: "shipped" },
]

export default function AdminOverview() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Dashboard
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-card border border-neutral-100 p-5 hover-glow group cursor-default"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${stat.bgLight} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <span className={`text-[11px] font-semibold ${stat.textColor} bg-white border border-current/10 px-2 py-0.5 rounded-pill flex items-center gap-0.5`}>
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* recent activity */}
        <div className="bg-white rounded-card border border-neutral-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Recent Activity
            </h2>
            <span className="text-[10px] font-semibold text-brand-pink bg-brand-pink-light px-2.5 py-1 rounded-pill">
              Live
            </span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-card hover:bg-neutral-50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  item.type === "order"
                    ? "bg-green-50 text-green-600"
                    : item.type === "product"
                    ? "bg-brand-pink-light text-brand-pink"
                    : item.type === "customer"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-blue-50 text-blue-600"
                }`}>
                  {item.type === "order" && <ShoppingCart className="w-3.5 h-3.5" />}
                  {item.type === "product" && <Package className="w-3.5 h-3.5" />}
                  {item.type === "customer" && <Users className="w-3.5 h-3.5" />}
                  {item.type === "shipped" && <ArrowUpRight className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{item.action}</p>
                  <p className="text-xs text-neutral-400 truncate">{item.detail}</p>
                </div>
                <span className="text-[10px] text-neutral-300 whitespace-nowrap mt-0.5">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* quick actions */}
        <div className="bg-white rounded-card border border-neutral-100 p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-neutral-900 mb-5">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/products"
              className="flex flex-col items-center gap-2.5 p-4 rounded-card border border-neutral-100 hover:border-brand-pink/20 hover:bg-brand-pink-light/30 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-brand-pink-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5 text-brand-pink" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Manage Products</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex flex-col items-center gap-2.5 p-4 rounded-card border border-neutral-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-neutral-700">View Orders</span>
            </Link>

            <Link
              href="/shop"
              className="flex flex-col items-center gap-2.5 p-4 rounded-card border border-neutral-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-neutral-700">View Store</span>
            </Link>

            <Link
              href="/deals"
              className="flex flex-col items-center gap-2.5 p-4 rounded-card border border-neutral-100 hover:border-brand-gold/30 hover:bg-amber-50/50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-brand-gold" />
              </div>
              <span className="text-xs font-medium text-neutral-700">Manage Deals</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
