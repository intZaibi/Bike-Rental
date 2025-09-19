"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RentalItemBox, { BikeData } from "../RentalItemBox"; // Import your existing component

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
    type: "standard", // ✅ added type
  },
  {
    id: "2",
    name: "Mopads",
    image: "/b2.jpg",
    rating: 5.0,
    reviewCount: 12,
    price: 50,
    isAvailable: true,
    type: "scooter", // ✅ added type
  },
  {
    id: "3",
    name: "Urban Cruiser",
    image: "/b3.jpg",
    rating: 5.0,
    reviewCount: 12,
    price: 50,
    isAvailable: true,
    type: "electric", // ✅ added type
  },
  {
    id: "4",
    name: "EV Bikes",
    image: "/b4.jpg",
    rating: 5.0,
    reviewCount: 12,
    price: 50,
    isAvailable: true,
    type: "electric", // ✅ added type
  },
  {
    id: "5",
    name: "Cafe Racer",
    image: "/b5.jpg",
    rating: 5.0,
    reviewCount: 12,
    price: 50,
    isAvailable: true,
    type: "mtb", // ✅ added type
  },
  {
    id: "6",
    name: "Sports Bike",
    image: "/b6.jpg",
    rating: 5.0,
    reviewCount: 12,
    price: 50,
    isAvailable: true,
    type: "standard", // ✅ added type
  },
];

// Navigation Button Component
interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-10 h-10 rounded-xl border-2 flex items-center justify-center
        transition-all duration-200
        ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-white border-black text-black"
            : "bg-black border-black text-white hover:bg-white hover:text-black hover:border-black active:scale-95"
        }
      `}
    >
      {direction === "prev" ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
    </button>
  );
};

// Main Section
const SimilarBikesSection: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, bikeData.length - itemsPerPage);

  const handlePrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  const handleViewDetails = (bikeId: string) => {
    console.log("View details for bike:", bikeId);
    router.push("/bike");
  };

  const visibleBikes = bikeData.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="py-12 px-4 sm:px-8 max-w-[90%] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Similar Bikes</h2>
        <div className="flex gap-2">
          <NavigationButton
            direction="prev"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          />
          <NavigationButton
            direction="next"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          />
        </div>
      </div>

      {/* Bikes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBikes.map((bike) => (
          <RentalItemBox
            key={bike.id}
            bike={bike}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Pagination Dots */}
      {bikeData.length > itemsPerPage && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? "bg-gray-800"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarBikesSection;
