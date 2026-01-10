"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import GownCard from "@/components/GownCard";
import type { Gown } from "@/lib/sheets";
import { motion } from "framer-motion";
import MobileFilters from "./components/MobileFilters";
import DesktopFilters from "./components/DesktopFilters";

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

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-800 mb-6">
            {categoryName}
          </h1>

          {/* Filter and Sort Bar */}
          <MobileFilters
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
            filteredGownsCount={filteredGowns.length}
            availabilityFilter={availabilityFilter}
            toggleAvailability={toggleAvailability}
            resetAvailability={resetAvailability}
            inStockCount={inStockCount}
            outOfStockCount={outOfStockCount}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <DesktopFilters
            availabilityFilter={availabilityFilter}
            showAvailabilityDropdown={showAvailabilityDropdown}
            setShowAvailabilityDropdown={setShowAvailabilityDropdown}
            setShowPriceDropdown={setShowPriceDropdown}
            setShowSortDropdown={setShowSortDropdown}
            toggleAvailability={toggleAvailability}
            resetAvailability={resetAvailability}
            inStockCount={inStockCount}
            outOfStockCount={outOfStockCount}
            priceRange={priceRange}
            showPriceDropdown={showPriceDropdown}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            showSortDropdown={showSortDropdown}
            setSortBy={setSortBy}
            filteredGownsCount={filteredGowns.length}
          />
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
      </motion.main>
    </div>
  );
}
