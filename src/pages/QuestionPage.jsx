import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Import Sidebar

const QuestionPage = () => {
  const [quizzes, setQuizzes] = useState([]); // Stores quizzes
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Selected quiz
  const [questions, setQuestions] = useState([]); // Stores questions
  const [showModal, setShowModal] = useState(false); // Modal state
  const [newQuestion, setNewQuestion] = useState(""); // Question text
  const [newOptions, setNewOptions] = useState(["", "", "", ""]); // 4 options
  const [correctOption, setCorrectOption] = useState(""); // Correct option

  useEffect(() => {
    axios.get("http://localhost:5000/quizzes")
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchQuestions = (quizId) => {
    setSelectedQuiz(quizId);
    axios.get(`http://localhost:5000/quiz/${quizId}/questions`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  };

  // ✅ Add a new question
  const handleAddQuestion = async () => {
    if (!newQuestion || newOptions.includes("") || !correctOption) {
      return alert("All fields are required!");
    }

    try {
      await axios.post(`http://localhost:5000/quiz/${selectedQuiz}/questions`, {
        text: newQuestion,
        options: newOptions,
        correctOption
      });
      setShowModal(false);
      fetchQuestions(selectedQuiz); // Refresh questions after adding
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  // ✅ Delete a question
  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/question/${id}`);
      setQuestions(questions.filter((q) => q.id !== id)); // Instantly remove from UI
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar /> {/* ✅ Sidebar added */}

      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Questions</h1>

        {/* ✅ Select Quiz */}
        <select onChange={(e) => fetchQuestions(e.target.value)} className="mb-4 p-2 border rounded">
          <option value="">Select a Quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
          ))}
        </select>

        {/* ✅ Add New Question Button */}
        {selectedQuiz && (
          <button
            onClick={() => setShowModal(true)}
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add New Question
          </button>
        )}

        {/* ✅ Display Questions */}
        {questions.length > 0 ? (
          questions.map((q) => (
            <div key={q.id} className="bg-gray-200 p-4 mt-2 rounded flex justify-between">
              <div>
                <p className="font-bold">{q.text}</p>
                <p className="text-sm">Options: {q.options.join(", ")}</p>
                <p className="text-sm font-semibold">Correct: {q.correct_option}</p>
              </div>
              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>

      {/* ✅ Modal for Creating New Question */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Question</h2>
            
            <input
              type="text"
              placeholder="Question"
              className="w-full p-2 border rounded mb-2"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />

            {newOptions.map((opt, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border rounded mb-2"
                value={opt}
                onChange={(e) => {
                  const updatedOptions = [...newOptions];
                  updatedOptions[index] = e.target.value;
                  setNewOptions(updatedOptions);
                }}
              />
            ))}

            <input
              type="text"
              placeholder="Correct Option"
              className="w-full p-2 border rounded mb-2"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
            />

            <button
              onClick={handleAddQuestion}
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

export default QuestionPage;
