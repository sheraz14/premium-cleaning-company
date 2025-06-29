"use client";
import { CalendarDays, Sparkles, Phone, Sparkle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export function CTA() {
  // Responsive overlap settings
  const tileW = 320; // smaller for mobile
  const tileH = 300;
  const overlapX = -15;
  const overlapY = 48;
  const cols = typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 5;
  const rows = typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3;

  return (
    <section className="py-6 sm:py-8 md:py-12 relative overflow-hidden bg-white">
      {/* Overlapping image grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => (
            <img
              key={`bgimg-${row}-${col}`}
              src="/images/vector.jpg"
              alt=""
              style={{
                position: 'absolute',
                left: `${col * (tileW - overlapX)}px`,
                top: `${row * (tileH - overlapY)}px`,
                width: tileW,
                height: tileH,
                opacity: 0.18,
                pointerEvents: 'none',
                objectFit: 'cover',
                minWidth: tileW,
                minHeight: tileH,
              }}
              draggable={false}
            />
          ))
        )}
        {/* Enhanced Decorative SVG background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cta-bg2" cx="60%" cy="40%" r="80%">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#f0fdfa" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="60%" cy="40%" rx="60%" ry="40%" fill="url(#cta-bg2)" />
          </svg>
          {/* Bottom curved SVG ellipse */}
          <svg width="100%" height="100%" className="absolute inset-x-0 bottom-0 w-full h-full" style={{transform: 'scaleY(-1)'}} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cta-bg2-bottom" cx="60%" cy="40%" r="80%">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f0fdfa" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="80%" cy="70%" rx="70%" ry="50%" fill="url(#cta-bg2-bottom)" />
          </svg>
          <div className="absolute bottom-0 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-emerald-200/30 rounded-full blur-2xl opacity-40" />
        </div>
      </div>
      <div className="container mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        <div className="bg-gradient-to-br from-sky-50 via-purple-50 to-indigo-100/90 backdrop-blur-lg rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-8 md:p-14 lg:p-20 shadow-2xl border border-white/60 flex flex-col items-center max-w-full relative overflow-hidden">
          {/* Animated pattern background (dots) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="animated-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20">
                    <animate attributeName="r" values="3;7;3" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#a5b4fc;#818cf8;#a5b4fc" dur="3s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#animated-dots)" opacity="0.18" />
            </svg>
          </div>
          {/* Animated gradient or SVG inside the card */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.13" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.13" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#card-grad)" />
              <circle cx="80%" cy="20%" r="60" fill="#a5b4fc22">
                <animate attributeName="cx" values="80%;20%;80%" dur="8s" repeatCount="indefinite" />
              </circle>
              <circle cx="20%" cy="80%" r="40" fill="#6ee7b722">
                <animate attributeName="cy" values="80%;20%;80%" dur="10s" repeatCount="indefinite" />
              </circle>
            </svg>
            {/* Optional shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer opacity-20" style={{backgroundSize:'200% 100%'}} />
          </div>
          {/* Cleaning Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-0 -mt-10 flex items-center justify-center"
          >
            <Sparkle className="h-10 w-10 sm:h-14 sm:w-14 text-emerald-500 drop-shadow-lg animate-pulse" />
          </motion.div>
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center mt-5 gap-2 px-3 py-1 sm:px-5 sm:py-2 rounded-full bg-emerald-100/80 text-emerald-700 font-semibold text-xs sm:text-base mb-4 sm:mb-6 shadow"
          >
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
            100% Satisfaction Guarantee
          </motion.div>
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-center mb-4 sm:mb-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-600 bg-clip-text text-transparent animate-gradient-x"
            style={{ backgroundSize: '200% 200%', animation: 'gradient-x 4s ease-in-out infinite' }}
          >
            Ready for a <span className="whitespace-nowrap">spotless home?</span>
          </motion.h2>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-6 max-w-2xl text-center"
          >
            Book your <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-600 text-transparent bg-clip-text font-semibold">professional cleaning service</span> today and experience the difference. Quick scheduling, <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-600 text-transparent bg-clip-text font-semibold">reliable</span> service, and <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-600 text-transparent bg-clip-text font-semibold">satisfaction guaranteed</span>.
          </motion.p>
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xl mx-auto -mb-2"
          >
            <Link href="/contact-us">
              <Button 
                size="lg" 
                className="group relative overflow-hidden px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-7 text-lg sm:text-2xl font-extrabold text-white rounded-full shadow-xl hover:shadow-2xl active:translate-y-[2px] active:shadow-none transition-all duration-300 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 w-full sm:w-auto"
              >
                <span className="flex items-center">
                  <CalendarDays className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                  Book Now
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 z-5"></span>
              </Button>
            </Link>
            <a href="tel:+15551234567">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg sm:text-2xl font-extrabold text-indigo-700 rounded-full border-2 border-indigo-300 hover:border-indigo-500 px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-7 transition-all shadow hover:shadow-lg focus:ring-4 focus:ring-indigo-200 w-full sm:w-auto"
              >
                <span className="flex items-center">
                  <Phone className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                  (555) 123-4567
                </span>
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer {
          animation: shimmer-move 4s linear infinite;
          background-position: -200% 0;
        }
        @keyframes shimmer-move {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
