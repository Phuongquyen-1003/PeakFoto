import React, { useState } from 'react';
import { Camera, Mail, Lock, ArrowUpRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post('https://localhost:7020/api/Auth/login', { email, password });
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role || response.data.Role);
        localStorage.setItem('fullName', response.data.fullName || response.data.FullName);
        if (onLoginSuccess) onLoginSuccess();
        window.location.href = '/';
      }
    } catch {
      setErrorMsg('Thông tin đăng nhập không chính xác!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081122] relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1C4D8D]/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4988C4]/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-lg p-6">
        <div className="glass bg-[#0F2854]/40 border border-[#4988C4]/20 p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-[#1C4D8D] rounded-2xl mb-6 shadow-xl shadow-[#1C4D8D]/40">
              <Camera className="text-[#BDE8F5]" size={32} />
            </div>
            <h1 className="text-4xl font-serif italic text-white mb-2 leading-none">Chào mừng trở lại</h1>
            <p className="text-[#4988C4]/60 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2">
              <Sparkles size={12} /> PeakFoto Studio
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-500/10 p-4 rounded-2xl border border-red-500/20 text-center animate-in fade-in slide-in-from-top-1">
                {errorMsg}
              </div>
            )}
            
            <div className="space-y-5">
              {/* Input Email */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-[#BDE8F5]/20 rounded-[1.6rem] opacity-0 group-focus-within:opacity-100 blur-sm transition duration-500"></div>
                <div className="relative flex items-center bg-[#081122]/60 border border-[#4988C4]/20 rounded-[1.5rem] overflow-hidden transition-all duration-300 group-focus-within:border-[#BDE8F5] group-focus-within:bg-[#0F2854]">
                  <Mail className="absolute left-5 text-[#4988C4]/40 group-focus-within:text-[#BDE8F5] transition-colors" size={18} />
                  <input 
                    type="email" placeholder="Địa chỉ Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full bg-transparent py-5 pl-14 pr-6 outline-none text-[#BDE8F5] text-sm font-medium placeholder:text-[#4988C4]/20"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-[#BDE8F5]/20 rounded-[1.6rem] opacity-0 group-focus-within:opacity-100 blur-sm transition duration-500"></div>
                <div className="relative flex items-center bg-[#081122]/60 border border-[#4988C4]/20 rounded-[1.5rem] overflow-hidden transition-all duration-300 group-focus-within:border-[#BDE8F5] group-focus-within:bg-[#0F2854]">
                  <Lock className="absolute left-5 text-[#4988C4]/40 group-focus-within:text-[#BDE8F5] transition-colors" size={18} />
                  <input 
                    type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full bg-transparent py-5 pl-14 pr-6 outline-none text-[#BDE8F5] text-sm font-medium placeholder:text-[#4988C4]/20"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="group relative w-full bg-[#BDE8F5] text-[#0F2854] py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-[#BDE8F5]/10 transition-all active:scale-95 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 italic">Tiếp tục hành trình <ArrowUpRight size={18} /></span>
            </button>
          </form>

          <div className="mt-12 text-center border-t border-[#4988C4]/10 pt-8">
            <button onClick={() => navigate('/register')} className="text-[#4988C4]/40 hover:text-[#BDE8F5] transition-all text-[10px] font-black uppercase tracking-[0.2em]">
              Chưa có tài khoản? <span className="text-[#BDE8F5] underline underline-offset-8 ml-2">Đăng ký ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;