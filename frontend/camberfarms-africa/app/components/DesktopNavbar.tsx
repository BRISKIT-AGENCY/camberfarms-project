"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";

const DesktopNavbar = () => {
  return (
    <div className="items-center justify-between hidden xl:flex">
      <img src="/images/logo.png" alt="Logo" width={103.35} height={60} />
      <div className="text-[18px] text-white flex gap-5 font-normal">
        <Link href="/">Home</Link>
        <div className="flex justify-center items-center">
          <Link href="/about">About Us</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>
        <div className="flex justify-center items-center">
          <Link href="/about">Our Work</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>
        <Link href="/">Blog</Link>
        <div className="flex justify-center items-center">
          <Link href="/about">Our Resources</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>
        <Link href="/">Contact Us</Link>
        <div className="flex justify-center items-center gap-1.25">
          <Image src="/images/flag.png" alt="flag" width={24} height={24} />
          <Link href="/about">ENG</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>
      </div>
      <button className="h-12 rounded-xl bg-white px-6">
        <p className="text-[#1AD329] font-bold">Explore camberfarms export</p>
      </button>
    </div>
  );
};

export default DesktopNavbar;
