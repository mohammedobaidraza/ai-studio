import { motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  visible: boolean;
  onCommandOpen: () => void;
}

const Navbar = ({ visible, onCommandOpen }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto bg-card/80 backdrop-blur-lg rounded-2xl px-6 py-3 flex items-center justify-between border border-border shadow-sm">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-foreground font-semibold text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">A</span>
          </div>
          AgentHub
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Browse
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Categories
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Developers
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCommandOpen}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 hover:text-foreground transition-all"
          >
            <Command className="w-3 h-3" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-background text-xs border border-border">⌘K</kbd>
          </button>
          <button className="btn-primary text-sm py-2 px-4">
            Sign In
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-ghost p-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-auto max-w-7xl bg-card rounded-xl p-4 border border-border shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <a href="#" className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </a>
            <a href="#" className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#" className="px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              Developers
            </a>
            <button
              onClick={onCommandOpen}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground"
            >
              <Command className="w-4 h-4" />
              Search agents...
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
