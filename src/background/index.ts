import { chatCompletion, PROMPTS, type Message } from "../lib/api";

type PromptKey = keyof typeof PROMPTS;

// Open side panel on action click (if supported)
chrome.sidePanel
  ?.setPanelBehavior?.({ openPanelOnActionClick: false })
  .catch(() => {});

// Handle messages from popup, sidepanel, and content scripts
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "GENERATE") {
    const { promptType, transcript } = message as {
      type: string;
      promptType: PromptKey;
      transcript: string;
    };

    const promptFn = PROMPTS[promptType];
    if (!promptFn) {
      sendResponse({ error: `Unknown prompt type: ${promptType}` });
      return true;
    }

    const messages: Message[] = promptFn(transcript);

    chatCompletion(messages)
      .then((result) => sendResponse({ result }))
      .catch((err) => sendResponse({ error: err.message }));

    return true; // Keep message channel open for async response
  }

  if (message.type === "OPEN_SIDEPANEL") {
    chrome.sidePanel
      ?.open?.({ tabId: _sender.tab?.id })
      .catch(() => {});
    return false;
  }

  return false;
});

// Context menu for opening side panel
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus?.create?.({
    id: "podcraft-sidepanel",
    title: "Open PodCraft AI",
    contexts: ["page"],
    documentUrlPatterns: [
      "https://www.youtube.com/*",
      "https://youtube.com/*",
      "https://open.spotify.com/*",
    ],
  });
});

chrome.contextMenus?.onClicked?.addListener((info, tab) => {
  if (info.menuItemId === "podcraft-sidepanel" && tab?.id) {
    chrome.sidePanel?.open?.({ tabId: tab.id }).catch(() => {});
  }
});
