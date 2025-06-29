'use client';
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle, Phone, Mail, ChevronRight, Sparkles, HelpCircle, CheckCircle, Star } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import Fuse from 'fuse.js';

const faqs = [
  {
    id: 1,
    category: "About Us",
    question: "What makes Dust Drifters different from other cleaning companies?",
    answer:
      "Dust Drifters was founded with a mission to revolutionize the cleaning industry through integrity, attention to detail, and genuine care. We combine eco-friendly products, a vetted and passionate team, and a customer-centric approach to deliver spotless results and a positive experience every time.",
    icon: "🌟",
  },
  {
    id: 101,
    category: "About Us",
    question: "When was Dust Drifters established?",
    answer:
      "Dust Drifters was established in 2023 by Sheraz, who set out to raise the standard for professional cleaning services with a focus on quality, reliability, and customer care.",
    icon: "🏆",
  },
  {
    id: 102,
    category: "About Us",
    question: "What is your company's mission?",
    answer:
      "Our mission is to create spotless, healthy environments that enhance our clients' quality of life, while upholding the highest standards of integrity and service.",
    icon: "🎯",
  },
  {
    id: 2,
    category: "Values",
    question: "What are your core values as a company?",
    answer:
      "Our core values are Excellence, Integrity, Customer-Centric Service, Reliability, Passion, and Respect. These principles guide every decision we make and every service we provide.",
    icon: "💎",
  },
  {
    id: 103,
    category: "Values",
    question: "How do your values influence your cleaning services?",
    answer:
      "Our values shape every aspect of our work, from the way we treat our clients and staff to the quality and consistency of our cleaning. We believe in doing the right thing, every time.",
    icon: "🧭",
  },
  {
    id: 104,
    category: "Values",
    question: "How are your staff trained in your company values?",
    answer:
      "All team members receive training not only in cleaning techniques but also in our core values, ensuring every service reflects our commitment to excellence and respect.",
    icon: "📚",
  },
  {
    id: 4,
    category: "Eco-Friendly",
    question: "Are your cleaning products safe for children and pets?",
    answer:
      "Yes! We use eco-friendly, non-toxic cleaning products that are safe for your family and pets. If you have specific sensitivities or preferences, let us know and we'll accommodate your needs.",
    icon: "🌱",
  },
  {
    id: 105,
    category: "Eco-Friendly",
    question: "Why do you use eco-friendly products?",
    answer:
      "We care about the health of our clients, our staff, and the environment. Eco-friendly products reduce exposure to harsh chemicals and help us create a safer, greener community.",
    icon: "🌍",
  },
  {
    id: 106,
    category: "Eco-Friendly",
    question: "Can I request only green cleaning for my service?",
    answer:
      "Absolutely! All our standard products are eco-friendly, but if you have specific green cleaning preferences or sensitivities, just let us know when booking.",
    icon: "🍃",
  },
  {
    id: 5,
    category: "Team",
    question: "Who will be cleaning my home or office?",
    answer:
      "Our team consists of carefully vetted, background-checked professionals who are passionate about delivering exceptional service. We strive to provide consistent teams for regular clients and always maintain high standards of trust and reliability.",
    icon: "👥",
  },
  {
    id: 107,
    category: "Team",
    question: "Are your cleaners background checked?",
    answer:
      "Yes, all our cleaning professionals undergo thorough background checks and are carefully screened for trustworthiness and reliability.",
    icon: "🔎",
  },
  {
    id: 108,
    category: "Team",
    question: "How do you ensure your team maintains high standards?",
    answer:
      "We provide ongoing training, regular performance reviews, and encourage open communication to ensure our team consistently delivers top-quality service.",
    icon: "📈",
  },
  {
    id: 6,
    category: "Quality",
    question: "How do you ensure quality and customer satisfaction?",
    answer:
      "We follow a proven process: easy booking, professional cleaning with all supplies provided, and a thorough quality check. If you're not 100% satisfied, we'll make it right—your happiness is our guarantee.",
    icon: "✅",
  },
  {
    id: 109,
    category: "Quality",
    question: "What if I am not satisfied with the cleaning?",
    answer:
      "If you're not completely satisfied, let us know within 24 hours and we'll return to address any concerns at no extra cost.",
    icon: "🔄",
  },
  {
    id: 110,
    category: "Quality",
    question: "Do you have a quality assurance process?",
    answer:
      "Yes, we perform a final walkthrough after every cleaning and welcome your feedback to ensure our high standards are met every time.",
    icon: "📝",
  },
  {
    id: 7,
    category: "Consultation",
    question: "Can you help me choose the right cleaning service for my needs?",
    answer:
      "Absolutely! Our experts are happy to recommend the best service for your space and budget. Contact us for a free consultation.",
    icon: "📞",
  },
  {
    id: 111,
    category: "Consultation",
    question: "Is the consultation really free?",
    answer:
      "Yes, our consultations are completely free and come with no obligation. We're here to help you find the best solution for your needs.",
    icon: "💬",
  },
  {
    id: 112,
    category: "Consultation",
    question: "How do I request a consultation?",
    answer:
      "You can request a consultation by calling us, emailing, or filling out the contact form on our website. We'll get back to you promptly to discuss your needs.",
    icon: "📝",
  },
  {
    id: 8,
    category: "General",
    question: "How often should I schedule cleaning services?",
    answer:
      "The frequency depends on your needs. Many clients prefer weekly or bi-weekly cleaning for regular maintenance, while others opt for monthly deep cleaning. We can help you determine the best schedule based on your lifestyle and requirements.",
    icon: "🏠",
  },
  {
    id: 113,
    category: "General",
    question: "Do I need to be home during the cleaning?",
    answer:
      "No, you don't need to be home. Many clients provide us with access instructions. You're always welcome to be present if you prefer.",
    icon: "🔑",
  },
  {
    id: 114,
    category: "General",
    question: "Can I request special instructions for my cleaning?",
    answer:
      "Yes! We encourage you to share any special requests or instructions when booking or before your appointment. We aim to accommodate your needs.",
    icon: "📝",
  },
  {
    id: 9,
    category: "Booking",
    question: "How do I book a cleaning?",
    answer:
      "You can book a cleaning online through our website or by calling us directly. Our team will confirm your appointment and answer any questions you may have.",
    icon: "📅",
  },
  {
    id: 115,
    category: "Booking",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least a few days in advance to secure your preferred date and time, especially during busy periods.",
    icon: "⏳",
  },
  {
    id: 116,
    category: "Booking",
    question: "Can I make a recurring booking?",
    answer:
      "Yes! We offer recurring cleaning schedules (weekly, bi-weekly, monthly) for your convenience. Let us know your preference when booking.",
    icon: "🔁",
  },
  {
    id: 10,
    category: "Pricing",
    question: "How much do your services cost?",
    answer:
      "Our pricing varies based on the size of your home, type of cleaning, and frequency. We offer competitive rates and provide free estimates. Contact us for a personalized quote based on your specific needs.",
    icon: "💰",
  },
  {
    id: 117,
    category: "Pricing",
    question: "Do you offer discounts or promotions?",
    answer:
      "We occasionally offer special promotions and discounts for new and returning clients. Check our website or contact us to learn about current offers.",
    icon: "🏷️",
  },
  {
    id: 118,
    category: "Pricing",
    question: "Is there a cancellation fee?",
    answer:
      "We ask for at least 24 hours notice for cancellations. Late cancellations may incur a small fee to compensate our staff for lost time.",
    icon: "❌",
  },
  {
    id: 11,
    category: "Insurance",
    question: "Are your cleaning professionals insured?",
    answer:
      "Yes, all our cleaning professionals are fully insured and bonded. This provides protection for both our clients and our team members in the unlikely event of an accident or damage.",
    icon: "🛡️",
  },
  {
    id: 119,
    category: "Insurance",
    question: "What does your insurance cover?",
    answer:
      "Our insurance covers accidental damage or injury that may occur during a cleaning appointment, giving you peace of mind.",
    icon: "📄",
  },
  {
    id: 120,
    category: "Insurance",
    question: "Are you bonded as well as insured?",
    answer:
      "Yes, we are both insured and bonded, which means you are protected in the rare event of theft or damage.",
    icon: "🔒",
  },
  {
    id: 12,
    category: "Scheduling",
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes, we understand that plans change. Please give us at least 24 hours notice for rescheduling or cancellations to avoid any fees. You can contact us by phone, email, or through our website.",
    icon: "⏰",
  },
  {
    id: 121,
    category: "Scheduling",
    question: "What if I need to change my cleaning frequency?",
    answer:
      "You can adjust your cleaning schedule at any time. Just let us know your new preferences and we'll update your recurring appointments.",
    icon: "🔄",
  },
  {
    id: 122,
    category: "Scheduling",
    question: "Do you offer same-day or emergency cleaning?",
    answer:
      "We do our best to accommodate urgent requests. Please call us directly for same-day or emergency cleaning availability.",
    icon: "🚨",
  },
  {
    id: 13,
    category: "Preparation",
    question: "How should I prepare for your arrival?",
    answer:
      "Please ensure we have access to your home, put away valuable items, and pick up personal belongings. The more clutter-free your space is, the more thoroughly we can clean all surfaces.",
    icon: "📋",
  },
  {
    id: 123,
    category: "Preparation",
    question: "Do I need to provide any supplies or equipment?",
    answer:
      "No, we bring all necessary supplies and equipment. If you have a preferred product, let us know and we'll be happy to use it.",
    icon: "🧽",
  },
  {
    id: 124,
    category: "Preparation",
    question: "Should I secure my pets during cleaning?",
    answer:
      "For everyone's safety and comfort, we recommend securing pets in a separate area during cleaning. Let us know about your pets so we can take any necessary precautions.",
    icon: "��",
  },
  {
    id: 14,
    category: "Payment",
    question: "How do I pay for services?",
    answer:
      "We accept various payment methods including credit cards, debit cards, and online payments. Payment is typically collected after the cleaning is completed to ensure your satisfaction.",
    icon: "💳",
  },
  {
    id: 125,
    category: "Payment",
    question: "When is payment due?",
    answer:
      "Payment is due after the cleaning is completed and you are satisfied with the service.",
    icon: "⏱️",
  },
  {
    id: 126,
    category: "Payment",
    question: "Can I tip my cleaning professional?",
    answer:
      "Tips are never required but always appreciated. You can tip in cash or add a tip to your payment if you wish.",
    icon: "💵",
  },
  {
    id: 15,
    category: "Communication",
    question: "How do I communicate special requests or concerns?",
    answer:
      "You can communicate with us through phone, email, or our website contact form. We encourage open communication and welcome any special requests, feedback, or concerns you may have about our services.",
    icon: "📞",
  },
  {
    id: 127,
    category: "Communication",
    question: "How quickly do you respond to messages?",
    answer:
      "We strive to respond to all inquiries within one business day, often much sooner.",
    icon: "⏳",
  },
  {
    id: 128,
    category: "Communication",
    question: "Can I update my instructions after booking?",
    answer:
      "Yes, you can update your instructions or requests at any time before your appointment. Just contact us and we'll make the necessary adjustments.",
    icon: "✏️",
  },
  {
    id: 23,
    category: "Background",
    question: "Are your employees background checked?",
    answer:
      "Yes, all our cleaning professionals undergo thorough background checks and are carefully screened. We only hire trustworthy, reliable individuals who meet our high standards for professionalism and integrity.",
    icon: "✅",
  },
  {
    id: 129,
    category: "Background",
    question: "How do you select your cleaning staff?",
    answer:
      "We have a rigorous hiring process that includes interviews, reference checks, and background screening to ensure only the best join our team.",
    icon: "📝",
  },
  {
    id: 130,
    category: "Background",
    question: "Do you provide training for your staff?",
    answer:
      "Yes, all staff receive comprehensive training in cleaning techniques, safety, and customer service before working independently.",
    icon: "🎓",
  },
  {
    id: 16,
    category: "Services",
    question: "Do I need to provide cleaning supplies?",
    answer:
      "No, we bring all necessary cleaning supplies and equipment. We use eco-friendly, high-quality products that are safe for your family, pets, and the environment. If you have specific products you prefer, just let us know.",
    icon: "🧽",
  },
  {
    id: 17,
    category: "Services",
    question: "What areas do you clean?",
    answer:
      "We provide comprehensive cleaning for all areas of your home including kitchens, bathrooms, bedrooms, living areas, and common spaces. We can also accommodate special requests for specific areas or items.",
    icon: "🏡",
  },
  {
    id: 18,
    category: "Services",
    question: "What's included in a deep cleaning?",
    answer:
      "Deep cleaning includes everything in our standard cleaning plus detailed work on baseboards, light fixtures, inside appliances, cabinet fronts, window sills, and other areas not typically covered in regular maintenance cleaning.",
    icon: "🔍",
  },
  {
    id: 19,
    category: "Services",
    question: "Do you offer eco-friendly cleaning options?",
    answer:
      "Yes! We use environmentally safe, non-toxic cleaning products that are safe for your family and pets. All our standard products are eco-friendly, and we can accommodate specific green cleaning preferences.",
    icon: "🌱",
  },
  {
    id: 20,
    category: "Services",
    question: "Do you provide evening and weekend services?",
    answer:
      "Yes, we offer flexible scheduling including evenings and weekends to accommodate your busy lifestyle. Weekend and evening appointments may have different pricing - please inquire when booking.",
    icon: "🌙",
  },
  {
    id: 21,
    category: "Services",
    question: "Do you clean inside appliances?",
    answer:
      "Our deep cleaning service includes cleaning inside appliances like ovens, refrigerators, and microwaves. For regular maintenance cleaning, we clean the exterior. Interior appliance cleaning can be added to any service for an additional fee.",
    icon: "🔌",
  },
  {
    id: 22,
    category: "Services",
    question: "What cleaning products do you use?",
    answer:
      "We use professional-grade, eco-friendly cleaning products that are safe and effective. Our products include all-purpose cleaners, glass cleaners, degreasers, and specialized products for different surfaces and materials.",
    icon: "🧴",
  },
];

