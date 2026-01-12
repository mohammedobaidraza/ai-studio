import { Bell, MessageCircle, Menu, Plus } from "lucide-react";

interface MarketplaceHeaderProps {
  onMenuClick: () => void;
}

const MarketplaceHeader = ({ onMenuClick }: MarketplaceHeaderProps) => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 sticky top-0 z-50 px-4 flex items-center justify-between">
      
      {/* LEFT — Menu + Logo */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="AgentAI Logo"
              className="w-8 h-8"
            />
          </div>

          <span className="text-xl font-bold text-blue-600 hidden sm:block">
            AgentAI
          </span>
        </div>
      </div>

      {/* CENTER — Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-4">
        <div className="relative w-full">
          <img
            src="/logo.svg"
            alt="Search Logo"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
          />

          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-full text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:bg-white border border-transparent focus:border-blue-500"
          />
        </div>
      </div>

      {/* RIGHT — Actions */}
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            Create new listing
          </span>
        </button>

        <button className="p-2.5 hover:bg-gray-100 rounded-full relative">
          <MessageCircle className="w-6 h-6 text-gray-600" />
        </button>

        <button className="p-2.5 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
