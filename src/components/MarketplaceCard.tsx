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
      className="bg-white rounded-2xl overflow-hidden cursor-pointer group 
        hover:shadow-2xl hover:shadow-black/[0.06] 
        transition-all duration-300 ease-out
        border border-black/[0.04] hover:border-black/[0.08] 
        hover:-translate-y-1"
    >
      {/* Image Area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100/80 relative overflow-hidden">
        {agent.logo ? (
          <img 
            src={agent.logo} 
            alt={agent.name}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-black text-gray-200">
              {agent.name[0]}
            </span>
          </div>
        )}
        
        {/* Verified Badge */}
        {agent.verified && (
          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-sm border border-black/[0.04]">
            <Shield className="w-3 h-3 text-blue-600" />
            Verified
          </div>
        )}

        {/* External Link */}
        {agent.website && (
          <a
            href={agent.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white shadow-sm border border-black/[0.04]"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-600" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-[13px] leading-snug group-hover:text-gray-700 transition-colors">
            {agent.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[12px] font-semibold text-gray-700">{agent.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {agent.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.04]">
          <span className="text-[11px] text-gray-400">{formatUsers(agent.usageCount)} users</span>
          <span className="text-[11px] font-semibold text-emerald-600">
            Free
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
