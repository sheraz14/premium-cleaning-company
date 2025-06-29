"use client";

/// <reference path="../types/google-maps.d.ts" />

// Add Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: {
              types?: string[];
              componentRestrictions?: { country: string };
              fields?: string[];
            }
          ) => google.maps.places.Autocomplete;
          AutocompleteService: any;
          PlacesService: any;
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
            OVER_QUERY_LIMIT: string;
            REQUEST_DENIED: string;
            INVALID_REQUEST: string;
            UNKNOWN_ERROR: string;
          };
        };
        event: {
          clearInstanceListeners: (instance: any) => void;
        };
        MapsEventListener: { remove: () => void };
      };
    };
    fs: {
      readFile: (filepath: string, options?: { encoding?: string }) => Promise<any>;
    };
  }
}

// Add Google Maps type imports
type GoogleMapsEventListener = google.maps.MapsEventListener;

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea"; 
import { Calendar } from "./ui/calendar";
import { ScrollArea } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, CheckCircle, Clock, Home, Building2, Briefcase, CalendarDays, ArrowRight, Sparkles, User, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Script from "next/script";
import { Waves } from "@/components/ui/waves";

// Simple date formatter function to replace date-fns
function formatDate(date: Date): string {
  // Format like "January 1, 2023"
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
}

type ServiceType = "residential" | "commercial" | "move-in-out" | "recurring";

interface ServiceOption {
  value: ServiceType;
  label: string;
  icon: React.ElementType;
  description: string;
  startingPrice: string;
}

const serviceOptions: ServiceOption[] = [
  {
    value: "residential",
    label: "Residential Cleaning",
    icon: Home,
    description: "Deep cleaning for homes of all sizes",
    startingPrice: "From $100"
  },
  {
    value: "commercial",
    label: "Commercial Cleaning",
    icon: Building2,
    description: "Professional cleaning for business spaces",
    startingPrice: "From $149"
  },
  {
    value: "move-in-out",
    label: "Move In/Out Cleaning",
    icon: Briefcase,
    description: "Thorough cleaning when moving properties",
    startingPrice: "From $199"
  },
  {
    value: "recurring",
    label: "Recurring Cleaning",
    icon: CalendarDays,
    description: "Regular scheduled cleaning services",
    startingPrice: "From $79"
  }
];

interface TimeSlot {
  time: string;
  available: boolean;
}

// Updated timeSlots with availability
const timeSlots: TimeSlot[] = [
  { time: "08:00", available: true },
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: true },
  { time: "12:00", available: true },
  { time: "13:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
  { time: "18:00", available: true },
  { time: "19:00", available: true },
];

