*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #1a1a1a;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.app {
  max-width: 760px;
  margin: 0 auto;
}

header {
  margin-bottom: 1.5rem;
}

header h1 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 4px;
}

header p {
  color: #666;
  font-size: 0.95rem;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

select, button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
}

button {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
  font-weight: 500;
}

button:hover { background: #333; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

#code-input {
  width: 100%;
  height: 220px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  background: #fff;
  margin-bottom: 1rem;
}

#output { margin-top: 1rem; }

.loading, .error {
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #ddd;
}
.error { color: #c0392b; border-color: #f5c6cb; background: #fff5f5; }

/* Result styles */
.result { display: flex; flex-direction: column; gap: 12px; }

.language-badge {
  font-size: 13px;
  background: #e8f0fe;
  color: #1a56db;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
}

.scores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.score-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px 16px;
  border-left: 4px solid #ccc;
}
.score-card.success { border-left-color: #27ae60; }
.score-card.warning { border-left-color: #f39c12; }
.score-card.danger  { border-left-color: #e74c3c; }

.score-label { font-size: 12px; color: #666; margin-bottom: 4px; text-transform: capitalize; }
.score-val { font-size: 22px; font-weight: 600; }
.score-val span { font-size: 13px; color: #999; font-weight: 400; }

.section {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1rem 1.25rem;
}
.section.danger-border { border-color: #f5c6cb; }

.section h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.section p { font-size: 14px; line-height: 1.7; color: #333; }

.section ul {
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #333;
}

.section pre {
  background: #f8f8f8;
  border-radius: 6px;
  padding: 12px;
  font-size: 12px;
  overflow-x: auto;
  border: 1px solid #eee;
}

.count {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 10px;
  font-weight: 600;
  margin-left: 6px;
}
.count.danger { background: #fff0f0; color: #c0392b; }

.muted { color: #999; }

/* ── File upload / drop zone ── */
.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 12px;
  background: #fff;
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  margin-bottom: 0;
  position: relative;
}

.drop-zone:hover,
.drop-zone:focus {
  border-color: #1a1a1a;
  background: #fafafa;
  outline: none;
}

.drop-zone.drag-over {
  border-color: #4f46e5;
  background: #f0f0ff;
}

.drop-zone.has-file {
  border-style: solid;
  border-color: #27ae60;
  background: #f0fff6;
}

.drop-zone-inner { pointer-events: none; }

.drop-icon { font-size: 2rem; display: block; margin-bottom: 8px; }

.drop-text {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.drop-sub {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

.file-label {
  color: #4f46e5;
  cursor: pointer;
  text-decoration: underline;
  pointer-events: all;
}

.drop-formats {
  font-size: 11px;
  color: #aaa;
  letter-spacing: 0.02em;
}

.file-input {
  display: none;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.file-name {
  font-size: 13px;
  font-weight: 500;
  color: #27ae60;
}

.clear-btn {
  background: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 11px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
}

.clear-btn:hover { background: #fee; border-color: #e74c3c; color: #e74c3c; }

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 1.2rem 0 1rem;
  color: #aaa;
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}
