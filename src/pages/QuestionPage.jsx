import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Import Sidebar

const QuestionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes`)
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchQuestions = (quizId) => {
    setSelectedQuiz(quizId);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/quiz/${quizId}/questions`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex">
      <Sidebar /> {/* ✅ Sidebar added */}
      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Questions</h1>

        <select onChange={(e) => fetchQuestions(e.target.value)} className="mb-4 p-2 border rounded">
          <option value="">Select a Quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
          ))}
        </select>

        {questions.length > 0 ? (
          questions.map((q) => (
            <div key={q.id} className="bg-gray-200 p-4 mt-2 rounded flex justify-between">
              <div>
                <p className="font-bold">{q.text}</p>
                <p className="text-sm">Options: {q.options.join(", ")}</p>
                <p className="text-sm font-semibold">Correct: {q.correct_option}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
