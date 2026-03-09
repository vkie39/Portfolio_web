// src/App.tsx
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
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume' },
  ];

  return (
    <div className="app">
      {/* --- 1. 상단 메뉴바 --- */}
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

      <AnimatePresence mode="wait">
        {activeTab === 'home' ? (
          /* --- 2. 홈 화면: 중앙 이미지 (main.png) --- */
          <motion.div
            key="home"
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <div className="main-image-wrapper">
              <img src="/images/main.png" alt="Main" className="main-image" />
              <div className="home-text">
                <h1 className="main-title">Seohyun's Portfolio</h1>
                <p className="main-subtitle">Welcome to my space</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- 3. 콘텐츠 페이지 --- */
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
              {activeTab === 'about' && <div id="about"><About /></div>}
              {activeTab === 'contact' && <div id="contact"><Contact /></div>}
              {activeTab === 'resume' && <ResumeSection />}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;