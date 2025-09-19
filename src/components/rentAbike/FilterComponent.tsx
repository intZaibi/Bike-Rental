import React from 'react';

interface FilterState {
  types: string[];
  locationPinCode: string;
  ratings: number[];
  priceRange: [number, number];
  availableOnly: boolean;
}

interface FilterComponentProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filters, onFiltersChange }) => {
  const handleTypeChange = (type: string) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    onFiltersChange({ ...filters, types: updatedTypes });
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];

    onFiltersChange({ ...filters, ratings: updatedRatings });
  };

  const handlePriceRangeChange = (max: number) => {
    onFiltersChange({ ...filters, priceRange: [0, max] });
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-sm">
      {/* Bike Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Bike Type</h3>
        <div className="space-y-2 ml-4">
          {[
            { key: 'standard', label: 'Standard' },
            { key: 'scooter', label: 'Scooter' },
            { key: 'electric', label: 'Electric' },
            { key: 'mtb', label: 'MTB' },
          ].map((type) => (
            <label
              key={type.key}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type.key)}
                onChange={() => handleTypeChange(type.key)}
                className="w-4 h-4 accent-black rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Pin Code */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Location Pin Code</h3>
        <input
          type="text"
          placeholder="000000"
          value={filters.locationPinCode}
          onChange={(e) =>
            onFiltersChange({ ...filters, locationPinCode: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Ratings</h3>
        <div className="space-y-2 ml-4">
          {[5, 4, 3].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.ratings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 accent-black rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{rating} Star</span>
            </label>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.ratings.length === 0}
              onChange={() => onFiltersChange({ ...filters, ratings: [] })}
              className="w-4 h-4 accent-black rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">No Ratings</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Only */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Available Only</h3>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) =>
              onFiltersChange({ ...filters, availableOnly: e.target.checked })
            }
            className="w-4 h-4 accent-black rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">Show Only Available Bikes</span>
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
