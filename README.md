# iPhone 17 Pro Max — Interactive 3D Experience

<p align="center">
  <img src="media/hero.jpeg" alt="iPhone 17 Pro Max Interactive 3D Experience" width="100%">
</p>

<p align="center">
  <a href="https://iphone-17-pro-max-experience.vercel.app/">
    <strong>Live Demo →</strong>
  </a>
</p>

An interactive product showcase built with React, Three.js, WebGL, GSAP, and modern web technologies. This project demonstrates high-fidelity frontend engineering, real-time 3D rendering in the browser, declarative state-driven hardware configuration, and responsive UI performance inspired by premium consumer tech product storytelling.
---

## Overview

This project is an interactive, browser-based product experience for a conceptual iPhone 17 Pro Max. It explores how modern WebGL workflows can be integrated into React applications to create seamless, narrative-driven product showcases.

Key engineering objectives:

- GPU-accelerated WebGL rendering with Three.js and controlled render-loop execution
- Declarative, state-driven product configuration with synchronized 3D scene updates
- Component lifecycle management with explicit resource cleanup to minimize memory leaks and rendering overhead
- Responsive, component-based UI architecture with adaptive layouts across desktop, tablet, and mobile viewports
- Interaction orchestration using GSAP-based animation timelines and scroll-driven transitions
- Semantic HTML, accessible interactive controls, and keyboard-navigable UI patterns
- Production-oriented frontend optimization covering asset delivery, code structure, SEO metadata, and deployment readiness

---

## Interactive Demo

[▶ Watch the full Interactive Website walkthrough](media/demo.mp4)

## Features

- **Interactive 3D Phone Model**: Procedurally textured Three.js model featuring orbital rotation, dynamic lighting reflections, and real-time finish switching (Cosmic Orange, Deep Blue, Natural Titanium, Space Black).
- **Cinematic Hero Experience**: High-definition video backdrop with layered typography, subtle scroll hints, and responsive title composition.
- **Camera System Showcase**: Interactive 48MP fusion camera explorer with multi-focal mode switching (24mm, 28mm, 35mm, 48mm, and 120mm telephoto/macro views).
- **A19 Pro Architecture & Performance**: Interactive 3D rotating cylinder card array highlighting CPU, GPU, Neural Engine, and thermal dissipation metrics.
- **Interactive MagSafe Accessory Experience**: Dedicated 3D accessory canvas demonstrating snap-to-charge physics, realistic lighting, and tactile interactions.
- **Hardware Size Comparison**: Interactive scale comparator contrasting the 6.3-inch Pro and 6.9-inch Pro Max displays.
- **Dynamic Island Interaction**: Expandable pill widget demonstrating stateful notification alerts and media playback controls.
- **Product Configuration & Dynamic Pricing**:
  - Model selection (iPhone 17 Pro vs. iPhone 17 Pro Max)
  - Finish selection with visual swatch indicators
  - Storage capacity tier selection (256GB, 512GB, 1TB, 2TB)
  - Trade-in valuation estimator with instant price deduction
  - Dynamic monthly financing calculation (24-month APR breakdown)
  - Direct purchase action linking to official Apple Store checkout
- **Scroll Progress & Custom Cursor**: Viewport scroll progress bar with subtle cursor physics.
- **Accessibility & Keyboard Navigation**: Fully keyboard-focusable interactive widgets (`Enter`/`Space`), semantic heading structure, and high-contrast focus rings.
- **Off-Screen WebGL Throttling**: Automatic rendering loop suspension when 3D scenes scroll out of the active viewport.

---

## Tech Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **UI Library** | React | `^19.2.0` | Declarative component architecture & state |
| **DOM Engine** | React DOM | `^19.2.0` | Client-side DOM rendering |
| **3D / WebGL** | Three.js | `^0.180.0` | WebGL scene graph, geometry, lighting, materials |
| **React 3D** | @react-three/fiber | `^9.4.0` | Declarative Three.js scene management |
| **3D Helpers** | @react-three/drei | `^10.7.6` | Camera controls, abstractions, and environment setup |
| **Animations** | GSAP | `^3.13.0` | Scroll-triggered timelines & element transitions |
| **Icons** | Lucide React | `^0.548.0` | Minimal SVG iconography |
| **Styling** | Tailwind CSS / CSS3 | `^4.1.16` | Responsive grid layouts & custom properties |
| **Tooling** | React Scripts / Webpack | `^5.0.1` | Build pipeline, asset optimization, bundling |

---

## Engineering Highlights

### 1. WebGL Scene Lifecycle & GPU Conservation
Running multiple WebGL contexts simultaneously can degrade browser performance and drain mobile battery life. To solve this:
- **`IntersectionObserver` Caching**: Both the primary 3D phone canvas (`src/IPhone17ProMax.jsx`) and the MagSafe canvas (`src/AdvancedComponents.jsx`) are bound to viewport observers. When an element scrolls out of view, its `requestAnimationFrame` loop immediately pauses, reducing GPU and CPU utilization to 0%.
- **Timer Throttling**: The 40ms interval timer governing the 3D performance cylinder auto-rotation in `src/PerformanceSection.jsx` is similarly gated by intersection detection.

### 2. GSAP Animation Scoping & Memory Management
All scroll animations and entrance timelines are wrapped inside `gsap.context()` blocks tied to component lifecycles. On component unmount, `ctx.revert()` is called unconditionally to kill running tweens, release DOM event listeners, and prevent detached DOM tree leaks.

