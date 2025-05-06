"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClipboardList, Package } from "lucide-react";

export default function Admin({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Produkter",
      href: "/admin/products",
      icon: (
        <Package className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Ordrar",
      href: "/admin/orders",
      icon: (
        <ClipboardList className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden  border border-neutral-200  md:flex-row dark:border-neutral-700 dark:bg-neutral-800 text-[#3e443d]",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="h-full justify-between gap-10 text-[#3e443d]">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
    
            <LogoIcon />
            <div className="mt-8 flex flex-col gap-2 text-[#3e443d]">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Admin",
                href: "#",
                icon: (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/user-avatar.png"
                    className="h-7 w-7 shrink-0 rounded-full text-[#3e443d]"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <h3 className="text-[#e48f4a] font-chango">Plant Buds</h3>
    </Link>
  );
};
