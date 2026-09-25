import React, { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  doc, setDoc, getDoc, collection, 
  addDoc, updateDoc, arrayUnion, arrayRemove, 
  onSnapshot, query, orderBy, limit, increment 
} from 'firebase/firestore';
import { app, auth, db } from './firebase';

import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search, Dice5, HelpCircle, Award, Users, Plus, Trash2, RotateCcw, MessageSquare,
  Calendar, QrCode, CheckCircle2, ArrowRight, ExternalLink, Store, FileText, UploadCloud,
  PenTool, ShieldCheck, MessageCircle, Send, Trees, ThumbsUp, MessageCircleCode,
  Dog, Accessibility, Bike, Baby, Bath, Check, ShoppingBag, Tag, Percent
} from 'lucide-react';

import { journalData } from './data/journalData';
import { eatsData } from './data/eatsData';
import { happeningsData } from './data/happeningsData';

// Haversine distance in meters
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const SHOPS_DATA = [
  {
    id: 'shop-vibe-a2',
    name: 'Vibe Ann Arbor',
    type: 'shop',
    category: 'Marijuana Dispensaries',
    tier: 'featured',
    rating: '4.9',
    address: '407 N 5th Ave, Ann Arbor, MI 48104',
    lat: 42.28458,
    lng: -83.74619,
    url: 'https://a2vibe.com',
    img: 'https://a2vibe.com/images/vibe-weed.jpg',
    shortDesc: 'Premier downtown cannabis dispensary offering elite strains, top-shelf edibles, concentrates, and knowledgeable budtenders.',
    longDesc: '<p>Vibe Ann Arbor sets the benchmark for Tree Town recreational and medical cannabis. Conveniently located near Kerrytown, Vibe pairs a clean, welcoming retail showroom with curated terpene profiles, local craft flower, artisanal gummies, and high-potency concentrates. Staffed by friendly budtenders ready to walk you through cannabinoid balances and tailored experiences.</p>',
    specials: [
      'First-time visitor 20% discount on boutique flower',
      'Daily Happy Hour specials on pre-rolls and live rosin concentrates',
      'Student and veteran appreciation discounts with valid ID'
    ],
    features: ['Recreational 21+', 'Medical Validated', 'Curbside Pickup', 'ATM On-Site', 'Wheelchair Accessible'],
    hours: 'Mon - Sun: 9:00 AM - 9:00 PM'
  },
  {
    id: 'shop-information-entropy',
    name: 'Information Entropy',
    type: 'shop',
    category: 'Marijuana Dispensaries',
    tier: 'featured',
    rating: '4.9',
    address: '1115 Broadway St, Ann Arbor, MI 48105',
    lat: 42.2907,
    lng: -83.7381,
    url: 'https://informationentropy.com',
    img: 'https://placehold.co/800x600/00274c/ffcb05?text=Information+Entropy',
    shortDesc: 'Locally grown craft cannabis dispensary acclaimed for in-house genetics and solventless rosin.',
    longDesc: '<p>A beloved local staple with locations on Broadway and Downtown, Information Entropy is recognized statewide for its dedicated craft cultivation, award-winning rosin, and friendly service.</p>',
    specials: [
      'Weekly solventless concentrates specials',
      'Mix-and-match premium 1/8ths bundling'
    ],
    features: ['In-House Cultivation', 'Solventless Rosin', 'Downtown & Broadway Locations', 'Curbside Pickup'],
    hours: 'Mon - Sun: 9:00 AM - 9:00 PM'
  },
  {
    id: 'shop-literati',
    name: 'Literati Bookstore',
    type: 'shop',
    category: 'Bookstores & Vinyl',
    tier: 'featured',
    rating: '4.9',
    address: '124 E Washington St, Ann Arbor, MI 48104',
    lat: 42.2808,
    lng: -83.7478,
    url: 'https://literatibookstore.com',
    img: 'https://placehold.co/800x600/1e293b/38bdf8?text=Literati+Bookstore',
    shortDesc: 'Iconic independent bookstore featuring cozy curated shelves, author readings, and the famous public typewriter.',
    longDesc: '<p>Literati is an essential downtown cultural beacon. Explore three floors of handpicked fiction, poetry, art monographs, and children’s literature, plus the downstairs public Oliver typewriter where visitors from around the world type anonymous notes.</p>',
    specials: [
      'Staff pick monthly book bundle 15% off',
      'Signed first-edition author club'
    ],
    features: ['Independent Bookstore', 'Author Events', 'Historic Typewriter', 'In-Store Coffee Shop'],
    hours: 'Mon - Sat: 10:00 AM - 8:00 PM | Sun: 12:00 PM - 6:00 PM'
  },
  {
    id: 'shop-wazoo-records',
    name: 'Wazoo Records',
    type: 'shop',
    category: 'Bookstores & Vinyl',
    tier: 'standard',
    address: '436 E Liberty St, Ann Arbor, MI 48104',
    lat: 42.2796,
    lng: -83.7423,
    shortDesc: 'Legendary second-floor record haven packed with used and rare vinyl, CDs, and music memorabilia since 1974.',
    features: ['Vintage Vinyl', 'Rare 45s', 'Used CDs & Cassettes'],
    hours: 'Tue - Sun: 12:00 PM - 6:00 PM'
  },
  {
    id: 'shop-encore-records',
    name: 'Encore Records',
    type: 'shop',
    category: 'Bookstores & Vinyl',
    tier: 'standard',
    address: '208 N 4th Ave, Ann Arbor, MI 48104',
    lat: 42.2828,
    lng: -83.7471,
    shortDesc: 'Vast Kerrytown audio institution with thousands of vintage LPs, jazz pressings, and classic stereo equipment.',
    features: ['Extensive Vinyl Catalog', 'Turntables', 'Cassettes'],
    hours: 'Wed - Sun: 11:00 AM - 7:00 PM'
  },
  {
    id: 'shop-bivouac',
    name: 'Bivouac Outdoor & Boutique',
    type: 'shop',
    category: 'Vintage & Boutiques',
    tier: 'featured',
    rating: '4.8',
    address: '336 S State St, Ann Arbor, MI 48104',
    lat: 42.2778,
    lng: -83.7412,
    url: 'https://bivouacannarbor.com',
    img: 'https://placehold.co/800x600/0f172a/10b981?text=Bivouac+Ann+Arbor',
    shortDesc: 'Pioneering State Street outfitter combining luxury mountain lifestyle apparel with technical camping and outdoor gear.',
    longDesc: '<p>A State Street landmark since 1970 with the motto Where Outdoor Passion Meets Fashion. Carrying premier outdoor lifestyle labels alongside high-performance trekking equipment and stylish streetwear.</p>',
    specials: [
      'Seasonal outerwear promotion up to 25% off',
      'Free backpack and boot custom fitting'
    ],
    features: ['Outdoor Gear', 'Designer Apparel', 'Camp Equipment', 'Expert Gear Fitting'],
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM | Sun: 12:00 PM - 5:00 PM'
  },
  {
    id: 'shop-getup-vintage',
    name: 'The Getup Vintage',
    type: 'shop',
    category: 'Vintage & Boutiques',
    tier: 'standard',
    address: '215 S State St, Ann Arbor, MI 48104',
    lat: 42.2792,
    lng: -83.7411,
    shortDesc: 'Vibrant vintage shop offering genuine 1950s-90s vintage clothing, leather jackets, denim, and accessories.',
    features: ['True Vintage', 'Hand-Picked Clothing', 'State Street'],
    hours: 'Mon - Sun: 12:00 PM - 7:00 PM'
  },
  {
    id: 'shop-rock-paper-scissors',
    name: 'Rock Paper Scissors',
    type: 'shop',
    category: 'Specialty Markets',
    tier: 'standard',
    address: '216 S Main St, Ann Arbor, MI 48104',
    lat: 42.2801,
    lng: -83.7486,
    shortDesc: 'Cheerful Main Street gift shop specializing in playful stationery, bespoke paper goods, quirky gifts, and local Michigan novelties.',
    features: ['Custom Gifts', 'Michigan Memorabilia', 'Party Goods'],
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM'
  },
  {
    id: 'shop-mden',
    name: 'The M Den on State Street',
    type: 'shop',
    category: 'University Apparel',
    tier: 'featured',
    rating: '4.8',
    address: '303 S State St, Ann Arbor, MI 48104',
    lat: 42.2783,
    lng: -83.7414,
    url: 'https://www.mden.com',
    img: 'https://placehold.co/800x600/00274c/ffcb05?text=The+M+Den+Ann+Arbor',
    shortDesc: 'Official home of the Michigan Wolverines with head-to-toe official U-M jerseys, sideline gear, hats, and collectibles.',
    longDesc: '<p>The ultimate headquarters for University of Michigan students, alumni, and passionate fans. Packed with licensed Nike sideline collections, historic Rose Bowl and Championship memorabilia, and classic Maize and Blue outerwear.</p>',
    specials: [
      'Gameday apparel discounts during selected weekends',
      'Free souvenir sticker pack with in-store purchase'
    ],
    features: ['Official U-M Apparel', 'Nike Sideline Gear', 'Big House Souvenirs'],
    hours: 'Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM'
  },
  {
    id: 'shop-zingermans-deli-shop',
    name: 'Zingerman’s Specialty Food Store',
    type: 'shop',
    category: 'Specialty Markets',
    tier: 'featured',
    rating: '4.9',
    address: '422 Detroit St, Ann Arbor, MI 48104',
    lat: 42.2847,
    lng: -83.7456,
    url: 'https://www.zingermansdeli.com',
    img: 'https://placehold.co/800x600/78350f/fbbf24?text=Zingermans+Specialty+Store',
    shortDesc: 'World-renowned artisan grocery offering small-batch olive oils, farmstead cheeses, vinegar pairings, and traditional bread.',
    longDesc: '<p>Adjoining the legendary deli counter in historic Kerrytown, the Zingerman’s specialty market is a food lover paradise loaded with estate-bottled olive oils, cured meats, single-origin bean chocolates, and farmstead cheeses sampled generously by cheese mongers.</p>',
    specials: [
      'Complimentary estate olive oil and artisan vinegar tasting bar',
      'Monthly Cheese Club discount subscriptions'
    ],
    features: ['Artisan Cheeses', 'Boutique Imports', 'Estate Olive Oils', 'Kerrytown Landmark'],
    hours: 'Mon - Sun: 7:00 AM - 9:00 PM'
  },
  {
    id: 'shop-kerrytown-market-shops',
    name: 'Kerrytown Market & Shops',
    type: 'shop',
    category: 'Specialty Markets',
    tier: 'standard',
    address: '407 N 5th Ave, Ann Arbor, MI 48104',
    lat: 42.2846,
    lng: -83.7462,
    shortDesc: 'Charming multi-level brick marketplace featuring local toy stores, spice shops, paper merchants, and tea emporiums.',
    features: ['Multiple Boutiques', 'Chime Tower', 'Farmers Market Adjacent'],
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM'
  }
];

