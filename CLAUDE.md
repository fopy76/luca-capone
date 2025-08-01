# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# CLAUDE.md - Project Context for Luca's Website

## Project Overview

You are helping build a personal website for Luca Capone, a Gen X non-technical founder who builds AI products. This is a single-page minimalist website that showcases his journey and products, built with Next.js 14, TypeScript, and Tailwind CSS.

**Domain**: lucacapone.io  
**Key Message**: "Gen X. Non-technical. Building & shipping AI products anyway."

## Current Status

The initial UI has been generated by v0.dev. You are now in the Cursor development phase to add functionality and polish.

## Key Project Files

- `/docs/PRD.md` - Product Requirements Document
- `/docs/UX-Design-Spec.md` - Design specifications  
- `/docs/Architecture.md` - Technical architecture
- `/docs/Project-Brief.md` - Business objectives

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Font**: Poppins (Google Fonts)
- **Deployment**: Vercel
- **Newsletter**: Substack API

## Color System

```css
--color-primary: #2563EB;        /* Modern blue */
--color-primary-dark: #1E40AF;   /* Blue hover */
--color-accent: #4CAF50;         /* Green - CTAs */
--color-accent-dark: #388E3C;    /* Green hover */
--color-gray-900: #111827;       /* Text */
--color-gray-600: #4B5563;       /* Body text */
```

## Implementation Priorities

### Priority 1 - Newsletter Integration
- Create `/app/api/newsletter/route.ts` for Substack API
- Add email validation (client and server)
- Implement loading states
- Success/error handling
- Environment variables setup

### Priority 2 - Navigation & Scrolling
- Smooth scroll to sections
- Active section highlighting
- Sticky nav transformation on scroll
- Mobile menu functionality

### Priority 3 - About Section Accordion
- React state for expand/collapse
- Smooth height animation
- Accessibility (ARIA attributes)

### Priority 4 - Animations
- Framer Motion setup
- Hero section staggered fade-ins
- Scroll-triggered animations
- Respect prefers-reduced-motion

### Priority 5 - Form Validation
- React Hook Form integration
- Email regex validation
- Error display
- Prevent double submissions

## Project Structure

```
luca-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── newsletter/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Newsletter.tsx
│   │   └── SocialProof.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Card.tsx
├── lib/
│   ├── constants.ts
│   ├── utils.ts
│   └── hooks/
├── docs/
└── public/
```

## Key Requirements

1. **Performance**: Lighthouse score > 90
2. **Accessibility**: WCAG 2.1 AA compliant
3. **Mobile-First**: Responsive breakpoints at 768px, 1024px
4. **SEO**: Proper meta tags and semantic HTML
5. **Logo**: "Luca Capone" with "Luca" in Poppins Bold, "Capone" in Regular

## Component Specifications

### Navigation
- Transparent initially, white on scroll (100px trigger)
- Logo shrinks on scroll (24px → 20px)
- Mobile hamburger < 768px

### Hero Section
- Full viewport height
- Staggered animations (0.5s, 0.7s, 0.9s, 1.1s delays)
- Green CTA button (#4CAF50)

### About Section
- 150 words visible by default
- Expandable to show full story
- Three subsections: The Catalyst, The Journey, The Mission

### Portfolio
- 3 columns desktop, 2 tablet, 1 mobile
- Status badges (Live/Beta/Coming Soon)
- Hover: translateY(-4px)

### Newsletter
- Title: "The Build Log"
- Green submit button
- Substack API integration
- Show count when > 50 subscribers

## Environment Variables

```bash
SUBSTACK_API_KEY=
NEXT_PUBLIC_SUBSTACK_PUBLICATION_ID=
```

## Testing Checklist

- [ ] Newsletter signup works
- [ ] All sections scroll smoothly
- [ ] Mobile menu functions
- [ ] About section expands/collapses
- [ ] No console errors
- [ ] Lighthouse scores meet targets
- [ ] Keyboard navigation works
- [ ] Forms show proper validation

## Important Notes

- This is built for a non-technical founder - keep code clean and well-commented
- Prioritize performance and simplicity
- The site should work without JavaScript (progressive enhancement)
- All animations should be subtle and purposeful
- Focus on newsletter conversion as primary goal