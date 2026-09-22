# AstroNumero Clarity Launch

Role & Goal:
Act as a world-class UI/UX Designer and Lead Full-Stack React Engineer. Build a mobile-first, conversion-focused, and highly responsive web application for an online Numerology and Kundli Consultancy brand named "AstroNumero Clarity".

---

### 1. Visual Aesthetics, Branding & Theme (STRICT)
- Background Palette: Deep Pitch Black (`#000000`) for the primary canvas, with subtle gradient section cards in Deep Midnight Navy (`#0B132B`, `#1C2541`).
- Accents & Highlights: 
  - Metallic Warm Gold (`#D4AF37`, `#FFD700`) for primary badges, CTA buttons, active tab states, and key highlights.
  - Electric Blue (`#3A506B`, `#4CC9F0`) for secondary accents, glow effects, and interactive border hover states.
- Typography: Clean, high-readability sans-serif (Inter or Plus Jakarta Sans) paired with elegant serif headings (Playfair Display) for luxury appeal.
- Text Contrast: Crisp White (`#FFFFFF`) for primary headings, Muted Slate (`#94A3B8`) for body prose and subtext.
- Style Attributes: Glassmorphism cards with subtle gold/navy borders (`border-navy-800/50`), 16px rounded corners, thumb-friendly touch targets (min 48px height), high-contrast accessibility.

---

### 2. SEO Architecture & Performance
- HTML Structure: Use proper semantic HTML tags (`

`, ``, `

`, `

`, `

`, `

`, `

`, `

`).
- On-Page Meta Tags:
  - Title: "Online Numerology & Kundli Consultation | AstroNumero Clarity"
  - Meta Description: "Get instant clarity on Career, Wealth, Marriage & Business with Vedic Kundli Insights and Life Path Numerology. Claim your free audit today!"
- Micro-Optimization: Lightweight Lucide-React icons, responsive SVG graphic accents, Lazy-loaded images, accessible ARIA attributes on inputs and modals.

---

### 3. Core Lead Form ("Free Kundli & Destiny Audit")
Design an interactive multi-field form card with real-time field validation, smooth focus glow effects, and clean labels:

1. Full Name:
   - Field Type: Text Input
   - Placeholder: "e.g. Rahul Sharma"
2. Mobile Number:
   - Field Type: Tel Input with country code dropdown (Default: +91 India)
   - Placeholder: "98765 43210"
3. Email Address:
   - Field Type: Email Input with live format validation
   - Placeholder: "rahul@example.com"
4. Number / Date of Birth:
   - Field Type: Datepicker or Numeric Input
   - Placeholder: "DD / MM / YYYY"
5. Select Color Code (Aura/Numerology Alignment):
   - Field Type: Interactive Visual Swatch Selector Grid
   - Color Swatches: 
     - 🟡 Gold (#D4AF37)
     - 🟦 Deep Blue (#1C2541)
     - 🟩 Emerald Green (#10B981)
     - 🟣 Royal Violet (#7C3AED)
     - 🔴 Ruby Red (#EF4444)
     - ⚪ Silver (#E2E8F0)
   - Behavior: Selected swatch gets a gold glowing ring and checkmark.
6. Reason for Booking:
   - Field Type: Textarea / Paragraph Input
   - Label: "Why do you want to book this consultation? Share your primary concern or goal."
   - Placeholder / Draft Prompt: "Draft your reason here (e.g. Struggling with career growth, marriage delays, name spelling correction, or business financial loss...)"

7. Call To Action (CTA Button):
   - Button Text: "Claim My Free Kundli & Destiny Audit →"
   - Styling: Large, full-width on mobile, gold-to-electric-blue gradient fill with an animated pulse ring on hover.

---

### 4. Immediate Instant-Response Pop-up Modal
Upon form submission, prevent page refresh, validate fields, and trigger an animated overlay Pop-up Modal:
- Animation: Smooth scale-up and backdrop blur effect (`backdrop-blur-md`).
- Header: Green animated checkmark badge + Headline: "Your Free Destiny Audit is Reserved! 🎉"
- Dynamic Content Display:
  - "Thank you, [User Name]!"
  - "We have received your birth details and your primary concern regarding: '[Reason for Booking]'."
  - "Our expert team is analyzing your Kundli Dasha and Life Path Number associated with your chosen [Selected Color] aura code."
  - "A customized 2-minute voice analysis audio report will be sent to your WhatsApp number ([User Mobile]) within 2 hours."
- Modal CTA Button: "Connect directly on WhatsApp Now" 
  - Action: Opens WhatsApp URL with a pre-filled message format: `Hello AstroNumero Clarity, I just submitted my Free Kundli details for [User Name]. Looking forward to my audio report!`
- Close Option: Subtle 'X' button or 'Close Window' text button at the bottom.

---

### 5. Supplemental High-Converting Page Sections

1. Sticky Header & Brand Bar:
   - Brand logo with glowing star motif.
   - Quick navigation links: "Free Checkup", "Services", "Life Path Calculator", "Reviews".
   - CTA: "Book 1-on-1 Call".

2. Hero Section:
   - H1 Headline: "Discover Your Life's Hidden Blueprint Through Numerology & Kundli Insights"
   - Subheadline: "Transform career roadblocks, relationship friction, and financial instability into growth using data-backed astrological alignment."
   - Dual CTAs: "Get Free Kundli Checkup" (Scrolls to form) & "View Service Packages".

3. Interactive Life Path Calculator Widget:
   - Direct engagement tool where users can enter their Date of Birth to dynamically calculate and display their single-digit Life Path Number (1–9, 11, 22) along with 3 core personality traits and lucky numbers.

4. Service & Pricing Package Ladder:
   - Tier 1: Free Kundli & Dasha Voice Analysis (Price: ₹0)
   - Tier 2: Name Spelling & Mobile Number Alignment (Price: ₹499 - PDF Report)
   - Tier 3: 1-on-1 Personal Live Consultation (Price: ₹1,999 - Most Popular Badge, 30 Min Call + Name Correction + Custom Remedies)
   - Tier 4: Business, Brand & Logo Numerology (Price: ₹5,999 - Corporate Brand Launch & Partnership Audit)

5. Trust Badges & FAQ Accordion:
   - Star rating cards, verified client testimonials.
   - Expandable Accordion FAQs covering common queries (Name correction process, requirements, privacy of birth details).

6. Mobile Floating Action Bar:
   - Fixed bottom sticky bar on mobile screens (<768px) with two equal touch buttons: "⚡ Free Kundli Audit" and "💬 WhatsApp Us".

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://astro-code-clarity.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1dcb5a18-6708-449c-92f7-35a082dad428).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
