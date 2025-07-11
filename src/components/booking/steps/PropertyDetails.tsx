import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Home, Bath, Bed, Square, ShieldCheck, Smile, HeartHandshake, PhoneCall, CreditCard, Leaf, Users, Calendar, MapPin, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { gsap } from 'gsap';
import { useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

interface PropertyDetailsProps {
  squareFootage: string;
  bedrooms: number;
  bathrooms: number;
  halfBaths: number;
  basement: string;
  hours: number;
  numCleaners: number;
  selectedService: string;
  onSquareFootageChange: (value: string) => void;
  onBedroomsChange: (value: number) => void;
  onBathroomsChange: (value: number) => void;
  onHalfBathsChange: (value: number) => void;
  onBasementChange: (value: string) => void;
  onHoursChange: (value: number) => void;
  onNumCleanersChange: (value: number) => void;
  // Office-specific fields
  officeSize: string;
  numWashrooms: number;
  hasKitchen: boolean;
  kitchenType: string;
  flooringTypes: string[];
  onOfficeSizeChange: (value: string) => void;
  onNumWashroomsChange: (value: number) => void;
  onHasKitchenChange: (value: boolean) => void;
  onKitchenTypeChange: (value: string) => void;
  onFlooringTypesChange: (value: string[]) => void;
}

interface CounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  icon: React.ElementType;
  description?: string;
}

const Counter: React.FC<CounterProps> = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 20, 
  icon: Icon,
  description 
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{label}</h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => value > min && onChange(value - 1)}
            disabled={value <= min}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </motion.button>
          
          <span className="w-8 text-center font-semibold text-lg">
            {value}
          </span>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => value < max && onChange(value + 1)}
            disabled={value >= max}
            className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

const squareFootageOptions = [
  { value: "500-999", label: "500 - 999 sq ft" },
  { value: "1000-1499", label: "1,000 - 1,499 sq ft" },
  { value: "1500-1999", label: "1,500 - 1,999 sq ft" },
  { value: "2000-2999", label: "2,000 - 2,999 sq ft" },
  { value: "3000-3999", label: "3,000 - 3,999 sq ft" },
  { value: "4000-4999", label: "4,000 - 4,999 sq ft" },
  { value: "5000-5999", label: "5,000 - 5,999 sq ft" },
  { value: "6000-6999", label: "6,000 - 6,999 sq ft" },
  { value: "7000-7999", label: "7,000 - 7,999 sq ft" },
  { value: "8000-8999", label: "8,000 - 8,999 sq ft" },
  { value: "9000-9999", label: "9,000 - 9,999 sq ft" },
];

