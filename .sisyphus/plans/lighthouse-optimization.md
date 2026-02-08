# Lighthouse Performance Optimization Plan

## TL;DR

> **Quick Summary**: Optimize NALA landing page Lighthouse scores through code splitting, deferred video loading, lazy images, and font optimization. Primary focus: mobile performance (FCP, LCP, TTI currently failing).
> 
> **Deliverables**:
> - Route-based code splitting with React.lazy + Suspense
> - Vendor chunk separation in Vite config
> - Deferred Hero video loading (poster-first strategy)
> - Loading="lazy" on all images
> - Font-display: swap + preconnect hints
> - LCP preload hint for Hero poster image
> 
> **Estimated Effort**: Medium (3-4 hours implementation + testing)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (Code Splitting) → Task 5 (Verification)

---

## Context

### Original Request
User wants to improve Lighthouse performance scores after analyzing desktop and mobile reports. Mobile scores are critically poor; desktop is moderate.

### Current Performance (from Lighthouse reports)

| Metric | Mobile | Desktop | Target |
|--------|--------|---------|--------|
| FCP | 7.6s (score: 0) | 1.4s (score: 0.61) | <1.8s |
| LCP | 14.2s (score: 0) | 2.7s (score: 0.41) | <2.5s |
| Speed Index | 7.6s (score: 0.25) | 1.5s (score: 0.83) | <3.4s |
| TBT | 210ms (score: 0.88) | 10ms (score: 1.0) | <200ms |
| CLS | 0 (score: 1.0) | 0 (score: 1.0) | <0.1 |
| TTI | 14.4s (score: 0.09) | 2.7s (score: 0.86) | <3.8s |

### Research Findings

**Code Analysis:**
- Zero React.lazy/Suspense usage — all routes load synchronously
- 260KB single JS bundle in production (no code splitting)
- No vendor chunk separation (React bundled with app code)
- 34 JavaScript files requested

**Image Analysis:**
- Product images: 378-439KB each (refreshing.jpg, turmeric.jpg, detox.jpg, exfoliant.jpg)
- Only Products.tsx uses loading="lazy"
- No WebP/AVIF formats
- No responsive images (srcset)

**Video Analysis:**
- video_02 (Hero): 3.3MB MP4 + 2.7MB WebM = 6MB total
- video_01 (Story): 282KB MP4 + 351KB WebM = 633KB total
- Videos load eagerly regardless of viewport
- Poster images exist but don't prevent video load

**Font Analysis:**
- Google Fonts request takes 200-360ms
- No preconnect hints
- No font-display configuration

### User Decisions
- Hero video: Keep video, lazy load only (poster first, video after page is interactive)
- Image optimization: Minimal — just add loading="lazy" everywhere
- Proceed with current analysis (development server data acceptable for planning)

---

## Work Objectives

### Core Objective
Reduce mobile LCP from 14.2s to under 4s and FCP from 7.6s to under 2.5s through code splitting, deferred video loading, and resource optimization.

### Concrete Deliverables
- Modified `src/App.tsx` with React.lazy route imports
- Modified `vite.config.ts` with vendor chunk configuration
- Modified `src/components/sections/Hero.tsx` with deferred video loading
- Modified `index.html` with preconnect and preload hints
- All images updated with loading="lazy" attribute
- Build verification showing multiple chunks

### Definition of Done
- [ ] `bun run build` produces multiple JS chunks (vendor, app, route chunks)
- [ ] Hero video does not load until after FCP (poster shows immediately)
- [ ] All `<img>` tags have loading="lazy" (except LCP candidates)
- [ ] Lighthouse mobile FCP < 4s (significant improvement from 7.6s)
- [ ] Zero TypeScript errors
- [ ] Zero console errors on page load

### Must Have
- Route-based code splitting for Home, Shop, NotFound pages
- Vendor chunk separation (react, react-dom, react-router-dom)
- Deferred video loading in Hero component
- Preconnect for Google Fonts
- Loading="lazy" on all below-the-fold images

