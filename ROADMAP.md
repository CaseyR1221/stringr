# Smart Gear & String Tracker Roadmap

## Phase 1 - Foundation
Goal: establish the project structure and core data model.

### Deliverables
- Set up Next.js app with App Router and TypeScript
- Configure Tailwind
- Install and configure shadcn/ui
- Install Magic UI for selective use later
- Set up Prisma with PostgreSQL
- Connect to Neon database
- Set up Better Auth
- Add Zod for validation
- Create base app layout
- Create placeholder dashboard routes
- Add Prisma schema for:
  - User
  - Racquet
  - StringJob
  - PlaySession
- Seed sample data for local development, including demo image references if possible

### Routes to create
- /
- /sign-in
- /sign-up
- /dashboard
- /dashboard/racquets
- /dashboard/racquets/[racquetId]

## Phase 2 - Racquets
Goal: allow the user to manage racquets.

### Deliverables
- Racquet list page
- Add racquet form
- Edit racquet form
- Delete racquet action
- Zod validation for racquet forms
- Racquet cards with summary info:
  - nickname
  - brand
  - model
  - current string setup
  - current hours
  - restring status
  - demo image if present

## Phase 3 - String Jobs
Goal: let the user track restring history.

### Deliverables
- Add string job form
- Zod validation for string job form
- String job history list on racquet detail page
- Mark latest job as current automatically
- Show current setup clearly on racquet detail page

## Phase 4 - Play Sessions
Goal: let the user track time played on a racquet.

### Deliverables
- Add play session form
- Zod validation for play session form
- Play session history list
- Calculate total hours on current string setup
- Display simple restring status:
  - Fresh
  - Monitor
  - Due Soon
  - Replace Now

## Phase 5 - Polish
Goal: improve usability without expanding scope.

### Deliverables
- Better empty states
- Better dashboard summaries
- Filters and sorting
- Mobile responsiveness
- Validation and nicer form UX
- Improve presentation of demo images

## Explicit Out of Scope for MVP
- notifications
- recommendation engine
- string tension forecasting
- e-commerce links
- shared households / multi-user racquet pools
- image uploads