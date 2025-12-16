import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Star, ExternalLink, Users, CheckCircle2, Share2, Heart, MessageCircle } from "lucide-react";
import { Agent } from "@/data/agents";
import { useState } from "react";

interface AgentDetailProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunch: (agent: Agent) => void;
}

const AgentDetail = ({ agent, isOpen, onClose, onLaunch }: AgentDetailProps) => {
  const [activeTab, setActiveTab] = useState("About");
  const [saved, setSaved] = useState(false);

  if (!agent) return null;

  const formatUsers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(0)}M+`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K+`;
    return `${count}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:top-[5%] md:left-1/2 md:-translate-x-1/2 md:max-w-3xl md:w-full md:max-h-[90vh] z-50 flex flex-col"
          >
            <div className="bg-white rounded-xl overflow-hidden flex flex-col shadow-2xl max-h-full">
              {/* Header */}
              <div className="relative bg-gray-50 border-b border-gray-200">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-6 flex gap-5">
                  {/* Logo */}
                  <div className="w-24 h-24 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {agent.logo ? (
                      <img src={agent.logo} alt={agent.name} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="text-4xl font-bold text-gray-300">{agent.name[0]}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-gray-900 truncate">{agent.name}</h2>
                      {agent.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          <Shield className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{agent.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{agent.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{formatUsers(agent.usageCount)} users</span>
                      </div>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        Free
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-4 flex gap-2">
                  <button
                    onClick={() => onLaunch(agent)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Open Agent
                  </button>
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`px-4 py-2.5 rounded-lg border transition-colors ${
                      saved 
                        ? "bg-red-50 border-red-200 text-red-600" 
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${saved ? "fill-red-500" : ""}`} />
                  </button>
                  <button className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  {agent.website && (
                    <a
                      href={agent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 bg-white">
                <div className="flex px-6">
                  {["About", "Capabilities", "Permissions"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-white">
                {activeTab === "About" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {agent.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Version</div>
                          <div className="text-sm font-medium text-gray-900">{agent.version}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Total Users</div>
                          <div className="text-sm font-medium text-gray-900">{agent.usageCount.toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Rating</div>
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            {agent.rating}
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Price</div>
                          <div className="text-sm font-medium text-green-600">Free</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {agent.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Capabilities" && (
                  <div className="space-y-2">
                    {agent.capabilities.map((cap, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{cap}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Permissions" && (
                  <div className="space-y-2">
                    {agent.permissions.map((perm, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{perm.name}</div>
                          <p className="text-xs text-gray-500 mt-0.5">{perm.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Ask a question</span>
                </button>
                <button
                  onClick={() => onLaunch(agent)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Launch Agent
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AgentDetail;
