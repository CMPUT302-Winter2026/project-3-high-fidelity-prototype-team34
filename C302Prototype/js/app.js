// ALTLab Vocabulary Explorer – App Logic
// Covers: router, nav, home, search, word detail, expert view,
//         word map, account, saved/folder screens, export, overlays.

'use strict';

// ══════════════════════════════════════════════════════
// APP STATE
// ══════════════════════════════════════════════════════
const state = {
  expertMode:       false,
  savedWordIds:     new Set(),
  folders:          JSON.parse(JSON.stringify(DEFAULT_FOLDERS)), // deep clone
  currentWordId:    null,
  navSource:        null,   // "search" | "wordmap" | "category" | null
  searchQuery:      '',
  searchBackLabel:  'Home',
  searchFilter:     'all',
  wordMapFocusId:   'mispon',
  wordMapFilter:    'all',
  currentFolderId:  null,
  folderFilter:     'all',
  savedFilter:      'all',
  selectMode:             false,
  selectedWordIds:        new Set(),
  folderSelectMode:       false,
  folderSelectedWordIds:  new Set(),
  folderPickerMode: null,   // "bookmark" | "multi-add"
  pendingConfirm:   null,   // callback for confirm dialog
  exportFolderId:   null,
  exportSource:     null,  // "saved" | "folder-open"
};

// Sync savedWordIds from folders on boot
function syncSavedWordIds() {
  state.savedWordIds = new Set();
  state.folders.forEach(f => f.wordIds.forEach(id => state.savedWordIds.add(id)));
}
syncSavedWordIds();

// ══════════════════════════════════════════════════════
// SCREEN ROUTER
// ══════════════════════════════════════════════════════
const SCREEN_NAV_TAB = {
  'screen-home':        'home',
  'screen-search':      'search',
  'screen-word-detail': 'search',
  'screen-account':     'home',
  'screen-word-map':    'wordmap',
  'screen-expert-view': 'search',
  'screen-saved':       'saved',
  'screen-folder-open': 'saved',
  'screen-export':      'saved',
  'screen-error':       'home',
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');

  // Update nav tabs
  const navKey = SCREEN_NAV_TAB[id] || 'home';
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.nav === navKey);
  });

  // Close any open overflow menus
  closeAllOverflowMenus();
}

// ══════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.classList.add('hidden'), 200);
  }, 2200);
}

// ══════════════════════════════════════════════════════
// CONFIRM DIALOG
// ══════════════════════════════════════════════════════
function showConfirmDialog(title, body, confirmLabel, callback) {
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-body').textContent = body;
  document.getElementById('btn-dialog-confirm').textContent = confirmLabel || 'Confirm';
  state.pendingConfirm = callback;
  document.getElementById('confirm-dialog-backdrop').classList.remove('hidden');
}
document.getElementById('btn-dialog-cancel').addEventListener('click', () => {
  document.getElementById('confirm-dialog-backdrop').classList.add('hidden');
  state.pendingConfirm = null;
});
document.getElementById('btn-dialog-confirm').addEventListener('click', () => {
  document.getElementById('confirm-dialog-backdrop').classList.add('hidden');
  if (state.pendingConfirm) { state.pendingConfirm(); state.pendingConfirm = null; }
});

// ══════════════════════════════════════════════════════
// RENAME DIALOG
// ══════════════════════════════════════════════════════
let renameCallback = null;
function showRenameDialog(currentName, callback) {
  document.getElementById('rename-input').value = currentName;
  renameCallback = callback;
  document.getElementById('rename-dialog-backdrop').classList.remove('hidden');
  setTimeout(() => document.getElementById('rename-input').focus(), 50);
}
document.getElementById('btn-rename-cancel').addEventListener('click', () => {
  document.getElementById('rename-dialog-backdrop').classList.add('hidden');
});
document.getElementById('btn-rename-confirm').addEventListener('click', () => {
  const val = document.getElementById('rename-input').value.trim();
  if (val && renameCallback) renameCallback(val);
  document.getElementById('rename-dialog-backdrop').classList.add('hidden');
});

// ══════════════════════════════════════════════════════
// NEW FOLDER DIALOG
// ══════════════════════════════════════════════════════
let newFolderCallback = null;
function showNewFolderDialog(callback) {
  document.getElementById('new-folder-input').value = '';
  newFolderCallback = callback;
  document.getElementById('new-folder-dialog-backdrop').classList.remove('hidden');
  setTimeout(() => document.getElementById('new-folder-input').focus(), 50);
}
document.getElementById('btn-new-folder-cancel').addEventListener('click', () => {
  document.getElementById('new-folder-dialog-backdrop').classList.add('hidden');
});
document.getElementById('btn-new-folder-confirm').addEventListener('click', () => {
  const val = document.getElementById('new-folder-input').value.trim();
  if (val) {
    const folder = createNewFolder(val);
    if (newFolderCallback) newFolderCallback(folder);
  }
  document.getElementById('new-folder-dialog-backdrop').classList.add('hidden');
});

// ══════════════════════════════════════════════════════
// OVERFLOW MENUS
// ══════════════════════════════════════════════════════
function closeAllOverflowMenus() {
  document.querySelectorAll('.overflow-menu').forEach(m => m.classList.add('hidden'));
}
document.addEventListener('click', e => {
  if (!e.target.closest('.overflow-menu-wrap')) closeAllOverflowMenus();
});

function toggleOverflowMenu(menuId, btnId) {
  document.getElementById(btnId).addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById(menuId);
    const isOpen = !menu.classList.contains('hidden');
    closeAllOverflowMenus();
    if (!isOpen) menu.classList.remove('hidden');
  });
}

// ══════════════════════════════════════════════════════
// BOTTOM SHEET HELPERS
// ══════════════════════════════════════════════════════
function openSheet(sheetId) {
  document.getElementById(sheetId).classList.remove('hidden');
  document.getElementById('sheet-backdrop').classList.remove('hidden');
}
function closeSheet(sheetId) {
  document.getElementById(sheetId).classList.add('hidden');
  document.getElementById('sheet-backdrop').classList.add('hidden');
}
document.getElementById('sheet-backdrop').addEventListener('click', () => {
  closeSheet('folder-picker-sheet');
  closeSheet('add-word-sheet');
  closeSheet('folder-actions-sheet');
});

// ══════════════════════════════════════════════════════
// BOOKMARK HELPERS
// ══════════════════════════════════════════════════════
function isWordSaved(wordId) {
  return state.savedWordIds.has(wordId);
}
function updateBookmarkIcons() {
  const saved = isWordSaved(state.currentWordId);
  ['bookmark-icon-detail', 'bookmark-icon-expert'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const btn = el.closest('button');
    if (saved) { el.style.fill = ''; el.style.stroke = ''; btn.classList.add('saved'); }
    else        { el.style.fill = ''; el.style.stroke = ''; btn.classList.remove('saved'); }
  });
}

// ══════════════════════════════════════════════════════
// FOLDER HELPERS
// ══════════════════════════════════════════════════════
const FOLDER_COLORS = ['#d4e8c4','#cce9f5','#fff0c2','#e8d5f5','#ffe0b2','#e0f0ea'];
const FOLDER_ICONS  = ['📁','🌦️','🫀','👨‍👩‍👧','🐺','🌲'];

