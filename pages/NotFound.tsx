import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Ghost } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/10 blur-[120px] rounded-full" />
        <Ghost className="w-32 h-32 text-slate-800 relative z-10" />
      </div>
      <h1 className="text-8xl font-serif font-bold text-slate-800 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Lost at Sea?</h2>
      <p className="text-slate-500 max-w-md mb-12 leading-relaxed">
        The page you are looking for has drifted away. It might have been moved or doesn't exist anymore.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          to="/" 
          className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all flex items-center gap-2 shadow-xl shadow-cyan-900/20"
        >
          <Home className="w-4 h-4" /> Home Page
        </Link>
        <Link 
          to="/shop" 
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all flex items-center gap-2"
        >
          <Search className="w-4 h-4" /> Browse Shop
        </Link>
      </div>
    </div>
  );
};

export default NotFound;