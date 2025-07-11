import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Hammer,
  Box,
  PawPrint,
  Bed,
  Refrigerator,
  Microwave,
  Utensils,
  Blinds,
  Droplets,
  Sheet,
  Info,
  CheckCircle,
  Loader2,
  Layers,
  Shield,
  Star,
  Calendar,
  Users,
  Award,
  Leaf,
  HeartHandshake,
  Sparkle,
} from 'lucide-react';
import Image from 'next/image';

interface AddOn {
  id: string;
  label: string;
  price: number;
  quantityType?: 'single' | 'multi';
  min?: number;
  max?: number;
  group?: string;
  note?: string;
  icon: React.ReactNode;
}

export const addOns: AddOn[] = [
  // Packages
  { id: 'deep-clean-package', label: 'Deep Clean Package', price: 80, quantityType: 'single', group: 'packages', icon: <Sparkles className="w-8 h-8 text-yellow-500" /> },
  { id: 'move-in-out-package', label: 'Move In/Out Cleaning Package', price: 140, quantityType: 'single', group: 'packages', icon: <Box className="w-8 h-8 text-blue-500" /> },
  { id: 'renovation-cleaning-package', label: 'Post Renovation Cleaning Package', price: 170, quantityType: 'single', group: 'packages', icon: <Hammer className="w-8 h-8 text-red-500" /> },

  // Windows & Blinds
  { id: 'inside-windows-6', label: 'Inside Windows with Tracks (up to 6)', price: 30, quantityType: 'single', group: 'windows', icon: <Image src="/window.svg" alt="Window" width={32} height={32} className="w-8 h-8" /> },
  { id: 'inside-windows-12', label: 'Inside Windows with Tracks (up to 12)', price: 60, quantityType: 'single', group: 'windows', icon: <Image src="/window.svg" alt="Window" width={32} height={32} className="w-8 h-8 opacity-80" /> },
  { id: 'inside-windows-24', label: 'Inside Windows with Tracks (up to 24)', price: 80, quantityType: 'single', group: 'windows', icon: <Image src="/window.svg" alt="Window" width={32} height={32} className="w-8 h-8 opacity-60" /> },
  { id: 'blinds', label: 'Blinds (per window)', price: 5, quantityType: 'multi', min: 0, max: 20, group: 'windows', icon: <Blinds className="w-8 h-8 text-blue-400" /> },

  // Kitchen
  { id: 'inside-fridge', label: 'Inside Fridge', price: 25, quantityType: 'multi', min: 0, max: 5, group: 'kitchen', icon: <Refrigerator className="w-8 h-8 text-blue-500" /> },
  { id: 'inside-oven', label: 'Inside Oven', price: 25, quantityType: 'multi', min: 0, max: 5, group: 'kitchen', icon: <Microwave className="w-8 h-8 text-orange-500" /> },
  { id: 'inside-cabinets', label: 'Inside Cabinets', price: 30, quantityType: 'single', group: 'kitchen', icon: <Utensils className="w-8 h-8 text-amber-700" /> },
  { id: 'load-dishwasher', label: 'Load Dishwasher', price: 15, quantityType: 'single', group: 'kitchen', icon: <Droplets className="w-8 h-8 text-blue-400" /> },

  { id: 'change-bed-sheets', label: 'Change Bed Sheets + Load Laundry', price: 20, quantityType: 'multi', min: 0, max: 10, group: 'laundry', icon: <Sheet className="w-8 h-8 text-pink-400" /> },

  // Pets
  { id: 'home-with-pets', label: 'Home with Pets', price: 30, quantityType: 'single', group: 'pets', note: 'Extra cleaning is required for homes with pets.', icon: <PawPrint className="w-8 h-8 text-amber-700" /> },
];

