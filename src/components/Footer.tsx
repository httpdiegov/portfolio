export default function Footer() {
  return (
    <footer id="contact" className="px-4 md:px-8 lg:px-12 py-24 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            CREATING NEXT LEVEL
            <br />
            DIGITAL PRODUCTS
          </h2>

          <div className="flex gap-4 mt-12">
            {/* Placeholder for team images */}
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
          </div>
        </div>

        <div className="space-y-8 md:pl-12">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-gray-500">
              Location
            </h3>
            <p className="text-lg">Tashkent, Uzbekistan</p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-gray-500">
              Email
            </h3>
            <a
              href="mailto:hello@narrative.com"
              className="text-lg hover:underline"
            >
              hello@narrative.com
            </a>
          </div>

          <div className="pt-12 flex gap-8 text-sm font-medium uppercase tracking-wide">
            <a href="#" className="hover:text-gray-600">
              Behance
            </a>
            <a href="#" className="hover:text-gray-600">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-600">
              Save
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
