'use client';
import { CTA } from "@/components/CTA";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { GetInTouch } from "@/components/GetInTouch";
import { MoveRight, ShieldCheck, Leaf, Users, CalendarCheck2, Star, Mail as MailIcon, Phone as PhoneIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { CleaningChecklist } from "@/components/CleaningChecklist";

export default function DeepCleaningPage() {
  // Form state for the hero section (mirroring house cleaning style)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cleaning: "deep",
    bedrooms: "",
    bathrooms: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200); // Simulate async
  };
  const features = [
    { icon: <Leaf className="h-5 w-5 text-green-500" />, label: "Eco-Friendly Products" },
    { icon: <Users className="h-5 w-5 text-blue-500" />, label: "Vetted & Trusted Staff" },
    { icon: <CalendarCheck2 className="h-5 w-5 text-purple-500" />, label: "Flexible Scheduling" },
    { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, label: "Satisfaction Guarantee" },
  ];
  return (
    <main className="min-h-screen">
      {/* Hero/Header Section */}
      <section className="relative w-full h-auto min-h-[600px] flex overflow-hidden pt-12 md:pt-20 pb-0 md:py-0">
        <div className="absolute inset-0 w-full h-full -z-10 bg-orange-100 hidden md:block">
          <img
            src="/images/deep-cleaning.jpg"
            alt="Deep Cleaning Service"
            className="object-contain object-right w-full h-full max-h-[900px]"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center' }}
          />
        </div>
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
          style={{
            background: "linear-gradient(to right, #fff7ed 20%, #fff3e0 37%, rgba(255,247,237,0.05) 50%, transparent 70%)"
          }}
        />
        <div className="w-full max-w-full md:max-w-xl flex flex-col items-center w-full px-2 md:px-4 py-8 md:py-12 z-10 -mt-20 md:-mt-30">
          <div className="mb-6 flex flex-col items-center w-full">
            <span className="inline-flex items-center gap-2 text-orange-700 font-semibold text-sm md:text-base mb-2">
              <ShieldCheck className="h-5 w-5 text-orange-500" />
              100% Satisfaction Guarantee
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-600 bg-clip-text text-transparent mb-2 text-center drop-shadow-lg w-full">
              Get Your Deep Cleaning Quote
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-2 text-center font-medium w-full">
              Book a deep clean and restore your space to pristine condition with <span className="font-bold bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-600 bg-clip-text text-transparent">Dust Drifters</span>!
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
            {/* Cleaning type is fixed to Deep Cleaning for this page */}
            <select name="cleaning" value={form.cleaning} onChange={handleChange} required className="rounded-lg border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-700 bg-white/80 w-full" disabled>
              <option value="deep">Deep Cleaning</option>
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
            <button type="submit" className="mt-2 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 rounded-lg py-2 flex items-center justify-center" disabled={submitting}>
              {submitting ? "Sending..." : "Get My Price"}
              <MoveRight className="w-5 h-5 ml-2" />
            </button>
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
            <span className="text-sm text-muted-foreground font-medium mt-1">Trusted by 100+ happy clients</span>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-24 md:h-32 z-20 pointer-events-none" style={{background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff7ed 90%)"}} />
      </section>

      {/* Cleaning Checklist Section */}
      <section>
        <CleaningChecklist />
      </section>

      {/* CTA Banner Section */}
      <section>
        <CTA />
        {/* Why Invest in Professional Deep Cleaning? Section */}
        <section className="w-full py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100/90 backdrop-blur-sm text-orange-800 shadow-md mb-4 justify-center">
                <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
                <span className="text-base font-medium">Why Invest?</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-600 bg-clip-text text-transparent">
                Why Invest in Professional Deep Cleaning?
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-orange-50/60 transition-all duration-300 hover:shadow-md">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Restore & Refresh</h4>
                <p className="text-orange-900/80">Deep cleaning tackles built-up grime and hidden dirt, making your home feel like new again.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-orange-50/60 transition-all duration-300 hover:shadow-md">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Healthier Home</h4>
                <p className="text-orange-900/80">We remove allergens, dust, and bacteria from hard-to-reach places, improving your indoor air quality.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-orange-50/60 transition-all duration-300 hover:shadow-md">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Impress Guests</h4>
                <p className="text-orange-900/80">A deeply cleaned home is welcoming for guests and gives you peace of mind every day.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-orange-50/60 transition-all duration-300 hover:shadow-md">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Focus on Living</h4>
                <p className="text-orange-900/80">Let us handle the deep cleaning so you can enjoy your home and your time.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-orange-50/60 transition-all duration-300 hover:shadow-md">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <CalendarCheck2 className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Flexible Scheduling</h4>
                <p className="text-orange-900/80">We work around your schedule to provide deep cleaning when it's most convenient for you.</p>
              </div>
            </div>
          </div>
        </section>
        {/* End Why Invest section */}
      </section>

      {/* Testimonials Section */}
      <TestimonialsMarquee />
      <div className="my-12 h-6 w-full bg-gradient-to-r from-emerald-200 via-teal-100 to-purple-100 rounded-full opacity-80" />
      <div className="mt-16">
        <GetInTouch />
      </div>
    </main>
  );
} 