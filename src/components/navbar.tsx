"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full text-[#3e443d]">
      <div className="container flex items-center justify-between h-16">
        <nav className="flex gap-3 text-sm sm:text-base font-medium pl-3">
          <Link href="/plants/indoor" className="hover:text-[#7A8C79]">
            Inomhusväxter
          </Link>
          <Link href="/plants/outdoor" className="hover:text-[#7A8C79]">
            Utomhusväxter
          </Link>
          <Link href="/plants/" className="hover:text-[#7A8C79]">
            Odla
          </Link>
          <div>|</div>
          <Link href="/tjanster" className="hover:text-[#7A8C79]">
            Tjänster
          </Link>
          <Link href="/admin" className="hover:text-[#7A8C79]">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
