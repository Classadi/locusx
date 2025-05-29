"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
interface NavbarProps {
  children?: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav
      className="bg-[#00212585] text-white shadow-md w-[98%] rounded-full mt-[8px] px-[20px]"
      style={{ position: "absolute", top: "0px", left: "10px" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Brand */}
        <Link
          href="/"
          className="font-bold text-[#c0ffe2] hover:text-[#c0ffe2b0] transition text-[25px] hover:italic"
          style={{ fontFamily: "serif" }}
          title="Home"
        >
          locusX
        </Link>

        {/* Navigation Links */}

        <div>{children}</div>
      </div>
    </nav>
  );
}
