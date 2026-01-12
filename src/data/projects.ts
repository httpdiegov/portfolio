export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[]; // Multiple images for the lightbox
  category: "WEB PROJECTS" | "BRANDS" | "AUTOMATIONS" | "CONTACT"; // Strict categories for filtering
  span?: string; // Grid span class (e.g., "col-span-2", "row-span-2")
  tags: string[];
  link?: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: "true-web",
    title: "True Vintage Website",
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
    id: "contact-email",
    title: "diegovergarah2712@gmail.com",
    description: "Email",
    image: "", // No image for contact list
    category: "CONTACT",
    tags: ["Email"],
    link: "mailto:diegovergarah2712@gmail.com",
    date: "",
  },
  {
    id: "contact-phone",
    title: "+51 913239183",
    description: "Phone",
    image: "",
    category: "CONTACT",
    tags: ["Phone"],
    link: "tel:+51913239183",
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
