# CLAUDE.md

## What this project is

Design mockups for **Kapeeshwar Ayurveda**, an Indian e-commerce brand that sells Ayurvedic products. The main product is **A2 Desi Cow Ghee** made with the traditional Bilona method.

**This is NOT the production website.** It is a set of static HTML pages we show the client to get design approval. Once they approve, the real e-commerce site gets built somewhere else.

What that means for the work here:
- Visual fidelity and polish come first. Nothing needs to be production-ready.
- There is no backend, database, auth, payment gateway, or real cart. Fake the interactions (add-to-cart, filters, forms) with small client-side JS, just enough for the design to feel alive in a demo.
- Placeholder data is fine: product names, prices in ₹, reviews, phone number (`+91 XXXXXXXXXX`), and so on.
- Don't add build tools, frameworks, package managers, SEO plumbing, analytics, or tests unless asked.
- Every page must look right on desktop and on mobile. The client will probably review on a phone.

## Structure

```
v1/                     # Design round 1 (new rounds → v2/, v3/ … copy forward, never edit an approved round)
  index.html            # Homepage; other pages sit beside it (product.html, shop.html, cart.html, …)
  assets/               # ALL CSS, JS, fonts and other code files go here, and only here
  images/
    user-uploads/       # Images from the client/user (logos, product photos). Don't modify or delete.
    claude-uploads/     # Images Claude creates or downloads (placeholders, icons, backgrounds)
```

- Plain HTML + CSS + vanilla JS. Pages open directly from the file system (`file://`) with no server, so use relative paths only and no ES module imports that need a server.
- CDN libraries (Google Fonts, icon sets, Swiper, etc.) are fine.
- Keep shared styles in one stylesheet under `assets/` (e.g. `assets/css/style.css`) so every page stays consistent. Put design tokens in `:root` CSS variables.
- Share the header and footer markup across pages (copy it; there are no includes). Nav links should point to the real mock pages so the client can click through.

## Brand direction (from the client's product creative)

- **Mood:** premium, warm, traditional and Ayurvedic, handcrafted, pure.
- **Colors:**
  - Deep brown/near-black backgrounds (~`#1E140C`–`#2B1D12`)
  - Ghee gold/yellow accent (~`#F2B51D`), used for headings, icon circles and highlight bars
  - Brand red for the logo and CTAs (~`#C8202F`)
  - White/cream for body text on dark backgrounds
- **Type:**
  - Big bold serif for headlines (e.g. Playfair Display / DM Serif Display)
  - Clean sans for body and UI (e.g. Poppins / Roboto)
  - The logo is a red script wordmark: "Kapeeshwar Ayurveda."
- **Motifs:**
  - Golden ghee pours
  - Glass matka-shaped jar with a black lid
  - Tulsi/basil leaves
  - Wooden boards
  - Painted Indian cow illustration
  - Circular gold icons with dark line icons
  - Pill-shaped outlined section labels
- **Key selling points to reuse:**
  - 100% Pure A2 Cow Ghee
  - Traditional Bilona Method
  - No Additives / No Preservatives
  - Made with Love & Care
  - Nutrient-rich
  - Anti-inflammatory
  - Supports heart health
  - Aids digestion
  - Good for fat loss
  - Balances Vata, Pitta & Kapha
- **Social handle:** `/kapeeshwarayurveda` (Facebook, Instagram, LinkedIn).
- **Copy fixes:** the client's creative has typos (e.g. "vat, pit cuff"). In our designs, write the correct wording: "Vata, Pitta & Kapha".

## Working conventions

- Use the client's real assets from `images/user-uploads/` whenever one exists. Otherwise put a clearly named placeholder in `images/claude-uploads/`.
- Don't make medical claims beyond what the client already uses.
- When a design round is sent to the client, treat that version folder as frozen. Make revisions in the next version folder.
