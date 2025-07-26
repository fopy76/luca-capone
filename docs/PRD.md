# Product Requirements Document (PRD)

# Luca's Personal Website - The Gen X AI Builder's Digital Hub

**Version:** 1.0

**Date:** July 2025

**Product Manager:** AI PM Agent

**Status:** Approved

---

## Executive Summary

This PRD defines the requirements for building Luca's personal website, a minimalist digital hub that showcases his journey as a Gen X non-technical founder who builds AI-powered products. The single-page website will serve as the primary platform for product portfolio display, audience building through newsletter subscriptions, and establishing credibility in the AI entrepreneurship space without teaching or tutorials.

## Project Goals

### Primary Goals

1. **Establish Digital Presence**: Create a professional, minimalist website that positions Luca as a credible AI entrepreneur
2. **Showcase Products**: Display current, in-progress, and future products in an engaging portfolio format
3. **Build Audience**: Convert visitors to newsletter subscribers with compelling CTAs and value proposition
4. **Demonstrate Credibility**: Show real products and results without relying on teaching or guru positioning

### Business Objectives

- Generate 100+ newsletter subscribers within 3 months
- Create a scalable platform for showcasing multiple products
- Build foundation for transition from employment to full-time entrepreneurship
- Establish unique market position as Gen X non-technical AI builder

## User Personas

### Primary Persona: The Aspiring Non-Technical Entrepreneur

- **Age**: 35-55 years
- **Background**: Professional with business experience but no coding skills
- **Pain Points**: Feels locked out of tech entrepreneurship due to age/skills
- **Goals**: Learn how to leverage AI to build products without coding
- **Behavior**: Seeks inspiration and proof that it's possible

### Secondary Persona: The AI-Curious Creative

- **Age**: 40-60 years
- **Background**: Creative professional (designer, writer, marketer)
- **Pain Points**: Intimidated by AI tools and technical jargon
- **Goals**: Find relatable examples of AI implementation
- **Behavior**: Looks for non-technical explanations and real results

### Tertiary Persona: The Fellow Indie Maker

- **Age**: 25-45 years
- **Background**: Solopreneur or aspiring entrepreneur
- **Pain Points**: Information overload from too many gurus
- **Goals**: Connect with authentic builders who ship products
- **Behavior**: Values transparency and real metrics

## Functional Requirements

### FR1: Navigation & Structure

- **FR1.1**: Single-page design with smooth scroll navigation
- **FR1.2**: Sticky header with navigation links that highlight active section
- **FR1.3**: Mobile hamburger menu for screens < 768px
- **FR1.4**: Smooth scroll animations between sections

### FR2: Hero Section

- **FR2.1**: Full viewport height on desktop, responsive on mobile
- **FR2.2**: Primary headline: "Gen X. Non-technical. Building & shipping AI products anyway."
- **FR2.3**: Subheadline with value proposition
- **FR2.4**: Primary CTA button: "Join the Build Log" (newsletter signup)
- **FR2.5**: Secondary link: "See What I'm Building" (scrolls to portfolio)
- **FR2.6**: Subtle animation on load (fade in)

### FR3: About Section

- **FR3.1**: Brief 150-word introduction visible by default
- **FR3.2**: "Read My Full Story" expandable button
- **FR3.3**: Smooth accordion animation for expansion
- **FR3.4**: Full story structured with subheadings:
    - The Catalyst (what sparked the change)
    - The Journey (learning to build with AI)
    - The Mission (democratizing creation)
- **FR3.5**: Professional photo of Luca
- **FR3.6**: Key statistics or milestones as visual elements

### FR4: Product Portfolio

- **FR4.1**: Grid layout (responsive: 3 columns desktop, 1 mobile)
- **FR4.2**: Product cards with:
    - Product name and logo/icon
    - Brief description (50 words max)
    - Status indicator (Live/Beta/Coming Soon)
    - Revenue/user metrics (if applicable)
    - Primary action button (varies by status)
- **FR4.3**: Vibe Coding featured prominently as flagship product
- **FR4.4**: Hover effects on cards (subtle lift and shadow)
- **FR4.5**: Click through to product detail modals or external links

### FR5: Newsletter Section

- **FR5.1**: Compelling headline: "The Build Log"
- **FR5.2**: Value proposition: "Raw, unfiltered updates from a Gen X founder building AI products"
- **FR5.3**: Email input field with validation
- **FR5.4**: Subscribe button with loading state
- **FR5.5**: Privacy assurance text
- **FR5.6**: Subscriber count display (once >50)
- **FR5.7**: Integration with Substack API
- **FR5.8**: Success/error message handling

### FR6: Social Proof Section

- **FR6.1**: Testimonials carousel (once available)
- **FR6.2**: Media mentions or features
- **FR6.3**: Key metrics dashboard:
    - Products shipped
    - Newsletter subscribers
    - Months building in public
- **FR6.4**: Auto-rotating with manual controls

### FR7: Footer

- **FR7.1**: Social media links (X/Twitter, LinkedIn, GitHub)
- **FR7.2**: Copyright notice
- **FR7.3**: Privacy policy link (when needed)
- **FR7.4**: Contact email
- **FR7.5**: "Built with AI" badge/text

## Non-Functional Requirements

### NFR1: Performance

- **NFR1.1**: Page load time < 2 seconds on 3G connection
- **NFR1.2**: Time to Interactive < 3 seconds
- **NFR1.3**: Lighthouse performance score > 90
- **NFR1.4**: Image optimization with next/image
- **NFR1.5**: Lazy loading for below-fold content

### NFR2: Accessibility

- **NFR2.1**: WCAG 2.1 AA compliance
- **NFR2.2**: Keyboard navigation support
- **NFR2.3**: Screen reader compatibility
- **NFR2.4**: Color contrast ratio minimum 4.5:1
- **NFR2.5**: Alt text for all images
- **NFR2.6**: Focus indicators for interactive elements

