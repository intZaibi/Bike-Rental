"use client";

import Image from "next/image";
import React from "react";
import {
  Bike,
  ShieldCheck,
  MapPin,
  Users,
  Headphones,
  Clock,
} from "lucide-react";
import CustomerReviewSection from "../customerreviesSection/CustomerReviewSection";
import BikeRentalFeatures from "../landingPage/BikeRentalFeatures";

interface FeatureData {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureBox: React.FC<{ feature: FeatureData }> = ({ feature }) => {
  const { icon: Icon, title, description } = feature;

  return (
    <div
      className="bg-white border border-gray-100 rounded-lg 
                 p-2 sm:p-4 flex flex-col items-start gap-y-2
                 w-[48%] sm:w-80 min-h-[140px] sm:min-h-[180px] mb-3
                 shadow-sm hover:shadow-md transition"
    >
      {/* Icon */}
      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 rounded-full">
        <Icon className="text-black w-4 h-4 sm:w-6 sm:h-6" />
      </div>

      {/* Title */}
      <h3 className="text-black font-semibold text-xs sm:text-lg leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[10px] sm:text-base leading-relaxed text-gray-700">
        {description}
      </p>
    </div>
  );
};

const offers: FeatureData[] = [
  {
    title: "Premium Bikes",
    description:
      "High-quality city bikes, mountain bikes, and electric bikes regularly maintained and serviced for your safety and comfort.",
    icon: Bike,
  },
  {
    title: "Flexible Rentals",
    description:
      "Hourly, daily, weekly, and monthly rental options to suit your needs, whether it's a quick trip or extended exploration.",
    icon: Clock,
  },
  {
    title: "Safety Equipment",
    description:
      "Complimentary helmets, locks, and safety gear with every rental to ensure your peace of mind during your cycling adventure.",
    icon: ShieldCheck,
  },
  {
    title: "Multiple Locations",
    description:
      "Convenient pickup and drop-off locations throughout the city, making it easy to start and end your journey.",
    icon: MapPin,
  },
  //   {
  //     title: "Guided Tours",
  //     description:
  //       "Join our experienced guides for curated cycling tours showcasing the best routes and hidden gems of the city.",
  //     icon: Users,
  //   },
  //   {
  //     title: "24/7 Support",
  //     description:
  //       "Round-the-clock customer support and emergency assistance to help you whenever you need it during your rental period.",
  //     icon: Headphones,
  //   },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20">
        {/* Darker Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/60 z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-xl">
            Explore the City on Two Wheels
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg mb-10 opacity-95">
            Welcome to Lighting Bike, the innovative, robust service for affordable
            and flexible rentals.
          </p>
          {/* <button className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
            Book Your Ride
          </button> */}
        </div>

        {/* Hero Background Image */}
        <Image
          src="/about/hero-bikes.jpg"
          alt="Modern bike rental station"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
              We started our journey with a vision to make bike rentals more
              accessible and reliable for everyone.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Our commitment has always been to deliver quality and sustainable
              rentals for the individuals using our service.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/about/vehicles-collection.jpg"
              alt="Cyclist enjoying the journey"
              width={600}
              height={400}
              className="w-full h-72 sm:h-96 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <BikeRentalFeatures />

      {/* Why Choose Us */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Lighting Bike?
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Quality & Reliability
              </h3>
              <p className="text-gray-600 mb-4">
                Our bikes are from prominent, trusted brands such as 
                Letric, Concord or Nishiki. You won't be second guessing
                on Bike quality with us.
              </p>
              <p className="text-gray-600">
                With our selections and delivery options, you're able to 
                be confident that we'll be able to provide you a bike across
                very many situations. You can have faith that you're in good hands.
              </p>
            </div>
            <Image
              src="/about/bike-maintenance.jpg"
              alt="Professional bike maintenance workshop"
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <Image
              src="/about/happy-customers.jpg"
              alt="People enjoying cycling in the city"
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-xl shadow-md lg:order-1"
            />
            <div className="lg:order-2">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Customer Experience
              </h3>
              <p className="text-gray-600 mb-4">
                We believe in making cycling accessible and enjoyable for
                everyone. Our friendly staff provides personalized
                recommendations and ensures you get the perfect bike for your
                needs.
              </p>
              <p className="text-gray-600">
                From beginners to experienced cyclists, we cater to all skill
                levels with appropriate bikes and helpful guidance to make your
                experience memorable.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Variety & Innovation
              </h3>
              <p className="text-gray-600 mb-4">
                Our extensive fleet includes traditional city bikes, mountain
                bikes, electric bikes, and specialty bikes to match any
                adventure or practical need you might have.
              </p>
              <p className="text-gray-600">
                We continuously update our inventory with the latest models and
                eco-friendly options, ensuring you have access to the best
                cycling technology available.
              </p>
            </div>
            <Image
              src="/about/bike-variety.jpg"
              alt="Variety of bikes available for rent"
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </section> */}

      {/* <CustomerReviewSection /> */}

      {/* Call to Action */}
      {/* <section className="relative py-16 text-white text-center"> */}
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/70 z-0"></div> */}

        {/* Background Image */}
        {/* <Image
          src="/about/shop-storefront.jpg"
          alt="Bike rental storefront"
          fill
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-lg">
            Ready to Start Your Cycling Adventure?
          </h2>
          <p className="text-lg mb-8 opacity-95 drop-shadow">
            Join thousands of satisfied customers who have discovered the joy of
            cycling with BikeRental. Contact us today to reserve your bike and
            explore the city like never before.
          </p>
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
            Reserve Now
          </button>
        </div> */}
      {/* </section> */}
    </div>
  );
};

export default About;
