"use client";

import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { HeroGeometric } from "./ui/shape-landing-hero";

export function ComparisonTable() {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Background with HeroGeometric */}
      <HeroGeometric 
        className="absolute inset-0 z-0 h-full"
        hideContent={true}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Choose Wisely
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 drop-shadow-sm"
          >
            Professional vs. DIY Cleaning
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl"
          >
            <p className="text-xl text-gray-700 leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
              See how Dust Drifters <span className="font-semibold text-purple-700">professional cleaning</span> compares to doing it yourself
            </p>
          </motion.div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left border-b-2 border-slate-200 w-1/3">Comparison Points</th>
                <th className="p-4 text-center border-b-2 border-slate-200 w-1/3">
                  <span className="text-xl font-bold text-primary">Dust Drifters Professional</span>
                </th>
                <th className="p-4 text-center border-b-2 border-primary bg-primary/5">
                  <span className="text-xl font-bold text-primary">DIY Cleaning</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium">Time Investment</td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Zero time investment from you</span>
                  </div>
                </td>
                <td className="p-4 border-b border-primary/20 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>4-8 hours of your time</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium">Equipment & Supplies</td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Professional-grade included</span>
                  </div>
                </td>
                <td className="p-4 border-b border-primary/20 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Purchase & maintain your own</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium">Cleaning Expertise</td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Trained cleaning professionals</span>
                  </div>
                </td>
                <td className="p-4 border-b border-primary/20 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Limited to your knowledge</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium">Consistency</td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Consistent quality every time</span>
                  </div>
                </td>
                <td className="p-4 border-b border-primary/20 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Varies based on energy & time</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium">Hard-to-Reach Areas</td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Thoroughly cleaned</span>
                  </div>
                </td>
                <td className="p-4 border-b border-primary/20 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Often overlooked</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium">Stress Level</td>
                <td className="p-4 border-b border-slate-200 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Zero - We handle everything</span>
                  </div>
                </td>
                <td className="p-4 border-b border-primary/20 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>High - One more thing on your to-do list</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Satisfaction Guarantee</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>None</span>
                  </div>
                </td>
                <td className="p-4 text-center bg-primary/5">
                  <div className="flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>100% Satisfaction Guaranteed</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <a 
                            href="/contact-us" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Book Your Cleaning
          </a>
        </div>
      </div>
      
      {/* Enhanced bottom gradient rule with shimmer effect */}
      <div className="relative mt-8">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" 
          animate={{ 
            x: ["100%", "-100%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
} 