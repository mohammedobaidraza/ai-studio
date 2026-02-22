import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Upload, Globe, Lock, Tag, GitBranch, FileCode, Image,
  ChevronDown, Info, Plus, Check, AlertCircle
} from "lucide-react";

interface PublishAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tagSuggestions = [
  "Conversational", "Coding", "Research", "Writing", "Analysis",
  "Creative", "Multimodal", "Fast", "Open Source", "Enterprise"
];

const PublishAgentModal = ({ isOpen, onClose }: PublishAgentModalProps) => {
  const [step, setStep] = useState(1);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [repoUrl, setRepoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setAgentName("");
    setDescription("");
    setSelectedTags([]);
    setVisibility("public");
    setVersion("1.0.0");
    setRepoUrl("");
    setLogoPreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={resetAndClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-4 md:inset-auto md:top-[5%] md:left-1/2 md:-translate-x-1/2 md:max-w-2xl md:w-full md:max-h-[90vh] z-50 flex flex-col"
          >
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl max-h-full border border-gray-100">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Publish Agent</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Share your agent with the community</p>
                </div>
                <button onClick={resetAndClose} className="p-2 hover:bg-white/80 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  {[
                    { num: 1, label: "Details" },
                    { num: 2, label: "Configure" },
                    { num: 3, label: "Review" },
                  ].map((s, i) => (
                    <div key={s.num} className="flex items-center gap-2 flex-1">
                      <button
                        onClick={() => s.num < step && setStep(s.num)}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                          step === s.num
                            ? "text-blue-600"
                            : step > s.num
                            ? "text-green-600 cursor-pointer"
                            : "text-gray-400"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                          step === s.num
                            ? "border-blue-600 bg-blue-600 text-white"
                            : step > s.num
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 text-gray-400"
                        }`}>
                          {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                        </div>
                        <span className="hidden sm:inline">{s.label}</span>
                      </button>
                      {i < 2 && <div className={`flex-1 h-0.5 rounded ${step > s.num ? "bg-green-400" : "bg-gray-200"}`} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {step === 1 && (
                  <div className="space-y-5">
                    {/* Logo Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Agent Logo</label>
                      <div className="flex items-center gap-4">
                        <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 flex items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50/50 overflow-hidden">
                          {logoPreview ? (
                            <img src={logoPreview} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                          ) : (
                            <Image className="w-6 h-6 text-gray-400" />
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                        </label>
                        <div>
                          <p className="text-sm text-gray-600">Upload a logo for your agent</p>
                          <p className="text-xs text-gray-400 mt-0.5">PNG, SVG, or WebP. Max 2MB.</p>
                        </div>
                      </div>
                    </div>

                    {/* Agent Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Agent Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="e.g. CodeReviewer Pro"
                        className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400 transition-all"
                      />
                      {agentName && (
                        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Will be published as <span className="font-mono text-gray-600">agent-store/{agentName.toLowerCase().replace(/\s+/g, '-')}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what your agent does, its capabilities, and use cases..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400 transition-all resize-none"
                      />
                    </div>

                    {/* Source Repository */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <span className="flex items-center gap-1.5">
                          <GitBranch className="w-4 h-4" />
                          Source Repository
                        </span>
                      </label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/username/agent-repo"
                        className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400 transition-all font-mono"
                      />
                      <p className="text-xs text-gray-400 mt-1.5">Optional. Link your GitHub or HuggingFace repo.</p>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    {/* Visibility */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Visibility</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setVisibility("public")}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            visibility === "public"
                              ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <Globe className={`w-5 h-5 mb-2 ${visibility === "public" ? "text-blue-600" : "text-gray-400"}`} />
                          <div className="text-sm font-semibold text-gray-900">Public</div>
                          <p className="text-xs text-gray-500 mt-0.5">Anyone can discover and use this agent</p>
                        </button>
                        <button
                          onClick={() => setVisibility("private")}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            visibility === "private"
                              ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <Lock className={`w-5 h-5 mb-2 ${visibility === "private" ? "text-blue-600" : "text-gray-400"}`} />
                          <div className="text-sm font-semibold text-gray-900">Private</div>
                          <p className="text-xs text-gray-500 mt-0.5">Only you and collaborators can access</p>
                        </button>
                      </div>
                    </div>

                    {/* Version */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-4 h-4" />
                          Version
                        </span>
                      </label>
                      <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        placeholder="1.0.0"
                        className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-gray-400 transition-all font-mono"
                      />
                      <p className="text-xs text-gray-400 mt-1.5">Follow semantic versioning (major.minor.patch)</p>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {tagSuggestions.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedTags.includes(tag)
                                ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {selectedTags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Agent File Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-4 h-4" />
                          Agent Files
                        </span>
                      </label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-700">Drag & drop your agent files</p>
                        <p className="text-xs text-gray-400 mt-1">or click to browse • .py, .js, .json, .yaml</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Review your agent</h3>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-2xl font-bold text-gray-300">{agentName?.[0] || "A"}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{agentName || "Untitled Agent"}</p>
                            <p className="text-xs text-gray-500 font-mono">agent-store/{(agentName || "untitled").toLowerCase().replace(/\s+/g, '-')}</p>
                          </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Visibility</span>
                            <p className="font-medium text-gray-900 flex items-center gap-1 mt-0.5">
                              {visibility === "public" ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                              {visibility === "public" ? "Public" : "Private"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Version</span>
                            <p className="font-medium text-gray-900 font-mono mt-0.5">{version}</p>
                          </div>
                          {repoUrl && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Repository</span>
                              <p className="font-medium text-blue-600 font-mono mt-0.5 text-xs truncate">{repoUrl}</p>
                            </div>
                          )}
                        </div>

                        {description && (
                          <>
                            <hr className="border-gray-200" />
                            <div>
                              <span className="text-sm text-gray-500">Description</span>
                              <p className="text-sm text-gray-700 mt-1">{description}</p>
                            </div>
                          </>
                        )}

                        {selectedTags.length > 0 && (
                          <>
                            <hr className="border-gray-200" />
                            <div className="flex flex-wrap gap-1.5">
                              {selectedTags.map(tag => (
                                <span key={tag} className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">{tag}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {!agentName && (
                      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Agent name is required before publishing.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={resetAndClose}
                    className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-600/20"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    disabled={!agentName}
                    className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-green-600/20 flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Publish Agent
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PublishAgentModal;
