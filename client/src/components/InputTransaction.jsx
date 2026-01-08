import { useState } from "react";
import "./InputTransaction.css"; 

const InputTransaction = ({ onTransactionAdded }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); // 'expense' in classic mode

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const body = { user_id: userId, description, amount, type };
      
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setDescription("");
        setAmount("");
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
        
        {/* type button */}
        <div className="type-buttons">
          <button 
            type="button" 
            className={`type-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => setType('income')}
          >
            Приход
          </button>
          
          <button 
            type="button" 
            className={`type-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => setType('expense')}
          >
            Разход
          </button>
        </div>

        {/* Amount input */}
        <input
          type="number"
          placeholder="Сума"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        {/* Description input */}
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
    
        {/* Submit button */}
        <button type="submit" className="btn-add"> + Добави </button>

      </form>
    </div>
  );
};

export default InputTransaction;