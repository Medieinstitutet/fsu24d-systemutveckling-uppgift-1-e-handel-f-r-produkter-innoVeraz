"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full text-[#3e443d]">
      <div className="container flex items-center justify-between h-16">
        <nav className="flex gap-3 text-sm sm:text-base font-medium pl-3">
          <Link href="/plants/indoor" className="hover:text-[#f4748b]">
            Inomhusväxter
          </Link>
          <Link href="/utomhus" className="hover:text-[#f4748b]">
            Utomhusväxter
          </Link>
          <Link href="/odla" className="hover:text-[#f4748b]">
            Odla
          </Link>
          <div>|</div>
          <Link href="/tjanster" className="hover:text-[#f4748b]">
            Tjänster
          </Link>
          <Link href="/admin" className="hover:text-[#f4748b]">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
