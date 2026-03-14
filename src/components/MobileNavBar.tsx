import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Grid3X3, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Grid3X3, label: "Browse", path: "/browse" },
  { icon: MessageCircle, label: "Community", path: "/community" },
  { icon: User, label: "Profile", path: "/profile" },
];

const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-[env(safe-area-inset-bottom,10px)] pt-2 pointer-events-none">
      <div
        className="mx-auto max-w-md rounded-[22px] px-3 py-2 flex items-center justify-around pointer-events-auto"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(28px) saturate(1.8)",
          WebkitBackdropFilter: "blur(28px) saturate(1.8)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        }}
      >
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            location.pathname === path ||
            (path === "/" && location.pathname === "/");
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-150"
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="glass-nav-pill"
                  className="absolute inset-0.5 rounded-[14px]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                    boxShadow:
                      "0 0 18px 3px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <Icon
                className={`relative z-10 w-[20px] h-[20px] transition-all duration-150 ${
                  isActive
                    ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]"
                    : "text-white/50"
                }`}
                strokeWidth={isActive ? 2.2 : 1.6}
              />
              <span
                className={`relative z-10 text-[9px] mt-[3px] font-medium tracking-wide transition-all duration-150 ${
                  isActive ? "text-white/90" : "text-white/35"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavBar;
