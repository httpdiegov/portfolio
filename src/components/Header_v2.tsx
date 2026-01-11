import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 text-black mix-blend-difference grid grid-cols-2 pointer-events-none">
      <div className="col-start-2 flex justify-between items-start py-6 px-12 pointer-events-auto">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-sm font-medium tracking-wide hover:opacity-70"
          >
            WEB PROJECTS
          </Link>
          <Link
            href="/brand"
            className="text-sm font-medium tracking-wide hover:opacity-70"
          >
            BRANDS
          </Link>
          <Link
            href="/automations"
            className="text-sm font-medium tracking-wide hover:opacity-70"
          >
            AUTOMATIONS
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wide hover:opacity-70"
          >
            CONTACT
          </Link>
          <div className="text-sm font-medium tracking-wide">WHOAMI</div>
        </div>
      </div>
    </header>
  );
}
