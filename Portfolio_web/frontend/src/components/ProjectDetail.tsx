import { motion } from 'framer-motion';
import { Project } from '../types';
import './ProjectDetail.css';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="project-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-detail-modal"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <span>×</span>
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            <img
              src={project.image}
              alt={project.title}
              className="modal-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=' + project.title;
              }}
            />
          </div>

          <div className="modal-header-content">
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>
            {project.award && (
              <div className="modal-award">
                <span>🏆</span>
                {project.award}
              </div>
            )}
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-section">
            <h3 className="section-label">프로젝트 설명</h3>
            <p className="modal-description">{project.description}</p>
          </div>

          <div className="modal-meta-grid">
            <div className="meta-item">
              <h4>기간</h4>
              <p>{project.period}</p>
            </div>
            <div className="meta-item">
              <h4>팀 구성</h4>
              <p>{project.team}명</p>
            </div>
            <div className="meta-item full-width">
              <h4>담당 역할</h4>
              <p>{project.role}</p>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="section-label">기술 스택</h3>
            <div className="tech-stack-grid">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3 className="section-label">주요 성과</h3>
            <ul className="achievements-list">
              {project.achievements.map((achievement, index) => (
                <li key={index} className="achievement-item">
                  <span className="achievement-bullet">▸</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
