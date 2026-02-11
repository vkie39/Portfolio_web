import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'Home', rotate: 0 },
  { id: 'projects', label: 'Projects', rotate: 72 },
  { id: 'about', label: 'About', rotate: 144 },
  { id: 'contact', label: 'Contact', rotate: 216 },
  { id: 'resume', label: 'Resume', rotate: 288 },
];

const FlowerNav: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [hoveredPetal, setHoveredPetal] = useState<string | null>(null);
  const [faceHovered, setFaceHovered] = useState(false);
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  // --- 사진 경로 (public/images/seohyun.png 라면 아래처럼) ---
  const faceImageUrl = "/images/seohyun.png";

  // (참고) 지금 viewBox가 0..150 기준이라 path도 150 기준 그대로 둠
  const petalPath = "M50,150 C50,100 0,50 50,0 C100,50 50,100 50,150 Z";

  return (
    <div
      ref={constraintsRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* 1) 꽃잎 그라데이션 정의 */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <radialGradient id="petal3DGradient" cx="50%" cy="80%" r="90%">
            <stop offset="0%" style={{ stopColor: 'rgba(255, 240, 245, 0.7)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 1)' }} />
          </radialGradient>
        </defs>
      </svg>

      {/* 2) 배경 글씨(뒤 요소) 가리기용 소프트 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.35)', // 원하면 0.25~0.6 조절
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 3) 꽃 전체 (드래그 가능) */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.05}
        dragTransition={{ power: 0.2, timeConstant: 250 }}
        style={{
          position: 'relative',
          width: '1px',
          height: '1px',
          pointerEvents: 'auto',
          background: 'none',
          willChange: 'transform',
          zIndex: 2, // 오버레이 위
        }}
      >
        {/* 4) 꽃 중앙 얼굴 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -70%)',
            zIndex: 60,
          }}
        >
          <motion.div
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: '5px solid white',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              backgroundColor: '#fdfbf7',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setFaceHovered(true)}
            onHoverEnd={() => setFaceHovered(false)}
          >
            <img
              src={faceImageUrl}
              alt="Seohyun"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              draggable={false}
            />
          </motion.div>

          {/* 얼굴 hover 시 인삿말/소개 문구 */}
          <AnimatePresence>
            {faceHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10, y: 6 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10, y: 6 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  left: '150px', // 얼굴 오른쪽
                  top: '20px',
                  width: '340px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  pointerEvents: 'none',
                  color: '#5b4b5b',
                }}
              >
                <div
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    marginBottom: '6px',
                    letterSpacing: '-0.02em',
                    fontFamily:
                      '"SUIT Variable","Pretendard Variable","Pretendard","Apple SD Gothic Neo","Noto Sans KR",sans-serif',
                  }}
                >
                  안녕하세요!
                </div>

                <div
                  style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.45,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    fontFamily:
                      '"SUIT Variable","Pretendard Variable","Pretendard","Apple SD Gothic Neo","Noto Sans KR",sans-serif',
                  }}
                >
                  누구보다 빠르게, 남들과는 다르게, 색다르게 코드를 읽고 사용자의 마음도 읽는 개발자 최서현입니다
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5) 꽃잎들 */}
        {navItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              transform: `rotate(${item.rotate}deg)`,
              transformOrigin: 'bottom center',
              bottom: '40px',
              left: '-70px',
              width: '140px',
              height: '240px', // 꽃잎 길이(짧게)
              zIndex: item.rotate > 90 && item.rotate < 270 ? 20 : 50,
              background: 'transparent',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                background: 'transparent',
                willChange: 'transform',
              }}
              onHoverStart={() => setHoveredPetal(item.id)}
              onHoverEnd={() => setHoveredPetal(null)}
              onClick={() => onNavigate(item.id)}
              whileHover={{ scale: 1.05, translateY: -10 }}
            >
              <svg
                width="140"
                height="240" // 컨테이너 height와 맞춤
                viewBox="0 0 100 150"
                style={{
                  overflow: 'visible',
                  background: 'transparent',
                  filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.08))',
                }}
              >
                <path
                  d={petalPath}
                  fill="url(#petal3DGradient)"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="1.5"
                />
              </svg>

              <AnimatePresence>
                {hoveredPetal === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(-${item.rotate}deg)`,
                      color: '#6e5f6e',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-serif)',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      textShadow: '0 0 15px white, 0 0 5px white',
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FlowerNav;
