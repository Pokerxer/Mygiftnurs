import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function POST() {
  try {
    await connectDB()

    const existing = await User.findOne({ email: "admin@mygiftnurs.com" })
    if (existing) {
      return NextResponse.json(
        { message: "Admin user already exists", email: "admin@mygiftnurs.com" },
        { status: 200 }
      )
    }

    const password = await bcrypt.hash("admin123", 12)
    const admin = await User.create({
      name: "Admin",
      email: "admin@mygiftnurs.com",
      password,
      role: "admin",
    })

    return NextResponse.json(
      {
        message: "Admin user created",
        email: "admin@mygiftnurs.com",
        password: "admin123",
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    )
  }
}
