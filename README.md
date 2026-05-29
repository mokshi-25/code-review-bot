# 🔍 Code Review Bot

An AI-powered code review tool built with vanilla JavaScript and the Anthropic Claude API.

## Features
- Paste any code and get instant AI feedback
- Drag & drop or browse to upload code files
- Auto-detects programming language from file extension
- Scores code on readability, performance, security, and maintainability
- Highlights bugs, improvements, and positives
- Suggests a refactored snippet when applicable

## Project Structure

```
code-review-bot/
├── public/
│   └── index.html       # HTML entry point
├── src/
│   ├── main.js          # App bootstrap
│   ├── app.js           # UI rendering & event handling
│   ├── api.js           # Anthropic API integration
│   ├── renderer.js      # HTML result renderer
│   └── style.css        # Styles
└── README.md
```

## Setup

1. **Clone or download** this project folder.

2. **Add your Anthropic API key** in `src/api.js`:
   ```js
   'x-api-key': 'YOUR_API_KEY_HERE'
   ```
   > ⚠️ For production, never expose your API key in frontend code.
   > Use a backend proxy (Node.js/Express, FastAPI, etc.) to make API calls securely.

3. **Run locally** using any static server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```

4. Open in your browser:
   ```
   http://localhost:3000/public/index.html
   ```

## Tech Stack
- Vanilla JavaScript (ES Modules)
- CSS3
- Anthropic Claude API (`claude-sonnet-4-20250514`)

## Supported Languages
JavaScript, TypeScript, Python, Java, C, C++, Go, Rust, PHP, SQL, HTML, CSS

## Next Steps / Ideas
- Add a diff view for the refactor suggestion
- Build a Node.js/Express backend proxy for secure API calls
- Add history of past reviews using localStorage
- Export review as PDF or Markdown
- Add syntax highlighting in the code textarea
