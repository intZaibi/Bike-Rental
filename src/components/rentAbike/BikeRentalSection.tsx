"use client";
import React, { useState, useMemo } from "react";
import { X } from "lucide-react"; // close icon
import FilterComponent from "./FilterComponent";
import RentalItem from "./RentalItems";
import { BikeData } from "../RentalItemBox";
import { SlidersHorizontal } from "lucide-react";

// Types
interface FilterState {
  types: string[];
  locationPinCode: string;
  ratings: number[];
  priceRange: [number, number];
  availableOnly: boolean;
}

// Sample data - replace with your actual data
const sampleBikes: BikeData[] = [
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
    name: "City Scooter",
    image: "/b2.jpg",
    rating: 4.8,
    reviewCount: 8,
    price: 35,
    isAvailable: true,
    type: "scooter",
  },
  {
    id: "3",
    name: "Electric Bike",
    image: "/b3.jpg",
    rating: 4.9,
    reviewCount: 15,
    price: 75,
    isAvailable: false,
    type: "electric",
  },
  {
    id: "4",
    name: "Mountain Bike",
    image: "/b4.jpg",
    rating: 4.7,
    reviewCount: 20,
    price: 60,
    isAvailable: true,
    type: "mtb",
  },
  {
    id: "5",
    name: "Beach Cruiser",
    image: "/b5.jpg",
    rating: 4.5,
    reviewCount: 10,
    price: 45,
    isAvailable: true,
    type: "standard",
  },
  {
    id: "6",
    name: "Sport Scooter",
    image: "/b6.jpg",
    rating: 4.6,
    reviewCount: 18,
    price: 55,
    isAvailable: true,
    type: "scooter",
  },
  {
    id: "7",
    name: "E-Mountain",
    image: "z6.jpg",
    rating: 5.0,
    reviewCount: 25,
    price: 90,
    isAvailable: true,
    type: "electric",
  },
  {
    id: "8",
    name: "bike ride",
    image: "/z2.jpg",
    rating: 4.4,
    reviewCount: 12,
    price: 65,
    isAvailable: false,
    type: "mtb",
  },
  {
    id: "9",
    name: "City Electric",
    image: "z3.jpg",
    rating: 4.8,
    reviewCount: 14,
    price: 80,
    isAvailable: true,
    type: "electric",
  },
  {
    id: "10",
    name: "Road Bike",
    image: "z5.jpg",
    rating: 4.3,
    reviewCount: 9,
    price: 55,
    isAvailable: true,
    type: "standard",
  },
  {
    id: "11",
    name: "Road Bike",
    image: "z7.jpg",
    rating: 4.3,
    reviewCount: 9,
    price: 55,
    isAvailable: true,
    type: "standard",
  },
];

const BikeRentalSection: React.FC = () => {
  // State management
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    locationPinCode: "",
    ratings: [],
    priceRange: [0, 200],
    availableOnly: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // mobile sidebar

  const itemsPerPage = 6;

  // Filter logic (same as yours)
  const filteredBikes = useMemo(() => {
    return sampleBikes.filter((bike) => {
      if (filters.types.length > 0 && !filters.types.includes(bike.type))
        return false;
      if (
        filters.ratings.length > 0 &&
        !filters.ratings.includes(Math.floor(bike.rating))
      )
        return false;
      if (bike.price > filters.priceRange[1]) return false;
      if (filters.availableOnly && !bike.isAvailable) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBikes = filteredBikes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handlers
  const handleFiltersChange = (newFilters: FilterState) =>
    setFilters(newFilters);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleViewDetails = (bikeId: string) =>
    console.log("View details:", bikeId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h1 className="text-2xl font-semibold text-gray-900">
            Recent Added Bikes
          </h1>

          {/* Mobile filter toggle button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center px-3 py-2 text-black rounded-xl border border-gray-200 bg-white"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block">
            <FilterComponent
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-40"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Drawer */}
              <div className="relative w-72 bg-white h-full shadow-lg p-4 overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                  <X size={24} />
                </button>

                <FilterComponent
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {paginatedBikes.length} of {filteredBikes.length} bikes
              </p>
            </div>

            {/* Items Display */}
            <RentalItem
              bikes={paginatedBikes}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeRentalSection;
