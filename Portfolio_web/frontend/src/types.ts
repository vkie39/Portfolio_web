// Project categories matching your backend
export type ProjectCategory = "AI/CV" | "VR" | "Mobile" | "Robotics" | "Team Lead";

// Project interface matching your server.js structure
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  categories: string[];
  problem: string;
  role: string;
  tech: string[];      // techStack 대신 tech로 통일
  result: string;
  metrics: string;
  link: string;
  featured?: boolean;
  award?: string;      // ?를 붙여서 선택 사항으로 만듦
  period?: string;     // ? 추가
  team?: number;       // ? 추가
}

// About Q&A interface
export interface AboutQA {
  question: string;
  answer: string;
}
