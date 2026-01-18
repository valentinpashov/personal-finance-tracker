import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement 
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2"; 
import "./StatsPage.css";
import { useLanguage } from "../LanguageContext"; // <--- Импорт

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StatsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [transactions, setTransactions] = useState([]);
  const { t } = useLanguage(); // <--- Хук

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

  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category || "Други"; 
    const amount = Number(curr.amount);
    acc[cat] = (acc[cat] || 0) + amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a); 
  const labels = sortedCategories.map(([cat]) => cat);
  const dataValues = sortedCategories.map(([, amount]) => amount);
  const totalExpense = dataValues.reduce((a, b) => a + b, 0);

  const backgroundColors = ['rgba(46, 125, 50, 0.8)', 'rgba(198, 40, 40, 0.8)', 'rgba(255, 160, 0, 0.8)', 'rgba(21, 101, 192, 0.8)', 'rgba(106, 27, 154, 0.8)', 'rgba(0, 150, 136, 0.8)'];

  const doughnutData = {
    labels: labels,
    datasets: [{ data: dataValues, backgroundColor: backgroundColors, borderWidth: 0, hoverOffset: 10 }],
  };

  const barData = {
    labels: labels,
    datasets: [{ label: 'Spent', data: dataValues, backgroundColor: 'rgba(46, 125, 50, 0.7)', borderRadius: 6, barThickness: 40 }]
  };

  return (
    <div className="stats-page-container">
      <div className="stats-content">
        <h1>{t.financial_analysis}</h1> {/* Превод */}
        
        {expenses.length === 0 ? (
           <div className="no-data-message">
              <p>{t.no_data}</p>
           </div>
        ) : (
           <div className="modern-grid">
              
              <div className="card glass-card">
                  <h3>{t.distribution}</h3>
                  <div className="chart-box">
                    <div className="doughnut-text">
                        <span>{t.total}</span>
                        <strong>{totalExpense.toFixed(0)} лв.</strong>
                    </div>
                    <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } }} />
                  </div>
              </div>

              <div className="card glass-card">
                  <h3>{t.top_categories}</h3>
                  <div className="chart-box">
                    <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false, grid: { display: false } } } }} />
                  </div>
              </div>

              <div className="card glass-card full-width">
                  <h3>{t.details}</h3>
                  <div className="custom-legend">
                    {sortedCategories.map(([cat, amount], i) => {
                        const percent = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : 0;
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