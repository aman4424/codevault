# CodeVault Design System

## 1. Design Direction

CodeVault follows a **Modern SaaS** visual style.

### Core Visual Principles

- Dark, high-contrast interface
- Clean and minimal visual hierarchy
- Navy-based surfaces
- Blue as the primary brand/interaction color
- Gold/yellow as a secondary highlight
- Avoid excessive use of colors
- Use semantic design variables instead of hardcoded colors
- Prefer spacing, typography, borders, and contrast for hierarchy rather than adding many different background colors

---

# 2. Color Palette

## Dark Theme

| Variable | Hex | Semantic Usage |
|---|---|---|
| `--background` | `#080D1A` | Main application/page background |
| `--surface` | `#0D1528` | Secondary UI surfaces, headers, inputs, nested surfaces |
| `--card` | `#121D33` | Major content containers and cards |
| `--border` | `#263653` | Borders, dividers, and visual separation |
| `--primary` | `#1677FF` | Primary actions, links, active states, focus states |
| `--primary-hover` | `#3B8CFF` | Hover state of primary elements |
| `--secondary` | `#FFC400` | Special highlights, achievements, badges, important emphasis |
| `--text` | `#F1F5FF` | Primary readable text |
| `--muted` | `#94A3B8` | Secondary text, metadata, hints, placeholders |
| `--success` | `#22C55E` | Successful operations and positive states |
| `--error` | `#EF4444` | Errors, failed operations, validation errors |

## Color Hierarchy

The primary background hierarchy is:

`--background` → `--card` → `--surface`

The primary interaction hierarchy is:

`--primary` → `--primary-hover`

The secondary brand color is:

`--secondary`

It should be used sparingly and should not replace the primary blue for normal actions.

---

# 3. Color Semantics

### `--background`

The main canvas of the application.

Use for:
- Overall page background
- Large empty areas
- Body background

### `--surface`

A UI surface placed above the main background.

Use for:
- Header/navbar
- Inputs
- Smaller nested UI surfaces
- Secondary panels

### `--card`

A visually distinct major container.

Use for:
- Login/signup cards
- Problem cards
- Note/document cards
- Dashboard cards
- Major content panels

### `--border`

Used to visually separate elements.

Use for:
- Card borders
- Input borders
- Dividers
- Navbar borders

### `--primary`

The main interaction/brand color.

Use for:
- Primary buttons
- Important links
- Active navigation items
- Focus indicators
- Important interactive states

### `--primary-hover`

Used when an element using `--primary` is hovered.

### `--secondary`

The secondary brand highlight.

Use for:
- Achievements
- Streaks
- Special badges
- Important highlights
- Special states

Do not use `--secondary` as the default button color.

### `--text`

Primary content that the user is expected to read.

Use for:
- Headings
- Main labels
- Important content
- Primary button text when appropriate

### `--muted`

Secondary information that should remain readable but visually recede.

Use for:
- Metadata
- Timestamps
- Descriptions
- Helper text
- Placeholder text
- Secondary labels

### `--success`

Used for successful operations and positive feedback.

Examples:
- Password successfully changed
- Note successfully saved
- Email successfully sent

### `--error`

Used for errors and failed operations.

Examples:
- Invalid credentials
- Failed request
- Validation errors
- Server errors

---

# 4. Typography

CodeVault uses Tailwind's built-in typography scale rather than creating custom font-size variables.

## Font Family

Use Tailwind's:

```css  
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI"
    sans-serif
`
```
## Font Size Hierarchy

| Tailwind Class | Size | Semantic Usage |
|---|---:|---|
| `text-xs` | 12px | Very small metadata |
| `text-sm` | 14px | Secondary text, helper text, metadata |
| `text-base` | 16px | Default body text, labels, buttons |
| `text-lg` | 18px | Section headings |
| `text-xl` | 20px | Subheadings |
| `text-2xl` | 24px | Page titles |

## Font Weight Hierarchy

| Tailwind Class | Weight | Semantic Usage |
|---|---:|---|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Labels, buttons, moderate emphasis |
| `font-semibold` | 600 | Headings and important titles |
| `font-bold` | 700 | Strong emphasis only |

## Typography Rules

### Page Title

```text
text-2xl font-semibold
```
### 5. Spacing

CodeVault uses Tailwind's default spacing scale.

Spacing is used to establish visual hierarchy and relationships between elements.

## Core Spacing Scale

```text
4px   → Tailwind 1   → Micro spacing
8px   → Tailwind 2   → Tight spacing
12px  → Tailwind 3   → Compact spacing
16px  → Tailwind 4   → Standard spacing
24px  → Tailwind 6   → Section spacing
32px  → Tailwind 8   → Large spacing
48px  → Tailwind 12  → Major separation