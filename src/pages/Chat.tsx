import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Trash2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "../lib/utils";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: "Hello. I am **Stratos AI**, your strategic portfolio board advisor. I have ingested your live project data and am ready to provide deep-cycle analytics. \n\n**Strategic Starting Points:**\n- Analyze ROI vs Risk Frontier\n- Identify Capital Drain Nodes\n- Optimize Global Resource Allocation" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/projects', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Failed to load projects for AI context", err));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: any) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured in the environment.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const projectSummary = projects.map(p => `- ${p.name}: [ROI: ${p.roi}%, Risk: ${p.risk}%, Budget: $${p.budget}, Status: ${p.status}]`).join('\n');
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are Stratos AI, a senior portfolio governance advisor.
        Current Strategic Data:
        ${projectSummary}
        
        Mandate: Provide concise, high-impact business intelligence. Use professional terminology. Reference specific data points to support your reasoning.
        
        User Inquiry: ${input}`,
      });

      const reply = response.text || "I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "The strategic brain is currently out of the office. Please ensure your GEMINI_API_KEY is set correctly. Error: " + (error instanceof Error ? error.message : "Connection failed")
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-14rem)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <Sparkles size={28} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase italic">Stratos AI Advisor</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Neural Strategy & Portfolio Governance</p>
           </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'assistant', content: "Memory buffer cleared. Strategic context re-initialized." }])}
          className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm"
          title="Reset Session"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border-2 border-slate-900 shadow-[12px_12px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth" ref={scrollRef}>
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-6 max-w-4xl",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-110",
                  m.role === 'user' ? "bg-slate-900 text-white shadow-slate-200" : "bg-blue-600 text-white shadow-blue-100"
                )}>
                  {m.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div className={cn(
                  "p-8 rounded-[2rem] text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-tr-none font-bold" 
                    : "bg-white text-slate-900 border-2 border-slate-100 shadow-sm rounded-tl-none font-medium whitespace-pre-wrap"
                )}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex gap-4 mr-auto animate-pulse">
               <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                 <Zap className="text-blue-400 w-5 h-5 animate-spin" />
               </div>
               <div className="p-5 bg-slate-50 rounded-3xl rounded-tl-none border border-slate-100">
                  <div className="flex gap-1.5 pt-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <form className="relative" onSubmit={handleSend}>
             <input 
              type="text" 
              placeholder="Type your strategic query..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
             />
             <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:bg-slate-300 disabled:shadow-none"
             >
               <Send className="w-5 h-5" />
             </button>
          </form>
          <p className="text-[11px] text-center text-slate-400 mt-4 font-medium uppercase tracking-wide">
            AI responses are projections and should be verified against quarterly financial audits.
          </p>
        </div>
      </div>
    </div>
  );
}
