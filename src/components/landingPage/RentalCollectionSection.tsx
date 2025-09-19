"use client";
import { useRouter } from "next/navigation";
import React from "react";
import RentalItemBox, { BikeData } from "@/components/RentalItemBox";
import Link from "next/link";
const RentalCollectionSection: React.FC = () => {
  const router = useRouter();

  // Sample bike data
  const bikeData: BikeData[] = [
    {
      id: "1",
      name: "Urban Cruiser",
      image: "/b1.jpg",
      rating: 5.0,
      reviewCount: 12,
      price: 50,
      isAvailable: true,
      type: "standard",
    },
    {
      id: "2",
      name: "Mopads",
      image: "/b2.jpg",
      rating: 5.0,
      reviewCount: 12,
      price: 50,
      isAvailable: true,
      type: "scooter",
    },
    {
      id: "3",
      name: "Urban Cruiser",
      image: "/b3.jpg",
      rating: 5.0,
      reviewCount: 12,
      price: 50,
      isAvailable: true,
      type: "electric",
    },
    {
      id: "4",
      name: "EV Bikes",
      image: "/b4.jpg",
      rating: 5.0,
      reviewCount: 12,
      price: 50,
      isAvailable: true,
      type: "electric",
    },
    {
      id: "5",
      name: "Cafe Racer",
      image: "/b5.jpg",
      rating: 5.0,
      reviewCount: 12,
      price: 50,
      isAvailable: true,
      type: "mtb",
    },
    {
      id: "6",
      name: "Sports Bike",
      image: "/b6.jpg",
      rating: 5.0,
      reviewCount: 12,
      price: 50,
      isAvailable: true,
      type: "standard",
    },
  ];

  const handleViewDetails = (bikeId: string) => {
    console.log("View details for bike:", bikeId);
    router.push("/bike");
  };

  const handleViewAll = () => {
    console.log("View all vehicles clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[90%] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Our Rental Bike Collection
          </h1>

          {/* Show only on desktop */}
          <Link href="/rent-bikes">
            <button
              onClick={handleViewAll}
              className="hidden md:block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
            >
              View All Vehicles
            </button>
          </Link>
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikeData.map((bike) => (
            <RentalItemBox
              key={bike.id}
              bike={bike}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Show only on mobile (below the grid) */}
        <div className="mt-6 text-center md:hidden">
          <button
            onClick={handleViewAll}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            View All Vehicles
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalCollectionSection;
