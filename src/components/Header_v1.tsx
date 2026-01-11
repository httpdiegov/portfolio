import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 text-white mix-blend-difference grid grid-cols-4 gap-1 pointer-events-none">
      <div className="col-start-3 flex justify-between items-start py-6 px-4 pointer-events-auto">
        <div className="flex flex-col gap-10">
          <div className="text-sm font-medium tracking-wide">WEB PROJECTS</div>
          <Link
            href="/contact"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
          >
            BRANDS
          </Link>
          <div className="text-sm font-medium tracking-wide">AUTOMATIONS</div>
        </div>

        <div className="flex items-start gap-8">
          <div className="flex flex-col gap-10">
            <Link
              href="/contact"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
            >
              CONTACT
            </Link>
            <div className="text-sm font-medium tracking-wide">WHOAMI</div>
          </div>
          <button className="flex flex-col gap-1.5 w-6 group cursor-pointer pt-1">
            <span className="w-full h-0.5 bg-black transition-transform group-hover:translate-x-1"></span>
            <span className="w-full h-0.5 bg-black transition-transform group-hover:-translate-x-1"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
