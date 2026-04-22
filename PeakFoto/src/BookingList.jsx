import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PhotographerCard from './components/PhotographerCard';
import JobCard from './components/JobCard'; 
import { Search, MapPin, SlidersHorizontal, Loader2, Sparkles, Zap, Target } from 'lucide-react'; 
import axiosClient from './utils/axiosClient'; 

const concepts = ['Cá nhân', 'Cặp đôi', 'Nhóm', 'Sự kiện', 'Gia đình', 'Cổ trang', 'Fashion'];

const BookingList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem('role')?.trim().toLowerCase();
  const isPhotographer = userRole === 'photographer';

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedConcepts, setSelectedConcepts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint = isPhotographer ? '/Bookings/requests-feed' : '/Users/photographers';
        const res = await axiosClient.get(endpoint);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error:", error);
        if (!isPhotographer) {
          setData([
            { id: 1, fullName: "Thanh Taola", location: "Hồ Chí Minh", basePrice: 1500000, concepts: ["Cổ trang", "Cá nhân"], rating: 5.0 },
            { id: 2, fullName: "Phạm Nam", location: "Bình Dương", basePrice: 800000, concepts: ["Kỷ yếu", "Sự kiện"], rating: 4.9 }
          ]);
        }
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchData();
  }, [isPhotographer]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const nameToSearch = isPhotographer ? item.title : item.fullName;
      const matchName = nameToSearch?.toLowerCase().includes(search.toLowerCase());
      const matchLoc = item.location?.toLowerCase().includes(location.toLowerCase());
      const itemConcepts = isPhotographer ? [item.serviceType] : item.concepts;
      const matchConcept = selectedConcepts.length === 0 || selectedConcepts.some(c => itemConcepts?.includes(c));
      return matchName && matchLoc && matchConcept;
    });
  }, [data, search, location, selectedConcepts, isPhotographer]);

  const handleAcceptJob = async (jobId) => {
    if (!window.confirm("Xác nhận nhận yêu cầu chụp này?")) return;
    try {
      await axiosClient.put(`/Bookings/${jobId}/accept`);
      setData(prev => prev.filter(j => j.id !== jobId));
      alert("🎉 Đã nhận Job thành công!");
    } catch (err) { alert("Lỗi khi nhận Job"); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-photo-gold/30">
      <Navbar />
      
      {/* Background Decor Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-photo-gold/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <main className="pt-32 px-6 pb-20 max-w-[1500px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-photo-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              <Sparkles size={14} /> Explore the best
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
              {isPhotographer ? "Hunt" : "Discover"} <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-photo-gold via-white to-photo-gold/50">
                {isPhotographer ? "New Jobs" : "Artists"}
              </span>
            </h2>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl">
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Results</p>
            <span className="text-3xl font-black italic text-photo-gold leading-none">{filteredData.length}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="glass-card p-8 rounded-[2.5rem] sticky top-32 space-y-10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <h3 className="text-photo-gold font-black flex items-center gap-2 text-lg uppercase tracking-tighter">
                  <SlidersHorizontal size={18} strokeWidth={3} /> Filters
                </h3>
                <Zap size={16} className="text-photo-gold animate-pulse" />
              </div>

              <div className="space-y-8">
                {/* Search */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em]">Keywords</label>
                  <div className="relative group/input">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-photo-gold transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder={isPhotographer ? "Event title..." : "Photographer name..."}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-photo-gold outline-none transition-all"
                      value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em]">Location</label>
                  <div className="relative group/input">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-photo-gold transition-colors" size={16} />
                    <input 
                      type="text" placeholder="Where to?"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-photo-gold outline-none transition-all"
                      value={location} onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Concept Chips - NỔI BẬT NHẤT */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] flex items-center gap-2">
                    <Target size={12} /> Favorite Concepts
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {concepts.map((c, idx) => {
                      const isActive = selectedConcepts.includes(c);
                      return (
                        <button
                          key={c} 
                          onClick={() => setSelectedConcepts(prev => prev.includes(c) ? prev.filter(x => x!==c) : [...prev, c])}
                          className={`
                            px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300
                            ${isActive 
                              ? 'bg-[#BDE8F5] text-[#081122] shadow-[0_0_20px_rgba(189,232,245,0.6)] scale-105 z-10' 
                              : 'bg-white/5 text-gray-400 border border-white/10 hover:border-[#BDE8F5]/50 hover:text-white'}
                          `}
                          style={{ transitionDelay: `${idx * 40}ms` }}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="animate-spin text-photo-gold" size={48} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Scanning...</span>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="glass-card text-center py-32 rounded-[3rem] border-dashed">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No matching files found</p>
              </div>
            ) : (
              <div className={`
                ${isPhotographer ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"}
                animate-in fade-in slide-in-from-bottom-4 duration-700
              `}>
                {filteredData.map((item, idx) => (
                  <div key={item.id} className="transition-all" style={{ animationDelay: `${idx * 50}ms` }}>
                    {isPhotographer ? (
                      <JobCard 
                        onAccept={handleAcceptJob}
                        job={{
                          id: item.id, 
                          title: item.title, 
                          author: item.customer?.fullName || "Premium Client",
                          location: item.location, 
                          type: item.serviceType,
                          price: item.maxPrice > 0 ? `${item.minPrice.toLocaleString()} - ${item.maxPrice.toLocaleString()} ₫` : "Thỏa thuận"
                        }} 
                      />
                    ) : (
                      <div className="glass-card p-1 rounded-[2.5rem]">
                        <PhotographerCard 
                          photographer={item} 
                          onClick={() => navigate(`/profile/${encodeURIComponent(item.fullName)}`)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingList;