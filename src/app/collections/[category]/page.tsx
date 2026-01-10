"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import GownCard from "@/components/GownCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Gown } from "@/lib/sheets";

const categoryMap: Record<string, string> = {
  "long-gowns": "Long Gowns",
  "ball-gowns": "Ball Gowns",
  "modern-filipinianas": "Modern Filipinianas",
  "cocktails": "Cocktails",
  "boleros": "Boleros",
};

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ category: string } | null>(null);
  const [gowns, setGowns] = useState<Gown[]>([]);
  const [filteredGowns, setFilteredGowns] = useState<Gown[]>([]);
  const [loading, setLoading] = useState(true);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchGowns = async () => {
      try {
        const response = await fetch("/api/gowns");
        const data = await response.json();
        const categoryName = categoryMap[resolvedParams.category];
        const categoryGowns = data.filter((gown: Gown) => gown.category === categoryName);
        setGowns(categoryGowns);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gowns:", error);
        setLoading(false);
      }
    };

    fetchGowns();
  }, [resolvedParams]);

  useEffect(() => {
    let results = [...gowns];

    // Filter by availability
    if (availabilityFilter.length > 0) {
      results = results.filter((gown) => {
        if (availabilityFilter.includes("in-stock")) {
          return gown.available;
        }
        if (availabilityFilter.includes("out-of-stock")) {
          return !gown.available;
        }
        return true;
      });
    }

    // Filter by price range
    if (priceRange !== "all") {
      results = results.filter((gown) => {
        const price = parseFloat(gown.price.replace(/[₱,]/g, ""));
        switch (priceRange) {
          case "under-2000":
            return price < 2000;
          case "2000-3000":
            return price >= 2000 && price < 3000;
          case "3000-5000":
            return price >= 3000 && price < 5000;
          case "over-5000":
            return price >= 5000;
          default:
            return true;
        }
      });
    }

    // Sort results
    if (sortBy === "price-low") {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[₱,]/g, ""));
        const priceB = parseFloat(b.price.replace(/[₱,]/g, ""));
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[₱,]/g, ""));
        const priceB = parseFloat(b.price.replace(/[₱,]/g, ""));
        return priceB - priceA;
      });
    } else if (sortBy === "name-az") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-za") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredGowns(results);
  }, [gowns, availabilityFilter, priceRange, sortBy]);

  const toggleAvailability = (value: string) => {
    setAvailabilityFilter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const resetAvailability = () => {
    setAvailabilityFilter([]);
  };

  const inStockCount = gowns.filter((g) => g.available).length;
  const outOfStockCount = gowns.filter((g) => !g.available).length;

  if (!resolvedParams) return null;

  const categoryName = categoryMap[resolvedParams.category];
  if (!categoryName) return null;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Info Banner */}
      <div className="bg-gray-100 py-4 px-4 text-center">
        <p className="text-gray-700 text-sm md:text-base">
          Discover more of our latest collection of elegant and modern gowns — available <strong>only in-store!</strong>
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-800 mb-6">
            {categoryName}
          </h1>

          {/* Filter and Sort Bar */}
          
          {/* Filters and Sort - Mobile */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter and sort
              </button>
              <span className="text-sm text-gray-700">{filteredGowns.length} products</span>
            </div>

            {/* Mobile Filter Dropdown */}
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

          {/* Filters and Sort - Desktop */}
          <div className="hidden md:flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-700">Filter :</span>

              {/* Availability Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowAvailabilityDropdown(!showAvailabilityDropdown);
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

              {/* Price Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowPriceDropdown(!showPriceDropdown);
                    setShowAvailabilityDropdown(false);
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
              <span className="text-sm text-gray-700">{filteredGowns.length} products</span>
              
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
        </div>

        {/* Gowns Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-700 text-lg">Loading...</p>
          </div>
        ) : filteredGowns.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredGowns.map((gown) => (
              <GownCard key={gown.id} gown={gown} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-700 text-lg mb-2">No gowns available in this category yet.</p>
            <p className="text-gray-500">Please check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}
