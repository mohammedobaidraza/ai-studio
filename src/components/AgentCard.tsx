import { motion } from "framer-motion";
import { Bot, Sparkles, Zap, Brain, Code, MessageSquare, Search } from "lucide-react";
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
  const IconComponent = iconMap[agent.icon] || Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="agent-card group relative"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
        <IconComponent className="w-7 h-7 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {agent.name}
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
          {agent.usageCount.toLocaleString()} uses
        </span>
      </div>
    </motion.div>
  );
};

export default AgentCard;
