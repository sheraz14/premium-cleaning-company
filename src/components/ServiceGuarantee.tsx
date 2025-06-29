"use client";

import { Shield, Clock, Calendar, Award, ThumbsUp, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroGeometric } from "./ui/shape-landing-hero";

export function ServiceGuarantee() {
  return (
    <section className="py-16 relative">
      {/* Background with HeroGeometric */}
      <HeroGeometric 
        className="absolute inset-0 z-0 h-full"
        hideContent={true}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Our Promise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 drop-shadow-sm"
          >
            Our Service Guarantee
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-3xl"
          >
            <p className="text-xl text-gray-700 leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
              At Dust Drifters, we stand behind our work with a <span className="font-semibold text-purple-700">100% satisfaction guarantee</span>. Here's what you can expect from us.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Satisfaction</h3>
            <p className="text-muted-foreground">
              If you're not completely satisfied, we'll come back and reclean any areas at no additional cost.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">On-Time Service</h3>
            <p className="text-muted-foreground">
              We value your time. Our cleaning professionals will always arrive within the scheduled time window.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Trained Professionals</h3>
            <p className="text-muted-foreground">
              Our cleaning staff are thoroughly vetted, professionally trained, and insured for your peace of mind.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Eco-Friendly Products</h3>
            <p className="text-muted-foreground">
              We use environmentally responsible cleaning products that are safe for your family, pets, and the planet.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-primary/5 p-8 rounded-xl max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Easy Scheduling</h3>
              <p className="text-muted-foreground mb-4">
                Book your cleaning service online in less than 60 seconds. Choose the date and time that works for you, and we'll take care of the rest.
              </p>
              <a 
                href="/contact-us" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Schedule Now
              </a>
            </div>
          </div>
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