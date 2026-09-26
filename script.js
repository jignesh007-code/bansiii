/**
 * BHONDU — Website Script
 * Paginated Single-Page Journey (Concept inspired by for-you)
 * Clean Vanilla JavaScript
 */

let currentPage = 0;

const PAGE_INFO = [
  { num: "00 / 14", title: "COVER" },
  { num: "01 / 14", title: "A NOTE BEFORE YOU START" },
  { num: "02 / 14", title: "THE LITTLE THINGS" },
  { num: "03 / 14", title: "YOU BECAME HOME" },
  { num: "04 / 14", title: "I WASN'T PERFECT" },
  { num: "05 / 14", title: "WHAT ACTUALLY HURT" },
  { num: "06 / 14", title: "THE THINGS I NEVER WANTED" },
  { num: "07 / 14", title: "VOICE NOTES" },
  { num: "08 / 14", title: "WHAT WE IMAGINED" },
  { num: "09 / 14", title: "THE LAST PAGE" },
  { num: "10 / 14", title: "A QUIET QUESTION" },
  { num: "11 / 14", title: "A QUIET QUESTION" },
  { num: "12 / 14", title: "A TINY BLOOM" },
  { num: "13 / 14", title: "TWILIGHT CONFESSION" },
  { num: "14 / 14", title: "BEFORE YOU GO…" }
];

const userJourneyAnswers = {
  q1: 'The late-night calls & laughter 🌙',
  q2: 'Home.',
  q3: "I'm trying, even when I mess up.",
  q4: 'The goofy, chaotic us at 2 AM.',
  q5: 'The promise to always find our way back.',
  final: 'I still have love for you 🌻'
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initArchive();
  initVoiceNotes();
  initAmbientAudio();
  initModals();
  setupWateringGame();
  initQuestionArchive();

  // Setup current date on receipt
  const receiptDateEl = document.getElementById('receipt-date');
  if (receiptDateEl) {
    const today = new Date();
    receiptDateEl.textContent = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
  }
});

/* ==========================================================================
   1. Page Navigation System (Smooth Filmic Fade-In Transitions & Petal Breeze)
   ========================================================================== */
let isTransitioning = false;

function goToPage(pageNumber) {
  if (isTransitioning) return;
  const currentEl = document.querySelector('.page.active');
  const nextEl = document.getElementById(`page-${pageNumber}`);

  if (!nextEl || currentEl === nextEl) return;

  // Close TOC drawer if open
  closeDrawer();
  isTransitioning = true;

  // Stop any active voice note audio playback
  if (typeof stopVoiceNotePlayback === 'function') {
    stopVoiceNotePlayback();
  }

  // Flutter gentle flower petals on each page turn for romantic atmosphere
  createPetals(6);

  if (currentEl) {
    currentEl.classList.remove('page-fade-in');
    currentEl.classList.add('page-fade-out');
    setTimeout(() => {
      currentEl.classList.remove('active', 'page-fade-out');
      activatePage(pageNumber, nextEl);
      setTimeout(() => {
        isTransitioning = false;
      }, 450);
    }, 200);
  } else {
    activatePage(pageNumber, nextEl);
    setTimeout(() => {
      isTransitioning = false;
    }, 450);
  }
}

function activatePage(pageNumber, el) {
  currentPage = pageNumber;
  el.classList.add('active', 'page-fade-in');
  setTimeout(() => {
    el.classList.remove('page-fade-in');
  }, 480);

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Update Tracker
  const info = PAGE_INFO[pageNumber] || { num: `${pageNumber < 10 ? '0' + pageNumber : pageNumber} / 14`, title: '' };
  const trackerNum = document.getElementById('current-chapter-num');
  const trackerTitle = document.getElementById('current-chapter-title');
  const prevBtn = document.getElementById('prev-page-btn');
  const progressBar = document.getElementById('header-progress-bar');

  if (trackerNum) trackerNum.textContent = info.num;
  if (trackerTitle) trackerTitle.textContent = info.title;

  // Update Progress Bar
  if (progressBar) {
    const pct = Math.min(100, Math.round((pageNumber / 14) * 100));
    progressBar.style.width = `${pct}%`;
  }

  // Hide Previous Button across whole site as requested
  if (prevBtn) {
    prevBtn.style.display = 'none';
  }

  // Sunset Dark Mode for Lego page (5), Blueprint page (6), and Twilight page (13)
  if (pageNumber === 5 || pageNumber === 6 || pageNumber === 13) {
    document.body.classList.add('sunset-mode');
  } else {
    document.body.classList.remove('sunset-mode');
  }

  // Display footer only on the final page (14)
  if (pageNumber === 14) {
    document.body.classList.add('page-14-active');
  } else {
    document.body.classList.remove('page-14-active');
  }

  // Page 08: Draw Dream Constellation SVG Connectors
  if (pageNumber === 8) {
    setTimeout(drawDreamMapLines, 150);
  }

  // Page 10: Render / sync dynamic Question Archive
  if (pageNumber === 10) {
    if (typeof renderQuestion === 'function') {
      renderQuestion(currentQuestionIndex);
    }
    if (trackerTitle && typeof questions !== 'undefined' && questions[currentQuestionIndex]) {
      trackerTitle.textContent = questions[currentQuestionIndex].title;
    }
  }

  // Ambient Track Switching:
  // Pages 0 to 8: audio/music.mp3
  // Pages 9 to 14: audio/janisar.mp3
  if (typeof updateAmbientTrackForPage === 'function') {
    updateAmbientTrackForPage(pageNumber);
  }
}

function goPrevPage() {
  if (currentPage > 0) {
    goToPage(currentPage - 1);
  }
}

function toggleBlueprintStamp(el) {
  const stamp = el || document.getElementById('blueprint-stamp');
  if (stamp) {
    stamp.classList.toggle('stamp-toggled');
  }
}

function openArchiveCover() {
  createPetals(18);
  playAmbientAudio(); // Start ambient audio immediately when user enters
  setTimeout(() => {
    goToPage(1);
  }, 420);
}

/* Page 05: Expandable Archive Records */
function toggleHurtEntry(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const isExpanded = row.classList.contains('expanded');
  row.classList.toggle('expanded');
  const toggleBtn = row.querySelector('.stayed-toggle-symbol');
  const headerBtn = row.querySelector('.stayed-row-header');
  if (toggleBtn) {
    toggleBtn.textContent = isExpanded ? '+' : '−';
  }
  if (headerBtn) {
    headerBtn.setAttribute('aria-expanded', !isExpanded);
  }
}

/* Page 06: Blueprint Interactive Stamp Toggle */
function toggleBlueprintStamp() {
  const stamp = document.getElementById('blueprint-stamp');
  if (!stamp) return;
  const isAlt = stamp.classList.toggle('stamp-transformed');
  const textEl = stamp.querySelector('.stamp-text');
  if (textEl) {
    textEl.textContent = isAlt ? 'IT CAN BE DIFFERENT' : 'IT IS WHAT IT IS';
  }
  const altNote = document.getElementById('stamp-alt-note');
  if (altNote) {
    altNote.classList.toggle('visible', isAlt);
  }
}

/* ==========================================================================
   2. Petal Animation (Tulips & Sunflowers)
   ========================================================================== */
