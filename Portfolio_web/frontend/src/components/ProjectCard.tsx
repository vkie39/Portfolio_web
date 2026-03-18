import { motion } from 'framer-motion';

import { Project } from '../types';

import './ProjectCard.css';



interface ProjectCardProps {

  project: Project;

  index: number;

  onClick: () => void;

}



const SERVER_URL = import.meta.env.VITE_API_BASE;



const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {

  const imgUrl = `${SERVER_URL}${String(project.thumbnail).trim()}`;

  return (

    <motion.div

      className="project-card"

      initial={{ opacity: 0, y: 50 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ delay: index * 0.1, duration: 0.5 }}

      whileHover={{ y: -8, boxShadow: 'var(--shadow-hover)' }}

      onClick={onClick}

    >

      <div className="card-number">

        {String(index + 1).padStart(2, '0')}

      </div>



      <div className="card-image-container">

        <div className="card-image-wrapper">

         

          <img

            src={imgUrl}

            alt={project.title}

            className="card-image"

            onError={(e) => {

              console.log("IMAGE FAIL:", imgUrl, "thumbnail=", project.thumbnail);

              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=' + project.title;

            }}

          />

        </div>

        {project.award && (

          <div className="card-award">

            <span>🏆</span>

            {project.award}

          </div>

        )}

      </div>



      <div className="card-content">

        <h3 className="card-title">{project.title}</h3>

        <p className="card-subtitle">{project.subtitle}</p>

       

        <div className="card-meta">

          <span className="card-period">{project.period}</span>

          <span className="card-team">팀 {project.team}명</span>

        </div>



        <div className="card-tech">

          {project.tech.slice(0, 4).map((tech) => (

            <span key={tech} className="tech-tag">

              {tech}

            </span>

          ))}

          {project.tech.length > 4 && (

            <span className="tech-tag">+{project.tech.length - 4}</span>

          )}

        </div>



        <div className="card-cta">

          <span>자세히 보기</span>

          <span className="cta-arrow">→</span>

        </div>

      </div>



      <div className="card-decorative"></div>

    </motion.div>

  );

};



export default ProjectCard; 