export function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("residential");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      if (!date) {
        throw new Error("Please select a date");
      }
      if (!time) {
        throw new Error("Please select a time slot");
      }
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          service_type: serviceType,
          booking_date: date.toISOString(),
          time,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }
      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setServiceType("residential");
      setDate(undefined);
      setTime(null);
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = serviceOptions.find(option => option.value === serviceType);

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-slate-50 to-white mb-[-5rem]">
      {/* Load Google Maps Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
        strategy="afterInteractive"
      />

      {/* Interactive Waves Background */}
      <div className="absolute inset-0">
        <Waves
          lineColor="rgba(147, 51, 234, 0.1)" // purple-600 with opacity
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
              className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="text-base font-medium">
                Book Your Service
              </span>
            </motion.div>
          </div>
          <div className="text-center mt-2 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 inline-block text-transparent bg-clip-text">
              Schedule Your Cleaning
            </h1>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-1 max-w-2xl"
            >
              <p className="text-xl text-gray-700 leading-relaxed bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                Book your <span className="font-semibold text-purple-700">professional cleaning</span> service in minutes. We're here to make your space sparkle!
              </p>
            </motion.div>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-200">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Booking Confirmed!</h3>
                  <p className="text-center text-slate-600 mb-6">
                    Thank you for choosing our cleaning services. We'll contact you shortly to confirm your appointment.
                  </p>
                  <Button 
                    onClick={() => setIsSuccess(false)} 
                    className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all duration-300"
                  >
                    Book Another Service
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-200/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                
                {/* Service selection */}
                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-extrabold relative inline-block">
                      <span className="relative z-10 text-slate-800">Choose Your Service</span>
                      <span className="absolute -bottom-1 left-0 right-0 h-4 bg-purple-300 opacity-40 transform -rotate-1"></span>
                      <span className="absolute -bottom-1 left-0 right-0 h-4 bg-pink-300 opacity-30 transform rotate-1"></span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {serviceOptions.map((option, index) => {
                      return (
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          type="button"
                          key={option.value}
                          onClick={() => setServiceType(option.value)}
                          className={cn(
                            "relative group flex flex-col items-center justify-between p-6 rounded-2xl border transition-all duration-300",
                            serviceType === option.value 
                              ? "border-purple-400/50 bg-purple-50/50 shadow-lg scale-[1.02]" 
                              : "border-slate-200 hover:border-purple-300/50 hover:bg-purple-50/30"
                          )}
                        >
                          <div className={cn(
                            "flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-colors duration-300",
                            serviceType === option.value 
                              ? "bg-purple-500 text-white" 
                              : "bg-slate-100 text-slate-600 group-hover:bg-purple-500 group-hover:text-white"
                          )}>
                            <option.icon className="h-7 w-7" />
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold mb-2">{option.label}</h4>
                            <p className="text-sm text-slate-600 mb-3">{option.description}</p>
                            <span className="text-sm font-medium text-purple-600">{option.startingPrice}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Booking form */}
                <form onSubmit={handleSubmit} className="mt-8 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-6 text-slate-800">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                            className="pl-12 h-14 rounded-xl bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            className="pl-12 h-14 rounded-xl bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone number"
                            required
                            className="pl-12 h-14 rounded-xl bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>
                        
                        {/* Address Input with Autocomplete */}
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            required
                            className="pl-12 h-14 rounded-xl bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-6 text-slate-800">Schedule Your Service</h3>
                      <div className="rounded-lg border border-slate-200">
                        <div className="flex max-sm:flex-col">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              if (newDate) {
                                setDate(newDate);
                                setTime(null);
                              }
                            }}
                            className="p-2 sm:pe-5 bg-white rounded-l-lg"
                            disabled={[{ before: new Date() }]}
                            modifiers={{
                              selected: date,
                            }}
                            modifiersStyles={{
                              selected: {
                                backgroundColor: "rgb(147, 51, 234)", // purple-600
                                color: "white",
                                borderRadius: "0.5rem",
                              }
                            }}
                            styles={{
                              day_today: {
                                fontWeight: "bold",
                                border: "1px solid rgb(147, 51, 234)",
                                borderRadius: "0.5rem",
                              },
                              day_selected: {
                                backgroundColor: "rgb(147, 51, 234) !important",
                                color: "white !important",
                                borderRadius: "0.5rem !important",
                                fontWeight: "bold",
                              }
                            }}
                            fromDate={new Date()}
                            showOutsideDays={false}
                          />
                          <div className="relative w-full max-sm:h-48 sm:w-40">
                            <div className="absolute inset-0 py-4 max-sm:border-t border-slate-200">
                              <ScrollArea className="h-full sm:border-s border-slate-200">
                                <div className="space-y-3">
                                  <div className="flex h-5 shrink-0 items-center px-5">
                                    <p className="text-sm font-medium">
                                      {date ? format(date, "EEEE, d") : "Select a date"}
                                    </p>
                                  </div>
                                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                                    {timeSlots.map((slot) => (
                                      <Button
                                        key={slot.time}
                                        variant={time === slot.time ? "default" : "outline"}
                                        size="sm"
                                        className={cn(
                                          "w-full",
                                          time === slot.time 
                                            ? "bg-purple-500 hover:bg-purple-600 text-white" 
                                            : "hover:border-purple-400/50 hover:bg-purple-50/50"
                                        )}
                                        onClick={() => setTime(slot.time)}
                                        disabled={!slot.available}
                                      >
                                        {slot.time}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </ScrollArea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional notes - Full width section */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">Additional Notes</h3>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Additional notes or special requests (optional)"
                      className="min-h-[120px] rounded-xl bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 w-full"
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 flex justify-center"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting || !date || !time}
                      className="relative bg-[#4b48ff] text-white font-bold text-[19px] max-w-xl w-[500px] py-[0.35em] pl-6 h-[3em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] hover:bg-[#3a37e0] group disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center w-full justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <span className="mx-auto pr-8">Book Now</span>
                          <div
                            className="absolute right-[0.3em] bg-white h-[2.4em] w-[2.4em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] group-disabled:pointer-events-none group-active:scale-95"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="w-[1.3em] transition-transform duration-300 text-[#7b52b9] group-hover:translate-x-[0.1em]"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path
                                fill="currentColor"
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              ></path>
                            </svg>
                          </div>
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Section bottom gradient rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/250 to-transparent" />

    </section>
  );
}