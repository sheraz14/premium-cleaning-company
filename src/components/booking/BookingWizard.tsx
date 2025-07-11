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
    businessName?: string; // Added for business name
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
  // Office-specific fields
  officeSize: string;
  numWashrooms: number;
  hasKitchen: boolean;
  kitchenType: string;
  flooringTypes: string[];
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
    businessName: '', // Initialize businessName
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
  // Office-specific fields
  officeSize: '',
  numWashrooms: 0,
  hasKitchen: false,
  kitchenType: '',
  flooringTypes: [],
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
    basePrice: 0, // Pricing is per sq ft, not a static base
    description: 'Professional office cleaning for Toronto businesses. Pricing: $0.15–$0.25/sqft depending on size, frequency, and add-ons. Includes all workspaces, lobbies, restrooms, kitchen, and more.',
    features: [
      'Desk & workspace cleaning',
      'Common areas & lobbies',
      'Restrooms sanitization',
      'Kitchen & breakroom cleaning',
      'Meeting rooms',
      'Trash removal & recycling',
      'Floor care (vacuuming/mopping)',
      'Optional: Carpet cleaning, window washing, floor waxing',
      'Eco-friendly products available',
      'Customizable for your business needs'
    ],
    estimatedDuration: 'Varies by size',
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

// Helper to get office price per sqft based on size
function getOfficePricePerSqft(sqft: number, frequency: string) {
  let base = 0.20; // Default
  if (sqft < 5000) base = 0.20;
  else if (sqft < 10000) base = 0.17;
  else base = 0.15;
  // Frequency discount
  let discount = 0;
  switch (frequency) {
    case 'Daily': discount = 0.20; break;
    case '3x/week': discount = 0.15; break;
    case 'Weekly': discount = 0.10; break;
    default: discount = 0;
  }
  return base * (1 - discount);
}

// Helper to parse sqft from range string
function parseSqftRange(range: string) {
  if (!range) return 0;
  if (range === '20000+') return 20000;
  const match = range.match(/(\d{3,5})/g);
  if (!match) return 0;
  return parseInt(match[0]);
}

