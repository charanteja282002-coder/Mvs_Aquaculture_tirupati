
import React from 'react';
import { ShieldCheck, Truck, Droplets, Award, Calendar, Heart } from 'lucide-react';
import { STORE_CONFIG } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
            Our Aquatic Legacy
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Based in the heart of Tirupati, MVS Aqua is more than just a store. We are a community of enthusiasts dedicated to bringing the world's most exotic aquatic life to your doorstep.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="relative group">
          <div className="absolute -inset-4 bg-cyan-500/10 rounded-[3rem] blur-2xl group-hover:bg-cyan-500/20 transition-all duration-700" />
          <img 
            src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1200" 
            alt="Aquarium Care" 
            className="relative rounded-[2.5rem] shadow-2xl border border-slate-800"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-serif font-bold">The MVS Standards</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-cyan-900/20 rounded-2xl h-fit">
                <Droplets className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Bio-Secure Supply</h3>
                <p className="text-slate-400 leading-relaxed">Every fish undergoes a minimum 14-day strict quarantine protocol. We only ship specimens that are active, healthy, and feeding well.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-cyan-900/20 rounded-2xl h-fit">
                <ShieldCheck className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Unboxing Protection</h3>
                <p className="text-slate-400 leading-relaxed">We stand by our quality. A mandatory unboxing video ensures that your investment is protected. Any transit damages are partially refunded (45%) with valid video proof.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-cyan-900/20 rounded-2xl h-fit">
                <Calendar className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Monday Dispatch Only</h3>
                <p className="text-slate-400 leading-relaxed">To ensure your livestock doesn't get stuck in transit over weekends, we dispatch all parcels exclusively on Mondays via Professional or ST Courier.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Why Enthusiasts Choose Us</h2>
            <div className="w-24 h-1 bg-cyan-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] hover:border-cyan-500/50 transition-all text-center group">
              <Truck className="w-12 h-12 text-cyan-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Expert Logistics</h3>
              <p className="text-slate-500 text-sm">₹80 per KG shipping across AP & Telangana. We use industry-grade breathing bags and heat-shielding insulation for all livestock.</p>
            </div>
            <div className="p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] hover:border-cyan-500/50 transition-all text-center group">
              <Award className="w-12 h-12 text-cyan-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Premium Selection</h3>
              <p className="text-slate-500 text-sm">From rare ADA substrates to exotic high-grade Neons, we curate only the best world-class aquarium equipment and flora.</p>
            </div>
            <div className="p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] hover:border-cyan-500/50 transition-all text-center group">
              <Heart className="w-12 h-12 text-cyan-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Family Owned</h3>
              <p className="text-slate-500 text-sm">Every order is hand-packed by our dedicated team in Tirupati. We care for your fish as if they were our own until they reach you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
        <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.3em] mb-4">Tirupati Headquarters</p>
        <h2 className="text-3xl font-bold mb-4">Visit Our Base</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-12">{STORE_CONFIG.address}</p>
        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-slate-800 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.58434757348!2d79.4215777750868!3d13.6222851867564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2b40000000001%3A0x7d9490255775!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710412345678!5m2!1sen!2sin" 
            className="w-full h-full border-0" 
            allowFullScreen={true} 
            loading="lazy" 
          />
        </div>
      </section>
    </div>
  );
};

export default About;