function createNewFolder(name) {
  const idx = state.folders.length % FOLDER_COLORS.length;
  const folder = {
    id: 'folder-' + Date.now(),
    name,
    status: 'in-progress',
    icon: FOLDER_ICONS[idx],
    color: FOLDER_COLORS[idx],
    wordIds: [],
  };
  state.folders.push(folder);
  return folder;
}

function getFolderById(id) {
  return state.folders.find(f => f.id === id) || null;
}

function addWordToFolder(folderId, wordId) {
  const folder = getFolderById(folderId);
  if (folder && !folder.wordIds.includes(wordId)) {
    folder.wordIds.push(wordId);
    state.savedWordIds.add(wordId);
  }
}

function addWordsToFolder(folderId, wordIds) {
  wordIds.forEach(id => addWordToFolder(folderId, id));
}

function removeWordFromFolder(folderId, wordId) {
  const folder = getFolderById(folderId);
  if (!folder) return;
  folder.wordIds = folder.wordIds.filter(id => id !== wordId);
  // Remove from savedWordIds if not in any folder
  const stillSaved = state.folders.some(f => f.wordIds.includes(wordId));
  if (!stillSaved) state.savedWordIds.delete(wordId);
}

// ══════════════════════════════════════════════════════
// FOLDER PICKER SHEET
// ══════════════════════════════════════════════════════
function openFolderPicker(mode, wordIds) {
  // mode: "bookmark" (single word) | "multi-add" (array)
  state.folderPickerMode = mode;
  const title = mode === 'multi-add'
    ? `Add ${wordIds.length} word${wordIds.length !== 1 ? 's' : ''} to folder`
    : 'Save to folder';
  document.getElementById('folder-picker-title').textContent = title;

  const list = document.getElementById('folder-picker-list');
  list.innerHTML = '';

  state.folders.forEach(folder => {
    const row = document.createElement('div');
    row.className = 'folder-picker-row';
    row.innerHTML = `
      <span class="fp-name">${folder.name}</span>
      <span class="fp-count">${folder.wordIds.length} words</span>`;
    row.addEventListener('click', () => {
      if (mode === 'bookmark') {
        addWordToFolder(folder.id, state.currentWordId);
        updateBookmarkIcons();
        showToast(`Saved to "${folder.name}"`);
      } else {
        addWordsToFolder(folder.id, wordIds);
        showToast(`${wordIds.length} word${wordIds.length !== 1 ? 's' : ''} added to "${folder.name}"`);
        exitSelectMode();
      }
      closeSheet('folder-picker-sheet');
    });
    list.appendChild(row);
  });

  const newRow = document.createElement('div');
  newRow.className = 'folder-picker-row';
  newRow.innerHTML = `<span class="fp-name fp-new">+ New folder</span>`;
  newRow.addEventListener('click', () => {
    closeSheet('folder-picker-sheet');
    showNewFolderDialog(folder => {
      if (mode === 'bookmark') {
        addWordToFolder(folder.id, state.currentWordId);
        updateBookmarkIcons();
        showToast(`Saved to "${folder.name}"`);
      } else {
        addWordsToFolder(folder.id, wordIds);
        showToast(`${wordIds.length} word${wordIds.length !== 1 ? 's' : ''} added to "${folder.name}"`);
        exitSelectMode();
      }
    });
  });
  list.appendChild(newRow);

  openSheet('folder-picker-sheet');
}

document.getElementById('btn-folder-picker-cancel').addEventListener('click', () => {
  closeSheet('folder-picker-sheet');
});

// ══════════════════════════════════════════════════════
// NAVIGATE TO WORD
// ══════════════════════════════════════════════════════
function navigateToWord(wordId, source) {
  state.currentWordId = wordId;
  state.navSource = source;
  if (state.expertMode) {
    renderExpertView(wordId);
    showScreen('screen-expert-view');
  } else {
    renderWordDetail(wordId);
    showScreen('screen-word-detail');
  }
}

// ══════════════════════════════════════════════════════
// AUTOCOMPLETE SUGGESTIONS
// ══════════════════════════════════════════════════════
function renderSuggestions(query, dropdownId, onSelect) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  if (!query || query.length < 2) {
    dropdown.classList.add('hidden');
    dropdown.innerHTML = '';
    return;
  }
  const results = searchWords(query).slice(0, 5);
  if (results.length === 0) {
    dropdown.classList.add('hidden');
    dropdown.innerHTML = '';
    return;
  }
  dropdown.innerHTML = '';
  results.forEach(word => {
    const row = document.createElement('div');
    row.className = 'suggestion-row';
    row.innerHTML = `
      <span class="suggestion-cree">${word.cree}</span>
      <span class="suggestion-english">${word.english}</span>
      <svg class="icon suggestion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>`;
    row.addEventListener('mousedown', e => {
      e.preventDefault(); // prevent blur before click fires
      onSelect(word.cree);
      dropdown.classList.add('hidden');
    });
    dropdown.appendChild(row);
  });
  dropdown.classList.remove('hidden');
}

function hideSuggestions(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.add('hidden');
    dropdown.innerHTML = '';
  }
}

// ══════════════════════════════════════════════════════
// SCREEN 1 – HOME
// ══════════════════════════════════════════════════════
function renderHome() {
  // Theme grid
  const grid = document.getElementById('theme-grid');
  grid.innerHTML = '';
  THEMES.forEach((theme, i) => {
    const tile = document.createElement('div');
    tile.className = 'theme-tile' + (i === 0 ? ' wide' : '');
    tile.dataset.themeId = theme.id;
    tile.innerHTML = `
      <div class="theme-tile-icon">${theme.icon}</div>
      <div class="theme-tile-label">${theme.label}</div>
      <div class="theme-tile-count">${theme.count} words</div>`;
    tile.addEventListener('click', () => {
      state.searchQuery = theme.label;
      state.searchBackLabel = theme.label;
      const results = getWordsByTheme(theme.id);
      renderSearchResults(results, theme.label);
      document.getElementById('search-query-input').value = theme.label;
      document.getElementById('search-back-label').textContent = 'Home';
      showScreen('screen-search');
    });
    grid.appendChild(tile);
  });
}

// Search from home
document.getElementById('home-search-input').addEventListener('input', e => {
  const q = e.target.value.trim();
  renderSuggestions(q, 'home-suggestions', selected => {
    state.searchBackLabel = 'Home';
    doSearch(selected);
    e.target.value = '';
    hideSuggestions('home-suggestions');
  });
});
document.getElementById('home-search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (!q) return;
    state.searchBackLabel = 'Home';
    doSearch(q);
    e.target.value = '';
    hideSuggestions('home-suggestions');
  }
  if (e.key === 'Escape') hideSuggestions('home-suggestions');
});
document.getElementById('home-search-input').addEventListener('blur', () => {
  setTimeout(() => hideSuggestions('home-suggestions'), 150);
});

document.getElementById('btn-go-account').addEventListener('click', () => {
  showScreen('screen-account');
});

function updateExpertBadge() {
  const badge = document.getElementById('home-expert-badge');
  badge.classList.toggle('hidden', !state.expertMode);
}

// ══════════════════════════════════════════════════════
// SCREEN 2 – SEARCH RESULTS
// ══════════════════════════════════════════════════════
function doSearch(query) {
  state.searchQuery = query;
  const raw = searchWords(query);
  renderSearchResults(raw, query);
  document.getElementById('search-query-input').value = query;
  document.getElementById('search-back-label').textContent = state.searchBackLabel;
  showScreen('screen-search');
}

