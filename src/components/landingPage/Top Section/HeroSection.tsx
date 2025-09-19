"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Reviews from './Reviews';
import Link from 'next/link';

const BikeRentalHero: React.FC = () => {
  // Hardcoded customer reviews in state

  const handleBrowseBikes = () => {
    console.log('Browse bikes clicked');
  };

  const handleBookRide = () => {
    console.log('Book ride clicked');
  };

  return (
    <div className="relative h-[90vh] mx-4  flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <Image
          src="/herosection.jpg"
          alt="Person with bike helmet"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[90%] mx-auto px-4 sm:px-4 lg:px-5 w-full">
        <div className="max-w-2xl">
          {/* Customer Reviews */}
          {/* <Reviews/> */}

          {/* Heading */}
          <h1 className="text-2xl font-semibold sm:text-5xl lg:text-6xl lg:font-bold text-white leading-tight mb-6">
            Rent a Bike. <br/>Get It Delivered. <br/>Ride Freely.
          </h1>
          <p className='text-md sm:text-xl text-gray-100 mb-8'>
              E-bike rentals made easy starting at just $5 a day. 
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <button
              onClick={handleBrowseBikes}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Browse All Bikes
            </button> */}
            {/* <Link href='bike/bike-booking'>
              <button
                onClick={handleBookRide}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Book Your Ride
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeRentalHero;
