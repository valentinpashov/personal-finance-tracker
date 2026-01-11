import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Navbar from "./Navbar";
import "./StatsPage.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

  
  // Only expenses
  const expenses = transactions.filter(t => t.type === 'expense');

  // Make category totals
  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category || "Други"; // Default category
    const amount = Number(curr.amount);
    
    if (acc[cat]) {
      acc[cat] += amount;
    } else {
      acc[cat] = amount;
    }
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="content">
        <h1>Статистика на разходите</h1>
        
        <div className="chart-container">
            {expenses.length === 0 ? (
                <p>Няма данни за разходи. Добави транзакции, за да видиш графиката.</p>
            ) : (
                <div className="pie-wrapper">
                    <Pie data={chartData} />
                </div>
            )}
        </div>

        <div className="stats-summary">
            <h3>Детайли по категория:</h3>
            <ul>
                {Object.entries(categoryTotals).map(([cat, amount]) => (
                    <li key={cat}>
                        <span className="cat-name">{cat}</span>
                        <span className="cat-amount">{amount.toFixed(2)} лв.</span>
                    </li>
                ))}
            </ul>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;