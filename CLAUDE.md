# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**3D Animated Portfolio Website** - A complete, production-ready personal portfolio featuring interactive 3D graphics via Google's model-viewer web component, smooth animations using @react-spring/web, and responsive design built on React 18 + Vite + Tailwind CSS.

### Tech Stack
- **Framework**: React 18.2.19 with modern hooks (createRoot API)
- **Build Tool**: Vite 4.2.1
- **Styling**: Tailwind CSS v3.4.11 (fully configured)
- **Routing**: React Router DOM v6.30.0 with named exports
- **3D Graphics**: Google `<model-viewer>` web component (HTML/CSS only - NO Three.js/Canvas/WebGL)
- **Animations**: @react-spring/web for HTML element animations
- **CSS Processing**: PostCSS with autoprefixer
- **Language**: JavaScript (ES6+)
- **Development Server**: Port 3003 (configurable in vite.config.js)

### Constraint
Protocol rule #10 - All 3D content must use HTML/CSS-only approach via model-viewer. Do not add Three.js, Canvas, or WebGL-based 3D implementations.

## Current Implementation Status

**✅ PROJECT COMPLETE** - Full production-ready portfolio site with 3D integration, four pages, animations, and responsive design.

### Core Features
- ✅ React Router v6.30.0 with 4 routes: `/home`, `/about`, `/projects`, `/contact`
- ✅ Tailwind CSS v3.4.11 fully configured with responsive design
- ✅ 3D model viewer using Google `<model-viewer>` (HTML/CSS only)
- ✅ Multiple layered 3D models with z-index stacking (sky, island, cottage, plane)
- ✅ Interactive camera controls and auto-rotation toggle
- ✅ Fullscreen hero with dramatic lighting (`shadow-intensity="2.5"`, `exposure="0.4"`)
- ✅ Contact form with client-side validation and success animation
- ✅ Project filterable grid with modal popups
- ✅ CV download functionality with PDF modal preview

### Pages Implemented

**Home (`/home`)** - Composite 3D scene with sky background (sky.glb), floating plane (plane.glb), interactive cottage model (fantasy-cottage.glb), hero text "BIJOY KHIANG", auto-rotate toggle, CV download button, and 3D object interaction. Uses layered model-viewer elements with z-index stacking.

**About (`/about`)** - Hero section, bio grid layout (image + text), skills section (8 animated progress bars), experience timeline (3 positions), tech stack cloud (15 items), blog preview (3 posts), CTA section.

**Projects (`/projects`)** - Filterable project grid (6 categories: All, Web, Mobile, Desktop, Design, Other), project cards with detailed modal popups, animated transitions, category badges and technology tags, gradient visual treatment.

**Contact (`/contact`)** - Contact details (email, location, availability), social links, validated contact form with JavaScript validation and success state animation, gradient CTA.

