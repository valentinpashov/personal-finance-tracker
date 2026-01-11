import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // activ page

  // take user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" style={{color: "white", textDecoration: "none"}}>
           <h2>💰 Finance Tracker</h2>
        </Link>
      </div>
      
      <div className="navbar-user">
        
        {/* Navigation */}
        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`}>
          📊 Табло
        </Link>

        <Link to="/calendar" className={`nav-link ${location.pathname === '/calendar' ? 'active-link' : ''}`}>
          📅 Календар
        </Link>

        <Link to="/stats" className={`nav-link ${location.pathname === '/stats' ? 'active-link' : ''}`}>
          📈 Статистика
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