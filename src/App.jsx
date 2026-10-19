import React, { useState, useEffect, useMemo } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, getDoc, collection, 
  addDoc, updateDoc, arrayUnion, arrayRemove, 
  onSnapshot, query, orderBy, limit 
} from 'firebase/firestore';
import { app } from './firebase';

const auth = getAuth(app); 
const db = getFirestore(app);

import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search, Dice5, HelpCircle, Award, Users, Plus, Trash2, RotateCcw, MessageSquare,
  Calendar, QrCode, CheckCircle2, ArrowRight, ExternalLink, Store, FileText, UploadCloud,
  PenTool, ShieldCheck, MessageCircle, Send, Trees, ThumbsUp, MessageCircleCode,
  Dog, Accessibility, Bike, Baby, Bath, Check, ShoppingBag, Tag, Percent, LogOut, LogIn, Share2
} from 'lucide-react';

import { journalData } from './data/journalData';
import { eatsData } from './data/eatsData';
import { happeningsData } from './data/happeningsData';

const SHOPS_DATA = [
  
  {
    id: 'shop-literati',
    name: 'Literati Bookstore',
    type: 'shop',
    category: 'Bookstores & Vinyl',
    tier: 'featured',
    rating: '4.9',
    address: '124 E Washington St, Ann Arbor, MI 48104',
    url: 'https://literatibookstore.com',
    img: 'https://a2vibe.com/images/Literati-Bookstore.jpg',
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
    img: 'https://a2vibe.com/images/Wazoo-Records.jpg',
    address: '436 E Liberty St, Ann Arbor, MI 48104',
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
    shortDesc: 'Vast Kerrytown audio institution with thousands of vintage LPs, jazz pressings, and classic stereo equipment.',
    features: ['Extensive Vinyl Catalog', 'Turntables', 'Cassettes'],
    hours: 'Wed - Sun: 11:00 AM - 7:00 PM',
    img: 'https://a2vibe.com/images/Encore-Records.jpg'
  },
  {
    id: 'shop-bivouac',
    name: 'Bivouac Outdoor & Boutique',
    type: 'shop',
    category: 'Vintage & Boutiques',
    tier: 'standard',
    rating: '4.8',
    address: '336 S State St, Ann Arbor, MI 48104',
    url: 'https://bivouacannarbor.com',
    img: 'https://a2vibe.com/images/Bivouac.jpg',
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
    shortDesc: 'Vibrant vintage shop offering genuine 1950s-90s vintage clothing, leather jackets, denim, and accessories.',
    features: ['True Vintage', 'Hand-Picked Clothing', 'State Street'],
    hours: 'Mon - Sun: 12:00 PM - 7:00 PM',
    img: 'https://a2vibe.com/images/The-Getup-Vintage.jpg'
  },
  {
    id: 'shop-vibe-a2',
    name: 'Vibe Ann Arbor',
    type: 'shop',
    category: 'Dispensaries',
    tier: 'featured',
    rating: '4.9',
    address: '407 N 5th Ave, Ann Arbor, MI 48104',
    url: 'https://letsvibe420.com/shop/shop-ann-arbor/',
    img: 'https://a2vibe.com/images/vibe-weed.jpg',
    shortDesc: 'Premier downtown cannabis dispensary offering elite strains, top-shelf edibles, concentrates, and knowledgeable budtenders.',
    longDesc: '<p>Vibe Ann Arbor sets the benchmark for Tree Town recreational and medical cannabis. Conveniently located near Kerrytown, Vibe pairs a clean, welcoming retail showroom with curated terpene profiles, local craft flower, artisanal gummies, and high-potency concentrates.</p>',
    specials: [
      'First-time visitor 20% discount on boutique flower',
      'Daily Happy Hour specials on pre-rolls and live rosin concentrates'
    ],
    features: ['Recreational 21+', 'Medical Validated', 'Curbside Pickup', 'ATM On-Site', 'Wheelchair Accessible'],
    hours: 'Mon - Sun: 9:00 AM - 9:00 PM'
  },
  {
    id: 'shop-information-entropy',
    name: 'Information Entropy',
    type: 'shop',
    category: 'Dispensaries',
    tier: 'featured',
    rating: '4.9',
    address: '1115 Broadway St, Ann Arbor, MI 48105',
    url: 'https://informationentropy.com',
    img: 'https://a2vibe.com/images/Information-Entropy.jpg',
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
    id: 'shop-rock-paper-scissors',
    name: 'Rock Paper Scissors',
    type: 'shop',
    category: 'Specialty Markets',
    tier: 'standard',
    address: '216 S Main St, Ann Arbor, MI 48104',
    shortDesc: 'Cheerful Main Street gift shop specializing in playful stationery, bespoke paper goods, quirky gifts, and local Michigan novelties.',
    features: ['Custom Gifts', 'Michigan Memorabilia', 'Party Goods'],
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
    img: 'https://a2vibe.com/images/Rock-Paper-Scissors.jpg'
  },
  {
    id: 'shop-orange-market',
    name: 'Orange Market',
    type: 'shop',
    category: 'Specialty Markets',
    tier: 'featured',
    address: '1118 Broadway St, Ann Arbor, MI 48105',
    img: 'https://a2vibe.com/images/Orange-Market.jpg',
    shortDesc: 'Neighborhood corner grocery and specialty market offering fresh produce, pantry staples, snacks, and everyday local essentials.',
    longDesc: '<p>Orange Market is a convenient local neighborhood hub stocked with fresh essentials, everyday groceries, snacks, cold beverages, and specialty items for quick, easy shopping.</p>',
    features: ['Neighborhood Market', 'Fresh Produce', 'Pantry Essentials', 'Quick Stop'],
    hours: 'Mon - Sun: 8:00 AM - 9:00 PM'
  },
  {
    id: 'shop-zingermans-deli-shop',
    name: 'Zingerman’s Specialty Food Store',
    type: 'shop',
    category: 'Specialty Markets',
    tier: 'featured',
    rating: '4.9',
    address: '422 Detroit St, Ann Arbor, MI 48104',
    url: 'https://www.zingermansdeli.com',
    img: 'https://a2vibe.com/images/Zingermans.jpg',
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
    shortDesc: 'Charming multi-level brick marketplace featuring local toy stores, spice shops, paper merchants, and tea emporiums.',
    features: ['Multiple Boutiques', 'Chime Tower', 'Farmers Market Adjacent'],
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM',
    img: 'https://a2vibe.com/images/Kerrytown-Market.jpg'
  }
];

