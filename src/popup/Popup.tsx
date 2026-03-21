import { useState } from "react";
import { Sparkles, PanelRight } from "lucide-react";
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";
import ResultCard from "../components/ResultCard";

export default function Popup() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    chrome.runtime.sendMessage(
      { type: "GENERATE", promptType: "summarize", transcript: transcript.trim() },
      (response) => {
        setLoading(false);
        if (response?.error) {
          setError(response.error);
        } else {
          setResult(response?.result ?? "No result.");
        }
      }
    );
  };

  const openSidePanel = () => {
    chrome.runtime.sendMessage({ type: "OPEN_SIDEPANEL" });
  };

  return (
    <div className="w-[380px] min-h-[460px] bg-podcraft-bg p-5">
      <div className="flex items-center justify-between mb-5">
        <Logo size="sm" />
        <button
          onClick={openSidePanel}
          className="flex items-center gap-1.5 text-xs text-podcraft-muted hover:text-podcraft-violet transition-colors cursor-pointer"
          title="Open Side Panel"
        >
          <PanelRight size={16} />
          Full Studio
        </button>
      </div>

      <div className="mb-1">
        <label className="text-xs font-medium text-podcraft-muted uppercase tracking-wider">
          Quick Summarize
        </label>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste a transcript snippet here..."
        className="w-full h-32 bg-podcraft-surface border border-podcraft-border rounded-xl p-3 text-sm text-podcraft-text placeholder:text-podcraft-muted/50 resize-none focus:outline-none focus:border-podcraft-purple/50 focus:ring-1 focus:ring-podcraft-purple/20 transition-all"
      />

      <button
        onClick={handleSummarize}
        disabled={loading || !transcript.trim()}
        className="w-full mt-3 py-2.5 bg-gradient-to-r from-podcraft-purple to-violet-600 hover:from-violet-600 hover:to-podcraft-purple text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-podcraft-purple/20"
      >
        <Sparkles size={16} />
        {loading ? "Generating..." : "Get Key Points"}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
          {error}
        </div>
      )}

      {loading && <Spinner />}

      {result && <ResultCard content={result} label="Key Points" />}
    </div>
  );
}
