"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const HeroSection: React.FC = () => {
  // Dynamic categories
  const [categories] = useState<string[]>([
    "City Bikes",
    "Off Road",
    "Electric",
    "For Couple",
    "Business Use",
    "Cafe Racer",
    "Motor Bikes",
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative h-[90vh] mx-4 flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/rentabikeHero.jpg" // make sure this matches your image path
          alt="Riding a bike on road"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Discover the Ride That <br /> Fits Your Lifestyle
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-100 mb-8">
          Browse through a wide range of bikes—from city commuters to weekend
          explorers.
        </p>

        {/* Search bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-2xl mx-auto mb-6">
          <Search className="text-gray-500 ml-3 w-5 h-5" />
          <input
            type="text"
            placeholder="Search For Bikes You Are Looking For"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-3 text-gray-700 outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mx-auto gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-5 py-2 rounded-full text-white 
             backdrop-blur-md bg-white/10 
             hover:bg-white/20 hover:text-white 
             transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
