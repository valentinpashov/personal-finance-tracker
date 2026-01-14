import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListTransactions from "./ListTransactions";
import "./ReportPage.css"; 

const ReportPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [transactions, setTransactions] = useState([]);
  const [timeFilter, setTimeFilter] = useState('monthly'); 

  useEffect(() => {
    const getTransactions = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/transactions/${userId}`);
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getTransactions();
  }, [userId]);

  // Filter logic
  const getFilteredTransactions = () => {
    const now = new Date();
    now.setHours(0,0,0,0);

    return transactions.filter(t => {
      const tDate = new Date(t.date);
      tDate.setHours(0,0,0,0);

      if (timeFilter === 'daily') {
        return tDate.getTime() === now.getTime();
      }
      if (timeFilter === 'weekly') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return tDate >= oneWeekAgo && tDate <= now;
      }
      if (timeFilter === 'monthly') {
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      }
      if (timeFilter === 'yearly') {
        return tDate.getFullYear() === now.getFullYear();
      }
      return true; 
    });
  };

  const filteredData = getFilteredTransactions();

  // Calculations for period
  const income = filteredData
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = filteredData
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  
  const totalBalance = income - expense;

  return (
    <div className="report-container">
      <Navbar />
      
      <div className="content">
        <h1>Финансов Отчет</h1>
        
        {/* Buttons for filtering */}
        <div className="filter-container">
            <button className={`filter-btn ${timeFilter === 'daily' ? 'active' : ''}`} onClick={() => setTimeFilter('daily')}>Днес</button>
            <button className={`filter-btn ${timeFilter === 'weekly' ? 'active' : ''}`} onClick={() => setTimeFilter('weekly')}>7 Дни</button>
            <button className={`filter-btn ${timeFilter === 'monthly' ? 'active' : ''}`} onClick={() => setTimeFilter('monthly')}>Месец</button>
            <button className={`filter-btn ${timeFilter === 'yearly' ? 'active' : ''}`} onClick={() => setTimeFilter('yearly')}>Година</button>
            <button className={`filter-btn ${timeFilter === 'all' ? 'active' : ''}`} onClick={() => setTimeFilter('all')}>Всички</button>
        </div>

        {/* Results */}
        <div className="balance-cards">
          <div className="card balance">
            <h3>Баланс (Период)</h3>
            <p>{totalBalance.toFixed(2)} лв.</p>
          </div>
          <div className="card income">
            <h3>Приход</h3>
            <p>+{income.toFixed(2)} лв.</p>
          </div>
          <div className="card expense">
            <h3>Разход</h3>
            <p>-{expense.toFixed(2)} лв.</p>
          </div>
        </div>

        {/* List of only filtered transactions */}
        <div style={{marginTop: "30px"}}>
             <h3>Детайли за периода:</h3>
             <ListTransactions transactions={filteredData} />
        </div>

      </div>
    </div>
  );
};

export default ReportPage;