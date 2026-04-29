import { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  Share2, 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon, 
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Filter
} from "lucide-react";
import { motion } from "motion/react";
import { Card, Button } from "@/components/ui";
import { formatCurrency, formatPercentage } from "@/utils/calculations";
import { cn } from "@/utils/cn";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";

export default function Reports() {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const [isExporting, setIsExporting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isActionProcessing, setIsActionProcessing] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const handleFilter = () => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 1000);
  };

  const handleAction = () => {
    setIsActionProcessing(true);
    setTimeout(() => setIsActionProcessing(false), 1500);
  };

  if (loading) return <div className="h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" /></div>;

  const chartData = reportData?.projects.map((p: any) => ({
    name: p.name,
    budget: p.budget / 1000000,
    roi: p.roi
  })) || [];

  const pieData = Object.entries(reportData?.distribution || {}).map(([name, value]) => ({
    name,
    value: value as number
  }));

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
              <FileText size={32} />
           </div>
           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2 italic">Executive Summary</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-none mt-2">Strategic Portfolio Distribution & Performance Analytics</p>
           </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleFilter} loading={isFiltering} className="gap-2">
            <Filter size={16} /> Filter Data
          </Button>
          <Button onClick={handleExport} loading={isExporting} className="gap-2 bg-slate-900">
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </section>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Capital Committed', val: formatCurrency(reportData.metrics.totalCapital), icon: Zap, color: 'blue' },
          { label: 'Weighted Portfolio Yield', val: `+${reportData.metrics.weightedYield.toFixed(1)}%`, icon: TrendingUp, color: 'emerald' },
          { label: 'Volatility Index', val: `${reportData.metrics.volatilityIndex.toFixed(1)}%`, icon: Shield, color: 'amber' },
          { label: 'Total Active Nodes', val: reportData.metrics.activeNodes, icon: ChevronRight, color: 'indigo' }
        ].map((stat, i) => (
          <Card key={i} className="bg-white border-2 border-slate-50 flex flex-col items-center text-center p-8 transition-all hover:bg-slate-50">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-6`}>
              <stat.icon size={24} className={`text-${stat.color}-600`} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 leading-none">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight leading-none italic">{stat.val}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ROI Distribution Chart */}
        <Card className="lg:col-span-8 p-10 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_rgba(15,23,42,1)]" noShadow>
           <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                    <BarChartIcon size={20} />
                 </div>
                 <h3 className="text-lg font-black italic uppercase tracking-tight">Initiative ROI Distribution</h3>
              </div>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-600" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Projections</span>
              </div>
           </div>
           
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }} 
                    dy={16}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 900 }}
                  />
                  <Bar dataKey="roi" radius={[8, 8, 0, 0]} fill="#2563EB">
                    {chartData.map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.roi > 25 ? '#10B981' : '#2563EB'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Portfolio Balance Pie */}
        <Card className="lg:col-span-4 p-10 bg-slate-900 text-white border-none" withHover>
           <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                 <PieChartIcon size={20} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-black italic uppercase tracking-tight">Status Distribution</h3>
           </div>

           <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={100}
                    outerRadius={130}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                 <span className="text-5xl font-black italic tracking-tighter">{pieData.length}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Statuses</span>
              </div>
           </div>

           <div className="mt-12 space-y-4">
              {pieData.map((entry, index) => (
                 <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                       <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{entry.name}</span>
                    </div>
                    <span className="text-sm font-black italic">{entry.value} Nodes</span>
                 </div>
              ))}
           </div>
        </Card>
      </div>

      {/* Narrative Synthesis */}
      <Card className="p-10 border-dashed border-2 border-slate-200">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
               <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-4">Strategic Narrative Synthesis</h3>
               <p className="text-slate-500 font-medium leading-relaxed italic text-lg">
                  "{reportData.executiveSummary}"
               </p>
            </div>
            <div className="flex gap-4">
               <Button variant="secondary" onClick={handleAction} loading={isActionProcessing} className="h-16 px-10 rounded-2xl border-2 border-slate-200 font-black uppercase tracking-[0.2em] text-[10px]">
                  Request Audit
               </Button>
               <Button onClick={handleAction} loading={isActionProcessing} className="h-16 px-10 rounded-2xl bg-blue-600 shadow-xl shadow-blue-100 font-black uppercase tracking-[0.2em] text-[10px]">
                  Share with HQ
               </Button>
            </div>
         </div>
      </Card>
    </div>
  );
}
