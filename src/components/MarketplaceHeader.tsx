import { Bell, MessageCircle, Menu, Plus, Search } from "lucide-react";
import huggingfaceLogo from "@/assets/logos/huggingface.svg";

interface MarketplaceHeaderProps {
  onMenuClick: () => void;
}

const MarketplaceHeader = ({ onMenuClick }: MarketplaceHeaderProps) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 px-5 flex items-center justify-between shadow-sm">
      
      {/* LEFT — Menu + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden">
            <img src="/logo.svg" alt="Agent Store" className="w-9 h-9 object-contain" />
          </div>
          <span className="text-lg font-bold text-gray-900 hidden sm:block tracking-tight">
            Agent Store
          </span>
        </div>
      </div>

      {/* CENTER — Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-6">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents, models, tools..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
              focus:bg-white border border-gray-200 focus:border-blue-400
              placeholder:text-gray-400 transition-all"
          />
        </div>
      </div>

      {/* RIGHT — Actions */}
      <div className="flex items-center gap-2">
        {/* Hugging Face Link */}
        <a
          href="https://huggingface.co"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 hover:bg-amber-50 rounded-xl transition-colors group"
          title="Browse Hugging Face Models"
        >
          <img src={huggingfaceLogo} alt="Hugging Face" className="w-5 h-5" />
          <span className="hidden lg:inline text-sm font-medium text-gray-600 group-hover:text-amber-700">
            Hub
          </span>
        </a>

        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm shadow-blue-600/20">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">
            Publish
          </span>
        </button>

        <button className="p-2.5 hover:bg-gray-100 rounded-xl relative transition-colors">
          <MessageCircle className="w-5 h-5 text-gray-500" />
        </button>

        <button className="p-2.5 hover:bg-gray-100 rounded-xl relative transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
