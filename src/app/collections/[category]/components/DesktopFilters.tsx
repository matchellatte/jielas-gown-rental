'use client';

import { ChevronDown } from "lucide-react";

interface DesktopFiltersProps {
  availabilityFilter: string[];
  showAvailabilityDropdown: boolean;
  setShowAvailabilityDropdown: (show: boolean) => void;
  showColorDropdown: boolean;
  setShowColorDropdown: (show: boolean) => void;
  setShowPriceDropdown: (show: boolean) => void;
  setShowSortDropdown: (show: boolean) => void;
  toggleAvailability: (value: string) => void;
  resetAvailability: () => void;
  colorFilter: string[];
  toggleColor: (value: string) => void;
  resetColor: () => void;
  inStockCount: number;
  outOfStockCount: number;
  priceRange: string;
  showPriceDropdown: boolean;
  setPriceRange: (range: string) => void;
  sortBy: string;
  showSortDropdown: boolean;
  setSortBy: (sort: string) => void;
  filteredGownsCount: number;
  availableColors: string[];
}

export default function DesktopFilters({
  availabilityFilter,
  showAvailabilityDropdown,
  setShowAvailabilityDropdown,
  showColorDropdown,
  setShowColorDropdown,
  setShowPriceDropdown,
  setShowSortDropdown,
  toggleAvailability,
  resetAvailability,
  colorFilter,
  toggleColor,
  resetColor,
  inStockCount,
  outOfStockCount,
  priceRange,
  showPriceDropdown,
  setPriceRange,
  sortBy,
  showSortDropdown,
  setSortBy,
  filteredGownsCount,
  availableColors,
}: DesktopFiltersProps) {
  return (
    <div className="hidden md:flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-700">Filter :</span>

        {/* Availability Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowAvailabilityDropdown(!showAvailabilityDropdown);
              setShowColorDropdown(false);
              setShowPriceDropdown(false);
              setShowSortDropdown(false);
            }}
            className={`flex items-center gap-2 text-sm text-gray-700 hover:text-black ${
              availabilityFilter.length > 0 ? "border-b-2 border-gray-900 pb-1" : ""
            }`}
          >
            Availability
            <ChevronDown className="h-4 w-4" />
          </button>
          {showAvailabilityDropdown && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border z-50">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">
                    {availabilityFilter.length} selected
                  </span>
                  <button
                    onClick={resetAvailability}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    Reset
                  </button>
                </div>
                <label className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={availabilityFilter.includes("in-stock")}
                    onChange={() => toggleAvailability("in-stock")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">
                    In stock ({inStockCount})
                  </span>
                </label>
                <label className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={availabilityFilter.includes("out-of-stock")}
                    onChange={() => toggleAvailability("out-of-stock")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">
                    Out of stock ({outOfStockCount})
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowColorDropdown(!showColorDropdown);
              setShowAvailabilityDropdown(false);
              setShowPriceDropdown(false);
              setShowSortDropdown(false);
            }}
            className={`flex items-center gap-2 text-sm text-gray-700 hover:text-black ${
              colorFilter.length > 0 ? "border-b-2 border-gray-900 pb-1" : ""
            }`}
          >
            {colorFilter.length === 0
              ? "Color"
              : colorFilter.length === 1
              ? colorFilter[0]
              : `${colorFilter.length} colors`}
            <ChevronDown className="h-4 w-4" />
          </button>
          {showColorDropdown && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border z-50">
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">
                    {colorFilter.length} selected
                  </span>
                  <button
                    onClick={resetColor}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    Reset
                  </button>
                </div>
                {availableColors.length === 0 ? (
                  <p className="text-sm text-gray-500">No colors available</p>
                ) : (
                  availableColors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center gap-3 py-1.5 cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={colorFilter.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowPriceDropdown(!showPriceDropdown);
              setShowAvailabilityDropdown(false);
              setShowColorDropdown(false);
              setShowSortDropdown(false);
            }}
            className={`flex items-center gap-2 text-sm text-gray-700 hover:text-black ${
              priceRange !== "all" ? "border-b-2 border-gray-900 pb-1" : ""
            }`}
          >
            Price
            <ChevronDown className="h-4 w-4" />
          </button>
          {showPriceDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border z-50">
              <button
                onClick={() => {
                  setPriceRange("all");
                  setShowPriceDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                All Prices
              </button>
              <button
                onClick={() => {
                  setPriceRange("under-2000");
                  setShowPriceDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Under ₱2,000
              </button>
              <button
                onClick={() => {
                  setPriceRange("2000-3000");
                  setShowPriceDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                ₱2,000 - ₱3,000
              </button>
              <button
                onClick={() => {
                  setPriceRange("3000-5000");
                  setShowPriceDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                ₱3,000 - ₱5,000
              </button>
              <button
                onClick={() => {
                  setPriceRange("over-5000");
                  setShowPriceDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Over ₱5,000
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{filteredGownsCount} products</span>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Sort by :</span>
          <div className="relative">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowAvailabilityDropdown(false);
                setShowPriceDropdown(false);
              }}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
            >
              {sortBy === "featured" && "Featured"}
              {sortBy === "name-az" && "Name: A-Z"}
              {sortBy === "name-za" && "Name: Z-A"}
              {sortBy === "price-low" && "Price: Low to High"}
              {sortBy === "price-high" && "Price: High to Low"}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border z-50">
                <button
                  onClick={() => {
                    setSortBy("featured");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Featured
                </button>
                <button
                  onClick={() => {
                    setSortBy("name-az");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Name: A-Z
                </button>
                <button
                  onClick={() => {
                    setSortBy("name-za");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Name: Z-A
                </button>
                <button
                  onClick={() => {
                    setSortBy("price-low");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => {
                    setSortBy("price-high");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
