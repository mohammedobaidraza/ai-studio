import { motion } from "framer-motion";
import { Bot, Sparkles, Zap, Brain, Code, MessageSquare, Search, ExternalLink } from "lucide-react";
import { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  index: number;
  onClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Sparkles,
  Zap,
  Brain,
  Code,
  MessageSquare,
  Search,
};

const AgentCard = ({ agent, index, onClick }: AgentCardProps) => {
  const IconComponent = iconMap[agent.icon || "Bot"] || Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className="agent-card group relative"
    >
      {/* Logo or Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
        {agent.logo ? (
          <img 
            src={agent.logo} 
            alt={`${agent.name} logo`}
            className="w-9 h-9 object-contain"
          />
        ) : (
          <IconComponent className="w-7 h-7 text-primary" />
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
        {agent.name}
        {agent.website && (
          <a 
            href={agent.website} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {agent.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="badge text-xs">
            {tag}
          </span>
        ))}
        {agent.free && (
          <span className="badge badge-primary text-xs">
            Free
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          {agent.verified && (
            <span className="badge badge-primary text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {agent.usageCount >= 1000000 
            ? `${(agent.usageCount / 1000000).toFixed(0)}M+ users` 
            : `${(agent.usageCount / 1000).toFixed(0)}K uses`}
        </span>
      </div>
    </motion.div>
  );
};

export default AgentCard;
