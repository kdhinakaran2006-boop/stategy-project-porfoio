import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export function ChartCard({ title, subtitle, children, className, footer }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[450px]",
        className
      )}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-slate-500 text-[13px] font-normal mt-1">{subtitle}</p>}
      </div>
      <div className="flex-1 w-full min-h-[300px] relative">
        <div className="absolute inset-0 pt-4">
          {children}
        </div>
      </div>
      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
