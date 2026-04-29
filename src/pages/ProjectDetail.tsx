import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  DollarSign, 
  Sparkles,
  Zap,
  Target,
  Edit3,
  Trash2,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  ZapOff
} from "lucide-react";
import { motion } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { Card, Button } from "../components/ui";
import { formatCurrency, cn } from "../lib/utils";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<string>("");

  useEffect(() => {
    const fetchProjectAndGenerateInsight = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`, { credentials: 'include' });
        const data = await res.json();
        
        if (data && !data.error) {
          setProject(data);
          
          // Generate insight on client side
          if (process.env.GEMINI_API_KEY) {
            try {
              const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
              const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Analyze this project portfolio data and provide a concise (1-2 sentence) executive strategic insight:
                Project Name: ${data.name}
                Budget: $${data.budget}
                ROI: ${data.roi}%
                Risk: ${data.risk}%
                Team Size: ${data.teamSize}
                Status: ${data.status}`,
              });
              setInsight(response.text || "No insight generated.");
            } catch (aiErr) {
              console.error("AI Insight Error:", aiErr);
              setInsight(data.insight || "Strategic analysis currently unavailable.");
            }
          } else {
            setInsight(data.insight || "Strategic analysis protocol offline.");
          }
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProjectAndGenerateInsight();
  }, [id]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  if (loading) return <div className="h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" /></div>;
  if (!project) return <div className="p-20 text-center font-black uppercase text-slate-400">Node Not Found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-24">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <Link to="/projects">
            <Button variant="secondary" size="sm" className="w-12 h-12 rounded-2xl p-0">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none italic uppercase">{project.name}</h1>
              <div className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                project.status === 'Active' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {project.status}
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <Layers size={14} className="text-blue-600" />
              Node Vector: {project.id.toUpperCase()}
              <div className="w-1 h-1 bg-slate-200 rounded-full" />
              Smart Score: {project.score}%
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2"><Edit3 size={16} /> Edit Node</Button>
          <Button variant="secondary" className="gap-2 text-rose-600 hover:bg-rose-50 hover:text-rose-600 border-rose-100">
            <Trash2 size={16} /> Terminate Initiative
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Main Performance Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, color: 'blue', label: 'Capital', val: formatCurrency(project.budget) },
              { icon: TrendingUp, color: 'emerald', label: 'Alpha Target', val: `+${project.roi}%` },
              { icon: AlertTriangle, color: project.risk > 40 ? 'rose' : 'amber', label: 'Volatility', val: `${project.risk}%` },
              { icon: Users, color: 'indigo', label: 'Talent Unit', val: project.teamSize }
            ].map((stat, i) => (
              <Card key={i} padding="small" className="bg-white border-slate-100 shadow-sm" withHover>
                 <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center mb-4`}>
                    <stat.icon size={18} className={`text-${stat.color}-600`} />
                 </div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">{stat.label}</p>
                 <p className="text-xl font-black text-slate-900 leading-none">{stat.val}</p>
              </Card>
            ))}
          </div>

          {/* AI Strategy Synthesis */}
          <Card className="bg-slate-50 border-blue-100 p-10 relative overflow-hidden" noShadow>
             <div className="absolute top-0 right-0 p-8">
               <Sparkles className="text-blue-600/20" size={80} />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                   <ShieldCheck size={20} />
                 </div>
                 <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Strategic Synthesis Protocol</h3>
               </div>
               <p className="text-2xl font-black text-slate-900 leading-tight italic border-l-4 border-blue-600 pl-8 py-2">
                 "{insight || (project ? project.insight : '')}"
               </p>
               
               <div className="mt-12 flex gap-4">
                 <Button onClick={handleAction} loading={isProcessing} className="bg-slate-900 shadow-xl py-6 px-10">Generate Deep Audit</Button>
                 <Button variant="secondary" onClick={handleAction} loading={isProcessing} className="bg-white py-6 px-10">Resource Mapping</Button>
               </div>
             </div>
          </Card>

          {/* Timeline Architecture */}
          <Card className="p-10 border-slate-100" withHover>
             <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-10 pb-4 border-b border-slate-50 flex items-center justify-between">
                Timeline Architecture
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Efficiency Optimized</span>
             </h3>
             <div className="space-y-12">
                {[
                  { title: 'Strategic Alignment Phase', status: 'Completed', date: 'Mar 12, 2026' },
                  { title: 'Resource Provisioning', status: 'In Progress', date: 'Apr 28, 2026' },
                  { title: 'Core Technical Integration', status: 'Pending', date: 'Jun 15, 2026' },
                ].map((step, i, arr) => (
                  <div key={i} className="flex gap-8 relative group">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-6 h-6 rounded-full border-4 relative z-10 shadow-sm transition-all duration-500",
                        step.status === 'Completed' ? "bg-blue-600 border-blue-50 scale-110" : "bg-white border-slate-100 group-hover:border-slate-900"
                      )} />
                      {i < arr.length - 1 && <div className="w-[2px] h-16 bg-slate-50 absolute top-6" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 italic tracking-tighter leading-none mb-2">{step.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                         <span className={cn(step.status === 'Completed' ? "text-blue-500" : "text-slate-400")}>{step.status}</span>
                         <div className="w-1 h-1 bg-slate-200 rounded-full" />
                         Target: {step.date}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-10">
          <Card className="bg-slate-900 text-white border-none p-0 overflow-hidden" withHover>
             <div className="p-10 text-center border-b border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-10">Internal Health Metric</p>
                <div className="relative w-48 h-48 mx-auto -mb-10">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="transparent" />
                      <circle 
                        cx="96" cy="96" r="80" 
                        stroke="#2563EB" strokeWidth="16" fill="transparent" 
                        strokeDasharray={502.6} 
                        strokeDashoffset={502.6 * (1 - project.score / 100)} 
                        strokeLinecap="round" 
                        className="transition-all duration-1000 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                      />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-black italic tracking-tighter">{project.score}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Score V1.0</span>
                   </div>
                </div>
             </div>
             
             <div className="p-10 space-y-4">
                {project.flags.length > 0 ? project.flags.map((flag: string) => (
                  <div key={flag} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-blue-500 transition-colors">
                     <AlertTriangle className="text-amber-500 group-hover:animate-pulse" size={18} />
                     <span className="text-xs font-black uppercase tracking-widest text-slate-400">{flag}</span>
                  </div>
                )) : (
                  <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                     <Target className="text-emerald-500" size={18} />
                     <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Optimal Stability</span>
                  </div>
                )}
             </div>
          </Card>

          <Card padding="large" className="bg-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(15,23,42,1)]" noShadow>
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8 flex items-center justify-between">
                Laboratory Operations
                <ChevronRight size={14} className="text-blue-600" />
             </h3>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, label: 'Audit Assets' },
                  { icon: Zap, label: 'Pivot Capital' },
                  { icon: Target, label: 'Re-Calibrate' },
                  { icon: ZapOff, label: 'Halt Session' }
                ].map((op, i) => (
                  <button 
                    key={i} 
                    onClick={handleAction}
                    disabled={isProcessing}
                    className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] hover:bg-slate-900 hover:text-white transition-all group relative disabled:opacity-50"
                  >
                     <div className={cn("transition-opacity", isProcessing ? "opacity-0" : "opacity-100")}>
                        <op.icon size={20} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                     </div>
                     {isProcessing && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                           <div className="w-5 h-5 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
                        </div>
                     )}
                     <span className="text-[9px] font-black uppercase tracking-[0.2em]">{op.label}</span>
                  </button>
                ))}
             </div>
          </Card>
        </aside>
      </div>
    </motion.div>
  );
}
