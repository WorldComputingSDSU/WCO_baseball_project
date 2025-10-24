"use client";

import Link from "next/link";
import Image from "next/image"; // You might not need this if using a simple img tag, but it's good practice for Next.js
import { usePathname } from "next/navigation";
import { Users, BarChart3, Upload, Settings, Menu, X, Info } from "lucide-react";
import { useState } from "react";

export function Navbar() {
 const pathname = usePathname();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 const navItems = [
  { href: "/roster", label: "Roster", icon: Users },
  { href: "/leaderboards", label: "Performance", icon: BarChart3 },
  { href: "/upload", label: "Upload Data", icon: Upload },
  { href: "/team-info", label: "Team Info", icon: Info },
  { href: "/settings", label: "Settings", icon: Settings },
 ];

 return (
  <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     {/* Brand/Logo on Left*/}
     <div className="flex-shrink-0">
      {/* The 'flex items-center' class helps vertically align the logo if needed */}
            <Link href="/" className="flex items-center">
              {/* 1. Change the src to your logo's file path (e.g., /images/aztec-logo.png)
                2. h-10 sets the logo height to 40px. Adjust as needed (e.g., h-8 for 32px)
                3. The alt text is crucial for accessibility.
              */}
              <img 
                src="/SDSU.jpg" 
                alt="SDSU Aztec Baseball Logo" 
                className="h-10 w-auto" 
              />

              <span className="ml-3 text-xl font-bold text-white hover:text-gray-300 transition-colors hidden sm:block">
                SDSU Aztec Baseball
              </span>
            </Link>
     </div>

     {/* Desktop Navigation Links (Hidden on small screens) */}
     <nav className="hidden lg:flex flex-1 justify-center">
      <div className="flex space-x-8"> 
       {navItems.map(({ href, label, icon: Icon }) => (
        <Link
         key={href}
         href={href}
         className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors 
          ${
           pathname === href
            ? "bg-gray-700 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
         <Icon className="h-5 w-5" />
         <span>{label}</span>
        </Link>
       ))}
      </div>
     </nav>

     {/* Mobile Menu Button*/}
     <div className="lg:hidden">
      <button
       onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
       className="p-2 text-gray-400 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
       aria-expanded={isMobileMenuOpen ? "true" : "false"}
      >
       <span className="sr-only">Open main menu</span>
       {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
     </div>
     
     {/* Placeholder for symmetry on desktop */}
     <div className="hidden lg:block w-[100px] text-gray-800">
      {/*centering */}
     </div>
    </div>
   </div>

   {/* Mobile Menu Panel */}
   <div 
    className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
      isMobileMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
    }`}
   >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
     {navItems.map(({ href, label, icon: Icon }) => (
      <Link
       key={href}
       href={href}
       onClick={() => setIsMobileMenuOpen(false)}
       className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors 
        ${
         pathname === href
          ? "bg-gray-700 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
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