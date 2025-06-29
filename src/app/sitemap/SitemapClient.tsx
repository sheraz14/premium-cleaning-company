"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Map, Home, Building, FileText, Users, Mail, Phone, MapPin, Star, Calendar, Shield, ExternalLink, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SitemapClient() {
  const siteData = {
    main: {
      title: "Main Pages",
      icon: <Home className="h-6 w-6" />,
      color: "text-blue-500",
      gradient: "from-blue-500 to-indigo-600",
      links: [
        { title: "Home", url: "/", description: "Welcome to Dust Drifters - Professional cleaning services across Ontario" },
        { title: "About Us", url: "/about-us", description: "Learn about our mission, values, and experienced cleaning team" },
        { title: "Services", url: "/services", description: "Comprehensive overview of all our cleaning services" },
        { title: "Contact", url: "/contact-us", description: "Get in touch for quotes, questions, or to book your service" },
        { title: "Join Our Team", url: "/join-team", description: "Career opportunities with Ontario's leading cleaning service" },
        { title: "FAQ", url: "/faq", description: "Frequently asked questions about our cleaning services" }
      ]
    },
    services: {
      title: "Cleaning Services",
      icon: <Building className="h-6 w-6" />,
      color: "text-emerald-500", 
      gradient: "from-emerald-500 to-green-600",
      links: [
        { title: "House Cleaning", url: "/house-cleaning-services", description: "Regular and one-time residential cleaning services" },
        { title: "Deep Cleaning", url: "/deep-cleaning-services", description: "Thorough, comprehensive cleaning for homes and offices" },
        { title: "Move In/Out Cleaning", url: "/move-in-out-cleaning-services", description: "Complete cleaning for moving transitions" },
        { title: "Post-Renovation Cleaning", url: "/post-renovation-cleaning-services", description: "Specialized cleaning after construction or renovation" },
        { title: "Commercial Cleaning", url: "/commercial-cleaning-services", description: "Professional cleaning services for businesses" },
        { title: "Airbnb Cleaning", url: "/airbnb-cleaning-services", description: "Turnover cleaning for short-term rental properties" },
        { title: "Condo & Apartment Cleaning", url: "/condo-and-apartment-cleaning-services", description: "Specialized cleaning for multi-unit residential buildings" },
        { title: "Rental Property Cleaning", url: "/rental-cleaning-services", description: "Maintenance cleaning for rental properties" },
        { title: "Eco-Friendly Cleaning", url: "/eco-friendly-cleaning-services", description: "Green cleaning solutions using environmentally safe products" }
      ]
    },
    resources: {
      title: "Resources & Information",
      icon: <FileText className="h-6 w-6" />,
      color: "text-purple-500",
      gradient: "from-purple-500 to-violet-600", 
      links: [
        { title: "Cleaning Blog", url: "/cleaning-blog", description: "Tips, guides, and insights from our cleaning experts" },
        { title: "Complete Cleaning Checklist", url: "/complete-cleaning-checklist", description: "Room-by-room cleaning guides and checklists" },
        { title: "Sitemap", url: "/sitemap", description: "Navigate our website with this comprehensive page directory" }
      ]
    },
    legal: {
      title: "Legal & Policies",
      icon: <Shield className="h-6 w-6" />,
      color: "text-orange-500",
      gradient: "from-orange-500 to-red-600",
      links: [
        { title: "Privacy Policy", url: "/privacy-policy", description: "How we collect, use, and protect your personal information" },
        { title: "Terms of Service", url: "/terms-of-service", description: "Our service terms, conditions, and policies" }
      ]
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-16 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 opacity-20"
          />
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-16 w-20 h-20 rounded-full bg-gradient-to-r from-emerald-200 to-indigo-200 opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-4 bg-white/80 rounded-full shadow-lg backdrop-blur-sm"
              >
                <Map className="h-12 w-12 text-indigo-500" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-600 bg-clip-text text-transparent mb-6">
              Website Sitemap
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Easily navigate through all our pages and services. Find exactly what you're looking for with our comprehensive site directory.
            </p>
            <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-300">
              <FileText className="h-4 w-4 mr-2" />
              Updated: {new Date().toLocaleDateString('en-CA')}
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-12">
            {Object.entries(siteData).map(([key, section], sectionIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 bg-gradient-to-r ${section.gradient} rounded-full text-white`}>
                        {section.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{section.title}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {section.links.length} pages in this section
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid gap-4">
                      {section.links.map((link, linkIndex) => (
                        <motion.div
                          key={linkIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Link 
                            href={link.url}
                            className="block p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <ExternalLink className={`h-4 w-4 ${section.color} group-hover:scale-110 transition-transform duration-300`} />
                                  <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                                    {link.title}
                                  </h4>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {link.description}
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                  >
                    <HelpCircle className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
                <CardTitle className="text-3xl text-gray-900 mb-4">Need Help Finding Something?</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Can't find what you're looking for? We're here to help you navigate our services and find the perfect cleaning solution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    <Link 
                      href="/contact-us"
                      className="block p-6 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/40 hover:border-white/60 group"
                    >
                      <Mail className="h-8 w-8 text-indigo-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">Contact Us</h3>
                      <p className="text-gray-600 text-sm">Get in touch for personalized assistance</p>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    <Link 
                      href="/faq"
                      className="block p-6 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/40 hover:border-white/60 group"
                    >
                      <HelpCircle className="h-8 w-8 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">FAQ</h3>
                      <p className="text-gray-600 text-sm">Find answers to common questions</p>
                    </Link>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-indigo-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-4 text-center">
                  <MapPin className="h-8 w-8 text-emerald-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Serving All of Ontario</h3>
                    <p className="text-gray-600">Professional cleaning services across the province</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
