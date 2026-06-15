# MyGiftNurs Admin Dashboard

A modern admin dashboard for the MyGiftNurs e-commerce platform built with Next.js 14 and Tailwind CSS.

## Features

- **Dashboard** - Overview with stats, recent orders, top products, and quick actions
- **Products** - Manage product inventory with filtering and search
- **Orders** - Track and manage customer orders
- **Customers** - View customer information and order history
- **Settings** - Configure store, payments, shipping, and notifications
- **Analytics** - Sales and performance insights
- **Reviews** - Manage customer reviews
- **Discounts** - Create and manage promotional codes

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Radix UI primitives
- Zustand (state management)
- Lucide React (icons)
- Recharts (data visualization)

## Getting Started

### Prerequisites

- Node.js 18+
- MyGiftNurs Backend running on port 9000

### Installation

```bash
cd admin
npm install
```

### Development

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:7000`

### Build

```bash
npm run build
npm start
```

## Project Structure

```
admin/
├── src/
│   ├── app/
│   │   ├── (dashboard)/     # Dashboard routes
│   │   │   ├── page.tsx     # Main dashboard
│   │   │   ├── products/    # Products management
│   │   │   ├── orders/     # Orders management
│   │   │   ├── customers/   # Customer management
│   │   │   └── settings/    # Store settings
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/         # Reusable components
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── store/
│   │   └── admin-store.ts   # Zustand store
│   └── types/
│       └── index.ts         # TypeScript types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Configuration

The admin dashboard connects to the Medusa backend. Make sure the backend is configured with:

```env
STORE_CORS=http://localhost:7000
ADMIN_CORS=http://localhost:7000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard overview |
| `/products` | Product management |
| `/orders` | Order management |
| `/customers` | Customer management |
| `/settings` | Store settings |
| `/analytics` | Sales analytics |
| `/reviews` | Review management |
| `/discounts` | Discount codes |

## Customization

The dashboard uses a consistent design system with:

- CSS variables for theming
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Lucide React for iconography

To customize colors, edit `globals.css` and update the CSS variables in the `:root` selector.
