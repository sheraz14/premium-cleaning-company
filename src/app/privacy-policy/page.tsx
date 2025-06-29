"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "../../../gsap-public/src/ScrollTrigger.js";
import { useLayoutEffect, useRef, useState } from "react";
import { 
  Shield, 
  Eye, 
  Lock, 
  UserCheck, 
  Database, 
  Phone, 
  Mail, 
  MapPin,
  Cookie,
  Globe,
  FileText,
  AlertCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Star,
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Component
function MagneticButton({ children, className = "", ...props }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const y = useRef(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div ref={ref} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </div>
  );
}

// Animated Accordion Item
function AccordionItem({ item, index, isOpen, onToggle }: any) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Set initial state
    gsap.set(content, { height: 0, opacity: 0 });

    if (isOpen) {
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);

  // Set initial state on mount
  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    gsap.set(content, { height: 0, opacity: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm hover:from-white/10 hover:to-white/5 transition-all duration-300"
      data-reveal="up"
      data-delay={index * 0.1}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient} shadow-lg`}>
            <item.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-purple-200 text-sm">{item.category}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6 text-purple-300" />
        </motion.div>
      </motion.button>
      
      <div
        ref={contentRef}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 space-y-4">
          <div 
            className="text-gray-200 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Floating Elements Component
function FloatingElements() {
  const elementsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const elements = elementsRef.current?.children;
    if (!elements) return;

    Array.from(elements).forEach((element, index) => {
      gsap.to(element, {
        y: (index % 2 === 0 ? 1 : -1) * 20,
        x: (index % 3 === 0 ? 1 : -1) * 15,
        rotation: (index % 4 - 2) * 3,
        duration: 3 + index * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });
  }, []);

  return (
    <div ref={elementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg rotate-45" />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-lg" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl rotate-12" />
      <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-violet-500/30 to-purple-500/30 blur-sm" />
      <div className="absolute top-1/3 right-1/3 w-14 h-14 rounded-lg bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-lg rotate-45" />
    </div>
  );
}

// Privacy Policy Data
const privacyPolicyData = [
  {
    id: "information-collection",
    title: "Information We Collect",
    category: "Data Collection",
    icon: Database,
    gradient: "from-blue-500 to-indigo-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">Personal Information</h4>
      <p class="mb-4">We collect personal information that you voluntarily provide to us when you:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Book our cleaning services</li>
        <li>Create an account on our website</li>
        <li>Contact us for inquiries or support</li>
        <li>Subscribe to our newsletter</li>
        <li>Fill out feedback forms</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Types of Personal Data</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
        <li><strong>Service Information:</strong> Property details, cleaning preferences, special instructions</li>
        <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely)</li>
        <li><strong>Communication Records:</strong> Messages, feedback, and support interactions</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Automatically Collected Information</h4>
      <ul class="list-disc list-inside space-y-2">
        <li>Device information and browser type</li>
        <li>IP address and location data</li>
        <li>Website usage patterns and analytics</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>
    `
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    category: "Data Usage",
    icon: Settings,
    gradient: "from-emerald-500 to-teal-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">Primary Uses</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Service Delivery:</strong> Schedule and provide cleaning services</li>
        <li><strong>Communication:</strong> Send booking confirmations, updates, and service-related messages</li>
        <li><strong>Payment Processing:</strong> Process payments and manage billing</li>
        <li><strong>Customer Support:</strong> Respond to inquiries and resolve issues</li>
        <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance our services</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Marketing Communications</h4>
      <p class="mb-4">With your consent, we may use your information to:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Send promotional offers and cleaning tips</li>
        <li>Notify you about new services and features</li>
        <li>Share relevant content through our newsletter</li>
      </ul>
      
      <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
        <p class="text-sm"><strong>Your Choice:</strong> You can opt-out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.</p>
      </div>
    `
  },
  {
    id: "information-sharing",
    title: "Information Sharing & Disclosure",
    category: "Data Sharing",
    icon: UserCheck,
    gradient: "from-orange-500 to-red-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">We Never Sell Your Data</h4>
      <p class="mb-4">We do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>
      
      <h4 class="text-lg font-semibold text-white mb-3">Limited Sharing Scenarios</h4>
      <p class="mb-4">We may share your information only in these specific circumstances:</p>
      
      <ul class="list-disc list-inside space-y-3 mb-4">
        <li><strong>Service Providers:</strong> Trusted third-party companies that help us operate our business (payment processors, scheduling software, background check services)</li>
        <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
        <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our customers and employees</li>
        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with your consent)</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Service Provider Agreements</h4>
      <p class="mb-4">All third-party service providers are contractually required to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Maintain the confidentiality of your information</li>
        <li>Use your data solely for specified purposes</li>
        <li>Implement appropriate security measures</li>
        <li>Delete or return data when services end</li>
      </ul>
    `
  },
  {
    id: "data-security",
    title: "Data Security & Protection",
    category: "Security Measures",
    icon: Lock,
    gradient: "from-purple-500 to-violet-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">Security Infrastructure</h4>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Encryption:</strong> All sensitive data is encrypted in transit and at rest</li>
        <li><strong>Secure Servers:</strong> Data stored on secure, monitored servers with restricted access</li>
        <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
        <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
        <li><strong>Staff Training:</strong> Regular privacy and security training for all employees</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Payment Security</h4>
      <p class="mb-4">Payment information is processed using industry-standard security measures:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>PCI DSS compliance for payment processing</li>
        <li>Secure payment gateways with encryption</li>
        <li>No storage of complete credit card numbers</li>
        <li>Tokenization for recurring payments</li>
      </ul>
      
      <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-4 rounded-lg">
        <p class="text-sm"><strong>Important:</strong> While we implement robust security measures, no system is 100% secure. We continuously monitor and improve our security practices to protect your information.</p>
      </div>
    `
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking Technologies",
    category: "Website Analytics",
    icon: Cookie,
    gradient: "from-amber-500 to-yellow-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">Types of Cookies We Use</h4>
      
      <div class="space-y-4 mb-4">
        <div class="border-l-4 border-blue-500 pl-4">
          <h5 class="font-semibold text-blue-300">Essential Cookies</h5>
          <p class="text-sm">Required for website functionality, cannot be disabled</p>
        </div>
        
        <div class="border-l-4 border-green-500 pl-4">
          <h5 class="font-semibold text-green-300">Performance Cookies</h5>
          <p class="text-sm">Help us understand how visitors use our website</p>
        </div>
        
        <div class="border-l-4 border-purple-500 pl-4">
          <h5 class="font-semibold text-purple-300">Functional Cookies</h5>
          <p class="text-sm">Remember your preferences and settings</p>
        </div>
        
        <div class="border-l-4 border-orange-500 pl-4">
          <h5 class="font-semibold text-orange-300">Marketing Cookies</h5>
          <p class="text-sm">Used to deliver relevant advertisements (with consent)</p>
        </div>
      </div>
      
      <h4 class="text-lg font-semibold text-white mb-3">Third-Party Analytics</h4>
      <p class="mb-4">We use Google Analytics and similar services to understand website usage. These services may collect:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Pages visited and time spent on site</li>
        <li>Traffic sources and referral information</li>
        <li>Device and browser information</li>
        <li>General geographic location</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Managing Cookies</h4>
      <p class="mb-2">You can control cookies through:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Browser settings to block or delete cookies</li>
        <li>Our cookie consent banner preferences</li>
        <li>Opt-out tools provided by analytics services</li>
        <li>Do Not Track browser settings (where supported)</li>
      </ul>
    `
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    category: "User Rights",
    icon: Shield,
    gradient: "from-cyan-500 to-blue-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">Access & Control</h4>
      <p class="mb-4">You have the following rights regarding your personal information:</p>
      
      <div class="grid gap-4 mb-4">
        <div class="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
          <div>
            <h5 class="font-semibold text-white">Right to Access</h5>
            <p class="text-sm">Request a copy of the personal information we hold about you</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
          <div>
            <h5 class="font-semibold text-white">Right to Correct</h5>
            <p class="text-sm">Update or correct inaccurate or incomplete information</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
          <div>
            <h5 class="font-semibold text-white">Right to Delete</h5>
            <p class="text-sm">Request deletion of your personal information (subject to legal requirements)</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
          <div>
            <h5 class="font-semibold text-white">Right to Portability</h5>
            <p class="text-sm">Receive your data in a structured, machine-readable format</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 mt-1 text-green-400 flex-shrink-0" />
          <div>
            <h5 class="font-semibold text-white">Right to Restrict</h5>
            <p class="text-sm">Limit how we process your personal information</p>
          </div>
        </div>
      </div>
      
      <h4 class="text-lg font-semibold text-white mb-3">How to Exercise Your Rights</h4>
      <p class="mb-4">To exercise any of these rights, please contact us:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Email: privacy@cleaningcompany.com</li>
        <li>Phone: (555) 123-4567</li>
        <li>Online form: Submit a privacy request through our website</li>
      </ul>
      
      <div class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
        <p class="text-sm"><strong>Response Time:</strong> We will respond to your request within 30 days. For complex requests, we may extend this period by an additional 60 days with notification.</p>
      </div>
    `
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    category: "Age Restrictions",
    icon: UserCheck,
    gradient: "from-pink-500 to-rose-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">Age Requirement</h4>
      <p class="mb-4">Our services are intended for adults aged 18 and older. We do not knowingly collect personal information from children under 18 years of age.</p>
      
      <h4 class="text-lg font-semibold text-white mb-3">Parental Notice</h4>
      <p class="mb-4">If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately at:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Email: privacy@cleaningcompany.com</li>
        <li>Phone: (555) 123-4567</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Data Deletion</h4>
      <p class="mb-4">If we learn that we have inadvertently collected personal information from a child under 18, we will:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Delete the information from our systems immediately</li>
        <li>Take steps to prevent future collection</li>
        <li>Notify the parent or guardian of the deletion</li>
        <li>Implement additional safeguards if necessary</li>
      </ul>
    `
  },
  {
    id: "policy-updates",
    title: "Policy Updates & Changes",
    category: "Policy Management",
    icon: FileText,
    gradient: "from-indigo-500 to-purple-600",
    content: `
      <h4 class="text-lg font-semibold text-white mb-3">How We Update This Policy</h4>
      <p class="mb-4">We may update this Privacy Policy from time to time to reflect:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Changes in our business practices</li>
        <li>New legal or regulatory requirements</li>
        <li>Updates to our technology and systems</li>
        <li>Feedback from customers and stakeholders</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Notification of Changes</h4>
      <p class="mb-4">When we make significant changes to this policy, we will:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Email registered users about the changes</li>
        <li>Display a prominent notice on our website</li>
        <li>Update the "Last Updated" date at the top of this policy</li>
        <li>Provide a summary of key changes</li>
      </ul>
      
      <h4 class="text-lg font-semibold text-white mb-3">Your Continued Use</h4>
      <p class="mb-4">By continuing to use our services after policy updates, you acknowledge and agree to the revised terms. If you disagree with changes, you may:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Discontinue using our services</li>
        <li>Contact us to discuss your concerns</li>
        <li>Request deletion of your personal information</li>
      </ul>
      
      <div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg">
        <p class="text-sm"><strong>Policy Version:</strong> This policy was last updated on January 15, 2024. Version 2.1</p>
      </div>
    `
  }
];

