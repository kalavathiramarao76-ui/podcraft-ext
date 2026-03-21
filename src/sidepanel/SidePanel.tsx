import { useState } from "react";
import {
  FileText,
  Scissors,
  Linkedin,
  Twitter,
  Mail,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";
import ResultCard from "../components/ResultCard";

const TABS = [
  { id: "summarize", label: "Summarize", icon: FileText, promptType: "summarize" },
  { id: "clips", label: "Clips", icon: Scissors, promptType: "clips" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, promptType: "linkedin" },
  { id: "twitter", label: "Twitter", icon: Twitter, promptType: "twitter" },
  { id: "newsletter", label: "Newsletter", icon: Mail, promptType: "newsletter" },
  { id: "shownotes", label: "Show Notes", icon: ClipboardList, promptType: "shownotes" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SidePanel() {
  const [activeTab, setActiveTab] = useState<TabId>("summarize");
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  const handleGenerate = () => {
    if (!transcript.trim()) return;
    setLoading(activeTab);
    setError("");

    chrome.runtime.sendMessage(
      {
        type: "GENERATE",
        promptType: currentTab.promptType,
        transcript: transcript.trim(),
      },
      (response) => {
        setLoading(null);
        if (response?.error) {
          setError(response.error);
        } else {
          setResults((prev) => ({
            ...prev,
            [activeTab]: response?.result ?? "No result.",
          }));
        }
      }
    );
  };

  const handleGenerateAll = () => {
    if (!transcript.trim()) return;
    setError("");

    for (const tab of TABS) {
      setLoading("all");
      chrome.runtime.sendMessage(
        {
          type: "GENERATE",
          promptType: tab.promptType,
          transcript: transcript.trim(),
        },
        (response) => {
          if (response?.error) {
            setError(response.error);
          } else {
            setResults((prev) => ({
              ...prev,
              [tab.id]: response?.result ?? "No result.",
            }));
          }
          setLoading(null);
        }
      );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-podcraft-bg">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-podcraft-border">
        <div className="flex items-center justify-between mb-4">
          <Logo />
          <span className="text-[10px] font-medium text-podcraft-muted bg-podcraft-surface px-2 py-1 rounded-full">
            v1.0
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const hasResult = !!results[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-podcraft-purple/20 text-podcraft-violet border border-podcraft-purple/30"
                    : "text-podcraft-muted hover:text-podcraft-text hover:bg-podcraft-surface border border-transparent"
                } ${hasResult && !isActive ? "border-podcraft-purple/15" : ""}`}
              >
                <Icon size={14} />
                {tab.label}
                {hasResult && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Transcript input */}
        <div className="mb-4">
          <label className="text-xs font-medium text-podcraft-muted uppercase tracking-wider mb-2 block">
            Podcast Transcript
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste the full podcast transcript here..."
            className="w-full h-40 bg-podcraft-surface border border-podcraft-border rounded-xl p-3 text-sm text-podcraft-text placeholder:text-podcraft-muted/50 resize-none focus:outline-none focus:border-podcraft-purple/50 focus:ring-1 focus:ring-podcraft-purple/20 transition-all"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleGenerate}
            disabled={!!loading || !transcript.trim()}
            className="flex-1 py-2.5 bg-gradient-to-r from-podcraft-purple to-violet-600 hover:from-violet-600 hover:to-podcraft-purple text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-podcraft-purple/20"
          >
            <Sparkles size={16} />
            {loading === activeTab
              ? "Generating..."
              : `Generate ${currentTab.label}`}
          </button>
          <button
            onClick={handleGenerateAll}
            disabled={!!loading || !transcript.trim()}
            className="px-4 py-2.5 bg-podcraft-surface border border-podcraft-border hover:border-podcraft-purple/40 text-podcraft-text text-sm font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Generate all formats"
          >
            All
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && <Spinner />}

        {/* Result */}
        {results[activeTab] && (
          <ResultCard content={results[activeTab]} label={currentTab.label} />
        )}
      </div>
    </div>
  );
}
