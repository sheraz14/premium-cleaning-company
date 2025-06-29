"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Users, Home, Building, Star, Award, Clock, Shield, Sparkles, Leaf, HeartHandshake, Zap, ThumbsUp, Calendar } from "lucide-react";
import { gsap } from "gsap";
import ScrollTrigger from "../../gsap-public/src/ScrollTrigger.js";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type StatType = {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix: string;
};

const stats: StatType[] = [
  {
    icon: Users,
    value: 200,
    label: "Happy Clients",
    suffix: "+"
  },
  {
    icon: Home,
    value: 100,
    label: "Homes Cleaned",
    suffix: "+"
  },
  {
    icon: Building,
    value: 50,
    label: "Commercial Properties",
    suffix: "+"
  },
  {
    icon: Star,
    value: 4.9,
    label: "Average Rating",
    suffix: "/5"
  }
];

const features = [
  {
    icon: Zap,
    title: "Time-Saving",
    description: "Efficient services that save you valuable time to focus on what matters most."
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee on all our professional cleaning services."
  },
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "All our professionals are fully insured and bonded for your protection."
  },
  {
    icon: Users,
    title: "Professional Team",
    description: "Vetted, trained, and insured staff for your complete peace of mind."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Using environmentally safe products that are gentle on your home and the planet."
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Weekly, bi-weekly, or monthly options to fit your schedule and budget."
  },
  {
    icon: HeartHandshake,
    title: "Customized Cleaning",
    description: "Tailored cleaning plans designed specifically for your unique needs."
  },
  {
    icon: ThumbsUp,
    title: "Easy Booking",
    description: "Simple online booking process that takes just 60 seconds to complete."
  }
];

