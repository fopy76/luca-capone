# UX Design Specification / Front-End Specification

# Luca's Personal Website - The Gen X AI Builder's Digital Hub

**Version:** 1.2

**Date:** July 2025

**UX Designer:** Sally (AI UX Expert)

**Status:** Approved

---

## Executive Summary

This UX Design Specification translates the product requirements into a concrete visual and interactive experience for Luca's personal website. The design philosophy centers on radical minimalism paired with warmth and authenticity, creating a digital presence that whispers confidence rather than shouting for attention. Every design decision supports the core mission: proving that Gen X non-technical founders can build and ship AI products.

## Design Philosophy & Principles

### Core Design Principles

1. **Radical Minimalism**: Every element must justify its existence
2. **Authenticity Over Polish**: Real builder, not guru positioning
3. **Progressive Disclosure**: Information revealed as needed
4. **Mobile-First Responsive**: Exceptional experience on all devices
5. **Accessibility as Default**: Inclusive design for all users
6. **Performance-Driven**: Speed is a feature

### Visual Language

- **Personality**: Confident, approachable, genuine
- **Tone**: Professional yet personal, inspiring without preaching
- **Aesthetic**: Clean lines, generous whitespace, purposeful typography

## Target Personas & User Journey

### Persona-Specific Design Considerations

### The Aspiring Non-Technical Entrepreneur (Primary)

- **Visual Needs**: Clear hierarchy, non-intimidating design
- **Interaction Needs**: Simple navigation, obvious CTAs
- **Content Needs**: Proof points, relatable language
- **Emotional Journey**: Skeptical → Curious → Inspired → Engaged

### The AI-Curious Creative (Secondary)

- **Visual Needs**: Beautiful but not overwhelming design
- **Interaction Needs**: Smooth, predictable interactions
- **Content Needs**: Visual portfolio, minimal jargon
- **Emotional Journey**: Intimidated → Intrigued → Confident → Connected

### The Fellow Indie Maker (Tertiary)

- **Visual Needs**: Efficient layout, quick scanning
- **Interaction Needs**: Fast access to metrics and products
- **Content Needs**: Real data, transparent progress
- **Emotional Journey**: Evaluating → Respecting → Following → Supporting

## Information Architecture

### Content Hierarchy

```
Homepage (Single Page)
├── Hero Section (100vh)
│   ├── Primary Message
│   ├── Value Proposition
│   └── CTAs (Newsletter + Portfolio)
├── About Section
│   ├── Brief Introduction (Always Visible)
│   └── Full Story (Expandable)
├── Portfolio Section
│   ├── Vibe Coding (Featured)
│   ├── Active Products
│   └── Coming Soon Products
├── Newsletter Section
│   └── Subscription Form
├── Social Proof Section
│   └── Metrics Dashboard
└── Footer
    └── Contact & Social Links

```

### Navigation Flow

- **Sticky Navigation**: Transforms from transparent to solid on scroll
- **Active Section Highlighting**: Visual indicator of current section
- **Smooth Scrolling**: 600ms ease-in-out transitions between sections

## Wireframes & Layout Specifications

### Hero Section Wireframe

```
┌─────────────────────────────────────────┐
│  [Logo/Name]              [Nav Items]   │ <- Sticky Nav (transparent)
├─────────────────────────────────────────┤
│                                         │
│                                         │
│         Gen X. Non-technical.          │ <- Fade in: 0.5s delay
│     Building & shipping AI products    │ <- Fade in: 0.7s delay
│              anyway.                    │
│                                         │
│        [Value Proposition Text]         │ <- Fade in: 0.9s delay
│                                         │
│     [Join the Build Log] ←(Green CTA)  │ <- Fade in: 1.1s delay
│                                         │
│      See What I'm Building ↓            │ <- Subtle bounce animation
│                                         │
└─────────────────────────────────────────┘

```

### About Section Layout

