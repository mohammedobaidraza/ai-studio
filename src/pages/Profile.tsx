import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Camera, Globe, Github, Linkedin, Download, Zap, Heart,
  FileText, MessageCircle, Star, Settings, Activity, Users, ExternalLink
} from "lucide-react";
import Footer from "@/components/Footer";

const mockUser = {
  name: "Alex Chen",
  username: "alexchen",
  avatar: "A",
  role: "Creator" as const,
  bio: "AI researcher & builder. Creating tools that make AI accessible to everyone.",
  joinDate: "Jan 2025",
  website: "https://alexchen.dev",
  github: "alexchen",
  linkedin: "alexchen",
  stats: {
    downloaded: 47,
    used: 128,
    saved: 23,
    posts: 15,
    comments: 89,
    reputation: 2450,
  },
};

const mockAgents = [
  { id: "1", name: "Code Assistant Pro", description: "AI-powered code review and suggestions", downloads: 1240, rating: 4.8, status: "published" },
  { id: "2", name: "Data Analyzer", description: "Automated data analysis and visualization", downloads: 890, rating: 4.6, status: "published" },
  { id: "3", name: "Content Writer", description: "Generate blog posts and marketing copy", downloads: 0, rating: 0, status: "draft" },
];

const mockActivity = [
  { type: "download", text: "Downloaded GPT-4 Vision Agent", time: "2h ago" },
  { type: "post", text: "Published \"Best practices for agent prompting\"", time: "5h ago" },
  { type: "comment", text: "Commented on \"AI agents in production\"", time: "1d ago" },
  { type: "save", text: "Saved AutoML Pipeline to favorites", time: "2d ago" },
  { type: "use", text: "Used Code Review Bot (12 sessions)", time: "3d ago" },
];

type ProfileTab = "agents" | "activity" | "community" | "settings";

const roleBadgeStyles = {
  User: "bg-muted text-muted-foreground",
  Creator: "bg-sage/20 text-cocoa",
  Admin: "bg-dusty-rose/30 text-cocoa",
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("agents");
  const navigate = useNavigate();

  const tabs: { id: ProfileTab; label: string; icon: React.ElementType }[] = [
    { id: "agents", label: "My Agents", icon: Zap },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "community", label: "Community", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-xl transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-[14px] font-semibold text-foreground">Profile</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sage to-sky flex items-center justify-center text-card text-3xl font-bold shadow-lg">
                {mockUser.avatar}
              </div>
              <button className="absolute inset-0 bg-foreground/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-5 h-5 text-card" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[22px] font-bold text-foreground">{mockUser.name}</h1>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${roleBadgeStyles[mockUser.role]}`}>
                  {mockUser.role}
                </span>
              </div>
              <p className="text-[14px] text-muted-foreground mb-2">@{mockUser.username}</p>
              <p className="text-[14px] text-foreground/70 mb-4 max-w-md">{mockUser.bio}</p>
              <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
                <span>Joined {mockUser.joinDate}</span>
                {mockUser.website && (
                  <a href={mockUser.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
                {mockUser.github && (
                  <a href={`https://github.com/${mockUser.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {mockUser.linkedin && (
                  <a href={`https://linkedin.com/in/${mockUser.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
              </div>
            </div>

            <button className="px-4 py-2 bg-foreground text-card rounded-xl text-[13px] font-medium hover:opacity-90 transition-all active:scale-[0.97]">
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8"
        >
          {[
            { label: "Downloaded", value: mockUser.stats.downloaded, icon: Download },
            { label: "Used", value: mockUser.stats.used, icon: Zap },
            { label: "Saved", value: mockUser.stats.saved, icon: Heart },
            { label: "Posts", value: mockUser.stats.posts, icon: FileText },
            { label: "Comments", value: mockUser.stats.comments, icon: MessageCircle },
            { label: "Reputation", value: mockUser.stats.reputation, icon: Star },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4 text-center">
              <stat.icon className="w-4 h-4 text-muted-foreground mx-auto mb-2" />
              <p className="text-[18px] font-bold text-foreground">{stat.value >= 1000 ? `${(stat.value / 1000).toFixed(1)}k` : stat.value}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-card rounded-xl border border-border p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-foreground text-card shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === "agents" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-foreground">Published Agents</h3>
                <button className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">+ New Agent</button>
              </div>
              {mockAgents.map((agent) => (
                <div key={agent.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:border-sage/40 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sage/30 to-sky/30 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-cocoa" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-foreground">{agent.name}</h4>
                      <p className="text-[12px] text-muted-foreground">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
                    {agent.status === "published" ? (
                      <>
                        <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> {agent.downloads}</span>
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {agent.rating}</span>
                      </>
                    ) : (
                      <span className="px-2.5 py-1 bg-muted rounded-lg text-[11px] font-medium">Draft</span>
                    )}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-1">
              {mockActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-card transition-colors">
                  <div className="w-2 h-2 rounded-full bg-sage" />
                  <p className="text-[14px] text-foreground flex-1">{item.text}</p>
                  <span className="text-[12px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "community" && (
            <div className="text-center py-16">
              <MessageCircle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-[15px] text-muted-foreground font-medium">Your community posts will appear here</p>
              <button onClick={() => navigate("/community")} className="mt-3 text-[13px] text-foreground font-semibold hover:underline">
                Go to Community →
              </button>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              {[
                { label: "Display Name", value: mockUser.name, type: "text" },
                { label: "Username", value: mockUser.username, type: "text" },
                { label: "Bio", value: mockUser.bio, type: "textarea" },
                { label: "Website", value: mockUser.website, type: "url" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-[13px] font-medium text-foreground mb-1.5 block">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      defaultValue={field.value}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none h-20"
                    />
                  ) : (
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                  )}
                </div>
              ))}
              <button className="px-5 py-2.5 bg-foreground text-card rounded-xl text-[13px] font-medium hover:opacity-90 transition-all">
                Save Changes
              </button>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
