/**
 * Renders the review result object into an HTML string.
 * @param {object} r - Review result from the API
 * @returns {string} - HTML string
 */
export function renderResult(r) {
  const scoreColor = (v) => v >= 8 ? 'success' : v >= 5 ? 'warning' : 'danger';

  const listItems = (arr) =>
    arr.length
      ? arr.map((s) => `<li>${s}</li>`).join('')
      : '<li class="muted">None found</li>';

  const scores = ['readability', 'performance', 'security', 'maintainability'];

  return `
    <div class="result">
      <div class="language-badge">Language: <strong>${r.language}</strong></div>

      <div class="scores">
        ${scores.map((k) => `
          <div class="score-card ${scoreColor(r.scores[k])}">
            <div class="score-label">${k.charAt(0).toUpperCase() + k.slice(1)}</div>
            <div class="score-val">${r.scores[k]}<span>/10</span></div>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h3>📋 Summary</h3>
        <p>${r.summary}</p>
      </div>

      ${r.bugs.length ? `
      <div class="section danger-border">
        <h3>🐛 Bugs &amp; Issues <span class="count danger">${r.bugs.length}</span></h3>
        <ul>${listItems(r.bugs)}</ul>
      </div>` : ''}

      <div class="section">
        <h3>💡 Improvements</h3>
        <ul>${listItems(r.improvements)}</ul>
      </div>

      <div class="section">
        <h3>✅ What's Good</h3>
        <ul>${listItems(r.positives)}</ul>
      </div>

      ${r.refactor ? `
      <div class="section">
        <h3>🔁 Suggested Refactor</h3>
        <pre><code>${escapeHtml(r.refactor)}</code></pre>
      </div>` : ''}
    </div>
  `;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