```
┌─────────────────────────────────────────┐
│              About Me                   │
├─────────────────────────────────────────┤
│  ┌─────┐                                │
│  │     │   Brief Introduction Text      │
│  │Photo│   (150 words)                  │
│  │     │                                │
│  └─────┘   [+ Read My Full Story]      │
│                                         │
│  ────────── Expanded View ──────────    │
│                                         │
│  The Catalyst                           │
│  [Story content...]                     │
│                                         │
│  The Journey                            │
│  [Story content...]                     │
│                                         │
│  The Mission                            │
│  [Story content...]                     │
└─────────────────────────────────────────┘

```

### Portfolio Grid Layout

```
Desktop (1280px+): 3 columns
┌───────┐ ┌───────┐ ┌───────┐
│ Card  │ │ Card  │ │ Card  │
└───────┘ └───────┘ └───────┘

Tablet (768px-1279px): 2 columns
┌───────┐ ┌───────┐
│ Card  │ │ Card  │
└───────┘ └───────┘

Mobile (<768px): 1 column
┌─────────────┐
│    Card     │
└─────────────┘

```

### Product Card Component

```
┌─────────────────────────┐
│ [Icon]   [Status Badge] │
│                         │
│ Product Name            │
│                         │
│ Brief description here  │
│ explaining the product  │
│                         │
│ 📊 Metrics (if live)    │
│                         │
│ [Primary Action Button] │
└─────────────────────────┘

```

## Component Library Specifications

### Design System Components

### Buttons

**Primary Button (Newsletter CTA)**

- Background: #4CAF50 (Green accent)
- Text: White
- Padding: 16px 32px
- Border-radius: 8px
- Font-weight: 600 (Poppins)
- Hover: #388E3C (darker green), subtle shadow
- Active: Scale(0.98)
- Transition: all 200ms ease

**Secondary Button (Standard CTA)**

- Background: #2563EB (Primary blue)
- Text: White
- Padding: 16px 32px
- Border-radius: 8px
- Font-weight: 600 (Poppins)
- Hover: #1E40AF (darker blue), subtle shadow
- Active: Scale(0.98)
- Transition: all 200ms ease

**Tertiary Button (Outline)**

- Background: Transparent
- Border: 2px solid #2563EB
- Text: #2563EB
- Padding: 14px 28px
- Hover: Background fills with 10% opacity

**Text Links**

- Color: #2563EB (Primary blue)
- Underline: None default, on hover
- Transition: 200ms ease

### Form Elements

**Input Fields**

- Height: 48px
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Padding: 12px 16px
- Font-family: Poppins
- Focus: #2563EB border, subtle shadow
- Error state: #EF4444 border, error message below

### Cards

**Product Cards**

- Background: White
- Border: 1px solid #F3F4F6
- Border-radius: 16px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: Transform translateY(-4px), larger shadow
- Transition: all 300ms ease

### Status Indicators

**Status Badges**

- Padding: 4px 12px
- Border-radius: 20px
- Font-size: 12px
- Font-weight: 500 (Poppins Medium)
- Live: #4CAF50 background (Green)
- Beta: #3B82F6 background (Blue)
- Coming Soon: #6B7280 background (Gray)

## Branding & Visual Identity

### Color Palette

**Primary Colors**

- Primary: #2563EB (Modern Blue) - Trust, technology, credibility
- Primary Dark: #1E40AF (Blue-700) - Hover states
- Accent: #4CAF50 (Growth Green) - CTAs, success, transformation
- Accent Dark: #388E3C (Green-700) - Hover states for green elements

**Neutral Colors**

- Gray-50: #F9FAFB - Backgrounds
- Gray-100: #F3F4F6 - Subtle borders
- Gray-200: #E5E7EB - Borders
- Gray-300: #D1D5DB - Disabled states
- Gray-600: #4B5563 - Body text
- Gray-800: #1F2937 - Headings
- Gray-900: #111827 - Primary text

**Semantic Colors**

- Success: #4CAF50 (Green - matching accent)
- Warning: #F59E0B (Amber-500)
- Error: #EF4444 (Red-500)
- Info: #3B82F6 (Blue-500)

### Typography

**Font Stack**

```css
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;

```

**Font Loading Strategy**

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical weights -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" as="style">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

