import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Navigation,
  Loader2,
  Check,
  Building2,
  Truck,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentLocation,
  setLocation,
  setGpsLocation,
} from '../../Redux/features/location/locationSlice';
import toast from 'react-hot-toast';
import heroBannerImg from '../../assets/hero_banner.jpg';

const popularDeliveryHubs = [
  { city: 'Bhubaneswar', state: 'Odisha', pincode: '751001', tag: 'Live Hub' },
  { city: 'Jaipur (Kitchen HQ)', state: 'Rajasthan', pincode: '302001', tag: 'Fast 24hr' },
  { city: 'Bikaner (Heritage)', state: 'Rajasthan', pincode: '334001', tag: 'Same Day' },
  { city: 'New Delhi', state: 'Delhi NCR', pincode: '110001', tag: 'Express' },
  { city: 'Mumbai', state: 'Maharashtra', pincode: '400001', tag: 'Express' },
  { city: 'Bengaluru', state: 'Karnataka', pincode: '560001', tag: 'Direct' },
  { city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', tag: 'Express' },
  { city: 'Kolkata', state: 'West Bengal', pincode: '700001', tag: 'Direct' },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const selectedLocation = useSelector(selectCurrentLocation);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [customPincode, setCustomPincode] = useState('');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLocationDropdownOpen(false);
      }
    };
    if (isLocationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLocationDropdownOpen]);

  // Auto-detect GPS Location using browser Geolocation + Reverse Geocoding
  const handleDetectGpsLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    const toastId = toast.loading('🛰️ Connecting to GPS satellites...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          const data = await res.json();
          const addr = data.address || {};

          const detectedCity =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.county ||
            addr.district ||
            'Bhubaneswar';
          const detectedState = addr.state || 'Odisha';
          const detectedPincode = addr.postcode || '751001';
          const detectedSuburb = addr.suburb || addr.neighbourhood || addr.road || '';

          const fullLabel = detectedSuburb
            ? `${detectedSuburb}, ${detectedCity}`
            : `${detectedCity}, ${detectedState}`;

          dispatch(
            setGpsLocation({
              label: `${detectedCity}, ${detectedState}`,
              city: detectedCity,
              state: detectedState,
              pincode: detectedPincode,
              address: `${fullLabel} - ${detectedPincode}`,
              addressLine: fullLabel,
            })
          );

          toast.success(`📍 Live GPS Detected: ${detectedCity} (${detectedPincode})`, {
            id: toastId,
          });
          setIsLocationDropdownOpen(false);
        } catch (error) {
          console.error('GPS Geocoding error:', error);
          toast.error('Could not fetch address details. Please select your city.', {
            id: toastId,
          });
        } finally {
          setIsDetectingGps(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsDetectingGps(false);
        toast.error('Location access denied. Please choose your city manually.', {
          id: toastId,
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleApplyCustomPincode = (e) => {
    e.preventDefault();
    const pin = customPincode.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      dispatch(
        setLocation({
          label: `Pincode: ${pin}`,
          city: 'Custom Pincode',
          state: 'India',
          pincode: pin,
          address: `Pincode: ${pin}`,
          addressLine: `Pincode: ${pin}`,
          isGpsLive: false,
        })
      );
      setIsLocationDropdownOpen(false);
      setCustomPincode('');
      toast.success(`Delivery location updated to pincode ${pin}!`);
    } else {
      toast.error('Please enter a valid 6-digit Indian postal code.');
    }
  };

  return (
    <div className="space-y-4 my-1">
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW ONLY (sm:hidden) - Dynamic GPS Location & Live Dispatch    */}
      {/* ========================================================================= */}
      <div className="sm:hidden space-y-3 pt-0.5">
        
        {/* Animated GPS Live Location Capsule */}
        <div className="bg-white rounded-3xl p-3.5 border border-stone-200/90 shadow-sm space-y-2.5">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 relative" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-500">
                {selectedLocation.isGpsLive ? 'Live GPS Dispatch' : 'Express Delivery Location'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleDetectGpsLocation}
              disabled={isDetectingGps}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold transition-all cursor-pointer"
            >
              {isDetectingGps ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Navigation className="w-3 h-3 text-emerald-600" />
              )}
              <span>{isDetectingGps ? 'Locating...' : 'Live Location'}</span>
            </button>
          </div>

          <div
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#981b2e] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">
                  {selectedLocation.address}
                </p>
                <p className="text-[10px] text-stone-500">
                  {selectedLocation.city}, {selectedLocation.state} • Pincode: {selectedLocation.pincode}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Location Dropdown on Mobile */}
          {isLocationDropdownOpen && (
            <div className="p-3 bg-stone-50/90 rounded-2xl border border-stone-200 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                  Select Major Dispatch City
                </span>
                <button
                  type="button"
                  onClick={() => setIsLocationDropdownOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto">
                {popularDeliveryHubs.map((hub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      dispatch(
                        setLocation({
                          label: `${hub.city}, ${hub.state}`,
                          city: hub.city,
                          state: hub.state,
                          pincode: hub.pincode,
                          address: `${hub.city}, ${hub.state}`,
                          addressLine: `${hub.city}, ${hub.state}`,
                          isGpsLive: false,
                        })
                      );
                      setIsLocationDropdownOpen(false);
                      toast.success(`Delivery set to ${hub.city}`);
                    }}
                    className="p-2 rounded-xl bg-white border border-stone-200 text-left text-[11px] font-semibold text-stone-800 hover:border-[#981b2e] transition-colors"
                  >
                    <p className="font-bold truncate">{hub.city}</p>
                    <p className="text-[9px] text-stone-400 font-mono">{hub.pincode}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* 50% OFF Mobile Promo Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#981b2e] via-[#851526] to-[#4a0d17] text-white p-5 shadow-lg border border-rose-900">
          <img
            src={heroBannerImg}
            alt="50% OFF"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
          <div className="relative z-10 space-y-2">
            <h2 className="text-3xl font-black font-serif-heading tracking-tight leading-none text-white">
              50% OFF
            </h2>
            <p className="text-xs text-stone-100 font-medium">
              Your first order of Artisanal Snacks. Use code <strong className="text-[#ffd25d] font-bold">FESTIVE15</strong>
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-stone-950 text-xs font-black shadow-md hover:bg-stone-100 active:scale-95 transition-all mt-1"
            >
              <span>Explore Fresh Snacks</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP / LAPTOP VIEW ONLY (hidden sm:block) - Hero Banner + GPS Hub   */}
      {/* ========================================================================= */}
      <div className="hidden sm:block relative w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200/80">
        <div className="relative h-[380px] lg:h-[440px] w-full flex items-center justify-center">
          {/* Hero Background Image */}
          <img
            src={heroBannerImg}
            alt="Authentic Artisanal Snacks & Sweets"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Layered Gradient Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/65 to-stone-950/90" />
          
          {/* Ambient Glows */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
            
            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#ffd25d] text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>100% Single-Press Groundnut Oil • Fresh Morning Batches</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-heading drop-shadow-md leading-tight">
              Discover the best artisanal snacks & sweets
            </h1>

            <p className="text-sm sm:text-base text-stone-200 max-w-xl mx-auto font-medium">
              Handcrafted Ratlami Sev, Bikaneri Bhujia, Desi Sweets & Roasted Nuts delivered fresh pan-India.
            </p>

            {/* ========================================================================= */}
            {/* LIVE GPS DELIVERY DISPATCH RADAR CAPSULE                                    */}
            {/* ========================================================================= */}
            <div className="relative max-w-2xl mx-auto" ref={dropdownRef}>
              
              {/* Location Selector Dropdown Modal (Opens ABOVE the capsule to never be cut off) */}
              {isLocationDropdownOpen && (
                <div className="absolute left-0 right-0 bottom-full mb-3 bg-white rounded-3xl shadow-2xl border border-stone-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                  
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#981b2e]" />
                      <span className="text-xs font-black uppercase tracking-wider text-stone-800">
                        Choose Dispatch City or Enter Pincode
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        ⚡ Pan-India Shipping
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsLocationDropdownOpen(false)}
                        className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
                        title="Close selector"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Popular Delivery Hubs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
                    {popularDeliveryHubs.map((hub, idx) => {
                      const isSelected = selectedLocation.pincode === hub.pincode;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            dispatch(
                              setLocation({
                                label: `${hub.city}, ${hub.state}`,
                                city: hub.city,
                                state: hub.state,
                                pincode: hub.pincode,
                                address: `${hub.city}, ${hub.state} - ${hub.pincode}`,
                                addressLine: `${hub.city}, ${hub.state}`,
                                isGpsLive: false,
                              })
                            );
                            setIsLocationDropdownOpen(false);
                            toast.success(`📍 Delivery address set to ${hub.city}!`);
                          }}
                          className={`p-2.5 rounded-2xl text-xs text-left transition-all cursor-pointer border flex flex-col justify-between ${
                            isSelected
                              ? 'bg-rose-50/80 border-[#981b2e] text-stone-900 font-bold shadow-2xs'
                              : 'bg-stone-50/70 hover:bg-stone-100 border-stone-200 text-stone-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-xs truncate">{hub.city}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#981b2e] shrink-0" />}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400">
                            <span className="font-mono">{hub.pincode}</span>
                            <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                              {hub.tag}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Pincode Form */}
                  <form onSubmit={handleApplyCustomPincode} className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={customPincode}
                      onChange={(e) => setCustomPincode(e.target.value)}
                      placeholder="Enter custom 6-digit Pincode (e.g. 751001)"
                      className="flex-1 text-xs px-3.5 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 font-medium"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
                    >
                      Set Location
                    </button>
                  </form>

                </div>
              )}

              {/* Main Pill Capsule */}
              <div className="bg-white/95 backdrop-blur-md rounded-full p-2.5 shadow-2xl border border-white/80 flex items-center justify-between gap-3 text-left">
                
                {/* Delivery Location Section */}
                <div className="relative flex-1 flex items-center gap-2.5 pl-3 min-w-0">
                  {/* Animated Live Radar Pulse */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 relative" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 block leading-none mb-0.5">
                      {selectedLocation.isGpsLive ? '🛰️ Live GPS Location' : '📍 Delivering To:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                      className="flex items-center gap-1 text-xs lg:text-sm font-extrabold text-stone-900 hover:text-[#981b2e] transition-colors cursor-pointer max-w-full text-left truncate"
                    >
                      <span className="truncate">{selectedLocation.address}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Auto GPS Detect Button */}
                <button
                  type="button"
                  onClick={handleDetectGpsLocation}
                  disabled={isDetectingGps}
                  className="px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs hover:scale-102 active:scale-95"
                  title="Detect live coordinates via Google GPS"
                >
                  {isDetectingGps ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                  ) : (
                    <Navigation className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                  )}
                  <span className="hidden md:inline font-black">
                    {isDetectingGps ? 'Scanning GPS...' : 'Live Location'}
                  </span>
                </button>

                {/* Direct CTA Button to Explore Snacks */}
                <Link
                  to="/explore"
                  className="px-5 lg:px-6 py-2.5 lg:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs lg:text-sm font-black shadow-md shadow-rose-950/30 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore Snacks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Micro Delivery Highlights */}
            <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-stone-300 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#ffd25d]" />
                <span>Express 24-48h Dispatch</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Freshness Guarantee</span>
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;