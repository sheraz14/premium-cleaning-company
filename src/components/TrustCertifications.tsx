"use client";

import { useState, useEffect, useRef } from "react";
import { Badge as BadgeIcon, BadgeCheck, Award, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { HeroGeometric } from "./ui/shape-landing-hero";

const certifications = [
  {
    name: "Green Cleaning Certified",
    logo: "/images/certifications/green-certified.svg",
    description: "Recognized for using environmentally friendly cleaning products and sustainable practices."
  },
  {
    name: "ISSA Member",
    logo: "/images/certifications/issa.svg",
    description: "Member of the International Sanitary Supply Association, adhering to industry best practices."
  },
  {
    name: "BBB Accredited",
    logo: "/images/certifications/bbb.svg",
    description: "Accredited Business with the Better Business Bureau, maintaining a high standard of service."
  },
  {
    name: "ARCSI Professional",
    logo: "/images/certifications/arcsi.svg",
    description: "Association of Residential Cleaning Services International certified cleaning provider."
  },
  {
    name: "Fully Insured",
    logo: "/images/certifications/insured.svg",
    description: "Comprehensive insurance coverage for your complete peace of mind."
  }
];

// Publications or media mentions
const asSeenIn = [
  { name: "Forbes", logo: "/images/publications/forbes.svg" },
  { name: "Business Insider", logo: "/images/publications/business-insider.svg" },
  { name: "The New York Times", logo: "/images/publications/nyt.svg" },
  { name: "USA Today", logo: "/images/publications/usa-today.svg" }
];

export function TrustCertifications() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 relative"
    >
      {/* Background with HeroGeometric */}
      <HeroGeometric 
        className="absolute inset-0 z-0 h-full"
        hideContent={true}
      />
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>
      
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
              Trust & Reliability
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 drop-shadow-sm"
          >
            Certifications & Recognitions
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl"
          >
            <p className="text-xl text-gray-700 leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
              We're proud to maintain the <span className="font-semibold text-purple-700">highest standards</span> in the cleaning industry with these certifications
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-500 text-center flex flex-col items-center justify-between h-full transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                {/* Placeholder for logo - in production, use real SVG/images */}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <BadgeIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-slate-500">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* As Seen In section */}
        <div 
          className={`mt-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>As Seen In</span>
            </div>
            <h3 className="text-2xl font-bold">Featured In Leading Publications</h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {asSeenIn.map((publication, index) => (
              <div 
                key={index} 
                className="opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                {/* Placeholder for publication logos - in production, use real SVG/images */}
                <div className="h-10 flex items-center justify-center bg-slate-100 px-4 rounded">
                  <span className="text-slate-500 font-bold">{publication.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust statement */}
        <div 
          className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Trust Commitment</h3>
            <p className="text-slate-600">
              At Dust Drifters, we're committed to earning your trust with every clean. Our professionally trained and thoroughly vetted cleaning experts are background-checked, insured, and dedicated to delivering excellence in every service.
            </p>
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