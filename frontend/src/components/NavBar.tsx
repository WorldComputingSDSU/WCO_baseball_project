"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home,BarChart3,Users } from "lucide-react";
import { useState } from "react";

export function Navbar() {
 const pathname = usePathname();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/hitters", label: "Hitters", icon: BarChart3 },
  { href: "/pitchers", label: "Pitchers", icon: BarChart3 },
  { href: "/catchers", label: "Catchers", icon: BarChart3 },
  { href: "/roster", label: "Roster", icon: Users }
 ];

 return (
  <header className="navbar fixed top-0 left-0 right-0 z-50 shadow-lg">
   <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="flex justify-center items-center h-16">
     {/* Centered Navigation */}
     <nav className="hidden lg:flex items-center space-x-8">
      {/* Brand/Logo */}
      <Link href="/" className="navbar-logo flex items-center">
        <Image 
          src="/SDSU_logo.webp" 
          alt="SDSU Aztec Baseball Logo" 
          width={40}
          height={40}
          className="h-10 w-auto" 
        />
        <span className="ml-3 text-xl font-bold text-white transition-colors hidden sm:block">
          SDSU Aztec Baseball
        </span>
      </Link>
      
      {/* Navigation Links */}
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`navbar-link flex items-center space-x-2 text-sm font-medium text-white
            ${
              pathname === href
                ? "active"
                : "hover:opacity-80"
            }`}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      ))}
     </nav>

     {/* Mobile Menu Button*/}
     <div className="lg:hidden">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 text-red-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-600 focus:ring-white"
        aria-expanded={isMobileMenuOpen ? "true" : "false"}
      >
        <span className="sr-only">Open main menu</span>
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
     </div>
    </div>
   </div>

   {/* Mobile Menu Panel */}
   <div 
    className={`mobile-menu lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
      isMobileMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
    }`}
   >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
     {navItems.map(({ href, label, icon: Icon }) => (
      <Link
       key={href}
       href={href}
       onClick={() => setIsMobileMenuOpen(false)}
       className={`navbar-link flex items-center space-x-3 text-base font-medium text-white
        ${
         pathname === href
          ? "active"
          : "hover:opacity-80"
        }
       `}
      >
       <Icon className="h-5 w-5" />
       <span>{label}</span>
      </Link>
     ))}
    </div>
   </div>
  </header>
 );
}