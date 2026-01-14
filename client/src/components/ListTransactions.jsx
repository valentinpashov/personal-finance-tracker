import React from "react";
import "./ListTransactions.css"; 

const ListTransactions = ({ transactions, setTransactionsChanged, transactionsChanged }) => {  
  const data = transactions || [];

  

  return (
    <div className="list-container">
      {data.length === 0 ? (
        <p className="no-data-text">Няма намерени транзакции.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Описание</th>
              <th>Сума</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <tr key={transaction.id}>
                <td className="desc-cell">{transaction.description}</td>
                <td className={transaction.type === 'income' ? 'amount-income' : 'amount-expense'}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {Number(transaction.amount).toFixed(2)} лв.
                </td>
                <td>
                    <span className="category-tag">{transaction.category}</span>
                </td>
                <td>{new Date(transaction.date).toLocaleDateString("bg-BG")}</td>
                <td>
                  <button className="btn-delete" onClick={() => deleteTransaction(transaction.id)} >
                    Изтрий
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListTransactions;