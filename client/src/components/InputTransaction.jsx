import { useState } from "react";
import "./InputTransaction.css"; 

const InputTransaction = ({ onTransactionAdded }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(""); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const expenseCategories = ["Food", "Transport", "Rent", "Bills", "Entertainment", "Health", "Shopping", "Other"];
  const incomeCategories = ["Salary", "Bonus", "Gift", "Sale", "Other"];

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const body = { user_id: userId, description, amount, type, category, date };
      
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setDescription("");
        setAmount("");
        setCategory(""); 
        setDate(new Date().toISOString().split('T')[0]);
        if (onTransactionAdded) onTransactionAdded();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="input-container">
      <h3>Добави транзакция</h3>
      
      <form onSubmit={onSubmitForm} className="input-form">
        
        {/* Buttons for type */}
        <div className="type-buttons">
          <button 
            type="button" 
            className={`type-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => { 
                setType('income'); 
                setCategory(""); 
            }}
          >
            Приход
          </button>
          
          <button 
            type="button" 
            className={`type-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => { 
                setType('expense'); 
                setCategory(""); 
            }}
          >
            Разход
          </button>
        </div>

        <div style={{display: "flex", gap: "10px", width: "100%"}}>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="category-select"
              style={{flex: 1}} 
              required
            >
              <option value="" disabled>Category</option>
              {type === 'expense' 
                ? expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
                : incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
              }
            </select>

            {/* Data input */}
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="date-input"
              style={{flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc"}}
              required
            />
        </div>

        <input
          type="number"
          placeholder="Сума"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Бележка (по желание)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit" className="btn-add"> + </button>

      </form>
    </div>
  );
};

export default InputTransaction;