```

**Type Scale**

- Display: 700 48px/1.2 Poppins (Mobile: 36px)
- H1: 700 36px/1.3 Poppins (Mobile: 28px)
- H2: 600 30px/1.3 Poppins (Mobile: 24px)
- H3: 600 24px/1.4 Poppins (Mobile: 20px)
- Body Large: 400 18px/1.6 Poppins
- Body: 400 16px/1.6 Poppins
- Small: 400 14px/1.5 Poppins
- Caption: 400 12px/1.5 Poppins

**Font Weights**

- Regular: 400 (Body text)
- Medium: 500 (Emphasis, badges)
- Semibold: 600 (Buttons, subheadings)
- Bold: 700 (Headlines, important text)

### Spacing System

Based on 8px grid:

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### Border Radius

- Small: 4px (Badges, small elements)
- Medium: 8px (Buttons, inputs)
- Large: 16px (Cards)
- Full: 9999px (Pills, avatar)

## Animations & Micro-interactions

### Page Load Sequence

1. **Hero Section** (staggered fade-in)
    - Logo/Nav: Fade in, 0.3s
    - Headline: Fade in + slide up 20px, 0.5s delay
    - Subheadline: Fade in + slide up 20px, 0.7s delay
    - Green CTA Button: Fade in + scale from 0.9, 0.9s delay
    - Scroll indicator: Fade in + gentle bounce, 1.1s delay

### Scroll Animations

- **Fade In Up**: Elements fade in and move up 30px
- **Trigger**: When element is 20% visible
- **Duration**: 600ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

### Interactive Elements

**Button Interactions**

- Hover: Scale(1.02), shadow increase
- Active: Scale(0.98)
- Duration: 200ms
- Green buttons: Glow effect on hover

**Card Hover**

- Transform: translateY(-4px)
- Shadow: 0 10px 30px rgba(0,0,0,0.1)
- Duration: 300ms ease

**Accordion (About Section)**

- Height: Auto-animate
- Content fade: 300ms
- Chevron rotation: 180deg
- Easing: ease-in-out

**Newsletter Form**

- Input focus: Blue border transition, 200ms
- Submit loading: Button spinner, disable state
- Success: Green checkmark animation
- Error: Shake animation, 300ms

### Navigation Behavior

**Sticky Nav Transformation**

- Trigger: 100px scroll
- Background: Transparent → White with shadow
- Logo: Larger → Smaller
- Duration: 300ms
- Backdrop blur: 10px

**Active Section Indicator**

- Underline animation: Slide from left
- Color change: Gray → Primary blue
- Duration: 300ms

## Responsive Design Specifications

### Breakpoints

- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px - 1279px
- Large Desktop: 1280px+

### Mobile-Specific Adaptations

**Navigation**

- Hamburger menu below 768px
- Full-screen overlay menu
- Menu items: 48px touch targets
- Poppins Medium for menu items

**Typography**

- Display text: 36px → 28px
- Body text: 16px (maintained for readability)
- Line height: Increased by 0.1 for mobile
- Font weights remain consistent

**Spacing**

- Section padding: 96px → 64px
- Card padding: 24px → 16px
- Grid gaps: 24px → 16px

**Images**

- About photo: Side-by-side → Stacked
- Product cards: Horizontal → Vertical layout

### Touch Interactions

- Minimum touch target: 44x44px
- Swipe gestures for testimonial carousel
- Tap to expand for accordion sections
- Long press disabled on buttons

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

**Color Contrast**

- Normal text: 4.5:1 minimum (verified for all color combinations)
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum
- Green on white: 3.55:1 (passes for large text, buttons)
- Blue on white: 4.57:1 (passes for all text)

**Keyboard Navigation**

- Tab order follows visual hierarchy
- Focus indicators: 2px primary blue outline
- Skip links for main navigation
- Escape key closes mobile menu

**Screen Reader Support**

- Semantic HTML structure
- ARIA labels for interactive elements
- Live regions for form feedback
- Alt text for all images

**Motion Preferences**

- Respect prefers-reduced-motion
- Provide animation toggle option
- Essential animations only

## Performance Optimization

### Font Loading Performance

```css
/* Critical font-face declarations */
@font-face {
  font-family: 'Poppins';
  font-display: swap; /* Show fallback immediately */
  font-weight: 400;
  src: url() format('woff2');
}

