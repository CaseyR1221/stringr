# Smart Gear & String Tracker

## Overview
Smart Gear & String Tracker is a web app for tennis players to track racquets, string setups, restring history, and playing time.

The main purpose of the app is to help a player answer:
- What strings are currently in each racquet?
- When was this racquet last restrung?
- How many hours have I played on this setup?
- Which racquets need attention soon?

## Primary User
A tennis player who owns one or more racquets and wants a simple system for tracking:
- racquet details
- current string setup
- restring history
- approximate court usage

## MVP Goal
Build a functional private dashboard where a signed-in user can:
1. Create and manage racquets
2. Log string jobs for a racquet
3. View the current string setup for each racquet
4. Log play sessions
5. See total hours played on the current setup
6. See a simple restring status indicator

## Core MVP Entities
- User
- Racquet
- StringJob
- PlaySession

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Magic UI when it improves the UX and does not add unnecessary complexity
- Better Auth
- Prisma ORM
- PostgreSQL via Neon
- Zod for validation and form schema handling

## Product Principles
- Start simple
- Prioritize data clarity over flashy visuals
- Keep UI clean and modern
- Prefer server components by default
- Keep features small and reviewable
- Avoid overengineering in the initial build

## Initial UX Direction
- App should feel like a modern SaaS dashboard
- Neutral, clean, slightly premium
- Focus on clarity, not gamification
- Cards for racquets
- Tables or simple lists for history
- Forms should be straightforward and fast

## Demo Data Requirement
The app should include a seeded demo data set for local development.

Demo data should include:
- multiple sample racquets
- realistic sample string jobs
- realistic sample play sessions
- sample racquet images if possible

For MVP, images should come from seeded URLs or local placeholder/demo assets.
Do not build image upload functionality yet.

# Schema Notes

## Core Relationships
- A User has many Racquets
- A Racquet belongs to one User
- A Racquet has many StringJobs
- A Racquet has many PlaySessions
- A StringJob belongs to one Racquet
- A PlaySession belongs to one Racquet

## User
Represents an authenticated account.

Suggested fields:
- id
- name
- email
- createdAt
- updatedAt

## Racquet
Represents one physical tennis racquet.

Suggested fields:
- id
- userId
- nickname
- brand
- model
- headSize
- stringPattern
- weightGrams
- imageUrl
- notes
- createdAt
- updatedAt

Notes:
- nickname is optional but useful, e.g. "Match Frame 1"
- do not over-model specs yet
- imageUrl is for seeded demo content and simple display only in MVP
- do not build uploads yet

## StringJob
Represents one restring event for a racquet.

Suggested fields:
- id
- racquetId
- mainString
- crossString
- tensionMainLbs
- tensionCrossLbs
- gauge
- stringType
- strungAt
- notes
- isCurrent
- createdAt
- updatedAt

Notes:
- allow mainString and crossString to be the same for full bed setups
- stringType can be a simple text field at first
- isCurrent can be maintained in app logic initially

## PlaySession
Represents one playing session using a racquet.

Suggested fields:
- id
- racquetId
- playedAt
- durationMinutes
- notes
- createdAt
- updatedAt

## Validation
Use Zod for form validation and input parsing.

Initial forms that should use Zod:
- sign-up / auth-related input where applicable
- add racquet
- edit racquet
- add string job
- add play session

Validation should stay practical and simple in MVP.
Do not overbuild reusable validation abstractions in the first pass.

## Derived Values
These should be computed in application logic, not stored initially:
- total hours on current string job
- restring status
- current setup summary

## Initial Restring Status Logic
Keep it simple for MVP.

Possible logic:
- Fresh: 0 to 6 hours
- Monitor: >6 to 12 hours
- Due Soon: >12 to 18 hours
- Replace Now: >18 hours

This logic should be easy to change later.
Do not overfit to real-world string science in the first build.

## What NOT to Build Yet
Do not build these in the initial phase:
- social/community features
- marketplace or shopping features
- AI string recommendations
- notifications/reminders
- team accounts
- coach/player sharing
- mobile app
- advanced analytics
- wearable or sensor integrations
- image uploads
- public profiles

## Success Criteria for Initial Build
The first usable version is successful if a user can:
- sign up / sign in
- create a racquet
- log a string job
- log a play session
- view the current setup and hours on that setup