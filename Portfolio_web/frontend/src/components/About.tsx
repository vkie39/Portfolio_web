import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AboutQA } from '../types';
import './About.css';

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutQA[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/about');
      setAboutData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="about-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <section className="about-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-number">02.</span>
            About Me
          </h2>
          <p className="section-description">
            21살의 어린 나이, 끝없는 도전과 성장의 이야기
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="stat-item">
              <div className="stat-number">7+</div>
              <div className="stat-label">대회 참가</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">논문 투고</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">수상 경력</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.07</div>
              <div className="stat-label">학점 / 4.5</div>
            </div>
          </motion.div>

          <div className="about-qa">
            {aboutData.map((item, index) => (
              <motion.div
                key={index}
                className={`qa-item ${activeIndex === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <button
                  className="qa-question"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className="question-number">Q{index + 1}</span>
                  <span className="question-text">{item.question}</span>
                  <span className="question-icon">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="qa-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="answer-content">
                        <span className="answer-label">A</span>
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="about-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="footer-content">
            <h3>열정 있게 일을 배우겠습니다!</h3>
            <p>
              "코드도 읽고 사용자도 읽는, 아이디어를 MVP로 만드는 개발자"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
