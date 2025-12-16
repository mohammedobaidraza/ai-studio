import { useState, useEffect, useCallback } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MarketplaceScene from "@/components/MarketplaceScene";
import CommandPalette from "@/components/CommandPalette";
import AgentDetail from "@/components/AgentDetail";
import LaunchPanel from "@/components/LaunchPanel";
import { agents, Agent } from "@/data/agents";

const Index = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);

  // Handle scroll for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleExplore = useCallback(() => {
    document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAgentClick = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
    setDetailOpen(true);
  }, []);

  const handleLaunch = useCallback((agent: Agent) => {
    setDetailOpen(false);
    setSelectedAgent(agent);
    setLaunchOpen(true);
  }, []);

  const handleCommandSelect = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
    setDetailOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - appears on scroll */}
      <Navbar
        visible={showNavbar}
        onCommandOpen={() => setCommandOpen(true)}
      />

      {/* Hero Section */}
      <Hero onExplore={handleExplore} />

      {/* 3D Agent Marketplace */}
      <section id="agents" className="relative">
        <div className="text-center pt-16 pb-8 px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Explore the Marketplace
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Navigate through our curated collection of AI agents
          </p>
        </div>
        <MarketplaceScene agents={agents} onAgentClick={handleAgentClick} />
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">A</span>
            </div>
            <span className="text-sm">© 2024 AgentHub. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
          </div>
        </div>
      </footer>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onAgentSelect={handleCommandSelect}
      />

      {/* Agent Detail Modal */}
      <AgentDetail
        agent={selectedAgent}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onLaunch={handleLaunch}
      />

      {/* Launch Panel */}
      <LaunchPanel
        agent={selectedAgent}
        isOpen={launchOpen}
        onClose={() => setLaunchOpen(false)}
      />
    </div>
  );
};

export default Index;
