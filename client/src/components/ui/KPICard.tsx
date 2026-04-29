import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './index';
import { cn } from '@/utils/cn';

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  suffix?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, trend, icon, suffix }) => {
  return (
    <Card className="kpi-gradient-accent pt-8 transition-transform hover:scale-[1.02]" withHover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
            {suffix && <span className="text-sm font-bold text-slate-400">{suffix}</span>}
          </div>
          
          {trend !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-3 px-2 py-1 rounded-lg text-xs font-bold inline-flex",
              trend >= 0 ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
            )}>
              {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(trend)}% vs last month
            </div>
          )}
        </div>
        
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
          {icon}
        </div>
      </div>
    </Card>
  );
};
