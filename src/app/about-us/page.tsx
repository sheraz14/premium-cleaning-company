import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { CTA } from "@/components/CTA";
import { AboutPageContent } from "@/app/about-us/AboutPageContent";
import { ServicesHeroSection } from "@/components/blocks/ServicesHeroSection";


export const metadata = {
  title: "About Us | Dust Drifters - Professional Cleaning Services",
  description: "Learn about our company's mission, values, and the team behind our professional cleaning services."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutPageContent />
      <CTA />
      <TestimonialsMarquee />
      <ServicesHeroSection />
    </main>
  );
} 