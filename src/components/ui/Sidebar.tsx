import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Lightbulb, 
  TrendingUp, 
  MessageSquare, 
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/projects", icon: Briefcase, label: "Projects" },
  { to: "/insights", icon: Lightbulb, label: "Insights" },
  { to: "/reports", icon: Sparkles, label: "Reports" },
  { to: "/simulation", icon: TrendingUp, label: "Laboratory" },
  { to: "/chat", icon: MessageSquare, label: "Stratos AI" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <motion.aside 
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 flex flex-col transition-all duration-300"
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          {!collapsed && (
            <span className="font-black text-slate-900 text-xl tracking-tight italic uppercase">Stratos</span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-10 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive: linkActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-50 text-blue-600 font-semibold" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-bar"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"
                />
              )}
              <item.icon 
                className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-50">
        <button 
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all group",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span className="text-sm font-semibold uppercase tracking-wider">Sign Out</span>}
        </button>
        
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 w-full flex justify-center py-2 text-slate-300 hover:text-slate-900 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
};
