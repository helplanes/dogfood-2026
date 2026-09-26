# DOGFOOD 2026 Design System & UI Guidelines

This document serves as the single source of truth for the visual system and shared UI components for the DOGFOOD 2026 Portal. 
**Frontend Team (Shriyash, Nihal, Prajwal):** Please follow these design tokens and guidelines when building your assigned pages to ensure a consistent user experience.

## 1. Design Tokens (Tailwind)

All colors are implemented as CSS variables in `src/app/globals.css` and mapped to Tailwind classes. Do not use hardcoded hex values in your components.

### Colors
*   **Background:** `--color-background` (`#ffffff`) - Main app background.
*   **Foreground (Text):** `--color-foreground` (`#020817`) - Primary text color.
*   **Card:** `--color-card` (`#ffffff`) - Background for cards and panels.
*   **Card Foreground:** `--color-card-foreground` (`#020817`) - Text inside cards.
*   **Primary:** `--color-primary` (`#0f172a`) - Primary buttons, active states, key highlights.
*   **Primary Foreground:** `--color-primary-foreground` (`#f8fafc`) - Text on primary elements.
*   **Secondary:** `--color-secondary` (`#f1f5f9`) - Secondary buttons, badges, subtle backgrounds.
*   **Secondary Foreground:** `--color-secondary-foreground` (`#0f172a`) - Text on secondary elements.
*   **Muted:** `--color-muted` (`#f1f5f9`) - Disabled states, inactive tabs.
*   **Muted Foreground:** `--color-muted-foreground` (`#64748b`) - Helper text, secondary labels.
*   **Border:** `--color-border` (`#e2e8f0`) - Dividers, inputs, card borders.
*   **Error (Semantic):** Red shades (e.g., `text-red-600`, `border-red-500`) for validation failures and destructive actions.

### Typography & Spacing
*   **Font:** System UI (`system-ui, -apple-system, "Segoe UI", sans-serif`). Do not import Google Fonts or external fonts.
*   **Scale:** Use default Tailwind text sizes (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`).
*   **Spacing:** Use default Tailwind spacing (`p-4`, `gap-4`, `mb-6`, etc.). Ensure 16px (`4` in Tailwind) padding inside standard cards.

---

## 2. Shared Components (`src/components/ui/`)

Shriyash owns the creation of these components. Nihal and Prajwal must import and use these instead of building custom UI elements.

### Button (`<Button>`)
*   **Primary:** Solid `bg-primary`, `text-primary-foreground`, hover opacity reduction.
*   **Secondary:** Solid `bg-secondary`, `text-secondary-foreground`.
*   **Outline:** Transparent background, `border border-input`, `text-foreground`.
*   **Disabled:** Opacity 50%, `cursor-not-allowed`.
*   **Focus State:** Must have a clear `focus-visible:ring` for keyboard navigation.

### Input (`<Input>`)
*   Standard HTML input styled with `border-border`, `bg-background`.
*   **Focus State:** `focus:ring-2 focus:ring-primary focus:border-transparent`.
*   **Error State:** Red border, accompanied by a small `text-red-600` helper text below.

### Gallery Card (`<GalleryCard>`)
*   Bordered container (`border border-border rounded-lg`).
*   Displays `title` (bold, large), `summary` (muted, line-clamped to 2 lines), and `track`/`teamName` as small pill badges (`bg-secondary`).
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

### Responsive Design
*   **Mobile-First:** Ensure all grids fall back to 1 column (`grid-cols-1`) on small screens, expanding to 2 or 3 (`md:grid-cols-2 lg:grid-cols-3`) on larger screens.
*   **Navigation:** Mobile navigation should remain accessible (avoid complex off-canvas menus if a simple stack works).

### Strict Rules (Must Follow for Scoring)
1.  **No External Assets:** No external images, CDNs, or hosted icon libraries (like FontAwesome). Use raw SVG paths inline if icons are absolutely necessary.
2.  **No Javascript-only Links:** All navigation must be native `<a>` tags or Next.js `<Link>` components so the site works without client-side JS.
3.  **Accessibility First:** Do not remove focus rings (`outline-none` must be paired with `focus-visible:ring`). Forms must have `<label>` elements.
