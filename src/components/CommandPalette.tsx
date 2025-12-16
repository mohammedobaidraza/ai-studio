import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, Bot, Sparkles, X } from "lucide-react";
import { Agent, agents } from "@/data/agents";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentSelect: (agent: Agent) => void;
}

const CommandPalette = ({ isOpen, onClose, onAgentSelect }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredAgents(agents);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredAgents(
        agents.filter(
          (agent) =>
            agent.name.toLowerCase().includes(lowerQuery) ||
            agent.description.toLowerCase().includes(lowerQuery) ||
            agent.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
      );
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSelect = (agent: Agent) => {
    onAgentSelect(agent);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4 z-50"
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search agents, capabilities, or type naturally..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredAgents.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Agents
                    </div>
                    {filteredAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => handleSelect(agent)}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {agent.name}
                            </span>
                            {agent.verified && (
                              <Sparkles className="w-3 h-3 text-primary" />
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground truncate block">
                            {agent.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Command className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No agents found for "{query}"
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Try searching for different capabilities
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">esc</kbd>
                    close
                  </span>
                </div>
                <span>{filteredAgents.length} agents</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
