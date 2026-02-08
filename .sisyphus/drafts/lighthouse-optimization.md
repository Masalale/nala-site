# Draft: Lighthouse Performance Optimization

## Requirements (confirmed)
- Improve mobile Lighthouse scores (currently critical: FCP 7.6s, LCP 14.2s, TTI 14.4s)
- Improve desktop Lighthouse scores (moderate: FCP 1.4s, LCP 2.7s)
- Reduce total payload from 5.7MB to under 1MB
- Maintain Awwwards-worthy visual quality

## Research Findings

### Image Analysis
- 4 product images: 378-439 KB each (unoptimized JPGs)
- 2 logos: 107-109 KB PNGs
- No WebP/AVIF formats
- No srcset/responsive images
- Only Products.tsx uses loading="lazy"

### Video Analysis
- video_02: 3.3MB (MP4) + 2.7MB (WebM) - TOO LARGE
- video_01: 282KB (MP4) + 351KB (WebM) - acceptable
- Videos load eagerly even below-the-fold
- Poster images exist but video still blocks render

### Code Splitting Analysis
- Zero lazy loading (React.lazy not used)
- All routes load synchronously
- 260KB single JS bundle in production
- No vendor chunk separation
- No dynamic imports anywhere

### Bundle Composition
- react-dom_client.js: 1MB (dev mode captured)
- react-router-dom.js: 451KB
- 34 JavaScript files loading

## Technical Decisions
- Use React.lazy + Suspense for route-based code splitting
- Implement manual chunks for vendor separation
- Convert images to WebP with AVIF fallback
- Compress video_02 to match video_01 size (~300KB)
- Add Intersection Observer for below-the-fold video loading
- Self-host fonts or add font-display: swap
- Add preload hints for LCP image

## Scope Boundaries
- INCLUDE: All performance optimizations for existing site
- INCLUDE: Image format conversion and optimization
- INCLUDE: Code splitting implementation
- INCLUDE: Video compression/lazy loading
- EXCLUDE: New features or content changes
- EXCLUDE: Server-side rendering (keep SPA)
- EXCLUDE: Complete architecture rewrite

## Test Strategy Decision
- **Infrastructure exists**: YES (bun test available)
- **Automated tests**: NO (performance testing via Lighthouse)
- **Agent-Executed QA**: YES - Playwright to verify page loads, Lighthouse CLI for metrics
