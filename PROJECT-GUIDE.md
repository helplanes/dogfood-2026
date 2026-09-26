# DOGFOOD 2026: The Complete Plain-English Guide

Written for everyone on the team, including people who don't write code.
Last updated: 26 Sep 2026. Facts come from the event website and its official spec (`spec.md`, `run.py`, `example.dogfood.toml`). Anything I am unsure about is marked **(unconfirmed)**.

---

## 1. The hackathon in one minute

**What it is.** DOGFOOD is a 72-hour online hackathon run by *Hackathon Raptors*. Every team builds the **same product**: a website that runs *other* hackathons. People sign up, form teams, submit projects, judges score them, and winners are announced.

**Why "dogfood"?** "Eating your own dog food" means using your own product. Here, the platform we build is the one that will judge us.

**The prize twist.** The 1st-place platform will actually be **used by the organizers** for their real events for years. We keep ownership; it stays open source.

| Fact | Detail |
|---|---|
| Starts | Fri 25 Sep 2026, 18:00 UTC |
| Ends (code freeze) | Mon 28 Sep 2026, 18:00 UTC |
| Judging | 28 Sep to 8 Oct |
| Winners | Fri 9 Oct 2026 |
| Write-up contest closes | Sun 5 Oct, 18:00 UTC |
| Team size | 1 to 4 |
| Total prize pool | **$2,500 USD** (the site says USD; the ₹ figure in the first text you pasted does not match, so trust the website and double-check on Discord) |
| Prizes | 1st $800, 2nd $500, 3rd $350, 4th $200, 5th $150, Best Judging Engine $100, Write-Up Quest 4 x $100 |
| AI tools | Allowed and expected |
| Cost | Free |

**Time reality check.** Today is 26 Sep. Roughly a day of the 72 hours is already gone. That is why the plan below is strict about *what to build first*.

---

## 2. What we are building, in everyday words

Think of a **school science fair**, but online:

1. The **organizer** (fair coordinator) creates the fair: dates, categories ("tracks"), prizes.
2. **Participants** (students) join teams using a shared invite link and submit their project (title, description, pictures, links). They can edit until the deadline, then the door locks.
3. Anyone can browse the **public gallery** of projects.
4. **Judges** get invited, are assigned projects, and score each one using a **weighted scorecard** (e.g. "Innovation counts 40%, Quality 30%...").
5. Some judges are harsh and some are generous, so we **normalize** scores to make them comparable (see section 6).
6. The organizer sees a **progress dashboard**, exports **spreadsheets (CSV)**, and publishes results.
7. Optionally the **public votes** (with protection against cheating).
8. Optionally the platform issues **certificates** and has an **API** other software can use.

---

## 3. The four tiers (levels), explained

Everyone builds the same thing. Teams are scored on **how many levels they finish and how correctly**. A level only counts if every level below it is solid.

| Tier | Nickname | In plain words | Checked by the robot? | Our priority |
|---|---|---|---|---|
| **T1** | Core | Log in, roles, create events, form teams, submit projects, deadline locks, public gallery | Yes (3 checks) | **Must-have. Without T1 we are not judged at all.** |
| **T2** | Judging | Assign judges, weighted scorecards, judges can't peek at each other, progress dashboard, fair-scoring math, CSV export | Yes (4 checks) | **Must-have. This is where the real points are.** |
| **T3** | Public | Community voting, comments, hidden results, shuffled ballots, anti-cheating | No, read by human judges | Stretch |
| **T4** | Stretch | API + webhooks, certificates, signed judge records, embeddable widget, bulk import/export | No, read by human judges | Only small pieces if time remains |

**Golden rule from the organizers:** "A clean T2 beats a broken T4."

---

## 4. How we will be graded

Judges give a 0-5 score in four categories, weighted:

