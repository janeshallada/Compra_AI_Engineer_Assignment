import { Router } from 'express';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';
import { callLLM } from '../services/llmService.js';
import { validateLayout } from '../utils/jsonValidator.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { message, layout, history = [] } = req.body;

    if (!message || !layout) {
      return res.status(400).json({ error: 'message and layout are required' });
    }

    const systemPrompt = buildSystemPrompt(layout);

    // Keep last 6 messages for context window efficiency
    const trimmedHistory = history.slice(-6);

    const result = await callLLM(systemPrompt, trimmedHistory, message);

    if (!result.updatedLayout || !result.explanation) {
      return res.status(500).json({ error: 'LLM returned unexpected format' });
    }

    validateLayout(result.updatedLayout);

    return res.json({
      explanation: result.explanation,
      updatedLayout: result.updatedLayout
    });

  } catch (err) {
    console.error('Chat route error:', err.message);
    return res.status(500).json({
      error: err.message || 'Internal server error'
    });
  }
});

export default router;
