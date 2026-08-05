import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search
} from 'lucide-react';

// --- 1. IMPORT LOCAL DATA ---
import { journalData } from './data/journalData';
import { eatsData } from './data/eatsData';
import { happeningsData } from './data/happeningsData';

// --- 2. CONFIGURATION ---
const THEMES = {
  light: { primary: '#00274c', windowBg: 'bg-slate-200', appBg: 'bg-slate-50', card: 'bg-white', text: 'text-slate-900', secondaryText: 'text-slate-600', border: 'border-slate-200', isDark: false },
  dark: { primary: '#ffcb05', windowBg: 'bg-[#050b14]', appBg: 'bg-[#0a121e]', card: 'bg-[#151f2e]', text: 'text-slate-100', secondaryText: 'text-slate-400', border: 'border-slate-800', isDark: true }
};

const CATEGORIES_JOURNAL = ['All', 'City Life', 'Local Secrets', 'Arts & Culture', 'Dining Reviews', 'Community Reports', 'Events'];
const CATEGORIES_EXP = ['All', 'Tours', 'Nightlife', 'Museums', 'Parks', 'Workshops', 'Sports', 'Family Friendly', 'Hidden Gems'];

const SLIDE_IMAGES = [
  "/images/placeholder-1.jpg", 
  "/images/placeholder-2.jpg"
];

// --- Helpers ---
const Watermark = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.02] flex items-center justify-center">
    <Building size={500} strokeWidth={0.5} className="rotate-12" />
  </div>
);

