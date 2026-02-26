import { ArrowBigUp, ArrowBigDown, MessageSquare, Bookmark, Share2, MoreHorizontal, ExternalLink } from "lucide-react";
import { useState } from "react";
import { CommunityPost } from "@/data/communityData";

interface PostCardProps {
  post: CommunityPost;
  onClick: () => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [saved, setSaved] = useState(post.saved || false);

  const score = post.upvotes - post.downvotes + (voteState === "up" ? 1 : voteState === "down" ? -1 : 0);

  return (
    <div
      className="bg-white rounded-xl border border-black/[0.06] hover:border-black/[0.12] transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex">
        {/* Vote Column */}
        <div className="flex flex-col items-center gap-0.5 py-3 px-3 min-w-[44px]" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setVoteState(voteState === "up" ? null : "up")}
            className={`p-0.5 rounded transition-colors ${
              voteState === "up" ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
            }`}
          >
            <ArrowBigUp className="w-5 h-5" strokeWidth={voteState === "up" ? 2.5 : 1.5} />
          </button>
          <span className={`text-[12px] font-semibold tabular-nums ${
            voteState === "up" ? "text-orange-500" : voteState === "down" ? "text-blue-500" : "text-gray-600"
          }`}>
            {formatCount(score)}
          </span>
          <button
            onClick={() => setVoteState(voteState === "down" ? null : "down")}
            className={`p-0.5 rounded transition-colors ${
              voteState === "down" ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
            }`}
          >
            <ArrowBigDown className="w-5 h-5" strokeWidth={voteState === "down" ? 2.5 : 1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 py-3 pr-4">
          {/* Meta */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-1">
            <span className="text-[13px]">{post.community.icon}</span>
            <span className="font-semibold text-gray-600 hover:underline">c/{post.community.name}</span>
            <span>·</span>
            <span>Posted by</span>
            <span className="hover:underline">u/{post.author.name}</span>
            <span>·</span>
            <span>{post.createdAt}</span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1 group-hover:text-gray-700 transition-colors">
            {post.title}
            {post.type === "link" && (
              <ExternalLink className="inline w-3.5 h-3.5 ml-1.5 text-gray-400" />
            )}
          </h3>

          {/* Preview */}
          <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed mb-2.5">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-gray-500 hover:bg-black/[0.04] transition-colors">
              <MessageSquare className="w-4 h-4" />
              {post.commentCount} Comments
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-gray-500 hover:bg-black/[0.04] transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
                saved ? "text-yellow-600 bg-yellow-50" : "text-gray-500 hover:bg-black/[0.04]"
              }`}
            >
              <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </button>
            <button className="p-1.5 rounded-md text-gray-400 hover:bg-black/[0.04] transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
