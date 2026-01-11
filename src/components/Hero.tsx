"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { projects, Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  category?: string;
  setCategory?: (category: string) => void;
  onViewChange?: (isOpen: boolean) => void;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

export default function Hero({
  category = "ALL",
  setCategory,
  onViewChange,
  setIsMobileMenuOpen,
}: HeroProps) {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const menuItems = ["ALL", "WEB PROJECTS", "BRANDS", "AUTOMATIONS"];

  const filteredItems = projects.filter(
    (item) => category === "ALL" || item.category === category
  );

  useEffect(() => {
    setScrollPos(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [category]);

  const handleCategoryClick = (cat: string) => {
    if (setCategory) {
      setCategory(cat);
    }
  };

  const handleScroll = (direction: "up" | "down") => {
    if (!containerRef.current) return;

    // Check if mobile (md is 768px in Tailwind standard)
    const isMobile = window.innerWidth < 768;

    // On mobile: scroll 1 full image (100% height).
    // On desktop: scroll 1/2 screen (existing behavior).
    const scrollAmount = isMobile
      ? containerRef.current.clientHeight
      : containerRef.current.clientHeight / 2;

    const newPos =
      direction === "down"
        ? Math.min(scrollPos + scrollAmount, maxScroll)
        : Math.max(scrollPos - scrollAmount, 0);

    setScrollPos(newPos);
    containerRef.current.scrollTo({ top: newPos, behavior: "smooth" });
  };

  useEffect(() => {
    // Add a small delay to ensure layout is settled (especially for grid/flex changes)
    const timer = setTimeout(() => {
      const checkScroll = () => {
        if (containerRef.current) {
          setMaxScroll(
            containerRef.current.scrollHeight -
              containerRef.current.clientHeight
          );
        }
      };
      checkScroll();
      // Also check on resize
      window.addEventListener("resize", checkScroll);
      return () => window.removeEventListener("resize", checkScroll);
    }, 50);

    return () => clearTimeout(timer);
  }, [filteredItems, selectedProject, category]); // Added category to ensure reflow recalculation

  const openProject = (project: Project) => {
    setSelectedProject(project);
    if (onViewChange) onViewChange(true);
    setScrollPos(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeProject = () => {
    setSelectedProject(null);
    if (onViewChange) onViewChange(false);
  };

  // Decide what items to show: Project Gallery images OR Filtered Projects
  const displayItems = selectedProject
    ? (selectedProject.gallery || []).map((src, index) => ({
        id: `gallery-${selectedProject.id}-${index}`,
        src,
        title: selectedProject.title,
        category: selectedProject.category,
        span: "",
        isGallery: true,
      }))
    : filteredItems.map((item) => ({
        ...item,
        src: item.image,
        isGallery: false,
      }));

  return (
    <section className="h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden">
      {/* Top Half (Mobile): Menu + Mosaic */}
      <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col">
        {/* Mobile Horizontal Menu (Visible ONLY on Mobile) */}
        <div className="md:hidden w-full bg-white border-b border-gray-100 py-3 px-4 z-[60] flex-none relative">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryClick(item)}
                style={{ touchAction: "manipulation" }}
                className={`text-xs font-bold tracking-wide hover:opacity-70 transition-opacity uppercase leading-tight whitespace-nowrap ${
                  category === item && !selectedProject
                    ? "border-b-2 border-black"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
            <div className="w-px h-3 bg-gray-300 mx-1" />
            <a
              href="/contact"
              className="text-xs font-bold tracking-wide hover:opacity-70 uppercase whitespace-nowrap"
            >
              CONTACT
            </a>
            <div className="text-xs font-bold tracking-wide uppercase opacity-70 whitespace-nowrap">
              WHOAMI
            </div>
          </div>
        </div>

        {/* Left: Interactive Mosaic (Full width on mobile and desktop) */}
        <div className="flex-1 w-full bg-gray-100 relative group overflow-hidden">
          {/* Back Button (Only visible when project is selected) */}
          <AnimatePresence>
            {selectedProject && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={closeProject}
                className="absolute top-6 left-6 z-30 flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white transition-all shadow-sm cursor-pointer"
              >
                <ChevronLeft size={16} />
                Back to Projects
              </motion.button>
            )}
          </AnimatePresence>

          {/* Up Arrow */}
          {scrollPos > 10 && (
            <button
              onClick={() => handleScroll("up")}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-white/80 p-2 rounded-full hover:bg-white transition-all shadow-md animate-in fade-in cursor-pointer text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          )}

          <div
            ref={containerRef}
            className="h-full w-full overflow-hidden flex flex-col md:grid md:grid-cols-2 md:auto-rows-[33vh] md:gap-1 md:p-1"
            style={{ scrollBehavior: "smooth" }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {displayItems.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden bg-gray-200 cursor-pointer group/tile z-30 w-full h-full flex-none md:h-full text-left appearance-none focus:outline-none touch-manipulation ${
                    item.span || ""
                  }`}
                  onClick={() => {
                    if (!item.isGallery) openProject(item as any);
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.category}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      !item.isGallery ? "md:group-hover/tile:scale-105" : ""
                    }`}
                    sizes="50vw"
                  />
                  {!item.isGallery && (
                    <div className="absolute inset-0 bg-black/0 md:group-hover/tile:bg-black/20 transition-colors flex items-center justify-center opacity-0 md:group-hover/tile:opacity-100 pointer-events-none">
                      <span className="text-white font-medium text-xs tracking-widest uppercase bg-black/50 px-2 py-1 backdrop-blur-sm">
                        {item.title}
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>

            {displayItems.length === 0 && (
              <div className="col-span-2 row-span-3 flex items-center justify-center text-gray-400">
                No items found
              </div>
            )}
          </div>

          {/* Down Arrow */}
          {scrollPos < maxScroll - 10 && displayItems.length > 0 && (
            <button
              onClick={() => handleScroll("down")}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/80 p-2 rounded-full hover:bg-white transition-all shadow-md animate-in fade-in cursor-pointer text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col justify-end px-6 pt-6 pb-20 md:justify-center md:p-12 bg-white relative overflow-y-auto md:overflow-hidden">
        <div className="flex-[0_0_auto] md:flex-1 flex items-end justify-start pb-4 md:pb-12 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {selectedProject ? (
              <motion.h1
                key="project-title"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[8vw] font-normal tracking-tighter leading-none"
              >
                {selectedProject.title}
              </motion.h1>
            ) : (
              <motion.h1
                key="main-title"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[8vw] font-normal tracking-tighter leading-none"
              >
                borntocreate
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="pb-12 h-auto md:h-64 overflow-hidden relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {selectedProject ? (
              <motion.div
                key="project-desc"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-base md:text-xl font-medium max-w-md leading-relaxed">
                  {selectedProject.description}
                  <br />
                  <br />
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-b border-black pb-1 hover:opacity-60 transition-opacity uppercase text-sm tracking-widest"
                    >
                      Visit Website
                    </a>
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="main-desc"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-base md:text-xl font-medium max-w-md leading-relaxed">
                  We are evolving from laborers into true creators—designed to
                  think, elaborate, and bring new ideas to life.
                  <br className="mb-4 block" />
                  It's not just a name, it's our purpose.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