function renderSearchResults(words, query) {
  state.searchFilter = 'all';
  document.getElementById('search-idle-state').classList.add('hidden');
  renderFilteredResults(words, state.searchFilter, query);
  // Store full set for re-filtering
  document.getElementById('search-results-list').dataset.allIds =
    words.map(w => w.id).join(',');
}

function renderFilteredResults(words, filter, query) {
  const filtered = filterByClass(words, filter);
  const list = document.getElementById('search-results-list');
  const countEl = document.getElementById('results-count');
  const emptyEl = document.getElementById('search-empty-state');
  const emptyTitle = document.getElementById('search-empty-title');

  list.innerHTML = '';

  if (filtered.length === 0) {
    countEl.textContent = '';
    list.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyTitle.textContent = query ? `No results for "${query}"` : 'No results found';

    // Spelling correction suggestion
    const subEl = emptyEl.querySelector('.empty-sub');
    const suggestion = query ? findSpellingCorrection(query) : null;
    if (suggestion && normalize(suggestion) !== normalize(query)) {
      subEl.innerHTML = `Did you mean <a class="spell-suggestion-link" href="#">${suggestion}</a>?`;
      const link = subEl.querySelector('.spell-suggestion-link');
      link.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('search-query-input').value = suggestion;
        state.searchQuery = suggestion;
        const corrected = searchWords(suggestion);
        renderSearchResults(corrected, suggestion);
      });
    } else {
      subEl.textContent = 'Try a different spelling or browse by theme';
    }
    return;
  }

  list.classList.remove('hidden');
  emptyEl.classList.add('hidden');
  countEl.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`;

  filtered.forEach(word => {
    const isExact = query && normalize(word.cree).startsWith(normalize(query));
    const matchLabel = isExact ? 'Exact match' : `Related word · form`;

    const row = document.createElement('div');
    row.className = 'result-row';
    row.dataset.wordId = word.id;

    row.innerHTML = `
      <div class="result-checkbox" data-id="${word.id}"></div>
      <div class="result-content">
        <div class="result-cree">${word.cree}</div>
        <div class="result-english">${word.english}</div>
        <div class="result-meta">
          <span class="result-match">${matchLabel}</span>
          <span class="result-badge">${word.theme}</span>
        </div>
      </div>
      <svg class="icon result-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>`;

    row.addEventListener('click', e => {
      if (state.selectMode) {
        toggleResultSelection(word.id, row);
        return;
      }
      state.searchBackLabel = 'Results';
      navigateToWord(word.id, 'search');
    });

    row.querySelector('.result-checkbox').addEventListener('click', e => {
      e.stopPropagation();
      toggleResultSelection(word.id, row);
    });

    list.appendChild(row);
  });
}

// Filter chips
document.getElementById('search-filter-chips').addEventListener('click', e => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  state.searchFilter = btn.dataset.filter;
  document.querySelectorAll('#search-filter-chips .chip').forEach(c =>
    c.classList.toggle('chip-active', c.dataset.filter === state.searchFilter));

  const allIds = (document.getElementById('search-results-list').dataset.allIds || '').split(',').filter(Boolean);
  const allWords = allIds.map(id => getWord(id)).filter(Boolean);
  renderFilteredResults(allWords, state.searchFilter, state.searchQuery);
});

// Search bar inline
document.getElementById('search-query-input').addEventListener('input', e => {
  const q = e.target.value.trim();
  renderSuggestions(q, 'search-suggestions', selected => {
    document.getElementById('search-query-input').value = selected;
    hideSuggestions('search-suggestions');
    state.searchQuery = selected;
    const results = searchWords(selected);
    renderSearchResults(results, selected);
  });
  if (!q) {
    document.getElementById('results-count').textContent = '';
    document.getElementById('search-results-list').innerHTML = '';
    document.getElementById('search-results-list').dataset.allIds = '';
    document.getElementById('search-empty-state').classList.add('hidden');
    document.getElementById('search-idle-state').classList.remove('hidden');
    return;
  }
  document.getElementById('search-idle-state').classList.add('hidden');
  state.searchQuery = q;
  const results = searchWords(q);
  renderSearchResults(results, q);
});
document.getElementById('search-query-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') { hideSuggestions('search-suggestions'); e.target.blur(); }
  if (e.key === 'Escape') hideSuggestions('search-suggestions');
});
document.getElementById('search-query-input').addEventListener('blur', () => {
  setTimeout(() => hideSuggestions('search-suggestions'), 150);
});

// Back from search
document.getElementById('btn-search-back').addEventListener('click', () => {
  showScreen('screen-home');
});
document.getElementById('btn-empty-browse').addEventListener('click', () => {
  showScreen('screen-home');
});

// Multi-select
document.getElementById('btn-search-select-toggle').addEventListener('click', () => {
  enterSelectMode();
});
document.getElementById('btn-cancel-select').addEventListener('click', () => {
  exitSelectMode();
});
document.getElementById('btn-select-all').addEventListener('click', () => {
  document.querySelectorAll('#search-results-list .result-row').forEach(row => {
    const id = row.dataset.wordId;
    if (id) {
      state.selectedWordIds.add(id);
      row.querySelector('.result-checkbox').classList.add('checked');
    }
  });
  updateSelectCount();
});
document.getElementById('btn-add-to-folder-action').addEventListener('click', () => {
  if (state.selectedWordIds.size === 0) { showToast('Select at least one word'); return; }
  openFolderPicker('multi-add', [...state.selectedWordIds]);
});

function enterSelectMode() {
  state.selectMode = true;
  state.selectedWordIds = new Set();
  document.getElementById('search-results-list').classList.add('select-mode');
  document.getElementById('select-mode-bar').classList.remove('hidden');
  document.getElementById('btn-search-select-toggle').classList.add('hidden');
  document.getElementById('add-to-folder-bar').classList.remove('hidden');
  updateSelectCount();
}
function exitSelectMode() {
  state.selectMode = false;
  state.selectedWordIds = new Set();
  document.getElementById('search-results-list').classList.remove('select-mode');
  document.getElementById('select-mode-bar').classList.add('hidden');
  document.getElementById('btn-search-select-toggle').classList.remove('hidden');
  document.getElementById('add-to-folder-bar').classList.add('hidden');
  document.querySelectorAll('.result-checkbox').forEach(c => c.classList.remove('checked'));
  updateSelectCount();
}
function toggleResultSelection(id, row) {
  const cb = row.querySelector('.result-checkbox');
  if (state.selectedWordIds.has(id)) {
    state.selectedWordIds.delete(id);
    cb.classList.remove('checked');
  } else {
    state.selectedWordIds.add(id);
    cb.classList.add('checked');
  }
  updateSelectCount();
}
function updateSelectCount() {
  document.getElementById('select-count-label').textContent =
    `${state.selectedWordIds.size} selected`;
}

