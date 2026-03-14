import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Grid3X3, MessageCircle, User } from "lucide-react";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-[env(safe-area-inset-bottom,8px)] pt-2">
      <div className="mx-auto max-w-md rounded-2xl px-3 py-2.5 flex items-center justify-around neu-bar">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || (path === "/" && location.pathname === "/");
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`neu-btn ${isActive ? "neu-btn--active" : ""}`}
              aria-label={label}
            >
              <Icon className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-[#6C7A89]" : "text-[#A0AAB4]"}`} strokeWidth={isActive ? 2.2 : 1.8} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavBar;
