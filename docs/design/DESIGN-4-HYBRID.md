
# Design System Specification: Obsidian Kinetic — Simplified Hybrid Edition

**This is the CHOSEN design system for the DOGFOOD 2026 Portal.**

Philosophy: Keep Option 3's bold dark identity (obsidian canvas, electric orange-red accent, Syne uppercase headings) but apply Option 1's simple, readable card layout logic. First-time visitors should immediately understand where to look. Judges and organizers should never feel overwhelmed.

**Rule in one sentence:** Dark world outside, clean & simple inside the cards.

---

## 1. Color Palette & Tokens

### Canvas (Dark — the "world")

- `--color-background`: `#111318` — Obsidian foundation, used on the page background
- `--color-surface-low`: `#191c20` — Slightly lighter layer for nav/sidebar
- `--color-border-dark`: `rgba(255,255,255,0.08)` — Subtle dividers on dark surfaces

### Cards (Light — "content lives here")

- `--color-card`: `#ffffff` — Pure white card background. No inner dark boxes.
- `--color-card-foreground`: `#111318` — Dark text on white cards
- `--color-card-border`: `#e2e8f0` — Hairline crisp border around cards
- `--color-card-muted`: `#64748b` — Secondary text (summary, helper text) on cards

### Brand Accent (The identity)

- `--color-primary`: `#fe330a` — Electric orange-red. Used for CTAs, active states, hover borders
- `--color-primary-hover`: `#ff4d26` — Slightly lighter on hover
- `--color-on-primary`: `#ffffff` — White text on primary buttons

### Semantic Tokens

- `--color-success`: `#22c55e`
- `--color-warning`: `#f59e0b`
- `--color-info`: `#00f0ff`
- `--color-error`: `#ba1a1a`

---

## 2. Typography

- **Headings (H1–H3):** `Syne`, bold/black weight, uppercase, tight tracking (`-0.035em`)
- **Body & UI text:** `Geist` or `DM Sans`, regular weight, normal tracking
- **Monospace (badges, labels, code):** `JetBrains Mono`

**Type Hierarchy (Simple):**

- Page title: `text-3xl md:text-4xl font-black uppercase tracking-tight`
- Card title: `text-lg font-bold uppercase tracking-tight text-[#111318]`
- Card body: `text-sm text-slate-600 leading-relaxed line-clamp-2`
- Badge label: `text-xs font-mono uppercase tracking-wider`

---

## 3. Component Patterns (Simplified)

### Project Card (`<GalleryCard>`) — THE KEY SIMPLIFICATION

- **Background:** Pure white `#ffffff`, hairline border `#e2e8f0`
- **NO inner dark obsidian box.** No `01 // REPOSITORY RECON` text.
- **Structure (top to bottom):** Title → Summary (2 lines) → Track badge → Team badge → Repo link
- **Hover:** Border turns orange-red `#fe330a`. No lift, no glow shadow. Clean and subtle.
- **Corner radius:** `rounded-lg` (8px)

```
┌─────────────────────────────┐  ← white #ffffff, border #e2e8f0
│                             │
│  GLASS SIGNAL               │  ← font-black uppercase Syne
│  One line of what it does.. │  ← text-sm text-slate-600 line-clamp-2
│                             │
│  [Developer tools] [tm_01]  │  ← mono badges
│                             │
│  View Source →              │  ← #fe330a link
└─────────────────────────────┘
     ↑ on hover: border becomes #fe330a
```

### Button (`<Button>`)

- **Primary:** `bg-[#fe330a] text-white`, subtle glow on focus only (not always-on)
- **Secondary:** `bg-[#191c20] text-white`
- **Outline:** `border border-current text-current`
- **No hover scale animations.** Just color transitions. Keep it calm.

### Input (`<Input>`)

- White background, `#e2e8f0` border
- Focus: `ring-2 ring-[#fe330a]`
- Error: `border-[#ba1a1a]` + helper text below

### App Header (Navigation)

- Background: `#191c20` (dark, not pure obsidian — slightly warmer)
- Logo: Syne bold, white, uppercase
- Nav links: Mono, small, uppercase, white. Hover: `#fe330a`
- Border bottom: `rgba(255,255,255,0.08)`

---

## 4. Page Layout Rules

- **Container max-width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Gallery grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Card padding:** `p-5` — no more, no less
- **Page title area:** Dark background with title in white Syne + a muted subtitle in mono below it

---

## 5. What We Removed from Option 3 (Intentionally)

| Removed                                                            | Why                                                 |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| Inner dark obsidian box inside cards                               | Confusing — users do not know what it represents   |
| `01 // REPOSITORY RECON` eyebrow text in cards                   | Decorative noise — adds no information             |
| Always-on`shadow-[0_0_15px_rgba(254,51,10,0.4)]` glow on buttons | Looks cluttered when many buttons are on screen     |
| `hover:-translate-y-2` lift on cards                             | Distracting on a dense 3-column grid                |
| `animate-ping` telemetry dots on cards                           | Reserve for detail page only — too busy on gallery |

---

## 6. Strict Rules (Must Follow for Scoring)

1. **No External Assets:** No external images, CDNs, or hosted icon libraries. Use raw inline SVG if icons are needed.
2. **No JS-only navigation:** All links must be native `<a>` or Next.js `<Link>`.
3. **Accessibility:** Always pair `outline-none` with `focus-visible:ring`. Forms must have `<label>` elements.
4. **SSR:** Gallery page must be server-rendered with fixture project titles in the initial HTML.
