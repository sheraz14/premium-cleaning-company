"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Award, Heart, Shield, Users, Target, Sparkles } from "lucide-react";


const HeroBadge = ({
  text,
  icon,
  endIcon,
  className,
}: {
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center rounded-full border border-white/20 hover:border-white/30 px-4 py-1.5 text-sm gap-2 text-white transition-all duration-300 ${className}`}
    >
      {icon && (
        <motion.div
          className="text-white/80 transition-colors group-hover:text-white"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon}
        </motion.div>
      )}
      <span>{text}</span>
      {endIcon && (
        <motion.div className="text-white/80">{endIcon}</motion.div>
      )}
    </motion.div>
  );
};

export function AboutPageContent() {
  return (
    <>
      {/* Hero Section with Professional Background Image */}
      <section className="relative z-0 flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/clean-modern-interior.jpg"
            alt="Clean Modern Interior - Result of Professional Cleaning"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay for enhanced visual effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-900/40 to-pink-900/60" />
        </div>
        


        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400/50 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-emerald-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col items-center text-center space-y-8">
            <HeroBadge 
              text="Established 2023" 
              icon={<Award className="h-4 w-4" />} 
              endIcon={<ChevronRight className="h-4 w-4" />}
              className="mb-2"
            />
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">Us</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl leading-relaxed text-white/90 max-w-3xl"
            >
              We're more than just a cleaning company. We're your partners in creating spotless, healthy environments that enhance your quality of life. Since 2023, we've been setting the standard for professional cleaning services with attention to detail and customer satisfaction.
            </motion.p>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl"
            >
              <div className="text-center p-6 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">100+</div>
                <div className="text-sm text-white/80 mt-1">Happy Clients</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-emerald-200">2+</div>
                <div className="text-sm text-white/80 mt-1">Years Experience</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-purple-200">100%</div>
                <div className="text-sm text-white/80 mt-1">Satisfaction Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section with Geometric Background */}
      <section className="py-22 md:py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Geometric background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-24 h-24 border-2 border-purple-400 rotate-45" />
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-400 rounded-full" />
          <div className="absolute bottom-32 left-20 w-20 h-20 border-2 border-pink-400" />
          <div className="absolute bottom-20 right-40 w-12 h-12 border-2 border-emerald-400 rotate-12" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 z' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center rounded-full border bg-white/60 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-6 shadow-sm">
                <Sparkles className="h-3 w-3 mr-2" />
                Our Journey
              </div>
              <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  <strong className="text-purple-700 font-semibold">The Beginning of a Dream:</strong> Founded in 2023 by Sheraz, an ambitious undergraduate student with a vision to revolutionize the cleaning industry. As the first person in his family to attend university, Sheraz understood the value of hard work, determination, and breaking barriers. With big dreams and an unwavering belief in excellence, he embarked on an entrepreneurial journey that would change everything.
                </p>
                <p>
                  <strong className="text-purple-700 font-semibold">A Pioneer's Vision:</strong> Being the first in his family to start a business, Sheraz faced the challenge with courage and innovation. He saw an opportunity to transform how people experience cleaning services – moving beyond just "getting the job done" to creating truly exceptional, personalized experiences. What started as a bold idea in a university dorm room quickly evolved into a mission-driven company.
                </p>
                <p>
                  <strong className="text-purple-700 font-semibold">From Student to Entrepreneur:</strong> Balancing studies with building a business, Sheraz learned to combine academic knowledge with real-world application. He understood that success isn't just about profit – it's about making a genuine impact in people's lives. This philosophy became the cornerstone of Dust Drifters, where every cleaning service is delivered with the care and attention you'd expect from family.
                </p>
                <p>
                  <strong className="text-purple-700 font-semibold">Building on Values:</strong> Our journey has been driven by the values instilled by humble beginnings: integrity, hard work, and never settling for "good enough." We understand that a clean environment contributes to health, productivity, and overall well-being, which is why we approach each project as if we're cleaning for our own loved ones.
                </p>
                <p>
                  <strong className="text-purple-700 font-semibold">Today and Tomorrow:</strong> What began as one student's ambitious dream has grown into a trusted cleaning service known for quality, reliability, and genuine care. We continue to uphold the entrepreneurial spirit and family values that guided us from the beginning. We're proud of our growth, but we're even more proud of the relationships we've built and the difference we make in our clients' daily lives.
                </p>
                <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                  <p className="text-purple-800 font-medium italic">
                    "Starting Dust Drifters wasn't just about building a business – it was about proving that with dedication, vision, and the right values, you can transform an entire industry while staying true to your roots." - Sheraz, Founder
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden group">
              <Image
                src="/images/backgrounds/story.png"
                alt="Our Cleaning Company Story"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Proven Process Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-100 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-100 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Our Proven Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple Steps to <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Perfect Results</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We've streamlined our cleaning process into three clear steps that deliver 
              consistent, exceptional results every single time.
            </p>
          </motion.div>

          <div className="relative">
            {/* Simple connecting line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gray-200 rounded-full"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Book & Schedule",
                  description: "Choose your service type, select a convenient date and time, and book your appointment. We'll confirm all details and any special requirements.",
                  icon: "📅",
                  color: "purple",
                  features: ["Instant confirmation", "Flexible scheduling", "No upfront payment"]
                },
                {
                  step: "2", 
                  title: "Professional Cleaning",
                  description: "Our trained team arrives on time with all necessary equipment and supplies to clean your space according to your customized plan.",
                  icon: "✨",
                  color: "blue",
                  features: ["Vetted professionals", "All supplies included", "Customized approach"]
                },
                {
                  step: "3",
                  title: "Quality Assurance",
                  description: "We perform a thorough walkthrough to ensure every detail meets our standards. Payment is processed securely after your satisfaction.",
                  icon: "✅",
                  color: "green",
                  features: ["100% satisfaction guarantee", "Secure payment", "Quality inspection"]
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative text-center group"
                >
                  <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full relative">
                    {/* Step number circle */}
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${
                      item.color === 'purple' ? 'bg-purple-100' : 
                      item.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                    } flex items-center justify-center shadow-sm`}>
                      <span className={`text-2xl font-bold ${
                        item.color === 'purple' ? 'text-purple-600' : 
                        item.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                      }`}>{item.step}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="text-3xl mb-4">{item.icon}</div>
                    
                                         <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                       {item.title}
                     </h3>
                     <p className="text-gray-600 leading-relaxed mb-4">
                       {item.description}
                     </p>
                     
                     {/* Feature list */}
                     <div className="space-y-2">
                       {item.features.map((feature, featureIndex) => (
                         <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                           <div className={`w-2 h-2 ${
                             item.color === 'purple' ? 'bg-purple-500' : 
                             item.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                           } rounded-full mr-3`} />
                           {feature}
                         </div>
                       ))}
                     </div>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lighter CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="relative bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-10 overflow-hidden border border-purple-200/50">
              {/* Light background decorations */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/50 rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/30 rounded-full translate-x-20 translate-y-20" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Experience Our Excellence
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Ready to see the difference our proven process makes? 
                  Let us transform your space with our professional approach.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => window.location.href = '/contact-us'}
                  >
                    🏆 Get Started Today
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                    onClick={() => window.location.href = '/complete-cleaning-checklist'}
                  >
                    📋 View Our Checklist
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-purple-400 rounded-full" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-4 border-blue-400 rotate-45" />
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-4 border-pink-400 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
              Service Excellence
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Complete <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Cleaning Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transform any space with our comprehensive range of professional cleaning services, 
              each designed to meet your specific needs and exceed your expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Regular Cleaning",
                description: "Consistent weekly, bi-weekly, or monthly cleaning services that maintain your space in pristine condition with our systematic approach.",
                icon: "🏠",
                gradient: "from-emerald-500 to-teal-600",
                bgGradient: "from-emerald-50 to-teal-50",
                borderColor: "border-emerald-200",
                features: ["Flexible scheduling", "Consistent team", "Quality guarantee"]
              },
              {
                title: "Deep Cleaning", 
                description: "Comprehensive top-to-bottom cleaning that reaches every corner, perfect for seasonal refreshes or preparing for special occasions.",
                icon: "🧽",
                gradient: "from-blue-500 to-indigo-600",
                bgGradient: "from-blue-50 to-indigo-50",
                borderColor: "border-blue-200",
                features: ["Complete sanitization", "Detail-focused", "Extended service time"]
              },
              {
                title: "Move-in/Move-out",
                description: "Thorough cleaning for property transitions, ensuring spaces are spotless for new beginnings or security deposit returns.",
                icon: "📦",
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-50 to-red-50",
                borderColor: "border-orange-200",
                features: ["Empty home cleaning", "Appliance detailing", "Move-in ready"]
              },
              {
                title: "Commercial Cleaning",
                description: "Professional cleaning services for offices and businesses, creating healthy, productive environments for your team and clients.", 
                icon: "🏢",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-50",
                borderColor: "border-purple-200",
                features: ["After-hours service", "Professional standards", "Customized plans"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, type: "spring", bounce: 0.3 }}
                className="group relative"
              >
                                 <div className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl p-6 shadow-lg border ${service.borderColor} hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden h-full`}>
                   {/* Background decoration */}
                   <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-8 translate-x-8" />
                   
                   {/* Icon with gradient background */}
                   <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                     <span className="text-2xl">{service.icon}</span>
                   </div>
                   
                   <h3 className="text-lg font-bold text-gray-900 mb-3 text-center group-hover:text-purple-700 transition-colors duration-300">
                     {service.title}
                   </h3>
                   <p className="text-gray-700 mb-4 text-center leading-relaxed text-sm">
                     {service.description}
                   </p>
                   
                   {/* Feature list */}
                   <div className="space-y-1">
                     {service.features.map((feature, featureIndex) => (
                       <div key={featureIndex} className="flex items-center text-xs text-gray-600">
                         <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-2`} />
                         {feature}
                       </div>
                     ))}
                   </div>
                   
                   {/* Hover effect overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-20"
          >
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our cleaning experts are here to help you choose the perfect service for your space and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = '/contact-us'}
                >
                  📞 Free Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                  onClick={() => window.location.href = '/services'}
                >
                  🔍 Explore All Services
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Core Values Section - Redesigned */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Creative Background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%239C92AC' fill-opacity='0.1'%3e%3cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6 shadow-sm border border-purple-200">
              <Heart className="h-4 w-4" />
              Our Guiding Principles
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Values That <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Define Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values are the foundation of our company, guiding every decision we make and every service we provide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We are committed to delivering the highest quality service, paying meticulous attention to every detail to ensure flawless results.",
                icon: <Award className="h-7 w-7" />,
                color: "purple"
              },
              {
                title: "Integrity",
                description: "We operate with honesty and transparency. You can trust us to be reliable, respectful, and fair in all our interactions.",
                icon: <Shield className="h-7 w-7" />,
                color: "blue"
              },
              {
                title: "Customer-Centric",
                description: "Our clients are at the heart of everything we do. We listen to your needs and tailor our services to ensure your complete satisfaction.",
                icon: <Users className="h-7 w-7" />,
                color: "pink"
              },
              {
                title: "Reliability",
                description: "We show up on time and deliver consistent, high-quality results you can depend on, every single time.",
                icon: <Target className="h-7 w-7" />,
                color: "green"
              },
              {
                title: "Passion",
                description: "We genuinely love what we do. Our passion for creating clean, healthy environments drives us to go above and beyond.",
                icon: <Sparkles className="h-7 w-7" />,
                color: "yellow"
              },
              {
                title: "Respect",
                description: "We treat your home, your belongings, and your time with the utmost care and respect, ensuring a positive experience.",
                icon: <Heart className="h-7 w-7" />,
                color: "red"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 group-hover:shadow-xl group-hover:shadow-purple-100 transition-all duration-300 h-full flex items-start space-x-6 group-hover:border-purple-200 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-inner
                      ${value.color === 'purple' && 'bg-purple-100 text-purple-600'}
                      ${value.color === 'blue' && 'bg-blue-100 text-blue-600'}
                      ${value.color === 'pink' && 'bg-pink-100 text-pink-600'}
                      ${value.color === 'green' && 'bg-green-100 text-green-600'}
                      ${value.color === 'yellow' && 'bg-yellow-100 text-yellow-600'}
                      ${value.color === 'red' && 'bg-red-100 text-red-600'}
                      transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {value.icon}
                  </motion.div>
                  {/* Content */}
                  <div className="relative z-10 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />
    </>
  );
} 