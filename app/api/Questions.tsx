import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Question.css"
import Result from "./Result"

interface Question{
  question:string
  correct:string
  incorrect: string[]
}
// Questions.tsx
const Questions = ({ reloadFlag }: { reloadFlag: number }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correct, setCorrect]=useState(0)
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished]=useState(false)
const fetchQuestions = async () => {
  if (loading) return;
  setLoading(true);
  try {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple"
    );
    setQuestions(res.data.results);
    setIndexQuestion(0);
    setCorrect(0);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // Fetch delle domande al montaggio e quando cambia reloadFlag
  useEffect(() => {
    fetchQuestions();
  }, [reloadFlag]);

  useEffect(() => {
    if (!questions.length) return;
    if(!(indexQuestion>=20)){
      const current = questions[indexQuestion];
      setQuestion(current.question);
      setAnswers([...current.incorrect_answers, current.correct_answer].sort(() => Math.random() - 0.5));
    }
  }, [questions, indexQuestion]);

  const decodeHTML = (html: string) => {
    const parser = new DOMParser();
    const decoded = parser.parseFromString(html, "text/html");
    return decoded.documentElement.textContent || "";
  };

  const handleAnswer=(ans:string)=>{
    if(ans===questions[indexQuestion].correct_answer){
      setCorrect(prev=>prev+1)
    }
    if(indexQuestion+1>=20){
      setIsFinished(true)
    }else{
      setIndexQuestion(prev=>prev+1)
    }
  }
  return (
     <div className="quiz-container">
      
      {
        isFinished ? (
          <Result correct={correct} />
        ) : (
          <div>
            <div>{indexQuestion}/20</div>
            <div className="question-box">{decodeHTML(question)}</div>
            <ul className="answers-list">
              {answers.map((ans, idx) => (
                <li
                  key={idx}
                  className="answer-item"
                  onClick={() => handleAnswer(ans)}
                >
                  {decodeHTML(ans)}
                </li>
              ))}
            </ul>
          </div>
        )
      }
</div>
)}



export default Questions