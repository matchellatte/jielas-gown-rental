'use client';

import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-12 text-center">
          About Us
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About Us - Jiela&apos;s Gown Rental
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to <strong>Jiela&apos;s Gown Rental</strong>, your destination for luxury gown rentals that combine style, 
            convenience, and sustainability. We believe every special occasion deserves the perfect 
            dress, without the long-term commitment or high cost of purchasing one.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How to Rent
          </h2>
          <p className="text-gray-700 mb-4">
            Renting from <strong>Jiela&apos;s Gown Rental</strong> is simple and stress-free. Just follow these easy steps:
          </p>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Browse Our Collection</strong> – Explore our stunning selection of gowns, including Long 
              Gowns, Ball Gowns, Modern Filipinianas, Cocktails, and Boleros.
            </li>
            <li>
              <strong>Select Your Dress</strong> – Choose the perfect gown for your occasion. Be sure to check size 
              availability and the dates you'll need the dress.
            </li>
            <li>
              <strong>Book & Pay</strong> – Reserve your gown through our seamless booking system.
            </li>
            <li>
              <strong>Pick Up & Wear</strong> – Receive your gown on time, and wear it for your special event.
            </li>
            <li>
              <strong>Return</strong> – Simply send the dress back after your event.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Where Are We Located?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are proudly based in <strong>Ormoc City, Leyte</strong>, serving clients throughout the region. 
            Visit us to see our collection in person or contact us to discuss your rental needs.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-800 font-medium mb-2">Address:</p>
            <p className="text-gray-700 mb-1">Purok 7 Brgy Linao</p>
            <p className="text-gray-700 mb-3">Ormoc City, Leyte</p>
            <p className="text-gray-600">
              For inquiries, please contact us through our social media channels or visit our shop.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><strong>Curated Collection</strong> – Handpicked gowns for every occasion</li>
            <li><strong>Affordable Luxury</strong> – Premium gowns at rental prices</li>
            <li><strong>Sustainable Fashion</strong> – Rent, don't buy - better for the environment</li>
            <li><strong>Regular Updates</strong> – New styles added frequently</li>
            <li><strong>Personalized Service</strong> – We help you find the perfect fit</li>
          </ul>
        </section>
      </motion.main>
    </div>
  );
}
