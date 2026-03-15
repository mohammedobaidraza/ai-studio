import { useState, useCallback, useMemo, ChangeEvent } from "react";
import { Menu } from "lucide-react";
import MarketplaceSidebar from "@/components/MarketplaceSidebar";
import agentStoreLogo from "@/assets/logos/agentstore.png";
import MarketplaceCard from "@/components/MarketplaceCard";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import AgentDetail from "@/components/AgentDetail";
import LaunchPanel from "@/components/LaunchPanel";
import { agents, Agent } from "@/data/agents";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 24;

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [launchOpen, setLaunchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAgents = useMemo(() => {
    let filtered = selectedCategory 
      ? agents.filter(agent => agent.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()))
      : agents;
    
    switch (sortBy) {
      case "newest":
        return [...filtered].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      case "rated":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "az":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "popular":
      default:
        return [...filtered].sort((a, b) => b.usageCount - a.usageCount);
    }
  }, [selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAgents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAgents, currentPage]);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
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

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(220 6% 90%)" }}>
      {/* Neumorphic Logo Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-center h-14"
        style={{
          background: "hsl(220 6% 90%)",
          boxShadow: "0 4px 8px rgba(163,168,178,0.25), 0 -2px 4px rgba(255,255,255,0.5) inset",
        }}
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden absolute left-4 p-2 rounded-xl transition-all"
          style={{ color: "hsl(220 10% 35%)" }}
        >
          <Menu className="w-5 h-5" />
        </button>
        <button onClick={() => handleCategorySelect(null)} className="flex items-center gap-2">
          <img src={agentStoreLogo} alt="Agent Store" className="w-7 h-7 rounded-lg" />
          <span className="text-[15px] font-bold tracking-tight" style={{ color: "hsl(220 15% 22%)" }}>Agent Store</span>
        </button>
      </div>

      <div className="flex">
        <MarketplaceSidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <MobileFilterDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <main className="flex-1 p-5 lg:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-bold tracking-tight" style={{ color: "hsl(220 15% 22%)" }}>
                  {selectedCategory ? `${selectedCategory}` : "Today's picks"}
                </h2>
                {selectedCategory && (
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className="text-[12px] font-medium transition-colors ml-1"
                    style={{ color: "hsl(220 8% 55%)" }}
                  >
                    ← All
                  </button>
                )}
              </div>
              <p className="text-[13px] mt-0.5" style={{ color: "hsl(220 8% 55%)" }}>
                1M+ agents available · Page {currentPage} of {totalPages}
              </p>
            </div>
            <select 
              value={sortBy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 rounded-xl text-[13px] focus:outline-none transition-all appearance-none pr-8 cursor-pointer"
              style={{
                background: "hsl(220 6% 90%)",
                boxShadow: "3px 3px 6px rgba(163,168,178,0.5), -3px -3px 6px rgba(255,255,255,0.7)",
                color: "hsl(220 8% 45%)",
                border: "none",
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="rated">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="az">A-Z</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {paginatedAgents.map((agent) => (
              <MarketplaceCard
                key={agent.id}
                agent={agent}
                onClick={() => handleAgentClick(agent)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-8 mb-4">
              <button
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  color: "hsl(220 8% 45%)",
                  background: "hsl(220 6% 90%)",
                  boxShadow: "3px 3px 6px rgba(163,168,178,0.4), -3px -3px 6px rgba(255,255,255,0.6)",
                }}
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              {getPageNumbers().map((page, i) =>
                page === "ellipsis" ? (
                  <span key={`e${i}`} className="px-2 text-[13px]" style={{ color: "hsl(220 8% 55%)" }}>…</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-9 h-9 rounded-xl text-[13px] font-medium transition-all"
                    style={currentPage === page ? {
                      background: "hsl(220 6% 90%)",
                      boxShadow: "inset 3px 3px 6px rgba(163,168,178,0.5), inset -3px -3px 6px rgba(255,255,255,0.7)",
                      color: "hsl(220 15% 22%)",
                    } : {
                      background: "hsl(220 6% 90%)",
                      boxShadow: "3px 3px 6px rgba(163,168,178,0.4), -3px -3px 6px rgba(255,255,255,0.6)",
                      color: "hsl(220 8% 50%)",
                    }}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  color: "hsl(220 8% 45%)",
                  background: "hsl(220 6% 90%)",
                  boxShadow: "3px 3px 6px rgba(163,168,178,0.4), -3px -3px 6px rgba(255,255,255,0.6)",
                }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {filteredAgents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-base" style={{ color: "hsl(220 8% 55%)" }}>No agents found in this category</p>
              <button 
                onClick={() => handleCategorySelect(null)}
                className="mt-3 text-[13px] font-medium transition-colors"
                style={{ color: "hsl(220 15% 22%)" }}
              >
                ← Browse all agents
              </button>
            </div>
          )}
        </main>
      </div>

      <AgentDetail
        agent={selectedAgent}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onLaunch={handleLaunch}
      />

      <LaunchPanel
        agent={selectedAgent}
        isOpen={launchOpen}
        onClose={() => setLaunchOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default Index;
