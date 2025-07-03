import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold relative z-10
                  ${currentStep > step.id 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                      ? 'bg-purple-600 text-white ring-4 ring-purple-200' 
                      : 'bg-gray-200 text-gray-500'
                  }
                  transition-all duration-300
                `}
              >
                {currentStep > step.id ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.id
                )}
              </motion.div>
              
              {/* Step Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="mt-3 text-center"
              >
                <p className={`
                  text-sm font-medium
                  ${currentStep >= step.id ? 'text-purple-700' : 'text-gray-500'}
                `}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 mt-1 max-w-20">
                    {step.description}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: currentStep > step.id ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full bg-purple-600"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 