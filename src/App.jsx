import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search, Dice5, HelpCircle, Award, Users
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
  "/images/1.png", "/images/4.png", "/images/10.png", "/images/5.png", "/images/3.png", "/images/2.png"
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
            <button onClick={() => toggleFavorite(item)} className="p-2.5 rounded-full transition-all duration-300 bg-white/5 active:scale-90">
              <Heart size={22} className="text-[#ffcb05]" fill={isFavorited ? "#ffcb05" : "none"} strokeWidth={2.5} />
            </button>
            <button onClick={onClose} className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm transition-all active:scale-90 ${theme.isDark ? 'text-white' : 'text-black'}`}>
              <X size={22}/>
            </button>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {item.img && <img src={item.img} className="w-full h-64 object-cover rounded-[32px] shadow-lg" alt="" />}
          
          {item.type === 'experience' && (
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Gallery Highlights</p>
              <div className="grid grid-cols-2 gap-3">
                <img src={item.img.replace('.jpg', '-1.jpg')} className="w-full h-28 object-cover rounded-2xl border border-white/5 opacity-80 hover:opacity-100 transition-opacity" alt="Gallery 1" />
                <img src={item.img.replace('.jpg', '-2.jpg')} className="w-full h-28 object-cover rounded-2xl border border-white/5 opacity-80 hover:opacity-100 transition-opacity" alt="Gallery 2" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            {item.price && <div className="bg-[#ffcb05]/20 text-[#ffcb05] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.price}</div>}
            <div className="bg-[#00274c]/40 text-[#34a4b8] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">{item.category || 'City Guide'}</div>
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
            <button onClick={() => window.open(item.url, '_blank')} className="w-full bg-[#ffcb05] text-black font-black uppercase text-base py-5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>Visit Official Website</span>
              <Navigation size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ToolPopup = ({ type, isOpen, onClose, theme, stats, setStats, dining }) => {
  const [bill, setBill] = useState('');
  const [tipPerc, setTipPerc] = useState(20);
  const [weatherIdx, setWeatherIdx] = useState(new Date().getMonth());
  const [randomSpot, setRandomSpot] = useState(null);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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

  const spinRandomizer = () => {
    if (!dining || dining.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dining.length);
    setRandomSpot(dining[randomIndex]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} p-8`}>
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-xl font-header font-black uppercase italic tracking-tighter" style={{ color: '#ffcb05' }}>
             {type === 'calc' ? 'Tip Calculator' : type === 'randomizer' ? 'Weekend Pitcher' : type === 'trivia' ? 'Tree Town Trivia' : 'Mystery Spot'}
           </h3>
           <button onClick={onClose} className={`p-2 rounded-full bg-white/10 ${theme.isDark ? 'text-white' : 'text-black'}`}><X size={20}/></button>
        </div>

        {type === 'calc' && (
          <div className="space-y-8">
            <div className="bg-black/20 p-6 rounded-3xl border border-white/5 text-center">
               <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Total with Tip</p>
               <h2 className="text-5xl font-header font-black text-white">${totalBill}</h2>
               <div className="flex justify-center gap-4 mt-4 text-[#ffcb05] font-bold text-sm"><span>Tip: ${tipAmount}</span></div>
            </div>
            <div className="space-y-4">
              <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0.00" className={`w-full p-5 rounded-2xl bg-black/20 border border-white/10 text-white font-bold text-xl outline-none focus:border-[#ffcb05]`} />
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map(p => (
                  <button key={p} onClick={() => setTipPerc(p)} className={`py-4 rounded-xl font-black text-xs transition-all ${tipPerc === p ? 'bg-[#ffcb05] text-black scale-105' : 'bg-white/5 text-slate-400'}`}>{p}%</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === 'randomizer' && (
          <div className="space-y-6 text-center py-4">
            <p className={`text-xs ${theme.secondaryText}`}>Let the Weekend Pitcher pick your destination!</p>
            {randomSpot ? (
              <div className="p-6 rounded-3xl bg-black/20 border border-white/10 space-y-3 animate-fade">
                <img src={randomSpot.img} className="w-full h-40 object-cover rounded-2xl shadow-md" alt="" />
                <h4 className={`text-lg font-black uppercase ${theme.text}`}>{randomSpot.title}</h4>
              </div>
            ) : <div className="p-10 border-2 border-dashed rounded-3xl opacity-40 text-xs font-bold uppercase">Click roll to pick!</div>}
            <button onClick={spinRandomizer} className="w-full py-4 bg-[#ffcb05] text-black rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all">Roll the Dice 🎲</button>
          </div>
        )}

        {type === 'trivia' && (
          <div className="space-y-6 text-center py-4">
            <div className="p-5 rounded-3xl bg-black/20 border border-white/10 space-y-3">
              <h4 className={`text-sm font-bold ${theme.text}`}>Which Ann Arbor building's courtyard is rumored to have inspired Hogwarts architecture?</h4>
            </div>
            <div className="space-y-2">
              {['U-M Law Quadrangle', 'Michigan Union', 'Angell Hall', 'Rackham Building'].map((opt) => (
                <button key={opt} disabled={triviaAnswered} onClick={() => { setSelectedAnswer(opt); setTriviaAnswered(true); }} className={`w-full p-4 rounded-2xl text-xs font-bold transition-all border border-white/5 ${triviaAnswered && opt === 'U-M Law Quadrangle' ? 'bg-emerald-600' : 'bg-white/5'}`}>{opt}</button>
              ))}
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
                  <button onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase py-2 px-4 rounded-xl">Details</button>
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
    const filtered = activeExpCat === 'All' ? list : list.filter(i => (i.category || "").toLowerCase().includes(activeExpCat.toLowerCase()));
    return [...filtered];
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
                                <div className="flex justify-between items-start">
                                  <div className="max-w-[85%]">
                                    <h4 className={`font-bold uppercase text-xs leading-tight ${theme.text} line-clamp-2 tracking-tight`}>{exp.name}</h4>
                                    <span className="text-[9px] font-black text-[#34a4b8] uppercase tracking-[0.2em] mt-2 block">{exp.category}</span>
                                  </div>
                                  <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(exp);}} className={`p-2 rounded-full transition-all duration-300 ${(favorites || []).some(f => f.id === exp.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : ''}`}><Heart size={18} className={(favorites || []).some(f => f.id === exp.id) ? 'text-[#ffcb05]' : 'text-slate-300'} fill={(favorites || []).some(f => f.id === exp.id) ? "currentColor" : "none"} /></button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className={`text-[10px] font-black uppercase text-slate-500`}>{exp.price || 'A2 LOCAL'}</span>
                                  <button onClick={(e) => { e.stopPropagation(); setSelectedItem(exp); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-all">Details</button>
                                </div>
                             </div>
                         </div>
                       ))}
                       {activeExpCat === 'All' && visibleCount < (shuffledExp.length || 0) && (
                         <button onClick={() => setVisibleCount(p => p + 6)} className="w-full py-5 bg-[#00274c] text-[#ffcb05] rounded-[24px] font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all mt-4 border border-[#ffcb05]/20">Load More Events</button>
                       )}
                     </>
                   ) : <div className="py-20 text-center opacity-30 text-sm italic">No events found for this category.</div>}
                </div>
             </div>
          )}
        </main>

        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-[60] ${theme.card}/95 backdrop-blur-xl border-t ${theme.border} px-4 py-8 flex justify-around shadow-2xl rounded-t-[40px] font-sans`}>
          {[
            { id: 'home', icon: Building, label: 'Insider', color: '#ffcb05' }, 
            { id: 'fun', icon: Sparkles, label: 'Happenings', color: '#38bdf8' }, 
            { id: 'journal', icon: BookText, label: 'Journal', color: '#a855f7' }, 
            { id: 'flavors', icon: Utensils, label: 'Flavors', color: '#f97316' }, 
            { id: 'profile', icon: User, label: 'My Vibe', color: '#10b981' }
          ].map(v => {
            const isActive = view === v.id;
            return (
              <button key={v.id} onClick={() => setView(v.id)} className={`flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-40 hover:opacity-75'}`} style={{ color: isActive ? v.color : (theme.isDark ? '#94a3b8' : '#64748b') }}>
                <v.icon size={24} style={{ filter: isActive ? `drop-shadow(0 0 8px ${v.color}66)` : 'none' }} />
                <span className="text-[11px] font-black uppercase tracking-widest mt-2 leading-none">{v.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .font-header { font-family: 'Outfit', sans-serif; }
        .wp-content img { max-width: 100% !important; height: auto !important; border-radius: 20px; margin: 15px 0; display: block; }
        .wp-content p { margin-bottom: 1rem; line-height: 1.6; }
        .wp-content strong { color: #ffcb05; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .bg-slate-50 .wp-content, .bg-slate-50 .wp-content p { color: #00274c !important; }
        .bg-dark .wp-content, .wp-content p { color: #f1f5f9 !important; }
      `}} />
    </div>
  );
}
