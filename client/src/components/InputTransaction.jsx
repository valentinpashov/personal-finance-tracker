import { useState } from "react";
import "./InputTransaction.css"; 

const InputTransaction = ({ onTransactionAdded }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  
  // 1. ПРОМЯНА: Започваме с празна категория
  const [category, setCategory] = useState(""); 

  const expenseCategories = ["Храна", "Транспорт", "Наем", "Сметки", "Забавления", "Здраве", "Пазаруване", "Други"];
  const incomeCategories = ["Заплата", "Бонус", "Подарък", "Продажба", "Други"];

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const body = { user_id: userId, description, amount, type, category };
      
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setDescription("");
        setAmount("");
        setCategory(""); // Връщаме до "Категория" след успешно добавяне
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
        
        {/* БУТОНИ ЗА ТИПА */}
        <div className="type-buttons">
          <button 
            type="button" 
            className={`type-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => { 
                setType('income'); 
                setCategory(""); // 2. Нулираме категорията при смяна на типа
            }}
          >
            Приход
          </button>
          
          <button 
            type="button" 
            className={`type-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => { 
                setType('expense'); 
                setCategory(""); // 2. Нулираме категорията при смяна на типа
            }}
          >
            Разход
          </button>
        </div>

        {/* ПАДАЩО МЕНЮ */}
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          className="category-select"
          required // Това задължава потребителя да избере нещо различно от първата празна опция
        >
          {/* 3. ПРОМЯНА: Добавяме placeholder опция */}
          <option value="" disabled>Категория</option>

          {type === 'expense' 
            ? expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
            : incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)
          }
        </select>

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

        <button type="submit" className="btn-add">
          +
        </button>

      </form>
    </div>
  );
};

export default InputTransaction;