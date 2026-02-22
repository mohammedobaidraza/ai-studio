import { useState, useCallback, useMemo } from "react";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import MarketplaceSidebar from "@/components/MarketplaceSidebar";
import MarketplaceCard from "@/components/MarketplaceCard";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import AgentDetail from "@/components/AgentDetail";
import LaunchPanel from "@/components/LaunchPanel";
import { agents, Agent } from "@/data/agents";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredAgents = useMemo(() => {
    if (!selectedCategory) return agents;
    return agents.filter(agent => 
      agent.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  const handleAgentClick = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
    setDetailOpen(true);
  }, []);

  const handleLaunch = useCallback((agent: Agent) => {
    setDetailOpen(false);
    setSelectedAgent(agent);
    setLaunchOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <MarketplaceHeader onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <MarketplaceSidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Main Content */}
        <main className="flex-1 p-5 lg:p-8">
          {/* Title Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {selectedCategory ? `${selectedCategory} Agents` : "Today's picks"}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {filteredAgents.length} agents available
              </p>
            </div>
            <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-600 transition-all">
              <option>Most Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
              <option>A-Z</option>
            </select>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5">
            {filteredAgents.map((agent) => (
              <MarketplaceCard
                key={agent.id}
                agent={agent}
                onClick={() => handleAgentClick(agent)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No agents found in this category</p>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="mt-4 text-blue-600 hover:underline"
              >
                Browse all agents
              </button>
            </div>
          )}
        </main>
      </div>

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
