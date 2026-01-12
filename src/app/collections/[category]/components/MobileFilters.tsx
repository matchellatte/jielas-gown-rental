'use client';

import { SlidersHorizontal } from "lucide-react";

interface MobileFiltersProps {
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  filteredGownsCount: number;
  availabilityFilter: string[];
  toggleAvailability: (value: string) => void;
  resetAvailability: () => void;
  inStockCount: number;
  outOfStockCount: number;
   colorFilter: string[];
   toggleColor: (value: string) => void;
   resetColor: () => void;
   availableColors: string[];
  priceRange: string;
  setPriceRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function MobileFilters({
  showMobileFilters,
  setShowMobileFilters,
  filteredGownsCount,
  availabilityFilter,
  toggleAvailability,
  resetAvailability,
  inStockCount,
  outOfStockCount,
   colorFilter,
   toggleColor,
   resetColor,
   availableColors,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}: MobileFiltersProps) {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter and sort
        </button>
        <span className="text-sm text-gray-700">{filteredGownsCount} products</span>
      </div>

      {showMobileFilters && (
        <div className="mb-8 border-t pt-6 space-y-6">
          {/* Availability Filter Mobile */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-900">Availability</span>
              {availabilityFilter.length > 0 && (
                <button
                  onClick={resetAvailability}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availabilityFilter.includes("in-stock")}
                  onChange={() => toggleAvailability("in-stock")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">In stock ({inStockCount})</span>
              </label>
              <label className="flex items-center gap-3 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availabilityFilter.includes("out-of-stock")}
                  onChange={() => toggleAvailability("out-of-stock")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Out of stock ({outOfStockCount})</span>
              </label>
            </div>
          </div>

          {/* Color Filter Mobile */}
          {availableColors.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-900">Color</span>
                {colorFilter.length > 0 && (
                  <button
                    onClick={resetColor}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {availableColors.map((color) => (
                  <label
                    key={color}
                    className="flex items-center gap-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={colorFilter.includes(color)}
                      onChange={() => toggleColor(color)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{color}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Filter Mobile */}
          <div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-900">Price</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setPriceRange("all");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  priceRange === "all" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setPriceRange("under-2000");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  priceRange === "under-2000" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Under ₱2,000
              </button>
              <button
                onClick={() => {
                  setPriceRange("2000-3000");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  priceRange === "2000-3000" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                ₱2,000 - ₱3,000
              </button>
              <button
                onClick={() => {
                  setPriceRange("3000-5000");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  priceRange === "3000-5000" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                ₱3,000 - ₱5,000
              </button>
              <button
                onClick={() => {
                  setPriceRange("over-5000");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  priceRange === "over-5000" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Over ₱5,000
              </button>
            </div>
          </div>

          {/* Sort Mobile */}
          <div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-900">Sort by</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSortBy("featured");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  sortBy === "featured" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => {
                  setSortBy("alphabetical");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  sortBy === "alphabetical" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Alphabetically, A-Z
              </button>
              <button
                onClick={() => {
                  setSortBy("price-low");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  sortBy === "price-low" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Price, low to high
              </button>
              <button
                onClick={() => {
                  setSortBy("price-high");
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  sortBy === "price-high" ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                Price, high to low
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
