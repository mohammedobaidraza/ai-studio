import { Star, ExternalLink, Shield } from "lucide-react";
import { Agent } from "@/data/agents";

interface MarketplaceCardProps {
  agent: Agent;
  onClick: () => void;
}

const MarketplaceCard = ({ agent, onClick }: MarketplaceCardProps) => {
  const formatUsers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(0)}M+ users`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K+ users`;
    return `${count} users`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow border border-gray-200"
    >
      {/* Image Area */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
        {agent.logo ? (
          <img 
            src={agent.logo} 
            alt={agent.name}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-gray-300">{agent.name[0]}</span>
          </div>
        )}
        
        {/* Verified Badge */}
        {agent.verified && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
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
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
          >
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
            {agent.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{agent.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {agent.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{formatUsers(agent.usageCount)}</span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
            Free
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {agent.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
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
