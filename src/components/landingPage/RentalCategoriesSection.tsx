"use client";
import React from "react";

// Types
interface Category {
  id: string;
  name: string;
  image: string;
}

// Sample data
const categories: Category[] = [
  {
    id: "1",
    name: "Simple Bikes",
    image: "/w6.jpg",
  },
  {
    id: "2",
    name: "Mountain Bikes",
    image: "/w5.jpg",
  },
  {
    id: "3",
    name: "Mens Bike",
    image: "/w4.jpg",
  },
  {
    id: "4",
    name: "Gear Bikes",
    image: "/w3.jpg",
  },
  {
    id: "5",
    name: "Scooters",
    image: "/w2.jpg",
  },
  {
    id: "6",
    name: "EV Bikes",
    image: "/w1.jpg",
  },
];

// Category Item Component
const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <div className="flex flex-col items-center group cursor-pointer w-24 md:w-32">
      {/* Image Container */}
      <div className="relative w-20 h-20 md:w-32 md:h-32 mb-3 md:mb-4 overflow-hidden rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      </div>

      {/* Category Name */}
      <h3 className="text-xs md:text-sm font-medium text-gray-900 text-center group-hover:text-gray-700 transition-colors duration-200 whitespace-nowrap">
        {category.name}
      </h3>
    </div>
  );
};

// Main Rental Categories Section Component
const RentalCategoriesSection = () => {
  return (
    <section className="py-12 max-w-[90%] mx-auto">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Our Rental Category
        </h2>
      </div>

      {/* Categories - Mobile Horizontal Scroll, Desktop Grid */}
      <div className="block md:hidden">
        {/* Mobile Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0">
              <CategoryItem category={category} />
            </div>
          ))}
        </div>

        {/* Dots Indicator (Mobile only) */}
        <div className="flex justify-center mt-2 space-x-2">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
        {/* Desktop Grid */}
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RentalCategoriesSection;
