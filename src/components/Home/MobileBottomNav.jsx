import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Compass, 
  ShoppingBag, 
  Clock, 
  Info 
} from 'lucide-react';

const MobileBottomNav = ({ cartCount = 0 }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Cart', path: '/cart', icon: ShoppingBag, isCart: true },
    { name: 'Orders', path: '/orders', icon: Clock },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 px-2 py-1.5 shadow-xl">
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 transition-all ${
                isActive ? 'text-[#0a2540] font-black' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center relative transition-all ${
                  isActive
                    ? 'bg-[#0a2540] text-white shadow-2xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-[#ffd25d] text-stone-950 text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'text-[#0a2540] font-black' : 'text-stone-500 font-medium'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
