import { 
  MessageSquare, Brain, Search, Code, Sparkles, Users, 
  Zap, Globe, FileText, Image, ChevronRight, TrendingUp
} from "lucide-react";

interface MarketplaceSidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const categories = [
  { id: null, name: "Browse All", icon: Globe },
  { id: "Conversational", name: "Conversational", icon: MessageSquare },
  { id: "Research", name: "Research", icon: Search },
  { id: "Coding", name: "Coding", icon: Code },
  { id: "Writing", name: "Writing", icon: FileText },
  { id: "Analysis", name: "Analysis", icon: Brain },
  { id: "Creative", name: "Creative", icon: Sparkles },
  { id: "Multimodal", name: "Multimodal", icon: Image },
  { id: "Community", name: "Community", icon: Users },
  { id: "Fast", name: "Fast Inference", icon: Zap },
];

const MarketplaceSidebar = ({ selectedCategory, onCategorySelect }: MarketplaceSidebarProps) => {
  return (
    <aside className="w-[300px] h-[calc(100vh-64px)] bg-white border-r border-gray-100 overflow-y-auto sticky top-16 hidden lg:block">
      <div className="p-5">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Marketplace</h1>
        <p className="text-xs text-gray-400 mb-5">Discover & deploy AI agents</p>
        
        {/* Search Box */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-gray-100 focus:border-blue-400 placeholder:text-gray-400 transition-all"
          />
        </div>

        {/* Trending */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</span>
        </div>

        {/* Categories */}
        <nav className="space-y-0.5">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id ?? "all"}
                onClick={() => onCategorySelect(category.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100" 
                    : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
              </button>
            );
          })}
        </nav>

        <hr className="my-5 border-gray-100" />

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filters</span>
        </div>
        <div className="space-y-3 px-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition" defaultChecked />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Free to use</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition" defaultChecked />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Verified only</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition" />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Top rated (4.5+)</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