### Design System
- Neutral backgrounds with dark text (#1a1a1a)
- Cyan/purple gradient accents (`from-cyan-500 to-purple-600`)
- Consistent animations using @react-spring/web spring physics
- Mobile-first responsive layouts with Tailwind breakpoints (sm, md, lg, xl)
- Navigation with active route highlighting
- CV download modal with PDF preview functionality
- Brand hero text: "BIJOY KHIANG"
- Font: Inter (Google Fonts)

## Development Commands

```bash
# Development - starts server on http://localhost:3003
npm run dev

# Production build - creates optimized build in dist/
npm run build

# Preview production build (serves on port 4175)
npm run preview

# Dependencies
npm install    # Install all dependencies
npm update     # Update to latest compatible versions
npm outdated   # Check for outdated packages
```

### Configuration Files
- `vite.config.js` - Vite configuration (port: 3003, React plugin, auto-open browser)
- `tailwind.config.js` - Tailwind content paths for scanning `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`
- `postcss.config.js` - PostCSS with autoprefixer plugin
- `index.html` - HTML entry point with model-viewer CDN script from Google

## Architecture Patterns

### Component Structure
```
src/
├── main.jsx                 # React entry: createRoot + BrowserRouter setup
├── App.jsx                  # Main layout: navigation bar + Routes container
├── index.css                # Tailwind directives + global styles + custom @keyframes
├── components/
│   ├── ThreeDScene.jsx      # 3D home page with model-viewer composition
│   └── 3DObjects.jsx        # (exists but appears unused)
└── pages/
    ├── About.jsx            # Bio, skills, experience, tech stack, blog
    ├── Projects.jsx         # Filterable grid with modal popups
    └── Contact.jsx          # Contact form with validation
```

### Routing (React Router v6+)
Uses named exports exclusively:
```javascript
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
```
Routes defined in `App.jsx:66-77`:
- `/home` → `ThreeDScene.jsx`
- `/about` → `About.jsx`
- `/projects` → `Projects.jsx`
- `/contact` → `Contact.jsx`
- `*` (wildcard) → redirects to `/home`

### 3D Implementation (HTML/CSS Only)
**ThreeDScene.jsx** uses Google's `<model-viewer>` web component with composition:

The home page uses **5 layered model-viewer elements** with z-index positioning:
1. **Sky background** (z-index: 0) - `sky.glb` with auto-rotate
2. **Floating plane** (z-index: 10) - `plane.glb` with CSS keyframe animation
3. **Main cottage** (z-index: 20) - `fantasy-cottage.glb` with camera controls
4. **Hero overlay** (z-index: 30) - Text and UI controls
5. **CV modal** (z-index: 50) - Download modal with PDF preview

Model configuration:
- `camera-controls` - User can rotate, zoom, pan
- `auto-rotate` - Can be toggled via button
- `shadow-intensity="2.5"` - Dramatic shadows
- `exposure="0.4"` - Adjusted lighting
- `interaction-prompt="none"` - Clean UX
- All models located in `public/models/`

**CRITICAL**: No Three.js, Canvas, or WebGL allowed per Protocol Rule #10.

### Styling (Tailwind CSS)
- Configured to scan: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- Tailwind directives in `index.css`: `@tailwind base; @tailwind components; @tailwind utilities;`
- Custom CSS in `@layer components` for reusable classes
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Heavy use of:
  - Gradients (`bg-gradient-to-r`, `from-cyan-500 to-purple-600`)
  - Backdrop blur (`backdrop-blur-md`)
  - Transitions (`transition-all duration-300`)
  - Shadows (`shadow-lg`, `shadow-2xl`)
  - Flex/Grid layouts
- Custom `@keyframes float` for plane animation in `index.css`

### Animation Approach
- Uses `@react-spring/web` (v9.7.5) for declarative spring physics animations
- Common pattern: `const props = useSpring({ opacity: 1, y: 0, from: { opacity: 0, y: 50 } })`
- Inline styles: `<animated.div style={props}>`
- Hero text: Staggered entrance with delay values
- Projects modal: Fade/scale animations
- All timing uses spring configs (no CSS transitions for major animations)

### State Management
- Local React state (`useState`) for component-specific state
- Examples: modal open/close, form validation, auto-rotate toggle, project filtering
- No global state management (Redux, Zustand, Context API for complex state)
- Straightforward prop drilling where needed

### Form Handling
- Contact form uses controlled components with `useState`
- Client-side validation with error message display
- Success state triggers animation and disables form
- No backend integration (would need to add API endpoint)

## Important Notes

### Navigation Duplication Issue
`ThreeDScene.jsx` (lines 8-29) contains its own navigation bar, while `App.jsx` (lines 14-63) provides the main navigation. This creates **duplicate nav bars** on the home page. The intended architecture is for `App.jsx` to provide the single navigation component used across all pages. Consider refactoring to remove the duplicate in `ThreeDScene.jsx`.

### Unused Dependencies
`package.json` (as read) includes no `@react-three/*`, `three`, or `gsap` - these have already been cleaned up. Current dependencies are minimal and match the actual codebase.

**Note**: If you see these packages in the future, they are likely leftovers from earlier iterations and should be removed.

### 3D Model Assets
All 3D models are in `public/models/` as GLB files:
- `fantasy-cottage.glb` - Main cottage model
- `sky.glb` - Background sky sphere
- `plane.glb` - Floating plane object
- `bird.glb` - (exists but unused)
- `fox.glb` - (exists but unused)

The `public/` directory is served as-is by Vite.

### Port Configuration
Default dev server port: **3003** (not 3007 as mentioned in some documentation). If unavailable, modify `vite.config.js:7`:
```javascript
server: { port: 3003, open: true }
```

### Protocol Compliance
Always read `docs/protocol.md` before making changes. This project follows a strict documentation-first workflow requiring approval, task tracking, and incremental updates to `projectmemory.md`, `steps.md`, and `decisions.md`.

## Emergency Procedures

### If Development Server Fails
1. Check if port 3003 is in use
2. Verify dependencies: `npm install`
3. Check Node.js version: should be 18+ for React 18
4. Review browser console for errors
5. Ensure `index.html` includes model-viewer script

### If 3D Model Not Rendering
1. Check browser WebGL support
2. Verify model file exists: `public/models/fantasy-cottage.glb`
3. Check browser console for model-viewer errors
4. Verify CDN script loads in `index.html:8`

### If Tailwind Styles Missing
1. Verify `index.css` includes Tailwind directives
2. Check `tailwind.config.js` content paths include `src/`
3. Restart dev server (Vite hot reload should pick up changes)

### If Browser Extension Errors Appear
Console errors from `content.js`, `i18next`, or `Fatkun` are from browser extensions, not your code. Test in Incognito mode or disable extensions to verify your app works correctly.

## Testing & Linting Status

**⚠️ NOT CONFIGURED** - The project currently has no testing or linting infrastructure.

### Current State
- No test files (`.test.js`, `.spec.js`) in the codebase
- No testing dependencies (Jest, Vitest, Testing Library)
- No linting tools (ESLint, Prettier) configured
- Project uses JavaScript (ES6+), not TypeScript

### Planned Commands (from `docs/protocol.md`)
These placeholder commands are defined but not implemented:
```bash
# Testing (when configured)
npm test              # Run all tests
npm run test:unit     # Run unit tests
npm run test:e2e      # Run end-to-end tests

# Code Quality (when configured)
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix linting issues
npm run type-check    # TypeScript type checking (not applicable)
```

### Recommendations for Adding Tests
If adding test infrastructure:
- Consider Vitest (Vite-native, fast) or Jest
- Add Testing Library (`@testing-library/react`) for component tests
- Place test files alongside components: `ComponentName.test.jsx`
- Add test script to `package.json`
- Update `vite.config.js` for test environment if using Vitest

## Documentation System

Project documentation is maintained in `/docs`:

- **goal.md** - Vision, success criteria, technical specs, phases
- **projectmemory.md** - Session continuity tracker, current status
- **steps.md** - Chronological implementation log
- **decisions.md** - Technical decisions and issue resolutions
- **protocol.md** - Mandatory workflow rules (do not modify)
- **transcript.md** - Tutorial notes and learning resources

**Important**: Always read `docs/protocol.md` before making changes. Follow the mandatory workflow: ask approval, document tasks, update projectmemory.md and steps.md after completing work.

## Quick Reference

- **Entry point**: `src/main.jsx:7` - createRoot + BrowserRouter setup
- **Routes**: `src/App.jsx:66-77` - 4 route definitions with wildcard redirect
- **Navigation**: `src/App.jsx:14-63` - Main navigation bar (duplicated in ThreeDScene.jsx)
- **3D Scene**: `src/components/ThreeDScene.jsx:33` - First model-viewer element (sky background)
- **Home Page**: `src/components/ThreeDScene.jsx` - Composed of 5 layered model-viewer elements with z-index
- **Animations**: `src/components/ThreeDScene.jsx:54-100` - @react-spring/web spring configurations
- **Config**: `vite.config.js:4` (plugins), `vite.config.js:7` (port 3003), `tailwind.config.js:3-6` (content paths)
- **Styles**: `src/index.css` - Tailwind directives + custom `@keyframes float`
- **Models**: `public/models/` - All GLB model files

---

## Emergency Procedures

### If Development Server Fails
1. Check if port 3003 is in use (`netstat -ano | findstr :3003` on Windows)
2. Verify dependencies: `npm install`
3. Check Node.js version: should be 18+ for React 18 (`node --version`)
4. Review browser console for errors
5. Ensure `index.html:8` includes model-viewer CDN script
6. Try stopping server and running `npm run dev` again

### If 3D Model Not Rendering
1. Check browser WebGL support (visit: get.webgl.org)
2. Verify model file exists: `public/models/fantasy-cottage.glb` (and other models)
3. Check browser console for model-viewer errors (CORS, loading failures)
4. Verify CDN script loads in `index.html:8`
5. Check network tab for 404 errors on model files
6. Ensure model file is valid GLB format (not corrupted)

### If Tailwind Styles Missing
1. Verify `src/index.css` includes Tailwind directives (base, components, utilities)
2. Check `tailwind.config.js` content paths include `./src/**/*.{js,jsx,tsx,ts}`
3. Restart dev server (Vite hot reload should pick up changes)
4. Check browser DevTools for CSS file loading errors
5. Verify Tailwind classes in components match config

### If Browser Extension Errors Appear
Console errors from `content.js`, `i18next`, or `Fatkun` are from browser extensions, not your code. Test in Incognito mode or disable extensions to verify app works correctly.

## Deployment

### Production Build
```bash
npm run build   # Creates optimized build in dist/ directory
npm run preview # Serves dist/ locally on port 4175 for testing
```

### Deploy to Static Hosting
1. Run `npm run build`
2. Upload `dist/` folder to hosting service (GitHub Pages, Netlify, Vercel, etc.)
3. Ensure `public/` assets are included (Vite copies them automatically)
4. Configure hosting for SPA routing (redirect all paths to index.html)
5. For Netlify/Vercel: import Git repo, automatic deployment

**Important**: The `index.html` loads model-viewer from CDN, so 3D works without local build dependencies.

---

## Project Status

- **Status**: Production-Ready
- **Version**: 1.0.0
- **Architecture**: Complete with 4 pages, 3D scene, animations, responsive design
- **Open Issues**:
  - Navigation duplication in ThreeDScene.jsx (should be removed)
  - No testing infrastructure (Vitest/Jest recommended)
  - No linting/formatting (ESLint + Prettier recommended)

---

**Remember**: Always follow `docs/protocol.md`. Update projectmemory.md and steps.md after completing tasks. Ask for approval before making any changes.

