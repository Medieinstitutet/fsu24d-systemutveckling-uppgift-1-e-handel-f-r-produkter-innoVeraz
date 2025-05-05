import { CalendarCheck, HandHeart, Truck } from "lucide-react";
import Image from "next/image";

export function TopBar() {
  return (
    <div className="bg-[#7A8C79] text-white py-2 px-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
      <Step icon={<Image src="/hand.png" alt="Hand med planta" width={24} height={24} />} text="Book your service" />
        <Step icon={<CalendarCheck className="h-6 w-6" />} text="Book your spot" />
        <Step icon={<Truck className="h-6 w-6" />} text="We bring the rest" />
      </div>
    </div>
  );
}

function Step({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3 sm:items-center text-center sm:text-left">
      {icon}
      <span className="text-xs sm:text-base">{text}</span>
    </div>
  );
}
