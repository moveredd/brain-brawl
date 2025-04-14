'use client';

import React, { useEffect, useState } from 'react';


export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple'
        );

        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(Array.isArray(data.results) ? data.results : []);

      } catch (err) {
        setError('Reloading too fast!');
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error){
    return <div className='text-red-500'>{error}</div>
  }

  return (
    <ul className="space-y-4 p-4">
      {questions.map((question, index) => (
        <li
          key={index}
          className="p-4 bg-zinc-100 shadow-md rounded-lg text-gray-700"
        >
          <div className="font-bold">{question.question}</div>
          <div>Options:</div>
          <ul className="list-disc pl-5">
            {[...question.incorrect_answers, question.correct_answer].map(
              (answer, i) => (
                <li key={i} className="text-gray-600">
                  {answer}
                </li>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
}
