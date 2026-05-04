import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProjectDetail from './ProjectDetail'; 

interface Project {
  id: string;
  title: string;
  subtitle: string;
  SpecProblem: string;
  mission: string;
  procedure: string;
  thumbnail: string;
  categories: any[]; 
  tech: string[];
  problem: string; 
  role: string;    
  result: string;  
  metrics?: string;
  link?: string;
}

const MailboxProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_BASE}/api/projects`)
    .then(res => {
      const realData = Array.isArray(res.data) ? res.data : (res.data.projects || res.data.data || []);
      setProjects(realData);
      setLoading(false);
    })
    .catch(err => {
      console.error("데이터 로드 에러:", err);
      setProjects([]); 
      setLoading(false);
    });
}, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--c-accent-gold)' }}>Opening Mailbox...</div>;

  return (
    <section style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 20px', position: 'relative', overflow: 'hidden'
    }}>
      {/* 배경 타이틀 */}
      <motion.h2 
        animate={{ y: isOpened ? -280 : -150 }} 
        style={{ 
          fontFamily: 'var(--font-script)', fontSize: '3.5rem', 
          color: 'var(--c-accent-gold)', position: 'absolute', zIndex: 1
        }}
      >
        Project Letters
      </motion.h2>

      {/* 1. 편지 그리드 영역 */}
      <div style={{ 
        position: 'absolute', top: '45%', transform: 'translateY(-50%)',
        width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'center', zIndex: 5 
      }}>
        <AnimatePresence>
          {isOpened && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', width: '100%' }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '20px', borderRadius: '15px', border: '1px solid #f0e6d2',
                    cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                    display: 'flex', flexDirection: 'column', height: '190px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--c-accent-gold)', fontWeight: 800, marginBottom: '8px' }}>
                    {project.categories.join(' · ')}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 10px 0', color: '#444' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#777', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {project.subtitle}
                  </p>
                  <div style={{ marginTop: 'auto', textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-accent-gold)' }}>
                    Read Letter →
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. 편지함 (클릭 시 상태 고정) */}
      <motion.div
        onMouseEnter={() => setIsOpened(true)} 
        onClick={() => setIsOpened(!isOpened)} 
        initial={{ y: 0 }}
        animate={{ 
          y: isOpened ? 300 : 0, 
          scale: isOpened ? 0.65 : 1,
        }}
        transition={{ type: 'spring', stiffness: 45, damping: 15 }} 
        style={{
          width: '300px', height: '200px',
          position: 'relative', cursor: 'pointer', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div
          animate={{ rotateX: isOpened ? -140 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'absolute', top: 0, width: '100%', height: '60px',
            backgroundColor: '#fff', border: '2px solid #e8dfc9',
            borderRadius: '15px 15px 0 0', transformOrigin: 'top', zIndex: 12
          }}
        >
          {!isOpened && (
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ 
                fontSize: '0.85rem', color: '#b2a48a', height: '100%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 
              }}
            >
              Click to Open
            </motion.span>
          )}
        </motion.div>

        <div style={{
          position: 'absolute', bottom: 0, width: '100%', height: '150px',
          background: 'linear-gradient(145deg, #ffffff, #fcfaf5)',
          border: '2px solid #e8dfc9', borderRadius: '0 0 15px 15px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)', zIndex: 11
        }} />
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MailboxProjects;
