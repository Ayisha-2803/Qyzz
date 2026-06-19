import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import { mockDb } from "./lib/mockDb";
import { Quiz, UserProfile, QuizAttempt, DailyChallenge } from "./types";

// Page Components
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import QuizPlayer from "./pages/QuizPlayer";
import ResultsPage from "./pages/ResultsPage";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";
import Certificate from "./components/Certificate";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [currentView, setCurrentView] = useState<
    "landing" | "auth" | "dashboard" | "playing" | "results" | "leaderboard" | "analytics" | "admin" | "certificate"
  >("landing");

  // Authentication Redirect Mode ('login' or 'signup')
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Activated Quiz context
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeAttempt, setActiveAttempt] = useState<QuizAttempt | null>(null);

  // Sync state initially
  useEffect(() => {
    // Check if user is logged in
    const active = mockDb.getCurrentUser();
    if (active) {
      setCurrentUser(active);
      setCurrentView("dashboard");
    }

    // Load active quizzes and daily challenges
    setQuizzes(mockDb.getQuizzes());
    setDailyChallenges(mockDb.getDailyChallenges());
  }, []);

  // Soft refresh callbacks
  const handleRefreshQuizzes = () => {
    setQuizzes(mockDb.getQuizzes());
  };

  const handleSelectQuiz = (quiz: Quiz) => {
    if (!currentUser) {
      toast.error("Please sign in or create an account to start playing!");
      setAuthMode("login");
      setCurrentView("auth");
      return;
    }

    if (quiz.questions.length === 0) {
      toast.error("This quiz currently lacks valid questions.");
      return;
    }

    setActiveQuiz(quiz);
    setCurrentView("playing");
  };

  // Main Quiz calculation and persistence workflow
  const handleQuizFinished = (answers: { [qId: string]: string }, timeTaken: number) => {
    if (!currentUser || !activeQuiz) return;

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      const selected = answers[q.id] || "";
      if (selected.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount += 1;
      }
    });

    const totalQuestions = activeQuiz.questions.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Proportional XP Formula matching difficulty and accuracy!
    const baseReward = activeQuiz.xpReward;
    const xpEarned = Math.round((accuracy / 100) * baseReward);

    try {
      const attemptData = mockDb.addAttempt(currentUser.uid, {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        category: activeQuiz.category,
        score: correctCount,
        totalQuestions,
        correctAnswers: correctCount,
        xpEarned,
        duration: timeTaken,
        accuracy
      });

      // Reload updated student context
      const freshUser = mockDb.getCurrentUser();
      setCurrentUser(freshUser);

      // Refresh challenges panel metrics
      setDailyChallenges(mockDb.getDailyChallenges());

      // Set attempt results contextual packet
      setActiveAttempt(attemptData);
      setCurrentView("results");
    } catch (err: any) {
      toast.error("Telemetry failed to save: " + (err.message || String(err)));
    }
  };

  const handleLogout = () => {
    mockDb.logout();
    setCurrentUser(null);
    setCurrentView("landing");
    toast.success("Signed out! Keep learning.");
  };

  // Navigation handlers
  const handleAuthSuccess = (userProfile: UserProfile) => {
    setCurrentUser(userProfile);
    setQuizzes(mockDb.getQuizzes());
    setDailyChallenges(mockDb.getDailyChallenges());
    setCurrentView("dashboard");
  };

  const handleGoToAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setCurrentView("auth");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Toast Notification Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Main Pages Conditional Router with Page Transitions */}
      <AnimatePresence mode="wait">
        
        {currentView === "landing" && (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <LandingPage
              onStart={() => {
                if (currentUser) {
                  setCurrentView("dashboard");
                } else {
                  setAuthMode("signup");
                  setCurrentView("auth");
                }
              }}
              onGoToAuth={handleGoToAuth}
              userLoggedIn={!!currentUser}
            />
          </motion.div>
        )}

        {currentView === "auth" && (
          <motion.div
            key="auth-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <AuthPage
              initialMode={authMode}
              onSuccess={handleAuthSuccess}
              onBack={() => {
                setCurrentView(currentUser ? "dashboard" : "landing");
              }}
            />
          </motion.div>
        )}

        {currentView === "dashboard" && currentUser && (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Dashboard
              user={currentUser}
              quizzes={quizzes}
              attempts={mockDb.getAttempts(currentUser.uid)}
              dailyChallenges={dailyChallenges}
              onSelectQuiz={handleSelectQuiz}
              onGoToLeaderboard={() => setCurrentView("leaderboard")}
              onGoToAnalytics={() => setCurrentView("analytics")}
              onGoToAdmin={() => setCurrentView("admin")}
              onLogout={handleLogout}
            />
          </motion.div>
        )}

        {currentView === "playing" && activeQuiz && (
          <motion.div
            key="playing-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <QuizPlayer
              quiz={activeQuiz}
              onExit={() => {
                setCurrentView("dashboard");
                setActiveQuiz(null);
              }}
              onFinish={handleQuizFinished}
            />
          </motion.div>
        )}

        {currentView === "results" && activeQuiz && activeAttempt && (
          <motion.div
            key="results-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <ResultsPage
              quiz={activeQuiz}
              attempt={activeAttempt}
              onRetry={() => {
                handleSelectQuiz(activeQuiz);
              }}
              onGoToDashboard={() => {
                setCurrentView("dashboard");
                setActiveQuiz(null);
                setActiveAttempt(null);
              }}
              onViewCertificate={() => {
                setCurrentView("certificate");
              }}
            />
          </motion.div>
        )}

        {currentView === "leaderboard" && currentUser && (
          <motion.div
            key="leaderboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full"
          >
            <Leaderboard
              currentUserId={currentUser.uid}
              users={mockDb.getLeaderboard()}
              onBack={() => setCurrentView("dashboard")}
            />
          </motion.div>
        )}

        {currentView === "analytics" && currentUser && (
          <motion.div
            key="analytics-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Analytics
              user={currentUser}
              attempts={mockDb.getAttempts(currentUser.uid)}
              onBack={() => setCurrentView("dashboard")}
            />
          </motion.div>
        )}

        {currentView === "admin" && currentUser && (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <AdminDashboard
              quizzes={quizzes}
              onBack={() => setCurrentView("dashboard")}
              onRefreshQuizzes={handleRefreshQuizzes}
            />
          </motion.div>
        )}

        {currentView === "certificate" && currentUser && activeAttempt && (
          <motion.div
            key="certificate-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            <Certificate
              attempt={activeAttempt}
              user={currentUser}
              onBack={() => {
                setCurrentView("dashboard");
                setActiveQuiz(null);
                setActiveAttempt(null);
              }}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
