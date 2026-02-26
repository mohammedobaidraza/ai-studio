import { useState } from "react";
import { X, Image, Link2, BarChart3 } from "lucide-react";
import { communities } from "@/data/communityData";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const postTypes = [
  { id: "text", label: "Text" },
  { id: "image", label: "Image", icon: Image },
  { id: "link", label: "Link", icon: Link2 },
  { id: "poll", label: "Poll", icon: BarChart3 },
];

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [postType, setPostType] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900">Create Post</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Community selector */}
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="">Choose a community</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>

            {/* Post type tabs */}
            <div className="flex gap-1 bg-gray-50 rounded-xl p-1">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPostType(type.id)}
                  className={`flex-1 py-2 rounded-lg text-[12px] font-medium capitalize transition-all ${
                    postType === type.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[15px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white placeholder:text-gray-400 transition-all"
            />

            {/* Content */}
            <textarea
              placeholder={postType === "link" ? "Paste URL here..." : "What's on your mind?"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white placeholder:text-gray-400 transition-all"
              rows={5}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-[12px] text-gray-400">
              {title.length > 0 ? `${title.length}/300` : ""}
            </span>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button
                disabled={!title.trim() || !selectedCommunity}
                className="px-5 py-2 bg-gray-900 text-white text-[13px] font-medium rounded-xl hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreatePostModal;
