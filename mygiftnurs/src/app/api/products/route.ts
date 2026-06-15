import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Product } from "@/models/Product"

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)

    const filters: Record<string, unknown> = {}
    const sort: Record<string, 1 | -1> = {}
    const page = Math.max(1, Number(searchParams.get("page")) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 12))

    if (searchParams.get("category")) {
      filters.category = searchParams.get("category")!.split(",")
    }
    if (searchParams.get("occasion")) {
      filters.occasions = { $in: searchParams.get("occasion")!.split(",") }
    }
    if (searchParams.get("q")) {
      const q = searchParams.get("q")!
      filters.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ]
    }
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) {
      filters.price = {}
      if (searchParams.get("minPrice")) {
        (filters.price as Record<string, unknown>).$gte = Number(searchParams.get("minPrice"))
      }
      if (searchParams.get("maxPrice")) {
        (filters.price as Record<string, unknown>).$lte = Number(searchParams.get("maxPrice"))
      }
    }

    switch (searchParams.get("sort")) {
      case "price-asc": sort.price = 1; break
      case "price-desc": sort.price = -1; break
      case "rating": sort.rating = -1; break
      default: sort.createdAt = -1
    }

    const [products, total] = await Promise.all([
      Product.find(filters).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Product.countDocuments(filters),
    ])

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
