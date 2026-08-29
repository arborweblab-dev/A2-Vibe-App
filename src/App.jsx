// src/App.jsx
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { app } from './firebase';

const auth = getAuth(app);
const db = getFirestore(app);

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search, Dice5, HelpCircle, Award, Users, Plus, Trash2, RotateCcw, MessageSquare
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
const MONTHS_EXP = ['All Months', 'October', 'November', 'December'];
const AVAILABLE_TAGS = ['Foodie', 'U-M Alum', 'Townie', 'Student', 'Trail Runner', 'Night Owl', 'Art Lover', 'Coffee Snob'];

const SLIDE_IMAGES = [
  "/images/1.png", 
  "/images/4.png", 
  "/images/10.png", 
  "/images/5.png", 
  "/images/3.png", 
  "/images/2.png"
];

const DEFAULT_BUCKET_ITEMS = [
  { id: 1, text: "Catch a game at the Big House", done: false },
  { id: 2, text: "Walk through the Nichols Arboretum", done: false },
  { id: 3, text: "Explore Kerrytown Farmers Market", done: false },
  { id: 4, text: "Snap photos at the U-M Law Quad", done: false }
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
              <Heart size={22} className="text-[#ffcb05] drop-shadow-[0_0_8px_rgba(255,203,5,0.5)]" fill={isFavorited ? "#ffcb05" : "none"} strokeWidth={2.5}/>
            </button>
            <button onClick={onClose} className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm transition-all active:scale-90 ${theme.isDark ? 'text-white' : 'text-black'}`}>
              <X size={22}/>
            </button>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {item.img && <img src={item.img} className="w-full h-64 object-cover rounded-[32px] shadow-lg" alt="" />}
          <div className="flex items-center gap-4 flex-wrap">
            {item.price && <div className="bg-[#ffcb05]/20 text-[#ffcb05] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.price}</div>}
            {item.cuisine && <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide">{item.cuisine}</div>}
            <div className="bg-[#00274c]/40 text-[#34a4b8] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
              {Array.isArray(item.category) ? item.category.join(' • ') : (item.category || item.neighborhood || 'City Guide')}
            </div>
            {item.month && (
               <div className="bg-[#a855f7]/20 text-[#a855f7] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">{item.month}</div>
            )}
          </div>
          {item.address && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5">
              <MapPin size={16} className="text-[#ffcb05]" />
              <span>{item.address}</span>
            </div>
          )}
          <div className={`text-base leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`} dangerouslySetInnerHTML={{ __html: item.longDesc || item.desc || item.excerpt || 'Accessing city database...' }} />
          {item.url && (
            <button onClick={() => { window.open(item.url, '_blank'); }} className="w-full bg-[#ffcb05] text-black font-black uppercase text-base py-5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>Visit Official Website</span>
              <Navigation size={18} />
            </button>
          )}
        </div>
      </div>
  </div>
  );
};

const ToolFullScreenView = ({ type, onClose, theme, stats, setStats, dining, bucketList, setBucketList, user }) => {
  const [bill, setBill] = useState('');
  const [tipPerc, setTipPerc] = useState(20);
  const [weatherIdx, setWeatherIdx] = useState(new Date().getMonth());
  const [randomSpot, setRandomSpot] = useState(null);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newBucketText, setNewBucketText] = useState('');
  
  // Community Data States
  const [communityGems, setCommunityGems] = useState([]);
  const [newGemTitle, setNewGemTitle] = useState('');
  const [newGemDesc, setNewGemDesc] = useState('');

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch Community Data and Leaderboards when tool opens
  useEffect(() => {
    if (type === 'community') {
      const q = query(collection(db, "community_gems"), orderBy("timestamp", "desc"), limit(20));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setCommunityGems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
    if (type === 'water') {
      const q = query(collection(db, "leaderboard"), orderBy("water", "desc"), limit(10));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setLeaderboard(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [type]);

  const handleAddGem = async (e) => {
    e.preventDefault();
    if (!user || !newGemTitle.trim()) return alert('Please sign in to post!');
    await addDoc(collection(db, "community_gems"), {
      title: newGemTitle,
      desc: newGemDesc,
      author: user.displayName || 'Anonymous',
      timestamp: Date.now()
    });
    setNewGemTitle('');
    setNewGemDesc('');
  };

  const handleHydration = async (type) => {
    const newStats = { ...stats, [type]: (stats[type] || 0) + 1 };
    setStats(newStats);
    if (user && type === 'water') {
      await setDoc(doc(db, 'leaderboard', user.uid), {
        name: user.displayName || 'Local Drinker',
        water: newStats.water,
        lastUpdated: Date.now()
      }, { merge: true });
    }
  };

  const toggleBucketItem = (id) => setBucketList(bucketList.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const deleteBucketItem = (id, e) => { e.stopPropagation(); setBucketList(bucketList.filter(item => item.id !== id)); };
  const addBucketItem = (e) => {
    e.preventDefault();
    if (!newBucketText.trim()) return;
    setBucketList([...bucketList, { id: Date.now(), text: newBucketText.trim(), done: false }]);
    setNewBucketText('');
  };

  const billVal = parseFloat(bill) || 0;
  const tipAmount = (billVal * (tipPerc / 100)).toFixed(2);
  const totalBill = (billVal + parseFloat(tipAmount)).toFixed(2);

  const toolTitles = {
    hots: 'City Hot Spots', calc: 'Tip Calculator', weather: 'City Forecast', water: 'Hydration Leaderboard',
    randomizer: 'Weekend Pitcher', trivia: 'Tree Town Trivia', bucket: 'A2 Bucket List Passport', mystery: 'Mystery Spot',
    community: 'Community Gems'
  };

  return (
    <div className="animate-fade space-y-6 text-left relative z-10 pb-20 w-full flex flex-col font-sans">
      <div className={`sticky top-0 z-40 flex justify-between items-center py-4 px-4 ${theme.appBg} border-b ${theme.border} shadow-sm -mx-5 w-[calc(100%+40px)] mb-4`}>
        <h1 className={`text-xl font-header font-black uppercase italic tracking-tighter`} style={{ color: '#ffcb05' }}>{toolTitles[type] || 'City Tool'}</h1>
        <button onClick={onClose} className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm transition-all active:scale-90 ${theme.isDark ? 'text-white' : 'text-black'}`}><X size={22}/></button>
      </div>

      <div className="px-1 space-y-6 w-full pt-2">
        {type === 'calc' && (
          <div className="space-y-8 max-w-md mx-auto w-full">
            <div className="bg-black/20 p-6 rounded-3xl border border-white/5 text-center">
               <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Total with Tip</p>
               <h2 className="text-5xl font-header font-black text-white">${totalBill}</h2>
               <div className="flex justify-center gap-4 mt-4 text-[#ffcb05] font-bold text-sm"><span>Tip: ${tipAmount}</span></div>
            </div>
            <div className="space-y-4">
              <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0.00" className={`w-full p-5 rounded-2xl bg-black/20 border border-white/10 text-white font-bold text-xl outline-none focus:border-[#ffcb05]`} />
              <div className="grid grid-cols-3 gap-2">
                {[18, 20, 25].map(p => (
                  <button key={p} onClick={() => setTipPerc(p)} className={`py-4 rounded-xl font-black text-xs transition-all ${tipPerc === p ? 'bg-[#ffcb05] text-black scale-105 shadow-lg shadow-yellow-500/20' : 'bg-white/5 text-slate-400'}`}>{p}%</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === 'water' && (
          <div className="space-y-6 max-w-md mx-auto w-full">
             <div className="flex justify-around items-center text-center">
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
                <button onClick={() => handleHydration('water')} className="bg-blue-600 py-4 rounded-2xl text-white font-black uppercase text-xs shadow-lg shadow-blue-500/20">+ Water</button>
                <button onClick={() => handleHydration('drinks')} className="bg-[#ffcb05] py-4 rounded-2xl text-black font-black uppercase text-xs shadow-lg shadow-yellow-500/20">+ Drink</button>
             </div>
             
             {/* Global Leaderboard Section */}
             <div className={`mt-8 p-5 rounded-[24px] border ${theme.border} bg-black/10`}>
                <h3 className="text-xs font-black uppercase text-[#ffcb05] tracking-widest mb-4">Global A2 Hydration</h3>
                <div className="space-y-3">
                  {leaderboard.map((entry, i) => (
                    <div key={entry.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 font-black text-xs">#{i + 1}</span>
                        <span className={`text-sm font-bold ${entry.id === user?.uid ? 'text-[#ffcb05]' : theme.text}`}>{entry.name}</span>
                      </div>
                      <span className="text-blue-400 font-black flex items-center gap-1"><Droplets size={12}/> {entry.water}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {type === 'community' && (
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className={`p-5 rounded-[24px] border ${theme.border} bg-black/10`}>
              <h3 className="text-xs font-black uppercase text-[#ffcb05] tracking-widest mb-3">Share a Local Gem</h3>
              <form onSubmit={handleAddGem} className="space-y-3">
                <input type="text" value={newGemTitle} onChange={e=>setNewGemTitle(e.target.value)} placeholder="Name of place or tip..." className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm outline-none" required />
                <textarea value={newGemDesc} onChange={e=>setNewGemDesc(e.target.value)} placeholder="Why is it awesome?" className="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white text-sm outline-none h-20" required />
                <button type="submit" className="w-full py-3 bg-[#38bdf8] text-black rounded-xl font-black uppercase text-xs">Post to Community</button>
              </form>
            </div>

            <div className="space-y-4">
              {communityGems.map(gem => (
                <div key={gem.id} className={`p-4 rounded-[24px] border ${theme.border} bg-black/5`}>
                  <h4 className={`font-bold ${theme.text}`}>{gem.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{gem.desc}</p>
                  <p className="text-[9px] font-black uppercase text-[#38bdf8] tracking-widest mt-3">Spotted by {gem.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'bucket' && (
          <div className="space-y-4 text-left py-2 max-w-md mx-auto w-full">
            <form onSubmit={addBucketItem} className="flex gap-2">
              <input type="text" value={newBucketText} onChange={(e) => setNewBucketText(e.target.value)} placeholder="Add custom bucket list item..." className={`flex-1 p-3.5 rounded-2xl bg-black/20 border border-white/10 text-xs font-bold text-white outline-none focus:border-[#ffcb05]`} />
              <button type="submit" className="bg-[#ffcb05] text-black px-5 rounded-2xl font-black text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center justify-center"><Plus size={18} /></button>
            </form>

            <div className="space-y-2 mt-2">
              {bucketList.map(item => (
                <div key={item.id} onClick={() => toggleBucketItem(item.id)} className={`p-3.5 rounded-2xl border ${theme.border} flex items-center justify-between gap-3 cursor-pointer transition-all ${item.done ? 'bg-emerald-500/10 border-emerald-500/30 opacity-70 line-through' : 'bg-black/10'}`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 border-emerald-500 text-black font-black text-xs' : 'border-slate-500'}`}>{item.done ? '✓' : ''}</div>
                    <span className={`text-xs font-bold truncate ${theme.text}`}>{item.text}</span>
                  </div>
                  <button onClick={(e) => deleteBucketItem(item.id, e)} className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors flex-shrink-0"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hiding other tools for brevity in this snippet, but you can leave your existing Trivia/Weather code here */}
      </div>
    </div>
  );
};

const HubView = ({ theme, favorites, toggleFavorite, stats, setStats, setSelectedItem, setView, dining, setActiveTool, user, handleLogin, handleLogout, vibeTags, setVibeTags }) => {
  const [headerIdx, setHeaderIdx] = useState(0);
  const cycleHeader = () => setHeaderIdx(prev => (prev + 1) % SLIDE_IMAGES.length);
  const userFavorites = favorites || [];

  const eatsFavs = userFavorites.filter(f => f.type === 'dining' || f.cuisine);
  const happeningsFavs = userFavorites.filter(f => f.type === 'experience' || (f.name && !f.cuisine));

  const toggleTag = (tag) => {
    if (vibeTags.includes(tag)) setVibeTags(vibeTags.filter(t => t !== tag));
    else setVibeTags([...vibeTags, tag]);
  };

  return (
    <div className="animate-slide space-y-10 text-left relative z-10 pb-20 font-sans w-full max-w-xl mx-auto flex flex-col">
      <div className="space-y-10 px-2 w-full">
        <div className="relative h-64 rounded-[48px] overflow-hidden border border-white/10 group shadow-2xl w-full">
          <img src={SLIDE_IMAGES[headerIdx]} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a121e] via-[#0a121e]/40 to-transparent" />
          <div className="absolute bottom-8 left-8 flex items-center gap-4">
             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00274c] to-[#ffcb05] p-0.5 shadow-2xl">
                <div className={`w-full h-full rounded-full ${theme.card} flex items-center justify-center text-white overflow-hidden`}>
                   {user && user.photoURL ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" /> : <MapPin size={24} />}
                </div>
             </div>
             <div>
                <h3 className="text-2xl font-header font-black uppercase text-white drop-shadow-lg tracking-tight">
                  {user ? user.displayName?.split(' ')[0] + "'s Vibe" : 'My Vibe'}
                </h3>
                <p className="text-[9px] font-black uppercase text-[#ffcb05] tracking-[0.2em] opacity-90">Saved Spots & Local Stats</p>
             </div>
          </div>
          <button onClick={cycleHeader} className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white opacity-100 transition-all active:scale-90" title="Cycle Profile Image"><Camera size={20} /></button>
        </div>

        <div className={`${theme.card} p-5 rounded-[32px] border ${theme.border} flex flex-col gap-4 text-center shadow-lg mx-1`}>
          {user ? (
            <>
              <div className="text-left">
                <p className={`text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3`}>My A2 Identity Tags</p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${vibeTags.includes(tag) ? 'bg-[#ffcb05] text-black shadow-md' : 'bg-black/10 text-slate-400'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleLogout} className="mt-2 bg-red-500/10 text-red-500 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">Sign Out ({user.email})</button>
            </>
          ) : (
            <>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.secondaryText}`}>Sign in to sync your profile, tags, and stats!</p>
              <button onClick={handleLogin} className="bg-[#ffcb05] text-black py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">Sign in with Google</button>
            </>
          )}
        </div>

        <section className="space-y-5 w-full">
          <div className="flex items-center gap-2 px-1"><Sparkles size={18} className="text-[#34a4b8]" /><h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Urban & Fun Tools</h4></div>
          <div className="grid grid-cols-2 gap-3">
            {[
              {id:'community',icon:MessageSquare,label:'Local Gems',color:'#38bdf8'},
              {id:'water',icon:Droplets,label:'Hydration',color:'#34a4b8'},
              {id:'bucket',icon:Award,label:'Bucket List',color:'#ffcb05'},
              {id:'calc',icon:Calculator,label:'Tip Calc',color:'#10b981'},
            ].map(t=>(<button key={t.id} onClick={()=>setActiveTool(t.id)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-3 text-left shadow-lg active:scale-95 transition-all`}><div className="p-2 rounded-lg" style={{backgroundColor: t.color+'15', color: t.color}}><t.icon size={18}/></div><span className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>{t.label}</span></button>))}
          </div>
        </section>
        
        {/* Saved Favorites Section (Eats & Happenings logic from previous implementation goes here) */}
      </div>
  </div>
  );
};

// ... FlavorsView, JournalView, and HomeView remain exactly the same as your previous code ...
// (Omitted here for brevity, paste your previous ones here)

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  
  const [favorites, setFavorites] = useState(() => { const s = localStorage.getItem('a2v_favorites'); return s ? JSON.parse(s) : []; });
  const [stats, setStats] = useState(() => { const s = localStorage.getItem('a2v_stats'); return s ? JSON.parse(s) : { water: 0, drinks: 0 }; });
  const [bucketList, setBucketList] = useState(() => { const s = localStorage.getItem('a2v_bucketlist'); return s ? JSON.parse(s) : DEFAULT_BUCKET_ITEMS; });
  const [vibeTags, setVibeTags] = useState(() => { const s = localStorage.getItem('a2v_vibetags'); return s ? JSON.parse(s) : []; });

  const theme = THEMES[themeKey] || THEMES.dark;

  // --- Auth Handlers ---
  const handleLogin = async () => { try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (error) { console.error("Login Error:", error); } };
  const handleLogout = async () => { try { await signOut(auth); } catch (error) { console.error("Logout Error:", error); } };

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFavorites(data.favorites || []);
          setStats(data.stats || { water: 0, drinks: 0 });
          setBucketList(data.bucketList || DEFAULT_BUCKET_ITEMS);
          setVibeTags(data.vibeTags || []);
        }
      } else {
        const sf = localStorage.getItem('a2v_favorites'); setFavorites(sf ? JSON.parse(sf) : []);
        const ss = localStorage.getItem('a2v_stats'); setStats(ss ? JSON.parse(ss) : { water: 0, drinks: 0 });
        const st = localStorage.getItem('a2v_vibetags'); setVibeTags(st ? JSON.parse(st) : []);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Hooks
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { favorites }, { merge: true }); else localStorage.setItem('a2v_favorites', JSON.stringify(favorites)); }, [favorites, user]);
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { stats }, { merge: true }); else localStorage.setItem('a2v_stats', JSON.stringify(stats)); }, [stats, user]);
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { vibeTags }, { merge: true }); else localStorage.setItem('a2v_vibetags', JSON.stringify(vibeTags)); }, [vibeTags, user]);

  return (
    <div className={`min-h-screen ${theme.windowBg} font-sans transition-colors duration-500 flex flex-col items-center overflow-x-hidden`}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className={`w-full max-w-xl min-h-screen ${theme.appBg} relative shadow-2xl flex flex-col items-center border-x border-white/5`}>
        
        <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 ${theme.card}/80 backdrop-blur-xl border-b ${theme.border} px-5 py-5 flex justify-between items-center rounded-b-[40px] shadow-lg`}>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setActiveTool(null); setView('home'); }}>
            <div className="bg-[#ffcb05] w-10 h-10 rounded-xl flex items-center justify-center rotate-6 shadow-lg text-black"><Building size={20}/></div>
            <div className="flex flex-col leading-none text-left">
              <span className={`text-[11px] font-header font-black uppercase tracking-tighter ${theme.text}`}>A2</span>
              <span className={`text-[9px] font-header font-bold uppercase tracking-widest opacity-50 ${theme.text}`}>Vibe</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setActiveTool(null); setView('profile'); }} className={`w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center overflow-hidden border border-white/10 ${theme.text}`}>
              {user && user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : <User size={18}/>}
            </button>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-36 overflow-y-auto no-scrollbar w-full px-5 flex flex-col">
          <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} theme={theme} toggleFavorite={toggleFavorite} favorites={favorites} />
          
          {activeTool ? (
            <ToolFullScreenView type={activeTool} onClose={() => setActiveTool(null)} theme={theme} stats={stats} setStats={setStats} bucketList={bucketList} setBucketList={setBucketList} user={user} />
          ) : (
            <>
              {/* Note: Render your HomeView, FlavorsView etc. here like before */}
              {view === 'profile' && <HubView theme={theme} favorites={favorites} toggleFavorite={toggleFavorite} stats={stats} setStats={setStats} setSelectedItem={setSelectedItem} setView={setView} setActiveTool={setActiveTool} user={user} handleLogin={handleLogin} handleLogout={handleLogout} vibeTags={vibeTags} setVibeTags={setVibeTags} />}
            </>
          )}
        </main>

        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-[60] ${theme.card}/95 backdrop-blur-xl border-t ${theme.border} px-4 py-8 flex justify-around shadow-2xl rounded-t-[40px] font-sans`}>
          {[{ id: 'profile', icon: User, label: 'My Vibe', color: '#10b981' } /* ... other nav items */].map(v => (
            <button key={v.id} onClick={() => { setActiveTool(null); setView(v.id); }} className={`flex flex-col items-center gap-2 transition-all duration-300 ${!activeTool && view === v.id ? 'scale-110 opacity-100' : 'opacity-40'}`} style={{ color: !activeTool && view === v.id ? v.color : (theme.isDark ? '#94a3b8' : '#64748b') }}>
              <v.icon size={24} />
              <span className="text-[11px] font-black uppercase tracking-widest mt-2 leading-none">{v.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
