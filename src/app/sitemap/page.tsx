"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "../../../gsap-public/src/ScrollTrigger.js";
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  Home, 
  Wrench, 
  Users, 
  Phone, 
  BookOpen, 
  UserPlus, 
  Shield,
  FileText,
  Map,
  Sparkles,
  Building,
  Leaf,
  Calendar,
  Zap,
  Coffee,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Globe,
  Search,
  Star,
  ChevronRight,
  MapPin,
  Clock,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Component
function MagneticButton({ children, className = "", ...props }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div ref={ref} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </div>
  );
}

// Navigation Card Component
function NavigationCard({ item, index, category }: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -5,
        rotationX: 2,
        rotationY: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="nav-card group"
      data-reveal="up"
      data-delay={index * 0.1}
    >
      <Link href={item.href}>
        <div className="h-full p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl hover:from-white/20 hover:to-white/10 transition-all duration-500 relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                <ExternalLink className="h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {item.description}
              </p>
            </div>
            
            {/* Category badge */}
            <div className="mt-4 inline-flex items-center space-x-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-purple-200 border border-white/20">
                {category}
              </span>
              <ChevronRight className="h-4 w-4 text-purple-300 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Floating Elements Component
function FloatingElements() {
  const elementsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const elements = elementsRef.current?.children;
    if (!elements) return;

    Array.from(elements).forEach((element, index) => {
      gsap.to(element, {
        y: (index % 2 === 0 ? 1 : -1) * 20,
        x: (index % 3 === 0 ? 1 : -1) * 15,
        rotation: (index % 4 - 2) * 2,
        duration: 4 + index * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });
    });
  }, []);

  return (
    <div ref={elementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
      <div className="absolute top-40 right-20 w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg rotate-45" />
      <div className="absolute bottom-40 left-20 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-lg" />
      <div className="absolute bottom-20 right-10 w-20 h-20 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl rotate-12" />
      <div className="absolute top-1/2 left-1/4 w-6 h-6 rounded-full bg-gradient-to-r from-violet-500/30 to-purple-500/30 blur-sm" />
      <div className="absolute top-1/3 right-1/3 w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-lg rotate-45" />
      <div className="absolute top-3/4 left-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-lg" />
    </div>
  );
}

// Page data with gradients and responsive design
const siteMapData = {
  mainPages: [
    {
      id: "home",
      icon: Home,
      name: "Home",
      description: "Welcome to our professional cleaning services. Get quotes and book instantly.",
      href: "/",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "about",
      icon: Users,
      name: "About Us",
      description: "Learn about our story, mission, and commitment to exceptional cleaning.",
      href: "/about-us",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "services",
      icon: Wrench,
      name: "Services",
      description: "Comprehensive cleaning services for residential and commercial needs.",
      href: "/services",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "contact",
      icon: Phone,
      name: "Contact Us",
      description: "Get in touch for quotes, bookings, and customer support.",
      href: "/contact-us",
      gradient: "from-orange-500 to-red-600"
    }
  ],
  
  cleaningServices: [
    {
      id: "house-cleaning",
      icon: Home,
      name: "House Cleaning",
      description: "Regular residential cleaning for homes and apartments.",
      href: "/house-cleaning-services",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "deep-cleaning",
      icon: Zap,
      name: "Deep Cleaning",
      description: "Thorough top-to-bottom cleaning for detailed results.",
      href: "/deep-cleaning-services",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: "commercial",
      icon: Building,
      name: "Commercial Cleaning",
      description: "Professional cleaning for offices and businesses.",
      href: "/commercial-cleaning-services",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      id: "eco-friendly",
      icon: Leaf,
      name: "Eco-Friendly Cleaning",
      description: "Green cleaning solutions using natural products.",
      href: "/eco-friendly-cleaning-services",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      id: "move-in-out",
      icon: Calendar,
      name: "Move In/Out Cleaning",
      description: "Perfect cleaning for relocations and property turnovers.",
      href: "/move-in-out-cleaning-services",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      id: "post-renovation",
      icon: Sparkles,
      name: "Post-Renovation",
      description: "Specialized cleanup after construction and renovation.",
      href: "/post-renovation-cleaning-services",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      id: "airbnb",
      icon: Coffee,
      name: "Airbnb Cleaning",
      description: "Quick turnover cleaning for short-term rentals.",
      href: "/airbnb-cleaning-services",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      id: "rental",
      icon: Briefcase,
      name: "Rental Property",
      description: "Cleaning services tailored for rental properties.",
      href: "/rental-cleaning-services",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      id: "condo",
      icon: Building,
      name: "Condo & Apartment",
      description: "Specialized cleaning for urban living spaces.",
      href: "/condo-and-apartment-cleaning-services",
      gradient: "from-teal-500 to-cyan-600"
    }
  ],
  
  resourcePages: [
    {
      id: "blog",
      icon: BookOpen,
      name: "Cleaning Blog",
      description: "Expert tips, guides, and cleaning advice from professionals.",
      href: "/cleaning-blog",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      id: "faq",
      icon: Users,
      name: "FAQ",
      description: "Frequently asked questions about our services and processes.",
      href: "/faq",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: "checklist",
      icon: FileText,
      name: "Cleaning Checklist",
      description: "Complete room-by-room cleaning guide and checklist.",
      href: "/complete-cleaning-checklist",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      id: "join-team",
      icon: UserPlus,
      name: "Join Our Team",
      description: "Career opportunities and employment with our cleaning company.",
      href: "/join-team",
      gradient: "from-orange-500 to-red-600"
    }
  ],
  
  legalPages: [
    {
      id: "privacy",
      icon: Shield,
      name: "Privacy Policy",
      description: "How we protect and handle your personal information.",
      href: "/privacy-policy",
      gradient: "from-gray-500 to-slate-600"
    },
    {
      id: "terms",
      icon: FileText,
      name: "Terms of Service",
      description: "Our service terms, conditions, and agreements.",
      href: "/terms-of-service",
      gradient: "from-slate-500 to-gray-600"
    },
    {
      id: "sitemap-page",
      icon: Map,
      name: "Sitemap",
      description: "Navigate our website easily with our site structure.",
      href: "/sitemap",
      gradient: "from-purple-500 to-indigo-600"
    }
  ]
};

