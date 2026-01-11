import Image from "next/image";

const projects = [
  { id: 1, name: "FRAGMENTS", category: "BRAND IDENTITY", image: "/hero.png" }, // Using hero image as placeholder
  { id: 2, name: "JOOMA", category: "MARKETING", image: "/hero.png" },
  { id: 3, name: "ADIDAS", category: "BRAND IDENTITY", image: "/hero.png" },
  { id: 4, name: "LACOSTE", category: "DESIGN", image: "/hero.png" },
];

export default function ProjectList() {
  return (
    <section id="works" className="px-4 md:px-8 lg:px-12 py-12">
      <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
        <h2 className="text-sm font-medium uppercase tracking-wide">Porto</h2>
        <span className="text-xs text-gray-500">BRAND IDENTITY</span>
      </div>

      <div className="space-y-0">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group border-b border-gray-200 py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-gray-50 transition-colors px-2"
          >
            <h3 className="text-2xl md:text-4xl font-medium mb-4 md:mb-0">
              {project.name}
            </h3>

            <div className="hidden md:block w-32 h-20 relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>

            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {project.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
