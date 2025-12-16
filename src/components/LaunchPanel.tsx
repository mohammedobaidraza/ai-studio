import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
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

    // Simulate agent response
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
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-y-0 right-0 w-full md:w-[480px] lg:w-[540px] z-50 bg-card border-l border-border flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{agent.name}</h3>
                  {agent.verified && <Sparkles className="w-3 h-3 text-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">Active session</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "agent" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 p-2 bg-muted rounded-xl border border-border">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none px-2 py-2 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:glow-sm transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Messages are processed in a secure sandbox
            </p>
          </div>
        </motion.div>
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
