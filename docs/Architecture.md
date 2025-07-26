# Architecture Document

# Luca's Personal Website - The Gen X AI Builder's Digital Hub

**Version:** 1.0

**Date:** July 2025

**Architect:** Winston (AI Architect)

**Status:** Approved

---

## Executive Summary

This Architecture Document defines the technical foundation for Luca's personal website, a high-performance, single-page application built with modern web technologies. The architecture prioritizes simplicity, maintainability, and performance while enabling a non-technical founder to manage and update content with AI assistance. The design follows a serverless, component-based approach using Next.js 14+ with TypeScript, ensuring scalability and developer experience.

## High-Level Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   Next.js SSG/ISR Pages (React Components)          │   │
│  │   - Hero, About, Portfolio, Newsletter, Footer      │   │
│  └─────────────────────────────────────────────────────┘   │
│                             │                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   Client-Side State (React Context/Local State)     │   │
│  │   - UI State, Form State, Animation State           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     EDGE/CDN LAYER                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   Vercel Edge Network                               │   │
│  │   - Static Asset Serving                            │   │
│  │   - Edge Caching                                    │   │
│  │   - Image Optimization                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                        │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │  Substack   │  │    Vercel    │  │  Google Fonts  │   │
│  │     API     │  │  Analytics   │  │     (CDN)      │   │
│  └─────────────┘  └──────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────┘

```

### Architectural Patterns

1. **Static Site Generation (SSG)**: Primary rendering strategy for optimal performance
2. **Component-Based Architecture**: Modular, reusable UI components
3. **API Route Abstraction**: Serverless functions for external API interactions
4. **Edge-First Deployment**: Leveraging Vercel's edge network for global performance
5. **Progressive Enhancement**: Core functionality works without JavaScript

## Technology Stack

### Core Technologies

```tsx
// Package versions
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.4.0"
}

```

### Frontend Framework

- **Next.js 14+**: App Router, Server Components, Static Generation
- **React 18+**: Component library with hooks
- **TypeScript 5+**: Type safety and developer experience

### Styling & UI

- **Tailwind CSS 3+**: Utility-first CSS framework
- **Framer Motion 11+**: Animation library (selective loading)
- **next/font**: Optimized font loading for Poppins

### Development Tools

- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **TypeScript**: Static type checking

### External Integrations

- **Substack API**: Newsletter subscription management
- **Vercel Analytics**: User behavior tracking
- **Google Fonts**: Poppins font delivery

### Deployment & Infrastructure

- **Vercel**: Hosting, CI/CD, Edge Functions
- **GitHub**: Version control, Actions for automation
- **Cloudflare**: DNS management (optional)

## Repository Structure

```
luca-website/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Continuous Integration
│       └── preview.yml         # Preview deployments
├── .husky/
│   ├── pre-commit             # Linting and formatting
│   └── pre-push               # Type checking
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Homepage (single page)
│   ├── globals.css            # Global styles and Tailwind
│   ├── fonts.ts               # Font configuration
│   └── api/
│       └── newsletter/
│           └── route.ts       # Newsletter API endpoint
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx     # Sticky navigation
│   │   └── Footer.tsx         # Footer component
│   ├── sections/
│   │   ├── Hero.tsx           # Hero section
│   │   ├── About.tsx          # About with accordion
│   │   ├── Portfolio.tsx      # Product showcase
│   │   ├── Newsletter.tsx     # Subscription form
│   │   └── SocialProof.tsx    # Metrics dashboard
│   ├── ui/
│   │   ├── Button.tsx         # Reusable button
│   │   ├── Card.tsx           # Product card
│   │   ├── Input.tsx          # Form input
│   │   ├── Badge.tsx          # Status badges
│   │   └── Accordion.tsx      # Expandable content
│   └── animations/
│       ├── FadeIn.tsx         # Fade animations
│       ├── ScrollTrigger.tsx  # Scroll animations
│       └── StaggerChildren.tsx # Staggered animations
├── lib/
│   ├── constants.ts           # App constants
│   ├── utils.ts               # Utility functions
│   ├── types.ts               # TypeScript types
│   ├── api/
│   │   └── substack.ts        # Substack integration
│   └── hooks/
│       ├── useScrollPosition.ts
│       ├── useIntersection.ts
│       └── useMediaQuery.ts
├── public/
│   ├── images/
│   │   ├── luca-photo.webp    # Professional photo
│   │   └── products/          # Product images
│   ├── favicon.ico
│   └── og-image.png           # Social sharing image
├── styles/
│   └── animations.css         # Custom animations
├── docs/
│   ├── PRD.md                 # Product Requirements
│   ├── UX-Design-Spec.md      # UX Specification
│   └── Architecture.md        # This document
├── tests/
│   ├── components/            # Component tests
│   └── e2e/                   # End-to-end tests
├── .env.example               # Environment variables template
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # Project documentation

