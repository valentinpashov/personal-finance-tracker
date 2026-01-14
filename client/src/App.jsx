import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CalendarPage from "./components/CalendarPage";
import StatsPage from "./components/StatsPage.jsx";
import ReportPage from "./components/ReportPage.jsx";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
    </Router>
  );
}

export default App;