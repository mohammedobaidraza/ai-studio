import { 
  MessageSquare, Brain, Search, Code, Sparkles, Users, 
  Zap, Globe, FileText, Image, ChevronRight, MapPin
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
    <aside className="w-[360px] h-[calc(100vh-56px)] bg-white border-r border-gray-200 overflow-y-auto sticky top-14 hidden lg:block">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Marketplace</h1>
        
        {/* Search Box */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search Marketplace"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-transparent focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <button className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-gray-100 text-left mb-2">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-900">Your location</span>
            <p className="text-xs text-gray-500">Worldwide</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <hr className="my-3 border-gray-200" />

        {/* Categories */}
        <h2 className="text-base font-semibold text-gray-900 mb-2 px-2">Categories</h2>
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id ?? "all"}
                onClick={() => onCategorySelect(category.id)}
                className={`flex items-center gap-3 w-full p-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isActive ? "bg-blue-100" : "bg-gray-200"
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </nav>

        <hr className="my-4 border-gray-200" />

        {/* Filters */}
        <h2 className="text-base font-semibold text-gray-900 mb-3 px-2">Filters</h2>
        <div className="space-y-3 px-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <span className="text-sm text-gray-700">Free to use</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <span className="text-sm text-gray-700">Verified only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">Top rated (4.5+)</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
