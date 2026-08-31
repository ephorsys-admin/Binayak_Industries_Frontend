import {
  LayoutGrid,
  Layers,
  ChefHat,
  ClipboardList,
  Receipt,
  MessageSquare,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoutModal from "../adminModals/LogoutModal";
import { useState } from "react";
import Modal from "../../UI/Modal";
import binayakLogo from "../../assets/logo.png";

const NAV_ITEMS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    path: "/admin/categories",
    label: "Categories",
    icon: Layers,
  },
  {
    path: "/admin/products",
    label: "Products",
    icon: ChefHat,
  },
  {
    path: "/admin/orders",
    label: "Orders",
    icon: ClipboardList,
  },
  {
    path: "/admin/billing",
    label: "Billing",
    icon: Receipt,
  },
  {
    path: "/admin/inquiries",
    label: "Inquiries",
    icon: MessageSquare,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [logoutview, setLogoutView] = useState(false);

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container (Matching Frontend Royal Navy #0a2540 & Crimson #981b2e) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0a2540] text-white flex flex-col transition-transform duration-300 border-r border-[#061829] shadow-2xl
          lg:relative lg:translate-x-0 lg:shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex items-center justify-between px-5 py-4 border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
              <img
                src={binayakLogo}
                alt="Binayak Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-black tracking-tight leading-tight text-white font-brand">
                BINAYAK
              </p>
              <span className="text-[10px] text-[#ffd25d] font-black tracking-wider uppercase block">
                Admin Control Panel
              </span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-xl text-stone-300 hover:text-white transition cursor-pointer"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
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
                delay: 0.05 + i * 0.05,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <NavLink
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#981b2e] text-white font-black shadow-lg shadow-[#981b2e]/30 scale-[1.02] border border-rose-400/30"
                      : "text-stone-300 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon size={19} className="shrink-0 stroke-[2.2]" />
                <span className="tracking-wide">{label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Live Website Quick Link & Logout */}
        <div className="px-3 pb-6 space-y-2 border-t border-white/10 pt-4">
          <NavLink
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-[#ffd25d] transition-colors border border-white/10"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={15} />
              <span>Live Storefront</span>
            </span>
            <span className="text-stone-400 font-mono">↗</span>
          </NavLink>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex cursor-pointer items-center justify-center gap-2.5 px-4 py-2.5 bg-rose-600/25 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-600 rounded-xl text-xs font-bold text-rose-200 hover:text-white transition-all shadow-xs"
            onClick={() => setLogoutView(true)}
          >
            <LogOut size={16} />
            <span>Logout Account</span>
          </motion.button>
        </div>

        {/* Logout Modal */}
        <Modal isOpen={logoutview} onClose={() => setLogoutView(false)}>
          <LogoutModal onClose={() => setLogoutView(false)} />
        </Modal>
      </aside>
    </>
  );
};

export default Sidebar;