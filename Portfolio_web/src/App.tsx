import { useState } from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink, ChevronRight } from 'lucide-react';

// 타입 정의
type ProjectCategory = 'AI/CV' | 'VR' | 'Mobile' | 'Robotics' | 'Team Lead';

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
}

const App = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'about' | 'contact'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | 'All'>('All');

  // 핵심 역량
  const skills: Skill[] = [
    {
      title: 'Flutter/Firebase',
      description: '크로스플랫폼 모바일 앱 개발 및 실시간 백엔드 구축',
      icon: '📱'
    },
    {
      title: 'Computer Vision',
      description: 'YOLOv5 커스텀 모델 학습 및 최적화, Jetson 배포',
      icon: '👁️'
    },
    {
      title: 'ROS2/제어',
      description: '로봇 제어 시스템 설계 및 구현',
      icon: '🤖'
    },
    {
      title: 'VR Development',
      description: 'Unity 기반 VR 애플리케이션 및 Hand Tracking',
      icon: '🥽'
    }
  ];

  // 프로젝트 데이터
  const projects: Project[] = [
    {
      id: '1',
      title: 'YOLOv5 기반 실시간 객체 감지 시스템',
      thumbnail: '🎯',
      categories: ['AI/CV', 'Robotics'],
      problem: '제조 현장에서 불량품을 실시간으로 감지하고 분류하는 자동화 시스템 필요',
      role: 'AI 모델 개발 및 최적화 담당 (개인 프로젝트)',
      tech: ['YOLOv5', 'PyTorch', 'Jetson Nano', 'OpenCV', 'TensorRT'],
      result: '커스텀 데이터셋 2,000장 구축, mAP 0.89 달성, Jetson Nano에서 30fps 실시간 추론',
      metrics: 'mAP 15% 개선, 추론 속도 2배 향상',
      link: 'https://github.com/vkie39/TRANSFORMER-LSTM-CNN-correctionPID.git',
      featured: true
    },
    {
      id: '2',
      title: 'VR 크레인 원격조종 교육 시뮬레이터',
      thumbnail: '🏗️',
      categories: ['VR', 'Team Lead'],
      problem: '고위험 크레인 작업의 안전한 교육 환경 구축',
      role: 'VR 개발 리드, Hand Tracking 구현 (팀 3명)',
      tech: ['Unity', 'Oculus SDK', 'Hand Tracking', 'C#', 'Physics Engine'],
      result: '실제 크레인 조작을 VR로 시뮬레이션, 교육 시간 40% 단축',
      metrics: '캡스톤 디자인 대상 수상',
      link: 'https://github.com/vkie39/ict_harbor.git',
      featured: true
    },
    {
      id: '3',
      title: '사진동네 - 위치 기반 사진 공유 앱',
      thumbnail: '📸',
      categories: ['Mobile', 'Team Lead'],
      problem: '특정 장소의 추억을 공유하고 발견할 수 있는 플랫폼 부재',
      role: '풀스택 개발 및 팀 리드 (팀 4명)',
      tech: ['Flutter', 'Firebase', 'Google Maps API', 'FCM', 'Cloud Functions'],
      result: 'MAU 500+, 평균 세션 12분, 일 업로드 200건',
      metrics: '사용자 리텐션 65%',
      link: 'https://github.com/vkie39/Analog_PhotoApp.git',
      featured: true
    },
    {
      id: '4',
      title: 'ROS2 기반 자율주행 로봇',
      thumbnail: '🚗',
      categories: ['Robotics', 'AI/CV'],
      problem: '실내 환경에서 자율 주행 및 장애물 회피',
      role: 'ROS2 노드 개발 및 센서 융합',
      tech: ['ROS2', 'LiDAR', 'SLAM', 'Python', 'Navigation2'],
      result: '실내 맵핑 정확도 95%, 장애물 회피 성공률 92%',
      featured: false
    },
    {
      id: '5',
      title: 'AI 기반 자세 교정 앱',
      thumbnail: '🧘',
      categories: ['AI/CV', 'Mobile'],
      problem: '잘못된 운동 자세로 인한 부상 방지',
      role: 'Pose Estimation 모델 통합 및 앱 개발',
      tech: ['MediaPipe', 'Flutter', 'TensorFlow Lite', 'Firebase'],
      result: '실시간 자세 분석 및 피드백, 정확도 88%',
      featured: false
    }
  ];

  const filteredProjects = filterCategory === 'All' 
    ? projects 
    : projects.filter(p => p.categories.includes(filterCategory));

  const featuredProjects = projects.filter(p => p.featured);

  // 홈 화면
  const HomeSection = () => (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold text-gray-900">최서현</h1>
        <p className="text-2xl text-gray-600">VR/AI/Robotics 프로젝트를 설계·구현하는 개발자</p>
        <div className="flex gap-4 justify-center mt-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            프로젝트 보기
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            연락하기
          </button>
        </div>
      </div>

      {/* 핵심 역량 */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">핵심 역량</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 대표 프로젝트 */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">대표 프로젝트</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
                {project.thumbnail}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.problem}</p>
                <div className="text-blue-600 font-semibold">{project.metrics}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 프로젝트 목록
  const ProjectsSection = () => {
    const categories: (ProjectCategory | 'All')[] = ['All', 'AI/CV', 'VR', 'Mobile', 'Robotics', 'Team Lead'];

    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">프로젝트</h1>
        
        {/* 필터 */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 프로젝트 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl">
                {project.thumbnail}
              </div>
              <div className="p-6 space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {project.categories.map((cat) => (
                    <span key={cat} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>문제:</strong> {project.problem}</p>
                  <p><strong>역할:</strong> {project.role}</p>
                  <p><strong>결과:</strong> {project.result}</p>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  자세히 보기 <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 프로젝트 상세
  const ProjectDetailModal = ({ project }: { project: Project }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">{project.title}</h2>
            <button 
              onClick={() => setSelectedProject(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-8xl">
            {project.thumbnail}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">① 배경 및 문제</h3>
              <p className="text-gray-700">{project.problem}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">② 역할 및 기여도</h3>
              <p className="text-gray-700">{project.role}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">③ 기술 스택</h3>
              <div className="flex gap-2 flex-wrap">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">④ 결과 및 성과</h3>
              <p className="text-gray-700">{project.result}</p>
              {project.metrics && (
                <p className="mt-2 text-blue-600 font-semibold">📊 {project.metrics}</p>
              )}
            </div>

            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <ExternalLink size={16} />
                GitHub 보기
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // About/Resume
  const AboutSection = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">About & Resume</h1>
      
      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">학력</h2>
          <p className="text-gray-700">○○대학교 컴퓨터공학과 (2020.03 - 2024.02)</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">교육</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• AI/ML 부트캠프 수료 (2023)</li>
            <li>• ROS2 로봇 제어 과정 (2023)</li>
            <li>• Unity VR 개발 과정 (2022)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">자격 및 어학</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• TOEIC: 850점</li>
            <li>• HSK 5급</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">수상</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 캡스톤 디자인 대상 (2023)</li>
            <li>• 해커톤 우수상 (2023)</li>
            <li>• 학술제 최우수상 (2022)</li>
          </ul>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FileText size={20} />
          이력서 다운로드 (PDF)
        </button>
      </div>
    </div>
  );

  // Contact
  const ContactSection = () => (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Contact</h1>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <p className="text-gray-700 mb-8 text-lg">
          새로운 프로젝트나 협업 기회에 대해 언제든지 연락 주세요!
        </p>
        
        <div className="space-y-4">
          <a 
            href="mailto:your.email@example.com"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Mail className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-gray-600">your.email@example.com</div>
            </div>
          </a>

          <a 
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Github className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold">GitHub</div>
              <div className="text-gray-600">github.com/yourusername</div>
            </div>
          </a>

          <a 
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Linkedin className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold">LinkedIn</div>
              <div className="text-gray-600">linkedin.com/in/yourusername</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setActiveTab('home')}
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              SH.CHOI
            </button>
            <div className="flex gap-6">
              {(['home', 'projects', 'about', 'contact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'projects' && <ProjectsSection />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 최서현. All rights reserved.</p>
        </div>
      </footer>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && <ProjectDetailModal project={selectedProject} />}
    </div>
  );
};

export default App;