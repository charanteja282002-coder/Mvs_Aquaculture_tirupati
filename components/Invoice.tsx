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
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm no-print" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 my-auto printable-invoice">
        {/* Actions Bar - Hidden in Print */}
        <div className="absolute top-8 right-8 flex gap-3 no-print z-10">
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-all shadow-lg active:scale-95 text-xs font-bold"
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

        <div className="p-12 border-b-2 border-slate-50">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-600 rounded-xl">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-serif font-bold tracking-tight">MVS Aqua</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl uppercase tracking-widest text-slate-400 mb-1">Tax Invoice</p>
              <p className="text-2xl font-mono font-bold">#{order.id}</p>
              <p className="text-slate-500 text-sm mt-1">{order.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div>
              <p className="text-[10px] font-bold text-cyan-600 uppercase mb-3 tracking-[0.2em]">Authorized Seller</p>
              <p className="font-bold text-slate-900 text-lg">MVS Aqua Premium Hub</p>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">{STORE_CONFIG.address}</p>
              <div className="flex items-center gap-2 mt-3 text-sm font-bold">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>+91 {STORE_CONFIG.whatsapp}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-cyan-600 uppercase mb-3 tracking-[0.2em]">Ship To</p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-medium">
                  {order.customerAddress || 'Customer Address Details'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-12">
          <table className="w-full text-left mb-10">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                <th className="pb-5 font-bold">Item Description</th>
                <th className="pb-5 font-bold text-center">Qty</th>
                <th className="pb-5 font-bold text-right">Unit Price</th>
                <th className="pb-5 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <tr key={idx} className="text-sm">
                  <td className="py-6">
                    <p className="font-bold text-slate-900 text-base">{item.name}</p>
                    <div className="flex gap-3 items-center mt-1.5">
                       <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono border border-slate-200">SKU: {item.sku || 'N/A'}</span>
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">• {item.weight} kg</span>
                    </div>
                  </td>
                  <td className="py-6 text-center font-bold text-slate-600">{item.quantity}</td>
                  <td className="py-6 text-right text-slate-500">₹{item.price.toLocaleString()}</td>
                  <td className="py-6 text-right font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8 border-t-2 border-slate-100">
            <div className="space-y-4 max-w-sm">
               <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <Calendar className="w-4 h-4 text-cyan-500" /> Dispatch: Next Monday
               </div>
               <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                  <p className="text-[10px] text-red-800 leading-normal font-bold uppercase tracking-wide">
                    Mandatory: Record a full unboxing video without cuts for any damage claims. No video = No refund.
                  </p>
               </div>
            </div>
            
            <div className="w-full md:w-80 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Cart Subtotal</span>
                <span className="font-bold">₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Shipping ({order.totalWeight.toFixed(2)} kg)</span>
                <span className="font-bold">₹{order.shippingCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4 border-t border-slate-100 mt-2">
                <span className="text-slate-900">Amount Paid</span>
                <span className="text-cyan-600">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {whatsappLink && (
            <a 
              href={whatsappLink}
              target="_blank"
              className="mt-12 w-full py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 no-print active:scale-[0.98]"
            >
              <MessageCircle className="w-6 h-6" /> Send Payment Screenshot to WhatsApp
            </a>
          )}
        </div>

        <div className="p-10 bg-slate-50/50 border-t border-slate-100">
          <div className="grid md:grid-cols-2 gap-12 text-[11px] text-slate-500">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500" /> Payment & Verification
              </h4>
              <p className="leading-relaxed">
                Accepted: GPay / PhonePe / PayTM to <span className="font-bold text-slate-900">94902 55775</span>.<br />
                Please share the transaction ID and screenshot on WhatsApp for order confirmation. Orders are only processed after payment verification.
              </p>
            </div>
            <div className="space-y-2 text-right">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Returns & DOA Policy</h4>
              <p className="leading-relaxed">
                Livestock DOA (Death on Arrival) is covered at 45% refund of item value with a valid unboxing video. Shipping charges are non-refundable. Track at: <span className="text-cyan-600 font-bold">tpcindia.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;