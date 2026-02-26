import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, Menu, Plus, Search, Command } from "lucide-react";
import agentStoreLogo from "@/assets/logos/agentstore.png";
import PublishAgentModal from "./PublishAgentModal";
import GlassSurface from "./GlassSurface";

interface MarketplaceHeaderProps {
  onMenuClick: () => void;
  onLogoClick?: () => void;
}

const MarketplaceHeader = ({ onMenuClick, onLogoClick }: MarketplaceHeaderProps) => {
  const [publishOpen, setPublishOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <GlassSurface
        width="100%"
        height={60}
        borderRadius={0}
        brightness={60}
        opacity={0.95}
        blur={14}
        backgroundOpacity={0.15}
        saturation={1.2}
        className="sticky top-0 z-50"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <header className="w-full h-full px-5 flex items-center justify-between">
          {/* LEFT — Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-black/[0.04] rounded-xl transition-all duration-150"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            <button onClick={onLogoClick} className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={agentStoreLogo} alt="Agent Store" className="w-8 h-8 object-contain" />
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-gray-900 tracking-tight">
                  Agent Store
                </span>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                  Beta
                </span>
              </div>
            </button>
          </div>

          {/* CENTER — Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              <input
                type="text"
                placeholder="Search agents, models, tools..."
                className="w-full pl-10 pr-16 py-2 bg-black/[0.03] rounded-xl text-[13px]
                  focus:outline-none focus:ring-1 focus:ring-black/[0.08]
                  focus:bg-white focus:shadow-lg focus:shadow-black/[0.04]
                  border border-transparent focus:border-black/[0.08]
                  placeholder:text-gray-400 transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[11px] text-gray-400 bg-white/80 border border-black/[0.06] rounded-md px-1.5 py-0.5">
                <Command className="w-3 h-3" />K
              </div>
            </div>
          </div>

          {/* RIGHT — Actions */}
          <div className="flex items-center gap-1.5">

            <button
              onClick={() => setPublishOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-[7px] bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-150 text-[13px] font-medium shadow-sm shadow-gray-900/10 active:scale-[0.97]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Publish</span>
            </button>

            <button onClick={() => navigate('/community')} className="p-2 hover:bg-black/[0.04] rounded-lg relative transition-all duration-150">
              <MessageCircle className="w-[18px] h-[18px] text-gray-500" />
            </button>

            <button className="p-2 hover:bg-black/[0.04] rounded-lg relative transition-all duration-150">
              <Bell className="w-[18px] h-[18px] text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-red-500 rounded-full ring-[1.5px] ring-white" />
            </button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ml-1 shadow-sm shadow-violet-500/20 cursor-pointer hover:shadow-md hover:shadow-violet-500/30 transition-all duration-200">
              A
            </div>
          </div>
        </header>
      </GlassSurface>

      <PublishAgentModal isOpen={publishOpen} onClose={() => setPublishOpen(false)} />
    </>
  );
};

export default MarketplaceHeader;
