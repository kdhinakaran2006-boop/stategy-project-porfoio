import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight, Briefcase, Plus, ArrowUpRight, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import { Card, Button } from "@/components/ui";
import { formatCurrency } from "@/utils/calculations";
import { cn } from "@/utils/cn";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    budget: 1000000,
    roi: 15,
    risk: 20,
    teamSize: 5,
    status: "Active",
    duration: 12
  });

  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilter = () => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 1000);
  };

  const fetchProjects = () => {
    fetch('/api/projects', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchProjects();
        setFormData({
          name: "",
          budget: 1000000,
          roi: 15,
          risk: 20,
          teamSize: 5,
          status: "Active",
          duration: 12
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 relative">
      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-xl rounded-[2.5rem] border-4 border-slate-900 shadow-[12px_12px_0px_rgba(15,23,42,1)] p-10"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
               <h3 className="text-2xl font-black italic uppercase tracking-tight">Provision New Node</h3>
               <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 font-black">CLOSE</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Initiative Denomination</label>
                   <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Project Zenith"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-blue-500 outline-none transition-all"
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Capital Delta ($)</label>
                   <input 
                    type="number" 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: Number(e.target.value)})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:border-blue-500"
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Target Alpha (%)</label>
                   <input 
                    type="number" 
                    value={formData.roi}
                    onChange={e => setFormData({...formData, roi: Number(e.target.value)})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:border-blue-500"
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Risk Frontier (%)</label>
                   <input 
                    type="number" 
                    value={formData.risk}
                    onChange={e => setFormData({...formData, risk: Number(e.target.value)})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:border-blue-500"
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Talent Count</label>
                   <input 
                    type="number" 
                    value={formData.teamSize}
                    onChange={e => setFormData({...formData, teamSize: Number(e.target.value)})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:border-blue-500"
                   />
                </div>
              </div>
              
              <Button type="submit" className="w-full h-16 bg-slate-900 shadow-[4px_4px_0px_rgba(37,99,235,1)] text-[11px] font-black uppercase tracking-widest mt-4">
                 Authorize Node Provisioning
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2 italic">Portfolio Directory</h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-none">Strategic Asset Registry &bull; Q2 Update</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter nodes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none w-full sm:w-64 transition-all"
            />
          </div>
          <Button variant="secondary" size="sm" onClick={handleFilter} loading={isFiltering} className="gap-2 font-black uppercase tracking-widest text-[10px]">
            <Filter size={16} /> Filters
          </Button>
          <Button onClick={() => setShowModal(true)} className="gap-2 bg-blue-600 shadow-lg shadow-blue-100 font-black uppercase tracking-widest text-[10px]">
            <Plus size={16} /> Provision Node
          </Button>
        </div>
      </section>

      {/* Stats Quickbar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card padding="small" className="flex items-center gap-4 bg-white/50 backdrop-blur-sm shadow-none">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <BarChart3 size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Units</p>
            <p className="text-lg font-black text-slate-900 italic leading-none">{projects.length}</p>
          </div>
        </Card>
      </section>

      {/* Projects Table/List */}
      <Card className="p-0 overflow-hidden border-slate-200 shadow-sm" withHover>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5">Strategic Node</th>
                <th className="px-8 py-5">Capitalization</th>
                <th className="px-8 py-5">Smart Score</th>
                <th className="px-8 py-5">Alpha Yield</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {loading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-8 py-8"><div className="h-6 bg-slate-50 rounded-lg w-full" /></td>
                  </tr>
                ))
              ) : filteredProjects.map((project, idx) => (
                <motion.tr 
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <Link to={`/projects/${project.id}`} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {project.id.slice(0, 8)}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-6">
                    <p className="text-slate-600 font-bold">{formatCurrency(project.budget)}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.score}%` }} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">{project.score}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-base font-black text-emerald-600">+{project.roi}%</span>
                  </td>
                  <td className="px-8 py-6 text-xs uppercase font-bold tracking-tighter">
                     <div className={cn(
                       "inline-flex px-3 py-1 rounded-lg",
                       project.status === 'Active' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                     )}>
                        {project.status}
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link to={`/projects/${project.id}`} className="inline-flex p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <ArrowUpRight size={20} />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
