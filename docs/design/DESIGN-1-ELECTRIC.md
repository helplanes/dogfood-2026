# DOGFOOD 2026 Design System & UI Guidelines

This document serves as the single source of truth for the visual system and shared UI components for the DOGFOOD 2026 Portal. 
**Frontend Team (Shriyash, Nihal, Prajwal):** Please follow these design tokens and guidelines when building your assigned pages to ensure a consistent user experience.

## 1. Design Tokens (Tailwind) - "Electric Editorial" Theme

All colors are implemented as CSS variables in `src/app/globals.css` and mapped to Tailwind classes. Do not use hardcoded hex values in your components.

### Colors
*   **Background:** `--color-surface` (`#f9f9ff`)
*   **Foreground (Text):** `--color-on-surface` (`#111827`)
*   **Card:** `--color-surface-container-lowest` (`#ffffff`)
*   **Card Foreground:** `--color-on-surface` (`#111827`)
*   **Primary:** `--color-primary` (`#ff4d26`) - Electric sunset flame accents.
*   **Primary Foreground:** `--color-on-primary` (`#ffffff`)
*   **Secondary:** `--color-secondary` (`#5c5d72`)
*   **Secondary Foreground:** `--color-on-secondary` (`#ffffff`)
*   **Muted:** `--color-surface-container` (`#e9edff`)
*   **Muted Foreground:** `--color-on-surface-variant` (`#43474e`)
*   **Border:** `--color-outline-variant` (`#c4c6d0`)
*   **Error:** `--color-error` (`#ba1a1a`)
*   **Error Foreground:** `--color-on-error` (`#ffffff`)

### Typography & Spacing
*   **Font (Display/Headings):** Syne
*   **Font (Body):** Inter
*   **Font (Mono):** JetBrains Mono
*   **Scale:** Use default Tailwind text sizes, adjusted to our line-heights (Display: 1.05, Headings: 1.15, Body: 1.55).
*   **Corner Radius:** 
    *   `rounded-sm` (8px)
    *   `rounded-md` (12px)
    *   `rounded-lg` (16px)
    *   `rounded-xl` (20px)

---

## 2. Shared Components (`src/components/ui/`)

Shriyash owns the creation of these components. Nihal and Prajwal must import and use these instead of building custom UI elements.

### Button (`<Button>`)
*   **Primary:** Solid `bg-primary`, `text-primary-foreground`, hover opacity reduction.
*   **Secondary:** Solid `bg-secondary`, `text-secondary-foreground`.
*   **Outline:** Transparent background, `border border-border`, `text-foreground`.
*   **Disabled:** Opacity 50%, `cursor-not-allowed`.
*   **Focus State:** Must have a clear `focus-visible:ring` for keyboard navigation.

### Input (`<Input>`)
*   Standard HTML input styled with `border-border`, `bg-background`, `rounded-sm`.
*   **Focus State:** `focus:ring-2 focus:ring-primary focus:border-transparent`.
*   **Error State:** Red border, accompanied by a small `text-error` helper text below.

### Gallery Card (`<GalleryCard>`)
*   Bordered container (`border border-border rounded-lg bg-card`).
*   Displays `title` (bold, large, Syne font), `summary` (muted, line-clamped to 2 lines), and `track`/`teamName` as small pill badges (`bg-muted`).
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
