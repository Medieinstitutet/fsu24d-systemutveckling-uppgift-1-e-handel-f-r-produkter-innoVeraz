"use client";

import { Button } from "@/components/ui/button";

const title = "Dags att någon tar hand om dina växter?";


export function Hero() {
  return (
<section className="snap-start h-screen relative">
  <video
    autoPlay
    muted
    playsInline
    className="absolute w-full h-full object-cover -z-10"
  >
    <source src="/herovideo.mp4" type="video/mp4" />
  </video>

  <div className="grid h-full grid-rows-4 text-white">
    <div className="row-start-3 flex flex-col items-center justify-center text-center gap-8">
      <h1 className="text-4xl sm:text-6xl font-bold drop-shadow-md">
        {title}
      </h1>
      <Button
        variant="default"
        size="lg"
        className="text-2xl text-stone-700 px-8 py-4 font-bold bg-white"
      >
        BOKA TID
      </Button>
    </div>
  </div>
</section>

  );
}
