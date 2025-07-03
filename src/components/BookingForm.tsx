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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

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

interface AddOn {
  id: string;
  label: string;
  price: number;
}

const addOns: AddOn[] = [
  { id: "inside-fridge", label: "Inside Fridge", price: 25 },
  { id: "inside-oven", label: "Inside Oven", price: 25 },
  { id: "inside-cabinets", label: "Inside Cabinets", price: 40 },
  { id: "laundry", label: "Laundry (per load)", price: 20 },
  { id: "deep-cleaning", label: "Deep Cleaning", price: 60 },
  { id: "window-cleaning", label: "Interior Windows", price: 35 },
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
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
      setError(
        err instanceof Error
          ? err.message
          : "There was an error submitting your booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = serviceOptions.find(
    (option) => option.value === serviceType
  );

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  useEffect(() => {
    const basePrice = selectedService
      ? parseFloat(selectedService.startingPrice.replace("From $", ""))
      : 0;
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    setTotalPrice(basePrice + addOnsPrice);
  }, [serviceType, selectedAddOns, selectedService]);

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
                Choose your desired service and we'll handle the rest.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        1. Choose Your Service
                      </h2>
                      <Select
                        value={serviceType}
                        onValueChange={(value) =>
                          setServiceType(value as ServiceType)
                        }
                      >
                        <SelectTrigger className="w-full text-lg py-6 bg-white/50">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-white backdrop-blur-lg shadow-xl border-white/30">
                          {serviceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-3 py-2">
                                <option.icon className="w-5 h-5 text-purple-600" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                {/* Add-ons */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    2. Add Extras
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg"
                      >
                        <Checkbox
                          id={addOn.id}
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                        />
                        <label
                          htmlFor={addOn.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow"
                        >
                          {addOn.label}
                        </label>
                        <span className="text-sm font-semibold text-purple-600">
                          +${addOn.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    3. Your Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                        type="text"
                        placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                            required
                          />
                        </div>
                        <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="email"
                        placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                            required
                          />
                        </div>
                        <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="tel"
                        placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                            required
                          />
                        </div>
                        <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                        type="text"
                        placeholder="Full Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        className="pl-10"
                            required
                          />
                        </div>
                      </div>
                </motion.div>
                {/* Date and Time */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    4. Schedule Your Cleaning
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            formatDate(date)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white/80 backdrop-blur-lg">
                          <Calendar
                            mode="single"
                            selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <ScrollArea className="h-40 rounded-md border border-gray-200">
                      <div className="p-4 space-y-2">
                                    {timeSlots.map((slot) => (
                                      <Button
                                        key={slot.time}
                            variant={
                              time === slot.time ? "default" : "outline"
                            }
                            className="w-full justify-start"
                                        onClick={() => setTime(slot.time)}
                                        disabled={!slot.available}
                                      >
                            <Clock className="mr-2 h-4 w-4" />
                                        {slot.time}
                                      </Button>
                                    ))}
                                </div>
                              </ScrollArea>
                            </div>
                </motion.div>
                {/* Special Instructions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    5. Special Instructions (Optional)
                  </h2>
                  <Textarea
                    placeholder="e.g., focus on the kitchen, key under the mat..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </motion.div>
              </form>
                          </div>
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/30 sticky top-24"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">
                      Booking Summary
                    </h3>
                    {selectedService ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <selectedService.icon className="w-6 h-6 text-purple-700" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg text-gray-800">
                              {selectedService.label}
                            </p>
                          </div>
                        </div>
                        <div className="border-t pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Base Price</span>
                            <span className="font-medium">
                              $
                              {parseFloat(
                                selectedService.startingPrice.replace("From $", "")
                              ).toFixed(2)}
                            </span>
                          </div>
                          {selectedAddOns.map((addOnId) => {
                            const addOn = addOns.find((a) => a.id === addOnId);
                            return (
                              <div
                                key={addOnId}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-600">
                                  {addOn?.label}
                                </span>
                                <span className="font-medium">
                                  +${addOn?.price.toFixed(2)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-3xl font-bold text-purple-700">
                            ${totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Select a service to see the summary.
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 transition-transform"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="mr-2 h-4 w-4" />
                      )}
                      Book Now
                    </Button>
                    {isSuccess && (
                      <p className="text-green-600 mt-4 flex items-center">
                        <CheckCircle className="mr-2" /> Booking submitted!
                      </p>
                    )}
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                  </motion.div>
                </div>
              </div>
        </div>
      </div>
      {/* Section bottom gradient rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/250 to-transparent" />

    </section>
  );
}