export default function PrivacyPolicyPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      const tl = gsap.timeline();
      
      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");

      // Scroll-triggered animations
      gsap.utils.toArray("[data-reveal]").forEach((element: any) => {
        const direction = element.getAttribute("data-reveal");
        const delay = parseFloat(element.getAttribute("data-delay")) || 0;
        
        let fromVars: any = { opacity: 0 };
        
        switch(direction) {
          case "up":
            fromVars.y = 100;
            break;
          case "down":
            fromVars.y = -100;
            break;
          case "left":
            fromVars.x = 100;
            break;
          case "right":
            fromVars.x = -100;
            break;
          case "scale":
            fromVars.scale = 0.8;
            break;
        }

        gsap.fromTo(element, fromVars, {
          ...Object.keys(fromVars).reduce((acc, key) => {
            if (key !== "opacity") acc[key] = 0;
            return acc;
          }, {} as any),
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Stats counter animation
      gsap.utils.toArray(".stat-number").forEach((element: any) => {
        const endValue = parseInt(element.textContent);
        gsap.fromTo(element, 
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSectionToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <FloatingElements />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="hero-icon mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </motion.div>
          
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Privacy
            </span>
            {" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-purple-200 mb-6 font-light">
            Your privacy is our priority
          </p>
          
          <p className="hero-description text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm">
                View Privacy Rights
              </button>
            </MagneticButton>
            <MagneticButton>
              <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Contact Privacy Team
              </button>
            </MagneticButton>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <section className="py-20 px-4 relative z-10" data-reveal="up">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: 100, label: "Data Security", suffix: "%" },
              { number: 24, label: "Privacy Protection", suffix: "/7" },
              { number: 30, label: "Response Time", suffix: " days" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="stat-number">{stat.number}</span>
                  <span className="text-purple-400">{stat.suffix}</span>
                </div>
                <p className="text-purple-200 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-reveal="up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Details</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive information about how we handle your personal data
            </p>
          </motion.div>

          <div className="space-y-6">
            {privacyPolicyData.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openSection === item.id}
                onToggle={() => handleSectionToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 relative z-10" data-reveal="up">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
          >
            <Eye className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Privacy Questions?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our privacy team is here to help. Contact us with any questions about how we handle your personal information.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Mail, label: "Email", value: "privacy@cleaningcompany.com", gradient: "from-blue-500 to-indigo-600" },
                { icon: Phone, label: "Phone", value: "(555) 123-4567", gradient: "from-emerald-500 to-teal-600" },
                { icon: Clock, label: "Response", value: "Within 24 hours", gradient: "from-purple-500 to-violet-600" }
              ].map((contact, index) => (
                <MagneticButton key={index}>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 transition-all duration-300 border border-white/10">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${contact.gradient} flex items-center justify-center mx-auto mb-4`}>
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{contact.label}</h3>
                    <p className="text-sm text-purple-200">{contact.value}</p>
                  </div>
                </MagneticButton>
              ))}
            </div>

            <MagneticButton>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                Contact Privacy Team
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Last updated footer */}
      <footer className="py-8 px-4 text-center text-gray-400 text-sm border-t border-white/10">
        <p>Last updated: January 15, 2024 | Version 2.1</p>
      </footer>
    </div>
  );
} 