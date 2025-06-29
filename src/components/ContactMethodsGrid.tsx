"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles
} from "lucide-react";

export function ContactMethodsGrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50/70 to-white/70 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 border-2 border-purple-400 rotate-45" />
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-400 rounded-full" />
        <div className="absolute bottom-32 left-20 w-20 h-20 border-2 border-pink-400" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md mb-4"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Multiple Ways to Connect
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Reach Out to Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the method that works best for you. We're always ready to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group hover:border-purple-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-3">Speak directly with our team</p>
            <a href="tel:+1234567890" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              (123) 456-7890
            </a>
          </motion.div>

          {/* Email */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group hover:border-purple-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-3">Send us a detailed message</p>
            <a href="mailto:contact@dustdrifters.com" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
              contact@dustdrifters.com
            </a>
          </motion.div>

          {/* Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group hover:border-purple-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-3">Our office location</p>
            <p className="text-green-600 font-medium">
              123 Cleaning Street<br />
              City, State 12345
            </p>
          </motion.div>

          {/* Hours */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 group hover:border-purple-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-600 mb-3">We're here when you need us</p>
            <p className="text-orange-600 font-medium text-sm">
              Mon-Fri: 8AM-7PM<br />
              Weekends: 9AM-5PM
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 