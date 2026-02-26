export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: { name: string; avatar: string; karma: number };
  community: { name: string; icon: string };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  type: "text" | "image" | "link" | "poll";
  linkUrl?: string;
  imageUrl?: string;
  saved?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  author: { name: string; avatar: string; karma: number };
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  children: Comment[];
  collapsed?: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
  color: string;
}

export const communities: Community[] = [
  { id: "ai", name: "AI", description: "Artificial Intelligence discussion", memberCount: 284000, icon: "🧠", color: "#6366f1" },
  { id: "coding", name: "Coding", description: "Programming & software development", memberCount: 512000, icon: "💻", color: "#10b981" },
  { id: "startups", name: "Startups", description: "Startup culture & entrepreneurship", memberCount: 198000, icon: "🚀", color: "#f59e0b" },
  { id: "creative", name: "Creative", description: "Design, art & creative work", memberCount: 145000, icon: "🎨", color: "#ec4899" },
  { id: "opensource", name: "Open Source", description: "Open source projects & collaboration", memberCount: 320000, icon: "🧩", color: "#8b5cf6" },
  { id: "science", name: "Science", description: "Scientific discoveries & research", memberCount: 410000, icon: "🔬", color: "#06b6d4" },
  { id: "productdesign", name: "Product Design", description: "UX, UI, and product thinking", memberCount: 167000, icon: "✏️", color: "#f97316" },
  { id: "devops", name: "DevOps", description: "Infrastructure & operations", memberCount: 89000, icon: "⚙️", color: "#64748b" },
];

