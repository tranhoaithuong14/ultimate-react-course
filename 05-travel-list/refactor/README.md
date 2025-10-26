# Travel List (Refactor)

This folder contains a best-practice 2025 rewrite of the travel packing list app. The original `final` build remains untouched; this version introduces a modern component organization, contexts, and hooks to eliminate prop drilling while keeping behavior identical.

## Highlights
- Centralized state using a reducer + context provider (`PackingListProvider`).
- Derived data extracted into hooks for clarity and reuse.
- Components co-locate responsibilities (form, list, stats) and access shared state through context hooks.
- Pure UI components (`ItemRow`, `Header`) remain stateless and memoized where useful.
- Modern project tooling (ESLint, typecheck script) to encourage healthy development workflow.

Run commands from this folder with `npm install` followed by `npm start`.