```

## Component Architecture

### Component Hierarchy

```tsx
// Core component structure
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Section component pattern
interface SectionProps extends ComponentProps {
  id: string;
  animate?: boolean;
}

```

### Key Components

### 1. Navigation Component

```tsx
interface NavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  currentSection?: string;
}

// Features:
// - Sticky positioning with scroll transformation
// - Active section highlighting
// - Mobile hamburger menu
// - Smooth scroll navigation

```

### 2. Hero Section

```tsx
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    action: () => void;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}

// Features:
// - Full viewport height
// - Staggered animations
// - Responsive typography

```

### 3. Portfolio Grid

```tsx
interface Product {
  id: string;
  name: string;
  description: string;
  status: 'live' | 'beta' | 'coming-soon';
  metrics?: {
    users?: number;
    revenue?: string;
  };
  link?: string;
  image?: string;
}

interface PortfolioProps {
  products: Product[];
  featured?: string; // Product ID to feature
}

```

### 4. Newsletter Form

```tsx
interface NewsletterProps {
  onSubmit: (email: string) => Promise<void>;
  subscriberCount?: number;
}

// Features:
// - Email validation
// - Loading states
// - Success/error handling
// - Substack API integration

```

## State Management

### State Architecture

For this single-page application, we'll use React's built-in state management:

```tsx
// Global UI State (React Context)
interface UIState {
  isMenuOpen: boolean;
  currentSection: string;
  scrollPosition: number;
  isScrolling: boolean;
}

// Form State (Local Component State)
interface FormState {
  email: string;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

// Animation State (Framer Motion)
// Managed internally by Framer Motion

```

### State Management Strategy

1. **UI State**: React Context for navigation and scroll state
2. **Form State**: Local component state with React Hook Form
3. **Animation State**: Framer Motion's internal state management
4. **Data Fetching**: Static props at build time, no client-side data fetching

## API Design

### Newsletter Subscription Endpoint

```tsx
// app/api/newsletter/route.ts
export async function POST(request: Request) {
  const { email } = await request.json();

  // Validate email
  if (!isValidEmail(email)) {
    return Response.json(
      { error: 'Invalid email address' },
      { status: 400 }
    );
  }

  // Subscribe via Substack API
  try {
    const result = await subscribeToSubstack(email);
    return Response.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Subscription failed' },
      { status: 500 }
    );
  }
}

```

### External API Integrations

### Substack Integration

```tsx
// lib/api/substack.ts
interface SubstackConfig {
  publicationId: string;
  apiKey: string; // Stored in environment variables
}

export async function subscribeToSubstack(
  email: string
): Promise<SubstackResponse> {
  // Implementation details for Substack API
  // Handle rate limiting, retries, and errors
}

```

## Performance Strategy

### Build-Time Optimization

```jsx
// next.config.js
module.exports = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  experimental: {
    optimizeCss: true,
  },
}

```

### Runtime Performance

1. **Static Generation**: All pages pre-rendered at build time
2. **Image Optimization**: Next.js Image component with lazy loading
3. **Code Splitting**: Automatic per-route code splitting
4. **Font Optimization**: Preload critical font weights
5. **CSS Optimization**: Tailwind CSS tree-shaking

### Performance Budgets

```tsx
// Performance targets
const performanceBudgets = {
  lighthouse: {
    performance: 95,
    accessibility: 100,
    bestPractices: 95,
    seo: 100,
  },
  webVitals: {
    LCP: 2.5, // Largest Contentful Paint (seconds)
    FID: 100, // First Input Delay (milliseconds)
    CLS: 0.1, // Cumulative Layout Shift
  },
  bundle: {
    firstLoad: 150, // KB
    perRoute: 80,   // KB
  },
};