export function AnimatedFeatures() {
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states - simplified for mobile
      gsap.set(".gsap-features-badge", { opacity: 0, y: isMobile ? 30 : 50, scale: 0.8 });
      gsap.set(".gsap-stat-card", { opacity: 0, y: isMobile ? 50 : 80, scale: 0.8 });
      gsap.set(".gsap-feature-card", { opacity: 0, y: isMobile ? 40 : 60, rotationY: isMobile ? 0 : -15 });
      gsap.set(".gsap-stat-icon", { scale: 0, rotation: isMobile ? 0 : -180 });
      gsap.set(".gsap-feature-icon", { scale: 0, rotation: isMobile ? 0 : 180 });
      gsap.set(".gsap-heading", { opacity: 0, y: isMobile ? 30 : 50 });
      gsap.set(".gsap-subtitle", { opacity: 0, y: isMobile ? 20 : 30 });

      // Badge animation
      gsap.to(".gsap-features-badge", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.5 : 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Sparkle icon continuous animation - simplified for mobile
      gsap.to(".sparkle-icon", {
        rotation: 360,
        duration: isMobile ? 12 : 8,
        ease: "none",
        repeat: -1
      });

      // Heading animation
      gsap.to(".gsap-heading", {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.8 : 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-heading",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".gsap-subtitle", {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: ".gsap-subtitle",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Stats section animations
      const statsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate stat cards with stagger
      statsTimeline.to(".gsap-stat-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.6 : 0.8,
        ease: "back.out(1.4)",
        stagger: isMobile ? 0.1 : 0.15
      });

      // Animate stat icons
      statsTimeline.to(".gsap-stat-icon", {
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.4 : 0.6,
        ease: "back.out(1.7)",
        stagger: isMobile ? 0.08 : 0.1
      }, "-=0.6");

      // Counter animations with GSAP
      stats.forEach((stat, index) => {
        const counterObj = { value: 0 };
        
        gsap.to(counterObj, {
          value: stat.value,
          duration: isMobile ? 1.5 : 2,
          ease: "power2.out",
          delay: index * 0.1 + 0.5,
          onUpdate: () => {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = stat.suffix === "/5" 
                ? Math.round(counterObj.value * 10) / 10 
                : Math.floor(counterObj.value);
              return newCounters;
            });
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Features section animations
      gsap.to(".gsap-feature-card", {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power3.out",
        stagger: {
          amount: isMobile ? 0.8 : 1.2,
          from: "start"
        },
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Feature icons animation
      gsap.to(".gsap-feature-icon", {
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.4 : 0.6,
        ease: "back.out(1.7)",
        stagger: isMobile ? 0.08 : 0.12,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        },
        delay: 0.3
      });

      // Continuous floating animations - disabled on mobile for performance
      if (!isMobile) {
        gsap.to(".gsap-stat-card", {
          y: "random(-3, 3)",
          duration: "random(4, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 2,
            from: "random"
          }
        });

        gsap.to(".gsap-feature-card", {
          y: "random(-5, 5)",
          duration: "random(5, 7)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 3,
            from: "random"
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="pb-20 sm:pb-32 pt-16 sm:pt-24 md:pt-32 relative overflow-hidden -mt-4 bg-gradient-to-b from-slate-50/70 to-white/70 flex items-center min-h-screen backdrop-blur-sm"
    >
      {/* Background decoration elements - simplified for mobile */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 -left-4 w-24 sm:w-36 h-24 sm:h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      
      {/* Animated floating particles - reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: `${(i % 3 + 1) * (isMobile ? 4 : 5) + 5}px`,
              height: `${(i % 3 + 1) * (isMobile ? 4 : 5) + 5}px`,
              top: `${(i * 3.33) % 100}%`,
              left: `${(i * 7.5) % 100}%`,
              animation: 'pulse 8s infinite ease-in-out',
              animationDelay: `${(i * 0.2) % 5}s`,
              opacity: 0.1 + (i % 5) * 0.1
            }}
          ></div>
        ))}
      </div>
      
      {/* Background cleaning pattern - disabled on mobile for performance */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.10]" 
          style={{
            backgroundImage: 'url(/images/backgrounds/cleaning-icons-pattern.png)',
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            backgroundBlendMode: 'normal',
            transform: 'scale(1.05)',
          }}
        ></div>
      )}
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 sm:mb-16 max-w-4xl mx-auto text-center px-2">
          <div className="mb-3 sm:mb-4">
            <div className="gsap-features-badge inline-flex items-center px-4 py-2 sm:py-2.5 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md mb-4 sm:mb-6">
              <Sparkles className="sparkle-icon h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base font-medium">
                Why Choose Us
              </span>
            </div>
          </div>
          <h2 ref={headingRef} className="gsap-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-purple-700 px-2">
            <span className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #7c3aed, #db2777)' }}>
              Why Choose Our Professional Cleaning Services?
          </span>
          </h2>
          <p ref={subtitleRef} className="gsap-subtitle text-lg sm:text-xl text-gray-700 leading-relaxed px-2">
            Experience the difference with our comprehensive cleaning solutions. We deliver exceptional results that exceed your expectations every time.
            </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            return (
              <div 
                key={index} 
                className="gsap-stat-card text-center p-4 sm:p-6 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="gsap-stat-icon inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 mx-auto shadow-lg">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">
                  {counters[index]?.toFixed(stat.suffix === "/5" ? 1 : 0)}{stat.suffix}
                </div>
                <div className="text-slate-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            return (
              <div 
                key={index} 
                className="gsap-feature-card group p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="gsap-feature-icon inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 sm:mb-6 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
              </div>
            );
          })}
        </div>
        
        {/* Added section: Our Guarantee box */}
        <div className="mt-8 sm:mt-10 bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-100 shadow-lg relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-48 sm:w-64 h-48 sm:h-64 bg-pink-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-700 to-pink-600 inline-block text-transparent bg-clip-text">
                  Our 100% Satisfaction Guarantee
                </h3>
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
                  If you're not completely satisfied with our service, we'll come back and re-clean at no additional cost. Your happiness is our top priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section bottom gradient rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

    </section>
  );
} 