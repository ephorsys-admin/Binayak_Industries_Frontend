import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import binayakLogo from '../assets/logo.png';
import {
  MapPin,
  ChevronDown,
  Search,
  ShoppingCart,
  Home,
  Leaf,
  Headphones,
  ArrowRight,
  Menu,
  X,
  Check,
  Navigation,
  Loader2,
  Building2,
  Sparkles,
} from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalCount } from '../Redux/features/cart/cartSlice';
import {
  selectCurrentLocation,
  selectSavedLocations,
  setLocation,
  setGpsLocation,
} from '../Redux/features/location/locationSlice';
import GlobalSearchModal from '../components/ui/GlobalSearchModal';
import toast from 'react-hot-toast';

/* Popular Delivery Hubs for Instant Selection */
const popularDeliveryHubs = [
  { city: 'Bhubaneswar', state: 'Odisha', pincode: '751001', tag: 'Live Hub' }
];

/* Golden Sparkle Rays (Sunburst effect above Explore Snacks & Cart) */
const SparkleRays = ({ className = '' }) => (
  <div
    className={`pointer-events-none flex items-end justify-center gap-1 text-[#f59e0b] ${className}`}
    aria-hidden="true"
  >
    <span className="w-0.5 h-2 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-full transform -rotate-30 origin-bottom animate-sparkleRays shadow-[0_0_6px_#f59e0b]" />
    <span className="w-0.5 h-3.5 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-full transform -translate-y-0.5 animate-sparkleRays delay-100 shadow-[0_0_8px_#f59e0b]" />
    <span className="w-0.5 h-2 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-full transform rotate-30 origin-bottom animate-sparkleRays delay-200 shadow-[0_0_6px_#f59e0b]" />
  </div>
);


