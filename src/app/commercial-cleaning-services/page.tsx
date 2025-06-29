"use client";
import { Building, Users, CalendarCheck2, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { MailIcon, PhoneIcon } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Script from "next/script";
import { CheckCircle2, Sparkles, Box, ChevronDown, Briefcase, Coffee, DoorOpen, ClipboardList } from "lucide-react";
import officeImg from "/public/images/commercial.jpg";
import kitchenImg from "/public/images/complete-cleaning-checklist/kitchen.jpg";
import bathroomImg from "/public/images/complete-cleaning-checklist/bathroom.jpg";
import livingImg from "/public/images/complete-cleaning-checklist/living.jpg";
import { motion } from "framer-motion";
import { Waves } from "@/components/ui/waves";
import { CTA } from "@/components/CTA";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { GetInTouch } from "@/components/GetInTouch";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function CommercialCleaningPage() {
  const features = [
    { icon: <Building className="h-5 w-5 text-blue-500" />, label: "Office & Facility Experts" },
    { icon: <Users className="h-5 w-5 text-blue-500" />, label: "Vetted & Trusted Staff" },
    { icon: <CalendarCheck2 className="h-5 w-5 text-purple-500" />, label: "Flexible Scheduling" },
    { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, label: "Satisfaction Guarantee" },
  ];

  const [address, setAddress] = useState("");

  return (
    <main className="min-h-screen">
      {/* Hero/Header Section */}
      <section className="relative w-full h-auto min-h-[600px] flex overflow-hidden pt-12 md:pt-20 pb-0 md:py-0">
        {/* Background image for commercial cleaning */}
        <div className="absolute inset-0 w-full h-full -z-10 bg-blue-100 hidden md:block">
          <Image
            src="/images/commercial.jpg"
            alt="Commercial Cleaning Service"
            fill
            className="object-contain object-right w-full h-full max-h-[900px]"
            style={{ objectFit: 'contain', objectPosition: 'right center' }}
            priority
          />
        </div>
        {/* Left-to-right gradient fade overlay */}
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
          style={{
            background: "linear-gradient(to right, #f8fafc 0%, #e0e7ff 20%, #f0f6ff 45%, rgba(224,231,255,0.10) 60%, transparent 80%)"
          }}
        />
        {/* Content (left) */}
        <div className="w-full max-w-full md:max-w-xl flex flex-col items-center md:items-start w-full px-2 md:px-4 py-8 md:py-12 z-10 -mt-20 md:-mt-30">
          <div className="mb-6 flex flex-col items-center md:items-start w-full">
            <span className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm md:text-base mb-2">
              <Building className="h-5 w-5 text-blue-500" />
              Commercial Cleaning
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent mb-2 text-left drop-shadow-lg w-full">
              Professional Commercial Cleaning Services
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-2 text-left font-medium w-full">
              Create a productive and healthy workplace with our expert commercial cleaning for offices, clinics, and facilities. We work around your schedule to minimize disruption, ensuring every space is spotless, sanitized, and ready for business.
            </p>
          </div>
          {/* Feature badges row under the header */}
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
            <span className="text-sm text-muted-foreground font-medium mt-1">Trusted by 100+ happy business clients</span>
          </div>
        </div>
        {/* Soft gradient fade at the bottom for blending */}
        <div className="absolute left-0 right-0 bottom-0 h-24 md:h-32 z-20 pointer-events-none" style={{background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #f8fafc 90%)"}} />
      </section>
      {/* Commercial Cleaning Request Form */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-slate-50 to-white mb-[-5rem]">
        {/* Interactive Waves Background */}
        <div className="absolute inset-0">
          <Waves
            lineColor="rgba(37, 99, 235, 0.08)" // blue-600 with opacity
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        <div className="container mx-auto px-4 py-12 pb-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/90 backdrop-blur-sm text-blue-800 shadow-md"
              >
                <Building className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-base font-medium">
                  Book Your Service
                </span>
              </motion.div>
            </div>
            <div className="text-center mt-2 mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-sky-600 inline-block text-transparent bg-clip-text">
                Schedule Your Commercial Cleaning
              </h1>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mx-auto mt-1 max-w-2xl"
              >
                <p className="text-xl text-blue-900/90 leading-relaxed bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  Book your <span className="font-semibold text-blue-700">commercial cleaning</span> in minutes. Our team will get back to you with a custom quote for your business or facility.
                </p>
              </motion.div>
            </div>
            {/* The actual commercial quote form (do not change) */}
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-14 shadow-2xl border border-blue-100/60 mx-auto">
              <form className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <input type="text" name="contactName" placeholder="Contact Name" required className="peer w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white/80 placeholder-gray-400" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <Users className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input type="text" name="businessName" placeholder="Business/Company Name" required className="peer w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white/80 placeholder-gray-400" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <Building className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <input type="email" name="email" placeholder="Email" required className="peer w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white/80 placeholder-gray-400" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <MailIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input type="tel" name="phone" placeholder="Phone" required className="peer w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white/80 placeholder-gray-400" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                      <PhoneIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                {/* Address with Google Autocomplete */}
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    placeholder="Business Address"
                    required
                    className="peer w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white/80 placeholder-gray-400"
                    autoComplete="off"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                    <CalendarCheck2 className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <select name="spaceType" required className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700 bg-white/80">
                      <option value="">Type of Commercial Space</option>
                      <option value="office">Office</option>
                      <option value="retail">Retail</option>
                      <option value="medical">Medical/Clinic</option>
                      <option value="school">School/Education</option>
                      <option value="industrial">Industrial/Warehouse</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <select name="squareFootage" required className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700 bg-white/80">
                      <option value="">Approx. Square Footage</option>
                      <option value="<1000">Under 1,000 sq ft</option>
                      <option value="1000-2500">1,000 - 2,500 sq ft</option>
                      <option value="2500-5000">2,500 - 5,000 sq ft</option>
                      <option value="5000-10000">5,000 - 10,000 sq ft</option>
                      <option value=">10000">10,000+ sq ft</option>
                    </select>
                  </div>
                </div>
                {/* Frequency of Service */}
                <div className="flex-1">
                  <select name="frequency" required className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700 bg-white/80">
                    <option value="">Frequency of Service</option>
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <textarea name="notes" placeholder="Additional notes or special requests (optional)" className="w-full min-h-[100px] rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white/80 placeholder-gray-400 resize-none" />
                <button type="submit" className="mt-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 rounded-lg py-3 flex items-center justify-center text-lg">
                  Request Quote
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Section bottom gradient rule */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </section>
      {/* Divider for visual separation */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl h-2 bg-gradient-to-r from-transparent via-blue-200 to-transparent rounded-full opacity-80 my-16" />
      </div>
      {/* Highlighted checklist heading box */}
      <div className="mb-12 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/90 backdrop-blur-sm text-blue-800 shadow-md mb-4"
          >
            <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
            <span className="text-base font-medium">
              Cleaning Checklist
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent drop-shadow-lg mb-3 tracking-tight">
            Commercial Cleaning Checklist
          </h2>
          <div className="bg-white/80 backdrop-blur-md border border-blue-100 shadow-xl rounded-2xl px-8 py-6 max-w-3xl w-full flex flex-col items-center">
            <p className="text-lg md:text-xl text-blue-900/80 text-center max-w-2xl mx-auto font-medium">
              A detailed scope of what we clean in your business or facility
            </p>
          </div>
        </div>
      </div>
      <CommercialChecklistSection />
      <CTA />
      {/* Commercial Cleaning Info Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/90 backdrop-blur-sm text-blue-800 shadow-md mb-4 justify-center"
            >
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              <span className="text-base font-medium">
                Why Invest?
              </span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent">
              Why Invest in Professional Commercial Cleaning?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-blue-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Boost Productivity</h4>
              <p className="text-blue-900/80">A clean workspace reduces distractions and creates an environment where your team can focus and perform at their best.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-blue-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Healthier Environment</h4>
              <p className="text-blue-900/80">Our sanitization protocols reduce illness-causing germs, leading to fewer sick days and a healthier workplace for everyone.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-blue-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Impressive First Impressions</h4>
              <p className="text-blue-900/80">A spotless facility creates positive impressions for clients, customers, and potential business partners.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-blue-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Coffee className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Focus on Your Business</h4>
              <p className="text-blue-900/80">Let our professionals handle the cleaning while you concentrate on what matters most—running your business successfully.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-blue-50/60 transition-all duration-300 hover:shadow-md">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <DoorOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Flexible Scheduling</h4>
              <p className="text-blue-900/80">We work around your business hours to minimize disruption, ensuring your facility is always ready when you need it.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsMarquee />
      <div className="my-12 h-6 w-full bg-gradient-to-r from-blue-200 via-indigo-100 to-sky-100 rounded-full opacity-80" />
      
      {/* Get in Touch Section */}
      <div className="mt-16">
        <GetInTouch />
      </div>
    </main>
  );
}

function CommercialChecklistSection() {
  const checklist = [
    {
      title: "Offices & Workstations",
      image: officeImg,
      standard: [
        "Dust desks, tables, and work surfaces",
        "Wipe phones, keyboards, and electronics",
        "Empty trash and recycling bins",
        "Vacuum/sweep and mop floors",
        "Clean glass partitions and doors",
        "Disinfect high-touch points (handles, switches)",
        "Sanitizing shared equipment",
        "Specialty disinfection (COVID, flu, etc.)",
      ],
    },
    {
      title: "Restrooms",
      image: bathroomImg,
      standard: [
        "Clean and disinfect toilets, urinals, sinks",
        "Wipe mirrors and fixtures",
        "Refill soap, paper towels, and toilet paper",
        "Empty trash bins",
        "Sweep and mop floors",
        "Disinfect stall doors and handles",
      ],
    },
    {
      title: "Break Room / Kitchenette",
      image: kitchenImg,
      standard: [
        "Wipe countertops and tables",
        "Clean sink and faucet",
        "Wipe exterior of appliances (microwave, fridge, coffee maker)",
        "Empty trash and recycling",
        "Sweep and mop floors",
        "Disinfect handles and switches",
        "Restocking supplies (by request)",
      ],
    },
    {
      title: "Reception & Common Areas",
      image: livingImg,
      standard: [
        "Dust all surfaces and furniture",
        "Vacuum/sweep and mop floors",
        "Clean glass doors and windows",
        "Empty trash bins",
        "Disinfect high-touch points",
        "High dusting (vents, lights, ceiling fans)",
        "Trash removal to dumpster",
      ],
    },
    {
      title: "Meeting Rooms",
      image: officeImg,
      standard: [
        "Wipe tables and chairs",
        "Clean whiteboards/screens",
        "Vacuum/sweep and mop floors",
        "Disinfect door handles and switches",
        "Empty trash bins",
      ],
    },
  ];

  const extras = [
    "Additional Areas & Extras",
    "Basement Area",
    "Extra Kitchen",
    "Inside cabinets",
    "Inside fridge",
    "Inside oven",
    "Windows and tracks",
    "Load Dishwasher",
    "Change Bed Sheets",
    "Fold Laundry",
  ];

  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const toggleCardExpansion = (index: number) => {
    setExpandedIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  return (
    <div className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background with HeroGeometric */}
      <HeroGeometric className="absolute inset-0 z-0 h-full" hideContent={true} />
      <div className="relative z-10 flex flex-col lg:flex-row lg:gap-8 mb-16 lg:items-start">
        {/* Checklist section (takes 2/3 width on large screens) */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {checklist.map((section, idx) => (
              <SectionCard
                key={section.title}
                {...section}
                expanded={expandedIndices.includes(idx)}
                onClick={() => toggleCardExpansion(idx)}
                idx={idx}
              />
            ))}
          </div>
        </div>
        {/* Extras section (takes 1/3 width on large screens, appears on the right) */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-blue-50/90 backdrop-blur-sm border-l-4 border-blue-400 p-8 rounded-xl text-center shadow-xl h-full">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center text-blue-700">
              <Sparkles className="h-6 w-6 mr-2 text-blue-600" /> Extras (Add-ons Only)
            </h3>
            <ul className="space-y-2 text-blue-800 text-left inline-block">
              {extras.map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, standard, expanded, onClick, idx, image }) {
  let alt = title + ' photo';
  return (
    <div
      className={
        `relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 h-full ` +
        (expanded
          ? "ring-2 ring-blue-400 border border-blue-200 z-10"
          : "hover:ring-1 hover:ring-blue-200 hover:scale-[1.03] hover:shadow-xl hover:py-8 hover:px-8 cursor-pointer")
      }
      tabIndex={0}
      aria-expanded={expanded}
      aria-controls={`section-content-${idx}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      style={{ minHeight: expanded ? undefined : 260 }}
    >
      <div className="relative w-full h-[120px] flex-shrink-0">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover w-full h-full rounded-t-3xl"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center px-6 pt-4 pb-2 flex-shrink-0">
        <h3 className="text-2xl font-bold text-blue-900 drop-shadow-sm mb-1 text-center">{title}</h3>
        <div className="text-sm text-gray-500 flex gap-4 mb-2 justify-center">
          <span>Standard: {standard.length}</span>
        </div>
        <button
          className={
            `flex items-center justify-center mt-1 mb-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 bg-white transition-colors duration-300` +
            (expanded ? " shadow-md" : "")
          }
          onClick={onClick}
          aria-expanded={expanded}
          aria-controls={`section-content-${idx}`}
          tabIndex={-1}
        >
          <span className={
            `transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`
          }>
            <ChevronDown className="h-7 w-7 text-blue-600" />
          </span>
        </button>
      </div>
      <div
        id={`section-content-${idx}`}
        className={
          "transition-all duration-300 overflow-hidden " +
          (expanded
            ? "max-h-[1200px] opacity-100 py-8 px-7 bg-white border-t border-slate-200 shadow-xl"
            : "max-h-0 opacity-0 py-0 px-7")
        }
        style={{ willChange: "max-height, opacity, padding" }}
        aria-hidden={!expanded}
      >
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="font-semibold mb-2 text-blue-800">Standard Cleaning</h4>
            <ul className="space-y-2">
              {standard.map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-b-3xl" />
      )}
    </div>
  );
}