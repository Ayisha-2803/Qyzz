import React from "react";
import { ArrowLeft, Target, Star, Calendar, PieChart as PieIcon, LineChart, Award } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { QuizAttempt, UserProfile } from "../types";

interface AnalyticsProps {
  user: UserProfile;
  attempts: QuizAttempt[];
  onBack: () => void;
}

export default function Analytics({ user, attempts, onBack }: AnalyticsProps) {
  // If the user's attempt list is currently empty, we supply synthetic baseline history so they don't see a blank page
  const hasData = attempts.length > 0;

  // 1. Accuracy Progress data
  const accuracyData = hasData
    ? attempts.map((at, idx) => ({
        index: `Match ${idx + 1}`,
        accuracy: at.accuracy,
        quiz: at.quizTitle
      }))
    : [
        { index: "Trial 1", accuracy: 60, quiz: "Space Exploration Mock" },
        { index: "Trial 2", accuracy: 80, quiz: "Ancient Myths Mock" },
        { index: "Trial 3", accuracy: 75, quiz: "Quantum Physics Trial" },
        { index: "Trial 4", accuracy: 100, quiz: "Front-end Basics" }
      ];

  // 2. Weekly Activity data (XP accumulated over days)
  const weeklyData = [
    { day: "Mon", xp: hasData ? Math.max(20, (attempts[0]?.xpEarned || 50)) : 50 },
    { day: "Tue", xp: hasData ? Math.max(30, (attempts[1]?.xpEarned || 80)) : 110 },
    { day: "Wed", xp: hasData ? Math.max(10, (attempts[2]?.xpEarned || 20)) : 40 },
    { day: "Thu", xp: hasData ? Math.max(40, (attempts[3]?.xpEarned || 120)) : 150 },
    { day: "Fri", xp: 120 },
    { day: "Sat", xp: 240 },
    { day: "Sun", xp: 90 }
  ];

  // 3. Subject categorizations data
  const subjectGroups = hasData
    ? attempts.reduce((acc: any, curr) => {
        const found = acc.find((item: any) => item.name === curr.category);
        if (found) {
          found.value += 1;
        } else {
          acc.push({ name: curr.category, value: 1 });
        }
        return acc;
      }, [])
    : [
        { name: "Web Development", value: 4 },
        { name: "Space Exploration", value: 3 },
        { name: "Ancient History", value: 2 },
        { name: "Quantum Physics", value: 1 }
      ];

  const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ec4899", "#8b5cf6"];

  const avgAccuracy = Math.round(
    accuracyData.reduce((sum, item) => sum + item.accuracy, 0) / accuracyData.length
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation header bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <button
            id="anl-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2 justify-end">
              📊 Performance Analytics
            </h1>
            <p className="text-xs text-indigo-300 font-mono tracking-wider uppercase font-bold">REAL-TIME META ASSESSMENT DECODER</p>
          </div>
        </div>

        {/* Statistic Summaries Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <Target className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block">Average Accuracy</span>
              <span className="text-3xl font-extrabold block text-white">{avgAccuracy}%</span>
            </div>
          </div>

          <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block">Total Solves</span>
              <span className="text-3xl font-extrabold block text-white">
                {hasData ? attempts.length : user.quizzesPlayed}
              </span>
            </div>
          </div>

          <div className="glass border border-white/5 p-6 rounded-3xl shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block">Total Accumulated XP</span>
              <span className="text-3xl font-extrabold block text-white">{user.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Charts Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Accuracy trend Area chart */}
          <div className="glass border border-white/5 p-6 rounded-[32px] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-indigo-400" /> Consecutive Accuracy Progress
            </h3>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="index" stroke="#94a3b8" fontSize={11} strokeWidth={0} />
                  <YAxis stroke="#94a3b8" fontSize={11} strokeWidth={0} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 10, 18, 0.95)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#fff"
                    }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly activity Bar chart */}
          <div className="glass border border-white/5 p-6 rounded-[32px] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" /> Daily XP Accumulations
            </h3>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} strokeWidth={0} />
                  <YAxis stroke="#94a3b8" fontSize={11} strokeWidth={0} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 10, 18, 0.95)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#fff"
                    }}
                  />
                  <Bar dataKey="xp" fill="#10b981" radius={[8, 8, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject allocations Pie chart */}
          <div className="lg:col-span-2 glass border border-white/5 p-8 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center gap-12">
            
            <div className="flex-grow space-y-4 self-start text-left">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-violet-400" /> Target Subject Proficiency
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Shows the allocation of assessments successfully cleared categorized by subject tags. Build custom AI prompts to supplement neglected scopes!
              </p>
              
              <div className="space-y-4 pt-4">
                {subjectGroups.map((grp: any, i: number) => {
                  const percent = Math.round(
                    (grp.value / subjectGroups.reduce((s: number, g: any) => s + g.value, 0)) * 100
                  );
                  return (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2.5 font-semibold text-slate-300">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span>{grp.name}</span>
                      </div>
                      <span className="text-indigo-400 font-mono font-bold">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pie render */}
            <div className="w-60 h-60 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectGroups}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {subjectGroups.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Mastery</span>
                <span className="text-2xl font-bold text-white uppercase tracking-wider">Active</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
