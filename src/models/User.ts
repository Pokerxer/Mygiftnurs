import mongoose, { Schema, type Model } from "mongoose"

export interface IUser {
  name: string
  email: string
  password?: string
  image?: string
  role: "user" | "admin"
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    image: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
)

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema)
