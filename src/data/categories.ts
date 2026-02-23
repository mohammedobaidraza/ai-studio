import {
  MessageSquare, Brain, Search, Code, Sparkles, Users,
  Zap, Globe, FileText, Image, Shield, Wrench, Bot, Lock, Cpu,
  type LucideIcon
} from "lucide-react";
import { agents } from "./agents";

// Curated premium categories — ordered intentionally
const curatedCategories: { id: string; name: string; icon: LucideIcon }[] = [
  { id: "AI Agent", name: "AI Agents", icon: Bot },
  { id: "Coding", name: "Coding", icon: Cpu },
  { id: "Research", name: "Research", icon: Search },
  { id: "Conversational", name: "Chat", icon: MessageSquare },
  { id: "Writing", name: "Writing", icon: FileText },
  { id: "Creative", name: "Creative", icon: Sparkles },
  { id: "Analysis", name: "Analysis", icon: Brain },
  { id: "Open Source", name: "Open Source", icon: Code },
  { id: "DevTools", name: "Dev Tools", icon: Wrench },
  { id: "Multimodal", name: "Multimodal", icon: Image },
  { id: "Security", name: "Security", icon: Shield },
  { id: "Fast", name: "Fast", icon: Zap },
];

export interface CategoryDef {
  id: string | null;
  name: string;
  icon: LucideIcon;
  count: string;
}

export function getCategories(): CategoryDef[] {
  const browseAll: CategoryDef = {
    id: null,
    name: "Browse All",
    icon: Globe,
    count: agents.length >= 1000 ? `${(agents.length / 1000).toFixed(1)}k` : `${agents.length}`,
  };

  const cats: CategoryDef[] = curatedCategories
    .map(cat => {
      const count = agents.filter(a =>
        a.tags.some(t => t.toLowerCase() === cat.id.toLowerCase())
      ).length;
      return { ...cat, count: count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}` };
    })
    .filter(c => parseInt(c.count) > 0 || c.count.includes("k"));

  return [browseAll, ...cats];
}
