"use client";

import { VideoHero } from "@/components/VideoHero";
import { AnimatedFeatures } from "@/components/AnimatedFeatures";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { BookingForm } from "@/components/BookingForm";
import { HowItWorks } from "@/components/HowItWorks";
import { Divider } from "@/components/Divider";
import { GetInTouch } from "@/components/GetInTouch";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Global Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div className="scroll-progress h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 origin-left scale-x-0 shadow-lg"></div>
      </div>

      {/* Hero Section with enhanced scroll effects */}
      <section 
        className="relative"
        data-parallax="0.3"
        data-parallax-direction="y"
      >
        <VideoHero />
      </section>

      {/* Features Section with stagger and reveal animations */}
      <section 
        className="relative"
        data-reveal="up"
        data-duration="1.2"
        data-bg-morph
        data-from-bg="linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)"
        data-to-bg="linear-gradient(135deg, rgba(236, 254, 255, 0.9) 0%, rgba(224, 242, 254, 0.95) 100%)"
      >
        <div data-stagger="0.15" data-stagger-direction="scale">
          <AnimatedFeatures />
        </div>
      </section>

      {/* Services Section with parallax and tilt effects */}
      <section 
        className="relative"
        data-parallax="0.2"
        data-tilt="8"
      >
        <div 
          data-reveal="left"
          data-duration="1.5"
        >
          <Services />
        </div>
      </section>

      {/* How It Works with advanced morphing */}
      <section 
        className="relative"
        data-reveal="flip"
        data-scale-scroll
        data-from-scale="0.95"
        data-to-scale="1.05"
      >
        <div 
          data-stagger="0.2"
          data-stagger-direction="up"
        >
          <HowItWorks />
        </div>
      </section>

      {/* Testimonials with floating and magnetic effects */}
      <section 
        className="relative"
        data-reveal="scale"
        data-float="12"
        data-float-duration="6"
      >
        <div data-magnetic="0.4">
          <TestimonialsMarquee />
        </div>
      </section>

      {/* FAQ Section with typewriter and particles */}
      <section 
        className="relative"
        data-reveal="right"
        data-particles="25"
        data-color-shift
        data-from-color="#374151"
        data-to-color="#7c3aed"
      >
        <FAQ />
      </section>

      {/* Get In Touch Section with enhanced animations */}
      <section 
        className="relative"
        data-reveal="up"
        data-duration="2"
        data-morph
        data-from-scale="0.8"
        data-to-scale="1.1"
        data-from-rotation="0"
        data-to-rotation="5"
      >
        <div data-magnetic="0.6">
          <GetInTouch />
        </div>
      </section>

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
        <div 
          className="absolute w-28 h-28 bg-yellow-500/10 rounded-full blur-xl"
          data-float="10"
          data-float-duration="7"
          style={{ top: '30%', left: '5%' }}
        ></div>
      </div>

    </main>
  );
}
