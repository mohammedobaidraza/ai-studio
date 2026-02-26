import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, Zap, BookMarked, HelpCircle } from "lucide-react";

const AvatarDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const items = [
    { icon: User, label: "Profile", action: () => navigate("/profile") },
    { icon: Zap, label: "My Agents", action: () => navigate("/profile") },
    { icon: BookMarked, label: "Saved", action: () => navigate("/profile") },
    { icon: Settings, label: "Settings", action: () => navigate("/profile") },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
    { divider: true },
    { icon: LogOut, label: "Sign Out", action: () => navigate("/auth"), destructive: true },
  ] as const;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-sage to-sky flex items-center justify-center text-card text-xs font-bold ml-1 shadow-sm cursor-pointer hover:shadow-md hover:ring-2 hover:ring-border transition-all duration-200"
      >
        A
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 w-56 bg-card rounded-xl border border-border shadow-xl shadow-foreground/5 overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[14px] font-semibold text-foreground">Alex Chen</p>
              <p className="text-[12px] text-muted-foreground">@alexchen</p>
            </div>

            <div className="py-1.5">
              {items.map((item, i) => {
                if ("divider" in item) return <div key={i} className="h-px bg-border my-1.5" />;
                return (
                  <button
                    key={i}
                    onClick={() => { setOpen(false); item.action(); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      "destructive" in item && item.destructive
                        ? "text-destructive hover:bg-destructive/5"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4 opacity-60" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarDropdown;
