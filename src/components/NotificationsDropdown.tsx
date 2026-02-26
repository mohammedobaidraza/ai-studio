import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, MessageCircle, Download, Star, Check } from "lucide-react";

const mockNotifications = [
  { id: "1", type: "like", text: "Sarah liked your post \"AI agents in production\"", time: "2m ago", read: false, icon: Heart },
  { id: "2", type: "comment", text: "James replied to your comment", time: "15m ago", read: false, icon: MessageCircle },
  { id: "3", type: "download", text: "Code Assistant Pro was downloaded 50 times today", time: "1h ago", read: false, icon: Download },
  { id: "4", type: "rating", text: "New 5-star review on Data Analyzer", time: "3h ago", read: true, icon: Star },
  { id: "5", type: "like", text: "12 people liked your showcase post", time: "6h ago", read: true, icon: Heart },
];

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-muted/50 rounded-lg relative transition-all duration-150"
      >
        <Bell className="w-[18px] h-[18px] text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-destructive rounded-full ring-[1.5px] ring-card" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 w-80 bg-card rounded-xl border border-border shadow-xl shadow-foreground/5 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer ${
                    !n.read ? "bg-sage/5" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    !n.read ? "bg-sage/15" : "bg-muted"
                  }`}>
                    <n.icon className={`w-4 h-4 ${!n.read ? "text-cocoa" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-snug ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {n.text}
                    </p>
                    <span className="text-[11px] text-muted-foreground mt-0.5 block">{n.time}</span>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-sage mt-1.5 flex-shrink-0" />}
                </div>
              ))}
            </div>

            <div className="px-4 py-2.5 border-t border-border">
              <button className="w-full text-center text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsDropdown;
