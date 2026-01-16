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

          <Route path="/" element={!isAuthenticated ? <Navigate to="/register" /> : <Navigate to="/dashboard" />} />
          
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />

          <Route element={<Layout setAuth={setAuth} />}>
             
             <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
             
             <Route path="/calendar" element={isAuthenticated ? <CalendarPage /> : <Navigate to="/login" />} />

             <Route path="/stats" element={isAuthenticated ? <StatsPage /> : <Navigate to="/login" />} />

             <Route path="/report" element={isAuthenticated ? <ReportPage /> : <Navigate to="/login" />} />

             <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />

          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
    </Router>
  );
}

export default App;