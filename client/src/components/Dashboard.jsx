import { useState, useEffect } from "react";
import InputTransaction from "./InputTransaction"; 
import "./Dashboard.css";
import { useLanguage } from "../LanguageContext";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { t } = useLanguage();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/transactions/${userId}`);
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [userId, refresh]);

  const handleTransactionAdded = () => {
    setRefresh(prev => !prev);
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = income - expenses;

  const deleteTransaction = async (id) => {
    if (!window.confirm("Сигурни ли сте?")) return;
    try {
      await fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" });
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const editTransaction = (id) => {
    alert(`Функцията за редакция предстои за ID: ${id}`);
  };

  return (
    <div className="dashboard-container">
      <div className="content">

        {/* stats */}
        <div className="stats-grid">
          <div className="card">
            <h3>{t.balance}</h3>
            <p className={balance >= 0 ? "green" : "red"}>{balance.toFixed(2)} лв.</p>
          </div>
          <div className="card">
            <h3>{t.income}</h3>
            <p className="green">+{income.toFixed(2)} лв.</p>
          </div>
          <div className="card">
            <h3>{t.expense}</h3>
            <p className="red">-{expenses.toFixed(2)} лв.</p>
          </div>
        </div>

        {/* Form */}
        <InputTransaction onTransactionAdded={handleTransactionAdded} />

        {/* History */}
        <div className="history-container">
          <div className="history-column">
            <h3>{t.history}</h3>
            {loading ? (
              <p>Loading...</p>
            ) : transactions.length === 0 ? (
              <p>{t.no_transactions}</p>
            ) : (
              transactions.map((tr) => (
                <div key={tr.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="category-badge">{tr.category || "Общи"}</span>
                    <div className="desc-text">
                      {tr.description} <span style={{color: "#ccc"}}>|</span> {new Date(tr.date).toLocaleDateString('bg-BG')}
                    </div>
                  </div>
                  
                  <div className="transaction-actions">
                    <span className={`transaction-amount ${tr.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                      {Number(tr.amount).toFixed(2)} лв.
                    </span>
                    <button className="action-btn edit-btn" onClick={() => editTransaction(tr.id)} title={t.edit}>✏️</button>
                    <button className="action-btn delete-btn" onClick={() => deleteTransaction(tr.id)} title={t.delete}>🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;