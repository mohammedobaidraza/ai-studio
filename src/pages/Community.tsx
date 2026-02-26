import { useState, useMemo, useCallback } from "react";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import PostCard from "@/components/community/PostCard";
import ThreadView from "@/components/community/ThreadView";
import { posts, CommunityPost } from "@/data/communityData";
import Footer from "@/components/Footer";

type SortOption = "hot" | "new" | "top";

const Community = () => {
  const [selectedFeed, setSelectedFeed] = useState("home");
  const [sortBy, setSortBy] = useState<SortOption>("hot");
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedFeed !== "home" && selectedFeed !== "trending" && selectedFeed !== "saved" && selectedFeed !== "drafts") {
      filtered = posts.filter(p => p.community.name.toLowerCase().replace(/\s/g, "") === selectedFeed);
    }
    if (selectedFeed === "trending") {
      filtered = [...posts].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    }

    switch (sortBy) {
      case "new":
        return [...filtered];
      case "top":
        return [...filtered].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      case "hot":
      default:
        return [...filtered].sort((a, b) => (b.upvotes + b.commentCount) - (a.upvotes + a.commentCount));
    }
  }, [selectedFeed, sortBy]);

  const handlePostClick = useCallback((post: CommunityPost) => {
    setSelectedPost(post);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex">
        <CommunitySidebar selectedFeed={selectedFeed} onFeedSelect={setSelectedFeed} />

        <main className="flex-1 py-6 px-5 lg:px-8 max-w-2xl">
          {/* Sort */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1">
              {(["hot", "new", "top"] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-all duration-150 ${
                    sortBy === option
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="text-[12px] text-gray-400 font-medium">
              {filteredPosts.length} posts
            </span>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-400 text-[15px] font-medium">Nothing here yet</p>
              <p className="text-gray-300 text-[13px] mt-1">Be the first to post</p>
            </div>
          )}
        </main>
      </div>

      {selectedPost && (
        <ThreadView post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      <Footer />
    </div>
  );
};

export default Community;
