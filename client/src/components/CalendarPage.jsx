import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Navbar from "./Navbar";
import "react-calendar/dist/Calendar.css"; 
import "./CalendarPage.css"; 

const CalendarPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(new Date()); // daily selected date

  // All transactions for the user
  useEffect(() => {
    const fetchData = async () => {
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
  }, [userId]);

  // Only transactions for the selected date
  const selectedDateTransactions = transactions.filter(t => {
    const tDate = new Date(t.date).toDateString(); 
    const sDate = date.toDateString();
    return tDate === sDate;
  });

  // function to add dots on dates with transactions
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      
      // Check if there are transactions on this date
      const hasTransaction = transactions.some(t => 
        new Date(t.date).toDateString() === date.toDateString()
      );
      
      if (hasTransaction) {
        return <div className="dot"></div>;
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="content">
        <h1>Финансов Календар</h1>
        
        <div className="calendar-wrapper">
          <Calendar 
            onChange={setDate} 
            value={date} 
            tileContent={tileContent} // add dots 
          />
        </div>

        <div className="day-details">
            <h3>Транзакции за {date.toLocaleDateString('bg-BG')}</h3>
            
            {selectedDateTransactions.length === 0 ? (
                <p style={{color: "#888"}}>Няма записи за този ден.</p>
            ) : (
                selectedDateTransactions.map(tr => (
                    <div key={tr.id} className="transaction-item">
                        <span className="transaction-desc">{tr.description}</span>
                        <span className={`transaction-amount ${tr.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                            {Number(tr.amount).toFixed(2)} лв.
                        </span>
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  );
};

export default CalendarPage;