function createPetals(count = 15) {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const symbols = ['🌷', '🌻', '🌸'];

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 95}vw`;
    petal.style.fontSize = `${Math.random() * 1 + 1}rem`;
    petal.style.animationDuration = `${Math.random() * 2.5 + 3.5}s`;
    petal.style.animationDelay = `${Math.random() * 0.4}s`;
    container.appendChild(petal);

    setTimeout(() => {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, 6000);
  }
}

/* ==========================================================================
   3. Navigation Bar & TOC Drawer
   ========================================================================== */
function initNavigation() {
  const tocToggle = document.getElementById('toc-toggle');
  const tocClose = document.getElementById('toc-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  if (tocToggle) tocToggle.addEventListener('click', openDrawer);
  if (tocClose) tocClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
}

function openDrawer() {
  const tocDrawer = document.getElementById('toc-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  if (tocDrawer) tocDrawer.classList.add('open');
  if (drawerBackdrop) drawerBackdrop.classList.add('active');
}

function closeDrawer() {
  const tocDrawer = document.getElementById('toc-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  if (tocDrawer) tocDrawer.classList.remove('open');
  if (drawerBackdrop) drawerBackdrop.classList.remove('active');
}

/* ==========================================================================
   4. Dynamic Archive System & Filtering
   ========================================================================== */
const ARCHIVE_ITEMS = [
  {
    id: 1,
    category: 'photos',
    title: 'A Stolen Smile',
    date: '[DATE]',
    image: 'images/archive/photo-01.webp',
    text: 'You turned around and looked at me before crossing the street. That exact split second.',
    rotation: -1.4
  },
  {
    id: 2,
    category: 'letters',
    title: 'The Folded Page',
    date: '[DATE]',
    image: '',
    text: 'A handwritten letter tucked away between the pages of an old notebook.',
    letterContent: `Dear Bhondu,\n\nI am keeping this note right here so you can always find it when things feel too heavy.\n\nYou have an uncommon gentleness about you, and the world is not always gentle in return. But I want you to remember that who you are is more than enough.\n\nTake care of your heart,\nJ`,
    rotation: 1.2
  },
  {
    id: 3,
    category: 'days',
    title: 'The Rain Walk',
    date: '[DATE]',
    image: '',
    text: 'We got completely drenched because neither of us wanted to stop walking or go back inside.',
    rotation: -0.8
  },
  {
    id: 4,
    category: 'little-things',
    title: 'Tea & Quiet Hours',
    date: '[DATE]',
    image: '',
    text: 'Sitting quietly with tea cups while the street outside woke up.',
    rotation: 1.5
  },
  {
    id: 5,
    category: 'photos',
    title: 'The Evening Sky',
    date: '[DATE]',
    image: 'images/archive/photo-02.webp',
    text: 'Watching the sunset tint the clouds dusky pink. You said it reminded you of calm.',
    rotation: -1.1
  },
  {
    id: 6,
    category: 'letters',
    title: 'Night Note 03',
    date: '[DATE]',
    image: '',
    text: 'A note written late at night when words flowed without second guessing.',
    letterContent: `Bhondu,\n\nSometimes I look back at how we started and I can't help but smile at how unexpected everything was.\n\nThank you for every laughter and every conversation we shared.\n\nAlways,\nJ`,
    rotation: 0.9
  }
];

function initArchive() {
  const grid = document.getElementById('archive-grid');
  const emptyState = document.getElementById('archive-empty-state');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid) return;

  function renderCards(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all'
      ? ARCHIVE_ITEMS
      : ARCHIVE_ITEMS.filter(item => item.category === filter);

    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    } else {
      if (emptyState) emptyState.classList.add('hidden');
    }

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'archive-card';
      card.style.setProperty('--rotation', `${item.rotation || 0}deg`);

      let mediaHtml = '';
      if (item.image) {
        mediaHtml = `
          <div class="archive-card-img">
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'><span class=\\'placeholder-label\\'>[IMAGE: ${item.image}]</span></div>';">
          </div>
        `;
      } else {
        mediaHtml = `
          <div class="archive-card-img">
            <div class="photo-placeholder warm">
              <span class="placeholder-label">[${item.category.toUpperCase()} ENTRY #${item.id}]</span>
              <span class="placeholder-hint">Add media or read text below</span>
            </div>
          </div>
        `;
      }

      let actionHtml = '';
      if (item.category === 'letters') {
        actionHtml = `<button class="archive-card-cta read-letter-btn" data-id="${item.id}">Read Letter →</button>`;
      }

      const cornerHeartHtml = (item.category === 'photos')
        ? `<div class="polaroid-corner-heart" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>`
        : '';

      card.innerHTML = `
        ${cornerHeartHtml}
        <div class="archive-card-meta">
          <span class="archive-category-badge">${item.category}</span>
          <span class="mono-meta">${item.date}</span>
        </div>
        ${mediaHtml}
        <h3 class="archive-card-title">${item.title}</h3>
        <p class="archive-card-desc">${item.text}</p>
        ${actionHtml}
      `;

      grid.appendChild(card);
    });

    const readBtns = grid.querySelectorAll('.read-letter-btn');
    readBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const letter = ARCHIVE_ITEMS.find(i => i.id === id);
        if (letter) openLetterModal(letter);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const cat = btn.getAttribute('data-filter');
      renderCards(cat);
    });
  });

  renderCards('all');
}

/* ==========================================================================
   5. Page 07 — Voice Notes System (Dynamic 14-Day Journal Archive)
   ========================================================================== */
const JOURNAL_START_DATE = "2026-09-22";
const TOTAL_DAYS = 14;

function getCalculatedJournalDay() {
  const start = new Date(JOURNAL_START_DATE + "T00:00:00");
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(TOTAL_DAYS, Math.max(1, diffDays));
}
const CURRENT_JOURNAL_DAY = getCalculatedJournalDay();

/**
 * 14-Day Voice Journal Data Store
 * Key: Day Number (1 - 14)
 * Value: { date, audio, duration, description }
 *
 * Daily workflow:
 * 1. Place recording in assets/voice/day-XX.mp3
 * 2. Add entry below:
 *    5: { date: "2026-09-26", audio: "assets/voice/day-05.mp3", duration: "04:00", description: "" }
 * 3. Save & push. No HTML edits required.
 */
const voiceNotes = {
  1: {
    date: "2026-09-22",
    audio: "assets/voice/day-01.mp3",
    duration: "01:15",
    description: "It's really hard, I don't know..."
  },
  2: {
    date: "2026-09-23",
    audio: "assets/voice/day-02.mp3",
    duration: "01:36",
    description: "I still miss you so much."
  },
  3: {
    date: "2026-09-24",
    audio: "assets/voice/day-03.mp3",
    duration: "02:03",
    description: "Super tired. Didn't sleep."
  },
  4: {
    date: "2026-09-25",
    audio: "assets/voice/day-04.mp3",
    duration: "01:22",
    description: "Making something special for you is finally done."
  }
};

const UNRECORDED_MESSAGES = [
  "Tomorrow hasn't happened yet.",
  "This space is still waiting for its day.",
  "Not recorded yet.",
  "I'll know what to say when I get there.",
  "Still unwritten.",
  "This day hasn't happened yet."
];

let currentVnAudio = null;
let currentVnPlayingDay = null;
let selectedVnDay = 4;
let unrecordedPopoverTimeout = null;

function getDayDate(dayIndex) {
  const start = new Date(JOURNAL_START_DATE);
  start.setDate(start.getDate() + (dayIndex - 1));
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const fullMonths = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const mShort = months[start.getMonth()];
  const mFull = fullMonths[start.getMonth()];
  const d = start.getDate();
  const y = start.getFullYear();
  return {
    short: `${mShort} ${d < 10 ? '0' + d : d}`,
    long: `${mFull} ${d < 10 ? '0' + d : d}, ${y}`
  };
}

function formatVnDateLong(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    return `${months[monthIndex]} ${day < 10 ? '0' + day : day}, ${year}`;
  }
  return dateStr;
}

