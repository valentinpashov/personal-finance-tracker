import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  
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
        <h2>💰 Finance Tracker</h2>
      </div>
      
      <div className="navbar-user">

        <Link to="/calendar" className="nav-link">📅 Календар</Link>

        {user && <span>Здравей, <strong>{user.username}</strong></span>}
        
        <button onClick={handleLogout} className="btn-logout">Изход</button>
      </div>
    </nav>
  );
};

export default Navbar;