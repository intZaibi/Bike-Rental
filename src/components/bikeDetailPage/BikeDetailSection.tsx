"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Settings,
  Cog,
} from "lucide-react";
import { GiHelmet } from "react-icons/gi";

interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

interface MotorcycleDetail {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  tagline: string;
  price: number;
  currency: string;
  availability: string;
  seater: string;
  fuelType: string;
  modelYear: number;
  fullDescription: string;
  images: string[];
  specifications: {
    engine: string;
    mileage: string;
    gearType: string;
    helmet: string;
  };
  location: string;
  contactNumber: string;
}

const customerReviews: CustomerReview[] = [
  { id: "1", name: "Ahmad K.", avatar: "/r1.png", rating: 5 },
  { id: "2", name: "Sarah M.", avatar: "/r2.png", rating: 5 },
  { id: "3", name: "Mike R.", avatar: "/r3.png", rating: 5 },
];

const sampleMotorcycleData: MotorcycleDetail = {
  id: "yamaha-fz-x-001",
  name: "Yamaha FZ X",
  rating: 5.0,
  reviewCount: 250,
  description: "Smooth, Powerful & Perfect for City Cruising",
  tagline: "Built for everyday adventures - rent it your way.",
  price: 50,
  currency: "$",
  availability: "Available Now",
  seater: "Two Seater",
  fuelType: "Petrol",
  modelYear: 2022,
  fullDescription:
    "Whether you're zipping through traffic or exploring a new city, the Yamaha FZ X makes every ride feel like a breeze. Reliable, stylish, and easy on your wallet.",
  images: ["/b6.jpg", "/b5.jpg", "/b4.jpg"],
  specifications: {
    engine: "149 CC",
    mileage: "45 Km / L",
    gearType: "Manual",
    helmet: "Included",
  },
  location: "Downtown Lahore",
  contactNumber: "(+1) 234567890!",
};

const BikeDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const motorcycle = sampleMotorcycleData;

  const averageRating =
    customerReviews.reduce((sum, review) => sum + review.rating, 0) /
    customerReviews.length;
  const totalCustomers = motorcycle.reviewCount;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  const features: string[] = [
    "Comfortable upright seating for long rides",
    "USB charging port",
    "Smooth suspension for off roads",
    "5-star rated safety checks",
  ];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % motorcycle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + motorcycle.images.length) % motorcycle.images.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[90%] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-gray-50 rounded-md p-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={motorcycle.images[currentImageIndex]}
                  alt={`${motorcycle.name} - Main Image`}
                  fill
                  className="object-cover"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-md sm:shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-md sm:shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {motorcycle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={200}
                      height={133}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-10 sm:space-y-14">
              <div className="space-y-6 mt-4 sm:mt-6 border-b border-gray-400 pb-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <h1 className="text-2xl sm:text-4xl font-bold text-black">
                      {motorcycle.name}
                    </h1>

                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex -space-x-2">
                        {customerReviews.slice(0, 3).map((customer) => (
                          <div
                            key={customer.id}
                            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden"
                          >
                            <Image
                              src={customer.avatar}
                              alt={`${customer.name} avatar`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(Math.round(averageRating))}
                          </div>
                          <span className="text-black font-semibold text-sm">
                            {averageRating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Trusted by {totalCustomers}+ happy customer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <div className="space-y-2">
                      <h2 className="text-lg sm:text-xl text-gray-800 mb-2 sm:mb-0">
                        {motorcycle.description}
                      </h2>
                      <p className="text-gray-600 italic text-sm sm:text-base">
                        {motorcycle.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="pr-4 py-1 sm:py-2 text-gray-700 font-medium border-r-2 border-black text-sm sm:text-base">
                          {motorcycle.seater}
                        </span>
                        <span className="px-4 py-1 sm:py-2 text-gray-700 font-medium border-r-2 border-black text-sm sm:text-base">
                          {motorcycle.fuelType}
                        </span>
                        <span className="px-4 py-1 sm:py-2 text-gray-700 font-medium text-sm sm:text-base">
                          {motorcycle.modelYear} Model
                        </span>
                      </div>
                    </div>

                    {/* Availability Button (Full width on mobile) */}
                    <div className="w-full mt-2 sm:mt-0 sm:w-auto">
                      <p
                        className="text-center sm:text-left text-black bg-white shadow-sm px-3 py-2 
                        border rounded-full sm:rounded-xl font-medium text-sm sm:text-base 
                        w-full sm:w-auto"
                      >
                        {motorcycle.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-md">
                  {motorcycle.fullDescription}
                </p>

                {/* Pricing */}
                <div className="p-2 flex flex-row sm:items-center justify-between sm:justify-normal sm:space-x-6">
                  {/* Price */}
                  <div className="flex items-baseline space-x-1 sm:space-x-2">
                    <span className="text-3xl sm:text-5xl font-bold text-black">
                      {motorcycle.currency}
                      {motorcycle.price}
                    </span>
                    <span className="text-gray-600 text-base sm:text-lg">
                      / Per Day
                    </span>
                  </div>

                  {/* Buttons wrapper */}
                  <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
                    <Link
                      href="/bike/bike-booking"
                      className="w-full sm:w-auto"
                    >
                      <button
                        className="bg-black text-white py-3 sm:py-3 px-4 sm:px-6 
          rounded-full font-semibold hover:bg-gray-800 transition-colors 
          text-sm sm:text-base w-full sm:w-auto"
                      >
                        Rent This Bike
                      </button>
                    </Link>

                    <div className="text-center sm:text-left w-full sm:w-auto">
                      <span className="block font-medium text-base sm:text-base">
                        Or Book By Call
                      </span>
                      <p className="text-gray-600 text-base sm:text-base">
                        {motorcycle.contactNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                  Key Specifications
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SpecItem
                    icon={<Cog className="w-5 h-5 text-black" />}
                    label="Engine"
                    value={motorcycle.specifications.engine}
                  />
                  <SpecItem
                    icon={<Gauge className="w-5 h-5 text-black" />}
                    label="Mileage"
                    value={motorcycle.specifications.mileage}
                  />
                  <SpecItem
                    icon={<Settings className="w-5 h-5 text-black" />}
                    label="Gear Type"
                    value={motorcycle.specifications.gearType}
                  />
                  <SpecItem
                    icon={<GiHelmet className="w-5 h-5 text-black" />}
                    label="Helmet"
                    value={motorcycle.specifications.helmet}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-6 ">
          <h3 className="text-lg font-bold text-black mb-4">
            Vehicle Features
          </h3>
          <ul className="space-y-3 sm:space-y-4 ">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-black text-sm sm:text-base">{value}</p>
    </div>
  </div>
);

export default BikeDetailPage;
