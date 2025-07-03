import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Home, Bath, Bed, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyDetailsProps {
  squareFootage: string;
  bedrooms: number;
  bathrooms: number;
  halfBaths: number;
  basement: string;
  onSquareFootageChange: (value: string) => void;
  onBedroomsChange: (value: number) => void;
  onBathroomsChange: (value: number) => void;
  onHalfBathsChange: (value: number) => void;
  onBasementChange: (value: string) => void;
}

interface CounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  icon: React.ElementType;
  description?: string;
}

const Counter: React.FC<CounterProps> = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 20, 
  icon: Icon,
  description 
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{label}</h3>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => value > min && onChange(value - 1)}
            disabled={value <= min}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </motion.button>
          
          <span className="w-8 text-center font-semibold text-lg">
            {value}
          </span>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => value < max && onChange(value + 1)}
            disabled={value >= max}
            className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

const squareFootageOptions = [
  { value: "500-999", label: "500 - 999 sq ft" },
  { value: "1000-1499", label: "1,000 - 1,499 sq ft" },
  { value: "1500-1999", label: "1,500 - 1,999 sq ft" },
  { value: "2000-2999", label: "2,000 - 2,999 sq ft" },
  { value: "3000-3999", label: "3,000 - 3,999 sq ft" },
  { value: "4000-4999", label: "4,000 - 4,999 sq ft" },
  { value: "5000-5999", label: "5,000 - 5,999 sq ft" },
  { value: "6000-6999", label: "6,000 - 6,999 sq ft" },
  { value: "7000-7999", label: "7,000 - 7,999 sq ft" },
  { value: "8000-8999", label: "8,000 - 8,999 sq ft" },
  { value: "9000-9999", label: "9,000 - 9,999 sq ft" },
];

const basementShortLabels: Record<string, string> = {
  none: 'No Basement',
  '500-no-bathroom': '500 sqft, no bath',
  '500-1000-no-bathroom': '500-1000 sqft, no bath',
  '1000+-no-bathroom': '1000+ sqft, no bath',
  '500-with-bathroom': '500 sqft, bath',
  '500-1000-with-bathroom': '500-1000 sqft, bath',
  '1000+-with-bathroom': '1000+ sqft, bath',
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  squareFootage,
  bedrooms,
  bathrooms,
  halfBaths,
  basement,
  onSquareFootageChange,
  onBedroomsChange,
  onBathroomsChange,
  onHalfBathsChange,
  onBasementChange,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tell Us About Your Property
        </h2>
        <p className="text-lg text-gray-600">
          Help us provide an accurate estimate
        </p>
      </div>

      <div className="space-y-6">
        {/* Square Footage Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Square className="w-5 h-5 text-purple-600" />
                <span>Property Size</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={squareFootage} onValueChange={onSquareFootageChange}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select your property size" />
                </SelectTrigger>
                <SelectContent className="bg-white" side="bottom" align="start" sideOffset={4}>
                  {squareFootageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="font-medium">{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Room Counters */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Counter
              label="Bedrooms"
              value={bedrooms}
              onChange={onBedroomsChange}
              min={0}
              max={10}
              icon={Bed}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Counter
              label="Full Bathrooms"
              value={bathrooms}
              onChange={onBathroomsChange}
              min={1}
              max={10}
              icon={Bath}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Counter
              label="Half Bathrooms"
              value={halfBaths}
              onChange={onHalfBathsChange}
              min={0}
              max={5}
              icon={Bath}
            />
          </motion.div>

          {/* Basement Option as Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Basement</h3>
                  </div>
                </div>
                <Select value={basement} onValueChange={onBasementChange}>
                  <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="No Basement">
                      {basement && basementShortLabels[basement]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white" side="bottom" align="start" sideOffset={4}>
                    <SelectItem value="none">No Basement</SelectItem>
                    <SelectItem value="500-no-bathroom">Basement (500 sqft, no bathroom) +$30</SelectItem>
                    <SelectItem value="500-1000-no-bathroom">Basement (500-1000 sqft, no bathroom) +$40</SelectItem>
                    <SelectItem value="1000+-no-bathroom">Basement (1000+ sqft, no bathroom) +$50</SelectItem>
                    <SelectItem value="500-with-bathroom">Basement (500 sqft, with bathroom) +$70</SelectItem>
                    <SelectItem value="500-1000-with-bathroom">Basement (500-1000 sqft, with bathroom) +$80</SelectItem>
                    <SelectItem value="1000+-with-bathroom">Basement (1000+ sqft, with bathroom) +$90</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Property Size Visual Indicator */}
        {squareFootage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-purple-50 border border-purple-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Square className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-purple-900">Property Size Selected</p>
                <p className="text-purple-700">
                  {squareFootageOptions.find(opt => opt.value === squareFootage)?.label}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 