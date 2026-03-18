import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// 1. 서버에서 받아올 데이터의 타입 정의
interface AboutQA {
  question: string;
  answer: string;
}

// 개별 봉투 컴포넌트
const Envelope = ({ item, index }: { item: AboutQA; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- 편지 봉투 디자인 --- */}
      <motion.div
        whileHover={{ y: -10, scale: 1.05 }}
        style={{
          width: '180px', height: '120px',
          backgroundColor: '#f9f3e8',
          borderRadius: '8px',
          border: '2px solid #e0d7c6',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '0', height: '0',
          borderLeft: '90px solid transparent', borderRight: '90px solid transparent',
          borderTop: '50px solid #ece2d0', zIndex: 2
        }} />
        
        <span style={{ 
          zIndex: 3, fontSize: '0.9rem', fontWeight: 700, color: '#8b7e6e', marginTop: '20px' 
        }}>
          Message {index + 1}
        </span>
      </motion.div>

      {/* --- 호버 시 나타나는 Q&A 말풍선 --- */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: '140px', width: '440px',
              padding: '16px 20px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.9)',
              maxHeight: '280px',
              overflowY: 'auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              zIndex: 100, pointerEvents: 'auto', color: '#5b4b5b', textAlign: 'left'
            }}
          >
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ff8a8a', marginBottom: '8px' }}>
              Q. {item.question}
            </div>
            <div style={{ fontSize: '0.92rem', lineHeight: 1.5, fontWeight: 600, whiteSpace: 'pre-wrap', color: '#6e5f6e' }}>
              A. {item.answer}
            </div>
            {/* 말풍선 꼬리 */}
            <div style={{
              position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
              width: '0', height: '0',
              borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
              borderTop: '10px solid rgba(255,255,255,0.95)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResumeSection = () => {
  const [qaData, setQaData] = useState<AboutQA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 환경 변수 기반 API 호출
    axios.get(`${import.meta.env.VITE_API_BASE}/api/about`)
      .then(res => {
        console.log("전체 응답 데이터:", res.data);
        // 데이터가 배열인지 확인 후 상태 업데이트
        const dataToSet = Array.isArray(res.data) ? res.data : [];
        setQaData(dataToSet);
        setLoading(false);
      })
      .catch(err => {
        console.error("Q&A 데이터 로딩 실패:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: '#5b4b5b' }}>Loading...</div>;

  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 20px', background: 'transparent'
    }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          fontFamily: 'var(--font-display)', fontSize: '3rem', 
          marginBottom: '100px', color: '#5b4b5b' 
        }}
      >
        Self Introduction
      </motion.h2>

      {/* 그리드 영역: 데이터가 있을 때만 map 실행 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '80px 40px',
        maxWidth: '900px'
      }}>
        {qaData.length > 0 ? (
          qaData.map((item, index) => (
            <Envelope key={index} item={item} index={index} />
          ))
        ) : (
          <div style={{ gridColumn: 'span 3', textAlign: 'center', color: '#888' }}>
            표시할 데이터가 없습니다. (데이터 개수: {qaData.length})
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;