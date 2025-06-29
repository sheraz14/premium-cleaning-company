"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "../../../gsap-public/src/ScrollTrigger.js";
import { useLayoutEffect, useRef, useState } from "react";
import { 
  Shield, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  DollarSign,
  Users,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  Star,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Component
function MagneticButton({ children, className = "", ...props }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const y = useRef(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
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

// Animated Accordion Item
function AccordionItem({ item, index, isOpen, onToggle }: any) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isOpen) {
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm hover:from-white/10 hover:to-white/5 transition-all duration-300"
      data-reveal="up"
      data-delay={index * 0.1}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient} shadow-lg`}>
            <item.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-purple-200 text-sm">{item.category}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6 text-purple-300" />
        </motion.div>
      </motion.button>
      
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="p-6 pt-0 space-y-4">
          <div 
            className="text-gray-200 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
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
        rotation: (index % 4 - 2) * 3,
        duration: 3 + index * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });
  }, []);

  return (
    <div ref={elementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg rotate-45" />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-lg" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl rotate-12" />
      <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-violet-500/30 to-purple-500/30 blur-sm" />
      <div className="absolute top-1/3 right-1/3 w-14 h-14 rounded-lg bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-lg rotate-45" />
    </div>
  );
}

export default function TermsOfServicePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Terms sections data
  const termsItems = [
    {
      id: "service-agreement",
      title: "Service Agreement & Booking",
      category: "Booking Terms",
      icon: FileText,
      gradient: "from-blue-500 to-indigo-600",
      content: `
        <div class="space-y-4">
          <p class="text-lg">By booking our cleaning services, you agree to the following terms:</p>
          <div class="grid gap-3">
            <div class="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong class="text-blue-300">Service Booking:</strong>
                <p class="text-gray-300 mt-1">All bookings must be made through our website, phone, or email with 24-hour advance notice.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong class="text-indigo-300">Service Confirmation:</strong>
                <p class="text-gray-300 mt-1">We will confirm your appointment within 24 hours of booking via email or phone.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong class="text-purple-300">Service Areas:</strong>
                <p class="text-gray-300 mt-1">We provide cleaning services throughout Ontario, Canada with licensed professionals.</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "payment-terms",
      title: "Payment Terms & HST",
      category: "Payment & Billing",
      icon: DollarSign,
      gradient: "from-emerald-500 to-green-600",
      content: `
        <div class="space-y-6">
          <p class="text-lg text-gray-200">Transparent pricing with flexible payment options:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <h4 class="text-emerald-300 font-semibold mb-3">HST & Pricing</h4>
              <ul class="space-y-2 text-gray-300">
                <li class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span>All prices include 13% HST</span>
                </li>
                <li class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span>No hidden fees or charges</span>
                </li>
                <li class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span>Volume discounts available</span>
                </li>
              </ul>
            </div>
            
            <div class="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h4 class="text-green-300 font-semibold mb-3">Payment Methods</h4>
              <ul class="space-y-2 text-gray-300">
                <li class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Credit/debit cards</span>
                </li>
                <li class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>E-transfer accepted</span>
                </li>
                <li class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Automatic billing for regulars</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "cancellation-policy",
      title: "Cancellation & Rescheduling",
      category: "Cancellation Policy",
      icon: Calendar,
      gradient: "from-orange-500 to-red-600",
      content: `
        <div class="space-y-6">
          <p class="text-lg text-gray-200">Flexible cancellation policy designed for your convenience:</p>
          
          <div class="space-y-4">
            <div class="p-5 bg-green-500/10 rounded-lg border border-green-500/20">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                <h4 class="font-semibold text-green-300">24+ Hours Notice: FREE</h4>
              </div>
              <p class="text-gray-300 ml-6">Cancel or reschedule without any charges when you give us advance notice.</p>
            </div>
            
            <div class="p-5 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0"></div>
                <h4 class="font-semibold text-yellow-300">Less than 24 Hours: 50% Fee</h4>
              </div>
              <p class="text-gray-300 ml-6">Late cancellation fee of 50% of service cost to cover scheduling costs.</p>
            </div>
            
            <div class="p-5 bg-red-500/10 rounded-lg border border-red-500/20">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></div>
                <h4 class="font-semibold text-red-300">Same Day/No Show: 100% Fee</h4>
              </div>
              <p class="text-gray-300 ml-6">Full service charge applies as our team is already assigned to your job.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "service-guarantee",
      title: "Service Guarantee & Quality",
      category: "Service Quality",
      icon: Shield,
      gradient: "from-purple-500 to-violet-600",
      content: `
        <div class="space-y-6">
          <p class="text-lg text-gray-200">Our commitment to exceptional cleaning service:</p>
          
          <div class="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div class="flex items-center space-x-2 mb-3">
              <div class="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h4 class="text-purple-300 font-semibold">100% Satisfaction Guarantee</h4>
            </div>
            <p class="text-gray-300">If you're not satisfied, we'll return within 24 hours to fix any issues at no additional charge.</p>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-violet-400 rounded-full flex-shrink-0"></div>
              <span class="text-gray-300">Trained professionals</span>
            </div>
            <div class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-violet-400 rounded-full flex-shrink-0"></div>
              <span class="text-gray-300">Eco-friendly products</span>
            </div>
            <div class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-violet-400 rounded-full flex-shrink-0"></div>
              <span class="text-gray-300">Fully insured team</span>
            </div>
            <div class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div class="w-2 h-2 bg-violet-400 rounded-full flex-shrink-0"></div>
              <span class="text-gray-300">24-hour response</span>
            </div>
          </div>
        </div>
      `
    }
  ];

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.timeline()
        .from(".hero-badge", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        })
        .from(".hero-title", {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        }, "-=0.4")
        .from(".hero-description", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .from(".hero-highlights", {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.4");

      // Contact cards animation
      gsap.fromTo(".contact-card", 
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-cards",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingElements />
      
      {/* Animated background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
            >
              <FileText className="h-5 w-5 text-purple-300" />
              <span className="text-white font-medium">Legal Terms & Conditions</span>
            </motion.div>
            
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Terms of
              </span>
              {" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            <p className="hero-description text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Clear, fair terms for our professional cleaning services in Ontario. 
              Understanding our policies, guarantees, and your rights as our valued customer.
            </p>
            
            <div className="hero-highlights flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 bg-emerald-500/10 px-6 py-3 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-3 bg-purple-500/10 px-6 py-3 rounded-full border border-purple-500/20">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-purple-300 font-medium">Licensed Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Terms Sections */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Detailed Terms & Policies
            </h2>
            <p className="text-xl text-gray-300">
              Click any section below to learn more about our service terms
            </p>
          </motion.div>

          <div className="space-y-6">
            {termsItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openAccordion === item.id}
                onToggle={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-xl text-gray-300">
              We're here to help clarify any aspect of our service terms
            </p>
          </motion.div>

          <div className="contact-cards grid md:grid-cols-3 gap-8">
            <MagneticButton className="contact-card">
              <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm text-center hover:from-white/20 hover:to-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-gray-300 mb-2">(555) 123-4567</p>
                <p className="text-sm text-gray-400">Mon-Fri: 8AM-6PM EST</p>
              </div>
            </MagneticButton>

            <MagneticButton className="contact-card">
              <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm text-center hover:from-white/20 hover:to-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-300 mb-2">info@dustdrifters.ca</p>
                <p className="text-sm text-gray-400">24-hour response</p>
              </div>
            </MagneticButton>

            <MagneticButton className="contact-card">
              <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm text-center hover:from-white/20 hover:to-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Legal Support</h3>
                <p className="text-gray-300 mb-2">Terms Assistance</p>
                <p className="text-sm text-gray-400">Professional Guidance</p>
              </div>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Professional Cleaning?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Book your service today and see why our customers trust us
            </p>
            <MagneticButton>
              <a 
                href="/contact-us"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-purple-500/25"
              >
                <span>Book Your Service</span>
                <ChevronRight className="h-5 w-5" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 