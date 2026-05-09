import React, { useState, useEffect, useMemo } from 'react';
import { 
  Map as MapIcon, Sun, User, Heart, Building, Utensils, Ticket, 
  Sparkles, Zap, Fish, Droplets, Plane, X, ChevronLeft, 
  ChevronRight, BookText, Store, Minus, Plus, ShoppingBag, 
  Moon, Calculator, Thermometer, MapPin, Camera
} from 'lucide-react';

// --- CONFIG ---
const THEMES = {
  light: { primary: '#00274c', windowBg: 'bg-slate-200', appBg: 'bg-slate-50', card: 'bg-white', text: 'text-slate-900', border: 'border-slate-200', isDark: false },
  dark: { primary: '#ffcb05', windowBg: 'bg-[#050b14]', appBg: 'bg-[#0a121e]', card: 'bg-[#151f2e]', text: 'text-slate-100', border: 'border-slate-800', isDark: true }
};

const SLIDE_IMAGES = [
  "http://captainkeywest.com/wp-content/uploads/2026/03/Captain-Key-West-App-Image-1.png",
  "http://captainkeywest.com/wp-content/uploads/2026/03/Captain-Key-West-App-Image-2.png",
  "http://captainkeywest.com/wp-content/uploads/2026/03/Captain-Key-West-App-Image-3.png"
];

