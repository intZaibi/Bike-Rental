"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, CircleAlert, ChevronRight, Lightbulb, Info } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "../BreadCrumb";
import DateInput from "@/lib/DateInput/DateInput"
import { getDaysBetweenDates } from "@/utilities/getDaysBetween";
import AddressForm from "@/lib/AddressForm/AddressForm";
import Checkout from "@/lib/Checkout/Checkout";
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
  disabled: boolean;
  isFree?: boolean;
  subDescription: string;
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

const BikeBookingForm: React.FC = () => {
  // Sample bike data
 
  const bikeData: BikeDetail = {
    id: "yamaha-fz-x",
    name: "Everyday Purpose E-Bike",
    image: "/bike.png",
    description: "E-Bike For Commuting To Work, School, Running Errands and Social Events.",
    basePrice: 5,
    
  };

  // State management
  const [errorMap, setErrorMap] = useState<{[key: string]: boolean}>({});
  const [startDate, setStartDate] = useState("09/07/2025");
  const [endDate, setEndDate] = useState("11/07/2025");
  const [selectedDelivery, setSelectedDelivery] = useState("home");
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: "helmet", name: "Helmet", price: 20, selected: true },
    { id: "phone-holder", name: "Phone Holder", price: 20, selected: false },
    { id: "lock", name: "Lock", price: 20, selected: false },
    {
      id: "battery-pack",
      name: "Extra Battery Pack",
      price: 20,
      selected: false,
    },
    { id: "gloves", name: "Riding Gloves", price: 20, selected: false },
  ]);

  // Calendar state
  const [selectedDates, setSelectedDates] = useState<number[]>([9, 10, 11]);

  // Delivery options
  const deliveryOptions: DeliveryOption[] = [
    {
      id: "home",
      name: "Home Delivery",
      description: "We deliver the bike right to your door step",
      subDescription: "ETA can vary with truck availability, demand spikes, or road delays.",
      price: 0,
      disabled: false,
      isFree: true,
    },
    {
      id: "pickup",
      name: "Self Pickup (Not Available)",
      description: "Collect your bike from our nearest rental hub",
      subDescription: "",
      price: 0,
      disabled: true,
      isFree: false,
    },
  ];

  const breadcrumbItems: any[] = [
    // { label: "Home", href: "/" },
    // { label: "Bikes", href: "/rent-bikes" },
    // { label: "Yamaha XYZ", href: "/bike" },
    // { label: "Booking" }, // last one, no href
  ];

  // Calculate rental summary
  const calculateSummary = (): RentalSummary => {
    const days = getDaysBetweenDates(startDate, endDate);
    console.log(days)
    const bikeRental = bikeData.basePrice * days;
    const selectedDeliveryOption = deliveryOptions.find(
      (opt) => opt.id === selectedDelivery
    );
    const deliveryPrice = selectedDeliveryOption?.price || 0;
    const selectedAddOns = addOns.filter((addon) => addon.selected);
    const addOnsTotal = selectedAddOns.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    const helmet = 0;
      // addOns.find((addon) => addon.id === "helmet" && addon.selected)?.price ||
      // 0;
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
      total: bikeRental //+ deliveryPrice + addOnsTotal,
    };
  };

  const summary = calculateSummary();

  const hasError = Object.keys(errorMap).length > 0;

  const errorFunction = (value: boolean, name: string) => {
    setErrorMap(prev => {
      if(value)
      {
        return {
          ...prev,
          [name]: true
        }
      } else {
        const newMap = {...prev};
        delete newMap[name]
        return newMap
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-semibold text-black mb-3 sm:mb-4">
                Your Ride, Your Way
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Set your rental duration and pick your delivery option. 
                
                {/* and select
                add-ons to suit your adventure. Transparent pricing, no
                surprises. */}
              </p>
              <p style={{textAlign: 'center', marginTop: '2rem', fontSize: '13px'}}className="flex gap-2 text-gray-600">
                <Info /> Please Acknowledge That Currently We Only Have E-Bikes From Concord, Lectric and Nishiki.
                
                {/* and select
                add-ons to suit your adventure. Transparent pricing, no
                surprises. */}
              </p>
            </div>

            {/* Rental Duration */}
            <div className="p-4 sm:p-0">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                How long do you need the bike for?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">

                <DateInput 
                name={'Start Date'}
                errorFunction={errorFunction}
                onChange={(e) => setStartDate(e)} notBefore={{
                  date: (new Date()).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                  }),
                  name: 'Today'
                }} errorMsg={'Hello World'} />

                <DateInput 
                name={'End Date'}
                errorFunction={errorFunction}
                onChange={(e) => setEndDate(e)} notBefore={{
                  date: startDate,
                  name: "Start Date"
                }} errorMsg={'Hello World'} />
              </div>

              {/* Calendar */}
              {/* <Calendar/> */}

              {/* <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 flex items-center">
                <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-yellow-500" />
                You can rent for a few hours or several days—flexible as your
                plan!
              </p> */}
            </div>

            {/* Delivery Options */}
            <div className="max-w-4xl mx-auto">
              <div className="p-4 sm:p-0">
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8">
                  Delivery Option
                </h2>

                <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => {
                        if(!option.disabled)
                        {
                          setSelectedDelivery(option.id)
                        }
                      }}
                      style={{
                        opacity: option.disabled === true ? '0.6' : '1' 
                      }}
                      className={`flex-1 border-2 rounded-2xl p-3 sm:p-4 transition-all ${
                        selectedDelivery === option.id
                          ? "border-green-500"
                          : "border-gray-200 hover:border-gray-300"
                        }
                        ${option.disabled === true ? '' : 'cursor-pointer' }
                      `}
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
                        {option.disabled === false && <div className="text-right">
                          {option.isFree ? (
                            <span className="text-green-600 font-bold text-sm sm:text-lg">
                              FREE
                            </span>
                          ) : (
                            <span className="font-bold text-green-600 text-sm sm:text-lg">
                              ${option.price} Extra
                            </span>
                          )}
                        </div>}
                      </div>

                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-black mb-1 sm:mb-2">
                          {option.name}
                        </h3>
                        <p className="text-xs sm:text-base text-gray-600">
                          {option.description}
                        </p>
                        <p className="text-xs mt-2 sm:text-base text-gray-600" style={{fontSize: '11px'}}>
                          {option.subDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add-ons */}
            {/* <div className="w-full mx-auto p-4 sm:p-0">
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
                  Safety and convenience first—add what you need, remove what
                  you do not.
                </p>
              </div>
            </div> */}
            <AddressForm errorFunction={errorFunction}/>
          </div>
            
          {/* Right Sidebar - Rental Summary */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border h-fit sticky top-8">
            <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-black mb-4 sm:mb-6">
              Your Rental Summary
            </h2>

            {/* Bike Info */}
            <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={bikeData.image}
                  alt={bikeData.name}
                  width={64}
                  height={64}
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
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
              {/* <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Rental Dates:</span>
                <span className="font-medium text-black">
                  Jul {selectedDates[0]} - Jul{" "}
                  {selectedDates[selectedDates.length - 1]} ({summary.days}{" "}
                  days)
                </span>
              </div> */}

              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Delivery Option:</span>
                <span className="font-medium text-black">
                  {
                    deliveryOptions.find((opt) => opt.id === selectedDelivery)
                      ?.name
                  } (FREE)
                </span>
              </div>

              {/* <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Add-ons:</span>
                <span className="font-medium text-black">
                  {addOns
                    .filter((addon) => addon.selected)
                    .map((addon) => addon.name)
                    .join(", ") || "None"}
                </span>
              </div> */}
            </div>


            {/* Price Breakdown */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Everyday Purpose E-Bike Rate:
                </span>
                <span className="font-medium text-black">
                  $5/day
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Bike Rental {isNaN(summary.days) ? '(0 days)': `(${summary.days} days)`}:
                </span>
                <span className="font-medium text-black">
                  {isNaN(summary.bikeRental) ? '$0.00': `${summary.bikeRental}.00`}
                </span>
              </div>

              {summary.helmet > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Helmet:</span>
                  <span className="font-medium text-black">
                    ${summary.helmet}.00
                  </span>
                </div>
              )}

              {addOns
                .filter((addon) => addon.selected && addon.id !== "helmet")
                .map((addon) => (
                  <div key={addon.id} className="flex justify-between">
                    <span className="text-gray-600">{addon.name}:</span>
                    <span className="font-medium text-black">
                      ${addon.price}.00
                    </span>
                  </div>
                ))}

              {summary.homeDelivery > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Home Delivery:</span>
                  <span className="font-medium text-black">
                    ${summary.homeDelivery}
                  </span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-lg sm:text-xl font-bold text-black">
                Total
              </span>
              <span className="text-xl sm:text-2xl font-bold text-black">
                {isNaN(summary.total) ? '$0.00': `${summary.total}.00`}
              </span>
            </div>

            {/* No Hidden Fees Notice */}
            <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-yellow-800">
                  You'll Only Be Charged Once The Bike Is Delivered
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <Link  href="/track-order">
              <button 
                disabled={hasError} 
                style={{
                  opacity: (hasError) ? '0.6' : '1'
                }} 
                className="w-full bg-black text-white py-2.5 sm:py-3 
                rounded-3xl font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors">
                  Schedule Rental
              </button>
            </Link>
          </div>

          {/* <Checkout/> */}
        </div>
      </div>
    </div>
  );
};

export default BikeBookingForm;
