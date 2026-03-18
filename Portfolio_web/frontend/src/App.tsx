import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MailboxProjects from './components/MailboxProjects';
import About from './components/About';
import Contact from './components/Contact';
import ResumeSection from './components/ResumeSection';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="app">
      {/* 1. 상단 메뉴바 (고정형 Header) */}
      <nav className="top-nav">
        <div className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. 메인 콘텐츠 영역 */}
      <AnimatePresence mode="wait">
        {activeTab === 'home' ? (
          <motion.div 
            key="home" 
            className="home-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 왼쪽 하단 메인 이미지 */}
            <div className="main-image-wrapper">
              <img src="/images/main.png" alt="Main" className="main-image" />
            </div>

            {/* 중앙 좌측 애니메이션 이미지 (바닥에서 스르륵) */}
            <motion.div 
              className="main-write-container"
              initial={{ opacity: 1, y: 600 }}   /* 처음부터 선명하게, 아래에서 시작 */
              animate={{ opacity: 1, y: 0 }}     /* 제자리로 이동 */
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img src="/images/main_write_shorter.png" alt="Main Write" className="write-image" />
            </motion.div>
          </motion.div>
        ) : (
          /* 홈이 아닌 모든 탭 (About, Projects, Contact, Resume) */
          <motion.div
            key={activeTab}
            className="content-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <main className="main-content">
              {activeTab === 'projects' && <MailboxProjects />}
              {activeTab === 'about' && <About />}
              {activeTab === 'contact' && <Contact />}
              {activeTab === 'resume' && <ResumeSection />}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;