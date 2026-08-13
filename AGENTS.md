<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## BULBENI project documentation

Before making product, scope, data-model, layout, or design decisions:

1. Read `docs/PROJECT.md`.
2. Read `docs/DESIGN_SYSTEM.md`.
3. Check `docs/ROADMAP.md` for current status and unresolved decisions.

Treat these documents as the project source of truth unless the user explicitly requests a change.

Do not introduce Phase 2 or Phase 3 functionality into Phase 1 merely because it appears in the roadmap.

When implementing or removing a feature, update the relevant checkbox or status in `docs/ROADMAP.md` when appropriate.

When a new unresolved product decision appears, add it to the Open Product Decisions section rather than silently choosing permanent behavior.
