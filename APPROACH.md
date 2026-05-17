# Approach Note

## Architecture Overview

The agent is split into a React frontend and an Express backend. The frontend handles chat UI and wireframe rendering; the backend handles LLM calls securely (API key never exposed to the browser).

## How the System Prompt Works

The system prompt is the core of the agent — roughly 80% of quality comes from it. It includes:

1. **Canvas rules** — explains the dual coordinate system: every node has both absolute (x, y, width, height) and normalized (nx, ny, nw, nh) coordinates. The LLM is instructed to always recompute absolute values from normalized ones after any resize.

2. **Semantic role hints** — the LLM infers which element is the "headline", "product", "badge", etc. from node names and text content. This lets users say "move the headline" without specifying node IDs.

3. **Transformation rules** — precise math for each operation:
   - Aspect ratio: change artboard dims → recompute all children from normalized coords
   - Move: update nx/ny → derive x/y
   - Font size: scale + update fontSizeRatio

4. **Strict output format** — LLM must return `{ explanation, updatedLayout }` as pure JSON (no markdown fences). The backend strips fences defensively just in case.

## Safe JSON Transformations

The server validates every LLM response before accepting it:
- `rootNodes` is an array
- `nodes` is an object
- All root node IDs exist in `nodes`
- Artboard has numeric `width` / `height`

Validation failures return a 500 with a clear error message; the frontend shows a friendly retry prompt.

## Conversation Context

The last 6 messages are passed to the LLM on every request. This enables follow-up instructions like "make it bigger" (after "move the headline") to correctly resolve the referent without extra disambiguation UI.

The conversation history is stored in React state and trimmed to avoid token bloat on long sessions.

## Trade-offs & What I'd Improve

- **LLM does all math** — for correctness, critical transforms like resizeArtboard could be done deterministically in code and the LLM only called for semantic reasoning. Added layoutTransforms.js helper for this but didn't wire it to a tool-call pattern in time.
- **No streaming** — responses feel slightly slow on long layouts. Would add SSE streaming from the backend.
- **No undo stack** — easy to add with a `history[]` array of past layout states.
- **No PNG rendering** — would use html2canvas or a headless renderer in production.
- **Normalized coord drift** — if the LLM makes floating point errors in nx/ny, they compound over many turns. Would add a normalization pass that re-derives nx/ny from x/y after each update.
