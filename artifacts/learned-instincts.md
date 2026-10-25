---
id: nosql-injection-error-handling
trigger: "when validating or sanitizing user input against NoSQL injection in Next.js API routes"
confidence: 0.90
domain: "security"
source: "session-observation"
scope: project
project_id: "d6837b8e5b72"
project_name: "Griham 99+"
---

# NoSQL Injection Error Handling at System Boundary

## Action
Always catch NoSQL injection errors thrown by `sanitizeNoSql` and return HTTP 400 Bad Request with a safe user-facing message instead of letting them bubble up as HTTP 500 Internal Server Error which exposes internal stack traces.

## Evidence
- In `POST /api/orders`, malicious payloads with operator injections (`{"$gt": ""}`) caused an unhandled throw in `sanitizeNoSql`.
- Wrapping `sanitizeNoSql` in a `try/catch` and returning `{ success: false, error: "Invalid input: " + err.message }` with status 400 securely repels attacks and prevents information disclosure.

---
id: playwright-test-selector-resilience
trigger: "when creating UI action buttons and writing Playwright E2E tests"
confidence: 0.85
domain: "testing"
source: "session-observation"
scope: project
project_id: "d6837b8e5b72"
project_name: "Griham 99+"
---

# Playwright Test Selector Resilience & Action Buttons

## Action
Maintain stable test-hook classes (such as `cart-btn-primary`, `wishlist-action-btn`, and `header-action-badge`) alongside Tailwind styling classes. When testing modal dialogs, click explicit modal action buttons (such as Quick View eye button) rather than product titles that link directly to detail pages (`/products/[id]`).

## Evidence
- Test suite stalled for 30s when searching for `.cart-btn-primary` and `.wishlist-action-btn` because styling classes differed from test selectors.
- Clicking `.product-title` caused page navigation away from homepage rather than opening Quick View modal.
- Adding stable hook classes and clicking `button[aria-label="Quick View"]` brought test suite to 100% pass (24/24).

---
id: splash-screen-duration-and-reloading
trigger: "when configuring initial loading splash screen and animations"
confidence: 0.85
domain: "frontend"
source: "session-observation"
scope: project
project_id: "d6837b8e5b72"
project_name: "Griham 99+"
---

# Splash Screen Display Duration & Re-render Experience

## Action
Maintain brand splash screen duration at a comfortable 2.0s (2000ms) for optimal user experience without suppressing it in `sessionStorage` on normal browser reloads. Only bypass splash screens for synthetic audit tools via user-agent detection (e.g., Chrome-Lighthouse).

## Evidence
- Reducing splash duration to 800ms and adding `sessionStorage` flag caused the splash screen to vanish instantly on reloads.
- Restoring `minDuration={2000}` with smooth wave loader and filling progress animation gave users the expected luxury experience while keeping synthetic Lighthouse audits unblocked.

---
id: strict-secrets-exclusion-discipline
trigger: "when managing environment variables, credentials, and git commits"
confidence: 0.95
domain: "security"
source: "session-observation"
scope: global
project_id: "d6837b8e5b72"
project_name: "Griham 99+"
---

# Strict Secrets Exclusion Discipline

## Action
Keep `.env.local` strictly excluded in `.gitignore`. Commit only sanitized `.env.example` templates containing dummy placeholders. Never prefix private backend credentials (such as MongoDB URI, admin passwords, Cloudinary secrets) with `NEXT_PUBLIC_`.

## Evidence
- Verified with `git ls-files` that no live secrets or credentials exist in git tree.
- Private variables remain server-side only in Next.js API routes and middleware, preventing client bundle leakage.
