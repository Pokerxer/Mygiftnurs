import mongoose, { Schema, type Model } from "mongoose"

export interface IProduct {
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  image: string
  category: string
  occasions: string[]
  tags: string[]
  stock: number
  isFeatured: boolean
  isBestSeller: boolean
  isNewArrival?: boolean
  rating: number
  reviewCount: number
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: Number,
    image: { type: String, required: true },
    category: { type: String, required: true },
    occasions: [String],
    tags: [String],
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: Boolean,
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema)
