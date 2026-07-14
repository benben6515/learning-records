// ===== Shared JS for Greek Epics Series =====

function initGreekEpic() {
  // Build side nav from chapters
  const chapters = document.querySelectorAll('.chapter');
  const sideNav = document.getElementById('sideNav');
  if (sideNav && chapters.length) {
    chapters.forEach((ch) => {
      const num = ch.querySelector('.chapter-num');
      const title = ch.querySelector('.chapter-title');
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      dot.dataset.target = ch.id;
      dot.dataset.label = (num ? num.textContent.trim() : '') + ' ' + (title ? title.textContent : '');
      dot.addEventListener('click', () => ch.scrollIntoView({ behavior: 'smooth' }));
      sideNav.appendChild(dot);
    });
  }

  // TOC click navigation
  document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(item.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Intersection observer for reveal + active dot
  const dots = document.querySelectorAll('.nav-dot');
  const readingProgress = document.getElementById('readingProgress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const content = entry.target.querySelector('.chapter-content');
        if (content) content.classList.add('visible');
        const id = entry.target.id;
        dots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
        const num = entry.target.querySelector('.chapter-num');
        const title = entry.target.querySelector('.chapter-title');
        if (num && title && readingProgress) {
          readingProgress.textContent = num.textContent.trim() + ' · ' + title.textContent;
          readingProgress.classList.add('show');
        }
      }
    });
  }, { threshold: 0.4 });

  chapters.forEach(ch => observer.observe(ch));

  // Progress bar
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = pct + '%';
    });
  }

  // Hide reading progress at hero/finale
  const heroEl = document.getElementById('hero');
  const finaleEl = document.getElementById('finale');
  const edgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5 && readingProgress) {
        readingProgress.classList.remove('show');
      }
    });
  }, { threshold: [0.5] });
  if (heroEl) edgeObserver.observe(heroEl);
  if (finaleEl) edgeObserver.observe(finaleEl);
}
