"use client";
import React from "react";
import { Star, ExternalLink } from "lucide-react";

// Types for TypeScript
export interface BikeData {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  isAvailable: boolean;
  type: "standard" | "scooter" | "electric" | "mtb";
}

interface BikeItemProps {
  bike: BikeData;
  onViewDetails?: (bikeId: string) => void;
}

// Individual Bike Item Component
const RentalItemBox: React.FC<BikeItemProps> = ({ bike, onViewDetails }) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(bike.id);
    }
  };

  return (
    <div className="bg-white overflow-hidden group h-80">
      {/* Image Container */}
      <div className="relative h-4/5 overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover rounded-3xl"
        />
        <button
          onClick={handleViewDetails}
          className="absolute top-3 right-3 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70 transition-all"
        >
          <ExternalLink size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="h-1/5 px-4 py-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {bike.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">
              {bike.rating} ({bike.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-gray-900">
            ${bike.price}/ Day
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                bike.isAvailable ? "bg-yellow-400" : "bg-red-400"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                bike.isAvailable ? "text-yellow-600" : "text-red-600"
              }`}
            >
              {bike.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalItemBox;
