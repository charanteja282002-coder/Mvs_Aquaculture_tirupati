
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, ShieldCheck, Heart, Truck } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 text-cyan-500">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <span className="px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-white mb-6">₹{product.price.toLocaleString()}</p>
            <p className="text-slate-400 leading-relaxed text-lg mb-4">{product.description}</p>
            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Shipping Weight: {product.weight} KG</p>
          </div>

          <div className="space-y-6 mt-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-900/20 active:scale-[0.98] disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase text-white">Unboxing Policy</h4>
                  <p className="text-[10px] text-slate-500">Video proof mandatory for transit damage claims.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Truck className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase text-white">Standard Delivery</h4>
                  <p className="text-[10px] text-slate-500">Dispatched every Monday. Fixed ₹80/KG shipping.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
