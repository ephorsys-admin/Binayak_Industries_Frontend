import React from 'react';
import { Sparkles, Shield, Layers, Activity } from 'lucide-react';
import logoImg from '../../../assets/logo.png';

const AuthBrandPanel = () => {
  return (
    <div className="hidden lg:flex lg:w-[48%] relative flex-col justify-between p-10 xl:p-14 bg-gradient-to-br from-[#083358] via-[#062642] to-[#041a2e] text-white border-r border-sky-800/30 overflow-hidden z-10 shadow-2xl">
      {/* Subtle Decorative Geometric Background */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

      {/* Top Branding with Blue & Gold Logo */}
      <div className="relative z-10 flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-400/40 via-sky-300/20 to-transparent p-0.5 shadow-xl shadow-sky-950/50">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-[#083358] to-[#041a2e] flex items-center justify-center p-1 border border-white/20">
            <img src={logoImg} alt="Binayak Logo" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>
        <div>
          <span className="block text-base font-black tracking-wider text-white font-serif-heading">
            BINAYAK INDUSTRIES
          </span>
          <span className="block text-[11px] font-bold tracking-widest text-[#ffd25d] uppercase">
            Admin & Operations Portal
          </span>
        </div>
      </div>

      {/* Center Hero Card / Security Highlights */}
      <div className="relative z-10 space-y-6 my-auto max-w-lg">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs font-bold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd25d]" />
          <span>Artisanal Heritage Since 1998</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl xl:text-4xl font-black text-white font-serif-heading leading-tight tracking-tight">
            Manage Orders, Taxonomy & Kitchen Operations with Ease.
          </h1>
          <p className="text-sky-100/80 text-sm leading-relaxed font-medium">
            Welcome to the central command hub of Binayak Industries. Access real-time product catalogs, live inventories, delivery tracking, and administrative controls securely.
          </p>
        </div>

        {/* Three Feature Highlights */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-sm hover:bg-white/[0.1] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Enterprise RBAC & Session Security</h4>
              <p className="text-[11px] text-sky-200/70">Strict authorization and multi-factor safety</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-sm hover:bg-white/[0.1] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Dynamic Taxonomy & Product Control</h4>
              <p className="text-[11px] text-sky-200/70">Instant categories, image uploads & stock adjustments</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-md shadow-sm hover:bg-white/[0.1] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Real-Time Kitchen & Dispatch Pulse</h4>
              <p className="text-[11px] text-sky-200/70">Unified pipeline for orders, bills and inquiries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/15 text-xs text-sky-200/70">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400" />
          <span className="text-white font-semibold">Gateway Operational</span>
          <span className="text-sky-300/40">•</span>
          <span>256-Bit SSL Encrypted</span>
        </div>
        <span className="text-[11px] text-sky-300/60 font-semibold">v2.6 Enterprise</span>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