// ══════════════════════════════════════════════════════
// SCREEN 3 – WORD DETAIL
// ══════════════════════════════════════════════════════
function renderWordDetail(wordId) {
  const word = getWord(wordId);
  if (!word) {
    showErrorScreen('The word you requested could not be found. It may have been removed or the link is invalid.');
    return;
  }

  // Back label
  const backLabel = state.navSource === 'wordmap' ? 'Word Map'
    : state.navSource === 'folder' ? (getFolderById(state.currentFolderId)?.name || 'Folder')
    : 'Results';
  document.getElementById('word-detail-back-label').textContent = backLabel;

  // Hero card
  document.getElementById('hero-cree').textContent    = word.cree;
  document.getElementById('hero-english').textContent = word.english;
  document.getElementById('hero-class').textContent   = word.wordClassLabel;
  document.getElementById('hero-theme').textContent   = word.theme.charAt(0).toUpperCase() + word.theme.slice(1);

  // Bookmark state
  updateBookmarkIcons();

  // Default to Related tab
  switchWordDetailTab('related');

  // Related words
  renderRelatedWords(word);

  // Forms
  renderFormsTable(word);

  // Details
  renderDetailsTable(word);
}

function renderRelatedWords(word) {
  const list = document.getElementById('related-words-list');
  list.innerHTML = '';
  if (!word.relatedWords || word.relatedWords.length === 0) {
    list.innerHTML = '<p class="empty-sub" style="padding:16px 0">No related words available.</p>';
    return;
  }
  word.relatedWords.forEach(rel => {
    const rw = getWord(rel.id);
    if (!rw) return;
    const row = document.createElement('div');
    row.className = 'related-word-row';
    row.innerHTML = `
      <span class="rel-dot ${rel.type}"></span>
      <div class="related-content">
        <div class="related-cree">${rw.cree}</div>
        <div class="related-english">${rw.english}</div>
      </div>
      <span class="rel-type-label">${rel.type}</span>`;
    row.addEventListener('click', () => {
      // In-place update — navSource stays the same
      state.currentWordId = rw.id;
      if (state.expertMode) {
        renderExpertView(rw.id);
      } else {
        renderWordDetail(rw.id);
      }
    });
    list.appendChild(row);
  });
}

