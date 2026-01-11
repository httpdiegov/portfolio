"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activeCategory?: string;
  setCategory?: (category: string) => void;
  isProjectOpen?: boolean;
}

export default function Header({
  activeCategory = "ALL",
  setCategory,
  isProjectOpen = false,
}: HeaderProps) {
  const handleCategoryClick = (category: string) => {
    if (setCategory) {
      setCategory(category);
    }
  };

  const menuItems = ["ALL", "WEB PROJECTS", "BRANDS", "AUTOMATIONS"];

  return (
    <header className="fixed top-0 w-full z-50 text-white mix-blend-difference grid grid-cols-4 gap-1 pointer-events-none">
      <div className="col-start-3 flex justify-between items-start py-6 px-4 pointer-events-auto">
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
  );
}
