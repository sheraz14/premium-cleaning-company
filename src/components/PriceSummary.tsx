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
import { addOns } from './booking/steps/CustomizeCleaning';

interface AddOnSummary {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

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
    // House fields
    sqft?: string;
    bedrooms?: string;
    bathrooms?: string;
    halfBaths?: string;
    basement?: string;
    hours?: number;
    numCleaners?: number;
    // Office fields
    officeSize?: string;
    numWashrooms?: number;
    hasKitchen?: boolean;
    kitchenType?: string;
    flooringTypes?: string[];
  };
  selectedAddOns?: { [id: string]: number };
  tip?: number;
  frequency?: string;
  selectedDate?: Date | null;
  selectedTime?: string;
}

export function PriceSummary({
  selectedService,
  extrasTotal,
  frequencyDiscount,
  totalPrice,
  propertyDetails,
  selectedAddOns = {},
  tip = 0,
  frequency = 'one-time',
  selectedDate = null,
  selectedTime = '',
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
  const bathroomCharge = bathrooms * 25;
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
      case "1000-1499":
        sqftAdditionalCost = 20;
        break;
      case "1500-1999":
        sqftAdditionalCost = 40;
        break;
      case "2000-2999":
        sqftAdditionalCost = 60;
        break;
      case "3000-3999":
        sqftAdditionalCost = 80;
        break;
      case "4000-4999":
        sqftAdditionalCost = 100;
        break;
      case "5000-5999":
        sqftAdditionalCost = 120;
        break;
      case "6000-6999":
        sqftAdditionalCost = 140;
        break;
      case "7000-7999":
        sqftAdditionalCost = 160;
        break;
      case "8000-8999":
        sqftAdditionalCost = 180;
        break;
      case "9000-9999":
        sqftAdditionalCost = 200;
        break;
      default:
        sqftAdditionalCost = 0;
    }
  }
  
  // Build add-on summary list
  const selectedAddOnList: AddOnSummary[] = Object.entries(selectedAddOns)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const addOn = addOns.find(a => a.id === id);
      return addOn ? { id, label: addOn.label, price: addOn.price, quantity: qty } : null;
    })
    .filter(Boolean) as AddOnSummary[];

  // Calculate pre-discount subtotal (before tip)
  const preDiscountSubtotal = (() => {
    if (selectedService?.id === 'house-hourly' && propertyDetails?.hours && propertyDetails?.numCleaners) {
      let total = selectedService.basePrice * propertyDetails.hours * propertyDetails.numCleaners;
      // Add extras (add-ons)
      if (selectedAddOns) {
        for (const [id, qty] of Object.entries(selectedAddOns)) {
          if (qty > 0) {
            const addOn = addOns.find(a => a.id === id);
            if (addOn) {
              total += addOn.price * qty;
            }
          }
        }
      }
      return total;
    }
    let total = selectedService?.basePrice || 0;
    // Add property details
    total += bedroomCharge;
    total += bathroomCharge;
    total += halfBathCharge;
    total += basementCharge;
    total += sqftAdditionalCost;
    // Add extras (add-ons)
    if (selectedAddOns) {
      for (const [id, qty] of Object.entries(selectedAddOns)) {
        if (qty > 0) {
          const addOn = addOns.find(a => a.id === id);
          if (addOn) {
            total += addOn.price * qty;
          }
        }
      }
    }
    return total;
  })();

  // Tip is only added to the initial cleaning fee, not to recurring fee
  const tipAmount = tip || 0;
  // Initial cleaning fee: subtotal + tip (no discount)
  const initialFee = preDiscountSubtotal + tipAmount;

  // Recurring cleaning fee: apply discount to subtotal only (no tip)
  let recurringDiscount = 0;
  switch (frequency) {
    case 'weekly':
      recurringDiscount = 0.20;
      break;
    case 'biweekly':
      recurringDiscount = 0.15;
      break;
    case 'triweekly':
      recurringDiscount = 0.125;
      break;
    case 'monthly':
      recurringDiscount = 0.10;
      break;
    default:
      recurringDiscount = 0;
  }
  // Recurring fee is discounted subtotal, tip is not included
  const recurringFee = preDiscountSubtotal * (1 - recurringDiscount);

  // Calculate final total including tip
  const finalTotal = totalPrice + (tip || 0);

  // Frequency label helper
  const frequencyLabel = {
    'one-time': 'One Time',
    'weekly': 'Weekly',
    'biweekly': 'Biweekly',
    'triweekly': 'Tri-weekly',
    'monthly': 'Monthly',
  }[frequency] || 'One Time';
  const frequencyDiscountPercent = {
    'weekly': '20%',
    'biweekly': '15%',
    'triweekly': '12.5%',
    'monthly': '10%',
  };

  const isRecurring = frequency !== 'one-time';
  const subtotalLabel = isRecurring ? 'Initial Cleaning Fee' : 'Subtotal';
  const grandTotalLabel = isRecurring ? 'Recurring Cleaning Fee' : 'Grand Total';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-4 h-fit"
    >
      <Card className="bg-white border-gray-200 shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-2">
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
              {selectedService && selectedService.id === 'house-hourly' && propertyDetails?.hours && propertyDetails?.numCleaners && (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Hours</span>
                    <span>{propertyDetails.hours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cleaners</span>
                    <span>{propertyDetails.numCleaners}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Hourly Rate</span>
                    <span>${selectedService.basePrice} x {propertyDetails.hours} x {propertyDetails.numCleaners}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Service Date/Time Row - same level as other icons */}
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex-shrink-0">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <span className="text-base font-semibold text-gray-900">
                {selectedDate
                  ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}${selectedTime ? ' at ' + selectedTime : ''}`
                  : 'Choose service date...'}
              </span>
            </div>
          </div>

          {/* Office/Business Cleaning Details */}
          {selectedService?.id === 'office' && propertyDetails && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">• Office Size</span>
                <span className="font-medium text-gray-900">
                  {(() => {
                    switch (propertyDetails.officeSize) {
                      case 'under-1000': return 'Under 1,000 sq ft';
                      case '1001-2500': return '1,001 – 2,500 sq ft';
                      case '2501-5000': return '2,501 – 5,000 sq ft';
                      case 'over-5000': return 'Over 5,000 sq ft (Custom Quote)';
                      default: return '-';
                    }
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">• Washrooms</span>
                <span className="font-medium text-gray-900">{typeof propertyDetails.numWashrooms === 'number' ? propertyDetails.numWashrooms : '-'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">• Kitchen/Break Area</span>
                <span className="font-medium text-gray-900">
                  {propertyDetails.hasKitchen ? (
                    propertyDetails.kitchenType === 'small' ? 'Yes (Small sink/fridge)' : propertyDetails.kitchenType === 'full' ? 'Yes (Full kitchen)' : 'Yes'
                  ) : 'No'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">• Flooring Types</span>
                <span className="font-medium text-gray-900">{propertyDetails.flooringTypes && propertyDetails.flooringTypes.length > 0 ? propertyDetails.flooringTypes.join(', ') : '-'}</span>
              </div>
            </div>
          )}

          {/* House Cleaning Details (hide for office) */}
          {selectedService?.id !== 'office' && (
            <>
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
                  <span className="text-gray-600">• {bathrooms} Bathroom{bathrooms > 1 ? 's' : ''} (${25} each)</span>
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
            </>
          )}

          {/* Customizations / Add-ons */}
          {selectedAddOnList.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Customizations</h4>
              <ul className="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-gray-50">
                {selectedAddOnList.map(addOn => (
                  <li key={addOn.id} className="flex justify-between items-center px-4 py-2">
                    <span className="text-gray-700">
                      {addOn.label}
                      {addOn.quantity > 1 && (
                        <span className="ml-2 text-xs text-gray-500">x{addOn.quantity}</span>
                      )}
                    </span>
                    <span className="font-medium text-gray-900">
                      +${(addOn.price * addOn.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Frequency */}
          <div className="flex items-center text-sm mt-2 w-full">
            <RotateCcw className="w-5 h-5 text-gray-500 mr-1" />
            <span className={isRecurring ? 'text-md font-semibold text-green-700 flex-1' : 'text-md font-semibold text-green-700'}>{frequencyLabel}</span>
            {frequency !== 'one-time' && (
              <span className="text-md font-bold text-green-700 text-right" style={{minWidth: '38px'}}>{frequencyDiscountPercent[frequency]} Off</span>
            )}
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

          {/* Subtotal and Tip breakdown for recurring */}
          {isRecurring && tipAmount > 0 && (
            <div className="flex flex-col text-md text-black-500 mb-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${preDiscountSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tip</span>
                <span>+ ${tipAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
          {/* Initial Cleaning Fee row */}
          <div className="mt-2 w-full flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">{subtotalLabel}</span>
            <span className="text-base font-bold text-gray-900 text-right">${initialFee.toFixed(2)}</span>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="px-6 py-2 bg-gray-50">
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-2 mt-2 w-full flex justify-between items-center">
            <span className={isRecurring ? 'text-base font-bold text-yellow-700 -ml-6' : 'text-base font-bold text-yellow-700 -ml-6'}>{grandTotalLabel}</span>
            <span className={isRecurring ? 'text-base font-bold text-yellow-700 text-right -mr-6' : 'text-base font-bold text-yellow-700 text-right -mr-6'}>
              {isRecurring ? `$${recurringFee.toFixed(2)}` : `$${finalTotal.toFixed(2)}`}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 