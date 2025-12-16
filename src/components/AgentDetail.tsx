import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Sparkles, Shield, Zap, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { Agent } from "@/data/agents";
import { useState } from "react";

interface AgentDetailProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunch: (agent: Agent) => void;
}

const tabs = ["Overview", "Capabilities", "Permissions"];

const AgentDetail = ({ agent, isOpen, onClose, onLaunch }: AgentDetailProps) => {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!agent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:max-w-4xl md:w-full z-50"
          >
            <div className="h-full glass rounded-3xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="relative p-6 md:p-8 border-b border-border/50">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center glow-sm">
                    <Bot className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        {agent.name}
                      </h2>
                      {agent.verified && (
                        <span className="badge badge-primary flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{agent.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.tags.map((tag) => (
                        <span key={tag} className="badge">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 md:px-8 pt-4 border-b border-border/50">
                <div className="flex gap-1 p-1 bg-muted/30 rounded-xl w-fit">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {activeTab === "Overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium mb-3">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {agent.longDescription}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-subtle rounded-xl p-4 text-center">
                        <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-semibold">{agent.usageCount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total Uses</div>
                      </div>
                      <div className="glass-subtle rounded-xl p-4 text-center">
                        <Star className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-semibold">{agent.rating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div className="glass-subtle rounded-xl p-4 text-center">
                        <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-semibold">Sandboxed</div>
                        <div className="text-xs text-muted-foreground">Security</div>
                      </div>
                      <div className="glass-subtle rounded-xl p-4 text-center">
                        <Bot className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-semibold">{agent.version}</div>
                        <div className="text-xs text-muted-foreground">Version</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "Capabilities" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {agent.capabilities.map((cap, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <span className="text-foreground">{cap}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "Permissions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {agent.permissions.map((perm, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                        <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="text-foreground">{perm.name}</span>
                          <p className="text-sm text-muted-foreground mt-1">{perm.description}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 md:p-8 border-t border-border/50 flex items-center justify-between gap-4">
                <button className="btn-secondary">
                  <Star className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => onLaunch(agent)}
                  className="btn-primary flex-1 md:flex-none"
                >
                  Launch Agent
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AgentDetail;
