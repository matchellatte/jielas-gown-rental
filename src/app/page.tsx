'use client';

import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ClientCarousel from "@/components/ClientCarousel";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Ball Gowns",
    slug: "ball-gowns",
    image: "/categories/ball-gowns.jpg",
  },
  {
    name: "Cocktails",
    slug: "cocktails",
    image: "/categories/cocktails.jpg",
  },
  {
    name: "Long Gowns",
    slug: "long-gowns",
    image: "/categories/long-gowns.jpg",
  },
  {
    name: "Modern Filipinianas",
    slug: "modern-filipinianas",
    image: "/categories/modern-filipinianas.jpg",
  },
  {
    name: "Boleros",
    slug: "boleros",
    image: "/categories/boleros.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="collections">
        {/* Shop by Collection Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-800 mb-10 text-center">
            Shop by collection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/collections/${category.slug}`}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-medium tracking-wide uppercase">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <ClientCarousel />

        {/* Store Fitting Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 -mx-4 sm:-mx-6 lg:-mx-8"
        >
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src="/store-fitting.jpg"
              alt="Store Fitting"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
                Store Fitting
              </h2>
              <p className="text-white text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
                Still undecided on what to rent? Book an appointment or drop by at our store and find the perfect style for you.
              </p>
              <a
                href="https://m.me/JielaGownForRentOrmoc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Message Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-lg p-12 mt-16">
          <h2 className="text-3xl font-light tracking-wide text-gray-800 mb-4">
            Ready to Find Your Perfect Gown?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our collection and reserve your dream dress today
          </p>
          <a
            href="https://m.me/JielaGownForRentOrmoc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </main>
    </div>
  );
}
