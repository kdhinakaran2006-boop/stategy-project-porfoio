import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Target, 
  ArrowUpRight, 
  TrendingUp, 
  AlertCircle,
  Zap,
  BarChart2,
  BrainCircuit,
  Lock,
  ChevronRight,
  RefreshCcw,
  Bot,
  Terminal,
  ShieldAlert
} from "lucide-react";
import { motion } from "motion/react";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  CartesianGrid
} from "recharts";
import { Card, Button } from "../components/ui";
import { formatCurrency, cn } from "../lib/utils";

export default function Insights() {
  const [insights, setInsights] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/insights', { credentials: 'include' }).then(res => res.json()),
      fetch('/api/projects', { credentials: 'include' }).then(res => res.json())
    ])
      .then(([insightsData, projectsData]) => {
        if (insightsData && !insightsData.error) setInsights(insightsData);
        if (projectsData && !projectsData.error) setProjects(projectsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !insights) return <div className="h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" /></div>;

  const matrixData = projects.map(p => ({
    x: p.risk,
    y: p.roi,
    z: p.budget / 100000,
    name: p.name,
    id: p.id
  }));

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2 italic uppercase">Intelligence Console</h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em] leading-none mt-2">Algorithmic Narrative & Strategic Forecast</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2 font-black uppercase tracking-widest text-[10px]">
            <RefreshCcw size={16} /> Re-Calculate
          </Button>
          <Button className="gap-2 bg-slate-900 shadow-lg font-black uppercase tracking-widest text-[10px]">
            <Lock size={16} /> Export PDF Report
          </Button>
        </div>
      </section>

      {/* ALPHA PROJECTION MATRIX - Premium Section */}
      <Card className="relative p-0 overflow-hidden bg-white border-2 border-slate-900 shadow-[16px_16px_0px_rgba(15,23,42,1)]" noShadow>
        {/* Background Typography Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none flex flex-col items-center justify-center overflow-hidden opacity-[0.03]">
           <span className="text-[15rem] font-black leading-none mb-[-2rem]">GROWTH</span>
           <span className="text-[15rem] font-black leading-none italic">NEXT</span>
        </div>

        <div className="relative z-10 p-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Alpha Projection Matrix</h2>
            <div className="flex gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capital Units</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ROI Correlation</span>
               </div>
            </div>
          </div>

          <div className="relative h-[600px] w-full">
            {/* Quadrant Labels */}
            <div className="absolute top-10 right-10 z-20">
               <div className="px-6 py-3 bg-white/80 backdrop-blur-md border-2 border-slate-100 rounded-full flex items-center gap-3 shadow-xl shadow-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Expansion Vector</span>
                  <Zap size={14} className="text-blue-600" />
               </div>
            </div>
            
            <div className="absolute bottom-10 left-10 z-20">
               <div className="px-6 py-3 bg-white/80 backdrop-blur-md border-2 border-slate-100 rounded-full flex items-center gap-3 shadow-xl shadow-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Optimize Zone</span>
               </div>
            </div>

            {/* Protocol Callouts */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1 }}
               className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-12 z-30 flex items-center gap-4 group cursor-pointer"
            >
               <div className="w-16 h-16 bg-white border-2 border-emerald-500 rounded-2xl flex items-center justify-center shadow-[8px_8px_0px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                  <Zap className="text-emerald-500" size={24} />
               </div>
               <div className="bg-white p-4 rounded-2xl border-2 border-slate-50 shadow-2xl">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 leading-none">Automated Protocol</p>
                  <p className="text-sm font-black italic uppercase text-slate-900 leading-none">Top Alpha Target</p>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.5 }}
               className="absolute bottom-1/4 right-1/4 z-30 flex items-center gap-4 group cursor-pointer"
            >
               <div className="w-16 h-16 bg-white border-2 border-rose-500 rounded-2xl flex items-center justify-center shadow-[8px_8px_0px_rgba(244,63,94,0.2)] group-hover:scale-110 transition-transform">
                  <ShieldAlert className="text-rose-500" size={24} />
               </div>
               <div className="bg-white p-4 rounded-2xl border-2 border-slate-50 shadow-2xl">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 leading-none">Automated Protocol</p>
                  <p className="text-sm font-black italic uppercase text-slate-900 leading-none">High Risk Cluster</p>
               </div>
            </motion.div>

            <ResponsiveContainer width="100%" height="100%">
               <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Risk" 
                    unit="%" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                    label={{ value: 'SYSTEMIC VOLATILITY INDEX (%)', position: 'bottom', offset: 0, fontSize: 10, fontWeight: 900, fill: '#64748B', letterSpacing: '0.2em' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="ROI" 
                    unit="%" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                    label={{ value: 'EXPECTED ALPHA YIELD (%)', angle: -90, position: 'left', offset: -10, fontSize: 10, fontWeight: 900, fill: '#64748B', letterSpacing: '0.2em' }}
                  />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)', fontWeight: 900, fontSize: '12px', padding: '16px' }}
                  />
                  <Scatter name="Projects" data={matrixData}>
                    {matrixData.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.y > 25 ? '#10B981' : entry.x > 30 ? '#F43F5E' : '#2563EB'} 
                        fillOpacity={0.8}
                        stroke={entry.y > 25 ? '#10B981' : entry.x > 30 ? '#F43F5E' : '#2563EB'}
                        strokeWidth={2}
                      />
                    ))}
                  </Scatter>
               </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Main Insight Hero */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {insights.bestProject && (
          <Card className="xl:col-span-7 bg-white p-0 overflow-hidden relative" withHover>
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm animate-pulse">
                <TrendingUp className="text-emerald-500" size={24} />
              </div>
            </div>
            
            <div className="p-12">
              <div className="flex items-center gap-3 mb-10">
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Alpha Efficiency Leader
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]">
                {insights.bestProject.name} <br />
                <span className="text-slate-300 italic font-medium">Strategic Benchmark</span>
              </h2>

              <p className="text-lg font-medium text-slate-600 max-w-lg mb-12 leading-relaxed">
                Node performance exceeds regional baseline by <span className="text-emerald-600 font-black">+{insights.bestProject.roi - 15}%</span>. Recommended for primary capital reallocation phase.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Efficiency</p>
                  <p className="text-4xl font-black text-slate-900">{insights.bestProject.score}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Alpha Yield</p>
                  <p className="text-4xl font-black text-emerald-600">+{insights.bestProject.roi}%</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Risk Vector</p>
                  <p className="text-4xl font-black text-slate-400 italic">LOW</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="xl:col-span-5 bg-slate-900 text-white border-none p-10 flex flex-col" withHover>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">Risk Assessment Registry</h3>
            <AlertCircle className="text-rose-500 animate-bounce" size={20} />
          </div>

          <div className="space-y-6 flex-1">
            {insights.riskAlerts.slice(0, 3).map((project: any, i: number) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer shadow-sm"
              >
                <div>
                  <p className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-none mb-2">{project.name}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">{project.risk}% Volatility Index</p>
                </div>
                <div className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                  {project.flags[0]}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl relative overflow-hidden">
             <Bot className="absolute -bottom-4 animate-bounce -right-4 text-white/10" size={120} />
             <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <p className="text-xs font-bold text-blue-100 leading-relaxed max-w-[240px]">
                  "Implement algorithmic hedging for high-volatility nodes to prevent systemic portfolio slippage."
                </p>
                <Button variant="outline" className="w-fit text-[10px] font-black h-8 border-white/20 text-white hover:bg-white hover:text-blue-600">
                  Execute Mitigation
                </Button>
             </div>
          </div>
        </Card>
      </div>

      {/* Grid of Micro-Insights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Zap, color: 'indigo', title: 'Optimization Loop', desc: 'Identify 3 projects with redundant team allocations for 12% margin lift.' },
          { icon: BarChart2, color: 'blue', title: 'Market Correlates', desc: 'Budget trajectory aligns with 94th percentile of industry tech-growth.' },
          { icon: BrainCircuit, color: 'emerald', title: 'Convergence Point', desc: 'Core initiatives reaching strategic milestones 14 days ahead of Gantt.' }
        ].map((item, idx) => (
          <Card key={idx} padding="large" withHover className="flex flex-col gap-8 h-full bg-slate-50/50">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${item.color}-50 border border-${item.color}-100`}>
              <item.icon className={`text-${item.color}-600`} size={28} />
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-slate-900 uppercase tracking-tight italic text-lg leading-none">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
            <button className="mt-auto group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-slate-900 transition-colors">
              Request Documentation <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Card>
        ))}
      </section>
    </div>
  );
}
