export interface Agent {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  tags: string[];
  verified: boolean;
  usageCount: number;
  rating: number;
  version: string;
  capabilities: string[];
  permissions: { name: string; description: string }[];
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Research Assistant",
    description: "Deep research and synthesis across multiple sources",
    longDescription: "An intelligent research assistant that can analyze academic papers, news articles, and web content to provide comprehensive summaries and insights. Perfect for literature reviews, market research, and competitive analysis.",
    icon: "Search",
    tags: ["Research", "Analysis", "Academic"],
    verified: true,
    usageCount: 124500,
    rating: 4.9,
    version: "2.4.0",
    capabilities: [
      "Search and analyze academic papers from multiple databases",
      "Generate comprehensive literature reviews",
      "Extract key findings and summarize complex topics",
      "Cross-reference information across sources",
      "Create citation-ready summaries",
    ],
    permissions: [
      { name: "Web Access", description: "Access public web content for research" },
      { name: "File Export", description: "Export findings to various formats" },
    ],
  },
  {
    id: "2",
    name: "Code Architect",
    description: "Generate, review, and optimize production-ready code",
    longDescription: "A sophisticated code generation and review agent that understands modern software architecture patterns. It can write, refactor, and optimize code across multiple languages while following best practices.",
    icon: "Code",
    tags: ["Development", "Code Review", "Architecture"],
    verified: true,
    usageCount: 98200,
    rating: 4.8,
    version: "3.1.2",
    capabilities: [
      "Generate production-ready code in 20+ languages",
      "Review code for security vulnerabilities",
      "Suggest architectural improvements",
      "Refactor legacy codebases",
      "Create comprehensive documentation",
    ],
    permissions: [
      { name: "Code Execution", description: "Run code in sandboxed environment" },
      { name: "Repository Access", description: "Read connected repositories" },
    ],
  },
  {
    id: "3",
    name: "Data Synthesizer",
    description: "Transform raw data into actionable insights",
    longDescription: "Transform complex datasets into clear, actionable insights. This agent excels at pattern recognition, trend analysis, and generating visualizations that communicate findings effectively.",
    icon: "Brain",
    tags: ["Data", "Analytics", "Visualization"],
    verified: true,
    usageCount: 76800,
    rating: 4.7,
    version: "1.8.5",
    capabilities: [
      "Process and clean large datasets automatically",
      "Identify patterns and anomalies in data",
      "Generate interactive visualizations",
      "Create executive summaries of findings",
      "Predict trends using statistical models",
    ],
    permissions: [
      { name: "Data Processing", description: "Process uploaded data files" },
      { name: "Visualization Export", description: "Export charts and graphs" },
    ],
  },
  {
    id: "4",
    name: "Content Curator",
    description: "Create and optimize content across all channels",
    longDescription: "A creative content agent that understands brand voice, audience engagement, and multi-platform optimization. From blog posts to social media, it creates compelling content that resonates.",
    icon: "MessageSquare",
    tags: ["Content", "Marketing", "Writing"],
    verified: false,
    usageCount: 54300,
    rating: 4.6,
    version: "2.0.1",
    capabilities: [
      "Generate SEO-optimized blog posts and articles",
      "Create social media content calendars",
      "Adapt content for different platforms and audiences",
      "Analyze content performance metrics",
      "Suggest content improvements based on engagement",
    ],
    permissions: [
      { name: "Brand Assets", description: "Access brand guidelines and assets" },
      { name: "Publishing", description: "Publish to connected platforms" },
    ],
  },
  {
    id: "5",
    name: "Workflow Automator",
    description: "Design and deploy intelligent automation flows",
    longDescription: "Build sophisticated automation workflows that connect your tools and processes. This agent understands complex business logic and can create reliable, scalable automations.",
    icon: "Zap",
    tags: ["Automation", "Integration", "Workflow"],
    verified: true,
    usageCount: 67400,
    rating: 4.8,
    version: "4.2.0",
    capabilities: [
      "Design multi-step automation workflows",
      "Connect to 500+ third-party applications",
      "Handle conditional logic and branching",
      "Monitor and debug automation runs",
      "Schedule recurring tasks and triggers",
    ],
    permissions: [
      { name: "API Access", description: "Connect to external services" },
      { name: "Task Execution", description: "Execute automated tasks" },
    ],
  },
  {
    id: "6",
    name: "Meeting Assistant",
    description: "Transcribe, summarize, and extract action items",
    longDescription: "Never miss an important detail from your meetings. This agent provides real-time transcription, intelligent summaries, and automatic action item extraction with assignee suggestions.",
    icon: "Sparkles",
    tags: ["Productivity", "Meetings", "Notes"],
    verified: true,
    usageCount: 89100,
    rating: 4.9,
    version: "2.6.3",
    capabilities: [
      "Real-time meeting transcription",
      "Generate concise meeting summaries",
      "Extract and track action items",
      "Identify key decisions and discussion points",
      "Integrate with calendar and task managers",
    ],
    permissions: [
      { name: "Audio Access", description: "Process meeting audio" },
      { name: "Calendar Integration", description: "Access calendar events" },
    ],
  },
];
