import { Home, Flame, Brain, Code, Rocket, Palette, Puzzle, Plus, Bookmark, FileEdit, ChevronDown } from "lucide-react";
import { useState } from "react";
import { communities } from "@/data/communityData";

interface CommunitySidebarProps {
  selectedFeed: string;
  onFeedSelect: (feed: string) => void;
}

const mainNav = [
  { id: "home", label: "Home", icon: Home },
  { id: "trending", label: "Trending", icon: Flame },
];

const topicNav = [
  { id: "ai", label: "AI", icon: Brain },
  { id: "coding", label: "Coding", icon: Code },
  { id: "startups", label: "Startups", icon: Rocket },
  { id: "creative", label: "Creative", icon: Palette },
  { id: "opensource", label: "Open Source", icon: Puzzle },
];

const CommunitySidebar = ({ selectedFeed, onFeedSelect }: CommunitySidebarProps) => {
  const [showMyCommunities, setShowMyCommunities] = useState(true);

  return (
    <aside className="w-[260px] h-[calc(100vh-60px)] border-r border-black/[0.06] overflow-y-auto sticky top-[60px] hidden lg:block bg-[#f8f8f7]">
      <div className="p-4 pt-5">
        {/* Main Nav */}
        <nav className="space-y-px mb-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = selectedFeed === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onFeedSelect(item.id)}
                className={`flex items-center gap-2.5 w-full px-2.5 py-[9px] rounded-lg text-left transition-all duration-150 group ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm shadow-gray-900/10"
                    : "hover:bg-black/[0.04] text-gray-600"
                }`}
              >
                <Icon className={`w-[15px] h-[15px] transition-colors ${isActive ? "text-white/80" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span className="text-[13px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="h-px bg-black/[0.04] my-3" />

        {/* Topics */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Topics</span>
        </div>
        <nav className="space-y-px mb-1">
          {topicNav.map((item) => {
            const Icon = item.icon;
            const isActive = selectedFeed === item.id;
            const community = communities.find(c => c.id === item.id);
            const count = community ? (community.memberCount >= 1000 ? `${(community.memberCount / 1000).toFixed(0)}k` : `${community.memberCount}`) : "";
            return (
              <button
                key={item.id}
                onClick={() => onFeedSelect(item.id)}
                className={`flex items-center gap-2.5 w-full px-2.5 py-[9px] rounded-lg text-left transition-all duration-150 group ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm shadow-gray-900/10"
                    : "hover:bg-black/[0.04] text-gray-600"
                }`}
              >
                <Icon className={`w-[15px] h-[15px] transition-colors ${isActive ? "text-white/80" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span className="text-[13px] font-medium flex-1">{item.label}</span>
                <span className={`text-[11px] font-medium ${isActive ? "text-white/50" : "text-gray-400"}`}>{count}</span>
              </button>
            );
          })}
        </nav>

        <div className="h-px bg-black/[0.04] my-3" />

        {/* My Communities */}
        <button
          onClick={() => setShowMyCommunities(!showMyCommunities)}
          className="flex items-center justify-between w-full mb-2 px-1"
        >
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">My Communities</span>
          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showMyCommunities ? "" : "-rotate-90"}`} />
        </button>
        {showMyCommunities && (
          <nav className="space-y-px mb-1">
            {communities.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => onFeedSelect(c.id)}
                className="flex items-center gap-2.5 w-full px-2.5 py-[9px] rounded-lg text-left hover:bg-black/[0.04] text-gray-600 transition-all duration-150 group"
              >
                <span className="text-[14px]">{c.icon}</span>
                <span className="text-[13px] font-medium flex-1">{c.name}</span>
              </button>
            ))}
          </nav>
        )}

        <div className="h-px bg-black/[0.04] my-3" />

        {/* Quick Links */}
        <nav className="space-y-px">
          {[
            { id: "saved", label: "Saved Posts", icon: Bookmark },
            { id: "drafts", label: "Drafts", icon: FileEdit },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onFeedSelect(item.id)}
                className="flex items-center gap-2.5 w-full px-2.5 py-[9px] rounded-lg text-left hover:bg-black/[0.04] text-gray-500 transition-all duration-150 group"
              >
                <Icon className="w-[15px] h-[15px] text-gray-400 group-hover:text-gray-600" />
                <span className="text-[13px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="h-px bg-black/[0.04] my-3" />

        {/* Create Community */}
        <button className="flex items-center gap-2 w-full px-2.5 py-[9px] rounded-lg text-left hover:bg-black/[0.04] text-gray-500 transition-all duration-150 group">
          <Plus className="w-[15px] h-[15px] text-gray-400 group-hover:text-gray-600" />
          <span className="text-[13px] font-medium">Create Community</span>
        </button>
      </div>
    </aside>
  );
};

export default CommunitySidebar;
