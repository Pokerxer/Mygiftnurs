# Claude Code Agent Prompt — mygiftnurs E-Commerce Website

## Project Overview

Build a full-stack, production-ready gift e-commerce store called **mygiftnurs**. The design reference is a warm, feminine, pink-accented storefront (see design brief below). The platform must support product browsing, filtering, cart management, wishlisting, user authentication, and an admin dashboard for product/order management.

---

## Tech Stack (Latest Stable — June 2026)

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | 22 LTS |
| Framework | Next.js (App Router) | 16.x (Turbopack default) |
| Language | TypeScript | 5.x (strict mode) |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | v4.x (CSS-first config, no tailwind.config.js) |
| Components | shadcn/ui | latest (Tailwind v4 + React 19 build) |
| State Management | Redux Toolkit 2.x + RTK Query | 2.x |
| Database | MongoDB | 8.x |
| ODM | Mongoose | 9.x |
| Authentication | Auth.js (NextAuth) | v5 beta (production-stable) |
| Image Storage | Cloudinary | latest SDK |
| Payments | Stripe | latest SDK |
| Validation | Zod | v3 (Standard Schema compatible) |
| Forms | React Hook Form + @hookform/resolvers | latest |
| Package Manager | pnpm | 9.x |

### Key Next.js 16 Behaviors to Use
- **Turbopack** is the default bundler — no webpack config needed
- **Cache Components** are opt-in — all routes are dynamic by default (no `force-dynamic` needed)
- **`proxy.ts`** replaces middleware for network-layer concerns; use `middleware.ts` only for auth route protection
- **React Compiler** is built-in — no manual `useMemo`/`useCallback` wrapping needed
- **`use cache`** directive for explicit data caching instead of `fetch` cache options
- **PPR (Partial Prerendering)** — wrap dynamic parts in `<Suspense>` for instant static shells

### Tailwind CSS v4 Key Differences
- No `tailwind.config.js` — all theme config goes in CSS using `@theme` directive
- Single import: `@import "tailwindcss";` in your global CSS file
- Custom tokens defined with CSS custom properties inside `@theme {}`
- Install via: `pnpm add tailwindcss @tailwindcss/postcss`

### Auth.js v5 Key Patterns
- Single `NextAuth()` export in `lib/auth.ts` — no separate `authOptions`
- Route handler: `export const { GET, POST } = handlers` in `app/api/auth/[...nextauth]/route.ts`
- Server components: call `auth()` directly — no `getServerSession`
- Middleware: import `auth` from `lib/auth.ts` and use as middleware function

### Mongoose 9 Notes
- Requires Node.js 18+; Node.js 22 LTS is ideal
- `strictQuery` defaults to `true`
- `Model.find()` returns plain objects by default when using `.lean()`

---

## Project Initialization

```bash
pnpm create next-app@latest mygiftnurs \
  --typescript \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-tailwind   # We'll add Tailwind v4 manually

cd mygiftnurs

# Tailwind v4
pnpm add tailwindcss @tailwindcss/postcss

# shadcn/ui (auto-detects Tailwind v4)
pnpm dlx shadcn@latest init

# Core dependencies
pnpm add mongoose next-auth@beta @auth/mongodb-adapter
pnpm add @reduxjs/toolkit react-redux
pnpm add stripe @stripe/stripe-js @stripe/react-stripe-js
pnpm add cloudinary
pnpm add zod react-hook-form @hookform/resolvers
pnpm add bcryptjs
pnpm add sonner  # toast notifications (shadcn recommends over react-hot-toast)
pnpm add lucide-react

# Dev dependencies
pnpm add -D @types/bcryptjs @types/node tsx
```

---

## Design System (Tailwind v4 CSS-First Config)

In `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-brand-pink: #E8315B;
  --color-brand-pink-light: #FFF0F3;
  --color-brand-pink-pale: #FFD6E0;
  --color-brand-pink-banner: #FFE4EC;

  /* Neutrals */
  --color-neutral-900: #1A1A2E;
  --color-neutral-700: #4A4A68;
  --color-neutral-400: #9B9BB4;
  --color-neutral-100: #F8F8FC;

  /* Semantic */
  --color-star: #F59E0B;

  /* Typography */
  --font-display: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;

  /* Border Radius */
  --radius-card: 12px;
  --radius-pill: 9999px;
  --radius-btn: 8px;
}
```

