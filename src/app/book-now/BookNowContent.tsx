'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Shield, Star, Award, Sparkles, Home, Users, Building, Settings, MessageSquare } from 'lucide-react';
import BookingExtras from "./BookingExtras";
import { BookingForm } from "../../components/BookingForm";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PriceSummary } from '@/components/PriceSummary';
import { Guarantees } from '@/components/Guarantees';

// Updated service options - only 3 main types as requested
const serviceOptions = [
  {
    id: 'house-package',
    name: 'House Cleaning Package',
    basePrice: 80,
    description: 'Complete house cleaning service with standard features',
    features: ['Dusting & vacuuming', 'Kitchen & bathroom cleaning', 'Floor mopping', 'Trash removal', 'Basic organizing']
  },
  {
    id: 'house-hourly',
    name: 'House Cleaning by the Hour',
    basePrice: 35,
    description: 'Flexible hourly cleaning service',
    features: ['Choose specific tasks', 'Flexible duration', 'Perfect for maintenance', 'Customizable service']
  },
  {
    id: 'office',
    name: 'Office/Business Cleaning',
    basePrice: 300,
    description: 'Professional commercial office cleaning ($0.25-$0.45/sqft)',
    features: ['Desk & workspace cleaning', 'Common areas & lobbies', 'Restrooms sanitization', 'Kitchen facilities', 'Meeting rooms', 'Trash removal', 'Floor care (vacuuming/mopping)']
  }
];

const sqftOptions = [
  { value: 750, label: '500-999 Sqft' },
  { value: 1250, label: '1000-1499 Sqft' },
  { value: 1750, label: '1500-1999 Sqft' },
  { value: 2250, label: '2000-2499 Sqft' },
  { value: 2750, label: '2500-2999 Sqft' },
  { value: 3250, label: '3000-3499 Sqft' },
  { value: 3750, label: '3500-3999 Sqft' },
  { value: 4250, label: '4000-4499 Sqft' },
  { value: 4750, label: '4500-4999 Sqft' },
  { value: 5500, label: '5000-5999 Sqft' },
  { value: 6500, label: '6000-6999 Sqft' },
  { value: 7500, label: '7000-7999 Sqft' },
  { value: 8500, label: '8000-8999 Sqft' },
  { value: 9500, label: '9000-10000 Sqft' }
];

// Property details options
const bedroomOptions = [
  { value: 0, label: 'Studio' },
  { value: 1, label: '1 Bedroom' },
  { value: 2, label: '2 Bedrooms' },
  { value: 3, label: '3 Bedrooms' },
  { value: 4, label: '4 Bedrooms' },
  { value: 5, label: '5+ Bedrooms' }
];

const bathroomOptions = [
  { value: 1, label: '1 Bathroom' },
  { value: 2, label: '2 Bathrooms' },
  { value: 3, label: '3 Bathrooms' },
  { value: 4, label: '4+ Bathrooms' }
];

const halfBathOptions = [
  { value: 0, label: 'No Half Baths' },
  { value: 1, label: '1 Half Bath' },
  { value: 2, label: '2 Half Baths' },
  { value: 3, label: '3+ Half Baths' }
];

const basementOptions = [
  { value: 'none', label: 'No Basement', sqft: 0 },
  { value: 'small', label: 'Small Basement (< 500 sqft)', sqft: 400 },
  { value: 'medium', label: 'Medium Basement (500-1000 sqft)', sqft: 750 },
  { value: 'large', label: 'Large Basement (1000+ sqft)', sqft: 1200 }
];

const frequencies = [
  { id: 'one-time', name: 'One-time', discount: 0 },
  { id: 'weekly', name: 'Weekly', discount: 0.15 },
  { id: 'biweekly', name: 'Bi-weekly', discount: 0.10 },
  { id: 'monthly', name: 'Monthly', discount: 0.05 }
];