function timeAgo(hours: number): string {
  if (hours < 1) return `${Math.floor(hours * 60)}m ago`;
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

export const posts: CommunityPost[] = [
  {
    id: "p1",
    title: "GPT-5 leaked benchmarks show 40% improvement on reasoning tasks",
    content: "A recent leak from an internal benchmark report suggests GPT-5 significantly outperforms GPT-4 on multi-step reasoning, mathematical proofs, and code generation. The report also mentions a new architecture component called 'recursive attention' which allows the model to iteratively refine its own outputs.",
    author: { name: "neural_explorer", avatar: "N", karma: 14200 },
    community: { name: "AI", icon: "🧠" },
    createdAt: timeAgo(3),
    upvotes: 2847,
    downvotes: 134,
    commentCount: 389,
    type: "text",
  },
  {
    id: "p2",
    title: "I built a full SaaS in 48 hours using AI coding assistants — here's what I learned",
    content: "Over the weekend I challenged myself to build and ship a complete SaaS product using nothing but AI assistants. I used Cursor for code, Claude for architecture decisions, and Midjourney for design assets. The result? A fully functional project management tool with auth, billing, and real-time collaboration. Here's my honest breakdown of what worked and what didn't.",
    author: { name: "ship_fast_dev", avatar: "S", karma: 8900 },
    community: { name: "Startups", icon: "🚀" },
    createdAt: timeAgo(6),
    upvotes: 1923,
    downvotes: 87,
    commentCount: 267,
    type: "text",
  },
  {
    id: "p3",
    title: "The Rust borrow checker finally clicked for me — here's the mental model that helped",
    content: "After struggling with Rust's ownership system for months, I finally had a breakthrough. The key insight was thinking about references not as pointers, but as 'temporary permissions' to look at data. Once I framed it that way, lifetimes, borrows, and moves all started making sense. Here's my complete mental model with diagrams.",
    author: { name: "rustacean_42", avatar: "R", karma: 22100 },
    community: { name: "Coding", icon: "💻" },
    createdAt: timeAgo(12),
    upvotes: 3412,
    downvotes: 56,
    commentCount: 445,
    type: "text",
  },
  {
    id: "p4",
    title: "Why every designer should learn to code in 2026",
    content: "Controversial take: designers who can't write basic HTML/CSS/JS are going to struggle finding roles in the next 5 years. AI is handling the pixel-pushing, and the value is shifting to designers who can think in systems and ship prototypes. Here's why I switched from Figma-only to building real components.",
    author: { name: "design_thinker", avatar: "D", karma: 5670 },
    community: { name: "Creative", icon: "🎨" },
    createdAt: timeAgo(18),
    upvotes: 1456,
    downvotes: 312,
    commentCount: 523,
    type: "text",
  },
  {
    id: "p5",
    title: "We open-sourced our entire observability stack — 50k stars in 2 weeks",
    content: "After 3 years of building proprietary monitoring tools, we decided to open-source everything. The response has been overwhelming. We went from 0 to 50k GitHub stars in just 14 days. Here's our story, the technical architecture, and how we plan to sustain the project financially.",
    author: { name: "oss_maintainer", avatar: "O", karma: 31400 },
    community: { name: "Open Source", icon: "🧩" },
    createdAt: timeAgo(24),
    upvotes: 4521,
    downvotes: 78,
    commentCount: 312,
    type: "link",
    linkUrl: "https://github.com/example/observability",
  },
  {
    id: "p6",
    title: "Local LLMs are now faster than API calls for most use cases",
    content: "I benchmarked running Llama 3 70B locally on an M3 Max vs making API calls to Claude and GPT-4. For most practical tasks (summarization, code review, data extraction), the local model was faster when you factor in network latency and rate limits. The quality gap has also narrowed significantly.",
    author: { name: "ml_benchmarks", avatar: "M", karma: 19800 },
    community: { name: "AI", icon: "🧠" },
    createdAt: timeAgo(8),
    upvotes: 2134,
    downvotes: 201,
    commentCount: 178,
    type: "text",
  },
  {
    id: "p7",
    title: "My startup just hit $1M ARR — bootstrapped, no VC, 2 people",
    content: "It took us 18 months, but we just crossed $1M in annual recurring revenue with zero outside funding. Just me and my co-founder. We built a niche B2B tool for construction companies. The boring market was our biggest advantage — zero competition from VC-backed startups.",
    author: { name: "indie_founder", avatar: "I", karma: 11200 },
    community: { name: "Startups", icon: "🚀" },
    createdAt: timeAgo(15),
    upvotes: 3876,
    downvotes: 45,
    commentCount: 634,
    type: "text",
  },
  {
    id: "p8",
    title: "The best VSCode extensions of 2026 — curated list",
    content: "I've been collecting and testing VSCode extensions obsessively for 4 years. Here's my curated list for 2026 covering AI assistance, debugging, Git workflows, theme customization, and productivity boosters. Each extension includes a brief review and my personal rating.",
    author: { name: "code_tools", avatar: "C", karma: 7800 },
    community: { name: "Coding", icon: "💻" },
    createdAt: timeAgo(30),
    upvotes: 1567,
    downvotes: 123,
    commentCount: 289,
    type: "text",
  },
];

export const commentsForPost: Record<string, Comment[]> = {
  p1: [
    {
      id: "c1",
      postId: "p1",
      parentId: null,
      author: { name: "skeptic_dev", avatar: "S", karma: 4500 },
      content: "Take leaked benchmarks with a massive grain of salt. Remember when GPT-4 was supposed to have 100T parameters? These things get exaggerated every cycle.",
      createdAt: timeAgo(2),
      upvotes: 456,
      downvotes: 23,
      children: [
        {
          id: "c1-1",
          postId: "p1",
          parentId: "c1",
          author: { name: "ml_researcher", avatar: "M", karma: 18700 },
          content: "Fair point, but the source here seems more credible than usual. The architectural details about recursive attention align with recent papers from the team.",
          createdAt: timeAgo(1.5),
          upvotes: 234,
          downvotes: 12,
          children: [
            {
              id: "c1-1-1",
              postId: "p1",
              parentId: "c1-1",
              author: { name: "neural_explorer", avatar: "N", karma: 14200 },
              content: "Exactly. The recursive attention mechanism was hinted at in their ICLR 2026 submission. This leak is consistent with that trajectory.",
              createdAt: timeAgo(1),
              upvotes: 178,
              downvotes: 5,
              children: [],
            },
          ],
        },
        {
          id: "c1-2",
          postId: "p1",
          parentId: "c1",
          author: { name: "ai_enthusiast", avatar: "A", karma: 2300 },
          content: "Even if the numbers are inflated, a 20-25% improvement would still be groundbreaking for reasoning tasks.",
          createdAt: timeAgo(1.8),
          upvotes: 89,
          downvotes: 7,
          children: [],
        },
      ],
    },
    {
      id: "c2",
      postId: "p1",
      parentId: null,
      author: { name: "safety_first", avatar: "F", karma: 9100 },
      content: "I'm more interested in the safety implications. If reasoning improves that much, the alignment challenges become even more critical. Has anyone seen details about their safety testing?",
      createdAt: timeAgo(2.5),
      upvotes: 312,
      downvotes: 8,
      children: [
        {
          id: "c2-1",
          postId: "p1",
          parentId: "c2",
          author: { name: "alignment_researcher", avatar: "R", karma: 15600 },
          content: "The leak mentions a new 'constitutional reasoning' layer that supposedly helps with alignment. But without peer review, it's hard to evaluate the claims.",
          createdAt: timeAgo(2),
          upvotes: 198,
          downvotes: 3,
          children: [],
        },
      ],
    },
  ],
};
