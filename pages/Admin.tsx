import React, { useState } from 'react';
import { Lock, LayoutDashboard, Package, LogOut, Plus, Trash2, Edit2, ShoppingBag, Eye, TrendingUp } from 'lucide-react';
import { Product, Order } from '../types.ts';
import ProductModal from '../components/ProductModal.tsx';

interface AdminProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (p: Omit<Product, 'id'>) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
  onViewOrder: (order: Order) => void;
}

const Admin: React.FC<AdminProps> = ({ 
  products, orders, onAddProduct, onUpdateProduct, onDeleteProduct, onLogout, onViewOrder 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { label: 'Active Catalog', value: products.length, icon: Package, color: 'text-cyan-500' },
    { label: 'Total Sales', value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Orders (WA)', value: orders.length, icon: ShoppingBag, color: 'text-purple-500' },
  ];

  const handleOpenAddProduct = () => { 
    setEditingProduct(null); 
    setIsProductModalOpen(true); 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-2 shrink-0 no-print">
        <nav className="space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Stats' },
            { id: 'products', icon: Package, label: 'Inventory' },
            { id: 'orders', icon: ShoppingBag, label: 'Order History' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900'}`}
            >
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="pt-8 mt-8 border-t border-slate-800">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 font-medium"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden min-h-[600px] no-print">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold">Admin Performance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-slate-900 ${stat.color}`}><stat.icon className="w-6 h-6" /></div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Stock</h2>
              <button 
                onClick={handleOpenAddProduct} 
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="grid gap-4">
              {products.map(p => (
                <div key={p.id} className="p-4 bg-slate-800 rounded-2xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={p.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt={p.name} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{p.name}</p>
                        <span className="text-[9px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono border border-slate-600">SKU: {p.sku}</span>
                      </div>
                      <p className="text-xs text-slate-500">₹{p.price.toLocaleString()} • {p.weight}kg • Stock: {p.stock}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => onDeleteProduct(p.id)} className="p-2 hover:bg-slate-700 rounded-lg text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sales Log</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-500 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4 text-right">Total (₹)</th>
                    <th className="px-6 py-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-mono text-cyan-500 text-xs">#{order.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                      <td className="px-6 py-4 text-right font-bold text-white">₹{order.total.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => onViewOrder(order)} className="p-2 hover:bg-cyan-600 rounded-lg text-slate-400 hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onSave={onAddProduct} editingProduct={editingProduct} />
    </div>
  );
};

export const AdminLogin: React.FC<{ onLogin: (role: 'admin') => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') onLogin('admin');
    else alert('Invalid admin credentials.');
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[3rem] p-12 space-y-10 shadow-2xl relative">
        <div className="text-center">
          <div className="inline-flex p-5 bg-cyan-900/20 rounded-[2rem] mb-6 text-cyan-500"><Lock className="w-10 h-10" /></div>
          <h1 className="text-3xl font-serif font-bold">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="Username" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none focus:ring-1 focus:ring-cyan-500" placeholder="Password" />
          <button type="submit" className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all shadow-xl uppercase tracking-widest text-xs">Authenticate</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;