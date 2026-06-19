import React, { useRef } from "react";
import { Award, ShieldAlert, Sparkles, Printer, ArrowLeft, Download } from "lucide-react";
import { motion } from "motion/react";
import { UserProfile, QuizAttempt } from "../types";

interface CertificateProps {
  attempt: QuizAttempt;
  user: UserProfile;
  onBack: () => void;
}

export default function Certificate({ attempt, user, onBack }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(attempt.completedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const certificateId = `QYZZ-${attempt.id.toUpperCase().split("-")[1] || "CERT-99"}`;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Header controls */}
      <div className="flex items-center justify-between w-full mb-6 print:hidden">
        <button
          id="cert-back-btn"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <button
          id="cert-print-btn"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-200"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>

      {/* Actual Certificate container */}
      <motion.div
        id="qyzz-certificate-frame"
        ref={certificateRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full aspect-[1.414/1] bg-white text-zinc-900 border-[16px] border-zinc-900 dark:border-zinc-950 p-[5%] shadow-2xl flex flex-col justify-between overflow-hidden"
        style={{ contentVisibility: "auto" }}
      >
        {/* Visual elegant pattern assets */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl translate-x-12 translate-y-12 pointer-events-none" />
        
        {/* Certificate inner boundary */}
        <div className="absolute inset-4 border border-zinc-200 roundedpointer-events-none pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-10 h-10 text-emerald-600" />
            <span className="font-mono text-2xl font-black tracking-[0.2em] text-zinc-900">QYZZ</span>
          </div>
          <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">IN ACCORDANCE WITH THE GAMIFIED LEARNING PROTOCOL</p>
          <h1 className="font-serif text-3xl md:text-5xl font-normal mt-4 text-zinc-800 tracking-wider">
            Certificate of Excellence
          </h1>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-emerald-600 to-transparent mx-auto mt-4" />
        </div>

        {/* Recipient Details */}
        <div className="text-center my-6">
          <p className="text-xs italic text-zinc-500">THIS ACADEMIC BADGE IS PROUDLY CONFERRED UPON</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-950 mt-2">
            {user.username}
          </h2>
          <p className="text-xs text-zinc-500 mt-4 max-w-xl mx-auto px-4 leading-relaxed">
            for successfully mastering the advanced scholastic assessment modules under the subject category of <strong className="text-zinc-800 font-semibold">{attempt.category}</strong>. This master certificate guarantees high performance accuracy with a flawless score profile.
          </p>
        </div>

        {/* Score & validation Details */}
        <div className="flex justify-between items-end border-t border-zinc-100 pt-6 mt-2 px-6">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase block">SUBJECT MODULE</span>
            <span className="text-sm font-bold text-zinc-800">{attempt.quizTitle}</span>
            <div className="flex gap-4 mt-2">
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">ACCURACY</span>
                <span className="text-xs font-semibold text-emerald-600">{attempt.accuracy}%</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase block">XP REWARD</span>
                <span className="text-xs font-semibold text-amber-600">+{attempt.xpEarned} XP</span>
              </div>
            </div>
          </div>

          {/* Golden Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full border border-amber-300 shadow">
              <div className="absolute inset-1 rounded-full border border-dashed border-amber-500" />
              <Award className="w-8 h-8 text-amber-600 animate-pulse" />
            </div>
            <span className="text-[9px] font-mono text-amber-600 font-bold mt-1 tracking-wider">OFFICIAL GOLD SEAL</span>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block">AUTHENTIC SERIAL ID</span>
            <span className="text-xs font-mono font-bold text-zinc-700">{certificateId}</span>
            <div className="mt-3">
              <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block">DATE GRANTED</span>
              <span className="text-xs font-semibold text-zinc-600">{formattedDate}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