Import Google Fonts in `src/app/layout.tsx`:
- `Playfair Display` (weights 700, 800) — display headings
- `Inter` (weights 400, 500, 600) — all body text

---

## Project Structure

```
src/
├── app/
│   ├── globals.css                  # Tailwind v4 @theme tokens
│   ├── layout.tsx                   # Root layout — fonts, Redux Provider, Toaster
│   ├── page.tsx                     # Homepage
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── shop/
│   │   ├── page.tsx                 # Product listing + filters
│   │   └── [slug]/page.tsx          # Product detail
│   ├── categories/[category]/page.tsx
│   ├── occasions/[occasion]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── account/
│   │   ├── page.tsx                 # Order history, profile
│   │   └── wishlist/page.tsx
│   ├── admin/
│   │   ├── layout.tsx               # Admin sidebar shell
│   │   ├── page.tsx                 # Dashboard stats
│   │   ├── products/page.tsx
│   │   └── orders/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts   # export { GET, POST } = handlers
│       ├── products/
│       │   ├── route.ts             # GET list, POST create
│       │   └── [id]/route.ts        # GET one, PUT, DELETE
│       ├── categories/route.ts
│       ├── orders/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── wishlist/route.ts
│       ├── reviews/route.ts
│       └── webhooks/stripe/route.ts
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── BestSellers.tsx
│   │   └── ValueProps.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCarousel.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── StarRating.tsx
│   │   └── FilterSidebar.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   └── admin/
│       ├── Sidebar.tsx
│       ├── ProductForm.tsx
│       └── OrdersTable.tsx
├── lib/
│   ├── mongodb.ts                   # Mongoose 9 connection singleton
│   ├── auth.ts                      # Auth.js v5 — single NextAuth() export
│   ├── stripe.ts
│   ├── cloudinary.ts
│   └── validators/
│       ├── product.schema.ts        # Zod schemas (shared client + server)
│       ├── order.schema.ts
│       └── user.schema.ts
├── models/
│   ├── Product.ts
│   ├── Order.ts
│   ├── User.ts
│   ├── Category.ts
│   └── Review.ts
├── store/
│   ├── index.ts                     # configureStore
│   ├── provider.tsx                 # Client-side Redux Provider wrapper
│   ├── api/baseApi.ts               # RTK Query createApi
│   └── slices/
│       ├── cartSlice.ts
│       ├── wishlistSlice.ts
│       └── uiSlice.ts
├── hooks/
│   ├── useCart.ts
│   ├── useWishlist.ts
│   └── useDebounce.ts
├── types/
│   └── index.ts
└── middleware.ts                    # Auth.js v5 route protection
```

---

## Auth.js v5 Setup

```ts
// src/lib/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb-client"  // separate client for adapter
import bcrypt from "bcryptjs"
import User from "@/models/User"
import dbConnect from "./mongodb"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({ email: credentials.email })
        if (!user || !user.passwordHash) return null
        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        if (!valid) return null
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role as string
      return session
    }
  }
})
```

```ts
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers
```

```ts
// src/middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.role === "admin"

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if ((pathname.startsWith("/account") || pathname.startsWith("/checkout")) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout"]
}
```

---

## Mongoose 9 Models

```ts
// src/models/Product.ts
import mongoose, { Schema, model, models } from "mongoose"

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  compareAtPrice: Number,
  images: [String],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  occasions: [String],
  tags: [String],
  stock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true })

export default models.Product || model("Product", ProductSchema)
```

Define similarly for: Category, Order, User (with `role: { type: String, enum: ['customer','admin'], default: 'customer' }`), Review.

---

## Redux Toolkit 2.x Setup

```ts
// src/store/slices/cartSlice.ts — RTK 2.x builder callback syntax
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  qty: number
  stock: number
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], isDrawerOpen: false } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.productId === action.payload.productId)
      if (existing) {
        existing.qty = Math.min(existing.qty + 1, existing.stock)
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.productId !== action.payload)
    },
    updateQty(state, action: PayloadAction<{ productId: string; qty: number }>) {
      const item = state.items.find(i => i.productId === action.payload.productId)
      if (item) item.qty = action.payload.qty
    },
    clearCart(state) { state.items = [] },
    toggleDrawer(state) { state.isDrawerOpen = !state.isDrawerOpen },
  }
})

export const { addItem, removeItem, updateQty, clearCart, toggleDrawer } = cartSlice.actions
export default cartSlice.reducer
```

