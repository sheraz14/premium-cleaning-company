"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Particles } from "@/components/ui/particles";
import { 
  Users, 
  Heart, 
  Star, 
  CheckCircle, 
  MapPin, 
  Clock, 
  DollarSign, 
  Trophy, 
  Sparkles,
  Award,
  Upload,
  Send,
  Zap,
  Target
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";



const companyBenefits = [
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Competitive Pay",
    description: "Above market rates starting from $18-26/hour depending on experience and position."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible Scheduling",
    description: "Work schedules that fit your lifestyle with morning, afternoon, and weekend options."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Growth Opportunities",
    description: "As a growing company, we offer real advancement opportunities for dedicated team members."
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Performance Bonuses",
    description: "Earn extra income through client satisfaction bonuses and referral rewards."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Supportive Team",
    description: "Join a close-knit team where your contribution matters and your voice is heard."
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Fresh Start Environment",
    description: "Be part of building something special from the ground up with a young, ambitious company."
  }
];

const employeeTestimonials = [
  {
    name: "Sarah Johnson",
    position: "Team Lead",
    quote: "Working at Dust Drifters has been amazing. The team is supportive, the pay is great, and I love seeing the difference we make in people's homes.",
    rating: 5,
    tenure: "2 years"
  },
  {
    name: "Mike Chen",
    position: "Residential Cleaner", 
    quote: "The flexible schedule allows me to balance work with my studies. Plus, the training program really helped me develop professional skills.",
    rating: 5,
    tenure: "1 year"
  },
  {
    name: "Emily Rodriguez",
    position: "Commercial Cleaner",
    quote: "I started part-time and was promoted to full-time within 6 months. The growth opportunities here are real!",
    rating: 5,
    tenure: "1.5 years"
  },
  {
    name: "Alex Thompson",
    position: "Quality Inspector",
    quote: "The management really cares about quality and customer satisfaction. I've learned so much about professional cleaning standards here.",
    rating: 5,
    tenure: "8 months"
  },
  {
    name: "Jessica Park",
    position: "Residential Cleaner",
    quote: "Best job I've ever had! The clients are wonderful, the pay is fair, and my supervisor is always there to help when I need it.",
    rating: 5,
    tenure: "1.3 years"
  },
  {
    name: "David Kumar",
    position: "Operations Coordinator",
    quote: "Working at Dust Drifters feels like being part of a family business. Everyone genuinely cares about each other's success.",
    rating: 5,
    tenure: "6 months"
  },
  {
    name: "Maria Santos",
    position: "Team Lead",
    quote: "I love training new team members and seeing them grow. The company invests in people, and it shows in our work culture.",
    rating: 5,
    tenure: "2.5 years"
  },
  {
    name: "Jordan Williams",
    position: "Commercial Cleaner",
    quote: "The evening shifts work perfectly with my schedule. Great benefits and the team is always willing to help each other out.",
    rating: 4,
    tenure: "10 months"
  },
  {
    name: "Priya Patel",
    position: "Customer Relations",
    quote: "Being able to make clients happy while working with such a dedicated team makes every day rewarding. Love this company!",
    rating: 5,
    tenure: "1.2 years"
  },
  {
    name: "Ryan Mitchell",
    position: "Equipment Specialist",
    quote: "Dust Drifters uses the best equipment and supplies. It makes our job easier and the results speak for themselves.",
    rating: 5,
    tenure: "9 months"
  }
];

