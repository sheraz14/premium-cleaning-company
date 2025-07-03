import React from 'react';
import { motion } from 'framer-motion';

const addOns = [
  { id: 'inside-fridge', label: 'Inside Fridge', price: 25 },
  { id: 'inside-oven', label: 'Inside Oven', price: 25 },
  { id: 'inside-cabinets', label: 'Inside Cabinets', price: 40 },
  { id: 'laundry', label: 'Laundry (per load)', price: 20 },
  { id: 'deep-cleaning', label: 'Deep Cleaning', price: 60 },
  { id: 'window-cleaning', label: 'Interior Windows', price: 35 },
  { id: 'deep-clean-package', label: 'Deep Clean Package', price: 120 },
  { id: 'move-in-out-package', label: 'Move In/Out Package', price: 150 },
  { id: 'renovation-cleaning-package', label: 'Renovation Cleaning Package', price: 180 },
  { id: 'airbnb-package', label: 'Airbnb Package', price: 100 },
  { id: 'pet-hair-removal', label: 'Pet Hair Removal', price: 30 },
  { id: 'home-with-pets', label: 'Home with Pets', price: 20 },
];

interface CustomizeCleaningProps {
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
}

// Simple inline Checkbox component
const Checkbox = ({ id, checked, onCheckedChange }: { id: string, checked: boolean, onCheckedChange: () => void }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onCheckedChange}
    className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400 border-gray-300"
  />
);

export const CustomizeCleaning: React.FC<CustomizeCleaningProps> = ({ selectedAddOns, onToggleAddOn }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Customize Your Cleaning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addOns.map((addOn) => (
          <div key={addOn.id} className="flex items-center space-x-3 bg-white/50 p-3 rounded-lg">
            <Checkbox
              id={addOn.id}
              checked={selectedAddOns.includes(addOn.id)}
              onCheckedChange={() => onToggleAddOn(addOn.id)}
            />
            <label htmlFor={addOn.id} className="text-sm font-medium leading-none flex-grow">
              {addOn.label}
            </label>
            <span className="text-sm font-semibold text-purple-600">+${addOn.price}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}; 