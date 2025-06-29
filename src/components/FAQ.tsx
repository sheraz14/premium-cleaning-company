"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp, Sparkles, MessageCircle, Phone, HelpCircle } from "lucide-react";
import { gsap } from "gsap";
import ScrollTrigger from "../../gsap-public/src/ScrollTrigger.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What cleaning services do you offer?",
    answer: "We offer comprehensive cleaning services including house cleaning, deep cleaning, move-in/out cleaning, commercial cleaning, Airbnb cleaning, post-renovation cleaning, condo cleaning, and eco-friendly cleaning options. Each service is customized to meet your specific needs.",
    icon: "🏠"
  },
  {
    question: "Are you insured and bonded?",
    answer: "Yes, we are fully insured and bonded for your peace of mind. Our team is trained, background-checked, and covered by comprehensive insurance. We carry both liability and workers' compensation insurance for your protection.",
    icon: "🛡️"
  },
  {
    question: "How do you price your services?",
    answer: "Our pricing is based on the size of your space, frequency of service, specific cleaning requirements, and any additional services requested. We offer competitive rates and provide free, no-obligation quotes for all our services.",
    icon: "💰"
  },
  {
    question: "Do you bring your own cleaning supplies?",
    answer: "Yes, we provide all necessary cleaning supplies and equipment. We use eco-friendly, non-toxic products that are safe for your family, pets, and the environment. If you have specific product preferences, we're happy to accommodate.",
    icon: "🧽"
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 24-48 hours in advance for regular cleaning services. For deep cleaning or specialized services, we suggest booking 3-5 days ahead. However, we often have same-day availability.",
    icon: "📅"
  },
  {
    question: "What if I'm not satisfied with the cleaning?",
    answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with our service, please contact us within 24 hours and we'll return to address any concerns at no additional charge. Your satisfaction is our top priority.",
    icon: "✨"
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".gsap-faq-badge", { opacity: 0, y: 50, scale: 0.8 });
      gsap.set(".gsap-faq-heading", { opacity: 0, y: 50 });
      gsap.set(".gsap-faq-description", { opacity: 0, y: 30 });
      gsap.set(".gsap-faq-item", { opacity: 0, y: 60, scale: 0.95 });
      gsap.set(".gsap-faq-cta", { opacity: 0, y: 80 });

      // Header animations timeline
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation with bounce
      headerTimeline.to(".gsap-faq-badge", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });

      // Heading animation
      headerTimeline.to(".gsap-faq-heading", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

      // Description animation
      headerTimeline.to(".gsap-faq-description", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // FAQ items staggered animation
      gsap.to(".gsap-faq-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          amount: 1.2,
          from: "start"
        },
        scrollTrigger: {
          trigger: ".gsap-faq-container",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // CTA animation
      gsap.to(".gsap-faq-cta", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-faq-cta",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Sparkle icon continuous animation
      gsap.to(".sparkle-icon", {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);

    // Animate the opening/closing
    if (newIndex !== null) {
      gsap.to(`.faq-answer-${index}`, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
      gsap.to(`.faq-icon-${index}`, {
        rotation: 180,
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(`.faq-answer-${index}`, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in"
      });
      gsap.to(`.faq-icon-${index}`, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleItemHover = (index: number, isEntering: boolean) => {
    setHoveredIndex(isEntering ? index : null);
    
    const card = `.gsap-faq-item-${index}`;
    const emoji = `.faq-emoji-${index}`;
    
    if (isEntering) {
      gsap.to(card, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(emoji, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(emoji, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden"
    >
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-200 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-200 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-blue-200 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating question mark icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-200/30 text-2xl"
            style={{
              top: `${(i * 7.3) % 100}%`,
              left: `${(i * 11.7) % 100}%`,
              animation: `float 10s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            ?
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div 
              ref={badgeRef}
              className="gsap-faq-badge inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 backdrop-blur-sm text-purple-800 shadow-lg"
            >
              <HelpCircle className="sparkle-icon h-5 w-5 mr-2" />
              <span className="text-base font-semibold">
                Frequently Asked Questions
              </span>
            </div>
          </div>
          
          <h2 
            ref={headingRef}
            className="gsap-faq-heading text-3xl md:text-4xl font-bold text-purple-700 mb-6"
          >
            Everything You Need to Know
          </h2>
          
          <p 
            className="gsap-faq-description text-lg text-gray-600 max-w-2xl mx-auto bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
          >
            Find answers to the most common questions about our <span className="font-semibold text-purple-700">professional cleaning services</span>. Can't find what you're looking for? We're here to help!
          </p>
        </div>

        {/* Enhanced FAQ Items */}
        <div className="gsap-faq-container space-y-4 mb-12">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`gsap-faq-item gsap-faq-item-${index} group cursor-pointer`}
              onMouseEnter={() => handleItemHover(index, true)}
              onMouseLeave={() => handleItemHover(index, false)}
            >
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden ${
                  openIndex === index 
                    ? 'ring-2 ring-purple-300 shadow-2xl border-purple-200 bg-gradient-to-r from-purple-50/80 to-pink-50/80' 
                    : 'border-gray-100 hover:border-purple-200 hover:shadow-xl'
                } ${
                  hoveredIndex === index ? 'shadow-2xl' : ''
                }`}
              >
                <button
                  className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset relative overflow-hidden"
                  onClick={() => toggleItem(index)}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 transition-opacity duration-500 ${
                    openIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center space-x-4 flex-1 pr-4">
                      <div className={`faq-emoji-${index} text-2xl`}>
                        {faq.icon}
                      </div>
                      <h3 className={`text-lg font-semibold transition-colors duration-200 ${
                        openIndex === index ? 'text-purple-800' : 'text-gray-900 group-hover:text-purple-700'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`faq-icon-${index} flex-shrink-0 transition-all duration-300 ${
                      openIndex === index ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'
                    }`}>
                      <ChevronDown className="h-6 w-6" />
                    </div>
                  </div>
                </button>
                
                <div
                  className={`faq-answer-${index} overflow-hidden transition-all duration-500 ease-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ height: openIndex === index ? 'auto' : '0' }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="border-t border-purple-100 pt-4">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="gsap-faq-cta text-center">
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl filter blur-xl opacity-20 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-8 text-white shadow-2xl border border-purple-500/30 backdrop-blur-sm">
              {/* Animated particles background */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                      top: `${(i * 5.3) % 100}%`,
                      left: `${(i * 7.7) % 100}%`,
                      animation: `twinkle 3s infinite ease-in-out`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                  <MessageCircle className="h-8 w-8" />
                  Still have questions?
                </h3>
                <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
                  Our friendly team is ready to help you with any additional questions about our cleaning services. Get personalized answers and a free quote!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Contact Us
                  </button>
                  <button className="group bg-purple-800 text-white font-semibold px-8 py-4 rounded-xl hover:bg-purple-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-purple-500/50 flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Get Free Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
} 