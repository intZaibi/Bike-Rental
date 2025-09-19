import React from "react";
import { CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
// Types
interface RentalStep {
  id: number;
  title: string;
  description: string;
}

interface SafetyFeature {
  id: string;
  text: string;
  icon: "check" | "shield";
}

// Sample data
const rentalSteps: RentalStep[] = [
  {
    id: 1,
    title: "Enter Your Info",
    description: "Enter a Delivery and Pickup Location.",
  },
  {
    id: 2,
    title: "Schedule",
    description: "Confirm payment information and your rental",
  },
  {
    id: 3,
    title: "Ride",
    description: "Go where you need to, whenever you need to.",
  },
];

const safetyFeatures: SafetyFeature[] = [
  {
    id: "1",
    text: "Sanitized bikes before each delivery",
    icon: "check",
  },
  {
    id: "2",
    text: "Helmet included (on request)",
    icon: "check",
  },
  {
    id: "3",
    text: "Free repairs for long-term rentals",
    icon: "check",
  },
  {
    id: "4",
    text: "24/7 support team",
    icon: "check",
  },
];

// Safety Section Component
const RentalStepsSection: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-8 max-w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden h-auto lg:h-96">
        {/* Left Side - Image */}
        <div className="flex-1 relative h-48 sm:h-56 lg:h-full">
          <img
            src="/s2.jpg"
            alt="Person riding bike on beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 bg-gray-900 text-white p-4 sm:p-6 lg:p-8 h-auto lg:h-full">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold mb-3 sm:mb-4">
            Rent Your Bike in 3 Easy Steps
          </h2>

          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            {rentalSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-3 sm:gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-white text-gray-900 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm lg:text-base">
                  {step.id}
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-sm xl:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start">
          <Link href='bike/bike-booking'>
            <button className="bg-white text-gray-900 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm lg:text-base xl:text-lg">
              Rent A Bike Now
            </button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const SafetySection: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-8 max-w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden h-auto lg:h-96">
        {/* Left Side - Content */}
        <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 xl:p-10 h-auto lg:h-full flex flex-col justify-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            We Care About Your Safety
          </h2>

          {/* Safety Features List */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {safetyFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  <CheckCircle
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-700"
                    strokeWidth={3}
                  />
                </div>
                <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Quality Guarantee */}
          <div className="bg-white rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                <ShieldCheck />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm lg:text-base">
                  Quality Guarantee
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                  If you are not satisfied with your bike, we will replace it
                  free of charge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 relative h-48 sm:h-56 lg:h-full">
          <img
            src="/s1.jpg"
            alt="Person riding bike on beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

// Main Combined Component
const BikeRentalAndSafety = () => {
  return (
    <div className="bg-white">
      <RentalStepsSection />
      {/* <SafetySection /> */}
    </div>
  );
};

export default BikeRentalAndSafety;
