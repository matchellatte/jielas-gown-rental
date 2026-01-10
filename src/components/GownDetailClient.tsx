'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Gown } from '@/lib/sheets';

interface GownDetailClientProps {
  gown: Gown;
  facebookMessengerLink: string;
}

function formatPrice(price: string): string {
  if (!price) return 'Contact for pricing';
  if (price.includes('₱')) return price;
  return `₱${price}`;
}

export function GownDetailClient({ gown, facebookMessengerLink }: GownDetailClientProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12"
    >
      {/* Image Section */}
      <div className="flex justify-center lg:justify-start">
        <div className="relative aspect-[2/3] w-full max-w-[400px] sm:max-w-[500px] lg:max-w-none lg:w-full max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={gown.imageUrl}
            alt={gown.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 500px, 50vw"
            priority
            unoptimized
          />
          {!gown.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-base sm:text-xl font-medium">Currently Unavailable</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col">
        <div className="mb-2">
          <p className="text-xs sm:text-sm text-gray-500 mb-2">{gown.category}</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-gray-800 mb-3 sm:mb-4">
            {gown.name}
          </h1>
          <p className="text-2xl sm:text-3xl text-[#b4a188] font-medium mb-4 sm:mb-6">
            {formatPrice(gown.price)}
          </p>
        </div>

        {/* Description */}
        {gown.description && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{gown.description}</p>
          </div>
        )}

        {/* Measurements */}
        {(gown.waist || gown.bust || gown.length || gown.size) && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Measurements</h2>
            <div className="space-y-2 text-sm sm:text-base">
              {gown.bust && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Bust:</span>
                  <span className="font-medium text-gray-800">{gown.bust}</span>
                </div>
              )}
              {gown.waist && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Waist:</span>
                  <span className="font-medium text-gray-800">{gown.waist}</span>
                </div>
              )}
              {gown.length && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-medium text-gray-800">{gown.length}</span>
                </div>
              )}
              {gown.size && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium text-gray-800">{gown.size}</span>
                </div>
              )}
              {gown.color && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium text-gray-800">{gown.color}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${gown.available ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm sm:text-base text-gray-700">
              {gown.available ? 'Available for rent' : 'Currently unavailable'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-3">
          <a
            href={facebookMessengerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white text-center py-3 sm:py-4 text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Reserve via Messenger
          </a>
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Contact us to check availability and reserve this gown for your special event.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
