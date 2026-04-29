import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
  withHover?: boolean;
  noShadow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'medium', withHover = false, noShadow = false, ...props }, ref) => {
    const paddings = {
      none: 'p-0',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'premium-card',
          !noShadow && 'shadow-premium',
          variant === 'glass' && 'glass-effect',
          withHover && 'premium-card-hover',
          paddings[padding],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-slate-900 text-white hover:bg-blue-600 shadow-sm active:scale-95',
      secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
      outline: 'bg-transparent text-slate-900 border border-slate-200 hover:bg-slate-50',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      danger: 'bg-rose-500 text-white hover:bg-rose-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg',
      md: 'px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-xl',
      lg: 'px-8 py-3.5 text-base font-bold rounded-2xl',
      icon: 'p-2 rounded-xl',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={loading || props.disabled}
        {...props as any}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
