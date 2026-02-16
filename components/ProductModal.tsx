import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> & { id?: string }) => void;
  editingProduct?: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, editingProduct }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    sku: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    stock: 0,
    weight: 0.1,
    option: '',
    featured: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        sku: editingProduct.sku || '',
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        imageUrl: editingProduct.imageUrl,
        stock: editingProduct.stock,
        weight: editingProduct.weight || 0.1,
        option: editingProduct.option || '',
        featured: editingProduct.featured || false
      });
    } else {
      setFormData({
        sku: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stock: 0,
        weight: 0.1,
        option: '',
        featured: false
      });
    }
  }, [editingProduct, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editingProduct ? { ...formData, id: editingProduct.id } : formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold">{editingProduct ? 'Update Product' : 'Add Product'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Product SKU</label>
              <input required type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value.toUpperCase()})} placeholder="e.g., AQUA-001" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500 font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Product Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
              <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Price (₹)</label>
              <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Product Option (e.g., XL, 500ml)</label>
              <input type="text" value={formData.option} onChange={e => setFormData({...formData, option: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="Leave empty if none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
              <input required type="number" step="0.01" value={formData.weight} onChange={e => setFormData({...formData, weight: parseFloat(e.target.value)})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Stock</label>
              <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div className="flex items-end pb-3">
               <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500" />
                  <span className="text-xs font-bold text-slate-300 uppercase">Featured on Home</span>
               </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none resize-none focus:ring-1 focus:ring-cyan-500" />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase">Image</label>
            <div className="flex gap-2">
              <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-cyan-500" placeholder="Image URL" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 hover:bg-slate-700 transition-colors"><Upload className="w-4 h-4" /> <span className="text-xs">File</span></button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
             <Save className="w-5 h-5" /> {editingProduct ? 'Save Changes' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;