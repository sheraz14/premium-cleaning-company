"use client";

import { Shield, Clock, Award, Leaf, Users, Sparkles } from "lucide-react";

const features = [
  {
    title: "Professional Staff",
    description: "Our cleaning professionals are thoroughly vetted, trained, and insured for your peace of mind.",
    icon: Users,
  },
  {
    title: "Eco-Friendly Products",
    description: "We use environmentally friendly cleaning products that are safe for your family, pets, and the planet.",
    icon: Leaf,
  },
  {
    title: "100% Satisfaction",
    description: "If you're not completely satisfied with our service, we'll come back and clean again at no additional cost.",
    icon: Award,
  },
  {
    title: "Flexible Scheduling",
    description: "Choose from weekly, bi-weekly, or monthly cleaning services that fit your schedule and budget.",
    icon: Clock,
  },
  {
    title: "Insured & Bonded",
    description: "Our company is fully insured and bonded, providing protection for both our clients and employees.",
    icon: Shield,
  },
  {
    title: "Attention to Detail",
    description: "We pride ourselves on our meticulous attention to detail, ensuring no corner is left untouched.",
    icon: Sparkles,
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why Choose Our Cleaning Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We're committed to providing exceptional cleaning services with a focus on quality, reliability, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}