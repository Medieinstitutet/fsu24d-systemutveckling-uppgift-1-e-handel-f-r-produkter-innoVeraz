export function Hero() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/herovideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
}