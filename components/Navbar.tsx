
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Fish, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAdmin) {
    links.push({ name: 'Dashboard', path: '/admin/dashboard' });
  }

  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/91${STORE_CONFIG.whatsapp}`, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <Fish className="w-8 h-8 text-cyan-500 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              MVS Aqua
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  location.pathname === link.path ? 'text-cyan-500' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={handleWhatsAppChat}
              className="p-2 hover:bg-green-500/10 rounded-full transition-colors text-green-500 hidden sm:flex"
              title="Chat with Us"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <Link to="/admin" className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
              <User className="w-5 h-5" />
            </Link>
            <button 
              onClick={onOpenCart}
              className="relative p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-slate-950">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-slate-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleWhatsAppChat}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-green-500 hover:bg-green-500/10"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Support
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
