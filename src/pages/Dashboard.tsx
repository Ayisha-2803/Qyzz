import React from "react";
import { motion } from "motion/react";
import { Trophy, Flame, Play, Clock, Award, Star, Sparkles, CheckCircle2, ChevronRight, Ban, Eye, LayoutDashboard, Database, Key } from "lucide-react";
import { mockDb } from "../lib/mockDb";
import { UserProfile, Quiz, DailyChallenge, Badge } from "../types";

interface DashboardProps {
  user: UserProfile;
  quizzes: Quiz[];
  attempts: any[];
  dailyChallenges: DailyChallenge[];
  onSelectQuiz: (quiz: Quiz) => void;
  onGoToLeaderboard: () => void;
  onGoToAnalytics: () => void;
  onGoToAdmin: () => void;
  onLogout: () => void;
}

export default function Dashboard({
  user,
  quizzes,
  attempts,
  dailyChallenges,
  onSelectQuiz,
  onGoToLeaderboard,
  onGoToAnalytics,
  onGoToAdmin,
  onLogout
}: DashboardProps) {
  const currentLevelProgress = user.xp % 100; // e.g. 150 -> 50%
  const allBadges = mockDb.getBadges();

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Upper Navigation Dashboard block header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass p-6 rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-16 h-16 rounded-2xl object-cover bg-white/5 border-2 border-indigo-400 shadow-inner"
              />
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold shadow-lg">
                Lvl {user.level}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Howdy, {user.username}!
              </h1>
              <p className="text-xs text-indigo-300 font-mono uppercase tracking-wider font-bold">
                Hold the streak flame high and rise.
              </p>
            </div>
          </div>

          {/* Quick-actions section */}
          <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto font-sans">
            <button
              id="dash-board-analytics"
              onClick={onGoToAnalytics}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              📊 Performance Tracker
            </button>
            <button
              id="dash-board-leaderboard"
              onClick={onGoToLeaderboard}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              🏆 Global Leaderboard
            </button>
            {user.isAdmin && (
              <button
                id="dash-board-admin"
                onClick={onGoToAdmin}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
              >
                ⚙️ Admin Center
              </button>
            )}
            <button
              id="dash-board-logout"
              onClick={onLogout}
              className="px-4 py-2 bg-red-955/25 bg-red-950/20 hover:bg-red-900/30 text-red-400 text-xs font-bold rounded-xl transition-all border border-red-500/10 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Gamified indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Level Progress tracker */}
          <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">XP Level Progression</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-indigo-400">{user.xp}</span>
                <span className="text-xs text-slate-400 font-semibold uppercase font-mono">Total XP</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span className="font-semibold">Level {user.level}</span>
                <span className="font-semibold">{currentLevelProgress}/100 XP</span>
              </div>
              <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-violet-400 h-full transition-all duration-500"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Indicator */}
          <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">Active Streak Flame</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-orange-400">{user.streak}</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase font-mono">Days Solid</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Flame className="w-6 h-6 fill-current streak-fire-glow" />
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mt-4">
              {user.streak > 1 
                ? "Excellent! You have standard cognitive momentum. Learn daily to persist multiplier stakes!"
                : "Assure yourself a slot daily on Qyzz workspace to compound retention speeds."}
            </p>
          </div>

          {/* Quick Metrics summary stats */}
          <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl grid grid-cols-2 gap-4 font-sans">
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center">
              <span className="text-[10px] font-mono uppercase text-slate-400">Completed</span>
              <span className="text-2xl font-bold mt-1 text-white">{user.quizzesPlayed}</span>
              <span className="text-[9px] text-slate-400 mt-1">assessments</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center">
              <span className="text-[10px] font-mono uppercase text-slate-400">Zenith Score</span>
              <span className="text-2xl font-bold mt-1 text-emerald-405 text-emerald-400">{user.highestScore}%</span>
              <span className="text-[9px] text-slate-400 mt-1">highest accuracy</span>
            </div>
          </div>
        </div>

        {/* Categories Grid (Left) / Achievements (Right) layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Challenge Quizzes Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Available Assessments
              </h2>
              <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-350 text-indigo-300 font-mono px-2 py-1 rounded-md">
                {quizzes.length} challenges active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((qz, idx) => {
                const isPlayed = user.completedQuizIds.includes(qz.id);
                return (
                  <div
                    key={qz.id}
                    className="group relative glass border border-white/5 p-6 rounded-[24px] shadow-2xl hover:border-indigo-500/30 hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge / info top lines */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded-md text-slate-400 font-bold">
                          {qz.category}
                        </span>
                        {isPlayed && (
                          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                            Solved
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">
                        {qz.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {qz.description}
                      </p>
                    </div>

                    {/* Metadata indicators summary */}
                    <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs">
                      <div className="flex gap-4 text-slate-400 font-medium font-sans">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {Math.floor(qz.duration / 60)}m
                        </span>
                        <span className="flex items-center gap-1 text-orange-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          +{qz.xpReward} XP
                        </span>
                      </div>
                      <button
                        id={`qz-play-btn-${idx}`}
                        onClick={() => onSelectQuiz(qz)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      >
                        Play <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Checklist Sidebar */}
          <div className="space-y-6">
            
            {/* Daily Challenges */}
            <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" /> Daily Challenges
              </h2>
              
              <div className="space-y-3">
                {dailyChallenges.map((ch, i) => (
                  <div
                    key={i}
                    className="p-3.5 border border-white/5 rounded-2xl bg-white/5 flex gap-3 items-start"
                  >
                    <div className="mt-0.5 text-zinc-400">
                      {ch.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/10" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-dashed border-white/20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-relaxed truncate text-white">
                        {ch.text}
                      </p>
                      
                      {/* Compact Progress gauge */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-500 h-full"
                            style={{ width: `${Math.min(100, (ch.current / ch.target) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 font-bold">
                          {ch.current}/{ch.target}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badges catalog */}
            <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" /> Mastery Badges
              </h2>

              <div className="grid grid-cols-2 gap-3.5">
                {allBadges.map((bd) => {
                  const isUnlocked = user.unlockedBadgeIds.includes(bd.id);
                  return (
                    <div
                      key={bd.id}
                      className={`p-3 border rounded-2xl flex flex-col items-center text-center transition-all duration-300 ${
                        isUnlocked
                          ? "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/5 text-slate-100"
                          : "border-white/5 bg-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                        isUnlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-500"
                      }`}>
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold leading-tight block text-white">{bd.name}</span>
                      <span className="text-[9px] text-slate-500 mt-1 line-clamp-1">{bd.requirement}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
