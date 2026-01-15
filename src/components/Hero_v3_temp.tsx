import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen w-full flex overflow-hidden">
      {/* Left: Mosaic */}
      <div className="w-1/2 h-full bg-gray-100 relative">
        <div className="grid grid-cols-2 grid-rows-3 h-full w-full gap-1 p-1">
          {/* Col 1, Row 1-2: Model */}
          <div className="relative row-span-2 overflow-hidden bg-gray-200">
            <Image
              src="/model1.png"
              alt="Model"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>

          {/* Col 2, Row 1: Tile 3 */}
          <div className="relative overflow-hidden bg-gray-200">
            <Image
              src="/mosaic/tile3.png"
              alt="Texture"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>

          {/* Col 2, Row 2: Trueweb */}
          <div className="relative overflow-hidden bg-gray-200">
            <Image
              src="/trueweb2.png"
              alt="Features"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>

          {/* Row 3 (Spans 2 cols): Tile 2 */}
          <div className="col-span-2 relative overflow-hidden bg-gray-200">
            <Image
              src="/mosaic/tile2.png"
              alt="Detail"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </div>

      {/* Right: Text Content */}
      <div className="w-1/2 h-full flex flex-col justify-center p-12 bg-white relative">
        {/* Header occupies top space via fixed positioning, so we just center the main title */}
        <div className="flex-1 flex items-end justify-start pb-12">
          <h1 className="text-8xl md:text-[8vw] font-normal tracking-tighter leading-none">
            borntocreate
          </h1>
        </div>

        <div className="pb-12">
          <p className="text-sm md:text-lg font-medium max-w-md leading-relaxed">
            We are evolving from laborers into true creators—designed to think,
            elaborate, and bring new ideas to life.
            <br className="mb-4 block" />
            It's not just a name, it's our purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
