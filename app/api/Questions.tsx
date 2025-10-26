import React, { useEffect, useState } from 'react';

function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type QuestionsProps = {
  reloadFlag: number;
};

const Questions: React.FC<QuestionsProps> = ({ reloadFlag }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setError(null);
      setCurrentIndex(0);
      setUserAnswers([]);
      setShowResults(false);

      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple'
        );

        if (!response.ok) throw new Error('HTTP error: ' + response.status);

        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error('Unexpected data format');
        }

        setQuestions(data.results);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Errore nel caricamento delle domande');
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, [reloadFlag]);

  const handleAnswer = (answer: string) => {
    setUserAnswers((prev) => [...prev, answer]);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRisultati = () => {
    const correctCount = userAnswers.filter(
      (answer, index) => answer === questions[index].correct_answer
    ).length;
    alert(`you answered correcty ${correctCount}/${questions.length} question.`);
  };
  while(isLoading || questions.length === 0){
    return 
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const question = questions[currentIndex];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="p-6">
      {showResults ? (
        <div className="text-center text-xl font-semibold text-white-600">
          you answered correcty to {' '}
          {userAnswers.filter(
            (a, i) => a === questions[i].correct_answer
          ).length}{' '}
          /{questions.length} questions!
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              NEW GAME
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 bg-zinc-100 shadow-md rounded-lg text-gray-700">
            <div className="font-bold text-lg mb-2">
              {decodeHtml(question.question)}
            </div>
            <div className="mb-2">Opzioni:</div>
            <ul className="list-disc pl-5 space-y-1">
              {answers.map((answer, i) => (
                <li
                  key={i}
                  className="text-gray-600 cursor-pointer hover:underline"
                  onClick={() => handleAnswer(answer)}
                >
                  {decodeHtml(answer)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-right">
            {currentIndex === questions.length - 1 && (
              <button
                onClick={handleRisultati}
              >
                see results
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;
