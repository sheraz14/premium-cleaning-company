"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Play, Pause, Star, CheckCircle, Calendar, ShieldCheck, Clock, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import SplitText from "../../gsap-public/src/SplitText.js";
import { motion } from "framer-motion";

// Register SplitText plugin
gsap.registerPlugin(SplitText);

export function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Ensure video plays on mobile devices
    const ensureVideoPlays = () => {
      const video = document.getElementById('hero-video') as HTMLVideoElement;
      if (video && isMobile) {
        video.muted = true; // Ensure muted for autoplay on mobile
        video.playsInline = true; // Required for iOS
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, but that's okay
            setIsPlaying(false);
          });
        }
      }
    };
    
    // Delay to ensure video element is loaded
    setTimeout(ensureVideoPlays, 100);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Optimized GSAP animations with mobile performance in mind
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for all elements IMMEDIATELY to prevent flash
      gsap.set(".gsap-hero-content", { autoAlpha: 0, y: isMobile ? 50 : 100 });
      gsap.set(".gsap-hero-badge", { autoAlpha: 0, scale: 0, rotation: isMobile ? 0 : -45 });
      gsap.set(".gsap-hero-buttons", { autoAlpha: 0, y: isMobile ? 30 : 50 });
      gsap.set(".gsap-feature-badges", { autoAlpha: 0, y: isMobile ? 20 : 30 });

      // Mobile-optimized entrance animations
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 100%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: false
        }
      });

      // Trust badge entrance - simplified for mobile
      heroTimeline.to(".gsap-hero-badge", {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: isMobile ? "power2.out" : "back.out(1.7)"
      });

      // Main content entrance
      heroTimeline.to(".gsap-hero-content", {
        autoAlpha: 1,
        y: 0,
        duration: isMobile ? 0.8 : 1,
        ease: "power3.out"
      }, "-=0.4");

      // Buttons entrance
      heroTimeline.to(".gsap-hero-buttons", {
        autoAlpha: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power2.out"
      }, "-=0.2");

      // Feature badges entrance
      heroTimeline.to(".gsap-feature-badges", {
        autoAlpha: 1,
        y: 0,
        duration: isMobile ? 0.4 : 0.6,
        ease: "power2.out"
      }, "-=0.1");

      // Simplified parallax for mobile performance
      if (!isMobile) {
        // Desktop parallax effects
        gsap.to(".video-background", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(".hero-content-parallax", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });

        // Desktop overlay morphing
        gsap.to(".hero-overlay", {
          background: "linear-gradient(135deg, rgba(51, 65, 85, 0.9) 0%, rgba(30, 58, 138, 0.8) 50%, rgba(67, 56, 202, 0.9) 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 2
          }
        });

        gsap.to(".hero-scale-content", {
          scale: 0.8,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "center top",
            end: "bottom top",
            scrub: 1
          }
        });
      } else {
        // Mobile-optimized simple fade on scroll
        gsap.to(".hero-scale-content", {
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "center top",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      // SplitText animations - simplified for mobile
      if (headingRef.current && !isMobile) {
        // Desktop SplitText with enhanced effects
        const headingSplit = new SplitText(headingRef.current, { type: "words,chars" });
        
        gsap.set(headingSplit.chars, {
          autoAlpha: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: "center bottom"
        });

        gsap.to(headingSplit.chars, {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.8,
            from: "start"
          },
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(headingSplit.chars, {
          color: "#f59e0b",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 50%",
            end: "bottom 30%",
            scrub: 1
          }
        });
      } else if (headingRef.current && isMobile) {
        // Mobile simple fade-in animation
        gsap.fromTo(headingRef.current, {
          autoAlpha: 0,
          y: 30
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Subheading animations
      if (subheadingRef.current && !isMobile) {
        const subheadingSplit = new SplitText(subheadingRef.current, { type: "words,chars" });
        
        gsap.set(subheadingSplit.words, {
          autoAlpha: 0,
          y: 50,
          rotationY: -45
        });

        gsap.to(subheadingSplit.words, {
          autoAlpha: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start"
          },
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      } else if (subheadingRef.current && isMobile) {
        // Mobile simple animation
        gsap.fromTo(subheadingRef.current, {
          autoAlpha: 0,
          y: 20
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Button animations - simplified for mobile
      gsap.to(".gsap-quote-button", {
        autoAlpha: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: isMobile ? "power2.out" : "back.out(1.7)",
        scrollTrigger: {
          trigger: ".gsap-hero-buttons",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".gsap-services-button", {
        autoAlpha: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: isMobile ? "power2.out" : "back.out(1.7)",
        delay: 0.1,
        scrollTrigger: {
          trigger: ".gsap-hero-buttons",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".gsap-video-button", {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.4 : 0.6,
        ease: isMobile ? "power2.out" : "back.out(1.7)",
        delay: 0.2,
        scrollTrigger: {
          trigger: ".gsap-hero-buttons",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Continuous animations - disabled on mobile for performance
      if (!isMobile) {
        gsap.to(".gsap-arrow-quote", {
          x: 5,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });

        gsap.to(".gsap-arrow-services", {
          x: 4,
          duration: 2.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.5
        });

        if (isPlaying) {
          gsap.to(".gsap-video-icon", {
            scale: 1.1,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
          });
        }

        gsap.to(".rotating-element", {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(".trust-badge-morph", {
          borderRadius: "50%",
          scale: 0.8,
          backgroundColor: "rgba(59, 130, 246, 0.9)",
          ease: "none",
          scrollTrigger: {
            trigger: ".trust-badge-morph",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 2
          }
        });
      }

    }, contentRef);

    return () => ctx.revert();
  }, [isPlaying, isMobile]);

  const toggleVideo = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-[85vh] sm:h-[90vh] lg:h-[95vh] w-full overflow-hidden">
      {/* Video Background with Mobile Optimization */}
      <div 
        className={`absolute inset-0 w-full h-full ${!isMobile ? 'video-background' : ''}`}
        style={{ 
          transform: isMobile ? 'translateY(0)' : `translateY(${scrollY * 0.15 - 50}px)`,
          transition: isMobile ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <video
          id="hero-video"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: isMobile ? 'center center' : 'center 30%' }}
          onLoadedData={() => {
            // Ensure video plays on mobile after loading
            if (isMobile) {
              const video = document.getElementById('hero-video') as HTMLVideoElement;
              if (video) {
                video.play().catch(() => {
                  // Autoplay failed, but that's okay
                  setIsPlaying(false);
                });
              }
            }
          }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay with mobile optimization */}
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-900/75 via-blue-900/65 to-indigo-900/75 ${!isMobile ? 'hero-overlay' : ''}`}></div>

      {/* Content with mobile-responsive layout */}
      <div 
        ref={contentRef}
        className={`hero-content-container relative z-10 h-full flex flex-col items-center justify-center text-center sm:text-center px-4 sm:px-6 max-w-6xl mx-auto ${!isMobile ? 'hero-content-parallax hero-scale-content' : ''}`}
        style={{ marginTop: isMobile ? '-3vh' : '-4vh' }}
      >
        {/* Trust badge - mobile optimized */}
        <div className="gsap-hero-badge inline-flex items-center bg-white/15 backdrop-blur-md rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 mb-3 sm:mb-4 md:mb-5 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-0.5 sm:space-x-1 mr-1.5 sm:mr-2 md:mr-3">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white text-xs sm:text-sm md:text-base font-semibold">
            Trusted by 150+ Happy Customers
          </span>
        </div>
            
        {/* Heading with properly scaled responsive sizing */}
        <h1 
          ref={headingRef}
          className="gsap-hero-content text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 sm:mb-3 md:mb-4 leading-tight px-2 sm:px-3 text-center w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10"
        >
          <div className="mb-1 sm:mb-1.5">
            <span className="text-white">Premium </span>
            <span className="text-yellow-400">Cleaning </span>
            <span className="text-white">Services</span>
          </div>
          <div>
            <span className="text-green-400">You Can Trust</span>
          </div>
        </h1>

        {/* Subheading with flexible alignment */}
        <p 
          ref={subheadingRef}
          className="gsap-hero-content text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl text-white/95 mb-3 sm:mb-4 md:mb-5 max-w-full xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl leading-relaxed px-2 sm:px-4 text-center w-full"
        >
          Transform your space with our expert cleaning solutions. Professional, reliable, and tailored to your needs.
        </p>

        {/* Animated Feature badges - properly scaled */}
        <div className="gsap-feature-badges flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
          <AnimatedFeatureBadge 
            icon={Shield} 
            text="Fully Insured" 
            bgColor="bg-blue-500/25"
            delay={0}
            isMobile={isMobile}
          />
          <AnimatedFeatureBadge 
            icon={Clock} 
            text="Fast & Reliable" 
            bgColor="bg-green-500/25"
            delay={0.2}
            isMobile={isMobile}
          />
          <AnimatedFeatureBadge 
            icon={Sparkles} 
            text="Premium Quality" 
            bgColor="bg-purple-500/25"
            delay={0.4}
            isMobile={isMobile}
          />
        </div>
            
        {/* Action buttons with centered pause button */}
        <div className="gsap-hero-buttons flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 md:gap-5 justify-center items-center w-full max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-none px-4 sm:px-0">
          <div className="gsap-quote-button w-full sm:w-auto">
            <Button size={isMobile ? "lg" : "lg"} className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-5 xs:px-6 sm:px-7 md:px-8 py-3 xs:py-3.5 sm:py-4 md:py-4 rounded-xl text-base xs:text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-yellow-300/50">
              Get Free Quote
              <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 ml-2 xs:ml-2.5 sm:ml-3 gsap-arrow-quote" />
            </Button>
          </div>
          
          {/* Centered container for second row buttons */}
          <div className="flex justify-center items-center gap-3 xs:gap-4 sm:gap-4 w-full sm:w-auto">
            <div className="gsap-services-button flex-1 sm:flex-none">
              <Button size={isMobile ? "default" : "lg"} variant="outline" className="w-full sm:w-auto bg-white/15 border-white/70 text-white hover:bg-white/25 hover:border-white/90 px-4 xs:px-5 sm:px-6 md:px-7 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-xl text-sm xs:text-base sm:text-lg backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link href="/services" className="flex items-center">
                  View Services
                  <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ml-1.5 xs:ml-2 sm:ml-2.5 gsap-arrow-services" />
                </Link>
              </Button>
            </div>
              
            {/* Pause button centered vertically and horizontally */}
            <div className="flex justify-center items-center">
              <button
                onClick={toggleVideo}
                className="gsap-video-button bg-white/20 backdrop-blur-md border border-white/40 rounded-full w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-12 md:h-12 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <div className="gsap-video-icon">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Play className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Simplified Scroll indicator - visible on mobile */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm mb-2 font-medium">
              {isMobile ? 'Swipe up' : 'Scroll to explore'}
            </span>
            <div className={`${isMobile ? 'w-0.5 h-6' : 'w-0.5 h-6'} bg-white/50 rounded-full animate-scrollDown`}></div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for mobile optimization */}
      <style jsx global>{`
        /* Hide elements initially to prevent flash before GSAP animations */
        .gsap-hero-content,
        .gsap-hero-badge,
        .gsap-hero-buttons,
        .gsap-feature-badges {
          opacity: 0;
          visibility: hidden;
        }
        
        .char {
          display: inline-block;
          transform-origin: center bottom;
        }
        
        .word {
          display: inline-block;
          margin-right: 0.1em;
          transform-origin: center bottom;
        }
        
        @keyframes scrollDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(300%);
            opacity: 0;
          }
        }
        .animate-scrollDown {
          animation: scrollDown 2s ease-in-out infinite;
        }

        /* iPhone 14 Pro specific optimizations (393px width) */
        @media only screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) {
          .gsap-hero-content h1 {
            font-size: 2.5rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1.25rem !important;
          }
          
          .gsap-hero-content p {
            font-size: 1rem !important;
            line-height: 1.5 !important;
            margin-bottom: 1.5rem !important;
          }
          
          .gsap-hero-badge {
            margin-bottom: 1.5rem !important;
          }
          
          .gsap-feature-badges {
            margin-bottom: 1.5rem !important;
            gap: 0.5rem !important;
          }
          
          .gsap-hero-buttons {
            gap: 1.25rem !important;
          }
        }

        /* iPhone 14 Pro Max specific optimizations (430px width) */
        @media only screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) {
          .gsap-hero-content h1 {
            font-size: 2.75rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1.5rem !important;
          }
          
          .gsap-hero-content p {
            font-size: 1.125rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1.75rem !important;
          }
          
          .gsap-hero-badge {
            margin-bottom: 1.75rem !important;
          }
          
          .gsap-feature-badges {
            margin-bottom: 1.75rem !important;
            gap: 0.75rem !important;
          }
          
          .gsap-hero-buttons {
            gap: 1.5rem !important;
          }
        }

        /* General iPhone Pro series optimizations (covers both Pro and Pro Max) */
        @media only screen and (min-device-width: 390px) and (max-device-width: 430px) and (-webkit-device-pixel-ratio: 3) {
          .hero-content-container {
            margin-top: -8vh !important;
          }
          
          .gsap-hero-content {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          
          .gsap-feature-badges .flex {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          
          .gsap-feature-badges .flex::-webkit-scrollbar {
            display: none !important;
          }
        }

        /* Enhanced responsive breakpoints */
        @media (min-width: 475px) {
          .xs\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:gap-2 { gap: 0.5rem; }
          .xs\\:gap-2\\.5 { gap: 0.625rem; }
          .xs\\:gap-3 { gap: 0.75rem; }
          .xs\\:px-4 { padding-left: 1rem; padding-right: 1rem; }
          .xs\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
          .xs\\:py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
          .xs\\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .xs\\:p-2 { padding: 0.5rem; }
          .xs\\:w-3 { width: 0.75rem; }
          .xs\\:h-3 { height: 0.75rem; }
          .xs\\:w-3\\.5 { width: 0.875rem; }
          .xs\\:h-3\\.5 { height: 0.875rem; }
          .xs\\:w-4 { width: 1rem; }
          .xs\\:h-4 { height: 1rem; }
          .xs\\:ml-1\\.5 { margin-left: 0.375rem; }
          .xs\\:ml-2 { margin-left: 0.5rem; }
        }

        /* Mobile performance optimizations */
        @media (max-width: 768px) {
          .gsap-hero-content,
          .gsap-hero-badge,
          .gsap-hero-buttons,
          .gsap-feature-badges {
            will-change: auto;
          }
          
          /* Disable hardware acceleration on mobile for better performance */
          .hero-content-parallax {
            transform: none !important;
          }
          
          /* Better mobile text rendering */
          h1, p {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }

        /* Smooth touch interactions */
        @media (hover: none) and (pointer: coarse) {
          button:hover {
            transform: none;
          }
          
          button:active {
            transform: scale(0.95);
          }
          
          /* Ensure pause button remains circular */
          .gsap-video-button {
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Improved button styling */
        .gsap-video-button {
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: auto;
        }

        /* Centered pause button alignment */
        .gsap-hero-buttons .flex:last-child {
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

// Enhanced Animated Feature Badge Component with mobile optimization
function AnimatedFeatureBadge({ 
  icon: Icon, 
  text, 
  bgColor, 
  delay = 0,
  isMobile = false
}: { 
  icon: any; 
  text: string; 
  bgColor: string; 
  delay?: number;
  isMobile?: boolean;
}) {
  return (
    <motion.div 
      className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 md:space-x-2.5 bg-white/15 backdrop-blur-md rounded-full px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 xs:py-1.5 sm:py-2 md:py-2.5 border border-white/30 shadow-lg"
      initial={{ opacity: 0, y: isMobile ? 15 : 25, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: isMobile ? 0.5 : 0.7, delay: delay + 0.8, ease: "easeOut" }}
      whileHover={isMobile ? {} : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.5)" }}
    >
      <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white/90" />
      <span className="text-white text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base font-medium whitespace-nowrap">
        {text}
      </span>
    </motion.div>
  );
} 