function formatVnTime(secs) {
  if (isNaN(secs) || secs < 0) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function escapeVnHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderVoiceNotesTimeline() {
  const timelineEl = document.getElementById('vn-timeline');
  const statusTagEl = document.getElementById('vn-status-tag');
  const completionBadgeEl = document.getElementById('vn-completion-badge');
  if (!timelineEl) return;

  timelineEl.innerHTML = '';

  const recordedDayNums = Object.keys(voiceNotes)
    .map(Number)
    .filter(d => !isNaN(d) && voiceNotes[d]);

  const effectiveCurrentDay = CURRENT_JOURNAL_DAY || (recordedDayNums.length ? Math.max(...recordedDayNums) : 1);

  if (statusTagEl) {
    statusTagEl.textContent = `CURRENTLY — DAY ${String(effectiveCurrentDay).padStart(2, '0')} / 14`;
  }

  // Final recording Archive Completion display (Day 14)
  if (completionBadgeEl) {
    if (voiceNotes[14]) {
      completionBadgeEl.innerHTML = `
        <div class="vn-archive-complete-pill" role="status">
          <span class="vn-complete-dot">●</span> 14 DAYS / 14 NOTES / ARCHIVE COMPLETE
        </div>
      `;
      completionBadgeEl.classList.remove('hidden');
    } else {
      completionBadgeEl.innerHTML = '';
      completionBadgeEl.classList.add('hidden');
    }
  }

  // Ensure selected day is valid
  if (!voiceNotes[selectedVnDay]) {
    selectedVnDay = recordedDayNums.length ? Math.max(...recordedDayNums) : 1;
  }

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const isRecorded = !!voiceNotes[day];
    const isCurrent = (day === effectiveCurrentDay);
    const isSelected = (day === selectedVnDay);
    const dayDate = getDayDate(day);

    const nodeBtn = document.createElement('button');
    nodeBtn.type = 'button';
    nodeBtn.className = `vn-timeline-node ${isRecorded ? 'recorded' : 'unrecorded'} ${isCurrent ? 'is-current' : ''} ${isSelected ? 'is-selected' : ''}`;
    nodeBtn.setAttribute('data-day', day);
    nodeBtn.setAttribute('role', 'tab');
    nodeBtn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    nodeBtn.setAttribute('aria-label', `Day ${day}, ${dayDate.short}: ${isRecorded ? 'Recorded entry available' : 'Unrecorded day'}`);

    nodeBtn.innerHTML = `
      <span class="vn-dot-glyph" aria-hidden="true">${isRecorded ? '●' : '○'}</span>
      <span class="vn-node-day">DAY ${String(day).padStart(2, '0')}</span>
      <span class="vn-node-date">${dayDate.short}</span>
      ${isCurrent ? '<span class="vn-here-badge" aria-hidden="true">YOU ARE HERE</span>' : ''}
    `;

    nodeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isRecorded) {
        selectVoiceNote(day);
      } else {
        showUnrecordedMessage(day, nodeBtn);
      }
    });

    timelineEl.appendChild(nodeBtn);
  }
}

function selectVoiceNote(day) {
  const note = voiceNotes[day];
  if (!note) return;

  hideUnrecordedMessage();

  // If another voice note was playing, stop it
  if (currentVnAudio && currentVnPlayingDay !== day) {
    currentVnAudio.pause();
    currentVnAudio = null;
    currentVnPlayingDay = null;
  }

  selectedVnDay = day;

  // Update timeline button states
  const nodes = document.querySelectorAll('.vn-timeline-node');
  nodes.forEach(n => {
    const d = parseInt(n.getAttribute('data-day'), 10);
    const isSel = (d === day);
    n.classList.toggle('is-selected', isSel);
    n.setAttribute('aria-selected', isSel ? 'true' : 'false');
  });

  renderActivePlayerCard(day);
}

function renderActivePlayerCard(day) {
  const mount = document.getElementById('vn-active-card');
  if (!mount) return;

  const note = voiceNotes[day];
  if (!note) {
    mount.innerHTML = `
      <div class="vn-player-card unrecorded-placeholder">
        <p class="mono-meta">Select a recorded day from the journal timeline above.</p>
      </div>
    `;
    return;
  }

  const dayDate = getDayDate(day);
  const formattedDate = note.date ? formatVnDateLong(note.date) : dayDate.long;
  const initialDuration = note.duration || '00:00';
  const isPlayingThis = (currentVnPlayingDay === day);

  mount.innerHTML = `
    <div class="vn-player-card ${isPlayingThis ? 'is-playing' : ''}" id="vn-player-card-${day}">
      <div class="vn-card-top">
        <div class="vn-card-day-badge">
          <span class="vn-dot-indicator filled" aria-hidden="true">●</span>
          <span class="vn-card-day-title">DAY ${String(day).padStart(2, '0')}</span>
        </div>
        <div class="vn-card-meta-right">
          <span class="vn-card-date mono-meta">RECORDED — ${formattedDate}</span>
        </div>
      </div>

      <div class="vn-custom-player">
        <button class="vn-audio-btn" id="vn-play-btn-${day}" type="button" aria-label="Play Day ${day} voice note">
          <svg class="vn-play-icon ${isPlayingThis ? 'hidden' : ''}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="6 4 20 12 6 20 6 4"></polygon>
          </svg>
          <svg class="vn-pause-icon ${isPlayingThis ? '' : 'hidden'}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>

        <div class="vn-scrub-area">
          <div class="vn-time-track" id="vn-progress-track-${day}" role="slider" aria-label="Audio scrubber" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
            <div class="vn-time-track-bar">
              <div class="vn-time-track-fill" id="vn-progress-fill-${day}" style="width: 0%;"></div>
              <div class="vn-scrubber-handle" id="vn-scrubber-handle-${day}" style="left: 0%;"></div>
            </div>
          </div>
          <div class="vn-time-readout">
            <span class="vn-curr-time mono-meta" id="vn-curr-time-${day}">00:00</span>
            <span class="vn-total-time mono-meta" id="vn-total-time-${day}">${initialDuration}</span>
          </div>
        </div>
      </div>

      ${note.description ? `<p class="vn-card-desc">${escapeVnHtml(note.description)}</p>` : ''}
      <div class="vn-error-banner hidden" id="vn-error-banner-${day}">Audio file unavailable (${note.audio}).</div>
    </div>
  `;

  attachPlayerEventListeners(day, note);
}

