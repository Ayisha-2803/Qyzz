import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Sparkles, Plus, Trash2, ClipboardList, HelpCircle, Flame, ShieldAlert, Check, X, Code, Loader2 } from "lucide-react";
import { mockDb } from "../lib/mockDb";
import { Quiz, Question, QuestionType } from "../types";
import { toast } from "react-hot-toast";

interface AdminDashboardProps {
  quizzes: Quiz[];
  onBack: () => void;
  onRefreshQuizzes: () => void;
}

export default function AdminDashboard({ quizzes, onBack, onRefreshQuizzes }: AdminDashboardProps) {
  // Mode views: 'list' | 'manual' | 'ai'
  const [panelView, setPanelView] = useState<"list" | "manual" | "ai">("list");
  const [generating, setGenerating] = useState(false);

  // AI Prompt Fields
  const [aiTopic, setAiTopic] = useState("");
  const [aiDifficulty, setAiDifficulty] = useState("Intermediate");
  const [aiCount, setAiCount] = useState(5);

  // Manual Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(120);
  const [xpReward, setXpReward] = useState(120);
  const [questions, setQuestions] = useState<Omit<Question, "id">[]>([
    {
      text: "",
      type: QuestionType.MC,
      options: ["", "", "", ""],
      correctAnswer: ""
    }
  ]);

  // Handle Manual addition of question block
  const handleAddQuestionField = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: QuestionType.MC,
        options: ["", "", "", ""],
        correctAnswer: ""
      }
    ]);
  };

  const handleRemoveQuestionField = (idx: number) => {
    if (questions.length === 1) {
      toast.error("Quizzes must support at least 1 question.");
      return;
    }
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (qIdx: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === "text") {
      updated[qIdx].text = value;
    } else if (field === "type") {
      updated[qIdx].type = value;
      updated[qIdx].options = value === QuestionType.TF ? ["True", "False"] : ["", "", "", ""];
      updated[qIdx].correctAnswer = "";
    } else if (field === "correctAnswer") {
      updated[qIdx].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx: number, oIdx: number, value: string) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  // Submit manual quiz configuration
  const handleSaveManualQuiz = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please provide title and description details.");
      return;
    }

    // Comprehensive validation checks on questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        toast.error(`Question ${i + 1} has empty text description.`);
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        toast.error(`Question ${i + 1} has blank options. Ensure all blocks are filled.`);
        return;
      }
      if (!q.correctAnswer.trim()) {
        toast.error(`Please designate the correct answer state for Question ${i + 1}.`);
        return;
      }
      if (!q.options.includes(q.correctAnswer)) {
        toast.error(`Question ${i + 1} correctAnswer must match one of its options elements exactly.`);
        return;
      }
    }

    // Structure full parameters
    const formattedQuestions: Question[] = questions.map((q, idx) => ({
      ...q,
      id: `q-man-${Date.now()}-${idx}`
    }));

    mockDb.createQuiz({
      title,
      category,
      description,
      duration,
      xpReward,
      isAiGenerated: false,
      questions: formattedQuestions
    });

    toast.success("Manual Quiz minted and added directly to registry!");
    
    // Reset Manual Fields
    setTitle("");
    setDescription("");
    setQuestions([
      {
        text: "",
        type: QuestionType.MC,
        options: ["", "", "", ""],
        correctAnswer: ""
      }
    ]);

    onRefreshQuizzes();
    setPanelView("list");
  };

  // Invoke AI Quiz generation backend pipeline
  const handleGenerateAiQuiz = async () => {
    if (!aiTopic.trim()) {
      toast.error("Please describe a topic for AI generation (e.g. quantum biology).");
      return;
    }

    setGenerating(true);
    toast.loading("Generating your AI quiz using Gemini...");

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          difficulty: aiDifficulty,
          questionCount: aiCount
        })
      });

      toast.dismiss(); // Dismiss loaders

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Generation query bounced from pipeline.");
      }

      const freshQuiz = await response.json();

      // Ensure proper properties
      if (!freshQuiz.questions || freshQuiz.questions.length === 0) {
        throw new Error("Invalid format received from server. Try re-prompting.");
      }

      // Automatically map incoming items with random IDs to structure correctly
      const parsedQuiz: Omit<Quiz, "id" | "rating"> = {
        title: freshQuiz.title || `${aiTopic} AI Mastery`,
        category: freshQuiz.category || "AI Generation",
        description: freshQuiz.description || `A dynamic simulated quiz challenging your limits of ${aiTopic}`,
        duration: freshQuiz.duration || 120,
        xpReward: freshQuiz.xpReward || 150,
        isAiGenerated: true,
        questions: freshQuiz.questions.map((q: any, i: number) => ({
          id: `q-ai-${Date.now()}-${i}`,
          text: q.text,
          type: q.type === "tf" ? QuestionType.TF : QuestionType.MC,
          options: q.options,
          correctAnswer: q.correctAnswer
        }))
      };

      // Store in memory
      mockDb.createQuiz(parsedQuiz);

      toast.success("Gemini Quiz created and synced seamlessly!");
      setAiTopic("");
      onRefreshQuizzes();
      setPanelView("list");
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || "Pipeline error during Gen-AI extraction.");
    } finally {
      setGenerating(false);
    }
  };

  // Delete designated Quiz parameters
  const handleDeleteQuiz = (id: string, name: string) => {
    if (confirm(`Are you absolutely sure you want to delete "${name}"?`)) {
      mockDb.deleteQuiz(id);
      toast.success("Assessment record successfully removed.");
      onRefreshQuizzes();
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
          <button
            id="adm-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </button>
          
          <div className="text-left sm:text-right">
            <h1 className="text-2xl font-bold text-white flex items-center justify-start sm:justify-end gap-2">
              ⚙️ Administrator Panel
            </h1>
            <p className="text-xs text-indigo-300 font-mono tracking-wider font-bold">MANAGE MODULES & AI GENERATORS</p>
          </div>
        </div>

        {/* Section View Selector tabs */}
        <div className="flex bg-white/5 border border-white/5 p-1 rounded-2xl max-w-lg z-10 relative">
          <button
            id="panel-toggle-list"
            onClick={() => setPanelView("list")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
              panelView === "list"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-650/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Directory List
          </button>
          <button
            id="panel-toggle-ai"
            onClick={() => setPanelView("ai")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
              panelView === "ai"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-650/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Gemini Gen-AI
          </button>
          <button
            id="panel-toggle-manual"
            onClick={() => setPanelView("manual")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
              panelView === "manual"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-650/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Manual Builder
          </button>
        </div>

        {/* Main Panels with transitions */}
        <AnimatePresence mode="wait">
          
          {/* List panel */}
          {panelView === "list" && (
            <motion.div
              key="panel-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass border border-white/5 p-6 rounded-[28px] shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Active Quiz Directory</h2>
                <span className="text-xs text-indigo-300 font-mono uppercase tracking-wider font-bold">{quizzes.length} Quizzes Register</span>
              </div>

              <div className="divide-y divide-white/5">
                {quizzes.map((qz) => (
                  <div key={qz.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate block">
                          {qz.title}
                        </span>
                        {qz.isAiGenerated && (
                          <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-350 text-indigo-300 font-mono px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 fill-current" /> AI
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{qz.description}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-slate-400 font-mono uppercase font-bold">{qz.questions.length} questions</span>
                      <button
                        id={`delete-qz-btn-${qz.id}`}
                        onClick={() => handleDeleteQuiz(qz.id, qz.title)}
                        className="p-2 bg-red-950/20 hover:bg-red-900/30 text-red-400 rounded-xl transition-all border border-red-500/10 cursor-pointer"
                        title="Delete Quiz"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Panel */}
          {panelView === "ai" && (
            <motion.div
              key="panel-ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass border border-white/5 p-8 rounded-[28px] shadow-2xl space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                  <Sparkles className="w-5 h-5 animate-pulse fill-current" /> Gemini AI Quiz Provisioning
                </h2>
                <p className="text-xs text-slate-400">
                  Instantly craft robust gamified quiz structures about any custom topic leveraging state-of-the-art server-side Gemini generation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 select-glass-container">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-450 text-slate-400 uppercase tracking-widest block font-mono">Subject Topic</label>
                  <input
                    id="ai-topic-input"
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. quantum biology, ancient Rome, web security"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-450 text-slate-400 uppercase tracking-widest block font-mono">Difficulty</label>
                  <select
                    id="ai-difficulty-select"
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950/90 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all cursor-pointer"
                  >
                    <option value="Novice" className="bg-[#0b0c16]">Novice</option>
                    <option value="Intermediate" className="bg-[#0b0c16]">Intermediate</option>
                    <option value="Advanced" className="bg-[#0b0c16]">Advanced</option>
                    <option value="Scholastic Expert" className="bg-[#0b0c16]">Scholastic Expert</option>
                  </select>
                </div>

                <div className="space-y-1 font-sans">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">Question Count (2 - 10)</label>
                  <input
                    id="ai-count-input"
                    type="number"
                    min={2}
                    max={10}
                    value={aiCount}
                    onChange={(e) => setAiCount(parseInt(e.target.value) || 5)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white font-mono transition-all"
                  />
                </div>
              </div>

              <button
                id="ai-generate-submit-btn"
                onClick={handleGenerateAiQuiz}
                disabled={generating}
                className="w-full md:w-auto px-6 py-3.5 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.01] text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-650/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Fetching AI Schema...
                  </>
                ) : (
                  <>
                    Generate AI Quiz <Sparkles className="w-4 h-4 fill-current" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Manual Panel */}
          {panelView === "manual" && (
            <motion.div
              key="panel-manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass border border-white/5 p-8 rounded-[28px] shadow-2xl space-y-6"
            >
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Plus className="w-5 h-5 text-indigo-400" /> Manual Assessment Maker
              </h2>

              <form onSubmit={handleSaveManualQuiz} className="space-y-6 text-left">
                
                {/* Meta details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-405 text-slate-400 block mb-1 font-mono uppercase tracking-widest">Quiz Title</label>
                    <input
                      id="man-title-input"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Advanced TypeScript"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none text-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block mb-1 font-mono uppercase tracking-widest">Category tag</label>
                    <input
                      id="man-category-input"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. History, Mathematics, Chemistry"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none text-white transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-405 text-slate-400 block mb-1 mb-1 font-mono uppercase tracking-widest">Short Description</label>
                    <input
                      id="man-desc"
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none text-white transition-all"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what the user will learn or test in this quiz..."
                      required
                    />
                  </div>
                </div>

                {/* Question parameters lists */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 font-mono">Quiz Questions</h3>
                    <button
                      id="man-add-q-btn"
                      type="button"
                      onClick={handleAddQuestionField}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-650/25"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Question Block
                    </button>
                  </div>

                  {questions.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-6 border border-white/5 rounded-3xl bg-white/5 space-y-4 relative"
                    >
                      <button
                        id={`q-remove-btn-${qIdx}`}
                        type="button"
                        onClick={() => handleRemoveQuestionField(qIdx)}
                        className="absolute top-4 right-4 p-1.5 bg-red-950/20 hover:bg-red-900/30 text-red-450 border border-red-500/10 rounded-lg transition-all cursor-pointer"
                        title="Remove Question"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-xs font-bold text-slate-400 block font-mono uppercase tracking-wide">Question {qIdx + 1}</label>
                          <input
                            id={`man-q-text-${qIdx}`}
                            type="text"
                            value={q.text}
                            onChange={(e) => handleQuestionChange(qIdx, "text", e.target.value)}
                            placeholder="What is the result of..."
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 block font-mono uppercase tracking-wide">Type</label>
                          <select
                            id={`man-q-type-${qIdx}`}
                            value={q.type}
                            onChange={(e) => handleQuestionChange(qIdx, "type", e.target.value as QuestionType)}
                            className="w-full px-3 py-2 bg-neutral-950/90 border border-white/10 rounded-xl text-sm text-white focus:outline-none cursor-pointer"
                          >
                            <option value={QuestionType.MC} className="bg-[#0b0c16]">Multiple Choice</option>
                            <option value={QuestionType.TF} className="bg-[#0b0c16]">True / False</option>
                          </select>
                        </div>
                      </div>

                      {/* Options dynamic fields depending on type */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 block font-mono uppercase tracking-wider">Answer Choices</label>
                        {q.type === QuestionType.MC ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt, oIdx) => (
                              <input
                                key={oIdx}
                                id={`man-q-opt-${qIdx}-${oIdx}`}
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                                placeholder={`Choice ${String.fromCharCode(65 + oIdx)}`}
                                className="px-3.5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500/50"
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <span className="text-xs px-4 py-2 border border-white/10 rounded-xl bg-white/5 text-slate-300">True</span>
                            <span className="text-xs px-4 py-2 border border-white/10 rounded-xl bg-white/5 text-slate-300">False</span>
                          </div>
                        )}
                      </div>

                      {/* Correct answer identifier */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 block font-mono uppercase tracking-wide">Correct Option Designated</label>
                        <select
                          id={`man-q-correct-${qIdx}`}
                          value={q.correctAnswer}
                          onChange={(e) => handleQuestionChange(qIdx, "correctAnswer", e.target.value)}
                          className="w-full max-w-sm px-3 py-2 bg-neutral-950/90 border border-white/10 rounded-xl text-sm text-white focus:outline-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0b0c16] text-slate-400">-- Choose matching Correct option value --</option>
                          {q.options.filter(Boolean).map((opt, oIdx) => (
                            <option key={oIdx} value={opt} className="bg-[#0b0c16] text-white">{opt}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button
                    id="man-submit-all"
                    type="submit"
                    className="px-6 py-3.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 cursor-pointer block text-center"
                  >
                    Save & Curate Manual Quiz
                  </button>
                </div>

              </form>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
