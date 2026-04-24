# ClearImpact App Implementation Plan

## Overview
Build a full-stack web application called “ClearImpact – Transparent Giving for Real Change” based on the provided HTML reference file. The app features a React+Vite frontend and a Node+Express+MongoDB backend. It aims to provide donors with radical transparency regarding their contributions.

## Project Type
WEB

## Success Criteria
- [ ] Both `frontend` and `backend` directories structured completely.
- [ ] Proper environment files (`.env` and `.env.example`) defined for frontend and backend.
- [ ] Root `.gitignore` and `README.md` created.
- [ ] JWT-based auth functioning for donors and NGO admins.
- [ ] MongoDB storing Users, Donations, ImpactUpdates, and Stories.
- [ ] Homepage, Dashboard, Tracker, and Admin pages translated efficiently from raw HTML to React components.
- [ ] Traceability ID generation functioning per donation.
- [ ] API validation (Zod) and error middleware configured on the backend.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router, Recharts, Axios, Framer Motion (optional, for smooth animations).
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, Zod.
- **Tools**: Concurrent running, `dotenv` for env vars.

## File Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/ (UI elements, Layout)
│   │   ├── pages/ (Home, Dashboard, Track, Stories, Login, Admin)
│   │   ├── context/ (AuthContext)
│   │   └── lib/ (api clients, utils)
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/ (auth, donations, impact, stories)
│   │   ├── models/ (User, Donation, ImpactUpdate, Story)
│   │   ├── routes/
│   │   ├── middleware/ (auth, error handled)
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
├── .gitignore
├── README.md
└── clearimpact-app.md (This Plan)
```

## Task Breakdown

### Task 1: Scaffold Project Roots
- **Agent**: `backend-specialist` & `frontend-specialist`
- **Skills**: `app-builder`
- **Action**: 
  - Create `/backend` using Node/Express/TypeScript setup.
  - Create `/frontend` using Vite + React + TS.
  - Set up `package.json` for both, adding essential libraries (Mongoose, Express, JWT, Tailwind). 
  - Create `.gitignore` and `README.md` at root.
- **INPUT→OUTPUT→VERIFY**: `npm init` / `npx create-vite` → Base directories created → `npm install` runs successfully in both.

### Task 2: Backend Database & Models
- **Agent**: `database-architect`
- **Skills**: `database-design`
- **Action**: Define Mongoose schemas for User, Donation (with Traceability ID logic), ImpactUpdate, and Story.
- **INPUT→OUTPUT→VERIFY**: Schema definitions → Mongoose Model files → Types compile successfully.

### Task 3: Backend API & Auth Implementation
- **Agent**: `backend-specialist`
- **Skills**: `api-patterns`, `nodejs-best-practices`
- **Action**: Implement JWT Auth for donor/admin, and CRUD endpoints for Donations, Impact Updates, and Stories. Configure Zod API validation.
- **INPUT→OUTPUT→VERIFY**: Express routes & controllers → Working endpoints → `npm run build` succeeds on backend.

### Task 4: Frontend Base Setup & Tailwind Theming
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`, `tailwind-patterns`
- **Action**: Configure Tailwind CSS utilizing the CSS variables present in `clearimpact-app.html`. Set up React Router, Auth Context.
- **INPUT→OUTPUT→VERIFY**: `index.css` & `tailwind.config.js` → Base layout wrapper → Routes map to empty pages.

### Task 5: Frontend Pages Integration
- **Agent**: `frontend-specialist`
- **Skills**: `react-best-practices`
- **Action**: 
  - Translate `clearimpact-app.html` into React components (Nav, Hero, Feature Cards, Footer).
  - Implement Homepage, Login/Register Pages, and Stories Hub.
- **INPUT→OUTPUT→VERIFY**: Raw HTML structure → TSX Components → Renders perfectly matching original styling.

### Task 6: Dashboards & Tracker Development
- **Agent**: `frontend-specialist`
- **Skills**: `react-best-practices`
- **Action**: Build Donor Dashboard (Recharts for impact stats), Donation Tracker (Trace ID Input), and Admin Panel. Hook up Axios to backend APIs.
- **INPUT→OUTPUT→VERIFY**: Mock Data / Empty components → Live Data Components → Dashboard displays real charts & statuses.

### Task 7: Final Polish & Deployment Prep
- **Agent**: `devops-engineer`
- **Skills**: `deployment-procedures`
- **Action**: Configure API base URLs using `VITE_API_URL` instead of hardcoded localhost. Prepare `.env.example`s. Ensure root is deployment-ready.
- **INPUT→OUTPUT→VERIFY**: Hardcoded strings → Env variables → App builds flawlessly using `npm run build` in frontend.

## ✅ PHASE X VERIFICATION (Pending)
- [ ] Run Lint & Build checks
- [ ] Run backend tests (if added)
- [ ] Ensure `clearimpact-app.html` UI integrity is retained in React.
