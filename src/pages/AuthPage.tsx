import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { mockDb } from "../lib/mockDb";
import { toast } from "react-hot-toast";

interface AuthPageProps {
  initialMode?: "login" | "signup";
  onSuccess: (user: any) => void;
  onBack: () => void;
}

export default function AuthPage({ initialMode = "login", onSuccess, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">((initialMode as any) || "login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        if (!email || !password) {
          toast.error("Please fill in all security fields.");
          setLoading(false);
          return;
        }
        const user = mockDb.login(email, password);
        toast.success(`Welcome back, ${user.username}!`);
        onSuccess(user);
      } else if (mode === "signup") {
        if (!email || !password || !username) {
          toast.error("All credential arguments are required.");
          setLoading(false);
          return;
        }
        const user = mockDb.signup(username, email, password);
        toast.success(`Account built! Welcome ${user.username}.`);
        onSuccess(user);
      } else {
        // Forgot state
        if (!email) {
          toast.error("Please enter a valid dispatch email.");
          setLoading(false);
          return;
        }
        const message = mockDb.forgotPassword(email);
        toast.success(message);
        setMode("login");
      }
    } catch (err: any) {
      toast.error(err.message || "An authentication conflict occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    try {
      const user = mockDb.simulateGoogleSignIn();
      toast.success(`Google Account Signed In as ${user.username}!`);
      onSuccess(user);
    } catch (err: any) {
      toast.error(err.message || "Google Single Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Decorative backdrop blobs */}
      <div className="aurora absolute inset-0 pointer-events-none" />

      {/* Brand logo header */}
      <div className="mb-6 flex flex-col items-center cursor-pointer z-10" onClick={onBack}>
        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-400 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl tracking-tight shadow-lg shadow-indigo-600/20">
          Q
        </div>
        <h1 className="text-2xl font-bold mt-3 tracking-tight text-white">Qyzz</h1>
        <p className="text-xs text-indigo-300 font-bold font-mono tracking-wider uppercase">Learn. Play. Rise.</p>
      </div>

      {/* Main Glassmorphic Panel Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass border border-white/5 rounded-3xl shadow-2xl p-8 backdrop-blur-2xl z-10"
      >
        {/* Toggle selectors (only show if not forgot state) */}
        {mode !== "forgot" && (
          <div className="flex bg-white/5 border border-white/5 p-1 rounded-2xl mb-8">
            <button
              id="auth-toggle-login"
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                mode === "login"
                  ? "bg-white/10 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              id="auth-toggle-signup"
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                mode === "signup"
                  ? "bg-white/10 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {mode === "signup" && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Username</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="auth-username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter moniker (e.g. EinsteinJS)"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/[0.08] text-white placeholder-slate-500"
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/[0.08] text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">Password</label>
                  {mode === "login" && (
                    <button
                      id="auth-forgot-btn"
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-indigo-400 hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="auth-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/[0.08] text-white placeholder-slate-500"
                    required
                  />
                </div>
              </div>
            )}
          </AnimatePresence>

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/10 cursor-pointer transform hover:translate-y-[-1px]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Authenticating...
              </span>
            ) : mode === "login" ? (
              "Sign In to Qyzz"
            ) : mode === "signup" ? (
              "Build Account"
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {mode !== "forgot" && (
          <>
            {/* Social Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0c0d12] border border-white/5 rounded-full px-3 text-slate-400 font-semibold font-mono text-[10px] tracking-widest">Or connect with</span>
              </div>
            </div>

            {/* Simulated Google SSO Button */}
            <button
              id="google-sso-btn"
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#ea4335"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.23-.67-.35-1.37-.35-2.09z"
                />
                <path
                  fill="#4285f4"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign In with Google Account
            </button>
          </>
        )}

        {/* Alternate Navigation */}
        <div className="mt-6 text-center">
          {mode === "forgot" ? (
            <button
              id="auth-return-signin"
              onClick={() => setMode("login")}
              className="text-sm font-semibold text-indigo-400 hover:underline cursor-pointer"
            >
              Return to Sign In
            </button>
          ) : (
            <button
              id="auth-cancel-btn"
              onClick={onBack}
              className="text-xs text-slate-400 hover:text-white transition-colors uppercase font-bold tracking-widest cursor-pointer mt-2"
            >
              Cancel and Return
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
