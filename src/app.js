import { reviewCode, getSavedKey, saveKey } from './api.js';
import { renderResult } from './renderer.js';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function initApp(root) {
  root.innerHTML = `
    <div class="app">
      <header>
        <h1>🔍 Code Review Bot</h1>
        <p>Paste your code below and get instant AI-powered feedback.</p>
      </header>

      <div class="controls">
        <select id="lang-select">
          <option value="auto">Auto-detect language</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="TypeScript">TypeScript</option>
          <option value="C++">C++</option>
          <option value="C">C</option>
          <option value="Go">Go</option>
          <option value="Rust">Rust</option>
          <option value="PHP">PHP</option>
          <option value="SQL">SQL</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
        <button id="review-btn">Review Code</button>
        <button id="clear-btn" style="background:#fff;color:#1a1a1a;border-color:#ddd;">Clear</button>
      </div>

      <!-- API key box -->
      <div style="margin:12px 0;padding:12px;border:1px solid #ddd;border-radius:10px;background:#fff;">
        <div style="font-weight:600;margin-bottom:6px;">🔑 Your Anthropic API key (optional)</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <input id="key-input" type="password" placeholder="sk-ant-..." autocomplete="off"
            style="flex:1;min-width:200px;padding:8px;border:1px solid #ddd;border-radius:8px;" />
          <button id="key-save-btn">Save key</button>
          <button id="key-remove-btn" style="background:#fff;color:#1a1a1a;border-color:#ddd;">Remove</button>
        </div>
        <div id="key-status" style="font-size:13px;margin-top:6px;color:#555;"></div>
      </div>

      <!-- File upload drop zone -->
      <div class="drop-zone" id="drop-zone" tabindex="0" role="button" aria-label="Upload a code file">
        <div class="drop-zone-inner">
          <span class="drop-icon">📂</span>
          <div class="drop-text">Drop a code file here</div>
          <div class="drop-sub">or <label class="file-label" for="file-input">browse to upload</label></div>
          <div class="drop-formats">.js .ts .py .java .cpp .c .go .rs .php .sql .html .css .txt</div>
        </div>
        <div class="file-info" id="file-info" style="display:none;">
          <span class="file-name" id="file-name"></span>
          <button class="clear-btn" id="file-clear-btn" title="Remove file">✕</button>
        </div>
        <input type="file" id="file-input" class="file-input"
          accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.h,.go,.rs,.php,.sql,.html,.css,.txt,.md" />
      </div>

      <div class="divider">or paste code below</div>

      <textarea id="code-input" placeholder="// Paste your code here..."></textarea>

      <div id="output"></div>
    </div>
  `;

  const reviewBtn  = root.querySelector('#review-btn');
  const clearBtn   = root.querySelector('#clear-btn');
  const codeInput  = root.querySelector('#code-input');
  const langSelect = root.querySelector('#lang-select');
  const output     = root.querySelector('#output');
  const dropZone   = root.querySelector('#drop-zone');
  const fileInput  = root.querySelector('#file-input');
  const fileInfo   = root.querySelector('#file-info');
  const fileName   = root.querySelector('#file-name');
  const fileClearBtn = root.querySelector('#file-clear-btn');
  const keyInput   = root.querySelector('#key-input');
  const keySaveBtn = root.querySelector('#key-save-btn');
  const keyRemoveBtn = root.querySelector('#key-remove-btn');
  const keyStatus  = root.querySelector('#key-status');

  // ── API key box ──
  function updateKeyStatus() {
    if (getSavedKey()) {
      keyStatus.textContent = '✅ Key saved in this browser only. Reviews will be real.';
    } else {
      keyStatus.textContent = 'Demo mode: no key saved, so you will see a sample review. Your key stays in your browser and is never uploaded to GitHub.';
    }
  }

  keySaveBtn.addEventListener('click', () => {
    const key = keyInput.value.trim();
    if (!key) {
      keyStatus.textContent = '⚠️ Please paste your key first.';
      return;
    }
    saveKey(key);
    keyInput.value = '';
    updateKeyStatus();
  });

  keyRemoveBtn.addEventListener('click', () => {
    saveKey('');
    keyInput.value = '';
    updateKeyStatus();
  });

  updateKeyStatus();

  // ── Review button ──
  reviewBtn.addEventListener('click', async () => {
    const code = codeInput.value.trim();
    if (!code) {
      output.innerHTML = '<div class="error">⚠️ Please paste some code or upload a file first.</div>';
      return;
    }
    reviewBtn.disabled = true;
    reviewBtn.textContent = 'Reviewing…';
    output.innerHTML = '<div class="loading">⏳ Analyzing your code…</div>';

    try {
      const result = await reviewCode(code, langSelect.value);
      output.innerHTML = renderResult(result);
    } catch (err) {
      output.innerHTML = `<div class="error">❌ ${escapeHtml(err.message)}</div>`;
    } finally {
      reviewBtn.disabled = false;
      reviewBtn.textContent = 'Review Code';
    }
  });

  // ── Clear button ──
  clearBtn.addEventListener('click', () => {
    codeInput.value = '';
    output.innerHTML = '';
    clearFileState();
  });

  // ── File input change ──
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) loadFile(file);
  });

  // ── Drag and drop ──
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  });

  // ── Keyboard accessibility ──
  dropZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') fileInput.click();
  });

  // ── Remove file ──
  fileClearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearFileState();
  });

  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      codeInput.value = e.target.result;
      fileName.textContent = file.name;
      fileInfo.style.display = 'flex';
      dropZone.classList.add('has-file');

      // Auto-detect language from extension
      const ext = file.name.split('.').pop().toLowerCase();
      const extMap = {
        js: 'JavaScript', ts: 'TypeScript', jsx: 'JavaScript', tsx: 'TypeScript',
        py: 'Python', java: 'Java', cpp: 'C++', c: 'C', go: 'Go',
        rs: 'Rust', php: 'PHP', sql: 'SQL', html: 'HTML', css: 'CSS',
      };
      if (extMap[ext]) langSelect.value = extMap[ext];
    };
    reader.readAsText(file);
  }

  function clearFileState() {
    fileInput.value = '';
    fileInfo.style.display = 'none';
    fileName.textContent = '';
    dropZone.classList.remove('has-file');
  }
}
