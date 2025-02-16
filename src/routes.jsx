import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuestionPage from "./pages/QuestionPage";

const AppRoutes = () => {
  const isAdmin = localStorage.getItem("admin") === "true"; // ✅ Fix admin check

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAdmin ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/admin/questions" element={isAdmin ? <QuestionPage /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
