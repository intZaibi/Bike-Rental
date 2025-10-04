import React from "react";
import { Bike, Package, CheckCircle, ClipboardCheck } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Types
interface FeatureData {
  id: number;
  icon: LucideIcon | string;
  title: string;
  description: string;
}

const BikeRentalFeatures: React.FC = () => {
  const features: FeatureData[] = [
    {
      id: 1,
      icon: ClipboardCheck,
      title: "Wide Selection",
      description:
        "From city bikes to gravel rides pick what suits your journey.",
    },
    {
      id: 2,
      icon: Bike,
      title: "Flexible Rentals",
      description: "Rent as long as a day, week, or even month. Your choice.",
    },
    {
      id: 3,
      icon: Package,
      title: "Doorstep Delivery",
      description: "Pick up not necessary. We deliver and collect from your address.",
    }
  ];

  const FeatureBox: React.FC<{ feature: FeatureData }> = ({ feature }) => {
    const { icon: Icon, title, description } = feature;

    return (
      <div
        className="bg-white border border-gray-100 rounded-lg 
                   p-2 sm:p-4 flex flex-col items-start gap-y-2
                   w-[48%] sm:w-80 min-h-[140px] sm:min-h-[180px] mb-3"
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

  return (
    <div className="py-10 sm:py-16 bg-gray-50">
      <div className="max-w-[90%] mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header */}
        <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-12">
          What Makes Us Different
        </h2>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-between sm:justify-center sm:gap-2">
          {features.map((feature) => (
            <FeatureBox key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeRentalFeatures;
