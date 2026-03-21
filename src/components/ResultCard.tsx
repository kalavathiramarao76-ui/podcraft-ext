import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ResultCardProps {
  content: string;
  label?: string;
}

export default function ResultCard({ content, label }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fadeIn bg-podcraft-card border border-podcraft-border rounded-xl p-4 mt-4">
      {label && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-podcraft-purple">
            {label}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-podcraft-muted hover:text-podcraft-violet transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="text-sm text-podcraft-text leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}