### NFR3: Responsiveness

- **NFR3.1**: Mobile-first responsive design
- **NFR3.2**: Breakpoints: 640px, 768px, 1024px, 1280px
- **NFR3.3**: Touch-friendly tap targets (min 44x44px)
- **NFR3.4**: Readable font sizes on all devices
- **NFR3.5**: No horizontal scroll on any viewport

### NFR4: SEO

- **NFR4.1**: Semantic HTML structure
- **NFR4.2**: Meta tags optimization
- **NFR4.3**: Open Graph tags for social sharing
- **NFR4.4**: Sitemap generation
- **NFR4.5**: Structured data markup
- **NFR4.6**: Clean URL structure

### NFR5: Browser Compatibility

- **NFR5.1**: Support for last 2 versions of major browsers
- **NFR5.2**: Graceful degradation for older browsers
- **NFR5.3**: No reliance on experimental features

## User Stories

### Epic 1: First-Time Visitor Experience

```
US1.1: As a first-time visitor, I want to immediately understand who Luca is and what makes him unique, so I can decide if his content is relevant to me.

US1.2: As a non-technical professional, I want to see clear evidence that someone like me can build AI products, so I feel inspired and confident.

US1.3: As a visitor, I want to easily navigate through the site sections, so I can find the information I'm looking for.

```

### Epic 2: About Section Interaction

```
US2.1: As a visitor, I want to read a brief introduction first, so I can quickly gauge if I want to learn more.

US2.2: As an interested visitor, I want to expand and read Luca's full story, so I can understand his journey and relate to his experience.

US2.3: As a mobile user, I want the expandable content to work smoothly on my device, so I have a good reading experience.

```

### Epic 3: Product Discovery

```
US3.1: As a potential user, I want to see what products Luca has built, so I can assess his credibility and find tools I might use.

US3.2: As a visitor, I want to understand the status of each product, so I know what's available now versus coming soon.

US3.3: As an interested user, I want to easily access or join the waitlist for products, so I can start using them.

```

### Epic 4: Newsletter Subscription

```
US4.1: As a follower, I want to subscribe to Luca's newsletter easily, so I can stay updated on his journey and new products.

US4.2: As a subscriber, I want confirmation that my subscription was successful, so I know I'll receive updates.

US4.3: As a privacy-conscious user, I want assurance about how my email will be used, so I feel safe subscribing.

```

### Epic 5: Social Connection

```
US5.1: As a visitor, I want to find Luca's social media profiles, so I can follow him on my preferred platform.

US5.2: As a potential collaborator, I want to find contact information, so I can reach out for opportunities.

```

## UX Vision

### Design Philosophy

The website embodies radical minimalism while maintaining warmth and approachability. Every element serves a purpose, with no decorative additions. The design should feel like a confident whisper rather than a shout, reflecting Luca's authentic, non-guru approach.

### Visual Hierarchy

1. **Primary Focus**: Newsletter signup and product showcase
2. **Secondary Focus**: About story and social proof
3. **Tertiary Focus**: Social links and additional information

### Interaction Patterns

- **Subtle Animations**: Smooth, purposeful transitions (no bouncing or flashy effects)
- **Micro-interactions**: Gentle hover states and feedback
- **Progressive Disclosure**: Information revealed as needed (expandable about section)
- **Clear CTAs**: Obvious next actions at each section

### Emotional Journey

1. **Curiosity** (Hero): "A Gen X non-technical founder? Tell me more..."
2. **Connection** (About): "His story sounds like mine"
3. **Inspiration** (Portfolio): "He actually built these things!"
4. **Action** (Newsletter): "I want to follow this journey"

## Technical Specifications

### Frontend Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (selective use)
- **Icons**: Heroicons or Lucide React
- **Fonts**: System font stack for performance

### Integrations

- **Newsletter**: Substack API
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel
- **Version Control**: GitHub

### Component Architecture

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Portfolio.tsx
│   ├── Newsletter.tsx
│   ├── SocialProof.tsx
│   └── Footer.tsx
├── lib/
│   ├── constants.ts
│   └── utils.ts
└── public/
    └── images/

```

## Success Criteria

### Launch Criteria

- [ ]  All functional requirements implemented
- [ ]  Lighthouse scores > 90 across all metrics
- [ ]  Mobile responsive testing passed
- [ ]  Cross-browser testing completed
- [ ]  Accessibility audit passed
- [ ]  Content finalized and proofread
- [ ]  Newsletter integration tested
- [ ]  Analytics configured

### Post-Launch Success Metrics

- **Week 1**: 50+ unique visitors, 10+ newsletter signups
- **Month 1**: 500+ unique visitors, 50+ newsletter signups
- **Month 3**: 100+ newsletter subscribers, 3+ testimonials collected

## Dependencies and Constraints

### Dependencies

- Domain name registration
- Vercel account setup
- Substack account configuration
- GitHub repository creation
- Professional photography session
- Content creation (full about story, product descriptions)

### Constraints

- Limited development time (building while employed)
- Budget constraints (using free tiers where possible)
- Technical maintenance must be manageable by non-developer
- Must work within AI tool capabilities (v0, Cursor, Claude Code)

## Approval and Sign-off

### Required Approvals

- [x]  **Luca** (Product Owner): Confirms requirements meet vision
- [x]  **Technical Review**: Validates technical feasibility
- [x]  **UX Review**: Confirms user experience alignment

### Next Steps

1. UX Design Specification creation
2. Technical Architecture Document
3. Development environment setup
4. Sprint planning and user story prioritization

---

*This PRD will be reviewed and updated throughout the development process. All changes will be versioned and communicated to stakeholders.*