// --- Components ---
const Modal = ({ isOpen, onClose, item, theme, toggleFavorite, favorites }) => {
  if (!isOpen || !item) return null;
  const isFavorited = (favorites || []).some(f => f.id === item.id && f.type === item.type);
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <h3 className={`text-lg font-header font-black uppercase italic tracking-tight pr-4`} style={{ color: '#ffcb05' }}>
            {item.name || item.title || 'Spotlight'}
          </h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => toggleFavorite(item)} 
              className="p-2.5 rounded-full transition-all duration-300 bg-white/5 active:scale-90"
            >
              <Heart 
                size={22} 
                className="text-[#ffcb05] drop-shadow-[0_0_8px_rgba(255,203,5,0.5)]" 
                fill={isFavorited ? "#ffcb05" : "none"} 
                strokeWidth={2.5}
              />
            </button>
            <button 
              onClick={onClose} 
              className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm transition-all active:scale-90 ${theme.isDark ? 'text-white' : 'text-black'}`}
            >
              <X size={22}/>
            </button>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {item.img && <img src={item.img} className="w-full h-64 object-cover rounded-[32px] shadow-lg" alt="" />}
          <div className="flex items-center gap-4 flex-wrap">
            {item.price && <div className="bg-[#ffcb05]/20 text-[#ffcb05] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.price}</div>}
            {item.cuisine && <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.cuisine}</div>}
            <div className="bg-[#00274c]/40 text-[#34a4b8] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">{item.category || item.neighborhood || 'City Guide'}</div>
          </div>
          {item.address && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5">
              <MapPin size={16} className="text-[#ffcb05]" />
              <span>{item.address}</span>
            </div>
          )}
          <div className={`text-base leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`} 
            dangerouslySetInnerHTML={{ __html: item.longDesc || item.desc || item.excerpt || 'Accessing city database...' }} 
          />
          {item.url && (
            <button onClick={() => window.open(item.url, '_blank')} className="w-full bg-[#ffcb05] text-black font-black uppercase text-base py-5 rounded-2xl shadow-xl active:scale-95 transition-all">
              {item.type === 'amazon' ? 'Buy Now' : 'Visit Website'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ToolPopup = ({ type, isOpen, onClose, theme, stats, setStats }) => {
  const [bill, setBill] = useState('');
  const [tipPerc, setTipPerc] = useState(20);
  const [weatherIdx, setWeatherIdx] = useState(new Date().getMonth());

  if (!isOpen) return null;

  const billVal = parseFloat(bill) || 0;
  const tipAmount = (billVal * (tipPerc / 100)).toFixed(2);
  const totalBill = (billVal + parseFloat(tipAmount)).toFixed(2);

  const POIs = [
    { name: "Michigan Stadium", type: "Landmark", color: "bg-[#00274c]", desc: "The Big House. Essential Saturday destination." },
    { name: "Nichols Arboretum", type: "Nature", color: "bg-emerald-600", desc: "The 'Arb'. Perfect for riverside walks." },
    { name: "Main Street", type: "Social", color: "bg-[#ffcb05] text-black", desc: "The heart of dining and local shopping." },
    { name: "State Theatre", type: "Culture", color: "bg-purple-600", desc: "Historic cinema with a neon glow." },
    { name: "Kerrytown Market", type: "Local", color: "bg-orange-600", desc: "Artisan shops and the farmers market." },
    { name: "Law Quad", type: "Architecture", color: "bg-stone-600", desc: "Stunning Gothic-style university grounds." }
  ];

  const weatherData = [
    { month: "January", high: 31, low: 18, vibe: "bg-blue-800" },
    { month: "February", high: 35, low: 20, vibe: "bg-blue-700" },
    { month: "March", high: 46, low: 28, vibe: "bg-cyan-700" },
    { month: "April", high: 59, low: 38, vibe: "bg-teal-600" },
    { month: "May", high: 71, low: 49, vibe: "bg-emerald-600" },
    { month: "June", high: 80, low: 59, vibe: "bg-yellow-500" },
    { month: "July", high: 84, low: 63, vibe: "bg-orange-500" },
    { month: "August", high: 82, low: 61, vibe: "bg-red-500" },
    { month: "September", high: 75, low: 53, vibe: "bg-orange-600" },
    { month: "October", high: 62, low: 42, vibe: "bg-amber-600" },
    { month: "November", high: 48, low: 32, vibe: "bg-slate-600" },
    { month: "December", high: 36, low: 23, vibe: "bg-slate-800" }
  ];

  const currentW = weatherData[weatherIdx];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} p-8`}>
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-xl font-header font-black uppercase italic tracking-tighter" style={{ color: '#ffcb05' }}>
             {type === 'hots' ? 'City Hot Spots' : type === 'calc' ? 'Tip Calculator' : type === 'weather' ? 'City Forecast' : 'Stay Hydrated'}
           </h3>
           <button onClick={onClose} className={`p-2 rounded-full bg-white/10 ${theme.isDark ? 'text-white' : 'text-black'}`}><X size={20}/></button>
        </div>

        {type === 'hots' && (
          <div className="space-y-4">
            {POIs.map(p => (
              <div key={p.name} className={`p-5 rounded-[24px] border ${theme.border} bg-black/10 shadow-inner`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className={`font-bold ${theme.text}`}>{p.name}</h4>
                  <span className={`text-[8px] font-black uppercase text-white px-2 py-1 rounded-full ${p.color}`}>{p.type}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        {type === 'calc' && (
          <div className="space-y-8">
            <div className="bg-black/20 p-6 rounded-3xl border border-white/5 text-center">
               <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Total with Tip</p>
               <h2 className="text-5xl font-header font-black text-white">${totalBill}</h2>
               <div className="flex justify-center gap-4 mt-4 text-[#ffcb05] font-bold text-sm">
                 <span>Tip: ${tipAmount}</span>
               </div>
            </div>
            <div className="space-y-4">
              <input 
                type="number" 
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0.00" 
                className={`w-full p-5 rounded-2xl bg-black/20 border border-white/10 text-white font-bold text-xl outline-none focus:border-[#ffcb05]`} 
              />
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setTipPerc(p)}
                    className={`py-4 rounded-xl font-black text-xs transition-all ${tipPerc === p ? 'bg-[#ffcb05] text-black scale-105 shadow-lg shadow-yellow-500/20' : 'bg-white/5 text-slate-400'}`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === 'weather' && (
          <div className="space-y-6">
            <div className={`p-10 rounded-[32px] ${currentW.vibe} text-white text-center shadow-2xl relative overflow-hidden transition-all duration-500`}>
               <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12"><Building size={120} /></div>
               <p className="text-xs font-black uppercase tracking-[0.3em] mb-2">{currentW.month}</p>
               <h2 className="text-6xl font-header font-black">{currentW.high}°</h2>
               <p className="text-sm font-bold opacity-80 mt-2">Avg Low: {currentW.low}°</p>
            </div>
            <div className="flex justify-between items-center gap-4">
              <button onClick={() => setWeatherIdx(p => (p - 1 + 12) % 12)} className="p-4 bg-white/5 rounded-2xl text-white active:scale-90 transition-all"><ChevronLeft size={24}/></button>
              <span className="font-header font-black uppercase text-[10px] tracking-widest text-slate-500">A2 Calendar</span>
              <button onClick={() => setWeatherIdx(p => (p + 1) % 12)} className="p-4 bg-white/5 rounded-2xl text-white active:scale-90 transition-all"><ChevronRight size={24}/></button>
            </div>
          </div>
        )}

        {type === 'water' && (
          <div className="space-y-8 text-center py-6">
             <div className="flex justify-around items-center">
                <div>
                   <p className="text-4xl font-black text-blue-400">{stats.water || 0}</p>
                   <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Water</p>
                </div>
                <div>
                   <p className="text-4xl font-black text-[#ffcb05]">{stats.drinks || 0}</p>
                   <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Beverages</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setStats({...stats, water: (stats.water || 0) + 1})} className="bg-blue-600 py-4 rounded-2xl text-white font-black uppercase text-xs shadow-lg shadow-blue-500/20">+ Water</button>
                <button onClick={() => setStats({...stats, drinks: (stats.drinks || 0) + 1})} className="bg-[#ffcb05] py-4 rounded-2xl text-black font-black uppercase text-xs shadow-lg shadow-yellow-500/20">+ Drink</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HomeView = ({ theme, setSelectedItem, itineraries, dining, featuredPosts, favorites, toggleFavorite, setView }) => {
  const [heroIdx, setHeroIdx] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % SLIDE_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!featuredPosts || featuredPosts.length === 0) return;
    const interval = setInterval(() => setHighlightIdx(p => (p + 1) % (featuredPosts.length || 1)), 6000);
    return () => clearInterval(interval);
  }, [featuredPosts]);

  const nextHighlight = (e) => { e.stopPropagation(); setHighlightIdx(p => (p + 1) % featuredPosts.length); };
  const prevHighlight = (e) => { e.stopPropagation(); setHighlightIdx(p => (p - 1 + featuredPosts.length) % featuredPosts.length); };

  return (
    <div className="space-y-12 animate-fade text-left relative z-10 pb-16 font-sans w-full">
      <section className="relative h-72 rounded-[40px] overflow-hidden shadow-2xl flex items-end p-8 mx-1 border border-white/5">
        {SLIDE_IMAGES.map((img, i) => <img key={i} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${i === heroIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`} alt="" />)}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-header font-black uppercase italic tracking-tighter mb-2">The Scene</h1>
          <p className="text-[#ffcb05] font-header font-medium tracking-[0.05em] text-base">Curated by A2 Vibe.</p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 px-2">
          <Zap size={18} className="text-[#ffcb05]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Insider Picks</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 px-1 no-scrollbar snap-x snap-mandatory">
          {(itineraries || []).slice(0, 5).map(item => (
            <div key={item.id} onClick={() => setSelectedItem(item)} className={`min-w-[300px] h-36 ${theme.card} border ${theme.border} rounded-[24px] overflow-hidden flex cursor-pointer shadow-md snap-center relative group`}>
              {item.img && <img src={item.img} className="w-24 h-full object-cover" alt="" />}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <h4 className={`font-bold text-xs ${theme.text} line-clamp-2 leading-tight uppercase tracking-tight`}>{item.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#34a4b8]">{item.price}</span>
                  <button onClick={(e) => { e.stopPropagation(); item.url && window.open(item.url, '_blank'); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase py-2 px-4 rounded-xl">View</button>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === item.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : 'bg-black/20 text-white'}`}><Heart size={14} fill={(favorites || []).some(f => f.id === item.id) ? "currentColor" : "none"} /></button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 px-2">
          <Ticket size={18} className="text-[#34a4b8]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Quick Launch</h2>
        </div>
        <div className="grid grid-cols-4 gap-4 px-1">
          {[
            { label: 'Eats', icon: <Utensils size={22}/>, path: 'flavors' },
            { label: 'Events', icon: <Zap size={22}/>, path: 'fun' },
            { label: 'Culture', icon: <Building size={22}/>, path: 'fun' },
            { label: 'Transit', icon: <Navigation size={22}/>, link: 'https://www.theride.org/' }
          ].map(item => (
            <button key={item.label} onClick={() => item.link ? window.open(item.link, '_blank') : (item.path && setView(item.path))} className="flex flex-col items-center gap-2 active:scale-95 group">
              <div className="p-4 rounded-2xl text-white shadow-lg bg-[#00274c] group-hover:scale-105 transition-transform">{item.icon}</div>
              <span className={`text-[10px] font-black uppercase tracking-tighter text-center ${theme.isDark ? 'text-white' : 'text-slate-600'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="island-flavors">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Utensils size={18} className="text-[#34a4b8]" />
            <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>A2 Eats</h2>
          </div>
          <button onClick={() => setView('flavors')} className="text-[10px] font-black uppercase text-[#ffcb05] tracking-widest">View All ({dining.length})</button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-1 pb-4 no-scrollbar">
          {(dining || []).map(res => (
            <div key={res.id} onClick={() => setSelectedItem({...res, type: 'dining'})} className={`${theme.card} min-w-[220px] h-44 rounded-[24px] border ${theme.border} overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer relative group`}>
              {res.img ? (
                <img src={res.img} className="w-full h-28 object-cover" alt="" />
              ) : (
                <div className="w-full h-28 bg-[#00274c]/20 flex items-center justify-center"><Building size={24} className="text-[#ffcb05]/40" /></div>
              )}
              <div className="p-4">
                <h4 className={`font-bold text-[10px] ${theme.text} line-clamp-1 uppercase tracking-tight`}>{res.title}</h4>
                <p className="text-[8px] font-black text-[#34a4b8] uppercase tracking-[0.2em] mt-1">{res.cuisine || 'Gourmet A2'}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite({...res, type: 'dining'}); }} className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === res.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : 'bg-black/20 text-white'}`}>
                <Heart size={12} fill={(favorites || []).some(f => f.id === res.id) ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-5 px-2">
          <Sparkles size={18} className="text-[#ffcb05]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>City Pulse</h2>
        </div>
        
        {featuredPosts && featuredPosts.length > 0 && (
          <div className="px-1 relative">
            <div onClick={() => setSelectedItem(featuredPosts[highlightIdx])} className="relative h-[420px] rounded-[48px] overflow-hidden shadow-2xl cursor-pointer group border border-white/10">
              <img src={featuredPosts[highlightIdx]?.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-12 left-8 right-8 text-white space-y-3">
                <span className="bg-[#ffcb05] text-black px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block">Trending Now</span>
                <h4 className="text-2xl font-header font-black uppercase italic leading-tight drop-shadow-md tracking-tighter">{featuredPosts[highlightIdx]?.title || ''}</h4>
                <p className="text-sm font-medium opacity-80 line-clamp-2 leading-relaxed italic">{featuredPosts[highlightIdx]?.excerpt || ''}</p>
              </div>

              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                 <button onClick={prevHighlight} className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 shadow-lg"><ChevronLeft size={24} /></button>
                 <button onClick={nextHighlight} className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 shadow-lg"><ChevronRight size={24} /></button>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {featuredPosts.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === highlightIdx ? 'w-8 bg-[#ffcb05]' : 'w-2 bg-white/40'}`} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const HubView = ({ theme, favorites, toggleFavorite, stats, setStats, setSelectedItem, setView, onNavigateFlavors }) => {
  const [headerIdx, setHeaderIdx] = useState(0);
  const [activeTool, setActiveTool] = useState(null);
  const cycleHeader = () => setHeaderIdx(prev => (prev + 1) % SLIDE_IMAGES.length);
  const diningFavorites = (favorites || []).filter(f => f.type === 'dining');

  return (
    <div className="animate-slide space-y-10 text-left relative z-10 pb-20 font-sans w-full max-w-xl mx-auto flex flex-col">
      <ToolPopup type={activeTool} isOpen={!!activeTool} onClose={() => setActiveTool(null)} theme={theme} stats={stats} setStats={setStats} />
      <div className="w-full px-2"><h2 className={`text-3xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>My Vibe</h2></div>
      <div className="space-y-10 px-2 w-full">
        <div className="relative h-64 rounded-[48px] overflow-hidden border border-white/10 group shadow-2xl w-full">
          <img src={SLIDE_IMAGES[headerIdx]} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a121e] via-[#0a121e]/30 to-transparent" />
          <div className="absolute bottom-8 left-8 flex items-center gap-4">
             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00274c] to-[#ffcb05] p-0.5 shadow-2xl">
                <div className={`w-full h-full rounded-full ${theme.card} flex items-center justify-center text-white`}>
                   <MapPin size={24} />
                </div>
             </div>
             <div>
                <h3 className="text-2xl font-header font-black uppercase text-white drop-shadow-lg tracking-tight">Ann Arbor</h3>
                <p className="text-[9px] font-black uppercase text-[#ffcb05] tracking-[0.2em] opacity-90">Your Saved Spots</p>
             </div>
          </div>
          <button onClick={cycleHeader} className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white opacity-100 transition-all active:scale-90"><Camera size={20} /></button>
        </div>
        <section className="space-y-5 w-full"><div className="flex items-center gap-2 px-1"><Sparkles size={18} className="text-[#34a4b8]" /><h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Urban Tools</h4></div><div className="grid grid-cols-2 gap-3">
            {[{id:'hots',icon:MapPin,label:'Hot Spots',color:'#ffcb05'},{id:'water',icon:Droplets,label:'Hydration',color:'#34a4b8'},{id:'calc',icon:Calculator,label:'Tip Calc',color:'#10b981'},{id:'weather',icon:Thermometer,label:'Forecast',color:'#34a4b8'}].map(t=>(<button key={t.id} onClick={()=>setActiveTool(t.id)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-3 text-left shadow-lg active:scale-95 transition-all`}><div className="p-2 rounded-lg" style={{backgroundColor: t.color+'15', color: t.color}}><t.icon size={18}/></div><span className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>{t.label}</span></button>))}
        </div></section>
        <section className="space-y-8 w-full">
           <div className="space-y-5"><div className="flex items-center justify-between px-1"><h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>City Favs ({diningFavorites.length})</h4><button onClick={() => setView('flavors')} className="text-[9px] font-black uppercase text-[#34a4b8] tracking-[0.2em]">Explore All Eats</button></div>
           <div className="grid grid-cols-1 gap-4">{!diningFavorites.length ? <div className={`p-10 border-2 border-dashed rounded-[32px] text-center opacity-30 text-[9px] font-black uppercase tracking-widest ${theme.border}`}>No dining spots saved yet</div> : diningFavorites.map(fav => (<div key={fav.id} onClick={() => setSelectedItem(fav)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-5 cursor-pointer relative shadow-md`}><img src={fav.img} className="w-16 h-16 rounded-2xl object-cover shadow-inner" alt="" /><div className="flex-1"><p className={`text-sm font-bold leading-tight ${theme.text}`}>{fav.name || fav.title}</p><p className="text-[9px] font-black uppercase text-[#ffcb05] mt-1 tracking-widest">{fav.cuisine || 'A2 Eats'}</p></div><button onClick={(e)=>{e.stopPropagation(); toggleFavorite(fav);}} className="text-red-500 p-2"><Heart size={18} fill="currentColor" /></button></div>))}</div></div>
        </section>
      </div>
    </div>
  );
};

const FlavorsView = ({ theme, setSelectedItem, toggleFavorite, favorites, dining }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDining = useMemo(() => {
    if (!searchQuery) return dining;
    return dining.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dining, searchQuery]);

  return (
    <div className="animate-fade space-y-8 text-left relative z-10 pb-20 w-full flex flex-col">
      <div className="text-center px-4 w-full space-y-4">
        <h1 className={`text-3xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>A2 Flavors</h1>
        <p className={`text-xs ${theme.secondaryText}`}>Explore all {dining.length} curated local restaurants and eateries.</p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto w-full mt-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants, cuisine, or neighborhood..."
            className={`w-full pl-12 pr-4 py-3.5 rounded-2xl ${theme.card} border ${theme.border} text-xs font-bold outline-none focus:border-[#ffcb05] shadow-inner`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-1 w-full">
        {filteredDining.length > 0 ? (
          filteredDining.map(res => {
            const isFavorited = (favorites || []).some(f => f.id === res.id && f.type === 'dining');
            return (
              <div 
                key={res.id} 
                onClick={() => setSelectedItem({...res, type: 'dining'})}
                className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex gap-4 cursor-pointer shadow-md items-center group active:scale-[0.99] transition-transform`}
              >
                <img src={res.img} className="w-24 h-24 rounded-2xl object-cover shadow-inner flex-shrink-0" alt={res.title} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-sm uppercase tracking-tight truncate ${theme.text}`}>{res.title}</h3>
                    <span className="text-[9px] font-black uppercase text-[#ffcb05] bg-[#ffcb05]/10 px-2.5 py-1 rounded-lg flex-shrink-0 ml-2">{res.cuisine || 'Eats'}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#34a4b8] uppercase tracking-wider mt-1">{res.neighborhood}</p>
                  <p className={`text-xs mt-1 line-clamp-1 ${theme.secondaryText}`}>{res.shortDesc}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite({...res, type: 'dining'}); }} 
                  className={`p-3 rounded-full backdrop-blur-md flex-shrink-0 transition-transform active:scale-90 ${isFavorited ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : 'bg-black/10 text-slate-400'}`}
                >
                  <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center opacity-40 text-xs font-bold uppercase tracking-widest">No restaurants found matching your search.</div>
        )}
      </div>
    </div>
  );
};

const JournalView = ({ theme, setSelectedItem, toggleFavorite, favorites, posts }) => {
  const [activeCat, setActiveCat] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCat === 'All') return posts || [];
    return (posts || []).filter(p => (p.allCategories || []).some(cat => cat.toLowerCase().includes(activeCat.toLowerCase())));
  }, [posts, activeCat]);

  return (
    <div className="animate-fade space-y-10 text-left relative z-10 pb-20 w-full flex flex-col">
      <div className="text-center px-4 w-full">
        <h1 className={`text-3xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>City Journal</h1>
        <div className="flex overflow-x-auto gap-3 mt-6 no-scrollbar">
          {CATEGORIES_JOURNAL.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className={`px-5 py-2.5 rounded-full border whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === cat ? 'bg-[#ffcb05] border-[#ffcb05] text-black shadow-lg' : `text-slate-500 bg-white/5 border-white/5`}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="px-1 grid grid-cols-2 gap-x-5 gap-y-12 w-full">
        {filteredPosts.map((art, idx) => {
          const isFeatured = idx === 0;
          return (
            <div key={art.id} onClick={() => setSelectedItem(art)} className={`space-y-4 cursor-pointer group ${isFeatured ? 'col-span-2' : 'col-span-1'}`}>
              <div className={`relative ${isFeatured ? 'h-80' : 'aspect-[4/5]'} rounded-[40px] overflow-hidden shadow-lg bg-slate-800/20 border border-white/5`}>
                {art.img ? <img src={art.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="" /> : <div className="w-full h-full flex items-center justify-center opacity-10"><Building size={48} /></div>}
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest">{art.category}</div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(art); }} className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === art.id) ? "bg-[#ffcb05]/20 text-[#ffcb05]" : "bg-black/20 text-white"}`}><Heart size={16} fill={(favorites || []).some(f => f.id === art.id) ? "currentColor" : "none"} /></button>
              </div>
              <div className="px-1"><h4 className={`${isFeatured ? 'text-2xl tracking-tighter' : 'text-sm tracking-tight'} font-header font-black uppercase italic leading-tight ${theme.text}`}>{art.title}</h4>{isFeatured && <p className={`text-base mt-3 line-clamp-2 leading-relaxed italic ${theme.secondaryText}`}>{art.excerpt}</p>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('a2v_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('a2v_stats');
    return saved ? JSON.parse(saved) : { water: 0, drinks: 0 };
  });

  const [itineraries, setItineraries] = useState(happeningsData);
  const [dining, setDining] = useState(eatsData);
  const [posts, setPosts] = useState(journalData);
  const [featuredPosts, setFeaturedPosts] = useState(journalData.filter(p => p.isHighlight));
  
  const [activeExpCat, setActiveExpCat] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const theme = THEMES[themeKey] || THEMES.dark;

  useEffect(() => { localStorage.setItem('a2v_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('a2v_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  const toggleFavorite = (item) => {
    const isAlreadyFavorited = (favorites || []).some(f => f.id === item.id && f.type === item.type);
    if (isAlreadyFavorited) { setFavorites(favorites.filter(f => !(f.id === item.id && f.type === item.type))); } 
    else { setFavorites([...favorites, { ...item, savedAt: Date.now() }]); }
  };

  const shuffledExp = useMemo(() => {
    const list = itineraries || [];
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    if (activeExpCat === 'All') return shuffled;
    return shuffled.filter(i => (i.category || "").toLowerCase().includes(activeExpCat.toLowerCase()));
  }, [itineraries, activeExpCat]);

  return (
    <div className={`min-h-screen ${theme.windowBg} font-sans transition-colors duration-500 flex flex-col items-center overflow-x-hidden`}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className={`w-full max-w-xl min-h-screen ${theme.appBg} relative shadow-2xl flex flex-col items-center border-x border-white/5`}>
        <Watermark />
        <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 ${theme.card}/80 backdrop-blur-xl border-b ${theme.border} px-5 py-5 flex justify-between items-center rounded-b-[40px] shadow-lg`}>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-[#ffcb05] w-10 h-10 rounded-xl flex items-center justify-center rotate-6 shadow-lg text-black"><Building size={20}/></div>
            <div className="flex flex-col leading-none text-left">
              <span className={`text-[11px] font-header font-black uppercase tracking-tighter ${theme.text}`}>A2</span>
              <span className={`text-[9px] font-header font-bold uppercase tracking-widest opacity-50 ${theme.text}`}>Vibe</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setView('profile')} className={`p-3 rounded-2xl bg-black/5 ${theme.text}`}><User size={20}/></button>
            <button onClick={() => setThemeKey(theme.isDark ? 'light' : 'dark')} className={`p-3 rounded-2xl bg-[#00274c] hover:bg-[#ffcb05] transition-colors border border-white/10 ${theme.text}`}>{theme.isDark ? <Sun size={20} className="text-[#ffcb05]" /> : <Moon size={20} />}</button>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-36 overflow-y-auto no-scrollbar w-full px-5 flex flex-col">
          <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} theme={theme} toggleFavorite={toggleFavorite} favorites={favorites} />
          {view === 'home' && <HomeView theme={theme} setView={setView} setSelectedItem={setSelectedItem} itineraries={itineraries} dining={dining} featuredPosts={featuredPosts} favorites={favorites} toggleFavorite={toggleFavorite} />}
          {view === 'journal' && <JournalView theme={theme} setSelectedItem={setSelectedItem} toggleFavorite={toggleFavorite} favorites={favorites} posts={posts} />}
          {view === 'flavors' && <FlavorsView theme={theme} setSelectedItem={setSelectedItem} toggleFavorite={toggleFavorite} favorites={favorites} dining={dining} />}
          {view === 'profile' && <HubView theme={theme} favorites={favorites} toggleFavorite={toggleFavorite} stats={stats} setStats={setStats} setSelectedItem={setSelectedItem} setView={setView} />}
          {view === 'fun' && (
            <div className="space-y-12 animate-fade w-full">
               <div className="text-center px-4"><h1 className={`text-2xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>Happenings</h1><div className="flex overflow-x-auto gap-3 mt-6 no-scrollbar px-1">{CATEGORIES_EXP.map((cat) => <button key={cat} onClick={() => setActiveExpCat(cat)} className={`px-5 py-2.5 rounded-full border whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${activeExpCat === cat ? 'bg-[#ffcb05] border-[#ffcb05] text-black shadow-lg scale-105' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'}`}>{cat}</button>)}</div></div>
               <div className="space-y-5 px-1 pt-4 w-full">
                  {shuffledExp && shuffledExp.length > 0 ? (
                    <>
                      {shuffledExp.slice(0, activeExpCat === 'All' ? visibleCount : shuffledExp.length).map(exp => (
                        <div key={exp.id} onClick={()=>setSelectedItem(exp)} className={`${theme.card} flex h-36 rounded-[32px] border ${theme.border} overflow-hidden cursor-pointer shadow-md relative group`}>
                            {exp.img && <img src={exp.img} className="w-28 h-full object-cover group-hover:scale-105 transition-all duration-500" alt="" />}
                            <div className="flex-1 p-5 flex flex-col justify-between text-left">
                               <div className="flex justify-between items-start"><div className="max-w-[85%]"><h4 className={`font-bold uppercase text-xs leading-tight ${theme.text} line-clamp-2 tracking-tight`}>{exp.name}</h4><span className="text-[9px] font-black text-[#34a4b8] uppercase tracking-[0.2em] mt-2 block">{exp.category}</span></div><button onClick={(e)=>{e.stopPropagation(); toggleFavorite(exp);}} className={`p-2 rounded-full transition-all duration-300 ${(favorites || []).some(f => f.id === exp.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : ''}`}><Heart size={18} className={(favorites || []).some(f => f.id === exp.id) ? 'text-[#ffcb05]' : 'text-slate-300'} fill={(favorites || []).some(f => f.id === exp.id) ? "currentColor" : "none"} /></button></div>
                               <div className="flex items-center justify-between"><span className={`text-[10px] font-black uppercase text-slate-500`}>A2 LOCAL</span><button onClick={(e) => { e.stopPropagation(); exp.url && window.open(exp.url, '_blank'); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase px-5 py-2.5 rounded-xl shadow-md">Details</button></div>
                            </div>
                        </div>
                      ))}
                      {activeExpCat === 'All' && visibleCount < (shuffledExp.length || 0) && (
                        <button onClick={() => setVisibleCount(p => p + 6)} className="w-full py-5 bg-[#00274c] text-[#ffcb05] rounded-[24px] font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all mt-4 border border-[#ffcb05]/20">Load More Events</button>
                      )}
                    </>
                  ) : <div className="py-20 text-center opacity-30 text-sm italic">No events found for this category.</div>}
               </div>
               <section className="px-1 space-y-5 w-full">
                  <div className="flex items-center gap-2 px-1"><Sparkles size={18} className="text-[#34a4b8]" /><h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>A2 Exploration</h2></div>
                  <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory px-1">
                    <button onClick={() => window.open('https://www.theride.org/', '_blank')} className={`${theme.card} min-w-[160px] p-6 rounded-3xl border ${theme.border} flex flex-col items-center gap-4 shadow-md active:scale-95 transition-all snap-start`}><div className="p-4 bg-[#34a4b8]/10 text-[#34a4b8] rounded-2xl"><Navigation size={28} /></div><span className={`text-[11px] font-bold uppercase text-center leading-tight ${theme.text}`}>Bus Routes</span></button>
                  </div>
               </section>
            </div>
          )}
        </main>

        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-[60] ${theme.card}/95 backdrop-blur-xl border-t ${theme.border} px-4 py-8 flex justify-around shadow-2xl rounded-t-[40px] font-sans`}>
          {[
            { id: 'home', icon: Building, label: 'Insider' }, 
            { id: 'fun', icon: Sparkles, label: 'Happenings' }, 
            { id: 'journal', icon: BookText, label: 'Journal' }, 
            { id: 'flavors', icon: Utensils, label: 'Flavors' }, 
            { id: 'profile', icon: User, label: 'My Vibe' }
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)} className={`flex flex-col items-center gap-2 transition-all duration-300 ${view === v.id ? 'scale-110 opacity-100' : 'opacity-30'}`} style={view === v.id ? { color: '#ffcb05' } : { color: theme.isDark ? '#fff' : '#1a2b4b' }}><v.icon size={24} /><span className="text-[11px] font-black uppercase tracking-widest mt-2 leading-none">{v.label}</span></button>
          ))}
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .font-header { font-family: 'Outfit', sans-serif; }
        .wp-content img { max-width: 100% !important; height: auto !important; border-radius: 20px; margin: 15px 0; display: block; }
        .wp-content p { margin-bottom: 1rem; line-height: 1.6; }
        .wp-content strong { color: #ffcb05; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .bg-slate-50 .wp-content, .bg-slate-50 .wp-content p { color: #00274c !important; }
        .bg-dark .wp-content, .bg-dark .wp-content p { color: #f1f5f9 !important; }
      `}} />
    </div>
  );
}
