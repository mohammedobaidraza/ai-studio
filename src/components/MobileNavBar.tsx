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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-5 pb-[env(safe-area-inset-bottom,10px)] pt-2">
      <div
        className="mx-auto max-w-sm rounded-[22px] px-2 py-2 flex items-center justify-around"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
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
              className="relative flex flex-col items-center justify-center w-14 h-11 rounded-2xl transition-all duration-200"
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="glass-nav-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.10))",
                    boxShadow:
                      "0 0 16px 2px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`relative z-10 w-[21px] h-[21px] transition-all duration-200 ${
                  isActive ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" : "text-white/55"
                }`}
                strokeWidth={isActive ? 2.2 : 1.6}
              />
              <span
                className={`relative z-10 text-[9px] mt-0.5 font-medium transition-all duration-200 ${
                  isActive ? "text-white" : "text-white/40"
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