function renderFormsTable(word) {
  const el = document.getElementById('forms-table');
  if (!word.forms || word.forms.length === 0) {
    el.innerHTML = '<p class="empty-sub" style="padding:16px 0">No forms available.</p>';
    return;
  }
  const table = document.createElement('table');
  table.className = 'forms-table';
  word.forms.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${f.label}</td><td>${f.cree}</td>`;
    table.appendChild(tr);
  });
  el.innerHTML = '';
  el.appendChild(table);
}

function renderDetailsTable(word) {
  const el = document.getElementById('details-table');
  const rows = [
    { key: 'Word class',  value: word.wordClassCode },
    { key: 'Full class',  value: word.wordClassLabel },
    { key: 'Theme',       value: word.theme.charAt(0).toUpperCase() + word.theme.slice(1) },
    { key: 'Source',      value: word.morphology ? word.morphology.source : '—' },
    { key: 'Dialect',     value: 'nêhiyawêwin (Plains Cree)' },
  ];
  el.innerHTML = rows.map(r => `
    <div class="details-row">
      <span class="details-key">${r.key}</span>
      <span class="details-value">${r.value}</span>
    </div>`).join('');
}

// Tab switching
function switchWordDetailTab(tab) {
  document.querySelectorAll('#word-detail-tabs .tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('tab-related').classList.toggle('hidden', tab !== 'related');
  document.getElementById('tab-forms').classList.toggle('hidden', tab !== 'forms');
  document.getElementById('tab-details').classList.toggle('hidden', tab !== 'details');
}
document.getElementById('word-detail-tabs').addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (tab) switchWordDetailTab(tab.dataset.tab);
});

// Back from word detail
document.getElementById('btn-word-detail-back').addEventListener('click', () => {
  if (state.navSource === 'wordmap') {
    showScreen('screen-word-map');
  } else if (state.navSource === 'folder') {
    showScreen('screen-folder-open');
  } else {
    showScreen('screen-search');
  }
});

// Bookmark from word detail
// If the word is already saved, remove it from all folders; otherwise open the folder picker.
function handleBookmarkToggle() {
  const wordId = state.currentWordId;
  if (isWordSaved(wordId)) {
    showConfirmDialog(
      'Remove from Saved?',
      'This will remove the word from all folders it has been saved to.',
      'Remove',
      () => {
        state.folders.forEach(folder => {
          folder.wordIds = folder.wordIds.filter(id => id !== wordId);
        });
        state.savedWordIds.delete(wordId);
        updateBookmarkIcons();
        showToast('Removed from Saved');
      }
    );
  } else {
    openFolderPicker('bookmark', [wordId]);
  }
}

document.getElementById('btn-word-detail-bookmark').addEventListener('click', () => {
  handleBookmarkToggle();
});

// ══════════════════════════════════════════════════════
// SCREEN 4 – ACCOUNT
// ══════════════════════════════════════════════════════
document.getElementById('btn-account-back').addEventListener('click', () => {
  showScreen('screen-home');
});

document.getElementById('expert-mode-toggle').addEventListener('change', e => {
  state.expertMode = e.target.checked;
  document.getElementById('expert-mode-note').classList.toggle('hidden', !state.expertMode);
  updateExpertBadge();
  if (state.expertMode && !localStorage.getItem('expertTutorialDone')) {
    document.getElementById('expert-tutorial-backdrop').classList.remove('hidden');
  }
});
document.getElementById('btn-expert-tutorial-close').addEventListener('click', () => {
  localStorage.setItem('expertTutorialDone', '1');
  document.getElementById('expert-tutorial-backdrop').classList.add('hidden');
});

// ══════════════════════════════════════════════════════
// SCREEN 5 – WORD MAP
// ══════════════════════════════════════════════════════
function renderWordMap() {
  const wordId = state.wordMapFocusId || 'mispon';
  const { center, nodes } = getWordMapNodes(wordId);
  if (!center) return;

  const backBtn = document.getElementById('btn-word-map-back');
  const backLabel = document.getElementById('word-map-back-label');

  if (state.navSource === 'search' || state.navSource === 'wordmap') {
    backLabel.textContent = center.cree;
    backLabel.classList.remove('hidden');
    backBtn.style.visibility = 'visible';
  } else {
    backLabel.classList.add('hidden');
    backBtn.style.visibility = 'hidden';
  }

  drawWordMapSVG(center, nodes, state.wordMapFilter);
}

function drawWordMapSVG(center, nodes, filter) {
  const svg = document.getElementById('wordmap-svg');
  const W = svg.parentElement.clientWidth  || 358;
  const H = svg.parentElement.clientHeight || 380;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = '';

  const cx = W / 2;
  const cy = H / 2 - 10;

  // Filter nodes
  const visibleNodes = filter === 'all'
    ? nodes
    : nodes.filter(n => n.relType === filter);

  // Place nodes in a circle
  const radius = Math.min(W, H) * 0.32;
  const angleStep = visibleNodes.length > 0 ? (2 * Math.PI) / visibleNodes.length : 0;

  const nodePositions = visibleNodes.map((node, i) => {
    const angle = angleStep * i - Math.PI / 2;
    return {
      node,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  // Draw edges first (behind nodes)
  nodePositions.forEach(({ node, x, y }) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', x);  line.setAttribute('y2', y);
    line.classList.add('wm-edge', node.relType);
    svg.appendChild(line);

  });

  // Draw surrounding nodes
  nodePositions.forEach(({ node, x, y }) => {
    drawNode(svg, node, x, y, node.relType, false);
  });

  // Draw center node
  drawNode(svg, center, cx, cy, 'center', true);
}

function drawNode(svg, word, x, y, type, isCenter) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.classList.add('wm-node');

  const rxBase = isCenter ? 48 : 42;
  const ryBase = isCenter ? 22 : 20;

  // Measure text widths roughly
  const creeLen = word.cree.length * (isCenter ? 7.5 : 6.5);
  const engLen  = word.english.length * 5.5;
  const rx = Math.max(rxBase, Math.min(creeLen / 2 + 10, 80));
  const ry = ryBase;

  const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  ellipse.setAttribute('cx', x); ellipse.setAttribute('cy', y);
  ellipse.setAttribute('rx', rx); ellipse.setAttribute('ry', ry);
  ellipse.classList.add('wm-node-ellipse', `wm-node-${type}`);
  g.appendChild(ellipse);

  const creeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  creeText.setAttribute('x', x); creeText.setAttribute('y', y - 4);
  creeText.setAttribute('text-anchor', 'middle');
  creeText.setAttribute('font-size', isCenter ? '13' : '11');
  creeText.setAttribute('font-weight', '700');
  creeText.setAttribute('font-family', 'Epilogue, system-ui, sans-serif');
  creeText.setAttribute('fill', '#1a1c19');
  creeText.textContent = word.cree;
  g.appendChild(creeText);

  // English gloss (truncate if long)
  const engGloss = word.english.length > 22 ? word.english.slice(0, 20) + '…' : word.english;
  const engText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  engText.setAttribute('x', x); engText.setAttribute('y', y + 9);
  engText.setAttribute('text-anchor', 'middle');
  engText.setAttribute('font-size', '9');
  engText.setAttribute('font-family', 'Plus Jakarta Sans, system-ui, sans-serif');
  engText.setAttribute('fill', '#43483f');
  engText.textContent = engGloss;
  g.appendChild(engText);

  if (isCenter) {
    // Tapping the centre node goes to word detail
    g.style.cursor = 'pointer';
    g.addEventListener('click', () => {
      state.currentWordId = word.id;
      state.navSource     = 'wordmap';
      navigateToWord(word.id, 'wordmap');
    });
  } else {
    // Tapping a surrounding node re-centres the map on that word
    g.addEventListener('click', () => {
      state.wordMapFocusId = word.id;
      state.currentWordId  = word.id;
      renderWordMap();
    });
  }

  svg.appendChild(g);
}

// Filter chips
document.getElementById('wordmap-filter-chips').addEventListener('click', e => {
  const btn = e.target.closest('[data-wm-filter]');
  if (!btn) return;
  state.wordMapFilter = btn.dataset.wmFilter;
  document.querySelectorAll('#wordmap-filter-chips .chip').forEach(c =>
    c.classList.toggle('chip-active', c.dataset.wmFilter === state.wordMapFilter));
  renderWordMap();
});

// Back from word map
document.getElementById('btn-word-map-back').addEventListener('click', () => {
  if (state.navSource === 'wordmap' || state.currentWordId) {
    navigateToWord(state.currentWordId, 'search');
  } else {
    showScreen('screen-home');
  }
});

// ══════════════════════════════════════════════════════
// SCREEN 6 – EXPERT VIEW
// ══════════════════════════════════════════════════════
function renderExpertView(wordId) {
  const word = getWord(wordId);
  if (!word) return;

  const backLabel = state.navSource === 'wordmap' ? 'Word Map'
    : state.navSource === 'folder' ? (getFolderById(state.currentFolderId)?.name || 'Folder')
    : 'Results';
  document.getElementById('expert-back-label').textContent = backLabel;

  document.getElementById('expert-word-title').textContent =
    `${word.cree} – Expert view`;
  document.getElementById('expert-word-sub').textContent =
    `${word.wordClassCode} · nêhiyawêwin · itwêwina`;

  document.getElementById('expert-translation-text').textContent = word.english;

  updateBookmarkIcons();

  // Morphological Analysis
  renderMorphTags(word);
  renderMorphRows(word);

  // Semantic Relations
  renderSemRelations(word);

  // Semantic Gaps
  renderSemGaps(word);
}

function renderMorphTags(word) {
  const el = document.getElementById('morph-tags');
  if (!word.morphology) { el.innerHTML = '<span class="morph-key">—</span>'; return; }
  const m = word.morphology;

  el.innerHTML = '';

  // Stem parts (filled)
  m.stemParts.forEach(part => {
    const chip = document.createElement('span');
    chip.className = 'morph-chip filled';
    chip.textContent = part;
    el.appendChild(chip);
  });

  // Arrow
  const arrow = document.createElement('span');
  arrow.className = 'morph-arrow';
  arrow.textContent = '→';
  el.appendChild(arrow);

  // Grammar tags (outlined)
  m.grammarTags.forEach(tag => {
    const chip = document.createElement('span');
    chip.className = 'morph-chip outlined';
    chip.textContent = tag;
    el.appendChild(chip);
  });

  // Person chip on new line
  const br = document.createElement('div');
  br.style.width = '100%';
  br.style.height = '4px';
  el.appendChild(br);

  const pChip = document.createElement('span');
  pChip.className = 'morph-person-chip';
  pChip.textContent = m.person;
  el.appendChild(pChip);
}

function renderMorphRows(word) {
  const el = document.getElementById('morph-rows');
  if (!word.morphology) { el.innerHTML = ''; return; }
  const m = word.morphology;
  el.innerHTML = `
    <div class="morph-data-row"><span class="morph-key">Stem</span><span class="morph-value">${m.stem}</span></div>
    <div class="morph-data-row"><span class="morph-key">Class</span><span class="morph-value">${m.classCode}</span></div>
    <div class="morph-data-row"><span class="morph-key">Source</span><span class="morph-value">${m.source}</span></div>`;
}

function renderSemRelations(word) {
  const el = document.getElementById('sem-relations');
  if (!word.morphology) { el.innerHTML = '<p class="empty-sub" style="padding:10px 14px">—</p>'; return; }
  const w = word;

  const hypernym = w.relatedWords.find(r => r.type === 'broader');
  const opposite = w.relatedWords.find(r => r.type === 'opposite');
  const derived   = w.relatedWords.find(r => r.type === 'derived');

  const rows = [
    { key: 'hasHypernym',   value: hypernym ? getWord(hypernym.id)?.cree || hypernym.id : '—' },
    { key: 'isOppositeOf',  value: opposite ? getWord(opposite.id)?.cree || opposite.id : '—' },
    { key: 'hasDerivedNoun',value: derived   ? getWord(derived.id)?.cree  || derived.id  : '—' },
    { key: 'inDomain',      value: w.theme.charAt(0).toUpperCase() + w.theme.slice(1) + ', Nature' },
  ];
  el.innerHTML = rows.map(r => `
    <div class="sem-rel-row">
      <span class="sem-rel-key">${r.key}</span>
      <span class="sem-rel-value">${r.value}</span>
    </div>`).join('');
}

function renderSemGaps(word) {
  const el    = document.getElementById('sem-gaps');
  const empty = document.getElementById('sem-gaps-empty');
  if (!word.semanticGaps || word.semanticGaps.length === 0) {
    el.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  el.innerHTML = word.semanticGaps.map(g => `
    <div class="gap-row">
      <div class="gap-text">
        <div class="gap-concept">${g.concept}</div>
        <div class="gap-context">${g.context}</div>
      </div>
      <span class="gap-badge ${g.badge}">${g.badge === 'missing' ? 'Missing' : 'Undocumented'}</span>
    </div>`).join('');
}

document.getElementById('btn-expert-back').addEventListener('click', () => {
  if (state.navSource === 'wordmap') {
    showScreen('screen-word-map');
  } else if (state.navSource === 'folder') {
    showScreen('screen-folder-open');
  } else {
    showScreen('screen-search');
  }
});

document.getElementById('btn-expert-bookmark').addEventListener('click', () => {
  handleBookmarkToggle();
});

// ══════════════════════════════════════════════════════
// SCREEN 7 – SAVED – FOLDER LIST
// ══════════════════════════════════════════════════════
function renderSavedFolderList() {
  const container = document.getElementById('saved-folders-container');
  const emptyEl   = document.getElementById('saved-empty-state');
  container.innerHTML = '';

  let folders = state.folders;
  const sf = state.savedFilter;
  if (sf === 'recent') folders = [...folders].reverse().slice(0, 3);
  // "shared" — all for prototype

  if (folders.length === 0) {
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  folders.forEach(folder => {
    const card = document.createElement('div');
    card.className = 'folder-card';

    const words = folder.wordIds.map(id => getWord(id)).filter(Boolean);
    const preview = words.slice(0, 4).map(w =>
      `<span class="preview-bubble">${w.cree}</span>`).join('');
    const moreCount = words.length > 4 ? `<span class="preview-bubble">+${words.length - 4} more</span>` : '';

    const statusLabel = folder.status === 'lesson-ready' ? 'Lesson ready' : 'In Progress';
    const statusClass = folder.status === 'lesson-ready' ? 'lesson-ready' : 'in-progress';

    card.innerHTML = `
      <div class="folder-card-top">
        <div class="folder-icon-tile" style="background:${folder.color}22; color:${folder.color}">
          ${folder.icon}
        </div>
        <div class="folder-info">
          <div class="folder-name">${folder.name}</div>
          <div class="folder-meta">${words.length} words</div>
        </div>
        <span class="folder-status ${statusClass}">${statusLabel}</span>
      </div>
      <div class="folder-preview-bubbles">${preview}${moreCount}</div>
      <div class="folder-card-actions">
        <button class="btn-edit" data-folder-id="${folder.id}">Edit</button>
        <button class="btn-folder-export" data-folder-id="${folder.id}">
          <svg style="width:15px;height:15px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
      </div>`;

    // Tap card body to open folder
    card.querySelector('.folder-card-top').addEventListener('click', () => {
      openFolder(folder.id);
    });
    card.querySelector('.folder-preview-bubbles').addEventListener('click', () => {
      openFolder(folder.id);
    });

    card.querySelector('.btn-edit').addEventListener('click', e => {
      e.stopPropagation();
      openFolderActionsSheet(folder.id);
    });

    card.querySelector('.btn-folder-export').addEventListener('click', e => {
      e.stopPropagation();
      openExportScreen(folder.id, 'saved');
    });

    container.appendChild(card);
  });
}

// Filter chips
document.getElementById('saved-filter-chips').addEventListener('click', e => {
  const btn = e.target.closest('[data-saved-filter]');
  if (!btn) return;
  state.savedFilter = btn.dataset.savedFilter;
  document.querySelectorAll('#saved-filter-chips .chip').forEach(c =>
    c.classList.toggle('chip-active', c.dataset.savedFilter === state.savedFilter));
  renderSavedFolderList();
});

// New folder button
document.getElementById('btn-new-folder-card').addEventListener('click', () => {
  showNewFolderDialog(() => { renderSavedFolderList(); });
});

// ══════════════════════════════════════════════════════
// SCREEN 8 – SAVED – FOLDER OPEN
// ══════════════════════════════════════════════════════
function openFolder(folderId) {
  state.currentFolderId = folderId;
  state.folderFilter = 'all';
  if (state.folderSelectMode) exitFolderSelectMode();
  renderFolderOpen();
  showScreen('screen-folder-open');
}

function renderFolderOpen() {
  const folder = getFolderById(state.currentFolderId);
  if (!folder) return;

  document.getElementById('folder-open-title').textContent  = folder.name;
  document.getElementById('folder-summary-name').textContent = folder.name;
  document.getElementById('folder-summary-meta').textContent =
    `${folder.wordIds.length} words · Plains Cree`;

  // Reset filter chips
  document.querySelectorAll('#folder-filter-chips .chip').forEach(c =>
    c.classList.toggle('chip-active', c.dataset.folderFilter === 'all'));
  state.folderFilter = 'all';

  renderFolderWordList(folder);
}

function renderFolderWordList(folder) {
  const list    = document.getElementById('folder-words-list');
  const emptyEl = document.getElementById('folder-empty-state');
  const countEl = document.getElementById('folder-word-count-label');
  list.innerHTML = '';

  let words = folder.wordIds.map(id => getWord(id)).filter(Boolean);
  words = filterByClass(words, state.folderFilter);

  if (words.length === 0) {
    emptyEl.classList.remove('hidden');
    countEl.textContent = '';
    return;
  }
  emptyEl.classList.add('hidden');
  countEl.textContent = `${words.length} word${words.length !== 1 ? 's' : ''}`;

  words.forEach(word => {
    const row = document.createElement('div');
    row.className = 'word-row';
    row.dataset.wordId = word.id;

    row.innerHTML = `
      <div class="word-checkbox select-mode-hidden"></div>
      <div class="word-row-content">
        <div class="word-row-cree">${word.cree}</div>
        <div class="word-row-english">${word.english}</div>
        <div class="word-row-code">${word.theme.charAt(0).toUpperCase() + word.theme.slice(1)} · ${word.wordClassCode}</div>
      </div>
      <svg class="icon word-row-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>`;

    row.addEventListener('click', () => {
      if (state.folderSelectMode) {
        toggleFolderWordSelection(word.id, row);
        return;
      }
      navigateToWord(word.id, 'folder');
    });

    list.appendChild(row);
  });
}

