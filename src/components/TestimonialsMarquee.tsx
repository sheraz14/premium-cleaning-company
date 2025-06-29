"use client"
import { useState, useEffect } from 'react'
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Particles } from "@/components/ui/particles"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Original testimonials array
const originalTestimonials = [
  {
    author: {
      name: "Sarah Johnson",
      handle: "@SarahJHome",
      avatar: "https://i.pravatar.cc/150?img=5", // Young caucasian female
      role: "Homeowner",
      rating: 5
    },
    text: "I've trusted Dust Drifters for over a year now. They always arrive on time, work quietly, and leave my home spotless. Highly recommend!",
    href: "https://twitter.com/SarahJHome"
  },
  {
    author: {
      name: "Michael Chen",
      handle: "@MichaelChenOps",
      avatar: "https://i.pravatar.cc/150?img=12", // Asian male
      role: "Office Manager",
      rating: 5
    },
    text: "Switching to Dust Drifters for our weekly office clean was the best decision. Their team is thorough and respects our schedule. The workspace feels brand new.",
    href: "https://twitter.com/MichaelChenOps"
  },
  {
    author: {
      name: "Emily Rodriguez",
      handle: "@EmilyRProperties",
      avatar: "https://i.pravatar.cc/150?img=25", // Latina female
      role: "Property Manager",
      rating: 5
    },
    text: "I manage several rental units and Dust Drifters has never let me down. They're flexible, professional, and always do a deep clean before move‑ins.",
    href: "https://twitter.com/EmilyRProperties"
  },
  {
    author: {
      name: "David Thompson",
      handle: "@DThompsonFood",
      avatar: "https://i.pravatar.cc/150?img=53", // Caucasian male
      role: "Restaurant Owner",
      rating: 4
    },
    text: "Cleanliness in a kitchen is non‑negotiable. Dust Drifters knows this—every nook and cranny gets attention. Love their eco‑friendly approach.",
    href: "https://twitter.com/DThompsonFood"
  },
  {
    author: {
      name: "Jennifer Lee",
      handle: "@JenLeeHealth",
      avatar: "https://i.pravatar.cc/150?img=41", // Asian female
      role: "Healthcare Facility Director",
      rating: 5
    },
    text: "Our clinic needs spotless conditions. Dust Drifters follows strict protocols and uses hospital‑grade products. We trust them completely.",
    href: "https://twitter.com/JenLeeHealth"
  },
  {
    author: {
      name: "Carlos Martinez",
      handle: "@CarlosM_Retail",
      avatar: "https://i.pravatar.cc/150?img=15", // Latino male
      role: "Retail Store Owner",
      rating: 5
    },
    text: "Sales floor looks amazing after every visit from Dust Drifters. Their team is courteous and never misses a spot. Customers notice the difference.",
    href: "https://twitter.com/CarlosM_Retail"
  },
  {
    author: {
      name: "Priya Singh",
      handle: "@PriyaSalonMgr",
      avatar: "https://i.pravatar.cc/150?img=28", // Indian female
      role: "Salon Manager",
      rating: 4
    },
    text: "Our salon must look perfect for clients. Dust Drifters does a great job on mirrors and floors. Friendly staff and reliable service.",
    href: "https://twitter.com/PriyaSalonMgr"
  },
  {
    author: {
      name: "Tom Becker",
      handle: "@TomBeckerGym",
      avatar: "https://i.pravatar.cc/150?img=54", // Caucasian male
      role: "Gym Owner",
      rating: 5
    },
    text: "Gym cleaning is tough but Dust Drifters makes it easy. Equipment shines and floors are disinfected. Members always comment on how fresh it feels.",
    href: "https://twitter.com/TomBeckerGym"
  },
  {
    author: {
      name: "Linda Wu",
      handle: "@PrincipalWu",
      avatar: "https://i.pravatar.cc/150?img=45", // Asian female
      role: "School Principal",
      rating: 5
    },
    text: "With hundreds of students, we need reliable cleaners. Dust Drifters adapts to our schedule and does a thorough job every week.",
    href: "https://twitter.com/PrincipalWu"
  },
  {
    author: {
      name: "Omar Farouk",
      handle: "@OmarEventCoord",
      avatar: "https://i.pravatar.cc/150?img=58", // Middle Eastern male
      role: "Event Coordinator",
      rating: 4
    },
    text: "After busy events, Dust Drifters swoops in and leaves the venue spotless. Fast service and polite team. Makes my job easier.",
    href: "https://twitter.com/OmarEventCoord"
  },
  {
    author: {
      name: "Emily Carter",
      handle: "@EmilyC_CleanHome",
      avatar: "https://i.pravatar.cc/150?img=9", // Caucasian female
      role: "Homeowner",
      rating: 5
    },
    text: "Booked Dust Drifters for a move‑out clean. They covered vents, scrubbed grout, and even cleaned inside cabinets. Fantastic attention to detail.",
    href: "https://twitter.com/EmilyC_CleanHome"
  },
  {
    author: {
      name: "Jason Lee",
      handle: "@JasonLeeBiz",
      avatar: "https://i.pravatar.cc/150?img=62", // Asian male
      role: "Office Manager",
      rating: 4
    },
    text: "We had a coffee spill in the morning. Dust Drifters arrived within hours and had the carpets looking new. Very professional.",
    href: "https://twitter.com/JasonLeeBiz"
  },
  {
    author: {
      name: "Anu",
      handle: "@-Anu",
      avatar: "https://i.pravatar.cc/150?img=29", // Indian female
      role: "Property Manager",
      rating: 5
    },
    text: "Tenants praised how fresh their apartments looked after Dust Drifters cleaned. Quick turnaround and flexible booking options.",
    href: "https://twitter.com/SimplyAnu_"
  },
  {
    author: {
      name: "Michael Brooks",
      handle: "@MikeBrooksHotel",
      avatar: "https://i.pravatar.cc/150?img=55", // Caucasian male
      role: "Hotel Manager",
      rating: 5
    },
    text: "They handle our common areas and guest rooms flawlessly. Guests comment on how clean everything is. I never worry about follow‑ups.",
    href: "https://twitter.com/MikeBrooksHotel"
  },
  {
    author: {
      name: "Laura Nguyen",
      handle: "@LauraNguyenGym",
      avatar: "https://i.pravatar.cc/150?img=44", // Asian female
      role: "Gym Owner",
      rating: 4
    },
    text: "Dust Drifters uses safe, non‑slip cleaners around equipment. Locker rooms and weights area always look brand new.",
    href: "https://twitter.com/LauraNguyenGym"
  },
  {
    author: {
      name: "Carlos Mendes",
      handle: "@CarlosMendesReal",
      avatar: "https://i.pravatar.cc/150?img=17", // Latino male
      role: "Real Estate Agent",
      rating: 5
    },
    text: "I need homes to look perfect for showings. Dust Drifters arrives early and works quietly. Every listing looks showroom‑ready.",
    href: "https://twitter.com/CarlosMendesReal"
  }
]

