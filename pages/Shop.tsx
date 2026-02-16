import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, FilterX } from 'lucide-react';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(50000);

  const dynamicCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category.toLowerCase().trim()));
    return ['all', ...Array.from(cats)].sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const pCat = p.category.toLowerCase().trim();
      const matchesCategory = category === 'all' || pCat === category.toLowerCase().trim();
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = p.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (Number(b.featured || 0)) - (Number(a.featured || 0)));
        break;
    }

    return result;
  }, [products, category, searchTerm, sortBy, maxPrice]);

  const clearFilters = () => {
    setCategory('all');
    setSearchTerm('');
    setMaxPrice(50000);
    setSortBy('featured');
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      onAddToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <div className="flex flex-col mb-12">
        <h1 className="text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
          The Collection
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Browse our master-curated selection of rare exotic species and world-class aquascaping essentials.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all text-left ${
                    category === cat 
                      ? 'bg-cyan-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Max Price</h3>
              <span className="text-cyan-500 font-bold text-xs font-mono">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Sort</h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-300"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">A-Z Name</option>
            </select>
          </div>

          <button 
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-slate-700 text-slate-500 hover:text-white hover:border-slate-500 transition-all text-xs font-bold"
          >
            <FilterX className="w-4 h-4" /> Reset Filters
          </button>
        </aside>

        <div className="flex-1">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col"
                >
                  <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {product.option && (
                      <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                        {product.option}
                      </div>
                    )}
                    <button 
                      onClick={(e) => handleAddToCartClick(e, product)}
                      disabled={product.stock === 0}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-slate-900 font-bold text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                    >
                      {product.stock > 0 ? 'Quick Add' : 'Stock Out'}
                    </button>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{product.category}</span>
                      <span className="text-lg font-bold font-mono">₹{product.price.toLocaleString()}</span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                        {product.name}
                        {product.option && <span className="ml-2 text-sm text-slate-400 font-normal">({product.option})</span>}
                      </h3>
                    </Link>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {product.stock > 0 ? `Ready: ${product.stock}` : 'Coming Soon'}
                      </span>
                      <button 
                        onClick={(e) => handleAddToCartClick(e, product)}
                        disabled={product.stock === 0}
                        className="p-2 bg-slate-800 hover:bg-cyan-600 text-slate-400 hover:text-white rounded-xl transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-300">No matching items</h3>
              <p className="text-slate-500 mb-6">Try clearing filters or search terms.</p>
              <button onClick={clearFilters} className="text-cyan-500 font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;