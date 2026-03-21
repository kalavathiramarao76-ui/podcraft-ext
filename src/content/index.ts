// PodCraft AI Content Script
// Injects "Repurpose Episode" button on YouTube and Spotify podcast pages

function isPodcastPage(): boolean {
  const url = window.location.href;
  if (url.includes("youtube.com/watch")) return true;
  if (url.includes("open.spotify.com/episode")) return true;
  if (url.includes("open.spotify.com/show")) return true;
  return false;
}

function createButton(): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.id = "podcraft-repurpose-btn";
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
    <span style="vertical-align:middle">Repurpose Episode</span>
  `;

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "99999",
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'Inter', -apple-system, sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.2)",
    transition: "all 0.2s ease",
    letterSpacing: "0.01em",
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "#7c3aed";
    btn.style.transform = "translateY(-2px)";
    btn.style.boxShadow =
      "0 6px 28px rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.3)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "#8b5cf6";
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow =
      "0 4px 20px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.2)";
  });

  btn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "OPEN_SIDEPANEL" });
  });

  return btn;
}

function injectButton(): void {
  if (!isPodcastPage()) return;
  if (document.getElementById("podcraft-repurpose-btn")) return;

  const btn = createButton();
  document.body.appendChild(btn);
}

// Initial injection
setTimeout(injectButton, 1500);

// Re-check on URL changes (YouTube SPA navigation)
let lastUrl = location.href;
const observer = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    const existing = document.getElementById("podcraft-repurpose-btn");
    if (existing) existing.remove();
    setTimeout(injectButton, 1000);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
