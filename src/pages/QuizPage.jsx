import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

const API_BASE_URL = "https://quizo-backend-production.up.railway.app";

const QuizPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API_BASE_URL}/quiz/${id}/questions`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Try again later.");
        setLoading(false);
      });
  }, [id]);

  const handleAnswer = (selectedOption) => {
    console.log("Selected Answer:", selectedOption);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>

      {loading && <p>Loading questions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionCard key={question.id} question={question} handleAnswer={handleAnswer} />
        ))
      ) : (
        !loading && <p>No questions available for this quiz.</p>
      )}
    </div>
  );
};

export default QuizPage;
