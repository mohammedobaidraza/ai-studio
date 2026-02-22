import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2, Shield, ExternalLink, Sparkles, Zap, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
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

const quickPrompts: Record<string, string[]> = {
  default: [
    "What can you help me with?",
    "Show me an example",
    "What are your capabilities?",
  ],
  ChatGPT: [
    "Write a Python script to sort a list",
    "Explain quantum computing simply",
    "Help me draft a professional email",
  ],
  Claude: [
    "Analyze this code for bugs",
    "Summarize a research paper",
    "Compare two approaches to a problem",
  ],
  Gemini: [
    "Search the web for latest AI news",
    "Help me plan a trip to Japan",
    "Explain this image to me",
  ],
  Perplexity: [
    "What happened in tech news today?",
    "Find research papers on transformers",
    "Fact-check this claim for me",
  ],
};

const LaunchPanel = ({ agent, isOpen, onClose }: LaunchPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && agent && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "agent",
          content: `Hi! I'm **${agent.name}**. ${agent.description}. How can I help you today?`,
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

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: getSimulatedResponse(msg, agent?.name || "Agent"),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsThinking(false);
    }, 1200 + Math.random() * 800);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!agent) return null;

  const prompts = quickPrompts[agent.name] || quickPrompts.default;
  const showQuickPrompts = messages.length <= 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 right-0 w-full md:w-[520px] z-50 bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                  {agent.logo ? (
                    <img src={agent.logo} alt={agent.name} className="w-7 h-7 object-contain" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-gray-900 text-sm">{agent.name}</h3>
                    {agent.verified && <Shield className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Online • {agent.version}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {agent.website && (
                  <a
                    href={agent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in browser
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Capabilities Bar */}
            <div className="px-5 py-2.5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2 overflow-x-auto">
              {agent.capabilities.slice(0, 3).map((cap, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[11px] text-gray-600 font-medium whitespace-nowrap"
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  {cap.length > 30 ? cap.slice(0, 30) + "…" : cap}
                </span>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "agent" && (
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                      {agent.logo ? (
                        <img src={agent.logo} alt={agent.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  )}
                  <div className="max-w-[80%]">
                    <div
                      className={`px-4 py-2.5 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white rounded-2xl rounded-br-md"
                          : "bg-white text-gray-900 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {/* Message Actions (agent messages only) */}
                    {message.role === "agent" && message.id !== "welcome" && (
                      <div className="flex items-center gap-1 mt-1 ml-1">
                        <button
                          onClick={() => handleCopy(message.id, message.content)}
                          className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy"
                        >
                          {copiedId === message.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" title="Good response">
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" title="Bad response">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSend(messages[messages.indexOf(message) - 1]?.content)}
                          className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Regenerate"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                    {agent.logo ? (
                      <img src={agent.logo} alt={agent.name} className="w-5 h-5 object-contain" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      <span className="text-xs text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Prompts */}
              {showQuickPrompts && !isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 pt-2"
                >
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium px-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Try asking
                  </div>
                  {prompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="block w-full text-left px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`Message ${agent.name}...`}
                  className="flex-1 bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-2.5 text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isThinking}
                  className="p-2.5 rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">
                This is a demo. For full capabilities, <a href={agent.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">open {agent.name}</a> directly.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

function getSimulatedResponse(input: string, agentName: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("help") || lower.includes("what can")) {
    return `I can assist with coding, writing, analysis, research, and creative tasks. Try asking me something specific!`;
  }
  if (lower.includes("code") || lower.includes("script") || lower.includes("python")) {
    return `Here's a quick example:\n\n\`\`\`python\ndef hello():\n    print("Hello from ${agentName}!")\n\`\`\`\n\nWould you like me to expand on this?`;
  }
  if (lower.includes("explain") || lower.includes("what is")) {
    return `Great question! Let me break that down for you in simple terms. The key concept here involves understanding the fundamentals, and I'd be happy to dive deeper into any specific aspect.`;
  }
  const responses = [
    `I've analyzed your request about "${input.slice(0, 40)}${input.length > 40 ? "..." : ""}". Here's what I think — this is an interesting topic that we can explore further.`,
    `Based on my understanding, I can help you with that. Would you like me to provide a more detailed breakdown or explore a specific angle?`,
    `That's a great question! Let me share my perspective and some actionable insights on this topic.`,
    `I've processed your input. Here are my key observations and recommendations based on what you've shared.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export default LaunchPanel;
