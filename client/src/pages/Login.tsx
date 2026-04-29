import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Eye, EyeOff, Loader2, AlertCircle, Mail, Lock, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { FuturisticBackground, GlobeVisualization } from "@/components/FuturisticBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.user);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden">
      <FuturisticBackground />

      {/* Content Wrapper */}
      <div className="relative z-10 flex w-full">
        {/* Left Side: Branding & Visualization */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">Stratos AI</span>
          </motion.div>

          <div className="relative">
            <GlobeVisualization />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center relative z-20"
            >
              <h2 className="text-5xl font-extrabold text-white leading-tight">
                Global Strategy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Intelligently Decoded</span>
              </h2>
              <p className="mt-6 text-slate-400 text-lg font-medium max-w-md mx-auto leading-relaxed">
                Your AI Co-Pilot for Strategic Decisions. Navigate uncertainty with data-driven clarity.
              </p>
            </motion.div>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-sm font-semibold">
            <span>v.24.4.1</span>
            <div className="w-1 h-1 bg-slate-700 rounded-full" />
            <span>Enterprise Secure</span>
            <div className="w-1 h-1 bg-slate-700 rounded-full" />
            <span>99.9% Accuracy</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[480px]"
          >
            {/* Glassmorphism Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900/60 backdrop-blur-3xl p-10 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="mb-10 text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-white tracking-tight">Access Console</h1>
                  <p className="text-slate-400 mt-2 text-sm">Synchronize your strategic workspace</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 text-rose-400 text-sm font-medium"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Identity Vector</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-2xl py-4 pl-13 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                        placeholder="corporate@stratos.ai"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secret Key</label>
                      <button type="button" className="text-[10px] uppercase tracking-tighter text-blue-400 font-bold hover:text-blue-300 transition-colors">Emergency Reset</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-2xl py-4 pl-13 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Initialize Session
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center mt-10 text-sm font-medium text-slate-500">
                  New strategist?{" "}
                  <Link to="/signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors underline-offset-4 decoration-blue-400/30 hover:underline">Provision account</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
