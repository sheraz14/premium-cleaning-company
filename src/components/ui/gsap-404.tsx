"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Phone, Map, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GSAP404() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const broomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Simple CSS animations without GSAP for now
    if (numberRef.current) {
      numberRef.current.style.animation = "bounceIn 1.2s ease-out";
    }
    if (sparklesRef.current) {
      sparklesRef.current.style.animation = "sparkle 2s infinite";
    }
    if (broomRef.current) {
      broomRef.current.style.animation = "sweep 3s ease-in-out infinite";
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-sky-50 to-emerald-50 flex items-center justify-center px-4 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-emerald-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-indigo-400 rounded-full opacity-25 animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main 404 Number */}
        <motion.h1
          ref={numberRef}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.68, -0.55, 0.265, 1.55],
            delay: 0.2
          }}
          className="text-8xl md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent mb-8 relative"
        >
          404
          
          {/* Floating Sparkles */}
          <div ref={sparklesRef} className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-0 left-1/4 w-8 h-8 text-purple-400 animate-pulse" />
            <Sparkles className="absolute top-1/4 right-1/4 w-6 h-6 text-emerald-400 animate-bounce" />
            <Sparkles className="absolute bottom-1/4 left-1/3 w-7 h-7 text-indigo-400 animate-ping" />
          </div>
        </motion.h1>

        {/* Animated Broom */}
        <motion.div
          ref={broomRef}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 relative"
        >
          <motion.div
            animate={{ 
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="text-6xl md:text-8xl inline-block"
          >
            🧹
          </motion.div>
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 text-3xl"
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h2>
          <p 
            ref={textRef}
            className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            It looks like this page got swept away during our cleaning! Don't worry - 
            our team is excellent at finding misplaced items. Let's get you back on track.
          </p>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Link href="/">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 cursor-pointer transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Home className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Home</h3>
              <p className="text-sm text-gray-600">Return to homepage</p>
            </motion.div>
          </Link>

          <Link href="/services">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 cursor-pointer transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Search className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
              <p className="text-sm text-gray-600">Browse our cleaning services</p>
            </motion.div>
          </Link>

          <Link href="/contact-us">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 cursor-pointer transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Phone className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-sm text-gray-600">Get in touch with us</p>
            </motion.div>
          </Link>

          <Link href="/sitemap">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 cursor-pointer transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Map className="h-12 w-12 text-sky-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Sitemap</h3>
              <p className="text-sm text-gray-600">View all pages</p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="bg-gradient-to-r from-purple-100 via-indigo-100 to-emerald-100 p-8 rounded-3xl shadow-xl border border-white/60 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Lost? Let's Clean That Up!
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            While you're here, discover why Ontario trusts Dust Drifters for all their cleaning needs. 
            Professional, reliable, and always spotless results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Cleaning Service
                </Button>
              </motion.div>
            </Link>
            <Link href="/faq">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Need help? Our support team is here to assist you.{" "}
            <Link href="/contact-us" className="text-purple-600 hover:text-purple-800 font-semibold underline">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(-10deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes sweep {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
} 