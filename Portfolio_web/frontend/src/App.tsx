// src/App.tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FlowerNav from './components/FlowerNav';
import MailboxProjects from './components/MailboxProjects';
import About from './components/About'; // 기존 컴포넌트 유지 (스타일 수정 필요)
import Contact from './components/Contact'; // 기존 컴포넌트 유지 (스타일 수정 필요)
import ResumeSection from './components/ResumeSection';
import './App.css'; // 기존 App.css는 내용 비우거나 삭제해도 됨 (index.css로 대체)

function App() {
  // 'home'이 초기 상태. 'home'일 때만 꽃이 보임.
  const [activeTab, setActiveTab] = useState('home');

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBackToHome = () => {
    setActiveTab('home');
  }

  return (
    <div className="app">
      {/* 1. 중앙 꽃 내비게이션 (홈 화면일 때만 표시) */}
      <AnimatePresence>
        {activeTab === 'home' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }} transition={{duration: 0.8}}
          >
            <FlowerNav onNavigate={handleNavigate} />
             {/* 홈 화면 중앙 타이틀 */}
            <motion.div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 5 }}>
                <h1 style={{ fontFamily: 'var(--font-script)', fontSize: '3rem', color: 'var(--c-accent-gold)', marginBottom: '1rem' }}>Seohyun's Portfolio</h1>
                <p style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.2em' }}>Welcome to my garden</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. 선택된 콘텐츠 페이지 표시 */}
      <AnimatePresence mode="wait">
        {activeTab !== 'home' && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '5rem' }} // 하단 여백
          >
            {/* 뒤로가기 (홈으로) 버튼 */}
            <button onClick={handleBackToHome} style={{
                position: 'fixed', top: '2rem', left: '2rem', padding: '0.8rem 1.5rem',
                background: 'rgba(255,255,255,0.5)', border: '1px solid var(--c-ivory)', borderRadius: '30px',
                cursor: 'pointer', fontFamily: 'var(--font-serif)', zIndex: 1000, backdropFilter: 'blur(5px)'
            }}>
                ← Garden Home
            </button>

            {/* 각 탭 콘텐츠 */}
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