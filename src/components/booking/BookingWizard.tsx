'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from './StepIndicator';
import { ServiceSelection } from './steps/ServiceSelection';
import { PropertyDetails } from './steps/PropertyDetails';
import { DateTimeSelection } from './steps/DateTimeSelection';
import { PriceSummary } from '@/components/PriceSummary';
import { CustomizeCleaning } from './steps/CustomizeCleaning';
import { addOns as allAddOns } from './steps/CustomizeCleaning';

interface BookingState {
  // Service Selection
  selectedService: string;
  
  // Property Details
  squareFootage: string;
  bedrooms: number;
  bathrooms: number;
  halfBaths: number;
  basement: string;
  hours: number;
  numCleaners: number;
  
  // Date & Time
  selectedDate: Date | null;
  selectedTime: string;
  
  // Customer Info (for future implementation)
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    aptSuite: string;
    city: string;
    province: string;
    postalCode: string;
    textUpdates?: boolean;
  };
  
  // Additional Services/Extras (for future implementation)
  extras: { [id: string]: number };
  frequency: string;
  specialInstructions: string;
  accessInfo: string;
  parkingInstructions: string;
  garbageLocation: string;
  discountCode: string;
  tip: string;
}

const initialState: BookingState = {
  selectedService: '',
  squareFootage: '',
  bedrooms: 0,
  bathrooms: 0,
  halfBaths: 0,
  basement: 'none',
  selectedDate: null,
  selectedTime: '',
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    aptSuite: '',
    city: '',
    province: '',
    postalCode: '',
    textUpdates: false,
  },
  extras: {},
  frequency: 'one-time',
  specialInstructions: '',
  accessInfo: '',
  parkingInstructions: '',
  garbageLocation: '',
  discountCode: '',
  tip: '',
  hours: 3,
  numCleaners: 1,
};

const services = [
  {
    id: 'house-package',
    name: 'House Cleaning Package',
    basePrice: 80,
    description: 'Complete house cleaning with all essential areas covered',
    features: [
      'All rooms cleaned thoroughly',
      'Kitchen deep clean',
      'Bathroom sanitization',
      'Dusting and vacuuming',
      'Floor mopping',
      'Trash removal',
      'Basic organization'
    ],
    estimatedDuration: '2-4 hours',
    popular: true,
  },
  {
    id: 'house-hourly',
    name: 'House Cleaning by the Hour',
    basePrice: 45,
    description: 'Flexible hourly cleaning service for specific needs',
    features: [
      'Minimum 3 hours',
      'Focus on priority areas',
      'Customizable cleaning plan',
      'Professional cleaners',
      'Bring own supplies',
      'Flexible scheduling'
    ],
    estimatedDuration: '3+ hours',
  },
  {
    id: 'office',
    name: 'Office/Business Cleaning',
    basePrice: 300,
    description: 'Professional commercial office cleaning ($0.25-$0.45/sqft)',
    features: [
      'Desk & workspace cleaning',
      'Common areas & lobbies',
      'Restrooms sanitization',
      'Kitchen facilities',
      'Meeting rooms',
      'Trash removal',
      'Floor care (vacuuming/mopping)'
    ],
    estimatedDuration: '2-3 hours',
  },
];

const steps = [
  { id: 1, title: 'Service', description: 'Choose service' },
  { id: 2, title: 'Contact & Address', description: 'Contact and property location' },
  { id: 3, title: 'Property', description: 'Property details' },
  { id: 4, title: 'Customize', description: 'Customize your cleaning' },
  { id: 5, title: 'Schedule', description: 'Date & time' },
  { id: 6, title: 'Review', description: 'Confirm & book' },
];

