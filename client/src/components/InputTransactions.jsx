import { useState } from "react";
import "./InputTransaction.css"; 

const InputTransaction = ({ onTransactionAdded }) => {
  // user's data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); 

 

  return (
    <div className="input-container">
      <h3>Добави транзакция</h3>
      <form onSubmit={onSubmitForm} className="input-form">
        <input
          type="text"
          placeholder="Описание (напр. Заплата, Кафе)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Сума"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="expense">Разход</option>
          <option value="income">Приход</option>
        </select>
        <button type="submit" className={type === "income" ? "btn-income" : "btn-expense"}> + Добави </button>
      </form>
    </div>
  );
};

export default InputTransaction;