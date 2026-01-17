"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { projects, Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "./FadeIn";

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
  const [shouldPreload, setShouldPreload] = useState(false);

  const menuItems = ["ALL", "WEB PROJECTS", "BRANDS", "AUTOMATIONS"];

  const filteredItems = projects.filter((item) => {
    if (category === "ALL") {
      return item.category !== "CONTACT";
    }
    return item.category === category;
  });

  useEffect(() => {
    // Enable preloading after initial mount/render
    const timer = setTimeout(() => {
      setShouldPreload(true);
    }, 1000); // Small delay to prioritize main content loading
    return () => clearTimeout(timer);
  }, []);

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
              containerRef.current.clientHeight,
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
        description: "",
        category: selectedProject.category,
        span: "",
        link: "",
        isGallery: true,
      }))
    : filteredItems.map((item) => ({
        ...item,
        src: item.image,
        isGallery: false,
      }));

  return (
    <section className="h-dvh w-full flex flex-col md:flex-row overflow-hidden">
      {/* Background Preloader for Gallery Images */}
      {shouldPreload && (
        <div style={{ display: "none" }}>
          {projects.map((project) =>
            project.gallery?.map((src, i) => (
              <Image
                key={`preload-${project.id}-${i}`}
                src={src}
                alt="preload"
                width={10}
                height={10}
                priority={true} // Force browser to fetch immediately when rendered
                unoptimized={true} // Bypass Next.js optimization for raw speed if needed, but priority should suffice
              />
            )),
          )}
        </div>
      )}

      {/* Top Half (Mobile): Menu + Mosaic */}
      <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col">
        {/* Mobile Horizontal Menu (Visible ONLY on Mobile) */}
        <div className="md:hidden w-full bg-white border-b border-gray-100 py-3 px-4 z-60 flex-none relative">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryClick(item)}
                className="relative text-xs font-bold tracking-wide hover:opacity-70 transition-opacity uppercase whitespace-nowrap pb-1"
              >
                {item}
                <AnimatePresence>
                  {category === item && !selectedProject && (
                    <motion.div
                      key="mobile-underline"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      exit={{ width: "0%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 bottom-0 h-0.5 bg-black"
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
            <div className="w-px h-3 bg-gray-300 mx-1" />
            <button
              onClick={() => handleCategoryClick("CONTACT")}
              className="relative text-xs font-bold tracking-wide hover:opacity-70 transition-opacity uppercase whitespace-nowrap pb-1"
            >
              CONTACT
              <AnimatePresence>
                {category === "CONTACT" && !selectedProject && (
                  <motion.div
                    key="mobile-underline-contact"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ width: "0%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 bottom-0 h-0.5 bg-black"
                  />
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => handleCategoryClick("WHOAMI")}
              className="relative text-xs font-bold tracking-wide hover:opacity-70 transition-opacity uppercase whitespace-nowrap pb-1"
            >
              WHOAMI
              <AnimatePresence>
                {category === "WHOAMI" && !selectedProject && (
                  <motion.div
                    key="mobile-underline-whoami"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ width: "0%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 bottom-0 h-0.5 bg-black"
                  />
                )}
              </AnimatePresence>
            </button>
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
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm p-3 md:px-4 md:py-2 rounded-full hover:bg-white transition-all shadow-sm cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span className="hidden md:inline">Back to Projects</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Up Arrow */}
          {scrollPos > 10 && category !== "CONTACT" && (
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
            <AnimatePresence mode="popLayout" initial={true}>
              {displayItems.map((item, index) => (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05, // Staggered delay based on index
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative group/tile overflow-hidden bg-gray-100 flex items-center justify-center ${
                    item.category === "CONTACT"
                      ? "col-span-2 h-auto py-4 bg-white border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors"
                      : "md:h-full w-full h-full flex-none"
                  } ${item.span || ""}`}
                  onClick={() => {
                    if (item.category === "CONTACT") {
                      window.open(item.link, "_blank");
                      return;
                    }
                    if (!item.isGallery) openProject(item as any);
                  }}
                >
                  {item.category === "CONTACT" ? (
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium tracking-widest uppercase mb-1 opacity-50">
                        {item.description}
                      </span>
                      <span className="text-lg md:text-2xl font-light tracking-tight uppercase hover:opacity-70 transition-opacity text-center px-4">
                        {item.title}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        priority={index === 0 && !selectedProject} // Prioritize first image in main view
                        className={`object-cover transition-transform duration-700 ${
                          !item.isGallery ? "md:group-hover/tile:scale-105" : ""
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {!item.isGallery && (
                        <div className="absolute inset-0 bg-black/0 md:group-hover/tile:bg-black/20 transition-colors flex items-center justify-center opacity-0 md:group-hover/tile:opacity-100 pointer-events-none">
                          <span className="text-white font-medium text-xs tracking-widest uppercase bg-black/50 px-2 py-1 backdrop-blur-sm">
                            {item.title}
                          </span>
                        </div>
                      )}
                      {!item.isGallery && (
                        <div className="absolute bottom-4 left-4 md:hidden z-20 pointer-events-none">
                          <span className="text-white font-bold text-sm tracking-wide uppercase bg-black/80 backdrop-blur-sm px-3 py-1.5 shadow-sm rounded-sm">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>

            {displayItems.length === 0 && (
              <div className="absolute inset-0 bg-white z-40 flex items-center justify-center">
                <p className="text-xl font-normal text-gray-400 tracking-wide">
                  Nothing yet
                </p>
              </div>
            )}
          </div>

          {/* Down Arrow */}
          {scrollPos < maxScroll - 10 &&
            displayItems.length > 0 &&
            category !== "CONTACT" && (
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
          <AnimatePresence mode="popLayout" initial={true}>
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
                animate={{
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{
                  y: "-100%",
                  opacity: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                className="text-5xl md:text-[8vw] font-normal tracking-tighter leading-none"
              >
                borntocreate
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="pb-12 h-auto md:h-64 overflow-hidden relative">
          <AnimatePresence mode="popLayout" initial={true}>
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
            ) : category === "WHOAMI" ? (
              <motion.div
                key="whoami-desc"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-base md:text-xl font-medium max-w-md leading-relaxed">
                  I am Moises, a creative developer passionate about building
                  digital experiences that merge design and technology.
                  <br className="mb-4 block" />
                  My focus is on creating intuitive, high-performance interfaces
                  that leave a lasting impression.
                </p>
              </motion.div>
            ) : category === "CONTACT" ? (
              <motion.div
                key="contact-desc"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-base md:text-xl font-medium max-w-md leading-relaxed">
                  I'm always open to discuss new projects, creative ideas or
                  opportunities to be part of your visions.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="main-desc"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{
                  y: "-100%",
                  opacity: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
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

          {/* Right Aligned Duplicate - Only for Main Page */}
          <AnimatePresence mode="popLayout" initial={true}>
            {!selectedProject &&
              category !== "WHOAMI" &&
              category !== "CONTACT" && (
                <motion.div
                  key="main-desc-right"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 1.5,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{
                    y: "-100%",
                    opacity: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="absolute top-0 right-0 w-full flex justify-end pointer-events-none"
                >
                  <p className="text-base md:text-xl font-medium max-w-md leading-relaxed text-right pointer-events-auto">
                    Digital product strategy, brand systems, and intelligent
                    workflows. From user experience design to custom AI-driven
                    implementations. We build the tools that empower modern
                    enterprises.
                    <br className="mb-4 block" />
                    Since 2025.
                  </p>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
