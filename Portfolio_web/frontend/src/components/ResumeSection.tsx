import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface AboutQA {
  question: string;
  answer: string;
}

const Envelope = ({ item, index }: { item: AboutQA; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const labels = [
    '나는 누구?',
    '기술적 강점',
    '협업 스타일',
    '강점과 약점',
    '기억에 남는 경험',
    '계획 및 포부',
  ];

  return (
    <div
      style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 봉투 */}
      <motion.div
        whileHover={{ y: -10, scale: 1.05 }}
        style={{
          width: '180px',
          height: '120px',
          backgroundColor: '#f9f3e8',
          borderRadius: '8px',
          border: '2px solid #e0d7c6',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 봉투 뚜껑 삼각형 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '0',
            height: '0',
            borderLeft: '90px solid transparent',
            borderRight: '90px solid transparent',
            borderTop: '50px solid #ece2d0',
            zIndex: 2,
          }}
        />
        <span
          style={{
            zIndex: 3,
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#8b7e6e',
            marginTop: '20px',
            textAlign: 'center',
            padding: '0 10px',
          }}
        >
          {labels[index] ?? `Message ${index + 1}`}
        </span>
      </motion.div>

      {/* Q&A 말풍선 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '140px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '480px',
              padding: '20px 24px',
              borderRadius: '16px',
              /* ✅ 핵심: 불투명 단색 배경으로 가독성 확보 */
              background: '#ffffff',
              border: '1.5px solid #e8ddd8',
              boxShadow: '0 8px 32px rgba(91, 75, 91, 0.15)',
              maxHeight: '300px',
              overflowY: 'auto',
              zIndex: 100,
              pointerEvents: 'auto',
              textAlign: 'left',
            }}
          >
            {/* 질문 */}
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                /* ✅ 더 진한 핑크로 대비 강화 */
                color: '#e05a7a',
                marginBottom: '10px',
                lineHeight: 1.5,
              }}
            >
              Q. {item.question}
            </div>

            {/* 구분선 */}
            <div
              style={{
                borderTop: '1px solid #f0e8e4',
                marginBottom: '10px',
              }}
            />

            {/* 답변 */}
            <div
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.75,
                fontWeight: 500,
                /* ✅ 진한 텍스트 색상으로 가독성 대폭 향상 */
                color: '#3d3040',
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all',
              }}
            >
              {item.answer}
            </div>

            {/* 말풍선 꼬리 */}
            <div
              style={{
                position: 'absolute',
                bottom: '-11px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '11px solid #ffffff',
                filter: 'drop-shadow(0 2px 2px rgba(91,75,91,0.08))',
              }}
            />
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
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/about`)
      .then((res) => {
        console.log('전체 응답 데이터:', res.data);
        const dataToSet = Array.isArray(res.data) ? res.data : [];
        setQaData(dataToSet);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Q&A 데이터 로딩 실패:', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#5b4b5b' }}>
        Loading...
      </div>
    );

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '60px 50px 20px',
        background: 'transparent',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          marginBottom: '150px',
          color: '#5b4b5b',
        }}
      >
        Self Introduction
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '80px 40px',
          maxWidth: '900px',
        }}
      >
        {qaData.length > 0 ? (
          qaData.map((item, index) => (
            <Envelope key={index} item={item} index={index} />
          ))
        ) : (
          <div
            style={{ gridColumn: 'span 3', textAlign: 'center', color: '#888' }}
          >
            표시할 데이터가 없습니다. (데이터 개수: {qaData.length})
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;