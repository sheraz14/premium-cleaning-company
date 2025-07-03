"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Minus, 
  Sparkles, 
  Refrigerator, 
  Lightbulb, 
  Wind,
  Shirt,
  Car,
  PaintBucket
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
  duration: string;
  popular?: boolean;
}

interface BookingExtrasProps {
  onExtrasChange: (extras: AddOn[], total: number) => void;
}

const addOns: AddOn[] = [
  {
    id: "inside-fridge",
    name: "Inside Refrigerator",
    description: "Deep clean inside your fridge including shelves and drawers",
    price: 25,
    icon: Refrigerator,
    duration: "30 min",
    popular: true
  },
  {
    id: "inside-oven",
    name: "Inside Oven",
    description: "Thorough cleaning of oven interior and racks",
    price: 30,
    icon: Sparkles,
    duration: "45 min"
  },
  {
    id: "light-fixtures",
    name: "Light Fixtures",
    description: "Clean ceiling fans, chandeliers, and light fixtures",
    price: 20,
    icon: Lightbulb,
    duration: "20 min"
  },
  {
    id: "air-vents",
    name: "Air Vents",
    description: "Clean and dust all accessible air vents",
    price: 15,
    icon: Wind,
    duration: "15 min"
  },
  {
    id: "laundry",
    name: "Laundry Service",
    description: "Wash, dry, and fold one load of laundry",
    price: 35,
    icon: Shirt,
    duration: "2 hours"
  },
  {
    id: "garage",
    name: "Garage Cleaning",
    description: "Basic cleaning and organization of garage space",
    price: 50,
    icon: Car,
    duration: "1 hour"
  },
  {
    id: "wall-washing",
    name: "Wall Washing",
    description: "Wash and clean painted walls and baseboards",
    price: 40,
    icon: PaintBucket,
    duration: "1 hour"
  }
];

export default function BookingExtras({ onExtrasChange }: BookingExtrasProps) {
  const [selectedExtras, setSelectedExtras] = useState<AddOn[]>([]);

  const toggleExtra = (addOn: AddOn) => {
    const isSelected = selectedExtras.find(extra => extra.id === addOn.id);
    let newExtras: AddOn[];
    
    if (isSelected) {
      newExtras = selectedExtras.filter(extra => extra.id !== addOn.id);
    } else {
      newExtras = [...selectedExtras, addOn];
    }
    
    setSelectedExtras(newExtras);
    
    const total = newExtras.reduce((sum, extra) => sum + extra.price, 0);
    onExtrasChange(newExtras, total);
  };

  const getTotalPrice = () => {
    return selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  };

  const getTotalDuration = () => {
    const totalMinutes = selectedExtras.reduce((sum, extra) => {
      const minutes = parseInt(extra.duration.includes('hour') 
        ? extra.duration.split(' ')[0] === '1' ? '60' : extra.duration.split(' ')[0] + '0'
        : extra.duration.split(' ')[0]
      );
      return sum + minutes;
    }, 0);
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${totalMinutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Add Extra Services</h3>
        <p className="text-gray-600">Customize your cleaning with additional services</p>
      </div>

      {/* Selected Extras Summary */}
      {selectedExtras.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-blue-900">Selected Add-ons</h4>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                +{getTotalDuration()}
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                +${getTotalPrice()}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedExtras.map((extra) => (
              <div 
                key={extra.id}
                className="flex items-center space-x-2 bg-white rounded-lg px-3 py-1 border border-blue-200"
              >
                <extra.icon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{extra.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExtra(extra)}
                  className="h-5 w-5 p-0 hover:bg-red-100 text-red-500 hover:text-red-600"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add-ons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addOns.map((addOn) => {
          const isSelected = selectedExtras.find(extra => extra.id === addOn.id);
          
          return (
            <motion.div
              key={addOn.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "p-4 cursor-pointer transition-all duration-200 relative border-2",
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                )}
                onClick={() => toggleExtra(addOn)}
              >
                {addOn.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                    Popular
                  </Badge>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isSelected ? "bg-blue-100" : "bg-gray-100"
                  )}>
                    <addOn.icon className={cn(
                      "h-5 w-5",
                      isSelected ? "text-blue-600" : "text-gray-600"
                    )} />
                  </div>
                  
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                    isSelected 
                      ? "bg-blue-500 border-blue-500" 
                      : "border-gray-300 hover:border-gray-400"
                  )}>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-1">{addOn.name}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {addOn.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-green-600">${addOn.price}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{addOn.duration}</span>
                  </div>
                  
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="h-8 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExtra(addOn);
                    }}
                  >
                    {isSelected ? (
                      <Minus className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Special Requests */}
      <Card className="p-4 sm:p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Special Preferences</h4>
        
        <div className="space-y-4">
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-gray-700">Eco-Friendly Products Only</p>
              <p className="text-sm text-gray-500">Use only environmentally safe cleaning products</p>
            </div>
            <Switch className="mt-2 sm:mt-0" />
          </div>
          
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-gray-700">Pet-Safe Products</p>
              <p className="text-sm text-gray-500">Ensure all products are safe for pets</p>
            </div>
            <Switch className="mt-2 sm:mt-0" />
          </div>
          
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-gray-700">Fragrance-Free</p>
              <p className="text-sm text-gray-500">Use unscented cleaning products</p>
            </div>
            <Switch className="mt-2 sm:mt-0" />
          </div>
        </div>
      </Card>
      
      {/* Helpful Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-medium text-yellow-800 mb-2">💡 Pro Tips</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Add-ons are performed during your main cleaning appointment</li>
          <li>• Popular add-ons like fridge cleaning save you time and effort</li>
          <li>• Bundle multiple add-ons to get the most value from your service</li>
        </ul>
      </div>
    </motion.div>
  );
} 