const decodeHTML = (html) => {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// --- Modals & Tools ---

const Modal = ({ isOpen, onClose, item, theme, toggleFavorite, favorites }) => {
  if (!isOpen || !item) return null;
  const isFavorited = (favorites || []).some(f => f.id === item.id && f.type === item.type);
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade text-left">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border}`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <h3 className="text-lg font-header font-black uppercase italic tracking-tight" style={{ color: '#ffcb05' }}>{item.name || item.title}</h3>
          <div className="flex items-center gap-3">
            <button onClick={() => toggleFavorite(item)} className="p-2.5 bg-white/5 rounded-full active:scale-90">
              <Heart size={22} className="text-[#ffcb05] drop-shadow-[0_0_8px_rgba(255,203,5,0.5)]" fill={isFavorited ? "#ffcb05" : "none"} strokeWidth={2.5} />
            </button>
            <button onClick={onClose} className={`p-2.5 bg-white/10 rounded-full ${theme.isDark ? 'text-white' : 'text-black'}`}><X size={22}/></button>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {item.img && <img src={item.img} className="w-full h-64 object-cover rounded-[32px]" alt="" />}
          <div className="flex gap-4">
            {item.price && <div className="bg-[#ffcb05]/20 text-[#ffcb05] px-4 py-2 rounded-xl text-xs font-bold uppercase">{item.price}</div>}
            <div className="bg-[#00274c]/30 text-[#34a4b8] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">{item.category || 'City Guide'}</div>
          </div>
          <div className={`text-base leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`} dangerouslySetInnerHTML={{ __html: item.longDesc || item.desc || 'No description available.' }} />
          {item.url && <button onClick={() => window.open(item.url, '_blank')} className="w-full bg-[#ffcb05] text-black font-black uppercase py-5 rounded-2xl shadow-xl active:scale-95 transition-all">Visit Website</button>}
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

  const tipAmount = bill ? (parseFloat(bill) * (tipPerc / 100)).toFixed(2) : '0.00';
  const totalBill = bill ? (parseFloat(bill) + parseFloat(tipAmount)).toFixed(2) : '0.00';

  const POIs = [
    { name: "Michigan Stadium", type: "Landmark", color: "bg-[#00274c]", desc: "The Big House. Essential destination." },
    { name: "Nichols Arboretum", type: "Nature", color: "bg-emerald-600", desc: "The 'Arb'. Perfect for riverside walks." },
    { name: "Main Street", type: "Social", color: "bg-[#ffcb05] text-black", desc: "Dining and local shopping." }
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg rounded-[40px] border ${theme.border} p-8`}>
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-xl font-header font-black uppercase italic tracking-tighter" style={{ color: '#ffcb05' }}>
             {type === 'hots' ? 'City Hot Spots' : type === 'calc' ? 'Tip Calculator' : type === 'weather' ? 'City Forecast' : 'Stay Hydrated'}
           </h3>
           <button onClick={onClose} className={`p-2 rounded-full bg-white/10 ${theme.isDark ? 'text-white' : 'text-black'}`}><X/></button>
        </div>

        {type === 'hots' && <div className="space-y-4">{POIs.map(p => <div key={p.name} className="p-5 rounded-[24px] border border-white/5 bg-black/10"><div className="flex justify-between items-center mb-2"><h4 className={`font-bold ${theme.text}`}>{p.name}</h4><span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${p.color}`}>{p.type}</span></div><p className="text-xs text-slate-500">{p.desc}</p></div>)}</div>}

        {type === 'calc' && (
          <div className="space-y-8">
            <div className="bg-black/20 p-6 rounded-3xl border border-white/5 text-center">
               <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Total Due</p>
               <h2 className="text-5xl font-header font-black text-white">${totalBill}</h2>
               <div className="mt-2 text-[#ffcb05] font-bold">Tip: ${tipAmount}</div>
            </div>
            <div className="space-y-4">
              <input type="number" value={bill} onChange={(e)=>setBill(e.target.value)} placeholder="0.00" className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 text-white font-bold text-xl outline-none focus:border-[#ffcb05]" />
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map(p => <button key={p} onClick={()=>setTipPerc(p)} className={`py-4 rounded-xl font-black text-xs transition-all ${tipPerc === p ? 'bg-[#ffcb05] text-black scale-105 shadow-lg' : 'bg-white/5 text-slate-400'}`}>{p}%</button>)}
              </div>
            </div>
          </div>
        )}

       {type === 'weather' && (
          <div className="space-y-6 text-center">
            <div className={`p-10 rounded-[32px] ${weatherData[weatherIdx].vibe} text-white shadow-2xl`}>
               <p className="text-xs font-black uppercase tracking-[0.3em] mb-2">{weatherData[weatherIdx].month}</p>
               <h2 className="text-6xl font-header font-black">{weatherData[weatherIdx].high}°</h2>
               <p className="text-sm font-bold opacity-80 mt-2">Avg Low: {weatherData[weatherIdx].low}°</p>
            </div>
            <div className="flex justify-between items-center gap-4">
              <button onClick={()=>setWeatherIdx(p=>(p-1+12)%12)} className="p-4 bg-white/5 rounded-2xl text-white"><ChevronLeft/></button>
              <span className="font-header font-black uppercase text-[10px] text-slate-500">A2 Calendar</span>
              <button onClick={()=>setWeatherIdx(p=>(p+1)%12)} className="p-4 bg-white/5 rounded-2xl text-white"><ChevronRight/></button>
            </div>
          </div>
        )}

        {type === 'water' && <div className="space-y-8 text-center py-6"><div className="flex justify-around items-center"><div><p className="text-4xl font-black text-blue-400">{stats.water || 0}</p><p className="text-[10px] font-black text-slate-500">Water</p></div><div><p className="text-4xl font-black text-[#ffcb05]">{stats.drinks || 0}</p><p className="text-[10px] font-black text-slate-500">Beverages</p></div></div><div className="grid grid-cols-2 gap-4"><button onClick={()=>setStats({...stats, water: (stats.water||0)+1})} className="bg-blue-600 py-4 rounded-2xl text-white font-black uppercase text-xs shadow-lg">+ Water</button><button onClick={()=>setStats({...stats, drinks: (stats.drinks||0)+1})} className="bg-[#ffcb05] py-4 rounded-2xl text-black font-black uppercase text-xs shadow-lg">+ Drink</button></div></div>}
      </div>
    </div>
  );
};

// --- Application Component ---