const categories = ["All", "General", "Services", "Quality", "Insurance", "Booking", "Pricing", "Scheduling", "Pets", "Preparation", "Payment", "Staff", "Background", "Communication", "Commercial", "Safety", "Estimates"];

// Interactive background elements
const AnimatedShape = ({ 
  size = 100, 
  color = "blue", 
  delay = 0, 
  duration = 8,
  position,
  shape = "circle"
}: { 
  size?: number; 
  color?: string; 
  delay?: number; 
  duration?: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  shape?: "circle" | "square" | "triangle" | "diamond";
}) => {
  const getShapeClass = () => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-lg rotate-45";
      case "triangle":
        return "rounded-sm";
      case "diamond":
        return "rounded-lg rotate-45";
      default:
        return "rounded-full";
    }
  };

  return (
    <motion.div
      className={`absolute ${getShapeClass()} opacity-20 blur-sm`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${color}, transparent)`,
        ...position,
      }}
      animate={{
        y: [-30, 30, -30],
        x: [-20, 20, -20],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

const GradientOrb = ({ 
  size = 200, 
  colors = ["#3B82F6", "#8B5CF6"], 
  delay = 0,
  position 
}: { 
  size?: number; 
  colors?: string[]; 
  delay?: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
}) => (
  <motion.div
    className="absolute rounded-full opacity-30 blur-xl"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${colors[0]}, ${colors[1]}, transparent)`,
      ...position,
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const FloatingParticle = ({ delay = 0, position }: { delay?: number; position: any }) => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
    style={position}
    animate={{
      y: [-100, -200],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
);

// Register GSAP plugins
if (typeof window !== "undefined" && gsap && ScrollTrigger && Flip) {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

// Only keep pure helpers here
const highlight = (text, matches) => {
  if (!matches || matches.length === 0) return text;
  let match = matches.find(m => m.key === 'question');
  if (!match) return text;
  let parts = [];
  let lastIndex = 0;
  match.indices.forEach(([start, end]: [number, number], i: number) => {
    parts.push(text.slice(lastIndex, start));
    parts.push(<span key={i} className="bg-yellow-200 rounded px-1 text-black font-bold">{text.slice(start, end + 1)}</span>);
    lastIndex = end + 1;
  });
  parts.push(text.slice(lastIndex));
  return parts;
};

export default function FAQPage() {
  // All hooks and Fuse.js go here:
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const fuse = new Fuse(faqs, {
    keys: ['question', 'answer'],
    threshold: 0.4,
    includeMatches: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(8);
    setOpenIndex(null);
  };

  const filteredResults = searchTerm.trim()
    ? fuse.search(searchTerm).map(result => ({ ...result.item, matches: result.matches }))
    : faqs.map(faq => ({ ...faq, matches: [] }));

  const visibleFaqs = filteredResults.slice(0, visibleCount);

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const faqContainerRef = useRef(null);
  const faqItemsRef = useRef([]);

  // 1. Group faqs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Animate FAQ questions on scroll into view
    if (faqItemsRef.current.length > 0) {
      gsap.from(faqItemsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: faqContainerRef.current,
          start: "top 80%",
        },
      });
    }
    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Back to Top button logic
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Interactive Background */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Gradient Orbs */}
          <GradientOrb 
            size={300} 
            colors={["#3B82F6", "#1D4ED8"]} 
            delay={0}
            position={{ top: "10%", left: "-10%" }}
          />
          <GradientOrb 
            size={250} 
            colors={["#8B5CF6", "#7C3AED"]} 
            delay={2}
            position={{ top: "50%", right: "-5%" }}
          />
          <GradientOrb 
            size={200} 
            colors={["#10B981", "#059669"]} 
            delay={4}
            position={{ bottom: "10%", left: "10%" }}
          />

          {/* Animated Geometric Shapes */}
          <AnimatedShape 
            size={80} 
            color="#3B82F6" 
            delay={0} 
            duration={8}
            position={{ top: "15%", left: "15%" }}
            shape="circle"
          />
          <AnimatedShape 
            size={60} 
            color="#8B5CF6" 
            delay={1} 
            duration={10}
            position={{ top: "25%", right: "20%" }}
            shape="square"
          />
          <AnimatedShape 
            size={70} 
            color="#10B981" 
            delay={2} 
            duration={12}
            position={{ bottom: "30%", right: "15%" }}
            shape="diamond"
          />
          <AnimatedShape 
            size={50} 
            color="#F59E0B" 
            delay={3} 
            duration={9}
            position={{ bottom: "40%", left: "20%" }}
            shape="circle"
          />
          <AnimatedShape 
            size={40} 
            color="#EF4444" 
            delay={4} 
            duration={7}
            position={{ top: "60%", left: "70%" }}
            shape="square"
          />

          {/* Floating Particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <FloatingParticle 
              key={i}
              delay={i * 0.5}
              position={{
                left: `${Math.random() * 100}%`,
                top: `${80 + Math.random() * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
              `,
            }}
            animate={{
              background: [
                `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 20% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 60% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)`,
                `radial-gradient(circle at 40% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 70% 40%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)`,
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Got Questions?
              <br />
              <span className="text-4xl md:text-6xl">We've Got Answers</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            
              Find everything you need to know about our cleaning services. From scheduling to pricing, we've covered all the essentials.
            </p>

            {/* Interactive Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`relative max-w-lg mx-auto transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your question..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Plus className="h-5 w-5 rotate-45" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* FAQ Accordion */}
          <div ref={faqContainerRef} className="space-y-4">
            <AnimatePresence>
              {visibleFaqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: visibleFaqs.indexOf(faq) * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    toggleCategory(faq.category);
                  }}
                >
                  <motion.button
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset group"
                    aria-expanded={openCategory === faq.category}
                    aria-controls={`faq-answer-${faq.category}`}
                    whileHover={{ scale: 1.12, boxShadow: '0 4px 24px rgba(59,130,246,0.15)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl">{faq.icon}</div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {highlight(faq.question, faq.matches)}
                        </div>
                      </div>
                    </div>
                    <div className={`ml-4 transition-all duration-300 ${openCategory === faq.category ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}>
                      {openCategory === faq.category ? (
                        <Minus className="h-6 w-6" />
                      ) : (
                        <Plus className="h-6 w-6" />
                      )}
                    </div>
                  </motion.button>
                  
                  <AnimatePresence initial={false}>
                    {openCategory === faq.category && (
                      <motion.div
                        className={`faq-answer faq-answer-${faq.category}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="pl-4 border-l-4 border-blue-200">
                          <div className="text-gray-600">
                            {highlight(faq.answer, faq.matches)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {visibleFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or category filter.</p>
              <button
                onClick={clearSearch}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our friendly team is here to help. Get in touch and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Send us a message
              </motion.a>
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                Call us now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      )}
    </main>
  );
} 