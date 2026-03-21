export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const textClass = size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-podcraft-purple to-violet-600 flex items-center justify-center shadow-lg shadow-podcraft-purple/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </div>
      </div>
      <div>
        <h1 className={`${textClass} font-bold bg-gradient-to-r from-podcraft-purple to-podcraft-lavender bg-clip-text text-transparent`}>
          EpicClip
        </h1>
      </div>
    </div>
  );
}
