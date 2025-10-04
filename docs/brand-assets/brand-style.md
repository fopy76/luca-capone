# Brand Style Guide: Luca Capone - Personal Brand

**Last Updated:** 2025-10-04

**Author:** Luca Capone

**Vision:** To create a minimalist, modern, and creative personal brand website. The site's primary goal is to establish the brand of a "vibe coder" and product creator, funneling visitors to become users of the developed SaaS and app products. The aesthetic is clean, expressive, and user-focused.

---

## 1. Color Palette: Creative & Bold

This palette uses a high-contrast, neutral foundation with a single, energetic accent color to guide user actions.

| Role | Color Name | HEX Code | Tailwind Utility / CSS Variable | Usage Notes |
| ---------------- | -------------- | --------- | ------------------------------- | ----------------------------------------------------- |
| **Primary Text** | Near Black | `#1A1A1A` | `text-black` / `--primary-text` | For all headings and body paragraphs. Ensures strong readability. |
| **Accent** | Sunny Yellow | `#FACF39` | `bg-yellow` / `--accent` | For primary CTAs (buttons) and interactive highlights. [1, 2] |
| **Secondary Text**| Stone Grey | `#888888` | `text-gray` / `--secondary-text`| For captions, metadata, and less important information. |
| **Background** | White | `#FFFFFF` | `bg-white` / `--background` | The primary background for a clean, minimalist feel. |
| **Background Tint**| Light Beige | `#F5F3F0` | `bg-beige` / `--background-tint`| For subtle differentiation between page sections. |

### Tailwind CSS Configuration (`tailwind.config.js`)javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'black': '#1A1A1A',
        'yellow': '#FACF39',
        'gray': '#888888',
        'beige': '#F5F3F0',
      },
      fontFamily: {
        sans:,
        grotesk:,
      },
    },
  },
  plugins:,
}
```

---

## 2. Typography: Expressive & Technical

The typography is a core design element, blending a unique, technical heading font with a clean, readable body font to create a strong visual hierarchy.

### Font Definitions

| Role | Font Name | Weight/Style | Rationale |
| ---------------- | --------------- | -------------- | ---------------------------------------------------------------------- |
| **Headings (H1, H2)** | Space Grotesk | Bold (700) | A unique, technical character that aligns with the AI focus. |
| **Body Text** | Satoshi | Regular (400) | A clean, neutral base that complements the expressive headings. |
| **Captions/Labels**| Space Grotesk | Regular (400) | Creates a strong, consistent typographic system. |

### Font Sourcing

*   **Space Grotesk:** Available on [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk).
*   **Satoshi:** Available from [Fontshare](https://www.fontshare.com/fonts/satoshi). Download and host locally or import via CSS.

### Implementation (`globals.css` or equivalent)

```css
@import url('[https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap)');

/* Example for importing Satoshi from Fontshare */
@import url('[https://api.fontshare.com/v2/css?f=satoshi@400&display=swap](https://api.fontshare.com/v2/css?f=satoshi@400&display=swap)');

body {
  font-family: 'Satoshi', sans-serif;
  color: #1A1A1A; /* Near Black */
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
}
```

---

## 3. Core Development Stack

This guide is tailored for the following technical stack.

*   **Framework:** React / Next.js
*   **Styling:** Tailwind CSS
*   **Components:** Shad CN
*   **Animation:** Framer Motion (motion)
*   **Iconography:** Lucide Icons

---

## 4. UI Components & Interaction Style

Components should be clean, functional, and enhanced with subtle, purposeful motion.

### **Buttons (Shad CN)**
*   **Primary CTA:** Solid background using the **Accent (`#FACF39`)** color. Text should be **Primary Text (`#1A1A1A`)**.
*   **Secondary CTA:** Use the "outline" or "ghost" variant. The border and text should use the **Accent (`#FACF39`)** color.
*   **Interaction:** On hover, primary buttons should have a subtle scale or brightness change. Use Framer Motion for a smooth transition (`whileHover={{ scale: 1.05 }}`).

### **Product Cards (Shad CN)**
*   Use the `Card` component with a white background (`#FFFFFF`) and a very subtle border or shadow.
*   **Interaction:** On hover, apply a slight lift effect using Framer Motion (`whileHover={{ y: -5 }}`). This makes the product showcase feel interactive and premium.

### **Icons (Lucide)**
*   Use icons sparingly to enhance clarity, not for decoration.
*   **Sizing:** Keep icons consistent, typically around 16px-24px.
*   **Coloring:** Icons should generally use **Primary Text (`#1A1A1A`)** or **Secondary Text (`#888888`)** to maintain a minimalist feel.

### **Animations (Framer Motion)**
*   **Guiding Principle:** Motion should be *purposeful*, guiding the user or providing feedback. Avoid distracting or unnecessary animations.
*   **Page Load/Scroll:** Implement gentle fade-in or slide-in effects for sections as they enter the viewport.
*   **State Changes:** Use subtle transitions for hover and click states to provide clear, immediate feedback.
```