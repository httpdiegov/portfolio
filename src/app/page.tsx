"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  const [category, setCategory] = useState("ALL");
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Header
        activeCategory={category}
        setCategory={setCategory}
        isProjectOpen={isProjectOpen}
      />
      <Hero category={category} onViewChange={setIsProjectOpen} />
    </main>
  );
}
