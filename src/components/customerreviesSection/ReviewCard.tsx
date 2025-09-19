import React from "react";

// Types
export interface Review {
  id: string;
  rating: number;
  review: string;
  customer: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 min-h-[200px] flex flex-col">
      {/* Stars */}
      <div className="flex mb-4">{renderStars(review.rating)}</div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
        {review.review}
      </p>

      {/* Customer Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 mr-3">
          <img
            src={review.customer.avatar}
            alt={review.customer.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            {review.customer.name}
          </h4>
          <p className="text-gray-500 text-xs">{review.customer.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
