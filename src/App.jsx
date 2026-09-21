import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, getDoc, collection, 
  addDoc, updateDoc, arrayUnion, arrayRemove, 
  onSnapshot, query, orderBy, limit, increment 
} from 'firebase/firestore';
import { app } from './firebase'; // Adjust path if needed

const auth = getAuth(app);
const db = getFirestore(app);

import React, { useState, useEffect, useMemo } from 'react';
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

const SHOPS_DATA = [
  {
    id: 'shop-vibe-a2',
    name: 'Vibe Ann Arbor',
    type: 'shop',
    category: 'Marijuana Dispensaries',
    tier: 'featured',
    rating: '4.9',
    address: '407 N 5th Ave, Ann Arbor, MI 48104',
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

const STRIPE_LINKS = {
  boostedAnnual: 'https://buy.stripe.com/5kQ6oH3POdsjgNX30YeME02',
  boostedMonthly: 'https://buy.stripe.com/bJe9ATbigag769j30YeME03',
  restaurantFeaturedPickAddon: 'https://buy.stripe.com/3cI4gz1HGgEv69j0SQeME04',
  promoJournal: 'https://buy.stripe.com/28EeVd1HG4VNdBL8lieME05',
  promoSMSocial: 'https://buy.stripe.com/28E8wP9a85ZR7dn8lieME06',
  eventStandard: 'https://buy.stripe.com/aFabJ13PO1JB8hrgROeME08',
  eventFeatured: 'https://buy.stripe.com/3cI00jcmkag7btDbxueME07',
  shopAnnual: 'https://buy.stripe.com/test_shop_annual_placeholder',
  shopMonthly: 'https://buy.stripe.com/test_shop_monthly_placeholder',
  shopFeaturedPickAddon: 'https://buy.stripe.com/test_shop_featured_addon_placeholder'
};

const THEMES = {
  light: { primary: '#00274c', windowBg: 'bg-slate-200', appBg: 'bg-slate-50', card: 'bg-white', text: 'text-slate-900', secondaryText: 'text-slate-600', border: 'border-slate-200', isDark: false },
  dark: { primary: '#ffcb05', windowBg: 'bg-[#050b14]', appBg: 'bg-[#0a121e]', card: 'bg-[#151f2e]', text: 'text-slate-100', secondaryText: 'text-slate-400', border: 'border-slate-800', isDark: true }
};

const CATEGORIES_GUIDE = ['All', 'City Life', 'Parks', 'Local Secrets', 'Arts & Culture', 'Dining Reviews', 'Community Reports', 'Events', 'Meetups'];
const CATEGORIES_EXP = ['All', 'Festivals', 'Nightlife', 'Museums', 'Parks', 'Workshops', 'Sports', 'Family Friendly', 'Hidden Gems', 'Tours', 'Arts & Culture'];
const MONTHS_EXP = ['All Months', 'October', 'November', 'December'];
const AVAILABLE_TAGS = ['Foodie', 'U-M Alum', 'Townie', 'Student', 'Trail Runner', 'Night Owl', 'Art Lover', 'Coffee Snob'];
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

const ShopDetailModal = ({ isOpen, onClose, shop, theme, toggleFavorite, favorites }) => {
  if (!isOpen || !shop) return null;
  const isFeatured = shop.tier === 'featured';
  const isFavorited = (favorites || []).some(f => f.id === shop.id);

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
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
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
              <MapPin size={18} className="text-[#b45309] dark:text-[#ffcb05] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className={`font-black uppercase tracking-wider block ${theme.text}`}>Address</span>
                <span className={`${theme.secondaryText} leading-relaxed`}>{shop.address}</span>
              </div>
            </div>
          )}

          {shop.hours && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
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
                  <span key={f} className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${theme.border} ${theme.isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
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
              className={`w-full py-3.5 rounded-2xl font-black uppercase text-xs border ${theme.border} ${theme.isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} active:scale-95 transition-all flex items-center justify-center gap-2`}
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
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border ${theme.border} animate-slide flex flex-col`}>
        
        <div className={`sticky top-0 z-10 p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
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
            <div className="flex items-center gap-2">
              {onOpenPartnerModal && (
                <button
                  onClick={() => { onClose(); onOpenPartnerModal('shop'); }}
                  className="px-3 py-1.5 bg-[#ffcb05] text-black rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-95 transition-all"
                >
                  List Shop +
                </button>
              )}
              <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
                <X size={20} />
              </button>
            </div>
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
                      className={`min-w-[240px] max-w-[240px] ${theme.card} rounded-3xl border ${theme.border} overflow-hidden shadow-md cursor-pointer snap-center group flex-shrink-0 hover:border-[#ffcb05]/60 transition-all relative`}
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
                      className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-4 cursor-pointer relative shadow-sm hover:border-[#ffcb05]/50 active:scale-[0.99] transition-all`}
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
      url: 'https://city.ridewithvia.com/ann-arbor#:~:text=Getting%20around%20Ann%20Arbor%20has,work%2C%20school%2C%20errands%2C%20and%20more.'
    },
    {
      name: 'Ann Arbor Taxi',
      category: 'Local Taxi Service',
      desc: 'Online cab and local ride reservations for rides around Ann Arbor and regional airports.',
      url: 'https://book.mylimobiz.com/v4/(S(hw3ly3p54pivsjs4qkne2pwr))/annarbortaxi'
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
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
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
              className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center justify-between gap-4 cursor-pointer shadow-sm hover:border-[#ffcb05]/60 active:scale-[0.99] transition-all`}
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

const ParkDetailModal = ({ isOpen, onClose, park, theme }) => {
  if (!isOpen || !park) return null;

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
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
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
              <MapPin size={18} className="text-[#b45309] dark:text-[#ffcb05] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className={`font-black uppercase tracking-wider block ${theme.text}`}>Location Address</span>
                <span className={`${theme.secondaryText} leading-relaxed`}>{park.address}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Dog size={16} />
                <span>Dog Friendly</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.dogFriendly ? 'Yes (Leashed)' : 'No Dogs Allowed'}
              </p>
              {park.dogNotes && <p className={`text-[10px] ${theme.secondaryText} leading-snug`}>{park.dogNotes}</p>}
            </div>

            <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] dark:text-[#38bdf8]">
                <Accessibility size={16} />
                <span>Accessibility</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.accessibleTrails ? 'Paved / ADA Accessible' : 'Natural / Rugged Paths'}
              </p>
              {park.accessibilityNotes && <p className={`text-[10px] ${theme.secondaryText} leading-snug`}>{park.accessibilityNotes}</p>}
            </div>

            <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                <Bath size={16} />
                <span>Restrooms</span>
              </div>
              <p className={`text-[11px] font-medium ${theme.text}`}>
                {park.restrooms ? 'Restrooms On-Site' : 'No Public Restrooms'}
              </p>
              {park.restroomNotes && <p className={`text-[10px] ${theme.secondaryText} leading-snug`}>{park.restroomNotes}</p>}
            </div>

            <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} space-y-1`}>
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
                  <span key={f} className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${theme.border} ${theme.isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
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
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border ${theme.border} animate-slide flex flex-col`}>
        
        <div className={`sticky top-0 z-10 p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Trees size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.2em] block">Interactive Directory</span>
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
                  className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-4 cursor-pointer relative shadow-sm hover:border-emerald-500/50 active:scale-[0.99] transition-all`}
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
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[36px] shadow-2xl border ${theme.border} animate-slide flex flex-col`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
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
                <div key={c.id} className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/10' : 'bg-slate-50'} space-y-1`}>
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

        <div className={`sticky bottom-0 p-4 ${theme.appBg} border-t ${theme.border}`}>
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

const HomeView = ({ 
  theme, setSelectedItem, itineraries, dining, featuredPosts, favorites, 
  toggleFavorite, setView, onOpenPartnerModal, onOpenParksModal, onOpenTransitModal,
  onOpenShopsModal, onSelectShop
}) => {
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

  const featuredShopsList = useMemo(() => {
    return SHOPS_DATA.filter(s => s.tier === 'featured');
  }, []);

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
          <Zap size={18} className="text-[#b45309] dark:text-[#ffcb05]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Insider Picks</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 px-1 no-scrollbar snap-x snap-mandatory">
          {(itineraries || []).slice(0, 5).map(item => (
            <div key={item.id} onClick={() => setSelectedItem(item)} className={`min-w-[300px] h-36 ${theme.card} border ${theme.border} rounded-[24px] overflow-hidden flex cursor-pointer shadow-md snap-center relative group`}>
              {item.img && <img src={item.img} className="w-24 h-full object-cover" alt="" />}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h4 className={`font-bold text-xs ${theme.text} line-clamp-2 leading-tight uppercase tracking-tight`}>{item.name}</h4>
                  {item.date && <p className={`text-[9px] font-bold ${theme.secondaryText} mt-1 truncate`}>{item.date}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#0284c7] dark:text-[#38bdf8]">{item.price}</span>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase py-2 px-4 rounded-xl">Details</button>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === item.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : (theme.isDark ? 'bg-black/20 text-white' : 'bg-black/5 text-slate-600')}`}><Heart size={14} fill={(favorites || []).some(f => f.id === item.id) ? "currentColor" : "none"} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LAUNCH GRID WITH SHOPS BUTTON INCLUDED */}
      <section>
        <div className="flex items-center gap-2 mb-4 px-2">
          <Ticket size={18} className="text-[#0284c7] dark:text-[#38bdf8]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Explore Ann Arbor Vibes</h2>
        </div>
        <div className="grid grid-cols-6 gap-2 px-1">
          {[
            { label: 'Eats', icon: <Utensils size={19}/>, path: 'flavors' },
            { label: 'Events', icon: <Zap size={19}/>, path: 'fun' },
            { label: 'Shops', icon: <ShoppingBag size={19} className="text-[#ffcb05]"/>, action: onOpenShopsModal },
            { label: 'Parks', icon: <Trees size={19} className="text-emerald-400"/>, action: onOpenParksModal },
            { label: 'List Biz', icon: <Store size={19}/>, action: () => onOpenPartnerModal('shop') },
            { label: 'Transit', icon: <Navigation size={19}/>, action: onOpenTransitModal }
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => {
                if (item.action) item.action();
                else if (item.link) window.open(item.link, '_blank');
                else if (item.path) setView(item.path);
              }} 
              className="flex flex-col items-center gap-1.5 active:scale-95 group"
            >
              <div className="p-3 sm:p-3.5 rounded-2xl text-white shadow-lg bg-[#00274c] group-hover:scale-105 transition-transform flex items-center justify-center">{item.icon}</div>
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tighter text-center ${theme.isDark ? 'text-white' : 'text-slate-700'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="island-flavors">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Utensils size={18} className="text-[#0284c7] dark:text-[#38bdf8]" />
            <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>A2 Eats</h2>
          </div>
          <button onClick={() => setView('flavors')} className="text-[10px] font-black uppercase text-[#b45309] dark:text-[#ffcb05] tracking-widest">View All ({dining.length})</button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-1 pb-4 no-scrollbar">
          {(dining || []).map(res => (
            <div key={res.id} onClick={() => setSelectedItem({...res, type: 'dining'})} className={`${theme.card} min-w-[220px] h-44 rounded-[24px] border ${theme.border} overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer relative group`}>
              {res.img ? <img src={res.img} className="w-full h-28 object-cover" alt="" /> : <div className={`w-full h-28 ${theme.isDark ? 'bg-[#00274c]/20' : 'bg-slate-100'} flex items-center justify-center`}><Building size={24} className="text-[#ffcb05]/40" /></div>}
              <div className="p-4">
                <h4 className={`font-bold text-[10px] ${theme.text} line-clamp-1 uppercase tracking-tight`}>{res.title}</h4>
                <p className="text-[8px] font-black text-[#0284c7] dark:text-[#38bdf8] uppercase tracking-[0.2em] mt-1">{res.cuisine || 'Gourmet A2'}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite({...res, type: 'dining'}); }} className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === res.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : (theme.isDark ? 'bg-black/20 text-white' : 'bg-black/5 text-slate-600')}`}><Heart size={12} fill={(favorites || []).some(f => f.id === res.id) ? "currentColor" : "none"} /></button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-5 px-2">
          <Sparkles size={18} className="text-[#b45309] dark:text-[#ffcb05]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>City Pulse</h2>
        </div>
          
        {featuredPosts && featuredPosts.length > 0 && (
          <div className="px-1 relative">
            <div onClick={() => setSelectedItem(featuredPosts[highlightIdx])} className="relative h-[420px] rounded-[48px] overflow-hidden shadow-2xl cursor-pointer group border border-white/10">
              <img src={featuredPosts[highlightIdx]?.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-8 right-8 text-white space-y-3">
                <span className="bg-[#ffcb05] text-black px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-2 shadow-sm">Trending Now</span>
                <h4 className="text-2xl font-header font-black uppercase italic leading-tight drop-shadow-md tracking-tighter">{featuredPosts[highlightIdx]?.title || ''}</h4>
                <p className="text-sm font-medium opacity-80 line-clamp-2 leading-relaxed italic">{featuredPosts[highlightIdx]?.excerpt || ''}</p>
              </div>
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                 <button onClick={prevHighlight} className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 shadow-lg"><ChevronLeft size={24} /></button>
                 <button onClick={nextHighlight} className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-all border border-white/10 shadow-lg"><ChevronRight size={24} /></button>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {featuredPosts.map((_, i) => <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === highlightIdx ? 'w-8 bg-[#ffcb05]' : 'w-2 bg-white/40'}`} />)}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SHOPS CTA & FEATURED SHOPS SECTION AT BOTTOM OF HOME */}
      <section className="space-y-6 pt-2">
        <div className="mx-1 p-6 rounded-[36px] bg-gradient-to-br from-[#00274c] via-[#081f38] to-[#122842] border border-[#ffcb05]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-2xl gap-4">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase text-[#ffcb05] bg-[#ffcb05]/20 px-2.5 py-0.5 rounded-full tracking-widest">
                Retail & Cannabis Hub
              </span>
              <span className="text-[9px] font-bold text-emerald-400">Legal 21+ Dispensaries</span>
            </div>
            <h4 className="text-xl font-header font-black uppercase text-white tracking-tight italic">
              Explore Local Shops & Dispensaries
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              From top dispensary strains at Vibe Ann Arbor to rare vintage vinyl, indie bookstores, and Michigan gear. Discover local tree town retail.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onOpenPartnerModal('shop')}
              className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-xs uppercase shadow-md active:scale-95 transition-all flex items-center gap-1.5 border border-white/10"
            >
              <span>List Your Shop</span>
            </button>
            <button
              onClick={onOpenShopsModal}
              className="px-5 py-3.5 bg-[#ffcb05] text-black rounded-2xl font-black text-xs uppercase shadow-xl active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              <span>Browse Shops</span>
            </button>
          </div>
        </div>

        {/* FEATURED SHOPS CARDS UNDER CTA */}
        <div className="space-y-3 px-1">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#ffcb05]" />
              <h3 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>
                Featured Local Shops
              </h3>
            </div>
            <button onClick={onOpenShopsModal} className="text-[10px] font-black uppercase text-[#ffcb05] tracking-widest hover:underline">
              View Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredShopsList.map(shop => {
              const isFavorited = (favorites || []).some(f => f.id === shop.id);
              return (
                <div
                  key={shop.id}
                  onClick={() => onSelectShop(shop)}
                  className={`${theme.card} rounded-[32px] border ${theme.border} overflow-hidden shadow-lg cursor-pointer group hover:border-[#ffcb05]/60 active:scale-[0.99] transition-all flex flex-col relative`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#ffcb05] text-black text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                      Featured Spotlight
                    </span>
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md">
                      {shop.category}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite({ ...shop, type: 'shop' }); }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${isFavorited ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : 'bg-black/40 text-white'}`}
                    >
                      <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className={`text-base font-bold uppercase tracking-tight ${theme.text}`}>
                        {shop.name}
                      </h4>
                      <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${theme.secondaryText}`}>
                        {shop.shortDesc}
                      </p>
                    </div>

                    {shop.specials && shop.specials.length > 0 && (
                      <div className="pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#b45309] dark:text-[#ffcb05]">
                          <Tag size={12} />
                          <span className="truncate">{shop.specials[0]}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className={`${theme.secondaryText} truncate max-w-[170px]`}>📍 {shop.address}</span>
                      <span className="text-[#0284c7] dark:text-[#38bdf8] font-black uppercase">Details & Deals →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const FlavorsView = ({ theme, setSelectedItem, toggleFavorite, favorites, dining, onOpenPartnerModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDining = useMemo(() => {
    if (!searchQuery) return dining;
    return dining.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dining, searchQuery]);

  const featuredDining = useMemo(() => {
    const featured = dining.filter(d => d.isFeatured);
    return featured.length > 0 ? featured.slice(0, 5) : dining.slice(0, 5);
  }, [dining]);

  return (
    <div className="animate-fade space-y-8 text-left relative z-10 pb-20 w-full flex flex-col">
      <div className="text-center px-4 w-full space-y-4">
        <h1 className={`text-3xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>Ann Arbor Flavors</h1>
        <p className={`text-xs ${theme.secondaryText}`}>Explore all {dining.length} curated local restaurants and eateries.</p>
      </div>

      <div className="px-1 w-full">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Sparkles size={18} className="text-[#b45309] dark:text-[#ffcb05]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Featured Flavors</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 px-1 pb-4 no-scrollbar snap-x snap-mandatory">
          {featuredDining.map(res => (
            <div key={`feat-${res.id}`} onClick={() => setSelectedItem({...res, type: 'dining'})} className={`min-w-[280px] h-48 ${theme.card} rounded-[32px] border ${theme.border} overflow-hidden shadow-lg snap-center relative group cursor-pointer flex-shrink-0`}>
              {res.img ? <img src={res.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" /> : <div className={`absolute inset-0 ${theme.isDark ? 'bg-[#00274c]/20' : 'bg-slate-100'} flex items-center justify-center`}><Building size={32} className="text-[#ffcb05]/40" /></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#ffcb05] text-black px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest inline-block mb-2 shadow-sm">Spotlight</span>
                <h3 className="font-bold text-lg uppercase tracking-tight truncate drop-shadow-md">{res.title}</h3>
                <p className="text-[10px] font-black text-[#ffcb05] uppercase tracking-wider mt-1">{res.cuisine || 'Gourmet A2'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        
      <div className="relative max-w-md mx-auto w-full px-4">
        <Search size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search restaurants, cuisine, or neighborhood..." className={`w-full pl-12 pr-4 py-3.5 rounded-2xl ${theme.card} border ${theme.border} ${theme.text} text-xs font-bold outline-none focus:border-[#ffcb05] shadow-inner`} />
      </div>

      <div className="grid grid-cols-1 gap-4 px-1 w-full">
        {filteredDining.length > 0 ? (
          filteredDining.map(res => {
            const isFavorited = (favorites || []).some(f => f.id === res.id && f.type === 'dining');
            return (
              <div key={res.id} onClick={() => setSelectedItem({...res, type: 'dining'})} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex gap-4 cursor-pointer shadow-md items-center group active:scale-[0.99] transition-transform`}>
                <img src={res.img} className="w-24 h-24 rounded-2xl object-cover shadow-inner flex-shrink-0" alt={res.title} />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className={`font-bold text-sm uppercase tracking-tight truncate ${theme.text}`}>{res.title}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[9px] font-black uppercase text-[#b45309] dark:text-[#ffcb05] bg-[#ffcb05]/10 px-2 py-0.5 rounded-md inline-block whitespace-nowrap">{res.cuisine || 'Eats'}</span>
                    {res.neighborhood && <span className="text-[10px] font-bold text-[#0284c7] dark:text-[#38bdf8] uppercase tracking-wider truncate">{res.neighborhood}</span>}
                  </div>
                  <p className={`text-xs mt-1 line-clamp-1 ${theme.secondaryText}`}>{res.shortDesc}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite({...res, type: 'dining'}); }} className={`p-3 rounded-full backdrop-blur-md flex-shrink-0 transition-transform active:scale-90 ${isFavorited ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : (theme.isDark ? 'bg-black/10 text-slate-400' : 'bg-black/5 text-slate-600')}`}><Heart size={18} fill={isFavorited ? "currentColor" : "none"} /></button>
              </div>
            );
          })
        ) : (
          <div className={`py-20 text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.secondaryText}`}>No restaurants found matching your search.</div>
        )}
      </div>

      <div className="pt-4">
        <div className="mx-1 p-5 rounded-[32px] bg-gradient-to-r from-[#00274c] via-[#051a34] to-[#0a121e] border border-[#f97316]/30 flex items-center justify-between shadow-xl">
          <div className="space-y-1 text-left">
            <span className="text-[9px] font-black uppercase text-[#f97316] tracking-widest block">Local Food & Drinks</span>
            <h4 className="text-base font-header font-black uppercase text-white tracking-tight">Add Your Eatery or Bar</h4>
            <p className="text-[11px] text-slate-300">Free counter QR placement or a boosted culinary showcase with full menu upload.</p>
          </div>
          <button
            onClick={() => onOpenPartnerModal('restaurant')}
            className="p-3.5 bg-[#f97316] text-white rounded-2xl font-black text-xs uppercase shadow-md active:scale-90 transition-all flex items-center justify-center flex-shrink-0 ml-3"
            title="List your eatery"
          >
            <Utensils size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const GuideView = ({ theme, setSelectedItem, toggleFavorite, favorites, posts, onOpenPartnerModal, onOpenContributorModal }) => {
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let list = posts || [];
    if (activeCat !== 'All') {
      if (activeCat === 'Meetups') {
        list = list.filter(p => p.category === 'Meetups' || p.allCategories?.includes('Meetups'));
      } else {
        list = list.filter(p => (p.allCategories || [p.category]).some(c => c && c.toLowerCase().includes(activeCat.toLowerCase())));
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q));
    }
    return list;
  }, [posts, activeCat, searchQuery]);

  const featuredStory = useMemo(() => {
    return filteredPosts.find(p => p.isHighlight) || filteredPosts[0];
  }, [filteredPosts]);

  const remainingStories = useMemo(() => {
    if (!featuredStory) return filteredPosts;
    return filteredPosts.filter(p => p.id !== featuredStory.id);
  }, [filteredPosts, featuredStory]);

  return (
    <div className="animate-fade space-y-7 text-left relative z-10 pb-20 w-full flex flex-col font-sans">
      
      <div className="text-center px-4 w-full space-y-2">
        <h1 className={`text-3xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>
          A2 Guide
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#b45309] dark:text-[#ffcb05]">
          Stories, Tips & Field Notes
        </p>

        <div className="flex items-center gap-2 pt-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, articles, reviews..."
              className={`w-full pl-9 pr-3 py-2.5 rounded-2xl ${theme.isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border text-xs font-medium outline-none focus:border-[#ffcb05] transition-all`}
            />
          </div>
          <button
            onClick={onOpenContributorModal}
            className="px-4 py-2.5 bg-[#a855f7] text-white rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
            title="Submit a local story"
          >
            <PenTool size={13} />
            <span>Submit</span>
          </button>
        </div>

        <div className="flex overflow-x-auto gap-2 pt-2 no-scrollbar">
          {CATEGORIES_GUIDE.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full border whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCat === cat
                  ? 'bg-[#ffcb05] border-[#ffcb05] text-black shadow-md'
                  : (theme.isDark ? 'text-slate-400 bg-white/5 border-white/5 hover:bg-white/10' : 'text-slate-700 bg-slate-100 border-slate-200 hover:bg-slate-200')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className={`p-10 border-2 border-dashed rounded-3xl text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.border} mx-2`}>
          No stories match your search.
        </div>
      ) : (
        <div className="px-1 space-y-6 w-full">
          
          {featuredStory && (
            <div
              onClick={() => setSelectedItem(featuredStory)}
              className={`${theme.card} rounded-[36px] border ${theme.border} overflow-hidden shadow-xl cursor-pointer group transition-all duration-300 active:scale-[0.99]`}
            >
              <div className="relative h-72 w-full overflow-hidden">
                {featuredStory.img ? (
                  <img
                    src={featuredStory.img}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full ${theme.isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center`}>
                    <Building size={48} className="opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#ffcb05] text-black text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                  Featured Story
                </span>
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md">
                  {featuredStory.category}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(featuredStory); }}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === featuredStory.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : 'bg-black/30 text-white'}`}
                >
                  <Heart size={16} fill={(favorites || []).some(f => f.id === featuredStory.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <h2 className={`text-xl font-header font-black uppercase italic tracking-tight leading-tight group-hover:text-[#ffcb05] transition-colors ${theme.text}`}>
                  {featuredStory.title}
                </h2>
                {featuredStory.excerpt && (
                  <p className={`text-xs leading-relaxed line-clamp-2 ${theme.secondaryText}`}>
                    {featuredStory.excerpt}
                  </p>
                )}
              </div>
            </div>
          )}

          {remainingStories.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 w-full pt-1">
              {remainingStories.map(art => {
                const isFavorited = (favorites || []).some(f => f.id === art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedItem(art)}
                    className="space-y-3 cursor-pointer group"
                  >
                    <div className={`relative aspect-[4/5] rounded-[30px] overflow-hidden shadow-md ${theme.isDark ? 'bg-slate-800/20 border-white/5' : 'bg-slate-100 border-slate-200'} border`}>
                      {art.img ? (
                        <img
                          src={art.img}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <Building size={36} />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-wider">
                        {art.category}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(art); }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${isFavorited ? "bg-[#ffcb05]/20 text-[#ffcb05]" : "bg-black/20 text-white"}`}
                      >
                        <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="px-1">
                      <h4 className={`text-xs font-header font-black uppercase italic leading-tight tracking-tight line-clamp-2 ${theme.text} group-hover:text-[#ffcb05] transition-colors`}>
                        {art.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3.5 px-1 pt-4">
        <div 
          onClick={() => onOpenPartnerModal('general')}
          className="rounded-[30px] p-4 flex flex-col justify-between cursor-pointer border border-[#38bdf8]/30 bg-gradient-to-br from-[#00274c] via-[#071d37] to-[#0a121e] shadow-lg group hover:border-[#38bdf8] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#38bdf8]/15 text-[#38bdf8] rounded-xl">
              <Calendar size={18} />
            </div>
            <ArrowRight size={16} className="text-[#38bdf8] group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[8px] font-black uppercase text-[#38bdf8] tracking-widest block">City Schedule</span>
            <h4 className="text-sm font-header font-black uppercase text-white leading-tight">Add Your Event</h4>
            <p className="text-[10px] text-slate-300 leading-snug line-clamp-1">List shows, pop-ups, and meetups</p>
          </div>
        </div>

        <div 
          onClick={onOpenContributorModal}
          className="rounded-[30px] p-4 flex flex-col justify-between cursor-pointer border border-[#a855f7]/30 bg-gradient-to-br from-[#00274c] via-[#1a0f30] to-[#0a121e] shadow-lg group hover:border-[#a855f7] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#a855f7]/15 text-[#a855f7] rounded-xl">
              <PenTool size={18} />
            </div>
            <ArrowRight size={16} className="text-[#a855f7] group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[8px] font-black uppercase text-[#a855f7] tracking-widest block">Contributor Desk</span>
            <h4 className="text-sm font-header font-black uppercase text-white leading-tight">Submit Story</h4>
            <p className="text-[10px] text-slate-300 leading-snug line-clamp-1">Local reviews, tips, and articles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [themeKey, setThemeKey] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerModalCategory, setPartnerModalCategory] = useState('restaurant');
  const [isContributorModalOpen, setIsContributorModalOpen] = useState(false);
  const [isParksModalOpen, setIsParksModalOpen] = useState(false);
  const [isTransitModalOpen, setIsTransitModalOpen] = useState(false);
  const [isShopsModalOpen, setIsShopsModalOpen] = useState(false);
   
  const [favorites, setFavorites] = useState(() => { const s = localStorage.getItem('a2v_favorites'); return s ? JSON.parse(s) : []; });
  const [stats, setStats] = useState(() => { const s = localStorage.getItem('a2v_stats'); return s ? JSON.parse(s) : { water: 0, drinks: 0 }; });
  const [bucketList, setBucketList] = useState(() => { const s = localStorage.getItem('a2v_bucketlist'); return s ? JSON.parse(s) : DEFAULT_BUCKET_ITEMS; });
  const [vibeTags, setVibeTags] = useState(() => { const s = localStorage.getItem('a2v_vibetags'); return s ? JSON.parse(s) : []; });

  const [itineraries, setItineraries] = useState(happeningsData);
  const [dining, setDining] = useState(eatsData);
  const [posts, setPosts] = useState(journalData);
  const [featuredPosts, setFeaturedPosts] = useState(journalData.filter(p => p.isHighlight));
   
  const [activeExpCat, setActiveExpCat] = useState('All');
  const [activeMonth, setActiveMonth] = useState('All Months');
  const [visibleCount, setVisibleCount] = useState(6);
  const theme = THEMES[themeKey] || THEMES.dark;

  const openPartnerModal = (category = 'restaurant') => {
    setPartnerModalCategory(category);
    setIsPartnerModalOpen(true);
  };

  const openContributorModal = () => {
    setIsContributorModalOpen(true);
  };

  const openParksModal = () => {
    setIsParksModalOpen(true);
  };

  const openTransitModal = () => {
    setIsTransitModalOpen(true);
  };

  const openShopsModal = () => {
    setIsShopsModalOpen(true);
  };

  const handleParkSelect = (park) => {
    setSelectedPark(park);
  };

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
  };

  // Auth Handlers
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
          setFavorites((data.favorites || []).filter(f => f.type !== 'park' && !f.id?.startsWith('park-')));
          setStats(data.stats || { water: 0, drinks: 0 });
          setBucketList(data.bucketList || DEFAULT_BUCKET_ITEMS);
          setVibeTags(data.vibeTags || []);
        }
      } else {
        const sf = localStorage.getItem('a2v_favorites'); 
        const parsed = sf ? JSON.parse(sf) : [];
        setFavorites(parsed.filter(f => f.type !== 'park' && !f.id?.startsWith('park-')));
        const ss = localStorage.getItem('a2v_stats'); setStats(ss ? JSON.parse(ss) : { water: 0, drinks: 0 });
        const st = localStorage.getItem('a2v_vibetags'); setVibeTags(st ? JSON.parse(st) : []);
        const sb = localStorage.getItem('a2v_bucketlist'); setBucketList(sb ? JSON.parse(sb) : DEFAULT_BUCKET_ITEMS);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Hooks
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { favorites }, { merge: true }); else localStorage.setItem('a2v_favorites', JSON.stringify(favorites)); }, [favorites, user]);
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { stats }, { merge: true }); else localStorage.setItem('a2v_stats', JSON.stringify(stats)); }, [stats, user]);
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { vibeTags }, { merge: true }); else localStorage.setItem('a2v_vibetags', JSON.stringify(vibeTags)); }, [vibeTags, user]);
  useEffect(() => { if (user) setDoc(doc(db, 'users', user.uid), { bucketList }, { merge: true }); else localStorage.setItem('a2v_bucketlist', JSON.stringify(bucketList)); }, [bucketList, user]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view, activeTool]);

  const toggleFavorite = (item) => {
    if (item.type === 'park' || PARKS_DATA.some(p => p.id === item.id) || item.id?.startsWith('park-')) {
      return;
    }
    const isAlreadyFavorited = (favorites || []).some(f => f.id === item.id);
    if (isAlreadyFavorited) { 
      setFavorites(favorites.filter(f => f.id !== item.id)); 
    } else { 
      const itemToSave = { 
        ...item, 
        type: item.type || 'experience', 
        savedAt: Date.now() 
      }; 
      setFavorites([...favorites, itemToSave]); 
    }
  };

  const shuffledExp = useMemo(() => {
    let list = itineraries || [];
    if (activeMonth !== 'All Months') list = list.filter(i => i.month === activeMonth);
    if (activeExpCat !== 'All') {
      list = list.filter(i => {
        let itemCats = Array.isArray(i.category) ? i.category : (Array.isArray(i.categories) ? i.categories : (typeof i.category === 'string' ? i.category.split(',').map(c => c.trim()) : []));
        const filterVal = activeExpCat.toLowerCase();
        return itemCats.some(c => c.toLowerCase().includes(filterVal)) || (filterVal === 'museums' && (i.name?.toLowerCase().includes('museum') || i.shortDesc?.toLowerCase().includes('museum')));
      });
    }
    return list;
  }, [itineraries, activeExpCat, activeMonth]);

  return (
    <div className={`min-h-screen ${theme.windowBg} font-sans transition-colors duration-500 flex flex-col items-center overflow-x-hidden`}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className={`w-full max-w-xl min-h-screen ${theme.appBg} relative shadow-2xl flex flex-col items-center border-x border-white/5`}>
         
        <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 ${theme.card}/90 backdrop-blur-xl border-b ${theme.border} px-5 py-5 flex justify-between items-center rounded-b-[40px] shadow-lg`}>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setActiveTool(null); setView('home'); }}>
            <div className="bg-[#ffcb05] w-10 h-10 rounded-xl flex items-center justify-center rotate-6 shadow-lg text-black"><Building size={20}/></div>
            <div className="flex flex-col leading-none text-left">
              <span className={`text-[11px] font-header font-black uppercase tracking-tighter ${theme.text}`}>A2</span>
              <span className={`text-[9px] font-header font-bold uppercase tracking-widest ${theme.secondaryText}`}>Vibe</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setActiveTool(null); setView('profile'); }} className={`w-10 h-10 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-slate-200'} flex items-center justify-center overflow-hidden border ${theme.text}`}>
              {user && user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : <User size={18}/>}
            </button>
            <button onClick={() => setThemeKey(theme.isDark ? 'light' : 'dark')} className={`p-3 rounded-2xl bg-[#00274c] hover:bg-[#ffcb05] transition-colors border border-white/10 ${theme.text}`}>{theme.isDark ? <Sun size={20} className="text-[#ffcb05]" /> : <Moon size={20} className="text-white" />}</button>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-36 overflow-y-auto no-scrollbar w-full px-5 flex flex-col">
          <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} theme={theme} toggleFavorite={toggleFavorite} favorites={favorites} />
           
          {/* DEDICATED PARK DETAIL POPUP */}
          <ParkDetailModal
            isOpen={!!selectedPark}
            onClose={() => setSelectedPark(null)}
            park={selectedPark}
            theme={theme}
          />

          {/* PARKS FINDER TOOL MODAL */}
          <ParksDirectoryModal
            isOpen={isParksModalOpen}
            onClose={() => setIsParksModalOpen(false)}
            theme={theme}
            onSelectPark={handleParkSelect}
          />

          {/* TRANSIT MODAL */}
          <TransitModal
            isOpen={isTransitModalOpen}
            onClose={() => setIsTransitModalOpen(false)}
            theme={theme}
          />

          {/* SHOPS DIRECTORY MODAL */}
          <ShopsDirectoryModal
            isOpen={isShopsModalOpen}
            onClose={() => setIsShopsModalOpen(false)}
            theme={theme}
            onSelectShop={handleShopSelect}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            onOpenPartnerModal={openPartnerModal}
          />

          {/* SHOP DETAIL MODAL */}
          <ShopDetailModal
            isOpen={!!selectedShop}
            onClose={() => setSelectedShop(null)}
            shop={selectedShop}
            theme={theme}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />

          <PartnerListingModal 
            isOpen={isPartnerModalOpen} 
            onClose={() => setIsPartnerModalOpen(false)} 
            theme={theme} 
            user={user} 
            initialCategory={partnerModalCategory}
          />

          <ContributorSubmissionModal
            isOpen={isContributorModalOpen}
            onClose={() => setIsContributorModalOpen(false)}
            theme={theme}
            user={user}
            onPostSuccess={() => {}}
          />

          {activeTool ? (
            <ToolFullScreenView type={activeTool} onClose={() => setActiveTool(null)} theme={theme} stats={stats} setStats={setStats} dining={dining} bucketList={bucketList} setBucketList={setBucketList} user={user} />
          ) : (
            <>
              {view === 'home' && (
                <HomeView 
                  theme={theme} 
                  setView={setView} 
                  setSelectedItem={setSelectedItem} 
                  itineraries={itineraries} 
                  dining={dining} 
                  featuredPosts={featuredPosts} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                  onOpenPartnerModal={openPartnerModal}
                  onOpenParksModal={openParksModal}
                  onOpenTransitModal={openTransitModal}
                  onOpenShopsModal={openShopsModal}
                  onSelectShop={handleShopSelect}
                />
              )}
              {view === 'journal' && (
                <GuideView 
                  theme={theme} 
                  setSelectedItem={setSelectedItem} 
                  toggleFavorite={toggleFavorite} 
                  favorites={favorites} 
                  posts={posts} 
                  onOpenPartnerModal={openPartnerModal} 
                  onOpenContributorModal={openContributorModal}
                />
              )}
              {view === 'flavors' && (
                <FlavorsView 
                  theme={theme} 
                  setSelectedItem={setSelectedItem} 
                  toggleFavorite={toggleFavorite} 
                  favorites={favorites} 
                  dining={dining}
                  onOpenPartnerModal={openPartnerModal}
                />
              )}
              {view === 'profile' && (
                <HubView 
                  theme={theme} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                  stats={stats} 
                  setStats={setStats} 
                  setSelectedItem={setSelectedItem} 
                  setView={setView} 
                  dining={dining} 
                  setActiveTool={setActiveTool} 
                  user={user} 
                  handleLogin={handleLogin} 
                  handleLogout={handleLogout} 
                  vibeTags={vibeTags} 
                  setVibeTags={setVibeTags} 
                  onOpenPartnerModal={openPartnerModal}
                  onOpenContributorModal={openContributorModal}
                  onOpenParksModal={openParksModal}
                  onOpenShopsModal={openShopsModal}
                  onSelectShop={handleShopSelect}
                />
              )}
               
              {view === 'fun' && (
                <div className="space-y-12 animate-fade w-full">
                   <div className="text-center px-4">
                     <h1 className={`text-2xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>A2 Happenings</h1>
                   </div>

                   {(() => {
                     const featuredHappenings = (itineraries || []).filter(e => e.isFeatured);
                     const displayFeatured = featuredHappenings.length > 0 ? featuredHappenings.slice(0, 5) : (itineraries || []).slice(0, 5);
                     return (
                       <div className="px-1 w-full">
                         <div className="flex items-center gap-2 mb-4 px-2">
                           <Zap size={18} className="text-[#b45309] dark:text-[#ffcb05]" />
                           <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Featured Events</h2>
                         </div>
                         <div className="flex overflow-x-auto gap-4 px-1 pb-4 no-scrollbar snap-x snap-mandatory">
                           {displayFeatured.map(exp => (
                             <div key={`feat-${exp.id}`} onClick={()=>setSelectedItem(exp)} className={`min-w-[280px] h-48 ${theme.card} rounded-[32px] border ${theme.border} overflow-hidden shadow-lg snap-center relative group cursor-pointer flex-shrink-0`}>
                               {exp.img && <img src={exp.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />}
                               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                               <div className="absolute bottom-4 left-4 right-4 text-white">
                                 <span className="bg-[#38bdf8] text-black px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest inline-block mb-2 shadow-sm">Top Pick</span>
                                 <h3 className="font-bold text-lg uppercase tracking-tight truncate drop-shadow-md">{exp.name}</h3>
                                 {exp.date && <p className="text-[10px] font-bold text-[#ffcb05] mt-0.5 truncate">{exp.date}</p>}
                                 <span className="text-[10px] font-black text-[#38bdf8] uppercase tracking-[0.2em] mt-1 block truncate">
                                   {Array.isArray(exp.category) ? exp.category.join(' • ') : exp.category}
                                 </span>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     );
                   })()}

                   <div className="text-center px-4">
                     <div className="flex overflow-x-auto gap-3 mt-6 mb-2 no-scrollbar px-1">
                        {MONTHS_EXP.map((m) => (
                           <button key={m} onClick={() => setActiveMonth(m)} className={`px-5 py-2.5 rounded-full border whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${activeMonth === m ? 'bg-[#ffcb05] border-[#ffcb05] text-black shadow-lg scale-105' : (theme.isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200')}`}>{m}</button>
                        ))}
                     </div>
                     <div className="flex overflow-x-auto gap-3 mb-2 no-scrollbar px-1">
                       {CATEGORIES_EXP.map((cat) => (
                         <button key={cat} onClick={() => setActiveExpCat(cat)} className={`px-5 py-2.5 rounded-full border whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${activeExpCat === cat ? 'bg-[#38bdf8] border-[#38bdf8] text-black shadow-lg scale-105' : (theme.isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200')}`}>{cat}</button>
                       ))}
                     </div>
                   </div>
                   
                   <div className="space-y-4 px-1 pt-4 w-full">
                      {shuffledExp && shuffledExp.length > 0 ? (
                        <>
                          {shuffledExp.slice(0, activeExpCat === 'All' && activeMonth === 'All Months' ? visibleCount : shuffledExp.length).map(exp => (
                            <div key={exp.id} onClick={()=>setSelectedItem(exp)} className={`${theme.card} flex flex-col sm:flex-row rounded-[32px] border ${theme.border} overflow-hidden cursor-pointer shadow-md relative group active:scale-[0.99] transition-transform`}>
                                <div className="sm:w-36 h-40 sm:h-auto relative flex-shrink-0">
                                  {exp.img ? <img src={exp.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="" /> : <div className={`w-full h-full ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-center`}><Building size={28} className="opacity-30" /></div>}
                                  {exp.price && <span className="absolute bottom-3 left-3 sm:hidden bg-black/70 backdrop-blur-md text-[#ffcb05] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">{exp.price}</span>}
                                </div>
                                 
                                <div className="flex-1 p-5 flex flex-col justify-between text-left space-y-3">
                                   <div>
                                     <div className="flex justify-between items-start gap-2">
                                       <h4 className={`font-bold uppercase text-sm leading-tight ${theme.text} line-clamp-1 tracking-tight`}>{exp.name}</h4>
                                       <div className="flex items-center gap-1">
                                         <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(exp);}} className={`p-2 rounded-full transition-all duration-300 ${(favorites || []).some(f => f.id === exp.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : theme.secondaryText}`}>
                                           <Heart size={16} fill={(favorites || []).some(f => f.id === exp.id) ? "currentColor" : "none"} />
                                         </button>
                                       </div>
                                     </div>

                                     {exp.date && (
                                       <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0284c7] dark:text-[#38bdf8] mt-1">
                                         <Calendar size={13} />
                                         <span>{exp.date}</span>
                                       </div>
                                     )}

                                     {exp.time && (
                                       <div className={`flex items-center gap-1.5 text-[10px] font-medium ${theme.secondaryText} mt-0.5`}>
                                         <Clock size={12} />
                                         <span>{exp.time}</span>
                                       </div>
                                     )}

                                     {exp.address && (
                                       <div className={`flex items-center gap-1.5 text-[10px] ${theme.secondaryText} mt-0.5 truncate`}>
                                         <MapPin size={12} className="flex-shrink-0" />
                                         <span className="truncate">{exp.address}</span>
                                       </div>
                                     )}
                                   </div>

                                   <div className={`flex items-center justify-between pt-2 border-t ${theme.border}`}>
                                     <span className="text-[10px] font-black uppercase text-[#b45309] dark:text-[#ffcb05] hidden sm:inline-block">{exp.price || 'Free'}</span>
                                     <span className="text-[9px] font-black text-[#0284c7] dark:text-[#38bdf8] uppercase tracking-[0.2em]">
                                       {Array.isArray(exp.category) ? exp.category[0] : exp.category}
                                     </span>
                                     <button onClick={(e) => { e.stopPropagation(); setSelectedItem(exp); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase px-4 py-2 rounded-xl shadow-md active:scale-95 transition-all">Details</button>
                                   </div>
                                </div>
                            </div>
                          ))}
                          {activeExpCat === 'All' && activeMonth === 'All Months' && visibleCount < (shuffledExp.length || 0) && (
                            <button onClick={() => setVisibleCount(p => p + 6)} className="w-full py-5 bg-[#00274c] text-[#ffcb05] rounded-[24px] font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all mt-4 border border-[#ffcb05]/20">Load More Events</button>
                          )}

                          <div className="pt-6 space-y-3.5">
                            <div className="mx-1 p-5 rounded-[32px] bg-gradient-to-r from-[#064e3b] via-[#043e2e] to-[#022c22] border border-emerald-500/30 flex items-center justify-between shadow-xl">
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest block">Explore Tree Town</span>
                                <h4 className="text-base font-header font-black uppercase text-white tracking-tight">Ann Arbor Park Finder</h4>
                                <p className="text-[11px] text-emerald-100/80">Explore riverfront preserves, nature trails, dog-friendly paths, and playgrounds.</p>
                              </div>
                              <button
                                onClick={openParksModal}
                                className="p-3.5 bg-emerald-400 text-black rounded-2xl font-black text-xs uppercase shadow-md active:scale-90 transition-all flex items-center justify-center flex-shrink-0 ml-3"
                                title="Open Park Finder"
                              >
                                <Trees size={18} />
                              </button>
                            </div>

                            <div className="mx-1 p-5 rounded-[32px] bg-gradient-to-r from-[#00274c] via-[#051a34] to-[#0a121e] border border-[#38bdf8]/30 flex items-center justify-between shadow-xl">
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase text-[#38bdf8] tracking-widest block">Live Events & Gatherings</span>
                                <h4 className="text-base font-header font-black uppercase text-white tracking-tight">Add Your Happening or Event</h4>
                                <p className="text-[11px] text-slate-300">Submit your concert, workshop, meetup, or festival to the community schedule.</p>
                              </div>
                              <button
                                onClick={() => openPartnerModal('general')}
                                className="p-3.5 bg-[#38bdf8] text-black rounded-2xl font-black text-xs uppercase shadow-md active:scale-90 transition-all flex items-center justify-center flex-shrink-0 ml-3"
                                title="Add your event"
                              >
                                <Calendar size={18} />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`py-20 text-center opacity-40 text-sm italic ${theme.secondaryText}`}>No events found for this filter combination.</div>
                          <div className="pt-4 space-y-3.5">
                            <div className="mx-1 p-5 rounded-[32px] bg-gradient-to-r from-[#064e3b] via-[#043e2e] to-[#022c22] border border-emerald-500/30 flex items-center justify-between shadow-xl">
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest block">Explore Tree Town</span>
                                <h4 className="text-base font-header font-black uppercase text-white tracking-tight">Ann Arbor Park Finder</h4>
                                <p className="text-[11px] text-emerald-100/80">Explore riverfront preserves, nature trails, dog-friendly paths, and playgrounds.</p>
                              </div>
                              <button
                                onClick={openParksModal}
                                className="p-3.5 bg-emerald-400 text-black rounded-2xl font-black text-xs uppercase shadow-md active:scale-90 transition-all flex items-center justify-center flex-shrink-0 ml-3"
                                title="Open Park Finder"
                              >
                                <Trees size={18} />
                              </button>
                            </div>

                            <div className="mx-1 p-5 rounded-[32px] bg-gradient-to-r from-[#00274c] via-[#051a34] to-[#0a121e] border border-[#38bdf8]/30 flex items-center justify-between shadow-xl">
                              <div className="space-y-1 text-left">
                                <span className="text-[9px] font-black uppercase text-[#38bdf8] tracking-widest block">Live Events & Gatherings</span>
                                <h4 className="text-base font-header font-black uppercase text-white tracking-tight">Add Your Happening or Event</h4>
                                <p className="text-[11px] text-slate-300">Submit your concert, workshop, meetup, or festival to the community schedule.</p>
                              </div>
                              <button
                                onClick={() => openPartnerModal('general')}
                                className="p-3.5 bg-[#38bdf8] text-black rounded-2xl font-black text-xs uppercase shadow-md active:scale-90 transition-all flex items-center justify-center flex-shrink-0 ml-3"
                                title="Add your event"
                              >
                                <Calendar size={18} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                   </div>
                </div>
              )}
            </>
          )}
        </main>

        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-[60] ${theme.card}/95 backdrop-blur-xl border-t ${theme.border} px-4 py-8 flex justify-around shadow-2xl rounded-t-[40px] font-sans`}>
          {[
            { id: 'home', icon: Building, label: 'Insider', color: '#ffcb05' }, 
            { id: 'fun', icon: Sparkles, label: 'Happenings', color: '#38bdf8' }, 
            { id: 'journal', icon: BookText, label: 'Guide', color: '#a855f7' }, 
            { id: 'flavors', icon: Utensils, label: 'Flavors', color: '#f97316' }, 
            { id: 'profile', icon: User, label: 'My Vibe', color: '#10b981' }
          ].map(v => {
            const isActive = !activeTool && view === v.id;
            return (
              <button key={v.id} onClick={() => { setActiveTool(null); setView(v.id); }} className={`flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100'}`} style={{ color: isActive ? v.color : (theme.isDark ? '#94a3b8' : '#334155') }}>
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
        .bg-\\[\\#0a121e\\] .wp-content, .bg-\\[\\#0a121e\\] .wp-content p { color: #f1f5f9 !important; }
      `}} />
    </div>
  );
}
