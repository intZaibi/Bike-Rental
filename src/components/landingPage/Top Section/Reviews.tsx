import Image from "next/image";
import { useState } from "react";

interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

const Reviews = () => {

  const [customerReviews] = useState<CustomerReview[]>([
    { id: '1', name: 'John D.', avatar: '/r1.png', rating: 5 },
    { id: '2', name: 'Sarah M.', avatar: '/r2.png', rating: 5 },
    { id: '3', name: 'Mike P.', avatar: '/r3.png', rating: 4 },
  ]);

  const [totalCustomers, setTotalCustomers] = useState<number>(250);

  const [averageRating, setAvergaeRating] =useState<number>(4.8);
  

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
    return (
      <div className="mb-8 flex items-center space-x-4">
        <div className="flex -space-x-2">
          {customerReviews.slice(0, 3).map((customer) => (
            <div
              key={customer.id}
              className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
            >
              <Image
                src={customer.avatar}
                alt={`${customer.name} avatar`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-white font-semibold text-sm">{averageRating.toFixed(1)}</span>
          </div>
          <p className="text-white text-sm opacity-90">
            Trusted by {totalCustomers}+ happy customers
          </p>
      </div>
    </div> 
  )
}

export default Reviews;