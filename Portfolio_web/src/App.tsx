import React, { useEffect, useMemo, useState } from "react";
import {
  Github,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  X,
  Sparkles,
  Target,
  Zap,
  Layout,
  BarChart3,
} from "lucide-react";

// ✅ 이미지 경로 (기존 유지)
import seohyunPhoto from "../Portfolio-api/image/seohyun.jpg";


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

const App = () => {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "about" | "story" | "contact">("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "All">("All");

  // 모달 스크롤 제어
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  useEffect(() => {
    if (activeTab === "projects") setFilterCategory("All");
  }, [activeTab]);

  const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  fetch("http://localhost:4000/api/projects")
    .then(res => res.json())
    .then(data => setProjects(data));
}, []);

  const filteredProjects = useMemo(() => 
    filterCategory === "All" ? projects : projects.filter(p => p.categories.includes(filterCategory))
  , [filterCategory, projects]);

  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects]);

  // --- UI Components ---

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto w-full px-6 lg:px-12 max-w-7xl">{children}</div>
  );

  const Badge = ({ children, color = "blue" }: { children: React.ReactNode, color?: string }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
      color === "blue" ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-gray-50 text-gray-600 border-gray-200"
    }`}>
      {children}
    </span>
  );

  // 히어로 섹션
  const Hero = () => (
    <section className="relative pt-16 pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-100 shadow-sm transition-transform hover:scale-105">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Service Planner & Technical Strategist</p>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight">
          기술의 가치를 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            논리로 설계합니다.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          데이터로 문제를 정의하고 기술로 해결책을 제안하는 <br className="hidden md:block" />
          <span className="text-slate-900 font-bold underline decoration-blue-200 decoration-4 underline-offset-4">최서현</span>입니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button 
            onClick={() => setActiveTab("projects")}
            className="px-8 py-4 bg-slate-900 text-black rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            프로젝트 분석
          </button>
          <button 
            onClick={() => setActiveTab("contact")}
            className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-gray-50 transition shadow-sm"
          >
            협업 제안하기
          </button>
        </div>
      </div>
    </section>
  );

  // 프로젝트 카드
  const ProjectCard = ({ project }: { project: Project }) => (
    <div 
      onClick={() => setSelectedProject(project)}
      className="group bg-white rounded-[32px] border border-gray-100 p-3 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden rounded-[24px] bg-slate-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-20"
    />
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          {project.categories.map(c => <Badge key={c}>{c}</Badge>)}
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{project.problem}</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="text-[11px] font-black text-blue-600 tracking-tighter uppercase italic">Case Study</span>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );

  // 핵심 역량 (Bento Grid Style)
  const Strengths = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
        <Layout className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target /> Problem Solving
        </h3>
        <p className="text-blue-50 opacity-90 leading-relaxed max-w-md">
          단순 개발을 넘어 사용자의 페인 포인트를 분석하고, 가장 효율적인 기술 스택을 선택하여 서비스의 가치를 창출합니다.
        </p>
        <div className="mt-8 flex gap-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm font-bold">서비스 기획</div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm font-bold">UX 로직 설계</div>
        </div>
      </div>
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
        <BarChart3 className="text-blue-600 w-10 h-10 mb-4" />
        <div>
          <h3 className="text-xl font-bold text-slate-900">Performance</h3>
          <p className="text-slate-500 text-sm mt-2">YOLOv5 mAP 0.89 달성 및 Jetson Nano 환경 최적화 경험.</p>
        </div>
      </div>
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
        <Zap className="text-amber-500 w-10 h-10 mb-4" />
        <div>
          <h3 className="text-xl font-bold text-slate-900">Rapid Prototyping</h3>
          <p className="text-slate-500 text-sm mt-2">Flutter & Firebase 기반 MVP 제작 및 한 해 대회 7회 참여의 압도적 실행력.</p>
        </div>
      </div>
      <div className="md:col-span-2 bg-slate-900 rounded-[32px] p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Technical Leadership</h3>
            <p className="text-slate-400 text-sm">3회 이상의 팀 리드 경험을 통해 개발자와 기획자 사이의 언어를 조율하고 프로젝트 완수를 견인합니다.</p>
          </div>
          <div className="flex gap-2">
             <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-blue-400 border border-slate-700">VR</div>
             <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-slate-700">AI</div>
             <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-purple-400 border border-slate-700">APP</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <Container>
          <nav className="h-20 flex items-center justify-between">
            <button onClick={() => setActiveTab("home")} className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform">S</div>
              <span className="font-black text-xl tracking-tighter">SH.CHOI</span>
            </button>
            <div className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-2xl">
              {(["home", "projects", "about", "story", "contact"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Mobile Nav Select */}
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="md:hidden bg-gray-100 border-none rounded-xl text-xs font-bold px-4 py-2"
            >
              <option value="home">HOME</option>
              <option value="projects">PROJECTS</option>
              <option value="about">ABOUT</option>
              <option value="about">Story</option>
              <option value="contact">CONTACT</option>
            </select>
          </nav>
        </Container>
      </header>

      <main className="py-12">
        <Container>
          {activeTab === "home" && (
            <div className="space-y-24">
              <Hero />
              <section className="space-y-12">
                <div className="text-center">
                  <Badge color="gray">Core Strengths</Badge>
                  <h2 className="text-3xl font-black mt-4">기획자의 도구함</h2>
                </div>
                <Strengths />
              </section>
              <section className="space-y-12 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                  <div>
                    <Badge color="gray">Featured Works</Badge>
                    <h2 className="text-3xl font-black mt-4">대표 케이스 스터디</h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab("projects")}
                    className="group text-blue-600 font-bold flex items-center gap-1"
                  >
                    전체 프로젝트 보기 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {featuredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
              </section>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tighter">PROJECTS</h1>
                <div className="flex flex-wrap gap-2 pt-4">
                  {["All", "AI/CV", "VR", "Mobile", "Robotics", "Team Lead"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat as any)}
                      className={`px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all ${
                        filterCategory === cat 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-white text-slate-500 border-gray-200 hover:border-slate-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Profile Card */}
              <div className="bg-white rounded-[40px] border border-gray-100 p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-10 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-[32px] rotate-6 scale-105 opacity-10" />
                  <img src={seohyunPhoto} alt="Profile" className="relative w-48 h-48 md:w-56 md:h-56 rounded-[32px] object-cover shadow-inner bg-gray-100" />
                </div>
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div>
                    <h1 className="text-4xl font-black tracking-tight">최서현 <span className="text-lg font-medium text-slate-400 ml-2">Choi Seo-hyun</span></h1>
                    <p className="text-blue-600 font-bold mt-2">아이디어의 구현을 넘어 서비스의 논리를 설계하는 기획자</p>
                  </div>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    만 21세의 젊은 감각과 한 해 대회 7회 참여라는 압도적인 열정으로, 기술적 한계를 기획적 솔루션으로 풀어내는 것에 즐거움을 느낍니다. 
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 text-sm">
                      <FileText size={16} /> Resume Download
                    </a>
                  </div>
                </div>
              </div>

              {/* Career/Education Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-4">Education</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <p className="font-bold text-slate-900">동양미래대학교</p>
                      <p className="text-sm text-slate-500">컴퓨터소프트웨어공학과 학사 학위 과정</p>
                      <p className="text-xs text-blue-600 mt-2 font-black">GPA 4.07/4.5 (전공심화)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold border-l-4 border-indigo-600 pl-4">Highlights</h3>
                  <ul className="space-y-3">
                    {[
                      "캡스톤 디자인 대회 대상 (팀장)",
                      "YOLO v5 정확도 향상 논문 제1저자",
                      "스마트 프로젝트 경진대회 장려상 (팀장)",
                      "중국어 말하기 대회 본선 진출",
                      "TOEIC 780 / HSK 4급"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                        <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "story" && (
            <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center space-y-4">
                <Badge color="blue">Self Introduction</Badge>
                <h2 className="text-4xl font-black tracking-tighter">기술과 사용자를 잇는 기획자, <span className="text-blue-600">최서현</span>의 이야기</h2>
              </div>

              {/* 섹션 1: 성장 과정 및 가치관 */}
              <section className="bg-white rounded-[40px] border border-gray-100 p-8 md:p-12 shadow-sm space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-black">성장 과정: 책임감에서 시작된 기획의 본질</h3>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  어린 시절부터 주어진 역할에 대한 깊은 책임감을 바탕으로 성장해 왔습니다. 이러한 태도는 프로젝트의 처음부터 끝까지 집요하게 파고드는 기획자의 자세로 이어졌습니다. 
                  단순히 아이디어를 내는 것에 그치지 않고, "이 아이디어가 어떻게 실현되어 사용자에게 닿을 것인가?"를 끊임없이 질문하며 철저한 계획과 우선순위 설정을 통해 창의적인 아이디어를 논리적인 실체로 만들어냅니다.
                </p>
              </section>

              {/* 섹션 2: 주요 활동 (기술적 역량) */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-[40px] p-8 md:p-10 text-white space-y-6 shadow-xl">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <Target className="text-blue-400" /> 데이터 기반의 문제 해결
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    동양미래대학교에서 Python을 중심으로 데이터 처리 및 시스템 설계 역량을 키웠습니다. 자율주행·로보틱스 프로젝트를 수행하며 센서 데이터를 직접 수집하고 정제하는 과정을 통해, 정량적 지표에 근거한 기획의 중요성을 배웠습니다.
                  </p>
                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Key Experience</p>
                    <ul className="text-sm space-y-2 text-slate-400">
                      <li>• YOLOv5 기반 실시간 객체 인식 최적화</li>
                      <li>• Firebase 데이터 모델링 및 확장성 설계</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-600 rounded-[40px] p-8 md:p-10 text-white space-y-6 shadow-xl shadow-blue-100">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <Zap className="text-amber-300" /> 리더십과 협업의 언어
                  </h3>
                  <p className="text-slate-100 text-sm leading-relaxed">
                    울산항만공사 협업 VR 프로젝트의 팀장으로서 전체 시스템 설계와 기획을 총괄했습니다. 개발자와 기획자 사이의 간극을 줄이기 위해 기술적 한계를 먼저 이해하고, 이를 보완할 수 있는 인터랙션 전략을 수립하여 캡스톤 디자인 대상이라는 결과를 이끌어냈습니다.
                  </p>
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-2">Leadership</p>
                    <ul className="text-sm space-y-2 text-blue-50">
                      <li>• 연간 7회 이상의 공모전 참여 및 리딩</li>
                      <li>• 기획-개발-결과 분석의 Full-Cycle 경험</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 섹션 3: 지원 동기 및 포부 */}
              <section className="bg-slate-50 rounded-[40px] border border-slate-100 p-8 md:p-12 text-center space-y-6">
                <h3 className="text-2xl font-black text-slate-900 italic">"젊은 나이와 열정으로 새로운 가능성을 열다"</h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                  누구보다 빠르게 남들과는 다르게 색다르게 아이디어 위를 걷는 기획자 최서현입니다!
                  만 21세의 젊은 나이와 열정으로 1년에 7개가 넘는 대회 참가, 4장의 논문 투고, 3번의 수상을 경험했습니다. 
                  기획부터 구현까지 모두 참여했던 경험을 발판으로 맡은 일을 열심히 해내겠습니다.
                </p>
                <div className="pt-6">
                  <button 
                    onClick={() => setActiveTab("contact")}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-transform"
                  >
                    함께 성장하기 위해 연락하기
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="max-w-2xl mx-auto py-12 text-center space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl font-black">Let's Connect</h1>
                <p className="text-slate-500 font-medium">새로운 비즈니스 모델이나 기술적 기획이 필요한 곳이라면 어디든 환영합니다.</p>
              </div>
              <div className="grid gap-4">
                {[
                  { icon: <Mail />, label: "Email", value: "jwsh171210@naver.com", href: "mailto:jwsh171210@naver.com" },
                  { icon: <Github />, label: "GitHub", value: "github.com/vkie39", href: "https://github.com/vkie39" },
                  { icon: <Phone />, label: "Phone", value: "010-7611-1384", href: "tel:01076111384" }
                ].map(item => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[28px] hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm font-medium">© 2026 Seohyun Choi. Crafted with Logic.</p>
            <div className="flex gap-4">
              <a href="https://github.com/vkie39" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Github size={20} /></a>
              <a href="mailto:jwsh171210@naver.com" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </Container>
      </footer>

      {/* Project Detail Modal (Case Study Style) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col">
            
            {/* 1. 모달 헤더 (이미지 제거하고 타이틀만 깔끔하게) */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight">{selectedProject.title}</h2>
              <button onClick={() => setSelectedProject(null)} className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition">
                <X size={20} />
              </button>
            </div>
            
            {/* 2. 모달 컨텐츠 영역 */}
            <div className="overflow-y-auto p-8 md:p-12">
              
              {/* 🔥 추가된 대형 이미지 섹션 */}
              <div className="w-full h-80 mb-12 overflow-hidden rounded-[32px] bg-slate-100 shadow-inner">
                <img 
                  src={selectedProject.thumbnail} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">
                  <section>
                    <h4 className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4">01. Problem Definition</h4>
                    <p className="text-xl font-bold text-slate-900 leading-snug">{selectedProject.problem}</p>
                  </section>
                  
                  <section>
                    <h4 className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4">02. Strategy & Role</h4>
                    <p className="text-slate-600 leading-relaxed">{selectedProject.role}</p>
                  </section>

                  <section>
                    <h4 className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4">03. Key Results</h4>
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                      <p className="text-slate-900 font-medium leading-relaxed">{selectedProject.result}</p>
                      {selectedProject.metrics && (
                        <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                          <BarChart3 className="text-blue-600" />
                          <span className="text-lg font-black text-slate-900 uppercase tracking-tighter">{selectedProject.metrics}</span>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
                
                {/* 오른쪽 사이드바 (Tech Stack) */}
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-[32px] p-6 space-y-6">
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tech Stack</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => <Badge key={t} color="gray">{t}</Badge>)}
                      </div>
                    </div>
                    {selectedProject.link && (
                      <a href={selectedProject.link} target="_blank" rel="noreferrer" 
                        className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg">
                        <Github size={18} /> View Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;