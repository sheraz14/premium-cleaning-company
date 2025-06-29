"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  SparklesIcon, 
  CheckCircle,
  Home,
  Building2,
  MoveRight,
  Brush,
  Hammer,
  Bed,
  Key,
  Building,
  Leaf,
  ArrowRight
} from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";

import Link from "next/link";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import ScrollTrigger from "../../gsap-public/src/ScrollTrigger.js";
import SplitText from "../../gsap-public/src/SplitText.js";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  href: string;
}

const services: Service[] = [
  {
    icon: Home,
    title: "House Cleaning",
    description: "Our comprehensive house cleaning service transforms your living space into a spotless sanctuary. We meticulously clean every corner and surface, paying special attention to high-touch areas and hard-to-reach spots. Our team uses premium eco-friendly products that effectively eliminate dirt, dust, and allergens while being safe for your family and pets.",
    imageUrl: "/images/house-cleaning.jpg",
    color: "from-blue-500 to-cyan-500",
    href: "/house-cleaning-services"
  },
  {
    icon: Building2,
    title: "Condo and Apartment Cleaning",
    description: "Our specialized condo and apartment cleaning services are tailored to the unique needs of apartment living. We understand the importance of maintaining pristine common areas and private spaces in multi-unit buildings. Our team works efficiently and quietly, respecting your neighbors while delivering exceptional cleaning results that make your condo shine from entryway to balcony.",
    imageUrl: "/images/condo.jpg",
    color: "from-purple-500 to-pink-500",
    href: "/condo-and-apartment-cleaning-services"
  },
  {
    icon: MoveRight,
    title: "Move In/Out Cleaning",
    description: "Make your transition smooth and stress-free with our comprehensive move in/out cleaning service. We go beyond standard cleaning to ensure every surface is immaculately prepared for new occupants or to help you secure your deposit. Our thorough cleaning includes appliances, cabinets, baseboards, and all those easily overlooked areas that make a significant difference.",
    imageUrl: "/images/move-in-out.jpg",
    color: "from-emerald-500 to-teal-500",
    href: "/move-in-out-cleaning-services"
  },
  {
    icon: Brush,
    title: "Deep Cleaning",
    description: "Our intensive deep cleaning service tackles the stubborn grime, buildup, and dirt that regular cleaning can't address. We methodically work through your space, sanitizing and rejuvenating surfaces that haven't seen proper attention in months. From scrubbing grout lines to degreasing kitchen surfaces and sanitizing overlooked areas, our deep cleaning restores your space to its pristine condition.",
    imageUrl: "/images/deep-cleaning.jpg",
    color: "from-orange-500 to-amber-500",
    href: "/deep-cleaning-services"
  },
  {
    icon: Hammer,
    title: "Post Renovation Clean",
    description: "Transform your newly renovated space from a construction zone to a pristine, move-in ready environment with our specialized post-renovation cleaning. We meticulously remove construction dust from every surface, including inside cabinets and light fixtures. Our service eliminates the fine particles that conventional cleaning misses, protecting your investment and ensuring a healthy living environment.",
    imageUrl: "/images/renovation.jpg",
    color: "from-red-500 to-rose-500",
    href: "/post-renovation-cleaning-services"
  },
  {
    icon: Bed,
    title: "AirBnB Cleaning",
    description: "Maximize your rental property's potential with our specialized AirBnB cleaning service. We understand the quick turnarounds needed and the importance of impeccable cleanliness for maintaining high ratings. Our thorough cleaning process ensures your space is perfectly prepared for new guests, with special attention to bathrooms, kitchens, and linens. We can also restock essentials and arrange amenities for a welcoming presentation.",
    imageUrl: "/images/airbnb.jpg",
    color: "from-indigo-500 to-violet-500",
    href: "/airbnb-cleaning-services"
  },
  {
    icon: Key,
    title: "Rental Cleaning",
    description: "Keep your rental property in excellent condition with our dedicated rental cleaning service. We offer regular scheduled cleanings that maintain the property's value and appeal between tenants. Our comprehensive approach addresses all areas from kitchens and bathrooms to living spaces and outdoor areas. We pay special attention to high-wear areas and potential problem spots to prevent maintenance issues.",
    imageUrl: "/images/rental-cleaning.jpg",
    color: "from-green-500 to-emerald-500",
    href: "/rental-cleaning-services"
  },
  {
    icon: Building,
    title: "Commercial and Office Cleaning",
    description: "Create a productive and healthy workplace with our professional commercial cleaning services. We understand that clean environments foster productivity and make a positive impression on clients and employees alike. Our commercial team works after hours or on your schedule to minimize disruption, providing comprehensive sanitization of workstations, meeting rooms, break areas, and restrooms with special attention to high-touch surfaces.",
    imageUrl: "/images/commercial.jpg",
    color: "from-blue-600 to-indigo-600",
    href: "/commercial-cleaning-services"
  },
  {
    icon: Leaf,
    title: "Eco Friendly and Green Cleaning",
    description: "Experience premium cleaning that's better for your health and the planet with our eco-friendly service. We exclusively use certified green cleaning products that effectively eliminate dirt and germs without harmful chemicals. Our sustainable practices include microfiber technology that reduces waste and water usage while capturing more dust and allergens than conventional methods, leaving your space naturally clean and fresh.",
    imageUrl: "/images/eco-friendly.jpg",
    color: "from-green-400 to-emerald-400",
    href: "/eco-friendly-cleaning-services"
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(card, { 
        opacity: 0, 
        y: 100, 
        scale: 0.8,
        rotationY: -15
      });

      // Reveal animation with ScrollTrigger
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.1
      });

      // Continuous subtle floating animation
      gsap.to(card, {
        y: "random(-8, 8)",
        duration: "random(4, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: "random(0, 2)"
      });

    }, card);

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      scale: 1.05,
      y: -15,
      rotationY: 3,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(card.querySelector('.service-image'), {
      scale: 1.15,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(card.querySelector('.service-icon'), {
      scale: 1.2,
      rotation: 360,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

    gsap.to(card.querySelector('.view-details-btn'), {
      scale: 1.1,
      x: 10,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      y: 0,
      rotationY: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(card.querySelector('.service-image'), {
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(card.querySelector('.service-icon'), {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(card.querySelector('.view-details-btn'), {
      scale: 1,
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <Link href={service.href}>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block h-96 w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg"
      >
        {/* Background Image */}
        <Image 
          src={service.imageUrl} 
          alt={service.title} 
          layout="fill" 
          className="service-image absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent`} />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-end p-6 text-white">
          <div className="mb-4">
            <div
              className={`service-icon relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-md`}
            >
              <service.icon className="h-6 w-6" />
            </div>
          </div>
          <h3 className="mb-2 text-2xl font-bold">{service.title}</h3>
          <p className="mb-4 text-gray-200 line-clamp-2">{service.description}</p>
          
          {/* View Details Button */}
          <div 
            className="view-details-btn inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-semibold w-fit"
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".gsap-services-badge", { opacity: 0, y: 50, scale: 0.8 });
      gsap.set(".gsap-services-heading", { opacity: 0, y: 50 });
      gsap.set(".gsap-services-description", { opacity: 0, y: 30 });

      // Create timeline for header animations
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation
      headerTimeline.to(".gsap-services-badge", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.4)"
      });

      // Heading with SplitText
      if (headingRef.current) {
        const headingSplit = new SplitText(headingRef.current, { type: "words,chars" });
        
        gsap.set(headingSplit.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90
        });

        headerTimeline.to(headingSplit.chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.8,
            from: "start"
          }
        }, "-=0.3");
      }

      // Description animation
      headerTimeline.to(".gsap-services-description", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Sparkle icon continuous animation
      gsap.to(".sparkle-icon", {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-32 bg-gradient-to-br from-gray-50 to-white">
      {/* Container for content */}
      <div className="container relative mx-auto px-4 pb-16">
        {/* Header */}
        <div className="mb-18 text-center">
          <div
            ref={badgeRef}
            className="gsap-services-badge mt-8 inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
          >
            <Sparkles className="sparkle-icon h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Our Services
            </span>
          </div>

          <h2 ref={headingRef} className="gsap-how-heading text-3xl md:text-5xl font-bold mb-4 text-purple-700 mt-4 mb-8">
          <span className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #7c3aed, #db2777)' }}>
            Professional Cleaning Solutions
            </span>
          </h2>

          <div
            className="gsap-services-description mx-auto mt-6 max-w-2xl mb-10"
          >
            <p ref={descriptionRef} className="text-xl text-gray-700 leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
              Discover our comprehensive range of <span className="font-semibold text-purple-700">professional cleaning services</span> meticulously crafted to transform your spaces and exceed your expectations
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}