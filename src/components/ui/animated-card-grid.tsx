"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardOption {
  id: string;
  icon: ReactNode;
  name: string;
  description?: string;
  href?: string;
  category?: string;
}

interface AnimatedCardGridProps {
  options: CardOption[];
  columns?: number;
  onSelect?: (option: CardOption) => void;
  title?: string;
  subtitle?: string;
}

export function AnimatedCardGrid({ 
  options, 
  columns = 4, 
  onSelect,
  title,
  subtitle 
}: AnimatedCardGridProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const handleCardClick = (option: CardOption) => {
    if (option.href) {
      window.location.href = option.href;
      return;
    }
    
    setSelectedCard(option.id);
    onSelect?.(option);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-4 max-w-6xl mx-auto`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredCard(option.id)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative group cursor-pointer"
            onClick={() => handleCardClick(option)}
          >
            <Card className={cn(
              "h-32 w-full transition-all duration-300",
              "bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg",
              "hover:shadow-xl hover:bg-white/90",
              hoveredCard === option.id && "border-purple-200",
              selectedCard === option.id && "ring-2 ring-purple-400 ring-opacity-60"
            )}>
              <div className="flex items-center h-full px-6 space-x-4">
                <motion.div 
                  className={`text-3xl flex-shrink-0 transition-all duration-200 ${
                    index % 4 === 0 ? 'text-emerald-500' :
                    index % 4 === 1 ? 'text-purple-500' :
                    index % 4 === 2 ? 'text-indigo-500' :
                    'text-sky-500'
                  }`}
                  animate={{ 
                    rotate: hoveredCard === option.id ? [0, -10, 10, 0] : 0,
                    scale: hoveredCard === option.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {option.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-gray-800">
                    {option.name}
                  </h3>
                  {option.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700">
                      {option.description}
                    </p>
                  )}
                  {option.category && (
                    <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1">
                      {option.category}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-emerald-50/20 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 