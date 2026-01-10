"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GownCard from "@/components/GownCard";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Gown } from "@/lib/sheets";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  
  const [gowns, setGowns] = useState<Gown[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [filteredGowns, setFilteredGowns] = useState<Gown[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchGowns = async () => {
      try {
        const response = await fetch("/api/gowns");
        const data = await response.json();
        setGowns(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gowns:", error);
        setLoading(false);
      }
    };

    fetchGowns();
  }, []);

  useEffect(() => {
    let results = gowns;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (gown) =>
          gown.name.toLowerCase().includes(query) ||
          gown.category.toLowerCase().includes(query) ||
          gown.description?.toLowerCase().includes(query)
      );
    }

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
    } else if (sortBy === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredGowns(results);
  }, [searchQuery, gowns, availabilityFilter, priceRange, sortBy]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-800 mb-6 text-center">
              Search results
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center bg-gray-100 px-4 py-3">
                <Search className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="flex-1 ml-3 bg-transparent outline-none text-base text-black placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1 hover:bg-gray-200"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-2 p-2 hover:bg-gray-200"
                >
                  <Search className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </form>

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
                          checked={availabilityFilter.includes("available")}
                          onChange={() => toggleAvailability("available")}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">In stock</span>
                      </label>
                      <label className="flex items-center gap-3 py-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={availabilityFilter.includes("out-of-stock")}
                          onChange={() => toggleAvailability("out-of-stock")}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">Out of stock</span>
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
            <div className="hidden md:flex flex-wrap items-center justify-between gap-4 mb-8">
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
                <span className="text-sm text-gray-700">Sort by :</span>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSortDropdown(!showSortDropdown);
                      setShowAvailabilityDropdown(false);
                      setShowPriceDropdown(false);
                    }}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
                  >
                    {sortBy === "relevance" && "Relevance"}
                    {sortBy === "name" && "Name"}
                    {sortBy === "price-low" && "Price: Low to High"}
                    {sortBy === "price-high" && "Price: High to Low"}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border z-50">
                      <button
                        onClick={() => {
                          setSortBy("relevance");
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Relevance
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("name");
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Name
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

                <span className="text-sm text-gray-700">
                  {filteredGowns.length} results
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg">Loading...</p>
            </div>
          ) : filteredGowns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg mb-4">
                No gowns found matching your search.
              </p>
              <button
                onClick={clearSearch}
                className="text-black hover:text-gray-600 font-medium underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredGowns.map((gown) => (
                <GownCard key={gown.id} gown={gown} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
