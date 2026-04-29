import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { formatCurrency } from '@/utils/calculations';
import { TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  roi: number;
  risk: number;
  budget: number;
  score: number;
}

interface AlphaProjectionMapProps {
  projects: Project[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
     return (
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white/95 backdrop-blur-xl border border-slate-200 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl min-w-[200px]"
      >
        <div className="flex items-center gap-2 mb-3">
           <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
           <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{data.name}</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-1">Alpha Yield</p>
              <p className="text-2xl font-bold text-slate-900 leading-none">+{data.roi}%</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-1">Risk Profile</p>
              <p className="text-lg font-bold text-slate-600 leading-none">{data.risk}%</p>
            </div>
          </div>
          
          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Capital Allocation</span>
            <span className="text-[11px] font-bold text-blue-600">{formatCurrency(data.budget)}</span>
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
};

const StrategicNode = (props: any) => {
  const { cx, cy, fill, payload, isAIIconic, r } = props;
  
  if (typeof cx !== 'number' || typeof cy !== 'number' || typeof r !== 'number' || isNaN(cx) || isNaN(cy) || isNaN(r)) {
    return null;
  }
  
  return (
    <g>
      {/* Dynamic Glow Layer */}
      {isAIIconic && (
        <circle 
          cx={cx} 
          cy={cy} 
          r={r + 15} 
          fill={fill} 
          fillOpacity={0.08} 
          className="animate-[pulse_4s_infinite]" 
        />
      )}
      
      {/* Outer Halo */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={r + 4} 
        fill={fill} 
        fillOpacity={0.1} 
      />

      {/* Main Bubble with Glassmorphism / Gradient */}
      <defs>
        <radialGradient id={`grad-${payload.id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.6} />
          <stop offset="100%" stopColor={fill} stopOpacity={1} />
        </radialGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
        </filter>
      </defs>

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={`url(#grad-${payload.id})`}
        stroke="#FFFFFF"
        strokeWidth={1.5}
        filter="url(#shadow)"
        className="transition-all duration-300 hover:scale-110 cursor-pointer"
      />

      {/* Inner Highlight Point */}
      <circle 
        cx={cx - r/3} 
        cy={cy - r/3} 
        r={r/4} 
        fill="white" 
        fillOpacity={0.3} 
      />
    </g>
  );
};

const LeaderLabel = (props: any) => {
  const { cx, cy, color, label, icon: Icon } = props;
  if (typeof cx !== 'number' || typeof cy !== 'number' || isNaN(cx) || isNaN(cy)) return null;

  return (
    <g className="pointer-events-none">
      {/* Anchor Glow */}
      <circle cx={cx} cy={cy} r={24} fill={color} fillOpacity={0.1} className="animate-pulse" />
      
      {/* Precision Leader Line Path */}
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        d={`M ${cx} ${cy} L ${cx + 40} ${cy - 40} L ${cx + 80} ${cy - 40}`} 
        stroke={color} 
        strokeWidth={1.5} 
        fill="none" 
      />
      
      <foreignObject x={cx + 85} y={cy - 68} width="180" height="70">
        <motion.div 
          initial={{ x: 15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center gap-3 bg-white/95 backdrop-blur-xl border border-slate-200/50 p-2.5 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)]"
          style={{ borderLeft: `4px solid ${color}` }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: `${color}10` }}>
            <Icon size={16} color={color} strokeWidth={3} />
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider leading-none">Automated Protocol</p>
            <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight leading-none truncate">{label}</p>
          </div>
        </motion.div>
      </foreignObject>
    </g>
  );
};

import { Badge } from "./ui/Badge";

export const AlphaProjectionMap = ({ projects }: AlphaProjectionMapProps) => {
  const highlights = useMemo(() => {
    if (!projects.length) return [];
    
    const sortedByROI = [...projects].sort((a, b) => b.roi - a.roi);
    const sortedByRisk = [...projects].sort((a, b) => b.risk - a.risk);

    return [
      { ...sortedByROI[0], label: "Top Alpha Target", color: "#10B981", icon: Zap },
      { ...sortedByRisk[0], label: "High Risk Cluster", color: "#F43F5E", icon: AlertTriangle },
    ].filter(h => h.id);
  }, [projects]);

  return (
    <div className="relative w-full h-full bg-[#FCFDFE] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-inner">
      {/* Strategy Zones Background Labels */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="grid grid-cols-2 grid-rows-2 h-full opacity-[0.03] select-none">
          <div className="border-r border-b border-slate-200 flex items-center justify-center">
            <span className="text-[14rem] font-bold uppercase -rotate-12">Alpha</span>
          </div>
          <div className="border-b border-slate-200 flex items-center justify-center">
            <span className="text-[14rem] font-bold uppercase -rotate-12">Growth</span>
          </div>
          <div className="border-r border-slate-200 flex items-center justify-center">
            <span className="text-[14rem] font-bold uppercase -rotate-12">Pivot</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-[14rem] font-bold uppercase -rotate-12">Exit</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 120, right: 220, bottom: 100, left: 100 }}>
          <defs>
            <linearGradient id="q-green" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="q-blue" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="q-red" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="q-amber" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="1 4" 
            vertical={false} 
            stroke="#E2E8F0" 
          />
          
          <ReferenceArea x1={0} x2={50} y1={50} y2={100} fill="url(#q-green)" />
          <ReferenceArea x1={50} x2={100} y1={50} y2={100} fill="url(#q-blue)" />
          <ReferenceArea x1={50} x2={100} y1={0} y2={50} fill="url(#q-red)" />
          <ReferenceArea x1={0} x2={50} y1={0} y2={50} fill="url(#q-amber)" />

          <ReferenceLine x={50} stroke="#E2E8F0" strokeWidth={2} strokeDasharray="5 5" />
          <ReferenceLine y={50} stroke="#E2E8F0" strokeWidth={2} strokeDasharray="5 5" />

          <XAxis 
            type="number" 
            dataKey="risk" 
            domain={[0, 100]} 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
            label={{ value: 'SYSTEMIC VOLATILITY INDEX (%)', position: 'bottom', offset: 40, fontSize: 10, fontWeight: 600, fill: '#64748B', className: 'font-semibold' }}
            ticks={[0, 25, 50, 75, 100]}
          />
          <YAxis 
            type="number" 
            dataKey="roi" 
            domain={[0, 100]} 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
            label={{ value: 'EXPECTED ALPHA YIELD (%)', angle: -90, position: 'left', offset: 30, fontSize: 10, fontWeight: 600, fill: '#64748B', className: 'font-semibold' }}
            ticks={[0, 25, 50, 75, 100]}
          />
          <ZAxis type="number" dataKey="budget" range={[150, 1200]} />
          
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#3B82F6', strokeWidth: 2 }} />
          
          <Scatter 
            name="Strategic Assets" 
            data={projects} 
            shape={(props) => {
              const isHighlight = highlights.some(h => h.id === props.payload.id);
              return <StrategicNode {...props} isAIIconic={isHighlight} />;
            }}
          >
            {projects.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.risk > 50 ? '#F43F5E' : entry.roi > 50 ? '#10B981' : '#3B82F6'} 
              />
            ))}
          </Scatter>

          {/* AI Insight Overlay Series */}
          <Scatter 
            name="AI Insights" 
            data={highlights} 
            shape={(props) => {
              const h = highlights.find(item => item.id === props.payload.id);
              return <LeaderLabel {...props} label={h?.label} color={h?.color} icon={h?.icon} />;
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Floating Global Context Labels */}
       <div className="absolute top-12 left-12 pointer-events-none">
          <Badge className="bg-white/95 backdrop-blur-md text-emerald-600 border border-emerald-100 flex items-center gap-2 font-semibold text-[10px] px-5 py-2.5 uppercase shadow-sm rounded-full">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             Strategic Core
          </Badge>
       </div>
       <div className="absolute top-12 right-12 pointer-events-none">
          <Badge className="bg-white/95 backdrop-blur-md text-blue-600 border border-blue-100 flex items-center gap-2 font-semibold text-[10px] px-5 py-2.5 uppercase shadow-sm rounded-full">
             Expansion Vector <Zap size={11} fill="currentColor" />
          </Badge>
       </div>
       <div className="absolute bottom-12 left-12 pointer-events-none flex flex-col gap-2">
          <Badge className="bg-white/95 backdrop-blur-md text-slate-400 border border-slate-200 flex items-center gap-2 font-semibold text-[10px] px-5 py-2.5 uppercase shadow-sm rounded-full">
             Optimize Zone
          </Badge>
       </div>
    </div>
  );
};