function attachPlayerEventListeners(day, note) {
  const playBtn = document.getElementById(`vn-play-btn-${day}`);
  const card = document.getElementById(`vn-player-card-${day}`);
  const playIcon = playBtn ? playBtn.querySelector('.vn-play-icon') : null;
  const pauseIcon = playBtn ? playBtn.querySelector('.vn-pause-icon') : null;
  const track = document.getElementById(`vn-progress-track-${day}`);
  const fill = document.getElementById(`vn-progress-fill-${day}`);
  const handle = document.getElementById(`vn-scrubber-handle-${day}`);
  const currTimeEl = document.getElementById(`vn-curr-time-${day}`);
  const totalTimeEl = document.getElementById(`vn-total-time-${day}`);
  const errorBanner = document.getElementById(`vn-error-banner-${day}`);

  if (!playBtn) return;

  function updateScrubber(curr, dur) {
    if (currTimeEl) currTimeEl.textContent = formatVnTime(curr);
    if (dur && !isNaN(dur) && dur > 0) {
      if (totalTimeEl && (!note.duration || totalTimeEl.textContent === '00:00')) {
        totalTimeEl.textContent = formatVnTime(dur);
      }
      const pct = Math.min(100, Math.max(0, (curr / dur) * 100));
      if (fill) fill.style.width = `${pct}%`;
      if (handle) handle.style.left = `${pct}%`;
      if (track) track.setAttribute('aria-valuenow', Math.round(pct));
    }
  }

  function audioEnded() {
    currentVnPlayingDay = null;
    if (card) card.classList.remove('is-playing');
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (fill) fill.style.width = '0%';
    if (handle) handle.style.left = '0%';
    if (currTimeEl) currTimeEl.textContent = '00:00';
    if (track) track.setAttribute('aria-valuenow', 0);

    // Resume ambient music if it was paused for voice note
    if (wasAmbientPlayingBeforeVoiceNote && !userManuallyPaused) {
      playAmbientAudio();
      wasAmbientPlayingBeforeVoiceNote = false;
    }
  }

  function createAudio() {
    const audio = new Audio();
    audio.src = note.audio;
    audio.preload = 'metadata';

    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration && !isNaN(audio.duration)) {
        if (totalTimeEl) totalTimeEl.textContent = formatVnTime(audio.duration);
      }
    });

    audio.addEventListener('timeupdate', () => {
      updateScrubber(audio.currentTime, audio.duration);
    });

    audio.addEventListener('ended', () => {
      audioEnded();
    });

    audio.addEventListener('waiting', () => {
      if (card) card.classList.add('is-buffering');
    });

    audio.addEventListener('playing', () => {
      if (card) card.classList.remove('is-buffering');
    });

    audio.addEventListener('canplay', () => {
      if (card) card.classList.remove('is-buffering');
    });

    audio.addEventListener('error', (e) => {
      console.warn('Voice note audio load error:', audio.src, e);
      if (card) card.classList.remove('is-buffering');
      if (errorBanner) errorBanner.classList.remove('hidden');
      audioEnded();
    });

    return audio;
  }

  // If this audio was already playing when re-rendered
  if (currentVnAudio && currentVnPlayingDay === day) {
    updateScrubber(currentVnAudio.currentTime, currentVnAudio.duration);
    currentVnAudio.ontimeupdate = () => updateScrubber(currentVnAudio.currentTime, currentVnAudio.duration);
    currentVnAudio.onended = () => audioEnded();
  }

  playBtn.addEventListener('click', () => {
    if (!currentVnAudio || currentVnPlayingDay !== day) {
      if (currentVnAudio) {
        currentVnAudio.pause();
      }
      currentVnAudio = createAudio();
      currentVnPlayingDay = day;
    }

    if (currentVnAudio.paused) {
      // Pause ambient audio
      if (ambientAudio && !ambientAudio.paused) {
        wasAmbientPlayingBeforeVoiceNote = true;
      }
      pauseAmbientAudio();

      const playPromise = currentVnAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (card) card.classList.add('is-playing');
          if (playIcon) playIcon.classList.add('hidden');
          if (pauseIcon) pauseIcon.classList.remove('hidden');
          if (errorBanner) errorBanner.classList.add('hidden');
        }).catch((err) => {
          console.warn("Audio playback prevented or missing file:", err);
          if (errorBanner) errorBanner.classList.remove('hidden');
          audioEnded();
        });
      }
    } else {
      currentVnAudio.pause();
      if (card) card.classList.remove('is-playing');
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');

      if (wasAmbientPlayingBeforeVoiceNote && !userManuallyPaused) {
        playAmbientAudio();
        wasAmbientPlayingBeforeVoiceNote = false;
      }
    }
  });

  if (track) {
    track.addEventListener('click', (e) => {
      if (!currentVnAudio) {
        currentVnAudio = createAudio();
        currentVnPlayingDay = day;
      }
      const rect = track.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (currentVnAudio.duration) {
        currentVnAudio.currentTime = pos * currentVnAudio.duration;
        updateScrubber(currentVnAudio.currentTime, currentVnAudio.duration);
      }
    });

    track.addEventListener('keydown', (e) => {
      if (!currentVnAudio || !currentVnAudio.duration) return;
      if (e.key === 'ArrowRight') {
        currentVnAudio.currentTime = Math.min(currentVnAudio.duration, currentVnAudio.currentTime + 5);
        updateScrubber(currentVnAudio.currentTime, currentVnAudio.duration);
      } else if (e.key === 'ArrowLeft') {
        currentVnAudio.currentTime = Math.max(0, currentVnAudio.currentTime - 5);
        updateScrubber(currentVnAudio.currentTime, currentVnAudio.duration);
      }
    });
  }
}

function showUnrecordedMessage(day, anchorElement) {
  const popover = document.getElementById('vn-unrecorded-popover');
  const dayEl = document.getElementById('vn-popover-day');
  const msgEl = document.getElementById('vn-popover-msg');
  if (!popover || !dayEl || !msgEl) return;

  if (unrecordedPopoverTimeout) {
    clearTimeout(unrecordedPopoverTimeout);
  }

  let msg;
  if (typeof getCalculatedJournalDay === 'function' && day === getCalculatedJournalDay() && !voiceNotes[day]) {
    msg = "I will upload today's note later today. 🎙️";
  } else {
    msg = UNRECORDED_MESSAGES[(day - 1) % UNRECORDED_MESSAGES.length];
  }
  dayEl.textContent = `DAY ${String(day).padStart(2, '0')}`;
  msgEl.textContent = msg;

  popover.classList.remove('hidden');
  popover.classList.add('open');

  // Auto-dismiss after 6 seconds
  unrecordedPopoverTimeout = setTimeout(() => {
    hideUnrecordedMessage();
  }, 6000);
}

function hideUnrecordedMessage() {
  const popover = document.getElementById('vn-unrecorded-popover');
  if (popover) {
    popover.classList.remove('open');
    popover.classList.add('hidden');
  }
  if (unrecordedPopoverTimeout) {
    clearTimeout(unrecordedPopoverTimeout);
    unrecordedPopoverTimeout = null;
  }
}

function stopVoiceNotePlayback() {
  if (currentVnAudio) {
    currentVnAudio.pause();
    currentVnAudio = null;
    currentVnPlayingDay = null;
  }
  const cards = document.querySelectorAll('.vn-player-card');
  cards.forEach(c => c.classList.remove('is-playing'));
  const playIcons = document.querySelectorAll('.vn-play-icon');
  playIcons.forEach(p => p.classList.remove('hidden'));
  const pauseIcons = document.querySelectorAll('.vn-pause-icon');
  pauseIcons.forEach(p => p.classList.add('hidden'));

  if (wasAmbientPlayingBeforeVoiceNote && !userManuallyPaused) {
    playAmbientAudio();
    wasAmbientPlayingBeforeVoiceNote = false;
  }
}

function initVoiceNotes() {
  renderVoiceNotesTimeline();
  renderActivePlayerCard(selectedVnDay);

  const closeBtn = document.getElementById('vn-popover-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideUnrecordedMessage);
  }

  document.addEventListener('click', (e) => {
    const popover = document.getElementById('vn-unrecorded-popover');
    if (popover && popover.classList.contains('open')) {
      if (!popover.contains(e.target) && !e.target.closest('.vn-timeline-node.unrecorded')) {
        hideUnrecordedMessage();
      }
    }
  });
}

/* ==========================================================================
   6. Ambient Background Music (Autoplay on Entry / First Touch & Smart Dual-Track)
   Pages 0 to 8: audio/music.mp3
   Pages 9 to 14: audio/janisar.mp3
   ========================================================================== */
const AMBIENT_TRACK_1 = 'audio/music.mp3';
const AMBIENT_TRACK_2 = 'audio/janisar.mp3';

let ambientAudio = null;
let soundToggle = null;
let soundState = null;
let userManuallyPaused = false;
let wasAmbientPlayingBeforeVoiceNote = false;
let currentAmbientTrackKey = 'track1';
let ambientFadeInterval = null;

function getTargetTrackForPage(pageNumber) {
  return pageNumber >= 9 ? 'track2' : 'track1';
}

function initAmbientAudio() {
  ambientAudio = document.getElementById('ambient-audio');
  soundToggle = document.getElementById('sound-toggle');
  soundState = document.getElementById('sound-state');

  if (!soundToggle || !ambientAudio) return;

  // Case-insensitive fallback if server hosts janisar.MP3
  ambientAudio.addEventListener('error', () => {
    if (ambientAudio.src && ambientAudio.src.includes('janisar.mp3')) {
      console.warn('Retrying with uppercase janisar.MP3 fallback');
      ambientAudio.src = 'audio/janisar.MP3';
      ambientAudio.load();
      if (!userManuallyPaused && !ambientAudio.paused) {
        ambientAudio.play().catch(() => {});
      }
    }
  });

  soundToggle.addEventListener('click', () => {
    if (ambientAudio.paused) {
      userManuallyPaused = false;
      playAmbientAudio();
    } else {
      userManuallyPaused = true;
      pauseAmbientAudio();
    }
  });

  // Autoplay on first click/touch on document (fulfills browser user-gesture policy)
  const startAudioOnFirstInteraction = () => {
    if (ambientAudio && ambientAudio.paused && !userManuallyPaused) {
      playAmbientAudio();
    }
    document.removeEventListener('click', startAudioOnFirstInteraction);
    document.removeEventListener('touchstart', startAudioOnFirstInteraction);
  };
  document.addEventListener('click', startAudioOnFirstInteraction, { passive: true });
  document.addEventListener('touchstart', startAudioOnFirstInteraction, { passive: true });
}

