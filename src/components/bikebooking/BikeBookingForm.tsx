
"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Lightbulb } from "lucide-react";
import StripeCheckout from "../payment/StripeCheckout";
import PaymentSuccess from "../payment/PaymentSuccess";

// Mock Breadcrumb component
const Breadcrumb = ({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) => (
  <nav className="mb-6">
    <ol className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && <span className="mx-2 text-gray-400">/</span>}
          {item.href ? (
            <a href={item.href} className="text-gray-600 hover:text-black">
              {item.label}
            </a>
          ) : (
            <span className="text-black font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

// Interfaces
interface BikeDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  basePrice: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree?: boolean;
}

interface RentalSummary {
  startDate: string;
  endDate: string;
  days: number;
  bikeRental: number;
  deliveryOption: number;
  addOns: number;
  helmet: number;
  homeDelivery: number;
  total: number;
}

interface PreSelectedDuration {
  days: number;
  label: string;
}

const BikeBookingForm: React.FC = () => {
  const bikeData: BikeDetail = {
    id: "yamaha-fz-x",
    name: "Yamaha FZ X",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    description: "Smooth, Powerful & Perfect for City Cruising",
    basePrice: 50,
  };

  const preSelectedDurations: PreSelectedDuration[] = [
    { days: 5, label: "5 Days" },
    { days: 10, label: "10 Days" },
    { days: 15, label: "15 Days" },
    { days: 20, label: "20 Days" },
  ];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "home",
      name: "Home Delivery",
      description: "We will deliver your bike right to your door step",
      price: 20,
      isFree: false,
    },
    {
      id: "pickup",
      name: "Self Pickup",
      description: "Collect your bike from our nearest rental hub",
      price: 0,
      isFree: true,
    },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Bikes", href: "/rent-bikes" },
    { label: "Yamaha XYZ", href: "/bike" },
    { label: "Booking" },
  ];

  // State
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return formatDate(today);
  });
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 4); 
    return formatDate(today);
  });
  const [selectedDelivery, setSelectedDelivery] = useState("home");
  const [selectedPresetDuration, setSelectedPresetDuration] = useState<number | null>(5);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [sessionId, setSessionId] = useState<string | null>(null); 

  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: "helmet", name: "Helmet", price: 20, selected: true },
    { id: "phone-holder", name: "Phone Holder", price: 20, selected: false },
    { id: "lock", name: "Lock", price: 20, selected: false },
    { id: "battery-pack", name: "Extra Battery Pack", price: 20, selected: false },
    { id: "gloves", name: "Riding Gloves", price: 20, selected: false },
  ]);

  // Calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState<Date[]>([]);

  // Date pickers
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDatePickerMonth, setStartDatePickerMonth] = useState(new Date());
  const [endDatePickerMonth, setEndDatePickerMonth] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Format date to MM/DD/YYYY
  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  // Parse date from MM/DD/YYYY
  function parseDate(dateString: string): Date {
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  // Calculate date range between start and end dates
  const calculateDateRange = (startDateStr: string, endDateStr: string): Date[] => {
    const startDateObj = parseDate(startDateStr);
    const endDateObj = parseDate(endDateStr);
    const dateRange: Date[] = [];

    const currentDate = new Date(startDateObj);
    while (currentDate <= endDateObj) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
  };

  // Calculate days between two dates
  const calculateDaysBetween = (startDateStr: string, endDateStr: string): number => {
    const startDateObj = parseDate(startDateStr);
    const endDateObj = parseDate(endDateStr);
    const diffTime = endDateObj.getTime() - startDateObj.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Payment handlers
  const handlePaymentSuccess = (sessionId: string) => {
    setPaymentStatus('success');
    setSessionId(sessionId);
    setShowSuccessPage(true);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    console.error('Payment error:', error);
    alert(`Payment failed: ${error}`);
  };

  const handleBackToBooking = () => {
    setShowSuccessPage(false);
    setPaymentStatus('idle');
    setSessionId(null);
  };

  // Handle URL parameters for payment success/cancel
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const sessionId = urlParams.get('session_id');
    const canceled = urlParams.get('canceled');

    if (success === 'true' && sessionId) {
      handlePaymentSuccess(sessionId);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (canceled === 'true') {
      handlePaymentError('Payment was canceled');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Update date range whenever startDate or endDate changes
  useEffect(() => {
    const range = calculateDateRange(startDate, endDate);
    setSelectedDateRange(range);

    // Check if current selection matches any preset duration
    const days = calculateDaysBetween(startDate, endDate);
    const matchingPreset = preSelectedDurations.find(p => p.days === days);
    setSelectedPresetDuration(matchingPreset ? matchingPreset.days : null);

    // Auto change month if needed to show the date range
    const startDateObj = parseDate(startDate);
    const endDateObj = parseDate(endDate);

    if (
      endDateObj.getMonth() !== currentMonth.getMonth() ||
      endDateObj.getFullYear() !== currentMonth.getFullYear()
    ) {
      const startMonthDays = range.filter(
        (date) =>
          date.getMonth() === startDateObj.getMonth() &&
          date.getFullYear() === startDateObj.getFullYear()
      ).length;

      const endMonthDays = range.filter(
        (date) =>
          date.getMonth() === endDateObj.getMonth() &&
          date.getFullYear() === endDateObj.getFullYear()
      ).length;

      if (endMonthDays >= startMonthDays) {
        setCurrentMonth(new Date(endDateObj.getFullYear(), endDateObj.getMonth()));
      }
    }
  }, [startDate, endDate]);

  // Close date pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".date-picker-container")) {
        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
      }
    };

    if (showStartDatePicker || showEndDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStartDatePicker, showEndDatePicker]);

  // Handle preset duration selection
  const handlePresetDurationSelect = (days: number) => {
    const startDateObj = parseDate(startDate);
    const newEndDate = new Date(startDateObj);
    newEndDate.setDate(startDateObj.getDate() + days - 1);
    
    setEndDate(formatDate(newEndDate));
    setSelectedPresetDuration(days);
  };

  const handleDateInputChange = (value: string, isStartDate: boolean) => {
    // Validate date format MM/DD/YYYY
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return;

    const [month, day, year] = value.split("/").map(Number);

    // Validate date values
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2024) return;

    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow past dates
    if (inputDate < today) return;

    if (isStartDate) {
      setStartDate(value);
      
      // If new start date is after current end date, adjust end date
      const currentEndDate = parseDate(endDate);
      if (inputDate >= currentEndDate) {
        const newEndDate = new Date(inputDate);
        newEndDate.setDate(inputDate.getDate() + 1);
        setEndDate(formatDate(newEndDate));
      }
    } else {
      // Validate that end date is after start date
      const currentStartDate = parseDate(startDate);
      if (inputDate > currentStartDate) {
        setEndDate(value);
      }
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setAddOns((prev) =>
      prev.map((a) => (a.id === addOnId ? { ...a, selected: !a.selected } : a))
    );
  };

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  // Date picker functions
  const prevStartDateMonth = () =>
    setStartDatePickerMonth(
      new Date(startDatePickerMonth.getFullYear(), startDatePickerMonth.getMonth() - 1)
    );
  const nextStartDateMonth = () =>
    setStartDatePickerMonth(
      new Date(startDatePickerMonth.getFullYear(), startDatePickerMonth.getMonth() + 1)
    );

  const prevEndDateMonth = () =>
    setEndDatePickerMonth(
      new Date(endDatePickerMonth.getFullYear(), endDatePickerMonth.getMonth() - 1)
    );
  const nextEndDateMonth = () =>
    setEndDatePickerMonth(
      new Date(endDatePickerMonth.getFullYear(), endDatePickerMonth.getMonth() + 1)
    );

  const handleStartDatePickerSelect = (day: number) => {
    const selectedDate = new Date(
      startDatePickerMonth.getFullYear(),
      startDatePickerMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) return;

    const newStartDate = formatDate(selectedDate);
    setStartDate(newStartDate);
    
    // If new start date is after current end date, adjust end date
    const currentEndDate = parseDate(endDate);
    if (selectedDate >= currentEndDate) {
      const newEndDate = new Date(selectedDate);
      newEndDate.setDate(selectedDate.getDate() + 1);
      setEndDate(formatDate(newEndDate));
    }
    
    setShowStartDatePicker(false);
  };

  const handleEndDatePickerSelect = (day: number) => {
    const selectedDate = new Date(
      endDatePickerMonth.getFullYear(),
      endDatePickerMonth.getMonth(),
      day
    );
    const currentStartDate = parseDate(startDate);

    // End date must be after start date
    if (selectedDate > currentStartDate) {
      setEndDate(formatDate(selectedDate));
      setShowEndDatePicker(false);
    }
  };

  const renderDatePicker = (
    month: Date,
    onPrevMonth: () => void,
    onNextMonth: () => void,
    onDateSelect: (day: number) => void,
    selectedDate: string,
    isStartPicker: boolean = true
  ) => {
    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(month.getFullYear(), month.getMonth(), day);
      const isPast = currentDate < today;
      const isSelected = parseDate(selectedDate).getTime() === currentDate.getTime();
      
      // For end date picker, disable dates before or equal to start date
      const isDisabled = !isStartPicker ? currentDate <= parseDate(startDate) : isPast;

      days.push(
        <button
          key={day}
          disabled={isDisabled}
          onClick={() => onDateSelect(day)}
          className={`w-8 h-8 text-sm font-medium rounded transition-all ${
            isDisabled
              ? "text-gray-300 cursor-not-allowed"
              : isSelected
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }
    return (
      <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg mt-2">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onPrevMonth} className="p-2 hover:bg-gray-200 rounded-lg" type="button">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-black text-sm">
            {monthNames[month.getMonth()]} {month.getFullYear()}
          </h3>
          <button onClick={onNextMonth} className="p-2 hover:bg-gray-200 rounded-lg" type="button">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-600 py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const toggleDateSelection = (day: number) => {
    const today = new Date();
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) return;

    // Update start date and adjust end date if necessary
    const newStartDate = formatDate(selectedDate);
    setStartDate(newStartDate);
    
    const currentEndDate = parseDate(endDate);
    if (selectedDate >= currentEndDate) {
      const newEndDate = new Date(selectedDate);
      newEndDate.setDate(selectedDate.getDate() + 1);
      setEndDate(formatDate(newEndDate));
    }
  };

  const isDateInRange = (day: number): boolean => {
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return selectedDateRange.some(
      (rangeDate) =>
        rangeDate.getDate() === day &&
        rangeDate.getMonth() === currentMonth.getMonth() &&
        rangeDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateInRange(day);
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPast = currentDate < today;

      days.push(
        <button
          key={day}
          disabled={isPast}
          onClick={() => toggleDateSelection(day)}
          className={`w-8 h-8 text-sm font-medium rounded transition-all ${
            isPast
              ? "text-gray-300 cursor-not-allowed"
              : isSelected
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  // Rental summary calculation
  const calculateSummary = (): RentalSummary => {
    const days = calculateDaysBetween(startDate, endDate);
    const bikeRental = bikeData.basePrice * days;
    const selectedDeliveryOption = deliveryOptions.find((opt) => opt.id === selectedDelivery);
    const deliveryPrice = selectedDeliveryOption?.price || 0;
    const selectedAddOns = addOns.filter((a) => a.selected);
    const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const helmet = addOns.find((a) => a.id === "helmet" && a.selected)?.price || 0;
    const homeDelivery = selectedDelivery === "home" ? deliveryPrice : 0;

    return {
      startDate,
      endDate,
      days,
      bikeRental,
      deliveryOption: deliveryPrice,
      addOns: addOnsTotal,
      helmet,
      homeDelivery,
      total: bikeRental + deliveryPrice + addOnsTotal,
    };
  };

  const summary = calculateSummary();


  // If success page is showing, render it
  if (showSuccessPage && sessionId) {
    return (
      <PaymentSuccess
        paymentIntent={{ id: sessionId, amount: summary.total * 100, status: 'succeeded' }}
        rentalDetails={{
          bikeName: bikeData.name,
          startDate: summary.startDate,
          endDate: summary.endDate,
          days: summary.days,
          total: summary.total,
        }}
        onBackToBooking={handleBackToBooking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-semibold text-black mb-3 sm:mb-4">
                Customize Your Ride, Your Way
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Set your rental duration, pick your delivery option, and select add-ons to suit your adventure.
              </p>
            </div>

            {/* Duration selection */}
            <div className="p-4 sm:p-0">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                How long do you need the bike for?
              </h2>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                {preSelectedDurations.map((d) => (
                  <div
                    key={d.days}
                    onClick={() => handlePresetDurationSelect(d.days)}
                    className={`flex-shrink-0 border-2 rounded-xl px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-all flex items-center gap-2 ${
                      selectedPresetDuration === d.days
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {/* Dot */}
                    <div
                      className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPresetDuration === d.days
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPresetDuration === d.days && (
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full" />
                      )}
                    </div>

                    {/* Label */}
                    <h3 className="font-bold text-sm sm:text-base text-black">{d.label}</h3>
                  </div>
                ))}
                
                {/* Custom Duration Indicator */}
                {/* {selectedPresetDuration === null && (
                  <div className="flex-shrink-0 border-2 border-green-500 bg-green-50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2">
                    <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-black">
                      Custom ({summary.days} Days)
                    </h3>
                  </div>
                )} */}
              </div>

              {/* Start/End date input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="relative date-picker-container">
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                    Start Date
                  </label>
                  <div className="relative bg-white">
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => handleDateInputChange(e.target.value, true)}
                      onClick={() => {
                        setShowStartDatePicker(!showStartDatePicker);
                        setShowEndDatePicker(false);
                        setStartDatePickerMonth(parseDate(startDate) || new Date());
                      }}
                      className="w-full px-2 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm sm:text-base cursor-pointer"
                      placeholder="MM/DD/YYYY"
                      readOnly
                    />
                    <Calendar
                      className="absolute right-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 cursor-pointer"
                      onClick={() => {
                        setShowStartDatePicker(!showStartDatePicker);
                        setShowEndDatePicker(false);
                        setStartDatePickerMonth(parseDate(startDate) || new Date());
                      }}
                    />
                  </div>

                  {/* Start Date Picker Dropdown */}
                  {showStartDatePicker && renderDatePicker(
                    startDatePickerMonth,
                    prevStartDateMonth,
                    nextStartDateMonth,
                    handleStartDatePickerSelect,
                    startDate,
                    true
                  )}
                </div>
                
                <div className="relative date-picker-container">
                  <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                    End Date
                  </label>
                  <div className="relative bg-white">
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => handleDateInputChange(e.target.value, false)}
                      onClick={() => {
                        setShowEndDatePicker(!showEndDatePicker);
                        setShowStartDatePicker(false);
                        setEndDatePickerMonth(parseDate(endDate) || new Date());
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-sm sm:text-base cursor-pointer"
                      placeholder="MM/DD/YYYY"
                      readOnly
                    />
                    <Calendar 
                      className="absolute right-3 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 cursor-pointer"
                      onClick={() => {
                        setShowEndDatePicker(!showEndDatePicker);
                        setShowStartDatePicker(false);
                        setEndDatePickerMonth(parseDate(endDate) || new Date());
                      }}
                    />
                  </div>

                  {/* End Date Picker Dropdown */}
                  {showEndDatePicker && renderDatePicker(
                    endDatePickerMonth,
                    prevEndDateMonth,
                    nextEndDateMonth,
                    handleEndDatePickerSelect,
                    endDate,
                    false
                  )}
                </div>
              </div>

              {/* Calendar */}
              <div className=" bg-white border border-gray-200 rounded-2xl p-2 sm:p-4 ">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <button onClick={prevMonth} className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg">
                    <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />

                    
                  </button>
                  <h3 className="font-semibold text-black text-sm sm:text-base">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button onClick={nextMonth} className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg">
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="text-center text-[10px] sm:text-sm font-medium text-gray-600 py-1.5 sm:py-2">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="max-w-4xl mx-auto">
              <div className="p-4 sm:p-0">
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8">
                  Delivery Made Easy
                </h2>

                <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedDelivery(option.id)}
                      className={`flex-1 border-2 rounded-2xl p-3 sm:p-4 cursor-pointer transition-all ${
                        selectedDelivery === option.id
                          ? "border-green-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div
                          className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedDelivery === option.id
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedDelivery === option.id && (
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="text-right">
                          {option.isFree ? (
                            <span className="text-green-600 font-bold text-sm sm:text-lg">
                              FREE
                            </span>
                          ) : (
                            <span className="font-bold text-green-600 text-sm sm:text-lg">
                              ${option.price} Extra
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-black mb-1 sm:mb-2">
                          {option.name}
                        </h3>
                        <p className="text-xs sm:text-base text-gray-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="w-full mx-auto p-4 sm:p-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Enhance Your Ride
              </h2>

              <div className="space-y-2 sm:space-y-3">
                {addOns.map((addon, index) => (
                  <div
                    key={addon.id}
                    className={`flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer hover:bg-gray-50 ${
                      addon.selected
                        ? "bg-green-50 border-2 border-green-500"
                        : "bg-white border border-gray-100"
                    } ${index < addOns.length - 1 ? "mb-2 sm:mb-3" : ""}`}
                    onClick={() => toggleAddOn(addon.id)}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          addon.selected
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {addon.selected && (
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-900 text-sm sm:text-lg">
                        {addon.name}
                      </span>
                    </div>
                    <span className="font-semibold text-green-600 text-sm sm:text-lg">
                      ${addon.price} Extra
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 flex items-start space-x-2 sm:space-x-3 text-gray-600">
                <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-yellow-500" />
                <p className="text-xs sm:text-sm">
                  Safety and convenience first—add what you need, remove what you do not.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Rental Summary */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border h-fit sticky top-8">
            <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-black mb-4 sm:mb-6">
              Your Rental Summary
            </h2>

            {/* Bike Info */}
            <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={bikeData.image}
                  alt={bikeData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-black">
                  {bikeData.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {bikeData.description}
                </p>
              </div>
            </div>

            {/* Rental Details */}
            <div className="space-y-3 sm:space-y-4 mb-6">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium text-black">{summary.startDate}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium text-black">{summary.endDate}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Total Days</span>
                <span className="font-medium text-black">{summary.days}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Bike Rental</span>
                <span className="font-medium text-black">${summary.bikeRental}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-black">
                  {summary.deliveryOption > 0 ? `${summary.deliveryOption}` : "FREE"}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Add-ons</span>
                <span className="font-medium text-black">${summary.addOns}</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-base sm:text-lg font-bold text-black">
                <span>Total</span>
                <span>${summary.total}</span>
              </div>
            </div>

            {/* No Hidden Fees Notice */}
            <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-yellow-800">
                  No hidden fees. Pay only for what you use.
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <StripeCheckout
              amount={summary.total}
              bikeName={bikeData.name}
              startDate={summary.startDate}
              endDate={summary.endDate}
              days={summary.days}
              addOns={addOns}
              deliveryOption={summary.deliveryOption}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeBookingForm;