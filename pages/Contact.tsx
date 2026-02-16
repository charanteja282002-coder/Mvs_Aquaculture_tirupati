
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-serif font-bold mb-6">Let's Connect</h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Have questions about specific species or need help setting up your first high-tech tank? Our experts are ready to assist you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-cyan-500 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Our Studio</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    {STORE_CONFIG.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-cyan-500 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">WhatsApp & Call</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    +91 {STORE_CONFIG.whatsapp}
                  </p>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mt-1">Available 10 AM - 8 PM IST</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-cyan-500 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Direct Email</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    support@mvsaqua.com
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 space-y-6">
              <h3 className="font-bold uppercase tracking-widest text-xs text-slate-500">Social Presence</h3>
              <div className="flex gap-4">
                <a 
                  href={`https://instagram.com/${STORE_CONFIG.instagram}`} 
                  target="_blank" 
                  className="flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-pink-600 transition-all group"
                >
                  <Instagram className="w-5 h-5 text-pink-500 group-hover:text-white" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a 
                  href={`https://youtube.com/@${STORE_CONFIG.youtube}`} 
                  target="_blank" 
                  className="flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-red-600 transition-all group"
                >
                  <Youtube className="w-5 h-5 text-red-500 group-hover:text-white" />
                  <span className="text-sm font-medium">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -inset-10 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative bg-slate-900/50 border border-slate-800 p-10 rounded-[3rem] shadow-2xl">
              {submitted ? (
                <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-slate-400">Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-cyan-500 outline-none transition-all" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-cyan-500 outline-none transition-all" 
                      placeholder="hello@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">How can we help?</label>
                    <textarea 
                      required 
                      rows={5} 
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none" 
                      placeholder="Tell us about your aquarium needs..."
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-900/20 flex items-center justify-center gap-2 group"
                  >
                    Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  <div className="pt-8 text-center">
                    <p className="text-xs text-slate-500 mb-4 uppercase tracking-widest">or reach us instantly</p>
                    <a 
                      href={`https://wa.me/91${STORE_CONFIG.whatsapp}`} 
                      className="inline-flex items-center gap-2 text-green-500 font-bold hover:text-green-400 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" /> Chat via WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
