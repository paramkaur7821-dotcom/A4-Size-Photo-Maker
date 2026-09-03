---
name: Vite SPA canonical handling
description: Canonical URL behavior for this Vite SPA and its build pipeline.
---

For this Vite SPA, avoid a root-relative canonical value such as `href="/"` in index.html because Vite may treat it as an asset URL and fail with EISDIR while reading the project root. Set canonical URLs at runtime from the current browser origin and pathname.

**Why:** Vite's HTML asset processing can resolve root-relative href values during build rather than treating them as metadata-only URLs.

**How to apply:** Keep the static HTML shell free of root-directory canonical hrefs; update or create the canonical link in the route component after the SPA route is known.