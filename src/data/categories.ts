import {
  MessageSquare, Brain, Search, Code, Sparkles, Users,
  Zap, Globe, FileText, Image, Shield, Wrench, Bot, Lock, Cpu, Tag,
  type LucideIcon
} from "lucide-react";
import { agents } from "./agents";

const iconMap: Record<string, LucideIcon> = {
  "AI Agent": Bot,
  "Open Source": Code,
  "Coding": Cpu,
  "DevTools": Wrench,
  "Security": Shield,
  "Conversational": MessageSquare,
  "Research": Search,
  "Writing": FileText,
  "Analysis": Brain,
  "Creative": Sparkles,
  "Multimodal": Image,
  "Privacy": Lock,
  "Community": Users,
  "Fast": Zap,
};

const nameMap: Record<string, string> = {
  "AI Agent": "AI Agents",
  "Fast": "Fast Inference",
};

export interface CategoryDef {
  id: string | null;
  name: string;
  icon: LucideIcon;
  count: string;
}

export function getCategories(): CategoryDef[] {
  // Collect all unique tags from agents
  const tagCounts = new Map<string, number>();
  for (const agent of agents) {
    for (const tag of agent.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  // Sort tags by count descending
  const sortedTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);

  const browseAll: CategoryDef = {
    id: null,
    name: "Browse All",
    icon: Globe,
    count: agents.length >= 100 ? `${agents.length.toLocaleString()}` : `${agents.length}`,
  };

  const categoriesFromTags: CategoryDef[] = sortedTags.map(([tag, count]) => ({
    id: tag,
    name: nameMap[tag] || tag,
    icon: iconMap[tag] || Tag,
    count: `${count}`,
  }));

  return [browseAll, ...categoriesFromTags];
}