```

## Security Considerations

### Security Measures

1. **Content Security Policy (CSP)**

```tsx
// Strict CSP headers
const cspHeader = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-analytics.com; " +
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
    "font-src 'self' fonts.gstatic.com; " +
    "img-src 'self' data: blob:; " +
    "connect-src 'self' *.substack.com vitals.vercel-insights.com"
};

```

1. **Environment Variables**

```bash
# .env.local (never committed)
SUBSTACK_API_KEY=your_api_key_here
NEXT_PUBLIC_SUBSTACK_PUBLICATION_ID=your_publication_id

```

1. **Input Validation**
- Email validation on client and server
- Rate limiting for API endpoints
- CSRF protection built into Next.js
1. **Headers Configuration**

```jsx
// next.config.js security headers
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

```

## Deployment Architecture

### Deployment Pipeline

```yaml
# GitHub Actions workflow
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
      - uses: vercel/action@v3

```

### Environment Strategy

1. **Development**: Local development with hot reload
2. **Preview**: Automatic preview deployments for PRs
3. **Production**: Main branch auto-deploys to production

### Monitoring & Analytics

```tsx
// Analytics configuration
export const analytics = {
  vercel: {
    enabled: process.env.NODE_ENV === 'production',
  },
  customEvents: {
    newsletter_signup: true,
    product_click: true,
    story_expand: true,
  },
};

```

## Development Workflow

### Git Workflow

```bash
main
  ├── feature/hero-section
  ├── feature/portfolio-grid
  ├── fix/mobile-navigation
  └── chore/update-dependencies

```

### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "jest",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true next build"
  }
}

```

### Quality Assurance

1. **Pre-commit Hooks**: Linting and formatting
2. **Pre-push Hooks**: Type checking and tests
3. **CI Pipeline**: Full test suite on every PR
4. **Preview Deployments**: Visual regression testing

## Scalability Considerations

### Future Enhancements

1. **Content Management**:
    - Potential migration to Contentful or similar CMS
    - Markdown-based content for easy AI editing
2. **Database Integration** (if needed):
    
    ```tsx
    // Potential schema for future features
    interface Database {
      subscribers: {
        id: string;
        email: string;
        subscribedAt: Date;
      };
      products: {
        id: string;
        name: string;
        metrics: JSON;
        updatedAt: Date;
      };
    }
    
    ```
    
3. **API Expansion**:
    - Product metrics tracking
    - A/B testing framework
    - Advanced analytics

### Performance Scaling

1. **CDN Strategy**: Vercel Edge Network for global distribution
2. **Image CDN**: Automatic image optimization and serving
3. **API Caching**: Edge caching for newsletter endpoint
4. **Static Regeneration**: ISR for dynamic content (if added)

## Maintenance & Documentation

### Documentation Requirements

1. **Code Documentation**: JSDoc for all components and utilities
2. **README**: Setup instructions and architecture overview
3. **Component Storybook**: Visual component documentation (future)
4. **API Documentation**: OpenAPI spec for endpoints

### Maintenance Strategy

1. **Dependency Updates**: Monthly security updates
2. **Performance Monitoring**: Weekly Lighthouse audits
3. **Error Tracking**: Vercel monitoring dashboard
4. **Analytics Review**: Monthly conversion analysis

## Technical Constraints & Decisions

### Key Decisions

1. **No Database**: Simplified architecture, all data in external services
2. **Static Generation**: Optimal performance for content that rarely changes
3. **Minimal Dependencies**: Reduce bundle size and complexity
4. **TypeScript Strict Mode**: Catch errors early, improve maintainability

### Constraints

1. **AI Tool Compatibility**: Architecture supports v0, Cursor, Claude Code
2. **Non-Technical Maintenance**: Clear structure for AI-assisted updates
3. **Performance First**: Every decision prioritizes speed
4. **Accessibility**: WCAG 2.1 AA compliance is non-negotiable

## Approval Checklist

- [x]  Architecture aligns with PRD requirements
- [x]  UX Design Spec technical requirements addressed
- [x]  Performance budgets defined and achievable
- [x]  Security measures comprehensive
- [x]  Scalability path clear
- [x]  Development workflow efficient
- [x]  AI tool compatibility confirmed
- [ ]  Technical team review completed
- [ ]  Final approval from Product Owner

---

*This Architecture Document provides the technical foundation for Luca's personal website. It prioritizes simplicity, performance, and maintainability while enabling future growth. The architecture is designed to be understood and modified by AI development tools, supporting Luca's journey as a non-technical founder building with AI.*