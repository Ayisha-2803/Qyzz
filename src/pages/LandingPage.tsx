import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Trophy, Flame, Users, BookOpen, Star, HelpCircle, ChevronDown, Award, Zap } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import CognitiveAstroOrb from "../components/CognitiveAstroOrb";

interface LandingPageProps {
  onStart: () => void;
  onGoToAuth: (mode: "login" | "signup") => void;
  userLoggedIn: boolean;
}

export default function LandingPage({ onStart, onGoToAuth, userLoggedIn }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      title: "AI-Powered Generation",
      description: "Harness the power of Gemini to craft tailored questions instantly. Simply input any subject or topic, and watch your quiz emerge."
    },
    {
      icon: <Flame className="w-6 h-6 text-orange-500 animate-pulse" />,
      title: "Duolingo Gamification",
      description: "Maintain daily streaks, score massive XP multipliers, climb leagues, and unlock limited-edition achievements as you study."
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      title: "Global Leaderboards",
      description: "Compete in live leagues with students worldwide. Prove your mastery on modern topics and rise to the Champion podium."
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: "Official Certificates",
      description: "Receive beautiful, authenticated Qyzz digital credentials automatically when scoring 80% or higher. Perfect for portfolios."
    }
  ];

  const stats = [
    { number: "240k+", label: "Active Cohorts" },
    { number: "1.2M+", label: "AI Quizzes Handled" },
    { number: "98.4%", label: "Accuracy Improvements" },
    { number: "180+", label: "Geographical Leagues" }
  ];

  const faqs = [
    {
      q: "How does the AI quiz builder operate?",
      a: "Our system integrates the advanced Google Gemini model server-side. It structures custom interactive quizzes based on your custom topic with comprehensive answer validations and timers."
    },
    {
      q: "Is Qyzz entirely offline-friendly?",
      a: "Our platforms persist state and session profiles locally, but AI quiz generation leverages server pipelines, meaning you will need active connectivity to generate new content."
    },
    {
      q: "How can I obtain an official gold certificate?",
      a: "Complete any designated preset or custom quiz challenge. If your aggregate accuracy is 80% or above, the gold certificate is unlocked instantly next to your attempt history."
    },
    {
      q: "Is there a premium tier for administrators?",
      a: "Creating, deleting, and editing custom quizzes is accessible for all verified user roles with clean administrative dashboards available."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 transition-colors duration-300 font-sans relative overflow-x-hidden">
      {/* Ambient background aurora effect */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      {/* Styled Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-[#050508]/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-400 flex items-center justify-center text-white font-bold tracking-tight shadow-lg shadow-indigo-500/20">
              Q
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Qyzz <span className="text-indigo-400 font-mono text-xs">v1.2</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {userLoggedIn ? (
              <button
                id="nav-dash-link"
                onClick={onStart}
                className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-650/30 transition-all duration-200 cursor-pointer"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  id="nav-login"
                  onClick={() => onGoToAuth("login")}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="nav-signup"
                  onClick={() => onGoToAuth("signup")}
                  className="hidden sm:inline-block px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-black text-sm font-bold transition-all duration-200 shadow-md cursor-pointer"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs font-mono font-bold tracking-wide"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <Zap className="w-3.5 h-3.5" /> ULTIMATE COGNITIVE PRACTICE ARENA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.05]"
            >
              <span className="text-gradient">Learn. Play.</span><br />
              <span className="text-indigo-400">
                Rise Scholar.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              An elegant gamified assessment experience styled to absolute precision. Test your cognitive bounds, accumulate XP multipliers, hold the streak flame active, and earn gold certificates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-play-now"
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-550 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/35 hover:translate-y-[-2px] transition-all duration-300 cursor-pointer"
              >
                Start Assessing Now
              </button>
              <a
                id="hero-features-scroll"
                href="#features-section"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-white glass hover:bg-white/5 font-semibold text-sm transition-colors duration-200 text-center cursor-pointer uppercase tracking-wider"
              >
                Explore Features
              </a>
            </motion.div>
          </div>

          {/* Hero Right Visuals (CognitiveAstroOrb) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="lg:col-span-5 flex justify-center"
          >
            <CognitiveAstroOrb />
          </motion.div>

        </div>
      </section>

      {/* Stats Board */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((st, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-4xl font-extrabold text-indigo-400">{st.number}</span>
                <span className="text-sm text-slate-400 mt-2 font-medium">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Bento Grid Features */}
      <section id="features-section" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              SaaS Level Game Mechanics
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Engineered with modern elements from top consumer products. Designed back-to-front with visual finesse.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-8 rounded-3xl glass border border-white/5 hover:border-indigo-500/20 shadow-lg hover:shadow-indigo-500/5 hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 flex-grow">{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 px-4 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Frequently Asked Inquiries</h2>
            <p className="text-sm text-slate-400 mt-2">Clear, straightforward explanations on Qyzz rules and features</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 glass p-5 transition-all duration-300"
                >
                  <button
                    id={`faq-btn-${idx}`}
                    className="w-full flex justify-between items-center text-left font-semibold text-lg cursor-pointer text-white"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section container */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[36px] bg-gradient-to-tr from-indigo-900/60 via-indigo-950/40 to-neutral-950/20 p-12 text-center text-white relative shadow-2xl border border-white/5 glass">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-4xl font-extrabold mb-4 text-gradient">Ready to rise up?</h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">
            Harness your limits, keep active daily learning streaks, and master world-class quizzes natively.
          </p>
          <button
            id="cta-start-btn"
            onClick={onStart}
            className="px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] cursor-pointer"
          >
            Launch Free Now
          </button>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="border-t border-white/5 bg-[#050508] py-12 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xs tracking-tight">
              Q
            </div>
            <span className="text-sm font-bold text-white">Qyzz Platform</span>
          </div>
          <p className="text-xs">&copy; 2026 Qyzz Labs Inc. All intellectual assets protected.</p>
        </div>
      </footer>
    </div>
  );
}
