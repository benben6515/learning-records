# System Design Resources

## Knowledge

- **ByteByteGo Big Archive — System Design (2025 edition, 442 pp)**
  The course's visual companion — 200+ one-pager explainers from ByteByteGo (Alex Xu's team). Lessons cite exact pages, e.g. the System Design Topic Map (p.162), Top 20 System Design Concepts (p.134) — page numbers refer to the 2025 edition. It is a **magazine archive, not a curriculum** — read the cited pages, never cover-to-cover; ~40% is off-topic (AI stacks, career lists). `reference/interview-blueprint.html` keeps the page index for Phase 1. Public access: every post is free on [blog.bytebytego.com](https://blog.bytebytego.com), searchable by article title (the index in the reference sheet lists titles + pages for exactly this). ByteByteGo's free official archive PDF direct link is the [2023 edition](https://assets.bytebytego.com/ByteByteGo-Big-Archive-System-Design-2023.pdf) — an older compilation, so page numbers differ from our citations; later editions (incl. 2025) circulate via the [ByteByteGo newsletter](https://bytebytego.com).
- [System Design Primer (donnemartin, GitHub)](https://github.com/donnemartin/system-design-primer)
  The canonical open-source interview-prep repo. Its step-by-step guide is the origin of our 4-step blueprint. Use as: the spine reference — every lesson maps to a section here.
- [ByteByteGo blog](https://blog.bytebytego.com/)
  Alex Xu's newsletter — the living version of the archive PDF. Use for: staying current; the archive pages usually exist here as full posts.
- *System Design Interview — An Insider's Guide, Vol. 1* (Alex Xu, 2020)
  The book behind ByteByteGo. Chapters 2–4 (scaling from millions of users, estimation, the framework) are exactly our Phase 1. Use as: the paid deepening when the archive's one-pagers feel too thin.
- *Designing Data-Intensive Applications* (Martin Kleppmann, O'Reilly)
  The serious reference under storage, replication, consistency, and batch/stream processing. Use as: chapter-level reading (ch. 5–6 replication/partitioning) once Phase 1 reaches sharding — not a cover-to-cover read yet.
- [Latency Numbers Every Programmer Should Know](https://colin-scott.github.io/personal_website/react_interactive.html) (interactive; original: Jeff Dean, Google)
  The orders-of-magnitude table (L1 cache → disk seek → cross-datacenter RTT). Use for: L02 estimation drills; the numbers every estimation answer stands on.
- [Google SRE Book](https://sre.google/books/) (free online)
  Ops literacy for Phase 5 — SLIs/SLOs, load balancing in practice, "four golden signals." Use as: the "what does production actually look like" supplement.
- [High Scalability](http://highscalability.com/)
  Long-running blog of real-world architecture write-ups (the "stuff that scales" source). Use for: case-study color beyond the archive's Netflix/Airbnb/Instagram pages.

## Wisdom (Communities)

- [Hacker News](https://news.ycombinator.com/)
  Where architecture decisions get argued by people who run them. Use for: "how does X scale at Y company" threads, postmortems, and stress-testing opinions you form here.
- [r/softwarearchitecture](https://www.reddit.com/r/softwarearchitecture/)
  Practitioner discussion — trade-off debates, design reviews, "critique my architecture" posts. Use for: posting your own practice designs for real feedback.
- [Blind (teamblind.com)](https://www.teamblind.com/)
  Anonymous professional network; the largest body of recent interview data points (which round asked what, which level maps to which bar). Use for: calibrating interview expectations; skim, don't marinate.
- [ByteByteGo on YouTube](https://www.youtube.com/@ByteByteGo)
  Animated versions of most archive pages. Use for: pre-reading orientation when a topic feels cold — then come back to the lesson.

## Gaps

- **Mock-interview practice** (interviewing.io, Pramp, or a peer) — the method is spoken; add a real mock loop at the start of Phase 4. Decide budget then.
- **Spaced-repetition deck** (Anki) for the estimation numbers and building-block trade-off tables — decide when L02 ships and the table surface stabilizes.
- **Company-specific design guides** (systemdesignfightclub, hello-interview) — evaluate when Phase 4 case studies begin.
- A second estimation source with worked examples — validate against Alex Xu Vol. 1 ch. 3 when it arrives.