function updateAmbientTrackForPage(pageNumber) {
  if (!ambientAudio) return;

  const targetKey = getTargetTrackForPage(pageNumber);
  if (targetKey === currentAmbientTrackKey) {
    return; // Already playing/set to this track
  }

  currentAmbientTrackKey = targetKey;
  const targetSrc = targetKey === 'track2' ? AMBIENT_TRACK_2 : AMBIENT_TRACK_1;
  const isCurrentlyPlaying = !ambientAudio.paused && !userManuallyPaused;

  if (ambientFadeInterval) {
    clearInterval(ambientFadeInterval);
    ambientFadeInterval = null;
  }

  if (isCurrentlyPlaying) {
    // Smooth crossfade: fade out current track
    let vol = ambientAudio.volume;
    ambientFadeInterval = setInterval(() => {
      vol = Math.max(0, vol - 0.15);
      ambientAudio.volume = vol;
      if (vol <= 0.05) {
        clearInterval(ambientFadeInterval);
        ambientFadeInterval = null;
        ambientAudio.pause();
        switchAmbientSrc(targetSrc, true);
      }
    }, 40);
  } else {
    // Silently update source so next un-mute starts the right track
    switchAmbientSrc(targetSrc, false);
  }
}

function switchAmbientSrc(newSrc, resumePlay) {
  if (!ambientAudio) return;
  ambientAudio.volume = 0;
  ambientAudio.src = newSrc;
  ambientAudio.load();

  if (resumePlay) {
    const playPromise = ambientAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (soundToggle) soundToggle.classList.add('playing');
        if (soundState) soundState.textContent = 'ON';
        // Fade in new track smoothly
        let vol = 0;
        ambientFadeInterval = setInterval(() => {
          vol = Math.min(1, vol + 0.1);
          ambientAudio.volume = vol;
          if (vol >= 1) {
            clearInterval(ambientFadeInterval);
            ambientFadeInterval = null;
          }
        }, 45);
      }).catch(err => {
        console.warn('Ambient switch play error:', err);
      });
    }
  } else {
    ambientAudio.volume = 1;
  }
}

function playAmbientAudio() {
  if (!ambientAudio) return;
  const targetKey = getTargetTrackForPage(currentPage);
  const targetSrc = targetKey === 'track2' ? AMBIENT_TRACK_2 : AMBIENT_TRACK_1;

  if (!ambientAudio.src || !ambientAudio.src.includes(targetSrc)) {
    ambientAudio.src = targetSrc;
    currentAmbientTrackKey = targetKey;
  }
  ambientAudio.volume = 1;

  const playPromise = ambientAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      if (soundToggle) soundToggle.classList.add('playing');
      if (soundState) soundState.textContent = 'ON';
    }).catch(err => {
      console.log('Audio autoplay awaiting user interaction', err);
    });
  }
}

function pauseAmbientAudio() {
  if (ambientFadeInterval) {
    clearInterval(ambientFadeInterval);
    ambientFadeInterval = null;
  }
  if (ambientAudio && !ambientAudio.paused) {
    ambientAudio.pause();
    if (soundToggle) soundToggle.classList.remove('playing');
    if (soundState) soundState.textContent = 'OFF';
  }
}

/* ==========================================================================
   7. Interactive Dialogue & Mini-Game (Pages 10 to 14)
   ========================================================================== */
/* ==========================================================================
   7. Bhondu Question Archive (5 Sequential Dynamic Questions)
   ========================================================================== */
const questions = [
  {
    id: 1,
    section: "SECTION 11",
    number: "QUESTION 01 / 05",
    title: "A QUIET QUESTION",
    text: "when you look back, what stays with you the most?",
    microDeco: "moon",
    options: [
      {
        id: "a",
        text: "The late-night calls & laughter 🌙",
        note: "Me too. I remember how your laugh could completely turn around the worst day. It was my favorite sound. It still is, honestly."
      },
      {
        id: "b",
        text: "How safe we felt with each other 🤍",
        note: "You were the only place in the world where I never had to pretend to be strong. You made me feel like I was finally home. I never took that for granted, even when it didn't look like it."
      },
      {
        id: "c",
        text: "The ordinary days that became special 🌷",
        note: "Walking slower just to get two more minutes with you. Sitting in silence and it not being awkward. Those ordinary days were the best days of my life."
      }
    ]
  },
  {
    id: 2,
    section: "SECTION 12",
    number: "QUESTION 02 / 05",
    title: "SOMETHING TO REMEMBER",
    text: "If you had to describe what we were in one word...",
    microDeco: "tape",
    options: [
      {
        id: "a",
        text: "Home.",
        note: "That's what it was for me too. Not four walls. Just you, wherever you were. Even miles away, talking to you felt like walking into my own room after a long trip."
      },
      {
        id: "b",
        text: "Unfinished.",
        note: "I think about that every single day. Not because I want to force an ending, but because some stories feel like they were meant to have another chapter. Even if they don't."
      },
      {
        id: "c",
        text: "Real.",
        note: "It was. It really was. In a world full of people performing for each other, what we had was completely, stubbornly honest. I wouldn't trade that for anything."
      }
    ]
  },
  {
    id: 3,
    section: "SECTION 13",
    number: "QUESTION 03 / 05",
    title: "BETWEEN THE LINES",
    text: "What do you think I was trying to say most of the time?",
    microDeco: "flower",
    options: [
      {
        id: "a",
        text: "I'm trying, even when I mess up.",
        note: "You saw right through me. I was never good at saying it the right way. But every effort, every awkward attempt, was me trying to show you that you mattered more than my pride."
      },
      {
        id: "b",
        text: "Don't let go of me.",
        note: "...Yeah. That was it. Beneath everything else, that was always the quiet plea. I just wanted you to stay. I still wish you had."
      },
      {
        id: "c",
        text: "You make everything softer.",
        note: "The world is loud and sharp and exhausting. But with you, everything was quiet. You had this way of making the chaos feel like background noise. I haven't found that anywhere else."
      }
    ]
  },
  {
    id: 4,
    section: "SECTION 14",
    number: "QUESTION 04 / 05",
    title: "THE LITTLE THINGS",
    text: "Which version of us do you think I remember the most?",
    microDeco: "shooting-star",
    options: [
      {
        id: "a",
        text: "The goofy, chaotic us at 2 AM.",
        note: "The version where we were crying from laughing at things that weren't even funny. No filters, no guards up, just two people being completely ridiculous together. That's the one I keep replaying in my head."
      },
      {
        id: "b",
        text: "The quiet us — just sitting together, saying nothing.",
        note: "That's the one that hurts the most to miss. Because you can find people to laugh with, but finding someone whose silence feels like a warm blanket? That only happens once."
      },
      {
        id: "c",
        text: "The us that talked about the future like it was already ours.",
        note: "The trips we planned. The little apartment we joked about. The promises hidden inside casual jokes. I believed all of it. A part of me still does."
      }
    ]
  },
  {
    id: 5,
    section: "SECTION 15",
    number: "QUESTION 05 / 05",
    title: "THE LAST QUESTION",
    text: "If this archive had one thing left unfinished... what would it be?",
    microDeco: "monogram",
    options: [
      {
        id: "a",
        text: "The conversations we never got to have.",
        note: "There were so many things I held back because I thought we had more time. So many questions I never asked. If I could have one hour back, I'd spend it just listening to you talk about your day."
      },
      {
        id: "b",
        text: "The promise to always find our way back.",
        note: "I never un-made that promise. Even from this distance, even if you never read this whole thing — that door stays unlocked on my side. Always."
      },
      {
        id: "c",
        text: "Nothing. Everything was said, even in the ending.",
        note: "Maybe that's the most mature answer. But even if everything was said... I don't think I'll ever be done missing you. Some endings don't mean the feeling ended. They just mean the room got quiet."
      }
    ]
  }
];

