import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg", gap: "gap-1" },
    md: { icon: 34, text: "text-xl", gap: "gap-1.5" },
    lg: { icon: 44, text: "text-3xl", gap: "gap-2" },
  }

  const s = sizes[size]

  return (
    <Link
      href="/"
      className={`flex items-center ${s.gap} shrink-0 group/logo ${className}`}
      aria-label="mygiftnurs — Home"
    >
      {/* gift box mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:-rotate-3"
        aria-hidden
      >
        {/* box body */}
        <rect x="4" y="18" width="36" height="22" rx="4" fill="#FFF0F3" stroke="#E8315B" strokeWidth="2" />

        {/* box lid */}
        <rect x="2" y="12" width="40" height="8" rx="3" fill="#E8315B" />

        {/* ribbon vertical */}
        <rect x="19" y="12" width="6" height="28" rx="1" fill="#FFD6E0" opacity="0.7" />

        {/* ribbon horizontal */}
        <rect x="4" y="20" width="36" height="5" rx="1" fill="#FFD6E0" opacity="0.7" />

        {/* bow left */}
        <path
          d="M16 12C16 8 13 5 10 5C7 5 5 7.5 5 10C5 11.5 6 12 7 12L16 12Z"
          fill="#E8315B"
        />
        {/* bow right */}
        <path
          d="M28 12C28 8 31 5 34 5C37 5 39 7.5 39 10C39 11.5 38 12 37 12L28 12Z"
          fill="#E8315B"
        />
        {/* bow center */}
        <circle cx="22" cy="12" r="3" fill="#F2C572" />

        {/* sparkle */}
        <circle cx="35" cy="8" r="1.5" fill="#F2C572" className="animate-twinkle" />
        <circle cx="9" cy="7" r="1" fill="#FFD6E0" className="animate-twinkle" style={{ animationDelay: "0.8s" }} />
      </svg>

      {/* wordmark */}
      <span className={`${s.text} font-display font-extrabold leading-none tracking-tight select-none`}>
        <span className="text-neutral-900 transition-colors duration-200 group-hover/logo:text-brand-pink">my</span>
        <span className="text-brand-pink">giftnurs</span>
      </span>
    </Link>
  )
}