const SHOP_CATEGORIES = [
  'All',
  'Bookstores & Vinyl',
  'Vintage & Boutiques',
  'University Apparel',
  'Dispensaries',
  'Specialty Markets'
];

const ShopDetailModal = ({ isOpen, onClose, shop, theme, toggleFavorite, favorites }) => {
  if (!isOpen || !shop) return null;
  const isFeatured = shop.tier === 'featured';
  const isFavorited = (favorites || []).some(f => f.id === shop.id);

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="p-2 rounded-xl bg-[#ffcb05]/15 text-[#b45309] dark:text-[#ffcb05] flex-shrink-0">
              <Store size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] tracking-[0.2em] block">
                {shop.category}
              </span>
              <h3 className="text-xl font-header font-black uppercase italic tracking-tight truncate" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
                {shop.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite({ ...shop, type: 'shop' })}
              className={`p-2.5 rounded-full transition-all duration-300 ${theme.isDark ? 'bg-white/5' : 'bg-black/5'} active:scale-90`}
            >
              <Heart size={20} className="text-[#ffcb05]" fill={isFavorited ? "#ffcb05" : "none"} strokeWidth={2.5} />
            </button>
            <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {shop.img && (
            <div className="relative rounded-[32px] overflow-hidden shadow-lg h-60">
              <img src={shop.img} className="w-full h-full object-cover" alt={shop.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {isFeatured && (
                <span className="absolute top-4 left-4 bg-[#ffcb05] text-black text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                  ★ Featured Shop
                </span>
              )}
              <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full">
                {shop.category}
              </span>
            </div>
          )}

          {shop.address && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
              <MapPin size={18} className="text-[#b45309] dark:text-[#ffcb05] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className={`font-black uppercase tracking-wider block ${theme.text}`}>Address</span>
                <span className={`${theme.secondaryText} leading-relaxed`}>{shop.address}</span>
              </div>
            </div>
          )}

          {shop.hours && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
              <Clock size={18} className="text-[#0284c7] dark:text-[#38bdf8] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className={`font-black uppercase tracking-wider block ${theme.text}`}>Hours</span>
                <span className={`${theme.secondaryText} leading-relaxed`}>{shop.hours}</span>
              </div>
            </div>
          )}

          {isFeatured && shop.specials && shop.specials.length > 0 && (
            <div className="p-4 rounded-3xl bg-gradient-to-br from-[#ffcb05]/15 to-transparent border border-[#ffcb05]/30 space-y-2.5">
              <div className="flex items-center gap-2 text-[#b45309] dark:text-[#ffcb05]">
                <Percent size={18} />
                <h4 className="text-xs font-black uppercase tracking-wider">Current Deals & Specials</h4>
              </div>
              <ul className="space-y-1.5 text-xs">
                {shop.specials.map((spec, i) => (
                  <li key={i} className={`flex items-start gap-2 ${theme.text}`}>
                    <span className="text-[#b45309] dark:text-[#ffcb05] font-black">✦</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {shop.features && shop.features.length > 0 && (
            <div className="space-y-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText}`}>Amenities & Highlights</span>
              <div className="flex flex-wrap gap-2">
                {shop.features.map(f => (
                  <span key={f} className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${theme.border}${theme.isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText}`}>About this Shop</span>
            <div className={`text-sm leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`}
              dangerouslySetInnerHTML={{ __html: shop.longDesc || `<p>${shop.shortDesc}</p>` }}
            />
          </div>

          <div className="space-y-2.5 pt-2">
            {shop.url && (
              <button
                onClick={() => window.open(shop.url, '_blank', 'noopener,noreferrer')}
                className="w-full py-4 bg-[#ffcb05] text-black rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                <span>Visit Official Website / Order Online</span>
                <ExternalLink size={14} />
              </button>
            )}

            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`, '_blank')}
              className={`w-full py-3.5 rounded-2xl font-black uppercase text-xs border ${theme.border}${theme.isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} active:scale-95 transition-all flex items-center justify-center gap-2`}
            >
              <Navigation size={15} />
              <span>Get Directions in Google Maps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopsDirectoryModal = ({ isOpen, onClose, theme, onSelectShop, toggleFavorite, favorites, onOpenPartnerModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const featuredShops = useMemo(() => {
    return SHOPS_DATA.filter(s => s.tier === 'featured');
  }, []);

  const filteredShops = useMemo(() => {
    return SHOPS_DATA.filter(shop => {
      const matchesCat = selectedCat === 'All' || shop.category === selectedCat;
      const matchesSearch = !searchQuery ||
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border${theme.border} animate-slide flex flex-col`}>
        <div className={`sticky top-0 z-10 p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#ffcb05]/15 text-[#b45309] dark:text-[#ffcb05]">
                <Store size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] tracking-[0.2em] block">
                  Local Retail Directory
                </span>
                <h3 className="text-xl font-header font-black uppercase italic tracking-tight" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
                  Ann Arbor Shops
                </h3>
              </div>
            </div>
            <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
              <X size={20} />
            </button>
          </div>

          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dispensaries, vinyl, boutiques, books..."
              className={`w-full pl-10 pr-4 py-3 rounded-2xl ${theme.isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05] transition-all`}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3">
            {SHOP_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCat === cat
                    ? 'bg-[#ffcb05] text-black border-[#ffcb05] shadow-md'
                    : (theme.isDark ? 'bg-black/20 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {selectedCat === 'All' && !searchQuery && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#b45309] dark:text-[#ffcb05]" />
                <h4 className={`text-xs font-black uppercase tracking-widest ${theme.text}`}>Featured Local Spots</h4>
              </div>
              <div className="flex overflow-x-auto gap-3.5 pb-2 no-scrollbar snap-x snap-mandatory">
                {featuredShops.map(shop => {
                  const isFavorited = (favorites || []).some(f => f.id === shop.id);
                  return (
                    <div
                      key={shop.id}
                      onClick={() => onSelectShop(shop)}
                      className={`min-w-[240px] max-w-[240px] ${theme.card} rounded-3xl border${theme.border} overflow-hidden shadow-md cursor-pointer snap-center group flex-shrink-0 hover:border-[#ffcb05]/60 transition-all relative`}
                    >
                      <div className="h-32 relative overflow-hidden">
                        <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-2 bg-[#ffcb05] text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-md">
                          Featured
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite({ ...shop, type: 'shop' }); }}
                          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md ${isFavorited ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : 'bg-black/40 text-white'}`}
                        >
                          <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <span className="text-[9px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] block truncate">
                          {shop.category}
                        </span>
                        <h5 className={`font-bold text-xs uppercase tracking-tight truncate ${theme.text}`}>
                          {shop.name}
                        </h5>
                        <p className={`text-[11px] line-clamp-2 ${theme.secondaryText}`}>
                          {shop.shortDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
              <span>All Listings ({filteredShops.length})</span>
              {selectedCat !== 'All' && (
                <button onClick={() => setSelectedCat('All')} className="text-[#ffcb05] hover:underline">
                  Show All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {filteredShops.length > 0 ? (
                filteredShops.map(shop => {
                  const isFavorited = (favorites || []).some(f => f.id === shop.id);
                  return (
                    <div
                      key={shop.id}
                      onClick={() => onSelectShop(shop)}
                      className={`${theme.card} p-4 rounded-3xl border${theme.border} flex items-center gap-4 cursor-pointer relative shadow-sm hover:border-[#ffcb05]/50 active:scale-[0.99] transition-all`}
                    >
                      {shop.img ? (
                        <img src={shop.img} alt={shop.name} className="w-20 h-20 rounded-2xl object-cover shadow-inner flex-shrink-0" />
                      ) : (
                        <div className={`w-20 h-20 rounded-2xl ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} flex items-center justify-center flex-shrink-0 text-slate-400`}>
                          <Store size={26} />
                        </div>
                      )}

                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#b45309] dark:text-[#ffcb05] bg-[#ffcb05]/10 px-2 py-0.5 rounded-md truncate">
                            {shop.category}
                          </span>
                          {shop.tier === 'featured' && (
                            <span className="bg-[#ffcb05] text-black text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className={`font-bold text-sm uppercase tracking-tight truncate mt-1 ${theme.text}`}>
                          {shop.name}
                        </h4>
                        <p className={`text-xs mt-0.5 line-clamp-1 ${theme.secondaryText}`}>
                          {shop.shortDesc}
                        </p>
                        <p className={`text-[10px] mt-1 truncate ${theme.secondaryText}`}>
                          📍 {shop.address}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite({ ...shop, type: 'shop' }); }}
                          className={`p-2 rounded-full transition-transform active:scale-90 ${isFavorited ? 'text-[#ffcb05]' : 'text-slate-400 hover:text-white'}`}
                        >
                          <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                        </button>
                        <div className="p-2 rounded-full text-slate-400 hover:text-[#ffcb05] flex-shrink-0">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`p-10 border-2 border-dashed rounded-3xl text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.border}`}>
                  No shops found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SHOP MODAL CTA: GET LISTED */}
        <div className={`p-4 border-t ${theme.border}${theme.appBg}/95 backdrop-blur-md`}>
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#00274c] to-[#0a121e] border border-[#ffcb05]/30 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase text-[#ffcb05] tracking-widest block">Retail & Cannabis Spotlight</span>
              <p className="text-xs font-bold text-white truncate">Own a boutique, market, or dispensary?</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPartnerModal('shop');
              }}
              className="px-3.5 py-2 bg-[#ffcb05] text-black rounded-xl font-black uppercase text-[10px] tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1 flex-shrink-0"
            >
              <span>Get Listed</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransitModal = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const transitOptions = [
    {
      name: 'The Ride (AAATA)',
      category: 'Public Bus System',
      desc: 'Ann Arbor’s primary fixed-route public bus transit network across the city and Ypsilanti.',
      url: 'https://www.theride.org/'
    },
    {
      name: 'The Ride Trip Planner',
      category: 'Trip Planner & Schedules',
      desc: 'Plan real-time bus routes, arrival estimates, and point-to-point trip itineraries.',
      url: 'https://www.theride.org/maps-schedules/trip-planner'
    },
    {
      name: 'FlexRide (Via)',
      category: 'On-Demand Microtransit',
      desc: 'Affordable, shared on-demand rides connecting designated Ann Arbor service zones.',
      url: 'https://city.ridewithvia.com/ann-arbor'
    },
    {
      name: 'Arbor Taxi',
      category: 'Local Taxi Service',
      desc: 'Reliable local 24/7 taxi transportation service serving Tree Town and metro Detroit.',
      url: 'https://arbortaxi.com/'
    }
  ];

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="p-2 rounded-xl bg-[#00274c] text-[#ffcb05] flex-shrink-0">
              <Navigation size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] tracking-[0.2em] block">
                Getting Around
              </span>
              <h3 className="text-xl font-header font-black uppercase italic tracking-tight truncate" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
                Ann Arbor Transit
              </h3>
            </div>
          </div>
          <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-3.5">
          {transitOptions.map((opt) => (
            <div
              key={opt.name}
              onClick={() => window.open(opt.url, '_blank', 'noopener,noreferrer')}
              className={`${theme.card} p-4 rounded-3xl border${theme.border} flex items-center justify-between gap-4 cursor-pointer shadow-sm hover:border-[#ffcb05]/60 active:scale-[0.99] transition-all`}
            >
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#b45309] dark:text-[#ffcb05] bg-[#ffcb05]/10 px-2 py-0.5 rounded-md inline-block mb-1">
                  {opt.category}
                </span>
                <h4 className={`font-bold text-sm uppercase tracking-tight truncate ${theme.text}`}>{opt.name}</h4>
                <p className={`text-xs mt-0.5 line-clamp-2 leading-relaxed ${theme.secondaryText}`}>{opt.desc}</p>
              </div>
              <div className="p-3 bg-[#00274c] text-[#ffcb05] rounded-2xl flex-shrink-0">
                <ExternalLink size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PARKS_DATA = [
  {
    id: 'park-arb',
    name: 'Nichols Arboretum',
    title: 'Nichols Arboretum',
    type: 'park',
    category: 'Nature & Arb',
    address: '1610 Washington Hts, Ann Arbor, MI',
    img: 'https://a2vibe.com/images/UofM_Nichols_Arboretum.jpg',
    shortDesc: 'Iconic 123-acre river valley featuring the Peony Garden, river trails, and historic tree collections.',
    longDesc: '<p>Beloved by locals as "The Arb," this historic reserve along the Huron River offers miles of gravel pathways, panoramic hillside vistas, glacial topography, and the world-renowned Nichols Arboretum Peony Garden.</p>',
    dogFriendly: true,
    dogNotes: 'Leashed dogs welcome throughout trails.',
    accessibleTrails: false,
    accessibilityNotes: 'Steep natural dirt hills and stone stairways; limited wheelchair access.',
    restrooms: true,
    restroomNotes: 'Seasonal portalets and Reader Center restrooms during open hours.',
    playground: false,
    familyFriendly: true,
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
    img: 'https://a2vibe.com/images/Gallup_Park.jpg',
    shortDesc: 'Scenic 69-acre park winding along the Huron River with pedestrian bridges, boat launches, and trails.',
    longDesc: '<p>Gallup Park is Ann Arbor’s premier riverfront escape. Features 3 miles of paved trails traversing small islands, wooden footbridges, picnic pavilions, wildlife viewing spots, and seasonal kayak and canoe rentals.</p>',
    dogFriendly: true,
    dogNotes: 'Dog-friendly on leash with waste bag stations.',
    accessibleTrails: true,
    accessibilityNotes: 'Fully paved, flat walkways and ADA-compliant bridge ramps.',
    restrooms: true,
    restroomNotes: 'Permanent year-round ADA restrooms located at the Canoe Livery.',
    playground: true,
    familyFriendly: true,
    bikeFriendly: true,
    features: ['Canoe & Kayak Livery', 'Playground', 'Paved Trails', 'Picnic Shelters']
  },
  {
    id: 'park-bird-hills',
    name: 'Bird Hills Nature Area',
    title: 'Bird Hills Nature Area',
    type: 'park',
    category: 'Woodland Preserve',
    address: 'Newport Rd & Bird Rd, Ann Arbor, MI',
    img: 'https://a2vibe.com/images/birds-hill.jpg',
    shortDesc: 'Ann Arbor’s largest city nature park with 146 acres of quiet dirt trails under dense hardwood canopy.',
    longDesc: '<p>A sanctuary for trail runners and bird watchers, Bird Hills is an untouched forested refuge featuring rugged terrain, deep ravines, and native oak and maple groves without bikes or motorized access.</p>',
    dogFriendly: true,
    dogNotes: 'Leashed dogs permitted; must stay on trails.',
    accessibleTrails: false,
    accessibilityNotes: 'Rugged dirt paths, exposed roots, and steep grades.',
    restrooms: false,
    restroomNotes: 'No public restrooms on-site.',
    playground: false,
    familyFriendly: true,
    bikeFriendly: false,
    features: ['Deep Woodland Trails', 'Ravine Overlooks', 'Wildlife & Birding']
  },
  {
    id: 'park-matthaei',
    name: 'Matthaei Botanical Gardens',
    title: 'Matthaei Botanical Gardens',
    type: 'park',
    category: 'Botanic Garden',
    address: '1800 N Dixboro Rd, Ann Arbor, MI',
    img: 'https://a2vibe.com/images/matt.png',
    shortDesc: 'Sprawling conservatories, display gardens, wetlands, and peaceful nature loops on Dixboro Road.',
    longDesc: '<p>Features a 10,000+ square foot tropical and desert conservatory surrounded by outdoor display beds, bonsai gardens, boardwalk trails over Fleming Creek, and sweeping wildflower habitats.</p>',
    dogFriendly: false,
    dogNotes: 'Service animals only. Pets not permitted in gardens or conservatory.',
    accessibleTrails: true,
    accessibilityNotes: 'Paved paths and level boardwalks through the central gardens.',
    restrooms: true,
    restroomNotes: 'Full modern ADA restrooms in visitor center.',
    playground: false,
    familyFriendly: true,
    bikeFriendly: true,
    features: ['Tropical Conservatory', 'Boardwalks', 'Display Gardens', 'Bonsai Collection']
  },
  {
    id: 'park-barton',
    name: 'Barton Nature Area',
    title: 'Barton Nature Area',
    type: 'park',
    category: 'Wetland & River',
    address: 'Huron River Dr, Ann Arbor, MI',
    img: 'https://a2vibe.com/images/barton.jpg',
    shortDesc: 'Quiet 102-acre natural area bordered by Barton Pond and the Huron River with boardwalk passages.',
    longDesc: '<p>Located just northwest of downtown, Barton Nature Area features scenic river overlooks, rich marshlands, and walking connections through foot bridges to Huron River Drive and Foster Bridge.</p>',
    dogFriendly: true,
    dogNotes: 'Leashed dogs allowed on marked footpaths.',
    accessibleTrails: false,
    accessibilityNotes: 'Mostly unpaved nature paths, earthen trails, and boardwalks.',
    restrooms: false,
    restroomNotes: 'No restroom facilities available.',
    playground: false,
    familyFriendly: true,
    bikeFriendly: false,
    features: ['Barton Dam Overlooks', 'Footbridges', 'Wetland Trails']
  },
  {
    id: 'park-bandemer',
    name: 'Bandemer Park',
    title: 'Bandemer Park',
    type: 'park',
    category: 'Waterfront & Disc Golf',
    address: '1352 Lakeshore Dr, Ann Arbor, MI',
    img: 'https://a2vibe.com/images/bandemer.jpg',
    shortDesc: 'Waterfront park featuring boardwalks along Argo Pond, a 9-hole disc golf course, and dirt bike jumps.',
    longDesc: '<p>Bordering the west side of Argo Pond, Bandemer offers docks for crew shells and canoes, a shaded disc golf run, accessibility to the B2B Trail, and panoramic views of the water.</p>',
    dogFriendly: true,
    dogNotes: 'Leashed dogs allowed along paths and open spaces.',
    accessibleTrails: true,
    accessibilityNotes: 'Accessible paved path connecting to the Border-to-Border (B2B) Trail.',
    restrooms: true,
    restroomNotes: 'Seasonal portable restrooms.',
    playground: false,
    familyFriendly: true,
    bikeFriendly: true,
    features: ['B2B Trail Connection', 'Disc Golf Course', 'Dirt Bike Jumps', 'Canoe Launch']
  }
];

const STRIPE_LINKS = {
  restaurantBoostedAnnual: 'https://buy.stripe.com/8x2aEX8640Fx0OZ596eME0b',
  restaurantBoostedMonthly: 'https://buy.stripe.com/9B6bJ1864dsj2X78lieME0a',
  shopBoostedAnnual: 'https://buy.stripe.com/fZu14nbigdsjeFPfNKeME0c',
  shopBoostedMonthly: 'https://buy.stripe.com/fZudR9aec4VNgNX6daeME0d',
  restaurantFeaturedPickAddon: 'https://buy.stripe.com/3cI4gz1HGgEv69j0SQeME04',
  shopFeaturedPickAddon: 'https://buy.stripe.com/9B628r2LKewn8hrbxueME0e',
  promoJournal: 'https://buy.stripe.com/28EeVd1HG4VNdBL8lieME05',
  promoSMSocial: 'https://buy.stripe.com/28E8wP9a85ZR7dn8lieME06',
  eventStandard: 'https://buy.stripe.com/aFabJ13PO1JB8hrgROeME08',
  eventFeatured: 'https://buy.stripe.com/3cI00jcmkag7btDbxueME07'
};

const THEMES = {
  light: { primary: '#00274c', windowBg: 'bg-slate-200', appBg: 'bg-slate-50', card: 'bg-white', text: 'text-slate-900', secondaryText: 'text-slate-600', border: 'border-slate-200', isDark: false },
  dark: { primary: '#ffcb05', windowBg: 'bg-[#050b14]', appBg: 'bg-[#0a121e]', card: 'bg-[#151f2e]', text: 'text-slate-100', secondaryText: 'text-slate-400', border: 'border-slate-800', isDark: true }
};

const CATEGORIES_GUIDE = ['All', 'City Life', 'Parks', 'Local Secrets', 'Arts & Culture', 'Dining Reviews', 'Community Reports', 'Events', 'Meetups'];
const CATEGORIES_EXP = ['All', 'Festivals', 'Nightlife', 'Museums', 'Parks', 'Workshops', 'Sports', 'Family Friendly', 'Hidden Gems', 'Tours', 'Arts & Culture'];
const MONTHS_EXP = ['All Months', 'October', 'November', 'December'];
const FORUM_CHANNELS = ['All', 'Announcements', 'Local News', 'Events & Meetups', 'Food & Dining', 'Community Chat'];

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

/* =========================================================================
   DYNAMIC FAVORITES SLIDESHOW COMPONENT FOR MY VIBE TOP SECTION
   ========================================================================= */
const MyVibeHeroSlideshow = ({ 
  user, 
  userFavorites, 
  theme, 
  onSelectItem, 
  onSelectShop, 
  setView 
}) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const hasFavorites = userFavorites && userFavorites.length > 0;

  useEffect(() => {
    if (!hasFavorites || userFavorites.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % userFavorites.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasFavorites, userFavorites.length]);

  const currentFav = hasFavorites ? userFavorites[slideIdx % userFavorites.length] : null;

  const nextSlide = (e) => {
    e.stopPropagation();
    if (!hasFavorites) return;
    setSlideIdx(prev => (prev + 1) % userFavorites.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (!hasFavorites) return;
    setSlideIdx(prev => (prev - 1 + userFavorites.length) % userFavorites.length);
  };

  const handleSpotClick = () => {
    if (!currentFav) return;
    const isShop = currentFav.type === 'shop' || currentFav.id?.startsWith('shop-');
    if (isShop && onSelectShop) {
      onSelectShop(currentFav);
    } else if (onSelectItem) {
      onSelectItem(currentFav);
    }
  };

  return (
    <div 
      onClick={hasFavorites ? handleSpotClick : undefined}
      className={`relative h-64 rounded-[44px] overflow-hidden border border-white/10 group shadow-2xl w-full select-none ${hasFavorites ? 'cursor-pointer' : ''}`}
    >
      {hasFavorites ? (
        currentFav?.img ? (
          <img 
            key={currentFav.id || slideIdx}
            src={currentFav.img} 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
            alt={currentFav.name || currentFav.title || ''} 
          />
        ) : (
          <div className="absolute inset-0 bg-[#00274c] flex items-center justify-center">
            <Building size={64} className="text-[#ffcb05]/20" />
          </div>
        )
      ) : (
        <img 
          src={SLIDE_IMAGES[0]} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Ann Arbor" 
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a121e] via-[#0a121e]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00274c] to-[#ffcb05] p-0.5 shadow-md flex-shrink-0">
            <div className={`w-full h-full rounded-full ${theme.card} flex items-center justify-center text-white overflow-hidden`}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                <User size={14} className={theme.text} />
              )}
            </div>
          </div>
          <span className="text-[11px] font-black uppercase text-white tracking-wider pr-1">
            {user ? `${user.displayName?.split(' ')[0]}'s Vibe` : 'My Vibe'}
          </span>
        </div>

        {hasFavorites && (
          <span className="bg-[#ffcb05] text-black text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
            {(slideIdx % userFavorites.length) + 1} / {userFavorites.length} Saved
          </span>
        )}
      </div>

      {hasFavorites && userFavorites.length > 1 && (
        <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 flex justify-between pointer-events-none z-10">
          <button 
            onClick={prevSlide}
            className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 hover:bg-black/70 shadow-lg"
            title="Previous Favorite"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 hover:bg-black/70 shadow-lg"
            title="Next Favorite"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <div className="absolute bottom-5 left-5 right-5 z-10">
        {hasFavorites ? (
          <div className="space-y-1 animate-fade text-left">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase text-[#ffcb05] tracking-widest bg-black/60 px-2 py-0.5 rounded-md">
                {currentFav.cuisine || currentFav.category || (currentFav.type === 'shop' ? 'Shop' : 'Favorite')}
              </span>
              {(currentFav.price || currentFav.date) && (
                <span className="text-[9px] font-bold text-slate-300">
                  {currentFav.price || currentFav.date}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-header font-black uppercase text-white drop-shadow-md tracking-tight leading-tight line-clamp-1 group-hover:text-[#ffcb05] transition-colors">
              {currentFav.name || currentFav.title}
            </h3>

            <p className="text-[11px] text-slate-300 line-clamp-1 leading-snug">
              {currentFav.shortDesc || currentFav.address || currentFav.neighborhood || 'Tap to view details & route'}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 text-left">
            <span className="text-[9px] font-black uppercase text-[#ffcb05] tracking-widest">
              Curate Your Tree Town Feed
            </span>
            <h3 className="text-xl font-header font-black uppercase text-white tracking-tight">
              No Favorites Saved Yet
            </h3>
            <p className="text-[11px] text-slate-300">
              Tap the heart icon on any restaurant, boutique, or happening to turn this into your personal slideshow.
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); setView('flavors'); }}
              className="mt-1 px-3.5 py-1.5 bg-[#ffcb05] text-black text-[9px] font-black uppercase rounded-xl tracking-wider shadow-md active:scale-95 transition-all"
            >
              Explore Eats →
            </button>
          </div>
        )}

        {hasFavorites && userFavorites.length > 1 && (
          <div className="flex gap-1.5 justify-center pt-3">
            {userFavorites.slice(0, 10).map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === (slideIdx % userFavorites.length) ? 'w-6 bg-[#ffcb05]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   "THE SCENE" SLIDESHOW: BRAND-FORWARD SLIDESHOW (A2 VIBE SPECIFIC)
   ========================================================================= */
const TheSceneHeroSlideshow = ({ 
  dining, 
  itineraries, 
  onSelectItem, 
  onSelectShop 
}) => {
  const [slideIdx, setSlideIdx] = useState(0);

  const sceneSlides = useMemo(() => {
    const featuredEats = (dining || []).filter(d => d.isFeatured || d.rating >= '4.8');
    const featuredEvents = (itineraries || []).filter(e => e.isFeatured || e.price);
    const featuredShops = SHOPS_DATA.filter(s => s.tier === 'featured');

    const slides = [];

    // 1. Push all 6 city slides first to guarantee all 12 are available
    SLIDE_IMAGES.forEach((imgUrl, index) => {
      slides.push({
        type: 'city',
        categoryBadge: 'A2 Vibe City Lens',
        badgeColor: 'bg-[#ffcb05] text-black',
        title: index === 0 ? 'The Scene' : `Ann Arbor Vibe ${index + 1}`,
        subtitle: 'Curated by A2 Vibe • The Official Local City App',
        img: imgUrl,
        rawItem: null
      });
    });

    // 2. Push Eats
    featuredEats.forEach(eat => {
      slides.push({
        type: 'eats',
        categoryBadge: eat.cuisine || 'Eats Spotlight',
        badgeColor: 'bg-[#f97316] text-white',
        title: eat.title || eat.name,
        subtitle: eat.shortDesc || eat.neighborhood || 'A2 Vibe Curated Eatery',
        img: eat.img,
        rawItem: { ...eat, type: 'dining' }
      });
    });

    // 3. Push Events
    featuredEvents.forEach(evt => {
      slides.push({
        type: 'event',
        categoryBadge: Array.isArray(evt.category) ? evt.category[0] : (evt.category || 'Happenings'),
        badgeColor: 'bg-[#0284c7] text-white',
        title: evt.name || evt.title,
        subtitle: evt.date ? `📅 ${evt.date} •${evt.address || 'Ann Arbor'}` : (evt.shortDesc || 'A2 Vibe Top Event Pick'),
        img: evt.img,
        rawItem: { ...evt, type: 'experience' }
      });
    });

    // 4. Push Shops
    featuredShops.forEach(shop => {
      slides.push({
        type: 'shop',
        categoryBadge: shop.category || 'Featured Retail',
        badgeColor: 'bg-[#ffcb05] text-black',
        title: shop.name,
        subtitle: shop.shortDesc || shop.address || 'A2 Vibe Verified Store',
        img: shop.img,
        rawItem: { ...shop, type: 'shop' }
      });
    });

    return slides;
  }, [dining, itineraries]);

  useEffect(() => {
    if (!sceneSlides || sceneSlides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % sceneSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [sceneSlides.length]);

  const currentSlide = sceneSlides[slideIdx % sceneSlides.length];

  const handleSlideClick = () => {
    if (!currentSlide || !currentSlide.rawItem) return;
    if (currentSlide.type === 'shop' && onSelectShop) {
      onSelectShop(currentSlide.rawItem);
    } else if (onSelectItem) {
      onSelectItem(currentSlide.rawItem);
    }
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setSlideIdx(prev => (prev + 1) % sceneSlides.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setSlideIdx(prev => (prev - 1 + sceneSlides.length) % sceneSlides.length);
  };

  return (
    <section 
      onClick={currentSlide?.rawItem ? handleSlideClick : undefined}
      className={`relative h-72 rounded-[40px] overflow-hidden shadow-2xl flex items-end p-7 mx-1 border border-white/10 group select-none ${currentSlide?.rawItem ? 'cursor-pointer' : ''}`}
    >
      {currentSlide?.img ? (
        <img 
          key={currentSlide.img + slideIdx}
          src={currentSlide.img} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
          alt={currentSlide.title || 'The Scene'} 
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#00274c] via-[#05182d] to-[#0a121e]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider ${currentSlide.badgeColor}`}>
          ★ {currentSlide.categoryBadge}
        </span>

        <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10 tracking-widest">
          {(slideIdx % sceneSlides.length) + 1} / {sceneSlides.length}
        </span>
      </div>

      <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 flex justify-between pointer-events-none z-10">
        <button 
          onClick={prevSlide}
          className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 hover:bg-black/70 shadow-lg"
          title="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 hover:bg-black/70 shadow-lg"
          title="Next Slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="relative z-10 text-white w-full pr-8">
        <h1 className="text-3xl font-header font-black uppercase italic tracking-tighter leading-none mb-1.5 drop-shadow-md truncate group-hover:text-[#ffcb05] transition-colors">
          {currentSlide.title}
        </h1>
        <p className="text-xs text-slate-200 font-medium line-clamp-1 drop-shadow-sm leading-snug">
          {currentSlide.subtitle}
        </p>

        {currentSlide.rawItem && (
          <div className="flex items-center gap-1.5 mt-2 text-[9px] font-black uppercase text-[#ffcb05] tracking-wider">
            <span>Explore Details</span>
            <ArrowRight size={11} />
          </div>
        )}

        <div className="flex gap-1.5 justify-center pt-3 overflow-x-auto no-scrollbar">
          {sceneSlides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
                i === (slideIdx % sceneSlides.length) ? 'w-6 bg-[#ffcb05]' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ParkDetailModal = ({ isOpen, onClose, park, theme }) => {
  if (!isOpen || !park) return null;

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0">
              <Trees size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.2em] block">
                {park.category || 'Nature Preserve'}
              </span>
              <h3 className="text-xl font-header font-black uppercase italic tracking-tight truncate" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
                {park.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {park.img && (
            <div className="relative rounded-[32px] overflow-hidden shadow-lg h-60">
              <img src={park.img} className="w-full h-full object-cover" alt={park.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 bg-emerald-600/90 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-sm tracking-wider">
                Ann Arbor Green Space
              </span>
            </div>
          )}

          {park.address && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
              <MapPin size={18} className="text-[#b45309] dark:text-[#ffcb05] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className={`font-black uppercase tracking-wider block ${theme.text}`}>Location Address</span>
                <span className={`${theme.secondaryText} leading-relaxed`}>{park.address}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Dog size={16} />
                <span>Dog Friendly</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.dogFriendly ? 'Yes (Leashed)' : 'No Dogs Allowed'}
              </p>
              {park.dogNotes && <p className={`text-[10px] ${theme.secondaryText} leading-snug`}>{park.dogNotes}</p>}
            </div>

            <div className={`p-3.5 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] dark:text-[#38bdf8]">
                <Accessibility size={16} />
                <span>Accessibility</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.accessibleTrails ? 'Paved / ADA Accessible' : 'Natural / Rugged Paths'}
              </p>
              {park.accessibilityNotes && <p className={`text-[10px] ${theme.secondaryText} leading-snug`}>{park.accessibilityNotes}</p>}
            </div>

            <div className={`p-3.5 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                <Bath size={16} />
                <span>Restrooms</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.restrooms ? 'Restrooms On-Site' : 'No Public Restrooms'}
              </p>
              {park.restroomNotes && <p className={`text-[10px] ${theme.secondaryText} leading-snug`}>{park.restroomNotes}</p>}
            </div>

            <div className={`p-3.5 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#b45309] dark:text-[#ffcb05]">
                <Bike size={16} />
                <span>Biking</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.bikeFriendly ? 'Bikes Permitted / Trails' : 'Foot Traffic Only (No Bikes)'}
              </p>
            </div>
          </div>

          {park.features && park.features.length > 0 && (
            <div className="space-y-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText}`}>Features & Highlights</span>
              <div className="flex flex-wrap gap-2">
                {park.features.map(f => (
                  <span key={f} className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${theme.border}${theme.isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText}`}>About this Park</span>
            <div className={`text-sm leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`}
              dangerouslySetInnerHTML={{ __html: park.longDesc || park.shortDesc }}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.name + ' ' + park.address)}`, '_blank')}
              className="w-full py-4 bg-[#ffcb05] text-black rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Navigation size={16} />
              <span>Get Directions in Google Maps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParksDirectoryModal = ({ isOpen, onClose, theme, onSelectPark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Parks' },
    { id: 'dogFriendly', label: 'Dog Friendly', icon: Dog },
    { id: 'accessibleTrails', label: 'Accessible / Wheelchair', icon: Accessibility },
    { id: 'playground', label: 'Playground', icon: Baby },
    { id: 'familyFriendly', label: 'Family Friendly' },
    { id: 'bikeFriendly', label: 'Bike Paths', icon: Bike },
    { id: 'restrooms', label: 'Restrooms', icon: Bath }
  ];

  const filteredParks = useMemo(() => {
    return PARKS_DATA.filter(park => {
      const matchesSearch = !searchQuery || 
        park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        park.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        park.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (park.features || []).some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesFilter = true;
      if (selectedFilter !== 'all') {
        matchesFilter = Boolean(park[selectedFilter]);
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border${theme.border} animate-slide flex flex-col`}>
        <div className={`sticky top-0 z-10 p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Trees size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.2em] block">
                  Interactive Directory
                </span>
                <h3 className="text-xl font-header font-black uppercase italic tracking-tight" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
                  Ann Arbor Park Finder
                </h3>
              </div>
            </div>
            <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
              <X size={20} />
            </button>
          </div>

          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parks, river trails, peony gardens..."
              className={`w-full pl-10 pr-4 py-3 rounded-2xl ${theme.isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-emerald-500 transition-all`}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3">
            {filterOptions.map(f => {
              const Icon = f.icon;
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 border ${isActive ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : (theme.isDark ? 'bg-black/20 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700')}`}
                >
                  {Icon && <Icon size={12} />}
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
            <span>Showing {filteredParks.length} of {PARKS_DATA.length} Parks</span>
            {selectedFilter !== 'all' && (
              <button onClick={() => setSelectedFilter('all')} className="text-emerald-500 hover:underline">
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredParks.length > 0 ? (
              filteredParks.map((park) => (
                <div 
                  key={park.id}
                  onClick={() => onSelectPark(park)}
                  className={`${theme.card} p-4 rounded-3xl border${theme.border} flex items-center gap-4 cursor-pointer relative shadow-sm hover:border-emerald-500/50 active:scale-[0.99] transition-all`}
                >
                  <img src={park.img} alt={park.name} className="w-20 h-20 rounded-2xl object-cover shadow-inner flex-shrink-0" />
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md truncate">
                        {park.category}
                      </span>
                    </div>
                    <h4 className={`font-bold text-sm uppercase tracking-tight truncate mt-1 ${theme.text}`}>{park.name}</h4>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${theme.secondaryText}`}>{park.shortDesc}</p>
                    
                    <div className="flex items-center gap-2 mt-2 flex-wrap text-[10px]">
                      {park.dogFriendly && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          <Dog size={11} /> Dogs
                        </span>
                      )}
                      {park.accessibleTrails && (
                        <span className="flex items-center gap-1 text-[#0284c7] dark:text-[#38bdf8] bg-sky-500/10 px-2 py-0.5 rounded-md">
                          <Accessibility size={11} /> ADA
                        </span>
                      )}
                      {park.restrooms && (
                        <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md">
                          <Bath size={11} /> Restrooms
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-2 rounded-full text-slate-400 hover:text-emerald-500 flex-shrink-0">
                    <ArrowRight size={18} />
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-10 border-2 border-dashed rounded-3xl text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.border}`}>
                No parks match your selected criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ForumCommentsModal = ({ isOpen, onClose, story, user, theme }) => {
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen || !story) return;
    const q = query(collection(db, 'community_stories', story.id, 'comments'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isOpen, story]);

  if (!isOpen || !story) return null;

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please sign in to join the discussion!');
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'community_stories', story.id, 'comments'), {
        text: replyText.trim(),
        author: user.displayName || 'A2 Neighbor',
        userId: user.uid,
        timestamp: Date.now()
      });
      setReplyText('');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Could not post comment. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[36px] shadow-2xl border${theme.border} animate-slide flex flex-col`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div>
            <span className="text-[10px] font-black uppercase text-[#a855f7] tracking-[0.2em] block">Discussion Thread</span>
            <h3 className="text-lg font-header font-black uppercase italic tracking-tight truncate max-w-[320px]" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
              {story.title}
            </h3>
          </div>
          <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          <div className={`p-4 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'} border space-y-1`}>
            <p className={`text-xs font-bold ${theme.text}`}>Original Post by {story.author}</p>
            <p className={`text-xs leading-relaxed ${theme.secondaryText}`}>{story.content}</p>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText}`}>Comments ({comments.length})</h4>
            
            {comments.length > 0 ? (
              comments.map(c => (
                <div key={c.id} className={`p-3.5 rounded-2xl border ${theme.border}${theme.isDark ? 'bg-black/10' : 'bg-slate-50'} space-y-1`}>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className={`font-black uppercase tracking-wider text-[#a855f7]`}>{c.author}</span>
                    <span className={theme.secondaryText}>{c.timestamp ? new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${theme.text}`}>{c.text}</p>
                </div>
              ))
            ) : (
              <div className={`p-8 border-2 border-dashed rounded-2xl text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.border}`}>
                No comments yet. Start the conversation below!
              </div>
            )}
          </div>
        </div>

        <div className={`sticky bottom-0 p-4 ${theme.appBg} border-t${theme.border}`}>
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input 
              type="text" 
              required 
              value={replyText} 
              onChange={e => setReplyText(e.target.value)} 
              placeholder={user ? "Write a reply or tip..." : "Sign in to comment..."} 
              disabled={!user} 
              className={`flex-1 p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#a855f7]`} 
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !user} 
              className="px-5 py-3.5 bg-[#a855f7] text-white rounded-2xl font-black uppercase text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const PartnerListingModal = ({ isOpen, onClose, theme, user, initialCategory = 'restaurant' }) => {
  const [listingCategory, setListingCategory] = useState(initialCategory);

  useEffect(() => {
    if (isOpen) {
      setListingCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const openStripeCheckout = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b${theme.border}`}>
          <div>
            <span className="text-[10px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] tracking-[0.2em] block">Partner With A2 Vibe</span>
            <h3 className="text-xl font-header font-black uppercase italic tracking-tight" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>Listing Pricing Structure</h3>
          </div>
          <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className={`grid grid-cols-3 p-1 rounded-2xl ${theme.isDark ? 'bg-black/30 border border-white/10' : 'bg-slate-100 border border-slate-200'} text-center`}>
            <button
              onClick={() => setListingCategory('restaurant')}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${listingCategory === 'restaurant' ? 'bg-[#f97316] text-white shadow-md' : (theme.isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              <Utensils size={14} />
              <span>Dining</span>
            </button>
            <button
              onClick={() => setListingCategory('shop')}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${listingCategory === 'shop' ? 'bg-[#ffcb05] text-black shadow-md' : (theme.isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              <Store size={14} />
              <span>Shop</span>
            </button>
            <button
              onClick={() => setListingCategory('general')}
              className={`py-2.5 rounded-xl text-xs
