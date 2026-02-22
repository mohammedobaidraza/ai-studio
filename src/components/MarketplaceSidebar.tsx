import { 
  MessageSquare, Brain, Search, Code, Sparkles, Users, 
  Zap, Globe, FileText, Image, ChevronRight, SlidersHorizontal
} from "lucide-react";

interface MarketplaceSidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const categories = [
  { id: null, name: "Browse All", icon: Globe, count: 12 },
  { id: "Conversational", name: "Conversational", icon: MessageSquare, count: 4 },
  { id: "Research", name: "Research", icon: Search, count: 3 },
  { id: "Coding", name: "Coding", icon: Code, count: 3 },
  { id: "Writing", name: "Writing", icon: FileText, count: 3 },
  { id: "Analysis", name: "Analysis", icon: Brain, count: 2 },
  { id: "Creative", name: "Creative", icon: Sparkles, count: 2 },
  { id: "Multimodal", name: "Multimodal", icon: Image, count: 1 },
  { id: "Community", name: "Community", icon: Users, count: 1 },
  { id: "Fast", name: "Fast Inference", icon: Zap, count: 1 },
];

const MarketplaceSidebar = ({ selectedCategory, onCategorySelect }: MarketplaceSidebarProps) => {
  return (
    <aside className="w-[260px] h-[calc(100vh-60px)] bg-white/50 backdrop-blur-sm border-r border-black/[0.04] overflow-y-auto sticky top-[60px] hidden lg:block">
      <div className="p-4 pt-5">
        {/* Search Box */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-gray-400" />
          <input
            type="text"
            placeholder="Filter categories..."
            className="w-full pl-9 pr-4 py-2 bg-black/[0.03] rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-black/[0.08] focus:bg-white border border-transparent focus:border-black/[0.06] placeholder:text-gray-400 transition-all duration-200"
          />
        </div>

        {/* Section Label */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Categories</span>
        </div>

        {/* Categories */}
        <nav className="space-y-px">
          {categories.map((category) => {
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

        <div className="h-px bg-black/[0.04] my-4" />

        {/* Stats */}
        <div className="px-1 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-gray-400">Total agents</span>
            <span className="text-[12px] font-semibold text-gray-700">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-gray-400">Verified</span>
            <span className="text-[12px] font-semibold text-gray-700">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-gray-400">Free</span>
            <span className="text-[12px] font-semibold text-emerald-600">100%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