### Must NOT Have (Guardrails)
- DO NOT convert images to WebP/AVIF (user chose minimal approach)
- DO NOT install new image optimization dependencies
- DO NOT change video files or re-encode them
- DO NOT remove the video — only defer its loading
- DO NOT break existing scroll animations
- DO NOT add skeleton loaders (keep loading simple)
- DO NOT remove SpeedInsights integration

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
> ALL verification is executed by the agent using tools. No manual testing required.

### Test Decision
- **Infrastructure exists**: YES (bun test available)
- **Automated tests**: NO (this is performance work, not unit tests)
- **Framework**: N/A
- **Agent-Executed QA**: ALWAYS (Playwright for UI, Bash for build verification)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Route-based code splitting (App.tsx)
├── Task 2: Vendor chunk config (vite.config.ts)
├── Task 3: Defer Hero video loading (Hero.tsx)
└── Task 4: Add preconnect + preload hints (index.html)

Wave 2 (After Wave 1):
├── Task 5: Add loading="lazy" to all images
└── Task 6: Build verification and Lighthouse re-test
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 6 | 2, 3, 4 |
| 2 | None | 6 | 1, 3, 4 |
| 3 | None | 6 | 1, 2, 4 |
| 4 | None | 6 | 1, 2, 3 |
| 5 | None | 6 | 1, 2, 3, 4 |
| 6 | 1, 2, 3, 4, 5 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2, 3, 4, 5 | task(category="quick", load_skills=[], run_in_background=true) - parallel |
| 2 | 6 | task(category="quick", load_skills=["playwright"], run_in_background=false) |

---

## TODOs

