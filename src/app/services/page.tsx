"use client";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { CTA } from "@/components/CTA";
import { GetInTouch } from "@/components/GetInTouch";
import { ServicesHeroSection } from "@/components/blocks/ServicesHeroSection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <ServicesHeroSection />
      <div className="relative z-10">
        <Services />
        <div className="mt-4">
          <CTA />
        </div>
        <Gallery />
        <TestimonialsMarquee />
        <div className="my-12 h-6 w-full bg-gradient-to-r from-purple-200 via-pink-100 to-emerald-100 rounded-full opacity-80" />
        <div className="mt-16">
          <GetInTouch />
        </div>
      </div>
    </main>
  );
} 