import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Trophy, Award, RefreshCw, LayoutDashboard, Check, X, ShieldCheck, HelpCircle, Flame, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { Quiz, QuizAttempt } from "../types";

interface ResultsPageProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry: () => void;
  onGoToDashboard: () => void;
  onViewCertificate: () => void;
}

export default function ResultsPage({
  quiz,
  attempt,
  onRetry,
  onGoToDashboard,
  onViewCertificate
}: ResultsPageProps) {
  const [showCeremony, setShowCeremony] = useState(false);

  useEffect(() => {
    // Fire double burst confetti celebration
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from left and right boundaries
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Custom motivational banner statements
  const getMotivationalMessage = () => {
    if (attempt.accuracy === 100) {
      return {
        title: "Flawless Masterclass!",
        desc: "You answered every single challenge with absolute speed and perfection."
      };
    } else if (attempt.accuracy >= 80) {
      return {
        title: "Spectacular Finesse!",
        desc: "An elite score reflecting extraordinary high accuracy and focus."
      };
    } else if (attempt.accuracy >= 50) {
      return {
        title: "Credible Progression!",
        desc: "A solid performance! Boost your speed slightly to unlock the gold certificate."
      };
    } else {
      return {
        title: "Persevere & Conquer",
        desc: "Scholastic trials are solved through study. Re-queue elements to improve!"
      };
    }
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 flex flex-col justify-center items-center font-sans relative overflow-x-hidden">
      
      {/* Decorative aurora visual backdrop */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl glass border border-white/5 rounded-[36px] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden z-10"
      >
        {/* Certificate unlocked golden shine */}
        {attempt.accuracy >= 80 && (
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 border-2 border-dashed border-amber-500/20 rounded-full animate-spin-slow pointer-events-none" />
        )}

        {/* Shiny Trophy presentation */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className={`w-24 h-24 rounded-full flex items-center justify-center ${
              attempt.accuracy >= 80 
                ? "bg-amber-500/10 text-amber-400 border border-amber-550/20" 
                : "bg-indigo-500/10 text-indigo-400 border border-indigo-550/20"
            }`}
          >
            <Trophy className="w-12 h-12" />
          </motion.div>
        </div>

        {/* Success levels titles */}
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
          ASSESSMENT COMPLETED SUCCESSFULLY
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
          {motivation.title}
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
          {motivation.desc}
        </p>

        {/* Core telemetry widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block font-bold">Accuracy</span>
            <span className="text-2xl font-black text-indigo-400 mt-1 block font-mono">
              {attempt.accuracy}%
            </span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block font-bold">XP Reward</span>
            <span className="text-2xl font-black text-orange-400 mt-1 block flex items-center justify-center gap-1 font-mono">
              +{attempt.xpEarned} <Star className="w-5 h-5 fill-current" />
            </span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block font-bold">Correct</span>
            <span className="text-lg font-bold text-emerald-400 mt-1.5 block flex items-center justify-center gap-1 font-mono">
              <Check className="w-4 h-4 stroke-[3]" /> {attempt.correctAnswers} / {attempt.totalQuestions}
            </span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block font-bold">Duration</span>
            <span className="text-2xl font-bold mt-1 block font-mono text-white">
              {attempt.duration}s
            </span>
          </div>

        </div>

        {/* Big Certificate unlocking offer */}
        {attempt.accuracy >= 80 ? (
          <div className="mb-8 p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 text-left">
            <div>
              <h3 className="text-sm font-bold text-amber-405 text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Golden Certificate Unlocked!
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                You passed with flying colors! Your official certification has been logged.
              </p>
            </div>
            <button
              id="result-view-cert-btn"
              onClick={onViewCertificate}
              className="w-full md:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-450 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer uppercase tracking-wider block text-center"
            >
              Generate Certificate
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic mb-8">
            * Complete this quiz at 80% or greater accuracy to gain your Master Credentials certificate.
          </p>
        )}

        {/* Action Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="result-retry-btn"
            onClick={onRetry}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-2xl border border-white/10 transition-all duration-200 cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retry Test
          </button>

          <button
            id="result-exit-dashboard"
            onClick={onGoToDashboard}
            className="w-full sm:w-auto px-7 py-3.5 bg-indigo-650 bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-2xl shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" /> Exit to Dashboard
          </button>
        </div>

      </motion.div>
    </div>
  );
}
