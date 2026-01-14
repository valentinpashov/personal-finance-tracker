import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ListTransactions from "./ListTransactions";
import "./ReportPage.css"; 

const ReportPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [transactions, setTransactions] = useState([]);
  const [timeFilter, setTimeFilter] = useState('monthly'); 

  useEffect(() => {
    const getTransactions = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:5000/transactions/${userId}`);
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getTransactions();
  }, [userId]);

  // Filter logic

};

export default ReportPage;