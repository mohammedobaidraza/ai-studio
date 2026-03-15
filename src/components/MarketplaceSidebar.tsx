import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { getCategories } from "@/data/categories";

interface MarketplaceSidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const MarketplaceSidebar = ({ selectedCategory, onCategorySelect }: MarketplaceSidebarProps) => {
  const [filterText, setFilterText] = useState("");
  const categories = useMemo(() => getCategories(), []);

  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categories;
    return categories.filter(c => c.name.toLowerCase().includes(filterText.toLowerCase()));
  }, [categories, filterText]);

  return (
    <aside className="w-[260px] h-[calc(100vh-60px)] overflow-y-auto sticky top-[60px] hidden lg:block"
      style={{ background: "hsl(220 6% 90%)" }}
    >
      <div className="p-4 pt-5">
        {/* Neumorphic Search */}
        <div className="relative mb-5 rounded-xl"
          style={{
            background: "hsl(220 6% 90%)",
            boxShadow: "inset 3px 3px 6px rgba(163,168,178,0.5), inset -3px -3px 6px rgba(255,255,255,0.7)",
          }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px]" style={{ color: "hsl(220 8% 55%)" }} />
          <input
            type="text"
            placeholder="Filter categories..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-transparent rounded-xl text-[13px] focus:outline-none placeholder:text-muted-foreground transition-all duration-200"
          />
        </div>

        {/* Section Label */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "hsl(220 8% 55%)" }}>Categories</span>
        </div>

        {/* Categories */}
        <nav className="space-y-1.5">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id ?? "all"}
                onClick={() => onCategorySelect(category.id)}
                className="flex items-center gap-2.5 w-full px-3 py-[10px] rounded-xl text-left transition-all duration-200 group"
                style={isActive ? {
                  background: "hsl(220 6% 90%)",
                  boxShadow: "inset 3px 3px 6px rgba(163,168,178,0.5), inset -3px -3px 6px rgba(255,255,255,0.7)",
                  color: "hsl(220 15% 22%)",
                } : {
                  color: "hsl(220 8% 50%)",
                }}
              >
                <Icon className="w-[15px] h-[15px] transition-colors" style={{ color: isActive ? "hsl(220 15% 30%)" : "hsl(220 8% 60%)" }} />
                <span className="text-[13px] font-medium flex-1">{category.name}</span>
                <span className="text-[11px] font-medium" style={{ color: isActive ? "hsl(220 8% 45%)" : "hsl(220 8% 65%)" }}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="h-px my-4" style={{ background: "hsl(220 6% 84%)" }} />

        {/* Filters */}
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: "hsl(220 8% 55%)" }} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "hsl(220 8% 55%)" }}>Filters</span>
        </div>
        <div className="space-y-3 px-1">
          {[
            { label: "Free to use", checked: true },
            { label: "Verified only", checked: true },
            { label: "Top rated (4.5+)", checked: false },
          ].map((filter) => (
            <label key={filter.label} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded appearance-none cursor-pointer transition-all duration-200"
                  style={{
                    background: "hsl(220 6% 90%)",
                    boxShadow: filter.checked
                      ? "inset 2px 2px 4px rgba(163,168,178,0.5), inset -2px -2px 4px rgba(255,255,255,0.7)"
                      : "2px 2px 4px rgba(163,168,178,0.4), -2px -2px 4px rgba(255,255,255,0.6)",
                  }}
                  defaultChecked={filter.checked} 
                />
              </div>
              <span className="text-[13px] group-hover:text-foreground transition-colors" style={{ color: "hsl(220 8% 50%)" }}>{filter.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
