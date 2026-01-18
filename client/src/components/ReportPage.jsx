import { useEffect, useState } from "react";
import ListTransactions from "./ListTransactions";
import "./ReportPage.css"; 
import { useLanguage } from "../LanguageContext"; 

const ReportPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [transactions, setTransactions] = useState([]);
  const [timeFilter, setTimeFilter] = useState('monthly'); 
  const { t } = useLanguage(); 

  useEffect(() => {
    const getTransactions = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/transactions/${userId}`);
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (err) { console.error(err.message); }
    };
    getTransactions();
  }, [userId]);

  const getFilteredTransactions = () => {
    const now = new Date();
    now.setHours(0,0,0,0);
    return transactions.filter(t => {
      const tDate = new Date(t.date);
      tDate.setHours(0,0,0,0);
      if (timeFilter === 'daily') return tDate.getTime() === now.getTime();
      if (timeFilter === 'weekly') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return tDate >= oneWeekAgo && tDate <= now;
      }
      if (timeFilter === 'monthly') return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      if (timeFilter === 'yearly') return tDate.getFullYear() === now.getFullYear();
      return true; 
    });
  };

  const filteredData = getFilteredTransactions();
  const income = filteredData.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const expense = filteredData.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalBalance = income - expense;

  return (
    <div className="report-page-container">
      <div className="report-content">
        
        <h1 className="page-title">📋 {t.financial_report}</h1>
        
        <div className="glass-panel filters">
            <button className={`filter-btn ${timeFilter === 'daily' ? 'active' : ''}`} onClick={() => setTimeFilter('daily')}>{t.today}</button>
            <button className={`filter-btn ${timeFilter === 'weekly' ? 'active' : ''}`} onClick={() => setTimeFilter('weekly')}>{t.week}</button>
            <button className={`filter-btn ${timeFilter === 'monthly' ? 'active' : ''}`} onClick={() => setTimeFilter('monthly')}>{t.month}</button>
            <button className={`filter-btn ${timeFilter === 'yearly' ? 'active' : ''}`} onClick={() => setTimeFilter('yearly')}>{t.year}</button>
            <button className={`filter-btn ${timeFilter === 'all' ? 'active' : ''}`} onClick={() => setTimeFilter('all')}>{t.all}</button>
        </div>

        <div className="summary-cards-container">
          <div className="summary-card">
            <h3>{t.balance_period}</h3>
            <p style={{color: totalBalance >= 0 ? '#2e7d32' : '#c62828'}}>{totalBalance.toFixed(2)} лв.</p>
          </div>
          <div className="summary-card">
            <h3>{t.income}</h3>
            <p className="green">+{income.toFixed(2)} лв.</p>
          </div>
          <div className="summary-card">
            <h3>{t.expense}</h3>
            <p className="red">-{expense.toFixed(2)} лв.</p>
          </div>
        </div>

        <div className="glass-panel list-section">
             <div className="list-header">
                <h3>{t.period_details} ({filteredData.length})</h3>
             </div>
             <ListTransactions transactions={filteredData} />
        </div>

      </div>
    </div>
  );
};

export default ReportPage;