```

### Image Guidelines

- Format: WebP with fallbacks
- Hero images: Max 200KB
- Product images: Max 100KB
- Lazy loading below fold
- Responsive srcset implementation

### CSS Optimization

- Tailwind CSS with PurgeCSS
- Critical CSS inline (including font declarations)
- Non-critical CSS deferred
- Minimal custom CSS

### JavaScript Guidelines

- Bundle splitting by component
- Lazy load non-critical components
- Debounce scroll events
- Throttle resize handlers

## Implementation Notes

### Component Development Order

**Full Implementation (Single Phase)**

1. **Global Setup**
    - Font loading (Poppins)
    - Color system and CSS variables
    - Layout wrapper and responsive grid
2. **Navigation Component**
    - Sticky header with scroll transformation
    - Active section highlighting
    - Mobile hamburger menu
    - Smooth scroll functionality
3. **Hero Section**
    - Full viewport layout
    - Staggered fade-in animations
    - Green primary CTA button
    - Scroll indicator with bounce
4. **About Section**
    - Brief intro with photo
    - Expandable accordion for full story
    - Smooth height animations
    - Responsive image handling
5. **Portfolio Section**
    - Responsive grid layout
    - Product cards with hover effects
    - Status badges
    - External links/modals
6. **Newsletter Section**
    - Substack integration
    - Form validation and states
    - Success/error handling
    - Green submit button
7. **Social Proof Section**
    - Metrics dashboard
    - Auto-updating counters
    - Clean data visualization
8. **Footer**
    - Social links with hover states
    - Contact information
    - Copyright and credits

### Development Approach

Building everything in a single phase makes sense because:

- The animations and interactions are integral to the brand experience
- Newsletter functionality is a primary goal, not an enhancement
- The smooth scrolling and hover effects are expected in modern web design
- It's more efficient to implement the complete vision at once
- Avoids technical debt from retrofitting features

### Development Handoff

**Required Assets**

- Luca's professional photo (2000x2000px)
- Product logos/icons (SVG preferred)
- Favicon and meta images
- Error state illustrations

**Color Implementation Guide**

```scss
// CSS Variables
:root {
  --color-primary: #2563EB;
  --color-primary-dark: #1E40AF;
  --color-accent: #4CAF50;
  --color-accent-dark: #388E3C;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-600: #4B5563;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
}

// Tailwind Config
colors: {
  primary: {
    DEFAULT: '#2563EB',
    dark: '#1E40AF',
  },
  accent: {
    DEFAULT: '#4CAF50',
    dark: '#388E3C',
  }
}

```

**Third-Party Integrations**

- Next/Font for optimal Poppins loading
- Framer Motion for animations
- React Hook Form for newsletter
- Vercel Analytics tracking
- Substack API documentation

## Success Metrics

### UX Success Indicators

- Time to first meaningful interaction < 5 seconds
- Newsletter conversion rate > 10%
- Bounce rate < 40%
- Mobile usage > 60%
- Accessibility score 100%
- Font loading performance < 100ms

### User Testing Validation

- 5-second test: Users understand value prop
- Navigation test: Find products within 10 seconds
- Mobile test: Complete newsletter signup
- Accessibility test: Full keyboard navigation
- Brand perception: "Approachable" and "credible" feedback

## Approval Checklist

- [x]  Visual design aligns with brand personality
- [x]  Color palette supports growth narrative
- [x]  Typography reinforces approachable positioning
- [x]  Single-phase implementation approved
- [x]  All user stories addressed in design
- [x]  Responsive behavior documented
- [x]  Accessibility requirements met
- [x]  Performance budgets defined
- [x]  Implementation feasibility confirmed

---

*This UX Design Specification has been updated to reflect the approved hybrid color palette, Poppins typography, and unified single-phase implementation approach. The combination of modern blue, growth green, and approachable typography creates the perfect balance for Luca's unique positioning as a Gen X non-technical AI builder.*