const extras = [
  { id: 'oven', name: 'Clean inside oven', price: 35 },
  { id: 'fridge', name: 'Clean inside fridge/freezer', price: 30 },
  { id: 'dishwasher', name: 'Clean inside dishwasher', price: 25 },
  { id: 'laundry-machines', name: 'Clean inside washing machine/dryer', price: 40 },
  { id: 'blinds', name: 'Clean blinds/shutters', price: 35 },
  { id: 'fireplace', name: 'Clean fireplace (interior only)', price: 45 },
  { id: 'windows', name: 'Clean inside windows (interior side only)', price: 30 },
  { id: 'carpets', name: 'Carpet or upholstery shampooing', price: 75 },
  { id: 'organizing', name: 'Organizing services', price: 60 },
  { id: 'pets', name: 'Pet hair removal (extensive)', price: 35 },
  { id: 'walls', name: 'Wall washing (beyond spot cleaning)', price: 50 },
  { id: 'basement', name: 'Basement/attic cleaning (if accessible and interior)', price: 80 }
];

const cleaningAreas = [
  'Kitchen Deep Clean', 'Bathroom Deep Clean', 'Living Room Focus', 'Bedroom Refresh',
  'Office Space', 'Basement/Attic', 'Windows & Mirrors', 'Appliance Cleaning'
];

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

