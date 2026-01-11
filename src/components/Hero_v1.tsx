import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen w-full box-border relative overflow-hidden">
      <div className="h-full w-full grid grid-cols-4 grid-rows-3 gap-1 bg-white">
        {/* Row 1 */}
        <div className="row-span-3 relative h-full w-full flex items-end justify-center bg-transparent">
          <div className="relative h-2/3 w-full bg-gray-100 overflow-hidden">
            <Image
              src="/model1.png"
              alt="Model"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gray-100 h-full w-full">
          <Image
            src="/mosaic/tile4.png"
            alt="Soap"
            fill
            className="object-cover"
            sizes="25vw"
          />
        </div>
        <div className="bg-transparent relative h-full w-full"></div>
        <div className="relative overflow-hidden bg-gray-100 h-full w-full">
          <Image
            src="/mosaic/tile3.png"
            alt="Portrait"
            fill
            className="object-cover"
            sizes="25vw"
          />
        </div>

        {/* Row 2 */}

        {/* Central Text Area - Spans 2 Cols */}
        <div className="col-span-2 flex items-center justify-center bg-transparent h-full w-full">
          <h1 className="text-6xl md:text-[104px] font-normal tracking-tight text-center leading-[0.85] md:leading-[88px]">
            borntocreate
          </h1>
        </div>

        <div className="relative overflow-hidden bg-gray-100 h-full w-full">
          <Image
            src="/mosaic/tile2.png"
            alt="TrueWeb"
            fill
            className="object-cover"
            sizes="25vw"
          />
        </div>

        {/* Row 3 */}
        {/* Row 3 - Spans last 3 columns for granular control */}
        <div className="col-span-3 grid grid-cols-12 h-full w-full">
          <div className="col-span-1 bg-transparent"></div>
          <div className="col-span-4 relative overflow-hidden bg-gray-100 h-full w-full">
            <Image
              src="/trueweb1.png"
              alt="Portrait Dark"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          <div className="col-span-4 flex items-center p-6 md:p-12 bg-transparent h-full w-full">
            <p className="text-sm md:text-base font-medium leading-relaxed max-w-md">
              We are evolving from laborers into true creators—designed to
              think, elaborate, and bring new ideas to life.{" "}
              <br className="hidden md:block" />
              It's not just a name, it's our purpose.
            </p>
          </div>
          <div className="col-span-3 bg-transparent"></div>
        </div>
      </div>
    </section>
  );
}
