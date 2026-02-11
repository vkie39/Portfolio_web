import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('Projects');

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const element = document.getElementById(tab.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <AnimatePresence>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {!showIntro && (
        <>
          <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
          
          <main className="main-content">
            <div id="projects">
              <Projects />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