| Category | Weight | What it really means (layman) |
|---|---|---|
| Tier Completion & Correctness | **40%** | How high on the ladder, *proven by the robot*, not by our claims |
| Judging Integrity | **25%** | Can judges cheat/peek? Is the fair-scoring math written down and defensible? Is there a readable history of who did what? |
| Adoptability & Operability | **20%** | Could the organizers run it on Monday? One command to start, sample data included, docs a stranger can follow |
| Code Quality & Innovation | **15%** | Clean code, a database design worth defending, clever ideas |

**Bonuses** (only break ties, don't change the score; they also decide the "Best Judging Engine" prize):

| Bonus | Effort | Plain words |
|---|---|---|
| Normalization Proof | Hard | Show, using the sample data, how fair-scoring math changes the ranking |
| Pairwise Mode | Hard | Judges pick "which of these two is better", and math builds a ranking (Bradley-Terry) |
| Threat Model | Medium | A written document: how could people cheat, and how do we stop them |
| API First | Medium | Every button in the UI also works as a documented programmatic API |

**Our plan:** Normalization Proof first (it overlaps T2 work), then Threat Model (mostly writing), then API docs if time remains.

---

## 5. The automatic checker (the "robot")

The organizers give us a small program, `run.py`. It visits our running website and makes **only 7 requests**. It never logs in; we hand it ready-made "passes" (session cookies) in a config file `.dogfood.toml`. Then it prints PASS/FAIL.

| # | Tier | What the robot tries | What must happen | Traps to avoid |
|---|---|---|---|---|
| 1 | T1 | Open the gallery with no login | Page loads (200) | Gallery must not require login |
| 2 | T1 | Look for sample project titles on the gallery page | Titles appear **in the page's HTML** | The page must be built by the server. A page that fills in later using JavaScript will fail |
| 3 | T1 | Participant tries to submit a project (event deadline in the sample data is already past) | Refused with a 4xx error | Don't answer with a "redirect to somewhere"; the robot follows it and sees a success page |
| 4 | T2 | Judge A reads their own scores | Allowed (200) | |
| 5 | T2 | Judge B tries to read Judge A's scores | Refused (401/403) | **The most common way good projects lose points.** Hiding it in the screen isn't enough; the server must refuse |
| 6 | T2 | A participant tries the judge area | Refused (401/403) | |
| 7 | T2 | Organizer downloads CSV | 200 and the first line has commas | |

Extra rules: a tier counts only if it and all lower tiers pass. We commit the report to the repo **even if some lines FAIL**; honesty is rewarded, and overclaiming is penalized.

**The robot is not the whole judging.** Humans also read our code, our docs and our 5-minute demo video.

---

## 6. Fair scoring, explained without math

**The problem.** Judge Priya gives everyone 9/10. Judge Sam gives everyone 4/10. A project that happened to get Priya is unfairly ahead.

**Our fix (normalization).** Compare each judge to *themselves*: "Is this project better than that judge's own average?" We convert every score into "how far above or below this judge's typical score", then average those. Priya's 9 and Sam's 4 both become "about average".

**Awkward cases hidden in the sample data (on purpose):**

| Trap | What it is | How we handle it |
|---|---|---|
| The "all fives" judge | One judge gave every project the same score, so there is no signal | Detect it, flag it in the dashboard, don't divide by zero, give that judge less weight |
| Unfinished batches | Some judges never finished; one project has 2 reviews, another has 5 | Show the number of reviews next to every result; don't crash; use smoothing so few-review projects aren't unfairly extreme |
| Duplicate submission | Same project submitted twice | Detect (similar title or same repository link), flag to the organizer, never silently delete |

**Assignment (who judges what).** Each project gets at least 3 judges. The system spreads work evenly, only assigns judges eligible for that track, and never assigns a judge to a team they belong to (conflict of interest). Organizers can override by hand.

Everything above gets written up in `JUDGING.md`, which the organizers explicitly grade.

---

## 7. The technology choice, in layman terms

**Recommended stack: TypeScript everywhere + PostgreSQL database, packaged with Docker.**

| Piece | What it is (analogy) | Why we picked it |
|---|---|---|
| **TypeScript** | The language. One language for the whole product, with a strict "spell-checker" for code | One language means AI agents and teammates can work on any part; catches mistakes early |
| **Node.js 22** | The engine that runs the code | Long-term supported, industry standard |
| **Next.js** | The framework that builds web pages on the server | Pages arrive fully built, which is exactly what the robot's check #2 needs |
| **PostgreSQL 16** | The database, an extremely reliable filing cabinet with strict rules | 30-year-old, trusted by banks; rules (like "one score per judge per project") are enforced by the database itself |
| **Drizzle** | Translator between code and database | Readable, reviewable SQL migrations, so upgrades are safe |
| **Zod + OpenAPI** | A rulebook describing every request and response | Gives us API documentation nearly for free (a bonus) |
| **Docker Compose** | A "moving box" containing everything | `docker compose up` = one command to start; works offline, exactly what the rules demand |
| **argon2id sessions** | Password locks and visitor wristbands | Standard, safe, and needs no outside login service (outside services are banned) |
| **Vitest** | Automated tests | Proves the rules hold |

**Why not others?** Go is tiny and fast but slower to build a rich judge console in ~45 hours. Java/Kotlin (Spring) is very "enterprise" but heavy and slow to iterate. Python/Django is quick but less unified. The organizers themselves advise "a boring stack you're fluent in beats an exciting one you're learning." **If your team is truly fluent in Go or Python, say so and we switch.**

**"Built to last" design choices:** business rules live in plain code separate from the web framework, so the framework could be swapped in five years; the database enforces integrity; every important action is written to a tamper-evident audit log; nothing depends on any outside company.

---

## 8. Table-wise breakdown of the whole product

### 8.1 Who can do what (roles)

| Ability | Visitor | Participant | Judge | Organizer | Admin |
|---|:-:|:-:|:-:|:-:|:-:|
| Browse public gallery | Yes | Yes | Yes | Yes | Yes |
| Create account / log in | Yes | n/a | n/a | n/a | n/a |
| Create/join team by invite link | No | Yes | No | Yes | Yes |
| Create/edit own project before deadline | No | Yes | No | Yes | Yes |
| Submit after deadline | No | **No (server-enforced)** | No | Override only | Override only |
| See own scores given | No | No | Yes | Yes | Yes |
| See other judges' scores | No | No | **No (server-enforced)** | Yes | Yes |
| See tracks they aren't assigned | n/a | n/a | **No** | Yes | Yes |
| See aggregate results | No | No | No | Yes | Yes |
| Read the audit log | No | No | No | Yes | Yes |
| Configure event, rubric, assignments | No | No | No | Yes | Yes |
| Manage users and system settings | No | No | No | No | Yes |

### 8.2 Feature list by tier

| Feature | Tier | Who uses it | Priority |
|---|---|---|---|
| Sign up, log in, sessions | T1 | Everyone | P0 |
| Roles and permission checks | T1 | System | P0 |
| Create event (dates, tracks, prizes) | T1 | Organizer | P0 |
| Team invite links | T1 | Participant | P0 |
| Project draft, edit, submit | T1 | Participant | P0 |
| Deadline enforcement | T1 | System | P0 |
| Public gallery: search and filter | T1 | Everyone | P0 |
| Judge invitations | T2 | Organizer | P0 |
| Assignment: manual/batch/automatic | T2 | Organizer | P0 |
| Weighted rubric builder | T2 | Organizer | P0 |
| Judge scoring console | T2 | Judge | P0 |
| Backend role isolation | T2 | System | P0 |
| Judge progress dashboard | T2 | Organizer | P0 |
| Score normalization | T2 | System | P0 |
| CSV export at each stage | T2 | Organizer | P0 |
| Results publishing | T2 | Organizer | P1 |
| Community voting (quadratic or one-person-one-vote) | T3 | Public | P2 |
| Comments | T3 | Public | P2 |
| Hidden results during voting | T3 | System | P2 |
| Shuffled ballot order | T3 | System | P2 |
| Rate limits, duplicate detection | T3 | System | P2 |
| Audit trail viewer | T3 (also helps T2 integrity score) | Organizer | P1 |
| Published OpenAPI spec | T4/Bonus | Developers | P2 |
| Webhooks | T4 | Developers | P3 |
| Certificates, signed judge records | T4 | Organizer | P3 |
| Embeddable gallery widget | T4 | Public | P3 |
| Bulk import/export | T4 | Organizer | P3 |

P0 = required for our claimed tiers; P1 = strongly wanted; P2 = if ahead of schedule; P3 = only if everything else is finished.

### 8.3 Screens (pages) we will build

| Screen | Audience | Tier |
|---|---|---|
| Landing + event page | Public | T1 |
| Gallery (search, filter by track/tag) | Public | T1 |
| Project detail page | Public | T1 |
| Login / sign up | All | T1 |
| My team (invite link, members) | Participant | T1 |
| Project editor (draft, submit) | Participant | T1 |
| Event setup (dates, tracks, prizes) | Organizer | T1 |
| Rubric editor (criteria and weights) | Organizer | T2 |
| Judge management + assignment board | Organizer | T2 |
| Judge console (my assigned projects, scoring form) | Judge | T2 |
| Progress dashboard | Organizer | T2 |
| Results and normalization view (raw vs normalized) | Organizer | T2 |
| Exports page | Organizer | T2 |
| Audit log viewer | Organizer | T2/T3 |
| Voting ballot, comments | Public | T3 |

### 8.4 Data tables (the "filing cabinets")

| Table | Holds | Key rules the database enforces |
|---|---|---|
| users | Name, email, password hash, global role | Unique email |
| sessions | Login "wristbands", expiry | Token unique, expires |
| events | Name, dates, submission deadline, status | Deadline stored in UTC |
| tracks | Categories inside an event | Belong to one event |
| prizes | Prizes per event/track | |
| teams | Team name, invite code | Unique invite code |
| team_members | Who is in which team | One row per person per team |
| projects | Title, tagline, description, links, tags, track, status (draft/submitted) | One team, one track |
| project_media | Thumbnail and gallery images | Files stored on local disk |
| judges | Judge profile, eligible tracks | |
| assignments | Which judge reviews which project | Unique judge+project; no conflicts of interest |
| rubrics / rubric_criteria | Scorecard and weights | Weights must total 100 |
| scores | One judge's score per criterion per project | **Exactly one per judge+project+criterion** |
| normalized_results | Computed fair scores + review counts | Recomputable at any time |
| votes (T3) | Public votes | One per voter (or budget for quadratic) |
| comments (T3) | Public comments | |
| audit_log | Append-only history of important actions | Hash-chained so tampering is detectable |
| webhooks, api_keys (T4) | Integrations | |

### 8.5 API groups (programmatic doors)

| Area | Example purpose | Who may call |
|---|---|---|
| /api/v1/auth | Log in/out, sessions | Public |
| /api/v1/events, tracks, prizes | Manage events | Organizer/Admin (reads public) |
| /api/v1/teams | Create/join | Participant |
| /api/v1/projects | CRUD + submit | Participant (own); reads public |
| /api/v1/judges, assignments | Invite/assign | Organizer |
| /api/judge/scores | Read/write own scores | Judge (own only) |
| /api/v1/results | Aggregates | Organizer |
| /api/export.csv (+ per-stage exports) | Spreadsheets | Organizer |
| /api/v1/votes, comments | Public layer | Depends on config |

### 8.6 Documents we must deliver

| File | Purpose |
|---|---|
| `README.md` | What it does, how to run, **honest limitations** |
| `ARCHITECTURE.md` | System design and why |
| `DATA-MODEL.md` | Database design, import/export |
| `JUDGING.md` | Assignment, scoring math, normalization, defended |
| `.dogfood.toml` | Tier claims and where things are |
| `acceptance-report.txt` | Robot output, committed as is |
| `LICENSE` | MIT or Apache-2.0 |
| `docker-compose.yml` | One-command start |
| `tests/` | Our own tests |
| 5-minute demo video | Create, submit, judge, publish |

### 8.7 Timeline (about 45 hours left)

| Window | Goal | Done when |
|---|---|---|
| Hours 0-3 | Setup, database, sample data loader, fixed test passes | Gallery shows sample titles; robot checks 1-2 pass |
| Hours 3-14 | **T1** | Robot checks 1-3 pass; humans can walk through signup to submit |
| Hours 14-30 | **T2** | Robot checks 4-7 pass; dashboard and normalization work on sample data |
| Hours 30-38 | Docs, tests, acceptance report | All five documents written |
| Hours 38-42 | Demo video | 5-minute lifecycle recorded |
| Buffer/stretch | T3 pieces, OpenAPI, threat model | Only after all above are green |

### 8.8 Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Ran out of time | Fail T1 = not judged | Strict tier order, robot green early |
| Judge isolation only in the UI | Automatic disqualification | Server-side policy + curl tests |
| Redirect used to deny access | Robot sees 200, fails | Return raw 401/403 |
| Client-rendered gallery | Check #2 fails | Server-render |
| Needs internet at runtime | Disqualified | Bundle fonts/assets, test with Wi-Fi off |
| Overclaiming tiers | Penalty | Claim only what the robot verifies |
| Merge conflicts between AI agents | Lost hours | Lanes and contracts in `AGENTS.md` |
| Copyrighted/pre-written code | Disqualification | Everything written after kickoff |

---

## 9. What I need from you

| # | Question | Why |
|---|---|---|
| 1 | Team size and skills? Comfortable with TypeScript? | Confirms the stack |
| 2 | Hours you can give each day | Sets scope |
| 3 | GitHub account / repo name | Public repo is mandatory |
| 4 | License: MIT (simplest) or Apache-2.0 (adds patent protection)? | Required |
| 5 | Docker Desktop installed and running? Python 3? | One-command start and running the robot |
| 6 | Confirm target: T1+T2 solid, T3 stretch, Normalization Proof bonus | Scope |
| 7 | OK to download `fixtures.json`, `run.py`, `example.dogfood.toml` into the repo? | The sample data and robot |
| 8 | Join the Discord and confirm the prize currency, submission form, and whether anything changed | Announcements live there |
| 9 | Keep notes for the Write-Up Quest ($400 across 4 winners) | Free extra prize chance |

---

## 10. Things not covered in the spec (do not guess)

- Exact submission form/link where we hand in the repo **(unconfirmed, check Discord)**.
- Whether multi-event support is required (spec talks about one event; our design supports several).
- Real prize currency (site says USD).
- The exact judging form the human judges use.

---

## 11. Glossary

| Term | Meaning |
|---|---|
| Tier | A level of completeness (T1 to T4) |
| Track | A category of projects inside an event |
| Rubric | The judges' scorecard |
| Normalization | Adjusting for harsh/generous judges |
| Role isolation | Each type of user can only touch their own stuff, enforced by the server |
| Backend / API | The server that answers requests; the source of truth |
| Frontend | What you see on the screen |
| Fixture | Ready-made sample data provided by the organizers |
| Seed | Loading that sample data into the database on startup |
| Docker / Compose | A box that packages everything so it starts with one command |
| CSV | A spreadsheet file |
| Audit log | An unchangeable history of important actions |
| Session cookie | A wristband proving you logged in |
| OpenAPI | A machine-readable manual of our API |
| Webhook | An automatic message another system receives when something happens |
| Bradley-Terry | Math that turns "A beat B" results into a ranking |
| Quadratic voting | Voting where extra votes on one thing cost more, reducing whales and spam |
| Sybil attack | One person pretending to be many voters |
