import { useMemo, useState } from "react";
import { 
  MessageSquare, Brain, Search, Code, Sparkles, Users, 
  Zap, Globe, FileText, Image, SlidersHorizontal,
  Shield, Wrench, Bot, Lock, Cpu
} from "lucide-react";
import { agents } from "@/data/agents";
import GlassSurface from "./GlassSurface";

interface MarketplaceSidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const categoryDefs = [
  { id: null, name: "Browse All", icon: Globe },
  { id: "AI Agent", name: "AI Agents", icon: Bot },
  { id: "Open Source", name: "Open Source", icon: Code },
  { id: "Coding", name: "Coding", icon: Cpu },
  { id: "DevTools", name: "DevTools", icon: Wrench },
  { id: "Security", name: "Security", icon: Shield },
  { id: "Conversational", name: "Conversational", icon: MessageSquare },
  { id: "Research", name: "Research", icon: Search },
  { id: "Writing", name: "Writing", icon: FileText },
  { id: "Analysis", name: "Analysis", icon: Brain },
  { id: "Creative", name: "Creative", icon: Sparkles },
  { id: "Multimodal", name: "Multimodal", icon: Image },
  { id: "Privacy", name: "Privacy", icon: Lock },
  { id: "Community", name: "Community", icon: Users },
  { id: "Fast", name: "Fast Inference", icon: Zap },
];

const MarketplaceSidebar = ({ selectedCategory, onCategorySelect }: MarketplaceSidebarProps) => {
  const [filterText, setFilterText] = useState("");

  const categories = useMemo(() => {
    return categoryDefs.map(cat => {
      const count = cat.id === null
        ? agents.length
        : agents.filter(a => a.tags.some(t => t.toLowerCase() === cat.id!.toLowerCase())).length;
      const displayCount = cat.id === null && count >= 100 ? "100+" : `${count}`;
      return { ...cat, count: displayCount };
    });
  }, []);

  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categories;
    return categories.filter(c => c.name.toLowerCase().includes(filterText.toLowerCase()));
  }, [categories, filterText]);

  return (
    <aside className="w-[260px] h-[calc(100vh-60px)] border-r border-black/[0.04] overflow-y-auto sticky top-[60px] hidden lg:block bg-transparent">
      <div className="p-4 pt-5">
        {/* Glass Search Box */}
        <GlassSurface
          width="100%"
          height={40}
          borderRadius={12}
          brightness={55}
          opacity={0.9}
          blur={10}
          backgroundOpacity={0.1}
          saturation={1.1}
          className="mb-5"
        >
          <div className="relative w-full h-full flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-gray-400" />
            <input
              type="text"
              placeholder="Filter categories..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full h-full pl-9 pr-4 bg-transparent rounded-xl text-[13px] focus:outline-none placeholder:text-gray-400 transition-all duration-200"
            />
          </div>
        </GlassSurface>

        {/* Section Label */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Categories</span>
        </div>

        {/* Categories */}
        <nav className="space-y-px">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id ?? "all"}
                onClick={() => onCategorySelect(category.id)}
                className={`flex items-center gap-2.5 w-full px-2.5 py-[9px] rounded-lg text-left transition-all duration-150 group ${
                  isActive 
                    ? "bg-gray-900 text-white shadow-sm shadow-gray-900/10" 
                    : "hover:bg-black/[0.04] text-gray-600"
                }`}
              >
                <Icon className={`w-[15px] h-[15px] transition-colors ${isActive ? "text-white/80" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span className="text-[13px] font-medium flex-1">{category.name}</span>
                <span className={`text-[11px] font-medium transition-colors ${isActive ? "text-white/60" : "text-gray-400"}`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="h-px bg-black/[0.04] my-4" />

        {/* Filters */}
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Filters</span>
        </div>
        <div className="space-y-2.5 px-1">
          {[
            { label: "Free to use", checked: true },
            { label: "Verified only", checked: true },
            { label: "Top rated (4.5+)", checked: false },
          ].map((filter) => (
            <label key={filter.label} className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-500 focus:ring-offset-0 transition" 
                defaultChecked={filter.checked} 
              />
              <span className="text-[13px] text-gray-500 group-hover:text-gray-800 transition-colors">{filter.label}</span>
            </label>
          ))}
        </div>

      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
