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
  Compass,
  ArrowRight
} from 'lucide-react';

const savedAddresses = [
  { id: 1, label: 'Home', pincode: '302017', address: 'Flat 402, Royal Residency, Jaipur' },
  { id: 2, label: 'Office', pincode: '302001', address: 'Corporate Tower B, C-Scheme, Jaipur' },
  { id: 3, label: 'Parents', pincode: '342001', address: 'Heritage Bungalow, Jodhpur' },
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

  // Handle outside click
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

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
    { name: 'My Orders', path: '/orders', icon: Clock },
    { name: 'Our Story', path: '/about', icon: Info },
    { name: 'Contact & Support', path: '/contact', icon: Phone },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* LEFT: Logo & Delivery Location */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 shrink">
            
            {/* Binayak Logo */}
            <Link 
              to="/" 
              className="shrink-0 flex items-center transition-transform hover:scale-103 active:scale-95 cursor-pointer"
            >
              <img 
                src={binayakLogo} 
                alt="Binayak Logo" 
                className="h-9 sm:h-12 w-auto object-contain drop-shadow-xs" 
              />
            </Link>

            {/* Delivery Location Selector */}
            <div className="relative shrink min-w-0" ref={locationRef}>
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 sm:gap-2 text-left p-1 sm:p-1.5 rounded-2xl hover:bg-stone-100 transition-colors focus:outline-none max-w-full cursor-pointer"
                aria-expanded={isLocationOpen}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/10 border border-amber-300/30 flex items-center justify-center shrink-0 text-[#b45309]">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                </div>
                
                <div className="text-left leading-tight min-w-0">
                  <span className="hidden sm:block text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">
                    Express Dispatch
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 truncate max-w-[85px] xs:max-w-[120px] sm:max-w-[160px]">
                      {selectedAddress.label}
                    </span>
                    <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500 shrink-0 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Location Selector Dropdown Modal */}
              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-600">
                      Select Delivery Address
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
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
                          className={`w-full text-left p-2.5 rounded-2xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                            isSelected 
                              ? 'bg-amber-50/80 border border-amber-200 text-stone-900 font-semibold shadow-2xs' 
                              : 'hover:bg-stone-50 border border-transparent text-stone-700'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#981b2e]' : 'text-stone-400'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between font-bold text-stone-900">
                              <span>{addr.label}</span>
                              <span className="text-[11px] font-semibold text-stone-500 font-mono">{addr.pincode}</span>
                            </div>
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">{addr.address}</p>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0 self-center" />}
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
                        className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                        className="px-3.5 py-2 bg-[#0a2540] text-white text-xs font-bold rounded-xl hover:bg-[#061727] shrink-0 cursor-pointer"
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

          {/* MIDDLE: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-2 lg:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sev, chivda, sweets, gift packs..."
                className="w-full pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-900 placeholder:text-stone-400 rounded-full border border-stone-200/80 focus:border-[#0a2540] focus:ring-2 focus:ring-[#0a2540]/10 focus:outline-none transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* RIGHT: Navigation Links & Cart Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all ${
                      isActive
                        ? 'text-[#0a2540] bg-stone-100 shadow-2xs font-extrabold'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Circular Search Button (Mobile/Tablet) */}
            <div className="relative md:hidden" ref={searchRef}>
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 flex items-center justify-center text-stone-700 transition-colors focus:outline-none cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-stone-700" />
              </button>

              {/* Popover Search Box */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search sweets & snacks..."
                      className="w-full pl-9 pr-8 py-2 text-xs bg-stone-100 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer"
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
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0a2540] hover:bg-[#061727] active:scale-95 text-white flex items-center justify-center transition-all group shrink-0 shadow-xs cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-108 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 sm:min-w-5 sm:h-5 px-1 bg-[#ffd25d] text-stone-950 text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 active:scale-95 transition-colors focus:outline-none cursor-pointer"
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

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200/80 bg-white/98 backdrop-blur-lg px-4 py-4 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <img src={binayakLogo} alt="Binayak" className="h-7 w-auto object-contain" />
              <span className="font-extrabold text-sm text-[#0a2540] font-brand">Binayak Industries</span>
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Menu</span>
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
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-stone-900 text-white font-black shadow-xs'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
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