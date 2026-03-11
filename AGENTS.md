# AGENTS.md

## Purpose
This repository is for the Smart Gear & String Tracker app.

Codex should help build the project incrementally.
Do not attempt to build the full product in one pass.

## General Rules
- Work in small, reviewable steps
- Only complete the scoped task requested by the prompt
- Do not add extra features outside the requested scope
- Prefer clarity over cleverness
- Keep code production-minded but simple
- Leave concise TODO comments for future work instead of implementing extra functionality

## Tech Rules
- Use Next.js App Router
- Use TypeScript strictly
- Use Tailwind CSS for styling
- Prefer shadcn/ui components when a matching primitive exists
- Use Magic UI only when it meaningfully improves presentation and does not introduce unnecessary complexity
- Use Prisma for database access
- Use PostgreSQL-compatible patterns
- Use Better Auth for authentication
- Use Zod for form validation and schema parsing

## Package Management
- Use Yarn as the package manager
- Use node_modules linker (not Plug'n'Play)
- Use yarn.lock for dependency locking
- Do not use npm or pnpm commands
- Prefer:
  - yarn add <pkg>
  - yarn remove <pkg>
  - yarn dev
  - yarn build
  - yarn prisma ...

## Architecture Preferences
- Prefer server components by default
- Use client components only when interactivity is required
- Keep business logic out of UI components when possible
- Create reusable UI components only after duplication becomes clear
- Avoid premature abstractions

## Styling Rules
- Clean modern SaaS dashboard feel
- Avoid overdesigned gradients and decorative effects early on
- Prioritize legibility and hierarchy
- Use consistent spacing and component sizing
- Keep the design easy to refine later

## Demo Data Rules
- Include realistic seeded demo data for local development
- Demo racquets should include sample image references if possible
- Prefer seeded URLs or local demo assets over adding upload functionality
- Do not build image upload flows unless explicitly requested

## Validation Rules
- Use Zod schemas for form validation
- Keep validation logic close to the forms or domain modules where it is used
- Favor simple, readable schemas over abstraction-heavy validation systems

## Scope Control
Do not build the following unless explicitly asked:
- notifications
- AI features
- social features
- public sharing
- shopping or affiliate features
- advanced analytics
- image uploads
- native mobile support

## Data and Forms
- Keep forms simple and explicit
- Use server actions or route handlers based on the task request
- Add basic validation with Zod
- Avoid overcomplicated schema design in the first iteration

## File and Code Change Behavior
- Prefer editing existing files over creating unnecessary new files
- Keep file names predictable
- Keep folder structure clean
- Explain major architectural choices in comments only when useful
- Do not generate large amounts of placeholder code

## When Unsure
If a requested change could significantly expand scope:
- choose the narrower implementation
- leave room for future extension
- do not build speculative features