"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const carouselImages = [
  "/carousel/1.jpg",
  "/carousel/2.jpg",
  "/carousel/3.jpg",
  "/carousel/4.jpg",
  "/carousel/5.jpg",
  "/carousel/6.jpg",
  "/carousel/7.jpg",
];

export default function ClientCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isLightboxOpen) return;

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isLightboxOpen]);

  return (
    <section className="mt-16 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-800 mb-3">
          Real Clients, Real Moments
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          A glimpse of our beautiful clients wearing the gowns they rented from Jiela&apos;s.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg bg-gray-100 aspect-[3/4] sm:aspect-[16/9]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={carouselImages[currentIndex]}
                alt={`Client wearing gown ${currentIndex + 1}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={goToPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-gray-800"
                  : "w-2 bg-gray-400/60 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[80vh] mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              >
              <Image
                src={carouselImages[currentIndex]}
                alt={`Client wearing gown ${currentIndex + 1}`}
                width={1400}
                height={1400}
                className="w-full h-full max-h-[80vh] object-contain rounded-lg bg-black"
              />

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full px-3 py-1 text-xs font-medium shadow-md hover:bg-gray-100"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