const SHOP_CATEGORIES = [
  'All',
  'Marijuana Dispensaries',
  'Bookstores & Vinyl',
  'Vintage & Boutiques',
  'University Apparel',
  'Specialty Markets'
];

const PARKS_DATA = [
  {
    id: 'park-arb',
    name: 'Nichols Arboretum',
    title: 'Nichols Arboretum',
    type: 'park',
    category: 'Nature & Arb',
    address: '1610 Washington Hts, Ann Arbor, MI',
    lat: 42.2801,
    lng: -83.7258,
    img: 'https://a2vibe.com/images/UofM_Nichols_Arboretum.jpg',
    shortDesc: 'Iconic 123-acre river valley featuring the Peony Garden, river trails, and historic tree collections.',
    longDesc: '<p>Beloved by locals as "The Arb," this historic reserve along the Huron River offers miles of gravel pathways, panoramic hillside vistas, glacial topography, and the world-renowned Nichols Arboretum Peony Garden.</p>',
    dogFriendly: true,
    accessibleTrails: false,
    restrooms: true,
    bikeFriendly: false,
    features: ['River Access', 'Peony Garden', 'Scenic Overlooks', 'Bird Watching']
  },
  {
    id: 'park-gallup',
    name: 'Gallup Park & Canoe Livery',
    title: 'Gallup Park & Canoe Livery',
    type: 'park',
    category: 'Riverfront & Trails',
    address: '3000 Fuller Rd, Ann Arbor, MI',
    lat: 42.2778,
    lng: -83.7001,
    img: 'https://a2vibe.com/images/Gallup_Park.jpg',
    shortDesc: 'Scenic 69-acre park winding along the Huron River with pedestrian bridges, boat launches, and trails.',
    longDesc: '<p>Gallup Park is Ann Arbor’s premier riverfront escape. Features 3 miles of paved trails traversing small islands, wooden footbridges, picnic pavilions, wildlife viewing spots, and seasonal kayak and canoe rentals.</p>',
    dogFriendly: true,
    accessibleTrails: true,
    restrooms: true,
    bikeFriendly: true,
    features: ['Canoe & Kayak Livery', 'Playground', 'Paved Trails', 'Picnic Shelters']
  }
];

