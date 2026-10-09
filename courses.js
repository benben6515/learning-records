/* ============================================================
   courses.js — the landing page's course registry
   Data + rendering for the cards in index.html (.cards grid).
   Loaded at the end of <body>; owns both the const and the
   render, so index.html carries no script of its own.

   To add a course:
     1. append one entry to COURSES (href + host line derive
        from `slug`; `icon` holds only the inner elements of a
        24x24 stroke SVG — the wrapper lives in the template)
     2. add a row to s/NOTES.md (the course registry)
   See DESIGN.md ("How to add a new card") for the full contract.
   ============================================================ */

const COURSES = [
  {
    slug: 'matt-pocock-skills',
    title: 'Matt Pocock Skills',
    desc: 'A slides deck walking through the engineering skills workspace and its workflows.',
    icon: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4"/><path d="M8 20h8"/>',
  },
  {
    slug: 'english',
    title: 'English',
    desc: 'Short daily drills for productive English fluency — speaking &amp; writing, B2 → C1.',
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  },
  {
    slug: 'loop-engineering',
    title: 'Loop Engineering',
    desc: 'Building a mental model of the loop that drives AI agents — harness, primitives, maker-checker &amp; autonomy levels.',
    icon: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  },
  {
    slug: 'backend-dev',
    title: 'Backend Fluency',
    desc: 'Frontend dev → full-stack on Node + TypeScript: HTTP, event loop, REST, SQL, auth, testing — no layer is magic.',
    icon: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01"/><path d="M7 16.5h.01"/>',
  },
  {
    slug: 'system-design',
    title: 'System Design',
    desc: 'Interview-ready system design — the 45-minute method, building blocks from caching to sharding, real case studies.',
    icon: '<rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/><path d="M12 7v3"/><path d="M6 17v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>',
  },
  {
    slug: 'scifi-terminal',
    title: 'Sci-Fi Terminal',
    desc: 'A spaceship-bridge terminal from off-the-shelf tools — split panes, glowing readouts, matrix rain; zero custom scripts.',
    icon: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M7 9l3 3-3 3"/><path d="M13 15h4"/>',
  },
];

const cards = document.querySelector('.cards');
if (cards) {
  cards.innerHTML = COURSES.map((c) => `
    <a class="card" href="/s/${c.slug}/">
      <div class="card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${c.icon}</svg>
      </div>
      <div class="card-body">
        <h2 class="card-title">${c.title}</h2>
        <p class="card-desc">${c.desc}</p>
        <p class="card-host">learning.benben.me/s/${c.slug}</p>
      </div>
    </a>`).join('');
}
