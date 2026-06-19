import React from "react";
import { motion } from "motion/react";
import { Trophy, ArrowLeft, Award, Flame, User, Crown, Star } from "lucide-react";
import { UserProfile } from "../types";

interface LeaderboardProps {
  currentUserId: string;
  users: UserProfile[];
  onBack: () => void;
}

export default function Leaderboard({ currentUserId, users, onBack }: LeaderboardProps) {
  // Sort user directory by XP points descending
  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

  // Divide into podium (Top 3) and remainders
  const topThree = sortedUsers.slice(0, 3);
  const remaining = sortedUsers.slice(3);

  // Reorder podium (Index 1 is left, Index 0 is center, Index 2 is right) to look natural
  const podiumOrder = [];
  if (topThree[1]) podiumOrder.push(topThree[1]); // 2nd Place
  if (topThree[0]) podiumOrder.push(topThree[0]); // 1st Place (Center)
  if (topThree[2]) podiumOrder.push(topThree[2]); // 3rd Place

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Header bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <button
            id="lbl-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2 justify-end">
              🏆 Grand Arena
            </h1>
            <p className="text-xs text-indigo-300 font-mono tracking-wider uppercase font-bold">CHAMPION LEAGUE ACTIVE</p>
          </div>
        </div>

        {/* Podium visualization */}
        {podiumOrder.length > 0 && (
          <div className="grid grid-cols-3 gap-3 items-end max-w-lg mx-auto py-8">
            {podiumOrder.map((usr, i) => {
              const originalRank = sortedUsers.findIndex(u => u.uid === usr.uid) + 1;
              const isCurrentUser = usr.uid === currentUserId;

              // Design distinct visual tokens per rank
              let medalColor = "text-amber-500";
              let colHeight = "h-40";
              let scaleVal = 1;

              if (originalRank === 1) {
                medalColor = "text-yellow-450 text-yellow-400";
                colHeight = "h-52 bg-gradient-to-t from-yellow-500/20 to-transparent";
                scaleVal = 1.05;
              } else if (originalRank === 2) {
                medalColor = "text-slate-300";
                colHeight = "h-40 bg-gradient-to-t from-slate-500/20 to-transparent";
                scaleVal = 0.95;
              } else {
                medalColor = "text-amber-600";
                colHeight = "h-32 bg-gradient-to-t from-amber-750/20 to-transparent";
                scaleVal = 0.90;
              }

              return (
                <motion.div
                  key={usr.uid}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ scale: scaleVal }}
                  className="flex flex-col items-center"
                >
                  {/* Competitor profile specs */}
                  <div className="relative mb-2 flex flex-col items-center">
                    {originalRank === 1 && (
                      <Crown className="w-5 h-5 text-yellow-400 fill-current absolute -top-4.5 animate-bounce" />
                    )}
                    <img
                      src={usr.avatarUrl}
                      alt={usr.username}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover bg-white/5 border-2 ${
                        isCurrentUser ? "border-indigo-400" : "border-white/10"
                      }`}
                    />
                    <div className="absolute -bottom-1 bg-indigo-650 border border-indigo-500/30 text-[9px] font-mono font-bold text-white px-1.5 py-0.5 rounded">
                      Lvl {usr.level}
                    </div>
                  </div>

                  {/* Glass column pedestal step */}
                  <div className={`w-full rounded-t-2xl border border-b-0 border-white/5 flex flex-col justify-end items-center p-3 text-center glass shadow-2xl ${colHeight}`}>
                    <span className={`text-lg font-black ${medalColor}`}>#{originalRank}</span>
                    <span className="text-xs font-bold truncate max-w-[80px] md:max-w-[120px] text-white mt-1">
                      {usr.username}
                    </span>
                    <span className="text-xs font-mono font-bold text-orange-400 mt-1 flex items-center justify-center">
                      {usr.xp}<span className="text-[10px]">XP</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Competitor roster table */}
        <div className="glass border border-white/5 p-6 rounded-[28px] shadow-2xl">
          <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 font-bold mb-4">LEAGUE RANKINGS</h2>
          
          <div className="divide-y divide-white/5">
            {sortedUsers.map((usr, index) => {
              const rank = index + 1;
              const isCurrentUser = usr.uid === currentUserId;

              return (
                <div
                  key={usr.uid}
                  className={`py-3.5 flex items-center justify-between transition-all ${
                    isCurrentUser ? "bg-indigo-500/10 -mx-4 px-4 rounded-xl font-bold border-y border-indigo-500/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank indicator */}
                    <span className="w-6 text-sm font-bold text-slate-400 font-mono text-center">
                      {rank}
                    </span>

                    {/* Competitor Profile */}
                    <div className="flex items-center gap-3">
                      <img
                        src={usr.avatarUrl}
                        alt={usr.username}
                        className="w-10 h-10 rounded-xl object-cover bg-white/5 border border-white/10"
                      />
                      <div>
                        <span className="text-sm font-bold block text-white">
                          {usr.username} {isCurrentUser && <span className="text-[10px] bg-indigo-500/20 border border-indigo-550/30 text-indigo-300 px-1.5 py-0.5 rounded-md ml-1 font-mono uppercase tracking-wider font-bold">You</span>}
                        </span>
                        <div className="flex gap-3 text-[10px] text-slate-400 mt-0.5 font-sans">
                          <span>Level {usr.level}</span>
                          {usr.streak > 1 && (
                            <span className="flex items-center gap-0.5 text-orange-400">
                              <Flame className="w-3 h-3 fill-current" /> {usr.streak} streak
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cumulative XP score */}
                  <div className="text-right">
                    <span className="text-sm font-bold text-orange-405 text-orange-400 block font-mono">
                      {usr.xp} XP
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">
                      {usr.quizzesPlayed} Solved
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
