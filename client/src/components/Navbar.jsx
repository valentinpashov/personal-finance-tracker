import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { useLanguage } from "../LanguageContext"; 

const Navbar = ({ setAuth }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { language, toggleLanguage, t } = useLanguage();

  // Logout function
  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    if (setAuth) {
        setAuth(false);
    }
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo"> 💰 Finance Tracker </Link>

        <div className="nav-right-side">
            
            <button onClick={toggleLanguage} className="lang-btn"> 
              {language === 'bg' ? 'EN' : 'BG'}
            </button>

            <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            {user ? (
                <>
                <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
                    📊 {t.nav_dashboard}
                </Link>
                <Link to="/calendar" className={location.pathname === "/calendar" ? "active-link" : ""}>
                    📅 {t.nav_calendar}
                </Link>
                <Link to="/stats" className={location.pathname === "/stats" ? "active-link" : ""}>
                    📈 {t.nav_stats}
                </Link>
                <Link to="/report" className={location.pathname === "/report" ? "active-link" : ""}>
                    📄 {t.nav_report}
                </Link>

                <div className="user-section">
                    <Link to="/profile" className="profile-link"> 👤 {user.username} </Link>
                    <button onClick={handleLogout} className="logout-btn"> 🚪 {t.nav_logout} </button>
                </div>
                </>
            ) : (
                <Link to="/login" className="login-btn" style={{fontWeight: "bold", textDecoration: "none", color: "white"}}>Login</Link>
            )}
            </div>

            <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> ☰ </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;