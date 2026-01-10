import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#8b7355] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-normal mb-4">Jiela&apos;s Gown Rental</h3>
            <p className="text-white text-sm font-light leading-relaxed">
              Your destination for luxury gown rentals in Ormoc City. 
              Elegance for every special occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-normal mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/" className="text-white hover:text-gray-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-gray-800 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-white hover:text-gray-800 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/JielaGownForRentOrmoc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-800 transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-normal mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-2 text-white">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  Purok 7 Brgy Linao<br />
                  Ormoc City, Leyte
                </span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a 
                  href="https://www.facebook.com/JielaGownForRentOrmoc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-800 transition-colors"
                >
                  Message us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#9d8266] mt-8 pt-8 text-center text-sm text-white font-light">
          <p>&copy; {new Date().getFullYear()} Jiela&apos;s Gown Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
