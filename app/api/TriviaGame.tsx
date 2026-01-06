'use client';

import React, { useState, useCallback, useEffect } from 'react';
import NewGame from '@/app/api/NewGame';

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
};

type GameState = {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  showResult: boolean;
  isCorrect: boolean | null;
  isLoading: boolean;
  error: string | null;
};

function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export default function TriviaGame() {
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    showResult: false,
    isCorrect: null,
    isLoading: false,
    error: null,
  });
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const fetchQuestions = useCallback(async () => {
    setGameState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/questions?amount=10&difficulty=medium');
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      
      if (data.response_code !== 0 || !data.results) {
        throw new Error('No questions available');
      }
      
      setGameState(prev => ({
        ...prev,
        questions: data.results,
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        showResult: false,
        isCorrect: null,
        isLoading: false,
      }));
    } catch (err) {
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load questions',
      }));
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Shuffle answers when question changes
  useEffect(() => {
    if (gameState.questions.length > 0 && gameState.currentQuestionIndex < gameState.questions.length) {
      const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
      if (currentQuestion) {
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
          .sort(() => Math.random() - 0.5);
        setShuffledAnswers(answers);
      }
    }
  }, [gameState.currentQuestionIndex, gameState.questions]);

  const handleAnswerSelect = (answer: string) => {
    if (gameState.showResult) return;
    
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showResult: true,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNextQuestion = () => {
    if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false,
        isCorrect: null,
      }));
    } else {
      // Game finished
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.questions.length,
      }));
    }
  };

  const handleNewGame = () => {
    fetchQuestions();
  };

  if (gameState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gray-300">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (gameState.error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <p className="text-xl text-red-400">{gameState.error}</p>
          <button
            onClick={handleNewGame}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (gameState.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <button
          onClick={handleNewGame}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Start Game
        </button>
      </div>
    );
  }

  // Game finished
  if (gameState.currentQuestionIndex >= gameState.questions.length) {
    const percentage = Math.round((gameState.score / gameState.questions.length) * 100);
    
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-8">
        <div className="text-center space-y-6 p-6 md:p-10 lg:p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl shadow-2xl max-w-lg w-full mx-4">
          <div className="text-5xl md:text-6xl lg:text-7xl mb-4">🎉</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Game Complete!</h2>
          <div className="space-y-3 md:space-y-4">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 break-words">
              Score: <span className="text-purple-400 font-bold">{gameState.score}</span> / <span className="text-white">{gameState.questions.length}</span>
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 break-words">
              Accuracy: <span className="text-pink-400 font-bold">{percentage}%</span>
            </p>
          </div>
          <button
            onClick={handleNewGame}
            className="px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl md:rounded-2xl font-bold text-lg md:text-xl lg:text-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg mt-6 w-full"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const progress = ((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100;

  return (
    <div className="flex items-start justify-center w-full py-4 md:py-6">
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2 md:mb-3">
            <span className="text-sm md:text-base lg:text-lg font-semibold text-gray-400">
              Question {gameState.currentQuestionIndex + 1} of {gameState.questions.length}
            </span>
            <span className="text-sm md:text-base lg:text-lg font-semibold text-purple-400">
              Score: {gameState.score}
            </span>
          </div>
          <div className="w-full h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 xl:p-14 shadow-2xl mb-6">
          <div className="mb-6 md:mb-8">
            <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-purple-600/30 text-purple-300 text-xs md:text-sm font-semibold rounded-full mb-4">
              {currentQuestion.category} • {currentQuestion.difficulty}
            </span>
          </div>
          
          <h2 className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-relaxed break-words ${gameState.showResult ? 'mb-6 md:mb-8' : 'mb-8 md:mb-10'}`}>
            {decodeHtml(currentQuestion.question)}
          </h2>

          {/* Answers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            {shuffledAnswers.map((answer, index) => {
              const isSelected = gameState.selectedAnswer === answer;
              const isCorrect = answer === currentQuestion.correct_answer;
              const showCorrect = gameState.showResult && isCorrect;
              const showIncorrect = gameState.showResult && isSelected && !isCorrect;

              let buttonClass = "p-5 md:p-6 lg:p-7 rounded-xl md:rounded-2xl font-semibold text-left transition-all transform hover:scale-105 text-sm md:text-base lg:text-lg ";
              
              if (gameState.showResult) {
                if (showCorrect) {
                  buttonClass += "bg-green-500/30 border-2 border-green-500 text-green-300";
                } else if (showIncorrect) {
                  buttonClass += "bg-red-500/30 border-2 border-red-500 text-red-300";
                } else {
                  buttonClass += "bg-gray-800/50 border border-gray-700 text-gray-400 opacity-60";
                }
              } else {
                buttonClass += "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400/50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={gameState.showResult}
                  className={buttonClass}
                >
                  <span className="flex items-center break-words">
                    <span className="mr-3 text-lg md:text-xl lg:text-2xl flex-shrink-0">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="break-words">{decodeHtml(answer)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Message and Next Button - Reserved space to prevent layout shift */}
          <div className="mt-6 md:mt-8 min-h-[140px] md:min-h-[160px]">
            {gameState.showResult && (
              <div className="space-y-4">
                <div className={`p-4 md:p-5 rounded-xl ${
                  gameState.isCorrect 
                    ? 'bg-green-500/20 border border-green-500/50' 
                    : 'bg-red-500/20 border border-red-500/50'
                }`}>
                  <p className={`text-base md:text-lg font-semibold break-words ${
                    gameState.isCorrect ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {gameState.isCorrect ? '✓ Correct!' : `✗ Incorrect. The correct answer was: ${decodeHtml(currentQuestion.correct_answer)}`}
                  </p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="w-full px-6 py-3 md:px-8 cursor-pointer md:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {gameState.currentQuestionIndex < gameState.questions.length - 1 
                    ? 'Next Question' 
                    : 'Finish Game'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* New Game Button */}
        <div className="w-full">
          <NewGame onStartNewGame={handleNewGame} />
        </div>
      </div>
    </div>
  );
}
