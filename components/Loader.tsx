import React from 'react';
import { Fish } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
        <Fish className="w-16 h-16 text-cyan-500 animate-bounce relative z-10" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-serif font-bold text-white tracking-widest uppercase">MVS Aqua</h2>
        <div className="w-24 h-0.5 bg-slate-800 mt-2 overflow-hidden rounded-full">
          <div className="w-full h-full bg-cyan-500 origin-left animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default Loader;