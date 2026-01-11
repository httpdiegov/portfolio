"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activeCategory?: string;
  setCategory?: (category: string) => void;
  isProjectOpen?: boolean;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

export default function Header({
  activeCategory = "ALL",
  setCategory,
  isProjectOpen = false,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const handleCategoryClick = (category: string) => {
    if (setCategory) {
      setCategory(category);
    }
    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const menuItems = ["ALL", "WEB PROJECTS", "BRANDS", "AUTOMATIONS"];

  return (
    <>
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference pointer-events-none md:grid md:grid-cols-4 md:gap-1 flex justify-end md:p-0">
        {/* Desktop Menu - Col 3 */}
        <div className="hidden md:flex col-start-3 justify-between items-start py-6 px-4 pointer-events-auto">
          <div className="flex flex-col gap-2 items-start">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryClick(item)}
                className={
                  "relative cursor-pointer text-sm font-medium tracking-wide hover:opacity-70 transition-opacity text-left uppercase " +
                  (activeCategory === item && !isProjectOpen ? "font-bold" : "")
                }
              >
                {item}
                <AnimatePresence>
                  {activeCategory === item && !isProjectOpen && (
                    <motion.div
                      key="underline"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      exit={{ width: "0%" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 bottom-0 h-px bg-current"
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
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

      {/* Mobile Menu Overlay - Right Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 w-3/4 z-[60] bg-white text-black flex flex-col p-6 shadow-2xl"
          >
            <div className="flex justify-end">
              <button
                onClick={() =>
                  setIsMobileMenuOpen && setIsMobileMenuOpen(false)
                }
                className="text-sm font-bold tracking-widest uppercase"
              >
                CLOSE
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center items-start gap-8">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleCategoryClick(item)}
                    className={
                      "text-3xl font-light tracking-tighter uppercase text-left transition-opacity " +
                      (activeCategory === item ? "opacity-100" : "opacity-40")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="h-px w-full bg-gray-200 my-4" />

              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="text-xl font-light tracking-wide uppercase opacity-70 hover:opacity-100"
                  onClick={() =>
                    setIsMobileMenuOpen && setIsMobileMenuOpen(false)
                  }
                >
                  Contact
                </Link>
                <div className="text-xl font-light tracking-wide uppercase opacity-70">
                  Who Am I
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
