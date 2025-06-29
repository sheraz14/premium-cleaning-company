"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Send, 
  ArrowRight, 
  ArrowUp,
  Sparkles,
  Clock,
  Shield,
  Award
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const socialLinks = [
  { icon: Facebook, href: "#", name: "Facebook", color: "hover:text-blue-400" },
  { icon: Twitter, href: "#", name: "Twitter", color: "hover:text-sky-400" },
  { icon: Instagram, href: "#", name: "Instagram", color: "hover:text-pink-400" },
  { icon: Linkedin, href: "#", name: "LinkedIn", color: "hover:text-blue-500" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about-us", label: "About Us" },
  { href: "/cleaning-blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
];

const serviceLinks = [
  { href: "/services", label: "All Services" },
  { href: "/house-cleaning-services", label: "Residential Cleaning" },
  { href: "/commercial-cleaning-services", label: "Commercial Cleaning" },
  { href: "/move-in-out-cleaning-services", label: "Move In/Out Cleaning" },
  { href: "/deep-cleaning-services", label: "Deep Cleaning" },
  { href: "/eco-friendly-cleaning-services", label: "Eco-Friendly Cleaning" },
];

const trustFeatures = [
  { icon: Shield, text: "100% Insured & Bonded" },
  { icon: Award, text: "5-Star Rated Service" },
  { icon: Clock, text: "24/7 Customer Support" },
];

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Top Section */}
        <div className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Company Info */}
            <div className="text-center lg:text-left">
              <Link href="/" className="relative z-0 inline-block -mt-32 lg:-mt-52 -mb-10 lg:-mb-36 group">
                <Image 
                  src="/images/logo/logo2.svg" 
                  alt="Dust Drifters Logo" 
                  width={400} 
                  height={20}
                  className="object-contain group-hover:scale-105 transition-transform duration-300 w-80 sm:w-96 md:w-[450px] lg:w-[500px] xl:w-[500px] h-26"
                />
              </Link>
              <p className="relative z-10 text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0 -mt-8 lg:-mt-30">
                Transforming spaces into sparkling sanctuaries. Your trusted partner for professional cleaning services.
              </p>
              
              {/* Trust Features - Mobile Optimized */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {trustFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center lg:justify-start space-x-3 text-sm text-gray-400 p-3 sm:p-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-center lg:text-left">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links - Mobile Optimized */}
              <div className="relative z-10 flex justify-center lg:justify-start space-x-3 sm:space-x-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    aria-label={social.name}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/10 ${social.color} hover:border-white/20 backdrop-blur-sm`}
                  >
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Section - Mobile Optimized */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 text-center sm:text-left">
                <Sparkles className="w-6 h-6 text-purple-400 mx-auto sm:mx-0 sm:mr-3 mb-2 sm:mb-0" />
                <h3 className="text-xl sm:text-2xl font-bold">Stay Updated</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-center sm:text-left text-sm sm:text-base">
                Get exclusive cleaning tips, seasonal offers, and company updates delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 sm:h-14 pr-14 sm:pr-16 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-sm sm:text-base"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-1 top-1 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 active:scale-95"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 text-center sm:text-left">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Links Section - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto sm:mx-0"></div>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center justify-center sm:justify-start text-gray-400 hover:text-white transition-all duration-300 group py-1 sm:py-0 touch-manipulation"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 hidden sm:block"/>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Services
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto sm:mx-0"></div>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center justify-center sm:justify-start text-gray-400 hover:text-white transition-all duration-300 group py-1 sm:py-0 touch-manipulation"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 hidden sm:block"/>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contact Info
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto sm:mx-0"></div>
            </div>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-2 sm:mb-0 sm:mr-3 sm:mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  123 Cleaning St, Suite 456<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-2 sm:mb-0 sm:mr-3 flex-shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-manipulation py-2 sm:py-0"
                >
                  (123) 456-7890
                </a>
              </li>
              <li className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-2 sm:mb-0 sm:mr-3 flex-shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <a 
                  href="mailto:info@dustdrifters.com" 
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-manipulation py-2 sm:py-0 break-all sm:break-normal"
                >
                  info@dustdrifters.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Business Hours
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto sm:mx-0"></div>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="flex justify-between max-w-xs mx-auto sm:mx-0">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white">8:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between max-w-xs mx-auto sm:mx-0">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white">8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between max-w-xs mx-auto sm:mx-0">
                <span className="text-gray-400">Sunday</span>
                <span className="text-white">9:00 AM - 4:00 PM</span>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Section - Mobile Optimized */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left order-2 md:order-1">
              &copy; {new Date().getFullYear()} Dust Drifters. All Rights Reserved. | Made with ❤️ for cleaner spaces.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm order-1 md:order-2">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors touch-manipulation py-2 sm:py-0">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors touch-manipulation py-2 sm:py-0">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors touch-manipulation py-2 sm:py-0">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button - Mobile Optimized */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 active:scale-95 z-50 backdrop-blur-sm touch-manipulation"
          aria-label="Go to top"
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      )}
    </footer>
  );
} 