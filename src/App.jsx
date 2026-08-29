import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search, Dice5, HelpCircle, Award, Users, Plus, Trash2, RotateCcw, Tag, Flame
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

const CATEGORIES_JOURNAL = ['All', 'City Life', 'Local Secrets', 'Arts & Culture', 'Dining Reviews', 'Community Reports', 'Events', 'Meetups'];
const CATEGORIES_EXP = ['All', 'Festivals', 'Nightlife', 'Museums', 'Parks', 'Workshops', 'Sports', 'Family Friendly', 'Hidden Gems', 'Tours', 'Arts & Culture'];

const SLIDE_IMAGES = [
  "/images/1.png", 
  "/images/4.png", 
  "/images/10.png", 
  "/images/5.png", 
  "/images/3.png", 
  "/images/2.png"
];

// --- Helpers ---
const Watermark = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.02] flex items-center justify-center">
    <Building size={500} strokeWidth={0.5} className="rotate-12" />
  </div>
);

// Randomly tag 'count' items as featured
const applyRandomFeatured = (data, count = 5) => {
  if (!data || data.length === 0) return [];
  const dataWithTempIds = data.map((item, idx) => ({ ...item, _tempId: item.id || idx }));
  const shuffled = [...dataWithTempIds].sort(() => 0.5 - Math.random());
  const featuredIds = new Set(shuffled.slice(0, count).map(item => item._tempId));
  
  return dataWithTempIds.map(item => {
    const { _tempId, ...rest } = item;
    return {
      ...rest,
      isFeatured: rest.isFeatured || featuredIds.has(_tempId)
    };
  });
};