export const BookingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingState, setBookingState] = useState<BookingState>(initialState);
  const [contactErrors, setContactErrors] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });

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
    if (serviceId === 'office') {
      setCurrentStep(2);
    }
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
        if (bookingState.selectedService === 'office') {
          return (
            bookingState.officeSize !== '' &&
            typeof bookingState.numWashrooms === 'number' &&
            bookingState.numWashrooms >= 0 &&
            typeof bookingState.hasKitchen === 'boolean' &&
            (bookingState.hasKitchen ? bookingState.kitchenType !== '' : true) &&
            Array.isArray(bookingState.flooringTypes) && bookingState.flooringTypes.length > 0
          );
        }
        if (bookingState.selectedService === 'house-hourly') {
          return bookingState.hours >= 3 && bookingState.numCleaners >= 1;
        }
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
    // Office/business cleaning pricing
    if (currentService.id === 'office') {
      const sqft = parseSqftRange(bookingState.squareFootage);
      if (!sqft) return 0;
      let pricePerSqft = getOfficePricePerSqft(sqft, bookingState.frequency);
      let total = Math.max(sqft * pricePerSqft, 200); // Minimum $200/visit
      // Add-ons (per sqft or per restroom)
      for (const [id, qty] of Object.entries(bookingState.extras)) {
        if (qty > 0) {
          switch (id) {
            case 'carpet-cleaning':
              total += sqft * 0.35 * qty;
              break;
            case 'window-washing':
              total += sqft * 0.75 * qty;
              break;
            case 'floor-waxing':
              total += sqft * 0.40 * qty;
              break;
            case 'eco-friendly':
              total += sqft * 0.05 * qty;
              break;
            case 'restroom-deep-clean':
              total += 75 * qty;
              break;
            default:
              break;
          }
        }
      }
      return total;
    }
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
        case 'triweekly':
          discount = 0.125 * total;
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
    total += bookingState.bathrooms * 30;
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
      case 'triweekly':
        discount = 0.125 * total;
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
    // For house-hourly, calculate discount on full subtotal
    if (currentService.id === 'house-hourly') {
      let subtotal = currentService.basePrice * bookingState.hours * bookingState.numCleaners;
      // Add extras (add-ons)
      for (const [id, qty] of Object.entries(bookingState.extras)) {
        if (qty > 0) {
          const addOn = allAddOns.find(a => a.id === id);
          if (addOn) {
            subtotal += addOn.price * qty;
          }
        }
      }
      let discount = 0;
      switch (bookingState.frequency) {
        case 'weekly':
          discount = 0.20 * subtotal;
          break;
        case 'biweekly':
          discount = 0.15 * subtotal;
          break;
        case 'triweekly':
          discount = 0.125 * subtotal;
          break;
        case 'monthly':
          discount = 0.10 * subtotal;
          break;
        default:
          discount = 0;
      }
      return discount;
    }
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
    total += bookingState.bathrooms * 30;
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
      case 'triweekly':
        discount = 0.125 * total;
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

    // Step 1: Service selection (always show for all services)
    if (currentStep === 1) {
      return (
        <motion.div {...commonProps} key="service">
          <ServiceSelection
            services={services}
            selectedService={bookingState.selectedService}
            onServiceSelect={updateService}
          />
        </motion.div>
      );
    }
    // If office, show only the quote form on step 2
    if (bookingState.selectedService === 'office' && currentStep === 2) {
      return (
        <div className="p-6">
          <PropertyDetails
            squareFootage={bookingState.squareFootage}
            bedrooms={bookingState.bedrooms}
            bathrooms={bookingState.bathrooms}
            halfBaths={bookingState.halfBaths}
            basement={bookingState.basement}
            hours={bookingState.hours}
            numCleaners={bookingState.numCleaners}
            selectedService={bookingState.selectedService}
            onSquareFootageChange={val => setBookingState(prev => ({ ...prev, squareFootage: val }))}
            onBedroomsChange={val => setBookingState(prev => ({ ...prev, bedrooms: val }))}
            onBathroomsChange={val => setBookingState(prev => ({ ...prev, bathrooms: val }))}
            onHalfBathsChange={val => setBookingState(prev => ({ ...prev, halfBaths: val }))}
            onBasementChange={val => setBookingState(prev => ({ ...prev, basement: val }))}
            onHoursChange={val => setBookingState(prev => ({ ...prev, hours: val }))}
            onNumCleanersChange={val => setBookingState(prev => ({ ...prev, numCleaners: val }))}
            // Office-specific fields
            officeSize={bookingState.officeSize}
            numWashrooms={bookingState.numWashrooms}
            hasKitchen={bookingState.hasKitchen}
            kitchenType={bookingState.kitchenType}
            flooringTypes={bookingState.flooringTypes}
            onOfficeSizeChange={val => setBookingState(prev => ({ ...prev, officeSize: val }))}
            onNumWashroomsChange={val => setBookingState(prev => ({ ...prev, numWashrooms: val }))}
            onHasKitchenChange={val => setBookingState(prev => ({ ...prev, hasKitchen: val }))}
            onKitchenTypeChange={val => setBookingState(prev => ({ ...prev, kitchenType: val }))}
            onFlooringTypesChange={val => setBookingState(prev => ({ ...prev, flooringTypes: val }))}
          />
        </div>
      );
    }
    // Step 2: Contact & Address (for all services except office)
    if (currentStep === 2) {
      // Canadian provinces list
      const canadianProvinces = [
        { value: 'AB', label: 'Alberta (AB)' },
        { value: 'BC', label: 'British Columbia (BC)' },
        { value: 'MB', label: 'Manitoba (MB)' },
        { value: 'NB', label: 'New Brunswick (NB)' },
        { value: 'NL', label: 'Newfoundland and Labrador (NL)' },
        { value: 'NS', label: 'Nova Scotia (NS)' },
        { value: 'NT', label: 'Northwest Territories (NT)' },
        { value: 'NU', label: 'Nunavut (NU)' },
        { value: 'ON', label: 'Ontario (ON)' },
        { value: 'PE', label: 'Prince Edward Island (PE)' },
        { value: 'QC', label: 'Quebec (QC)' },
        { value: 'SK', label: 'Saskatchewan (SK)' },
        { value: 'YT', label: 'Yukon (YT)' },
      ];
      // Validation handlers
      const validateName = (name: string) => /^[A-Za-zÀ-ÿ'\- ]+$/.test(name);
      const validatePhone = (phone: string) => /^\d{10}$/.test(phone.replace(/\D/g, ''));
      const validatePostalCode = (postal: string) => /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postal.trim());
      return (
        <motion.div {...commonProps} key="contact-address">
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact & Address Information</h2>
            {/* Business Name (only for Office/Business Cleaning) */}
            {currentService?.id === 'office' && (
              <div className="mb-4">
                <label className="block font-semibold mb-1">Business Name (if applicable)</label>
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  placeholder="Business Name"
                  value={bookingState.customerInfo.businessName || ''}
                  onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, businessName: e.target.value } }))}
                />
              </div>
            )}
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name*"
                className="border rounded p-2"
                value={bookingState.customerInfo.firstName}
                onChange={e => {
                  const value = e.target.value;
                  setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, firstName: value } }));
                  setContactErrors(errors => ({ ...errors, firstName: value && !validateName(value) ? 'Only letters allowed' : '' }));
                }}
                required
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="border rounded p-2"
                value={bookingState.customerInfo.lastName}
                onChange={e => {
                  const value = e.target.value;
                  setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, lastName: value } }));
                  setContactErrors(errors => ({ ...errors, lastName: value && !validateName(value) ? 'Only letters allowed' : '' }));
                }}
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
                placeholder="Cell Phone* (10 digits)"
                className="border rounded p-2"
                value={bookingState.customerInfo.phone}
                onChange={e => {
                  const value = e.target.value.replace(/[^\d]/g, '');
                  setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, phone: value } }));
                  setContactErrors(errors => ({ ...errors, phone: value && !validatePhone(value) ? 'Enter 10 digits' : '' }));
                }}
                maxLength={10}
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
            {/* Access Info and Parking Instructions - now directly under city/province/postal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="City*"
                className="border rounded p-2"
                value={bookingState.customerInfo.city}
                onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, city: e.target.value } }))}
                required
              />
              {/* Province Dropdown */}
              <select
                className="border rounded p-2 bg-white"
                value={bookingState.customerInfo.province}
                onChange={e => setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, province: e.target.value } }))}
                required
              >
                <option value="">Select Province*</option>
                {canadianProvinces.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Postal Code* (A1A 1A1)"
                className="border rounded p-2"
                value={bookingState.customerInfo.postalCode}
                onChange={e => {
                  const value = e.target.value.toUpperCase();
                  setBookingState(prev => ({ ...prev, customerInfo: { ...prev.customerInfo, postalCode: value } }));
                  setContactErrors(errors => ({ ...errors, postalCode: value && !validatePostalCode(value) ? 'Format: A1A 1A1' : '' }));
                }}
                maxLength={7}
                required
              />
            </div>
            {/* Access Info and Parking Instructions */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Access Info:</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                placeholder="e.g. Key code, concierge, etc."
                value={bookingState.accessInfo}
                onChange={e => setBookingState(prev => ({ ...prev, accessInfo: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Parking Instructions:</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                placeholder="e.g. Visitor parking, street parking, etc."
                value={bookingState.parkingInstructions}
                onChange={e => setBookingState(prev => ({ ...prev, parkingInstructions: e.target.value }))}
              />
            </div>
            {/* Error messages */}
            <div className="mb-2">
              {Object.entries(contactErrors).map(([key, msg]) => msg && (
                <div key={key} className="text-red-500 text-xs">{msg}</div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }
    // Step 3: Property Details (for all services except office)
    if (currentStep === 3) {
      return (
        <motion.div {...commonProps} key="property-details">
          <PropertyDetails
            squareFootage={bookingState.squareFootage}
            bedrooms={bookingState.bedrooms}
            bathrooms={bookingState.bathrooms}
            halfBaths={bookingState.halfBaths}
            basement={bookingState.basement}
            hours={bookingState.hours}
            numCleaners={bookingState.numCleaners}
            selectedService={bookingState.selectedService}
            onSquareFootageChange={val => setBookingState(prev => ({ ...prev, squareFootage: val }))}
            onBedroomsChange={val => setBookingState(prev => ({ ...prev, bedrooms: val }))}
            onBathroomsChange={val => setBookingState(prev => ({ ...prev, bathrooms: val }))}
            onHalfBathsChange={val => setBookingState(prev => ({ ...prev, halfBaths: val }))}
            onBasementChange={val => setBookingState(prev => ({ ...prev, basement: val }))}
            onHoursChange={val => setBookingState(prev => ({ ...prev, hours: val }))}
            onNumCleanersChange={val => setBookingState(prev => ({ ...prev, numCleaners: val }))}
            // Office-specific fields
            officeSize={bookingState.officeSize}
            numWashrooms={bookingState.numWashrooms}
            hasKitchen={bookingState.hasKitchen}
            kitchenType={bookingState.kitchenType}
            flooringTypes={bookingState.flooringTypes}
            onOfficeSizeChange={val => setBookingState(prev => ({ ...prev, officeSize: val }))}
            onNumWashroomsChange={val => setBookingState(prev => ({ ...prev, numWashrooms: val }))}
            onHasKitchenChange={val => setBookingState(prev => ({ ...prev, hasKitchen: val }))}
            onKitchenTypeChange={val => setBookingState(prev => ({ ...prev, kitchenType: val }))}
            onFlooringTypesChange={val => setBookingState(prev => ({ ...prev, flooringTypes: val }))}
          />
        </motion.div>
      );
    }
    // Step 4: Customize (for all services except office)
    if (currentStep === 4) {
      return (
        <motion.div {...commonProps} key="customize">
          {/* Frequency selection UI moved to the top for all services */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">How often?</h3>
            <div className="flex flex-wrap gap-2">
              {(() => {
                if (bookingState.selectedService === 'house-package' || bookingState.selectedService === 'house-hourly') {
                  return [
                    { value: 'one-time', label: 'One Time' },
                    { value: 'weekly', label: 'Weekly - 20% off' },
                    { value: 'biweekly', label: 'Bi-weekly - 15% off' },
                    { value: 'triweekly', label: 'Tri-weekly - 12.5% off' },
                    { value: 'monthly', label: 'Monthly - 10% off' },
                  ];
                } else {
                  return [
                    { value: 'one-time', label: 'One Time' },
                    { value: 'Daily', label: 'Daily - 20% off' },
                    { value: '3x/week', label: '3x/week - 15% off' },
                    { value: 'Weekly', label: 'Weekly - 10% off' },
                    { value: 'Biweekly', label: 'Biweekly' },
                    { value: 'Monthly', label: 'Monthly' },
                  ];
                }
              })().map(option => (
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
    }
    // Step 5: DateTime (for all services except office)
    if (currentStep === 5) {
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
    }
    // Step 6: Review (for all services except office)
    if (currentStep === 6) {
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
                {/* Show house property details only for house services */}
                {currentService?.id !== 'office' && (
                  <>
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
                  </>
                )}
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
                {currentService?.id === 'office' && (
                  <>
                    <div className="flex justify-between">
                      <span>Office Size:</span>
                      <span className="font-medium">
                        {(() => {
                          switch (bookingState.officeSize) {
                            case 'under-1000': return 'Under 1,000 sq ft';
                            case '1001-2500': return '1,001 – 2,500 sq ft';
                            case '2501-5000': return '2,501 – 5,000 sq ft';
                            case 'over-5000': return 'Over 5,000 sq ft (Custom Quote)';
                            default: return '-';
                          }
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Washrooms:</span>
                      <span className="font-medium">{typeof bookingState.numWashrooms === 'number' ? bookingState.numWashrooms : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kitchen/Break Area:</span>
                      <span className="font-medium">
                        {bookingState.hasKitchen ? (
                          bookingState.kitchenType === 'small' ? 'Yes (Small sink/fridge)' : bookingState.kitchenType === 'full' ? 'Yes (Full kitchen)' : 'Yes'
                        ) : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flooring Types:</span>
                      <span className="font-medium">{bookingState.flooringTypes && bookingState.flooringTypes.length > 0 ? bookingState.flooringTypes.join(', ') : '-'}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span>Access Info:</span>
                  <span className="font-medium">{bookingState.accessInfo || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parking Instructions:</span>
                  <span className="font-medium">{bookingState.parkingInstructions || '-'}</span>
                </div>
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
    }
    return null;
  };

  // 1. Top step bar redesign for office bookings
  if (bookingState.selectedService === 'office') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="flex flex-col items-center">
            {/* Modern step bar for office flow, now clickable */}
            <div className="w-full flex justify-center mb-6">
              <div className="flex items-center gap-4 bg-white/80 rounded-xl shadow-sm px-6 py-3">
                <button
                  type="button"
                  className={`flex items-center gap-2 focus:outline-none ${currentStep === 1 ? 'font-bold text-purple-700' : 'text-gray-400 hover:text-purple-600'}`}
                  onClick={() => currentStep === 2 && setCurrentStep(1)}
                  disabled={currentStep === 1}
                  style={{ cursor: currentStep === 2 ? 'pointer' : 'default', background: 'none', border: 'none', padding: 0 }}
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full border-2 ${currentStep === 1 ? 'border-purple-600 bg-purple-100' : 'border-gray-300 bg-gray-100'}`}>1</span>
                  <span className="hidden sm:inline">Select Service</span>
                </button>
                <span className="w-8 h-0.5 bg-gray-200 rounded" />
                <div className={`flex items-center gap-2 ${currentStep === 2 ? 'font-bold text-purple-700' : 'text-gray-400'}`}> 
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full border-2 ${currentStep === 2 ? 'border-purple-600 bg-purple-100' : 'border-gray-300 bg-gray-100'}`}>2</span>
                  <span className="hidden sm:inline">Request a Quote</span>
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            {/* No bottom navigation for office flow */}
          </div>
        </div>
      </div>
    );
  }

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
                    // Office fields
                    officeSize: bookingState.officeSize,
                    numWashrooms: bookingState.numWashrooms,
                    hasKitchen: bookingState.hasKitchen,
                    kitchenType: bookingState.kitchenType,
                    flooringTypes: bookingState.flooringTypes,
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