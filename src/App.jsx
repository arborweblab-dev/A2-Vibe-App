// src/App.jsx
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { app } from './firebase'; // Adjust path if needed

const auth = getAuth(app);
const db = getFirestore(app);

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building, Utensils, Ticket, Sparkles, Zap, Droplets, X, 
  ChevronLeft, ChevronRight, BookText, User, Heart, 
  Calculator, Thermometer, MapPin, Camera, Navigation, Sun, Moon,
  Clock, Compass, Search, Dice5, HelpCircle, Award, Users, Plus, Trash2, RotateCcw, MessageSquare,
  Share2, Calendar, QrCode, CheckCircle2, ArrowRight, ExternalLink, Store, FileText, UploadCloud,
  PenTool, ShieldCheck, MessageCircle, Send, Trees
} from 'lucide-react';

// --- 1. IMPORT LOCAL DATA ---
import { journalData } from './data/journalData';
import { eatsData } from './data/eatsData';
import { happeningsData } from './data/happeningsData';

// --- CURATED PARKS & NATURE PRESERVES DATA ---
const PARKS_DATA = [
  {
    id: 'park-arb',
    name: 'Nichols Arboretum',
    title: 'Nichols Arboretum',
    type: 'park',
    category: 'Nature & Arb',
    address: '1610 Washington Hts, Ann Arbor, MI',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Iconic 123-acre river valley featuring the Peony Garden, river trails, and historic tree collections.',
    longDesc: '<p>Beloved by locals as "The Arb," this historic reserve along the Huron River offers miles of gravel pathways, panoramic hillside vistas, glacial topography, and the world-renowned Nichols Arboretum Peony Garden.</p>'
  },
  {
    id: 'park-gallup',
    name: 'Gallup Park & Canoe Livery',
    title: 'Gallup Park & Canoe Livery',
    type: 'park',
    category: 'Riverfront & Trails',
    address: '3000 Fuller Rd, Ann Arbor, MI',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Scenic 69-acre park winding along the Huron River with pedestrian bridges, boat launches, and trails.',
    longDesc: '<p>Gallup Park is Ann Arbor’s premier riverfront escape. Features 3 miles of paved trails traversing small islands, wooden footbridges, picnic pavilions, wildlife viewing spots, and seasonal kayak and canoe rentals.</p>'
  },
  {
    id: 'park-bird-hills',
    name: 'Bird Hills Nature Area',
    title: 'Bird Hills Nature Area',
    type: 'park',
    category: 'Woodland Preserve',
    address: 'Newport Rd & Bird Rd, Ann Arbor, MI',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Ann Arbor’s largest city nature park with 146 acres of quiet dirt trails under dense hardwood canopy.',
    longDesc: '<p>A sanctuary for trail runners and bird watchers, Bird Hills is an untouched forested refuge featuring rugged terrain, deep ravines, and native oak and maple groves without bikes or motorized access.</p>'
  },
  {
    id: 'park-matthaei',
    name: 'Matthaei Botanical Gardens',
    title: 'Matthaei Botanical Gardens',
    type: 'park',
    category: 'Botanic Garden',
    address: '1800 N Dixboro Rd, Ann Arbor, MI',
    img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Sprawling conservatories, display gardens, wetlands, and peaceful nature loops on Dixboro Road.',
    longDesc: '<p>Features a 10,000+ square foot tropical and desert conservatory surrounded by outdoor display beds, bonsai gardens, boardwalk trails over Fleming Creek, and sweeping wildflower habitats.</p>'
  },
  {
    id: 'park-barton',
    name: 'Barton Nature Area',
    title: 'Barton Nature Area',
    type: 'park',
    category: 'Wetland & River',
    address: 'Huron River Dr, Ann Arbor, MI',
    img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Quiet 102-acre natural area bordered by Barton Pond and the Huron River with boardwalk passages.',
    longDesc: '<p>Located just northwest of downtown, Barton Nature Area features scenic river overlooks, rich marshlands, and walking connections through foot bridges to Huron River Drive and Foster Bridge.</p>'
  },
  {
    id: 'park-bandemer',
    name: 'Bandemer Park',
    title: 'Bandemer Park',
    type: 'park',
    category: 'Waterfront & Disc Golf',
    address: '1352 Lakeshore Dr, Ann Arbor, MI',
    img: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Waterfront park featuring boardwalks along Argo Pond, a 9-hole disc golf course, and dirt bike jumps.',
    longDesc: '<p>Bordering the west side of Argo Pond, Bandemer offers docks for crew shells and canoes, a shaded disc golf run, accessibility to the B2B Trail, and panoramic views of the water.</p>'
  }
];

// --- STRIPE PAYMENT LINKS CONFIGURATION ---
const STRIPE_LINKS = {
  boostedAnnual: 'https://buy.stripe.com/5kQ6oH3POdsjgNX30YeME02',
  boostedMonthly: 'https://buy.stripe.com/bJe9ATbigag769j30YeME03',
  restaurantFeaturedPickAddon: 'https://buy.stripe.com/3cI4gz1HGgEv69j0SQeME04',
  promoJournal: 'https://buy.stripe.com/28EeVd1HG4VNdBL8lieME05',
  promoSMSocial: 'https://buy.stripe.com/28E8wP9a85ZR7dn8lieME06'
};

// --- 2. CONFIGURATION ---
const THEMES = {
  light: { primary: '#00274c', windowBg: 'bg-slate-200', appBg: 'bg-slate-50', card: 'bg-white', text: 'text-slate-900', secondaryText: 'text-slate-600', border: 'border-slate-200', isDark: false },
  dark: { primary: '#ffcb05', windowBg: 'bg-[#050b14]', appBg: 'bg-[#0a121e]', card: 'bg-[#151f2e]', text: 'text-slate-100', secondaryText: 'text-slate-400', border: 'border-slate-800', isDark: true }
};

const CATEGORIES_JOURNAL = ['All', 'City Life', 'Local Secrets', 'Arts & Culture', 'Dining Reviews', 'Community Reports', 'Events', 'Meetups'];
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

// --- Helpers ---
const handleShare = async (item, e) => {
  if (e) e.stopPropagation();
  const shareData = item.share || {
    title: `${item.name || item.title} on A2 Vibe`,
    text: `Check out ${item.name || item.title} on A2 Vibe!`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // User cancelled share dialog
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  }
};