export default function App() {
  const [view, setView] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [favorites, setFavorites] = useState(() => {
    const s = localStorage.getItem('a2v_favorites');
    return s ? JSON.parse(s) : [];
  });
  const [stats, setStats] = useState(() => {
    const s = localStorage.getItem('a2v_stats');
    return s ? JSON.parse(s) : { water: 0, drinks: 0 };
  });

  const [itineraries, setItineraries] = useState([]);
  const [dining, setDining] = useState([]);
  const [essentials, setEssentials] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const theme = THEMES[themeKey] || THEMES.dark;

  useEffect(() => { localStorage.setItem('a2v_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('a2v_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resItin = await fetch('https://captainkeywest.com/wp-json/wp/v2/itineraries?_embed&per_page=40');
        if (resItin.ok) {
          const data = await resItin.ok ? await resItin.json() : [];
          setItineraries(data.map(i => ({ id: i.id, name: decodeHTML(i.title?.rendered), price: i.acf?.price || "--", category: i.acf?.display_category || "Guide", longDesc: i.content?.rendered, img: i._embedded?.['wp:featuredmedia']?.[0]?.source_url || null, url: i.acf?.booking_url || null, type: 'experience' })));
        }
        const resEss = await fetch('https://captainkeywest.com/wp-json/wp/v2/amazon_essential?_embed&per_page=40');
        if (resEss.ok) {
          const data = await resEss.json();
          setEssentials(data.map(e => ({ id: e.id, name: decodeHTML(e.title?.rendered), price: e.acf?.price || "$--", img: e._embedded?.['wp:featuredmedia']?.[0]?.source_url || null, url: e.acf?.affiliate_link || null, longDesc: e.content?.rendered, category: 'A2 Gear', type: 'amazon' })));
        }
      } catch (e) { console.warn("Sync error"); }
    };
    fetchData();
  }, []);

