"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Loader2 } from "lucide-react"
import Logo from "@/components/ui/Logo"
import { toast } from "sonner"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Failed to create account")
      } else {
        toast.success("Account created! Please sign in.")
        router.push("/auth/signin")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-4">
          <Logo size="lg" />
        </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Create an account
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Join us to discover thoughtful gifts
          </p>
        </div>

        {/* form */}
        <div className="bg-white rounded-card border border-neutral-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink transition-all"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink transition-all"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-neutral-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink transition-all"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink transition-all"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-[11px] text-red-500 mt-1">Passwords don&apos;t match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-brand-pink text-white text-sm font-semibold py-3 rounded-pill hover:bg-brand-pink/90 active:scale-[0.97] disabled:opacity-50 transition-all duration-200"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* footer */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-brand-pink font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
