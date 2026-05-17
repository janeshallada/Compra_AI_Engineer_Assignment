import Groq from 'groq-sdk';

export async function callLLM(systemPrompt, history, userMessage) {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY = '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' });

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 4096,
    messages: [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userMessage }
    ]
  });

  const text = response.choices[0].message.content;
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Could not parse LLM response as JSON');
  }
}