export const BookingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingState, setBookingState] = useState<BookingState>(initialState);

  // Memoized property details for price calculation
  const propertyDetails = useMemo(() => ({
    squareFootage: bookingState.squareFootage,
    bedrooms: bookingState.bedrooms,
    bathrooms: bookingState.bathrooms,
    halfBaths: bookingState.halfBaths,
    basement: bookingState.basement,
    hours: bookingState.hours,
    numCleaners: bookingState.numCleaners,
  }), [bookingState.squareFootage, bookingState.bedrooms, bookingState.bathrooms, bookingState.halfBaths, bookingState.basement, bookingState.hours, bookingState.numCleaners]);

  // Update functions
  const updateService = useCallback((serviceId: string) => {
    setBookingState(prev => ({ ...prev, selectedService: serviceId }));
  }, []);

  const updatePropertyDetails = useCallback((updates: Partial<typeof propertyDetails>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  }, []);

  const updateDateTime = useCallback((date: Date | null, time?: string) => {
    setBookingState(prev => ({ 
      ...prev, 
      selectedDate: date,
      ...(time !== undefined && { selectedTime: time })
    }));
  }, []);

  // Navigation functions
  const goToNextStep = useCallback(() => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Validation functions
  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return bookingState.selectedService !== '';
      case 2:
        return (
          bookingState.customerInfo.firstName.trim() !== '' &&
          bookingState.customerInfo.lastName.trim() !== '' &&
          bookingState.customerInfo.email.trim() !== '' &&
          bookingState.customerInfo.phone.trim() !== '' &&
          bookingState.customerInfo.address.trim() !== '' &&
          bookingState.customerInfo.city.trim() !== '' &&
          bookingState.customerInfo.province.trim() !== '' &&
          bookingState.customerInfo.postalCode.trim() !== '' &&
          bookingState.frequency !== ''
        );
      case 3:
        return bookingState.squareFootage !== '';
      case 5:
        return bookingState.selectedDate !== null && bookingState.selectedTime !== '';
      default:
        return true;
    }
  }, [bookingState]);

  const canProceed = isStepValid(currentStep);

  // Get current service details
  const currentService = services.find(s => s.id === bookingState.selectedService);

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    if (!currentService) return 0;
    let total = currentService.basePrice;
    if (currentService.id === 'house-hourly') {
      total = currentService.basePrice * bookingState.hours * bookingState.numCleaners;
      // Add extras (add-ons)
      for (const [id, qty] of Object.entries(bookingState.extras)) {
        if (qty > 0) {
          const addOn = allAddOns.find(a => a.id === id);
          if (addOn) {
            total += addOn.price * qty;
          }
        }
      }
      // Calculate discount
      let discount = 0;
      switch (bookingState.frequency) {
        case 'weekly':
          discount = 0.20 * total;
          break;
        case 'biweekly':
          discount = 0.15 * total;
          break;
        case 'monthly':
          discount = 0.10 * total;
          break;
        default:
          discount = 0;
      }
      return total - discount;
    }
    // Add square footage costs for house package
    if (currentService.id === 'house-package' && bookingState.squareFootage) {
      const sqftRange = bookingState.squareFootage;
      switch (sqftRange) {
        case "1000-1499":
          total += 20;
          break;
        case "1500-1999":
          total += 40;
          break;
        case "2000-2999":
          total += 60;
          break;
        case "3000-3999":
          total += 80;
          break;
        case "4000-4999":
          total += 100;
          break;
        case "5000-5999":
          total += 120;
          break;
        case "6000-6999":
          total += 140;
          break;
        case "7000-7999":
          total += 160;
          break;
        case "8000-8999":
          total += 180;
          break;
        case "9000-9999":
          total += 200;
          break;
      }
    }
    // Add room charges
    total += bookingState.bedrooms * 40;
    total += bookingState.bathrooms * 25;
    total += bookingState.halfBaths * 15;
    // Add basement charges
    switch (bookingState.basement) {
      case '500-no-bathroom':
        total += 30;
        break;
      case '500-1000-no-bathroom':
        total += 40;
        break;
      case '1000+-no-bathroom':
        total += 50;
        break;
      case '500-with-bathroom':
        total += 70;
        break;
      case '500-1000-with-bathroom':
        total += 80;
        break;
      case '1000+-with-bathroom':
        total += 90;
        break;
    }
    // Add extras (add-ons)
    for (const [id, qty] of Object.entries(bookingState.extras)) {
      if (qty > 0) {
        // For package add-ons, only add the extra price (not a full package price)
        if ([
          'deep-clean-package',
          'move-in-out-package',
          'renovation-cleaning-package',
        ].includes(id)) {
          const addOn = allAddOns.find(a => a.id === id);
          if (addOn) {
            total += addOn.price * qty;
          }
        } else {
          const addOn = allAddOns.find(a => a.id === id);
          if (addOn) {
            total += addOn.price * qty;
          }
        }
      }
    }
    // Calculate discount
    let discount = 0;
    switch (bookingState.frequency) {
      case 'weekly':
        discount = 0.20 * total;
        break;
      case 'biweekly':
        discount = 0.15 * total;
        break;
      case 'monthly':
        discount = 0.10 * total;
        break;
      default:
        discount = 0;
    }
    return total - discount;
  }, [currentService, bookingState]);

  // Calculate discount for summary
  const calculateFrequencyDiscount = useCallback(() => {
    if (!currentService) return 0;
    let total = currentService.basePrice;
    // Add square footage costs for house package
    if (currentService.id === 'house-package' && bookingState.squareFootage) {
      const sqftRange = bookingState.squareFootage;
      switch (sqftRange) {
        case "1000-1499":
          total += 20;
          break;
        case "1500-1999":
          total += 40;
          break;
        case "2000-2999":
          total += 60;
          break;
        case "3000-3999":
          total += 80;
          break;
        case "4000-4999":
          total += 100;
          break;
        case "5000-5999":
          total += 120;
          break;
        case "6000-6999":
          total += 140;
          break;
        case "7000-7999":
          total += 160;
          break;
        case "8000-8999":
          total += 180;
          break;
        case "9000-9999":
          total += 200;
          break;
      }
    }
    // Add room charges
    total += bookingState.bedrooms * 40;
    total += bookingState.bathrooms * 25;
    total += bookingState.halfBaths * 15;
    // Add basement charges
    switch (bookingState.basement) {
      case '500-no-bathroom':
        total += 30;
        break;
      case '500-1000-no-bathroom':
        total += 40;
        break;
      case '1000+-no-bathroom':
        total += 50;
        break;
      case '500-with-bathroom':
        total += 70;
        break;
      case '500-1000-with-bathroom':
        total += 80;
        break;
      case '1000+-with-bathroom':
        total += 90;
        break;
    }
    // Add extras (add-ons)
    for (const [id, qty] of Object.entries(bookingState.extras)) {
      if (qty > 0) {
        // For package add-ons, only add the extra price (not a full package price)
        if ([
          'deep-clean-package',
          'move-in-out-package',
          'renovation-cleaning-package',
        ].includes(id)) {
          const addOn = allAddOns.find(a => a.id === id);
          if (addOn) {
            total += addOn.price * qty;
          }
        } else {
          const addOn = allAddOns.find(a => a.id === id);
          if (addOn) {
            total += addOn.price * qty;
          }
        }
      }
    }
    // Calculate discount
    let discount = 0;
    switch (bookingState.frequency) {
      case 'weekly':
        discount = 0.20 * total;
        break;
      case 'biweekly':
        discount = 0.15 * total;
        break;
      case 'monthly':
        discount = 0.10 * total;
        break;
      default:
        discount = 0;
    }
    return discount;
  }, [currentService, bookingState]);

  const frequencyDiscount = calculateFrequencyDiscount();
  const totalPrice = calculateTotalPrice();

  // Step component renderer
  const renderStep = () => {
    const commonProps = {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.3 }
    };

    switch (currentStep) {
      case 1:
        return (
          <motion.div {...commonProps} key="service">
            <ServiceSelection
              services={services}
              selectedService={bookingState.selectedService}
              onServiceSelect={updateService}
            />
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div {...commonProps} key="contact-address">
            <div className="max-w-4xl mx-auto p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact & Address Information</h2>
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.firstName}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, firstName: e.target.value } }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.lastName}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, lastName: e.target.value } }))}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  placeholder="Email*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.email}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, email: e.target.value } }))}
                  required
                />
                <input
                  type="tel"
                  placeholder="Cell Phone*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.phone}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, phone: e.target.value } }))}
                  required
                />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="textUpdates"
                  checked={!!bookingState.customerInfo.textUpdates}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, textUpdates: e.target.checked } }))}
                />
                <label htmlFor="textUpdates" className="text-gray-700">Opt-in to receive text updates on your cleaning appointment.</label>
              </div>
              {/* Address Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Address*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.address}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, address: e.target.value } }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Apt/Suite #"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.aptSuite}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, aptSuite: e.target.value } }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.city}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, city: e.target.value } }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Province*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.province}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, province: e.target.value } }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code*"
                  className="border rounded p-2"
                  value={bookingState.customerInfo.postalCode}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, postalCode: e.target.value } }))}
                  required
                />
              </div>
              {/* Frequency selection */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">How often?</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'one-time', label: 'One Time' },
                    { value: 'weekly', label: 'Weekly - 20% off' },
                    { value: 'biweekly', label: 'Biweekly - 15% off' },
                    { value: 'monthly', label: 'Monthly - 10% off' },
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className={`px-4 py-2 rounded border font-medium transition-all duration-150 ${bookingState.frequency === option.value ? 'bg-yellow-400 text-white border-yellow-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-50'}`}
                      onClick={() => setBookingState(prev => ({ ...prev, frequency: option.value }))}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div {...commonProps} key="property">
            <PropertyDetails
              squareFootage={bookingState.squareFootage}
              bedrooms={bookingState.bedrooms}
              bathrooms={bookingState.bathrooms}
              halfBaths={bookingState.halfBaths}
              basement={bookingState.basement}
              hours={bookingState.hours}
              numCleaners={bookingState.numCleaners}
              selectedService={bookingState.selectedService}
              onSquareFootageChange={(value) => updatePropertyDetails({ squareFootage: value })}
              onBedroomsChange={(value) => updatePropertyDetails({ bedrooms: value })}
              onBathroomsChange={(value) => updatePropertyDetails({ bathrooms: value })}
              onHalfBathsChange={(value) => updatePropertyDetails({ halfBaths: value })}
              onBasementChange={(value) => updatePropertyDetails({ basement: value })}
              onHoursChange={(value) => updatePropertyDetails({ hours: value })}
              onNumCleanersChange={(value) => updatePropertyDetails({ numCleaners: value })}
            />
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div {...commonProps} key="customize">
            <CustomizeCleaning
              selectedAddOns={bookingState.extras}
              onChangeAddOn={(id, quantity) => {
                setBookingState(prev => {
                  const newExtras = { ...prev.extras };
                  if (quantity > 0) {
                    newExtras[id] = quantity;
                  } else {
                    delete newExtras[id];
                  }
                  return { ...prev, extras: newExtras };
                });
              }}
              selectedService={bookingState.selectedService}
            />
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div {...commonProps} key="datetime">
            <DateTimeSelection
              selectedDate={bookingState.selectedDate}
              selectedTime={bookingState.selectedTime}
              onDateChange={(date) => updateDateTime(date)}
              onTimeChange={(time) => setBookingState(prev => ({ ...prev, selectedTime: time }))}
              estimatedDuration={currentService?.estimatedDuration}
            />
          </motion.div>
        );
      
      case 6:
        return (
          <motion.div {...commonProps} key="review">
            <div className="max-w-4xl mx-auto p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Review Your Booking
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Please review your details before confirming
              </p>
              
              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{currentService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {bookingState.selectedDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{bookingState.selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Size:</span>
                    <span className="font-medium">{bookingState.squareFootage} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms:</span>
                    <span className="font-medium">
                      {bookingState.bedrooms} BR, {bookingState.bathrooms} Bath
                      {bookingState.halfBaths > 0 && `, ${bookingState.halfBaths} Half Bath`}
                    </span>
                  </div>
                  {currentService?.id === 'house-hourly' && (
                    <>
                      <div className="flex justify-between">
                        <span>Hours:</span>
                        <span className="font-medium">{bookingState.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaners:</span>
                        <span className="font-medium">{bookingState.numCleaners}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Special Instructions & Access Info */}
              <div className="mb-4 text-left">
                <label className="block font-semibold mb-1">Cleaning Instructions / Priorities:</label>
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  placeholder="If you chose hourly cleaning, please provide your list of priorities here. If you chose a cleaning package, let us know if there's anything particular you'd like us to focus on."
                  value={bookingState.specialInstructions}
                  onChange={e => setBookingState(prev => ({ ...prev, specialInstructions: e.target.value }))}
                />
                <label className="block font-semibold mb-1">ACCESS INFO:</label>
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Keypad code / key location / will you be home? / info about your pets etc."
                  value={bookingState.accessInfo}
                  onChange={e => setBookingState(prev => ({ ...prev, accessInfo: e.target.value }))}
                />
                <label className="block font-semibold mb-1">Parking instructions:</label>
                <input
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Parking instructions (driveway, street parking?)"
                  value={bookingState.parkingInstructions}
                  onChange={e => setBookingState(prev => ({ ...prev, parkingInstructions: e.target.value }))}
                />
                <label className="block font-semibold mb-1">Where should we place the collected garbage at the property?</label>
                <input
                  className="w-full border rounded p-2 mb-2"
                  placeholder="e.g. outside bin, garage, etc."
                  value={bookingState.garbageLocation}
                  onChange={e => setBookingState(prev => ({ ...prev, garbageLocation: e.target.value }))}
                />
              </div>
              {/* Discount Code & Tip */}
              <div className="mb-4 text-left">
                <label className="block font-semibold mb-1">TIP (optional)</label>
                <input
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Enter tip amount"
                  type="number"
                  min="0"
                  value={bookingState.tip}
                  onChange={e => setBookingState(prev => ({ ...prev, tip: e.target.value }))}
                />
              </div>
              {/* Services Not Offered Notice */}
              <div className="mb-6 text-left bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h4 className="font-bold mb-2">Services Not Offered</h4>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  <li>Cleaning of animal feces</li>
                  <li>Mold</li>
                  <li>Exterior of the home (garage, patio, balcony)</li>
                  <li>Moving heavy furniture or fragile items</li>
                  <li>Crawl spaces</li>
                  <li>Bodily fluids</li>
                  <li>Pest removal/infestation</li>
                  <li>Dishes</li>
                  <li>Full wash of ceilings and walls</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <StepIndicator
          currentStep={currentStep}
          steps={steps}
          onStepClick={(stepId) => {
            // Only allow navigation if all previous steps are valid
            let canGo = true;
            for (let i = 1; i < stepId; i++) {
              if (!isStepValid(i)) {
                canGo = false;
                break;
              }
            }
            if (canGo) {
              setCurrentStep(stepId);
            }
          }}
        />
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 max-w-4xl mx-auto px-2 sm:px-6 gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-gray-500 my-2 sm:my-0">
                Step {currentStep} of {steps.length}
              </div>

              <Button
                onClick={goToNextStep}
                disabled={!canProceed || currentStep === steps.length}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
              >
                <span>
                  {currentStep === steps.length ? 'Book Now' : 'Continue'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Price Summary Sidebar */}
          {currentStep > 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-96 mb-4 lg:mb-0"
            >
              <div className="sticky top-32 lg:top-32">
                <PriceSummary
                  selectedService={currentService}
                  extrasTotal={0}
                  frequencyDiscount={frequencyDiscount}
                  totalPrice={totalPrice}
                  propertyDetails={{
                    sqft: bookingState.squareFootage,
                    bedrooms: bookingState.bedrooms.toString(),
                    bathrooms: bookingState.bathrooms.toString(),
                    halfBaths: bookingState.halfBaths.toString(),
                    basement: bookingState.basement,
                    hours: bookingState.hours,
                    numCleaners: bookingState.numCleaners,
                  }}
                  selectedAddOns={bookingState.extras}
                  tip={Number(bookingState.tip) > 0 ? Number(bookingState.tip) : 0}
                  frequency={bookingState.frequency}
                  selectedDate={bookingState.selectedDate}
                  selectedTime={bookingState.selectedTime}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}; 