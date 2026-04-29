import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Target,
  Zap,
  ChevronRight,
  Maximize2,
  Filter,
  Download,
  Share2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { KPICard } from "@/components/ui/KPICard";
import { Card, Button } from "@/components/ui";
import { formatCurrency, formatPercentage } from "@/utils/calculations";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import { AlphaProjectionMap } from "@/components/AlphaProjectionMap";
import { motion, AnimatePresence } from "motion/react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [projectsRes, insightsRes] = await Promise.all([
          fetch('/api/projects', { credentials: 'include' }),
          fetch('/api/insights', { credentials: 'include' })
        ]);
        
        if (!projectsRes.ok || !insightsRes.ok) {
          throw new Error("Connectivity lost. Strategic session terminated.");
        }

        const projects = await projectsRes.json();
        const insights = await insightsRes.json();
        
        setData({ projects, insights });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  if (loading) return <div className="h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" /></div>;

  if (error) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
      <AlertTriangle className="text-rose-500 w-12 h-12 mb-6" />
      <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">System Error</h3>
      <p className="text-slate-500 text-sm mt-2 max-w-sm">{error}</p>
      <Button onClick={() => window.location.reload()} className="mt-8">Retry Session</Button>
    </div>
  );

  const { projects, insights } = data;
  const totalAssets = projects.reduce((acc: number, p: any) => acc + p.budget, 0);
  const avgRisk = projects.reduce((acc: number, p: any) => acc + p.risk, 0) / projects.length;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shrink-0 shadow-xl shadow-slate-200">
              <Sparkles size={32} />
           </div>
           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2 italic uppercase">Intelligence Command</h1>
              <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                <ShieldCheck size={14} className="text-blue-600" />
                Growth Intelligence Platform
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                Live Strategic Sync
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleAction} loading={isProcessing} className="hidden sm:flex gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button variant="secondary" size="sm" onClick={handleAction} loading={isProcessing} className="hidden sm:flex gap-2">
            <Download size={16} /> Export
          </Button>
          <Button onClick={handleAction} loading={isProcessing} className="gap-2">
            <Maximize2 size={16} /> Fullscreen Insight
          </Button>
        </div>
      </section>

      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Consolidated Assets" 
          value={formatCurrency(totalAssets)} 
          icon={<DollarSign className="text-blue-600" />}
          trend={12.5}
        />
        <KPICard 
          label="Alpha Yield Index" 
          value={formatPercentage(insights.averageRoi)} 
          icon={<TrendingUp className="text-emerald-600" />}
          trend={4.2}
        />
        <KPICard 
          label="Risk Exposure" 
          value={formatPercentage(avgRisk)} 
          icon={<AlertTriangle className="text-amber-600" />}
          trend={-2.4}
        />
        <KPICard 
          label="Active Nodes" 
          value={insights.totalProjects} 
          icon={<Target className="text-indigo-600" />}
          suffix="Deployments"
        />
      </section>

      {/* Hero Visualization Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <section className="xl:col-span-8 flex flex-col gap-6">
          <Card className="p-0 border-none bg-transparent shadow-none">
            <div className="flex items-center justify-between px-2 mb-4">
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Alpha Projection Matrix</h2>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" /> Capital Units
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> ROI Correlation
                </div>
              </div>
            </div>
            <div className="h-[640px] w-full">
              <AlphaProjectionMap projects={projects} />
            </div>
          </Card>
        </section>

        {/* Strategic Insight Sidebar */}
        <section className="xl:col-span-4 flex flex-col gap-6">
          <Card className="bg-slate-900 text-white border-none p-8" withHover>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Stratos AI Insight</p>
                <h3 className="font-bold text-lg leading-none mt-0.5">Automated Analysis Report</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-slate-300 text-sm leading-relaxed font-medium italic">
                  "Current portfolio mapping indicates a heavy bias towards <span className="text-blue-400 font-bold underline decoration-blue-400/30">Growth Phase</span> nodes. Stratos recommends a strategic pivot of capital to <span className="text-emerald-400 font-bold underline decoration-emerald-400/30">Alpha Core</span> for risk mitigation."
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Key Recommendations</h4>
                <div className="space-y-3">
                  {[
                    "Initiate Vertex Alpha scaling +15%",
                    "Review Nova Initiative risk threshold",
                    "Consolidate Horizon Echo resource pool"
                  ].map((rec, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-xs font-semibold text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {rec}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-white text-slate-900 py-4 hover:bg-slate-100">
                Execute Pivot Plan
              </Button>
            </div>
          </Card>

          <Card padding="large" className="bg-blue-600/5 border-blue-100" withHover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Yield Forecasting</h3>
              <ArrowUpRight className="text-blue-600" size={16} />
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projects.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                  <Bar dataKey="roi" radius={[4, 4, 0, 0]}>
                    {projects.slice(0, 6).map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.roi > 20 ? '#2563EB' : '#94A3B8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-xl border border-blue-50 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-tighter text-slate-500">Forecast Accuracy</span>
                </div>
                <span className="text-sm font-black text-slate-900">99.8%</span>
            </div>
          </Card>
        </section>
      </div>

      {/* Secondary Data Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 italic uppercase tracking-tight">Project Smart-Score Matrix</h3>
            <Link to="/projects" className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2">
              All Units <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <tr>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Identification</th>
                  <th className="px-8 py-4">Intensity</th>
                  <th className="px-8 py-4 text-right">Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium">
                {projects.slice(0, 4).map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                        p.status === 'Active' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                      )}>
                        {p.status}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">{p.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Vector: {p.id.slice(0, 8).toUpperCase()}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: `${(p.budget / totalAssets) * 100}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">{formatPercentage((p.budget / totalAssets) * 100)}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-black text-emerald-600">+{p.roi}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="bg-slate-50 border-dashed border-slate-200 shadow-none flex flex-col items-center justify-center p-8 text-center group hover:bg-slate-100 transition-colors">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
             <Maximize2 size={24} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-bold text-slate-900 leading-tight mb-2">Initiate Market Simulation</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest max-w-[180px]">Run cross-market projection benchmarks</p>
          <Link to="/simulation" className="mt-8">
            <Button variant="outline" size="sm" className="bg-white">Launch Simulator</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}

