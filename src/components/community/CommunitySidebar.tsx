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

  const NavButton = ({ id, label, icon: Icon, count }: { id: string; label: string; icon: React.ElementType; count?: string }) => {
    const isActive = selectedFeed === id;
    return (
      <button
        onClick={() => onFeedSelect(id)}
        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
          isActive
            ? "bg-gray-900 text-white shadow-sm"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-white/70" : "text-gray-400 group-hover:text-gray-600"}`} />
        <span className="text-[13px] font-medium flex-1">{label}</span>
        {count && <span className={`text-[11px] font-medium ${isActive ? "text-white/40" : "text-gray-400"}`}>{count}</span>}
      </button>
    );
  };

  return (
    <aside className="w-[240px] h-[calc(100vh-60px)] border-r border-gray-100 overflow-y-auto sticky top-[60px] hidden lg:block bg-white">
      <div className="p-4 space-y-1">
        {/* Main */}
        {mainNav.map((item) => (
          <NavButton key={item.id} {...item} />
        ))}

        <div className="h-px bg-gray-100 my-3" />

        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-1">Topics</p>
        {topicNav.map((item) => {
          const c = communities.find(c => c.id === item.id);
          const count = c ? (c.memberCount >= 1000 ? `${(c.memberCount / 1000).toFixed(0)}k` : `${c.memberCount}`) : "";
          return <NavButton key={item.id} {...item} count={count} />;
        })}

        <div className="h-px bg-gray-100 my-3" />

        <button
          onClick={() => setShowMyCommunities(!showMyCommunities)}
          className="flex items-center justify-between w-full px-3 mb-1"
        >
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Following</p>
          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showMyCommunities ? "" : "-rotate-90"}`} />
        </button>
        {showMyCommunities && (
          <div className="space-y-0.5">
            {communities.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() => onFeedSelect(c.id)}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left hover:bg-gray-100 text-gray-600 transition-all group"
              >
                <span className="text-[14px]">{c.icon}</span>
                <span className="text-[13px] font-medium">{c.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="h-px bg-gray-100 my-3" />

        <NavButton id="saved" label="Saved" icon={Bookmark} />
        <NavButton id="drafts" label="Drafts" icon={FileEdit} />

        <div className="h-px bg-gray-100 my-3" />

        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left hover:bg-gray-100 text-gray-500 transition-all group">
          <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          <span className="text-[13px] font-medium">New Community</span>
        </button>
      </div>
    </aside>
  );
};

export default CommunitySidebar;
