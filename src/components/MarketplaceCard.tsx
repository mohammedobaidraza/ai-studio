import { Star, ExternalLink, Shield, ArrowUpRight } from "lucide-react";
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
      className="bg-white rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-0.5"
    >
      {/* Image Area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 relative overflow-hidden">
        {agent.logo ? (
          <img 
            src={agent.logo} 
            alt={agent.name}
            className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-bold bg-gradient-to-br from-gray-300 to-gray-400 bg-clip-text text-transparent">
              {agent.name[0]}
            </span>
          </div>
        )}
        
        {/* Verified Badge */}
        {agent.verified && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm">
            <Shield className="w-3 h-3" />
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
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-50 shadow-sm border border-gray-100"
          >
            <ArrowUpRight className="w-4 h-4 text-gray-600" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
            {agent.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-1.5 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-amber-700">{agent.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
          {agent.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">{formatUsers(agent.usageCount)} users</span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            Free
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-50">
          {agent.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
