import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MessageCircle, Instagram, Youtube, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import GeminiAssistant from './components/GeminiAssistant';
import Invoice from './components/Invoice';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Admin, { AdminLogin } from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import { Product, CartItem, User, Order } from './types';
import { MOCK_PRODUCTS, STORE_CONFIG } from './constants';
import { cloudService } from './services/firebase';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const refreshData = useCallback(async () => {
    try {
      const db = await cloudService.getDB();
      if (!db || !db.products || db.products.length === 0) {
        setProducts(MOCK_PRODUCTS);
        await cloudService.saveDB({ products: MOCK_PRODUCTS, orders: [] });
      } else {
        setProducts(db.products || []);
        setOrders(db.orders || []);
      }
    } catch (err) {
      console.error("Critical: Database Sync Failure", err);
      setProducts(MOCK_PRODUCTS);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const unsubscribe = cloudService.subscribe((db) => {
      if (db) {
        setProducts(db.products || []);
        setOrders(db.orders || []);
      }
    });

    const savedCart = localStorage.getItem('mvsaqua_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      } catch (e) {
        localStorage.removeItem('mvsaqua_cart');
      }
    }
    
    const savedUser = localStorage.getItem('mvsaqua_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('mvsaqua_user');
      }
    }

    return unsubscribe;
  }, [refreshData]);

  useEffect(() => {
    localStorage.setItem('mvsaqua_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddProduct = async (p: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...p, id: `PROD-${Date.now()}` };
    const updated = [newProduct, ...products];
    setProducts(updated);
    await cloudService.saveDB({ products: updated });
  };

  const handleUpdateProduct = async (updated: Product) => {
    const newList = products.map(p => p.id === updated.id ? updated : p);
    setProducts(newList);
    await cloudService.saveDB({ products: newList });
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Delete this product?")) {
      const newList = products.filter(p => p.id !== id);
      setProducts(newList);
      await cloudService.saveDB({ products: newList });
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: Math.min(50, item.quantity + 1) } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.min(50, Math.max(1, item.quantity + delta)) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const generateWhatsAppUrl = (order: Order) => {
    const addr = String(order.customerAddress || 'No Address Provided');
    let message = `*MVS AQUA - NEW ORDER REQUEST*\n`;
    message += `--------------------------------\n`;
    message += `*Order ID:* #${order.id}\n`;
    message += `*Date:* ${order.date}\n\n`;
    message += `*Items:*\n`;
    order.items.forEach(item => {
      message += `• ${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\n*Order Summary:*\n`;
    message += `• Total Weight: ${order.totalWeight.toFixed(2)} KG\n`;
    message += `• Subtotal: ₹${order.subtotal.toLocaleString()}\n`;
    message += `• Shipping (₹80/KG): ₹${order.shippingCharge.toLocaleString()}\n`;
    message += `*GRAND TOTAL: ₹${order.total.toLocaleString()}*\n\n`;
    message += `*Shipping Address:*\n${addr}\n\n`;
    message += `*Instructions:*\n`;
    message += `Please share payment screenshot for confirmation (GPay: 9490255775).`;
    
    return `https://wa.me/91${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const handleCheckout = async (address: string) => {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalWeight = cart.reduce((acc, item) => acc + (item.weight || 0.1) * item.quantity, 0);
    const shippingCharge = Math.ceil(totalWeight) * STORE_CONFIG.shippingRatePerKg;
    
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleString(),
      customerName: user ? 'Admin' : 'MVS Customer',
      customerEmail: user?.email || '',
      customerAddress: String(address),
      items: [...cart],
      subtotal,
      totalWeight,
      shippingCharge,
      tax: 0,
      total: subtotal + shippingCharge,
      status: 'Processing'
    };

    const whatsappUrl = generateWhatsAppUrl(order);

    // Save order to history (for Admin access later)
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    
    // Explicitly ensure currentOrder is NOT set for customers to remove the intermediate invoice page
    // setCurrentOrder(order); 

    setCart([]);
    setIsCartOpen(false);

    try {
      await cloudService.saveDB({ orders: updatedOrders });
    } catch (err) {
      console.error("Local save failed", err);
    }

    // Use window.open with _blank to avoid "Refused to connect" error in framed environments.
    // This allows the browser to correctly open the WhatsApp app or site.
    window.open(whatsappUrl, '_blank');
  };

  const handleLogin = (role: 'admin') => {
    const newUser: User = { uid: '1', email: 'admin@mvs.aqua', role };
    setUser(newUser);
    localStorage.setItem('mvsaqua_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mvsaqua_user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} isAdmin={user?.role === 'admin'} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleLogin} />} />
            <Route path="/admin/dashboard" element={user?.role === 'admin' ? (
              <Admin 
                products={products} orders={orders}
                onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct}
                onLogout={handleLogout} onViewOrder={(order) => setCurrentOrder(order)}
              />
            ) : <Navigate to="/admin" />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <a 
          href={`https://wa.me/91${STORE_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-[100] bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-900/40 transition-all hover:scale-110 active:scale-95 group flex items-center gap-2 overflow-hidden max-w-[56px] hover:max-w-[200px]"
        >
          <MessageCircle className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="whitespace-nowrap font-bold text-sm pr-2 opacity-0 group-hover:opacity-100 transition-opacity">Chat on WhatsApp</span>
        </a>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onCheckout={handleCheckout} />
        
        {/* Invoice component only renders when manually triggered (like from Admin dashboard) */}
        {currentOrder && (
          <Invoice 
            order={currentOrder} 
            onClose={() => setCurrentOrder(null)} 
            whatsappLink={generateWhatsAppUrl(currentOrder)}
          />
        )}
        <GeminiAssistant />

        <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4 mt-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">MVS Aqua</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{STORE_CONFIG.address}</p>
              <div className="flex gap-4">
                <a href={`https://instagram.com/${STORE_CONFIG.instagram}`} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:text-cyan-400 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href={`https://youtube.com/@${STORE_CONFIG.youtube}`} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:text-cyan-400 transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Store Support</h3>
              <a 
                href={`https://wa.me/91${STORE_CONFIG.whatsapp}`}
                target="_blank"
                className="block p-4 bg-slate-800/50 border border-slate-700 rounded-2xl group hover:border-green-500/50 transition-all"
              >
                <p className="text-sm font-bold text-white group-hover:text-green-500 transition-colors">+91 {STORE_CONFIG.whatsapp}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Tap to Chat on WhatsApp</p>
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Policies</h3>
              <ul className="text-slate-500 text-xs space-y-3">
                <li>• Prepaid only. No COD.</li>
                <li>• Unboxing video mandatory for claims.</li>
                <li>• Dispatches happen every Monday.</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/50 text-center">
            <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">© {new Date().getFullYear()} MVS Aqua Premium.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;