# DOGFOOD 2026: 5-Minute Demo Script

**Speaker:** Shriyash (Frontend Lead)
**Target Audience:** Hackathon Judges
**Environment:** `docker compose up` (Wi-Fi OFF)

---

## 0:00 - 1:00 | Introduction & The Offline-First Gallery
**Action:** Open `http://localhost:8080/projects` in the browser. 
**Talk Track:**
- "Welcome to DOGFOOD 2026. What you are looking at is a completely self-hostable, air-gapped hackathon platform. Right now, my Wi-Fi is completely disabled."
- "This is our Public Gallery. It is a React Server Component that streams in project data instantly using Suspense boundaries. Notice the typography—we don't rely on Google Fonts or CDNs. Every asset, including 'Syne' and 'JetBrains Mono', is physically bundled into our Docker image."
- "You can see the seeded projects here, including 'Glass Signal' and 'Deep Compass'. The entire design language is driven by our strict 'Obsidian Kinetic' Tailwind v4 token system."

## 1:00 - 2:00 | Participant Flow & Deadline Enforcement
**Action:** Click "Submit Project" in the navigation bar. Try to submit as a Participant.
**Talk Track:**
- "If I log in as a participant and attempt to submit a new project, watch what happens."
- *[Demonstrate inline rejection]*
- "The event deadline is strictly enforced by the PostgreSQL database clock, not the frontend. We don't just hide the submit button; the backend rejects the POST request with a raw 4xx error. This guarantees zero late submissions."

## 2:00 - 3:00 | The Judge Experience & Isolation
**Action:** Log in as `judge_a` and navigate to `/judge/dashboard`.
**Talk Track:**
- "Now, I'll switch hats and log in as Judge Alpha. This is the Judge Console."
- "I only see the specific projects assigned to me. If I try to manually modify the URL to fetch Judge Beta's scores, the backend Policy layer blocks me with a 403 Forbidden."
- *[Click on a project to score]*
- "This is our double-blind scoring form. It's fully keyboard accessible and semantic. When I submit, my k-anonymized scores are cryptographically bound to my session."

## 3:00 - 4:00 | The Organizer Command Center
**Action:** Log in as `org_admin` and navigate to `/organizer/dashboard`.
**Talk Track:**
- "Finally, let's look at the Organizer Command Center. Notice our dynamic `SubNav` highlighting exactly where we are."
- *[Click 'Assignments']* "Here we manage load-balancing. Our UI visually flags any conflict-of-interest overrides, like if a judge is recused from a specific team."
- *[Click 'Results']* "This is our normalized leaderboard. Because judges have different baseline severities, our backend calculates Z-scores with shrinkage. The UI immediately highlights high-variance flags and incomplete quorums. We can also click here to export the raw CSV."

## 4:00 - 5:00 | Append-Only Audit & Conclusion
**Action:** Click 'Audit Log'.
**Talk Track:**
- "Hackathons require absolute trust. This is our Append-Only Audit Viewer. It acts as a cryptographic ledger."
- "Every score override or quota update creates a hash chain. Our frontend elegantly parses this into a terminal-style UI, proving that no UPDATE or DELETE grants exist in the database."
- "In 48 hours, we built an offline-first, mathematically robust, and accessible platform. Thank you."
