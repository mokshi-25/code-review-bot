const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-5-5';


/**
 * Sends code to Claude for review and returns structured feedback.
 * @param {string} code - The code to review
 * @param {string} lang - The language hint ('auto' or a language name)
 * @returns {Promise<object>} - Parsed review result
 */
export async function reviewCode(code, lang = 'auto') {
  const langHint = lang === 'auto'
    ? 'Auto-detect the programming language.'
    : `The language is ${lang}.`;

  const systemPrompt = `You are an expert code reviewer. ${langHint}
Analyze the provided code and respond ONLY with a valid JSON object (no markdown, no backticks, no extra text):
{
  "language": "detected or given language",
  "summary": "2-3 sentence overall assessment",
  "scores": {
    "readability": <integer 1-10>,
    "performance": <integer 1-10>,
    "security": <integer 1-10>,
    "maintainability": <integer 1-10>
  },
  "bugs": ["list of bugs or potential errors, each as a string"],
  "improvements": ["list of actionable suggestions, each as a string"],
  "positives": ["list of things done well, each as a string"],
  "refactor": "optional short refactored snippet, or empty string"
}`;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY_HERE',   // 🔑 Replace with your Anthropic API key
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: code }],
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.content.map((c) => c.text || '').join('');
  const clean = text.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error('Failed to parse API response as JSON.');
  }
}
