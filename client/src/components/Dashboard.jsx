import { useState, useEffect } from "react";
import InputTransaction from "./InputTransaction";
import "./Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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

  // Delete function
  const deleteTransaction = async (id) => {
    try {
        await fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" });
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (err) {
        console.error(err.message);
    }
  };

  // Edit function
  const editTransaction = async (id, oldDesc, oldAmount, oldCategory) => {
    const newAmount = prompt("Въведи нова сума:", oldAmount);
    const newCategory = prompt("Въведи категория:", oldCategory); 
    const newDesc = prompt("Въведи описание:", oldDesc);

    if (!newAmount || !newCategory) return;

    try {
        const body = { description: newDesc, amount: newAmount, category: newCategory };
        const response = await fetch(`http://localhost:5000/transactions/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        if (response.ok) {
            handleTransactionAdded(); // Refresh the data
        }
    } catch (err) {
        console.error(err.message);
    }
  };

  // Calculate income, expense, balance
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
  .filter(t => t.type === 'expense')
  .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  // Render transaction item
const renderTransactionItem = (tr) => (
  <div key={tr.id} className="transaction-item">
      <div className="transaction-info">
          <span className="category-badge"> {tr.category || "Общи"} </span>
          
          <div className="desc-text"> {tr.description} <span style={{color: "#ccc"}}>|</span> {new Date(tr.date).toLocaleDateString('bg-BG')} </div>
      </div>
      
      <div className="transaction-actions">
          <span className={`transaction-amount ${tr.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
              {Number(tr.amount).toFixed(2)} лв.
          </span>

          <button className="action-btn edit-btn" onClick={() => editTransaction(tr.id, tr.description, tr.amount, tr.category)} title="Редактирай">
              ✏️
          </button>

          <button className="action-btn delete-btn" onClick={() => deleteTransaction(tr.id)} title="Изтрий">
              🗑️
          </button>
      </div>
  </div>
);

  return (
    <div className="dashboard-container">
      <div className="content">
        <h1>Твоето финансово табло</h1>

        {/* Display */}
        <div className="stats-grid">
           <div className="card"><h3>Приходи</h3><p className="green">+{income.toFixed(2)} лв.</p></div>
           <div className="card"><h3>Разходи</h3><p className="red">-{expense.toFixed(2)} лв.</p></div>
           <div className="card"><h3>Баланс</h3><p className={balance >= 0 ? "blue" : "red"}>{balance.toFixed(2)} лв.</p></div>
        </div>

        {/* Form */}
        <InputTransaction onTransactionAdded={handleTransactionAdded} />

        {/* History */}
        <div className="history-container">

          {/* Left Column: Income */}
          <div className="history-column">
            <h3 style={{color: "#2e7d32"}}>💰 Приходи</h3>
            {transactions.filter(t => t.type === 'income').map(tr => renderTransactionItem(tr))}
          </div>

          {/* Right Column: Expenses */}
          <div className="history-column">
            <h3 style={{color: "#c62828"}}>📉 Разходи</h3>
            {transactions.filter(t => t.type === 'expense').map(tr => renderTransactionItem(tr))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;