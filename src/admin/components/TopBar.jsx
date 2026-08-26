import {
    Menu,
    User,
    LogOut,
    Maximize,
    Minimize,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopBar = ({ setSidebarOpen }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // Detect fullscreen change
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".profile-dropdown")) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
            className="relative z-10 bg-white border-b border-slate-200 px-6 h-15 flex items-center justify-between shrink-0"
        >
            {/* Left */}
            <div className="flex items-center gap-3">
                {/* Mobile Sidebar */}
                <motion.button
                    whileTap={{ scale: 0.92 }}
                    className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <Menu size={18} />
                </motion.button>

                {/* Logo / Brand */}
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                    className="text-[15px] font-medium tracking-widest text-slate-800"
                >
                    NAME
                </motion.span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Fullscreen */}
                <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleFullscreen}
                    className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                    aria-label="Toggle fullscreen"
                >
                    {isFullscreen ? (
                        <Minimize size={18} />
                    ) : (
                        <Maximize size={18} />
                    )}
                </motion.button>

                {/* Profile */}
                <div className="relative profile-dropdown">
                    <motion.button
                        onClick={() => setProfileOpen((prev) => !prev)}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                    >
                        {/* Static User Info */}
                        <div className="hidden sm:block text-right">
                            <p className="text-[13px] font-medium text-slate-800 leading-tight">
                                Admin
                            </p>

                            <p className="text-[11px] uppercase tracking-wider text-slate-400 leading-tight">
                                Administrator
                            </p>
                        </div>

                        {/* User Icon */}
                        <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
                            <User size={18} />
                        </div>
                    </motion.button>

                    {/* Dropdown */}
                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 0.96,
                                }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                }}
                                className="absolute right-0 mt-2.5 w-52 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden z-50"
                            >
                                {/* Identity */}
                                <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-slate-100">
                                    <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[13px] font-medium text-blue-700 shrink-0">
                                        AD
                                    </div>

                                    <div>
                                        <p className="text-[13px] font-medium text-slate-800">
                                            Admin
                                        </p>

                                        <p className="text-[11px] text-slate-400 capitalize">
                                            Administrator
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
};

export default TopBar;