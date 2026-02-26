import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark, MoreHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { CommunityPost, Comment, commentsForPost } from "@/data/communityData";

interface ThreadViewProps {
  post: CommunityPost;
  onClose: () => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

const CommentNode = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [replying, setReplying] = useState(false);

  const score = comment.upvotes - comment.downvotes + (voteState === "up" ? 1 : voteState === "down" ? -1 : 0);

  return (
    <div className={`${depth > 0 ? "ml-4 pl-4 border-l-2 border-black/[0.04] hover:border-black/[0.08]" : ""} transition-colors`}>
      <div className="py-2">
        {/* Comment header */}
        <div className="flex items-center gap-1.5 mb-1">
          <button onClick={() => setCollapsed(!collapsed)} className="p-0.5 -ml-1">
            {collapsed ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronUp className="w-3 h-3 text-gray-400" />}
          </button>
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
            {comment.author.avatar}
          </div>
          <span className="text-[12px] font-semibold text-gray-700">u/{comment.author.name}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-400">{comment.createdAt}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-400">{formatCount(comment.author.karma)} karma</span>
        </div>

        {!collapsed && (
          <>
            {/* Content */}
            <p className="text-[13px] text-gray-700 leading-relaxed mb-1.5 pl-6">{comment.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-0.5 pl-5">
              <button
                onClick={() => setVoteState(voteState === "up" ? null : "up")}
                className={`p-1 rounded transition-colors ${voteState === "up" ? "text-orange-500" : "text-gray-400 hover:text-orange-500"}`}
              >
                <ArrowBigUp className="w-4 h-4" strokeWidth={voteState === "up" ? 2.5 : 1.5} />
              </button>
              <span className={`text-[11px] font-semibold tabular-nums min-w-[20px] text-center ${
                voteState === "up" ? "text-orange-500" : voteState === "down" ? "text-blue-500" : "text-gray-500"
              }`}>
                {formatCount(score)}
              </span>
              <button
                onClick={() => setVoteState(voteState === "down" ? null : "down")}
                className={`p-1 rounded transition-colors ${voteState === "down" ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`}
              >
                <ArrowBigDown className="w-4 h-4" strokeWidth={voteState === "down" ? 2.5 : 1.5} />
              </button>
              <button
                onClick={() => setReplying(!replying)}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-gray-500 hover:bg-black/[0.04] transition-colors ml-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Reply
              </button>
              <button className="p-1 rounded text-gray-400 hover:bg-black/[0.04] transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reply input */}
            {replying && (
              <div className="pl-6 mt-2 mb-1">
                <textarea
                  placeholder="Write a reply..."
                  className="w-full p-2.5 text-[13px] bg-black/[0.02] border border-black/[0.06] rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-black/[0.08] placeholder:text-gray-400"
                  rows={3}
                  autoFocus
                />
                <div className="flex items-center gap-2 mt-1.5">
                  <button className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Reply
                  </button>
                  <button onClick={() => setReplying(false)} className="px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:bg-black/[0.04] rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Children */}
            {comment.children.length > 0 && (
              <div className="mt-1">
                {comment.children.map(child => (
                  <CommentNode key={child.id} comment={child} depth={depth + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ThreadView = ({ post, onClose }: ThreadViewProps) => {
  const [postVote, setPostVote] = useState<"up" | "down" | null>(null);
  const postScore = post.upvotes - post.downvotes + (postVote === "up" ? 1 : postVote === "down" ? -1 : 0);
  const comments = commentsForPost[post.id] || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-3xl bg-[#f8f8f7] h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#f8f8f7]/95 backdrop-blur-md border-b border-black/[0.06]">
          <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
            <span className="text-[14px]">{post.community.icon}</span>
            <span className="font-semibold text-gray-700">c/{post.community.name}</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-black/[0.04] rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-6">
          {/* Post header */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2">
              <span>Posted by u/{post.author.name}</span>
              <span>·</span>
              <span>{post.createdAt}</span>
              <span>·</span>
              <span>{formatCount(post.author.karma)} karma</span>
            </div>
            <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-3">{post.title}</h1>
            <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>

          {/* Post actions */}
          <div className="flex items-center gap-1 py-2 border-y border-black/[0.04] mb-6">
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setPostVote(postVote === "up" ? null : "up")}
                className={`p-1 rounded transition-colors ${postVote === "up" ? "text-orange-500" : "text-gray-400 hover:text-orange-500"}`}
              >
                <ArrowBigUp className="w-5 h-5" strokeWidth={postVote === "up" ? 2.5 : 1.5} />
              </button>
              <span className={`text-[13px] font-semibold tabular-nums ${
                postVote === "up" ? "text-orange-500" : postVote === "down" ? "text-blue-500" : "text-gray-600"
              }`}>
                {formatCount(postScore)}
              </span>
              <button
                onClick={() => setPostVote(postVote === "down" ? null : "down")}
                className={`p-1 rounded transition-colors ${postVote === "down" ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`}
              >
                <ArrowBigDown className="w-5 h-5" strokeWidth={postVote === "down" ? 2.5 : 1.5} />
              </button>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-gray-500 hover:bg-black/[0.04] transition-colors">
              <MessageSquare className="w-4 h-4" />
              {post.commentCount}
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-gray-500 hover:bg-black/[0.04] transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-gray-500 hover:bg-black/[0.04] transition-colors">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>

          {/* Comment input */}
          <div className="mb-6">
            <textarea
              placeholder="What are your thoughts?"
              className="w-full p-3 text-[13px] bg-white border border-black/[0.06] rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-black/[0.08] placeholder:text-gray-400 transition-all"
              rows={4}
            />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Comment
              </button>
            </div>
          </div>

          {/* Comments */}
          <div>
            {comments.length > 0 ? (
              comments.map(comment => (
                <CommentNode key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-center text-[13px] text-gray-400 py-8">No comments yet. Be the first to comment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadView;
