// ============ Site José Dario Pintor — interações ============
(function () {
  // --- Nav mobile toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Fechar' : 'Menu';
    });
  }

  // --- Ano dinâmico ---
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // --- Marcar link ativo ---
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  // --- Busca em materiais ---
  const searchInput = document.getElementById('material-search');
  if (searchInput) {
    const items = Array.from(document.querySelectorAll('.mat-item'));
    const groups = Array.from(document.querySelectorAll('.mat-group'));
    const countEl = document.getElementById('search-count');
    const main = document.querySelector('[data-materials]');

    const update = () => {
      const q = searchInput.value.trim().toLowerCase();
      let visible = 0;
      items.forEach(it => {
        const hay = (it.dataset.search || it.textContent || '').toLowerCase();
        const match = !q || hay.includes(q);
        it.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      // hide groups with no visible items
      groups.forEach(g => {
        const anyVisible = g.querySelectorAll('.mat-item').length &&
          Array.from(g.querySelectorAll('.mat-item')).some(i => i.style.display !== 'none');
        g.style.display = anyVisible ? '' : 'none';
      });
      if (countEl) countEl.textContent = visible + (visible === 1 ? ' item' : ' itens');
      if (main) main.classList.toggle('is-empty', visible === 0);
    };
    searchInput.addEventListener('input', update);
    // atalho de teclado: "/" foca na busca
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
    update();
  }

  // ============ Tweaks ============
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "marinho",
    "theme": "claro",
    "serifTitle": "source-serif"
  }/*EDITMODE-END*/;

  const ACCENTS = {
    marinho:  { accent: '#1e40af', soft: '#dbe4ff', ink: '#1e3a8a' },
    tinta:    { accent: '#0f172a', soft: '#e2e8f0', ink: '#020617' },
    bordo:    { accent: '#9f1239', soft: '#ffe4e6', ink: '#7f1d1d' },
    musgo:    { accent: '#3f6212', soft: '#ecfccb', ink: '#365314' },
    laranja:  { accent: '#c2410c', soft: '#ffedd5', ink: '#9a3412' }
  };
  const SERIFS = {
    'source-serif': '"Source Serif 4", Georgia, serif',
    'fraunces':     '"Fraunces", Georgia, serif',
    'crimson':      '"Crimson Pro", Georgia, serif',
    'playfair':     '"Playfair Display", Georgia, serif'
  };

  const current = { ...TWEAK_DEFAULTS, ...readLocal() };

  function readLocal() {
    try { return JSON.parse(localStorage.getItem('jdp_tweaks') || '{}'); }
    catch { return {}; }
  }
  function writeLocal() {
    localStorage.setItem('jdp_tweaks', JSON.stringify(current));
  }

  function apply() {
    const a = ACCENTS[current.accent] || ACCENTS.marinho;
    document.documentElement.style.setProperty('--accent', a.accent);
    document.documentElement.style.setProperty('--accent-soft', a.soft);
    document.documentElement.style.setProperty('--accent-ink', a.ink);

    document.documentElement.setAttribute('data-theme', current.theme === 'escuro' ? 'dark' : 'claro');

    const serif = SERIFS[current.serifTitle] || SERIFS['source-serif'];
    document.documentElement.style.setProperty('--font-serif', serif);
  }
  apply();

  // Tweaks panel UI (construído dinamicamente)
  const panel = document.createElement('aside');
  panel.className = 'tweaks';
  panel.setAttribute('aria-label', 'Painel de Tweaks');
  panel.innerHTML = `
    <h4>Tweaks <span class="sr-only">painel</span></h4>
    <div class="tweaks__row">
      <label>Acento</label>
      <div class="tweaks__swatches" data-tk="accent">
        <button title="marinho" data-val="marinho" style="background:#1e40af"></button>
        <button title="tinta"    data-val="tinta"    style="background:#0f172a"></button>
        <button title="bordô"    data-val="bordo"    style="background:#9f1239"></button>
        <button title="musgo"    data-val="musgo"    style="background:#3f6212"></button>
        <button title="laranja"  data-val="laranja"  style="background:#c2410c"></button>
      </div>
    </div>
    <div class="tweaks__row">
      <label>Tema</label>
      <select data-tk="theme" class="t-btn">
        <option value="claro">Claro</option>
        <option value="escuro">Escuro</option>
      </select>
    </div>
    <div class="tweaks__row">
      <label>Serifa</label>
      <select data-tk="serifTitle" class="t-btn">
        <option value="source-serif">Source Serif</option>
        <option value="fraunces">Fraunces</option>
        <option value="crimson">Crimson Pro</option>
        <option value="playfair">Playfair</option>
      </select>
    </div>
  `;
  document.body.appendChild(panel);

  function syncUI() {
    panel.querySelectorAll('[data-tk="accent"] button').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.val === current.accent ? 'true' : 'false');
    });
    panel.querySelectorAll('select[data-tk]').forEach(s => {
      s.value = current[s.dataset.tk];
    });
  }
  syncUI();

  panel.addEventListener('click', e => {
    const btn = e.target.closest('[data-tk="accent"] button');
    if (!btn) return;
    current.accent = btn.dataset.val;
    apply(); syncUI(); writeLocal(); postEdits({ accent: current.accent });
  });
  panel.addEventListener('change', e => {
    const s = e.target.closest('select[data-tk]');
    if (!s) return;
    current[s.dataset.tk] = s.value;
    apply(); writeLocal(); postEdits({ [s.dataset.tk]: s.value });
  });

  function postEdits(edits) {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    } catch (_) {}
  }

  // Edit-mode protocol
  window.addEventListener('message', e => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') panel.classList.add('is-visible');
    if (d.type === '__deactivate_edit_mode') panel.classList.remove('is-visible');
  });
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (_) {}
})();
