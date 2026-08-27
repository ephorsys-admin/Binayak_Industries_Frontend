import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Search, 
  ShoppingBag, 
  Clock, 
  User 
} from 'lucide-react';

const MobileBottomNav = ({ cartCount = 0 }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 items-center">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 font-bold ${
            currentPath === '/' ? 'text-[#00bcd4]' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
            currentPath === '/' ? 'bg-[#e0f7fa]' : ''
          }`}>
            <HomeIcon className={`w-5 h-5 ${currentPath === '/' ? 'text-[#00acc1]' : 'text-stone-600'}`} />
          </div>
          <span className={`text-[10px] mt-0.5 ${currentPath === '/' ? 'text-[#00838f]' : 'text-stone-500'}`}>
            Home
          </span>
        </Link>

        {/* Search */}
        <Link
          to="/explore"
          className={`flex flex-col items-center justify-center py-1 ${
            currentPath === '/explore' ? 'text-[#00bcd4] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
            currentPath === '/explore' ? 'bg-[#e0f7fa]' : ''
          }`}>
            <Search className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Search</span>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className={`flex flex-col items-center justify-center py-1 relative ${
            currentPath === '/cart' ? 'text-[#00bcd4] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center relative ${
            currentPath === '/cart' ? 'bg-[#e0f7fa]' : ''
          }`}>
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 bg-[#981b2e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Cart</span>
        </Link>

        {/* Orders */}
        <Link
          to="/orders"
          className={`flex flex-col items-center justify-center py-1 ${
            currentPath === '/orders' ? 'text-[#00bcd4] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
            currentPath === '/orders' ? 'bg-[#e0f7fa]' : ''
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Orders</span>
        </Link>

        {/* Profile */}
        <Link
          to="/about"
          className={`flex flex-col items-center justify-center py-1 ${
            currentPath === '/about' ? 'text-[#00bcd4] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
            currentPath === '/about' ? 'bg-[#e0f7fa]' : ''
          }`}>
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;
