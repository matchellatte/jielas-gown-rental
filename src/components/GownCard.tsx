'use client';

import Image from "next/image";
import Link from "next/link";
import { Gown } from "@/lib/sheets";
import { motion } from "framer-motion";

interface GownCardProps {
  gown: Gown;
}

function formatPrice(price: string): string {
  if (!price) return 'Contact for pricing';
  if (price.includes('₱')) return price;
  return `₱${price}`;
}

export default function GownCard({ gown }: GownCardProps) {
  const imageUrl = gown.imageUrl && gown.imageUrl.trim() !== '' 
    ? gown.imageUrl 
    : '/placeholder-gown.jpg';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
    >
      <Link href={`/gowns/${gown.id}`}>
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={gown.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            unoptimized
          />
          {!gown.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Currently Unavailable</span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-base md:text-lg text-gray-800 mb-1">{gown.name}</h3>
          <p className="text-sm md:text-base text-[#b4a188]">{formatPrice(gown.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
