
import React from 'react';

interface NavigationProps {
  currentView: string;
  navigate: (v: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, navigate }) => {
  const links = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'tasks', label: 'Tasks', icon: '✅' },
    { id: 'guide', label: 'Guide', icon: '🧠' },
    { id: 'progress', label: 'Stats', icon: '📈' },
    { id: 'memory', label: 'Memory', icon: '💾' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-16 hidden md:flex items-center justify-between px-8">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">G</span>
          GROWTH AI
        </div>
        <nav className="flex items-center gap-1">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === link.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/20"></div>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 md:hidden flex items-center justify-around py-3 px-4">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => navigate(link.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentView === link.id ? 'text-indigo-400' : 'text-zinc-500'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">{link.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
