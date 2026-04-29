import React from 'react';
import { Search, Bell, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-10 flex items-center justify-between">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Quick search... (⌘ + K)" 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-xl transition-all active:scale-95 group">
          <Bell className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full border border-white" />
        </button>

        <div className="h-8 w-[1px] bg-slate-100" />

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">Strategic Lead</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-blue-200 transition-colors">
            {user?.name ? (
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=0f172a`} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <UserIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
