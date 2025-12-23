"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative xl:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between py-5">
        <img src="/images/logo2.png" alt="Logo" width={80} height={50} />
        <button
          className="flex flex-col justify-between h-6 w-8"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <Image
            src={isMenuOpen ? "/images/close.png" : "/images/hamburger.png"}
            alt="Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-26.5 left-0 w-full bg-white items-start p-4 flex flex-col gap-4 text-black z-50 rounded-b-xl shadow-lg">
          <div className="flex justify-between w-full items-center">
            <Link href="/about">About Us</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>
          <div className="flex justify-between w-full items-center">
            <Link href="/about">Our Work</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>
          <Link href="/">Blog</Link>
          <div className="flex justify-between w-full items-center">
            <Link href="/about">Our Resources</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>
          <Link href="/">Contact Us</Link>
          <div className="flex items-center gap-1.25">
            <Image src="/images/flag.png" alt="flag" width={24} height={24} />
            <Link href="/about">ENG</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>
          <button className="h-12 rounded-xl bg-[#1AD329] px-6">
            <p className="text-white font-bold">Explore camberfarms export</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
