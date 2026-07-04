const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarize(text) {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Summarize the note in one short sentence.' },
      { role: 'user', content: text },
    ],
    max_tokens: 60,
  });
  return response.choices[0].message.content.trim();
}

module.exports = { summarize };