### 3. Declarative Hardware Configuration State
The configuration panel in `src/BuySection.jsx` manages multidimensional state (model, finish, storage capacity, and trade-in tier). Total purchase cost and monthly financing estimates are computed dynamically as derived state, guaranteeing instantaneous synchronization across the interface without redundant re-renders.

### 4. Non-Blocking Asset Delivery
- Above-the-fold hero video assets utilize `preload="auto"` for instant, stutter-free playback.
- Secondary feature videos use `preload="metadata"` to avoid premature network saturation.
- Below-the-fold image assets leverage `loading="lazy"` and `decoding="async"` to eliminate main-thread decoding bottlenecks during page initialization.

---

## Project Structure

```
myreact/
├── public/
│   ├── Images/                  # High-resolution product images & finish textures
│   ├── animatedvideo3.mp4      # Feature animation video asset
│   ├── camerateaser.mp4        # Camera showcase video asset
│   ├── cinematicvideo.mp4       # Cinematic showcase video asset
│   ├── teaser.mp4              # Hero background video asset
│   ├── favicon.ico             # Browser favicon
│   ├── index.html              # Document entrypoint with SEO & social tags
│   ├── logo192.png             # Application manifest icon (192px)
│   ├── logo512.png             # Application manifest icon (512px)
│   ├── manifest.json           # Web application manifest
│   ├── robots.txt              # Search crawler directives
│   └── sitemap.xml             # Search engine sitemap
├── src/
│   ├── AdvancedComponents.jsx  # MagSafe 3D experience & size comparison
│   ├── AdvancedComponents.css
│   ├── App.jsx                 # Application root & section layout coordinator
│   ├── App.css
│   ├── AutoScroller.jsx        # Horizontal feature scroller
│   ├── AutoScroller.css
│   ├── BuySection.jsx          # Product configuration & dynamic pricing module
│   ├── BuySection.css
│   ├── CameraSection.jsx       # 48MP camera showcase & focal length selector
│   ├── CameraSection.css
│   ├── ExtraComponents.jsx     # Environmental & technical specs cards
│   ├── ExtraComponents.css
│   ├── FeaturesSection.jsx     # Core feature grid presentation
│   ├── FeaturesSection.css
│   ├── Footer.jsx              # Legal footnotes, credits & directory links
│   ├── Footer.css
│   ├── Header.jsx              # Sticky header navigation & purchase CTA
│   ├── Header.css
│   ├── HeroSection.jsx         # Video hero presentation & canonical H1
│   ├── HeroSection.css
│   ├── IPhone17ProMax.jsx      # Primary Three.js 3D phone model & finish controls
│   ├── IPhone17ProMax.css
│   ├── NewComponents.jsx       # Dynamic Island interactive widget & audio demo
│   ├── NewComponents.css
│   ├── PerformanceSection.jsx  # A19 Pro chip architecture & rotating 3D cards
│   ├── PerformanceSection.css
│   ├── ScrollProgress.jsx      # Viewport scroll progress bar & custom cursor
│   ├── ScrollProgress.css
│   ├── index.js                # React application mount entrypoint
│   └── index.css               # Global styles, typography & CSS custom properties
├── .gitignore                  # Git exclusion rules
├── package.json                # Project dependencies & build scripts
└── README.md                   # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/iphone17promax-experience.git
   cd iphone17promax-experience
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To compile a production-ready static bundle:

```bash
npm run build
```

The optimized assets will be generated in the `build/` directory:
- Minified, tree-shaken JavaScript bundles with content hashing
- Extracted and minified CSS stylesheets
- Copied public media assets, `robots.txt`, and `sitemap.xml`

---

## Deployment

The project is structured for static hosting providers such as **Vercel**, **Netlify**, or **Cloudflare Pages**.

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub.
2. Import the repository into the Vercel dashboard.
3. Vercel automatically detects the Create React App configuration:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Deploy.

*(Note: Production deployment will be linked upon public release.)*

---

## Accessibility

The interface has been audited to adhere to accessibility standards:
- **Semantic Structure**: Proper Landmark elements (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`) with a single, unique `<h1>` heading on the page.
- **Keyboard Navigation**: Interactive 3D cards, size comparison toggles, and dynamic island controls support `tabIndex={0}` and keyboard triggers (`Enter` and `Space`).
- **Focus Rings**: Clear `:focus-visible` high-contrast indicators across interactive elements.
- **Screen Reader Support**: Descriptive `aria-label` tags on icon buttons, video playback toggles, and external checkout links.

---

## Performance

- **Lazy GPU Execution**: WebGL rendering loops pause when canvases exit the viewport via `IntersectionObserver`.
- **Media Preload Optimization**: `preload="auto"` for above-the-fold video; `preload="metadata"` for secondary media.
- **Asynchronous Image Decoding**: `loading="lazy"` and `decoding="async"` across below-the-fold assets to prevent main-thread jank.
- **Production Asset Sizes**:
  - Gzipped JavaScript: `~282 kB` (including Three.js, GSAP, and React runtime)
  - Gzipped CSS: `~20 kB`

---

## Future Improvements

- [ ] Support custom `.glb`/`.gltf` model imports with Draco compression.
- [ ] Implement service worker caching for full offline Progressive Web App (PWA) functionality.
- [ ] Add automated visual regression testing with Playwright.
