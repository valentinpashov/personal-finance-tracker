import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        
        {/* App description */}
        <div className="footer-section">
          <h3>💰 Finance Tracker</h3>
          <p>
            Поеми контрол над финансите си.<br />
            Следи приходи, разходи и спестявай умно.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>Бързи връзки</h4>
          <ul>
            <li><Link to="/dashboard">Табло</Link></li>
            <li><Link to="/report">Отчет</Link></li>
            <li><Link to="/calendar">Календар</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Finance Tracker. Всички права запазени.</p>
      </div>
    </footer>
  );
};

export default Footer;