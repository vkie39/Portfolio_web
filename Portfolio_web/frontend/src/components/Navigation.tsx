import { motion } from 'framer-motion';
import './Navigation.css';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['Projects', 'About', 'Contact'];

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">SEOHYUN</span>
          <span className="logo-bracket">{'/>'}</span>
        </motion.div>

        <div className="nav-tabs">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => onTabChange(tab)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="tab-number">0{index + 1}</span>
              <span className="tab-text">{tab}</span>
              {activeTab === tab && (
                <motion.div
                  className="tab-indicator"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
