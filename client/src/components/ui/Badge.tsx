import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: "bg-blue-50 text-blue-700",
    secondary: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
    outline: "border border-slate-200 text-slate-600"
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
