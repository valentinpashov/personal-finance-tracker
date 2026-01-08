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

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="content">
        <h1>Твоето финансово табло</h1>
        
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
              <p className={balance >= 0 ? "blue" : "red"}>{balance.toFixed(2)} лв.</p>
           </div>
        </div>

        <InputTransaction onTransactionAdded={handleTransactionAdded} />

        <div style={{marginTop: "30px", textAlign: "left", maxWidth: "600px", margin: "30px auto"}}>
            <h3 style={{borderBottom: "1px solid #ccc", paddingBottom: "10px"}}>История на транзакциите</h3>
            
            {transactions.length === 0 ? (
                <p style={{textAlign: "center", color: "#888"}}>Все още няма въведени данни.</p>
            ) : (
                transactions.map(tr => (
                    <div key={tr.id} style={{
                        background: "white", 
                        padding: "15px", 
                        margin: "10px 0", 
                        borderRadius: "8px", 
                        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div>
                            <span style={{fontWeight: "bold", display: "block"}}>{tr.description}</span>
                            <span style={{fontSize: "12px", color: "#777"}}>
                                {new Date(tr.date).toLocaleDateString('bg-BG')}
                            </span>
                        </div>
                        <span style={{
                            color: tr.type === 'income' ? '#2e7d32' : '#c62828', 
                            fontWeight: "bold",
                            fontSize: "1.1rem"
                        }}>
                            {tr.type === 'income' ? '+' : '-'}{Number(tr.amount).toFixed(2)} лв.
                        </span>
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;