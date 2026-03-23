export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[]; // Multiple images for the lightbox
  category: "WEB PROJECTS" | "BRANDS" | "AUTOMATIONS" | "CONTACT"; // Strict categories for filtering
  span?: string; // Grid span class (e.g., "col-span-2", "row-span-2")
  tags: string[];
  features?: { // Project features - shown when toggled
    icon: string; // Icon name (lucide-react or emoji)
    label: string; // Feature name
    description?: string; // Optional short description
  }[];
  link?: string;
  buttonText?: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: "true-web",
    title: "True Vintage Website",
    description: "Tienda online de ropa vintage premium.",
    image: "/trueweb/trueweb1.png",
    gallery: [
      "/trueweb/trueweb2.png",
      "/trueweb/trueweb3.png",
      "/trueweb/trueweb4.png",
    ],
    category: "WEB PROJECTS",
    span: "",
    tags: ["Next.js", "E-commerce"],
    link: "https://www.truevintage.pe",
    date: "2024-05-01",
    features: [
      { icon: "", label: "WhatsApp Integration" },
      { icon: "", label: "Mobile Responsive" },
      { icon: "", label: "SSR" },
      { icon: "", label: "N8N Integration" },
    ],
  },
  {
    id: "linktree",
    title: "Linktree",
    description: "A... Linktree",
    image: "/linktree/linktree1.png",
    gallery: ["/linktree/linktree1.png"],
    category: "WEB PROJECTS",
    span: "",
    tags: ["Next.js", "E-commerce"],
    link: "https://www.borntocreate.dev",
    date: "2024-05-01",
    features: [
      { icon: "", label: "Mobile Responsive" },
    ],
  },
  {
    id: "automarket",
    title: "AutoMarket",
    description: "Coming Soon...",
    image: "/automarket/automarket1.png",
    category: "WEB PROJECTS",
    tags: ["Coming Soon"],
    link: "",
    buttonText: "Coming Soon...",
    date: "2024-06-01",
  },
  {
    id: "contact-email",
    title: "diegov@borntocreate.dev",
    description: "Email",
    image: "", // No image for contact list
    category: "CONTACT",
    tags: ["Email"],
    link: "mailto:diegov@borntocreate.dev",
    date: "",
  },

  // {
  //   id: "contact-instagram",
  //   title: "instagram.com/http_diegov",
  //   description: "Instagram",
  //   image: "",
  //   category: "CONTACT",
  //   tags: ["Social"],
  //   link: "https://instagram.com/http_diegov",
  //   date: "",
  // },
  // {
  //   id: "contact-linkedin",
  //   title: "LinkedIn",
  //   description: "LinkedIn",
  //   image: "",
  //   category: "CONTACT",
  //   tags: ["Social"],
  //   link: "https://linkedin.com", // Placeholder
  //   date: "",
  // },
];
