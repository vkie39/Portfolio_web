import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://portfolio-web-szwm.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 백엔드에서 About 데이터를 가져오는 경우
        // const response = await axios.get(`${API_BASE_URL}/api/about`);
        setLoading(false);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  if (loading) return <div className="about-loading"><div className="loading-spinner"></div></div>;

  return (
    <section className="about-section" style={{ paddingLeft: '25px', paddingRight: '25px', background: 'transparent' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title"><span className="title-number">05.</span> About Me</h2>
          <p className="section-description">"코드도 읽고 사용자도 읽는, 아이디어를 MVP로 만드는 개발자"</p>
        </motion.div>

        <div className="about-content-grid">
          
          {/* [컬럼 1] 가장 왼쪽: 프로필 이미지 */}
          <div className="about-image-col">
            <div className="profile-image-wrapper">
               <img src="/images/seohyun.png" alt="최서현 프로필" />
            </div>
            <div className="profile-simple-info">
              <h3>최서현</h3>
              <p>Seohyun Choi</p>
              <div className="mini-contact">
                <span>📍 인천시 부평구</span><br/>
                <span>📧 vkie39@github.com</span>
              </div>
              <div className="resume-download-wrapper">
                <a  
                  href="/resume.pdf"  
                  download="최서현_이력서.pdf" 
                  className="download-btn"
                >
                  <span className="icon">📄</span> Resume 다운로드
                </a>
              </div>
            </div>
          </div>

          {/* [컬럼 2] 중간: 통계, 경력(이동됨), 자격증, 이수 교육 */}
          <div className="about-left-col">
            <div className="about-stats">
              <div className="stat-item"><div className="stat-number">7+</div><div className="stat-label">대회 참가</div></div>
              <div className="stat-item"><div className="stat-number">4</div><div className="stat-label">논문 투고</div></div>
              <div className="stat-item"><div className="stat-number">3</div><div className="stat-label">수상 경력</div></div>
              <div className="stat-item"><div className="stat-number">4.07</div><div className="stat-label">학점</div></div>
            </div>

            {/* Career 섹션이 중간 컬럼으로 이동되었습니다 */}
            <div className="resume-block">
              <h3 className="sub-section-title">Career</h3>
              <ul className="resume-list">
                <li>
                  <span className="date">약 1년</span>
                  <strong>OXFORD 어학원</strong>
                  <p>초/중등 영어 강사 (수업진행 및 학생관리)</p>
                </li>
                <li>
                  <span className="date">2달</span>
                  <strong>AiMobility</strong>
                  <p>앱 개발자(앱 디버깅)</p>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="sub-section-title">Licenses</h3>
              <ul className="resume-list">
                <li><strong>TOEIC 780점</strong></li>
                <li><strong>HSK 4급</strong> </li>
                <li><strong>운전면허 2종 보통</strong></li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="sub-section-title">Training</h3>
              <ul className="resume-list mini">
                <li><strong>AI+X 아카데미 AI 프로젝트 과정</strong> (숭실대)</li>
                <li><strong>미래신산업 수요특화형 AI 교육</strong> (영남이공대)</li>
                <li><strong>기업 데이터 보호 역량 강화 과정</strong> (스나이퍼팩토리)</li>
                <li><strong>오픈소스 SW와 버전관리 시스템 Git</strong> (동양미래대)</li>
                <li><strong>기업 역량 향상 강화 프로그램</strong> (동양미래대)</li>
                <li><strong>Codyssey</strong> (이노베이션 아카데미)</li>
              </ul>
            </div>
          </div>

          {/* [컬럼 3] 오른쪽: 상세 활동 경험, 수상 내역 */}
          <div className="about-right-col">
            <div className="resume-block">
              <h3 className="sub-section-title">Experience</h3>
              <ul className="resume-list">
                <li>
                  <span className="date">2023.03 - 2023.04</span>
                  <strong>창의력 경진대회</strong>
                  <p>청각 장애인을 위한 비트기계</p>
                </li>
                <li>
                  <span className="date">2023.08 - 2023.10</span>
                  <strong>실기 시험 과제</strong>
                  <p>패완칼 (패스트푸드의 완성은 피자칼)</p>
                </li>
                <li>
                  <span className="date">2024.03 - 2024.04</span>
                  <strong>ICT 창의력 경진대회</strong>
                  <p>태양광 자율주행 RC카 HW/SW 개발</p>
                </li>
                <li>
                  <span className="date">2024.04 - 2024.10</span>
                  <strong>한이음 항만 프로젝트</strong>
                  <p>harborGuard (VR 항만 크레인 시뮬레이터)</p>
                </li>
                <li>
                  <span className="date">2024.06 - 2024.11</span>
                  <strong>졸업 작품</strong>
                  <p>객체 인식 정확도 향상 기반 자율주행 (논문 투고)</p>
                </li>
                <li>
                  <span className="date">2024.06 - 2024.08</span>
                  <strong>동양미래 EXPO 작품 전시</strong>
                  <p>미래형 스마트팜 환경 제어 시스템 시연</p>
                </li>
                <li>
                  <span className="date">2024.12 - 2025.01</span>
                  <strong>KIEES 학회 동계 학술 논문 대회</strong>
                  <p>딥러닝 기반 지능형 PID 제어기 구현</p>
                </li>
                <li>
                  <span className="date">2025.06 - 2025.11</span>
                  <strong>스마트 프로젝트 경진대회</strong>
                  <p>[사진동네] 커뮤니티 및 사진 거래 플랫폼</p>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="sub-section-title">Awards</h3>
              <ul className="award-grid">
                <li><strong>캡스톤 디자인 대회 대상</strong> <span>VR 항만 시뮬레이터</span></li>
                <li><strong>스마트 프로젝트 장려상</strong> <span>사진동네 플랫폼</span></li>
                <li><strong>동양미래 EXPO 장려상</strong> <span>스마트팜 AI 모델</span></li>
                <li><strong>AWS Deep Racer League 4위</strong> <span>강화학습 자율주행</span></li>
                <li><strong>논문 제1저자 (KIEES학회)</strong> <span>객체 지향 모델 정확도 향상</span></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