export default function JoinTeamPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cleaningExperience: "",
    hasLicenseAndVehicle: "",
    availability: "",
    message: "",
    additionalInfo: "",
    resume: null as File | null
  });
  const [isPaused, setIsPaused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          cleaningExperience: "",
          hasLicenseAndVehicle: "",
          availability: "",
          message: "",
          additionalInfo: "",
          resume: null
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Enhanced Interactive Background */}
        <Particles
          className="absolute inset-0 -z-10"
          quantity={250}
          staticity={15}
          ease={90}
          color="#8B5CF6"
          size={1.8}
          refresh={false}
          vx={0.3}
          vy={-0.15}
        />
        
        {/* Secondary particle layer */}
        <Particles
          className="absolute inset-0 -z-10"
          quantity={150}
          staticity={30}
          ease={70}
          color="#EC4899"
          size={1.2}
          refresh={false}
          vx={-0.2}
          vy={0.1}
        />
        
        {/* Tertiary particle layer */}
        <Particles
          className="absolute inset-0 -z-10"
          quantity={80}
          staticity={50}
          ease={40}
          color="#3B82F6"
          size={0.8}
          refresh={false}
          vx={0.1}
          vy={-0.05}
        />
        
        {/* Animated wave patterns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <path d="M0,300 Q250,100 500,300 T1000,300 L1000,0 L0,0 Z" fill="url(#grad1)" className="animate-pulse" style={{ animationDuration: '4s' }} />
            <path d="M0,500 Q250,350 500,500 T1000,500 L1000,300 L0,300 Z" fill="url(#grad1)" opacity="0.6" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          </svg>
        </div>
        
        {/* Floating interactive bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-8 h-8 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-[70%] right-[20%] w-12 h-12 bg-pink-400/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-[40%] right-[25%] w-6 h-6 bg-blue-400/35 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-[20%] left-[25%] w-10 h-10 bg-purple-500/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
          <div className="absolute top-[25%] left-[60%] w-4 h-4 bg-pink-500/25 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.8s' }}></div>
          <div className="absolute bottom-[40%] right-[40%] w-14 h-14 bg-blue-500/15 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '5s' }}></div>
        </div>
        
        {/* Rotating geometric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 border-2 border-purple-400/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-8 h-8 border-2 border-pink-400/30 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 right-1/3 w-4 h-4 border border-blue-400/50 rotate-12 animate-spin" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-purple-500/25 rotate-45 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Enhanced gradient orbs with more layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/40 to-blue-50/50"></div>
        <div className="absolute top-10 left-0 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-gradient-to-l from-pink-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-t from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Pulsing mesh gradients */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-purple-100/60 to-transparent animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute inset-0 opacity-20 bg-gradient-to-tl from-transparent via-pink-100/60 to-transparent animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        
        {/* Enhanced radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/15 to-white/40"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50/80 backdrop-blur-sm px-4 py-2 text-sm text-purple-800 mb-4 shadow-sm"
            >
              <Users className="h-4 w-4 mr-2" />
              We're Hiring!
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900"
            >
              Join Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">Dream Team</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto"
            >
              Build a rewarding career with Canada's fastest-growing cleaning company. We offer competitive pay, flexible schedules, and unlimited growth opportunities.
            </motion.p>

                        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl"
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Apply Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl font-bold transition-all duration-300 rounded-xl backdrop-blur-sm"
                  onClick={() => window.location.href = '/about-us'}
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">About Our Company</span>
                  <span className="sm:hidden">About Company</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
               >
                 <Button
                   size="lg"
                   variant="outline"
                    className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl font-bold transition-all duration-300 rounded-xl backdrop-blur-sm"
                    onClick={() => window.location.href = '/services'}
                   >
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span className="hidden sm:inline">View Our Services</span>
                    <span className="sm:hidden">Our Services</span>
                   </Button>
                 </motion.div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mt-12 sm:mt-16"
            >
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-purple-100">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">50+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Team Members</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-pink-100">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">4.9★</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Employee Rating</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-blue-100">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">95%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Retention Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Our Culture
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Dust Drifters?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just a cleaning company – we're a family. Join a team that values your growth, 
              respects your time, and rewards your dedication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {companyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Stories */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        </div>
        
        {/* Background Particles */}
        <Particles
          className="absolute inset-0 -z-10 opacity-40"
          quantity={100}
          staticity={25}
          ease={70}
          color="#8B5CF6"
          size={1.0}
          refresh={false}
          vx={0.03}
          vy={0.015}
        />
        
        {/* Secondary particle layer */}
        <Particles
          className="absolute inset-0 -z-10 opacity-20"
          quantity={60}
          staticity={35}
          ease={50}
          color="#EC4899"
          size={0.6}
          refresh={false}
          vx={-0.02}
          vy={-0.01}
        />
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/6 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-2/3 right-1/5 w-4 h-4 bg-pink-400/30 rotate-45 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold mb-8 shadow-lg border border-purple-200/50"
            >
              <Star className="h-4 w-4" />
              Employee Stories
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Hear From Our{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Amazing Team
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full"></div>
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Real experiences from real people who love working with Dust Drifters. 
              Discover what makes our workplace special and why our team members choose to grow their careers with us.
            </motion.p>
          </motion.div>

          {/* Enhanced Sliding Testimonials Marquee */}
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <div className="flex overflow-hidden p-4 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:80s]">
              <div
                className={cn(
                  "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
                  "transition-[animation-play-state] will-change-transform",
                  isPaused && "animation-play-state-paused"
                )}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex gap-8">
                  {/* Duplicate testimonials for seamless loop */}
                  {[...employeeTestimonials, ...employeeTestimonials, ...employeeTestimonials].map((testimonial, i) => (
                    <motion.div
                      key={`employee-${i}`}
                      className="group relative w-80 sm:w-96 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 cursor-pointer shrink-0"
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Enhanced gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 p-[2px]">
                        <div className="w-full h-full bg-white rounded-3xl" />
                      </div>
                      
                      <div className="relative z-10">
                        {/* Enhanced rating stars */}
                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, starIndex) => (
                            <motion.div
                              key={starIndex}
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.4, rotate: 20 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15, delay: starIndex * 0.1 }}
                            >
                              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                            </motion.div>
                          ))}
                          <div className="ml-2 text-sm text-gray-500 font-medium">
                            {testimonial.rating}/5
                          </div>
                        </div>
                        
                        {/* Enhanced quote */}
                        <blockquote className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300">
                          <span className="text-4xl text-purple-300 leading-none">"</span>
                          {testimonial.quote}
                          <span className="text-4xl text-purple-300 leading-none">"</span>
                        </blockquote>
                        
                        {/* Enhanced author info */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 text-lg">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-purple-600 group-hover:text-purple-700 transition-colors duration-300 font-medium">
                              {testimonial.position}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 group-hover:from-purple-200 group-hover:to-pink-200 group-hover:text-purple-800 transition-all duration-300 text-sm font-semibold px-3 py-1"
                            >
                              {testimonial.tenure}
                            </Badge>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced gradient overlays for smooth fade effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white via-purple-50/50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white via-pink-50/50 to-transparent" />
          </div>
          
          {/* Enhanced call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16 sm:mt-20"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 font-medium"
            >
              Ready to share your own success story?
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl"
              >
                <Users className="h-5 w-5 mr-3" />
                Join Our Team Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <Send className="h-4 w-4" />
              Apply Today
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to join our team? Fill out the application below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Job Application</CardTitle>
                <CardDescription className="text-base sm:text-lg text-gray-600 mt-2">
                  Fields marked with <span className="text-red-500 font-semibold">*</span> are required. We'll review your application and contact you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Application submitted successfully! We'll contact you soon.
                    </div>
                  </div>
                )}
                
                                 {submitStatus === 'error' && (
                   <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                     <div className="flex items-center text-red-800">
                       <span className="text-red-500 mr-2">✕</span>
                       Failed to submit application. Please try again.
                     </div>
                   </div>
                 )}

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-2 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="cleaningExperience" className="text-sm font-semibold text-gray-700">
                        How much cleaning experience do you have? <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="cleaningExperience"
                        name="cleaningExperience"
                        value={formData.cleaningExperience}
                        onChange={handleInputChange}
                        required
                        className="mt-2 w-full h-11 rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                      >
                        <option value="">Select your experience level</option>
                        <option value="No experience">No experience - eager to learn!</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="Professional experience">Professional cleaning experience</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="hasLicenseAndVehicle" className="text-sm font-semibold text-gray-700">
                        Do you have a valid license and a vehicle? <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="hasLicenseAndVehicle"
                        name="hasLicenseAndVehicle"
                        value={formData.hasLicenseAndVehicle}
                        onChange={handleInputChange}
                        required
                        className="mt-2 w-full h-11 rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                      >
                        <option value="">Please select</option>
                        <option value="Yes, both license and vehicle">Yes, both license and vehicle</option>
                        <option value="License only, no vehicle">License only, no vehicle</option>
                        <option value="No license or vehicle">No license or vehicle</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-sm font-semibold text-gray-700">
                      Availability <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full h-11 rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                    >
                      <option value="">Select your availability</option>
                      <option value="Full-time (30+ hours/week)">Full-time (30+ hours/week)</option>
                      <option value="Part-time (15-29 hours/week)">Part-time (15-29 hours/week)</option>
                      <option value="Weekends only">Weekends only</option>
                      <option value="Evenings only">Evenings only</option>
                      <option value="Mornings only">Mornings only</option>
                      <option value="Flexible - any time">Flexible - any time</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                      Why do you want to join our team? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us why you're interested in working with Dust Drifters..."
                      className="mt-2 min-h-[120px] text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors resize-none"
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo" className="text-sm font-semibold text-gray-700">
                      Is there anything else you'd like us to know about you?
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Tell us anything else that makes you a great fit for our team (optional)..."
                      className="mt-2 min-h-[100px] text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors resize-none"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional - Share any additional information about yourself</p>
                  </div>

                  <div>
                    <Label htmlFor="resume" className="text-sm font-semibold text-gray-700">
                      Resume (Optional)
                    </Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="h-11 text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors"
                      />
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX files only (max 5MB)</p>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                    >
                                             {isSubmitting ? (
                         <>
                           <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                           Submitting Application...
                         </>
                       ) : (
                         <>
                           <Send className="h-5 w-5 mr-2" />
                           Submit Application
                         </>
                       )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30"></div>
        
        {/* Interactive particles */}
        <Particles
          className="absolute inset-0"
          quantity={120}
          staticity={15}
          ease={90}
          color="#FFFFFF"
          size={1.0}
          refresh={false}
          vx={0.05}
          vy={-0.02}
        />
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border border-pink-300/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-purple-300/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20 animate-pulse" style={{ animationDuration: '6s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              Join Our Growing Family
            </motion.div>
            
            {/* Main heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Ready to Make a{" "}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
                  Difference?
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-full"></div>
              </span>
            </motion.h2>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Join Canada's most trusted cleaning company and start building your career today. 
              We can't wait to welcome you to the{" "}
              <span className="font-semibold text-purple-300">Dust Drifters family!</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-800 hover:bg-purple-50 px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl"
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Zap className="h-6 w-6 mr-3" />
                  Apply Now
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-purple-800 hover:bg-purple-50 px-10 py-4 text-xl font-bold transition-all duration-300 rounded-xl backdrop-blur-sm"
                  onClick={() => window.location.href = '/contact-us'}
                >
                  <Target className="h-6 w-6 mr-3" />
                  Have Questions?
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Competitive Pay</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Flexible Schedule</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" fill="white" fillOpacity="0.1"/>
          </svg>
        </div>
      </section>
    </main>
  );
}
