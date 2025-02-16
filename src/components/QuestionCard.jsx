const QuestionCard = ({ question, handleAnswer }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{question.text}</h3>
      {question.options.map((option, index) => (
        <button
          key={index}
          className="block w-full p-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
