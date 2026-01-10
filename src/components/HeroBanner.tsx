import Image from "next/image";
import { MapPin } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Image
        src="/banner-image.jpg"
        alt="Jiela's Gown Rental"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
          Jiela&apos;s Gown Rental
        </h1>
        <p className="text-xl md:text-2xl font-light mb-2">
          Elegance for Every Occasion
        </p>
        <p className="text-lg md:text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Ormoc City
        </p>
        <a
          href="#collections"
          className="mt-8 bg-white text-black px-8 py-3 text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Browse Collection
        </a>
      </div>
    </div>
  );
}
