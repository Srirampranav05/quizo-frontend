import { useState, useEffect } from "react";
import axios from "axios";
import QuizCard from "../components/QuizCard";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config"; // ✅ Import API base URL

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/quizzes`);
      setQuizzes(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load quizzes. Try again later.");
      setLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    if (!newTitle || !newDescription) return alert("All fields are required!");

    try {
      await axios.post(`${API_BASE_URL}/quiz`, {
        title: newTitle,
        description: newDescription,
      });
      setShowModal(false);
      fetchQuizzes();
    } catch (err) {
      console.error("Failed to create quiz:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>

        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Quiz
        </button>

        {loading && <p>Loading quizzes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
          ) : (
            !loading && <p>No quizzes available.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Quiz</h2>
            <input
              type="text"
              placeholder="Quiz Title"
              className="w-full p-2 border rounded mb-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Quiz Description"
              className="w-full p-2 border rounded mb-2"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button
              onClick={handleCreateQuiz}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
