import { useState } from "react";
import "./InputTransaction.css"; 
import { useLanguage } from "../LanguageContext"; 

const InputTransaction = ({ onTransactionAdded }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const { t } = useLanguage(); 

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(""); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const expenseCategories = ["Food", "Transport", "Rent", "Bills", "Entertainment", "Health", "Shopping", "Other"];
  const incomeCategories = ["Salary", "Bonus", "Gift", "Sale", "Other"];

  const categoryIcons = {
    Food: "🍔", Transport: "🚌", Rent: "🏠", Bills: "🧾", Entertainment: "🎬",
    Health: "💊", Shopping: "🛍️", Other: "🔹", Salary: "💰", Bonus: "🎁",
    Gift: "🎀", Sale: "🏷️"
  };

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

  const handleCategorySelect = (selectedCat) => {
      setCategory(selectedCat);
      setShowCategoryModal(false); 
  };

  return (
    <div className="input-container">
      <h3>{t.add_transaction_title}</h3>
      
      <form onSubmit={onSubmitForm} className="input-form">
        
        <div className="type-buttons">
          <button 
            type="button" 
            className={`type-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => { setType('income'); setCategory(""); }}
          >
            {t.income}
          </button>
          
          <button 
            type="button" 
            className={`type-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => { setType('expense'); setCategory(""); }}
          >
            {t.expense}
          </button>
        </div>

        <div className="category-trigger full-width" onClick={() => setShowCategoryModal(true)}>
            {category ? (
                <span>{categoryIcons[category]} {t[`cat_${category}`]}</span>
            ) : (
                <span style={{color: "#aaa"}}>{t.select_category_placeholder}</span>
            )}
            <span className="dropdown-arrow">▼</span>
        </div>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="date-input full-width"
          required
        />

        <input
          type="number"
          placeholder={t.amount_placeholder}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="full-width"
          required
        />

        <input
          type="text"
          placeholder={t.note_placeholder}
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="full-width"
        />

        <button type="submit" className="btn-add full-width">
          {t.btn_add}
        </button>

      </form>

      {showCategoryModal && (
          <div className="cat-modal-overlay" onClick={() => setShowCategoryModal(false)}>
              <div className="cat-modal-content" onClick={e => e.stopPropagation()}>
                  <h4>{type === 'income' ? t.select_income_title : t.select_expense_title}</h4>
                  
                  <div className="categories-grid">
                      {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                          <button key={cat} type="button" className="cat-grid-btn" onClick={() => handleCategorySelect(cat)} >
                              <div className="cat-icon">{categoryIcons[cat] || "🔹"}</div>
                              <div className="cat-label">{t[`cat_${cat}`] || cat}</div>
                          </button>
                      ))}
                  </div>
                  
                  <button className="btn-close-modal" onClick={() => setShowCategoryModal(false)} >
                    {t.cancel}
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};

export default InputTransaction;