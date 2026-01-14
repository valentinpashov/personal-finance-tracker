import { useState } from "react"; // Добавяме useState
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // activ page

   // take user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  
  // menu state
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // close menu function
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" style={{color: "white", textDecoration: "none"}}>
           <h2>💰 Finance Tracker</h2>
        </Link>
      </div>

      {/* burger menu logic */}
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      
      <div className={`navbar-user ${isOpen ? "open" : ""}`}>
        
        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`} onClick={closeMenu} >
          📊 Табло
        </Link>

        <Link to="/calendar" className={`nav-link ${location.pathname === '/calendar' ? 'active-link' : ''}`} onClick={closeMenu} >
          📅 Календар
        </Link>

        <Link to="/stats" className={`nav-link ${location.pathname === '/stats' ? 'active-link' : ''}`} onClick={closeMenu} >
          📈 Статистика
        </Link>
       
        <Link to="/report" className={`nav-link ${location.pathname === '/report' ? 'active-link' : ''}`} onClick={closeMenu} >
          📋 Отчет
        </Link>

        {/* User name */}
        {user && ( <span className="user-name"> {user.username} </span>
        )}
        
        <button onClick={handleLogout} className="btn-logout"> Изход </button>
      </div>
    </nav>
  );
};

export default Navbar;