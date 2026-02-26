import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CommunityPost, Comment, commentsForPost } from "@/data/communityData";
import { motion, AnimatePresence } from "framer-motion";

interface ThreadViewProps {
  post: CommunityPost;
  onClose: () => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

const CommentNode = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
  const [liked, setLiked] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [replying, setReplying] = useState(false);
  const score = comment.upvotes - comment.downvotes + (liked ? 1 : 0);

  return (
    <div className={`${depth > 0 ? "ml-6 pl-5 border-l border-gray-100" : ""}`}>
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white text-[10px] font-bold">
            {comment.author.avatar}
          </div>
          <span className="text-[13px] font-semibold text-gray-900">{comment.author.name}</span>
          <span className="text-[11px] text-gray-400">{comment.createdAt}</span>
          {comment.children.length > 0 && (
            <button onClick={() => setCollapsed(!collapsed)} className="p-0.5 hover:bg-gray-100 rounded transition-colors">
              {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
          )}
        </div>

        {/* Content */}
        <p className="text-[14px] text-gray-700 leading-relaxed mb-2.5 pl-[38px]">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 pl-[38px]">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-[12px] transition-colors ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
          >
            <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} strokeWidth={liked ? 0 : 1.5} />
            <span className="font-medium">{formatCount(score)}</span>
          </button>
          <button
            onClick={() => setReplying(!replying)}
            className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-600 font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Reply
          </button>
          <button className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reply input */}
        <AnimatePresence>
          {replying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-[38px] mt-3 overflow-hidden"
            >
              <textarea
                placeholder="Write a reply..."
                className="w-full p-3 text-[13px] bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white placeholder:text-gray-400 transition-all"
                rows={3}
                autoFocus
              />
              <div className="flex items-center gap-2 mt-2">
                <button className="px-4 py-1.5 bg-gray-900 text-white text-[12px] font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  Reply
                </button>
                <button onClick={() => setReplying(false)} className="px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Children */}
        {!collapsed && comment.children.length > 0 && (
          <div className="mt-1">
            {comment.children.map(child => (
              <CommentNode key={child.id} comment={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ThreadView = ({ post, onClose }: ThreadViewProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const likeCount = post.upvotes - post.downvotes + (liked ? 1 : 0);
  const comments = commentsForPost[post.id] || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="w-full max-w-2xl bg-white h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <span className="text-[14px] font-semibold text-gray-900">Thread</span>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-6 max-w-xl mx-auto">
          {/* Author */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-[15px] font-bold shadow-sm">
              {post.author.avatar}
            </div>
            <div>
              <span className="text-[15px] font-semibold text-gray-900">{post.author.name}</span>
              <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                <span>{post.createdAt}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 rounded-md text-[10px] font-medium text-gray-500">
                  {post.community.icon} {post.community.name}
                </span>
              </div>
            </div>
          </div>

          {/* Post */}
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-3">{post.title}</h1>
          <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-line mb-6">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-8">
            <div className="flex items-center gap-5">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 transition-all ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
              >
                <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} strokeWidth={liked ? 0 : 1.5} />
                <span className="text-[14px] font-medium">{formatCount(likeCount)}</span>
              </button>
              <div className="flex items-center gap-1.5 text-gray-400">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[14px] font-medium">{post.commentCount}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`transition-colors ${saved ? "text-amber-500" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          </div>

          {/* Comment input */}
          <div className="mb-8">
            <textarea
              placeholder="Share your thoughts..."
              className="w-full p-4 text-[14px] bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white placeholder:text-gray-400 transition-all"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="px-5 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-xl hover:bg-gray-800 transition-colors">
                Reply
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-4">
            <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
              {comments.length > 0 ? `${post.commentCount} Replies` : "No replies yet"}
            </span>
          </div>
          <div>
            {comments.length > 0 ? (
              comments.map(comment => (
                <CommentNode key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-center text-[14px] text-gray-400 py-12">Be the first to share your thoughts.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThreadView;
