document.addEventListener('DOMContentLoaded', () => {
  const factEl = document.getElementById('fact');
  const infoEl = document.getElementById('info');
  const sourceEl = document.getElementById('source');
  const cardEl = document.getElementById('fact-card');
  const nextBtn = document.getElementById('next');
  const refreshBtn = document.getElementById('refresh');

  let facts = [];
  let lastIndex = -1;

  function setRandomBackground() {
    const images = [
      'assets/bg-pet-1.jpg',
      'assets/bg-pet-2.jpg',
      'assets/bg-pet-3.jpg',
      'assets/bg-pet-4.jpg',
      'assets/bg-pet-5.jpg',
      'assets/bg-pet-6.jpg',
      'assets/bg-pet-7.jpg',
      'assets/bg-pet-8.jpg',
      'assets/bg-pet-9.jpg',
      'assets/bg-pet-10.jpg',
      'assets/bg-pet-11.jpg',
      'assets/bg-pet-12.jpg',
      'assets/bg-pet-13.jpg',
      'assets/bg-pet-14.jpg',
      'assets/bg-pet-15.jpg',
      'assets/bg-pet-16.jpg',
      'assets/bg-pet-17.jpg',
      'assets/bg-pet-18.jpg',
      'assets/bg-pet-19.jpg',
      'assets/bg-pet-20.jpg',
      'assets/bg-pet-21.jpg',
      'assets/bg-pet-22.jpg',
      'assets/bg-pet-23.jpg',
      'assets/bg-pet-24.jpg',
      'assets/bg-pet-25.jpg',
      'assets/bg-pet-26.jpg',
      'assets/bg-pet-27.jpg',
      'assets/bg-pet-28.jpg',
      'assets/bg-pet-29.jpg',
      'assets/bg-pet-30.jpg',
      'assets/bg-pet-31.jpg',
      'assets/bg-pet-32.jpg',
      'assets/bg-pet-33.jpg',
      'assets/bg-pet-34.jpg',
      'assets/bg-pet-35.jpg',
      'assets/bg-pet-36.jpg',
      'assets/bg-pet-37.jpg',
    ];
    const chosen = images[Math.floor(Math.random() * images.length)];
    const url =
      typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL
        ? chrome.runtime.getURL(chosen)
        : chosen;
    // Subtle black overlay to tone the background down
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("${url}")`;
  }

  function pickRandom() {
    if (facts.length === 0) return null;
    let i = Math.floor(Math.random() * facts.length);
    if (facts.length > 1 && i === lastIndex) i = (i + 1) % facts.length;
    lastIndex = i;
    return facts[i];
  }

  function render(f) {
    if (!f) return;
    if (factEl) factEl.textContent = f.fact || '';
    if (infoEl) {
      infoEl.textContent = f.info || '';
      infoEl.style.display = f.info ? 'block' : 'none';
    }
    if (sourceEl) {
      sourceEl.textContent = f.source || '';
      sourceEl.style.display = f.source ? 'block' : 'none';
    }
    if (cardEl) cardEl.setAttribute('aria-busy', 'false');
  }

  function show() {
    render(pickRandom());
  }

  async function load() {
    if (cardEl) cardEl.setAttribute('aria-busy', 'true');
    try {
      const url =
        typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL
          ? chrome.runtime.getURL('facts.json')
          : 'facts.json';
      const res = await fetch(url, { cache: 'no-store' });
      facts = await res.json();
      show();
    } catch (e) {
      if (factEl) factEl.textContent = 'Unable to load facts.';
      if (cardEl) cardEl.setAttribute('aria-busy', 'false');
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', show);
  if (refreshBtn) refreshBtn.addEventListener('click', show);
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      show();
    }
  });

  setRandomBackground();
  load();
});