const THEMES = {
  light: { primary: '#00274c', windowBg: 'bg-slate-200', appBg: 'bg-slate-50', card: 'bg-white', text: 'text-slate-900', secondaryText: 'text-slate-600', border: 'border-slate-200', isDark: false },
  dark: { primary: '#ffcb05', windowBg: 'bg-[#050b14]', appBg: 'bg-[#0a121e]', card: 'bg-[#151f2e]', text: 'text-slate-100', secondaryText: 'text-slate-400', border: 'border-slate-800', isDark: true }
};

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

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
   
  const [favorites, setFavorites] = useState(() => {
    try { const s = localStorage.getItem('a2v_favorites'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [stats, setStats] = useState(() => {
    try { const s = localStorage.getItem('a2v_stats'); return s ? JSON.parse(s) : { water: 0, drinks: 0 }; } catch { return { water: 0, drinks: 0 }; }
  });
  const [bucketList, setBucketList] = useState(() => {
    try { const s = localStorage.getItem('a2v_bucketlist'); return s ? JSON.parse(s) : DEFAULT_BUCKET_ITEMS; } catch { return DEFAULT_BUCKET_ITEMS; }
  });
  const [vibeTags, setVibeTags] = useState(() => {
    try { const s = localStorage.getItem('a2v_vibetags'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [points, setPoints] = useState(() => {
    try { const s = localStorage.getItem('a2v_points'); return s ? parseInt(s, 10) : 0; } catch { return 0; }
  });
  const [lastCheckInDate, setLastCheckInDate] = useState(() => localStorage.getItem('a2v_last_checkin_date') || '');

  const [itineraries] = useState(Array.isArray(happeningsData) ? happeningsData : []);
  const [dining, setDining] = useState(Array.isArray(eatsData) ? eatsData : []);
  const [posts] = useState(Array.isArray(journalData) ? journalData : []);
  const [heroIdx, setHeroIdx] = useState(0);

  const theme = THEMES[themeKey] || THEMES.dark;

  // Cycle slide hero
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % SLIDE_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Listen for Miss Kim documents in Firestore safely
  useEffect(() => {
    if (!db) return;
    try {
      const unsubscribe = onSnapshot(collection(db, 'Miss Kim'), (snapshot) => {
        if (!snapshot.empty) {
          const firestoreSpots = snapshot.docs.map(d => ({
            id: d.id,
            title: d.data().title || d.data().name || d.id,
            ...d.data()
          }));
          setDining(prev => {
            const rest = prev.filter(item => !firestoreSpots.some(fs => fs.id === item.id));
            return [...rest, ...firestoreSpots];
          });
        }
      }, (err) => console.warn('Firestore Miss Kim listener:', err));
      return () => unsubscribe();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Firebase Auth Listener
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && db) {
        try {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.favorites) setFavorites(data.favorites);
            if (data.stats) setStats(data.stats);
            if (data.bucketList) setBucketList(data.bucketList);
            if (data.vibeTags) setVibeTags(data.vibeTags);
            if (typeof data.points === 'number') setPoints(data.points);
            if (data.lastCheckInDate) setLastCheckInDate(data.lastCheckInDate);
          }
        } catch (e) {
          console.warn('Auth hydrate error:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      if (auth) await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      if (auth) await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  // Real GPS check-in (1 point per day within 200m)
  const handleLocationCheckIn = (place) => {
    if (!user) {
      alert("Please sign in with Google first to save your check-in points!");
      return;
    }
    if (!place?.lat || !place?.lng) {
      alert("This location does not have registered GPS coordinates.");
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (lastCheckInDate === todayStr) {
      alert("You have already claimed your 1 check-in point for today! Check in again tomorrow.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your mobile browser.");
      return;
    }

    setIsCheckingIn(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const distance = getDistanceInMeters(userLat, userLng, place.lat, place.lng);

        if (distance > 200) {
          setIsCheckingIn(false);
          alert(`You are approx ${Math.round(distance)} meters away. You must be at the location (within 200m) to check in!`);
          return;
        }

        const newPoints = points + 1;
        setPoints(newPoints);
        setLastCheckInDate(todayStr);
        localStorage.setItem('a2v_points', newPoints.toString());
        localStorage.setItem('a2v_last_checkin_date', todayStr);

        if (db && user) {
          try {
            await updateDoc(doc(db, 'users', user.uid), {
              points: increment(1),
              lastCheckInDate: todayStr,
              checkIns: arrayUnion({
                placeId: place.id,
                placeName: place.title || place.name,
                timestamp: Date.now()
              })
            });
          } catch (e) {
            await setDoc(doc(db, 'users', user.uid), {
              points: newPoints,
              lastCheckInDate: todayStr,
              checkIns: [{
                placeId: place.id,
                placeName: place.title || place.name,
                timestamp: Date.now()
              }]
            }, { merge: true });
          }
        }
        setIsCheckingIn(false);
        alert(`Checked in at ${place.title || place.name}! +1 Point added.`);
      },
      (err) => {
        setIsCheckingIn(false);
        alert("Could not access your GPS. Please enable location permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const toggleFavorite = (item) => {
    const exists = favorites.some(f => f.id === item.id);
    const updated = exists ? favorites.filter(f => f.id !== item.id) : [...favorites, item];
    setFavorites(updated);
    localStorage.setItem('a2v_favorites', JSON.stringify(updated));
    if (user && db) {
      setDoc(doc(db, 'users', user.uid), { favorites: updated }, { merge: true });
    }
  };

  return (
    <div className={`min-h-screen ${theme.windowBg} font-sans flex flex-col items-center overflow-x-hidden`}>
      <div className={`w-full max-w-xl min-h-screen ${theme.appBg} relative shadow-2xl flex flex-col items-center border-x border-white/5`}>
        
        {/* HEADER */}
        <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 ${theme.card}/95 backdrop-blur-xl border-b ${theme.border} px-5 py-4 flex justify-between items-center rounded-b-[36px] shadow-lg`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-[#ffcb05] w-9 h-9 rounded-xl flex items-center justify-center rotate-6 shadow-md text-black">
              <Building size={18}/>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className={`text-xs font-black uppercase ${theme.text}`}>A2</span>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${theme.secondaryText}`}>Vibe</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('profile')} className={`w-9 h-9 rounded-2xl ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} flex items-center justify-center overflow-hidden border ${theme.border}`}>
              {user && user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : <User size={16} className={theme.text}/>}
            </button>
            <button onClick={() => setThemeKey(theme.isDark ? 'light' : 'dark')} className="p-2 rounded-2xl bg-[#00274c] text-white">
              {theme.isDark ? <Sun size={18} className="text-[#ffcb05]" /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* MAIN BODY */}
        <main className="flex-1 pt-24 pb-32 overflow-y-auto w-full px-4 flex flex-col space-y-6">
          
          {/* VIEW: HOME */}
          {view === 'home' && (
            <div className="space-y-6 text-left">
              <div className="relative h-60 rounded-[36px] overflow-hidden shadow-2xl flex items-end p-6 border border-white/5">
                {SLIDE_IMAGES.map((img, i) => (
                  <img key={i} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`} alt="" />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 text-white">
                  <h1 className="text-3xl font-black uppercase italic tracking-tight">The Scene</h1>
                  <p className="text-[#ffcb05] text-xs font-bold tracking-wider">Curated by A2 Vibe.</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Flavors', icon: <Utensils size={18}/>, path: 'flavors' },
                  { label: 'Events', icon: <Zap size={18}/>, path: 'fun' },
                  { label: 'Guide', icon: <BookText size={18}/>, path: 'journal' },
                  { label: 'My Vibe', icon: <Award size={18} className="text-[#ffcb05]"/>, path: 'profile' }
                ].map(item => (
                  <button 
                    key={item.label}
                    onClick={() => setView(item.path)}
                    className={`${theme.card} p-3 rounded-2xl border ${theme.border} flex flex-col items-center gap-1.5 active:scale-95 shadow-sm`}
                  >
                    <div className="p-2 rounded-xl bg-[#00274c] text-[#ffcb05]">{item.icon}</div>
                    <span className={`text-[10px] font-black uppercase ${theme.text}`}>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Local Dining Highlights */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h3 className={`text-xs font-black uppercase tracking-wider ${theme.text}`}>Local Spots & Eateries</h3>
                  <button onClick={() => setView('flavors')} className="text-[10px] text-[#ffcb05] font-black uppercase">View All →</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {dining.slice(0, 4).map(res => (
                    <div 
                      key={res.id}
                      onClick={() => setSelectedItem(res)}
                      className={`${theme.card} p-3.5 rounded-3xl border ${theme.border} flex items-center gap-3.5 cursor-pointer shadow-sm active:scale-[0.99]`}
                    >
                      {res.img ? (
                        <img src={res.img} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-black/10 flex items-center justify-center text-slate-400">
                          <Store size={22} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold uppercase truncate ${theme.text}`}>{res.title || res.name}</h4>
                        <span className="text-[9px] font-black uppercase text-[#ffcb05] bg-[#ffcb05]/10 px-2 py-0.5 rounded">
                          {res.cuisine || 'Spot'}
                        </span>
                        <p className={`text-[10px] mt-1 truncate ${theme.secondaryText}`}>{res.address || res.shortDesc}</p>
                      </div>
                      <ArrowRight size={16} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: FLAVORS */}
          {view === 'flavors' && (
            <div className="space-y-4 text-left">
              <h2 className={`text-2xl font-black uppercase tracking-tight ${theme.text}`}>Ann Arbor Flavors</h2>
              <div className="grid grid-cols-1 gap-3">
                {dining.map(res => (
                  <div 
                    key={res.id}
                    onClick={() => setSelectedItem(res)}
                    className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-4 cursor-pointer shadow-sm`}
                  >
                    {res.img ? (
                      <img src={res.img} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-black/10 flex items-center justify-center text-slate-400">
                        <Utensils size={24} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold uppercase truncate ${theme.text}`}>{res.title || res.name}</h4>
                      <p className="text-[10px] text-[#ffcb05] font-black uppercase">{res.cuisine || 'Local Flavor'}</p>
                      <p className={`text-xs mt-1 line-clamp-1 ${theme.secondaryText}`}>{res.shortDesc}</p>
                      {res.lat && res.lng && (
                        <span className="text-[9px] text-emerald-400 font-bold block mt-1">✓ GPS Check-in Available</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: EVENTS */}
          {view === 'fun' && (
            <div className="space-y-4 text-left">
              <h2 className={`text-2xl font-black uppercase tracking-tight ${theme.text}`}>Ann Arbor Happenings</h2>
              <div className="grid grid-cols-1 gap-3">
                {itineraries.map(exp => (
                  <div 
                    key={exp.id}
                    onClick={() => setSelectedItem(exp)}
                    className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-4 cursor-pointer shadow-sm`}
                  >
                    {exp.img && <img src={exp.img} alt="" className="w-20 h-20 rounded-2xl object-cover" />}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold uppercase truncate ${theme.text}`}>{exp.name}</h4>
                      <p className="text-[10px] text-[#38bdf8] font-bold">{exp.date}</p>
                      <p className={`text-xs mt-1 line-clamp-1 ${theme.secondaryText}`}>{exp.shortDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: GUIDE */}
          {view === 'journal' && (
            <div className="space-y-4 text-left">
              <h2 className={`text-2xl font-black uppercase tracking-tight ${theme.text}`}>A2 Guide & Stories</h2>
              <div className="grid grid-cols-1 gap-4">
                {posts.map(art => (
                  <div 
                    key={art.id}
                    onClick={() => setSelectedItem(art)}
                    className={`${theme.card} rounded-3xl border ${theme.border} overflow-hidden shadow-sm cursor-pointer`}
                  >
                    {art.img && <img src={art.img} alt="" className="w-full h-44 object-cover" />}
                    <div className="p-4 space-y-1">
                      <span className="text-[9px] font-black uppercase text-[#a855f7]">{art.category}</span>
                      <h4 className={`text-base font-bold uppercase ${theme.text}`}>{art.title}</h4>
                      <p className={`text-xs line-clamp-2 ${theme.secondaryText}`}>{art.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: PROFILE & LOYALTY PASSPORT */}
          {view === 'profile' && (
            <div className="space-y-6 text-left">
              {/* LOYALTY PASSPORT */}
              <div className="p-6 rounded-[32px] bg-gradient-to-br from-[#00274c] via-[#071d37] to-[#0a121e] border border-[#ffcb05]/40 text-white space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="text-[#ffcb05]" size={20} />
                    <span className="text-xs font-black uppercase tracking-wider text-[#ffcb05]">A2 Loyalty Passport</span>
                  </div>
                  <span className="bg-[#ffcb05]/20 text-[#ffcb05] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {points >= 30 ? 'Townie Elite' : (points >= 10 ? 'Regular' : 'Explorer')}
                  </span>
                </div>
                <div>
                  <p className="text-4xl font-black">{points} <span className="text-xs font-bold text-slate-400 uppercase">PTS</span></p>
                  <p className="text-[10px] text-slate-300">Earn 1 pt per day by checking in at participating local venues.</p>
                </div>
                {lastCheckInDate && (
                  <p className="text-[9px] text-[#ffcb05] font-bold">Last Check-In: {lastCheckInDate}</p>
                )}
              </div>

              {/* USER STATUS / SIGN IN */}
              <div className={`${theme.card} p-5 rounded-3xl border ${theme.border} text-center space-y-3`}>
                {user ? (
                  <>
                    <p className={`text-xs font-bold ${theme.text}`}>Signed in as {user.displayName || user.email}</p>
                    <button onClick={handleLogout} className="w-full py-3 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase text-xs">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <p className={`text-xs ${theme.secondaryText}`}>Sign in with Google to earn real location check-in points.</p>
                    <button onClick={handleLogin} className="w-full py-3.5 bg-[#ffcb05] text-black rounded-2xl font-black uppercase text-xs shadow-md">
                      Sign in with Google
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

        </main>

        {/* DETAIL POPUP MODAL WITH GPS CHECK-IN */}
        <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          item={selectedItem} 
          theme={theme} 
          toggleFavorite={toggleFavorite} 
          favorites={favorites} 
          onCheckIn={handleLocationCheckIn}
          isCheckingIn={isCheckingIn}
        />

        {/* BOTTOM NAV */}
        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 ${theme.card}/95 backdrop-blur-xl border-t ${theme.border} px-4 py-4 flex justify-around rounded-t-[36px] shadow-2xl`}>
          {[
            { id: 'home', icon: Building, label: 'Insider', color: '#ffcb05' }, 
            { id: 'fun', icon: Sparkles, label: 'Events', color: '#38bdf8' }, 
            { id: 'journal', icon: BookText, label: 'Guide', color: '#a855f7' }, 
            { id: 'flavors', icon: Utensils, label: 'Flavors', color: '#f97316' }, 
            { id: 'profile', icon: Award, label: 'Passport', color: '#10b981' }
          ].map(v => {
            const isActive = view === v.id;
            return (
              <button 
                key={v.id} 
                onClick={() => setView(v.id)} 
                className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'scale-110' : 'opacity-60'}`}
                style={{ color: isActive ? v.color : (theme.isDark ? '#94a3b8' : '#334155') }}
              >
                <v.icon size={20} />
                <span className="text-[10px] font-black uppercase">{v.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