export default function SitemapPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      const tl = gsap.timeline();
      
      tl.from(".hero-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      .from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-stats", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1
      }, "-=0.2");

      // Scroll-triggered animations
      gsap.utils.toArray("[data-reveal]").forEach((element: any) => {
        const direction = element.getAttribute("data-reveal");
        const delay = parseFloat(element.getAttribute("data-delay")) || 0;
        
        let fromVars: any = { opacity: 0 };
        
        switch(direction) {
          case "up":
            fromVars.y = 80;
            break;
          case "down":
            fromVars.y = -80;
            break;
          case "left":
            fromVars.x = 80;
            break;
          case "right":
            fromVars.x = -80;
            break;
          case "scale":
            fromVars.scale = 0.8;
            break;
        }

        gsap.fromTo(element, fromVars, {
          ...Object.keys(fromVars).reduce((acc, key) => {
            if (key !== "opacity") acc[key] = 0;
            return acc;
          }, {} as any),
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Navigation cards hover effects
      gsap.utils.toArray(".nav-card").forEach((card: any) => {
        gsap.set(card, { transformPerspective: 1000 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <FloatingElements />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full mb-8"
          >
            <Map className="h-5 w-5 text-purple-300" />
            <span className="text-white font-medium">Site Navigation</span>
          </motion.div>
          
          <h1 className="hero-title text-6xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Site 
            </span>
            {" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
               Map
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-3xl text-purple-200 mb-6 font-light">
            Navigate our cleaning services with ease
          </p>
          
          <p className="hero-description text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore all pages and services available on our website. Find exactly what you're looking for with our organized site structure.
          </p>
          
          {/* Quick Stats */}
          <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "50+", label: "Pages", icon: FileText },
              { number: "9", label: "Services", icon: Sparkles },
              { number: "24/7", label: "Support", icon: Clock },
              { number: "100%", label: "Satisfaction", icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10"
              >
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <p className="text-purple-200 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Pages Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-reveal="up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Main
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Pages</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Essential navigation pages for your cleaning needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteMapData.mainPages.map((item, index) => (
              <NavigationCard
                key={item.id}
                item={item}
                index={index}
                category="Main"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Services Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-reveal="up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cleaning
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional cleaning solutions for every space and situation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteMapData.cleaningServices.map((item, index) => (
              <NavigationCard
                key={item.id}
                item={item}
                index={index}
                category="Service"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-reveal="up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Resources &
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Information</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Helpful guides, tips, and opportunities to join our team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteMapData.resourcePages.map((item, index) => (
              <NavigationCard
                key={item.id}
                item={item}
                index={index}
                category="Resource"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Legal Pages Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-reveal="up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Legal &
              <span className="bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent"> Policies</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Important information about privacy, terms, and site navigation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteMapData.legalPages.map((item, index) => (
              <NavigationCard
                key={item.id}
                item={item}
                index={index}
                category="Legal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-20 px-4 relative z-10" data-reveal="up">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <MapPin className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Serving Ontario, Canada
              </h2>
              <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Dust Drifters provides professional cleaning services across Ontario. From residential homes to commercial offices, we're your trusted cleaning partner.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Home, title: "Residential", desc: "Homes, condos, and apartments", gradient: "from-emerald-500 to-teal-600" },
                  { icon: Building, title: "Commercial", desc: "Offices, stores, and businesses", gradient: "from-blue-500 to-indigo-600" },
                  { icon: Sparkles, title: "Specialized", desc: "Move-outs, Airbnb, and deep cleans", gradient: "from-purple-500 to-pink-600" }
                ].map((service, index) => (
                  <MagneticButton key={index}>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 transition-all duration-300 border border-white/10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-300 text-sm">{service.desc}</p>
                    </div>
                  </MagneticButton>
                ))}
              </div>

              <div className="mt-12">
                <MagneticButton>
                  <Link href="/contact-us">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center gap-2">
                      Get Started Today
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-400 text-sm border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2">© 2024 Dust Drifters Cleaning Services. All rights reserved.</p>
          <p>Professional cleaning services across Ontario, Canada</p>
        </div>
      </footer>
    </div>
  );
}
