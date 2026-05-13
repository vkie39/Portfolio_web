import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'jwsh171210@naver.com',
      link: 'mailto:jwsh171210@naver.com',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '010-7611-1384',
      link: 'tel:010-7611-1384',
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'github.com/vkie39',
      link: 'https://github.com/vkie39',
    }
  ];

  return (
    <section className="contact-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-number">04.</span>
            Contact
          </h2>
          <p className="section-description">
            함께 성장하고 싶습니다. 연락 주세요!
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.link}
              target={info.label === 'GitHub' ? '_blank' : undefined}
              rel={info.label === 'GitHub' ? 'noopener noreferrer' : undefined}
              className="contact-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }} // 호버 시 정자세로 커짐
            >
              <div className="contact-icon">{info.icon}</div>
              <h3 className="contact-label">{info.label}</h3>
              <p className="contact-value">{info.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="cta-content">
            <h3 className="cta-title">Let's Build Something Amazing!</h3>
            <p className="cta-text">
              새로운 프로젝트나 협업 기회가 있다면 언제든 연락 주세요!
              <br />
              최선을 다해 서비스를 개발하겠습니다!
            </p>
            
            <div className="cta-badges">
              <div className="badge">Kotlin</div>
              <div className="badge">native</div>
              <div className="badge">React</div>
              <div className="badge">VR/AR</div>
              <div className="badge">AI</div>
            </div>
          </div>

          <div className="cta-decorative">
            <div className="decorative-shape shape-1"></div>
            <div className="decorative-shape shape-2"></div>
            <div className="decorative-shape shape-3"></div>
          </div>
        </motion.div>

        <motion.footer
          className="site-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p>© 2026 Choi Seohyun. Built with ❤️ using React + TypeScript + Express</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;