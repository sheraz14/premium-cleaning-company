'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const serviceLinks = [
  { href: '/house-cleaning-services', label: 'House Cleaning', icon: '🏠' },
  { href: '/condo-and-apartment-cleaning-services', label: 'Condo & Apartment Cleaning', icon: '🏢' },
  { href: '/deep-cleaning-services', label: 'Deep Cleaning', icon: '🧽' },
  { href: '/move-in-out-cleaning-services', label: 'Move In/Out Cleaning', icon: '📦' },
  { href: '/commercial-cleaning-services', label: 'Commercial Cleaning', icon: '🏪' },
  { href: '/airbnb-cleaning-services', label: 'Airbnb Cleaning', icon: '🏡' },
  { href: '/post-renovation-cleaning-services', label: 'Post-Renovation Cleaning', icon: '🔨' },
  { href: '/eco-friendly-cleaning-services', label: 'Eco-Friendly Cleaning', icon: '🌿' },
  { href: '/rental-cleaning-services', label: 'Rental Cleaning', icon: '🔑' },
  { href: '/complete-cleaning-checklist', label: 'Cleaning Checklist', icon: '📋' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBookNowClick = () => {
    // Navigate to the dedicated book-now page
    window.location.href = '/book-now';
  };

  // Improved dropdown logic
  const showDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const hideDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const cancelHide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="bg-gradient-to-r from-slate-50 via-white to-blue-50 border-b-2 border-slate-200/60 relative shadow-lg backdrop-blur-sm z-[999999]">
        <div className="w-full max-w-none px-2 sm:px-4 xl:px-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/logo/logo2.svg" 
                alt="Cleaning Company Logo" 
                width={320} 
                height={66} 
                className="drop-shadow-sm w-auto h-auto max-w-[220px] sm:max-w-[280px] lg:max-w-[320px]" 
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center -ml-8">
            <ul className="flex items-center space-x-2 xl:space-x-4">
              <li>
                <Link href="/about-us" className="text-lg font-semibold text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/90 hover:shadow-sm backdrop-blur-sm border border-transparent hover:border-blue-200 whitespace-nowrap">
                  About Us
                </Link>
              </li>
              <li className="relative group">
                <div
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                  className="relative flex items-center"
                >
                  <Link href="/services" legacyBehavior>
                    <a
                      className="text-lg font-semibold text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/90 hover:shadow-sm backdrop-blur-sm flex items-center border border-transparent hover:border-blue-200 whitespace-nowrap"
                      onClick={() => setIsServicesOpen(false)}
                      tabIndex={0}
                    >
                      Services
                      <svg className={`w-5 h-5 ml-1 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </a>
                  </Link>
                  {/* Improved Dropdown Menu with better z-index */}
                  <div 
                    ref={dropdownRef}
                    className={`absolute left-0 top-full w-80 transition-all duration-300 ease-out transform-gpu z-[999999] ${
                      isServicesOpen 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={cancelHide}
                    onMouseLeave={hideDropdown}
                    style={{ zIndex: 999999 }}
                  >
                    <div className="mt-2 bg-white backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="p-3">
                        <div className="space-y-1">
                          {serviceLinks.map((link) => (
                            <Link 
                              key={link.href}
                              href={link.href} 
                              className="group flex items-center p-3 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all duration-200"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                                {link.icon}
                              </div>
                              <div className="ml-3 flex-1">
                                <span className="block text-slate-700 font-medium group-hover:text-blue-700 transition-colors duration-200">
                                  {link.label}
                                </span>
                              </div>
                              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/contact-us" className="text-lg font-semibold text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/90 hover:shadow-sm backdrop-blur-sm border border-transparent hover:border-blue-200 whitespace-nowrap">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/join-team" className="text-lg font-semibold text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/90 hover:shadow-sm backdrop-blur-sm border border-transparent hover:border-blue-200 whitespace-nowrap">
                  Join Team
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-lg font-semibold text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/90 hover:shadow-sm backdrop-blur-sm border border-transparent hover:border-blue-200 whitespace-nowrap">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/cleaning-blog" className="text-lg font-semibold text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/90 hover:shadow-sm backdrop-blur-sm border border-transparent hover:border-blue-200 whitespace-nowrap">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Book Now Button - matching screenshot style */}
            <Link 
              href="/book-now"
              className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg transform whitespace-nowrap flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book Now</span>
            </Link>

            {/* Call Button - matching screenshot style */}
            <a 
              href="tel:+1234567890" 
              className="group bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg transform whitespace-nowrap flex items-center space-x-2"
              title="Call"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call</span>
            </a>
            
            {/* Login Button - matching screenshot style */}
            <Link 
              href="/login" 
              className="group bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg transform whitespace-nowrap flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Login</span>
            </Link>
          </div>
        </div>

        {/* Mobile Layout - Two Lines */}
        <div className="block lg:hidden">
          {/* Top Row: Larger Logo with Better Spacing */}
          <div className="flex justify-center -mt-32 -mb-32 sm:py-2 md:py-3">
            <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/logo/logo2.svg" 
                alt="Cleaning Company Logo" 
                width={350} 
                height={72} 
                className="drop-shadow-lg w-auto h-auto max-w-[360px] sm:max-w-[350px]" 
                priority
              />
            </Link>
          </div>

          {/* Bottom Row: Enhanced Action Buttons */}
          <div className="flex justify-between items-center px-3 py-2">
            {/* Enhanced Call Button */}
            <a 
              href="tel:+1234567890" 
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 transform whitespace-nowrap backdrop-blur-sm flex items-center space-x-2.5 border border-emerald-400/30 shadow-lg"
            >
              <div className="p-1 bg-white/20 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-semibold">Call</span>
            </a>

            {/* Enhanced Book Now Button */}
            <Link 
              href="/book-now"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-5 py-3.5 rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 transform whitespace-nowrap backdrop-blur-sm flex items-center space-x-2.5 border border-blue-400/30 shadow-lg"
            >
              <div className="p-1 bg-white/20 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-semibold">Book Now</span>
            </Link>

            {/* Enhanced Menu Button */}
            <button 
              className="relative text-slate-800 bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-white border-2 border-slate-300 hover:border-slate-400 p-3.5 rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:scale-110 transform backdrop-blur-sm shadow-lg" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Menu"
            >
              {/* Enhanced Animated Hamburger/X Icon */}
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`w-5 h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out transform origin-center ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
                <span className={`w-5 h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></span>
                <span className={`w-5 h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out transform origin-center ${isMenuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1.5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

            {/* Enhanced Mobile Menu with Animations */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-gradient-to-b from-white/95 to-blue-50/95 backdrop-blur-lg border-t border-slate-200 shadow-lg">
          <nav className="px-3 pt-3 pb-4">
                         {/* Navigation Links with Staggered Animation */}
             <div className="space-y-1">
               {/* About Us */}
               <div className={`transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} delay-75`}>
                 <Link 
                   href="/about-us" 
                   className="block px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-blue-100/80 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 border border-transparent hover:border-blue-200 backdrop-blur-sm"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   About Us
                 </Link>
               </div>
               
               {/* Services Dropdown - Right after About Us */}
               <div className={`transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} delay-100`}>
                 <Link href="/services" legacyBehavior>
                   <a
                     onClick={() => {
                       setIsMenuOpen(false);
                       setIsServicesOpen(false);
                     }}
                     className="w-full text-left flex justify-between items-center px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-blue-100/80 hover:text-blue-700 transition-all duration-300 border border-transparent hover:border-blue-200 backdrop-blur-sm"
                   >
                     Services
                     <svg className={`w-5 h-5 transform transition-all duration-300 ${isServicesOpen ? 'rotate-180 text-blue-600' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </a>
                 </Link>
                 
                 {/* Services Submenu with Scrollable Container */}
                 <div className={`transition-all duration-300 ease-in-out ${isServicesOpen ? 'max-h-[25vh] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                   <div className="pl-3 pt-2 pb-2 space-y-0.5 overflow-y-auto max-h-[22vh] scrollbar-visible bg-gradient-to-b from-transparent via-transparent to-transparent relative">
                     
                     {serviceLinks.map((link, index) => (
                       <div key={link.href} className={`transform transition-all duration-300 ease-out ${isServicesOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`} style={{ transitionDelay: `${index * 50}ms` }}>
                         <Link 
                           href={link.href} 
                           className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 transform hover:translate-x-1"
                           onClick={() => {
                             setIsMenuOpen(false);
                             setIsServicesOpen(false);
                           }}
                         >
                           <span className="mr-2 text-sm">{link.icon}</span>
                           <span>{link.label}</span>
                         </Link>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               {/* Other Navigation Links */}
               {[
                 { href: '/contact-us', label: 'Contact', delay: 'delay-125' },
                 { href: '/join-team', label: 'Join Team', delay: 'delay-150' },
                 { href: '/faq', label: 'FAQ', delay: 'delay-175' },
                 { href: '/cleaning-blog', label: 'Blog', delay: 'delay-200' }
               ].map((item, index) => (
                 <div key={item.href} className={`transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} ${item.delay}`}>
                   <Link 
                     href={item.href} 
                     className="block px-4 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-blue-100/80 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 border border-transparent hover:border-blue-200 backdrop-blur-sm"
                     onClick={() => setIsMenuOpen(false)}
                   >
                     {item.label}
                   </Link>
                 </div>
               ))}
             </div>
            
            {/* Mobile Login Button Only (Call and Book Now already visible at front) */}
            <div className={`pt-3 border-t border-slate-200/60 mt-3 transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} delay-300`}>
              <Link 
                href="/login" 
                className="w-full flex items-center justify-center space-x-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold px-5 py-3 rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-0.5 bg-white/20 rounded-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-base">Login</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
    
    {/* CSS for improved dropdown positioning and scrollbar styling */}
    <style jsx global>{`
      /* Ensure dropdown doesn't interfere with other elements */
      .group:hover .absolute {
        z-index: 999999 !important;
      }
      
      /* Better mobile menu performance */
      @media (max-width: 1024px) {
        .lg\\:hidden {
          contain: layout style paint;
        }
      }
      
      /* Prevent dropdown from being clipped */
      header {
        position: relative;
        overflow: visible;
      }
      
      /* Smooth dropdown animations */
      .absolute.top-full {
        will-change: opacity, transform;
      }
      
      /* Highly Visible Mobile Scrollbar for Services Dropdown */
      .scrollbar-visible {
        scrollbar-width: thick;
        scrollbar-color: #1d4ed8 #e2e8f0;
      }
      
      .scrollbar-visible::-webkit-scrollbar {
        width: 14px;
        background: rgba(226, 232, 240, 0.9);
        border-radius: 8px;
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      
      .scrollbar-visible::-webkit-scrollbar-track {
        background: rgba(226, 232, 240, 0.8);
        border-radius: 8px;
        border: 2px solid rgba(59, 130, 246, 0.2);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .scrollbar-visible::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #3b82f6, #1d4ed8);
        border-radius: 8px;
        border: 3px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 3px 8px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3);
        min-height: 30px;
      }
      
      .scrollbar-visible::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #2563eb, #1e40af);
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4);
      }
      
      .scrollbar-visible::-webkit-scrollbar-thumb:active {
        background: linear-gradient(180deg, #1e40af, #1e3a8a);
        box-shadow: 0 2px 6px rgba(59, 130, 246, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.5);
      }
      
      /* Mobile-specific enhanced scrollbar visibility */
      @media (max-width: 768px) {
        .scrollbar-visible::-webkit-scrollbar {
          width: 16px;
          background: rgba(226, 232, 240, 1);
          border: 2px solid #3b82f6;
        }
        
        .scrollbar-visible::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 1);
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        
        .scrollbar-visible::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #1d4ed8);
          border: 4px solid rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.8);
          min-height: 40px;
        }
      }
      
      /* Mobile services dropdown max height adjustment - Compact */
      @media (max-height: 600px) {
        .max-h-\\[22vh\\] {
          max-height: 140px;
        }
        .max-h-\\[25vh\\] {
          max-height: 160px;
        }
      }
      
      @media (max-height: 500px) {
        .max-h-\\[22vh\\] {
          max-height: 110px;
        }
        .max-h-\\[25vh\\] {
          max-height: 130px;
        }
      }
      
      @media (max-height: 400px) {
        .max-h-\\[22vh\\] {
          max-height: 90px;
        }
        .max-h-\\[25vh\\] {
          max-height: 110px;
        }
      }
      
      @media (max-height: 350px) {
        .max-h-\\[22vh\\] {
          max-height: 70px;
        }
        .max-h-\\[25vh\\] {
          max-height: 90px;
        }
      }
    `}</style>
  </>
  );
};

export default Navbar; 