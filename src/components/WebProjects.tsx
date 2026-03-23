"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "../data/projects";
import { 
  MessageCircle, 
  Zap, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Smartphone, 
  Cloud, 
  Shield,
  Mail,
  MessageSquare,
  Bot,
  HeadphonesIcon
} from "lucide-react";

// Icon mapping for features
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  zap: Zap,
  "ventas-ventas": Users,
  "e-commerce": ShoppingCart,
  analytics: BarChart3,
  mobile: Smartphone,
  cloud: Cloud,
  security: Shield,
  email: Mail,
  chat: MessageSquare,
  bot: Bot,
  support: HeadphonesIcon,
  default: Zap,
};

function getIcon(iconName: string) {
  return iconMap[iconName.toLowerCase()] || iconMap.default;
}

export default function WebProjects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const webProjects = projects.filter(
    (project) => project.category === "WEB PROJECTS",
  );

  const toggleFeatures = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section className="px-4 md:px-8 lg:px-12 py-24 bg-white text-black">
      <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-4">
        <h2 className="text-sm font-medium uppercase tracking-wide">
          Web Projects
        </h2>
        <span className="text-xs text-gray-500">SELECTED WORKS</span>
      </div>

      <div className="space-y-20">
        {webProjects.map((project, index) => (
          <div
            key={project.id}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Main Image Side */}
            <div
              className={`lg:col-span-7 relative aspect-4/3 overflow-hidden bg-gray-100 ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm tracking-widest uppercase">
                    Coming Soon
                  </span>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider border border-black/5">
                Featured
              </div>
            </div>

            {/* Info & Mosaic Side */}
            <div
              className={`lg:col-span-5 flex flex-col justify-between h-full space-y-8 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              {/* Header Info */}
              <div className="border-t border-black pt-4">
                <h3 className="text-3xl md:text-5xl font-light mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest border border-gray-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-6 flex flex-wrap gap-4 justify-start">
                  {/* Features Toggle Button */}
                  {project.features && project.features.length > 0 && (
                    <button
                      onClick={() => toggleFeatures(project.id)}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <span className={`transform transition-transform duration-300 ${expandedProject === project.id ? 'rotate-90' : ''}`}>
                        ▶
                      </span>
                      {expandedProject === project.id ? 'Hide Features' : 'Features'}
                    </button>
                  )}
                  
                  {/* View More Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors flex items-center gap-2"
                    >
                      {project.buttonText || "VIEW MORE"} ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Features Panel - Expandable */}
              {project.features && project.features.length > 0 && expandedProject === project.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.features.map((feature, idx) => {
                      const IconComponent = getIcon(feature.icon);
                      return (
                        <div 
                          key={idx}
                          className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-4 h-4 text-gray-700" />
                            <span className="text-xs font-medium uppercase tracking-wider text-gray-800">
                              {feature.label}
                            </span>
                          </div>
                          {feature.description && (
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mosaic Grid - Only show if gallery exists and has at least 3 images */}
              {project.gallery && project.gallery.length >= 3 && (
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <div className="aspect-square relative bg-gray-100 overflow-hidden">
                    <Image
                      src={project.gallery[0] || ""}
                      alt="Detail 1"
                      fill
                      className="object-cover hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <div className="relative bg-gray-100 overflow-hidden">
                      <Image
                        src={project.gallery[1] || ""}
                        alt="Detail 2"
                        fill
                        className="object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <div className="relative bg-gray-100 overflow-hidden">
                      <Image
                        src={project.gallery[2] || ""}
                        alt="Detail 3"
                        fill
                        className="object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
