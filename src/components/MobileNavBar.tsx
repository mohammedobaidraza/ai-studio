import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, LayoutGrid, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: LayoutGrid, label: "Browse", path: "/browse" },
  { icon: MessageCircle, label: "Community", path: "/community" },
  { icon: User, label: "Profile", path: "/profile" },
];

const MobileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom,8px)] pt-2 pointer-events-none">
      <div
        className="w-full max-w-[360px] md:max-w-[400px] rounded-2xl px-1.5 py-1.5 flex items-center justify-around pointer-events-auto"
        style={{
          background: "hsl(220 6% 90%)",
          boxShadow: "8px 8px 16px rgba(163,168,178,0.5), -8px -8px 16px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center justify-center w-[56px] h-[46px] rounded-xl transition-all duration-150"
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-[3px] rounded-[10px]"
                  style={{
                    background: "hsl(220 6% 90%)",
                    boxShadow: "inset 2px 2px 4px rgba(163,168,178,0.5), inset -2px -2px 4px rgba(255,255,255,0.7)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                className="relative z-10 w-[19px] h-[19px] transition-colors duration-150"
                style={{ color: isActive ? "hsl(220 15% 22%)" : "hsl(220 8% 60%)" }}
                strokeWidth={1.5}
              />
              <span
                className="relative z-10 text-[9px] mt-[2px] font-medium tracking-[0.02em] transition-colors duration-150"
                style={{ color: isActive ? "hsl(220 15% 28%)" : "hsl(220 8% 60%)" }}
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
