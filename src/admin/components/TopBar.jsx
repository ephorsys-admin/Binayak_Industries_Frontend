import {
  Menu,
  User,
  Maximize,
  Minimize,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutAdmin } from "../../Redux/features/auth/authThunk";
import binayakLogo from "../../assets/logo.png";

const TopBar = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const adminName = admin?.name || "Manoj Kumar";
  const adminRole = admin?.role || "Super Admin";

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await dispatch(logOutAdmin());
    navigate("/admin");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="relative z-10 bg-white/95 backdrop-blur-md border-b border-stone-200/90 px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between shrink-0 shadow-2xs"
    >
      {/* Left: Mobile Hamburger & Brand Title */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Hamburger Drawer Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition cursor-pointer"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </motion.button>

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <img
            src={binayakLogo}
            alt="Binayak Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-xs"
          />
          <span className="text-xs sm:text-sm font-black tracking-wider text-[#0a2540] font-brand">
            BINAYAK <span className="text-[#981b2e]">INDUSTRIES</span>
          </span>
        </div>
      </div>

      {/* Right: Fullscreen & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Fullscreen Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleFullscreen}
          className="hidden sm:flex w-8 h-8 rounded-xl border border-stone-200 items-center justify-center text-stone-600 hover:bg-stone-100 transition cursor-pointer"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative profile-dropdown">
          <motion.button
            onClick={() => setProfileOpen((prev) => !prev)}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-2xl hover:bg-stone-100 transition cursor-pointer border border-transparent hover:border-stone-200"
          >
            {/* User Details (Desktop) */}
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-stone-900 leading-tight">
                {adminName}
              </p>
              <p className="text-[10px] uppercase font-black tracking-wider text-[#981b2e] leading-tight">
                {adminRole}
              </p>
            </div>

            {/* Avatar Pill */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a2540] border-2 border-white shadow-xs flex items-center justify-center text-[#ffd25d] font-black text-xs">
              <span>{adminName.charAt(0)}</span>
            </div>
          </motion.button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-50 p-1.5 animate-in fade-in"
              >
                <div className="px-3 py-2 border-b border-stone-100 mb-1">
                  <p className="text-xs font-bold text-stone-900 truncate">
                    {adminName}
                  </p>
                  <p className="text-[10px] text-stone-400 capitalize">
                    {adminRole}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;