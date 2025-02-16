import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

const QuizPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/quiz/${id}/questions`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAnswer = (selectedOption) => {
    console.log("Selected Answer:", selectedOption);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} handleAnswer={handleAnswer} />
      ))}
    </div>
  );
};

export default QuizPage;
