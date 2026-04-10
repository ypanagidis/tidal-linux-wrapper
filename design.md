# Design System Strategy: The Curated Canvas

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Canvas."**

This system moves away from the "utility-first" look of standard music players to embrace a high-end editorial aesthetic. We treat every album cover as a masterpiece in a digital gallery. The layout is driven by **intentional asymmetry** and **tonal depth** rather than rigid grids and lines. By leveraging wide margins and unconventional placement of typography, we create an experience that feels like a premium physical magazine-sophisticated, quiet, and deeply focused on the art of sound.

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, obsidian foundation (`background: #0e0e0e`), using a monochromatic spectrum to create "atmospheric" rather than "structural" containers.

*   **The "No-Line" Rule:** To maintain a premium feel, 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a tracklist section using `surface-container-low` should sit directly against a `surface` background. The shift in tone is the only divider needed.
*   **Surface Hierarchy & Nesting:** Think of the UI as a series of physical layers.
    *   **Level 0 (Base):** `surface` (#0e0e0e) for the main application background.
    *   **Level 1 (Sections):** `surface-container-low` (#131313) for sidebars or secondary panels.
    *   **Level 2 (Active Elements):** `surface-container-highest` (#262626) for active track highlights or floating menus.
*   **The "Glass & Gradient" Rule:** To provide visual "soul," use `Glassmorphism` for the playback bar. Utilize `surface-bright` at 60% opacity with a 20px backdrop-blur. For primary interactions, apply a subtle linear gradient from `primary` (#c6c6c7) to `primary-container` (#454747) to create a metallic, machined-aluminum finish.

## 3. Typography: The Editorial Voice
Typography is the primary driver of hierarchy in this design system. We pair the geometric elegance of **Manrope** with the functional precision of **Inter**.

*   **Display & Headline (Manrope):** Use `display-lg` for track titles in "Now Playing" views. Don't be afraid to let long titles wrap or use `headline-lg` with tight letter-spacing for an aggressive, modern look.
*   **Title & Body (Manrope):** `title-md` and `title-sm` are used for artist names and album titles, providing a clear, high-contrast path for the eye.
*   **Labels (Inter):** Use `label-md` and `label-sm` for technical metadata (e.g., sample rates, durations). The switch to Inter signals "data" versus "art," helping the user subconsciously filter information.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background to create a "recessed" effect. Conversely, place a `surface-container-high` element on `surface` to create a natural lift.
*   **Ambient Shadows:** For "floating" elements like album art in focus, use a shadow with a 40px blur, 0px offset, and 6% opacity of `on-surface`. This mimics natural ambient light rather than a digital "drop shadow."
*   **The "Ghost Border" Fallback:** If a container requires definition against a similar background, use a "Ghost Border": a 1px stroke of `outline-variant` at 15% opacity. Never use 100% opaque borders.
*   **Glassmorphism:** Floating overlays (like volume sliders or tooltips) should use `surface-variant` with a backdrop blur of 12px to soften the edges and integrate the element into the background.

## 5. Components

### Buttons
*   **Primary:** A pill-shaped (`full` roundedness) button. Use the `primary` to `primary-container` gradient. Text should be `on-primary` using `title-sm`.
*   **Tertiary/Icon:** Minimalist icons using `on-surface-variant`. On hover, the background shifts to `surface-container-highest`.

### Cards & Album Art
*   **The Hero Art:** Use `xl` (1.5rem) roundedness for album covers. Do not use borders. Use the **Ambient Shadow** rule to make the art "pop" from the background.
*   **Content Cards:** Use `md` (0.75rem) roundedness. No dividers. Separate the title and subtitle using a `4px` vertical gap (Spacing Scale).

### Lists (The "Breathable" List)
*   **Dividerless:** Forbid the use of line dividers between tracks.
*   **Spacing:** Use `16px` of vertical padding between items.
*   **States:** An active track should be indicated by a `surface-container-high` background with `md` roundedness, rather than a checkmark or icon.

### Input Fields & Search
*   **Search Bar:** Use `surface-container-lowest` with a `full` roundedness. The placeholder text should be `on-surface-variant`.
*   **Ghost Border:** Use the 15% opacity `outline-variant` to define the input area only when in focus.

### The Progress Bar
*   **Track:** `surface-container-highest`.
*   **Progress:** `primary` (or a gradient of `primary` to `tertiary` for a signature touch).
*   **Thickness:** Keep it thin (4px) to remain minimal, increasing to 6px only on hover for easier interaction.

## 6. Do's and Don'ts

### Do
*   **Do** use extreme whitespace. If a layout feels "full," increase the margins.
*   **Do** use `on-surface-variant` for secondary information to keep the visual hierarchy focused on the `primary` text.
*   **Do** let album art colors influence the UI; consider subtle `surface-tint` overlays in the background of the "Now Playing" screen.

### Don't
*   **Don't** use 100% white (#ffffff) for text; use `on-surface` (#e7e5e4) to reduce eye strain and maintain a premium, matte look.
*   **Don't** use "Standard" icons. Choose a custom, thin-stroke icon set (1.5pt weight) to match the editorial typography.
*   **Don't** use hard-edged rectangles. Even the smallest chip should have at least `sm` roundedness.
