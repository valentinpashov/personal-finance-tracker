import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import InputTransaction from "./InputTransaction";
import "./Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // use only userId for dependency tracking
  const userId = user ? user.id : null;

  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // use only userId for dependency tracking
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

    // Dependencies from userId и refresh. 
  }, [refresh, userId]); 

  const handleTransactionAdded = () => {
    setRefresh(prev => !prev);
  };

  // Calculate income, expense, and balance
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  const renderTransactionItem = (tr) => (
    <div key={tr.id} style={{
        borderBottom: "1px solid #eee",
        padding: "10px 0",
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        <div>
            <span style={{fontWeight: "bold", color: "#333"}}>{tr.description}</span>
            
            <span style={{fontSize: "15px", color: "#000000ff", marginLeft: "10px"}}>{new Date(tr.date).toLocaleDateString('bg-BG')}</span>
        </div>

        <span style={{
            color: tr.type === 'income' ? '#2e7d32' : '#c62828', 
            fontWeight: "bold",
            fontSize: "1rem"
        }}>
            {Number(tr.amount).toFixed(2)} лв.
        </span>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="content">
        <h1>Твоето финансово табло</h1>
        
       {/* Display */}
        <div className="stats-grid">
           <div className="card">
              <h3>Приходи</h3>
              <p className="green">+{income.toFixed(2)} лв.</p>
           </div>
           <div className="card">
              <h3>Разходи</h3>
              <p className="red">-{expense.toFixed(2)} лв.</p>
           </div>
           <div className="card">
              <h3>Баланс</h3>
              <p className={balance >= 0 ? "blue" : "red"}>
                {balance.toFixed(2)} лв.
              </p>
           </div>
        </div>

        {/* Form */}
        <InputTransaction onTransactionAdded={handleTransactionAdded} />

        {/* History */}
        <div className="history-container">
          
          {/* Left Column: Income */}
          <div className="history-column">
            <h3 style={{color: "#2e7d32"}}>💰 Приходи</h3>
            {transactions.filter(t => t.type === 'income').length === 0 ? (
               <p style={{color: "#ccc", fontStyle: "italic"}}>Няма приходи.</p>
            ) : (
               transactions
                 .filter(t => t.type === 'income')
                 .map(tr => renderTransactionItem(tr))
            )}
          </div>

          {/* Right Column: Expenses */}
          <div className="history-column">
            <h3 style={{color: "#c62828"}}>📉 Разходи</h3>
            {transactions.filter(t => t.type === 'expense').length === 0 ? (
               <p style={{color: "#ccc", fontStyle: "italic"}}>Няма разходи.</p>
            ) : (
               transactions
                 .filter(t => t.type === 'expense')
                 .map(tr => renderTransactionItem(tr))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;