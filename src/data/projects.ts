export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[]; // Multiple images for the lightbox
  category: "WEB PROJECTS" | "BRANDS" | "AUTOMATIONS"; // Strict categories for filtering
  span?: string; // Grid span class (e.g., "col-span-2", "row-span-2")
  tags: string[];
  link?: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: "true-web",
    title: "True Web",
    description: "Tienda online de ropa vintage premium.",
    image: "/trueweb1.png",
    gallery: ["/trueweb1.png", "/trueweb1.png", "/trueweb1.png"],
    category: "WEB PROJECTS",
    span: "",
    tags: ["Next.js", "E-commerce"],
    link: "https://www.truevintage.pe",
    date: "2024-05-01",
  },
  {
    id: "1",
    title: "Portfolio V1",
    description: "Mi primer portafolio personal.",
    image: "/model1.png", // Using existing placeholder for now
    category: "BRANDS",
    tags: ["HTML", "CSS"],
    date: "2024-01-01",
  },
  {
    id: "2",
    title: "E-commerce Demo",
    description: "Demo de tienda online.",
    image: "/mosaic/tile3.png", // Using existing placeholder
    category: "WEB PROJECTS",
    link: "https://ecommerce-demo.com",
    tags: ["Next.js", "Stripe"],
    date: "2024-03-15",
  },
  {
    id: "3",
    title: "Automation Dashboard",
    description: "Dashboard para automatizaciones.",
    image: "/mosaic/tile2.png",
    category: "AUTOMATIONS",
    span: "",
    tags: ["Python", "React"],
    date: "2024-02-20",
  },
  {
    id: "4",
    title: "Brand Identity",
    description: "Identidad visual para marca.",
    image: "/mosaic/tile4.png",
    category: "BRANDS",
    tags: ["Design", "Branding"],
    date: "2024-04-10",
  },
];
