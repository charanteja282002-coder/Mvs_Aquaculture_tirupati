import React from 'react';
import { Printer, CheckCircle2, X, Fish, Phone, ShieldAlert, Calendar, MessageCircle, ArrowRight, Download } from 'lucide-react';
import { Order } from '../types';
import { STORE_CONFIG } from '../constants';

interface InvoiceProps {
  order: Order;
  onClose: () => void;
  whatsappLink?: string;
}

const Invoice: React.FC<InvoiceProps> = ({ order, onClose, whatsappLink }) => {
  const handlePrint = () => { 
    window.print(); 
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 overflow-y-auto py-8 printable-area">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md no-print" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 my-auto printable-invoice">
        {/* Actions Bar - Hidden in Print */}
        <div className="absolute top-6 right-8 flex gap-3 no-print z-10">
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-all shadow-md active:scale-95 text-xs font-bold"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button 
            onClick={handlePrint} 
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-all shadow-sm active:scale-95"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose} 
            className="p-3 bg-slate-100 hover:bg-red-100 hover:text-red-700 rounded-full text-slate-600 transition-all shadow-sm active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-10 border-b-2 border-slate-100">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2">
              <Fish className="w-8 h-8 text-cyan-600" />
              <span className="text-2xl font-serif font-bold">MVS Aqua</span>
            </div>
            <div className="text-right pr-24 sm:pr-0">
              <p className="font-bold text-lg uppercase tracking-tight">Tax Invoice #{order.id}</p>
              <p className="text-slate-500 text-sm">{order.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Authorized Store</p>
              <p className="font-bold text-slate-800">MVS Aqua Premium</p>
              <p className="text-xs text-slate-500 leading-relaxed">{STORE_CONFIG.address}</p>
              <p className="text-xs font-bold text-slate-800 mt-1">+91 {STORE_CONFIG.whatsapp}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Bill To</p>
              <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-medium">{order.customerAddress}</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-2xl mb-8 flex items-start gap-4 no-print">
            <CheckCircle2 className="w-6 h-6 text-cyan-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-cyan-900">Order is Official ✅</p>
              <p className="text-xs text-cyan-700">Thank you for choosing MVS Aqua. Your satisfaction is our priority 🥰</p>
            </div>
          </div>

          <table className="w-full text-left mb-8">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
                <th className="pb-4 font-bold">Item & SKU</th>
                <th className="pb-4 font-bold text-center">Qty</th>
                <th className="pb-4 font-bold text-right">Unit Price</th>
                <th className="pb-4 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {order.items.map((item, idx) => (
                <tr key={idx} className="text-sm">
                  <td className="py-4">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <div className="flex gap-2 items-center mt-1">
                       <span className="text-[10px] text-slate-500 font-mono">SKU: {item.sku || 'N/A'}</span>
                       <span className="text-[10px] text-slate-400 uppercase tracking-wide">• {item.weight} kg</span>
                    </div>
                  </td>
                  <td className="py-4 text-center font-medium">{item.quantity}</td>
                  <td className="py-4 text-right text-slate-600">₹{item.price.toLocaleString()}</td>
                  <td className="py-4 text-right font-bold text-slate-800">₹{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2 text-slate-500">
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
                  <Calendar className="w-3 h-3" /> Ship Date: Next Monday
               </div>
               <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-red-600">
                  <ShieldAlert className="w-3 h-3" /> Unboxing Video Mandatory
               </div>
            </div>
            <div className="w-full max-w-xs space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping ({order.totalWeight.toFixed(2)} kg)</span>
                <span className="font-medium">₹{order.shippingCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-slate-200 pt-3">
                <span className="text-slate-800">Grand Total</span>
                <span className="text-cyan-600">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {whatsappLink && (
            <a 
              href={whatsappLink}
              className="w-full py-5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3 no-print active:scale-[0.98]"
            >
              <MessageCircle className="w-6 h-6" /> Confirm via WhatsApp <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-800 flex items-center gap-2"><Phone className="w-4 h-4" /> Payment Details</h4>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                No Cash on delivery. <b>Prepaid Orders Only.</b><br />
                GPay / PhonePe: <span className="font-bold text-slate-900 underline underline-offset-2 decoration-cyan-500">94902 55775</span><br />
                <span className="italic mt-1 block font-medium">Please send the payment screenshot to WhatsApp for processing.</span>
              </div>
            </div>
            <div className="space-y-3 text-right">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-800">Transit Policy</h4>
              <div className="text-[11px] text-slate-600 leading-relaxed">
                Track your parcel: <a href={STORE_CONFIG.trackingUrl} className="text-cyan-600 font-bold underline" target="_blank">tpcindia.com</a><br />
                No replacement without <b>full unboxing video</b>. 💯<br />
                In case of DOA (Death on Arrival), 45% of item value is refunded.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;