// --- Components ---
const Modal = ({ isOpen, onClose, item, theme, toggleFavorite, favorites }) => {
  if (!isOpen || !item) return null;
  const isFavorited = (favorites || []).some(f => f.id === item.id && f.type === item.type);
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <div className="flex items-center gap-2 pr-4">
            {item.isFeatured && <span className="bg-[#ffcb05] text-black px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">Featured Spot</span>}
            <h3 className={`text-lg font-header font-black uppercase italic tracking-tight`} style={{ color: '#ffcb05' }}>
              {item.name || item.title || 'Spotlight'}
            </h3>
          </div>
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
          {item.img && <img src={item.img} className="w-full h-72 object-cover rounded-[32px] shadow-lg" alt="" />}

          <div className="flex items-center gap-4 flex-wrap">
            {item.price && <div className="bg-[#ffcb05]/20 text-[#ffcb05] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.price}</div>}
            {item.cuisine && <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.cuisine}</div>}
            <div className="bg-[#00274c]/40 text-[#34a4b8] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
              {Array.isArray(item.category) ? item.category.join(' • ') : (item.category || item.neighborhood || 'City Guide')}
            </div>
          </div>

          {item.address && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5">
              <MapPin size={16} className="text-[#ffcb05]" />
              <span>{item.address}</span>
            </div>
          )}

          {item.isFeatured && (
            <div className="space-y-4 pt-2 border-t border-white/10">
              {item.menuHighlights && (
                <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#ffcb05] mb-2 flex items-center gap-1.5">
                    <Utensils size={14} /> Menu Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {item.menuHighlights.map((m, idx) => (
                      <li key={idx} className="text-xs flex justify-between text-slate-300 font-medium">
                        <span>{m.item}</span>
                        <span className="text-[#ffcb05] font-bold">{m.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.specials && (
                <div className="bg-[#ffcb05]/10 p-4 rounded-2xl border border-[#ffcb05]/20">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#ffcb05] mb-2 flex items-center gap-1.5">
                    <Flame size={14} /> Current Specials & Offers
                  </h4>
                  <div className="space-y-2">
                    {item.specials.map((s, idx) => (
                      <div key={idx} className="text-xs bg-black/20 p-2.5 rounded-xl border border-white/5">
                        <p className="font-bold text-white">{s.title}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={`text-base leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`} 
            dangerouslySetInnerHTML={{ __html: item.longDesc || item.desc || item.excerpt || 'Accessing city database...' }} 
          />

          {item.url && (
            <button 
              onClick={() => { window.open(item.url, '_blank'); }} 
              className="w-full bg-[#ffcb05] text-black font-black uppercase text-base py-5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Visit Official Website</span>
              <Navigation size={18} />
            </button>
          )}
        </div>
      </div>
  </div>
  );
};

const ToolFullScreenView = ({ type, onClose, theme, stats, setStats, dining }) => {
  const [bill, setBill] = useState('');
  const [tipPerc, setTipPerc] = useState(20);
  const [weatherIdx, setWeatherIdx] = useState(new Date().getMonth());
  const [randomSpot, setRandomSpot] = useState(null);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const defaultBucketItems = [
    { id: 1, text: "Catch a game at the Big House", done: false },
    { id: 2, text: "Walk through the Nichols Arboretum", done: false },
    { id: 3, text: "Explore Kerrytown Farmers Market", done: false },
    { id: 4, text: "Snap photos at the U-M Law Quad", done: false }
  ];

  const [bucketList, setBucketList] = useState(() => {
    const saved = localStorage.getItem('a2v_bucketlist');
    return saved ? JSON.parse(saved) : defaultBucketItems;
  });
  const [newBucketText, setNewBucketText] = useState('');

  useEffect(() => {
    localStorage.setItem('a2v_bucketlist', JSON.stringify(bucketList));
  }, [bucketList]);

  const toggleBucketItem = (id) => {
    setBucketList(bucketList.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const deleteBucketItem = (id, e) => {
    e.stopPropagation();
    setBucketList(bucketList.filter(item => item.id !== id));
  };

  const resetBucketList = () => {
    setBucketList(defaultBucketItems);
  };

  const addBucketItem = (e) => {
    e.preventDefault();
    if (!newBucketText.trim()) return;
    const newItem = { id: Date.now(), text: newBucketText.trim(), done: false };
    setBucketList([...bucketList, newItem]);
    setNewBucketText('');
  };

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

  const spinRandomizer = () => {
    if (!dining || dining.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dining.length);
    setRandomSpot(dining[randomIndex]);
  };

  const toolTitles = {
    hots: 'City Hot Spots',
    calc: 'Tip Calculator',
    weather: 'City Forecast',
    water: 'Stay Hydrated',
    randomizer: 'Weekend Pitcher / Randomizer',
    trivia: 'Tree Town Trivia',
    bucket: 'A2 Bucket List Passport',
    mystery: 'Mystery Spot'
  };

  return (
    <div className="animate-fade space-y-6 text-left relative z-10 pb-20 w-full flex flex-col font-sans">
      <div className={`sticky top-0 z-40 flex justify-between items-center py-4 px-4 ${theme.appBg} border-b ${theme.border} shadow-sm -mx-5 w-[calc(100%+40px)] mb-4`}>
        <h1 className={`text-xl font-header font-black uppercase italic tracking-tighter`} style={{ color: '#ffcb05' }}>
          {toolTitles[type] || 'City Tool'}
        </h1>
        <button 
          onClick={onClose} 
          className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm transition-all active:scale-90 ${theme.isDark ? 'text-white' : 'text-black'}`}
        >
          <X size={22}/>
        </button>
      </div>

      <div className="px-1 space-y-6 w-full pt-2">
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
          <div className="space-y-8 max-w-md mx-auto w-full">
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
              <div className="grid grid-cols-3 gap-2">
                {[18, 20, 25].map(p => (
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
          <div className="space-y-6 max-w-md mx-auto w-full">
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
          <div className="space-y-6 text-center py-4 max-w-md mx-auto w-full">
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
                <button onClick={() => setStats({...stats, water: (stats.water || 0) + 1})} className="