// ── Folder select mode ────────────────────────────────
function enterFolderSelectMode() {
  state.folderSelectMode = true;
  state.folderSelectedWordIds = new Set();
  document.getElementById('folder-words-list').classList.add('folder-select-mode');
  document.getElementById('folder-select-mode-bar').classList.remove('hidden');
  document.getElementById('btn-folder-select-toggle').classList.add('hidden');
  document.getElementById('folder-remove-bar').classList.remove('hidden');
  document.getElementById('btn-add-word-to-folder').classList.add('hidden');
  updateFolderSelectCount();
}
function exitFolderSelectMode() {
  state.folderSelectMode = false;
  state.folderSelectedWordIds = new Set();
  document.getElementById('folder-words-list').classList.remove('folder-select-mode');
  document.getElementById('folder-select-mode-bar').classList.add('hidden');
  document.getElementById('btn-folder-select-toggle').classList.remove('hidden');
  document.getElementById('folder-remove-bar').classList.add('hidden');
  document.getElementById('btn-add-word-to-folder').classList.remove('hidden');
  document.querySelectorAll('#folder-words-list .word-checkbox').forEach(c => c.classList.remove('checked'));
  updateFolderSelectCount();
}
function toggleFolderWordSelection(id, row) {
  const cb = row.querySelector('.word-checkbox');
  if (state.folderSelectedWordIds.has(id)) {
    state.folderSelectedWordIds.delete(id);
    cb.classList.remove('checked');
  } else {
    state.folderSelectedWordIds.add(id);
    cb.classList.add('checked');
  }
  updateFolderSelectCount();
}
function updateFolderSelectCount() {
  document.getElementById('folder-select-count-label').textContent =
    `${state.folderSelectedWordIds.size} selected`;
}

