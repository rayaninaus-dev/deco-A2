# Student Mental-Health Prototype (Vite + React + TS)

Implements the flows and data persistence described in the request: Landing → Intake → Consent → Confirm, with a Counselor Dashboard for reviewing, filtering, exporting, and managing submissions. Data is persisted in `localStorage` under the keys `submissions` and `events`.

## Routes

- `/` Landing
- `/intake` Anonymous Intake Form
- `/consent` Student-led Consent
- `/confirm` Submission Confirmation
- `/dashboard` Counselor Dashboard

## Storage

- `localStorage["submissions"]`: array of `Submission`
- `localStorage["events"]`: array of `EventLog`

## Setup Instructions

1. npm create vite@latest mh-proto -- --template react-ts
2. cd mh-proto
3. npm install react-router-dom tailwindcss postcss autoprefixer uuid
4. npx tailwindcss init -p
5. Replace Tailwind content and add `@tailwind` directives as shown in `tailwind.config.js` and `src/index.css` here
6. npm run dev

This repository already contains a ready-to-run project with the necessary configuration and files.

