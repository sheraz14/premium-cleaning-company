'use client'

import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor, TestimonialCardProps } from "./testimonial-card"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Particles } from "./particles"
import { useEffect, useState } from "react"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  const { theme } = useTheme()
  const [color, setColor] = useState("#000000")
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#333333")
  }, [theme])

  // Duplicate testimonials to ensure continuous loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className={cn(
      "py-4 md:py-4 relative bg-gradient-to-b from-white/50 to-slate-50/30 overflow-hidden",
      className
    )}>
      {/* Background decoration */}
      <Particles
        className="absolute inset-0 -z-10 opacity-80"
        quantity={100}
        staticity={30}
        ease={70}
        color={color}
        size={1}
        refresh={false}
        vx={0.2}
        vy={-0.1}
      />

      <div className="mb-2 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-badge"
        >
          <Sparkles className="h-6 w-5 mr-2 text-purple-800" />
          <span className="text-base font-medium text-purple-800">
            Testimonials
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 inline-block text-transparent bg-clip-text">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden group">
          <div className="flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:100s]">
            <div
              className={cn(
                "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
                "transition-[animation-play-state] will-change-transform",
                isPaused && "animation-play-state-paused"
              )}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex gap-8">
                {duplicatedTestimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`testimonial-${i}`}
                    {...testimonial}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/80 sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/80 sm:block" />
        </div>
      </div>

      {/* Section bottom gradient rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  )
} 