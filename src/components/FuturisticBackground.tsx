import React from 'react';
import { motion } from 'motion/react';
import { Globe2 } from 'lucide-react';

export const FuturisticBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Cinematic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/20" />
      
      {/* Animated Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 
          }}
          animate={{
            y: [null, '-20%', '120%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
    </div>
  );
};

export const GlobeVisualization: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Core Pulse */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Rotating Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-80 h-80 border border-blue-500/30 rounded-full flex items-center justify-center"
        >
          <div className="w-72 h-72 border border-blue-400/20 rounded-full border-dashed" />
        </motion.div>

        {/* The Globe Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              filter: ['drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))', 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))', 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))']
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Globe2 className="w-32 h-32 text-blue-400" strokeWidth={1} />
          </motion.div>
        </div>

        {/* Orbiting Points */}
        {[0, 120, 240].map((rot) => (
          <motion.div
            key={rot}
            className="absolute inset-0"
            animate={{ rotate: rot + 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
