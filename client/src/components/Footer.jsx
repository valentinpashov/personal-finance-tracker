import { Link } from "react-router-dom";
import "./Footer.css";
import { useLanguage } from "../LanguageContext"; 

const Footer = () => {
  const { t } = useLanguage(); 

  return (
    <footer className="site-footer">
      <div className="footer-content">
        
        {/* App description */}
        <div className="footer-section">
          
          <h3>💰 Finance Tracker</h3>
          <p> {t.footer_line1}<br /> {t.footer_line2} </p>

        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>{t.quick_links}</h4>
          <ul>
            <li><Link to="/dashboard">{t.nav_dashboard}</Link></li>
            <li><Link to="/report">{t.nav_report}</Link></li>
            <li><Link to="/calendar">{t.nav_calendar}</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Finance Tracker. {t.rights_reserved}</p>
      </div>
    </footer>
  );
};

export default Footer;