document.getElementById('btn-folder-select-toggle').addEventListener('click', () => {
  enterFolderSelectMode();
});
document.getElementById('btn-folder-cancel-select').addEventListener('click', () => {
  exitFolderSelectMode();
});
document.getElementById('btn-folder-select-all').addEventListener('click', () => {
  document.querySelectorAll('#folder-words-list .word-row').forEach(row => {
    const id = row.dataset.wordId;
    if (id) {
      state.folderSelectedWordIds.add(id);
      row.querySelector('.word-checkbox').classList.add('checked');
    }
  });
  updateFolderSelectCount();
});
document.getElementById('btn-remove-from-folder-action').addEventListener('click', () => {
  if (state.folderSelectedWordIds.size === 0) { showToast('Select at least one word'); return; }
  const count = state.folderSelectedWordIds.size;
  showConfirmDialog(
    `Remove ${count} word${count !== 1 ? 's' : ''}?`,
    `This will remove the selected word${count !== 1 ? 's' : ''} from this folder.`,
    'Remove',
    () => {
      state.folderSelectedWordIds.forEach(wid => removeWordFromFolder(state.currentFolderId, wid));
      exitFolderSelectMode();
      renderFolderOpen();
      showToast(`${count} word${count !== 1 ? 's' : ''} removed`);
    }
  );
});

// Folder filter chips
document.getElementById('folder-filter-chips').addEventListener('click', e => {
  const btn = e.target.closest('[data-folder-filter]');
  if (!btn) return;
  state.folderFilter = btn.dataset.folderFilter;
  document.querySelectorAll('#folder-filter-chips .chip').forEach(c =>
    c.classList.toggle('chip-active', c.dataset.folderFilter === state.folderFilter));
  const folder = getFolderById(state.currentFolderId);
  if (folder) renderFolderWordList(folder);
});

// Back from folder
document.getElementById('btn-folder-back').addEventListener('click', () => {
  renderSavedFolderList();
  showScreen('screen-saved');
});

// Export from folder summary
document.getElementById('btn-folder-export').addEventListener('click', () => {
  openExportScreen(state.currentFolderId, 'folder-open');
});

// Folder actions sheet (opened from Edit button on saved screen)
let folderActionsTargetId = null;

function openFolderActionsSheet(folderId) {
  folderActionsTargetId = folderId;
  const folder = getFolderById(folderId);
  if (!folder) return;
  document.getElementById('folder-actions-sheet-title').textContent = folder.name;
  openSheet('folder-actions-sheet');
}

document.getElementById('btn-sheet-rename-folder').addEventListener('click', () => {
  closeSheet('folder-actions-sheet');
  const folder = getFolderById(folderActionsTargetId);
  if (!folder) return;
  showRenameDialog(folder.name, newName => {
    folder.name = newName;
    renderSavedFolderList();
    showToast('Folder renamed');
  });
});

document.getElementById('btn-sheet-delete-folder').addEventListener('click', () => {
  closeSheet('folder-actions-sheet');
  const folder = getFolderById(folderActionsTargetId);
  if (!folder) return;
  showConfirmDialog(
    `Delete "${folder.name}"?`,
    'This will remove the folder and all its words from Saved. This cannot be undone.',
    'Delete',
    () => {
      folder.wordIds.forEach(wid => {
        const stillSaved = state.folders.some(f => f.id !== folder.id && f.wordIds.includes(wid));
        if (!stillSaved) state.savedWordIds.delete(wid);
      });
      state.folders = state.folders.filter(f => f.id !== folderActionsTargetId);
      renderSavedFolderList();
      showToast('Folder deleted');
    }
  );
});

// Add word to folder inline search sheet
document.getElementById('btn-add-word-to-folder').addEventListener('click', () => {
  document.getElementById('add-word-search-input').value = '';
  document.getElementById('add-word-results').innerHTML = '';
  openSheet('add-word-sheet');
  setTimeout(() => document.getElementById('add-word-search-input').focus(), 100);
});

document.getElementById('btn-add-word-cancel').addEventListener('click', () => {
  closeSheet('add-word-sheet');
});

document.getElementById('add-word-search-input').addEventListener('input', e => {
  const q = e.target.value.trim();
  const results = document.getElementById('add-word-results');
  results.innerHTML = '';
  if (!q) return;
  const words = searchWords(q).slice(0, 12);
  words.forEach(word => {
    const row = document.createElement('div');
    row.className = 'folder-picker-row';
    row.innerHTML = `
      <div>
        <div class="fp-name">${word.cree}</div>
        <div class="fp-count">${word.english}</div>
      </div>
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#4A6741" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>`;
    row.addEventListener('click', () => {
      const folder = getFolderById(state.currentFolderId);
      if (!folder) return;
      if (folder.wordIds.includes(word.id)) {
        showToast(`"${word.cree}" is already in this folder`);
        return;
      }
      addWordToFolder(folder.id, word.id);
      renderFolderOpen();
      closeSheet('add-word-sheet');
      showToast(`"${word.cree}" added to "${folder.name}"`);
    });
    results.appendChild(row);
  });
});

// ══════════════════════════════════════════════════════
// SCREEN 9 – EXPORT
// ══════════════════════════════════════════════════════
const EXPORT_OPTIONS = [
  { icon: '📄', color: '#fff0c2', title: 'PDF Word List',    sub: 'Printable, formatted for classroom',  action: 'PDF' },
  { icon: '📊', color: '#d4e8c4', title: 'CSV / Spreadsheet',sub: 'Cree, English, word class cols.',      action: 'CSV' },
  { icon: '🔗', color: '#cce9f5', title: 'Share Link',       sub: 'Anyone with the link can view',       action: 'Link' },
  { icon: '🃏', color: '#e8d5f5', title: 'Flashcard Set',    sub: 'Anki-compatible deck (.apkg)',         action: 'Anki' },
  { icon: '👤', color: '#ffe0b2', title: 'Send to Student',  sub: 'Share directly via app or email',     action: 'Send' },
];

const EXPORT_TOASTS = {
  PDF:  'PDF downloaded!',
  CSV:  'CSV downloaded!',
  Link: 'Link copied!',
  Anki: 'Deck exported!',
  Send: 'Sent to student!',
};

function openExportScreen(folderId, source) {
  state.exportFolderId = folderId;
  state.exportSource   = source || 'folder-open';
  const folder = getFolderById(folderId);
  if (!folder) return;

  document.getElementById('export-back-label').textContent  = folder.name;
  document.getElementById('export-folder-name').textContent = `Export "${folder.name}"`;
  document.getElementById('export-meta').textContent        =
    `${folder.wordIds.length} words · Choose format`;

  const list = document.getElementById('export-options-list');
  list.innerHTML = '';
  EXPORT_OPTIONS.forEach(opt => {
    const row = document.createElement('div');
    row.className = 'export-option-row';
    row.innerHTML = `
      <div class="export-icon-wrap" style="background:${opt.color}">${opt.icon}</div>
      <div class="export-option-text">
        <div class="export-option-title">${opt.title}</div>
        <div class="export-option-sub">${opt.sub}</div>
      </div>
      <svg class="icon export-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>`;
    row.addEventListener('click', () => {
      showConfirmDialog(
        `Export as ${opt.title}?`,
        `This will export "${folder.name}" (${folder.wordIds.length} words) as ${opt.sub.toLowerCase()}.`,
        'Export',
        () => showToast(EXPORT_TOASTS[opt.action])
      );
    });
    list.appendChild(row);
  });

  showScreen('screen-export');
}

