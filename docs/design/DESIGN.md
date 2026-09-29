# DOGFOOD 2026: Design System & UI Guidelines

**To: Nihal (Participant/Auth flows) & Prajwal (Landing Page/Help)**  
**From: Shriyash (Frontend Lead)**

We are standardizing the entire DOGFOOD 2026 portal on the **Obsidian Kinetic / Editorial Serif** design language I developed for the Public Gallery and Judge/Organizer consoles. 

Please use the following Tailwind utility classes and component patterns so your pages seamlessly match the rest of the application. 

---

## 1. Global Setup & Background

Every root page container must use this dark Obsidian base setup to ensure text anti-aliasing and selection colors match:

```html
<div className="min-h-screen bg-[#0c0e13] text-stone-100 antialiased selection:bg-[#fe330a]/30 selection:text-white font-sans flex flex-col">
  {/* Content here */}
</div>
```

---

## 2. Color Palette

*   **App Background:** `#0c0e13` (Deep Obsidian)
*   **Card/Surface Backgrounds:** `#11141c` (Elevated) or `#141824` (Hover/Active)
*   **Primary Accent:** `#fe330a` (High-Voltage Crimson)
*   **Borders:** `border-stone-800` or `border-stone-800/80`
*   **Text (Primary):** `text-white`
*   **Text (Body/Secondary):** `text-stone-400`
*   **Text (Metadata/Muted):** `text-stone-500`

---

## 3. Typography Stack

We use three distinct typographic voices. 

### A. Display Headings (font-serif)
Use this for all page titles and massive hero text (Prajwal, use this on the landing page). It pairs normal serif text with an italicized `#fe330a` phrase.
```html
<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
  Built from Scratch. <br />
  <span className="italic font-serif text-[#fe330a]">Shipped in 48 Hours.</span>
</h1>
```

### B. Metadata & Data (font-mono)
Use this for technical data, numbers, tags, and small utility text. Always use uppercase and wide tracking.
```html
<span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-stone-500">
  LATENCY BENCHMARK
</span>
```

### C. Body Copy (font-sans)
Use for standard paragraphs, project descriptions, and help text.
```html
<p className="text-sm md:text-base font-sans text-stone-400 leading-relaxed">
  Explore verified open-source prototypes and autonomous neural networks...
</p>
```

---

## 4. Component Library (Copy-Paste Ready)

### Primary Call-to-Action Button
```html
<button className="px-5 py-3 rounded-xl bg-[#fe330a] hover:bg-[#ff4922] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#fe330a]/25 flex items-center justify-center gap-2">
  Submit Project &rarr;
</button>
```

### Secondary / Outline Button
```html
<button className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono font-medium border border-stone-700 transition-colors">
  View Guidelines
</button>
```

### Standard Elevated Card
Used for project cards, auth boxes, or dashboard panels.
```html
<div className="p-6 md:p-8 rounded-2xl bg-[#11141c] border border-stone-800 shadow-xl">
  {/* Card Content */}
</div>
```

### Form Input (For Nihal's Auth / Participant Flows)
All inputs must use this exact dark styling.
```html
<div className="space-y-2">
  <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400">
    Email Address
  </label>
  <input 
    type="email" 
    placeholder="participant@example.com"
    className="w-full px-4 py-3 bg-[#0c0e13] border border-stone-800/80 rounded-xl text-sm font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-[#fe330a] transition-colors"
  />
</div>
```

### Tags / Badges
**Accent Tag:**
```html
<span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#fe330a]/15 text-[#fe330a] border border-[#fe330a]/30">
  GenAI Track
</span>
```
**Neutral Tag:**
```html
<span className="px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold bg-stone-800 text-stone-300 border border-stone-700">
  Team Nova
</span>
```

### Status / Indicator Pill
Good for live status indicators.
```html
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141822] border border-stone-800 text-[11px] font-mono text-stone-400">
  <span className="h-1.5 w-1.5 rounded-full bg-[#fe330a] animate-pulse" />
  <span>STAGE 03 ACTIVE</span>
</div>
```

---

## 5. Notes on Responsive Design
- Always use `md:` or `lg:` prefix utilities for padding, font sizing, and grid layouts.
- Cards typically go from `p-4` (mobile) to `p-6 md:p-8` (desktop).
- Use `flex-col md:flex-row` for responsive alignments.
