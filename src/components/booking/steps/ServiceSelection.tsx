import React from 'react';
import { motion } from 'framer-motion';
import { Home, Clock, Building, Star, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Service {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
  estimatedDuration?: string;
  popular?: boolean;
  icon?: React.ElementType;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  'house-package': Home,
  'house-hourly': Clock,
  'office': Building,
};

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  services,
  selectedService,
  onServiceSelect,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Cleaning Service
        </h2>
        <p className="text-lg text-gray-600">
          Select the service that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = serviceIcons[service.id] || Home;
          const isSelected = selectedService === service.id;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                className={`
                  cursor-pointer transition-all duration-300 h-full
                  ${isSelected 
                    ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-300' 
                    : 'hover:shadow-lg border-gray-200 hover:border-purple-300'
                  }
                `}
                onClick={() => onServiceSelect(service.id)}
              >
                <CardContent className="p-6">
                  {/* Service Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${isSelected ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'}
                    `}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Service Info */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {service.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4">
                    {service.id === 'office' ? (
                      <>
                        <span className="text-2xl font-bold text-purple-600">from $0.15</span>
                        <span className="text-gray-500 ml-1">/sqft</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-purple-600">${service.basePrice}</span>
                        <span className="text-gray-500 ml-1">{service.id === 'house-hourly' ? '/hour' : ' starting'}</span>
                      </>
                    )}
                  </div>

                  {/* Duration */}
                  {service.estimatedDuration && (
                    <div className="mb-4 text-sm text-gray-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {service.estimatedDuration}
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-sm text-purple-600 font-medium">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  {/* Select Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-200
                      ${isSelected
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                      }
                    `}
                  >
                    {isSelected ? 'Selected' : 'Select Service'}
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}; 