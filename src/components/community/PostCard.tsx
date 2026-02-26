import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { CommunityPost } from "@/data/communityData";
import { motion } from "framer-motion";

interface PostCardProps {
  post: CommunityPost;
  onClick: () => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

function formatKarma(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(0)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(post.saved || false);
  const [likeCount, setLikeCount] = useState(post.upvotes - post.downvotes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-black/[0.05] hover:border-black/[0.1] transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="p-5">
        {/* Author row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
              {post.author.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-gray-900">{post.author.name}</span>
                <span className="text-[11px] text-gray-400 font-medium">{formatKarma(post.author.karma)} rep</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span>{post.createdAt}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 rounded-md text-[10px] font-medium text-gray-500">
                  {post.community.icon} {post.community.name}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <h3 className="text-[16px] font-semibold text-gray-900 leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {post.content}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-all duration-200 ${
                liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className="w-[18px] h-[18px]" fill={liked ? "currentColor" : "none"} strokeWidth={liked ? 0 : 1.5} />
              <span className="text-[13px] font-medium">{formatCount(likeCount)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <span className="text-[13px] font-medium">{post.commentCount}</span>
            </button>
            <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-[16px] h-[16px]" strokeWidth={1.5} />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`transition-colors ${saved ? "text-amber-500" : "text-gray-400 hover:text-gray-600"}`}
          >
            <Bookmark className="w-[18px] h-[18px]" fill={saved ? "currentColor" : "none"} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
