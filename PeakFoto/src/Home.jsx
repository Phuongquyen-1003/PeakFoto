import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import axiosClient from './utils/axiosClient';
import { Heart, MessageCircle, ArrowUpRight, Sparkles, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosClient.get('/Posts');
        const data = Array.isArray(res.data) ? res.data : [];
        setPosts(data.reverse()); 
      } catch (error) {
        console.error("Lỗi API:", error);
        // Dữ liệu mẫu cực xịn để bạn thấy màu sắc ngay cả khi không có mạng
        setPosts([
          { id: 1, title: "Deep Sea Echo", photographerName: "Marine Art", photos: [{url: "https://images.unsplash.com/photo-1551244072-5d12893278ab"}] },
          { id: 2, title: "Midnight Horizon", photographerName: "Vinh Ocean", photos: [{url: "https://images.unsplash.com/photo-1439405326854-014607f694d7"}] },
          { id: 3, title: "Arctic Ice", photographerName: "Blue Studio", photos: [{url: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9"}] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <Banner />

        {/* SECTION HEADER: Phối màu #BDE8F5 và #4988C4 */}
        <div className="mt-32 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-p-sky animate-pulse">
              <Sparkles size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">2026 Curated Gallery</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-[0.9]">
              The <span className="text-p-sky font-sans not-italic font-extralight opacity-80">Vision</span>
            </h2>
          </div>
          <p className="max-w-xs text-p-sky/60 text-sm font-light leading-relaxed border-l-2 border-p-ocean pl-6 italic">
            Nơi những khoảnh khắc được bao phủ bởi sắc xanh của đại dương và sự tinh khiết của băng giá.
          </p>
        </div>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4 text-p-sky">
            <div className="w-12 h-12 border-2 border-p-ocean border-t-p-ice rounded-full animate-spin"></div>
            <span className="text-[10px] font-black tracking-[0.4em]">DEVELOPING FILM...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                onClick={() => navigate(`/post/${post.id}`)}
                className={`group cursor-pointer relative ${index % 2 !== 0 ? 'md:translate-y-20' : ''}`}
              >
                {/* KHUNG ẢNH (Dùng màu #0F2854 làm nền) */}
                <div className="relative aspect-[3/4] overflow-hidden bg-p-deep rounded-2xl shadow-2xl shadow-black/50">
                  <img 
                    src={post.photos?.[0]?.url} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* OVERLAY KHI HOVER (Dùng màu #1C4D8D làm lớp phủ) */}
                  <div className="absolute inset-0 bg-p-ocean/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-16 h-16 bg-p-ice text-p-deep rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl shadow-p-ocean/20">
                      <ArrowUpRight size={28} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* THÔNG TIN (Dùng màu #BDE8F5 và #4988C4) */}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-serif italic text-white group-hover:text-p-sky transition-colors duration-300">
                      {post.title}
                    </h3>
                    <span className="text-[10px] text-p-sky/40 font-mono mt-3">0{index + 1}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-p-ocean/30 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-p-ocean to-p-sky p-[1px]">
                        <div className="w-full h-full rounded-full bg-p-deep flex items-center justify-center text-[10px] font-bold text-p-ice">
                          {post.photographerName?.[0]}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-p-ice tracking-tight">{post.photographerName || "Artist"}</span>
                        <span className="text-[9px] text-p-sky font-black uppercase tracking-[0.2em] italic">Professional</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-p-sky/40">
                      <Heart size={16} className="hover:text-red-400 transition-colors" />
                      <MessageCircle size={16} className="hover:text-p-ice transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;