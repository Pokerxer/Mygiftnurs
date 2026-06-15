"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { User, Mail, Save, Check } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name || "")
  const [email, setEmail] = useState(session?.user?.email || "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required")
      return
    }
    setSaving(true)
    try {
      await update({ name: name.trim() })
      setSaved(true)
      toast.success("Profile updated!")
      setTimeout(() => setSaved(false), 2000)
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Profile
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage your personal information.
        </p>
      </div>

      <div className="bg-white rounded-card border border-neutral-100 p-5 sm:p-6 space-y-5">
        {/* avatar */}
        <div className="flex items-center gap-4 pb-5 border-b border-neutral-100">
          {session?.user?.image ? (
            <div className="w-16 h-16 rounded-full overflow-hidden relative ring-2 ring-brand-pink/20">
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold text-xl">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-neutral-400">
              {session?.user?.email}
            </p>
            <p className="text-[10px] text-neutral-300 mt-0.5 capitalize">
              {session?.user?.role || "user"} account
            </p>
          </div>
        </div>

        {/* name */}
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
              placeholder="Your name"
            />
          </div>
        </div>

        {/* email */}
        <div>
          <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="email"
              value={email}
              disabled
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-btn bg-neutral-50 text-neutral-500 cursor-not-allowed"
            />
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Email cannot be changed. Contact support if needed.
          </p>
        </div>

        {/* save */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="flex items-center gap-2 bg-brand-pink text-white text-sm font-semibold px-5 py-2.5 rounded-pill hover:bg-brand-pink/90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
