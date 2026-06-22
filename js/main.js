'use strict';

// ─── 1. DARK MODE ──────────────────────────────────────────
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon   = document.getElementById('theme-icon');
  if (!toggle) return;

  const saved       = localStorage.getItem('storycast-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme       = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(theme, toggle, icon);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next, toggle, icon);
    localStorage.setItem('storycast-theme', next);
    const region = document.getElementById('theme-announcement');
    if (region) region.textContent = 'Switched to ' + next + ' mode';
  });
}

function applyTheme(theme, toggle, icon) {
  document.documentElement.setAttribute('data-theme', theme);
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
}

// ─── 2. MOBILE MENU ────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.classList.toggle('site-nav__toggle--open');
    nav.classList.toggle('site-nav--open');
    if (!open) {
      const first = nav.querySelector('a');
      if (first) first.focus();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('site-nav__toggle--open');
      nav.classList.remove('site-nav--open');
      toggle.focus();
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('site-nav__toggle--open');
      nav.classList.remove('site-nav--open');
    });
  });
}

// ─── 3. BACK TO TOP ────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    window.scrollY > 400 ? btn.removeAttribute('hidden') : btn.setAttribute('hidden', '');
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const main = document.getElementById('main-content');
    if (main) main.focus({ preventScroll: true });
  });
}

// ─── 4. STORY FILTER ───────────────────────────────────────
function initStoryFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card-container');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      let visible = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.type === filter;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      const region = document.getElementById('filter-announcement');
      if (region) {
        region.textContent = 'Showing ' + visible + (filter === 'all' ? '' : ' ' + filter) + (visible === 1 ? ' story' : ' stories');
      }
    });
  });
}

// ─── 5. SCROLL ANIMATIONS ──────────────────────────────────
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('animated'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ─── 6. PLAYBACK SPEED ─────────────────────────────────────
function initSpeedControls() {
  const speedBtns = document.querySelectorAll('.speed-btn');
  const media     = document.querySelector('.story__audio, .story__video');
  if (!speedBtns.length || !media) return;

  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      media.playbackRate = parseFloat(btn.dataset.speed);
      speedBtns.forEach(b => {
        b.classList.remove('speed-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('speed-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      const status = document.getElementById('player-status');
      if (status) status.textContent = 'Speed set to ' + btn.dataset.speed + '×';
    });
  });
}

// ─── 7. TRANSCRIPT SYNC ────────────────────────────────────
function initTranscriptSync() {
  const media      = document.querySelector('.story__audio, .story__video');
  const transcript = document.getElementById('live-transcript');
  if (!media || !transcript) return;

  const entries = transcript.querySelectorAll('[data-start]');
  if (!entries.length) return;

  media.addEventListener('timeupdate', () => {
    const t = media.currentTime;
    entries.forEach(entry => {
      const start = parseFloat(entry.dataset.start);
      const end   = parseFloat(entry.dataset.end);
      if (t >= start && t < end) {
        if (!entry.classList.contains('transcript__entry--active')) {
          entry.classList.add('transcript__entry--active');
          entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        entry.classList.remove('transcript__entry--active');
      }
    });
  });
}

// ─── 8. NOW PLAYING LIVE REGION ────────────────────────────
function initNowPlaying() {
  const media  = document.querySelector('.story__audio, .story__video');
  const region = document.getElementById('player-status');
  if (!media || !region) return;

  media.addEventListener('play',    () => { region.textContent = 'Now playing'; });
  media.addEventListener('pause',   () => { region.textContent = 'Paused'; });
  media.addEventListener('ended',   () => { region.textContent = 'Finished'; });
  media.addEventListener('waiting', () => { region.textContent = 'Loading…'; });
}

// ─── 9. KEYBOARD SHORTCUTS ─────────────────────────────────
function initKeyboardShortcuts() {
  const media = document.querySelector('.story__audio, .story__video');
  if (!media) return;

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        media.paused ? media.play() : media.pause();
        break;
      case 'm':
      case 'M':
        media.muted = !media.muted;
        const region = document.getElementById('player-status');
        if (region) region.textContent = media.muted ? 'Muted' : 'Unmuted';
        break;
      case 'f':
      case 'F':
        if (media.tagName === 'VIDEO') {
          if (document.fullscreenElement) document.exitFullscreen();
          else media.requestFullscreen();
        }
        break;
      case 'ArrowLeft':
        if (document.activeElement === media) media.currentTime = Math.max(0, media.currentTime - 5);
        break;
      case 'ArrowRight':
        if (document.activeElement === media) media.currentTime = Math.min(media.duration, media.currentTime + 5);
        break;
    }
  });
}

// ─── 10. SHARE BUTTON ──────────────────────────────────────
function initShare() {
  const btn = document.getElementById('share-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const data = { title: document.title, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (e) { if (e.name !== 'AbortError') console.warn(e); }
    } else {
      try {
        await navigator.clipboard.writeText(data.url);
        const orig = btn.textContent;
        btn.textContent = '✓ Link copied!';
        setTimeout(() => { btn.textContent = orig; }, 2500);
      } catch (e) { console.warn(e); }
    }
  });
}

// ─── 11. READING TIME ──────────────────────────────────────
function initReadingTime() {
  const transcript = document.getElementById('live-transcript');
  const display    = document.getElementById('reading-time');
  if (!transcript || !display) return;

  const words   = transcript.textContent.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  display.textContent = minutes + ' min read';
}

// ─── 12. SMOOTH SCROLL ─────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

// ─── INIT ALL ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initBackToTop();
  initStoryFilter();
  initScrollAnimations();
  initSpeedControls();
  initTranscriptSync();
  initNowPlaying();
  initKeyboardShortcuts();
  initShare();
  initReadingTime();
  initSmoothScroll();
});