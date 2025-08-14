import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeSlot {
  time: string;
  available: boolean;
  duration?: string;
}

interface DateTimeSelectionProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  estimatedDuration?: string;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  estimatedDuration = "2-4 hours"
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots: TimeSlot[] = [
    { time: "8:00 AM", available: true, duration: "8:00 AM - 12:00 PM" },
    { time: "9:00 AM", available: true, duration: "9:00 AM - 1:00 PM" },
    { time: "10:00 AM", available: false, duration: "10:00 AM - 2:00 PM" },
    { time: "11:00 AM", available: true, duration: "11:00 AM - 3:00 PM" },
    { time: "12:00 PM", available: true, duration: "12:00 PM - 4:00 PM" },
    { time: "1:00 PM", available: true, duration: "1:00 PM - 5:00 PM" },
    { time: "2:00 PM", available: false, duration: "2:00 PM - 6:00 PM" },
    { time: "3:00 PM", available: true, duration: "3:00 PM - 7:00 PM" },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: Date[] = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      if (days.length > 42) break;
    }
    
    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    // Not available if before today or more than 30 days in the future
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);
    
    return checkDate >= today && checkDate <= maxDate && date.getDay() !== 0; // No Sundays
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentMonth);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
          Schedule Your Cleaning
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          Select your preferred date and time for the cleaning. You'll receive a confirmation and can reschedule if needed.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-8 lg:grid-cols-2">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Select Date</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const prev = new Date(currentMonth);
                      prev.setMonth(prev.getMonth() - 1);
                      setCurrentMonth(prev);
                    }}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-semibold min-w-32 text-center">
                    {formatMonth(currentMonth)}
                  </span>
                  <button
                    onClick={() => {
                      const next = new Date(currentMonth);
                      next.setMonth(next.getMonth() + 1);
                      setCurrentMonth(next);
                    }}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                  const isAvailable = isDateAvailable(date);
                  const isSelected = isDateSelected(date);
                  return (
                    <motion.button
                      key={index}
                      whileHover={isAvailable ? { scale: 1.08 } : {}}
                      whileTap={isAvailable ? { scale: 0.96 } : {}}
                      onClick={() => isAvailable && onDateChange(date)}
                      disabled={!isAvailable}
                      className={`
                        p-1 sm:p-2 text-xs sm:text-sm rounded-lg transition-all duration-200
                        ${!isCurrentMonth 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : isSelected
                            ? 'bg-purple-600 text-white font-semibold ring-2 ring-purple-300'
                            : isAvailable
                              ? 'hover:bg-purple-50 hover:text-purple-700 text-gray-700'
                              : 'text-gray-300 cursor-not-allowed line-through'
                        }
                      `}
                    >
                      {date.getDate()}
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                <p>• Sundays are not available</p>
                <p>• Bookings available up to 30 days in advance</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Slots */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Select Time</span>
              </CardTitle>
              {selectedDate && (
                <p className="text-xs sm:text-sm text-gray-600">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 opacity-50" />
                  <p>Please select a date first</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  <div className="max-h-56 overflow-y-auto pr-1">
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((slot, index) => (
                        <motion.button
                          key={slot.time}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04 }}
                          onClick={() => slot.available && onTimeChange(slot.time)}
                          disabled={!slot.available}
                          title={slot.duration}
                          className={`
                            px-3 py-1.5 rounded-full border transition-all duration-200 text-xs sm:text-sm
                            ${selectedTime === slot.time
                              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200 text-purple-900'
                              : slot.available
                                ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-800'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                            }
                          `}
                        >
                          {slot.time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  {selectedTime && (
                    <p className="text-xs text-gray-600 mt-1">
                      Window: {timeSlots.find(t => t.time === selectedTime)?.duration}
                    </p>
                  )}
                  
                  {/* Custom Time Request Message */}
                  <div className="mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Phone className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm text-amber-800 font-medium">
                          Don't see your preferred time?
                        </p>
                        <p className="text-xs text-amber-700">
                          Give us a call and we can figure something out for you!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2">
                      What to expect:
                    </h4>
                    <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                      <li>• Our team will arrive at your selected time</li>
                      <li>• Service duration: {estimatedDuration}</li>
                      <li>• We'll call 30 minutes before arrival</li>
                      <li>• All cleaning supplies included</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Selection Summary & Note */}
      <div className="mt-6 sm:mt-8 text-center">
        {selectedDate && selectedTime ? (
          <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-800 font-medium text-sm">
            <span className="font-semibold">Selected:</span> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
          </div>
        ) : (
          <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-yellow-800 font-medium text-sm">
            Please select a date and time to continue.
          </div>
        )}
        <div className="mt-3 text-xs text-gray-500">
          Need to reschedule or cancel? You can do so up to 24 hours before your appointment.
        </div>
      </div>
    </div>
  );
}; 