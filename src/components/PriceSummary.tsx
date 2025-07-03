import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Home, Calendar, RotateCcw } from "lucide-react";

interface PriceSummaryProps {
  selectedService: {
    id: string;
    name: string;
    basePrice: number;
  } | undefined;
  extrasTotal: number;
  frequencyDiscount: number;
  totalPrice: number;
  propertyDetails?: {
    sqft: string;
    bedrooms: string;
    bathrooms: string;
    halfBaths: string;
    basement: string;
  };
}

export function PriceSummary({
  selectedService,
  extrasTotal,
  frequencyDiscount,
  totalPrice,
  propertyDetails,
}: PriceSummaryProps) {
  // Parse square footage from range string (e.g., "1000-1499" -> 1000)
  const getSqftFromRange = (sqftRange: string): number => {
    if (!sqftRange) return 0;
    if (sqftRange === "6000+") return 6000;
    const match = sqftRange.match(/^(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const sqft = getSqftFromRange(propertyDetails?.sqft || '');
  const bedrooms = parseInt(propertyDetails?.bedrooms || '0') || 0;
  const bathrooms = parseInt(propertyDetails?.bathrooms || '0') || 0;
  const halfBaths = parseInt(propertyDetails?.halfBaths || '0') || 0;
  
  // Calculate individual charges
  const bedroomCharge = bedrooms * 40;
  const bathroomCharge = bathrooms * 30;
  const halfBathCharge = halfBaths * 15;
  
  // Calculate basement charge
  let basementCharge = 0;
  let basementLabel = '';
  switch (propertyDetails?.basement) {
    case '500-no-bathroom':
      basementCharge = 30;
      basementLabel = 'Basement (500 sqft, no bathroom)';
      break;
    case '500-with-bathroom':
      basementCharge = 70;
      basementLabel = 'Basement (500 sqft, with bathroom)';
      break;
    case '500-1000-no-bathroom':
      basementCharge = 40;
      basementLabel = 'Basement (500-1000 sqft, no bathroom)';
      break;
    case '500-1000-with-bathroom':
      basementCharge = 80;
      basementLabel = 'Basement (500-1000 sqft, with bathroom)';
      break;
    case '1000+-no-bathroom':
      basementCharge = 50;
      basementLabel = 'Basement (1000+ sqft, no bathroom)';
      break;
    case '1000+-with-bathroom':
      basementCharge = 90;
      basementLabel = 'Basement (1000+ sqft, with bathroom)';
      break;
    default:
      basementCharge = 0;
      basementLabel = '';
  }
  
  // Calculate square footage additional cost for package service
  let sqftAdditionalCost = 0;
  if (selectedService?.id === 'house-package' && propertyDetails?.sqft) {
    const sqftRange = propertyDetails.sqft;
    switch (sqftRange) {
      case "500-999":
        sqftAdditionalCost = 0; // Base price covers this range
        break;
      case "1000-1499":
        sqftAdditionalCost = 20;
        break;
      case "1500-1999":
        sqftAdditionalCost = 40;
        break;
      case "2000-2999":
        sqftAdditionalCost = 70;
        break;
      case "3000-3999":
        sqftAdditionalCost = 110;
        break;
      case "4000-4999":
        sqftAdditionalCost = 150;
        break;
      case "5000-5999":
        sqftAdditionalCost = 200;
        break;
      case "6000-6999":
        sqftAdditionalCost = 280;
        break;
      case "7000-7999":
        sqftAdditionalCost = 380;
        break;
      case "8000-8999":
        sqftAdditionalCost = 480;
        break;
      case "9000-9999":
        sqftAdditionalCost = 580;
        break;
      default:
        sqftAdditionalCost = 0;
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-4 h-fit"
    >
      <Card className="bg-white border-gray-200 shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-4">
          <h2 className="text-white font-bold text-lg tracking-wider text-center">
            BOOKING SUMMARY
          </h2>
        </div>
        
        <Separator />
        
        <CardContent className="p-6 space-y-4">
          {/* Service Type */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <Home className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {selectedService?.name || "Standard House Cleaning"}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${selectedService?.basePrice.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
              {selectedService?.id === 'house-hourly' && (
                <p className="text-xs text-gray-500 mt-2">
                  (Minimum 3 hours)
                </p>
              )}
            </div>
          </div>

          {/* Square Footage Cost */}
          {propertyDetails?.sqft && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">• Square Footage ({propertyDetails.sqft.replace('-', ' - ')} sqft)</span>
              <span className="font-medium text-gray-900">
                {sqftAdditionalCost > 0 ? `+$${sqftAdditionalCost.toFixed(2)}` : 'Included'}
              </span>
            </div>
          )}

          {/* Bedroom Charges */}
          {bedroomCharge > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">• {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''} (${40} each)</span>
              <span className="font-medium text-gray-900">+${bedroomCharge.toFixed(2)}</span>
            </div>
          )}

          {/* Bathroom Charges */}
          {bathroomCharge > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">• {bathrooms} Bathroom{bathrooms > 1 ? 's' : ''} (${30} each)</span>
              <span className="font-medium text-gray-900">+${bathroomCharge.toFixed(2)}</span>
            </div>
          )}

          {/* Half Bath Charges */}
          {halfBathCharge > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">• {halfBaths} Half Bath{halfBaths > 1 ? 's' : ''} (${15} each)</span>
              <span className="font-medium text-gray-900">+${halfBathCharge.toFixed(2)}</span>
            </div>
          )}

          {/* Basement Charges */}
          {basementCharge > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">• {basementLabel}</span>
              <span className="font-medium text-gray-900">+${basementCharge.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          {/* Date Selection */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Choose service date...</h3>
            </div>
          </div>

          <Separator />

          {/* Frequency */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <RotateCcw className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">One Time</h3>
            </div>
          </div>

          {/* Extras */}
          {extrasTotal > 0 && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Add-on Services</span>
                <span className="font-semibold text-gray-900">
                  +${extrasTotal.toFixed(2)}
                </span>
              </div>
            </>
          )}

          {/* Discount */}
          {frequencyDiscount > 0 && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium text-green-600">Frequency Discount</span>
                <span className="font-semibold text-green-600">
                  -${frequencyDiscount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </CardContent>

        <Separator />

        {/* Total */}
        <CardFooter className="px-6 py-4 bg-gray-50">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Today's Fee
            </h3>
            <p className="text-2xl font-bold text-yellow-500">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 