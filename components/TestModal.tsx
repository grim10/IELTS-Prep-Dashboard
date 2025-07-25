import React, { useState, useEffect } from 'react';
import { quizData } from '../constants';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
      setShowResult(false);
      setScore(0);
      setTestStarted(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit
      let currentScore = 0;
      quizData.forEach((question, index) => {
        if (question.correctAnswer === selectedAnswers[index]) {
          currentScore++;
        }
      });
      setScore(currentScore);
      setShowResult(true);
    }
  };
  
  const startTest = () => {
    setTestStarted(true);
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const passed = score >= (quizData.length * 0.75); // Passed if score is 75% or higher (4 or 5 for 5 questions)

  const renderIntro = () => (
    <div className="p-8 text-center flex flex-col items-center justify-center flex-grow">
      <span className="text-5xl mb-4">📝</span>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">The First Step to Your Discount</h3>
      <p className="text-slate-600 mb-6 max-w-md">
        Our short qualifying test ensures a high-quality learning environment for all our students. Passing unlocks your 75% discount and shows you're ready to succeed. Good luck!
      </p>
      <button onClick={startTest} className="w-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105">
        Start Qualifying Test
      </button>
    </div>
  );

  const renderQuiz = () => (
    <div className="flex flex-col flex-grow">
      <div className="p-6 flex-grow">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Qualifying Test: Question {currentQuestionIndex + 1}/{quizData.length}</h3>
        <p className="text-xl text-slate-900 mb-6">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300' : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-slate-100 p-4 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]}
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-2 px-8 rounded-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < quizData.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="p-8 text-center flex flex-col items-center justify-center flex-grow">
      {passed ? (
        <>
          <span className="text-6xl mb-4">🎉</span>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Congratulations! You Passed!</h3>
          <p className="text-slate-700 mb-1">Your Score: {score}/{quizData.length}</p>
          <p className="text-slate-600 mb-6 max-w-sm">
            You've unlocked the 75% discount!
            <br/>
            <strong className="text-amber-700">You have 48 hours to claim this offer.</strong> Click below to enroll and get your batch joining link on WhatsApp.
          </p>
          <a href="#" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300 shadow-lg animate-pulse-subtle">
            Enroll & Get WA Link
          </a>
        </>
      ) : (
        <>
          <span className="text-6xl mb-4">😔</span>
          <h3 className="text-2xl font-bold text-red-600 mb-2">Don't Give Up Yet!</h3>
           <p className="text-slate-700 mb-1">Your Score: {score}/{quizData.length}</p>
          <p className="text-slate-600 mb-6 max-w-sm">You're just a step away. Many top scorers start here. To help, we invite you to our free expert-led weekly webinar to get the tips you need. Attend two sessions and you can retry the test!</p>
          <div className="w-full space-y-3">
             <a href="#" className="w-full block bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105">
                Register for Free Webinar
            </a>
            <button onClick={onClose} className="w-full bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition duration-300">
                Close
            </button>
          </div>
        </>
      )}
    </div>
  );
  
  const renderContent = () => {
      if (showResult) return renderResult();
      if (testStarted) return renderQuiz();
      return renderIntro();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden flex flex-col" style={{minHeight: '450px', maxHeight: '90vh'}} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">Shiksha: Qualifying Test</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default TestModal;