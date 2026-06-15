import { NextResponse } from "next/server"

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY

async function verifyPaystack(reference: string) {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    }
  )
  return res.json()
}

export async function POST(req: Request) {
  try {
    if (!PAYSTACK_SECRET) {
      return NextResponse.json(
        { error: "Paystack is not configured" },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { reference, items, shipping, subtotal, shipping_cost, tax, total } =
      body

    if (!reference) {
      return NextResponse.json(
        { error: "Missing payment reference" },
        { status: 400 }
      )
    }

    if (!items?.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    const verification = await verifyPaystack(reference)

    if (!verification.status || verification.data?.status !== "success") {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      )
    }

    const { Order } = await import("@/models/Order")
    const { connectDB } = await import("@/lib/mongodb")

    await connectDB()

    const order = await Order.create({
      email: shipping?.email || verification.data?.customer?.email,
      items: items.map((i: any) => ({
        productId: i.productId,
        name: i.name,
        image: i.image,
        price: i.price,
        qty: i.qty,
      })),
      shipping: {
        firstName: shipping?.firstName || "",
        lastName: shipping?.lastName || "",
        address: shipping?.address || "",
        city: shipping?.city || "",
        state: shipping?.state || "",
        zip: shipping?.zip || "",
        email: shipping?.email || "",
        phone: shipping?.phone || "",
      },
      subtotal,
      shipping_cost,
      tax,
      total,
      status: "paid",
      paystackReference: reference,
    })

    return NextResponse.json({ success: true, orderId: order._id })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Order processing failed" },
      { status: 500 }
    )
  }
}
