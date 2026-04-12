import React from 'react';
import { ArrowUpRight, Sparkles, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full rounded-[40px] overflow-hidden bg-p-ocean/10 border border-p-sky/20 p-10 md:p-20 mt-6 mb-12 flex flex-col md:flex-row items-center justify-between backdrop-blur-md">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-p-sky/5 rounded-full blur-[120px] -z-0"></div>

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 text-p-sky mb-6">
          <Sparkles size={16} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">2026 PeakFoto Edition</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-2 leading-tight">
          Lưu giữ khoảnh khắc
        </h1>
        <h2 className="text-5xl md:text-8xl font-black text-p-ice mb-8 tracking-tighter drop-shadow-[0_15px_30px_rgba(189,232,245,0.25)] uppercase">
          PeakFoto
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <button 
            onClick={() => navigate('/booking-list')} 
            className="group relative bg-p-ice text-p-deep px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(189,232,245,0.4)] transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform"></div>
            <div className="relative z-10 flex items-center gap-3">
              Đặt lịch ngay <ArrowUpRight size={22} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
          
          <button onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })} className="bg-p-ocean/30 backdrop-blur-md border border-p-sky/30 text-p-ice px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-p-ocean/50 transition-all">
            Xem thợ chụp
          </button>
        </div>
      </div>

      <div className="hidden md:block relative z-10">
        <div className="w-64 h-64 rounded-full border-2 border-dashed border-p-sky/20 p-4 animate-[spin_30s_linear_infinite]">
          <div className="w-full h-full rounded-full border border-p-sky/30 flex items-center justify-center">
            <Camera size={50} className="text-p-sky/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;