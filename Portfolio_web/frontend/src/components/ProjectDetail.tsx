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

const SectionBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <h4 style={{
      color: '#8b7e6e', marginBottom: '8px', fontSize: '1rem',
      borderLeft: '3px solid var(--c-accent-gold)', paddingLeft: '10px'
    }}>
      {label}
    </h4>
    {children}
  </div>
);

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
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
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '850px', maxHeight: '90vh',
          backgroundColor: '#fffdf9',
          borderRadius: '2px',
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

          {/* ── 헤더: 카테고리 / 제목 / 기술 태그 ── */}
          <header style={{ borderBottom: '2px solid #f0e6d2', paddingBottom: '20px' }}>
            <span style={{ color: 'var(--c-accent-gold)', fontWeight: 800, fontSize: '0.9rem' }}>
              {project.categories.join(' / ')}
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '10px 0', color: '#444', fontFamily: 'var(--font-serif)' }}>
              {project.title}
            </h2>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '14px' }}>{project.subtitle}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  backgroundColor: '#fdf8ec', padding: '4px 10px',
                  borderRadius: '15px', fontSize: '0.8rem', color: '#8b7e6e', border: '1px solid #eee'
                }}>#{t}</span>
              ))}
            </div>
          </header>

          {/* ── 이미지 + Role / Result ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <img
                src={`${SERVER_URL}${project.thumbnail}`}
                alt={project.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', fontFamily: 'var(--font-serif)', color: '#555', lineHeight: 1.6 }}>
              <SectionBlock label="My Role">
                <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#333', letterSpacing: '-0.02em' }}>
                  {project.role}
                </p>
              </SectionBlock>

              <SectionBlock label="Key Result">
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>
                  {project.result.split('-').filter(item => item.trim() !== '').map((item, index) => (
                    <p key={index} style={{ margin: '6px 0' }}>• {item.trim()}</p>
                  ))}
                </div>
                {project.metrics && (
                  <div style={{
                    fontSize: '0.85rem', color: 'var(--c-accent-gold)', marginTop: '12px',
                    padding: '10px', backgroundColor: '#fdf8ec', borderRadius: '5px'
                  }}>
                    <span style={{ display: 'block', marginBottom: '4px', fontWeight: 700 }}>📈 Metrics:</span>
                    {project.metrics.split('-').filter(item => item.trim() !== '').map((item, index) => (
                      <p key={index} style={{ marginLeft: '10px', margin: '2px 0' }}>• {item.trim()}</p>
                    ))}
                  </div>
                )}
              </SectionBlock>
            </div>
          </div>

          {/* ── 추가 섹션: 문제 정의 / 미션 / 진행 방식 ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '20px',
            borderTop: '2px solid #f0e6d2', paddingTop: '24px',
            fontFamily: 'var(--font-serif)', lineHeight: 1.75, color: '#555'
          }}>
            <SectionBlock label="문제 정의">
              <p style={{ fontSize: '0.92rem', color: '#444' }}>{project.SpecProblem}</p>
            </SectionBlock>

            <SectionBlock label="Mission">
              <p style={{ fontSize: '0.92rem', color: '#444' }}>{project.mission}</p>
            </SectionBlock>

            <SectionBlock label="진행 방식">
              <p style={{ fontSize: '0.92rem', color: '#444' }}>{project.procedure}</p>
            </SectionBlock>
          </div>

          {/* ── GitHub 링크 ── */}
          {project.link && (
            <div style={{ borderTop: '2px solid #f0e6d2', paddingTop: '20px' }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '20px',
                  backgroundColor: '#fdf8ec', border: '1px solid #e0d7c6',
                  color: '#8b7e6e', fontWeight: 700, fontSize: '0.9rem',
                  textDecoration: 'none', transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f5ede0')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fdf8ec')}
              >
                🔗 GitHub / 자료 보기
              </a>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;

