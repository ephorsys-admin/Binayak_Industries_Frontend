import React from "react";
import { Sparkles, Shield, Layers, Activity } from "lucide-react";
import logoImg from "../../../assets/logo.png";

const AuthBrandPanel = () => {
  return (
    <div className="hidden lg:flex lg:w-[46%] relative min-h-screen overflow-hidden bg-gradient-to-br from-[#083358] via-[#062642] to-[#041a2e] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-sky-400/10 blur-[130px]" />

      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-amber-400/10 blur-[130px]" />

      <div className="absolute top-[25%] -right-32 w-72 h-72 rounded-full border border-white/[0.05]" />

      <div className="absolute top-[25%] -right-20 w-56 h-56 rounded-full border border-[#ffd25d]/[0.07]" />

      <div className="absolute top-28 right-24 w-1.5 h-1.5 rounded-full bg-[#ffd25d]/70" />

      <div className="absolute top-40 right-40 w-1 h-1 rounded-full bg-sky-300/60" />

      <div className="absolute bottom-28 left-20 w-1 h-1 rounded-full bg-[#ffd25d]/60" />

      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#ffd25d]/30 to-transparent" />


      {/* ================= CONTENT ================= */}

      <div className="relative z-10 flex flex-col w-full px-10 xl:px-14 py-10">

        {/* ================= BRAND ================= */}

        <div className="flex items-center gap-4">

          <div className="relative w-14 h-14 rounded-2xl p-[1px] bg-gradient-to-br from-[#ffd25d] via-sky-300/40 to-transparent shadow-xl shadow-black/30">

            <div className="w-full h-full rounded-[15px] bg-[#062642] flex items-center justify-center p-2 border border-white/10">

              <img
                src={logoImg}
                alt="Binayak Industries"
                className="w-full h-full object-contain drop-shadow-lg"
              />

            </div>

          </div>


          <div>
            <h2 className="text-[15px] xl:text-base font-black tracking-[0.18em] ">
              BINAYAK INDUSTRIES
            </h2>

            <p className="text-[9px] font-bold tracking-[0.3em] text-[#ffd25d] uppercase mt-1">
              Admin Portal
            </p>
          </div>

        </div>


        {/* ================= HERO ================= */}

        <div className="flex-1 flex items-center">

          <div className="w-full max-w-xl">

            {/* Small Label */}

            <div className="flex items-center gap-3 mb-7">

              <div className="w-6 h-px bg-[#ffd25d]" />

              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-sky-200/65">

                <Sparkles className="w-3 h-3 text-[#ffd25d]" />

                Trusted Since 1998

              </div>

            </div>


            {/* MAIN HEADING */}

            <h1 className="text-4xl xl:text-[54px] font-black  leading-[1.05] tracking-tight">

              Where quality

              <br />

              <span className="text-[#ffd25d]">
                meets purpose.
              </span>

            </h1>


            {/* SUB HEADING */}

            <p className="mt-6 text-sm xl:text-[15px] leading-relaxed text-sky-100/70 font-medium max-w-md">
              Crafted with purpose. Driven by quality. Built for tomorrow.
            </p>


            {/* ================= SMALL FEATURE BOXES ================= */}

            <div className="flex gap-3 mt-9">

              {/* SECURITY */}

              <div className="group w-[105px] h-[105px] xl:w-[115px] xl:h-[115px] p-3.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:border-sky-300/30">

                <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300">

                  <Shield className="w-4 h-4" />

                </div>

                <p className="mt-4 text-[10px] font-bold text-white/85">
                  Secure
                </p>

                <p className="mt-0.5 text-[8px] text-sky-200/45">
                  Protected
                </p>

              </div>


              {/* PRODUCTS */}

              <div className="group w-[105px] h-[105px] xl:w-[115px] xl:h-[115px] p-3.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:border-[#ffd25d]/30">

                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">

                  <Layers className="w-4 h-4" />

                </div>

                <p className="mt-4 text-[10px] font-bold text-white/85">
                  Products
                </p>

                <p className="mt-0.5 text-[8px] text-sky-200/45">
                  Organized
                </p>

              </div>


              {/* OPERATIONS */}

              <div className="group w-[105px] h-[105px] xl:w-[115px] xl:h-[115px] p-3.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:border-teal-300/30">

                <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-300">

                  <Activity className="w-4 h-4" />

                </div>

                <p className="mt-4 text-[10px] font-bold text-white/85">
                  Operations
                </p>

                <p className="mt-0.5 text-[8px] text-sky-200/45">
                  Simplified
                </p>

              </div>

            </div>


            {/* Elegant Divider */}

            <div className="flex items-center gap-3 mt-8">

              <div className="w-16 h-px bg-gradient-to-r from-[#ffd25d] to-transparent" />

              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd25d] shadow-lg shadow-[#ffd25d]/50" />

            </div>

          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="flex items-center justify-between pt-6">

          <div className="flex items-center gap-2.5">

            <span className="relative flex w-2 h-2">

              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />

              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />

            </span>

            <span className="text-[10px] font-semibold tracking-wider text-white/60 uppercase">
              System Operational
            </span>

          </div>


          <span className="text-[9px] tracking-widest text-sky-200/30 uppercase">
            Enterprise • v2.6
          </span>

        </div>

      </div>

    </div>
  );
};

export default AuthBrandPanel;