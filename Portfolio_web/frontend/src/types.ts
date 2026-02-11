// Project categories matching your backend
export type ProjectCategory = "AI/CV" | "VR" | "Mobile" | "Robotics" | "Team Lead";

// Project interface matching your server.js structure
export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  categories: ProjectCategory[];
  problem: string;
  role: string;
  tech: string[];
  result: string;
  metrics?: string;
  link?: string;
  featured?: boolean;
}

// About Q&A interface
export interface AboutQA {
  question: string;
  answer: string;
}
