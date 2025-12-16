import { X, MessageSquare, Brain, Search, Code, Sparkles, Users, Zap, Globe, FileText, Image } from "lucide-react";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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

const MobileFilterDrawer = ({ isOpen, onClose, selectedCategory, onCategorySelect }: MobileFilterDrawerProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-[360px] bg-white z-50 lg:hidden overflow-y-auto animate-slide-in-right">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Categories</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id ?? "all"}
                  onClick={() => {
                    onCategorySelect(category.id);
                    onClose();
                  }}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? "bg-blue-100" : "bg-gray-200"
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                  <span className="text-base font-medium">{category.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
