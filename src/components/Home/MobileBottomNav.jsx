import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  ShoppingBag, 
  Info 
} from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Cart', path: '/cart', icon: ShoppingBag },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-sky-100 px-3 py-2 shadow-[0_-8px_25px_rgba(0,40,90,0.08)]"
    >
      <div className="grid grid-cols-4 items-center gap-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center py-0.5 group select-none cursor-pointer"
            >
              {/* 3D Solid Button Container */}
              <div
                className={`relative w-12 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00558f] via-[#006ea8] to-[#004771] border border-amber-300/80 shadow-[0_4px_14px_rgba(0,80,150,0.32)] scale-105'
                    : 'bg-[#f0f7fd]/80 hover:bg-[#e4f1fc] border border-[#d2e8f8]/80 text-[#006090] hover:scale-102 active:scale-95 shadow-2xs'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive 
                      ? 'text-[#F5C542] fill-amber-300/20 drop-shadow-[0_0_6px_rgba(245,197,66,0.6)] scale-110' 
                      : 'text-[#005080] group-hover:scale-110'
                  }`} 
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1 tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'font-black text-[#004060] drop-shadow-2xs scale-105'
                    : 'font-bold text-slate-600 group-hover:text-[#004060]'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
