# MyGiftNurs Backend

MedusaJS-powered backend for the MyGiftNurs e-commerce platform.

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start PostgreSQL and Redis

Make sure PostgreSQL and Redis are running locally or update the connection URLs in `.env`.

### 4. Run Database Migrations

```bash
npm run db:migrate
```

### 5. Seed Initial Data (Optional)

```bash
npm run db:seed
```

### 6. Start Development Server

```bash
npm run develop
```

## API Endpoints

### Store API

- `GET /store/mygiftnurs/products` - List products with filters
- `GET /store/mygiftnurs/products/:id` - Get product details
- `GET /store/mygiftnurs/products/:id/related` - Get related products
- `GET /store/mygiftnurs/products/:id/reviews` - Get product reviews
- `POST /store/mygiftnurs/products/:id/reviews` - Create a review
- `GET /store/mygiftnurs/collections/:id/products` - Get collection products
- `GET /store/mygiftnurs/categories` - List categories
- `GET /store/mygiftnurs/featured` - Get featured products
- `GET /store/mygiftnurs/best-sellers` - Get best sellers
- `GET /store/mygiftnurs/search` - Search products
- `GET /store/mygiftnurs/wishlist` - Get wishlist
- `POST /store/mygiftnurs/wishlist` - Add to wishlist
- `DELETE /store/mygiftnurs/wishlist/:productId` - Remove from wishlist

### Payment API

- `POST /store/mygiftnurs/payment/initialize` - Initialize Paystack payment
- `POST /store/mygiftnurs/payment/verify` - Verify payment status
- `GET /store/mygiftnurs/payment/sessions` - List payment sessions

### Admin API

- `POST /admin/mygiftnurs/products/import` - Import products
- `POST /admin/mygiftnurs/products/export` - Export products
- `GET /admin/mygiftnurs/analytics` - Get analytics dashboard
- `GET /admin/mygiftnurs/analytics/sales` - Get sales analytics
- `GET /admin/mygiftnurs/analytics/products` - Get product analytics
- `GET /admin/mygiftnurs/reviews` - Manage reviews
- `POST /admin/mygiftnurs/orders/:id/fulfill` - Fulfill order
- `POST /admin/mygiftnurs/orders/:id/return` - Process return
- `GET /admin/mygiftnurs/inventory` - Manage inventory

## Medusa Admin Dashboard

Access the admin dashboard at `http://localhost:7000` after starting the server.

## Available Scripts

- `npm run develop` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build for production
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run lint` - Run linter

## Project Structure

```
backend/
├── medusa-config.js      # Medusa configuration
├── package.json
├── src/
│   ├── api/
│   │   └── routes/
│   │       ├── store/     # Store API routes
│   │       └── admin/     # Admin API routes
│   ├── models/            # Database models
│   ├── services/          # Custom services
│   ├── subscribers/       # Event subscribers
│   ├── migrations/        # Database migrations
│   └── scripts/           # Seed scripts
```

## Payment Integration

The backend includes Paystack integration for Nigerian Naira (NGN) payments.

### Paystack Setup

1. Create a Paystack account at https://paystack.com
2. Get your API keys from the Paystack dashboard
3. Add keys to `.env`:
   ```
   PAYSTACK_SECRET_KEY=sk_live_...
   PAYSTACK_PUBLIC_KEY=pk_live_...
   PAYSTACK_WEBHOOK_SECRET=whsec_...
   ```

## Customization

### Extending Product Model

The product model includes custom metadata fields:
- `category_id` - Links to custom categories
- `brand_id` - Brand identifier
- `rating` - Average product rating
- `review_count` - Number of reviews
- `is_bestseller` - Bestseller flag
- `is_featured` - Featured flag
- `estimated_delivery_days` - Delivery time estimate
- `specifications` - Custom specifications
- `materials` - Materials used
- `care_instructions` - Care instructions

## License

Proprietary - MyGiftNurs E-commerce Platform
