import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CalendarPage from "./components/CalendarPage";
import StatsPage from "./components/StatsPage";
import ReportPage from "./components/ReportPage";
import ProfilePage from "./components/ProfilePage";
import Layout from "./components/Layout";

function App() {
  // User authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));

  // Function to update authentication state
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
        <Routes>
        </Routes>
    </Router>
  );
}

export default App;