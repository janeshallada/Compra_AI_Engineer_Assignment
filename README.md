# Layout Agent

A chat-based AI layout agent that transforms design JSON through natural language instructions.

## What It Does

- Chat with an AI to transform a design layout (positions, sizes, aspect ratios, font sizes)
- Live wireframe preview updates after every instruction
- Full JSON viewer shows the updated layout
- Supports follow-up instructions with conversation context

## Example Instructions

```
Convert to 9:16
Keep the product large
Move the headline to the top
Move the offer badge higher
Make the headline smaller
Convert to 16:9
Center the product
Make the discount badge bigger
Change headline color to red
```

## Prerequisites

- Node.js v18 or newer
- An Anthropic API key → https://console.anthropic.com

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd layout-agent
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm run dev
```

Server runs on http://localhost:3001

### 3. Set up the frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

Frontend runs on http://localhost:5173

Open http://localhost:5173 in your browser. That's it!

## Project Structure

```
layout-agent/
├── client/                         # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── ChatWindow.jsx      # Scrollable message list
│       │   ├── ChatInput.jsx       # Text input + quick prompts
│       │   ├── WireframePreview.jsx# Visual layout preview
│       │   └── JsonViewer.jsx      # JSON display with copy button
│       ├── hooks/
│       │   └── useLayoutAgent.js   # Chat + layout state logic
│       ├── data/
│       │   └── initialLayout.json  # Provided design JSON
│       └── App.jsx
│
└── server/                         # Node.js + Express backend
    ├── routes/chat.js              # POST /api/chat
    ├── services/
    │   ├── llmService.js           # Anthropic SDK wrapper
    │   └── layoutTransforms.js     # resizeArtboard, moveNode, etc.
    ├── prompts/systemPrompt.js     # LLM system prompt
    └── utils/jsonValidator.js      # Validates LLM output shape
```

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | React + Vite |
| Styling | Custom CSS |
| Backend | Node.js + Express |
| LLM | Claude claude-sonnet-4-20250514 (Anthropic) |
| State | React useState |
| HTTP | Axios |