let currentQuestionIndex = 0;
const selectedAnswers = {};

function initQuestionArchive() {
  renderQuestion(currentQuestionIndex);
}

function getMicroDecoHtml(decoType) {
  if (decoType === 'moon') {
    return `
      <div class="q-micro-deco deco-moon" title="Quiet night">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
          <path d="M22 6 C15 9 12 18 15 25 C18 32 26 34 31 31 C23 34 15 29 14 20 C13 13 18 7 22 6 Z" 
                stroke="rgba(217, 138, 148, 0.48)" stroke-width="1.3" fill="rgba(232, 201, 204, 0.18)"/>
          <path d="M29 11 L30 13.5 L33 14.5 L30 15.5 L29 18 L28 15.5 L25 14.5 L28 13.5 Z" 
                fill="rgba(194, 157, 69, 0.55)"/>
        </svg>
      </div>
    `;
  } else if (decoType === 'tape') {
    return `
      <div class="q-micro-deco deco-tape">
        <div class="washi-tape-stamp">
          <span class="tape-text">remember this?</span>
        </div>
      </div>
    `;
  } else if (decoType === 'flower') {
    return `
      <div class="q-micro-deco deco-flower" title="Pressed botanical">
        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" aria-hidden="true">
          <path d="M16 46 L16 22" stroke="rgba(217, 138, 148, 0.48)" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M16 34 Q22 30 25 22" stroke="rgba(217, 138, 148, 0.42)" stroke-width="1" fill="none"/>
          <path d="M16 22 C9 18 7 10 12 5 C14 10 16 15 16 22 Z" fill="rgba(232, 201, 204, 0.26)" stroke="rgba(217, 138, 148, 0.48)" stroke-width="1"/>
          <path d="M16 22 C23 18 25 10 20 5 C18 10 16 15 16 22 Z" fill="rgba(232, 201, 204, 0.26)" stroke="rgba(217, 138, 148, 0.48)" stroke-width="1"/>
          <circle cx="16" cy="4" r="2.8" fill="rgba(242, 199, 121, 0.45)" stroke="rgba(194, 157, 69, 0.5)" stroke-width="0.9"/>
        </svg>
      </div>
    `;
  } else if (decoType === 'shooting-star') {
    return `
      <div class="q-micro-deco deco-shooting-star" title="Starlit memory">
        <svg width="68" height="34" viewBox="0 0 68 34" fill="none" aria-hidden="true">
          <path d="M4 28 Q28 23 48 13" stroke="rgba(217, 138, 148, 0.45)" stroke-width="1.2" stroke-dasharray="3 4" stroke-linecap="round"/>
          <path d="M50 13 L52 6 L54 13 L61 15 L54 17 L52 24 L50 17 L43 15 Z" fill="rgba(242, 199, 121, 0.45)" stroke="rgba(194, 157, 69, 0.55)" stroke-width="0.9"/>
        </svg>
      </div>
    `;
  } else if (decoType === 'monogram') {
    return `
      <div class="q-micro-deco deco-monogram">
        <div class="monogram-seal" title="Jaggu × Bhondu">
          <span class="monogram-inner">J × B</span>
        </div>
      </div>
    `;
  }
  return '';
}

function renderQuestion(index) {
  const container = document.getElementById('question-stage');
  if (!container || !questions[index]) return;

  const q = questions[index];
  const hasAnswer = selectedAnswers.hasOwnProperty(index);
  const selectedOptIndex = hasAnswer ? selectedAnswers[index] : null;
  const isLastQuestion = index === questions.length - 1;
  const noteText = hasAnswer ? q.options[selectedOptIndex].note : '';

  // Progress dots
  const dotsHtml = questions.map((_, i) => {
    let dotClass = 'q-progress-dot';
    if (i === index) dotClass += ' is-active';
    else if (selectedAnswers.hasOwnProperty(i)) dotClass += ' is-answered';
    return `<span class="${dotClass}" title="Question 0${i + 1}"></span>`;
  }).join('');

  // Option paper strips
  const optionsHtml = q.options.map((opt, optIdx) => {
    const isChosen = hasAnswer && selectedOptIndex === optIdx;
    const isDimmed = hasAnswer && selectedOptIndex !== optIdx;
    let optClasses = 'q-option-btn';
    if (isChosen) optClasses += ' is-selected';
    if (isDimmed) optClasses += ' is-dimmed';

    return `
      <button class="${optClasses}" 
              onclick="selectQuestionAnswer(${optIdx})" 
              aria-pressed="${isChosen}">
        <span class="q-opt-indicator">
          <span class="q-opt-dot"></span>
        </span>
        <span class="q-opt-text">${opt.text}</span>
      </button>
    `;
  }).join('');

  const microDecoHtml = getMicroDecoHtml(q.microDeco);

  const cardHtml = `
    <div class="q-card" id="q-active-card">
      ${microDecoHtml}

      <div class="q-card-header">
        <div class="q-card-meta-left">
          <span class="q-section-badge mono-meta">${q.section} · BHONDU ARCHIVE</span>
          <div class="q-meta-subrow">
            <span class="q-number-badge mono-meta">${q.number}</span>
            <div class="q-progress-dots" aria-label="Question progress">
              ${dotsHtml}
            </div>
          </div>
        </div>
      </div>

      <div class="q-title-wrap">
        <span class="q-editorial-title mono-meta">${q.title}</span>
        <h3 class="q-text">“${q.text}”</h3>
      </div>

      <div class="q-options-stack" role="group" aria-label="Answer options">
        ${optionsHtml}
      </div>

      <div class="q-revealed-note-wrap ${hasAnswer ? 'is-visible' : ''}" id="q-note-wrap">
        <div class="q-revealed-note-card">
          <div class="q-note-meta mono-meta">
            <span class="q-note-pin">✦</span> ARCHIVAL NOTE · RECORDED
          </div>
          <p class="q-note-text" id="q-note-text">${noteText}</p>
        </div>
      </div>

      <div class="q-actions-wrap ${hasAnswer ? 'is-visible' : ''}" id="q-action-wrap">
        <button class="q-next-btn" id="q-next-btn" onclick="${isLastQuestion ? 'finishQuestionArchive()' : 'advanceQuestion()'}">
          <span>${isLastQuestion ? 'TURN THE PAGE →' : 'NEXT QUESTION →'}</span>
        </button>
        ${isLastQuestion ? '<span class="q-action-subtext mono-meta">ARCHIVE QUESTION COMPLETE · PROCEED TO NEXT SECTION</span>' : ''}
      </div>
    </div>
  `;

  container.innerHTML = cardHtml;

  // Sync header tracker if on page 10
  if (currentPage === 10) {
    const trackerTitle = document.getElementById('current-chapter-title');
    if (trackerTitle) trackerTitle.textContent = q.title;
  }
}

