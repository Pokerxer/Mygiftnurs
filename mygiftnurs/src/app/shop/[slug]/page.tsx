import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Truck, RotateCcw, Shield, Gift, ChevronRight } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog-live"
import AddToCartSection from "./AddToCartSection"
import StarRating from "@/components/products/StarRating"
import ProductCard from "@/components/products/ProductCard"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Product Not Found | mygiftnurs" }
  return {
    title: `${product.name} | mygiftnurs`,
    description: product.description,
  }
}

const TRUST_ITEMS = [
  { icon: Truck, label: "Free shipping on orders ₦112,500+" },
  { icon: RotateCcw, label: "30-day easy returns" },
  { icon: Shield, label: "Secure checkout" },
  { icon: Gift, label: "Gift wrapping available" },
]

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product)
  const isSale = product.compareAtPrice !== undefined && product.compareAtPrice > product.price
  const discount = isSale
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0

  return (
    <div className="min-h-screen">
      {/* breadcrumb bar */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-brand-pink transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li>
                <Link href="/shop" className="hover:text-brand-pink transition-colors">Shop</Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li>
                <Link
                  href={`/shop?category=${product.category}`}
                  className="hover:text-brand-pink transition-colors capitalize"
                >
                  {product.category.replace("-", " ")}
                </Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-neutral-700 font-medium truncate max-w-48" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* main product section */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* image — sticky on desktop */}
          <div className="md:sticky md:top-24">
            <div className="aspect-square rounded-card overflow-hidden bg-neutral-100 relative group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />

              {/* badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isSale && (
                  <span className="bg-brand-pink text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-pill shadow-md">
                    -{discount}% OFF
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-white text-neutral-900 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-pill shadow-md">
                    New Arrival
                  </span>
                )}
                {product.isBestSeller && !isSale && (
                  <span className="bg-brand-gold text-neutral-900 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-pill shadow-md">
                    Bestseller
                  </span>
                )}
              </div>
            </div>

            {/* trust strip under image */}
            <div className="hidden md:grid grid-cols-2 gap-3 mt-4">
              {TRUST_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 p-3 rounded-card bg-neutral-50 border border-neutral-100"
                  >
                    <span className="w-8 h-8 rounded-full bg-brand-pink-light flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-pink" />
                    </span>
                    <span className="text-xs font-medium text-neutral-600">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* title + rating */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-pink mb-2">
                {product.category.replace("-", " ")}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              </div>
            </div>

            {/* price */}
            <div className="flex items-baseline gap-3">
              <span className={`text-2xl sm:text-3xl font-bold ${isSale ? "text-brand-pink" : "text-neutral-900"}`}>
                ₦{product.price.toLocaleString()}
              </span>
              {isSale && (
                <>
                  <span className="text-base sm:text-lg text-neutral-400 line-through">
                    ₦{product.compareAtPrice!.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-brand-pink bg-brand-pink-light px-2.5 py-1 rounded-pill">
                    Save ₦{(product.compareAtPrice! - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* description */}
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-pill capitalize hover:bg-brand-pink-light hover:text-brand-pink transition-colors cursor-default"
                >
                  {tag.replace("-", " ")}
                </span>
              ))}
            </div>

            {/* divider */}
            <div className="border-t border-neutral-100" />

            {/* add to cart */}
            <AddToCartSection product={product} />

            {/* product details accordion */}
            <div className="border border-neutral-100 rounded-card divide-y divide-neutral-100 mt-2">
              <details className="group">
                <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-semibold text-neutral-900 hover:text-brand-pink transition-colors list-none">
                  Product Details
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed space-y-2">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-xs"><span className="font-medium text-neutral-700">Category:</span> {product.category.replace("-", " ")}</div>
                    <div className="text-xs"><span className="font-medium text-neutral-700">Occasion:</span> {product.occasions.map(o => o.replace("-", " ")).join(", ")}</div>
                    <div className="text-xs"><span className="font-medium text-neutral-700">Rating:</span> {product.rating} / 5</div>
                    <div className="text-xs"><span className="font-medium text-neutral-700">Reviews:</span> {product.reviewCount}</div>
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-semibold text-neutral-900 hover:text-brand-pink transition-colors list-none">
                  Shipping & Returns
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed space-y-2">
                  <p><strong>Standard shipping:</strong> 5-7 business days (free over ₦112,500)</p>
                  <p><strong>Express shipping:</strong> 2-3 business days (₦15,000)</p>
                  <p><strong>Returns:</strong> Unused items can be returned within 30 days for a full refund. Gift items include a prepaid return label.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* related products */}
        {related.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-neutral-900">
                You may also like
              </h2>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs sm:text-sm font-medium text-brand-pink hover:underline underline-offset-2 flex items-center gap-1"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-6 sm:gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* mobile trust strip */}
      <div className="md:hidden border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 gap-3">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-pink-light flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand-pink" />
                  </span>
                  <span className="text-[11px] font-medium text-neutral-600">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
