import mongoose, { Schema, type Model } from "mongoose"

export interface IOrder {
  userId?: string
  email: string
  items: {
    productId: string
    name: string
    image: string
    price: number
    qty: number
  }[]
  shipping: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zip: string
    email: string
    phone?: string
  }
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  paystackReference?: string
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: String,
    email: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        name: String,
        image: String,
        price: Number,
        qty: Number,
      },
    ],
    shipping: {
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      email: String,
      phone: String,
    },
    subtotal: { type: Number, required: true },
    shipping_cost: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paystackReference: String,
  },
  { timestamps: true }
)

export const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema)
