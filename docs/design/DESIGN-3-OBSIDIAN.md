# Design System Specification: Obsidian Kinetic (Hybrid Contrast Edition)

**Frontend Team (Shriyash, Nihal, Prajwal):** Please follow these design tokens and guidelines when building your assigned pages to ensure a consistent user experience. I (Shriyash) am setting this up as the global standard for our DOGFOOD 2026 Portal.

## Brand Identity & Aesthetic Overview
- **Visual Direction:** A high-contrast hybrid architectural layout pairing luminous white content cards with deep obsidian black telemetry modules, slate grey container tiers, and high-voltage kinetic red-orange accents.

---

## 1. Color Palette & Tokens (Tailwind CSS Variables)

All colors are implemented as CSS variables in `src/app/globals.css` and mapped to Tailwind classes.

### Canvas Foundations & Neutrals (Dark)
*   **Background:** `--color-surface` (`#111318`) - Obsidian Foundation
*   **Card Dark:** `--color-surface-container-lowest` (`#0c0e13`) - Deep Pitch Black
*   **Tier 1 Container:** `--color-surface-container-low` (`#191c20`)
*   **Tier 2 Container:** `--color-surface-container` (`#1d2024`)

### Hybrid White & Light Components
*   **Card Light:** `--color-surface-light` (`#ffffff`) - Pure White Card Backdrops
*   **Card Light Muted:** `--color-surface-light-muted` (`#f8f9fc`)
*   **Border Crisp:** `--color-surface-light-border` (`#e2e8f0`)

### Primary & Kinetic Brand Accents
*   **Primary:** `--color-primary` (`#fe330a`) - Electric Signal Orange / Sunset Fire
*   **Primary Hover:** `--color-primary-container` (`#ff4d26`)
*   **Primary Text:** `--color-on-primary` (`#ffffff`)

---

## 2. Typography System

*   **Primary Display & Headings:** `Geist` or `Syne`, sans-serif (tight kerning `-0.035em`)
*   **Body & Editorial Interface:** `Geist` or `DM Sans`
*   **Telemetry & Code:** `JetBrains Mono` or `Space Grotesk`

**Type Scale Hierarchy:**
- **Hero Title (`H1`):** `text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight`
- **Section Headers (`H2`):** `text-2xl md:text-3xl font-bold uppercase tracking-tight`
- **Sub-module Headers (`H3`):** `text-lg md:text-xl font-semibold`
- **Metric Big Numbers:** `text-3xl md:text-4xl font-extrabold tracking-tight tabular-nums`

---

## 3. Shared Components (`src/components/ui/`)

Nihal and Prajwal must import and use these instead of building custom UI elements.

### Button (`<Button>`)
*   **Primary:** Glowing primary button `bg-primary text-on-primary shadow-[0_0_15px_rgba(254,51,10,0.4)]`. Hover scale: `hover:scale-[1.02] active:scale-[0.98]`.
*   **Secondary:** `bg-surface-container text-white`.
*   **Focus State:** `focus-visible:ring-2 focus-visible:ring-primary`.

### Input (`<Input>`)
*   Standard HTML input styled with `border-surface-light-border bg-surface-light text-black`.
*   **Focus State:** `focus:ring-2 focus:ring-primary focus:border-transparent`.

### Project Card (`<GalleryCard>`)
*   **Background:** Crisp pure white (`bg-surface-light`) with hairline outline (`border border-surface-light-border`).
*   **Corner Radius:** `rounded-lg` (8px).
*   **Interactive State:** `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_10px_30px_rgba(254,51,10,0.12)] hover:border-primary`.

### Table & Status Indicators
*   **Status Dot:** Pulsing status dot using `relative flex h-2 w-2` with `animate-ping` ring.
*   **Master Tables:** `px-6 py-4` padding on cells.

---

## 4. Strict Rules (Must Follow for Scoring)
1.  **No External Assets:** No external images, CDNs, or hosted icon libraries (like FontAwesome).
2.  **No Javascript-only Links:** All navigation must be native `<a>` tags or Next.js `<Link>`.
3.  **Accessibility First:** Do not remove focus rings (`outline-none` must be paired with `focus-visible:ring`). Forms must have `<label>` elements.
