import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Trophy, Flame, Award, Sparkles, Brain, Cpu, Star } from "lucide-react";

export default function CognitiveAstroOrb() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const nodes = [
    { id: "tech", label: "Technology Core", icon: <Cpu className="w-5 h-5 text-cyan-400" />, x: "12%", y: "20%", bg: "from-cyan-500/25 to-blue-600/10", border: "border-cyan-500/30", glow: "shadow-cyan-500/20" },
    { id: "gamify", label: "Streak Engine", icon: <Flame className="w-5 h-5 text-orange-400" />, x: "88%", y: "22%", bg: "from-orange-500/25 to-red-600/10", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
    { id: "rewards", label: "Master Credentials", icon: <Award className="w-5 h-5 text-amber-400" />, x: "15%", y: "78%", bg: "from-amber-500/25 to-yellow-600/10", border: "border-amber-500/30", glow: "shadow-amber-500/20" },
    { id: "arena", label: "Grand Arena", icon: <Trophy className="w-5 h-5 text-indigo-400" />, x: "85%", y: "76%", bg: "from-indigo-500/25 to-purple-600/10", border: "border-indigo-500/30", glow: "shadow-indigo-500/20" }
  ];

  return (
    <div className="relative w-full max-w-[500px] h-[450px] mx-auto flex items-center justify-center select-none font-sans">
      
      {/* Decorative background dynamic glows */}
      <div className="absolute w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* SVG Connections & Shimmering paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {/* Core web layout connect paths */}
        <line x1="50%" y1="50%" x2="12%" y2="20%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="50%" y1="50%" x2="88%" y2="22%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="50%" y1="50%" x2="15%" y2="78%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="50%" y1="50%" x2="85%" y2="76%" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Orbit Path concentric lines */}
        <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
        <circle cx="50%" cy="50%" r="140" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* Center Interactive Brain / Cognitive Hub Core */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setClickCount(prev => prev + 1)}
        className="relative z-10 w-36 h-36 rounded-full glass border border-indigo-500/20 flex flex-col items-center justify-center cursor-pointer shadow-2xl group transition-all duration-300"
      >
        {/* Inner rotating halo ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-2 border border-dashed border-indigo-400/20 rounded-full"
        />

        {/* Pulsating lighting source effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full animate-pulse transition-opacity" />

        <div className="relative flex flex-col items-center text-center p-2">
          <Brain className="w-12 h-12 text-indigo-400 group-hover:text-indigo-300 transition-colors drop-shadow-[0_0_15px_rgba(129,140,248,0.4)] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 mt-1 uppercase group-hover:text-white transition-colors">
            {hoveredNode ? "DECODING..." : "COGNITIVE"}
          </span>
          <span className="text-[9px] font-mono text-indigo-305 text-indigo-300">
            {hoveredNode ? hoveredNode.toUpperCase() : `ACTIVE x${clickCount}`}
          </span>
        </div>
      </motion.div>

      {/* Orbiting Interactive Knowledge Nodes */}
      {nodes.map((nd) => {
        const isHovered = hoveredNode === nd.id;

        return (
          <motion.div
            key={nd.id}
            style={{ left: nd.x, top: nd.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            onMouseEnter={() => setHoveredNode(nd.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute z-25 group"
          >
            {/* Outer hover lighting line */}
            <div className={`relative px-4 py-3 rounded-2xl glass-accent bg-gradient-to-br ${nd.bg} border ${nd.border} shadow-xl ${nd.glow} hover:scale-110 transition-all duration-300 flex items-center gap-2.5 cursor-pointer`}>
              <div className="p-1 rounded-lg bg-black/40 border border-white/5">
                {nd.icon}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold block text-white">{nd.label}</span>
                <span className="text-[9px] text-slate-400 font-mono block">Node Connected</span>
              </div>
            </div>

            {/* Micro tooltip detail for mobile/small view if they hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 p-3 w-48 bg-black/95 border border-white/10 rounded-xl shadow-2xl z-30 pointer-events-none"
                >
                  <p className="text-[10px] text-slate-350 leading-relaxed">
                    Interactive Qyzz architecture module focusing on {nd.label}. Live latency synced.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Orbiting particles simulation */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute inset-[40px] pointer-events-none z-5"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-md shadow-purple-400" />
      </motion.div>
      
    </div>
  );
}
