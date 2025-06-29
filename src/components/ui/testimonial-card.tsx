import { cn } from "@/lib/utils"
import Image from "next/image"
import { Star } from "lucide-react"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
  role: string
  rating: number
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
  key?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  return (
    <figure className={cn(
      "flex w-[384px] shrink-0 flex-col gap-6",
      "rounded-2xl border border-gray-200 p-8",
      "bg-white/50 backdrop-blur-sm",
      "transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={author.avatar}
            alt={author.name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900">
            {author.name}
          </div>
          <div className="text-gray-500">
            {author.handle}
          </div>
        </div>
      </div>

      <blockquote className="text-lg text-gray-600 leading-relaxed">
        "{text}"
      </blockquote>

      {author.rating && (
        <div className="flex mt-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < (author.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
              }`}
            />
          ))}
        </div>
      )}
    </figure>
  )
} 