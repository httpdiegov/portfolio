import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen w-full flex overflow-hidden">
      {/* Left: Mosaic */}
      <div className="w-1/2 h-full bg-gray-100 relative">
        <div className="grid grid-cols-2 grid-rows-3 h-full w-full gap-1">
          {/* Placeholder Mosaic Layout */}
          <div className="relative row-span-2 overflow-hidden">
            <Image
              src="/model1.png"
              alt="Model"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/mosaic/tile3.png"
              alt="Tile"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/trueweb2.png"
              alt="TrueWeb"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative overflow-hidden">
            <Image
              src="/mosaic/tile2.png"
              alt="Tile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right: Text */}
      <div className="w-1/2 h-full flex flex-col justify-between p-12 pt-32 bg-white">
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-8xl font-normal tracking-tighter">
            borntocreate
          </h1>
        </div>
        <div>
          <p className="text-lg font-medium max-w-md">
            We are evolving from laborers into true creators—designed to think,
            elaborate, and bring new ideas to life.
            <br />
            It's not just a name, it's our purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
