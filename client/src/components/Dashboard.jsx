import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="content">
        <h1>Твоето финансово табло</h1>
        <p>Тук скоро ще виждаш графика на разходите си.</p>
        
        <div className="stats-grid">
           
           <div className="card">
              <h3>Приходи</h3>
              <p className="green">0.00 лв.</p>
           </div>

           <div className="card">
              <h3>Разходи</h3>
              <p className="red">0.00 лв.</p>
           </div>
           
           <div className="card">
              <h3>Баланс</h3>
              <p className="blue">0.00 лв.</p>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;