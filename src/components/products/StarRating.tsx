import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md"
}

export default function StarRating({ rating, reviewCount, size = "sm" }: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= Math.round(rating) ? "fill-star text-star" : "fill-transparent text-neutral-400"
          }`}
        />
      ))}
      {reviewCount !== undefined && (
        <span className="text-neutral-400 text-xs ml-1">({reviewCount})</span>
      )}
    </div>
  )
}
