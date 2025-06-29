import { GetInTouch } from "@/components/GetInTouch";
import { Suspense } from "react";
import { ContactHero } from "@/components/ContactHero";
import { ContactSocial } from "@/components/ContactSocial";
import { ServicesHeroSection } from "@/components/blocks/ServicesHeroSection";

export const metadata = {
  title: "Contact Us | Dust Drifters - Professional Cleaning Services",
  description: "Get in touch with our team for all your cleaning needs. We're here to help with any questions or to schedule a service.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Form Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <GetInTouch />
      </Suspense>

      {/* Social Media Section */}
      <ContactSocial />

      {/* Services Hero Section */}
      <ServicesHeroSection />
    </main>
  );
}