document.getElementById('btn-export-back').addEventListener('click', () => {
  if (state.exportSource === 'saved') {
    renderSavedFolderList();
    showScreen('screen-saved');
  } else {
    showScreen('screen-folder-open');
  }
});

// ══════════════════════════════════════════════════════
// BOTTOM NAV
// ══════════════════════════════════════════════════════
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const nav = tab.dataset.nav;
    if (nav === 'home') {
      showScreen('screen-home');
    } else if (nav === 'search') {
      // Show idle state if the search bar is empty
      if (!document.getElementById('search-query-input').value.trim()) {
        document.getElementById('search-idle-state').classList.remove('hidden');
        document.getElementById('search-empty-state').classList.add('hidden');
        document.getElementById('search-results-list').innerHTML = '';
        document.getElementById('results-count').textContent = '';
      }
      showScreen('screen-search');
    } else if (nav === 'wordmap') {
      state.navSource = null; // cold launch or retain focus word
      renderWordMap();
      showScreen('screen-word-map');
    } else if (nav === 'saved') {
      renderSavedFolderList();
      showScreen('screen-saved');
    }
  });
});

// ══════════════════════════════════════════════════════
// HELP DIALOG
// ══════════════════════════════════════════════════════
function showHelpDialog(title, bodyHtml) {
  document.getElementById('help-dialog-title').textContent = title;
  document.getElementById('help-dialog-body').innerHTML = bodyHtml;
  document.getElementById('help-dialog-backdrop').classList.remove('hidden');
}
document.getElementById('btn-help-dialog-close').addEventListener('click', () => {
  document.getElementById('help-dialog-backdrop').classList.add('hidden');
});

// Expert View help
document.getElementById('btn-help-expert').addEventListener('click', () => {
  showHelpDialog('Expert View', `
    <div class="help-dialog-body">
      <p>This screen shows full linguistic data for the selected word, split into three sections:</p>
      <ul>
        <li><strong>Morphological Analysis</strong> — breaks the word into its stem and grammatical tags, showing how the form is built.</li>
        <li><strong>Semantic Relations</strong> — lists formal relationships like hypernym (broader concept), opposite, and derived forms.</li>
        <li><strong>Semantic Gap Analysis</strong> — highlights related concepts that may be missing or undocumented in the itwêwina database.</li>
      </ul>
    </div>`);
});

// Export help
document.getElementById('btn-help-export').addEventListener('click', () => {
  showHelpDialog('Export Formats', `
    <div class="help-dialog-body">
      <ul>
        <li><strong>PDF Word List</strong> — a printable document formatted for classroom use.</li>
        <li><strong>CSV / Spreadsheet</strong> — a plain data file with Cree, English, and word class columns. Opens in Excel or Google Sheets.</li>
        <li><strong>Share Link</strong> — generates a web link that anyone can open to view the word list.</li>
        <li><strong>Flashcard Set (.apkg)</strong> — exports a deck for <strong>Anki</strong>, a free flashcard app used for spaced-repetition study. Download Anki at ankiweb.net.</li>
        <li><strong>Send to Student</strong> — shares the word list directly to a student via the app or email.</li>
      </ul>
    </div>`);
});

// Word Map help
document.getElementById('btn-help-wordmap').addEventListener('click', () => {
  showHelpDialog('How to Read the Word Map', `
    <div class="help-dialog-body">
      <p>The Word Map shows how the central word connects to other words. Each node is a word; lines show the relationship type:</p>
      <ul>
        <li><strong>Similar</strong> — words with a closely related meaning.</li>
        <li><strong>Broader</strong> — a more general concept (e.g. "weather" for "snow").</li>
        <li><strong>Derived / Narrower</strong> — a more specific word derived from this one.</li>
        <li><strong>Opposite</strong> — a word with an opposing meaning.</li>
      </ul>
      <p>Tap any node to explore that word. Use the filter chips at the top to show only one relationship type at a time.</p>
    </div>`);
});

// ══════════════════════════════════════════════════════
// ONBOARDING
// ══════════════════════════════════════════════════════
const ONBOARDING_STEPS = [
  {
    icon: '🔍',
    title: 'Search Cree or English',
    desc: 'Type any Cree or English word into the search bar to find its meaning, word class, and related forms.',
  },
  {
    icon: '🌿',
    title: 'Browse by Theme',
    desc: 'Not sure where to start? Explore vocabulary grouped by topic — Weather, Animals, Family, and more.',
  },
  {
    icon: '📁',
    title: 'Save Words to Folders',
    desc: 'Tap the bookmark icon on any word to save it to a folder. Great for building lesson sets or study lists.',
  },
  {
    icon: '🗺️',
    title: 'Explore the Word Map',
    desc: 'See how words connect — similar meanings, opposites, broader concepts, and derived forms — all at a glance.',
  },
];

let onboardingStep = 0;

function showOnboarding() {
  onboardingStep = 0;
  renderOnboardingStep();
  document.getElementById('onboarding-overlay').classList.remove('hidden');
}

function renderOnboardingStep() {
  const step = ONBOARDING_STEPS[onboardingStep];
  const total = ONBOARDING_STEPS.length;
  document.getElementById('onboarding-step-indicator').textContent = `${onboardingStep + 1} of ${total}`;
  document.getElementById('onboarding-icon').textContent  = step.icon;
  document.getElementById('onboarding-title').textContent = step.title;
  document.getElementById('onboarding-desc').textContent  = step.desc;

  // Dots
  const dots = document.getElementById('onboarding-dots');
  dots.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'onboarding-dot' + (i === onboardingStep ? ' active' : '');
    dots.appendChild(dot);
  }

  // Next button label
  const nextBtn = document.getElementById('btn-onboarding-next');
  nextBtn.textContent = onboardingStep === total - 1 ? 'Get Started' : 'Next';
}

function finishOnboarding() {
  localStorage.setItem('onboardingDone', '1');
  document.getElementById('onboarding-overlay').classList.add('hidden');
}

document.getElementById('btn-onboarding-next').addEventListener('click', () => {
  if (onboardingStep < ONBOARDING_STEPS.length - 1) {
    onboardingStep++;
    renderOnboardingStep();
  } else {
    finishOnboarding();
  }
});
document.getElementById('btn-onboarding-skip').addEventListener('click', finishOnboarding);

// ══════════════════════════════════════════════════════
// ERROR SCREEN
// ══════════════════════════════════════════════════════
function showErrorScreen(message) {
  document.getElementById('error-desc').textContent =
    message || 'An unexpected error occurred. Please go back to the home screen and try again.';
  showScreen('screen-error');
}

document.getElementById('btn-error-go-home').addEventListener('click', () => {
  showScreen('screen-home');
});
document.getElementById('btn-error-back').addEventListener('click', () => {
  showScreen('screen-home');
});

// ══════════════════════════════════════════════════════
// INITIALISE
// ══════════════════════════════════════════════════════
function init() {
  renderHome();
  showScreen('screen-home');
  if (!localStorage.getItem('onboardingDone')) {
    showOnboarding();
  }
}

init();
