"use client";

import Image from "next/image";

export function TopBar() {
  return (
    <div className="bg-[#7A8C79] text-white py-2 px-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
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
            icon={
              <Image
                src="/calendarcheck.png"
                alt="kalender ikon"
                width={24}
                height={24}
              />
            }
            text="Book your spot"
          />
          <Step
            icon={
              <Image src="/truck.png" alt="truck-ikon" width={24} height={24} />
            }
            text="We'll bring the rest"
          />
        </div>
      </div>
    </div>
  );
}

function Step({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-2 sm:px-4 sm:flex-row sm:gap-3 text-center">
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-xs sm:text-base">{text}</span>
    </div>
  );
}
