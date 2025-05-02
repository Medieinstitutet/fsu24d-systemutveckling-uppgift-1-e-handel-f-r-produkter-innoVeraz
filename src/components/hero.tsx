"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="grid h-full grid-rows-4 text-white">
        <div className="row-start-3 flex flex-col items-center justify-center text-center px-6 gap-8">
          <h1 className="text-5xl sm:text-4xl font-bold drop-shadow-md">
            DAGS ATT PLANTERA OM?
          </h1>
          <Button
            variant="default"
            size="lg"
            className="bg-[#4c6b47] text-white text-3xl py-6 px-14 font-bold hover:bg-[#f5a94d] rounded-sm"
          >
            ODLA
          </Button>
        </div>
      </div>
    </div>
  );
}
