<p align="center"><img src="public/icons/logo.svg" width="128" height="128" alt="EpicClip Logo"></p>

# EpicClip — AI Podcast Repurposer

![Version](https://img.shields.io/badge/version-1.0.0-A855F7)
![License](https://img.shields.io/badge/license-ISC-green)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

> Transform podcast episodes into multi-format content — summaries, clips, LinkedIn posts, Twitter threads, newsletters, and show notes — powered by AI.

---

## Features

- :page_facing_up: **Summarize** — Generate concise episode summaries with key takeaways and timestamps
- :scissors: **Clip Extraction** — Identify and extract the most engaging moments as shareable clips
- :briefcase: **LinkedIn Posts** — Auto-generate professional LinkedIn posts from podcast highlights
- :bird: **Twitter Threads** — Create viral-ready Twitter/X threads from episode insights
- :newspaper: **Newsletter** — Transform episodes into newsletter-ready content with sections and formatting
- :spiral_notepad: **Show Notes** — Generate comprehensive show notes with timestamps, links, and guest info
- :red_circle: **YouTube Integration** — Extract content directly from YouTube podcast episodes
- :green_circle: **Spotify Integration** — Pull podcast data from Spotify episode pages
- :purple_heart: **Purple Theme** — Rich, creative UI with purple accents

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Vite 8** | Build tool & dev server |
| **Lucide React** | Icon library |
| **Firebase** | Authentication & data storage |
| **Chrome Extensions API** | Browser integration |

---

## Installation

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/podcraft-ext.git
   cd podcraft-ext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load into Chrome**
   - Open `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked**
   - Select the `dist/` folder

---

## Usage

### Repurposing from YouTube
1. Navigate to a **YouTube podcast episode**
2. Click the **EpicClip** icon or open the side panel
3. The extension extracts the video transcript automatically
4. Choose your output format(s) from the 6 available options

### Repurposing from Spotify
1. Navigate to a **Spotify podcast episode** page
2. Open the EpicClip side panel
3. Episode metadata and available content are extracted
4. Select your desired output formats

### Content Formats

| Format | Output |
|---|---|
| **Summarize** | 3-5 paragraph summary with key takeaways |
| **Clips** | Timestamped highlight clips with context |
| **LinkedIn Posts** | Professional posts with hooks and hashtags |
| **Twitter Threads** | Numbered threads (5-15 tweets) with key insights |
| **Newsletter** | Formatted newsletter sections with headers and CTAs |
| **Show Notes** | Timestamped notes, guest bio, links, and resources |

### Workflow
1. Select one or more output formats
2. Click **Generate** to process the episode
3. Review and edit generated content
4. Copy to clipboard or export directly

---

## Architecture

```
podcraft-ext/
├── src/
│   ├── popup/              # Extension popup UI
│   ├── sidepanel/          # Full repurposing workspace
│   ├── background/         # Service worker & content processing
│   ├── content/            # Content scripts for YouTube/Spotify
│   ├── shared/             # Shared utilities, types, constants
│   ├── components/         # Reusable React components
│   └── lib/                # Core libraries & API clients
├── public/
│   └── icons/              # Extension icons (16, 48, 128px)
├── dist/                   # Built extension output
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
└── manifest.json           # Chrome extension manifest
```

---

## Screenshots

<p align="center">
  <img src="public/icons/logo.svg" alt="EpicClip Logo" width="128" height="128" />
</p>

| Icon | Path |
|---|---|
| SVG Logo | `public/icons/logo.svg` |
| 16x16 | `public/icons/icon16.png` |
| 48x48 | `public/icons/icon48.png` |
| 128x128 | `public/icons/icon128.png` |

---

## License

ISC
