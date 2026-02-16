
import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, MapPin, Send, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: (address: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const [address, setAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!showAddressForm) {
      setShowAddressForm(true);
    } else {
      // User requested to remove the validation alert. 
      // Proceeding directly to checkout redirection.
      setIsProcessing(true);
      onCheckout(address);
      
      // The parent component handles redirection, but we reset UI state 
      // so it's fresh if they return to the app via browser 'back' button.
      setTimeout(() => {
        setIsProcessing(false);
        setAddress('');
        setShowAddressForm(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-cyan-500" />
            <h2 className="text-xl font-bold">{showAddressForm ? 'Shipping Details' : 'Your Cart'}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!showAddressForm ? (
            items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <ShoppingCart className="w-16 h-16 opacity-20" />
                <p className="text-lg">Your cart is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{item.name}</h3>
                      <p className="text-sm text-slate-400">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-800">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-cyan-400 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-cyan-400 disabled:opacity-50"
                            disabled={item.quantity >= 50}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-cyan-500">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl">
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Delivery Note:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We dispatch parcels on <b>MONDAYS</b> only. Shipping is charged at ₹80/KG. <b>PREPAID ONLY.</b>
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Full Delivery Address & Pincode</label>
                <textarea 
                  rows={6}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address for courier..."
                  disabled={isProcessing}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white resize-none disabled:opacity-50"
                />
              </div>
              <button 
                onClick={() => setShowAddressForm(false)}
                disabled={isProcessing}
                className="text-xs text-slate-500 hover:text-white transition-colors uppercase font-bold tracking-widest disabled:opacity-0"
              >
                ← Back to Items
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-800 bg-slate-900/50">
            <div className="flex justify-between mb-4">
              <span className="text-slate-400">{showAddressForm ? 'Order Subtotal' : 'Subtotal'}</span>
              <span className="text-xl font-bold">₹{subtotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleProceed}
              disabled={isProcessing}
              className={`w-full py-4 ${isProcessing ? 'bg-slate-700' : 'bg-cyan-600 hover:bg-cyan-500'} text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
            >
              {isProcessing ? (
                <>Opening WhatsApp... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : showAddressForm ? (
                <>Confirm & Checkout <Send className="w-4 h-4" /></>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
