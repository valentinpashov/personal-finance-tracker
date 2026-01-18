import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import "./CalendarPage.css"; 
import { useLanguage } from "../LanguageContext"; 

const CalendarPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(new Date());
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/transactions/${userId}`);
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (err) { console.error(err.message); }
    };
    fetchData();
  }, [userId]);

  const selectedDateTransactions = transactions.filter(t => {
    const tDate = new Date(t.date).toDateString(); 
    const sDate = date.toDateString();
    return tDate === sDate;
  });

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasTransaction = transactions.some(t => new Date(t.date).toDateString() === date.toDateString());
      if (hasTransaction) return <div className="dot"></div>;
    }
  };

  return (
    <div className="calendar-page-container">
      <div className="content-wrapper">
        <h1 className="page-title">📅 {t.calendar_title}</h1>
        
        <div className="calendar-grid">
            <div className="calendar-card">
                <Calendar onChange={setDate} value={date} tileContent={tileContent} locale="bg-BG" />
            </div>

            <div className="day-details-card">
                <h3>{t.transactions_for}: <span className="highlight-date">{date.toLocaleDateString('bg-BG')}</span></h3>
                
                <div className="transactions-list-scroll">
                    {selectedDateTransactions.length === 0 ? (
                        <div className="empty-state">
                            <p>{t.no_records_day}</p>
                            <span>🏝️</span>
                        </div>
                    ) : (
                        selectedDateTransactions.map(tr => (
                            <div key={tr.id} className="mini-transaction-item">
                                <div className="mini-info">
                                    <span className="mini-cat">{tr.category || "Общи"}</span>
                                    <span className="mini-desc">{tr.description}</span>
                                </div>
                                <span className={`mini-amount ${tr.type === 'income' ? 'green' : 'red'}`}>
                                    {tr.type === 'income' ? '+' : ''}{Number(tr.amount).toFixed(2)} лв.
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;