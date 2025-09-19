"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // 👈 get current route

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rent-bikes", label: "Rent A Bike" },
    // { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About Us" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <nav>
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-gray-900">
                Lighting Bike
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-black font-semibold" // 👈 active link
                    : "text-gray-600 font-medium hover:text-gray-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="User account"
            >
              <User size={20} />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="User account"
            >
              <User size={20} />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu with transition */}
        <div
          className={`md:hidden transform transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-black font-semibold bg-gray-100"
                    : "text-gray-600 font-medium hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
