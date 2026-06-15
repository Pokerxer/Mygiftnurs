import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { connectDB } from "./mongodb"
import { User } from "@/models/User"

const providers = []

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  )
}

providers.push(
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email as string | undefined
      const password = credentials?.password as string | undefined

      if (!email || !password) return null

      await connectDB()
      const user = await User.findOne({ email }).select("+password").lean()
      if (!user || !user.password) return null

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) return null

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      }
    },
  })
)

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  trustHost: true,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id!
        token.role = (user as any).role ?? "user"
      }
      if (trigger === "update" && session) {
        Object.assign(token, session)
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as string) ?? "user"
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
})
