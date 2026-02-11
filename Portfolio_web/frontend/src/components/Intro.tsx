import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [showTear, setShowTear] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTear(true);
      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 7000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-container">
      <motion.div
        className="intro-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="intro-grid">
          <motion.div
            className="intro-image-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
          >
            <div className="image-border">
              <img src="/images/seohyun.png" alt="최서현" className="intro-image" />
            </div>
          </motion.div>

          <div className="intro-text">
            <motion.h1
              className="intro-title"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              누구보다 빠르게,
              <br />
              남들과는 다르게
            </motion.h1>

            <motion.p
              className="intro-subtitle"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              코드를 읽고 사용자도 읽는 개발자
            </motion.p>

            <motion.div
              className="intro-description"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <p>
                Figma를 통한 기획부터 앱 개발, 웹 퍼블리싱까지 E2E 시스템을 개발한 최서현입니다.
              </p>
              <p>
                호기심이 많아 Unity를 사용해 VR 프로그램을 만들어보기도 하고, AI가 유행하며 객체인식
                모델을 직접 만들고 적용하며 개발에 대한 경험을 쌓았습니다.
              </p>
            </motion.div>

            <motion.div
              className="intro-decorative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <div className="decorative-line"></div>
              <div className="decorative-box"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {showTear && (
        <motion.div
          className="paper-tear"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <div className="tear-texture"></div>
        </motion.div>
      )}
    </div>
  );
};

export default Intro;
