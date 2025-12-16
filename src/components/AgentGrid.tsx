import { motion } from "framer-motion";
import AgentCard from "./AgentCard";
import { Agent } from "@/data/agents";

interface AgentGridProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

const AgentGrid = ({ agents, onAgentClick }: AgentGridProps) => {
  return (
    <section id="agents" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured Agents
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Curated selection of intelligent agents ready to transform your workflow
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={index}
              onClick={() => onAgentClick(agent)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentGrid;
