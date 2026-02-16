
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Droplets, ShieldCheck, Truck, Plus } from 'lucide-react';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart }) => {
  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Aquarium" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
              Breathe Life Into Your <span className="text-cyan-500">Space</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Discover a curated collection of rare exotic fish, professional grade aquascaping supplies, and premium aquarium equipment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all flex items-center gap-2 group shadow-xl shadow-cyan-900/20"
              >
                Explore Shop <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-full transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Droplets, title: 'Bio-Secure Supply', desc: 'All livestock goes through rigorous quarantine protocols before shipping.' },
            { icon: ShieldCheck, title: 'Unboxing Protection', desc: 'Full refund support for any transit damages with mandatory unboxing video proof.' },
            { icon: Truck, title: 'Standard Courier', desc: 'Secure dispatch via ST & Professional Courier every Monday for maximum health.' }
          ].map((feat, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="p-4 bg-cyan-900/20 rounded-2xl">
                <feat.icon className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Editor's Choice</h2>
            <p className="text-slate-500">Our most requested premium items this week.</p>
          </div>
          <Link to="/shop" className="text-cyan-500 hover:text-cyan-400 font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div key={product.id} className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all">
              <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/20">
                  {product.category.toUpperCase()}
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 truncate">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock === 0}
                    className="p-3 bg-slate-800 hover:bg-cyan-600 transition-colors rounded-xl disabled:opacity-30"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
