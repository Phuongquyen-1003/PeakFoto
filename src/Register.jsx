import React, { useState } from 'react';
import { Camera, ArrowRight, Loader2, Sparkles, User, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', phoneNumber: '', role: 'Customer' });

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await axios.post('https://localhost:7275/api/Auth/register', formData); 
      alert("Đăng ký thành công!"); navigate('/login');
    } catch (error) {
      alert("Đăng ký thất bại!");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#081122] flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-[4rem] overflow-hidden border border-[#4988C4]/10 bg-[#0F2854]/40 backdrop-blur-3xl">
        
        {/* CỘT TRÁI: Editorial View */}
        <div className="hidden md:flex flex-1 p-16 flex-col justify-between border-r border-[#4988C4]/10">
          <div>
            <div className="flex items-center gap-3 text-[#BDE8F5] mb-20 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#BDE8F5] transition-all">
                <Camera size={32} strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-black tracking-widest uppercase italic">PEAK<span className="text-[#4988C4]">FOTO</span></span>
            </div>
            <h2 className="text-6xl font-serif italic text-white leading-tight mb-8">
              Khởi tạo <br /> <span className="text-[#BDE8F5] not-italic font-sans font-black uppercase text-4xl tracking-tighter">Tuyệt tác của bạn</span>
            </h2>
            <div className="space-y-5">
              {[
                "Cộng đồng 1000+ Thợ ảnh chuyên nghiệp",
                "Hệ thống Portfolio chuẩn quốc tế",
                "Tiếp cận khách hàng cao cấp"
              ].map((txt, i) => (
                <div key={i} className="flex items-center gap-3 text-[#4988C4]/80 text-[10px] font-black uppercase tracking-widest italic">
                  <CheckCircle2 size={16} className="text-[#BDE8F5]" /> {txt}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[#4988C4]/40 text-[10px] font-black uppercase tracking-[0.5em]">Identity Studio 2026</div>
        </div>

        {/* CỘT PHẢI: Form (Thanh Task Sáng) */}
        <div className="flex-1 p-10 md:p-16 bg-[#0F2854]/40 backdrop-blur-2xl">
          <div className="mb-10">
            <h3 className="text-[#BDE8F5] text-xs font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" /> Create Account
            </h3>
            <p className="text-white text-3xl font-bold tracking-tighter italic">Tham gia cộng đồng.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Switcher */}
            <div className="flex p-1.5 bg-black/40 rounded-[1.5rem] border border-[#4988C4]/10 mb-8">
              {['Customer', 'Photographer'].map((r) => (
                <button
                  key={r} type="button"
                  onClick={() => setFormData({...formData, role: r})}
                  className={`flex-1 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${formData.role === r ? 'bg-[#BDE8F5] text-[#0F2854] shadow-lg scale-100' : 'text-[#4988C4]/40 hover:text-[#BDE8F5] scale-95'}`}
                >
                  {r === 'Customer' ? 'Khách hàng' : 'Thợ ảnh chuyên nghiệp'}
                </button>
              ))}
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {[
                { icon: User, f: 'fullName', p: 'Họ và tên' },
                { icon: Mail, f: 'email', p: 'Địa chỉ Email' },
                { icon: Phone, f: 'phoneNumber', p: 'Số điện thoại' },
                { icon: Lock, f: 'password', p: 'Mật khẩu', t: 'password' }
              ].map((input) => (
                <div key={input.f} className="relative group">
                  <div className="absolute -inset-0.5 bg-[#BDE8F5]/20 rounded-[1.6rem] opacity-0 group-focus-within:opacity-100 blur-sm transition duration-500"></div>
                  <div className="relative flex items-center bg-[#081122]/60 border border-[#4988C4]/10 rounded-[1.5rem] overflow-hidden transition-all duration-300 group-focus-within:border-[#BDE8F5] group-focus-within:bg-[#0F2854] group-focus-within:translate-y-[-2px]">
                    <input.icon className="absolute left-5 text-[#4988C4]/30 group-focus-within:text-[#BDE8F5] transition-colors" size={16} />
                    <input
                      type={input.t || 'text'} placeholder={input.p} required
                      onChange={(e) => setFormData({...formData, [input.f]: e.target.value})}
                      className="w-full bg-transparent py-5 pl-14 pr-6 outline-none text-[#BDE8F5] text-sm font-medium placeholder:text-[#4988C4]/20"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button disabled={loading} className="group relative w-full bg-[#BDE8F5] text-[#0F2854] py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] mt-6 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-[#BDE8F5]/10 italic">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <>Hoàn tất tạo tài khoản <ArrowRight size={20} /></>}
              </span>
            </button>
          </form>

          <div className="mt-10 text-center">
            <button onClick={() => navigate('/login')} className="text-[#4988C4]/40 hover:text-[#BDE8F5] transition-all text-[9px] font-black uppercase tracking-[0.3em]">
              Đã là thành viên? <span className="text-[#BDE8F5] ml-2 underline underline-offset-8">Đăng nhập</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;