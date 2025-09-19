"use client";
import React, { useState }  from "react";
import Image from "next/image";
import {
  CheckCircle,
  ThumbsUp,
  Phone,
  MessageCircle,
  FileText,
  KeyIcon,
  Copy,
} from "lucide-react";
import { BiCycling } from "react-icons/bi";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Breadcrumb from "../BreadCrumb";
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.75rem", // matches your rounded-xl
};

const center = {
  lat: 31.582045, // Lahore as default
  lng: 74.329376,
};

const GoogleMapComponent: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

// ---------- Interfaces ----------
interface BikeDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  basePrice: number;
}

interface ProgressStep {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  time: string;
  completed: boolean;
  active?: boolean;
}

const TrackOrder: React.FC = () => {
  const bikeData: BikeDetail = {
    id: "yamaha-fz-x",
    name: "Yamaha FZ X",
    image: "/b6.jpg",
    description: "Premium Cute Scooter Bike",
    basePrice: 50,
  };

  const progressSteps: ProgressStep[] = [
    {
      id: "confirmed",
      icon: CheckCircle,
      title: "Booking Confirmed",
      time: "Aug 12, 10:15 AM",
      completed: true,
      active: true,
    },
    {
      id: "prepared",
      icon: KeyIcon,
      title: "Bike Prepared",
      time: "Aug 12, 10:18 AM",
      completed: false,
    },
    {
      id: "delivery",
      icon: BiCycling,
      title: "Out For Delivery",
      time: "Aug 12, 10:15 AM",
      completed: false,
    },
    {
      id: "delivered",
      icon: ThumbsUp,
      title: "Delivered",
      time: "Aug 12, 10:15 AM",
      completed: false,
    },
  ];
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Bikes", href: "/rent-bikes" },
    { label: "Yamaha XYZ", href: "bike" },
    { label: "Booking", href: "/bike/bike-booking" },
    { label: "Checkout" }, // last one, no href
  ];

  const bookingId = "#RNT0500401";

 const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);

      // Hide message after 2s
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between">
              {/* Left Side: Title + Message */}
              <div>
                <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold text-black">
                  Booking Confirmed
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-3 sm:mt-4 md:mt-6">
                  Your ride is ready for delivery! Sit tight while we prepare
                  your bike.
                </p>
              </div>

              {/* Right Side: Booking ID */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-white px-2 sm:px-3 py-1 rounded-xl relative">
{copied ? (
  <span className="text-xs sm:text-sm font-bold text-green">
    Copied ID!
  </span>
) : (
  <span className="text-xs sm:text-sm font-bold text-black">
    Booking ID: {bookingId}
  </span>
)}

      <button
        onClick={handleCopy}
        className="p-1 sm:p-2 rounded hover:bg-gray-200"
      >
        <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-black font-bold" />
      </button>
    </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl p-2 sm:p-6 shadow-sm">
              <div className="relative">
                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden relative">
                  <GoogleMapComponent />
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg text-black mb-2">
                    Arriving in 30 Minutes
                  </h3>
                  <p className="text-sm text-gray-600">
                    We will notify you when the bike leaves our hub.
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Status */}
            <div className=" p-6">
              <h3 className="font-bold text-lg text-black mb-2">
                Delivery Status
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                We will notify you when the bike leaves our hub.
              </p>

              <div className="flex flex-col sm:flex-row items-start w-full gap-4">
                {progressSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = step.active;
                  const isCompleted = step.completed;
                  return (
                    <div
                      key={step.id}
                      className={`relative flex flex-col items-start text-left flex-1 w-full`}
                    >
                      {/* Step box */}
                      <div
                        className={`w-full rounded-xl border p-4 flex 
      flex-row sm:flex-col items-center sm:items-start
      ${isActive ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"}
    `}
                      >
                        {/* Icon */}
                        <div
                          className={`w-10 h-10 mb-0 sm:mb-3 mr-3 sm:mr-0 flex items-center justify-center rounded-full
        ${
          isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
        }
      `}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Text (title + time) */}
                        <div className="flex flex-col items-start">
                          <h4
                            className={`font-semibold text-sm mb-1 ${
                              isActive ? "text-green-600" : "text-gray-700"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <p className="text-xs text-gray-500">{step.time}</p>
                        </div>
                      </div>

                      {/* Connector line */}
                      {index < progressSteps.length - 1 && (
                        <div
                          className={`absolute 
        top-full left-1/2 transform -translate-x-1/2 w-[2px] h-4
        sm:top-1/2 sm:right-[-100%] sm:left-auto sm:transform-none sm:w-[100%] sm:h-[2px]
        ${isCompleted || isActive ? "bg-green-500" : "bg-gray-200"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* absolute top-1/2 right-[-85%] w-[100%] h-[2px] bg-gray-200 */}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-black mb-4">
                Delivery Partner
              </h3>
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Profile */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/r1.png"
                      alt="Profile"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Floyd Miles</h4>
                    <p className="text-sm text-gray-600">
                      Owner of Rental Bikes
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                  <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Call Now</span>
                  </button>
                  <button className="border border-gray-300 text-black px-3 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 w-full sm:w-auto justify-center">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>WhatsApp Chat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Before Ride */}
            <div className="p-6">
              <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-black mb-4">
                Before Your Ride
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-500" />
                  </div>
                  <span className="text-sm md:text-base lg:text-lg text-gray-700">
                    Keep a valid driving license ready.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-500" />
                  </div>
                  <span className="text-sm md:text-base lg:text-lg text-gray-700">
                    Wear a helmet (provided with rental).
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-gray-500" />
                  </div>
                  <span className="text-sm md:text-base lg:text-lg text-gray-700">
                    Inspect the bike upon delivery.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Rental Summary */}

          <div className="sticky top-8 flex flex-col gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-xl border">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-4 sm:mb-6">
                Your Rental Summary
              </h2>

              {/* Bike Info */}
              <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-red">
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
                <div>
                  <span className="text-xs sm:text-sm text-gray-600 block">
                    Rental Duration:
                  </span>
                  <span className="font-medium text-black text-sm">3 Days</span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-gray-600 block">
                    Delivery Address:
                  </span>
                  <span className="font-medium text-black text-sm">
                    901 Thornidge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>
              </div>

              {/* Payment */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="font-bold text-sm text-black mb-3">
                  Payment Details
                </h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium text-black">$220.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Deposit:</span>
                    <span className="font-medium text-black">$220.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">
                      If Bike Cancellation Within 24 Hour
                    </span>
                    <span className="text-green-600 text-[10px] sm:text-xs bg-green-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                      Refundable
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 hover:bg-green-100 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>View Invoice PDF</span>
                </button>
              </div>
            </div>

            {/* Help */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl min-h-[160px] flex flex-col justify-between">
              <h4 className="font-bold text-sm sm:text-base text-black mb-2">
                Need Help With Your Booking?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-3">
                Our support team is available 24/7 to assist you with any issues
                or questions.
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-black text-white py-2.5 sm:py-3 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </button>
                <button className="flex-1 border border-gray-300 text-black py-2.5 sm:py-3 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
