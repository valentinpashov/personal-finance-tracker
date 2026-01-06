import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="content">
        <h1>Твоето финансово табло</h1>
        <p>Тук скоро ще виждаш графика на разходите си.</p>
        
        
      </div>
    </div>
  );
};

export default Dashboard;