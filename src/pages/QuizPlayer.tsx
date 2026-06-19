import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, AlertTriangle, Play } from "lucide-react";
import { Quiz, Question } from "../types";

interface QuizPlayerProps {
  quiz: Quiz;
  onFinish: (answers: { [qId: string]: string }, timeTaken: number) => void;
  onExit: () => void;
}

export default function QuizPlayer({ quiz, onFinish, onExit }: QuizPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(quiz.duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-submit countdown interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAutoSubmit = () => {
    onFinish(selectedAnswers, quiz.duration);
  };

  const handleSelectOption = (questionId: string, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const currentQuestion = quiz.questions[currentIdx] || null;
  const isLastQuestion = currentIdx === quiz.questions.length - 1;

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed, invoke final calculation
      const timeTaken = quiz.duration - timeLeft;
      onFinish(selectedAnswers, timeTaken);
    }
  };

  // Convert seconds to readable mm:ss format
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercentage = ((currentIdx + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 flex flex-col justify-between font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      {/* Top Bar Workspace Navigation */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between glass border border-white/5 p-4 rounded-2xl shadow-2xl relative z-10">
        <button
          id="quiz-player-exit-btn"
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 tracking-wider uppercase transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Abandon Quiz
        </button>

        <h2 className="text-sm font-black hidden sm:block font-mono tracking-wider max-w-xs truncate text-indigo-300">
          {quiz.title.toUpperCase()}
        </h2>

        {/* Dynamic timer display */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-sm font-bold border transition-colors ${
          timeLeft <= 15
            ? "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
            : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Question Panel */}
      <div className="max-w-2xl w-full mx-auto my-8 flex-grow flex flex-col justify-center relative z-10">
        {currentQuestion ? (
          <div className="space-y-6">
            
            {/* Visual Progress ring line */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>QUESTION {currentIdx + 1} OF {quiz.questions.length}</span>
                <span>{Math.round(progressPercentage)}% COMPLETE</span>
              </div>
              <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-violet-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Question Card Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass border border-white/5 p-8 rounded-[32px] shadow-2xl relative overflow-hidden min-h-[320px] flex flex-col justify-between"
              >
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Question body text */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-snug text-white">
                    {currentQuestion.text}
                  </h3>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-3.5 mt-8">
                  {currentQuestion.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === opt;
                    return (
                      <button
                        key={oIdx}
                        id={`opt-btn-${currentIdx}-${oIdx}`}
                        onClick={() => handleSelectOption(currentQuestion.id, opt)}
                        className={`w-full p-4.5 rounded-2xl text-left text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/50 shadow-lg translate-y-[-1px]"
                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-350"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-mono leading-none ${
                            isSelected
                              ? "border-indigo-400 bg-indigo-500 text-white"
                              : "border-white/20 text-slate-400"
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </div>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center p-8 glass border border-white/5 rounded-3xl">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto animate-bounce" />
            <h2 className="text-lg font-bold mt-3">Curating Module Failed</h2>
            <p className="text-sm text-slate-400 mt-2">Questions array is currently empty or undefined.</p>
          </div>
        )}
      </div>

      {/* Bottom Nav Buttons bar */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between mt-auto relative z-10">
        <button
          id="quiz-prev-btn"
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`px-5 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            currentIdx === 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <button
          id="quiz-next-btn"
          onClick={handleNext}
          className="px-6 py-3.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-indigo-500/25 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          {isLastQuestion ? (
            <>Finish Assessment <ShieldCheck className="w-4 h-4 fill-current" /></>
          ) : (
            <>Next Question <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

    </div>
  );
}
