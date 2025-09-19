"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard, { Review } from "./ReviewCard";

// Sample data
const reviews: Review[] = [
  {
    id: "1",
    rating: 5,
    review:
      "Booked a mountain bike for a weekend trip. Delivered on time and in great condition!",
    customer: {
      name: "Marvin McKinney",
      role: "Bike Rider",
      avatar: "/r3.png",
    },
  },
  {
    id: "2",
    rating: 5,
    review:
      "Loved how easy it was to schedule delivery and pickup. 100% recommend.",
    customer: {
      name: "Kathryn Murphy",
      role: "Bike Rider",
      avatar: "/r2.png",
    },
  },
  {
    id: "3",
    rating: 5,
    review:
      "The bikes were in excellent condition and the customer service was outstanding. Will definitely use again!",
    customer: {
      name: "Esther Howard",
      role: "Bike Rider",
      avatar: "/c3.png",
    },
  },
  {
    id: "4",
    rating: 5,
    review:
      "Amazing experience! The booking process was smooth and the bike quality exceeded expectations.",
    customer: {
      name: "John Doe",
      role: "Adventure Seeker",
      avatar: "/c1.png",
    },
  },
  {
    id: "5",
    rating: 4,
    review:
      "Great service and reliable bikes. Perfect for my weekend adventures.",
    customer: {
      name: "Jane Smith",
      role: "Weekend Rider",
      avatar: "/c2.png",
    },
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
const CustomerReviewSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const handlePrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="py-12 px-4 sm:px-8 max-w-[90%] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
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

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Pagination Dots */}
      {reviews.length > itemsPerPage && (
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

export default CustomerReviewSection;