// Add more testimonials with different IDs to create a seamless loop
const additionalTestimonials = originalTestimonials.map((testimonial, index) => ({
  ...testimonial,
  author: {
    ...testimonial.author,
    // Use a different but similar looking avatar by incrementing the image ID
    avatar: testimonial.author.avatar.replace(/img=(\d+)/, (match, num) => 
      `img=${(parseInt(num) + 1 > 70) ? 1 : parseInt(num) + 1}`
    ),
  }
}))

// Combine original and additional testimonials
const testimonials = [...originalTestimonials, ...additionalTestimonials]

export function TestimonialsMarquee() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#000000")
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#333333")
  }, [theme])

  // Duplicate testimonials to ensure continuous loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-4 md:py-4 relative bg-gradient-to-b from-white/50 to-slate-50/30 overflow-hidden">
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

      {/* Header Section with Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-12">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Testimonials
            </span>
          </motion.div>
        </div>
        
        <div className="text-center mt-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 inline-block text-transparent bg-clip-text">What Our Clients Say</h2>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-1 max-w-2xl"
          >
            <p className="text-xl text-gray-700 leading-relaxed bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-sm">
              Don't just take our word for it. Here's what our <span className="font-semibold text-purple-700">satisfied clients</span> have to say about our cleaning services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full Width Testimonials Marquee - Stretches to screen edges */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
        <div className="flex [--gap:2rem] [gap:var(--gap)] flex-row [--duration:200s]">
          <div
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
              "transition-[animation-play-state] will-change-transform",
              isPaused && "animation-play-state-paused"
            )}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex gap-8 pl-8">
              {duplicatedTestimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`testimonial-${i}`}
                  author={testimonial.author}
                  text={testimonial.text}
                  href={testimonial.href}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/80 to-transparent" />
      </div>

      {/* Section bottom gradient rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  )
}