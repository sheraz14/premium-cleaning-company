"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, FileText, Clock, Users } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon?: React.ComponentType<any>;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQAccordion({ items, title, subtitle }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([items[0]?.id]));

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
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
        className="space-y-4"
      >
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id);

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300">
                <motion.button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-xl ${
                        index % 4 === 0 ? 'bg-emerald-100 text-emerald-600' :
                        index % 4 === 1 ? 'bg-purple-100 text-purple-600' :
                        index % 4 === 2 ? 'bg-indigo-100 text-indigo-600' :
                        'bg-sky-100 text-sky-600'
                      }`}>
                        {item.icon ? (
                          <item.icon className="h-6 w-6" />
                        ) : (
                          <FileText className="h-6 w-6" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
                        {item.question}
                      </h3>
                      {item.category && (
                        <span className="text-sm text-gray-500 mt-1">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1],
                          },
                          opacity: {
                            duration: 0.3,
                            delay: 0.1,
                          },
                        },
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-l-4 border-purple-400 pl-6 ml-10">
                          <div 
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
