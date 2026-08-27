import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import binayakLogo from '../assets/logo.png';
import { 
  MapPin, 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Check, 
  Sparkles,
  Phone,
  Info,
  Clock,
  Compass
} from 'lucide-react';

const savedAddresses = [
  { id: 1, label: 'Home', pincode: '411014', address: 'Flat 402, Royale Palms, Viman Nagar, Pune' },
  { id: 2, label: 'Office', pincode: '411006', address: 'Tech Park Tower B, Yerawada, Pune' },
  { id: 3, label: 'Parents', pincode: '411038', address: 'Bungalow 12, Kothrud, Pune' },
];

const Navbar = () => {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);

  const locationRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLocationOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Handle outside click for location and search dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect scroll for subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Explore Snacks', path: '/explore', icon: Compass },
    { name: 'Orders', path: '/orders', icon: Clock },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 ${isScrolled ? 'shadow-sm border-b border-stone-200/80' : 'border-b border-stone-100'}`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18 lg:h-20 gap-1.5 sm:gap-4">
          
          {/* LEFT: Logo & Delivery Location */}
          <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-4 min-w-0 shrink">
            
            {/* Binayak Oval Logo */}
            <Link 
              to="/" 
              className="shrink-0 flex items-center transition-transform hover:scale-102 active:scale-95"
            >
              <img 
                src={binayakLogo} 
                alt="Binayak Logo" 
                className="h-8 xs:h-9 sm:h-11 lg:h-12 w-auto object-contain drop-shadow-xs" 
              />
            </Link>

            {/* Delivery Location Selector */}
            <div className="relative shrink min-w-0" ref={locationRef}>
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-left p-1 sm:p-1.5 rounded-xl hover:bg-stone-100/80 transition-colors focus:outline-none max-w-full"
                aria-expanded={isLocationOpen}
              >
                <div className="flex items-center justify-center shrink-0 text-[#0c3a5e]">
                  <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>
                
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[9px] xs:text-[10px] sm:text-[11px] font-medium text-stone-500 whitespace-nowrap">
                    Delivering to
                  </span>
                  <div className="flex items-center gap-0.5 xs:gap-1">
                    <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-stone-900 truncate max-w-[90px] xs:max-w-[125px] sm:max-w-[180px] md:max-w-[220px]">
                      {selectedAddress.label} - {selectedAddress.pincode}
                    </span>
                    <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-600 shrink-0 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Location Selector Dropdown Modal */}
              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-72 xs:w-80 bg-white rounded-2xl shadow-xl border border-stone-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                      Select Delivery Address
                    </span>
                    <span className="text-[10px] font-semibold text-[#0c3a5e] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                      Active
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-1.5 max-h-56 overflow-y-auto">
                    {savedAddresses.map((addr) => {
                      const isSelected = addr.id === selectedAddress.id;
                      return (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => {
                            setSelectedAddress(addr);
                            setIsLocationOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                            isSelected 
                              ? 'bg-sky-50/90 border border-sky-200 text-stone-900 font-semibold' 
                              : 'hover:bg-stone-50 border border-transparent text-stone-700'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#0c3a5e]' : 'text-stone-400'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between font-bold text-stone-900">
                              <span>{addr.label}</span>
                              <span className="text-[11px] font-semibold text-stone-500">{addr.pincode}</span>
                            </div>
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">{addr.address}</p>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#0c3a5e] shrink-0 self-center" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter 6-digit pincode"
                        maxLength={6}
                        className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#0c3a5e]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.length === 6) {
                            setSelectedAddress({
                              id: Date.now(),
                              label: 'Custom',
                              pincode: e.target.value,
                              address: `Pincode: ${e.target.value}`
                            });
                            setIsLocationOpen(false);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="px-3.5 py-2 bg-[#0c3a5e] text-white text-xs font-bold rounded-lg hover:bg-[#082a46] shrink-0"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling;
                          if (input && input.value.length === 6) {
                            setSelectedAddress({
                              id: Date.now(),
                              label: 'Custom',
                              pincode: input.value,
                              address: `Pincode: ${input.value}`
                            });
                            setIsLocationOpen(false);
                          }
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE: Search Bar (Visible on Tablet & Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sev, chivda, sweets, gift packs..."
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-stone-800 placeholder:text-stone-400 rounded-full border border-stone-200/80 focus:border-[#0c3a5e] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* RIGHT: Action Icons & Links */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-[#0c3a5e] bg-sky-50 font-bold'
                        : 'text-stone-700 hover:text-[#0c3a5e] hover:bg-stone-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Circular Search Button (Mobile & Tablet) */}
            <div className="relative" ref={searchRef}>
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100/90 hover:bg-stone-200/80 active:scale-95 flex items-center justify-center text-stone-700 transition-colors focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 text-stone-700" />
              </button>

              {/* Popover Search Box for Mobile / Tablet */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 xs:w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search sweets & snacks..."
                      className="w-full pl-9 pr-8 py-2 text-xs bg-stone-100 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0c3a5e]/20"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[#0c3a5e]/10 hover:bg-[#0c3a5e]/15 active:scale-95 text-[#0c3a5e] flex items-center justify-center transition-all group shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 sm:min-w-5 sm:h-5 px-1 bg-[#0c3a5e] text-white text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile / Tablet Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 xs:p-2 rounded-xl text-stone-700 hover:bg-stone-100 active:scale-95 transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200/80 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <img src={binayakLogo} alt="Binayak" className="h-7 w-auto object-contain" />
              <span className="font-extrabold text-sm text-[#0c3a5e] font-brand">Binayak</span>
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Navigation</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-[#0c3a5e] font-bold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-[#0c3a5e]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="w-4 h-4 text-stone-400" />}
                    <span>{item.name}</span>
                  </div>
                  <span className="text-xs text-stone-400">→</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;