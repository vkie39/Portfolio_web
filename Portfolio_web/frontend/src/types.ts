// Project categories matching your backend
export type ProjectCategory = "AI/CV" | "VR" | "Mobile" | "Robotics" | "Team Lead";

// Project interface matching your server.js structure
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;    // image 대신 thumbnail
  categories: string[]; 
  problem: string;
  role: string;
  tech: string[];      // techStack 대신 tech
  result: string;
  metrics: string;
  link: string;
  featured?: boolean;  // 선택 사항
  // 아래는 기존에 없던 에러 유발 항목들입니다 (사용하려면 백엔드에도 추가해야 함)
  award?: string;      
  period?: string;
  team?: number;
}

// About Q&A interface
export interface AboutQA {
  question: string;
  answer: string;
}