```ts
// src/store/api/baseApi.ts — RTK Query 2.x
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products", "Orders", "Reviews", "Wishlist"],
  endpoints: () => ({})
})

// Injected endpoints in separate files:
// productsApi.ts — getProducts, getProductBySlug, createProduct, updateProduct
// ordersApi.ts — createOrder, getMyOrders, getOrderById, getAllOrders (admin)
// reviewsApi.ts — getReviews, addReview
```

```ts
// src/store/provider.tsx — must be a Client Component
"use client"
import { Provider } from "react-redux"
import { store } from "./index"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
```

---

## Homepage Sections — Pixel-Faithful Implementation

### 1. Announcement Bar
```
Background: var(--color-brand-pink-banner)
Text: "🎁 Free Shipping on orders above $50!"
Font: Inter 13px font-medium
Full-width sticky top-0 z-50, height 36px, centered text
```

### 2. Navbar
```
White background, 1px bottom border in neutral-100
Logo: 🎁 + "my" (neutral-900) + "giftnurs" (brand-pink) — font-display bold
Nav: Home | Shop | Categories ▾ | Occasions ▾ | Personalized | New Arrivals | Deals
Active: brand-pink with bottom underline
Right: Search (modal) | Account | Wishlist (badge count) | Cart (badge count)
Mobile: hamburger → slide-in MobileMenu drawer
```

### 3. Hero Banner
```
Container: brand-pink-light bg, rounded-2xl, overflow-hidden, mx-4 my-4
Left col (55%):
  - Eyebrow: "Thoughtful Gifts, Happy Moments 🤍" — Inter 14px neutral-700
  - H1: "Find the Perfect Gift" — font-display 48px neutral-900 font-extrabold
  - H1: "For Every Occasion" — font-display 48px brand-pink font-extrabold
  - Body copy — Inter 16px neutral-700
  - [Shop Now →] brand-pink filled pill btn
  - [Explore Categories 🎁] white bordered pill btn
Right col (45%): next/image hero product scene
```

### 4. Trust Badges Strip
```
4-column grid with vertical dividers, py-6
Each: brand-pink icon 32px + bold label + neutral-400 sub-label
- Free Shipping | Secure Payment | Easy Returns | 24/7 Support
```

### 5. Shop by Category
```
Section heading "Shop by Category" + "View All →" right-aligned
6-col responsive grid (2 mobile, 3 tablet, 6 desktop)
CategoryCard: pastel bg, next/image, category name
Cards: Personalized Gifts | Birthday Gifts | Anniversary Gifts | Gifts for Him | Gifts for Her | Graduation Gifts
hover: scale-105 shadow-md transition-all
```

### 6. Best Sellers Carousel
```
Heading "Best Sellers" + "View All →"
Horizontal scroll with prev/next arrow buttons (absolute positioned)
ProductCard:
  - aspect-square image, rounded-card, overflow-hidden, next/image
  - Heart icon top-right (white circle bg) — toggles wishlist via Redux
  - Product name Inter 14px font-medium
  - Price: sale = brand-pink (new) + neutral-400 line-through (old); else neutral-900
  - <StarRating /> + "(128)" review count
```

### 7. Value Props Strip
```
4-column, brand-pink icon circles, bold label + muted sub-label
Personalized Just for You | Best Prices Guaranteed | Quality You Can Trust | Gifts That Create Memories
```

---

## API Routes Specification

All API responses follow: `{ success: boolean, data?: unknown, error?: string }`

### GET /api/products
Query: `category`, `occasion`, `minPrice`, `maxPrice`, `sort` (newest|price-asc|price-desc|rating), `page`, `limit`, `q`
Returns: `{ products, total, pages }`
Use `'use cache'` directive with appropriate cache tags for revalidation.

### POST /api/products (admin)
Zod-validated body, Cloudinary upload, returns created product

### GET/PUT/DELETE /api/products/[id]
PUT and DELETE: verify `role === 'admin'` via `auth()` call

### POST /api/orders
Zod-validated, creates order, decrements stock atomically

### POST /api/webhooks/stripe
Verify Stripe signature with `stripe.webhooks.constructEvent()`
On `payment_intent.succeeded` → update order `paymentStatus: 'paid'`

---

## Toasts (Sonner — shadcn recommended)

```tsx
// In layout.tsx
import { Toaster } from "sonner"
// <Toaster position="bottom-right" richColors />

// Usage
import { toast } from "sonner"
toast.success("Added to cart ✓")
toast.success("Saved to wishlist ❤️")
toast.error("Something went wrong")
```

