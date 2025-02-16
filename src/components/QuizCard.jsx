import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{quiz.title}</h2>
      <p className="text-sm">{quiz.description}</p>
      <Link to={`/quiz/${quiz.id}`} className="text-blue-500 hover:underline">
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;
