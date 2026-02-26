import { useState, useMemo, useCallback } from "react";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import PostCard from "@/components/community/PostCard";
import ThreadView from "@/components/community/ThreadView";
import { posts, CommunityPost } from "@/data/communityData";
import Footer from "@/components/Footer";

type SortOption = "hot" | "new" | "top" | "controversial";

const Community = () => {
  const [selectedFeed, setSelectedFeed] = useState("home");
  const [sortBy, setSortBy] = useState<SortOption>("hot");
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by community/topic
    if (selectedFeed !== "home" && selectedFeed !== "trending" && selectedFeed !== "saved" && selectedFeed !== "drafts") {
      filtered = posts.filter(p => p.community.name.toLowerCase().replace(/\s/g, "") === selectedFeed);
    }
    if (selectedFeed === "trending") {
      filtered = [...posts].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    }

    // Sort
    switch (sortBy) {
      case "new":
        return [...filtered];
      case "top":
        return [...filtered].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      case "controversial":
        return [...filtered].sort((a, b) => b.commentCount - a.commentCount);
      case "hot":
      default:
        return [...filtered].sort((a, b) => (b.upvotes + b.commentCount) - (a.upvotes + a.commentCount));
    }
  }, [selectedFeed, sortBy]);

  const handlePostClick = useCallback((post: CommunityPost) => {
    setSelectedPost(post);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f7]">
      <CommunityHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex">
        <CommunitySidebar selectedFeed={selectedFeed} onFeedSelect={setSelectedFeed} />

        <main className="flex-1 p-5 lg:p-7 max-w-3xl">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1 bg-white rounded-lg border border-black/[0.06] p-0.5">
              {(["hot", "new", "top", "controversial"] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-medium capitalize transition-all duration-150 ${
                    sortBy === option
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-black/[0.03]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="text-[12px] text-gray-400">
              {filteredPosts.length} posts
            </span>
          </div>

          {/* Posts */}
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-[14px]">No posts yet in this community</p>
            </div>
          )}
        </main>
      </div>

      {/* Thread View */}
      {selectedPost && (
        <ThreadView post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      <Footer />
    </div>
  );
};

export default Community;
