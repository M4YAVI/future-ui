# Future UI - Component Library Structure

> A minimalist, dark-themed UI component showcase website.
> Black background, white text, clean aesthetic.

---

## 🗂️ Quick Access - File Structure

```
future-ui/
├── app/
│   ├── globals.css              # Design system & theme
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── docs/
│       ├── layout.tsx           # Docs layout with sidebar
│       ├── page.tsx             # Introduction
│       ├── installation/
│       │   └── page.tsx         # Setup guide
│       └── components/
│           ├── page.tsx         # Components overview
│           ├── button/page.tsx  # Button docs
│           ├── card/
│           │   ├── page.tsx              # Basic Card docs
│           │   ├── testimonial/page.tsx  # Testimonial Card docs
│           │   └── rectangle-hover/page.tsx # Rectangle Hover docs
│           ├── input/page.tsx   # Input docs
│           ├── badge/page.tsx   # Badge docs
│           ├── alert/page.tsx   # Alert docs
│           └── tabs/page.tsx    # Tabs docs
│
├── components/
│   ├── header.tsx               # Top navigation
│   ├── sidebar.tsx              # Docs sidebar (with nested nav)
│   ├── code-block.tsx           # Syntax highlighted code
│   ├── component-preview.tsx    # Demo + code tabs
│   └── ui/
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── input.tsx            # Input component
│       ├── badge.tsx            # Badge component
│       ├── alert.tsx            # Alert component
│       ├── tabs.tsx             # Tabs component
│       ├── testimonial-card.tsx # Testimonial Card
│       └── spotlight-card.tsx   # Rectangle Hover Card ⭐ NEW
```

---

## 🎨 Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#000000` | Page background |
| `--foreground` | `#fafafa` | Primary text |
| `--muted` | `#27272a` | Secondary backgrounds |
| `--muted-foreground` | `#a1a1aa` | Secondary text |
| `--border` | `#27272a` | Borders |
| `--card` | `#09090b` | Card backgrounds |
| `--success` | `#22c55e` | Success states |
| `--warning` | `#eab308` | Warning states |
| `--error` | `#ef4444` | Error states |
| `--info` | `#3b82f6` | Info states |

### Typography
- **Font Sans**: Inter / Geist Sans
- **Font Mono**: JetBrains Mono / Geist Mono

---

## 📦 Components

### Core UI Components
| Component | Path | Description |
|-----------|------|-------------|
| **Button** | `components/ui/button.tsx` | 5 variants, 4 sizes, loading state |
| **Card** | `components/ui/card.tsx` | See variants below |
| **Input** | `components/ui/input.tsx` | Label, error, helper text |
| **Badge** | `components/ui/badge.tsx` | 6 variants for status |
| **Alert** | `components/ui/alert.tsx` | 5 variants, dismissible |
| **Tabs** | `components/ui/tabs.tsx` | Context-based tab switching |

### Card Variants
| Variant | Path | Description |
|---------|------|-------------|
| **Basic Card** | `components/ui/card.tsx` | Header, Title, Description, Content, Footer |
| **Testimonial Card** | `components/ui/testimonial-card.tsx` | Spotlight effect, text highlights, avatar |
| **Spotlight Card** | `components/ui/spotlight-card.tsx` | Mouse-tracking spotlight gradient |

### Hover Effects
| Variant | Path | Description |
|---------|------|-------------|
| **Floating Highlight** | `components/ui/floating-highlight.tsx` | Fluid background element that follows cursor |

### Showcase Components
| Component | Path | Description |
|-----------|------|-------------|
| **CodeBlock** | `components/code-block.tsx` | Syntax highlighting, copy button |
| **ComponentPreview** | `components/component-preview.tsx` | Preview/Code tab view |

### Layout Components
| Component | Path | Description |
|-----------|------|-------------|
| **Header** | `components/header.tsx` | Top navigation, mobile menu |
| **Sidebar** | `components/sidebar.tsx` | Collapsible nav with nested items |

---

## ⚡ Quick Commands

```bash
# Development
bun run dev

# Build
bun run build

# Lint
bun run lint
```

---

## 🚀 Adding New Components

### Adding a new standalone component:
1. Create component in `components/ui/[name].tsx`
2. Create docs page in `app/docs/components/[name]/page.tsx`
3. Add to sidebar navigation in `components/sidebar.tsx`
4. Update this file (ui.md)

---

## 📍 Routes

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/docs` | Introduction |
| `/docs/installation` | Setup guide |
| `/docs/components` | Components overview |
| `/docs/components/button` | Button docs |
| `/docs/components/card` | Card docs |
| `/docs/components/card/testimonial` | Testimonial docs |
| `/docs/components/card/rectangle-hover` | Rectangle Hover docs |
| `/docs/components/input` | Input docs |
| `/docs/components/badge` | Badge docs |
| `/docs/components/alert` | Alert docs |
| `/docs/components/tabs` | Tabs docs |

---

## 🎯 Sidebar Navigation Structure

```
Getting Started
├── Introduction
└── Installation

Components
├── Button
├── Card              ← Click to expand
│   ├── Basic Card
│   ├── Testimonial Card
│   └── Rectangle Hover
├── Input
├── Badge
├── Alert
└── Tabs
```