const basementShortLabels: Record<string, string> = {
  none: 'No Basement',
  '500-no-bathroom': '500 sqft, no bath',
  '500-1000-no-bathroom': '500-1000 sqft, no bath',
  '1000+-no-bathroom': '1000+ sqft, no bath',
  '500-with-bathroom': '500 sqft, bath',
  '500-1000-with-bathroom': '500-1000 sqft, bath',
  '1000+-with-bathroom': '1000+ sqft, bath',
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  squareFootage,
  bedrooms,
  bathrooms,
  halfBaths,
  basement,
  hours,
  numCleaners,
  selectedService,
  onSquareFootageChange,
  onBedroomsChange,
  onBathroomsChange,
  onHalfBathsChange,
  onBasementChange,
  onHoursChange,
  onNumCleanersChange,
  // Office-specific fields
  officeSize,
  numWashrooms,
  hasKitchen,
  kitchenType,
  flooringTypes,
  onOfficeSizeChange,
  onNumWashroomsChange,
  onHasKitchenChange,
  onKitchenTypeChange,
  onFlooringTypesChange,
}) => {
  // GSAP refs for office form animation
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (selectedService === 'office') {
      const tl = gsap.timeline();
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        );
      }
      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
          '-=0.4'
        );
      }
      if (fieldRefs.current.length) {
        tl.fromTo(
          fieldRefs.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
          '-=0.3'
        );
      }
    }
  }, [selectedService]);

  return (
    <div className="relative w-full px-2 sm:px-4 lg:px-8 p-6">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />
      <div className="text-center mb-8">
        {selectedService !== 'office' && (
          <>
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-700 via-pink-600 to-emerald-500 bg-clip-text text-transparent animate-gradient-x"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Tell Us About Your Property
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              Help us provide an accurate estimate
            </motion.p>
          </>
        )}
      </div>
      <div className="space-y-6">
        {selectedService === 'office' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left: Heading, Trust/Benefit Cards */}
              <div className="flex flex-col h-full justify-between lg:col-span-5">
                <div>
                  <motion.h1
                    ref={headingRef}
                    className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-700 via-pink-600 to-emerald-500 bg-clip-text text-transparent animate-gradient-x"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    Request a Quote for Office/Business Cleaning
                  </motion.h1>
                  <motion.h3
                    ref={subheadingRef}
                    className="text-md text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  >
                    Our office/business cleaning services are tailored to your unique needs. Fill out the form and our team will contact you with a personalized quote—no obligation, no payment required. 
                    <br />
                    <p>We’ll review your requirements and get in touch to discuss your cleaning needs and provide a custom quote for your business.</p>
                  </motion.h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {/* Trust/Benefit Cards */}
                    {[
                      {
                        icon: <MapPin className="w-6 h-6 text-purple-600 mb-1" />, heading: 'Locally Owned & Operated', desc: 'Proudly Toronto-based, founded by a local entrepreneur. We care about our community and our clients.'
                      },
                      {
                        icon: <ShieldCheck className="w-6 h-6 text-green-600 mb-1" />, heading: '100% Satisfaction Guarantee', desc: 'If you’re not completely satisfied, we’ll come back and make it right—no extra charge.'
                      },
                      {
                        icon: <Smile className="w-6 h-6 text-yellow-500 mb-1" />, heading: 'Custom Cleaning Plans', desc: 'We tailor our cleaning services to fit your business’s unique needs, schedule, and budget.'
                      },
                      {
                        icon: <Users className="w-6 h-6 text-blue-500 mb-1" />, heading: 'Vetted & Insured Professionals', desc: 'Our team is background-checked, insured, and trained for your peace of mind.'
                      },
                      {
                        icon: <Calendar className="w-6 h-6 text-pink-500 mb-1" />, heading: 'Flexible, Hassle-Free Booking', desc: 'Easy online booking, flexible scheduling, and no upfront payment required.'
                      },
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/90 rounded-lg shadow p-4 flex flex-col items-center text-center border border-gray-100 hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                      >
                        {card.icon}
                        <div className="font-semibold text-base mb-1 text-gray-800">{card.heading}</div>
                        <div className="text-gray-600 text-xs leading-snug">{card.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right: Quote Form */}
              <div className="w-full max-w-none lg:col-span-7">
                <form className="w-full space-y-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-gray-100">
                    {/* Section: Business Info */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">Business Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-semibold mb-1">Business Name</label>
                          <input type="text" className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md" />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Contact Name</label>
                          <input type="text" className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md" />
                        </div>
                      </div>
                    </div>
                    {/* Section: Contact Info */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">Contact Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-semibold mb-1">Email</label>
                          <input type="email" className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md" />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Phone</label>
                          <input type="tel" className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md" />
                        </div>
                      </div>
                    </div>
                    {/* Section: Location & Details */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">Location & Details</h3>
                      <div className="mb-4">
                        <label className="block font-semibold mb-1">Address</label>
                        <input type="text" className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-semibold mb-1">Approximate Office Size (optional)</label>
                          <input type="text" className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md" placeholder="e.g. 3,000 sq ft" />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Preferred Cleaning Frequency (optional)</label>
                          <select className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md">
                            <option value="">Select frequency</option>
                            <option value="one-time">One-time</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Biweekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block font-semibold mb-1">Special Requirements / Notes</label>
                        <textarea className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 bg-white/80 hover:shadow-md min-h-[80px]" />
                      </div>
                    </div>
                    <div className="pt-6 flex justify-center">
                      <button type="submit" className="w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300">
                        Request Quote
                      </button>
                    </div>
                  </form>
              </div>
            </div>
            {/* CTA Card - compact, landscape, below both columns */}
            <div className="mt-10">
              <div className="relative bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 rounded-xl shadow-xl p-6 flex flex-col items-center text-center border-2 border-blue-200 hover:scale-[1.02] hover:shadow-blue-400/40 transition-all duration-300 group w-full min-h-[160px] justify-center max-w-2xl mx-auto">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg p-2 border-2 border-blue-300 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-7 h-7 text-blue-600 animate-bounce" />
                </div>
                <h4 className="text-white text-2xl font-extrabold mb-1 mt-6 drop-shadow">Need a Fast Response?</h4>
                <p className="text-white/90 mb-4 text-base font-medium max-w-xl mx-auto">Call, email, or request a callback for immediate assistance.</p>
                <div className="w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center text-left">
                  {/* Left: Call & Email Buttons with Icons */}
                  <div className="flex flex-col gap-6 items-start md:-pr-2 ml-20">
                    <a href="tel:5551234567" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-700 font-bold text-base shadow hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                      <PhoneCall className="w-8 h-8 text-blue-600" />
                      Call Now
                    </a>
                    <a href="mailto:info@cleaningco.com" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-700 font-bold text-base shadow hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                      <Mail className="w-8 h-8 text-blue-600" />
                      Email Us
                    </a>
                  </div>
                  {/* Right: Callback Request Form */}
                  <form className="w-full max-w-xs mx-auto bg-white/90 rounded-lg shadow p-3 flex flex-col gap-2 border border-blue-100 group-hover:border-blue-300 transition-all md:pl-2 mr-20">
                    <label htmlFor="callback-phone" className="text-blue-700 font-semibold text-sm text-left">Request a Callback</label>
                    <input id="callback-phone" type="tel" placeholder="Your phone number" className="border border-blue-200 rounded p-2 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 bg-white text-base" />
                    <button type="submit" className="mt-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-base shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">Request Callback</button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : selectedService === 'house-hourly' ? (
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">H</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Hours</h3>
                      <p className="text-xs text-gray-500">Minimum 3 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => onHoursChange(Math.max(3, hours - 1))} disabled={hours <= 3} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors">-</motion.button>
                    <span className="w-8 text-center font-semibold text-lg">{hours}</span>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => onHoursChange(hours + 1)} className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors">+</motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">C</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900"># of Cleaners</h3>
                      <p className="text-xs text-gray-500">1-4 cleaners</p>
                    </div>
                  </div>
                  <select value={numCleaners} onChange={e => onNumCleanersChange(Number(e.target.value))} className="w-20 p-2 rounded border border-gray-200 bg-white font-semibold">
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Square Footage Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Square className="w-5 h-5 text-purple-600" />
                    <span>Property Size</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={squareFootage} onValueChange={onSquareFootageChange}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select your property size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white" side="bottom" align="start" sideOffset={4}>
                      {squareFootageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="font-medium">{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </motion.div>

            {/* Room Counters */}
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Counter
                  label="Bedrooms"
                  value={bedrooms}
                  onChange={onBedroomsChange}
                  min={0}
                  max={10}
                  icon={Bed}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Counter
                  label="Full Bathrooms"
                  value={bathrooms}
                  onChange={onBathroomsChange}
                  min={0}
                  max={10}
                  icon={Bath}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Counter
                  label="Half Bathrooms"
                  value={halfBaths}
                  onChange={onHalfBathsChange}
                  min={0}
                  max={5}
                  icon={Bath}
                />
              </motion.div>

              {/* Basement Option as Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Basement</h3>
                      </div>
                    </div>
                    <Select value={basement} onValueChange={onBasementChange}>
                      <SelectTrigger className="w-48 bg-white">
                        <SelectValue placeholder="No Basement">
                          {basement && basementShortLabels[basement]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white" side="bottom" align="start" sideOffset={4}>
                        <SelectItem value="none">No Basement</SelectItem>
                        <SelectItem value="500-no-bathroom">Basement (500 sqft, no bathroom) +$30</SelectItem>
                        <SelectItem value="500-1000-no-bathroom">Basement (500-1000 sqft, no bathroom) +$40</SelectItem>
                        <SelectItem value="1000+-no-bathroom">Basement (1000+ sqft, no bathroom) +$50</SelectItem>
                        <SelectItem value="500-with-bathroom">Basement (500 sqft, with bathroom) +$70</SelectItem>
                        <SelectItem value="500-1000-with-bathroom">Basement (500-1000 sqft, with bathroom) +$80</SelectItem>
                        <SelectItem value="1000+-with-bathroom">Basement (1000+ sqft, with bathroom) +$90</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Property Size Visual Indicator */}
            {squareFootage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-purple-50 border border-purple-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Square className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900">Property Size Selected</p>
                    <p className="text-purple-700">
                      {squareFootageOptions.find(opt => opt.value === squareFootage)?.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}; 

const orbConfigs = [
  { size: 180, color: 'rgba(168,85,247,0.18)', top: '10%', left: '8%', duration: 13, delay: 0 },
  { size: 140, color: 'rgba(236,72,153,0.13)', top: '60%', left: '18%', duration: 11, delay: 0.7 },
  { size: 220, color: 'rgba(59,130,246,0.13)', top: '30%', left: '70%', duration: 15, delay: 1.2 },
  { size: 120, color: 'rgba(16,185,129,0.10)', top: '75%', left: '80%', duration: 10, delay: 1.7 },
  { size: 200, color: 'rgba(251,191,36,0.10)', top: '15%', left: '60%', duration: 14, delay: 0.4 },
  { size: 100, color: 'rgba(236,72,153,0.10)', top: '50%', left: '50%', duration: 12, delay: 1.1 },
  { size: 160, color: 'rgba(59,130,246,0.10)', top: '80%', left: '30%', duration: 16, delay: 0.9 },
];

function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none">
      {orbConfigs.map((orb, i) => {
        // Parallax transforms
        const x = useTransform(mouseX, v => `calc(${orb.left} + ${(v - 0.5) * orb.size * 0.5}px)`);
        const y = useTransform(mouseY, v => `calc(${orb.top} + ${(v - 0.5) * orb.size * 0.5}px)`);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl opacity-40"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              top: orb.top,
              left: orb.left,
              x,
              y,
            }}
            animate={{
              y: [0, 30 + i * 10, 0],
              x: [0, -20 + i * 8, 0],
              scale: [1, 1.08, 1],
              rotate: [0, 360],
              opacity: [0.35, 0.5, 0.35],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        );
      })}
    </div>
  );
} 