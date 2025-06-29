"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "../../gsap-public/src/ScrollTrigger.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function GlobalScrollAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      // Enhanced reveal animations for elements with data-reveal
      gsap.utils.toArray("[data-reveal]").forEach((element: any) => {
        const direction = element.dataset.reveal || "up";
        const delay = parseFloat(element.dataset.delay) || 0;
        const duration = parseFloat(element.dataset.duration) || 1;

        let fromVars: any = { opacity: 0 };
        
        switch (direction) {
          case "up":
            fromVars.y = 100;
            fromVars.rotationX = -45;
            break;
          case "down":
            fromVars.y = -100;
            fromVars.rotationX = 45;
            break;
          case "left":
            fromVars.x = -100;
            fromVars.rotationY = -45;
            break;
          case "right":
            fromVars.x = 100;
            fromVars.rotationY = 45;
            break;
          case "scale":
            fromVars.scale = 0.3;
            fromVars.rotation = 180;
            break;
          case "flip":
            fromVars.rotationX = -180;
            fromVars.scale = 0.5;
            break;
        }

        gsap.fromTo(element, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
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
        const direction = container.dataset.staggerDirection || "up";
        
        let fromVars: any = { opacity: 0 };
        
        switch (direction) {
          case "up":
            fromVars.y = 80;
            break;
          case "down":
            fromVars.y = -80;
            break;
          case "left":
            fromVars.x = -80;
            break;
          case "right":
            fromVars.x = 80;
            break;
          case "scale":
            fromVars.scale = 0.5;
            break;
        }
        
        gsap.fromTo(children, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
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

      // Advanced parallax with multiple layers
      gsap.utils.toArray("[data-parallax]").forEach((element: any) => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const direction = element.dataset.parallaxDirection || "y";
        
        if (direction === "y") {
          gsap.to(element, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        } else if (direction === "x") {
          gsap.to(element, {
            xPercent: -100 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "left right",
              end: "right left",
              scrub: 1
            }
          });
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

      // Background gradient morphing
      gsap.utils.toArray("[data-bg-morph]").forEach((element: any) => {
        const fromBg = element.dataset.fromBg || "linear-gradient(45deg, #667eea 0%, #764ba2 100%)";
        const toBg = element.dataset.toBg || "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)";
        
        gsap.to(element, {
          background: toBg,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        });
      });

      // 3D tilt effect on scroll
      gsap.utils.toArray("[data-tilt]").forEach((element: any) => {
        const maxTilt = parseFloat(element.dataset.tilt) || 15;
        
        gsap.to(element, {
          rotationY: maxTilt,
          rotationX: maxTilt / 2,
          transformPerspective: 1000,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // Scale on scroll with bounce
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

      // Floating animations
      gsap.utils.toArray("[data-float]").forEach((element: any, i: number) => {
        const intensity = parseFloat(element.dataset.float) || 10;
        const duration = parseFloat(element.dataset.floatDuration) || 3;
        
        gsap.to(element, {
          y: (i % 2 === 0 ? 1 : -1) * intensity * 0.8,
          x: (i % 3 === 0 ? 1 : -1) * intensity * 0.4,
          rotation: (i % 4 - 2) * 2.5,
          duration: duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: (i * 0.3) % 2
        });
      });

      // Text reveal with typewriter effect
      gsap.utils.toArray("[data-typewriter]").forEach((element: any) => {
        const text = element.textContent;
        const speed = parseFloat(element.dataset.typewriterSpeed) || 0.05;
        
        element.textContent = "";
        
        gsap.to(element, {
          duration: text.length * speed,
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            element.textContent = text.slice(0, currentLength);
          },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });

      // Magnetic effect for interactive elements
      gsap.utils.toArray("[data-magnetic]").forEach((element: any) => {
        const strength = parseFloat(element.dataset.magnetic) || 0.3;
        
        element.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(element, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // Scroll-triggered particle effects
      gsap.utils.toArray("[data-particles]").forEach((element: any) => {
        const count = parseInt(element.dataset.particles) || 20;
        
        for (let i = 0; i < count; i++) {
          const particle = document.createElement("div");
          particle.className = "scroll-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${(i % 3 + 1) * 2 + 2}px;
            height: ${(i % 3 + 1) * 2 + 2}px;
            background: radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.4) 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
          `;
          element.appendChild(particle);
          
          gsap.set(particle, {
            x: (i * 47) % element.offsetWidth,
            y: (i * 31) % element.offsetHeight,
            scale: 0
          });
          
          gsap.to(particle, {
            scale: 1,
            opacity: 0.8,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: i * 0.05
          });
          
          gsap.to(particle, {
            y: (i % 2 === 0 ? -1 : 1) * (25 + (i % 3) * 8.33),
            x: (i % 3 === 0 ? -1 : 1) * (15 + (i % 2) * 7.5),
            duration: 2 + (i % 3) * 0.67,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      });

      // Refresh ScrollTrigger after all animations are set
      ScrollTrigger.refresh();

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Global Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div className="scroll-progress h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 origin-left scale-x-0 shadow-lg"></div>
      </div>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          data-float="15"
          data-float-duration="4"
          style={{ top: '10%', left: '80%' }}
        ></div>
        <div 
          className="absolute w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
          data-float="12"
          data-float-duration="5"
          style={{ top: '60%', left: '10%' }}
        ></div>
        <div 
          className="absolute w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
          data-float="8"
          data-float-duration="3"
          style={{ top: '80%', left: '70%' }}
        ></div>
      </div>
    </>
  );
} 