- [ ] 1. Implement route-based code splitting

  **What to do**:
  - Import `lazy` and `Suspense` from React
  - Convert static imports of Home, Shop, NotFound to lazy imports
  - Wrap `<Routes>` in `<Suspense fallback={<div className="min-h-screen" />}>`
  - Ensure default exports from all page components

  **Must NOT do**:
  - DO NOT lazy load Navbar or Footer (they're always visible)
  - DO NOT add complex skeleton loaders (keep fallback minimal)
  - DO NOT lazy load ScrollToTop or SpeedInsights

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
    - Reason: Simple code transformation, no special domain knowledge needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `src/App.tsx:1-27` - Current static imports and route structure
  - `src/pages/Home.tsx` - Verify it has default export pattern
  - `src/pages/Shop.tsx` - Verify it has default export pattern
  - `src/pages/NotFound.tsx` - Verify it has default export pattern
  - React docs: https://react.dev/reference/react/lazy

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Production build creates route chunks
    Tool: Bash
    Preconditions: Project at /home/ngash/Documents/nala/nala-site/
    Steps:
      1. Run: bun run build
      2. Run: ls -la dist/assets/*.js
      3. Assert: More than 2 JS files exist (was 1 before)
      4. Assert: Build output shows "chunk" in filenames
    Expected Result: Multiple JS chunks created
    Evidence: Build output captured

  Scenario: App loads without errors after code splitting
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. Run: bun run preview &
      2. Wait 3 seconds
      3. Run: curl -s http://localhost:4173/ | head -20
      4. Assert: HTML response contains <div id="root">
      5. Kill preview server
    Expected Result: App serves correctly
    Evidence: curl output captured
  ```

  **Commit**: YES
  - Message: `perf(routes): implement lazy loading for route components`
  - Files: `src/App.tsx`, `src/pages/Home.tsx`, `src/pages/Shop.tsx`, `src/pages/NotFound.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 2. Configure vendor chunk splitting

  **What to do**:
  - Update vite.config.ts with build.rollupOptions.output.manualChunks
  - Create vendor-react chunk for react, react-dom, react-router-dom
  - Optionally create vendor-insights chunk for @vercel/speed-insights

  **Must NOT do**:
  - DO NOT add new dependencies
  - DO NOT change other config options
  - DO NOT enable experimental features

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
    - Reason: Simple config change

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `vite.config.ts` - Current minimal config
  - Vite docs: https://vite.dev/config/build-options.html#build-rollupoptions

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Build creates vendor chunk
    Tool: Bash
    Preconditions: Task 1 complete, project at /home/ngash/Documents/nala/nala-site/
    Steps:
      1. Run: bun run build
      2. Run: ls dist/assets/*.js
      3. Assert: File matching *vendor*.js exists
      4. Assert: vendor chunk is separate from main chunk
    Expected Result: Vendor code separated for better caching
    Evidence: ls output and build log captured
  ```

  **Commit**: Groups with Task 1
  - Message: (combined with Task 1)
  - Files: `vite.config.ts`

---

- [ ] 3. Defer Hero video loading

  **What to do**:
  - Add state to track if video should load: `const [shouldLoadVideo, setShouldLoadVideo] = useState(false)`
  - Use useEffect with setTimeout (1000ms) or requestIdleCallback to defer video rendering
  - Conditionally render video element only when shouldLoadVideo is true
  - Ensure poster image shows immediately (it already has `poster` attribute)
  - Add fade transition between poster and video

  **Must NOT do**:
  - DO NOT remove the video entirely
  - DO NOT change video source files
  - DO NOT add complex loading states
  - DO NOT break existing scroll animations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
    - Reason: Simple React state/effect pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `src/components/sections/Hero.tsx:46-58` - Current video implementation
  - `public/images/video_02_poster.jpg` - Poster image (55KB)
  - Web.dev: https://web.dev/articles/lazy-loading-video

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Hero shows poster immediately, video loads later
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:5173
    Steps:
      1. Navigate to: http://localhost:5173/
      2. Immediately capture network requests
      3. Assert: video_02_poster.jpg requested before video_02.mp4
      4. Wait 2 seconds
      5. Assert: video element exists and is playing
      6. Screenshot: .sisyphus/evidence/task-3-hero-video-defer.png
    Expected Result: Poster loads first, video deferred
    Evidence: Network timing captured, screenshot saved
  ```

  **Commit**: YES
  - Message: `perf(hero): defer video loading until after initial render`
  - Files: `src/components/sections/Hero.tsx`
  - Pre-commit: `bun run build`

---

- [ ] 4. Add preconnect and preload hints

  **What to do**:
  - Add `<link rel="preconnect" href="https://fonts.googleapis.com">` 
  - Add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
  - Add `<link rel="preload" href="/images/video_02_poster.jpg" as="image">` for LCP
  - Ensure preconnect comes before Google Fonts CSS link

  **Must NOT do**:
  - DO NOT self-host fonts (user chose minimal approach)
  - DO NOT add dns-prefetch for other domains
  - DO NOT change existing meta tags

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
    - Reason: HTML modification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `index.html` - Current head section
  - Web.dev: https://web.dev/articles/preconnect-and-dns-prefetch

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Preconnect hints present in HTML
    Tool: Bash
    Preconditions: None
    Steps:
      1. Run: grep -c "preconnect" index.html
      2. Assert: Count is at least 2
      3. Run: grep "preload.*video_02_poster" index.html
      4. Assert: Preload for poster image exists
    Expected Result: Resource hints configured correctly
    Evidence: grep output captured
  ```

  **Commit**: Groups with other Wave 1 tasks
  - Message: `perf(fonts): add preconnect hints for Google Fonts`
  - Files: `index.html`

---

- [ ] 5. Add loading="lazy" to all images

  **What to do**:
  - Find all `<img>` tags in components
  - Add `loading="lazy"` attribute to below-the-fold images
  - EXCEPTION: Hero poster image should NOT be lazy (it's LCP)
  - Add `decoding="async"` for additional optimization

  **Must NOT do**:
  - DO NOT make Hero poster image lazy (it's LCP candidate)
  - DO NOT change image sources or formats
  - DO NOT add srcset (user chose minimal approach)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`
    - Reason: Simple attribute additions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `src/components/sections/Products.tsx:60-64` - Already has loading="lazy" ✓
  - `src/components/layout/Navbar.tsx:62-66` - Logo (above-fold, keep eager)
  - `src/components/layout/Footer.tsx:49-53` - Logo (should be lazy)
  - `src/components/sections/Story.tsx` - Check for images

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: All below-fold images have loading lazy
    Tool: Bash
    Preconditions: Changes applied
    Steps:
      1. Run: grep -r "loading=" src/components/ --include="*.tsx"
      2. Assert: Footer logo has loading="lazy"
      3. Assert: No img tags without loading attribute (except Navbar logo)
    Expected Result: Lazy loading configured for all appropriate images
    Evidence: grep output captured
  ```

  **Commit**: Groups with Wave 1
  - Message: `perf(images): add lazy loading to below-fold images`
  - Files: `src/components/layout/Footer.tsx`, any other files with images

---

- [ ] 6. Build verification and performance testing

  **What to do**:
  - Run production build and verify chunk splitting worked
  - Verify no TypeScript or build errors
  - Run Lighthouse CLI on preview server to capture new metrics
  - Document before/after comparison

  **Must NOT do**:
  - DO NOT skip any verification step
  - DO NOT proceed if build fails

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `["playwright"]`
    - Reason: Need Playwright for browser-based verification

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential, after all Wave 1)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 1, 2, 3, 4, 5

  **References**:
  - All modified files from previous tasks
  - `lighthouse_desktop.json` and `lighthouse_mobile.json` - baseline metrics

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Production build succeeds with multiple chunks
    Tool: Bash
    Preconditions: All Wave 1 tasks complete
    Steps:
      1. Run: bun run build
      2. Assert: Exit code 0
      3. Run: ls -la dist/assets/*.js | wc -l
      4. Assert: More than 3 JS files exist
      5. Run: du -sh dist/
      6. Capture total dist size
    Expected Result: Build succeeds, multiple chunks created
    Evidence: Build output and file listing captured

  Scenario: Preview server loads without errors
    Tool: Playwright (playwright skill)
    Preconditions: Build complete
    Steps:
      1. Run: bun run preview (in background)
      2. Navigate to: http://localhost:4173/
      3. Wait for: body visible (timeout: 10s)
      4. Assert: No console errors
      5. Assert: Hero section visible
      6. Navigate to: /shop
      7. Assert: Shop page loads (lazy chunk fetched)
      8. Navigate to: /nonexistent
      9. Assert: 404 page loads
      10. Screenshot each page state
    Expected Result: All routes work, code splitting functional
    Evidence: Screenshots in .sisyphus/evidence/
  ```

  **Commit**: YES
  - Message: `perf: lighthouse optimization complete - code splitting, deferred video, lazy images`
  - Files: All changed files
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| Wave 1 (1-5) | `perf: implement lighthouse optimizations (code splitting, lazy loading, resource hints)` | App.tsx, vite.config.ts, Hero.tsx, index.html, Footer.tsx | bun run build |
| 6 | (no additional commit - verification only) | - | - |

---

## Success Criteria

### Verification Commands
```bash
# Build should create multiple chunks
bun run build
ls dist/assets/*.js  # Should show 3+ files

# No TypeScript errors
bun run build  # Should exit 0

# Preview should work
bun run preview  # Then test in browser
```

### Final Checklist
- [ ] Route-based code splitting implemented (Home, Shop, NotFound lazy loaded)
- [ ] Vendor chunk created (react, react-dom, react-router-dom)
- [ ] Hero video deferred (poster shows first)
- [ ] Preconnect hints for Google Fonts
- [ ] Preload hint for LCP poster image
- [ ] All below-fold images have loading="lazy"
- [ ] Build produces multiple JS chunks
- [ ] No console errors on any route
- [ ] All routes still work (/, /shop, /*)
