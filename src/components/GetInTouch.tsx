"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Add animation styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes pulse-subtle {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      .animate-pulse-subtle {
        animation: pulse-subtle 3s infinite ease-in-out;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 6s infinite ease-in-out;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative pt-4 pb-4 md:pt-6 md:pb-6 overflow-hidden bg-white">
      {/* Beams background as a background layer, covering the whole section, solid white */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <BackgroundBeamsWithCollision className="h-full min-h-full bg-white" >
          {/* Empty children to satisfy required prop */}
        </BackgroundBeamsWithCollision>
      </div>
      {/* Main content in front of beams */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md mt-4"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Contact Us
            </span>
          </motion.div>
        </div>
        <div className="text-center mt-2 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 inline-block text-transparent bg-clip-text">
            Get in Touch
          </h2>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-1 max-w-2xl"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm">
              Have questions about our <span className="font-semibold text-purple-700">cleaning services</span>? We're here to help you create a cleaner, healthier space!
            </p>
          </motion.div>
        </div>
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-slate-200 transition-all duration-200 hover:shadow-[0_8px_32px_0_rgba(60,72,180,0.10)]"
            >
              <h3 className="text-xl font-semibold mb-6 relative text-gray-900">
                <span className="relative z-10">Contact Information</span>
              </h3>
              <div className="space-y-5">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mr-4">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-500">Phone</p>
                    <a href="tel:+1234567890" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mr-4">
                    <Mail className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-500">Email</p>
                    <a href="mailto:contact@example.com" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                      contact@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-500">Address</p>
                    <p className="text-lg font-medium text-gray-900">
                      123 Cleaning Street<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-slate-200 transition-all duration-200 hover:shadow-[0_8px_32px_0_rgba(60,72,180,0.10)]"
            >
              <h3 className="text-xl font-semibold mb-6 relative text-gray-900">
                <span className="relative z-10">Business Hours</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-900">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-900">9:00 AM - 4:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3 bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-slate-200 transition-all duration-200 hover:shadow-[0_8px_32px_0_rgba(60,72,180,0.10)]"
          >
            <h3 className="text-xl font-semibold mb-6 relative text-center text-gray-900">
              <span className="relative z-10">Send us a Message</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white border-slate-200 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border-slate-200 text-gray-900"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-900">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white border-slate-200 text-gray-900"
                  pattern="(\+\d{1,3}[-.\s]?)?(\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}"
                  title="Please enter a valid phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={7}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="relative bg-[#4b48ff] text-white font-bold text-[19px] max-w-xl w-full py-[0.35em] pl-6 h-[3em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] hover:bg-[#3a37e0] group transition-colors duration-300 mt-8"
              >
                <span className="mx-auto pr-8">Send Message</span>
                <div
                  className="absolute right-[0.3em] bg-white h-[2.4em] w-[2.4em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] group-active:scale-95"
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
              </button>
              <p className="text-sm text-center text-gray-500 mt-4">
                We'll get back to you within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