function selectQuestionAnswer(optIndex) {
  const q = questions[currentQuestionIndex];
  if (!q) return;

  const previousSelection = selectedAnswers[currentQuestionIndex];
  selectedAnswers[currentQuestionIndex] = optIndex;

  // Record into journey answers for the keepsake receipt
  if (currentQuestionIndex === 0) userJourneyAnswers.q1 = q.options[optIndex].text;
  else if (currentQuestionIndex === 1) userJourneyAnswers.q2 = q.options[optIndex].text;
  else if (currentQuestionIndex === 2) userJourneyAnswers.q3 = q.options[optIndex].text;
  else if (currentQuestionIndex === 3) userJourneyAnswers.q4 = q.options[optIndex].text;
  else if (currentQuestionIndex === 4) userJourneyAnswers.q5 = q.options[optIndex].text;

  const card = document.getElementById('q-active-card');
  if (!card) return;

  // Update option button classes
  const btns = card.querySelectorAll('.q-option-btn');
  btns.forEach((btn, idx) => {
    btn.setAttribute('aria-pressed', idx === optIndex ? 'true' : 'false');
    if (idx === optIndex) {
      btn.classList.add('is-selected');
      btn.classList.remove('is-dimmed');
    } else {
      btn.classList.remove('is-selected');
      btn.classList.add('is-dimmed');
    }
  });

  // Update dots
  const dots = card.querySelectorAll('.q-progress-dot');
  if (dots[currentQuestionIndex]) {
    dots[currentQuestionIndex].classList.add('is-active');
  }

  // Handle note card transition smoothly
  const noteWrap = document.getElementById('q-note-wrap');
  const noteTextEl = document.getElementById('q-note-text');
  const actionWrap = document.getElementById('q-action-wrap');

  if (noteWrap && noteTextEl) {
    const newNote = q.options[optIndex].note;
    if (noteWrap.classList.contains('is-visible') && previousSelection !== undefined && previousSelection !== optIndex) {
      // Smooth text swap without stacking
      noteTextEl.style.opacity = '0';
      noteTextEl.style.transform = 'translateY(4px)';
      setTimeout(() => {
        noteTextEl.textContent = newNote;
        noteTextEl.style.opacity = '1';
        noteTextEl.style.transform = 'translateY(0)';
      }, 180);
    } else {
      noteTextEl.textContent = newNote;
      noteWrap.classList.add('is-visible');
    }
  }

  if (actionWrap) {
    actionWrap.classList.add('is-visible');
  }
}