/* Custom Snack Bowl Icon matching the Explore Snacks emblem */
const SnackBowlIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Bowl base */}
    <path
      d="M4 11C4 16 7.8 19.5 12 19.5C16.2 19.5 20 16 20 11H4Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M3 11H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Snack crisps/namkeen puffs */}
    <circle cx="8" cy="8" r="1.8" fill="currentColor" />
    <circle cx="12" cy="6.2" r="1.8" fill="currentColor" />
    <circle cx="16" cy="8" r="1.8" fill="currentColor" />
    <circle cx="10" cy="9.2" r="1.1" fill="currentColor" />
    <circle cx="14" cy="9.2" r="1.1" fill="currentColor" />
  </svg>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const currentLocation = useSelector(selectCurrentLocation);
  const savedAddresses = useSelector(selectSavedLocations);

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [customPincode, setCustomPincode] = useState('');

  const cartCount = useSelector(selectCartTotalCount);
  const [isScrolled, setIsScrolled] = useState(false);

  const locationRef = useRef(null);
  const location = useLocation();

  // Close dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLocationOpen(false);
    setIsSearchModalOpen(false);
  }, [location.pathname]);

  // Handle outside click for location dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K listener to trigger search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-detect GPS Location using browser Geolocation + Reverse Geocoding
  const handleDetectGpsLocation = (e) => {
    if (e) e.stopPropagation();

    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    const toastId = toast.loading('Detecting live Location...');

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
          const detectedSuburb =
            addr.suburb || addr.neighbourhood || addr.road || '';

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

          toast.success(
            `📍 Location Detected: ${detectedCity} (${detectedPincode})`,
            { id: toastId }
          );

          setIsLocationOpen(false);
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
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleApplyCustomPincode = (e) => {
    e.preventDefault();
    const pin = customPincode.trim();

    if (pin.length === 6 && /^\d+$/.test(pin)) {
      dispatch(
        setLocation({
          label: `Pincode: ${pin}`,
          city: 'Custom',
          state: 'India',
          pincode: pin,
          address: `Pincode: ${pin}`,
          addressLine: `Pincode: ${pin}`,
          isGpsLive: false,
        })
      );

      setIsLocationOpen(false);
      setCustomPincode('');
      toast.success(`Delivery location updated to pincode ${pin}!`);
    } else {
      toast.error('Please enter a valid 6-digit Indian postal code.');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore Snacks', path: '/explore', icon: SnackBowlIcon },
    { name: 'Our Story', path: '/about', icon: Leaf },
    { name: 'Contact & Support', path: '/contact', icon: Headphones },
  ];

  return (
    <>
      {/* Floating Capsule Header Container */}
      <header className="sticky top-1.5 sm:top-3 z-50 px-2 sm:px-4 lg:px-6 w-full max-w-[1420px] mx-auto transition-all duration-300">
        <div
          className={`relative bg-white/95 backdrop-blur-xl border border-sky-100/90 rounded-full px-2.5 xs:px-3.5 sm:px-5 lg:px-6 py-1.5 sm:py-2 transition-all duration-300 ${isScrolled
            ? 'shadow-[0_12px_38px_-6px_rgba(0,40,90,0.12),0_2px_15px_rgba(0,100,200,0.06)] border-sky-200/90 bg-white/98'
            : 'shadow-[0_8px_30px_-5px_rgba(0,40,90,0.08),0_2px_10px_rgba(0,100,200,0.04)]'
            }`}
        >
          <div className="flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-3 lg:gap-5 min-w-0">

            {/* 1. LEFT: Main Logo & Location with Live GPS Button */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink min-w-0">
              {/* Main Logo */}
              <Link
                to="/"
                className="shrink-0 flex items-center transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Binayak Home"
              >
                <img
                  src={binayakLogo}
                  alt="Binayak Logo"
                  className="h-7 xs:h-8 sm:h-10 md:h-11 w-auto object-contain drop-shadow-xs"
                />
              </Link>

              {/* Location Pill & Fetch Action Group */}
              <div className="relative shrink min-w-0 flex items-center gap-1" ref={locationRef}>
                {/* Location Selector Pill */}
                <button
                  type="button"
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="bg-[#f0f7fd]/90 hover:bg-[#e4f1fc] border border-[#d2e8f8] rounded-full px-1.5 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 xs:gap-1.5 sm:gap-2 cursor-pointer transition-all shadow-2xs group focus:outline-none max-w-[95px] xs:max-w-[130px] sm:max-w-[185px] lg:max-w-[210px]"
                  aria-expanded={isLocationOpen}
                  aria-label="Delivery Location"
                >
                  {/* Icon with pulse dot */}
                  <div className="w-5.5 h-5.5 xs:w-7 xs:h-7 sm:w-7.5 sm:h-7.5 rounded-lg xs:rounded-xl bg-[#0080B0]/15 flex items-center justify-center relative text-[#0080B0] shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
                    {/* Live indicator dot */}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full border border-white sm:border-2 shadow-xs ${currentLocation.isGpsLive
                        ? 'bg-sky-500 animate-ping'
                        : 'bg-emerald-500 animate-pulse'
                        }`}
                    />
                  </div>

                  <div className="text-left leading-tight min-w-0">
                    <span className="hidden sm:block text-[9px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      {currentLocation.isGpsLive ? 'Live Location' : 'Express Dispatch'}
                    </span>
                    <div className="flex items-center gap-0.5 xs:gap-1">
                      <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[42px] xs:max-w-[65px] sm:max-w-[110px] lg:max-w-[130px]">
                        {currentLocation.city
                          ? currentLocation.city
                          : currentLocation.label}
                      </span>
                      <ChevronDown
                        className={`w-2.5 h-2.5 xs:w-3 xs:h-3 text-slate-500 shrink-0 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Direct GPS Fetch Location Button beside Logo & Pill (Visible on Desktop where width allows) */}
                <button
                  type="button"
                  onClick={handleDetectGpsLocation}
                  disabled={isDetectingGps}
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#004060]/10 hover:bg-[#004060]/20 active:scale-95 border border-[#004060]/30 text-[#004060] text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs group"
                  title="Detect live coordinates via GPS"
                  aria-label="Fetch Current GPS Location"
                >
                  {isDetectingGps ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#004060]" />
                  ) : (
                    <Navigation className="w-3.5 h-3.5 text-[#004060] group-hover:rotate-45 transition-transform" />
                  )}
                  <span className="font-extrabold text-[11px] sm:text-xs">
                    {isDetectingGps ? 'Locating...' : 'Fetch Location'}
                  </span>
                </button>

                {/* Location Dropdown / Popover Modal */}
                {isLocationOpen && (
                  <>
                    {/* Mobile Backdrop Overlay to dismiss on tap outside */}
                    <div
                      className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-[99] sm:hidden"
                      onClick={() => setIsLocationOpen(false)}
                      aria-hidden="true"
                    />

                    <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-auto sm:top-full sm:mt-3 sm:left-0 sm:w-92 max-w-[calc(100vw-24px)] sm:max-w-none bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,40,90,0.25),0_0_0_1px_rgba(0,0,0,0.06)] border border-stone-200 p-3.5 sm:p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 space-y-3 max-h-[85vh] overflow-y-auto">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-[#004060]" />
                          <span className="text-xs font-black uppercase tracking-wider text-stone-800">
                            Delivery Location
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsLocationOpen(false)}
                            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                            aria-label="Close"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Primary Action: One-Click Fetch Live GPS Location */}
                      <button
                        type="button"
                        onClick={handleDetectGpsLocation}
                        disabled={isDetectingGps}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-[#004060]/10 via-[#0080B0]/10 to-amber-500/10 hover:from-[#004060]/20 hover:to-amber-500/20 border border-[#004060]/30 hover:border-[#004060] transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-1">
                          <div className="w-8 h-8 rounded-xl bg-[#004060] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            {isDetectingGps ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Navigation className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-[#004060] truncate">
                              {isDetectingGps
                                ? 'Scanning GPS Satellites...'
                                : 'Fetch Current GPS Location'}
                            </p>
                            <p className="text-[10px] text-stone-500 font-medium truncate">
                              Auto-detect city, state & postal pincode
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-white bg-[#004060] px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                          Auto
                        </span>
                      </button>

                      {/* Popular Dispatch Hubs Grid */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                          Select Major Dispatch Hub
                        </span>

                        <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-0.5">
                          {popularDeliveryHubs.map((hub, idx) => {
                            const isSelected =
                              currentLocation.pincode === hub.pincode;

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
                                  setIsLocationOpen(false);
                                  toast.success(`Delivery set to ${hub.city}!`);
                                }}
                                className={`p-2 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${isSelected
                                  ? 'bg-[#004060]/5 border-[#004060] text-stone-900 font-bold shadow-2xs'
                                  : 'bg-stone-50/70 hover:bg-stone-100 border-stone-200 text-stone-700'
                                  }`}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-[11px] truncate">
                                    {hub.city}
                                  </span>
                                  {isSelected && (
                                    <Check className="w-3 h-3 text-[#004060] shrink-0" />
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-1 text-[9px] text-stone-400">
                                  <span className="font-mono">{hub.pincode}</span>
                                  <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200 text-[8px]">
                                    {hub.tag}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Custom Pincode Input Form */}
                      <form
                        onSubmit={handleApplyCustomPincode}
                        className="pt-2 border-t border-stone-100 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          placeholder="Enter 6-digit Pincode"
                          maxLength={6}
                          value={customPincode}
                          onChange={(e) => setCustomPincode(e.target.value)}
                          className="flex-1 min-w-0 text-xs px-3 py-1.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004060]/30 font-medium"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#004060] hover:bg-[#003048] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
                        >
                          Set Pin
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 2. MIDDLE: Clean Search Bar with Uniform Golden Accent (Visible on Tablet & Desktop) */}
            <div className="hidden md:flex flex-1 min-w-[180px] max-w-md lg:max-w-sm xl:max-w-md mx-2 lg:mx-3 relative group border border-amber-400/80 hover:border-amber-500 rounded-full transition-colors shadow-2xs">
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="w-full relative flex items-center justify-between pl-3 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 bg-white hover:bg-amber-50/20 text-stone-400 rounded-full transition-all cursor-pointer text-left"
                aria-label="Open global search"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#006090] group-hover:text-[#0080B0] transition-colors shrink-0" />
                  <span className="text-[11px] xs:text-xs sm:text-sm text-slate-400 group-hover:text-slate-600 truncate">
                    Search snacks, sev, sweets...
                  </span>
                </div>

                {/* Dark blue circular action button with white arrow */}
                <div className="w-6 h-6 xs:w-6.5 xs:h-6.5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-[#004d7a] group-hover:bg-[#003859] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 active:scale-95 transition-all">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
              </button>
            </div>

            {/* 3. RIGHT: Animated Nav Items & Glossy Cart Capsule */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 shrink-0">

              {/* Mobile & Small Tablet Quick Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="md:hidden w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-full bg-[#f0f7fd] hover:bg-[#e4f1fc] active:scale-95 border border-[#d2e8f8] text-[#006090] flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0"
                aria-label="Open global search"
                title="Search snacks"
              >
                <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 stroke-[2.2]" />
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
                {navLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `relative group flex flex-col items-center justify-center px-3 sm:px-3.5 py-1.5 -my-1 rounded-3xl border border-transparent transition-all duration-300 cursor-pointer hover:bg-gradient-to-b hover:from-[#fffbeb] hover:via-[#fef3c7]/75 hover:to-[#fef9c3]/90 hover:border-amber-300/80 hover:shadow-[0_4px_16px_rgba(245,197,66,0.3)] hover:scale-102 active:scale-95 ${isActive ? 'text-[#004060]' : 'text-slate-600'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Radiant Golden Rays - Appear on hover for ALL options */}
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300 z-20">
                            <SparkleRays />
                          </div>

                          {/* Circular Badge */}
                          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-sky-50 text-[#0080B0] border-2 border-transparent flex items-center justify-center shadow-2xs transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#006090] group-hover:border-amber-300 group-hover:text-amber-300 group-hover:shadow-md">
                            <Icon className="w-3.5 h-3.5 stroke-[2.3] transition-colors duration-200" />
                          </div>

                          {/* Label */}
                          <span
                            className={`text-[11px] sm:text-xs tracking-tight transition-colors duration-200 mt-0.5 whitespace-nowrap ${isActive
                              ? 'font-black text-[#004060]'
                              : 'font-bold text-slate-600'
                              } group-hover:text-[#78350f] group-hover:font-black`}
                          >
                            {item.name}
                          </span>

                          {/* Active Indicator Underline */}
                          {isActive && (
                            <span className="w-5 h-1 bg-[#006090] rounded-full mt-0.5 shadow-2xs group-hover:opacity-0 transition-opacity duration-200 animate-in fade-in zoom-in-75" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              {/* --- Glossy 3D Blue Cart Capsule Button with Golden Rays --- */}
              <div className="relative shrink-0">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 pointer-events-none scale-75 sm:scale-100">
                  <SparkleRays />
                </div>

                <Link
                  to="/cart"
                  className="relative group flex items-center gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#00558f] via-[#006ea8] to-[#004771] hover:from-[#00487a] hover:to-[#003c60] text-white border border-amber-300/40 shadow-[0_4px_16px_rgba(0,80,150,0.3)] hover:shadow-[0_6px_22px_rgba(0,80,150,0.4)] active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
                  aria-label="Shopping Cart"
                >
                  <span
                    className="absolute inset-x-2 top-0.5 h-1.5 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none"
                    aria-hidden="true"
                  />

                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full pointer-events-none"
                    aria-hidden="true"
                  />

                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform duration-200 shrink-0" />

                  <span className="hidden sm:inline text-xs sm:text-sm font-black tracking-wide text-white">
                    Cart
                  </span>

                  {cartCount > 0 && (
                    <span className="min-w-4.5 h-4.5 px-1 bg-[#F5C542] text-stone-950 text-[10px] font-black rounded-full flex items-center justify-center border border-amber-200 shadow-md animate-sparkleRays">
                      {cartCount}
                    </span>
                  )}

                  <ArrowRight className="hidden xl:inline w-3.5 h-3.5 text-white/90 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 xs:p-2 rounded-xl text-stone-700 hover:bg-stone-100 active:scale-95 transition-colors focus:outline-none cursor-pointer shrink-0"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu & Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <div
              className="fixed inset-0 bg-stone-900/35 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-down Drawer Card */}
            <div className="absolute top-full left-0 right-0 mt-2 mx-1.5 xs:mx-3 border border-sky-100/90 rounded-3xl shadow-2xl bg-white/98 backdrop-blur-2xl p-4 space-y-3 z-50 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <img
                    src={binayakLogo}
                    alt="Binayak"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-extrabold text-sm text-[#0a2540] font-brand">
                    Binayak Industries
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick GPS Fetch Button in Mobile Drawer */}
              <button
                type="button"
                onClick={handleDetectGpsLocation}
                disabled={isDetectingGps}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-[#004060]/10 hover:bg-[#004060]/20 border border-[#004060]/30 text-[#004060] text-xs font-bold transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {isDetectingGps ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                  <span>
                    {isDetectingGps ? 'Detecting GPS...' : '📍 Fetch Current GPS Location'}
                  </span>
                </div>
                <span className="text-[10px] text-stone-600 font-mono font-bold">
                  {currentLocation.city || 'Select'}
                </span>
              </button>

              {/* Quick Search inside Drawer */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-2xl text-stone-400 text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[#006090]" />
                  <span>Search snacks, sev, sweets...</span>
                </div>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </button>

              {/* Navigation Links in Mobile Drawer */}
              <div className="grid grid-cols-1 gap-1.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${isActive
                          ? 'bg-[#004060] text-white shadow-xs'
                          : 'text-stone-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100/60 hover:text-amber-900'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-sky-50 text-[#0080B0] flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <span className="text-stone-400">→</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Quick Checkout / View Cart Button in Mobile Drawer */}
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00558f] to-[#004771] text-white text-xs font-black shadow-md active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-amber-300" />
                  <span>View Cart & Checkout</span>
                </div>
                {cartCount > 0 ? (
                  <span className="px-2 py-0.5 bg-[#F5C542] text-stone-950 font-black rounded-full text-[10px]">
                    {cartCount} items
                  </span>
                ) : (
                  <span>→</span>
                )}
              </Link>
            </div>
          </>
        )}
      </header>

      {/* Global Search Modal with Debouncing & Dual Product/Category Search */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Navbar;