import { useEffect, useMemo, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

// 타입 정의
type ProjectCategory = "AI/CV" | "VR" | "Mobile" | "Robotics" | "Team Lead";

interface Project {
  id: string;
  title: string;
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

interface Skill {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

const App = () => {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "about" | "contact">("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "All">("All");

  // 모달 열리면 바디 스크롤 잠금
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  // 핵심 역량
  const skills: Skill[] = [
    {
      title: "Flutter/Firebase",
      description: "크로스플랫폼 앱 + 인증/DB/푸시/함수까지 제품 단위로 구현",
      icon: "📱",
      highlight: "제품화 가능한 앱 개발",
    },
    {
      title: "Computer Vision",
      description: "YOLOv5 커스텀 학습/최적화 및 Jetson 추론 배포 경험",
      icon: "👁️",
      highlight: "mAP/속도 최적화",
    },
    {
      title: "ROS2/제어",
      description: "로봇 노드 설계, 센서 융합, Navigation 파이프라인 구성",
      icon: "🤖",
      highlight: "실제 주행/제어",
    },
    {
      title: "VR Development",
      description: "Unity 기반 VR 인터랙션, Hand Tracking, 시뮬레이터 구현",
      icon: "🥽",
      highlight: "훈련 시뮬레이터",
    },
  ];

  // 프로젝트 데이터
  const projects: Project[] = [
    {
      id: "1",
      title: "YOLOv5 기반 실시간 객체 감지 시스템",
      thumbnail: "🎯",
      categories: ["AI/CV", "Robotics"],
      problem: "제조 현장에서 불량품을 실시간으로 감지·분류하는 자동화 시스템 필요",
      role: "AI 모델 개발 및 최적화 담당 (개인 프로젝트)",
      tech: ["YOLOv5", "PyTorch", "Jetson Nano", "OpenCV", "TensorRT"],
      result: "커스텀 데이터셋 2,000장 구축, mAP 0.89 달성, Jetson Nano에서 30fps 실시간 추론",
      metrics: "mAP 15% 개선, 추론 속도 2배 향상",
      link: "https://github.com/vkie39/TRANSFORMER-LSTM-CNN-correctionPID.git",
      featured: true,
    },
    {
      id: "2",
      title: "VR 크레인 원격조종 교육 시뮬레이터",
      thumbnail: "🏗️",
      categories: ["VR", "Team Lead"],
      problem: "고위험 크레인 작업을 위한 안전한 교육 환경 구축",
      role: "VR 개발 리드, Hand Tracking 구현 (팀 3명)",
      tech: ["Unity", "Oculus SDK", "Hand Tracking", "C#", "Physics Engine"],
      result: "실제 크레인 조작을 VR로 시뮬레이션, 교육 시간 40% 단축",
      metrics: "캡스톤 디자인 대상 수상",
      link: "https://github.com/vkie39/ict_harbor.git",
      featured: true,
    },
    {
      id: "3",
      title: "사진동네 - 위치 기반 사진 공유 앱",
      thumbnail: "📸",
      categories: ["Mobile", "Team Lead"],
      problem: "특정 장소의 추억을 공유하고 발견할 수 있는 플랫폼 부재",
      role: "풀스택 개발 및 팀 리드 (팀 4명)",
      tech: ["Flutter", "Firebase", "Google Maps API", "FCM", "Cloud Functions"],
      result: "MAU 500+, 평균 세션 12분, 일 업로드 200건",
      metrics: "사용자 리텐션 65%",
      link: "https://github.com/vkie39/Analog_PhotoApp.git",
      featured: true,
    },
    {
      id: "4",
      title: "ROS2 기반 자율주행 로봇",
      thumbnail: "🚗",
      categories: ["Robotics", "AI/CV"],
      problem: "실내 환경에서 자율 주행 및 장애물 회피",
      role: "ROS2 노드 개발 및 센서 융합",
      tech: ["ROS2", "LiDAR", "SLAM", "Python", "Navigation2"],
      result: "실내 맵핑 정확도 95%, 장애물 회피 성공률 92%",
      link: "",
      featured: false,
    },
    {
      id: "5",
      title: "AI 기반 자세 교정 앱",
      thumbnail: "🧘",
      categories: ["AI/CV", "Mobile"],
      problem: "잘못된 운동 자세로 인한 부상 방지",
      role: "Pose Estimation 모델 통합 및 앱 개발",
      tech: ["MediaPipe", "Flutter", "TensorFlow Lite", "Firebase"],
      result: "실시간 자세 분석 및 피드백, 정확도 88%",
      featured: false,
    },
  ];

  const filteredProjects = useMemo(() => {
    return filterCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(filterCategory));
  }, [filterCategory]);

  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), []);

  // 공통 UI
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-screen-2xl">{children}</div>
  );

  const SectionTitle = ({
    eyebrow,
    title,
    desc,
  }: {
    eyebrow?: string;
    title: string;
    desc?: string;
  }) => (
    <div className="text-center space-y-3">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur border border-gray-200 text-gray-700 text-sm">
          <Sparkles size={16} className="text-blue-600" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      {desc && <p className="text-gray-600 max-w-2xl mx-auto">{desc}</p>}
    </div>
  );

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
      {children}
    </span>
  );

  const PrimaryButton = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold
                 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200/60
                 hover:shadow-lg hover:shadow-blue-200/70 active:scale-[0.99] transition"
    >
      {children}
      <ChevronRight size={18} className="opacity-80 group-hover:translate-x-0.5 transition" />
    </button>
  );

  const GhostButton = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                 border border-gray-200 bg-white/70 backdrop-blur
                 hover:bg-white hover:border-gray-300 shadow-sm active:scale-[0.99] transition"
    >
      {children}
    </button>
  );

  const ProjectCard = ({ project }: { project: Project }) => (
    <div
      onClick={() => setSelectedProject(project)}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition"
    >
      <div className="relative h-44">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="text-4xl drop-shadow-sm">{project.thumbnail}</div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">{project.problem}</p>

        {project.metrics && (
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            {project.metrics}
          </div>
        )}

        <div className="pt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">{project.tech.slice(0, 3).join(" · ")}</span>
          <span className="text-blue-700 text-sm font-semibold inline-flex items-center gap-1">
            자세히 <ChevronRight size={16} className="group-hover:translate-x-0.5 transition" />
          </span>
        </div>
      </div>
    </div>
  );

  // 홈 화면
  const HomeSection = () => (
    <div className="space-y-20">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl" />

        <div className="relative p-10 md:p-14 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur border border-gray-200 text-sm text-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Available for collaboration
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            최서현
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            VR · AI/CV · Robotics 프로젝트를 <span className="font-semibold text-gray-900">설계</span>하고
            <span className="font-semibold text-gray-900"> 구현</span>하는 개발자
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <PrimaryButton onClick={() => setActiveTab("projects")}>프로젝트 보기</PrimaryButton>
            <GhostButton onClick={() => setActiveTab("contact")}>연락하기</GhostButton>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "3+", v: "Team Projects" },
              { k: "mAP 0.89", v: "YOLOv5" },
              { k: "30fps", v: "Jetson Deploy" },
              { k: "Capstone", v: "Grand Prize" },
            ].map((stat) => (
              <div
                key={stat.v}
                className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-4 text-left"
              >
                <div className="text-xl font-extrabold text-gray-900">{stat.k}</div>
                <div className="text-sm text-gray-600">{stat.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 핵심 역량 */}
      <div className="space-y-10">
        <SectionTitle eyebrow="Core Strengths" title="핵심 역량" desc="프로젝트를 ‘완성’까지 끌고 가는 역량을 중심으로 정리했어요." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition"
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{skill.icon}</div>
                <div className="opacity-0 group-hover:opacity-100 transition text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">
                  {skill.highlight ?? "Strength"}
                </div>
              </div>
              <h3 className="text-lg font-bold mt-4 text-gray-900">{skill.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 대표 프로젝트 */}
      <div className="space-y-10">
        <SectionTitle eyebrow="Featured" title="대표 프로젝트" desc="성과/임팩트 중심으로 빠르게 확인할 수 있도록 구성했어요." />
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );

  // 프로젝트 목록
  const ProjectsSection = () => {
    const categories: (ProjectCategory | "All")[] = ["All", "AI/CV", "VR", "Mobile", "Robotics", "Team Lead"];

    return (
      <div className="space-y-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">프로젝트</h1>
            <p className="text-gray-600">카테고리 필터로 빠르게 골라볼 수 있어요.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            총 <span className="font-semibold text-gray-900">{filteredProjects.length}</span>개
          </div>
        </div>

        {/* 필터 */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-semibold transition",
                  "border shadow-sm",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-blue-200/60"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 프로젝트 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  };

  // 프로젝트 상세 모달
  const ProjectDetailModal = ({ project }: { project: Project }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setSelectedProject(null)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/70 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{project.thumbnail}</div>
            <div>
              <div className="text-lg font-extrabold text-gray-900">{project.title}</div>
              <div className="flex gap-2 flex-wrap mt-1">
                {project.categories.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-64px)] space-y-8">
          {/* Hero block */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200">
            <div className="h-56 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
              <div className="text-7xl drop-shadow">{project.thumbnail}</div>
            </div>
            {project.metrics && (
              <div className="absolute bottom-3 left-3 right-3">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur border border-gray-200 text-gray-900 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {project.metrics}
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-5 bg-gray-50">
              <h3 className="font-extrabold text-gray-900 mb-2">① 배경 및 문제</h3>
              <p className="text-gray-700 leading-relaxed">{project.problem}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-5 bg-gray-50">
              <h3 className="font-extrabold text-gray-900 mb-2">② 역할 및 기여도</h3>
              <p className="text-gray-700 leading-relaxed">{project.role}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-extrabold text-gray-900 mb-3">③ 기술 스택</h3>
            <div className="flex gap-2 flex-wrap">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-800 text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-extrabold text-gray-900 mb-3">④ 결과 및 성과</h3>
            <p className="text-gray-700 leading-relaxed">{project.result}</p>
            {project.metrics && (
              <div className="mt-3 text-blue-700 font-semibold">📊 {project.metrics}</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold
                           bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200/60 hover:shadow-lg transition"
              >
                <ExternalLink size={18} />
                GitHub 보기
              </a>
            ) : (
              <div className="px-5 py-3 rounded-xl bg-gray-100 text-gray-600 border border-gray-200">
                공개 링크 없음
              </div>
            )}

            <button
              onClick={() => setSelectedProject(null)}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold transition"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // About/Resume
  const AboutSection = () => (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">About & Resume</h1>
        <p className="text-gray-600">간단한 요약 + 다운로드 CTA로 정돈했어요.</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-8 md:p-10 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-b border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-gray-600">Profile</div>
              <div className="text-2xl font-extrabold text-gray-900 mt-1">최서현</div>
              <div className="text-gray-600 mt-2">VR · AI/CV · Robotics | 팀 리드 경험</div>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold
                               bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-200/60 hover:shadow-lg transition">
              <FileText size={18} />
              이력서 다운로드 (PDF)
            </button>
          </div>
        </div>

        <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-extrabold text-gray-900 mb-2">학력</h2>
              <p className="text-gray-700">○○대학교 컴퓨터공학과 (2020.03 - 2024.02)</p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-extrabold text-gray-900 mb-3">자격 및 어학</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• TOEIC: 850점</li>
                <li>• HSK 5급</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-extrabold text-gray-900 mb-3">교육</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• AI/ML 부트캠프 수료 (2023)</li>
                <li>• ROS2 로봇 제어 과정 (2023)</li>
                <li>• Unity VR 개발 과정 (2022)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-extrabold text-gray-900 mb-3">수상</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• 캡스톤 디자인 대상 (2023)</li>
                <li>• 해커톤 우수상 (2023)</li>
                <li>• 학술제 최우수상 (2022)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact
  const ContactSection = () => (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Contact</h1>
        <p className="text-gray-600">협업/인턴/프로젝트 제안 언제든 환영해요.</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-8 md:p-10 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-b border-gray-100">
          <p className="text-gray-700 text-lg">
            새로운 프로젝트나 협업 기회가 있다면 편하게 연락 주세요!
          </p>
        </div>

        <div className="p-6 md:p-10 space-y-4">
          <ContactRow
            icon={<Mail className="text-blue-700" size={22} />}
            title="Email"
            value="your.email@example.com"
            href="mailto:your.email@example.com"
          />
          <ContactRow
            icon={<Github className="text-blue-700" size={22} />}
            title="GitHub"
            value="github.com/yourusername"
            href="https://github.com/yourusername"
          />
          <ContactRow
            icon={<Linkedin className="text-blue-700" size={22} />}
            title="LinkedIn"
            value="linkedin.com/in/yourusername"
            href="https://linkedin.com/in/yourusername"
          />
        </div>
      </div>
    </div>
  );

  const ContactRow = ({
    icon,
    title,
    value,
    href,
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    href: string;
  }) => (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 bg-white
                 hover:bg-gray-50 hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-extrabold text-gray-900">{title}</div>
          <div className="text-gray-600">{value}</div>
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition" />
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40">
        <div className="bg-white/70 backdrop-blur border-b border-gray-200">
          <Container>
            <nav className="py-4 flex items-center justify-between">
              <button
                onClick={() => setActiveTab("home")}
                className="flex items-center gap-2 font-extrabold tracking-tight text-gray-900"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
                  S
                </span>
                <span className="text-lg">SH.CHOI</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                {(["home", "projects", "about", "contact"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={[
                        "capitalize px-4 py-2 rounded-xl text-sm font-semibold transition",
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-200/60"
                          : "text-gray-700 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </nav>
          </Container>
        </div>
      </header>

      {/* Main */}
      <main className="py-12">
        <Container>
          {activeTab === "home" && <HomeSection />}
          {activeTab === "projects" && <ProjectsSection />}
          {activeTab === "about" && <AboutSection />}
          {activeTab === "contact" && <ContactSection />}
        </Container>
      </main>

      {/* Footer */}
      <footer className="mt-16">
        <div className="bg-gray-900 text-white">
          <Container>
            <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-white/70">© 2026 최서현. All rights reserved.</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </Container>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && <ProjectDetailModal project={selectedProject} />}
    </div>
  );
};

export default App;
