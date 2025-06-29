"use client";

import { motion } from "framer-motion";
import { 
  Phone, 
  Star, 
  Users, 
  Shield,
  ArrowRight,
  Calendar,
  MessageCircle,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ContactHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothMousePosition, setSmoothMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial window size
    handleResize();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth interpolation for mouse position
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const interval = setInterval(() => {
      setSmoothMousePosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.05), // Very slow interpolation
        y: lerp(prev.y, mousePosition.y, 0.05)
      }));
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-200 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-pink-100 to-orange-100 transform rotate-45"
          animate={{
            y: [0, -25, 0],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-32 w-14 h-14 border-2 border-indigo-200 transform rotate-12"
          animate={{
            y: [0, 20, 0],
            rotate: [12, 192, 372],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Interactive Cursor Trail */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-100/15 via-blue-100/15 to-pink-100/15 blur-3xl pointer-events-none"
          animate={{
            x: smoothMousePosition.x - 192,
            y: smoothMousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 15,  // Much slower
            damping: 50,    // More damping for smoother movement
            mass: 2         // More mass for slower response
          }}
        />
        
        {/* Secondary Cursor Trail - Even Slower */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-indigo-100/10 via-purple-100/10 to-blue-100/10 blur-2xl pointer-events-none"
          animate={{
            x: smoothMousePosition.x - 128,
            y: smoothMousePosition.y - 128,
          }}
          transition={{
            type: "spring",
            stiffness: 8,   // Even slower
            damping: 40,
            mass: 3
          }}
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='m 40 0 l 0 40 l -40 0 z' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
            }}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Mouse-Following Particles */}
        {[...Array(12)].map((_, i) => {
          const delay = i * 0.08; // Staggered delay for each particle
          const influence = 0.015 + (i * 0.002); // Different influence strengths (reduced)
          const baseX = 20 + Math.random() * 60; // Keep particles more centered
          const baseY = 20 + Math.random() * 60;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-50"
              initial={{
                left: `${baseX}%`,
                top: `${baseY}%`,
              }}
              animate={{
                x: (smoothMousePosition.x - windowSize.width / 2) * influence,
                y: (smoothMousePosition.y - windowSize.height / 2) * influence,
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                x: {
                  type: "spring",
                  stiffness: 3 + i * 0.5, // Much slower varying stiffness
                  damping: 25 + i * 3,
                  mass: 2 + i * 0.2
                },
                y: {
                  type: "spring",
                  stiffness: 3 + i * 0.5,
                  damping: 25 + i * 3,
                  mass: 2 + i * 0.2
                },
                opacity: {
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay
                }
              }}
            />
          );
        })}
        
        {/* Additional Floating Particles (Non-Interactive) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`static-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Subtle Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <motion.path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              animate={{
                d: [
                  "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                  "M0,60 C300,0 900,120 1200,60 L1200,120 L0,120 Z",
                  "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-white via-purple-50 to-white border border-purple-200 shadow-lg backdrop-blur-sm mb-6 sm:mb-8"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-600" />
            <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 ml-2 text-yellow-500" />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8"
          >
            <motion.span 
              className="bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Contact Us
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Ready to transform your space? We're here to answer questions, provide quotes, and help you schedule the{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              perfect cleaning service
            </span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 md:mb-16 px-4"
          >
            <Link href="/booking">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-bold text-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 w-full sm:w-auto"
                >
                  <span className="flex items-center relative z-10">
                    <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Book Now
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>
            </Link>
            <a href="tel:+1234567890">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg sm:text-xl font-bold text-gray-700 rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:border-purple-400 hover:text-purple-700 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 transition-all shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="flex items-center">
                    <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Call Now
                  </span>
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base px-4"
          >
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100"
              whileHover={{ y: -2 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">4.9/5 Rating</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100"
              whileHover={{ y: -2 }}
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">500+ Happy Clients</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100"
              whileHover={{ y: -2 }}
            >
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Fully Insured</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
    </section>
  );
}