function advanceQuestion() {
  if (currentQuestionIndex >= questions.length - 1) {
    finishQuestionArchive();
    return;
  }

  const card = document.getElementById('q-active-card');
  if (card) {
    card.classList.add('q-card-fade-out');
  }

  setTimeout(() => {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
    
    // Smooth scroll to top of page-10 if scrolled down
    const pageEl = document.getElementById('page-10');
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 260);
}

function finishQuestionArchive() {
  // Sync all answers
  if (questions[0] && selectedAnswers[0] !== undefined) {
    userJourneyAnswers.q1 = questions[0].options[selectedAnswers[0]].text;
  }
  if (questions[1] && selectedAnswers[1] !== undefined) {
    userJourneyAnswers.q2 = questions[1].options[selectedAnswers[1]].text;
  }
  if (questions[4] && selectedAnswers[4] !== undefined) {
    userJourneyAnswers.q5 = questions[4].options[selectedAnswers[4]].text;
  }

  // Proceed smoothly to Page 12 (A Tiny Bloom - Flower watering mini-game)
  goToPage(12);
}

function setupWateringGame() {
  const waterBtn = document.getElementById('water-flowers-btn');
  const tulip = document.getElementById('game-tulip');
  const sunflower = document.getElementById('game-sunflower');
  const waterStream = document.getElementById('water-stream');
  const reactionBox = document.getElementById('int-reaction-bloom');
  const progressFill = document.getElementById('bloom-progress-fill');
  const progressTrack = document.getElementById('bloom-progress-track');

  if (!waterBtn || !tulip || !sunflower) return;

  let progress = 0.35;
  let wateringInterval = null;
  let dropInterval = null;
  let completed = false;

  const updateProgressBar = () => {
    if (!progressFill) return;
    const pct = Math.min(100, Math.max(0, Math.round(((progress - 0.35) / 0.65) * 100)));
    progressFill.style.width = `${pct}%`;
  };

  const createDroplet = () => {
    if (!waterStream) return;
    const drop = document.createElement('div');
    drop.className = 'water-droplet';
    drop.style.left = `${Math.random() * 80 + 10}%`;
    waterStream.appendChild(drop);
    setTimeout(() => {
      if (drop.parentNode) drop.parentNode.removeChild(drop);
    }, 700);
  };

  const startWatering = (e) => {
    if (completed) return;
    if (e && e.cancelable) e.preventDefault();
    waterBtn.classList.add('holding');

    if (wateringInterval) clearInterval(wateringInterval);
    if (dropInterval) clearInterval(dropInterval);

    wateringInterval = setInterval(() => {
      progress += 0.045;
      tulip.style.transform = `scale(${Math.min(progress, 1)})`;
      sunflower.style.transform = `scale(${Math.min(progress, 1)})`;
      updateProgressBar();

      if (progress >= 1 && !completed) {
        completed = true;
        stopWatering();
        if (progressFill) progressFill.style.width = '100%';
        if (progressTrack) {
          setTimeout(() => {
            progressTrack.style.opacity = '0';
            setTimeout(() => { progressTrack.style.display = 'none'; }, 400);
          }, 500);
        }
        waterBtn.style.display = 'none';
        if (typeof createPetals === 'function') {
          createPetals(30);
        }
        if (reactionBox) {
          reactionBox.innerHTML = `
            <p class="reaction-text">“They bloomed... just like our memories did. 🌷🌻”</p>
            <button class="int-next-btn" onclick="goToPage(13)">What I never stopped feeling →</button>
          `;
          reactionBox.classList.add('visible');
        }
      }
    }, 70);

    dropInterval = setInterval(createDroplet, 100);
  };

  const stopWatering = () => {
    waterBtn.classList.remove('holding');
    if (wateringInterval) {
      clearInterval(wateringInterval);
      wateringInterval = null;
    }
    if (dropInterval) {
      clearInterval(dropInterval);
      dropInterval = null;
    }
  };

  waterBtn.addEventListener('mousedown', startWatering);
  waterBtn.addEventListener('mouseup', stopWatering);
  waterBtn.addEventListener('mouseleave', stopWatering);
  window.addEventListener('mouseup', stopWatering);
  waterBtn.addEventListener('touchstart', startWatering, { passive: false });
  waterBtn.addEventListener('touchend', stopWatering);
  waterBtn.addEventListener('touchcancel', stopWatering);
}

function selectFinalChoice(choiceText) {
  userJourneyAnswers.final = choiceText;
  completeAndShowKeepsake();
}

function toggleCustomAnswerBox() {
  const box = document.getElementById('custom-response-box');
  if (box) {
    box.classList.toggle('hidden');
    const input = document.getElementById('custom-answer-input');
    if (input) input.focus();
  }
}

function submitCustomAnswer() {
  const input = document.getElementById('custom-answer-input');
  const note = input && input.value.trim() ? `“${input.value.trim()}”` : '“A quiet note left in the archive.”';
  userJourneyAnswers.final = note;
  completeAndShowKeepsake();
}

function completeAndShowKeepsake() {
  const k1 = document.getElementById('k-ans-1');
  const k2 = document.getElementById('k-ans-2');
  const k5 = document.getElementById('k-ans-5');
  const kFinal = document.getElementById('k-ans-final');

  if (k1) k1.textContent = userJourneyAnswers.q1 || 'The late-night calls & laughter 🌙';
  if (k2) k2.textContent = userJourneyAnswers.q2 || 'Home.';
  if (k5) k5.textContent = userJourneyAnswers.q5 || 'The promise to always find our way back.';
  if (kFinal) kFinal.textContent = userJourneyAnswers.final;

  goToPage(14);
}

/* ==========================================================================
   8. Modals ("Before You Go..." & Letter Overlay)
   ========================================================================== */
function initModals() {
  const finalModalTrigger = document.getElementById('before-you-go-trigger');
  if (finalModalTrigger) {
    finalModalTrigger.addEventListener('click', openFinalModal);
  }

  const finalModalBackdrop = document.getElementById('final-modal-backdrop');
  if (finalModalBackdrop) {
    finalModalBackdrop.addEventListener('click', (e) => {
      if (e.target === finalModalBackdrop) closeFinalModal();
    });
  }

  const letterModalBackdrop = document.getElementById('letter-modal-backdrop');
  const letterModalClose = document.getElementById('letter-modal-close');

  if (letterModalClose) {
    letterModalClose.addEventListener('click', () => {
      if (letterModalBackdrop) {
        letterModalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (letterModalBackdrop) {
    letterModalBackdrop.addEventListener('click', (e) => {
      if (e.target === letterModalBackdrop) {
        letterModalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFinalModal();
      if (letterModalBackdrop) {
        letterModalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
      closeDrawer();
    }
  });
}

function openFinalModal() {
  const backdrop = document.getElementById('final-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeFinalModal() {
  const backdrop = document.getElementById('final-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openLetterModal(letter) {
  const backdrop = document.getElementById('letter-modal-backdrop');
  const titleEl = document.getElementById('letter-modal-title');
  const dateEl = document.getElementById('letter-modal-date');
  const contentEl = document.getElementById('letter-modal-content');

  if (titleEl) titleEl.textContent = letter.title || 'Letter';
  if (dateEl) dateEl.textContent = letter.date || '[DATE]';
  if (contentEl) {
    contentEl.innerHTML = letter.letterContent
      ? letter.letterContent.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
      : `<p>${letter.text || 'No letter text recorded.'}</p>`;
  }

  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/* ==========================================================================
   9. Page 08: Interactive Dream Constellation, Gift Boxes & Subtle Hearts
   ========================================================================== */
function toggleGiftBox(boxEl, event) {
  if (!boxEl) return;
  const isCurrentlyOpen = boxEl.classList.contains('is-open');

  if (!isCurrentlyOpen) {
    boxEl.classList.add('is-open');
    // Subtle floating hearts burst
    const rect = boxEl.getBoundingClientRect();
    const clickX = event && event.clientX ? event.clientX : (rect.left + rect.width / 2);
    const clickY = event && event.clientY ? event.clientY : (rect.top + rect.height / 2);
    triggerSubtleHearts(clickX, clickY);
  } else {
    boxEl.classList.remove('is-open');
  }

  // Recalculate SVG map connectors after height expansion
  setTimeout(drawDreamMapLines, 250);
}

function closeGiftBox(boxId) {
  const box = document.getElementById(boxId);
  if (box) {
    box.classList.remove('is-open');
    setTimeout(drawDreamMapLines, 250);
  }
}

function drawDreamMapLines() {
  const container = document.getElementById('dream-constellation-wrapper');
  const svg = document.getElementById('dream-map-svg');
  const centerEl = document.getElementById('dream-center-piece');
  if (!container || !svg || !centerEl) return;

  // Hide on narrow screens to prevent clutter
  if (window.innerWidth < 993) {
    svg.innerHTML = '';
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const centerRect = centerEl.getBoundingClientRect();

  const w = containerRect.width;
  const h = containerRect.height;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.style.width = `${w}px`;
  svg.style.height = `${h}px`;

  const cMidX = centerRect.left + centerRect.width / 2 - containerRect.left;
  const cMidY = centerRect.top + centerRect.height / 2 - containerRect.top;
  const cLeft = centerRect.left - containerRect.left;
  const cRight = centerRect.right - containerRect.left;
  const cTop = centerRect.top - containerRect.top;
  const cBottom = centerRect.bottom - containerRect.top;

  const boxes = container.querySelectorAll('.dream-gift-box');
  let svgContent = '';

  boxes.forEach((box) => {
    const boxRect = box.getBoundingClientRect();
    const bMidX = boxRect.left + boxRect.width / 2 - containerRect.left;
    const bMidY = boxRect.top + boxRect.height / 2 - containerRect.top;
    const bLeft = boxRect.left - containerRect.left;
    const bRight = boxRect.right - containerRect.left;
    const bTop = boxRect.top - containerRect.top;
    const bBottom = boxRect.bottom - containerRect.top;

    let startX, startY, endX, endY;

    // Connect from closest edge of center frame to box edge
    if (bMidY < cTop + 30) {
      // Box is above center
      if (bMidX < cLeft) {
        // Top-left
        startX = cLeft + 25;
        startY = cTop + 10;
        endX = bRight;
        endY = bBottom - 18;
      } else if (bMidX > cRight) {
        // Top-right
        startX = cRight - 25;
        startY = cTop + 10;
        endX = bLeft;
        endY = bBottom - 18;
      } else {
        // Top-center
        startX = cMidX;
        startY = cTop;
        endX = bMidX;
        endY = bBottom;
      }
    } else if (bMidY > cBottom - 30) {
      // Box is below center
      if (bMidX < cLeft) {
        // Bottom-left
        startX = cLeft + 25;
        startY = cBottom - 10;
        endX = bRight;
        endY = bTop + 18;
      } else if (bMidX > cRight) {
        // Bottom-right
        startX = cRight - 25;
        startY = cBottom - 10;
        endX = bLeft;
        endY = bTop + 18;
      } else {
        // Bottom-center
        startX = cMidX;
        startY = cBottom;
        endX = bMidX;
        endY = bTop;
      }
    } else {
      // Mid-level
      if (bMidX < cLeft) {
        startX = cLeft;
        startY = cMidY - 15;
        endX = bRight;
        endY = bMidY;
      } else {
        startX = cRight;
        startY = cMidY + 15;
        endX = bLeft;
        endY = bMidY;
      }
    }

    const dx = endX - startX;
    const dy = endY - startY;
    const cp1x = startX + dx * 0.45;
    const cp1y = startY + dy * 0.12;
    const cp2x = startX + dx * 0.55;
    const cp2y = startY + dy * 0.88;

    svgContent += `
      <g class="dream-map-connector">
        <path d="M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}" 
              fill="none" 
              stroke="rgba(194, 157, 69, 0.42)" 
              stroke-width="1.8" 
              stroke-dasharray="5 6" 
              stroke-linecap="round" />
        <circle cx="${startX.toFixed(1)}" cy="${startY.toFixed(1)}" r="3" fill="#C29D45" opacity="0.65" />
        <circle cx="${endX.toFixed(1)}" cy="${endY.toFixed(1)}" r="3" fill="#C29D45" opacity="0.65" />
      </g>
    `;
  });

  svg.innerHTML = svgContent;
}

function triggerSubtleHearts(originX, originY) {
  let container = document.getElementById('heart-burst-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'heart-burst-container';
    container.className = 'subtle-heart-container';
    document.body.appendChild(container);
  }

  const heartCount = 12;
  const colors = [
    'rgba(232, 201, 204, 0.52)',
    'rgba(217, 138, 148, 0.45)',
    'rgba(242, 199, 121, 0.42)',
    'rgba(185, 133, 140, 0.4)'
  ];

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'subtle-floating-heart';

    const isGlobal = Math.random() > 0.45;
    const startX = isGlobal
      ? (window.innerWidth * (0.15 + Math.random() * 0.7))
      : (originX + (Math.random() - 0.5) * 140);
    const startY = isGlobal
      ? (Math.min(window.innerHeight - 80, Math.max(100, originY + (Math.random() - 0.5) * 120)))
      : (originY + (Math.random() - 0.5) * 50);

    const size = Math.floor(16 + Math.random() * 16);
    const dx = (Math.random() - 0.5) * 180;
    const dy = -(70 + Math.random() * 140);
    const rot = (Math.random() - 0.5) * 50;
    const duration = 1.4 + Math.random() * 0.6;
    const color = colors[Math.floor(Math.random() * colors.length)];

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.setProperty('--dx', `${dx}px`);
    heart.style.setProperty('--dy', `${dy}px`);
    heart.style.setProperty('--rot', `${rot}deg`);
    heart.style.animationDuration = `${duration}s`;

    heart.innerHTML = `
      <svg viewBox="0 0 40 40" width="${size}" height="${size}" style="fill: ${color};">
        <path d="M20 33 C18 31 6 22 6 14 C6 8.5 10.5 5 15.5 5 C17.8 5 19.3 6.2 20 7.5 C20.7 6.2 22.2 5 24.5 5 C29.5 5 34 8.5 34 14 C34 22 22 31 20 33 Z" />
      </svg>
    `;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000 + 50);
  }
}

// Window resize listener for Page 8 map lines
window.addEventListener('resize', () => {
  if (currentPage === 8) {
    drawDreamMapLines();
  }
});
