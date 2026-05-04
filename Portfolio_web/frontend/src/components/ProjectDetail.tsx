import React from 'react';
import { motion } from 'framer-motion';

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

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const SERVER_URL = import.meta.env.VITE_API_BASE;

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.15)', // 연한 배경 오버레이
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()} // 클릭 시 닫힘 방지
        style={{
          width: '100%', maxWidth: '850px', maxHeight: '90vh',
          backgroundColor: '#fffdf9', // 편지지 색상
          borderRadius: '2px', // 각진 종이 느낌
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          overflowY: 'auto',
          position: 'relative',
          padding: '40px',
          border: '1px solid #e8dfc9'
        }}
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'none', border: 'none', fontSize: '1.5rem',
            cursor: 'pointer', color: '#b2a48a'
          }}
        >✕</button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* 상단: 카테고리 및 제목 */}
          <header style={{ borderBottom: '2px solid #f0e6d2', paddingBottom: '20px' }}>
            <span style={{ color: 'var(--c-accent-gold)', fontWeight: 800, fontSize: '0.9rem' }}>
              {project.categories.join(' / ')}
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '10px 0', color: '#444', fontFamily: 'var(--font-serif)' }}>
              {project.title}
            </h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {project.tech.map(t => (
                <span key={t} style={{ backgroundColor: '#fdf8ec', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem', color: '#8b7e6e', border: '1px solid #eee' }}>
                  #{t}
                </span>
              ))}
            </div>
          </header>

          {/* 중간: 이미지 및 프로젝트 설명 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
            {/* 이미지 영역 */}
            <div style={{ width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <img 
                src={`${SERVER_URL}${project.thumbnail}`}
                alt={project.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>

            {/* 상세 텍스트 영역 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'var(--font-serif)', color: '#555', lineHeight: 1.6 }}>
              <div>
                <h4 style={{ color: '#8b7e6e', marginBottom: '5px', fontSize: '1rem' }}>Problem & Need</h4>
                <p style={{ fontSize: '0.95rem' }}>{project.problem}</p>
              </div>
              <div>
                <h4 style={{ color: '#8b7e6e', marginBottom: '5px', fontSize: '1rem' }}>My Role</h4>
                <p style={{ fontSize: '0.95rem' }}>{project.role}</p>
              </div>
              <div>
                <h4 style={{ color: '#8b7e6e', marginBottom: '5px', fontSize: '1rem' }}>Key Result</h4>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: '#444' }}>{project.result}</p>
                {project.metrics && <p style={{ fontSize: '0.85rem', color: 'var(--c-accent-gold)', marginTop: '5px' }}>📈 {project.metrics}</p>}
              </div>
            </div>
          </div>

          {/* 하단 푸터 영역: 4종 세트 (Subtitle, SpecProblem, Mission, Procedure) */}
          <footer style={{ 
            marginTop: '10px', 
            padding: '30px', 
            backgroundColor: '#faf7f0', 
            borderRadius: '10px',
            border: '1px solid #f0e6d2',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ borderBottom: '1px solid #e8dfc9', paddingBottom: '15px' }}>
              <h4 style={{ color: '#8b7e6e', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Summary</h4>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#444', fontWeight: 500 }}>"{project.subtitle}"</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div>
                <h5 style={{ color: '#3b4880', marginBottom: '5px', fontSize: '0.95rem' }}>Specific Problem</h5>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>{project.SpecProblem}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h5 style={{ color: '#3b4880', marginBottom: '5px', fontSize: '0.95rem' }}>Mission</h5>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>{project.mission}</p>
                </div>
                <div>
                  <h5 style={{ color: '#3b4880', marginBottom: '5px', fontSize: '0.95rem' }}>Procedure</h5>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>{project.procedure}</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
