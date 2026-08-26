import {
    LayoutDashboard,
    LogOut,
    X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoutModal from "../adminModals/LogoutModal";
import { useState } from "react";
import Modal from "../../UI/Modal";

const NAV_ITEMS = [
    {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [logoutview, setLogoutView] = useState(false);

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300
          lg:relative lg:translate-x-0 lg:shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut",
                    }}
                    className="flex items-center justify-between px-6 py-1 border-b border-white/10"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                                src="/mylogo.png"
                                alt="SAVERA Logo"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        </div>

                        <div>
                            <p className="text-md font-extrabold tracking-tight leading-tight">
                                NAME
                            </p>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition cursor-pointer"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </motion.div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.map(({ path, label, icon: Icon }, i) => (
                        <motion.div
                            key={path}
                            initial={{
                                opacity: 0,
                                x: -16,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.1 + i * 0.07,
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                        >
                            <NavLink
                                to={path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                        : "text-slate-400 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </NavLink>
                        </motion.div>
                    ))}
                </nav>

                {/* Logout - Design Only */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.4,
                        duration: 0.3,
                    }}
                    className="px-4 pb-6"
                >
                    <motion.button
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium text-white transition-colors"
                        onClick={() => setLogoutView(true)}

                    >
                        <LogOut size={18} />
                        Logout
                    </motion.button>
                </motion.div>
                {/* Logout Modal  */}
                <Modal
                    isOpen={logoutview}
                    onClose={() => setLogoutView(false)}
                    title=""
                    size="sm">
                    <LogoutModal onClose={() => setLogoutView(false)} />
                </Modal>
            </aside>
        </>
    );
};

export default Sidebar;