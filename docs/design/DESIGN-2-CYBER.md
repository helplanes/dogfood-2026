# DOGFOOD 2026 Design System & UI Guidelines (Option 2)

This document serves as the single source of truth for the visual system and shared UI components for the DOGFOOD 2026 Portal. 
**Frontend Team (Shriyash, Nihal, Prajwal):** Please follow these design tokens and guidelines when building your assigned pages to ensure a consistent user experience.

## 1. Design Tokens (Tailwind) - "Cyber Pulse" Theme

All colors are implemented as CSS variables in `src/app/globals.css` and mapped to Tailwind classes. Do not use hardcoded hex values in your components.

### Colors
*   **Background:** `--color-surface` (`#051424`) - Deep obsidian background.
*   **Foreground (Text):** `--color-on-surface` (`#dbe3ee`)
*   **Card:** `--color-surface-container-low` (`#0d1c2d`)
*   **Card Foreground:** `--color-on-surface` (`#dbe3ee`)
*   **Primary:** `--color-primary` (`#00f0ff`) - Cyan telemetry pulse accents.
*   **Primary Foreground:** `--color-on-primary` (`#00363a`)
*   **Secondary:** `--color-secondary` (`#b1cbd0`)
*   **Secondary Foreground:** `--color-on-secondary` (`#1c3438`)
*   **Muted:** `--color-surface-container` (`#132334`)
*   **Muted Foreground:** `--color-on-surface-variant` (`#bfc8cf`)
*   **Border:** `--color-outline-variant` (`#40484d`)
*   **Error:** `--color-error` (`#ffb4ab`)
*   **Error Foreground:** `--color-on-error` (`#690005`)

### Typography & Spacing
*   **Font (Display/Headings/Body):** Space Grotesk
*   **Font (Mono):** JetBrains Mono
*   **Scale:** Use default Tailwind text sizes, adjusted to our line-heights (Display: 1.1, Headings: 1.2, Body: 1.5).
*   **Corner Radius (Tight Technical):** 
    *   `rounded-sm` (4px)
    *   `rounded-md` (6px)
    *   `rounded-lg` (8px)
    *   `rounded-xl` (12px)

---

## 2. Shared Components (`src/components/ui/`)

Shriyash owns the creation of these components. Nihal and Prajwal must import and use these instead of building custom UI elements.

### Button (`<Button>`)
*   **Primary:** Solid `bg-primary`, `text-primary-foreground`, hover opacity reduction.
*   **Secondary:** Solid `bg-secondary`, `text-secondary-foreground`.
*   **Outline:** Transparent background, `border border-border`, `text-primary`.
*   **Disabled:** Opacity 50%, `cursor-not-allowed`.
*   **Focus State:** Must have a clear `focus-visible:ring ring-primary` for keyboard navigation.

### Input (`<Input>`)
*   Standard HTML input styled with `border-border`, `bg-background`, `rounded-sm`.
*   **Focus State:** `focus:ring-2 focus:ring-primary focus:border-transparent`.
*   **Error State:** Red border, accompanied by a small `text-error` helper text below.

### Gallery Card (`<GalleryCard>`)
*   Bordered container (`border border-border rounded-lg bg-card`).
*   Displays `title` (bold, large, Space Grotesk font), `summary` (muted, line-clamped to 2 lines), and `track`/`teamName` as small pill badges (`bg-muted`).
*   Must be fully clickable or contain a clear primary link to the project details.

### Table (`<Table>`)
*   Full width, left-aligned headers.
*   Subtle bottom border on rows (`border-b border-border`).
*   Hover state on rows (`hover:bg-muted/50`) for data-dense dashboards (Organizer/Judge).

---

## 3. Layouts & Constraints

### App Shell
*   **Header:** Sticky top, `border-b`, contains the portal title and main navigation links (Gallery, Dashboard, etc.).
*   **Container:** Main content is wrapped in a centered container (`container mx-auto px-4 py-8`).

### Strict Rules (Must Follow for Scoring)
1.  **No External Assets:** No external images, CDNs, or hosted icon libraries (like FontAwesome). Use raw SVG paths inline if icons are absolutely necessary.
2.  **No Javascript-only Links:** All navigation must be native `<a>` tags or Next.js `<Link>` components so the site works without client-side JS.
3.  **Accessibility First:** Do not remove focus rings (`outline-none` must be paired with `focus-visible:ring`). Forms must have `<label>` elements.