const toggleFavorite = (item) => {
    const isAlreadyFavorited = favorites.some(f => f.id === item.id && f.type === item.type);
    if (isAlreadyFavorited) { setFavorites(favorites.filter(f => !(f.id === item.id && f.type === item.type))); } 
    else { setFavorites([...favorites, { ...item, savedAt: Date.now() }]); }
  };

  return (
    <div className={`min-h-screen ${theme.windowBg} font-sans flex flex-col items-center overflow-x-hidden`}>
      <div className={`w-full max-w-xl min-h-screen ${theme.appBg} relative shadow-2xl flex flex-col items-center border-x border-white/5`}>
        
        <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 ${theme.card}/80 backdrop-blur-xl border-b ${theme.border} px-5 py-5 flex justify-between items-center rounded-b-[40px] shadow-lg`}>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-[#ffcb05] w-10 h-10 rounded-xl flex items-center justify-center rotate-6 shadow-lg text-black"><MapIcon size={20}/></div>
            <div className="flex flex-col leading-none text-left">
              <span className={`text-[11px] font-header font-black uppercase tracking-tighter ${theme.text}`}>A2</span>
              <span className={`text-[9px] font-header font-bold uppercase tracking-widest opacity-70 ${theme.text}`}>Vibe</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setView('profile')} className={`p-3 rounded-2xl bg-black/5 ${theme.text}`}><User size={20}/></button>
            <button onClick={() => setThemeKey(theme.isDark ? 'light' : 'dark')} className={`p-3 rounded-2xl bg-black/5 ${theme.text}`}>{theme.isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          </div>
        </header>

          <main className="flex-1 pt-32 pb-36 w-full px-5">
          <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} theme={theme} toggleFavorite={toggleFavorite} favorites={favorites} />
          
          {view === 'home' && <HomeView theme={theme} setSelectedItem={setSelectedItem} itineraries={itineraries} dining={dining} favorites={favorites} toggleFavorite={toggleFavorite} />}
          
          {view === 'profile' && (
            <div className="animate-slide space-y-10 w-full flex flex-col items-center">
              <ToolPopup type={activeTool} isOpen={!!activeTool} onClose={() => setActiveTool(null)} theme={theme} stats={stats} setStats={setStats} />
              <div className="w-full relative h-64 rounded-[48px] overflow-hidden border border-white/10 shadow-2xl">
                <img src={SLIDE_IMAGES[0]} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a121e] via-[#0a121e]/30 to-transparent" />
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00274c] to-[#ffcb05] p-0.5"><div className={`w-full h-full rounded-full ${theme.card} flex items-center justify-center text-white`}><Anchor size={24} /></div></div>
                  <div><h3 className="text-2xl font-header font-black uppercase text-white tracking-tight">Key West</h3><p className="text-[9px] font-black uppercase text-[#ffcb05] tracking-widest opacity-90">Personal Trip Planner</p></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                <button onClick={()=>setActiveTool('hots')} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-3 shadow-lg active:scale-95`}><div className="p-2 bg-[#ffcb05]/10 text-[#ffcb05] rounded-lg"><MapPin size={18}/></div><span className="text-[10px] font-black uppercase tracking-widest">Hot Spots</span></button>
                <button onClick={()=>setActiveTool('calc')} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-3 shadow-lg active:scale-95`}><div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Calculator size={18}/></div><span className="text-[10px] font-black uppercase tracking-widest">Tip Calc</span></button>
              </div>
              <div className="w-full space-y-5">
                 <h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>My List</h4>
                 <div className="grid grid-cols-1 gap-4">
                    {favorites.length === 0 ? <div className={`p-10 border-2 border-dashed rounded-[32px] text-center opacity-30 text-[9px] font-black uppercase tracking-widest ${theme.border}`}>No saves yet</div> : favorites.map(fav => (
                      <div key={fav.id} onClick={()=>setSelectedItem(fav)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-5 cursor-pointer shadow-md`}>
                        {fav.img && <img src={fav.img} className="w-16 h-16 rounded-2xl object-cover" alt="" />}
                        <div className="flex-1">
                          <p className={`text-sm font-bold ${theme.text}`}>{fav.name || fav.title}</p>
                          <p className="text-[9px] font-black uppercase text-[#ffcb05]">{fav.price}</p>
                        </div>
                        <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(fav);}} className="text-red-500 p-2"><Heart size={18} fill="currentColor" /></button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

             {view === 'fun' && (
            <div className="space-y-8 w-full">
               <h1 className={`text-2xl font-header font-black uppercase italic ${theme.text}`}>City Pulse</h1>
               <div className="space-y-5">
                  {(itineraries || []).map(exp => (
                    <div key={exp.id} onClick={()=>setSelectedItem(exp)} className={`${theme.card} flex h-36 rounded-[32px] border ${theme.border} overflow-hidden shadow-md group`}>
                      {exp.img && <img src={exp.img} className="w-28 h-full object-cover" alt="" />}
                      <div className="flex-1 p-5 flex flex-col justify-between text-left">
                        <div className="flex justify-between items-start"><h4 className={`font-bold uppercase text-xs leading-tight ${theme.text} line-clamp-2`}>{exp.name}</h4><Heart size={18} className="text-slate-300" /></div>
                        <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase text-slate-500">{exp.price}</span><button className="bg-[#ffcb05] text-black text-[9px] font-black uppercase px-5 py-2.5 rounded-xl shadow-md">Explore</button></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

            {view === 'essentials' && (
            <div className="space-y-12 animate-fade w-full">
               <h2 className={`text-xl font-header font-black uppercase tracking-tighter ${theme.text}`}>Local Essentials</h2>
               <div className="grid grid-cols-2 gap-4">
                 {(essentials || []).map(x => (<div key={x.id} onClick={()=>setSelectedItem(x)} className={`${theme.card} p-4 border ${theme.border} rounded-[24px] shadow-sm group`}><img src={x.img} className="w-full aspect-square object-cover rounded-2xl mb-3" alt="" /><h4 className={`text-xs font-bold uppercase ${theme.text} line-clamp-1`}>{x.name}</h4><div className="flex items-center justify-between mt-2"><p className="text-base font-black text-[#ffcb05]">{x.price}</p><button onClick={(e) => { e.stopPropagation(); x.url && window.open(x.url, '_blank'); }} className="bg-[#00274c] text-[#ffcb05] text-[10px] font-bold uppercase px-4 py-2 rounded-xl border border-[#ffcb05]/20">Buy</button></div></div>))}
               </div>
            </div>
          )}
        </main>

        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-[60] ${theme.card}/95 backdrop-blur-xl border-t ${theme.border} px-4 py-8 flex justify-around shadow-2xl rounded-t-[40px] font-sans`}>
          {[{ id: 'home', icon: Building, label: 'Insider' }, { id: 'fun', icon: Zap, label: 'Pulse' }, { id: 'essentials', icon: ShoppingBag, label: 'Gear' }, { id: 'profile', icon: User, label: 'Hub' }].map(v => (
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
      `}} />
    </div>
  );
}