// --- PARKS & NATURE PRESERVES MODAL ---
const ParksDirectoryModal = ({ isOpen, onClose, theme, setSelectedItem, toggleFavorite, favorites }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[36px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Trees size={20} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.2em] block">Green Spaces</span>
              <h3 className="text-xl font-header font-black uppercase italic tracking-tight" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>Parks & Preserves</h3>
            </div>
          </div>
          <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className={`text-xs ${theme.secondaryText} leading-relaxed`}>
            Escape into Tree Town’s pristine river valleys, nature preserves, and wooded canopies. Save spots directly to your Vibe profile.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-1">
            {PARKS_DATA.map((park) => {
              const isFavorited = (favorites || []).some(f => f.id === park.id && f.type === 'park');
              return (
                <div 
                  key={park.id}
                  onClick={() => { onClose(); setSelectedItem(park); }}
                  className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-4 cursor-pointer relative shadow-sm hover:border-emerald-500/40 active:scale-[0.99] transition-all`}
                >
                  <img src={park.img} alt={park.name} className="w-20 h-20 rounded-2xl object-cover shadow-inner flex-shrink-0" />
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md truncate">
                        {park.category}
                      </span>
                    </div>
                    <h4 className={`font-bold text-sm uppercase tracking-tight truncate mt-1 ${theme.text}`}>{park.name}</h4>
                    <p className={`text-xs mt-1 line-clamp-1 ${theme.secondaryText}`}>{park.shortDesc}</p>
                    <div className={`flex items-center gap-1.5 text-[10px] mt-1.5 ${theme.secondaryText} truncate`}>
                      <MapPin size={11} className="flex-shrink-0 text-[#b45309] dark:text-[#ffcb05]" />
                      <span className="truncate">{park.address}</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(park); }}
                    className={`p-2.5 rounded-full flex-shrink-0 backdrop-blur-md transition-transform active:scale-90 ${isFavorited ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : (theme.isDark ? 'bg-black/20 text-slate-400' : 'bg-black/5 text-slate-600')}`}
                    title="Add to My Vibe"
                  >
                    <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PARTNER LISTING MODAL ---
const PartnerListingModal = ({ isOpen, onClose, theme, user, initialCategory = 'restaurant' }) => {
  const [listingCategory, setListingCategory] = useState(initialCategory);
  const [bizType, setBizType] = useState('free');
  const [bizName, setBizName] = useState('');
  const [bizContact, setBizContact] = useState('');
  const [bizAddress, setBizAddress] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [agreedQR, setAgreedQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setListingCategory(initialCategory);
      setSubmitted(false);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const handleFreeSubmit = async (e) => {
    e.preventDefault();
    if (!agreedQR) {
      return alert(
        listingCategory === 'restaurant'
          ? "Please confirm you will display the A2 Vibe QR placard at your host stand / counter and front window."
          : "Please confirm you will display the A2 Vibe QR placard at your checkout counter, entry door, or venue desk."
      );
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'partner_submissions'), {
        listingCategory,
        bizName,
        bizContact,
        bizAddress,
        cuisine: listingCategory === 'restaurant' ? cuisine : null,
        menuUrl: listingCategory === 'restaurant' ? menuUrl : null,
        type: 'free_qr_partner',
        userEmail: user?.email || 'unauthenticated',
        userId: user?.uid || null,
        status: 'pending_review',
        timestamp: Date.now()
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error saving listing submission:", err);
      alert("Could not submit. Please check your network connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const openStripeCheckout = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <div>
            <span className="text-[10px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] tracking-[0.2em] block">Partner With A2 Vibe</span>
            <h3 className="text-xl font-header font-black uppercase italic tracking-tight" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>Add Your Listing</h3>
          </div>
          <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className={`grid grid-cols-2 p-1 rounded-2xl ${theme.isDark ? 'bg-black/30 border border-white/10' : 'bg-slate-100 border border-slate-200'} text-center`}>
            <button
              onClick={() => { setListingCategory('restaurant'); setSubmitted(false); }}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${listingCategory === 'restaurant' ? 'bg-[#f97316] text-white shadow-md' : (theme.isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              <Utensils size={14} />
              <span>Restaurant / Bar</span>
            </button>
            <button
              onClick={() => { setListingCategory('general'); setSubmitted(false); }}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${listingCategory === 'general' ? 'bg-[#38bdf8] text-black shadow-md' : (theme.isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              <Calendar size={14} />
              <span>Event / Experience</span>
            </button>
          </div>

          <div className={`grid grid-cols-2 p-1 rounded-2xl ${theme.isDark ? 'bg-black/20 border border-white/5' : 'bg-slate-100 border border-slate-200'} text-center`}>
            <button
              onClick={() => setBizType('free')}
              className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${bizType === 'free' ? 'bg-[#ffcb05] text-black shadow-md' : (theme.isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              Free QR Partner
            </button>
            <button
              onClick={() => setBizType('boosted')}
              className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${bizType === 'boosted' ? (theme.isDark ? 'bg-white/15 text-white shadow-md' : 'bg-slate-800 text-white shadow-md') : (theme.isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              Boosted Showcase
            </button>
          </div>

          {bizType === 'free' ? (
            <div>
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fade">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className={`text-lg font-black uppercase ${theme.text}`}>Listing Request Received</h4>
                  <p className={`text-xs ${theme.secondaryText} leading-relaxed max-w-sm mx-auto`}>
                    We will review your submission and email your physical or printable A2 Vibe QR badge for your checkout counter, host stand, and front door/window within 24-48 hours.
                  </p>
                  <button onClick={onClose} className="mt-4 px-6 py-3 bg-[#ffcb05] text-black rounded-xl font-black uppercase text-xs">
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFreeSubmit} className="space-y-4">
                  <div className={`p-4 rounded-2xl ${theme.isDark ? 'bg-black/20 border border-white/5' : 'bg-slate-100 border border-slate-200'} space-y-2`}>
                    <div className="flex items-center gap-2 text-[#b45309] dark:text-[#ffcb05]">
                      <QrCode size={18} />
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        {listingCategory === 'restaurant' ? 'Restaurant & Bar QR Placement' : 'Event & Experience QR Placement'}
                      </h4>
                    </div>
                    <p className={`text-[11px] ${theme.secondaryText} leading-relaxed`}>
                      {listingCategory === 'restaurant'
                        ? 'Get a verified listing in Ann Arbor Flavors in exchange for placing our compact A2 Vibe QR code badge at your host stand or checkout counter, and on your entry door or front window.'
                        : 'Get a verified listing in Ann Arbor Happenings and the city database in exchange for placing an A2 Vibe QR code badge at your ticket desk, venue door, or counter.'}
                    </p>
                  </div>

                  <div>
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>
                      {listingCategory === 'restaurant' ? 'Restaurant / Bar Name' : 'Event / Experience / Venue Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      placeholder={listingCategory === 'restaurant' ? 'e.g. Tree Town Smokehouse' : 'e.g. Ann Arbor Indie Film Night'}
                      className={`w-full p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05]`}
                    />
                  </div>

                  {listingCategory === 'restaurant' && (
                    <div>
                      <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Cuisine Type</label>
                      <input
                        type="text"
                        required
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        placeholder="e.g. Korean Street Food, Craft Cocktails, Neapolitan Pizza"
                        className={`w-full p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05]`}
                      />
                    </div>
                  )}

                  <div>
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Contact Email or Phone</label>
                    <input
                      type="text"
                      required
                      value={bizContact}
                      onChange={(e) => setBizContact(e.target.value)}
                      placeholder="e.g. organizer@annarborvibe.com"
                      className={`w-full p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05]`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Location / Venue Address</label>
                    <input
                      type="text"
                      required
                      value={bizAddress}
                      onChange={(e) => setBizAddress(e.target.value)}
                      placeholder="e.g. 209 S 4th Ave, Ann Arbor, MI"
                      className={`w-full p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05]`}
                    />
                  </div>

                  <label className={`flex items-start gap-3 p-3 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'} border cursor-pointer`}>
                    <input
                      type="checkbox"
                      checked={agreedQR}
                      onChange={(e) => setAgreedQR(e.target.checked)}
                      className="mt-0.5 rounded accent-[#ffcb05]"
                    />
                    <span className={`text-[11px] ${theme.isDark ? 'text-slate-300' : 'text-slate-700'} leading-snug`}>
                      {listingCategory === 'restaurant'
                        ? 'I agree to display the small A2 Vibe QR code badge at our counter or host stand and on our front door/window.'
                        : 'I agree to display the small A2 Vibe event QR code badge at our check-in desk, entry door, or counter.'}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#ffcb05] text-black rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all"
                  >
                    {submitting ? 'Submitting...' : 'Claim Free Partner Listing'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#00274c] to-[#0a1b30] border border-[#ffcb05]/30 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#ffcb05] text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {listingCategory === 'restaurant' ? 'Dining Premiere' : 'Featured Event Showcase'}
                  </span>
                  {listingCategory === 'restaurant' && (
                    <span className="text-[10px] font-bold text-[#38bdf8] flex items-center gap-1">
                      <FileText size={12} /> Menu Upload Enabled
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-header font-black uppercase italic">
                  {listingCategory === 'restaurant' ? 'Boosted Eatery & Bar Showcase' : 'Boosted Happenings Showcase'}
                </h4>

                <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">✓ <strong>Up to 20 HD Photos</strong> (Dishes, venue, crowd)</li>
                  <li className="flex items-center gap-2">✓ <strong>Longer Description & Story</strong> with direct ticket or reservation links</li>
                  {listingCategory === 'restaurant' && (
                    <li className="flex items-center gap-2">✓ <strong>Optional Menu Upload / PDF Link</strong> on profile</li>
                  )}
                  <li className="flex items-center gap-2">✓ <strong>Dedicated Feature Article</strong> in City Journal</li>
                  <li className="flex items-center gap-2">✓ <strong>Social Media Post Promos</strong> across our channels</li>
                </ul>
              </div>

              {listingCategory === 'restaurant' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#f97316]/20 via-[#f97316]/10 to-transparent border border-[#f97316]/30 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} className="text-[#b45309] dark:text-[#ffcb05]" />
                      <span className={`text-xs font-black uppercase ${theme.isDark ? 'text-white' : 'text-slate-900'}`}>Discounted Featured Pick</span>
                      <span className="bg-[#f97316] text-white dark:text-black text-[8px] font-black px-1.5 py-0.5 rounded">SAVE $40</span>
                    </div>
                    <p className={`text-[11px] ${theme.isDark ? 'text-slate-300' : 'text-slate-600'} mt-1`}>
                      Top-of-app billboard spot on Home & Flavors. <strong className="text-[#b45309] dark:text-[#ffcb05]">$50</strong> <span className={`line-through ${theme.isDark ? 'text-slate-500' : 'text-slate-400'} text-[10px]` }>(Normally $90)</span>
                    </p>
                  </div>
                  <button
                    onClick={() => openStripeCheckout(STRIPE_LINKS.restaurantFeaturedPickAddon)}
                    className="px-3.5 py-2 bg-[#f97316] text-white dark:text-black text-xs font-black uppercase rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1 flex-shrink-0"
                  >
                    <span>$50 Pick</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} flex items-center justify-between gap-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black uppercase ${theme.text}`}>Annual Membership</span>
                      <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black px-2 py-0.5 rounded">SAVE $120</span>
                    </div>
                    <p className="text-xs font-bold text-[#b45309] dark:text-[#ffcb05] mt-1">$25 / mo <span className={`${theme.secondaryText} font-normal`}>($300 billed yearly)</span></p>
                  </div>
                  <button
                    onClick={() => openStripeCheckout(STRIPE_LINKS.boostedAnnual)}
                    className="px-4 py-2.5 bg-[#ffcb05] text-black text-xs font-black uppercase rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Select</span>
                    <ExternalLink size={14} />
                  </button>
                </div>

                <div className={`p-4 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/20' : 'bg-slate-100'} flex items-center justify-between gap-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black uppercase ${theme.text}`}>Intro Monthly Plan</span>
                      <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black px-2 py-0.5 rounded">SAVE $300 Y1</span>
                    </div>
                    <p className="text-xs font-bold text-[#0284c7] dark:text-[#38bdf8] mt-1">$35 / mo <span className={`${theme.secondaryText} font-normal`}>first 12 mos, then $60/mo</span></p>
                  </div>
                  <button
                    onClick={() => openStripeCheckout(STRIPE_LINKS.boostedMonthly)}
                    className="px-4 py-2.5 bg-[#38bdf8] text-black text-xs font-black uppercase rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Select</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Standalone Promos</p>
                <div className="grid grid-cols-1 gap-2.5">
                  <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-between`}>
                    <div>
                      <p className={`text-xs font-bold ${theme.text}`}>City Journal Feature Story</p>
                      <p className={`text-[10px] ${theme.secondaryText}`}>Permanent published culinary, brand, or event editorial</p>
                    </div>
                    <button
                      onClick={() => openStripeCheckout(STRIPE_LINKS.promoJournal)}
                      className={`px-3 py-1.5 ${theme.isDark ? 'bg-white/10 hover:bg-white/20 text-[#ffcb05] border-white/10' : 'bg-white hover:bg-slate-200 text-[#b45309] border-slate-300'} text-[11px] font-black rounded-lg border`}
                    >
                      $45
                    </button>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-between`}>
                    <div>
                      <p className={`text-xs font-bold ${theme.text}`}>Social Media Blast</p>
                      <p className={`text-[10px] ${theme.secondaryText}`}>Spotlight story & grid post to local audience</p>
                    </div>
                    <button
                      onClick={() => openStripeCheckout(STRIPE_LINKS.promoSMSocial)}
                      className={`px-3 py-1.5 ${theme.isDark ? 'bg-white/10 hover:bg-white/20 text-[#38bdf8] border-white/10' : 'bg-white hover:bg-slate-200 text-[#0284c7] border-slate-300'} text-[11px] font-black rounded-lg border`}
                    >
                      $25
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMMUNITY CONTRIBUTOR STORY SUBMISSION MODAL ---
const ContributorSubmissionModal = ({ isOpen, onClose, theme, user, onPostSuccess }) => {
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('Local News');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState(user?.displayName || '');
  const [authorContact, setAuthorContact] = useState(user?.email || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setAuthorName(user.displayName || '');
      setAuthorContact(user.email || '');
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert('Please enter a headline and story content.');
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'community_stories'), {
        title: title.trim(),
        channel,
        content: content.trim(),
        author: authorName.trim() || 'A2 Resident',
        contact: authorContact.trim() || 'Unlisted',
        userId: user?.uid || null,
        likes: 0,
        timestamp: Date.now()
      });
      setSubmitted(true);
      if (onPostSuccess) onPostSuccess();
    } catch (err) {
      console.error('Error submitting community post:', err);
      alert('Could not submit. Please check your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[36px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <div>
            <span className="text-[10px] font-black uppercase text-[#a855f7] tracking-[0.2em] block">Community Voice</span>
            <h3 className="text-xl font-header font-black uppercase italic tracking-tight" style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>Submit Local Story</h3>
          </div>
          <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fade">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className={`text-lg font-black uppercase ${theme.text}`}>Story Published To Community</h4>
              <p className={`text-xs ${theme.secondaryText} leading-relaxed max-w-sm mx-auto`}>
                Your post is now live on the A2 Vibe community board. Thanks for keeping Tree Town informed and connected.
              </p>
              <button onClick={onClose} className="mt-4 px-6 py-3 bg-[#ffcb05] text-black rounded-xl font-black uppercase text-xs shadow-md">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`p-4 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'} space-y-2 border`}>
                <div className="flex items-center gap-2 text-[#a855f7]">
                  <PenTool size={16} />
                  <h4 className="text-xs font-black uppercase tracking-wider">A2 Local Contributor Board</h4>
                </div>
                <p className={`text-[11px] ${theme.secondaryText} leading-relaxed`}>
                  Share news, stories, townie tips, club announcements, or independent journalism. Free, zero tracking, and closed within the Tree Town community.
                </p>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Channel / Topic</label>
                <div className="flex flex-wrap gap-2">
                  {FORUM_CHANNELS.filter(c => c !== 'All').map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setChannel(c)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${channel === c ? 'bg-[#a855f7] text-white border-[#a855f7]' : (theme.isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700')}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Headline</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Free Saturday Solar Eclipse Viewing at Nichols Arb"
                  className={`w-full p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05]`}
                />
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Story / Announcement Details</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening? Who is invited? Where, when, and why does it matter to Ann Arbor?"
                  className={`w-full p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs leading-relaxed outline-none focus:border-[#ffcb05]`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Author / Group Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Kerrytown Resident"
                    className={`w-full p-3 rounded-xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} block mb-1.5`}>Contact / Email (Optional)</label>
                  <input
                    type="text"
                    value={authorContact}
                    onChange={(e) => setAuthorContact(e.target.value)}
                    placeholder="contact@email.com"
                    className={`w-full p-3 rounded-xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#a855f7] text-white rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>{submitting ? 'Publishing...' : 'Publish to Community Board'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SPOTLIGHT DETAIL MODAL ---
const Modal = ({ isOpen, onClose, item, theme, toggleFavorite, favorites }) => {
  if (!isOpen || !item) return null;
  const isFavorited = (favorites || []).some(f => f.id === item.id && f.type === item.type);
  
  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 animate-fade text-left font-sans">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className={`${theme.card} relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border ${theme.border} animate-slide`}>
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 ${theme.appBg}/95 backdrop-blur-md border-b ${theme.border}`}>
          <h3 className={`text-lg font-header font-black uppercase italic tracking-tight pr-4 truncate`} style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>
            {item.name || item.title || 'Spotlight'}
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={(e) => handleShare(item, e)} className={`p-2.5 rounded-full transition-all duration-300 ${theme.isDark ? 'bg-white/5 text-slate-300 hover:text-white' : 'bg-black/5 text-slate-700 hover:text-black'} active:scale-90`} title="Share">
              <Share2 size={20} />
            </button>
            <button onClick={() => toggleFavorite(item)} className={`p-2.5 rounded-full transition-all duration-300 ${theme.isDark ? 'bg-white/5' : 'bg-black/5'} active:scale-90`}>
              <Heart size={22} className="text-[#ffcb05] drop-shadow-[0_0_8px_rgba(255,203,5,0.5)]" fill={isFavorited ? "#ffcb05" : "none"} strokeWidth={2.5}/>
            </button>
            <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}>
              <X size={22}/>
            </button>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {item.img && <img src={item.img} className="w-full h-64 object-cover rounded-[32px] shadow-lg" alt="" />}

          <div className="flex items-center gap-2 flex-wrap">
            {item.price && <div className="bg-[#ffcb05]/20 text-[#b45309] dark:text-[#ffcb05] px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide">{item.price}</div>}
            {item.cuisine && <div className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide">{item.cuisine}</div>}
            <div className={`${theme.isDark ? 'bg-[#00274c]/40 text-[#34a4b8]' : 'bg-sky-100 text-[#0284c7]'} px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest`}>
              {Array.isArray(item.category) ? item.category.join(' • ') : (item.category || item.neighborhood || 'City Guide')}
            </div>
            {item.month && (
               <div className="bg-[#a855f7]/20 text-purple-700 dark:text-[#a855f7] px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                 {item.month}
               </div>
            )}
          </div>

          {(item.date || item.time) && (
            <div className={`space-y-2 ${theme.isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'} p-4 rounded-2xl border`}>
              {item.date && (
                <div className={`flex items-center gap-2.5 text-xs font-bold ${theme.isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  <Calendar size={16} className="text-[#0284c7] dark:text-[#38bdf8] flex-shrink-0" />
                  <span>{item.date}</span>
                </div>
              )}
              {item.time && (
                <div className={`flex items-center gap-2.5 text-xs font-bold ${theme.isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  <Clock size={16} className="text-[#b45309] dark:text-[#ffcb05] flex-shrink-0" />
                  <span>{item.time}</span>
                </div>
              )}
            </div>
          )}

          {item.address && (
            <div className={`flex items-center gap-2.5 text-xs font-bold ${theme.isDark ? 'text-slate-400 bg-black/20 border-white/5' : 'text-slate-700 bg-slate-100 border-slate-200'} p-4 rounded-2xl border`}>
              <MapPin size={16} className="text-[#b45309] dark:text-[#ffcb05] flex-shrink-0" />
              <span className="leading-snug">{item.address}</span>
            </div>
          )}

          <div className={`text-base leading-relaxed wp-content ${theme.isDark ? 'text-slate-100' : 'text-slate-800'}`} 
            dangerouslySetInnerHTML={{ __html: item.longDesc || item.desc || item.excerpt || 'Accessing city database...' }} 
          />

          <div className="flex gap-3 pt-2">
            {item.share && (
              <button onClick={(e) => handleShare(item, e)} className={`flex-1 ${theme.isDark ? 'bg-white/10 hover:bg-white/20 text-white border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200'} font-black uppercase text-sm py-4 rounded-2xl border active:scale-95 transition-all flex items-center justify-center gap-2`}>
                <Share2 size={16} />
                <span>Share</span>
              </button>
            )}
            {item.url && (
              <button onClick={() => { window.open(item.url, '_blank'); }} className="flex-[2] bg-[#ffcb05] text-black font-black uppercase text-sm py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                <span>Visit Official Site</span>
                <Navigation size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
  </div>
  );
};

// --- FULLSCREEN TOOLS ---
const ToolFullScreenView = ({ type, onClose, theme, stats, setStats, dining, bucketList, setBucketList, user }) => {
  const [bill, setBill] = useState('');
  const [tipPerc, setTipPerc] = useState(20);
  const [weatherIdx, setWeatherIdx] = useState(new Date().getMonth());
  const [randomSpot, setRandomSpot] = useState(null);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newBucketText, setNewBucketText] = useState('');

  const [communityGems, setCommunityGems] = useState([]);
  const [newGemTitle, setNewGemTitle] = useState('');
  const [newGemDesc, setNewGemDesc] = useState('');

  const [leaderboard, setLeaderboard] = useState([]);

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

  const handleHydration = async (drinkType) => {
    const newStats = { ...stats, [drinkType]: (stats[drinkType] || 0) + 1 };
    setStats(newStats);
    if (user && drinkType === 'water') {
      await setDoc(doc(db, 'leaderboard', user.uid), {
        name: user.displayName || 'Local Drinker',
        water: newStats.water,
        lastUpdated: Date.now()
      }, { merge: true });
    }
  };

  const toggleBucketItem = (id) => setBucketList(bucketList.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const deleteBucketItem = (id, e) => { e.stopPropagation(); setBucketList(bucketList.filter(item => item.id !== id)); };
  const resetBucketList = () => setBucketList(DEFAULT_BUCKET_ITEMS);
  const addBucketItem = (e) => {
    e.preventDefault();
    if (!newBucketText.trim()) return;
    setBucketList([...bucketList, { id: Date.now(), text: newBucketText.trim(), done: false }]);
    setNewBucketText('');
  };

  const billVal = parseFloat(bill) || 0;
  const tipAmount = (billVal * (tipPerc / 100)).toFixed(2);
  const totalBill = (billVal + parseFloat(tipAmount)).toFixed(2);

  const POIs = [
    { name: "Michigan Stadium", type: "Landmark", color: "bg-[#00274c] text-white", desc: "The Big House. Essential Saturday destination." },
    { name: "Nichols Arboretum", type: "Nature", color: "bg-emerald-600 text-white", desc: "The 'Arb'. Perfect for riverside walks." },
    { name: "Main Street", type: "Social", color: "bg-[#ffcb05] text-black", desc: "The heart of dining and local shopping." },
    { name: "State Theatre", type: "Culture", color: "bg-purple-600 text-white", desc: "Historic cinema with a neon glow." },
    { name: "Kerrytown Market", type: "Local", color: "bg-orange-600 text-white", desc: "Artisan shops and the farmers market." },
    { name: "Law Quad", type: "Architecture", color: "bg-stone-600 text-white", desc: "Stunning Gothic-style university grounds." }
  ];

  const weatherData = [
    { month: "January", high: 31, low: 18, vibe: "bg-blue-800" }, { month: "February", high: 35, low: 20, vibe: "bg-blue-700" },
    { month: "March", high: 46, low: 28, vibe: "bg-cyan-700" }, { month: "April", high: 59, low: 38, vibe: "bg-teal-600" },
    { month: "May", high: 71, low: 49, vibe: "bg-emerald-600" }, { month: "June", high: 80, low: 59, vibe: "bg-yellow-500" },
    { month: "July", high: 84, low: 63, vibe: "bg-orange-500" }, { month: "August", high: 82, low: 61, vibe: "bg-red-500" },
    { month: "September", high: 75, low: 53, vibe: "bg-orange-600" }, { month: "October", high: 62, low: 42, vibe: "bg-amber-600" },
    { month: "November", high: 48, low: 32, vibe: "bg-slate-600" }, { month: "December", high: 36, low: 23, vibe: "bg-slate-800" }
  ];

  const currentW = weatherData[weatherIdx];

  const spinRandomizer = () => {
    if (!dining || dining.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dining.length);
    setRandomSpot(dining[randomIndex]);
  };

  const toolTitles = {
    hots: 'City Hot Spots', calc: 'Tip Calculator', weather: 'City Forecast', water: 'Stay Hydrated',
    randomizer: 'Weekend Pitcher / Randomizer', trivia: 'Tree Town Trivia', bucket: 'A2 Bucket List Passport', mystery: 'Mystery Spot',
    community: 'Community Gems'
  };

  return (
    <div className="animate-fade space-y-6 text-left relative z-10 pb-20 w-full flex flex-col font-sans">
      <div className={`sticky top-0 z-40 flex justify-between items-center py-4 px-4 ${theme.appBg} border-b ${theme.border} shadow-sm -mx-5 w-[calc(100%+40px)] mb-4`}>
        <h1 className={`text-xl font-header font-black uppercase italic tracking-tighter`} style={{ color: theme.isDark ? '#ffcb05' : '#d97706' }}>{toolTitles[type] || 'City Tool'}</h1>
        <button onClick={onClose} className={`p-2.5 rounded-full ${theme.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-slate-700'} backdrop-blur-sm transition-all active:scale-90`}><X size={22}/></button>
      </div>

      <div className="px-1 space-y-6 w-full pt-2">
        {type === 'hots' && (
          <div className="space-y-4">
            {POIs.map(p => (
              <div key={p.name} className={`p-5 rounded-[24px] border ${theme.border} ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} shadow-inner`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className={`font-bold ${theme.text}`}>{p.name}</h4>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${p.color}`}>{p.type}</span>
                </div>
                <p className={`text-xs ${theme.secondaryText} leading-relaxed`}>{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        {type === 'calc' && (
          <div className="space-y-8 max-w-md mx-auto w-full">
            <div className={`${theme.isDark ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-slate-200'} p-6 rounded-3xl border text-center`}>
               <p className={`text-[10px] font-black uppercase ${theme.secondaryText} mb-1 tracking-widest`}>Total with Tip</p>
               <h2 className={`text-5xl font-header font-black ${theme.text}`}>${totalBill}</h2>
               <div className="flex justify-center gap-4 mt-4 text-[#b45309] dark:text-[#ffcb05] font-bold text-sm"><span>Tip: ${tipAmount}</span></div>
            </div>
            <div className="space-y-4">
              <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0.00" className={`w-full p-5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border font-bold text-xl outline-none focus:border-[#ffcb05]`} />
              <div className="grid grid-cols-3 gap-2">
                {[18, 20, 25].map(p => (
                  <button key={p} onClick={() => setTipPerc(p)} className={`py-4 rounded-xl font-black text-xs transition-all ${tipPerc === p ? 'bg-[#ffcb05] text-black scale-105 shadow-lg shadow-yellow-500/20' : (theme.isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-200 text-slate-700')}`}>{p}%</button>
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
              <button onClick={() => setWeatherIdx(p => (p - 1 + 12) % 12)} className={`p-4 ${theme.isDark ? 'bg-white/5 text-white' : 'bg-slate-200 text-slate-800'} rounded-2xl active:scale-90 transition-all`}><ChevronLeft size={24}/></button>
              <span className={`font-header font-black uppercase text-[10px] tracking-widest ${theme.secondaryText}`}>A2 Calendar</span>
              <button onClick={() => setWeatherIdx(p => (p + 1) % 12)} className={`p-4 ${theme.isDark ? 'bg-white/5 text-white' : 'bg-slate-200 text-slate-800'} rounded-2xl active:scale-90 transition-all`}><ChevronRight size={24}/></button>
            </div>
          </div>
        )}

        {type === 'water' && (
          <div className="space-y-6 max-w-md mx-auto w-full">
             <div className="flex justify-around items-center text-center">
                <div>
                   <p className="text-4xl font-black text-blue-600 dark:text-blue-400">{stats.water || 0}</p>
                   <p className={`text-[10px] font-black uppercase ${theme.secondaryText} tracking-widest`}>Water</p>
                </div>
                <div>
                   <p className="text-4xl font-black text-[#b45309] dark:text-[#ffcb05]">{stats.drinks || 0}</p>
                   <p className={`text-[10px] font-black uppercase ${theme.secondaryText} tracking-widest`}>Beverages</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleHydration('water')} className="bg-blue-600 py-4 rounded-2xl text-white font-black uppercase text-xs shadow-lg shadow-blue-500/20">+ Water</button>
                <button onClick={() => handleHydration('drinks')} className="bg-[#ffcb05] py-4 rounded-2xl text-black font-black uppercase text-xs shadow-lg shadow-yellow-500/20">+ Drink</button>
             </div>
             <button onClick={() => setStats({...stats, water: 0, drinks: 0})} className={`w-full py-3 ${theme.isDark ? 'bg-white/5 text-slate-400 border-white/5' : 'bg-slate-200 text-slate-600 border-slate-300'} rounded-2xl font-black uppercase text-[10px] tracking-widest border active:scale-95 transition-all`}>Reset Hydration</button>

             <div className={`mt-8 p-5 rounded-[24px] border ${theme.border} ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'}`}>
                <h3 className="text-xs font-black uppercase text-[#b45309] dark:text-[#ffcb05] tracking-widest mb-4">Global A2 Hydration</h3>
                <div className="space-y-3">
                  {leaderboard.map((entry, i) => (
                    <div key={entry.id} className={`flex justify-between items-center ${theme.isDark ? 'bg-black/20' : 'bg-white'} p-3 rounded-xl shadow-sm`}>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 font-black text-xs">#{i + 1}</span>
                        <span className={`text-sm font-bold ${entry.id === user?.uid ? 'text-[#b45309] dark:text-[#ffcb05]' : theme.text}`}>{entry.name}</span>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 font-black flex items-center gap-1"><Droplets size={12}/> {entry.water}</span>
                    </div>
                  ))}
                  {leaderboard.length === 0 && <p className={`text-xs ${theme.secondaryText} text-center py-4`}>No logged drinkers yet!</p>}
                </div>
             </div>
          </div>
        )}

        {type === 'community' && (
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className={`p-5 rounded-[24px] border ${theme.border} ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'}`}>
              <h3 className="text-xs font-black uppercase text-[#b45309] dark:text-[#ffcb05] tracking-widest mb-3">Share a Local Gem</h3>
              <form onSubmit={handleAddGem} className="space-y-3">
                <input type="text" value={newGemTitle} onChange={e=>setNewGemTitle(e.target.value)} placeholder="Name of place or tip..." className={`w-full p-3 rounded-xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} border text-sm outline-none`} required />
                <textarea value={newGemDesc} onChange={e=>setNewGemDesc(e.target.value)} placeholder="Why is it awesome?" className={`w-full p-3 rounded-xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} border text-sm outline-none h-20`} required />
                <button type="submit" className="w-full py-3 bg-[#38bdf8] text-black rounded-xl font-black uppercase text-xs">Post to Community</button>
              </form>
            </div>

            <div className="space-y-4">
              {communityGems.map(gem => (
                <div key={gem.id} className={`p-4 rounded-[24px] border ${theme.border} ${theme.isDark ? 'bg-black/5' : 'bg-slate-100'}`}>
                  <h4 className={`font-bold ${theme.text}`}>{gem.title}</h4>
                  <p className={`text-xs ${theme.secondaryText} mt-1`}>{gem.desc}</p>
                  <p className="text-[9px] font-black uppercase text-[#0284c7] dark:text-[#38bdf8] tracking-widest mt-3">Spotted by {gem.author}</p>
                </div>
              ))}
              {communityGems.length === 0 && <p className={`text-xs ${theme.secondaryText} text-center py-4`}>No gems posted yet!</p>}
            </div>
          </div>
        )}

        {type === 'randomizer' && (
          <div className="space-y-6 text-center py-4 max-w-md mx-auto w-full">
            <p className={`text-xs ${theme.secondaryText}`}>Can't decide where to eat or hang out? Let the Weekend Pitcher pick your destination!</p>
            {randomSpot ? (
              <div className={`p-6 rounded-3xl ${theme.isDark ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-slate-200'} border space-y-3 animate-fade`}>
                <img src={randomSpot.img} className="w-full h-40 object-cover rounded-2xl shadow-md" alt="" />
                <h4 className={`text-lg font-black uppercase ${theme.text}`}>{randomSpot.title}</h4>
                <p className="text-xs text-[#b45309] dark:text-[#ffcb05] font-bold uppercase">{randomSpot.cuisine || randomSpot.neighborhood}</p>
                <p className={`text-xs ${theme.secondaryText}`}>{randomSpot.shortDesc}</p>
              </div>
            ) : (
              <div className={`p-10 border-2 border-dashed rounded-3xl opacity-40 text-xs font-bold uppercase ${theme.border}`}>Click roll to pick a spot!</div>
            )}
            <button onClick={spinRandomizer} className="w-full py-4 bg-[#ffcb05] text-black rounded-2xl font-black uppercase text-xs shadow-lg active:scale-95 transition-all">Roll the Dice 🎲</button>
          </div>
        )}

        {type === 'trivia' && (
          <div className="space-y-6 text-center py-4 max-w-md mx-auto w-full">
            <div className={`p-5 rounded-3xl ${theme.isDark ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-slate-200'} border space-y-3`}>
              <span className="bg-[#ffcb05] text-black px-3 py-1 rounded-lg text-[9px] font-black uppercase">Daily Challenge</span>
              <h4 className={`text-sm font-bold ${theme.text}`}>Which Ann Arbor building's courtyard is rumored to have inspired Hogwarts architecture?</h4>
            </div>
            <div className="space-y-2">
              {['U-M Law Quadrangle', 'Michigan Union', 'Angell Hall', 'Rackham Building'].map((opt) => {
                const isCorrect = opt === 'U-M Law Quadrangle';
                let btnStyle = theme.isDark ? 'bg-white/5 text-slate-300 border-white/5' : 'bg-slate-100 text-slate-800 border-slate-200';
                if (triviaAnswered) {
                  if (isCorrect) btnStyle = 'bg-emerald-600 text-white font-bold border-transparent';
                  else if (selectedAnswer === opt) btnStyle = 'bg-red-600 text-white font-bold border-transparent';
                }
                return (
                  <button key={opt} disabled={triviaAnswered} onClick={() => { setSelectedAnswer(opt); setTriviaAnswered(true); }} className={`w-full p-4 rounded-2xl text-xs font-bold transition-all border ${btnStyle}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {triviaAnswered && <p className="text-xs text-[#b45309] dark:text-[#ffcb05] font-bold uppercase animate-fade">Correct! The Gothic architecture of the Law Quad is a local legend.</p>}
          </div>
        )}

        {type === 'bucket' && (
          <div className="space-y-4 text-left py-2 max-w-md mx-auto w-full">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-black text-[#b45309] dark:text-[#ffcb05] bg-[#ffcb05]/10 px-3 py-1 rounded-xl">
                {bucketList.filter(i => i.done).length} / {bucketList.length} Done
              </span>
              <button onClick={resetBucketList} className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} hover:text-[#ffcb05] transition-colors`}><RotateCcw size={12} /> Reset List</button>
            </div>

            <form onSubmit={addBucketItem} className="flex gap-2">
              <input type="text" value={newBucketText} onChange={(e) => setNewBucketText(e.target.value)} placeholder="Add custom bucket list item..." className={`flex-1 p-3.5 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#ffcb05]`} />
              <button type="submit" className="bg-[#ffcb05] text-black px-5 rounded-2xl font-black text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center justify-center"><Plus size={18} /></button>
            </form>

            <div className="space-y-2 mt-2">
              {bucketList.length === 0 ? (
                <div className={`p-6 border-2 border-dashed rounded-3xl text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.border}`}>Your bucket list is empty. Add items above or reset!</div>
              ) : (
                bucketList.map(item => (
                  <div key={item.id} onClick={() => toggleBucketItem(item.id)} className={`p-3.5 rounded-2xl border ${theme.border} flex items-center justify-between gap-3 cursor-pointer transition-all ${item.done ? 'bg-emerald-500/10 border-emerald-500/30 opacity-70 line-through' : (theme.isDark ? 'bg-black/10' : 'bg-slate-100')}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 border-emerald-500 text-black font-black text-xs' : 'border-slate-500'}`}>{item.done ? '✓' : ''}</div>
                      <span className={`text-xs font-bold truncate ${theme.text}`}>{item.text}</span>
                    </div>
                    <button onClick={(e) => deleteBucketItem(item.id, e)} className={`${theme.secondaryText} hover:text-red-500 p-1.5 rounded-lg transition-colors flex-shrink-0`} title="Delete item"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {type === 'mystery' && (
          <div className="space-y-6 text-center py-4 max-w-md mx-auto w-full">
            <div className={`p-5 rounded-3xl ${theme.isDark ? 'bg-black/20 border-white/10' : 'bg-slate-100 border-slate-200'} border space-y-3`}>
              <span className="bg-[#0284c7] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase">Landmark ID</span>
              <img src="/images/law-quad.jpg" className="w-full h-36 object-cover rounded-2xl shadow-md" alt="" />
              <p className={`text-xs italic ${theme.secondaryText}`}>"Stunning stone gargoyles, quiet cloisters, and hidden carved faces..."</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#ffcb05]/20 text-[#b45309] dark:text-[#ffcb05] font-black text-xs uppercase tracking-widest">Spot: U-M Law Quadrangle</div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MY VIBE (HUB VIEW) ---
const HubView = ({ 
  theme, favorites, toggleFavorite, stats, setStats, setSelectedItem, 
  setView, dining, setActiveTool, user, handleLogin, handleLogout, 
  vibeTags, setVibeTags, onOpenPartnerModal, onOpenContributorModal, onOpenParksModal 
}) => {
  const [headerIdx, setHeaderIdx] = useState(0);
  const cycleHeader = () => setHeaderIdx(prev => (prev + 1) % SLIDE_IMAGES.length);
  const userFavorites = favorites || [];

  const eatsFavs = userFavorites.filter(f => f.type === 'dining' || f.cuisine);
  const happeningsFavs = userFavorites.filter(f => f.type === 'experience' || (f.name && !f.cuisine && f.type !== 'park'));
  const journalFavs = userFavorites.filter(f => f.type === 'journal' || f.excerpt || (f.title && !f.cuisine && f.type !== 'park'));
  const parksFavs = userFavorites.filter(f => f.type === 'park' || f.category?.toLowerCase().includes('preserve') || f.category?.toLowerCase().includes('arb'));

  // Community Forum State
  const [selectedForumChannel, setSelectedForumChannel] = useState('All');
  const [forumStories, setForumStories] = useState([]);
  const [forumPostTitle, setForumPostTitle] = useState('');
  const [forumPostContent, setForumPostContent] = useState('');
  const [forumPostChannel, setForumPostChannel] = useState('Community Chat');
  const [isPostingForum, setIsPostingForum] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'community_stories'), orderBy('timestamp', 'desc'), limit(30));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setForumStories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleCreateForumPost = async (e) => {
    e.preventDefault();
    if (!forumPostTitle.trim() || !forumPostContent.trim()) return alert('Please enter both a title and message.');
    setIsPostingForum(true);
    try {
      await addDoc(collection(db, 'community_stories'), {
        title: forumPostTitle.trim(),
        channel: forumPostChannel,
        content: forumPostContent.trim(),
        author: user?.displayName || 'A2 Neighbor',
        userId: user?.uid || null,
        likes: 0,
        timestamp: Date.now()
      });
      setForumPostTitle('');
      setForumPostContent('');
    } catch (err) {
      console.error('Error posting to forum:', err);
      alert('Could not publish. Please check your connection.');
    } finally {
      setIsPostingForum(false);
    }
  };

  const filteredStories = useMemo(() => {
    if (selectedForumChannel === 'All') return forumStories;
    return forumStories.filter(s => s.channel === selectedForumChannel);
  }, [forumStories, selectedForumChannel]);

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
                   {user && user.photoURL ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" /> : <MapPin size={24} className={theme.text} />}
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

        {/* PROFILE CARD */}
        <div className={`${theme.card} p-5 rounded-[32px] border ${theme.border} flex flex-col gap-4 text-center shadow-lg mx-1`}>
          {user ? (
            <>
              <div className="text-left">
                <p className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText} mb-3`}>My A2 Identity Tags</p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${vibeTags.includes(tag) ? 'bg-[#ffcb05] text-black shadow-md' : (theme.isDark ? 'bg-black/10 text-slate-400' : 'bg-slate-100 text-slate-700')}`}>
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

        {/* SAVED FAVORITES SECTIONS */}
        <div className="space-y-8">
          {/* GREEN SPACES & PARKS FAVORITES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Trees size={16} className="text-emerald-500" />
                <h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Green Spaces & Parks ({parksFavs.length})</h4>
              </div>
              <button onClick={onOpenParksModal} className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.2em] hover:underline">Explore Parks →</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {!parksFavs.length ? (
                <div className={`p-6 border-2 border-dashed rounded-3xl text-center opacity-40 text-[9px] font-black uppercase tracking-widest ${theme.border}`}>No nature spots saved yet</div>
              ) : (
                parksFavs.map(fav => (
                  <div key={`park-${fav.id}`} onClick={() => setSelectedItem(fav)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-5 cursor-pointer relative shadow-md`}>
                    {fav.img ? <img src={fav.img} className="w-16 h-16 rounded-2xl object-cover shadow-inner" alt="" /> : <div className={`w-16 h-16 rounded-2xl ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-center`}><Trees size={20} className="text-emerald-500 opacity-60"/></div>}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold leading-tight truncate ${theme.text}`}>{fav.name || fav.title}</p>
                      <p className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 mt-1 tracking-widest truncate">{fav.category || 'Nature Preserve'}</p>
                    </div>
                    <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(fav);}} className="text-red-500 p-2"><Heart size={18} fill="currentColor" /></button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* EATS FAVORITES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Utensils size={16} className="text-[#f97316]" />
                <h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Eats Favs ({eatsFavs.length})</h4>
              </div>
              <button onClick={() => setView('flavors')} className="text-[9px] font-black uppercase text-[#0284c7] dark:text-[#34a4b8] tracking-[0.2em] hover:underline">View All Flavors →</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {!eatsFavs.length ? (
                <div className={`p-6 border-2 border-dashed rounded-3xl text-center opacity-40 text-[9px] font-black uppercase tracking-widest ${theme.border}`}>No eats saved yet</div>
              ) : (
                eatsFavs.map(fav => (
                  <div key={`eats-${fav.id}`} onClick={() => setSelectedItem(fav)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-5 cursor-pointer relative shadow-md`}>
                    {fav.img ? <img src={fav.img} className="w-16 h-16 rounded-2xl object-cover shadow-inner" alt="" /> : <div className={`w-16 h-16 rounded-2xl ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-center`}><Building size={20} className="opacity-40"/></div>}
                    <div className="flex-1">
                      <p className={`text-sm font-bold leading-tight ${theme.text}`}>{fav.name || fav.title}</p>
                      <p className="text-[9px] font-black uppercase text-[#b45309] dark:text-[#ffcb05] mt-1 tracking-widest">{fav.cuisine || 'A2 Eats'}</p>
                    </div>
                    <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(fav);}} className="text-red-500 p-2"><Heart size={18} fill="currentColor" /></button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* HAPPENINGS FAVORITES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#0284c7] dark:text-[#38bdf8]" />
                <h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Happenings Favs ({happeningsFavs.length})</h4>
              </div>
              <button onClick={() => setView('fun')} className="text-[9px] font-black uppercase text-[#0284c7] dark:text-[#34a4b8] tracking-[0.2em] hover:underline">View All Happenings →</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {!happeningsFavs.length ? (
                <div className={`p-6 border-2 border-dashed rounded-3xl text-center opacity-40 text-[9px] font-black uppercase tracking-widest ${theme.border}`}>No happenings saved yet</div>
              ) : (
                happeningsFavs.map(fav => (
                  <div key={`happenings-${fav.id}`} onClick={() => setSelectedItem(fav)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-5 cursor-pointer relative shadow-md`}>
                    {fav.img ? <img src={fav.img} className="w-16 h-16 rounded-2xl object-cover shadow-inner" alt="" /> : <div className={`w-16 h-16 rounded-2xl ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-center`}><Building size={20} className="opacity-40"/></div>}
                    <div className="flex-1">
                      <p className={`text-sm font-bold leading-tight ${theme.text}`}>{fav.name || fav.title}</p>
                      <p className="text-[9px] font-black uppercase text-[#b45309] dark:text-[#ffcb05] mt-1 tracking-widest">{fav.category || 'A2 Event'}</p>
                    </div>
                    <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(fav);}} className="text-red-500 p-2"><Heart size={18} fill="currentColor" /></button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* JOURNAL FAVORITES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <BookText size={16} className="text-[#a855f7]" />
                <h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Journal Favs ({journalFavs.length})</h4>
              </div>
              <button onClick={() => setView('journal')} className="text-[9px] font-black uppercase text-[#0284c7] dark:text-[#34a4b8] tracking-[0.2em] hover:underline">View All Journal →</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {!journalFavs.length ? (
                <div className={`p-6 border-2 border-dashed rounded-3xl text-center opacity-40 text-[9px] font-black uppercase tracking-widest ${theme.border}`}>No journal articles saved yet</div>
              ) : (
                journalFavs.map(fav => (
                  <div key={`journal-${fav.id}`} onClick={() => setSelectedItem(fav)} className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-5 cursor-pointer relative shadow-md`}>
                    {fav.img ? <img src={fav.img} className="w-16 h-16 rounded-2xl object-cover shadow-inner" alt="" /> : <div className={`w-16 h-16 rounded-2xl ${theme.isDark ? 'bg-black/10' : 'bg-slate-100'} flex items-center justify-center`}><Building size={20} className="opacity-40"/></div>}
                    <div className="flex-1">
                      <p className={`text-sm font-bold leading-tight ${theme.text}`}>{fav.name || fav.title}</p>
                      <p className="text-[9px] font-black uppercase text-[#b45309] dark:text-[#ffcb05] mt-1 tracking-widest">{fav.category || 'City Journal'}</p>
                    </div>
                    <button onClick={(e)=>{e.stopPropagation(); toggleFavorite(fav);}} className="text-red-500 p-2"><Heart size={18} fill="currentColor" /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* --- URBAN AND FUN TOOLS --- */}
        <section className={`space-y-5 w-full pt-4 border-t ${theme.border}`}>
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={18} className="text-[#0284c7] dark:text-[#34a4b8]" />
            <h4 className={`text-sm font-header font-bold uppercase tracking-widest ${theme.text}`}>Urban & Fun Tools</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              {id:'community',icon:MessageSquare,label:'Local Gems',color:'#38bdf8'},
              {id:'water',icon:Droplets,label:'Hydration',color:'#34a4b8'},
              {id:'bucket',icon:Award,label:'Bucket List',color:'#ffcb05'},
              {id:'hots',icon:MapPin,label:'Hot Spots',color:'#ffcb05'},
              {id:'randomizer',icon:Dice5,label:'Weekend Pitcher',color:'#f97316'},
              {id:'trivia',icon:HelpCircle,label:'A2 Trivia',color:'#a855f7'},
              {id:'calc',icon:Calculator,label:'Tip Calc',color:'#10b981'},
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`${theme.card} p-4 rounded-3xl border ${theme.border} flex items-center gap-3 text-left shadow-lg active:scale-95 transition-all`}
              >
                <div className="p-2 rounded-lg" style={{backgroundColor: t.color+'20', color: t.color}}>
                  <t.icon size={18}/>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* BOTTOM PROMOTION CTA */}
        <div className="pt-2">
          <div className="mx-1 p-5 rounded-[32px] bg-gradient-to-r from-[#00274c] via-[#051a34] to-[#0a121e] border border-[#ffcb05]/20 flex items-center justify-between shadow-xl">
            <div className="space-y-1 text-left">
              <span className="text-[9px] font-black uppercase text-[#ffcb05] tracking-widest block">Promote In Ann Arbor</span>
              <h4 className="text-base font-header font-black uppercase text-white tracking-tight">Add Your Flavor, Happening, Or Event</h4>
              <p className="text-[11px] text-slate-300">Feature your eatery, pop-up, workshop, or community gathering across A2 Vibe.</p>
            </div>
            <button
              onClick={() => onOpenPartnerModal('restaurant')}
              className="p-3.5 bg-[#ffcb05] text-black rounded-2xl font-black text-xs uppercase shadow-md active:scale-90 transition-all flex items-center justify-center flex-shrink-0 ml-3"
              title="Add your listing"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* COMMUNITY FORUM */}
        <section className={`space-y-6 w-full pt-8 border-t ${theme.border}`}>
          <div className="px-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#a855f7]" />
                <h3 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>A2 Community Forum</h3>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12} />
                <span>Zero Ads • Private</span>
              </div>
            </div>
            <p className={`text-xs ${theme.secondaryText} leading-relaxed`}>
              A closed, community-powered bulletin board for Tree Town. Share upcoming projects, local news, townie meetups, announcements, and independent questions without tracking algorithms or corporate ads.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-2 no-scrollbar px-1">
            {FORUM_CHANNELS.map(ch => (
              <button
                key={ch}
                onClick={() => setSelectedForumChannel(ch)}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border ${selectedForumChannel === ch ? 'bg-[#a855f7] text-white border-[#a855f7] shadow-md' : (theme.isDark ? 'bg-black/20 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700')}`}
              >
                {ch}
              </button>
            ))}
          </div>

          <div className={`${theme.card} p-4 rounded-3xl border ${theme.border} shadow-sm space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.secondaryText}`}>Post to the Community</span>
              <button 
                onClick={onOpenContributorModal}
                className="text-[10px] font-bold text-[#a855f7] hover:underline"
              >
                Full Story Mode →
              </button>
            </div>
            <form onSubmit={handleCreateForumPost} className="space-y-2.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={forumPostTitle}
                  onChange={(e) => setForumPostTitle(e.target.value)}
                  placeholder="Topic or announcement headline..."
                  className={`flex-1 p-3 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs font-bold outline-none focus:border-[#a855f7]`}
                />
                <select
                  value={forumPostChannel}
                  onChange={(e) => setForumPostChannel(e.target.value)}
                  className={`p-3 rounded-2xl ${theme.isDark ? 'bg-black/30 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'} border text-[10px] font-black uppercase outline-none`}
                >
                  {FORUM_CHANNELS.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <textarea
                required
                rows={3}
                value={forumPostContent}
                onChange={(e) => setForumPostContent(e.target.value)}
                placeholder="Share your message, project boost, meetup, or question with Ann Arbor neighbors..."
                className={`w-full p-3 rounded-2xl ${theme.isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border text-xs leading-relaxed outline-none focus:border-[#a855f7]`}
              />
              <div className="flex justify-between items-center pt-1">
                <span className={`text-[9px] font-medium ${theme.secondaryText}`}>
                  Posting as <strong>{user?.displayName || 'A2 Neighbor'}</strong>
                </span>
                <button
                  type="submit"
                  disabled={isPostingForum}
                  className="px-4 py-2.5 bg-[#a855f7] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Send size={12} />
                  <span>{isPostingForum ? 'Sharing...' : 'Share Post'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-3 px-1">
            {filteredStories.length > 0 ? (
              filteredStories.map((post) => (
                <div key={post.id} className={`${theme.card} p-4 rounded-3xl border ${theme.border} space-y-2 shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#a855f7] bg-[#a855f7]/10 px-2.5 py-0.5 rounded-md">
                      {post.channel || 'Community Chat'}
                    </span>
                    <span className={`text-[10px] font-medium ${theme.secondaryText}`}>
                      {post.timestamp ? new Date(post.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm uppercase tracking-tight ${theme.text}`}>{post.title}</h4>
                  <p className={`text-xs leading-relaxed ${theme.secondaryText}`}>{post.content}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                    <span className={`font-bold ${theme.secondaryText}`}>Spotted by {post.author}</span>
                    {post.contact && post.contact !== 'Unlisted' && (
                      <span className="text-[#38bdf8] font-bold truncate max-w-[180px]">{post.contact}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-10 border-2 border-dashed rounded-3xl text-center opacity-40 text-xs font-bold uppercase tracking-widest ${theme.border}`}>
                No community discussions in this channel yet. Be the first to share!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- INSIDER / HOME VIEW ---
const HomeView = ({ 
  theme, setSelectedItem, itineraries, dining, featuredPosts, favorites, 
  toggleFavorite, setView, onOpenPartnerModal, onOpenParksModal 
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
                  <span className="text-[10px] font-black text-[#0284c7] dark:text-[#34a4b8]">{item.price}</span>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }} className="bg-[#ffcb05] text-black text-[9px] font-black uppercase py-2 px-4 rounded-xl">Details</button>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === item.id) ? 'bg-[#ffcb05]/20 text-[#ffcb05]' : (theme.isDark ? 'bg-black/20 text-white' : 'bg-black/5 text-slate-600')}`}><Heart size={14} fill={(favorites || []).some(f => f.id === item.id) ? "currentColor" : "none"} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LAUNCH GRID WITH PARKS BUTTON INCLUDED */}
      <section>
        <div className="flex items-center gap-2 mb-4 px-2">
          <Ticket size={18} className="text-[#0284c7] dark:text-[#34a4b8]" />
          <h2 className={`text-base font-header font-bold uppercase tracking-widest ${theme.text}`}>Quick Launch</h2>
        </div>
        <div className="grid grid-cols-5 gap-2.5 px-1">
          {[
            { label: 'Eats', icon: <Utensils size={20}/>, path: 'flavors' },
            { label: 'Events', icon: <Zap size={20}/>, path: 'fun' },
            { label: 'Parks', icon: <Trees size={20} className="text-emerald-400"/>, action: onOpenParksModal },
            { label: 'List Biz', icon: <Store size={20}/>, action: () => onOpenPartnerModal('restaurant') },
            { label: 'Transit', icon: <Navigation size={20}/>, link: 'https://www.theride.org/' }
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
              <div className="p-3.5 rounded-2xl text-white shadow-lg bg-[#00274c] group-hover:scale-105 transition-transform flex items-center justify-center">{item.icon}</div>
              <span className={`text-[10px] font-black uppercase tracking-tighter text-center ${theme.isDark ? 'text-white' : 'text-slate-700'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="island-flavors">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Utensils size={18} className="text-[#0284c7] dark:text-[#34a4b8]" />
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
                <p className="text-[8px] font-black text-[#0284c7] dark:text-[#34a4b8] uppercase tracking-[0.2em] mt-1">{res.cuisine || 'Gourmet A2'}</p>
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
                <span className="bg-[#ffcb05] text-black px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block">Trending Now</span>
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
    </div>
  );
};

// --- FLAVORS VIEW ---
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
                    {res.neighborhood && <span className="text-[10px] font-bold text-[#0284c7] dark:text-[#34a4b8] uppercase tracking-wider truncate">{res.neighborhood}</span>}
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

// --- JOURNAL VIEW ---
const JournalView = ({ theme, setSelectedItem, toggleFavorite, favorites, posts, onOpenPartnerModal, onOpenContributorModal }) => {
  const [activeCat, setActiveCat] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCat === 'All') return posts || [];
    if (activeCat === 'Meetups') return (posts || []).filter(p => p.category === 'Meetups' || p.allCategories?.includes('Meetups'));
    return (posts || []).filter(p => (p.allCategories || []).some(cat => cat.toLowerCase().includes(activeCat.toLowerCase())));
  }, [posts, activeCat]);

  return (
    <div className="animate-fade space-y-10 text-left relative z-10 pb-20 w-full flex flex-col">
      <div className="text-center px-4 w-full">
        <h1 className={`text-3xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>City Journal</h1>
        <div className="flex overflow-x-auto gap-3 mt-6 no-scrollbar">
          {CATEGORIES_JOURNAL.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} className={`px-5 py-2.5 rounded-full border whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === cat ? 'bg-[#ffcb05] border-[#ffcb05] text-black shadow-lg' : (theme.isDark ? 'text-slate-400 bg-white/5 border-white/5' : 'text-slate-700 bg-slate-100 border-slate-200')}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="px-1 grid grid-cols-2 gap-x-5 gap-y-12 w-full">
        {filteredPosts.map((art, idx) => {
          const isFeatured = idx === 0;
          return (
            <div key={art.id} onClick={() => setSelectedItem(art)} className={`space-y-4 cursor-pointer group ${isFeatured ? 'col-span-2' : 'col-span-1'}`}>
              <div className={`relative ${isFeatured ? 'h-80' : 'aspect-[4/5]'} rounded-[40px] overflow-hidden shadow-lg ${theme.isDark ? 'bg-slate-800/20 border-white/5' : 'bg-slate-100 border-slate-200'} border`}>
                {art.img ? <img src={art.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="" /> : <div className="w-full h-full flex items-center justify-center opacity-10"><Building size={48} /></div>}
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest">{art.category}</div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(art); }} className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md ${(favorites || []).some(f => f.id === art.id) ? "bg-[#ffcb05]/20 text-[#ffcb05]" : "bg-black/20 text-white"}`}><Heart size={16} fill={(favorites || []).some(f => f.id === art.id) ? "currentColor" : "none"} /></button>
              </div>
              <div className="px-1"><h4 className={`${isFeatured ? 'text-2xl tracking-tighter' : 'text-sm tracking-tight'} font-header font-black uppercase italic leading-tight ${theme.text}`}>{art.title}</h4>{isFeatured && <p className={`text-base mt-3 line-clamp-2 leading-relaxed italic ${theme.secondaryText}`}>{art.excerpt}</p>}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3.5 px-1 pt-6">
        <div 
          onClick={() => onOpenPartnerModal('general')}
          className="aspect-square rounded-[32px] p-5 flex flex-col justify-between cursor-pointer border border-[#38bdf8]/30 bg-gradient-to-br from-[#00274c] via-[#071d37] to-[#0a121e] shadow-xl group hover:border-[#38bdf8] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-[#38bdf8]/15 text-[#38bdf8] rounded-2xl">
              <Calendar size={22} />
            </div>
            <ArrowRight size={18} className="text-[#38bdf8] opacity-70 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-[#38bdf8] tracking-widest block">City Schedule</span>
            <h4 className="text-base font-header font-black uppercase text-white leading-tight">List Your Event</h4>
            <p className="text-[10px] text-slate-300 leading-snug line-clamp-2">Feature your show, workshop, festival, or club meetup on A2 Vibe.</p>
          </div>
        </div>

        <div 
          onClick={onOpenContributorModal}
          className="aspect-square rounded-[32px] p-5 flex flex-col justify-between cursor-pointer border border-[#a855f7]/30 bg-gradient-to-br from-[#00274c] via-[#1a0f30] to-[#0a121e] shadow-xl group hover:border-[#a855f7] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-[#a855f7]/15 text-[#a855f7] rounded-2xl">
              <PenTool size={22} />
            </div>
            <ArrowRight size={18} className="text-[#a855f7] opacity-70 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-[#a855f7] tracking-widest block">Contributor Desk</span>
            <h4 className="text-base font-header font-black uppercase text-white leading-tight">Submit A Story</h4>
            <p className="text-[10px] text-slate-300 leading-snug line-clamp-2">Local news, announcements, reviews, or Tree Town reporting.</p>
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
  const [activeTool, setActiveTool] = useState(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerModalCategory, setPartnerModalCategory] = useState('restaurant');
  const [isContributorModalOpen, setIsContributorModalOpen] = useState(false);
  const [isParksModalOpen, setIsParksModalOpen] = useState(false);
  
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
    const isAlreadyFavorited = (favorites || []).some(f => f.id === item.id && f.type === item.type);
    if (isAlreadyFavorited) { setFavorites(favorites.filter(f => !(f.id === item.id && f.type === item.type))); } 
    else { setFavorites([...favorites, { ...item, savedAt: Date.now() }]); }
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
          
          <ParksDirectoryModal
            isOpen={isParksModalOpen}
            onClose={() => setIsParksModalOpen(false)}
            theme={theme}
            setSelectedItem={setSelectedItem}
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
                />
              )}
              {view === 'journal' && (
                <JournalView 
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
                />
              )}
              
              {view === 'fun' && (
                <div className="space-y-12 animate-fade w-full">
                   <div className="text-center px-4">
                     <h1 className={`text-2xl font-header font-black uppercase italic tracking-tighter ${theme.text}`}>A2 Happenings</h1>
                   </div>

                   {/* FEATURED CTA CARDS SECTION */}
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
                                         <button onClick={(e) => handleShare(exp, e)} className={`p-2 rounded-full transition-colors ${theme.secondaryText} hover:text-[#ffcb05]`} title="Share event">
                                           <Share2 size={16} />
                                         </button>
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
                                     <span className="text-[9px] font-black text-[#0284c7] dark:text-[#34a4b8] uppercase tracking-[0.2em]">
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

                          <div className="pt-6">
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
                          <div className="pt-4">
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
            { id: 'journal', icon: BookText, label: 'Journal', color: '#a855f7' }, 
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
