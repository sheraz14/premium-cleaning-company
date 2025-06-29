"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "../../gsap-public/src/ScrollTrigger.js";
import ScrollSmoother from "../../gsap-public/src/ScrollSmoother.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function ScrollController({ children }: { children: React.ReactNode }) {
  const smoother = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize ScrollSmoother for ultra-smooth scrolling
      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        effects: true,
        preventDefault: true
      });

      // Global scroll progress indicator
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3
        }
      });

      // Parallax background elements
      gsap.utils.toArray(".parallax-bg").forEach((element: any) => {
        const speed = element.dataset.speed || 0.5;
        gsap.to(element, {
          yPercent: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Reveal animations for elements with data-reveal
      gsap.utils.toArray("[data-reveal]").forEach((element: any) => {
        const direction = element.dataset.reveal || "up";
        const delay = parseFloat(element.dataset.delay) || 0;
        const duration = parseFloat(element.dataset.duration) || 1;

        let fromVars: any = { opacity: 0 };
        
        switch (direction) {
          case "up":
            fromVars.y = 100;
            break;
          case "down":
            fromVars.y = -100;
            break;
          case "left":
            fromVars.x = -100;
            break;
          case "right":
            fromVars.x = 100;
            break;
          case "scale":
            fromVars.scale = 0.5;
            break;
          case "rotate":
            fromVars.rotation = 180;
            fromVars.scale = 0.5;
            break;
        }

        gsap.fromTo(element, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: duration,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Stagger animations for grouped elements
      gsap.utils.toArray("[data-stagger]").forEach((container: any) => {
        const children = container.children;
        const stagger = parseFloat(container.dataset.stagger) || 0.1;
        
        gsap.fromTo(children, 
          { opacity: 0, y: 50 }, 
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: stagger,
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Pin animations for sticky elements
      gsap.utils.toArray("[data-pin]").forEach((element: any) => {
        const duration = element.dataset.pinDuration || "100%";
        
        ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: `+=${duration}`,
          pin: true,
          pinSpacing: false
        });
      });

      // Morphing animations on scroll
      gsap.utils.toArray("[data-morph]").forEach((element: any) => {
        const fromScale = parseFloat(element.dataset.fromScale) || 1;
        const toScale = parseFloat(element.dataset.toScale) || 1.2;
        const fromRotation = parseFloat(element.dataset.fromRotation) || 0;
        const toRotation = parseFloat(element.dataset.toRotation) || 360;

        gsap.fromTo(element, 
          { 
            scale: fromScale, 
            rotation: fromRotation 
          },
          {
            scale: toScale,
            rotation: toRotation,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      });

      // Text reveal animations
      gsap.utils.toArray("[data-text-reveal]").forEach((element: any) => {
        const chars = element.querySelectorAll('.char');
        const words = element.querySelectorAll('.word');
        const lines = element.querySelectorAll('.line');
        
        if (chars.length) {
          gsap.fromTo(chars, 
            { opacity: 0, y: 100, rotationX: -90 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              ease: "back.out(1.7)",
              stagger: {
                amount: 0.8,
                from: "start"
              },
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Color shift animations
      gsap.utils.toArray("[data-color-shift]").forEach((element: any) => {
        const fromColor = element.dataset.fromColor || "#000000";
        const toColor = element.dataset.toColor || "#ffffff";
        
        gsap.to(element, {
          color: toColor,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1
          }
        });
      });

      // Background parallax with different speeds
      gsap.utils.toArray("[data-bg-parallax]").forEach((element: any) => {
        const speed = parseFloat(element.dataset.bgParallax) || 0.5;
        
        gsap.to(element, {
          backgroundPositionY: `${-window.innerHeight * speed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 3D tilt effect on scroll
      gsap.utils.toArray("[data-tilt]").forEach((element: any) => {
        const maxTilt = parseFloat(element.dataset.tilt) || 15;
        
        gsap.to(element, {
          rotationY: maxTilt,
          rotationX: maxTilt / 2,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // Scale on scroll
      gsap.utils.toArray("[data-scale-scroll]").forEach((element: any) => {
        const fromScale = parseFloat(element.dataset.fromScale) || 0.8;
        const toScale = parseFloat(element.dataset.toScale) || 1.2;
        
        gsap.fromTo(element, 
          { scale: fromScale },
          {
            scale: toScale,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      });

      // Refresh ScrollTrigger when animations are set up
      ScrollTrigger.refresh();

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
        <div 
          ref={progressRef}
          className="scroll-progress h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 origin-left scale-x-0"
        ></div>
      </div>

      {/* Smooth Scrolling Wrapper */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {children}
        </div>
      </div>
    </>
  );
} 