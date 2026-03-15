import { Star, ArrowUpRight, Shield } from "lucide-react";
import { Agent } from "@/data/agents";

interface MarketplaceCardProps {
  agent: Agent;
  onClick: () => void;
}

const MarketplaceCard = ({ agent, onClick }: MarketplaceCardProps) => {
  const formatUsers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return `${count}`;
  };

  return (
    <div 
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer group 
        transition-all duration-300 ease-out
        hover:-translate-y-1"
      style={{
        background: "hsl(220 6% 90%)",
        boxShadow: "6px 6px 12px rgba(163,168,178,0.5), -6px -6px 12px rgba(255,255,255,0.7)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "10px 10px 20px rgba(163,168,178,0.5), -10px -10px 20px rgba(255,255,255,0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "6px 6px 12px rgba(163,168,178,0.5), -6px -6px 12px rgba(255,255,255,0.7)";
      }}
    >
      {/* Image Area */}
      <div className="aspect-[4/3] relative overflow-hidden"
        style={{
          background: "hsl(220 6% 88%)",
          boxShadow: "inset 2px 2px 4px rgba(163,168,178,0.3), inset -2px -2px 4px rgba(255,255,255,0.5)",
        }}
      >
        {agent.logo ? (
          <img 
            src={agent.logo} 
            alt={agent.name}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-black" style={{ color: "hsl(220 8% 75%)" }}>
              {agent.name[0]}
            </span>
          </div>
        )}
        
        {agent.verified && (
          <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1"
            style={{
              background: "hsl(220 6% 90%)",
              boxShadow: "2px 2px 4px rgba(163,168,178,0.4), -2px -2px 4px rgba(255,255,255,0.6)",
              color: "hsl(220 15% 35%)",
            }}
          >
            <Shield className="w-3 h-3" style={{ color: "hsl(220 15% 40%)" }} />
            Verified
          </div>
        )}

        {agent.website && (
          <a
            href={agent.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              background: "hsl(220 6% 90%)",
              boxShadow: "2px 2px 4px rgba(163,168,178,0.4), -2px -2px 4px rgba(255,255,255,0.6)",
            }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "hsl(220 8% 45%)" }} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-[13px] leading-snug" style={{ color: "hsl(220 15% 22%)" }}>
            {agent.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3" style={{ color: "hsl(40 70% 55%)", fill: "hsl(40 70% 55%)" }} />
            <span className="text-[12px] font-semibold" style={{ color: "hsl(220 10% 35%)" }}>{agent.rating}</span>
          </div>
        </div>

        <p className="text-[12px] line-clamp-2 mb-3 leading-relaxed" style={{ color: "hsl(220 8% 55%)" }}>
          {agent.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2.5"
          style={{ borderTop: "1px solid hsl(220 6% 84%)" }}
        >
          <span className="text-[11px]" style={{ color: "hsl(220 8% 55%)" }}>{formatUsers(agent.usageCount)} users</span>
          <span className="text-[11px] font-semibold" style={{ color: "hsl(150 30% 40%)" }}>
            Free
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
