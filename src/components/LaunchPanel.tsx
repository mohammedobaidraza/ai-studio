import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Shield } from "lucide-react";
import { Agent } from "@/data/agents";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
}

interface LaunchPanelProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

const LaunchPanel = ({ agent, isOpen, onClose }: LaunchPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && agent && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "agent",
          content: `Hello! I'm ${agent.name}. ${agent.description} How can I help you today?`,
        },
      ]);
    }
  }, [isOpen, agent, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: getSimulatedResponse(input, agent?.name || "Agent"),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsThinking(false);
    }, 1500);
  };

  if (!agent) return null;

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

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 right-0 w-full md:w-[480px] z-50 bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {agent.logo ? (
                    <img src={agent.logo} alt={agent.name} className="w-7 h-7 object-contain" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    {agent.verified && (
                      <Shield className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Active now
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "agent" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      {agent.logo ? (
                        <img src={agent.logo} alt={agent.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-[20px] rounded-br-sm"
                        : "bg-white text-gray-900 rounded-[20px] rounded-bl-sm border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" 
                        alt="You" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    {agent.logo ? (
                      <img src={agent.logo} alt={agent.name} className="w-5 h-5 object-contain" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="bg-white rounded-[20px] rounded-bl-sm px-4 py-3 border border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Aa"
                  className="flex-1 bg-gray-100 text-gray-900 placeholder:text-gray-500 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className="p-2.5 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

function getSimulatedResponse(input: string, agentName: string): string {
  const responses = [
    `I understand you're asking about "${input.slice(0, 30)}${input.length > 30 ? "..." : ""}". Let me analyze that for you.`,
    `Great question! Based on my analysis, I can help you with that. Would you like me to provide more details?`,
    `I've processed your request. Here's what I found: This task can be completed efficiently using my capabilities.`,
    `Interesting! I can definitely assist with that. Let me break this down into actionable steps for you.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export default LaunchPanel;
