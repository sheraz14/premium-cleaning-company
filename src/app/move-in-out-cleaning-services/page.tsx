"use client";
import { CTA } from "@/components/CTA";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { GetInTouch } from "@/components/GetInTouch";

import { MoveRight, ShieldCheck, Leaf, Users, CalendarCheck2, Star, Mail as MailIcon, Phone as PhoneIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CleaningChecklist } from "@/components/CleaningChecklist";

export default function MoveInOutCleaningPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cleaning: "move-in-out",
    bedrooms: "",
    bathrooms: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };
  const features = [
    { icon: <Leaf className="h-5 w-5 text-green-500" />, label: "Eco-Friendly Products" },
    { icon: <Users className="h-5 w-5 text-blue-500" />, label: "Vetted & Trusted Staff" },
    { icon: <CalendarCheck2 className="h-5 w-5 text-purple-500" />, label: "Flexible Scheduling" },
    { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, label: "Satisfaction Guarantee" },
  ];
  return (
    <main className="min-h-screen">
      {/* Header styled like condo cleaning, but for move in/out */}
      <section className="relative w-full h-auto min-h-[600px] flex overflow-hidden pt-12 md:pt-20 pb-0 md:py-0">
        {/* Background image for move in/out */}
        <div className="absolute inset-0 w-full h-full -z-10 bg-gray-200 hidden md:block">
          <img
            src="/images/condo.jpg"
            alt="Move In/Out Cleaning Service"
            className="object-contain object-right w-full h-full max-h-[900px]"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center' }}
          />
        </div>
        {/* Gradient fade overlay */}
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
          style={{
            background: "linear-gradient(to right, #f3f4f6 20%,rgb(242, 240, 242) 37%, rgba(243,244,246,0.05) 50%, transparent 70%)"
          }}
        />
        {/* Responsive content: Headline, form, badges, social proof */}
        <div className="w-full max-w-full md:max-w-xl flex flex-col items-center w-full px-2 md:px-4 py-8 md:py-12 z-10 -mt-20 md:-mt-30">
          {/* Headline and subtitle */}
          <div className="mb-6 flex flex-col items-center w-full">
            <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm md:text-base mb-2">
              <MoveRight className="h-5 w-5 text-emerald-500" />
              Move In/Out Cleaning Experts
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-700 via-teal-700 to-purple-600 bg-clip-text text-transparent mb-2 text-center drop-shadow-lg w-full">
              Move In/Out Cleaning Services
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-2 text-center font-medium w-full">
              Make your transition smooth and stress-free with our comprehensive move in/out cleaning. We ensure every surface is immaculately prepared for new occupants or to help you secure your deposit. Appliances, cabinets, baseboards, and all those easily overlooked areas—cleaned to perfection.
            </p>
          </div>
          {/* Modern glassmorphism form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full bg-white/70 backdrop-blur-md rounded-2xl p-4 md:p-8 shadow-2xl border border-white/60">
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="relative flex-1 w-full">
                <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required className="peer w-full rounded-lg border border-slate-200 px-4 py-2 pl-10 focus:ring-2 focus:ring-primary focus:border-primary transition bg-white/80 placeholder-gray-400" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Users className="h-4 w-4" />
                </span>
              </div>
              <div className="relative flex-1 w-full">
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="peer w-full rounded-lg border border-slate-200 px-4 py-2 pl-10 focus:ring-2 focus:ring-primary focus:border-primary transition bg-white/80 placeholder-gray-400" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <MailIcon className="h-4 w-4" />
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <input name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange} required className="peer w-full rounded-lg border border-slate-200 px-4 py-2 pl-10 focus:ring-2 focus:ring-primary focus:border-primary transition bg-white/80 placeholder-gray-400" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <PhoneIcon className="h-4 w-4" />
              </span>
            </div>
            {/* Cleaning type is fixed to Move In/Out for this page */}
            <select name="cleaning" value={form.cleaning} onChange={handleChange} required className="rounded-lg border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-700 bg-white/80 w-full" disabled>
              <option value="move-in-out">Move In/Out Cleaning</option>
            </select>
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <select name="bedrooms" value={form.bedrooms} onChange={handleChange} required className="flex-1 rounded-lg border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-700 bg-white/80 w-full">
                <option value="">No. of bedrooms</option>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <select name="bathrooms" value={form.bathrooms} onChange={handleChange} required className="flex-1 rounded-lg border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-700 bg-white/80 w-full">
                <option value="">No. of bathrooms</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <Button type="submit" size="lg" className="mt-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200" disabled={submitting}>
              {submitting ? "Sending..." : "Get My Price"}
              <span className="ml-2"><MoveRight className="w-5 h-5" /></span>
            </Button>
          </form>
          {/* Feature badges row under the form */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3 md:gap-8 w-full">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center min-w-[110px]">
                <div className="mb-1">{f.icon}</div>
                <span className="text-xs font-semibold text-gray-700 max-w-[110px] leading-tight">{f.label}</span>
              </div>
            ))}
          </div>
          {/* Social proof/testimonial row */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-300" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-medium mt-1">Trusted for stress-free moves by 100+ clients</span>
          </div>
        </div>
        {/* Soft gradient fade at the bottom for blending */}
        <div className="absolute left-0 right-0 bottom-0 h-24 md:h-32 z-20 pointer-events-none" style={{background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #f8fafc 90%)"}} />
      </section>

      {/* Cleaning checklist section */}
      <CleaningChecklist />
      {/* CTA banner section */}
      <CTA />
      {/* Why Invest in Professional Move In/Out Cleaning? Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/90 backdrop-blur-sm text-emerald-800 shadow-md mb-4 justify-center">
              <MoveRight className="h-5 w-5 mr-2 text-emerald-500" />
              <span className="text-base font-medium">Why Invest?</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-purple-600 bg-clip-text text-transparent">
              Why Invest in Professional Move In/Out Cleaning?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-emerald-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-emerald-800 mb-3">Smooth Transitions</h4>
              <p className="text-emerald-900/80">We handle the deep cleaning so you can focus on moving in or out, stress-free.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-emerald-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-emerald-800 mb-3">Healthier Start</h4>
              <p className="text-emerald-900/80">We remove dust, allergens, and germs, ensuring a fresh, healthy start in your new home or for the next occupants.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-emerald-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-emerald-800 mb-3">Maximize Value</h4>
              <p className="text-emerald-900/80">A professionally cleaned home shows better, rents faster, and helps you secure deposits or higher rates.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-emerald-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-emerald-800 mb-3">Focus on Moving</h4>
              <p className="text-emerald-900/80">Let us handle the cleaning so you can focus on your move, not the mess.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-emerald-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <CalendarCheck2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-emerald-800 mb-3">Flexible Scheduling</h4>
              <p className="text-emerald-900/80">We work around your move dates and property showings to keep your home clean and ready.</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Why Invest section */}
      {/* Testimonials section */}
      <TestimonialsMarquee />
      <div className="my-12 h-6 w-full bg-gradient-to-r from-emerald-200 via-teal-100 to-purple-100 rounded-full opacity-80" />
      <div className="mt-16">
        <GetInTouch />
      </div>
    </main>
  );
} 