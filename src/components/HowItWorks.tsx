"use client";

import { CalendarClock, ClipboardCheck, SparkleIcon, CreditCard, CheckCircle, MessageSquare, ThumbsUp, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Badge } from "./ui/badge";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HowItWorks() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    useLayoutEffect(() => {
    // Early exit if GSAP is not available
    if (typeof window === 'undefined' || typeof gsap === 'undefined') {
      return;
    }
    
    const ctx = gsap.context(() => {
      try {
        // Check if elements exist
        const badge = document.querySelector(".gsap-how-badge");
        const heading = document.querySelector(".gsap-how-heading");
        const description = document.querySelector(".gsap-how-description");
        
        // Only animate elements that exist and keep headings visible
        if (badge) {
          gsap.set(badge, { opacity: 0, y: isMobile ? 30 : 50, scale: 0.8 });
        }
        
        if (description) {
          gsap.set(description, { opacity: 0, y: isMobile ? 20 : 30 });
        }
        
        // Step cards
        const stepCards = document.querySelectorAll(".gsap-step-card");
        if (stepCards.length > 0) {
          gsap.set(stepCards, { 
            opacity: 0, 
            y: isMobile ? 50 : 100, 
            scale: 0.8, 
            rotationY: isMobile ? 0 : -15 
          });
        }
        
        // Connector line
        const connectorLine = document.querySelector(".gsap-connector-line");
        if (connectorLine) {
          gsap.set(connectorLine, { scaleX: 0, transformOrigin: "left center" });
        }
        
        // CTA section
        const ctaSection = document.querySelector(".gsap-cta-section");
        if (ctaSection) {
          gsap.set(ctaSection, { opacity: 0, y: isMobile ? 40 : 80 });
        }

        // Header animations timeline
        const headerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Badge animation
        if (badge) {
          headerTimeline.to(badge, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.5 : 0.6,
            ease: "back.out(1.4)"
          });
        }

        // Heading animation - subtle effect since it's always visible
        if (heading) {
          headerTimeline.to(heading, {
            scale: 1.02,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.3");
        }

        // Description animation
        if (description) {
          headerTimeline.to(description, {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.6 : 0.8,
            ease: "power2.out"
          }, "-=0.4");
        }

        // Connector line animation - disabled on mobile
        if (!isMobile && connectorLine) {
          gsap.to(connectorLine, {
            scaleX: 1,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: connectorLine,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Step cards animation
        if (stepCards.length > 0) {
          gsap.to(stepCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: isMobile ? 0.6 : 0.8,
            ease: "power3.out",
            stagger: {
              amount: isMobile ? 0.8 : 1.2,
              from: "start"
            },
            scrollTrigger: {
              trigger: ".gsap-steps-container",
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Step numbers and icons
        const stepNumbers = document.querySelectorAll(".gsap-step-number");
        if (stepNumbers.length > 0) {
          gsap.to(stepNumbers, {
            scale: 1.1,
            rotation: isMobile ? 0 : 360,
            duration: isMobile ? 0.5 : 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".gsap-steps-container",
              start: "top 70%",
              toggleActions: "play none none reverse"
            },
            delay: 0.5
          });
        }

        const stepIcons = document.querySelectorAll(".gsap-step-icon");
        if (stepIcons.length > 0) {
          gsap.to(stepIcons, {
            scale: 1,
            rotation: 0,
            duration: isMobile ? 0.4 : 0.6,
            ease: "back.out(1.7)",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".gsap-steps-container",
              start: "top 70%",
              toggleActions: "play none none reverse"
            },
            delay: 0.8
          });
        }

        // Floating animation for desktop
        if (!isMobile && stepCards.length > 0) {
          gsap.to(stepCards, {
            y: "random(-5, 5)",
            duration: "random(3, 5)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              amount: 2,
              from: "random"
            }
          });
        }

        // CTA section animation
        if (ctaSection) {
          gsap.to(ctaSection, {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.8 : 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }

        // Sparkle icon animation
        const sparkleIcon = document.querySelector(".sparkle-icon");
        if (sparkleIcon) {
          gsap.to(sparkleIcon, {
            rotation: 360,
            duration: isMobile ? 12 : 8,
            ease: "none",
            repeat: -1
          });
        }

        // Button hover animations for desktop
        if (!isMobile) {
          const buttons = document.querySelectorAll('.gsap-cta-button');
          buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
              gsap.to(button, {
                scale: 1.05,
                y: -5,
                duration: 0.3,
                ease: "power2.out"
              });
            });

            button.addEventListener('mouseleave', () => {
              gsap.to(button, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            });
          });
        }
      } catch (error) {
        console.error('HowItWorks animation setup failed:', error);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  // Step card hover animations - disabled on mobile
  const handleStepCardEnter = (index: number) => {
    if (isMobile) return;
    
    const card = document.querySelector(`.gsap-step-card-${index}`);
    const icon = card?.querySelector('.gsap-step-icon');
    const number = card?.querySelector('.gsap-step-number');
    
    if (card && icon && number) {
      gsap.to(card, {
        scale: 1.05,
        y: -15,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(icon, {
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: "back.out(1.7)"
      });

      gsap.to(number, {
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
  };

  const handleStepCardLeave = (index: number) => {
    if (isMobile) return;
    
    const card = document.querySelector(`.gsap-step-card-${index}`);
    const icon = card?.querySelector('.gsap-step-icon');
    const number = card?.querySelector('.gsap-step-number');
    
    if (card && icon && number) {
      gsap.to(card, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(number, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-slate-50/70 to-white/70 overflow-hidden backdrop-blur-sm z-10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] -mt-5 pb-20 sm:pb-32">
      {/* Top gradient rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    
      {/* Background decoration elements - simplified for mobile */}
      <div className="absolute -top-20 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-20 animate-pulse"></div>
      <div className="absolute -top-20 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 -left-4 w-24 sm:w-36 h-24 sm:h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      
      {/* Animated floating particles - reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden" style={{ top: "-20px" }}>
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: `${(i % 4 + 1) * (isMobile ? 3 : 4) + 5}px`,
              height: `${(i % 4 + 1) * (isMobile ? 3 : 4) + 5}px`,
              top: `${(i * 3.2) % 100}%`,
              left: `${(i * 6.8) % 100}%`,
              animation: 'pulse 8s infinite ease-in-out',
              animationDelay: `${(i * 0.15) % 5}s`,
              opacity: 0.1 + (i % 6) * 0.08
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
          top: "-20px",
          height: "calc(100% + 20px)"
        }}
      ></div>
      )}
      <div className="absolute inset-0 bg-transparent"></div>
      
      <div className="mb-12 sm:mb-16 text-center pt-6 sm:pt-8">
        <div
          ref={badgeRef}
          className="gsap-how-badge inline-flex items-center px-4 py-2 sm:py-2.5 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md mb-2"
          >
          <Sparkles className="sparkle-icon h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-sm sm:text-base font-medium">
              Simple Process
            </span>
        </div>
          </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mt-6 sm:mt-8 mb-12 sm:mb-16">
          <h2 ref={headingRef} className="gsap-how-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-purple-700 px-2">
            How It Works
          </h2>
          <div className="gsap-how-description mx-auto mt-1 max-w-xl sm:max-w-2xl">
            <p ref={descriptionRef} className="text-lg sm:text-xl text-gray-700 leading-relaxed bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm">
             Getting your space <span className="font-semibold text-purple-700">professionally cleaned</span> has never been easier. Just follow these simple steps.
            </p>
          </div>
        </div>

        <div className="relative gsap-steps-container">
          {/* Desktop connector line with animated gradient - hidden on mobile */}
          <div ref={connectorRef} className="gsap-connector-line hidden lg:block absolute top-36 left-0 right-0 h-1 z-0">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {/* Step 1 */}
            <div 
              className="gsap-step-card gsap-step-card-0 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 text-center cursor-pointer"
              onMouseEnter={() => handleStepCardEnter(0)}
              onMouseLeave={() => handleStepCardLeave(0)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative">
                <CalendarClock className="gsap-step-icon h-7 w-7 sm:h-9 sm:w-9 text-primary" style={{ scale: 0 }} />
                <div className="gsap-step-number absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">1</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Book Online</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Select your service, choose a date and time that works for you, and book in under 60 seconds.
              </p>
              
              {/* Benefits list */}
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">No credit card required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">Instant confirmation</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div 
              className="gsap-step-card gsap-step-card-1 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 text-center cursor-pointer"
              onMouseEnter={() => handleStepCardEnter(1)}
              onMouseLeave={() => handleStepCardLeave(1)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative">
                <MessageSquare className="gsap-step-icon h-7 w-7 sm:h-9 sm:w-9 text-primary" style={{ scale: 0 }} />
                <div className="gsap-step-number absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">2</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Confirm Details</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                We'll confirm your appointment and any special instructions or requirements you may have.
              </p>
              
              {/* Benefits list */}
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">SMS & email confirmations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">Customized cleaning plan</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div 
              className="gsap-step-card gsap-step-card-2 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 text-center cursor-pointer"
              onMouseEnter={() => handleStepCardEnter(2)}
              onMouseLeave={() => handleStepCardLeave(2)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative">
                <SparkleIcon className="gsap-step-icon h-7 w-7 sm:h-9 sm:w-9 text-primary" style={{ scale: 0 }} />
                <div className="gsap-step-number absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">3</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">We Clean</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Our professional team arrives on time and transforms your space with our thorough cleaning process.
              </p>
              
              {/* Benefits list */}
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">Fully trained & vetted staff</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">Premium eco-friendly products</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div 
              className="gsap-step-card gsap-step-card-3 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-100 text-center cursor-pointer"
              onMouseEnter={() => handleStepCardEnter(3)}
              onMouseLeave={() => handleStepCardLeave(3)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative">
                <ThumbsUp className="gsap-step-icon h-7 w-7 sm:h-9 sm:w-9 text-primary" style={{ scale: 0 }} />
                <div className="gsap-step-number absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">4</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Enjoy & Relax</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Enjoy your spotless space and provide feedback. We'll handle payment securely after your approval.
              </p>
              
              {/* Benefits list */}
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">100% satisfaction guarantee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">Secure payment processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Box with gradient border */}
        <div ref={ctaRef} className="gsap-cta-section max-w-3xl mx-auto mt-20 relative">
          {/* Enhanced CTA Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_10px_50px_-12px] shadow-purple-500/30 border-0 transition-all duration-300 hover:shadow-[0_10px_50px_-6px] hover:shadow-purple-500/50">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 p-[3px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-90 animate-gradient-x" style={{ zIndex: 1 }} />
            
            {/* Background with enhanced gradient */}
            <div className="absolute inset-0 rounded-3xl z-[1] bg-gradient-to-br from-purple-100 via-white to-pink-100" />
            
            {/* Animated glowing orbs */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400/30 rounded-full filter blur-[64px] animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400/30 rounded-full filter blur-[64px] animate-pulse" />
            
            {/* Content container with enhanced glass effect */}
            <div className="relative z-10 bg-white/70 backdrop-blur-xl rounded-3xl p-12 sm:p-16 flex flex-col items-center">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-600 inline-block text-transparent bg-clip-text">
                Ready to Get Started?
              </h3>
              <p className="text-lg text-gray-700 mb-8 text-center max-w-xl leading-relaxed">
                Experience the Dust Drifters difference! Book your cleaning service today and enjoy a spotless space without the hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <MagnetizeButton
                  className="gsap-cta-button flex-1 shadow-xl hover:shadow-purple-500/40 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => window.location.href = '/booking'}
                >
                  Book your Cleaning Online
                </MagnetizeButton>
                <a href="tel:+1234567890" className="flex-1">
                  <MagnetizeButton className="gsap-cta-button w-full shadow-xl hover:shadow-pink-500/40 transition-all duration-300 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                    Call us: (123) 456-7890
                  </MagnetizeButton>
                </a>
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
