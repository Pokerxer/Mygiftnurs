import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { Order } from "@/models/Order"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()
  const orders = await Order.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean()

  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  const session = await auth()

  try {
    const body = await req.json()
    const { items, shipping, subtotal, shipping_cost, tax, total } = body

    if (!items?.length || !shipping || !total) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 })
    }

    await connectDB()
    const order = await Order.create({
      userId: session?.user?.id,
      email: shipping.email,
      items,
      shipping,
      subtotal,
      shipping_cost,
      tax,
      total,
      status: "pending",
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
