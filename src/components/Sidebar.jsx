import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload(); // ✅ Ensures session reset
  };

  return (
    <div className="w-1/5 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <ul className="space-y-3">
        <li className={`p-2 rounded ${location.pathname === "/dashboard" ? "bg-gray-700" : ""}`}>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>
        <li className={`p-2 rounded ${location.pathname === "/admin/questions" ? "bg-gray-700" : ""}`}>
          <Link to="/admin/questions">❓ Manage Questions</Link>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