---

## shadcn/ui Components to Install

```bash
pnpm dlx shadcn@latest add button input label badge sheet dialog
pnpm dlx shadcn@latest add skeleton card separator avatar
pnpm dlx shadcn@latest add dropdown-menu navigation-menu
pnpm dlx shadcn@latest add form select slider checkbox
pnpm dlx shadcn@latest add table pagination
```

Use shadcn Sheet for CartDrawer and MobileMenu (slide-in panels).
Use shadcn Dialog for Search modal.
Use shadcn Skeleton for product loading states.

---

## Seed Data Script

```ts
// scripts/seed.ts — run with: npx tsx scripts/seed.ts
```

Script must:
1. Connect to MongoDB via Mongoose 9
2. Clear products, categories, users
3. Seed 6 categories with matching pastel colors
4. Seed 20 products spread across categories with realistic prices ($9.99–$79.99), ratings (3.8–5.0), review counts
5. Create admin: `admin@mygiftnurs.com` / `Admin@1234` with `role: 'admin'`

---

## Environment Variables (.env.local.example)

```env
MONGODB_URI=
AUTH_SECRET=                          # replaces NEXTAUTH_SECRET in Auth.js v5
AUTH_URL=http://localhost:3000        # replaces NEXTAUTH_URL
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Key UI Behaviors

1. **Cart Drawer** — shadcn `Sheet` from right; items, subtotal, "View Cart" + "Checkout" buttons
2. **Wishlist Heart** — filled/outline toggle; badge on navbar; persisted in Redux + localStorage; synced to DB when logged in
3. **Search Modal** — shadcn `Dialog`, live search debounced 300ms, results show ProductCards inline
4. **Category Mega Menu** — shadcn `NavigationMenu` with category grid on hover (desktop), accordion on mobile
5. **Image Gallery** — thumbnail strip on product detail, main image swap on click
6. **Toast Notifications** — Sonner, bottom-right, richColors
7. **Skeleton Loaders** — shadcn `Skeleton` during RTK Query `isLoading` states
8. **Responsive** — 320px / 768px / 1024px / 1280px breakpoints

---

## Implementation Order

Build in this sequence to avoid blocking dependencies:

1. `globals.css` — Tailwind v4 `@theme` tokens, Google Font imports
2. `lib/mongodb.ts` — Mongoose 9 singleton connection
3. `models/` — all Mongoose schemas
4. `lib/validators/` — Zod schemas
5. `lib/auth.ts` + `api/auth/[...nextauth]/route.ts` — Auth.js v5
6. `middleware.ts` — route protection
7. `store/` — Redux slices + RTK Query baseApi
8. `store/provider.tsx` — ReduxProvider client component
9. `app/layout.tsx` — wrap with ReduxProvider + Toaster + fonts
10. API routes — products, categories, orders, reviews, webhook
11. shadcn/ui installs — all needed components
12. Layout components — AnnouncementBar, Navbar, Footer, MobileMenu
13. Homepage sections — Hero, TrustBadges, CategoryGrid, BestSellers, ValueProps
14. Shop page — ProductGrid + FilterSidebar
15. Product detail page — gallery, add-to-cart, reviews
16. Cart drawer + Cart page
17. Checkout page — Stripe Elements
18. Account pages — orders, wishlist
19. Admin dashboard — stats, products table, orders table
20. Seed script
21. `README.md` — setup and run instructions

---

## Quality Requirements

- All components fully typed — no `any`, strict TypeScript 5.x
- No manual `useMemo`/`useCallback` — React Compiler handles memoization
- API routes: consistent `{ success, data, error }` response shape
- All forms: React Hook Form + Zod resolver + shadcn Form components
- All images: `next/image` with explicit `width`/`height` or `fill` + `sizes`
- DB queries: try/catch with proper HTTP error responses
- Mobile-first responsive: 320px → 768px → 1024px → 1280px
- Accessibility: `aria-label` on all icon buttons, visible focus rings, WCAG AA color contrast
- Loading states: RTK Query `isLoading` + shadcn Skeleton on all async data
- `'use cache'` directive on product list and category data fetches for PPR compatibility
- Stripe webhook handler: always return 200 fast, process async

---

*Design reference: warm pink (#E8315B primary) feminine gift storefront — Playfair Display display headings, Inter body, card-based product layout, brand-pink-light section backgrounds, rounded-card product images.*
