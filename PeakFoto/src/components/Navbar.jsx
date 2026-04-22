import React, { useState, useRef, useEffect } from 'react';
import { Camera, User, LogOut, PlusSquare, LayoutDashboard, ChevronDown, Clock, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role')?.toLowerCase();
  const fullName = localStorage.getItem('fullName') || "Người dùng";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false); 
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[999] transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${scrolled ? 'glass py-3' : 'bg-transparent'}`}>
      {/* LOGO PeakFoto */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
        <div className="bg-p-ocean p-2 rounded-xl group-hover:bg-p-sky transition-all shadow-lg shadow-p-ocean/20">
          <Camera className="text-p-ice" size={24} />
        </div>
        <span className="text-2xl font-black tracking-widest text-white uppercase italic group-hover:text-p-ice transition-colors">PEAK<span className="text-p-sky">FOTO</span></span>
      </div>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-white/5 transition-all" onClick={() => setShowDropdown(!showDropdown)}>
              <div className={`w-10 h-10 rounded-full p-[2px] shadow-2xl ${userRole === 'admin' ? 'bg-red-500' : 'bg-gradient-to-tr from-p-sky to-p-ice'}`}>
                <div className="w-full h-full rounded-full bg-p-deep flex items-center justify-center overflow-hidden">
                  <User size={18} className="text-p-ice" />
                </div>
              </div>
              <ChevronDown size={14} className={`text-p-sky/50 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showDropdown && (
              <div className="absolute top-16 right-0 w-64 glass border border-p-sky/20 rounded-[2rem] shadow-2xl p-3 z-[1000] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="px-5 py-4 border-b border-p-sky/10 mb-2">
                  <p className="text-[9px] font-black text-p-sky/40 uppercase tracking-[0.4em] mb-1">Tài khoản</p>
                  <p className="text-xs font-black text-p-ice truncate uppercase italic">{fullName}</p>
                </div>
                <div className="space-y-1">
                  <div onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-p-sky/10 text-p-sky/60 hover:text-p-ice transition-all font-bold text-[10px] tracking-widest cursor-pointer uppercase">
                    <LayoutDashboard size={14}/> Bảng điều khiển
                  </div>
                  <div onClick={() => { localStorage.clear(); window.location.href='/login'; }} className="flex items-center gap-3 px-5 py-3 rounded-2xl text-red-400/60 hover:text-red-400 transition-all font-bold text-[10px] tracking-widest cursor-pointer uppercase">
                    <LogOut size={14}/> Đăng xuất
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Đã đổi "Login" thành "Đăng nhập" */}
            <button onClick={() => navigate('/login')} className="text-p-sky/60 hover:text-p-ice transition-all font-black text-[10px] uppercase tracking-widest px-4">
              Đăng nhập
            </button>
            
            {/* Đã đổi "Join" thành "Đăng ký" */}
            <button onClick={() => navigate('/register')} className="relative group bg-p-ice text-p-deep px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-p-ice/10 hover:scale-105 active:scale-95 overflow-hidden transition-all">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <span className="relative z-10">Đăng ký ngay</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;