"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useAnimation } from "framer-motion";
import { HeroGeometric } from "./ui/shape-landing-hero";

const galleryImages = [
  {
    src: "/images/gallery/kitchenClean.png",
    alt: "Kitchen Cleaning",
    caption: "Professional Kitchen Cleaning",
    objectPosition: "center bottom"
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    alt: "Bathroom Cleaning",
    caption: "Bathroom Sanitization"
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    alt: "Office Cleaning",
    caption: "Commercial Office Cleaning"
  },
  {
    src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
    alt: "Living Room Cleaning",
    caption: "Living Room Transformation"
  },
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    alt: "Move-in Cleaning",
    caption: "Move-in/Move-out Cleaning"
  },
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
    alt: "Post-construction Cleaning",
    caption: "Post-construction Cleaning"
  }
];

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <section className="pt-8 pb-4 md:py-8 relative" id="gallery">
      {/* Background with HeroGeometric */}
      <HeroGeometric 
        className="absolute inset-0 z-0 h-full"
        hideContent={true}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/90 backdrop-blur-sm text-purple-800 shadow-md"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">
              Our Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 drop-shadow-sm"
          >
            See Our Cleaning Excellence
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl"
          >
            <p className="text-xl text-gray-700 leading-relaxed bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm">
              Browse through our gallery to see the quality of our <span className="font-semibold text-purple-700">cleaning services</span>. These images showcase our attention to detail and commitment to excellence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-16 aspect-h-9 relative h-80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  objectPosition={image.objectPosition || "center"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium text-lg">{image.caption}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div 
            className="relative max-w-4xl mx-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 relative h-[70vh]">
                <Image
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-white text-lg font-medium">
                {galleryImages[currentImageIndex].caption}
              </p>
              <p className="text-white/70 text-sm">
                {currentImageIndex + 1} of {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced bottom gradient rule with shimmer effect */}
      <div className="relative mt-8">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" 
          animate={{ 
            x: ["100%", "-100%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
} 