// Stepper component
const Stepper = ({ currentStep, steps }: { currentStep: number; steps: { id: number; label: string }[] }) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep >= step.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > step.id ? '✔' : step.id}
            </div>
            <p
              className={`mt-2 text-xs text-center transition-all duration-300 ${
                currentStep >= step.id ? 'text-purple-700 font-semibold' : 'text-gray-500'
              }`}
            >
              {step.label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-4 transition-all duration-500 ${
                currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function BookNowContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });
  
  // Form state
  const [selectedService, setSelectedService] = useState('house-package');
  const [propertyDetails, setPropertyDetails] = useState({
    sqft: '',
    bedrooms: '',
    bathrooms: '',
    halfBaths: '',
    basement: ''
  });
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState({
    areas: [] as string[],
    priorities: ''
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    specialInstructions: '',
    finalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState([
    { id: 1, label: 'Choose Your Service Type' },
    { id: 2, label: 'Property Details' },
    { id: 3, label: 'Review and Confirm' }
  ]);

  // Check if device is mobile and handle mouse movement
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    };
    if (isMobile && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
    return () => {
      if (isMobile && window.DeviceOrientationEvent) {
        window.removeEventListener(
          "deviceorientation",
          handleOrientation,
          true
        );
      }
    };
  }, [isMobile]);

  // Calculate pricing
  const calculatePrice = () => {
    console.log('SQFT:', propertyDetails.sqft, 'as number:', Number(propertyDetails.sqft));
    if (!selectedService) return { totalPrice: 0, discount: 0, extrasTotal: 0 };
    
    const service = serviceOptions.find(s => s.id === selectedService);
    const frequency = frequencies.find(f => f.id === selectedFrequency) || frequencies[0]; // Default to first frequency if none selected
    
    if (!service) return { totalPrice: 0, discount: 0, extrasTotal: 0 };
    
    let basePrice = service.basePrice; // Start with base price
    const sqft = Number(propertyDetails.sqft) || 0;
    
    // Calculate base price based on service type and realistic market rates
    if (selectedService === 'house-hourly') {
      // For hourly service, estimate hours based on property size, with a 3-hour minimum
      if (sqft > 0) {
        const estimatedHours = Math.max(3, Math.ceil(sqft / 300)); // 3-hour minimum
        basePrice = service.basePrice * estimatedHours;
      } else {
        // Default to 3 hours minimum when no sqft selected
        basePrice = service.basePrice * 3;
      }
    } else if (selectedService === 'house-package') {
      // For house cleaning package, use custom pricing tiers as requested
      let additionalCost = 0;
      
      if (sqft > 0) {
        if (sqft >= 500 && sqft <= 999) {
          additionalCost = 0; // Base price stays same for 500-999 sqft
        } else if (sqft >= 1000 && sqft <= 1499) {
          additionalCost = 20; // +$20 for 1000-1499
        } else if (sqft >= 1500 && sqft <= 1999) {
          additionalCost = 40; // +$40 for 1500-1999
        } else if (sqft >= 2000 && sqft <= 2499) {
          additionalCost = 60; // +$60 for 2000-2499
        } else if (sqft >= 2500 && sqft <= 2999) {
          additionalCost = 80; // +$80 for 2500-2999
        } else if (sqft >= 3000 && sqft <= 3499) {
          additionalCost = 100; // +$100 for 3000-3499
        } else if (sqft >= 3500 && sqft <= 3999) {
          additionalCost = 120; // +$120 for 3500-3999
        } else if (sqft >= 4000 && sqft <= 4499) {
          additionalCost = 140; // +$140 for 4000-4499
        } else if (sqft >= 4500 && sqft <= 4999) {
          additionalCost = 160; // +$160 for 4500-4999
        } else if (sqft >= 5000 && sqft <= 5999) {
          additionalCost = 200; // +$200 for 5000-5999 (only $40 more than previous)
        } else if (sqft >= 6000 && sqft <= 6999) {
          additionalCost = 280; // +$280 for 6000-6999 ($100 jump)
        } else if (sqft >= 7000 && sqft <= 7999) {
          additionalCost = 380; // +$380 for 7000-7999
        } else if (sqft >= 8000 && sqft <= 8999) {
          additionalCost = 480; // +$480 for 8000-8999
        } else if (sqft >= 9000 && sqft <= 9999) {
          additionalCost = 580; // +$580 for 9000-9999
        } else if (sqft >= 10000) {
          additionalCost = 680; // +$680 for 10000+
        }
      }
      
      basePrice = service.basePrice + additionalCost;
    } else if (selectedService === 'office') {
      // For office cleaning, use Ontario market rates per square foot
      if (sqft > 0) {
        // Ontario office cleaning rates: $0.12-$0.25 per sqft
        // Using tiered pricing based on office size
        let ratePerSqft = 0.15; // Base rate for medium offices
        
        if (sqft < 3000) {
          ratePerSqft = 0.20; // Higher rate for smaller offices (more overhead)
        } else if (sqft < 5000) {
          ratePerSqft = 0.17; // Medium rate for mid-size offices  
        } else if (sqft < 10000) {
          ratePerSqft = 0.15; // Standard rate for larger offices
        } else {
          ratePerSqft = 0.13; // Lower rate for very large offices (economies of scale)
        }
        
        basePrice = Math.round(sqft * ratePerSqft);
        
        // Minimum charge for very small offices
        basePrice = Math.max(basePrice, 150);
      } else {
        // Default pricing when no square footage selected
        basePrice = service.basePrice;
      }
    } else {
      // For other services, use flat multiplier
      if (sqft > 0) {
        const sizeMultiplier = Math.max(0.8, sqft / 1000);
        basePrice = service.basePrice * sizeMultiplier;
      }
    }
    
    // Add room-based pricing adjustments (only for residential services)
    if (selectedService !== 'office') {
      const bedrooms = parseInt(propertyDetails.bedrooms) || 0;
      const bathrooms = parseInt(propertyDetails.bathrooms) || 0;
      const halfBaths = parseInt(propertyDetails.halfBaths) || 0;
      
      basePrice += (bedrooms * 15); // $15 per bedroom
      basePrice += (bathrooms * 20); // $20 per bathroom  
      basePrice += (halfBaths * 10); // $10 per half bath
    }
    
    // Add basement cost if applicable (only for residential services)
    if (selectedService !== 'office' && propertyDetails.basement !== 'none' && propertyDetails.basement) {
      const basement = basementOptions.find(b => b.value === propertyDetails.basement);
      if (basement) {
        basePrice += (basement.sqft * 0.05); // $0.05 per sqft for basement
      }
    }
    
    let discount = basePrice * frequency.discount;
    let extrasTotal = selectedExtras.reduce((total, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);
    
    const totalPrice = Math.round(basePrice - discount + extrasTotal);
    return { totalPrice, discount, extrasTotal };
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleAreaToggle = (area: string) => {
    setCustomizations(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowThankYou(true);
  };

  const isFormValid = () => {
    return selectedService && propertyDetails.sqft && propertyDetails.bedrooms && 
           propertyDetails.bathrooms && selectedFrequency && 
           selectedDate && selectedTime && customerInfo.firstName && 
           customerInfo.lastName && customerInfo.email && customerInfo.phone &&
           customerInfo.address;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPropertyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleExtrasChange = (updatedExtras: any[], total: number) => {
    // This is a placeholder. You can implement the logic to handle extras changes.
    console.log("Extras changed:", updatedExtras, "Total:", total);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing our cleaning services. We'll contact you within 24 hours to confirm your appointment details.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Total: <span className="font-bold text-green-600">${calculatePrice().totalPrice.toFixed(2)}</span></p>
          </div>
          <button 
            onClick={() => setShowThankYou(false)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Book Another Service
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50/70 to-white/70 backdrop-blur-sm">
      {/* Interactive Background elements */}
      <div 
        className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-25 animate-pulse transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      ></div>
      <div 
        className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-25 animate-pulse transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${-mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 sm:opacity-25 animate-pulse transition-transform duration-1000 ease-out" 
        style={{ 
          animationDelay: '2s',
          transform: `translate(${mousePosition.x * 10}px, ${-mousePosition.y * 25}px)`
        }}
      ></div>
      <div 
        className="absolute top-1/3 -left-4 w-24 sm:w-36 h-24 sm:h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 sm:opacity-20 animate-pulse transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 10}px)`
        }}
      ></div>
      
      {/* Interactive floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-purple-500/15 transition-all duration-1000 ease-out"
            style={{
              width: `${(i % 3 + 1) * (isMobile ? 4 : 5) + 5}px`,
              height: `${(i % 3 + 1) * (isMobile ? 4 : 5) + 5}px`,
              top: `${(i * 3.33) % 100}%`,
              left: `${(i * 7.5) % 100}%`,
              animation: 'pulse 8s infinite ease-in-out',
              animationDelay: `${(i * 0.2) % 5}s`,
              opacity: 0.15 + (i % 5) * 0.1,
              transform: `translate(${mousePosition.x * (5 + i % 10)}px, ${mousePosition.y * (3 + i % 8)}px)`
            }}
          ></div>
        ))}
      </div>
      
      {/* Enhanced background cleaning pattern - more visible */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.12] transition-all duration-1000 ease-out" 
          style={{
            backgroundImage: 'url(/images/backgrounds/cleaning-icons-pattern.png)',
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            transform: `scale(1.05) translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            filter: 'contrast(1.2) brightness(0.8)'
          }}
        ></div>
      )}
      
      {/* Additional interactive elements for hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating cleaning icons */}
        {[...Array(isMobile ? 8 : 12)].map((_, i) => (
          <div
            key={`cleaning-${i}`}
            className="absolute text-purple-300/20 text-2xl sm:text-4xl transition-all duration-1000 ease-out"
            style={{
              top: `${(i * 8 + 10) % 80}%`,
              left: `${(i * 12 + 5) % 90}%`,
              transform: `translate(${mousePosition.x * (10 + i % 15)}px, ${mousePosition.y * (8 + i % 12)}px) rotate(${mousePosition.x * 10 + i * 30}deg)`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {['🧹', '🧽', '🧴', '✨', '🫧', '🪣'][i % 6]}
          </div>
        ))}
        
        {/* Interactive gradient orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              background: `radial-gradient(circle, ${
                ['rgba(168, 85, 247, 0.1)', 'rgba(236, 72, 153, 0.1)', 'rgba(59, 130, 246, 0.1)'][i % 3]
              }, transparent)`,
              top: `${(i * 15 + 20) % 70}%`,
              left: `${(i * 18 + 10) % 80}%`,
              transform: `translate(${mousePosition.x * (15 + i * 5)}px, ${mousePosition.y * (12 + i * 3)}px)`,
              filter: 'blur(1px)',
              animation: `pulse 4s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      {/* Interactive Header with enhanced backdrop */}
      <div className="relative z-10">
        <div className="relative bg-white/30 backdrop-blur-sm border-b border-slate-200/50 overflow-hidden">
          <motion.div
            className="pointer-events-none absolute -inset-px"
                style={{
              background: `radial-gradient(700px at ${mousePosition.x * 100}% ${
                mousePosition.y * 100
              }%, rgba(174, 26, 242, 0.13), transparent 70%)`,
                }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                {isMobile ? (
                  <motion.span
                    initial="initial"
                    animate="animate"
                    variants={{
                      animate: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                    aria-label="Book Your Cleaning Service"
                  >
                    {"Book Your Cleaning Service".split(" ").map(
                      (word, wordIndex) => (
                        <span key={wordIndex} className="inline-block mr-3">
                          {word.split("").map((char, charIndex) => (
                            <motion.span
                              key={`${char}-${charIndex}`}
                              className="inline-block"
                              variants={{
                                initial: { y: 20, opacity: 0 },
                                animate: {
                                  y: 0,
                                  opacity: 1,
                                  color: "#8B5CF6",
                                },
                              }}
                            >
                              {char}
                            </motion.span>
                          ))}
                </span>
                      )
                    )}
                  </motion.span>
                ) : (
                  <motion.span
                    initial="initial"
                    whileHover="hovered"
                    className="inline-block"
                    style={{ perspective: 800 }}
                    aria-label="Book Your Cleaning Service"
                  >
                    {"Book Your Cleaning Service".split(" ").map(
                      (word, wordIndex) => (
                        <span key={wordIndex} className="inline-block mr-3">
                          {word.split("").map((char, charIndex) => (
                            <motion.span
                              key={`${char}-${charIndex}`}
                              className="inline-block"
                              variants={{
                                initial: { rotateX: 0, color: "#111827" },
                                hovered: {
                                  rotateX: 360,
                                  color: "#8B5CF6",
                                  transition: {
                                    duration: 0.8,
                                    delay:
                                      wordIndex * 0.1 + charIndex * 0.03,
                                    ease: "easeInOut",
                                  },
                                },
                  }}
                >
                              {char}
                            </motion.span>
                          ))}
                </span>
                      )
                    )}
                  </motion.span>
                )}
              </h1>
              <motion.p
                className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% auto" }}
                animate={{
                  backgroundPosition: isMobile
                    ? `${((orientation.gamma + 90) / 180) * 100}% center`
                    : `${mousePosition.x * 100}% center`,
                }}
                transition={{
                  duration: 0.5,
                  ease: "linear",
                }}
              >
                Fast, easy, and secure online booking. Your sparkling clean home
                is just a few clicks away.
              </motion.p>
              </div>
            {/* Stepper component */}
            <Stepper currentStep={step} steps={steps} />
          </div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Service Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">1</span>
                    </div>
                    Choose Your Service Type
                  </h2>
                    <Select
                      value={selectedService}
                      onValueChange={(value) => setSelectedService(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                    {serviceOptions.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {`${service.name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </motion.div>

                {/* Property Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">2</span>
                    </div>
                    Property Details
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Square Footage *</label>
                      <select
                        value={propertyDetails.sqft}
                        onChange={(e) => setPropertyDetails({...propertyDetails, sqft: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select square footage</option>
                        {sqftOptions.map((option) => (
                          <option key={option.value} value={String(option.value)}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms *</label>
                      <select
                        value={propertyDetails.bedrooms}
                        onChange={(e) => setPropertyDetails({...propertyDetails, bedrooms: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select bedrooms</option>
                        {bedroomOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
                      <select
                        value={propertyDetails.bathrooms}
                        onChange={(e) => setPropertyDetails({...propertyDetails, bathrooms: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select bathrooms</option>
                        {bathroomOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Half Baths</label>
                      <select
                        value={propertyDetails.halfBaths}
                        onChange={(e) => setPropertyDetails({...propertyDetails, halfBaths: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select half baths</option>
                        {halfBathOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Basement</label>
                      <select
                        value={propertyDetails.basement}
                        onChange={(e) => setPropertyDetails({...propertyDetails, basement: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select basement option</option>
                        {basementOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>

                {/* Customize Your Cleaning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Settings className="w-4 h-4 text-purple-600" />
                    </div>
                    Customize Your Cleaning
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Focus Areas (Optional)</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {cleaningAreas.map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => handleAreaToggle(area)}
                            className={`p-2 text-xs rounded-lg border-2 transition-all ${
                              customizations.areas.includes(area)
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cleaning Priorities (Optional)</label>
                      <textarea
                        value={customizations.priorities}
                        onChange={(e) => setCustomizations({...customizations, priorities: e.target.value})}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tell us what areas need extra attention or your specific cleaning priorities..."
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Frequency */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">3</span>
                    </div>
                    Cleaning Frequency
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {frequencies.map((freq) => (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => setSelectedFrequency(freq.id)}
                        className={`p-4 text-sm rounded-lg border-2 transition-all flex justify-between items-center ${
                          selectedFrequency === freq.id
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium">{freq.name}</span>
                        {freq.discount > 0 && (
                          <span className="text-green-600 text-xs font-medium">
                            {Math.round(freq.discount * 100)}% off
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Add Extra Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">4</span>
                    </div>
                    Add Extra Services
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-3">
                    {extras.map((extra) => (
                      <div
                        key={extra.id}
                        onClick={() => handleExtraToggle(extra.id)}
                        className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                          selectedExtras.includes(extra.id)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">{extra.name}</span>
                          <span className="text-purple-600 font-bold text-sm">+${extra.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Date & Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">5</span>
                    </div>
                    Select Date & Time
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Preferred Time *
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>

                {/* Customer Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">6</span>
                    </div>
                    Your Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                      <input
                        type="text"
                        value={customerInfo.postalCode}
                        onChange={(e) => setCustomerInfo({...customerInfo, postalCode: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Special Instructions and Final Notes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                    </div>
                    Special Instructions & Final Notes
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                      <textarea
                        value={customerInfo.specialInstructions}
                        onChange={(e) => setCustomerInfo({...customerInfo, specialInstructions: e.target.value})}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Any special requests, allergies, or areas that need extra attention..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Final Notes</label>
                      <textarea
                        value={customerInfo.finalNotes}
                        onChange={(e) => setCustomerInfo({...customerInfo, finalNotes: e.target.value})}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Any additional information, access instructions, or final requests..."
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-center"
                >
                  <button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className={`px-8 py-4 rounded-xl font-semibold text-white transition-all transform ${
                      isFormValid() && !isSubmitting
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Book Service - $${calculatePrice().totalPrice.toFixed(2)}`
                    )}
                  </button>
                </motion.div>
              </form>
            </div>

            {/* Price Summary Sidebar */}
            <div className="lg:col-span-1">
              <PriceSummary 
                selectedService={serviceOptions.find(s => s.id === selectedService)}
                extrasTotal={calculatePrice().extrasTotal}
                frequencyDiscount={calculatePrice().discount}
                totalPrice={calculatePrice().totalPrice}
                propertyDetails={propertyDetails}
              />
              <Guarantees />
            </div>
          </div>
          )}
          {step === 2 && (
            <BookingExtras
              onExtrasChange={handleExtrasChange}
            />
          )}
          {step === 3 && <div>Review and Confirm</div>}
        </main>
      </div>
    </div>
  );
} 