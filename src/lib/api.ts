const API_URL = "https://sai.sharedllm.com/v1/chat/completions";
const MODEL = "gpt-oss:120b";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chatCompletion(messages: Message[]): Promise<string> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response generated.";
}

export const PROMPTS = {
  summarize: (transcript: string) => [
    {
      role: "system" as const,
      content:
        "You are PodCraft AI, a podcast content expert. Summarize the podcast transcript into clear, actionable key points. Use bullet points. Be concise but comprehensive.",
    },
    {
      role: "user" as const,
      content: `Summarize this podcast transcript into key points:\n\n${transcript}`,
    },
  ],

  clips: (transcript: string) => [
    {
      role: "system" as const,
      content:
        "You are PodCraft AI. Extract the most shareable, impactful clips from this podcast. Each clip should be a standalone quote or segment that works as a short-form content piece. Include timestamps if available.",
    },
    {
      role: "user" as const,
      content: `Extract the best shareable clips from this transcript:\n\n${transcript}`,
    },
  ],

  linkedin: (transcript: string) => [
    {
      role: "system" as const,
      content:
        "You are PodCraft AI. Create a professional LinkedIn post from this podcast transcript. Use a hook opening, storytelling structure, key insights, and a call-to-action. Include relevant hashtags. Format with line breaks for readability.",
    },
    {
      role: "user" as const,
      content: `Create a LinkedIn post from this podcast transcript:\n\n${transcript}`,
    },
  ],

  twitter: (transcript: string) => [
    {
      role: "system" as const,
      content:
        "You are PodCraft AI. Create a Twitter/X thread from this podcast. Start with a hook tweet, break key insights into individual tweets (max 280 chars each), use numbering (1/, 2/, etc.), and end with a summary tweet. Make it engaging and shareable.",
    },
    {
      role: "user" as const,
      content: `Create a Twitter thread from this podcast transcript:\n\n${transcript}`,
    },
  ],

  newsletter: (transcript: string) => [
    {
      role: "system" as const,
      content:
        "You are PodCraft AI. Transform this podcast into a newsletter edition. Include: a catchy subject line, intro paragraph, 3-5 key takeaways with explanations, a notable quote, and a closing CTA. Use markdown formatting.",
    },
    {
      role: "user" as const,
      content: `Create a newsletter from this podcast transcript:\n\n${transcript}`,
    },
  ],

  shownotes: (transcript: string) => [
    {
      role: "system" as const,
      content:
        "You are PodCraft AI. Generate professional show notes for this podcast episode. Include: episode title suggestion, one-paragraph description, timestamps/chapters, key topics discussed, resources mentioned, and guest info if detectable.",
    },
    {
      role: "user" as const,
      content: `Generate show notes from this podcast transcript:\n\n${transcript}`,
    },
  ],
};
