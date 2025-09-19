import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RentalItemBox from "../RentalItemBox";
import { BikeData } from "../RentalItemBox";
import { useRouter } from "next/navigation";
interface ItemDisplayProps {
  bikes: BikeData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Pagination Component (internal)
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : page === "..."
              ? "cursor-default"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const RentalItem: React.FC<ItemDisplayProps> = ({
  bikes,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();
  const handleViewDetails = (bikeId: string) => {
    router.push("/bike");
  };
  return (
    <div>
      {/* Items Grid */}
      {bikes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No bikes found matching your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {bikes.map((bike) => (
            <RentalItemBox
              key={bike.id}
              bike={bike}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default RentalItem;
