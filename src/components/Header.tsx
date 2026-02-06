"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-[#b4a188] text-white text-center py-2 px-4 text-sm">
        Get PHP500 OFF ON YOUR NEXT RENTAL!
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile: Hamburger Menu */}
            <div className="md:hidden z-10">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>

            {/* Logo - Center on mobile, left on desktop */}
            <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none pointer-events-none md:pointer-events-auto">
              <Link href="/" className="flex items-center pointer-events-auto">
                <Image
                  src="/jielas-gown-rental-logo.png"
                  alt="Jiela's Gown Rental"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`text-gray-700 hover:text-gray-900 text-sm tracking-wide pb-1 ${pathname === '/' ? 'border-b-2 border-gray-900' : ''}`}
              >
                HOME
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setIsCollectionsOpen(true)}
                onMouseLeave={() => setIsCollectionsOpen(false)}
              >
                <button className={`flex items-center text-gray-700 hover:text-gray-900 text-sm tracking-wide pb-1 ${pathname?.startsWith('/collections') ? 'border-b-2 border-gray-900' : ''}`}>
                  COLLECTIONS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isCollectionsOpen && (
                  <div className="absolute top-full left-0 mt-0 pt-2 w-56 z-50">
                    <div className="bg-white shadow-lg border rounded-md py-2">
                      <Link href="/collections/long-gowns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Long Gowns
                      </Link>
                      <Link href="/collections/ball-gowns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Ball Gowns
                      </Link>
                      <Link href="/collections/modern-filipinianas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Modern Filipinianas
                      </Link>
                      <Link href="/collections/filipiniana-gowns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Filipiniana Gowns
                      </Link>
                      <Link href="/collections/cocktails" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Cocktails
                      </Link>
                      <Link href="/collections/casual-dress" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Casual Dress
                      </Link>
                      <Link href="/collections/boleros" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Boleros
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/about" 
                className={`text-gray-700 hover:text-gray-900 text-sm tracking-wide pb-1 ${pathname === '/about' ? 'border-b-2 border-gray-900' : ''}`}
              >
                ABOUT US
              </Link>
              
              <Link 
                href="/faqs" 
                className={`text-gray-700 hover:text-gray-900 text-sm tracking-wide pb-1 ${pathname === '/faqs' ? 'border-b-2 border-gray-900' : ''}`}
              >
                FAQS
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 md:space-x-4 relative z-20">
              {/* Search Icon - All screens */}
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-md relative z-20"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </button>

              {/* Rent Now Button - Hidden on mobile */}
              <a 
                href="https://www.facebook.com/JielaGownForRentOrmoc"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Rent Now
              </a>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {isMobileSearchOpen && (
            <div className="pb-4 px-4 sm:px-6 lg:px-8 relative z-50">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 px-4 py-3">
                <Search className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none ml-2 text-base w-full text-black placeholder:text-gray-400"
                  autoComplete="off"
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-4 space-y-3">
              <Link 
                href="/" 
                className="block text-gray-700 hover:text-gray-900 text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              
              <div className="space-y-2">
                <div className="text-gray-700 text-sm font-medium tracking-wide py-2">
                  COLLECTIONS
                </div>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/collections/long-gowns" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Long Gowns
                  </Link>
                  <Link 
                    href="/collections/ball-gowns" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ball Gowns
                  </Link>
                  <Link 
                    href="/collections/modern-filipinianas" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Modern Filipinianas
                  </Link>
                  <Link 
                    href="/collections/filipiniana-gowns" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Filipiniana Gowns
                  </Link>
                  <Link 
                    href="/collections/cocktails" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cocktails
                  </Link>
                  <Link 
                    href="/collections/casual-dress" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Casual Dress
                  </Link>
                  <Link 
                    href="/collections/boleros" 
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Boleros
                  </Link>
                </div>
              </div>

              <Link 
                href="/about" 
                className="block text-gray-700 hover:text-gray-900 text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT US
              </Link>
              
              <Link 
                href="/faqs" 
                className="block text-gray-700 hover:text-gray-900 text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQS
              </Link>

              <a 
                href="https://www.facebook.com/JielaGownForRentOrmoc"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rent Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
