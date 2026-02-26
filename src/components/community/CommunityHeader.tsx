import { useState } from "react";
import { Menu, Plus, Search, Command } from "lucide-react";
import { Link } from "react-router-dom";
import GlassSurface from "@/components/GlassSurface";
import AvatarDropdown from "@/components/AvatarDropdown";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import CreatePostModal from "./CreatePostModal";

interface CommunityHeaderProps {
  onMenuClick: () => void;
  onCreatePost: (post: { title: string; content: string; communityId: string; type: string }) => void;
}

const CommunityHeader = ({ onMenuClick, onCreatePost }: CommunityHeaderProps) => {
  const [createOpen, setCreateOpen] = useState(false);

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
        style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
      >
        <header className="w-full h-full px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-150">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <Link to="/community" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center">
                <span className="text-white text-[13px] font-bold">C</span>
              </div>
              <span className="hidden sm:inline text-[15px] font-bold text-gray-900 tracking-tight">Community</span>
            </Link>
            <Link to="/" className="hidden sm:flex text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors ml-2">
              ← Store
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-14 py-2 bg-gray-100 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white border border-transparent focus:border-gray-200 placeholder:text-gray-400 transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">
                <Command className="w-2.5 h-2.5" />K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-150 text-[13px] font-medium active:scale-[0.97]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Post</span>
            </button>
            <NotificationsDropdown />
            <AvatarDropdown />
          </div>
        </header>
      </GlassSurface>

      <CreatePostModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onSubmit={onCreatePost} />
    </>
  );
};

export default CommunityHeader;