export const officeAddOns: AddOn[] = [
  { id: 'carpet-cleaning', label: 'Carpet Cleaning', price: 0.35, quantityType: 'single', group: 'office', icon: <Layers className="w-8 h-8 text-blue-500" /> },
  { id: 'window-washing', label: 'Window Washing', price: 0.75, quantityType: 'single', group: 'office', icon: <Sparkle className="w-8 h-8 text-yellow-500" /> },
  { id: 'floor-waxing', label: 'Floor Waxing/Buffing', price: 0.40, quantityType: 'single', group: 'office', icon: <Star className="w-8 h-8 text-orange-500" /> },
  { id: 'restroom-deep-clean', label: 'Restroom Deep Clean', price: 75, quantityType: 'multi', min: 0, max: 10, group: 'office', icon: <Shield className="w-8 h-8 text-green-600" /> },
  { id: 'eco-friendly', label: 'Eco-Friendly Products', price: 0.05, quantityType: 'single', group: 'office', icon: <Leaf className="w-8 h-8 text-green-400" /> },
];

interface CustomizeCleaningProps {
  selectedAddOns: { [id: string]: number };
  onChangeAddOn: (id: string, quantity: number) => void;
}

const Counter = ({ value, min = 0, max = 20, onChange }: { value: number, min?: number, max?: number, onChange: (v: number) => void }) => (
  <div className="flex items-center space-x-2">
    <button
      type="button"
      className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold disabled:opacity-50"
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
    >
      -
    </button>
    <span className="w-6 text-center">{value}</span>
    <button
      type="button"
      className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg font-bold disabled:opacity-50"
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
    >
      +
    </button>
  </div>
);

export const CustomizeCleaning: React.FC<CustomizeCleaningProps & { selectedService?: string }> = ({ selectedAddOns, onChangeAddOn, selectedService }) => {
  let filteredAddOns = addOns;
  if (selectedService === 'office') {
    filteredAddOns = officeAddOns;
  } else if (selectedService === 'house-hourly') {
    filteredAddOns = addOns.filter(a => ['home-with-pets', 'load-dishwasher', 'change-bed-sheets'].includes(a.id));
  }
  return (
    <>
      <div className="mb-6 text-center">
        <div className="inline-block bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 text-sm text-purple-800 font-medium shadow-sm">
          {selectedService === 'office'
            ? 'Select any special requirements for your office or business cleaning. Pricing is per sq ft or per restroom.'
            : 'For best results, we recommend first-time customers add a Deep Clean to their House Cleaning booking. See our checklist for what\'s included in each package!'}
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {filteredAddOns.map((addOn) => {
          const quantity = selectedAddOns[addOn.id] || 0;
          return (
            <motion.div
              key={addOn.id}
              className={`flex flex-col items-center justify-between bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-200 relative ${quantity > 0 ? 'ring-2 ring-purple-400' : ''} min-h-[220px] max-h-[240px] h-[220px] p-3`}
              whileHover={{ scale: 1.04 }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 via-white to-gray-100 border border-gray-200 shadow-sm mb-1 mt-2">
                {addOn.icon}
              </div>
              <div className="flex-1 flex flex-col justify-center w-full min-h-[48px]">
                <div className="text-center font-semibold text-gray-900 text-sm mb-1 mt-1 leading-tight break-words">{addOn.label}</div>
                <div className="text-center text-xs text-gray-500 mb-2">
                  {addOn.quantityType === 'multi' ? `$${addOn.price} each` : `$${addOn.price}${addOn.id === 'eco-friendly' ? ' per sq ft' : addOn.id === 'restroom-deep-clean' ? ' per restroom' : ' per sq ft'}`}
                </div>
              </div>
              {addOn.quantityType === 'multi' ? (
                <div className="flex items-center gap-2 mt-1 mb-1">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold disabled:opacity-50 hover:bg-purple-100 transition-colors"
                    onClick={() => onChangeAddOn(addOn.id, Math.max(addOn.min ?? 0, quantity - 1))}
                    disabled={quantity <= (addOn.min ?? 0)}
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-gray-800">{quantity}</span>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold disabled:opacity-50 hover:bg-purple-100 transition-colors"
                    onClick={() => onChangeAddOn(addOn.id, Math.min(addOn.max ?? 20, quantity + 1))}
                    disabled={quantity >= (addOn.max ?? 20)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={`mt-1 mb-1 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 shadow-sm ${quantity > 0 ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'}`}
                  onClick={() => onChangeAddOn(addOn.id, quantity > 0 ? 0 : 1)}
                >
                  {quantity > 0 ? 'Selected' : 'Add'}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}; 