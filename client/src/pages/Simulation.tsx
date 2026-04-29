import { useState } from "react";
import { 
  Users, 
  DollarSign, 
  RefreshCw, 
  Play, 
  Info,
  Zap,
  Briefcase,
  Layers,
  Thermometer,
  CloudLightning,
  Microscope,
  Terminal,
  LineChart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, Button } from "@/components/ui";
import { formatPercentage } from "@/utils/calculations";
import { cn } from "@/utils/cn";

export default function Simulation() {
  const [budgetDelta, setBudgetDelta] = useState(0);
  const [teamDelta, setTeamDelta] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isPresetLoading, setIsPresetLoading] = useState(false);

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      setBudgetDelta(0);
      setTeamDelta(0);
      setResults(null);
      setIsResetting(false);
    }, 1000);
  };

  const handleLoadPreset = () => {
    setIsPresetLoading(true);
    setTimeout(() => {
      setBudgetDelta(25);
      setTeamDelta(10);
      setIsPresetLoading(false);
    }, 1200);
  };

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ budgetDelta, teamDelta })
      });
      const data = await res.json();
      if (data && data.results) setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shrink-0">
              <Layers size={32} />
           </div>
           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">Alpha Laboratory</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-none mt-2">Iterative Hypothesis & Deterministic Projections</p>
           </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleReset} loading={isResetting} className="gap-2">
            <RefreshCw size={16} /> Reset Lab
          </Button>
          <Button onClick={handleLoadPreset} loading={isPresetLoading} className="gap-2 bg-blue-600">
            <Terminal size={16} /> Load Preset
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Lab Controls */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="bg-white border-2 border-slate-900 p-8 shadow-[8px_8px_0px_rgba(15,23,42,1)]" noShadow>
            <div className="flex items-center gap-3 mb-10">
               <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
               <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs italic">System Parameters</h3>
            </div>
            
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                    <DollarSign size={14} className="text-blue-600" /> Capital Delta
                  </label>
                  <span className={cn("text-xl font-black italic", budgetDelta >= 0 ? "text-emerald-500" : "text-rose-500")}>
                    {budgetDelta > 0 ? '+' : ''}{budgetDelta}%
                  </span>
                </div>
                <input 
                  type="range" min="-50" max="100" step="5"
                  value={budgetDelta}
                  onChange={(e) => setBudgetDelta(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Users size={14} className="text-blue-600" /> Talent Shift
                  </label>
                  <span className={cn("text-xl font-black italic", teamDelta >= 0 ? "text-blue-600" : "text-rose-500")}>
                    {teamDelta > 0 ? '+' : ''}{teamDelta}%
                  </span>
                </div>
                <input 
                  type="range" min="-50" max="50" step="5"
                  value={teamDelta}
                  onChange={(e) => setTeamDelta(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900"
                />
              </div>
            </div>

            <Button 
              onClick={runSimulation}
              disabled={loading}
              className="w-full mt-12 py-8 bg-slate-900 hover:bg-blue-600 shadow-[4px_4px_0px_rgba(37,99,235,1)] transition-all"
            >
              {loading ? <RefreshCw className="animate-spin" /> : <Play className="fill-current" />}
              <span className="font-black uppercase tracking-widest text-sm ml-3">Compute Alpha Projection</span>
            </Button>
          </Card>

          <Card padding="large" className="bg-slate-50 border-dashed">
             <div className="flex items-center gap-4 text-slate-400">
                <Info size={18} />
                <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed">
                  Laboratory mode leverages deterministic cross-variant analysis for strategic prediction.
                </p>
             </div>
          </Card>
        </aside>

        {/* Results Area */}
        <main className="lg:col-span-8">
           <AnimatePresence mode="wait">
             {results ? (
               <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
               >
                 <Card className="bg-white p-0 border-slate-900 overflow-hidden border-2 shadow-[8px_8px_0px_rgba(15,23,42,1)]" noShadow>
                    <div className="grid grid-cols-1 md:grid-cols-12">
                       <div className="md:col-span-8 p-10 bg-slate-900 text-white">
                          <div className="flex items-center gap-3 mb-8">
                             <CloudLightning className="text-blue-400" size={20} />
                             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Deterministic Impact Report</h3>
                          </div>
                          <p className="text-3xl font-black tracking-tight leading-tight italic">
                             {results.impactSummary}
                          </p>
                       </div>
                       <div className="md:col-span-4 p-10 flex flex-col items-center justify-center border-l-2 border-slate-900 bg-blue-50">
                          <div className="w-24 h-24 rounded-full border-4 border-slate-900 flex flex-col items-center justify-center p-2 bg-white shadow-lg">
                             <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">P-VALUE</p>
                             <p className="text-3xl font-black text-slate-900 italic leading-none">0.99</p>
                          </div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 mt-6">Stable Projection</p>
                       </div>
                    </div>
                 </Card>

                 <Card className="p-0 overflow-hidden border-slate-200">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                          <tr>
                             <th className="px-8 py-5">Initiative Node</th>
                             <th className="px-8 py-5">Current ROI</th>
                             <th className="px-8 py-5">Hypothesis Yield</th>
                             <th className="px-8 py-5 text-right">Confidence</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50 font-medium">
                          {results.results.map((r: any) => (
                            <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                               <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                        <Briefcase size={18} />
                                     </div>
                                     <span className="font-bold text-slate-900 text-base italic uppercase tracking-tighter">{r.name}</span>
                                  </div>
                               </td>
                               <td className="px-8 py-6 text-slate-300 font-bold">+{r.oldRoi}%</td>
                               <td className="px-8 py-6 font-black">
                                  <span className={cn("text-xl italic", r.newRoi > r.oldRoi ? "text-emerald-600" : "text-rose-500")}>
                                     +{r.newRoi}%
                                  </span>
                               </td>
                               <td className="px-8 py-6 text-right">
                                  <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black tracking-widest uppercase">
                                     High Reliability
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </Card>
               </motion.div>
             ) : (
               <div className="h-[700px] border-4 border-dashed border-slate-200 rounded-[3.5rem] flex flex-col items-center justify-center p-20 text-center bg-slate-50/50">
                 <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-sm border border-slate-100 animate-bounce">
                    <Microscope size={48} className="text-slate-200" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">Laboratory Inactive</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-sm leading-relaxed">
                    Configure strategic deltas in the control terminal to execute projection computations.
                 </p>
               </div>
             )}
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
