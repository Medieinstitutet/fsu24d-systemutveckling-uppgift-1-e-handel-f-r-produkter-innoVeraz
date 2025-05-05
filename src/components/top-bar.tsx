"use client";

import { CalendarCheck, Truck } from "lucide-react";
import Image from "next/image";

export function TopBar() {
  return (
    <div className="bg-[#7A8C79] text-white py-2 px-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex flex-1 justify-between items-center w-full">
          <Step
            icon={
              <Image
                src="/hand.png"
                alt="Hand med planta"
                width={24}
                height={24}
              />
            }
            text="Choose your service"
          />
          <Step
            icon={<CalendarCheck className="h-6 w-6" />}
            text="Book your spot"
          />
          <Step icon={<Truck className="h-6 w-6" />} text="We´ll bring the rest" />
        </div>
      </div>
    </div>
  );
}

function Step({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-2 sm:px-4 sm:flex-row sm:gap-3 text-center">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs sm:text-base">{text}</span>
    </div>
  );
}
