"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, Box, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroGeometric } from "./ui/shape-landing-hero";

const checklist = [
  {
    title: "Kitchen",
    image: "/images/complete-cleaning-checklist/kitchen.jpg",
    standard: [
      "Wipe countertops and surfaces",
      "Clean sink and faucet",
      "Wipe exterior of appliances (fridge, oven, microwave, dishwasher)",
      "Clean stove top",
      "Wipe cabinet exteriors",
      "Sweep and mop floor",
      "Empty trash and replace liner",
    ],
    deep: [
      "Clean inside oven",
    "Clean inside microwave",
      "Clean inside and behind fridge",
      "Clean inside and behind stove",
      "Clean inside cabinets and drawers",
      "Clean backsplash and grout",
      "Clean range hood and filters",
      "Clean baseboards and doors",
    ],
    move: [
      "Clean inside all appliances (fridge, oven, dishwasher, microwave)",
      "Clean inside all cabinets and drawers",
      "Clean and sanitize trash/recycling bins",
      "Clean light fixtures and switches",
      "Wash walls and remove marks",
    ],
  },
  {
    title: "Bedrooms",
    image: "/images/complete-cleaning-checklist/bedroom.jpg",
    standard: [
      "Dust all surfaces (furniture, shelves, decor)",
      "Wipe mirrors",
      "Vacuum/sweep and mop floors",
      "Empty trash",
      "Make beds (if linens provided)",
      "Dust baseboards",
    ],
    deep: [
      "Clean under bed and furniture",
      "Clean window sills and tracks",
      "Wash windows (interior only)",
      "Clean closet shelves and doors",
      "Wipe walls and remove marks",
      "Clean ceiling fan and light fixtures",
    ],
    move: [
      "Clean inside closets and drawers",
      "Wash all windows (interior only)",
      "Clean doors, handles, and switches",
      "Clean baseboards and trim thoroughly",
    ],
  },
  {
    title: "Bathroom",
    image: "/images/complete-cleaning-checklist/bathroom.jpg",
    standard: [
      "Clean and disinfect sink, countertop, and faucet",
      "Clean and disinfect toilet (inside and out)",
      "Clean and disinfect shower/tub",
      "Wipe mirrors",
      "Clean exterior of cabinets",
      "Sweep and mop floor",
      "Empty trash",
    ],
    deep: [
      "Clean grout and tile thoroughly",
      "Clean inside cabinets and drawers",
      "Clean exhaust fan/vent",
      "Wash shower curtain/doors",
      "Clean baseboards and doors",
      "Remove hard water stains",
    ],
    move: [
      "Clean inside all cabinets and drawers",
      "Clean and sanitize all fixtures",
      "Wash walls and remove marks",
      "Clean light fixtures and switches",
    ],
  },
  {
    title: "Living Areas",
    image: "/images/complete-cleaning-checklist/living.jpg",
    standard: [
      "Dust all surfaces (furniture, shelves, decor)",
      "Wipe electronics and remotes",
      "Vacuum/sweep and mop floors",
      "Fluff and arrange cushions",
      "Empty trash",
      "Dust baseboards",
    ],
    deep: [
      "Clean under and behind furniture",
      "Wash windows (interior only)",
      "Clean window sills and tracks",
      "Clean ceiling fans and light fixtures",
      "Wipe walls and remove marks",
      "Clean baseboards and doors",
    ],
    move: [
      "Clean inside closets and storage spaces",
      "Wash all windows (interior only)",
      "Clean doors, handles, and switches",
      "Clean baseboards and trim thoroughly",
    ],
  },
];

const extras = [
  "Clean inside oven (if not already included)",
  "Clean inside fridge/freezer (if not already included)",
  "Clean inside dishwasher",
  "Clean inside washing machine/dryer",
  "Clean blinds/shutters",
  "Clean fireplace (interior only)",
  "Clean inside windows (interior side only)",
  "Carpet or upholstery shampooing",
  "Organizing services",
  "Pet hair removal (extensive)",
  "Wall washing (beyond spot cleaning)",
  "Basement/attic cleaning (if accessible and interior)",
];

function SectionCard({ title, standard, deep, move, expanded, onClick, idx, image }) {
  let alt = title + ' photo';
  return (
    <div
      className={
        `relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 h-full ` +
        (expanded
          ? "ring-2 ring-purple-400 border border-purple-200 z-10"
          : "hover:ring-1 hover:ring-purple-200 hover:scale-[1.03] hover:shadow-xl hover:py-8 hover:px-8 cursor-pointer")
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
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/600x400/E0E0E0/B0B0B0?text=${title.replace(/\s/g,'+')}`;
            target.srcset = "";
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center px-6 pt-4 pb-2 flex-shrink-0">
        <h3 className="text-2xl font-bold text-purple-900 drop-shadow-sm mb-1 text-center">{title}</h3>
        <div className="text-sm text-gray-500 flex gap-4 mb-2 justify-center">
          <span>Standard: {standard.length}</span>
          <span className="flex items-center text-blue-700"><Sparkles className="h-4 w-4 mr-1" /> Deep: {deep.length}</span>
          <span className="flex items-center text-green-700"><Box className="h-4 w-4 mr-1" /> Move: {move.length}</span>
        </div>
        <button
          className={
            `flex items-center justify-center mt-1 mb-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 bg-white transition-colors duration-300` +
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
            <ChevronDown className="h-7 w-7 text-purple-600" />
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
            <h4 className="font-semibold mb-2 text-purple-800">Standard Cleaning</h4>
            <ul className="space-y-2">
              {standard.map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-purple-100 pt-6">
            <h4 className="font-semibold flex items-center mb-2 text-blue-700">
              <Sparkles className="h-4 w-4 mr-1" /> Deep Cleaning Extras
            </h4>
            <ul className="space-y-2">
              {deep.map((item, i) => (
                <li key={i} className="flex items-start text-blue-700">
                  <Sparkles className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-green-100 pt-6">
            <h4 className="font-semibold flex items-center mb-2 text-green-700">
              <Box className="h-4 w-4 mr-1" /> Move In/Out Extras
            </h4>
            <ul className="space-y-2">
              {move.map((item, i) => (
                <li key={i} className="flex items-start text-green-700">
                  <Box className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 rounded-b-3xl" />
      )}
    </div>
  );
}

export function CleaningChecklist() {
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
    <section className="pt-16 md:pt-24 pb-4 md:pb-6 relative">
      {/* Background with HeroGeometric */}
      <HeroGeometric 
        className="absolute inset-0 z-0 h-full"
        hideContent={true}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Cleaning Scope
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 drop-shadow-sm"
          >
            What's Included In Our Cleaning
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl"
          >
            <p className="text-xl text-gray-700 leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
              Our <span className="font-semibold text-purple-700">comprehensive cleaning service</span> covers all the essential areas of your home or office
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8 mb-16 lg:items-start">
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
            <div className="bg-yellow-50/90 backdrop-blur-sm border-l-4 border-yellow-400 p-8 rounded-xl text-center shadow-xl h-full">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center text-yellow-700">
                <Sparkles className="h-6 w-6 mr-2 text-yellow-600" /> Extras (Add-ons Only)
              </h3>
              <p className="mb-4 text-yellow-800">
                These are available as add-ons only and are <span className="font-semibold">not included</span> in Standard, Deep, or Move In/Out cleaning packages.
              </p>
              <ul className="space-y-2 text-yellow-800 text-left inline-block">
                {extras.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom gradient rule with shimmer effect */}
      <div className="relative mt-8">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" 
          animate={{ 
            x: ["100%", "-100%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
} 