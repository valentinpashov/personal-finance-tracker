import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement 
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2"; 
import Navbar from "./Navbar";
import "./StatsPage.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StatsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/transactions/${userId}`);
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [userId]);

  const expenses = transactions.filter(t => t.type === 'expense');

  // Category Totals data
  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category || "Other"; 
    const amount = Number(curr.amount);
    acc[cat] = (acc[cat] || 0) + amount;
    return acc;
  }, {});

  // Sorted categories by big to small amount
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a); 

  const labels = sortedCategories.map(([cat]) => cat);
  const dataValues = sortedCategories.map(([, amount]) => amount);

  const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',  
    'rgba(255, 99, 132, 0.8)',  
    'rgba(75, 192, 192, 0.8)',  
    'rgba(255, 206, 86, 0.8)',  
    'rgba(153, 102, 255, 0.8)', 
    'rgba(255, 159, 64, 0.8)',  
  ];

  // Donut chart configurations
  const doughnutData = {
    labels: labels,
    datasets: [{
      data: dataValues,
      backgroundColor: backgroundColors,
      borderWidth: 0, 
      hoverOffset: 10,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%', 
    plugins: {
      legend: { display: false }, 
    }
  };

  // Bar chart configurations
  const barData = {
    labels: labels,
    datasets: [{
      label: 'Spent',
      data: dataValues,
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderRadius: 8, 
      barThickness: 30, 
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false }, 
        ticks: { font: { size: 11 } }
      },
      y: {
        display: false, 
        grid: { display: false }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="content">
        <h1>Spending Analytics</h1>
        
        {expenses.length === 0 ? (
           <p className="no-data">No data available.</p>
        ) : (
           <div className="modern-grid">
              
              {/* Donut Chart */}
              <div className="card glass-card">
                  <h3>Distribution</h3>
                  <div className="chart-box">
                    <div className="doughnut-text">
                        <span>Total</span>
                        <strong>{dataValues.reduce((a, b) => a + b, 0).toFixed(0)} лв.</strong>
                    </div>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  </div>
              </div>

              {/* Bar Chart */}
              <div className="card glass-card">
                  <h3>Top Categories</h3>
                  <div className="chart-box">
                    <Bar data={barData} options={barOptions} />
                  </div>
              </div>

              {/* Details - History */}
              <div className="card glass-card full-width">
                  <h3>Details</h3>
                  <div className="custom-legend">
                    {sortedCategories.map(([cat, amount], i) => {
                        const total = dataValues.reduce((a, b) => a + b, 0);
                        const percent = ((amount / total) * 100).toFixed(1); 
                        
                        return (
                          <div key={cat} className="legend-item">
                             <div className="legend-left">
                                <span className="dot" style={{background: backgroundColors[i % backgroundColors.length]}}></span>
                                <span className="cat-name">{cat}</span>
                             </div>
                             <div className="legend-right">
                                <span className="percent-badge">{percent}%</span>
                                <span className="amount-text">{amount.toFixed(2)} лв.</span>
                             </div>
                          </div>
                        )
                    })}
                  </div>
              </div>

           </div>
        )}
      </div>
    </div>
  );
};

export default StatsPage;